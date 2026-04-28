import Link from "next/link";

export function SiteFooter() {
  const year = new Date().getFullYear();
  const buildDate = new Date().toISOString().slice(0, 10);

  return (
    <footer className="border-t border-[color:var(--color-divider)] mt-32" role="contentinfo">
      {/* Strip de transmission ASCII */}
      <div className="border-b border-[color:var(--color-divider)] py-3 px-6 lg:px-10 font-mono text-[10px] tracking-[0.2em] text-[color:var(--color-phosphor-dim)] uppercase flex flex-wrap items-center gap-x-6 gap-y-1">
        <span><span aria-hidden="true">{">>> "}</span>TRANSMISSION OK</span>
        <span>EU&nbsp;868.0–868.6&nbsp;MHz</span>
        <span>ETSI&nbsp;EN&nbsp;300&nbsp;220</span>
        <span>HOP_LIMIT=3</span>
        <span>DUTY_CYCLE&nbsp;1%</span>
        <span className="ml-auto">
          REV&nbsp;0.1.0&nbsp;/&nbsp;<time dateTime={buildDate}>{buildDate}</time>
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr] gap-6 px-6 lg:px-10 py-12 max-w-7xl mx-auto">
        <div>
          <p className="macro text-[clamp(48px,8vw,96px)] text-[color:var(--color-phosphor)] mb-4">
            MAILLON
            <span className="text-[color:var(--color-hazard)]" aria-hidden="true">.</span>
          </p>
          <p className="font-mono text-[13px] text-[color:var(--color-phosphor-dim)] max-w-md leading-relaxed">
            Communications mesh radio longue portée pour la France. Sans
            abonnement satellite, sans licence ARCEP, sans dépendance
            opérateur. Bande EU&nbsp;868&nbsp;MHz · marquage CE · firmware
            Meshtastic upstream.
          </p>
        </div>

        <nav aria-labelledby="footer-product" className="text-[11px] uppercase tracking-[0.15em]">
          <h2 id="footer-product" className="text-[color:var(--color-hazard)] mb-3 text-[11px] font-mono">
            <span aria-hidden="true">[ </span>PRODUIT<span aria-hidden="true"> ]</span>
          </h2>
          <ul className="space-y-2 text-[color:var(--color-phosphor-dim)]">
            <li><Link href="/kits/decouverte" className="tap-target hover:text-[color:var(--color-phosphor)] maillon-link">Kit&nbsp;01&nbsp;/&nbsp;Découverte</Link></li>
            <li><Link href="/kits/pro" className="tap-target hover:text-[color:var(--color-phosphor)] maillon-link">Kit&nbsp;02&nbsp;/&nbsp;Pro</Link></li>
            <li><Link href="/kits/secours" className="tap-target hover:text-[color:var(--color-phosphor)] maillon-link">Kit&nbsp;03&nbsp;/&nbsp;Secours</Link></li>
            <li><Link href="/saas" className="tap-target hover:text-[color:var(--color-phosphor)] maillon-link">Console&nbsp;Fleet</Link></li>
          </ul>
        </nav>

        <nav aria-labelledby="footer-legal" className="text-[11px] uppercase tracking-[0.15em]">
          <h2 id="footer-legal" className="text-[color:var(--color-hazard)] mb-3 text-[11px] font-mono">
            <span aria-hidden="true">[ </span>LÉGAL<span aria-hidden="true"> ]</span>
          </h2>
          <ul className="space-y-2 text-[color:var(--color-phosphor-dim)]">
            <li><Link href="/mentions-legales" className="tap-target hover:text-[color:var(--color-phosphor)] maillon-link">Mentions</Link></li>
            <li><Link href="/confidentialite" className="tap-target hover:text-[color:var(--color-phosphor)] maillon-link">Confidentialité</Link></li>
            <li><Link href="/cgv" className="tap-target hover:text-[color:var(--color-phosphor)] maillon-link">CGV</Link></li>
            <li><Link href="/cookies" className="tap-target hover:text-[color:var(--color-phosphor)] maillon-link">Cookies</Link></li>
          </ul>
        </nav>
      </div>

      <div className="border-t border-[color:var(--color-divider)] py-3 px-6 lg:px-10 font-mono text-[10px] tracking-[0.2em] text-[color:var(--color-phosphor-dim)] uppercase flex flex-wrap items-center justify-between gap-2">
        <span>© {year} MAILLON SAS · Paris</span>
        <span className="text-[color:var(--color-hazard)] font-bold" role="note" aria-label="Avertissement de sécurité">
          ne&nbsp;se&nbsp;substitue&nbsp;pas&nbsp;au&nbsp;
          <a href="tel:112" className="underline maillon-link">112</a>
        </span>
      </div>
    </footer>
  );
}
