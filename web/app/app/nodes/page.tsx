import Link from "next/link";
import { getCurrentSession, getCurrentOrgId, prisma } from "@lib/auth";

// Liste des nœuds — Server Component, query Prisma directe.
// Tri/filtre simple via search params (?status=ACTIVE&q=...).

export const dynamic = "force-dynamic";

type SearchParams = Promise<{ status?: string; q?: string }>;

const STATUS_LABELS: Record<string, string> = {
  PROVISIONED: "Pré-configuré",
  ACTIVE: "Actif",
  INACTIVE: "Inactif",
  LOST: "Perdu",
  DECOMMISSIONED: "Mis hors service",
};

export default async function NodesPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const session = await getCurrentSession();
  const userId = session?.user?.id;
  if (!userId) return null;
  const orgId = await getCurrentOrgId(userId);
  if (!orgId) return null;

  const sp = await searchParams;
  const status = typeof sp.status === "string" ? sp.status : undefined;
  const q = typeof sp.q === "string" ? sp.q.trim() : undefined;

  let nodes: Awaited<ReturnType<typeof prisma.node.findMany>> = [];
  let error: string | null = null;
  try {
    nodes = await prisma.node.findMany({
      where: {
        orgId,
        ...(status && status in STATUS_LABELS
          ? { status: status as keyof typeof STATUS_LABELS }
          : {}),
        ...(q
          ? {
              OR: [
                { name: { contains: q, mode: "insensitive" } },
                { hardwareId: { contains: q, mode: "insensitive" } },
              ],
            }
          : {}),
      },
      orderBy: [{ status: "asc" }, { lastSeenAt: "desc" }],
      take: 200,
    });
  } catch (e) {
    error =
      e instanceof Error
        ? e.message
        : "Connexion à la base de données impossible.";
  }

  return (
    <section>
      <header className="mb-8 flex items-end justify-between gap-6">
        <div>
          <p className="eyebrow text-[var(--color-moss)]">Inventaire</p>
          <h1 className="maillon-hero text-3xl mt-2">Nœuds</h1>
        </div>
        <Link
          href="/app/nodes/new"
          className="btn-primary bg-[var(--color-forest)] text-[var(--color-sand)] px-4 py-2 rounded text-sm font-medium"
        >
          Enrôler un nœud
        </Link>
      </header>

      <form className="mb-6 flex gap-3" action="/app/nodes" method="GET">
        <input
          type="search"
          name="q"
          defaultValue={q ?? ""}
          placeholder="Nom ou ID matériel…"
          className="flex-1 px-3 py-2 border border-[rgba(26,31,28,0.12)] rounded text-sm bg-white"
        />
        <select
          name="status"
          defaultValue={status ?? ""}
          className="px-3 py-2 border border-[rgba(26,31,28,0.12)] rounded text-sm bg-white"
        >
          <option value="">Tous statuts</option>
          {Object.entries(STATUS_LABELS).map(([k, v]) => (
            <option key={k} value={k}>{v}</option>
          ))}
        </select>
        <button type="submit" className="px-4 py-2 border border-[var(--color-forest)] text-[var(--color-forest)] rounded text-sm">
          Filtrer
        </button>
      </form>

      {error ? (
        <div role="alert" className="border border-[var(--color-danger)]/30 bg-[var(--color-danger)]/5 text-[var(--color-danger)] rounded p-5 text-sm">
          {error}
        </div>
      ) : nodes.length === 0 ? (
        <p className="text-sm text-[var(--color-charcoal)]/60">
          Aucun nœud enrôlé pour le moment.
        </p>
      ) : (
        <div className="bg-white border border-[rgba(26,31,28,0.08)] rounded-[var(--radius-card)] overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-[var(--color-sand)]/50 text-left text-xs uppercase tracking-wider text-[var(--color-charcoal)]/60">
              <tr>
                <th className="px-4 py-3">Nom</th>
                <th className="px-4 py-3">ID matériel</th>
                <th className="px-4 py-3">Type</th>
                <th className="px-4 py-3">Statut</th>
                <th className="px-4 py-3">Vu</th>
                <th className="px-4 py-3 text-right">Batterie</th>
              </tr>
            </thead>
            <tbody>
              {nodes.map((n) => (
                <tr key={n.id} className="border-t border-[rgba(26,31,28,0.06)]">
                  <td className="px-4 py-3 font-medium">{n.name}</td>
                  <td className="px-4 py-3 font-mono text-xs">{n.hardwareId}</td>
                  <td className="px-4 py-3 text-[var(--color-charcoal)]/70">{n.type}</td>
                  <td className="px-4 py-3">
                    <span className="text-xs uppercase tracking-wider text-[var(--color-moss)] font-semibold">
                      {STATUS_LABELS[n.status] ?? n.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-[var(--color-charcoal)]/70">
                    {n.lastSeenAt
                      ? new Date(n.lastSeenAt).toLocaleString("fr-FR")
                      : "—"}
                  </td>
                  <td className="px-4 py-3 text-right tabular-nums">
                    {n.lastBatteryPc != null ? `${n.lastBatteryPc} %` : "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
