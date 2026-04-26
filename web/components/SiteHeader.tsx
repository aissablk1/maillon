import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 bg-[color:var(--color-substrate)]/95 backdrop-blur-sm border-b border-[color:var(--color-phosphor-faint)]">
      <div className="grid grid-cols-[auto_1fr_auto] items-center gap-8 px-6 py-3 lg:px-10">
        {/* Bloc logo + uplink indicator */}
        <Link
          href="/"
          aria-label="MAILLON — accueil"
          className="flex items-center gap-3"
        >
          <span className="uplink-indicator" aria-hidden />
          <span className="font-mono text-[10px] tracking-[0.22em] text-[color:var(--color-phosphor)] font-bold">
            MAILLON
            <span className="text-[color:var(--color-phosphor-faint)]">®</span>
          </span>
        </Link>

        {/* Navigation centrale — monospace, asymétrique */}
        <nav
          aria-label="Navigation principale"
          className="hidden md:flex items-center gap-6 justify-center text-[10px] tracking-[0.18em] uppercase"
        >
          <Link
            href="/#kits"
            className="text-[color:var(--color-phosphor-dim)] hover:text-[color:var(--color-phosphor)]"
          >
            // Kits
          </Link>
          <Link
            href="/saas"
            className="text-[color:var(--color-phosphor-dim)] hover:text-[color:var(--color-phosphor)]"
          >
            // Console
          </Link>
          <Link
            href="/cas-usage"
            className="text-[color:var(--color-phosphor-dim)] hover:text-[color:var(--color-phosphor)]"
          >
            // Terrain
          </Link>
          <Link
            href="/communaute"
            className="text-[color:var(--color-phosphor-dim)] hover:text-[color:var(--color-phosphor)]"
          >
            // Réseau
          </Link>
        </nav>

        {/* Bloc droit — CTA + freq */}
        <div className="flex items-center gap-4">
          <span className="hidden lg:inline-block font-mono text-[10px] tracking-[0.15em] text-[color:var(--color-phosphor-faint)]">
            EU&nbsp;868.0&nbsp;MHz
          </span>
          <Link href="/#preorder" className="btn-tactical btn-tactical-hazard text-[10px] py-2 px-4">
            <span>PRÉCOMMANDE</span>
            <span aria-hidden>{">>"}</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
