import { NextResponse } from "next/server";
import { promises as fs } from "node:fs";
import path from "node:path";
import { rateLimit, getClientIp } from "@lib/rate-limit";

const SUBJECTS = new Set([
  "general",
  "kit-decouverte",
  "kit-pro",
  "kit-secours",
  "saas-demo",
  "saas-team",
  "saas-business",
  "saas-enterprise",
  "partenariat",
  "presse",
]);

function isValidEmail(value: string): boolean {
  if (typeof value !== "string") return false;
  if (value.length > 320) return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

const DATA_FILE = path.join(process.cwd(), ".data", "contact.jsonl");

async function append(record: unknown): Promise<void> {
  const dir = path.dirname(DATA_FILE);
  await fs.mkdir(dir, { recursive: true });
  await fs.appendFile(DATA_FILE, JSON.stringify(record) + "\n", "utf8");
}

export async function POST(req: Request) {
  const ip = getClientIp(req);
  const rl = rateLimit({ ip, key: "contact", limit: 3, windowMs: 60_000 });
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

  let payload: Record<string, unknown>;

  try {
    payload = (await req.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "Format JSON invalide." }, { status: 400 });
  }

  const name = typeof payload.name === "string" ? payload.name.trim() : "";
  const email = typeof payload.email === "string" ? payload.email.trim() : "";
  const organization =
    typeof payload.organization === "string" ? payload.organization.trim() : "";
  const subject = typeof payload.subject === "string" ? payload.subject : "";
  const message = typeof payload.message === "string" ? payload.message.trim() : "";

  if (name.length < 2 || name.length > 200) {
    return NextResponse.json({ error: "Nom invalide." }, { status: 400 });
  }
  if (!isValidEmail(email)) {
    return NextResponse.json({ error: "Email invalide." }, { status: 400 });
  }
  if (!SUBJECTS.has(subject)) {
    return NextResponse.json({ error: "Objet invalide." }, { status: 400 });
  }
  if (message.length < 10 || message.length > 5000) {
    return NextResponse.json(
      { error: "Le message doit contenir entre 10 et 5000 caractères." },
      { status: 400 }
    );
  }
  if (organization.length > 200) {
    return NextResponse.json(
      { error: "Nom d'organisation trop long." },
      { status: 400 }
    );
  }

  const record = {
    name,
    email,
    organization: organization || null,
    subject,
    message,
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
