import { useCallback, useEffect, useMemo, useState } from "react";
import { invoke } from "@tauri-apps/api/core";
import type { MeshNode } from "./types/node";

type NavKey = "dashboard" | "nodes" | "messages" | "settings";

type NavItem = {
  key: NavKey;
  label: string;
  hint: string;
};

// Espace insécable (U+00A0) + chevron français (U+203A)
const CHEV = " ›";
// Caractère ellipse (U+2026)
const ELLIPSIS = "…";

const NAV_ITEMS: readonly NavItem[] = [
  { key: "dashboard", label: "Tableau de bord", hint: "Vue d'ensemble du réseau" },
  { key: "nodes", label: "Nœuds", hint: "Flotte connectée" },
  { key: "messages", label: "Messages", hint: "Canaux et conversations" },
  { key: "settings", label: "Réglages", hint: "Configuration de la console" },
] as const;

export default function App() {
  const [activeNav, setActiveNav] = useState<NavKey>("dashboard");
  const [nodes, setNodes] = useState<MeshNode[]>([]);
  const [scanning, setScanning] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const refreshNodes = useCallback(async () => {
    setScanning(true);
    setError(null);
    try {
      const result = await invoke<MeshNode[]>("scan_devices");
      setNodes(result);
    } catch (err) {
      // Erreur typée depuis Rust (AppError) — sérialisée en { kind, message }
      const message =
        typeof err === "object" && err !== null && "message" in err
          ? String((err as { message: unknown }).message)
          : String(err);
      setError(message);
    } finally {
      setScanning(false);
    }
  }, []);

  useEffect(() => {
    void refreshNodes();
  }, [refreshNodes]);

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-charcoal text-sand">
      <Sidebar active={activeNav} onNavigate={setActiveNav} />
      <main className="flex-1 overflow-y-auto">
        <Topbar onRefresh={refreshNodes} scanning={scanning} />
        <section className="px-8 py-6">
          {activeNav === "dashboard" && (
            <Dashboard nodes={nodes} scanning={scanning} error={error} />
          )}
          {activeNav !== "dashboard" && <Placeholder section={activeNav} />}
        </section>
      </main>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Sidebar
// ---------------------------------------------------------------------------

function Sidebar({
  active,
  onNavigate,
}: {
  active: NavKey;
  onNavigate: (key: NavKey) => void;
}) {
  return (
    <aside className="flex w-64 flex-col border-r border-white/5 bg-forest/40 backdrop-blur">
      <header className="px-6 py-6">
        <div className="flex items-center gap-3">
          <BrandMark />
          <div>
            <p className="text-base font-semibold tracking-wide text-sand">
              MAILLON
            </p>
            <p className="text-xs text-sand/60">Console opérateur</p>
          </div>
        </div>
      </header>

      <nav className="flex-1 px-3">
        <ul className="space-y-1">
          {NAV_ITEMS.map((item) => {
            const isActive = item.key === active;
            return (
              <li key={item.key}>
                <button
                  type="button"
                  onClick={() => onNavigate(item.key)}
                  className={[
                    "group flex w-full flex-col items-start gap-0.5 rounded-md px-3 py-2 text-left transition",
                    isActive
                      ? "bg-moss/20 text-sand"
                      : "text-sand/70 hover:bg-white/5 hover:text-sand",
                  ].join(" ")}
                >
                  <span className="text-sm font-medium">{item.label}</span>
                  <span className="text-xs text-sand/50">{item.hint}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      <footer className="border-t border-white/5 px-6 py-4">
        <p className="text-xs text-sand/50">
          Réseau mesh souverain {ELLIPSIS}
        </p>
        <p className="mt-1 text-xs font-mono text-moss">v0.1.0</p>
      </footer>
    </aside>
  );
}

function BrandMark() {
  return (
    <div className="flex h-9 w-9 items-center justify-center rounded-md bg-moss text-charcoal">
      <span className="font-mono text-sm font-bold">M</span>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Topbar
// ---------------------------------------------------------------------------

function Topbar({
  onRefresh,
  scanning,
}: {
  onRefresh: () => void;
  scanning: boolean;
}) {
  return (
    <header className="flex items-center justify-between border-b border-white/5 px-8 py-4">
      <div>
        <h1 className="text-xl font-semibold tracking-tight">
          Tableau de bord
        </h1>
        <p className="text-sm text-sand/60">
          Supervision temps réel du réseau mesh
        </p>
      </div>
      <button
        type="button"
        onClick={onRefresh}
        disabled={scanning}
        className="inline-flex items-center gap-2 rounded-md bg-signal px-4 py-2 text-sm font-medium text-charcoal transition hover:bg-signal/90 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {scanning ? `Scan en cours${ELLIPSIS}` : `Rafraîchir${CHEV}`}
      </button>
    </header>
  );
}

// ---------------------------------------------------------------------------
// Tableau de bord
// ---------------------------------------------------------------------------

function Dashboard({
  nodes,
  scanning,
  error,
}: {
  nodes: MeshNode[];
  scanning: boolean;
  error: string | null;
}) {
  const stats = useMemo(() => {
    const online = nodes.filter((n) => n.isOnline).length;
    return { total: nodes.length, online, offline: nodes.length - online };
  }, [nodes]);

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <StatCard label="Nœuds détectés" value={stats.total} accent="moss" />
        <StatCard label="En ligne" value={stats.online} accent="moss" />
        <StatCard label="Hors ligne" value={stats.offline} accent="warning" />
      </div>

      <NodesPanel nodes={nodes} scanning={scanning} error={error} />
    </div>
  );
}

function StatCard({
  label,
  value,
  accent,
}: {
  label: string;
  value: number;
  accent: "moss" | "warning";
}) {
  const accentClass = accent === "moss" ? "text-moss" : "text-warning";
  return (
    <div className="rounded-lg border border-white/5 bg-forest/30 p-5">
      <p className="text-xs uppercase tracking-wider text-sand/50">{label}</p>
      <p className={`mt-2 font-mono text-3xl font-semibold ${accentClass}`}>
        {value.toString().padStart(2, "0")}
      </p>
    </div>
  );
}

function NodesPanel({
  nodes,
  scanning,
  error,
}: {
  nodes: MeshNode[];
  scanning: boolean;
  error: string | null;
}) {
  return (
    <section className="rounded-lg border border-white/5 bg-forest/20">
      <header className="flex items-center justify-between border-b border-white/5 px-5 py-3">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-sand/70">
          Nœuds connectés
        </h2>
        <span className="font-mono text-xs text-sand/50">
          {nodes.length} entrée{nodes.length > 1 ? "s" : ""}
        </span>
      </header>

      {error && (
        <div className="border-b border-danger/30 bg-danger/10 px-5 py-3 text-sm text-danger">
          {error}
        </div>
      )}

      {nodes.length === 0 ? (
        <EmptyState scanning={scanning} />
      ) : (
        <ul className="divide-y divide-white/5">
          {nodes.map((node) => (
            <NodeRow key={node.nodeNum} node={node} />
          ))}
        </ul>
      )}
    </section>
  );
}

function EmptyState({ scanning }: { scanning: boolean }) {
  return (
    <div className="flex flex-col items-center justify-center px-5 py-16 text-center">
      <div className="mb-4 h-12 w-12 rounded-full border border-dashed border-sand/20" />
      <p className="text-sm font-medium text-sand">
        {scanning ? `Recherche de nœuds${ELLIPSIS}` : "Aucun nœud détecté"}
      </p>
      <p className="mt-2 max-w-sm text-xs text-sand/50">
        Branchez un nœud Meshtastic en USB ou activez le Bluetooth pour
        l'apparier à la console.
      </p>
    </div>
  );
}

function NodeRow({ node }: { node: MeshNode }) {
  const dotClass = node.isOnline ? "bg-moss" : "bg-sand/30";
  return (
    <li className="flex items-center justify-between px-5 py-3 hover:bg-white/[0.02]">
      <div className="flex items-center gap-3">
        <span className={`h-2 w-2 rounded-full ${dotClass}`} aria-hidden="true" />
        <div>
          <p className="text-sm font-medium text-sand">{node.longName}</p>
          <p className="font-mono text-xs text-sand/50">!{node.nodeNum.toString(16).padStart(8, "0")}</p>
        </div>
      </div>
      <div className="flex items-center gap-6 text-xs text-sand/60">
        {node.batteryLevel !== null && (
          <span className="font-mono">{node.batteryLevel}{" "}%</span>
        )}
        {node.snr !== null && (
          <span className="font-mono">SNR{" "}{node.snr.toFixed(1)}{" "}dB</span>
        )}
      </div>
    </li>
  );
}

// ---------------------------------------------------------------------------
// Placeholder pour les sections non encore implémentées
// ---------------------------------------------------------------------------

function Placeholder({ section }: { section: NavKey }) {
  const labels: Record<NavKey, string> = {
    dashboard: "Tableau de bord",
    nodes: "Nœuds",
    messages: "Messages",
    settings: "Réglages",
  };
  return (
    <div className="rounded-lg border border-dashed border-white/10 bg-forest/10 px-8 py-16 text-center">
      <h2 className="text-lg font-semibold text-sand">{labels[section]}</h2>
      <p className="mt-2 text-sm text-sand/60">
        Module en cours d'implémentation{ELLIPSIS}
      </p>
    </div>
  );
}
