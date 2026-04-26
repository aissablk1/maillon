import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@lib/auth";

// Ingestion de positions depuis le bridge MQTT (ou clients officiels).
// Auth = Bearer token applicatif (MQTT_INGEST_TOKEN). Pas de session cookie ici.
// Validation Zod stricte ; vérification ownership nœud → org.

export const dynamic = "force-dynamic";

const PositionSchema = z.object({
  nodeHardwareId: z.string().min(4).max(32),
  ts: z
    .string()
    .datetime({ offset: true })
    .or(z.number().int().positive()),
  lat: z.number().gte(-90).lte(90),
  lon: z.number().gte(-180).lte(180),
  altitudeM: z.number().optional(),
  accuracyM: z.number().nonnegative().optional(),
  source: z.enum(["MQTT", "BLE", "MANUAL", "IMPORT"]).default("MQTT"),
});

const BatchSchema = z.union([PositionSchema, z.array(PositionSchema).max(500)]);

function isAuthorized(req: Request): boolean {
  const token = process.env.MQTT_INGEST_TOKEN;
  if (!token) return false; // refus explicite si non configuré
  const header = req.headers.get("authorization") ?? "";
  return header === `Bearer ${token}`;
}

export async function POST(req: Request) {
  if (!isAuthorized(req)) {
    return NextResponse.json(
      { error: "Token d'ingestion invalide." },
      { status: 401 },
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "JSON invalide." }, { status: 400 });
  }

  const parsed = BatchSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation échouée.", issues: parsed.error.flatten() },
      { status: 422 },
    );
  }

  const items = Array.isArray(parsed.data) ? parsed.data : [parsed.data];

  try {
    // Résolution ownership : on récupère tous les nœuds référencés en une requête.
    const hardwareIds = Array.from(new Set(items.map((i) => i.nodeHardwareId)));
    const nodes = await prisma.node.findMany({
      where: { hardwareId: { in: hardwareIds } },
      select: { id: true, hardwareId: true, orgId: true },
    });
    const map = new Map(nodes.map((n) => [n.hardwareId, n]));

    const rows = items
      .map((p) => {
        const n = map.get(p.nodeHardwareId);
        if (!n) return null;
        const ts = typeof p.ts === "number" ? new Date(p.ts) : new Date(p.ts);
        return {
          nodeId: n.id,
          orgId: n.orgId,
          ts,
          lat: p.lat,
          lon: p.lon,
          altitudeM: p.altitudeM ?? null,
          accuracyM: p.accuracyM ?? null,
          source: p.source,
        };
      })
      .filter((r): r is NonNullable<typeof r> => r !== null);

    if (rows.length === 0) {
      return NextResponse.json(
        { error: "Aucun nœud connu pour ce lot." },
        { status: 404 },
      );
    }

    // INSERT bulk + dénormalisation lastLat/lastLon/lastSeenAt.
    await prisma.$transaction([
      prisma.position.createMany({ data: rows, skipDuplicates: true }),
      ...rows.map((r) =>
        prisma.node.update({
          where: { id: r.nodeId },
          data: {
            lastSeenAt: r.ts,
            lastLat: r.lat,
            lastLon: r.lon,
            status: "ACTIVE",
          },
        }),
      ),
    ]);

    return NextResponse.json(
      { ingested: rows.length, skipped: items.length - rows.length },
      { status: 201 },
    );
  } catch (e) {
    return NextResponse.json(
      {
        error: "Erreur d'écriture base de données.",
        detail: e instanceof Error ? e.message : "unknown",
      },
      { status: 503 },
    );
  }
}
