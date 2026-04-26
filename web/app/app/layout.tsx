import { redirect } from "next/navigation";
import Link from "next/link";
import { getCurrentSession, getCurrentOrgId, prisma } from "@lib/auth";

// Layout du SaaS protégé MAILLON Fleet Manager.
// Server Component : la session est vérifiée à chaque requête côté serveur.

const NAV = [
  { href: "/app", label: "Tableau de bord" },
  { href: "/app/nodes", label: "Nœuds" },
  { href: "/app/map", label: "Carte" },
  { href: "/app/alerts", label: "Alertes" },
  { href: "/app/settings", label: "Réglages" },
];

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getCurrentSession();
  if (!session?.user) {
    redirect("/auth/sign-in?redirect=/app");
  }

  const orgId = await getCurrentOrgId(session.user.id);
  if (!orgId) {
    redirect("/auth/sign-up?step=org");
  }

  const org = await prisma.organization.findUnique({
    where: { id: orgId },
    select: { name: true, plan: true, slug: true },
  });

  return (
    <div className="min-h-screen flex flex-col bg-[var(--color-sand)]">
      <header className="border-b border-[rgba(26,31,28,0.08)] bg-white">
        <div className="max-w-[1400px] mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/app" className="font-semibold tracking-tight text-[var(--color-charcoal)]">
              MAILLON
            </Link>
            <span className="text-xs uppercase tracking-[0.18em] text-[var(--color-moss)] font-semibold">
              Fleet Manager
            </span>
          </div>
          <div className="flex items-center gap-4 text-sm">
            <span className="text-[var(--color-charcoal)]/70">
              {org?.name ?? "Organisation"}
              <span className="ml-2 text-xs uppercase tracking-wider text-[var(--color-moss)]">
                {org?.plan?.toLowerCase() ?? ""}
              </span>
            </span>
            <span className="text-[var(--color-charcoal)]/70">
              {session.user.email}
            </span>
            <form action="/api/auth/sign-out" method="POST">
              <button
                type="submit"
                className="text-[var(--color-charcoal)]/60 hover:text-[var(--color-charcoal)] transition-colors"
              >
                Déconnexion
              </button>
            </form>
          </div>
        </div>
      </header>

      <div className="flex-1 max-w-[1400px] mx-auto w-full px-6 py-8 grid grid-cols-[220px_1fr] gap-10">
        <nav aria-label="Navigation principale" className="space-y-1">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block px-3 py-2 rounded text-sm text-[var(--color-charcoal)]/80 hover:bg-[var(--color-forest)]/5 hover:text-[var(--color-forest)] transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <main className="min-w-0">{children}</main>
      </div>
    </div>
  );
}
