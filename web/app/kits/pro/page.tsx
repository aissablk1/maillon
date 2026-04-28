import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@components/SiteHeader";
import { SiteFooter } from "@components/SiteFooter";
import { ProductSchema } from "@components/ProductSchema";

export const metadata: Metadata = {
  title: "Kit Pro — 399 €",
  description:
    "Quatre nœuds portables et une station relais pour coordonner une équipe sur 10 à 20 km². Conçu pour les chantiers BTP, l'événementiel et les exploitations isolées.",
  alternates: { canonical: "https://github.com/aissablk1/maillon/kits/pro" },
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

const COMPARISON = [
  ["Hardware initial", "4 800 €", "399 €"],
  ["Licence ARCEP DMR", "~150 €/an", "0 €"],
  ["Comms texte chiffrée", "non (voix)", "oui (AES-256)"],
  ["Géolocalisation équipes", "non", "oui (option SaaS)"],
  ["Multi-relais auto", "non", "oui (mesh)"],
];

const LIMITES = [
  {
    title: "MAILLON ne se substitue pas au 112 ni au réseau Antarès",
    body: "Il complète vos comms officielles, ne les remplace pas.",
  },
  {
    title: "Voix non supportée",
    body: "Le LoRa transporte du texte, position et télémétrie. Pour la voix, gardez vos talkies PMR ou DMR en parallèle.",
  },
  {
    title: "Le relais demande un point haut",
    body: "Toit, mât, pylône. Sans relais, portée réduite à ~5 km entre portatifs.",
  },
  {
    title: "Capacité jusqu'à 30 utilisateurs simultanés",
    body: "Au-delà, regardez le Kit Sur-mesure (devis volume).",
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
        {/* HERO */}
        <section
          aria-labelledby="kit-hero"
          className="border-b border-[color:var(--color-divider)]"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12">
            <div className="lg:col-span-7 px-6 lg:px-10 pt-12 lg:pt-20 pb-16 lg:border-r border-[color:var(--color-divider)]">
              <div className="flex items-center gap-4 mb-12">
                <span className="font-mono text-[11px] tracking-[0.18em] uppercase text-[color:var(--color-hazard)]">
                  Kit&nbsp;02 · Pro
                </span>
                <span aria-hidden="true" className="flex-1 border-t border-[color:var(--color-divider)]" />
              </div>

              <h1
                id="kit-hero"
                className="macro text-[clamp(56px,11vw,160px)] text-[color:var(--color-phosphor)]"
              >
                CHANTIERS
                <span className="text-[color:var(--color-hazard)]" aria-hidden="true">.</span>
                <br />
                <span className="text-[color:var(--color-phosphor-dim)]">FESTIVALS.</span>
                <br />
                EXPLOITATIONS.
              </h1>

              <p className="mt-12 max-w-2xl font-mono text-[14px] lg:text-[15px] text-[color:var(--color-phosphor-dim)] leading-[1.7]">
                Quatre portatifs robustes et une station relais haut-gain.
                De quoi coordonner une équipe sur une zone d&apos;opérations
                entière, jusqu&apos;à 20 km² avec un relais bien placé.
                Comparable à 4 talkies DMR pros — pour 10 fois moins cher.
              </p>
            </div>

            <aside className="lg:col-span-5 px-6 lg:px-10 pt-12 lg:pt-20 pb-16 flex items-end bg-[color:var(--color-substrate-2)]">
              <div className="border border-[color:var(--color-hazard)] p-6 lg:p-8 w-full">
                <p className="font-mono text-[11px] tracking-[0.18em] uppercase text-[color:var(--color-hazard)] mb-4 font-bold">
                  Prix TTC
                </p>
                <div className="flex items-baseline gap-3 mb-2">
                  <span className="macro text-[clamp(64px,9vw,112px)] text-[color:var(--color-phosphor)] tabular-nums leading-none">
                    399
                  </span>
                  <span className="macro text-[clamp(24px,3vw,32px)] text-[color:var(--color-phosphor-dim)]">
                    €
                  </span>
                </div>
                <p className="font-mono text-[11px] tracking-[0.05em] text-[color:var(--color-phosphor-dim)] mb-6">
                  Livraison France 7–10 jours. Configuration incluse.
                </p>
                <span aria-hidden="true" className="block divider-solid mb-6" />
                <Link
                  href="/contact?sujet=kit-pro"
                  className="btn-tactical btn-tactical-hazard w-full justify-between"
                >
                  <span>Demander un devis</span>
                  <span aria-hidden="true">{" ›"}</span>
                </Link>
                <p className="mt-4 font-mono text-[10px] tracking-[0.05em] text-[color:var(--color-phosphor-dim)] leading-[1.6]">
                  Volumes ? Devis personnalisé sous 48h.
                </p>
              </div>
            </aside>
          </div>
        </section>

        {/* FEATURES */}
        <section
          aria-labelledby="features-heading"
          className="border-b border-[color:var(--color-divider)] py-20 lg:py-28"
        >
          <div className="max-w-7xl mx-auto px-6 lg:px-10">
            <header className="mb-16">
              <p className="font-mono text-[11px] tracking-[0.18em] uppercase text-[color:var(--color-phosphor-dim)] mb-4">
                Inventaire complet
              </p>
              <h2
                id="features-heading"
                className="font-mono text-[clamp(24px,3vw,40px)] text-[color:var(--color-phosphor)] leading-[1.2] font-bold"
              >
                Tout ce que vous recevez.
              </h2>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12">
              {FEATURES.map((block) => (
                <div key={block.title} className="border-t border-[color:var(--color-divider)] pt-6">
                  <h3 className="font-mono text-[16px] text-[color:var(--color-phosphor)] mb-6 font-bold">
                    {block.title}
                  </h3>
                  <ul className="font-mono text-[13px] text-[color:var(--color-phosphor-dim)] space-y-2.5 list-none p-0 m-0">
                    {block.items.map((it) => (
                      <li key={it} className="grid grid-cols-[auto_1fr] gap-3 items-baseline">
                        <span aria-hidden="true" className="text-[color:var(--color-hazard)] tabular-nums text-[10px]">
                          {">>"}
                        </span>
                        <span className="leading-[1.55]">{it}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* COMPARAISON */}
        <section
          aria-labelledby="bench-heading"
          className="border-b border-[color:var(--color-divider)] py-20 lg:py-28 bg-[color:var(--color-substrate-2)]"
        >
          <div className="max-w-6xl mx-auto px-6 lg:px-10">
            <header className="mb-12 grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-9">
                <p className="font-mono text-[11px] tracking-[0.18em] uppercase text-[color:var(--color-phosphor-dim)] mb-4">
                  Comparaison sur an&nbsp;1 — 4 secouristes
                </p>
                <h2
                  id="bench-heading"
                  className="font-mono text-[clamp(24px,3vw,40px)] text-[color:var(--color-phosphor)] leading-[1.2] font-bold"
                >
                  Kit Pro <span className="text-[color:var(--color-phosphor-dim)]">vs</span> 4 talkies DMR.
                </h2>
              </div>
            </header>

            <div className="overflow-x-auto -mx-6 lg:mx-0">
              <table className="w-full min-w-[560px] font-mono text-[13px]">
                <caption className="sr-only">
                  Comparaison Kit Pro MAILLON et 4 talkies DMR pros sur an 1.
                </caption>
                <thead>
                  <tr className="border-y-2 border-[color:var(--color-phosphor)]">
                    <th scope="col" className="text-left py-3 px-4 text-[10px] tracking-[0.2em] uppercase text-[color:var(--color-phosphor-dim)] font-normal">
                      Poste
                    </th>
                    <th scope="col" className="text-left py-3 px-4 text-[10px] tracking-[0.2em] uppercase text-[color:var(--color-phosphor-dim)] font-normal">
                      4 talkies DMR
                    </th>
                    <th scope="col" className="text-left py-3 px-4 text-[10px] tracking-[0.2em] uppercase text-[color:var(--color-hazard)] font-bold">
                      Kit Pro MAILLON
                    </th>
                  </tr>
                </thead>
                <tbody className="tabular-nums">
                  {COMPARISON.map(([poste, dmr, maillon]) => (
                    <tr key={poste} className="border-b border-[color:var(--color-divider)]">
                      <th scope="row" className="py-3 px-4 text-[color:var(--color-phosphor-dim)] text-left font-normal">
                        {poste}
                      </th>
                      <td className="py-3 px-4 text-[color:var(--color-phosphor)]">{dmr}</td>
                      <td className="py-3 px-4 text-[color:var(--color-phosphor)]">{maillon}</td>
                    </tr>
                  ))}
                  <tr className="border-y-2 border-[color:var(--color-hazard)]">
                    <th scope="row" className="py-4 px-4 text-[color:var(--color-phosphor)] uppercase tracking-[0.1em] text-[11px] text-left">
                      Total an 1
                    </th>
                    <td className="py-4 px-4 text-[color:var(--color-phosphor)] text-[18px]">
                      ~5 000 €
                    </td>
                    <td className="py-4 px-4 text-[color:var(--color-hazard)] text-[18px] font-bold">
                      ~400 €
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* LIMITES */}
        <section
          aria-labelledby="limites-heading"
          className="border-b border-[color:var(--color-divider)] py-20 lg:py-28"
        >
          <div className="max-w-4xl mx-auto px-6 lg:px-10">
            <header className="mb-12">
              <p className="font-mono text-[11px] tracking-[0.18em] uppercase text-[color:var(--color-phosphor-dim)] mb-4">
                Limites — transparence
              </p>
              <h2
                id="limites-heading"
                className="font-mono text-[clamp(24px,3vw,40px)] text-[color:var(--color-phosphor)] leading-[1.2] font-bold"
              >
                Ce qu&apos;on ne fait pas.
              </h2>
            </header>

            <ol className="list-none p-0 m-0">
              {LIMITES.map((l) => (
                <li
                  key={l.title}
                  className="py-6 border-t border-[color:var(--color-divider)] last:border-b"
                >
                  <div>
                    <h3 className="font-mono text-[15px] text-[color:var(--color-phosphor)] leading-[1.3] mb-2 font-bold">
                      {l.title}
                    </h3>
                    <p className="font-mono text-[13px] text-[color:var(--color-phosphor-dim)] leading-[1.65] max-w-[60ch]">
                      {l.body}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* CTA */}
        <section
          aria-labelledby="cta-heading"
          className="px-6 lg:px-10 py-24 border-b-2 border-[color:var(--color-hazard)]"
        >
          <div className="max-w-4xl mx-auto text-center">
            <p className="font-mono text-[11px] tracking-[0.18em] uppercase text-[color:var(--color-phosphor-dim)] mb-4">
              Configuration sur-mesure
            </p>
            <h2
              id="cta-heading"
              className="font-mono text-[clamp(22px,3vw,36px)] text-[color:var(--color-phosphor)] leading-[1.2] font-bold mb-6"
            >
              Vingt minutes pour cadrer votre besoin.
            </h2>
            <p className="font-mono text-[14px] text-[color:var(--color-phosphor-dim)] leading-[1.7] mb-10 max-w-2xl mx-auto">
              On vous appelle, on comprend votre théâtre d&apos;opération, on
              vous envoie un devis chiffré sous 48&nbsp;h. Aucun engagement.
            </p>
            <Link href="/contact?sujet=kit-pro" className="btn-tactical btn-tactical-hazard inline-flex">
              <span>Prendre rendez-vous</span>
              <span aria-hidden="true">{" ›"}</span>
            </Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
