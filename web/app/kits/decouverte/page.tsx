import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@components/SiteHeader";
import { SiteFooter } from "@components/SiteFooter";

export const metadata: Metadata = {
  title: "Kit Découverte — 99 €",
  description:
    "Le kit MAILLON d'entrée. Deux nœuds Meshtastic préconfigurés, 5 à 10 km de portée, 5 jours d'autonomie. Sans abonnement, sans satellite, sans licence.",
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

export default function KitDecouvertePage() {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="bg-[color:var(--color-sand)] py-20 lg:py-28">
          <div className="mx-auto max-w-6xl px-6 lg:px-10">
            <p className="eyebrow text-[color:var(--color-forest)] mb-6">
              Kit Découverte · 99 € TTC
            </p>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
              <div className="lg:col-span-7">
                <h1 className="maillon-hero text-[clamp(2.4rem,5vw,4.5rem)] leading-[1.05]">
                  Pour deux.<br />
                  <span className="italic font-light">Le premier pas.</span>
                </h1>
                <p className="text-xl mt-8 text-[color:var(--color-charcoal)]/80 max-w-2xl">
                  Deux nœuds Meshtastic préconfigurés, prêts en trois
                  minutes. La porte d&apos;entrée la moins chère pour
                  comprendre ce que le mesh longue portée peut faire pour
                  vous — sans abonnement, sans satellite, sans licence.
                </p>
              </div>
              <div className="lg:col-span-5">
                <div className="bg-white border border-[color:var(--color-charcoal)]/10 rounded-lg p-8">
                  <p className="text-6xl font-bold tabular-nums">99 €</p>
                  <p className="text-sm text-[color:var(--color-charcoal)]/60 mt-1 mb-8">
                    TTC, livraison France métropolitaine 5–7 jours
                  </p>
                  <Link
                    href="/#preorder"
                    className="block w-full text-center bg-[color:var(--color-forest)] hover:bg-[color:var(--color-charcoal)] text-[color:var(--color-sand)] px-6 py-3.5 rounded-md text-base font-medium transition-colors"
                  >
                    Pré-commander&nbsp;›
                  </Link>
                  <p className="mt-4 text-xs text-[color:var(--color-charcoal)]/55">
                    Disponible juin 2026. Pas de paiement aujourd&apos;hui.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 lg:py-28">
          <div className="mx-auto max-w-6xl px-6 lg:px-10">
            <h2 className="text-3xl lg:text-4xl font-bold tracking-tight mb-12">
              Ce qu&apos;il y a dans la boîte.
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
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
          <div className="mx-auto max-w-6xl px-6 lg:px-10">
            <p className="eyebrow text-[color:var(--color-moss)] mb-6">
              Trois usages concrets
            </p>
            <h2 className="text-3xl lg:text-4xl font-bold tracking-tight mb-12">
              Quand ça change la donne.
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {SCENARIOS.map((s) => (
                <div key={s.title} className="border-l-2 border-[color:var(--color-moss)] pl-6">
                  <h3 className="text-xl font-semibold mb-3">{s.title}</h3>
                  <p className="text-[color:var(--color-sand)]/75 leading-relaxed">
                    {s.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 lg:py-28">
          <div className="mx-auto max-w-3xl px-6 lg:px-10">
            <p className="eyebrow text-[color:var(--color-forest)] mb-6">
              Limites à connaître
            </p>
            <h2 className="text-3xl font-bold tracking-tight mb-8">
              On préfère vous le dire avant l&apos;achat.
            </h2>
            <ul className="space-y-5 text-base text-[color:var(--color-charcoal)]/85">
              <li>
                <strong>Ce n&apos;est pas un service de secours officiel.</strong>{" "}
                En cas d&apos;urgence vitale, composez le 112. MAILLON
                est un outil d&apos;appoint, jamais un substitut au SAMU
                ou aux pompiers.
              </li>
              <li>
                <strong>La portée dépend du terrain.</strong> 5 à 10 km
                en terrain ouvert. 1 à 3 km en zone urbaine dense.
                Moins de 1 km en intérieur béton.
              </li>
              <li>
                <strong>Pas de voix.</strong> Le mesh LoRa transmet du
                texte, des positions GPS et de la télémétrie. Pas de
                voix temps réel — c&apos;est un trade-off pour la
                portée et l&apos;autonomie.
              </li>
              <li>
                <strong>Hors couverture extrême&nbsp;?</strong> Si vous
                partez seul·e en expédition polaire ou en plein océan,
                un communicateur satellite Garmin reste pertinent.
                MAILLON couvre tous les autres usages.
              </li>
            </ul>
          </div>
        </section>

        <section className="bg-[color:var(--color-forest)] text-[color:var(--color-sand)] py-20">
          <div className="mx-auto max-w-3xl px-6 lg:px-10 text-center">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              Prêt à démarrer&nbsp;?
            </h2>
            <p className="text-lg text-[color:var(--color-sand)]/85 mb-8">
              Inscrivez-vous à la pré-commande. Vous recevrez un email
              au moment du lancement, sans engagement.
            </p>
            <Link
              href="/#preorder"
              className="inline-flex bg-[color:var(--color-signal)] hover:bg-[color:var(--color-sand)] hover:text-[color:var(--color-forest)] text-[color:var(--color-charcoal)] px-8 py-4 rounded-md text-base font-semibold transition-colors"
            >
              Pré-commander le Kit Découverte&nbsp;›
            </Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
