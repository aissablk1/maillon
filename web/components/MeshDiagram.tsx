/**
 * Diagramme mesh — visuel hero.
 * SVG pur, animé en CSS via .mesh-node (voir globals.css).
 * Représente 7 nœuds reliés en maillage avec liens animés.
 */
export function MeshDiagram() {
  const nodes: { id: string; x: number; y: number; label: string; color?: string }[] = [
    { id: "n1", x: 100, y: 80, label: "Sommet", color: "var(--color-signal)" },
    { id: "n2", x: 240, y: 60, label: "Refuge" },
    { id: "n3", x: 60, y: 220, label: "Vallée" },
    { id: "n4", x: 200, y: 200, label: "PC base" },
    { id: "n5", x: 340, y: 180, label: "Mobile" },
    { id: "n6", x: 140, y: 340, label: "Patrouille" },
    { id: "n7", x: 320, y: 320, label: "Relais" },
  ];

  const links: [string, string][] = [
    ["n1", "n2"],
    ["n1", "n3"],
    ["n1", "n4"],
    ["n2", "n4"],
    ["n2", "n5"],
    ["n3", "n4"],
    ["n3", "n6"],
    ["n4", "n5"],
    ["n4", "n6"],
    ["n4", "n7"],
    ["n5", "n7"],
    ["n6", "n7"],
  ];

  const nodeMap = Object.fromEntries(nodes.map((n) => [n.id, n]));

  return (
    <div
      role="img"
      aria-label="Diagramme animé : sept nœuds MAILLON connectés en maillage, simulant un réseau mesh longue portée"
      className="bg-white border border-[color:var(--color-charcoal)]/10 rounded-lg p-6 lg:p-8"
    >
      <svg
        viewBox="0 0 400 400"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto"
        aria-hidden
      >
        <defs>
          <radialGradient id="node-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="var(--color-moss)" stopOpacity="0.4" />
            <stop offset="100%" stopColor="var(--color-moss)" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Liens */}
        <g stroke="var(--color-forest)" strokeOpacity="0.25" strokeWidth="1.2">
          {links.map(([a, b], i) => {
            const A = nodeMap[a]!;
            const B = nodeMap[b]!;
            return (
              <line
                key={`${a}-${b}`}
                x1={A.x}
                y1={A.y}
                x2={B.x}
                y2={B.y}
                strokeDasharray="3 4"
              >
                <animate
                  attributeName="stroke-dashoffset"
                  from="0"
                  to="-14"
                  dur={`${3 + (i % 3) * 0.4}s`}
                  repeatCount="indefinite"
                />
              </line>
            );
          })}
        </g>

        {/* Nœuds */}
        {nodes.map((n) => (
          <g key={n.id}>
            <circle
              cx={n.x}
              cy={n.y}
              r={18}
              fill="url(#node-glow)"
              className="mesh-node"
              style={{ transformOrigin: `${n.x}px ${n.y}px` }}
            />
            <circle
              cx={n.x}
              cy={n.y}
              r={6}
              fill={n.color ?? "var(--color-forest)"}
            />
            <text
              x={n.x}
              y={n.y + 28}
              textAnchor="middle"
              fontSize="10"
              fontFamily="var(--font-mono)"
              fill="var(--color-charcoal)"
              opacity="0.6"
            >
              {n.label}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}
