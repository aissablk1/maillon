import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="bg-[color:var(--color-charcoal)] text-[color:var(--color-sand)]/80 pt-20 pb-10">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-10">
          <div className="col-span-2">
            <p className="font-bold tracking-[0.18em] text-sm text-[color:var(--color-sand)] mb-4">
              MAILLON
            </p>
            <p className="text-base text-[color:var(--color-sand)]/70 max-w-md leading-relaxed">
              Communications mesh longue portée pour pros et particuliers
              en France et Europe francophone. Sans abonnement, sans
              satellite, sans licence.
            </p>
            <p className="mt-6 text-sm text-[color:var(--color-sand)]/50 font-mono">
              Bande EU&nbsp;868 MHz · marqué CE · Meshtastic Approved
            </p>
          </div>

          <nav aria-labelledby="footer-produit">
            <p
              id="footer-produit"
              className="eyebrow text-[color:var(--color-moss)] mb-4"
            >
              Produit
            </p>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/kits/decouverte" className="hover:text-[color:var(--color-sand)]">
                  Kit Découverte
                </Link>
              </li>
              <li>
                <Link href="/kits/pro" className="hover:text-[color:var(--color-sand)]">
                  Kit Pro
                </Link>
              </li>
              <li>
                <Link href="/kits/secours" className="hover:text-[color:var(--color-sand)]">
                  Kit Secours
                </Link>
              </li>
              <li>
                <Link href="/saas" className="hover:text-[color:var(--color-sand)]">
                  Fleet Manager SaaS
                </Link>
              </li>
              <li>
                <Link href="/accessoires" className="hover:text-[color:var(--color-sand)]">
                  Accessoires
                </Link>
              </li>
            </ul>
          </nav>

          <nav aria-labelledby="footer-ressources">
            <p
              id="footer-ressources"
              className="eyebrow text-[color:var(--color-moss)] mb-4"
            >
              Ressources
            </p>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/blog" className="hover:text-[color:var(--color-sand)]">
                  Journal
                </Link>
              </li>
              <li>
                <Link href="/cas-usage" className="hover:text-[color:var(--color-sand)]">
                  Cas d&apos;usage
                </Link>
              </li>
              <li>
                <Link href="/docs" className="hover:text-[color:var(--color-sand)]">
                  Documentation
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-[color:var(--color-sand)]">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/communaute" className="hover:text-[color:var(--color-sand)]">
                  Communauté FR
                </Link>
              </li>
            </ul>
          </nav>

          <nav aria-labelledby="footer-entreprise">
            <p
              id="footer-entreprise"
              className="eyebrow text-[color:var(--color-moss)] mb-4"
            >
              Entreprise
            </p>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/manifeste" className="hover:text-[color:var(--color-sand)]">
                  Manifeste
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[color:var(--color-sand)]">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/presse" className="hover:text-[color:var(--color-sand)]">
                  Presse
                </Link>
              </li>
              <li>
                <Link href="/recrutement" className="hover:text-[color:var(--color-sand)]">
                  Recrutement
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        <hr className="border-[color:var(--color-sand)]/15 my-12" />

        <div className="flex flex-col md:flex-row md:justify-between gap-6 text-xs text-[color:var(--color-sand)]/55">
          <p>
            © {new Date().getFullYear()} MAILLON SAS · Société française basée à
            Paris.
          </p>
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            <li>
              <Link href="/mentions-legales" className="hover:text-[color:var(--color-sand)]">
                Mentions légales
              </Link>
            </li>
            <li>
              <Link href="/confidentialite" className="hover:text-[color:var(--color-sand)]">
                Confidentialité
              </Link>
            </li>
            <li>
              <Link href="/cgv" className="hover:text-[color:var(--color-sand)]">
                CGV
              </Link>
            </li>
            <li>
              <Link href="/cgu" className="hover:text-[color:var(--color-sand)]">
                CGU SaaS
              </Link>
            </li>
            <li>
              <Link href="/cookies" className="hover:text-[color:var(--color-sand)]">
                Cookies
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
