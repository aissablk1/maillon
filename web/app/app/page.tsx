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
  if (!userId) return null;

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
    <section aria-labelledby="dashboard-heading">
      <header className="mb-10">
        <p className="font-mono text-[10px] tracking-[0.22em] uppercase text-[color:var(--color-hazard)] mb-3">
          Vue d&apos;ensemble
        </p>
        <h1
          id="dashboard-heading"
          className="font-mono text-[clamp(22px,3vw,32px)] text-[color:var(--color-phosphor)] font-bold leading-[1.2]"
        >
          Tableau de bord
        </h1>
        <p className="mt-2 font-mono text-[12px] text-[color:var(--color-phosphor-dim)]">
          Indicateurs en temps réel de votre flotte mesh.
        </p>
      </header>

      {error ? (
        <div
          role="alert"
          className="border border-[color:var(--color-hazard)] bg-[color:var(--color-substrate-2)] p-5 font-mono text-[13px]"
        >
          <p className="font-bold text-[color:var(--color-hazard)] mb-2">
            <span aria-hidden="true">[ ERR ] </span>Indicateurs indisponibles
          </p>
          <p className="text-[color:var(--color-phosphor-dim)] leading-[1.6]">
            {error} — vérifiez la connexion PostgreSQL et la variable
            d&apos;environnement <code className="bg-[color:var(--color-substrate)] border border-[color:var(--color-divider)] px-1.5 py-0.5">DATABASE_URL</code>.
          </p>
        </div>
      ) : counters ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-[color:var(--color-divider)] border border-[color:var(--color-divider)]">
          <Counter label="Nœuds enrôlés" value={counters.nodesTotal} />
          <Counter label="Nœuds actifs" value={counters.nodesActive} accent />
          <Counter
            label="Alertes ouvertes"
            value={counters.alertsOpen}
            danger={counters.alertsOpen > 0}
          />
          <Counter label="Positions 24 h" value={counters.positions24h} />
        </div>
      ) : null}

      <p className="mt-12 font-mono text-[12px] text-[color:var(--color-phosphor-dim)] leading-[1.65] max-w-2xl">
        Pour activer la carte temps réel et la messagerie, configurez le bridge
        MQTT&nbsp;:{" "}
        <code className="bg-[color:var(--color-substrate-2)] border border-[color:var(--color-divider)] px-1.5 py-0.5 text-[color:var(--color-phosphor)]">
          pnpm tsx lib/mqtt-bridge.ts
        </code>
        .
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
    <div className="bg-[color:var(--color-substrate)] p-5 lg:p-6">
      <p className="font-mono text-[10px] tracking-[0.18em] uppercase text-[color:var(--color-phosphor-dim)] font-bold">
        {label}
      </p>
      <p
        className={
          "mt-3 font-mono text-[clamp(24px,3vw,36px)] font-bold tabular-nums leading-none " +
          (danger
            ? "text-[color:var(--color-hazard)]"
            : accent
              ? "text-[color:var(--color-uplink)]"
              : "text-[color:var(--color-phosphor)]")
        }
      >
        {value.toLocaleString("fr-FR")}
      </p>
    </div>
  );
}
