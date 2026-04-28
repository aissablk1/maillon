import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@components/SiteHeader";
import { SiteFooter } from "@components/SiteFooter";
import { ProductSchema } from "@components/ProductSchema";

export const metadata: Metadata = {
  title: "Kit Pro — 399 €",
  description:
    "Quatre nœuds portables et une station relais pour coordonner une équipe sur 10 à 20 km². Conçu pour les chantiers BTP, l'événementiel et les exploitations isolées.",
};

const FEATURES = [
  {
    title: "Hardware",
    items: [
      "4× LILYGO T-Beam Supreme (firmware Meshtastic préconfiguré EU 868)",
      "1× Station G2 ou Heltec V3 boostée (relais fixe haut-gain)",
      "4× antennes 5 dBi externes SMA pour portatifs",
      "1× antenne fibre 7 dBi extérieure pour relais",
      "Marquage CE, conformité ETSI",
    ],
  },
  {
    title: "Énergie",
    items: [
      "4× batteries 18650 3000 mAh certifiées + 4 supplémentaires offertes",
      "4× chargeurs USB-C 20W",
      "Autonomie portatifs : 5 jours en usage modéré",
      "Station relais : alimentation continue USB-C ou PoE",
    ],
  },
  {
    title: "Logistique",
    items: [
      "1× mallette transport semi-rigide 30×20×10 cm",
      "Étuis caoutchouc renforcés pour chaque portatif",
      "Câbles SMA, accessoires de fixation",
      "Notice illustrée 12 pages en français",
    ],
  },
  {
    title: "Services inclus",
    items: [
      "Configuration sur-mesure : équipe nommée, canal privé, paramètres optimisés",
      "30 jours d'essai SaaS Team gratuit (jusqu'à 50 nœuds)",
      "Support prioritaire < 24h ouvrées",
      "Garantie 24 mois + accès programme Référents MAILLON Pro",
    ],
  },
];

export default function KitProPage() {
  return (
    <>
      <ProductSchema
        name="MAILLON Kit Pro"
        description="Kit Meshtastic pour 4 portatifs + 1 station relais — couverture 10–20 km², mallette transport semi-rigide, 30 jours SaaS Team inclus, configuration sur-mesure."
        price="399"
        url="/kits/pro"
        sku="MAI-KIT-PRO-V1"
        availability="PreOrder"
      />
      <SiteHeader />
      <main id="main">
        <section className="bg-[color:var(--color-sand)] py-20 lg:py-28">
          <div className="mx-auto max-w-6xl px-6 lg:px-10">
            <p className="eyebrow text-[color:var(--color-forest)] mb-6">
              Kit Pro · 399 € TTC
            </p>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
              <div className="lg:col-span-7">
                <h1 className="maillon-hero text-[clamp(2.4rem,5vw,4.5rem)] leading-[1.05]">
                  Pour les chantiers.<br />
                  <span className="italic font-light">Pour les festivals.</span>
                </h1>
                <p className="text-xl mt-8 text-[color:var(--color-charcoal)]/80 max-w-2xl">
                  Quatre portatifs robustes et une station relais haut-gain.
                  De quoi coordonner une équipe sur une zone d&apos;opérations
                  entière, jusqu&apos;à 20 km² avec un relais bien placé.
                  Comparable à 4 talkies DMR pros — pour 10 fois moins cher.
                </p>
              </div>
              <div className="lg:col-span-5">
                <div className="bg-white border border-[color:var(--color-charcoal)]/10 rounded-lg p-8">
                  <p className="text-6xl font-bold tabular-nums">399 €</p>
                  <p className="text-sm text-[color:var(--color-charcoal)]/60 mt-1 mb-8">
                    TTC, livraison France 7–10 jours
                  </p>
                  <Link
                    href="/contact?sujet=kit-pro"
                    className="block w-full text-center bg-[color:var(--color-forest)] hover:bg-[color:var(--color-charcoal)] text-[color:var(--color-sand)] px-6 py-3.5 rounded-md text-base font-medium transition-colors"
                  >
                    Demander un devis&nbsp;›
                  </Link>
                  <p className="mt-4 text-xs text-[color:var(--color-charcoal)]/55">
                    Configuration sur-mesure incluse. Volumes&nbsp;? Devis sous 48h.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 lg:py-28">
          <div className="mx-auto max-w-6xl px-6 lg:px-10">
            <h2 className="text-3xl lg:text-4xl font-bold tracking-tight mb-12">
              Tout ce que vous recevez.
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {FEATURES.map((block) => (
                <div key={block.title}>
                  <p className="eyebrow text-[color:var(--color-forest)] mb-4">
                    {block.title}
                  </p>
                  <ul className="space-y-3">
                    {block.items.map((it) => (
                      <li
                        key={it}
                        className="text-base text-[color:var(--color-charcoal)]/85 flex items-start gap-3"
                      >
                        <span
                          className="mt-2 block w-1.5 h-1.5 rounded-full bg-[color:var(--color-forest)] flex-shrink-0"
                          aria-hidden
                        />
                        <span>{it}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[color:var(--color-charcoal)] text-[color:var(--color-sand)] py-20 lg:py-28">
          <div className="mx-auto max-w-5xl px-6 lg:px-10">
            <p className="eyebrow text-[color:var(--color-moss)] mb-6">
              Comparaison honnête
            </p>
            <h2 className="text-3xl lg:text-4xl font-bold tracking-tight mb-12">
              Kit Pro MAILLON vs 4 talkies DMR pros.
            </h2>
            <div className="overflow-x-auto -mx-6 lg:mx-0">
              <table className="w-full min-w-[560px] text-base">
                <thead>
                  <tr className="border-b-2 border-[color:var(--color-sand)]/20">
                    <th className="text-left py-4 px-6 text-sm font-medium text-[color:var(--color-sand)]/60">
                      Poste
                    </th>
                    <th className="text-left py-4 px-6 text-sm font-medium text-[color:var(--color-sand)]/60">
                      4 talkies DMR
                    </th>
                    <th className="text-left py-4 px-6 text-sm font-medium text-[color:var(--color-moss)]">
                      Kit Pro MAILLON
                    </th>
                  </tr>
                </thead>
                <tbody className="font-mono text-sm tabular-nums">
                  <tr className="border-b border-[color:var(--color-sand)]/10">
                    <td className="py-4 px-6 font-sans">Hardware initial</td>
                    <td className="py-4 px-6">4 800 €</td>
                    <td className="py-4 px-6">399 €</td>
                  </tr>
                  <tr className="border-b border-[color:var(--color-sand)]/10">
                    <td className="py-4 px-6 font-sans">Licence ARCEP DMR</td>
                    <td className="py-4 px-6">~150 €/an</td>
                    <td className="py-4 px-6">0 €</td>
                  </tr>
                  <tr className="border-b border-[color:var(--color-sand)]/10">
                    <td className="py-4 px-6 font-sans">Comms texte chiffrée</td>
                    <td className="py-4 px-6">non (voix)</td>
                    <td className="py-4 px-6">oui (AES-256)</td>
                  </tr>
                  <tr className="border-b border-[color:var(--color-sand)]/10">
                    <td className="py-4 px-6 font-sans">Géolocalisation équipes</td>
                    <td className="py-4 px-6">non</td>
                    <td className="py-4 px-6">oui (option SaaS)</td>
                  </tr>
                  <tr className="border-b border-[color:var(--color-sand)]/10">
                    <td className="py-4 px-6 font-sans">Multi-relais auto</td>
                    <td className="py-4 px-6">non</td>
                    <td className="py-4 px-6">oui (mesh)</td>
                  </tr>
                  <tr>
                    <td className="py-5 px-6 font-sans font-semibold">Total an 1</td>
                    <td className="py-5 px-6 text-lg">~5 000 €</td>
                    <td className="py-5 px-6 text-lg text-[color:var(--color-moss)] font-semibold">
                      ~400 €
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section className="py-20 lg:py-28">
          <div className="mx-auto max-w-4xl px-6 lg:px-10">
            <p className="eyebrow text-[color:var(--color-forest)] mb-6">
              Limites à connaître
            </p>
            <ul className="space-y-5 text-base text-[color:var(--color-charcoal)]/85">
              <li>
                <strong>Pas un substitut au 112 ni au réseau Antarès.</strong>
                {" "}MAILLON complète vos comms officielles, ne les remplace pas.
              </li>
              <li>
                <strong>Voix non supportée.</strong> Le LoRa transporte du
                texte, position et télémétrie. Pour la voix, gardez vos
                talkies PMR ou DMR en parallèle.
              </li>
              <li>
                <strong>Le relais demande un point haut.</strong> Toit, mât,
                pylône. Sans relais, portée réduite à ~5 km entre portatifs.
              </li>
              <li>
                <strong>Capacité jusqu&apos;à 30 utilisateurs simultanés.</strong>
                {" "}Au-delà, regardez le Kit Sur-mesure.
              </li>
            </ul>
          </div>
        </section>

        <section className="bg-[color:var(--color-forest)] text-[color:var(--color-sand)] py-20">
          <div className="mx-auto max-w-3xl px-6 lg:px-10 text-center">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              Décrivez-nous votre cas d&apos;usage.
            </h2>
            <p className="text-lg text-[color:var(--color-sand)]/85 mb-8">
              Cinq questions techniques, un devis personnalisé sous 48 heures
              ouvrées. Possibilité de visio démo gratuite avec partage écran
              du SaaS.
            </p>
            <Link
              href="/contact?sujet=kit-pro"
              className="inline-flex bg-[color:var(--color-signal)] hover:bg-[color:var(--color-sand)] hover:text-[color:var(--color-forest)] text-[color:var(--color-charcoal)] px-8 py-4 rounded-md text-base font-semibold transition-colors"
            >
              Demander un devis&nbsp;›
            </Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
