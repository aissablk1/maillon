import { NextResponse } from "next/server";
import { prisma } from "@lib/auth";

// Endpoint santé public — pas d'auth, mais aucune fuite de détail interne.
// Utilisé par Uptime Kuma + load balancer Scaleway.

export const dynamic = "force-dynamic";

type CheckResult = "ok" | "degraded" | "down";

async function checkDatabase(): Promise<{ status: CheckResult; latencyMs?: number }> {
  const start = Date.now();
  try {
    await prisma.$queryRaw`SELECT 1`;
    const latencyMs = Date.now() - start;
    return { status: latencyMs > 500 ? "degraded" : "ok", latencyMs };
  } catch {
    return { status: "down" };
  }
}

async function checkMqtt(): Promise<{ status: CheckResult; reason?: string }> {
  const url = process.env.MQTT_BROKER_URL;
  if (!url) {
    return { status: "down", reason: "non_configuré" };
  }
  // Vérification légère : on s'attend à un broker MQTT joignable via TCP/TLS.
  // Sans état durable, on ne maintient pas de connexion — un check côté worker
  // (mqtt-bridge) est plus fiable. Ici on valide simplement la résolution URL.
  try {
    const u = new URL(url);
    if (!["mqtt:", "mqtts:", "ws:", "wss:"].includes(u.protocol)) {
      return { status: "degraded", reason: "schéma_inattendu" };
    }
    return { status: "ok" };
  } catch {
    return { status: "down", reason: "url_invalide" };
  }
}

export async function GET() {
  const [db, mqtt] = await Promise.all([checkDatabase(), checkMqtt()]);

  const overall: CheckResult =
    db.status === "down" || mqtt.status === "down"
      ? "down"
      : db.status === "degraded" || mqtt.status === "degraded"
        ? "degraded"
        : "ok";

  return NextResponse.json(
    {
      status: overall,
      checkedAt: new Date().toISOString(),
      services: { db, mqtt },
      version: process.env.npm_package_version ?? null,
    },
    { status: overall === "down" ? 503 : 200 },
  );
}
