// Middleware Next.js — protection des routes /app/*
// Ne déchiffre pas la session : laisse Better-Auth le faire en RSC.
// Ici, on vérifie uniquement la présence du cookie de session pour rediriger tôt.

import { NextRequest, NextResponse } from "next/server";

const SESSION_COOKIE = "maillon.session_token";
const SIGN_IN_PATH = "/auth/sign-in";

export function middleware(req: NextRequest) {
  const { pathname, search } = req.nextUrl;

  // Routes publiques (auth pages comprises) — passe-droit.
  if (
    pathname.startsWith("/auth") ||
    pathname.startsWith("/api/auth") ||
    pathname.startsWith("/api/v1/health")
  ) {
    return NextResponse.next();
  }

  // Toutes les routes /app/* doivent être authentifiées.
  if (pathname.startsWith("/app")) {
    const token = req.cookies.get(SESSION_COOKIE)?.value;
    if (!token) {
      const url = req.nextUrl.clone();
      url.pathname = SIGN_IN_PATH;
      url.searchParams.set("redirect", pathname + search);
      return NextResponse.redirect(url);
    }
  }

  // CSP & headers de sécurité minimaux pour les zones SaaS.
  const res = NextResponse.next();
  if (pathname.startsWith("/app") || pathname.startsWith("/api/v1")) {
    res.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
    res.headers.set("X-Content-Type-Options", "nosniff");
    res.headers.set("X-Frame-Options", "DENY");
    res.headers.set(
      "Permissions-Policy",
      "camera=(), microphone=(), geolocation=(self)",
    );
  }
  return res;
}

export const config = {
  matcher: [
    "/app/:path*",
    "/auth/:path*",
    "/api/v1/:path*",
  ],
};
