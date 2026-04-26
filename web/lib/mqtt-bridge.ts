// MAILLON — Bridge MQTT → Postgres/Timescale
// À lancer en process distinct : `pnpm tsx lib/mqtt-bridge.ts`
//
// Topics consommés : `maillon/{org_id}/{node_id}/+`
//   - .../position  : Protobuf Meshtastic Position
//   - .../telemetry : Protobuf Meshtastic Telemetry (DeviceMetrics, EnvironmentMetrics)
//   - .../message   : Protobuf Meshtastic Encrypted (ciphertext stocké tel quel)
//
// Le décodage Protobuf utilise @meshtastic/js (officiel). Les schémas ne sont pas
// importés ici en dur — l'agent qui finalisera ajoutera la dépendance.

import mqtt from "mqtt";
import { PrismaClient, type Prisma } from "@prisma/client";

const prisma = new PrismaClient();

const BROKER_URL = process.env.MQTT_BROKER_URL;
const MQTT_USER = process.env.MQTT_USER;
const MQTT_PASS = process.env.MQTT_PASS;
const TOPIC_ROOT = process.env.MQTT_TOPIC_ROOT ?? "maillon";

if (!BROKER_URL) {
  console.error("[bridge] MQTT_BROKER_URL absent — abandon.");
  process.exit(1);
}

type ParsedTopic = { orgId: string; nodeHardwareId: string; kind: string };

function parseTopic(topic: string): ParsedTopic | null {
  // maillon/{org_id}/{node_id}/{kind}
  const parts = topic.split("/");
  if (parts.length !== 4 || parts[0] !== TOPIC_ROOT) return null;
  const [, orgId, nodeHardwareId, kind] = parts;
  if (!orgId || !nodeHardwareId || !kind) return null;
  return { orgId, nodeHardwareId, kind };
}

type PositionPayload = {
  ts?: number | string;
  lat: number;
  lon: number;
  altitudeM?: number;
  accuracyM?: number;
};
type TelemetryPayload = {
  ts?: number | string;
  metrics: Record<string, number | string>;
};

// Décodeurs : à remplacer par @meshtastic/js (Protobuf) après installation.
// Pour le moment, on accepte du JSON (le bridge officiel Meshtastic peut être
// configuré pour publier en JSON via la passerelle MQTT du firmware).
function decodePosition(buf: Buffer): PositionPayload | null {
  try {
    const json = JSON.parse(buf.toString("utf8")) as PositionPayload;
    if (typeof json.lat !== "number" || typeof json.lon !== "number") return null;
    return json;
  } catch {
    return null;
  }
}

function decodeTelemetry(buf: Buffer): TelemetryPayload | null {
  try {
    const json = JSON.parse(buf.toString("utf8")) as TelemetryPayload;
    if (!json.metrics || typeof json.metrics !== "object") return null;
    return json;
  } catch {
    return null;
  }
}

async function handlePosition(t: ParsedTopic, p: PositionPayload) {
  const node = await prisma.node.findUnique({
    where: { hardwareId: t.nodeHardwareId },
    select: { id: true, orgId: true },
  });
  if (!node) {
    // Ownership fail-safe : on n'écrit jamais pour un nœud inconnu.
    return;
  }
  if (node.orgId !== t.orgId) {
    console.warn(
      `[bridge] Topic org=${t.orgId} ne correspond pas au nœud ${t.nodeHardwareId} (org=${node.orgId}).`,
    );
    return;
  }
  const ts = p.ts
    ? new Date(typeof p.ts === "number" ? p.ts : Date.parse(p.ts))
    : new Date();

  await prisma.$transaction([
    prisma.position.create({
      data: {
        nodeId: node.id,
        orgId: node.orgId,
        ts,
        lat: p.lat,
        lon: p.lon,
        altitudeM: p.altitudeM ?? null,
        accuracyM: p.accuracyM ?? null,
        source: "MQTT",
      },
    }),
    prisma.node.update({
      where: { id: node.id },
      data: {
        lastSeenAt: ts,
        lastLat: p.lat,
        lastLon: p.lon,
        status: "ACTIVE",
      },
    }),
  ]);
}

async function handleTelemetry(t: ParsedTopic, p: TelemetryPayload) {
  const node = await prisma.node.findUnique({
    where: { hardwareId: t.nodeHardwareId },
    select: { id: true, orgId: true },
  });
  if (!node || node.orgId !== t.orgId) return;
  const ts = p.ts
    ? new Date(typeof p.ts === "number" ? p.ts : Date.parse(p.ts))
    : new Date();

  const rows: Prisma.TelemetryCreateManyInput[] = Object.entries(p.metrics).map(
    ([key, value]) => ({
      nodeId: node.id,
      orgId: node.orgId,
      ts,
      key,
      valueNum: typeof value === "number" ? value : null,
      valueText: typeof value === "string" ? value : null,
    }),
  );

  if (rows.length > 0) {
    await prisma.telemetry.createMany({ data: rows, skipDuplicates: true });
  }

  // Mise à jour batterie dénormalisée si présente.
  const battery = p.metrics["batteryPc"] ?? p.metrics["battery"];
  if (typeof battery === "number") {
    await prisma.node.update({
      where: { id: node.id },
      data: { lastSeenAt: ts, lastBatteryPc: Math.round(battery) },
    });
  }
}

async function handleMessage(t: ParsedTopic, raw: Buffer) {
  const node = await prisma.node.findUnique({
    where: { hardwareId: t.nodeHardwareId },
    select: { id: true, orgId: true },
  });
  if (!node || node.orgId !== t.orgId) return;
  // On stocke le ciphertext brut. MAILLON ne possède pas la clé.
  // Copie vers un ArrayBuffer pur (Prisma `Bytes` refuse SharedArrayBuffer en Node 22+).
  const payload = new Uint8Array(raw.byteLength);
  payload.set(raw);
  await prisma.message.create({
    data: {
      orgId: node.orgId,
      nodeFrom: t.nodeHardwareId,
      contentEncrypted: payload,
      ts: new Date(),
    },
  });
}

const client = mqtt.connect(BROKER_URL, {
  username: MQTT_USER,
  password: MQTT_PASS,
  reconnectPeriod: 5000,
  clientId: `maillon-bridge-${process.pid}`,
  clean: true,
});

client.on("connect", () => {
  const topic = `${TOPIC_ROOT}/+/+/+`;
  client.subscribe(topic, { qos: 1 }, (err) => {
    if (err) {
      console.error("[bridge] subscribe fail", err);
      process.exit(1);
    }
    console.log(`[bridge] connecté → ${BROKER_URL}, abonné ${topic}`);
  });
});

client.on("message", async (topic, payload) => {
  const parsed = parseTopic(topic);
  if (!parsed) return;
  try {
    switch (parsed.kind) {
      case "position": {
        const p = decodePosition(payload);
        if (p) await handlePosition(parsed, p);
        break;
      }
      case "telemetry": {
        const p = decodeTelemetry(payload);
        if (p) await handleTelemetry(parsed, p);
        break;
      }
      case "message": {
        await handleMessage(parsed, payload);
        break;
      }
      default:
        // Topics inconnus ignorés silencieusement.
        break;
    }
  } catch (e) {
    console.error("[bridge] handler error", topic, e);
  }
});

client.on("error", (err) => console.error("[bridge] mqtt error", err));
client.on("close", () => console.warn("[bridge] connexion fermée"));

async function shutdown() {
  console.log("[bridge] arrêt…");
  client.end(true);
  await prisma.$disconnect();
  process.exit(0);
}

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
