import Link from "next/link";
import { NodeStatus } from "@prisma/client";
import { getCurrentSession, getCurrentOrgId, prisma } from "@lib/auth";

// Liste des nœuds — Server Component, query Prisma directe.
// Tri/filtre simple via search params (?status=ACTIVE&q=...).

export const dynamic = "force-dynamic";

type SearchParams = Promise<{ status?: string; q?: string }>;

const STATUS_LABELS: Record<NodeStatus, string> = {
  PROVISIONED: "Pré-configuré",
  ACTIVE: "Actif",
  INACTIVE: "Inactif",
  LOST: "Perdu",
  DECOMMISSIONED: "Mis hors service",
};

const STATUS_COLOR: Record<NodeStatus, string> = {
  PROVISIONED: "text-[color:var(--color-phosphor-dim)]",
  ACTIVE: "text-[color:var(--color-uplink)]",
  INACTIVE: "text-[color:var(--color-phosphor-dim)]",
  LOST: "text-[color:var(--color-hazard)]",
  DECOMMISSIONED: "text-[color:var(--color-phosphor-dim)]",
};

function parseStatus(raw: string | undefined): NodeStatus | undefined {
  if (!raw) return undefined;
  return (Object.values(NodeStatus) as string[]).includes(raw)
    ? (raw as NodeStatus)
    : undefined;
}

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
  const status = parseStatus(typeof sp.status === "string" ? sp.status : undefined);
  const q = typeof sp.q === "string" ? sp.q.trim() : undefined;

  let nodes: Awaited<ReturnType<typeof prisma.node.findMany>> = [];
  let error: string | null = null;
  try {
    nodes = await prisma.node.findMany({
      where: {
        orgId,
        ...(status ? { status } : {}),
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
    <section aria-labelledby="nodes-heading">
      <header className="mb-8 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          <p className="font-mono text-[10px] tracking-[0.22em] uppercase text-[color:var(--color-hazard)] mb-3">
            Inventaire
          </p>
          <h1
            id="nodes-heading"
            className="font-mono text-[clamp(22px,3vw,32px)] text-[color:var(--color-phosphor)] font-bold leading-[1.2]"
          >
            Nœuds
          </h1>
        </div>
        <Link
          href="/app/nodes/new"
          className="btn-tactical btn-tactical-hazard text-[10px] py-2 px-4 self-start sm:self-auto"
        >
          <span>Enrôler un nœud</span>
          <span aria-hidden="true">{" ›"}</span>
        </Link>
      </header>

      <form
        className="mb-6 flex flex-col sm:flex-row gap-3"
        action="/app/nodes"
        method="GET"
        role="search"
        aria-label="Filtrer les nœuds"
      >
        <label className="flex-1">
          <span className="sr-only">Recherche par nom ou ID matériel</span>
          <input
            type="search"
            name="q"
            defaultValue={q ?? ""}
            placeholder="Nom ou ID matériel…"
            className="w-full bg-transparent border border-[color:var(--color-divider)] px-4 py-2 font-mono text-[13px] text-[color:var(--color-phosphor)] placeholder:text-[color:var(--color-phosphor-dim)]"
          />
        </label>
        <label className="sm:w-52">
          <span className="sr-only">Filtrer par statut</span>
          <select
            name="status"
            defaultValue={status ?? ""}
            className="w-full bg-[color:var(--color-substrate)] border border-[color:var(--color-divider)] px-4 py-2 font-mono text-[13px] text-[color:var(--color-phosphor)]"
          >
            <option value="">Tous statuts</option>
            {Object.entries(STATUS_LABELS).map(([k, v]) => (
              <option key={k} value={k}>
                {v}
              </option>
            ))}
          </select>
        </label>
        <button
          type="submit"
          className="btn-tactical text-[10px] py-2 px-4 self-stretch"
        >
          <span>Filtrer</span>
          <span aria-hidden="true">{" ›"}</span>
        </button>
      </form>

      {error ? (
        <div
          role="alert"
          className="border border-[color:var(--color-hazard)] bg-[color:var(--color-substrate-2)] p-5 font-mono text-[13px] text-[color:var(--color-hazard)]"
        >
          <span aria-hidden="true">[ ERR ] </span>
          {error}
        </div>
      ) : nodes.length === 0 ? (
        <p className="font-mono text-[13px] text-[color:var(--color-phosphor-dim)]">
          Aucun nœud enrôlé pour le moment.
        </p>
      ) : (
        <div className="border border-[color:var(--color-divider)] overflow-x-auto">
          <table className="w-full font-mono text-[13px] min-w-[640px]">
            <caption className="sr-only">
              Liste des nœuds Meshtastic enrôlés dans l&apos;organisation, triés par statut puis par dernière activité.
            </caption>
            <thead className="bg-[color:var(--color-substrate-2)]">
              <tr className="border-b border-[color:var(--color-divider)]">
                <th
                  scope="col"
                  className="text-left px-4 py-3 text-[10px] tracking-[0.18em] uppercase text-[color:var(--color-phosphor-dim)] font-bold"
                >
                  Nom
                </th>
                <th
                  scope="col"
                  className="text-left px-4 py-3 text-[10px] tracking-[0.18em] uppercase text-[color:var(--color-phosphor-dim)] font-bold"
                >
                  ID matériel
                </th>
                <th
                  scope="col"
                  className="text-left px-4 py-3 text-[10px] tracking-[0.18em] uppercase text-[color:var(--color-phosphor-dim)] font-bold"
                >
                  Type
                </th>
                <th
                  scope="col"
                  className="text-left px-4 py-3 text-[10px] tracking-[0.18em] uppercase text-[color:var(--color-phosphor-dim)] font-bold"
                >
                  Statut
                </th>
                <th
                  scope="col"
                  className="text-left px-4 py-3 text-[10px] tracking-[0.18em] uppercase text-[color:var(--color-phosphor-dim)] font-bold"
                >
                  Vu
                </th>
                <th
                  scope="col"
                  className="text-right px-4 py-3 text-[10px] tracking-[0.18em] uppercase text-[color:var(--color-phosphor-dim)] font-bold"
                >
                  Batterie
                </th>
              </tr>
            </thead>
            <tbody>
              {nodes.map((n) => (
                <tr
                  key={n.id}
                  className="border-b border-[color:var(--color-divider)] last:border-b-0 hover:bg-[color:var(--color-substrate-2)]"
                >
                  <th
                    scope="row"
                    className="px-4 py-3 font-bold text-[color:var(--color-phosphor)] text-left"
                  >
                    {n.name}
                  </th>
                  <td className="px-4 py-3 text-[color:var(--color-phosphor-dim)] tabular-nums text-[12px]">
                    {n.hardwareId}
                  </td>
                  <td className="px-4 py-3 text-[color:var(--color-phosphor-dim)]">
                    {n.type}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`text-[10px] uppercase tracking-[0.18em] font-bold ${STATUS_COLOR[n.status] ?? "text-[color:var(--color-phosphor-dim)]"}`}
                    >
                      {STATUS_LABELS[n.status] ?? n.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-[color:var(--color-phosphor-dim)] tabular-nums">
                    {n.lastSeenAt
                      ? new Date(n.lastSeenAt).toLocaleString("fr-FR")
                      : "—"}
                  </td>
                  <td className="px-4 py-3 text-right tabular-nums text-[color:var(--color-phosphor)]">
                    {n.lastBatteryPc != null ? `${n.lastBatteryPc} %` : "—"}
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
