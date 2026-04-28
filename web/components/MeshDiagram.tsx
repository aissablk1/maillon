"use client";

import { useReducedMotion } from "motion/react";

/**
 * Diagramme mesh — visuel hero CRT terminal.
 * SVG client-side ; les <animate> SMIL sont conditionnés sur prefers-reduced-motion
 * (les @media CSS ne pilotent pas les animations SMIL).
 */
export function MeshDiagram() {
  const reduceMotion = useReducedMotion();

  const nodes: { id: string; x: number; y: number; label: string; alert?: boolean }[] = [
    { id: "n1", x: 100, y: 80, label: "RELAIS-A", alert: true },
    { id: "n2", x: 240, y: 60, label: "REFUGE-01" },
    { id: "n3", x: 60, y: 220, label: "VALLON-N" },
    { id: "n4", x: 200, y: 200, label: "PC-BASE" },
    { id: "n5", x: 340, y: 180, label: "MOBILE-3" },
    { id: "n6", x: 140, y: 340, label: "PATR-2" },
    { id: "n7", x: 320, y: 320, label: "RELAIS-B" },
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
    <figure className="border border-[color:var(--color-divider)] bg-[color:var(--color-substrate-2)] relative m-0">
      {/* Coordonnées tactiques en coin (purement décoratives) */}
      <div className="absolute top-3 left-3 font-mono text-[10px] tracking-[0.18em] text-[color:var(--color-phosphor-dim)] uppercase z-10" aria-hidden="true">
        [ MESH&nbsp;/&nbsp;7&nbsp;NODES ]
      </div>
      <div className="absolute top-3 right-3 font-mono text-[10px] tracking-[0.15em] text-[color:var(--color-hazard)] z-10" aria-hidden="true">
        LIVE&nbsp;{">>>"}
      </div>
      <div className="absolute bottom-3 left-3 font-mono text-[10px] tracking-[0.18em] text-[color:var(--color-phosphor-dim)] uppercase z-10" aria-hidden="true">
        EU_868 / LF / HOP_3
      </div>
      <div className="absolute bottom-3 right-3 font-mono text-[10px] tracking-[0.15em] text-[color:var(--color-phosphor-dim)] z-10 tabular-nums" aria-hidden="true">
        45.832°N / 6.864°E
      </div>

      <svg
        viewBox="0 0 400 400"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto"
        role="img"
        aria-labelledby="mesh-title mesh-desc"
      >
        <title id="mesh-title">Réseau mesh à 7 nœuds</title>
        <desc id="mesh-desc">
          Diagramme schématique d&apos;un réseau mesh MAILLON composé de sept nœuds —
          relais, refuge, vallon, PC base, mobile, patrouille, second relais — connectés
          entre eux par douze liaisons radio longue portée. Le nœud relais principal est
          marqué en rouge pour signaler une alerte simulée.
        </desc>

        {/* Grille technique de fond */}
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(234,234,234,0.04)" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="400" height="400" fill="url(#grid)" />

        {/* Liens — pointillé phosphore avec animation flow (coupée si reduced motion) */}
        <g stroke="var(--color-divider)" strokeWidth="1">
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
                strokeDasharray="2 4"
              >
                {!reduceMotion && (
                  <animate
                    attributeName="stroke-dashoffset"
                    from="0"
                    to="-12"
                    dur={`${2.5 + (i % 4) * 0.5}s`}
                    repeatCount="indefinite"
                  />
                )}
              </line>
            );
          })}
        </g>

        {/* Nœuds — carrés tactiques */}
        {nodes.map((n) => (
          <g key={n.id}>
            {/* Crosshair */}
            <line
              x1={n.x - 12}
              y1={n.y}
              x2={n.x + 12}
              y2={n.y}
              stroke={n.alert ? "var(--color-hazard)" : "var(--color-phosphor-dim)"}
              strokeWidth="0.5"
            />
            <line
              x1={n.x}
              y1={n.y - 12}
              x2={n.x}
              y2={n.y + 12}
              stroke={n.alert ? "var(--color-hazard)" : "var(--color-phosphor-dim)"}
              strokeWidth="0.5"
            />
            {/* Carré nœud */}
            <rect
              x={n.x - 4}
              y={n.y - 4}
              width="8"
              height="8"
              fill={n.alert ? "var(--color-hazard)" : "var(--color-phosphor)"}
            />
            {/* Label monospace */}
            <text
              x={n.x + 14}
              y={n.y + 3}
              fontSize="8"
              fontFamily="var(--font-mono)"
              fill={n.alert ? "var(--color-hazard)" : "var(--color-phosphor-dim)"}
              letterSpacing="0.15em"
            >
              {n.label}
            </text>
          </g>
        ))}
      </svg>
    </figure>
  );
}
