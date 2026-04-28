"use client";

import { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";

const NAV_LINKS = [
  { href: "/#kits", label: "Kits" },
  { href: "/saas", label: "Console" },
  { href: "/cas-usage", label: "Terrain" },
  { href: "/communaute", label: "Réseau" },
  { href: "/contact", label: "Contact" },
];

export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const drawerId = useId();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  // Portal mounted check (évite l'hydratation mismatch SSR)
  useEffect(() => {
    setMounted(true);
  }, []);

  // ESC + Tab focus trap + body scroll lock + focus initial
  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        close();
        return;
      }

      // Focus trap WAI-ARIA Authoring Practices — modal dialog
      if (e.key !== "Tab") return;

      const drawer = document.getElementById(drawerId);
      if (!drawer) return;

      const focusables = drawer.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (focusables.length === 0) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      const active = document.activeElement;

      if (e.shiftKey && active === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Focus initial sur le bouton fermer (cible safe SSR + sortie évidente)
    const t = window.setTimeout(() => closeBtnRef.current?.focus(), 50);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
      window.clearTimeout(t);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, drawerId]);

  function close() {
    setOpen(false);
    window.setTimeout(() => triggerRef.current?.focus(), 30);
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
        className="md:hidden inline-flex items-center justify-center w-11 h-11 border border-[color:var(--color-phosphor)] text-[color:var(--color-phosphor)] hover:bg-[color:var(--color-phosphor)] hover:text-[color:var(--color-substrate)]"
        style={{ transitionProperty: "background-color, color", transitionDuration: "100ms" }}
      >
        <span aria-hidden="true" className="flex flex-col gap-[4px]">
          <span className="block w-[18px] h-[2px] bg-current" />
          <span className="block w-[18px] h-[2px] bg-current" />
          <span className="block w-[18px] h-[2px] bg-current" />
        </span>
      </button>

      {mounted && open
        ? createPortal(
            <div
              id={drawerId}
              role="dialog"
              aria-modal="true"
              aria-label="Menu de navigation"
              // Couleur inline pour éliminer tout risque Tailwind v4 / stacking context
              style={{
                position: "fixed",
                inset: 0,
                zIndex: 2147483647, // max safe int → toujours au-dessus
                backgroundColor: "#0A0A0A",
                color: "#EAEAEA",
                display: "flex",
                flexDirection: "column",
                fontFamily: "var(--font-mono), JetBrains Mono, IBM Plex Mono, monospace",
                animation: "maillon-menu-fadein 120ms linear",
              }}
            >
              {/* Bandeau supérieur du drawer — sticky en haut */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "12px 24px",
                  borderBottom: "1px solid #5A5A5A",
                  backgroundColor: "#0A0A0A",
                }}
              >
                <span style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <span className="uplink-indicator" aria-hidden="true" />
                  <span
                    style={{
                      fontSize: "10px",
                      letterSpacing: "0.22em",
                      textTransform: "uppercase",
                      fontWeight: 700,
                      color: "#EAEAEA",
                    }}
                  >
                    MAILLON
                    <span style={{ color: "#8A8A8A" }} aria-hidden="true">®</span>
                  </span>
                </span>

                <button
                  ref={closeBtnRef}
                  type="button"
                  onClick={close}
                  aria-label="Fermer le menu"
                  style={{
                    width: "44px",
                    height: "44px",
                    border: "1px solid #F23A3A",
                    color: "#F23A3A",
                    backgroundColor: "transparent",
                    fontSize: "20px",
                    lineHeight: 1,
                    cursor: "pointer",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transitionProperty: "background-color, color",
                    transitionDuration: "100ms",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "#F23A3A";
                    e.currentTarget.style.color = "#0A0A0A";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "transparent";
                    e.currentTarget.style.color = "#F23A3A";
                  }}
                >
                  <span aria-hidden="true">×</span>
                </button>
              </div>

              {/* Eyebrow tactique */}
              <div
                style={{
                  padding: "32px 24px 16px",
                  borderBottom: "1px solid #5A5A5A",
                  fontSize: "10px",
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  color: "#F23A3A",
                  fontWeight: 700,
                }}
                aria-hidden="true"
              >
                [ NAVIGATION&nbsp;/&nbsp;{NAV_LINKS.length}&nbsp;CHANNELS ]
              </div>

              {/* Liste des liens en macro typo — overflow auto si trop long */}
              <nav
                aria-label="Menu principal"
                style={{ flex: "1 1 auto", overflowY: "auto", padding: "16px 24px" }}
              >
                <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                  {NAV_LINKS.map((link, i) => (
                    <li
                      key={link.href}
                      style={{
                        display: "grid",
                        gridTemplateColumns: "auto 1fr",
                        gap: "20px",
                        alignItems: "baseline",
                        padding: "20px 0",
                        borderBottom: "1px solid #5A5A5A",
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "var(--font-archivo), Archivo Black, sans-serif",
                          fontWeight: 900,
                          fontSize: "clamp(20px, 3vw, 28px)",
                          color: "#F23A3A",
                          lineHeight: 1,
                          fontVariantNumeric: "tabular-nums",
                        }}
                        aria-hidden="true"
                      >
                        /{String(i + 1).padStart(2, "0")}
                      </span>
                      <Link
                        href={link.href}
                        onClick={close}
                        style={{
                          fontFamily: "var(--font-archivo), Archivo Black, sans-serif",
                          fontWeight: 900,
                          fontSize: "clamp(40px, 8vw, 64px)",
                          letterSpacing: "-0.04em",
                          textTransform: "uppercase",
                          lineHeight: 0.95,
                          color: "#EAEAEA",
                          textDecoration: "none",
                          minHeight: "44px",
                          display: "inline-flex",
                          alignItems: "center",
                        }}
                        className="maillon-mobile-link"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>

              {/* Footer drawer — telemetry */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "12px 24px",
                  borderTop: "1px solid #5A5A5A",
                  fontSize: "10px",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "#8A8A8A",
                }}
              >
                <span>EU&nbsp;868.0&nbsp;MHz</span>
                <span>ETSI&nbsp;EN&nbsp;300&nbsp;220</span>
              </div>

              {/* Keyframes inline (pas de dépendance Tailwind/Framer) */}
              <style>{`
                @keyframes maillon-menu-fadein {
                  from { opacity: 0; }
                  to   { opacity: 1; }
                }
                .maillon-mobile-link:hover,
                .maillon-mobile-link:focus-visible {
                  color: #F23A3A !important;
                }
                @media (prefers-reduced-motion: reduce) {
                  [role="dialog"][aria-modal="true"] {
                    animation: none !important;
                  }
                }
              `}</style>
            </div>,
            document.body,
          )
        : null}
    </>
  );
}
