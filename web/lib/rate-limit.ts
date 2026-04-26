/**
 * Rate limit en mémoire — fenêtre glissante, par IP.
 *
 * Suffisant pour MVP self-hosted. En production multi-instance,
 * remplacer le Map par Redis (BullMQ déjà prévu dans la stack).
 *
 * Usage côté route handler :
 *   const rl = await rateLimit({ ip, key: "preorder", limit: 5, windowMs: 60_000 });
 *   if (!rl.ok) return NextResponse.json({ error: "Trop de requêtes." }, { status: 429 });
 */

type WindowState = {
  count: number;
  resetAt: number;
};

const STORE = new Map<string, WindowState>();

const SWEEP_INTERVAL_MS = 60_000;
let lastSweepAt = 0;

function sweep(now: number): void {
  if (now - lastSweepAt < SWEEP_INTERVAL_MS) return;
  for (const [key, state] of STORE) {
    if (state.resetAt <= now) STORE.delete(key);
  }
  lastSweepAt = now;
}

export type RateLimitOptions = {
  ip: string;
  key: string;
  limit: number;
  windowMs: number;
};

export type RateLimitResult = {
  ok: boolean;
  remaining: number;
  resetAt: number;
};

export function rateLimit(opts: RateLimitOptions): RateLimitResult {
  const now = Date.now();
  sweep(now);

  const bucket = `${opts.key}:${opts.ip}`;
  const existing = STORE.get(bucket);

  if (!existing || existing.resetAt <= now) {
    const fresh: WindowState = { count: 1, resetAt: now + opts.windowMs };
    STORE.set(bucket, fresh);
    return { ok: true, remaining: opts.limit - 1, resetAt: fresh.resetAt };
  }

  existing.count += 1;

  if (existing.count > opts.limit) {
    return { ok: false, remaining: 0, resetAt: existing.resetAt };
  }

  return {
    ok: true,
    remaining: opts.limit - existing.count,
    resetAt: existing.resetAt,
  };
}

/** Extrait l'IP cliente de manière sûre depuis les headers Next.js. */
export function getClientIp(req: Request): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim();
    if (first) return first;
  }
  return req.headers.get("x-real-ip") ?? "unknown";
}
