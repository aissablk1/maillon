"use client";

import { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

const NAV_LINKS = [
  { href: "/#kits", label: "Kits" },
  { href: "/saas", label: "Console" },
  { href: "/cas-usage", label: "Terrain" },
  { href: "/communaute", label: "Réseau" },
  { href: "/contact", label: "Contact" },
];

export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const reduceMotion = useReducedMotion();
  const drawerId = useId();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  // ESC pour fermer + body scroll lock + focus initial
  useEffect(() => {
    if (!open) return;

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };

    document.addEventListener("keydown", handleEsc);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Focus initial sur le premier lien après l'animation
    const focusTimer = window.setTimeout(() => {
      firstLinkRef.current?.focus();
    }, reduceMotion ? 0 : 200);

    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = previousOverflow;
      window.clearTimeout(focusTimer);
    };
  }, [open, reduceMotion]);

  // Retour focus sur le trigger à la fermeture
  function handleClose() {
    setOpen(false);
    // Retour focus différé après la fin de l'animation
    window.setTimeout(() => {
      triggerRef.current?.focus();
    }, reduceMotion ? 0 : 220);
  }

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Ouvrir le menu de navigation"
        aria-expanded={open}
        aria-controls={drawerId}
        aria-haspopup="dialog"
        className="md:hidden inline-flex items-center justify-center w-11 h-11 border border-[color:var(--color-phosphor)] text-[color:var(--color-phosphor)] hover:bg-[color:var(--color-phosphor)] hover:text-[color:var(--color-substrate)] transition-colors duration-100"
      >
        <span aria-hidden="true" className="flex flex-col gap-[4px]">
          <span className="block w-[18px] h-[2px] bg-current" />
          <span className="block w-[18px] h-[2px] bg-current" />
          <span className="block w-[18px] h-[2px] bg-current" />
        </span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            id={drawerId}
            role="dialog"
            aria-modal="true"
            aria-label="Menu de navigation principal"
            initial={reduceMotion ? { opacity: 1 } : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.18, ease: "linear" }}
            className="fixed inset-0 z-[100] bg-[color:var(--color-substrate)] flex flex-col md:hidden"
          >
            {/* Header drawer — strip identique au header principal */}
            <div className="flex items-center justify-between px-6 py-3 border-b border-[color:var(--color-divider)]">
              <span className="flex items-center gap-3">
                <span className="uplink-indicator" aria-hidden="true" />
                <span className="font-mono text-[10px] tracking-[0.22em] text-[color:var(--color-phosphor)] font-bold uppercase">
                  MAILLON
                  <span className="text-[color:var(--color-phosphor-dim)]" aria-hidden="true">®</span>
                </span>
              </span>

              <button
                type="button"
                onClick={handleClose}
                aria-label="Fermer le menu"
                className="inline-flex items-center justify-center w-11 h-11 border border-[color:var(--color-hazard)] text-[color:var(--color-hazard)] hover:bg-[color:var(--color-hazard)] hover:text-[color:var(--color-substrate)] transition-colors duration-100 font-mono text-[18px] leading-none"
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>

            {/* Eyebrow tactique */}
            <div className="px-6 pt-8 pb-4 border-b border-[color:var(--color-divider)] flex items-center gap-3">
              <span className="font-mono text-[10px] tracking-[0.22em] uppercase text-[color:var(--color-hazard)]" aria-hidden="true">
                [ NAVIGATION&nbsp;/&nbsp;{NAV_LINKS.length}&nbsp;CHANNELS ]
              </span>
              <span aria-hidden="true" className="flex-1 border-t border-[color:var(--color-divider)]" />
            </div>

            {/* Liens en macro typo */}
            <nav aria-label="Menu principal" className="flex-1 overflow-y-auto px-6 py-8">
              <ul className="list-none p-0 m-0 space-y-1">
                {NAV_LINKS.map((link, i) => (
                  <motion.li
                    key={link.href}
                    initial={reduceMotion ? false : { opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      duration: reduceMotion ? 0 : 0.3,
                      delay: reduceMotion ? 0 : 0.08 + i * 0.04,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="grid grid-cols-[auto_1fr] gap-x-5 items-baseline border-b border-[color:var(--color-divider)] py-5"
                  >
                    <span
                      className="macro text-[clamp(20px,3vw,28px)] text-[color:var(--color-hazard)] tabular-nums leading-none"
                      aria-hidden="true"
                    >
                      /{String(i + 1).padStart(2, "0")}
                    </span>
                    <Link
                      ref={i === 0 ? firstLinkRef : undefined}
                      href={link.href}
                      onClick={handleClose}
                      className="macro text-[clamp(40px,8vw,72px)] text-[color:var(--color-phosphor)] hover:text-[color:var(--color-hazard)] focus-visible:text-[color:var(--color-hazard)] transition-colors duration-100 leading-[0.95] tap-target"
                    >
                      {link.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </nav>

            {/* Footer drawer — telemetry strip */}
            <div className="px-6 py-3 border-t border-[color:var(--color-divider)] flex items-center justify-between font-mono text-[10px] tracking-[0.2em] text-[color:var(--color-phosphor-dim)] uppercase">
              <span>EU&nbsp;868.0&nbsp;MHz</span>
              <span>ETSI&nbsp;EN&nbsp;300&nbsp;220</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
