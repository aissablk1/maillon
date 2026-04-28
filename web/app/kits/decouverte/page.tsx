import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@components/SiteHeader";
import { SiteFooter } from "@components/SiteFooter";
import { ProductSchema } from "@components/ProductSchema";

export const metadata: Metadata = {
  title: "Kit Découverte — 99 €",
  description:
    "Le kit MAILLON d'entrée. Deux nœuds Meshtastic préconfigurés, 5 à 10 km de portée, 5 jours d'autonomie. Sans abonnement, sans satellite, sans licence.",
  alternates: { canonical: "https://github.com/aissablk1/maillon/kits/decouverte" },
};

const FEATURES = [
  {
    title: "Hardware",
    items: [
      "2× LILYGO T-Echo (firmware Meshtastic préconfiguré région EU 868)",
      "Antenne LoRa intégrée 868 MHz",
      "Batterie LiPo 1100 mAh (5 jours d'autonomie usage modéré)",
      "Marquage CE, conformité ETSI EN 300 220",
    ],
  },
  {
    title: "Accessoires",
    items: [
      "2× câbles USB-C 1 mètre",
      "2× étuis silicone signature MAILLON",
      "1× notice plastifiée 4 volets « Démarrage 3 minutes »",
      "1× sticker MAILLON",
    ],
  },
  {
    title: "Services inclus",
    items: [
      "Compte SaaS MAILLON Free (5 nœuds, carto temps réel)",
      "Accès Discord MAILLON FR (entraide, REX terrain)",
      "Mises à jour firmware annoncées par newsletter",
      "Support email garanti < 48h ouvrées",
      "Garantie 24 mois (matériel + remplacement défaut usine)",
    ],
  },
];

const SCENARIOS = [
  {
    title: "Bivouac en famille",
    body: "Vous êtes deux adultes. Les ados partent en exploration au ruisseau, vous restez monter le camp. Pas de réseau cellulaire. MAILLON garde le contact texte + position en temps réel sur 2 à 4 km en forêt.",
  },
  {
    title: "Cordée d'initiation",
    body: "Une cordée de deux en moyenne montagne. Le second perd de vue le premier dans une combe. MAILLON envoie position et message — pas besoin de hurler.",
  },
  {
    title: "Premier pas dans le mesh",
    body: "Vous voulez comprendre comment fonctionne Meshtastic avant d'investir dans une vraie flotte. Le Kit Découverte vous donne deux nœuds plug-and-play pour expérimenter en français.",
  },
];

const LIMITES = [
  {
    title: "Ce n'est pas un service de secours officiel",
    body: "MAILLON ne se substitue pas au 112 ni à aucun service officiel de secours. C'est un outil d'appoint, ne se substitue ni au SAMU ni aux pompiers.",
  },
  {
    title: "La portée dépend du terrain",
    body: "5 à 10 km en terrain ouvert. 1 à 3 km en zone urbaine dense. Moins de 1 km en intérieur béton.",
  },
  {
    title: "Pas de voix",
    body: "Le mesh LoRa transmet du texte, des positions GPS et de la télémétrie. Pas de voix temps réel — c'est un trade-off pour la portée et l'autonomie.",
  },
  {
    title: "Hors couverture extrême ?",
    body: "Si vous partez seul·e en expédition polaire ou en plein océan, un communicateur satellite Garmin reste pertinent. MAILLON couvre tous les autres usages.",
  },
];

export default function KitDecouvertePage() {
  return (
    <>
      <ProductSchema
        name="MAILLON Kit Découverte"
        description="Kit Meshtastic pour deux personnes : 2× LILYGO T-Echo préconfigurés EU 868 MHz, 5 jours d'autonomie, 5–10 km de portée à vue, sans abonnement."
        price="99"
        url="/kits/decouverte"
        sku="MAI-KIT-DECOUVERTE-V1"
        availability="PreOrder"
      />
      <SiteHeader />
      <main id="main">
        {/* HERO — split asymétrique 7/5 */}
        <section
          aria-labelledby="kit-hero"
          className="border-b border-[color:var(--color-divider)]"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12">
            <div className="lg:col-span-7 px-6 lg:px-10 pt-12 lg:pt-20 pb-16 lg:border-r border-[color:var(--color-divider)]">
              <div className="flex items-center gap-4 mb-12">
                <span className="font-mono text-[11px] tracking-[0.18em] uppercase text-[color:var(--color-hazard)]">
                  Kit&nbsp;01 · Découverte
                </span>
                <span aria-hidden="true" className="flex-1 border-t border-[color:var(--color-divider)]" />
              </div>

              <h1
                id="kit-hero"
                className="macro text-[clamp(56px,11vw,160px)] text-[color:var(--color-phosphor)]"
              >
                POUR
                <br />
                DEUX
                <span className="text-[color:var(--color-hazard)]" aria-hidden="true">.</span>
                <br />
                <span className="text-[color:var(--color-phosphor-dim)]">LE PREMIER</span>
                <br />
                PAS.
              </h1>

              <p className="mt-12 max-w-2xl font-mono text-[14px] lg:text-[15px] text-[color:var(--color-phosphor-dim)] leading-[1.7]">
                Deux nœuds Meshtastic préconfigurés, prêts en trois minutes.
                La porte d&apos;entrée la moins chère pour comprendre ce que
                le mesh longue portée peut faire pour vous — sans abonnement,
                sans satellite, sans licence.
              </p>
            </div>

            {/* Bloc prix brutalist */}
            <aside className="lg:col-span-5 px-6 lg:px-10 pt-12 lg:pt-20 pb-16 flex items-end bg-[color:var(--color-substrate-2)]">
              <div className="border border-[color:var(--color-hazard)] p-6 lg:p-8 w-full">
                <p className="font-mono text-[11px] tracking-[0.18em] uppercase text-[color:var(--color-hazard)] mb-4 font-bold">
                  Prix TTC
                </p>
                <div className="flex items-baseline gap-3 mb-2">
                  <span className="macro text-[clamp(64px,9vw,112px)] text-[color:var(--color-phosphor)] tabular-nums leading-none">
                    99
                  </span>
                  <span className="macro text-[clamp(24px,3vw,32px)] text-[color:var(--color-phosphor-dim)]">
                    €
                  </span>
                </div>
                <p className="font-mono text-[11px] tracking-[0.05em] text-[color:var(--color-phosphor-dim)] mb-6">
                  Livraison France métropolitaine 5–7 jours
                </p>
                <span aria-hidden="true" className="block divider-solid mb-6" />
                <Link
                  href="/#preorder"
                  className="btn-tactical btn-tactical-hazard w-full justify-between"
                >
                  <span>PRÉ-COMMANDER</span>
                  <span aria-hidden="true">{" ›"}</span>
                </Link>
                <p className="mt-4 font-mono text-[10px] tracking-[0.05em] text-[color:var(--color-phosphor-dim)] leading-[1.6]">
                  Disponible juin 2026. Pas de paiement aujourd&apos;hui.
                </p>
              </div>
            </aside>
          </div>
        </section>

        {/* CONTENU DE LA BOÎTE */}
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
                Ce qu&apos;il y a dans la boîte.
              </h2>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-12">
              {FEATURES.map((block, i) => (
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

        {/* SCÉNARIOS */}
        <section
          aria-labelledby="scenarios-heading"
          className="border-b border-[color:var(--color-divider)] py-20 lg:py-28 bg-[color:var(--color-substrate-2)]"
        >
          <div className="max-w-7xl mx-auto px-6 lg:px-10">
            <header className="mb-16 grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-8">
                <p className="font-mono text-[11px] tracking-[0.18em] uppercase text-[color:var(--color-phosphor-dim)] mb-4">
                  Trois usages concrets
                </p>
                <h2
                  id="scenarios-heading"
                  className="font-mono text-[clamp(24px,3vw,40px)] text-[color:var(--color-phosphor)] leading-[1.2] font-bold"
                >
                  Quand ça change la donne.
                </h2>
              </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[color:var(--color-divider)] border border-[color:var(--color-divider)]">
              {SCENARIOS.map((s) => (
                <article key={s.title} className="p-6 lg:p-8">
                  <h3 className="font-mono text-[16px] text-[color:var(--color-phosphor)] mb-3 font-bold">
                    {s.title}
                  </h3>
                  <p className="font-mono text-[13px] text-[color:var(--color-phosphor-dim)] leading-[1.65]">
                    {s.body}
                  </p>
                </article>
              ))}
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
                On préfère vous le dire avant l&apos;achat.
              </h2>
            </header>

            <ol className="list-none p-0 m-0 space-y-0">
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
              Prêt à démarrer ?
            </p>
            <h2
              id="cta-heading"
              className="font-mono text-[clamp(22px,3vw,36px)] text-[color:var(--color-phosphor)] leading-[1.2] font-bold mb-6"
            >
              Inscrivez-vous, sans engagement.
            </h2>
            <p className="font-mono text-[14px] text-[color:var(--color-phosphor-dim)] leading-[1.7] mb-10 max-w-2xl mx-auto">
              Vous recevez un email au lancement. Vous décidez à ce moment-là.
            </p>
            <Link href="/#preorder" className="btn-tactical btn-tactical-hazard inline-flex">
              <span>Pré-commander le Kit Découverte</span>
              <span aria-hidden="true">{" ›"}</span>
            </Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
