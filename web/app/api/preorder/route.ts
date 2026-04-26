import { NextResponse } from "next/server";
import { promises as fs } from "node:fs";
import path from "node:path";
import { rateLimit, getClientIp } from "@lib/rate-limit";

/**
 * Stockage minimal en JSON sur disque pour le MVP.
 * À remplacer par Supabase / Postgres dès la sortie de pré-commande.
 *
 * Validation manuelle (pas de zod en MVP, dépendances volontairement minimales).
 */

const VALID_INTERESTS = new Set([
  "decouverte",
  "pro",
  "secours",
  "sur-mesure",
]);

const VALID_USAGES = new Set([
  "outdoor",
  "secours",
  "btp",
  "evenement",
  "agri",
  "maritime",
  "autre",
]);

function isValidEmail(value: string): boolean {
  if (typeof value !== "string") return false;
  if (value.length > 320) return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

const DATA_FILE = path.join(process.cwd(), ".data", "preorders.jsonl");

async function append(record: unknown): Promise<void> {
  const dir = path.dirname(DATA_FILE);
  await fs.mkdir(dir, { recursive: true });
  await fs.appendFile(DATA_FILE, JSON.stringify(record) + "\n", "utf8");
}

export async function POST(req: Request) {
  const ip = getClientIp(req);
  const rl = rateLimit({ ip, key: "preorder", limit: 5, windowMs: 60_000 });
  if (!rl.ok) {
    return NextResponse.json(
      { error: "Trop de requêtes. Réessayez dans une minute." },
      {
        status: 429,
        headers: {
          "Retry-After": String(Math.ceil((rl.resetAt - Date.now()) / 1000)),
          "X-RateLimit-Remaining": String(rl.remaining),
        },
      }
    );
  }

  let payload: { email?: unknown; interest?: unknown; usage?: unknown };

  try {
    payload = await req.json();
  } catch {
    return NextResponse.json(
      { error: "Format JSON invalide." },
      { status: 400 }
    );
  }

  const email = typeof payload.email === "string" ? payload.email.trim() : "";
  const interest = typeof payload.interest === "string" ? payload.interest : "";
  const usage = typeof payload.usage === "string" ? payload.usage : "";

  if (!isValidEmail(email)) {
    return NextResponse.json(
      { error: "Email invalide." },
      { status: 400 }
    );
  }

  if (!VALID_INTERESTS.has(interest)) {
    return NextResponse.json(
      { error: "Choix de kit invalide." },
      { status: 400 }
    );
  }

  if (!VALID_USAGES.has(usage)) {
    return NextResponse.json(
      { error: "Usage invalide." },
      { status: 400 }
    );
  }

  const record = {
    email,
    interest,
    usage,
    at: new Date().toISOString(),
    ip: req.headers.get("x-forwarded-for") ?? "n/a",
    ua: req.headers.get("user-agent") ?? "n/a",
  };

  try {
    await append(record);
  } catch {
    return NextResponse.json(
      { error: "Erreur serveur, réessayez plus tard." },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true }, { status: 201 });
}
