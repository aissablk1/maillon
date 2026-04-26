"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";
import { Children } from "react";

/**
 * Orchestration page-load unique.
 * Chaque enfant direct est révélé en stagger : translation Y subtile + opacity.
 * Respecte prefers-reduced-motion (rendu statique sans animation).
 *
 * Une seule timeline pour toute la page — règle anti-slop §7 :
 * "ONE orchestrated page load with staggered reveals beats 20 scattered hovers".
 */
export function HeroEntrance({ children }: { children: ReactNode }) {
  const reduced = useReducedMotion();

  if (reduced) {
    return <>{children}</>;
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
      }}
    >
      {Children.map(children, (child, i) => (
        <motion.div
          key={i}
          variants={{
            hidden: { opacity: 0, y: 12 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.5, ease: [0.2, 0.8, 0.2, 1] },
            },
          }}
        >
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
}
