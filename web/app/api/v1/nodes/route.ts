import { NextResponse } from "next/server";
import { z } from "zod";
import { getCurrentSession, getCurrentOrgId, prisma } from "@lib/auth";

// API REST v1 — gestion des nœuds (multi-tenant strict).
// Auth obligatoire : la session utilisateur est résolue côté serveur.
// Validation Zod sur toutes les entrées.

export const dynamic = "force-dynamic";

const NodeCreateSchema = z.object({
  hardwareId: z
    .string()
    .min(4)
    .max(32)
    .regex(/^[A-Fa-f0-9!_-]+$/, "ID matériel invalide"),
  name: z.string().min(1).max(80),
  type: z
    .enum(["HANDHELD", "FIXED_RELAY", "VEHICLE", "SENSOR", "GATEWAY"])
    .default("HANDHELD"),
  pskEncrypted: z.string().max(512).optional(),
});

async function requireOrg(): Promise<
  | { ok: true; userId: string; orgId: string }
  | { ok: false; res: NextResponse }
> {
  const session = await getCurrentSession();
  const userId = session?.user?.id;
  if (!userId) {
    return {
      ok: false,
      res: NextResponse.json({ error: "Non authentifié." }, { status: 401 }),
    };
  }
  const orgId = await getCurrentOrgId(userId);
  if (!orgId) {
    return {
      ok: false,
      res: NextResponse.json(
        { error: "Aucune organisation associée." },
        { status: 403 },
      ),
    };
  }
  return { ok: true, userId, orgId };
}

export async function GET(req: Request) {
  const ctx = await requireOrg();
  if (!ctx.ok) return ctx.res;

  const url = new URL(req.url);
  const status = url.searchParams.get("status") ?? undefined;
  const cursor = url.searchParams.get("cursor") ?? undefined;
  const limit = Math.min(Number(url.searchParams.get("limit") ?? 50), 200);

  try {
    const items = await prisma.node.findMany({
      where: {
        orgId: ctx.orgId,
        ...(status ? { status: status as never } : {}),
      },
      orderBy: { createdAt: "desc" },
      take: limit + 1,
      ...(cursor ? { cursor: { id: cursor }, skip: 1 } : {}),
    });

    const hasNext = items.length > limit;
    const page = hasNext ? items.slice(0, limit) : items;

    return NextResponse.json({
      data: page,
      cursor: {
        next: hasNext ? page[page.length - 1]?.id : null,
      },
    });
  } catch (e) {
    return NextResponse.json(
      {
        error: "Erreur base de données.",
        detail: e instanceof Error ? e.message : "unknown",
      },
      { status: 503 },
    );
  }
}

export async function POST(req: Request) {
  const ctx = await requireOrg();
  if (!ctx.ok) return ctx.res;

  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return NextResponse.json({ error: "JSON invalide." }, { status: 400 });
  }

  const parsed = NodeCreateSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation échouée.", issues: parsed.error.flatten() },
      { status: 422 },
    );
  }

  // Garde-fou quota (à raffiner par plan via prisma.organization.findUnique).
  // TODO : rate limit IP via lib/rate-limit (Redis BullMQ).
  try {
    const exists = await prisma.node.findUnique({
      where: { hardwareId: parsed.data.hardwareId },
      select: { id: true, orgId: true },
    });
    if (exists) {
      return NextResponse.json(
        { error: "Ce nœud est déjà enrôlé." },
        { status: 409 },
      );
    }

    const node = await prisma.node.create({
      data: {
        orgId: ctx.orgId,
        hardwareId: parsed.data.hardwareId,
        name: parsed.data.name,
        type: parsed.data.type,
        pskEncrypted: parsed.data.pskEncrypted,
        status: "PROVISIONED",
      },
    });

    await prisma.auditLog.create({
      data: {
        orgId: ctx.orgId,
        userId: ctx.userId,
        action: "node.create",
        target: node.id,
        ip: req.headers.get("x-forwarded-for") ?? null,
      },
    });

    return NextResponse.json({ data: node }, { status: 201 });
  } catch (e) {
    return NextResponse.json(
      {
        error: "Erreur serveur.",
        detail: e instanceof Error ? e.message : "unknown",
      },
      { status: 503 },
    );
  }
}
