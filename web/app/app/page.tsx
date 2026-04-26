import { getCurrentSession, getCurrentOrgId, prisma } from "@lib/auth";

// Tableau de bord : compteurs réels (count nodes, alerts, positions 24 h).
// Aucune donnée d'exemple — si la DB est injoignable, on affiche l'erreur.

export const dynamic = "force-dynamic";

type Counters = {
  nodesTotal: number;
  nodesActive: number;
  alertsOpen: number;
  positions24h: number;
};

async function loadCounters(orgId: string): Promise<Counters> {
  const since = new Date(Date.now() - 24 * 60 * 60 * 1000);
  const [nodesTotal, nodesActive, alertsOpen, positions24h] = await Promise.all([
    prisma.node.count({ where: { orgId } }),
    prisma.node.count({ where: { orgId, status: "ACTIVE" } }),
    prisma.alert.count({ where: { orgId, ackAt: null } }),
    prisma.position.count({ where: { orgId, ts: { gte: since } } }),
  ]);
  return { nodesTotal, nodesActive, alertsOpen, positions24h };
}

export default async function DashboardPage() {
  const session = await getCurrentSession();
  const userId = session?.user?.id;
  if (!userId) return null; // le layout redirige déjà

  const orgId = await getCurrentOrgId(userId);
  if (!orgId) return null;

  let counters: Counters | null = null;
  let error: string | null = null;
  try {
    counters = await loadCounters(orgId);
  } catch (e) {
    error =
      e instanceof Error
        ? e.message
        : "Connexion à la base de données impossible.";
  }

  return (
    <section>
      <header className="mb-8">
        <p className="eyebrow text-[var(--color-moss)]">Vue d'ensemble</p>
        <h1 className="maillon-hero text-3xl mt-2">Tableau de bord</h1>
        <p className="text-sm text-[var(--color-charcoal)]/60 mt-1">
          Indicateurs en temps réel de votre flotte mesh.
        </p>
      </header>

      {error ? (
        <div
          role="alert"
          className="border border-[var(--color-danger)]/30 bg-[var(--color-danger)]/5 text-[var(--color-danger)] rounded-[var(--radius-card)] p-5"
        >
          <p className="font-semibold">Indicateurs indisponibles</p>
          <p className="text-sm mt-1 opacity-80">
            {error} — vérifiez la connexion PostgreSQL et les variables
            d'environnement DATABASE_URL.
          </p>
        </div>
      ) : counters ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Counter label="Nœuds enrôlés" value={counters.nodesTotal} />
          <Counter label="Nœuds actifs" value={counters.nodesActive} accent />
          <Counter label="Alertes ouvertes" value={counters.alertsOpen} danger={counters.alertsOpen > 0} />
          <Counter label="Positions 24 h" value={counters.positions24h} />
        </div>
      ) : null}

      <p className="mt-10 text-sm text-[var(--color-charcoal)]/60">
        Pour activer la carte temps réel et la messagerie, configurez le bridge
        MQTT&nbsp;: <code className="font-mono text-[13px]">pnpm tsx lib/mqtt-bridge.ts</code>.
      </p>
    </section>
  );
}

function Counter({
  label,
  value,
  accent,
  danger,
}: {
  label: string;
  value: number;
  accent?: boolean;
  danger?: boolean;
}) {
  return (
    <div className="kit-card rounded-[var(--radius-card)] p-5">
      <p className="text-xs uppercase tracking-[0.18em] text-[var(--color-charcoal)]/50 font-semibold">
        {label}
      </p>
      <p
        className={
          "mt-2 text-3xl font-semibold tabular-nums " +
          (danger
            ? "text-[var(--color-danger)]"
            : accent
              ? "text-[var(--color-moss)]"
              : "text-[var(--color-charcoal)]")
        }
      >
        {value.toLocaleString("fr-FR")}
      </p>
    </div>
  );
}
