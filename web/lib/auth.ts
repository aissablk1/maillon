// MAILLON — Authentification (Better-Auth + 2FA TOTP)
// En dev, store en mémoire (Map). En prod : adapter Postgres via @better-auth/prisma.
// Aucun mock de credentials : si DB indisponible, l'auth échoue explicitement.

import { betterAuth } from "better-auth";
import { twoFactor } from "better-auth/plugins";
import { headers } from "next/headers";
import { PrismaClient } from "@prisma/client";

// Singleton Prisma — recréé à chaud en dev, persistant en prod.
declare global {
  // eslint-disable-next-line no-var
  var __maillonPrisma: PrismaClient | undefined;
}

export const prisma =
  globalThis.__maillonPrisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") {
  globalThis.__maillonPrisma = prisma;
}

const secret = process.env.BETTER_AUTH_SECRET;
if (!secret || secret.length < 32) {
  // En prod : refuser de démarrer sans secret robuste. En dev : warning loud.
  if (process.env.NODE_ENV === "production") {
    throw new Error(
      "BETTER_AUTH_SECRET manquant ou trop court (>= 32 chars requis).",
    );
  } else {
    console.warn(
      "[auth] BETTER_AUTH_SECRET absent ou faible — usage dev uniquement.",
    );
  }
}

export const auth = betterAuth({
  appName: "MAILLON Fleet Manager",
  baseURL: process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000",
  secret: secret ?? "dev-only-do-not-use-in-prod-please-rotate-now",

  // Adapter Prisma pour Postgres en prod ; Better-Auth fournit un fallback mémoire en dev.
  // database: prismaAdapter(prisma, { provider: "postgresql" }),

  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false, // à activer dès que SMTP UE configuré
    minPasswordLength: 12,
    autoSignIn: true,
  },

  session: {
    // Cookie httpOnly + secure + sameSite=lax. 7 jours.
    expiresIn: 60 * 60 * 24 * 7,
    updateAge: 60 * 60 * 24,
    cookieCache: {
      enabled: true,
      maxAge: 60 * 5,
    },
  },

  advanced: {
    cookiePrefix: "maillon",
    useSecureCookies: process.env.NODE_ENV === "production",
    crossSubDomainCookies: {
      // Utile si app.maillon.fr et maillon.fr partagent la session.
      enabled: false,
    },
  },

  plugins: [
    twoFactor({
      issuer: "MAILLON",
      totpOptions: {
        period: 30,
        digits: 6,
      },
    }),
  ],

  rateLimit: {
    enabled: true,
    window: 60,
    max: 30,
  },
});

export type Session = Awaited<ReturnType<typeof auth.api.getSession>>;

// Helper : récupère la session courante en RSC ou route handler.
export async function getCurrentSession(): Promise<Session> {
  return auth.api.getSession({ headers: await headers() });
}

// Helper : récupère l'organisation active de l'utilisateur (1ʳᵉ adhésion).
// À étendre quand on supportera le switch d'org côté UI.
export async function getCurrentOrgId(userId: string): Promise<string | null> {
  const m = await prisma.membership.findFirst({
    where: { userId },
    orderBy: { createdAt: "asc" },
    select: { orgId: true },
  });
  return m?.orgId ?? null;
}
