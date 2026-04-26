import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 bg-[color:var(--color-sand)]/85 backdrop-blur-md border-b border-[color:var(--color-charcoal)]/8">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 h-16 flex items-center justify-between">
        <Link
          href="/"
          aria-label="Retour à l'accueil MAILLON"
          className="flex items-center gap-3"
        >
          <span className="block w-7 h-7 relative">
            <svg
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden
            >
              <circle cx="16" cy="8" r="3" fill="var(--color-forest)" />
              <circle cx="8" cy="20" r="3" fill="var(--color-forest)" />
              <circle cx="24" cy="20" r="3" fill="var(--color-forest)" />
              <line
                x1="16"
                y1="8"
                x2="8"
                y2="20"
                stroke="var(--color-forest)"
                strokeWidth="1.5"
              />
              <line
                x1="16"
                y1="8"
                x2="24"
                y2="20"
                stroke="var(--color-forest)"
                strokeWidth="1.5"
              />
              <line
                x1="8"
                y1="20"
                x2="24"
                y2="20"
                stroke="var(--color-forest)"
                strokeWidth="1.5"
              />
            </svg>
          </span>
          <span className="font-bold tracking-[0.18em] text-sm text-[color:var(--color-charcoal)]">
            MAILLON
          </span>
        </Link>

        <nav
          aria-label="Navigation principale"
          className="hidden md:flex items-center gap-8 text-sm"
        >
          <Link
            href="#kits"
            className="text-[color:var(--color-charcoal)]/75 hover:text-[color:var(--color-forest)]"
          >
            Kits
          </Link>
          <Link
            href="/saas"
            className="text-[color:var(--color-charcoal)]/75 hover:text-[color:var(--color-forest)]"
          >
            Fleet Manager
          </Link>
          <Link
            href="/cas-usage"
            className="text-[color:var(--color-charcoal)]/75 hover:text-[color:var(--color-forest)]"
          >
            Cas d&apos;usage
          </Link>
          <Link
            href="/blog"
            className="text-[color:var(--color-charcoal)]/75 hover:text-[color:var(--color-forest)]"
          >
            Journal
          </Link>
          <Link
            href="/communaute"
            className="text-[color:var(--color-charcoal)]/75 hover:text-[color:var(--color-forest)]"
          >
            Communauté
          </Link>
        </nav>

        <Link
          href="#preorder"
          className="hidden sm:inline-flex items-center bg-[color:var(--color-forest)] text-[color:var(--color-sand)] px-5 py-2.5 rounded-md text-sm font-medium hover:bg-[color:var(--color-charcoal)] transition-colors"
        >
          Pré-commander&nbsp;›
        </Link>
      </div>
    </header>
  );
}
