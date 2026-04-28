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
    <div className="min-h-screen flex flex-col bg-[color:var(--color-substrate)]">
      <header className="border-b border-[color:var(--color-divider)] bg-[color:var(--color-substrate)]">
        <div className="max-w-[1400px] mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/app"
              className="font-mono text-[11px] tracking-[0.22em] uppercase font-bold text-[color:var(--color-phosphor)] tap-target"
            >
              MAILLON
            </Link>
            <span className="font-mono text-[10px] tracking-[0.18em] uppercase text-[color:var(--color-hazard)] hidden sm:inline">
              <span lang="en">Fleet Manager</span>
            </span>
          </div>
          <div className="flex items-center gap-5 font-mono text-[12px]">
            <span className="hidden md:inline-flex items-center gap-2 text-[color:var(--color-phosphor-dim)]">
              <span className="text-[color:var(--color-phosphor)]">{org?.name ?? "Organisation"}</span>
              {org?.plan ? (
                <span className="text-[10px] tracking-[0.18em] uppercase text-[color:var(--color-hazard)] font-bold">
                  {org.plan.toLowerCase()}
                </span>
              ) : null}
            </span>
            <span className="hidden lg:inline text-[color:var(--color-phosphor-dim)] text-[11px]">
              {session.user.email}
            </span>
            <form action="/api/auth/sign-out" method="POST">
              <button
                type="submit"
                className="font-mono text-[11px] tracking-[0.05em] text-[color:var(--color-phosphor-dim)] hover:text-[color:var(--color-hazard)] tap-target"
              >
                Déconnexion
              </button>
            </form>
          </div>
        </div>
      </header>

      <div className="flex-1 max-w-[1400px] mx-auto w-full px-6 py-8 grid grid-cols-1 md:grid-cols-[220px_1fr] gap-6 md:gap-10">
        <nav
          aria-label="Navigation principale"
          className="space-y-1 md:border-r md:border-[color:var(--color-divider)] md:pr-6"
        >
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block px-3 py-2 font-mono text-[12px] text-[color:var(--color-phosphor-dim)] hover:bg-[color:var(--color-substrate-2)] hover:text-[color:var(--color-phosphor)] border-l-2 border-transparent hover:border-[color:var(--color-hazard)]"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <main id="main" className="min-w-0">
          {children}
        </main>
      </div>
    </div>
  );
}
