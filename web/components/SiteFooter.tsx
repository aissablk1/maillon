import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-[color:var(--color-phosphor-faint)] mt-32">
      {/* Strip de transmission ASCII */}
      <div className="border-b border-[color:var(--color-phosphor-faint)] py-3 px-6 lg:px-10 font-mono text-[10px] tracking-[0.2em] text-[color:var(--color-phosphor-faint)] uppercase flex flex-wrap items-center gap-x-6 gap-y-1">
        <span>{">>>"} TRANSMISSION OK</span>
        <span className="text-[color:var(--color-phosphor-dim)]">EU&nbsp;868.0–868.6&nbsp;MHz</span>
        <span>ETSI&nbsp;EN&nbsp;300&nbsp;220</span>
        <span>HOP_LIMIT=3</span>
        <span>DUTY_CYCLE&nbsp;1%</span>
        <span className="ml-auto text-[color:var(--color-phosphor-faint)]">
          REV&nbsp;0.1.0&nbsp;/&nbsp;{new Date().toISOString().slice(0, 10)}
        </span>
      </div>

      <div className="grid grid-cols-[2fr_1fr_1fr] gap-6 px-6 lg:px-10 py-12 max-w-7xl mx-auto">
        <div>
          <p className="macro text-[clamp(48px,8vw,96px)] text-[color:var(--color-phosphor)] mb-4">
            MAILLON
            <span className="text-[color:var(--color-hazard)]">.</span>
          </p>
          <p className="font-mono text-[13px] text-[color:var(--color-phosphor-dim)] max-w-md leading-relaxed">
            Communications mesh radio longue portée pour la France. Sans
            abonnement satellite, sans licence ARCEP, sans dépendance
            opérateur. Bande EU&nbsp;868&nbsp;MHz · marquage CE · firmware
            Meshtastic upstream.
          </p>
        </div>

        <nav aria-label="Produit" className="text-[11px] uppercase tracking-[0.15em]">
          <p className="text-[color:var(--color-hazard)] mb-3">[ PRODUIT ]</p>
          <ul className="space-y-2 text-[color:var(--color-phosphor-dim)]">
            <li><Link href="/kits/decouverte" className="hover:text-[color:var(--color-phosphor)]">Kit&nbsp;01&nbsp;/&nbsp;Découverte</Link></li>
            <li><Link href="/kits/pro" className="hover:text-[color:var(--color-phosphor)]">Kit&nbsp;02&nbsp;/&nbsp;Pro</Link></li>
            <li><Link href="/kits/secours" className="hover:text-[color:var(--color-phosphor)]">Kit&nbsp;03&nbsp;/&nbsp;Secours</Link></li>
            <li><Link href="/saas" className="hover:text-[color:var(--color-phosphor)]">Console&nbsp;Fleet</Link></li>
          </ul>
        </nav>

        <nav aria-label="Légal" className="text-[11px] uppercase tracking-[0.15em]">
          <p className="text-[color:var(--color-hazard)] mb-3">[ LÉGAL ]</p>
          <ul className="space-y-2 text-[color:var(--color-phosphor-dim)]">
            <li><Link href="/mentions-legales" className="hover:text-[color:var(--color-phosphor)]">Mentions</Link></li>
            <li><Link href="/confidentialite" className="hover:text-[color:var(--color-phosphor)]">Confidentialité</Link></li>
            <li><Link href="/cgv" className="hover:text-[color:var(--color-phosphor)]">CGV</Link></li>
            <li><Link href="/cookies" className="hover:text-[color:var(--color-phosphor)]">Cookies</Link></li>
          </ul>
        </nav>
      </div>

      <div className="border-t border-[color:var(--color-phosphor-faint)] py-3 px-6 lg:px-10 font-mono text-[10px] tracking-[0.2em] text-[color:var(--color-phosphor-faint)] uppercase flex flex-wrap items-center justify-between gap-2">
        <span>© {new Date().getFullYear()} MAILLON SAS · Paris</span>
        <span className="text-[color:var(--color-hazard-dim)]">
          n&apos;est&nbsp;PAS&nbsp;un&nbsp;substitut&nbsp;au&nbsp;112
        </span>
      </div>
    </footer>
  );
}
