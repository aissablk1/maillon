import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@components/SiteHeader";
import { SiteFooter } from "@components/SiteFooter";
import { ProductSchema } from "@components/ProductSchema";

export const metadata: Metadata = {
  title: "Kit Secours — 1 199 €",
  description:
    "Six secouristes terrain en boîtier IP67, deux relais redondants, une console PC. Conçu pour les associations FFSS, ADRASEC, Croix-Rouge qui interviennent en zone blanche.",
  alternates: { canonical: "https://github.com/aissablk1/maillon/kits/secours" },
};

const FEATURES = [
  {
    title: "Hardware terrain",
    items: [
      "6× RAK4631 (firmware Meshtastic, configuration MAILLON Secours)",
      "Boîtier IP67 antichoc avec lampe LED de secours intégrée",
      "Pavé tactile, écran haute lisibilité solaire",
      "Marquage CE, conformité ETSI",
    ],
  },
  {
    title: "Relais et console",
    items: [
      "2× Station G2 redondantes (mesh auto-routing en cas de panne)",
      "1× LILYGO T-Deck Plus (console PC opérateur, écran + clavier)",
      "1× antenne Yagi 12 dBi directionnelle (pointage zone d'intervention)",
      "2× antennes fibre 7 dBi omni",
    ],
  },
  {
    title: "Logistique",
    items: [
      "Mallette renforcée Pelican-like 50×35×18 cm",
      "Mousse découpée custom MAILLON",
      "Câbles SMA, fixations, support trépied antenne",
      "Notice 24 pages avec scénarios d'intervention détaillés",
    ],
  },
  {
    title: "Services inclus",
    items: [
      "6 mois SaaS Team inclus (jusqu'à 50 nœuds, valeur ~270 €)",
      "1 demi-journée de formation à distance offerte (visio, scénarios)",
      "Configuration sur-mesure : noms d'équipes, canaux par mission, géofences",
      "Support prioritaire < 4h ouvrées",
      "Garantie 24 mois + remplacement express en cas de défaut critique",
      "Programme Référents MAILLON Secours (réseau d'asso utilisatrices)",
    ],
  },
];

const SCENARIOS = [
  {
    title: "Recherche de personne disparue",
    body: "Six secouristes ratissent un massif. Le PC central voit chaque équipe en temps réel sur une carte. Quand l'un trouve la personne, le message envoyé met 8 secondes à arriver — texte, position, demande d'extraction.",
  },
  {
    title: "Exercice annuel multi-équipes",
    body: "Coordonner 30 personnes sur un exercice grandeur nature. Géofences pour chaque zone. Replay post-exercice pour le débrief. Audit log pour la traçabilité.",
  },
  {
    title: "Intervention spéléo",
    body: "Un blessé à 800 mètres sous terre. Relais surface intermédiaire posé à l'entrée du gouffre, second relais en surface sur sommet. Le PC reçoit les positions des équipes successives jusqu'à la jonction.",
  },
];

const COMPARISON = [
  ["6 radios", "9 000 €", "inclus"],
  ["Console PC opérateur", "4 000 €", "inclus"],
  ["Carto temps réel", "2 000 €", "inclus (SaaS)"],
  ["Licence ARCEP (5 ans)", "4 000 €", "0 €"],
  ["Formation", "1 500 €", "incluse (1/2 j)"],
];

export default function KitSecoursPage() {
  return (
    <>
      <ProductSchema
        name="MAILLON Kit Secours"
        description="Kit Meshtastic pour associations de secours bénévoles : 6× RAK4631 IP67 antichoc, 2× stations G2 redondantes, console PC T-Deck Plus, 6 mois SaaS Team, demi-journée formation incluse."
        price="1199"
        url="/kits/secours"
        sku="MAI-KIT-SECOURS-V1"
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
                  Kit&nbsp;03 · Secours
                </span>
                <span aria-hidden="true" className="flex-1 border-t border-[color:var(--color-divider)]" />
              </div>

              <h1
                id="kit-hero"
                className="macro text-[clamp(56px,11vw,160px)] text-[color:var(--color-phosphor)]"
              >
                FFSS
                <span className="text-[color:var(--color-hazard)]" aria-hidden="true">.</span>
                <br />
                <span className="text-[color:var(--color-phosphor-dim)]">ADRASEC.</span>
                <br />
                CROIX-ROUGE.
              </h1>

              <p className="mt-12 max-w-2xl font-mono text-[14px] lg:text-[15px] text-[color:var(--color-phosphor-dim)] leading-[1.7]">
                Six secouristes terrain en boîtier IP67, deux relais
                redondants, une console PC opérateur. Couverture opérationnelle
                30 km². Conçu pour les associations bénévoles qui interviennent
                en zone blanche, sans budget pour des radios DMR à 1 500 € pièce.
              </p>
            </div>

            <aside className="lg:col-span-5 px-6 lg:px-10 pt-12 lg:pt-20 pb-16 flex items-end bg-[color:var(--color-substrate-2)]">
              <div className="border border-[color:var(--color-hazard)] p-6 lg:p-8 w-full">
                <p className="font-mono text-[11px] tracking-[0.18em] uppercase text-[color:var(--color-hazard)] mb-4 font-bold">
                  Prix TTC
                </p>
                <div className="flex items-baseline gap-3 mb-2">
                  <span className="macro text-[clamp(60px,8vw,104px)] text-[color:var(--color-phosphor)] tabular-nums leading-none">
                    1&nbsp;199
                  </span>
                  <span className="macro text-[clamp(24px,3vw,32px)] text-[color:var(--color-phosphor-dim)]">
                    €
                  </span>
                </div>
                <p className="font-mono text-[11px] tracking-[0.05em] text-[color:var(--color-phosphor-dim)] mb-6">
                  Livré et configuré 10–15 jours. Démo terrain possible.
                </p>
                <span aria-hidden="true" className="block divider-solid mb-6" />
                <Link
                  href="/contact?sujet=kit-secours"
                  className="btn-tactical btn-tactical-hazard w-full justify-between"
                >
                  <span>Demander un devis</span>
                  <span aria-hidden="true">{" ›"}</span>
                </Link>
                <p className="mt-4 font-mono text-[10px] tracking-[0.05em] text-[color:var(--color-phosphor-dim)] leading-[1.6]">
                  Appel découverte 30 minutes offert.
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
                Ce que vous recevez.
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

        {/* SCÉNARIOS */}
        <section
          aria-labelledby="scenarios-heading"
          className="border-b border-[color:var(--color-divider)] py-20 lg:py-28 bg-[color:var(--color-substrate-2)]"
        >
          <div className="max-w-7xl mx-auto px-6 lg:px-10">
            <header className="mb-16 grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-9">
                <p className="font-mono text-[11px] tracking-[0.18em] uppercase text-[color:var(--color-phosphor-dim)] mb-4">
                  Trois scénarios d&apos;intervention
                </p>
                <h2
                  id="scenarios-heading"
                  className="font-mono text-[clamp(24px,3vw,40px)] text-[color:var(--color-phosphor)] leading-[1.2] font-bold"
                >
                  Quand chaque seconde compte.
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

        {/* ÉCONOMIES TABLE */}
        <section
          aria-labelledby="bench-heading"
          className="border-b border-[color:var(--color-divider)] py-20 lg:py-28"
        >
          <div className="max-w-6xl mx-auto px-6 lg:px-10">
            <header className="mb-12 grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-9">
                <p className="font-mono text-[11px] tracking-[0.18em] uppercase text-[color:var(--color-phosphor-dim)] mb-4">
                  Comparaison sur 5&nbsp;ans — 6 secouristes
                </p>
                <h2
                  id="bench-heading"
                  className="font-mono text-[clamp(24px,3vw,40px)] text-[color:var(--color-phosphor)] leading-[1.2] font-bold"
                >
                  Kit Secours <span className="text-[color:var(--color-phosphor-dim)]">vs</span> DMR Hytera.
                </h2>
              </div>
            </header>

            <div className="overflow-x-auto -mx-6 lg:mx-0">
              <table className="w-full min-w-[560px] font-mono text-[13px]">
                <caption className="sr-only">
                  Comparaison Kit Secours MAILLON et 6 radios DMR Hytera sur 5 ans.
                </caption>
                <thead>
                  <tr className="border-y-2 border-[color:var(--color-phosphor)]">
                    <th scope="col" className="text-left py-3 px-4 text-[10px] tracking-[0.2em] uppercase text-[color:var(--color-phosphor-dim)] font-normal">
                      Poste
                    </th>
                    <th scope="col" className="text-left py-3 px-4 text-[10px] tracking-[0.2em] uppercase text-[color:var(--color-phosphor-dim)] font-normal">
                      DMR Hytera
                    </th>
                    <th scope="col" className="text-left py-3 px-4 text-[10px] tracking-[0.2em] uppercase text-[color:var(--color-hazard)] font-bold">
                      Kit Secours MAILLON
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
                      Total 5 ans
                    </th>
                    <td className="py-4 px-4 text-[color:var(--color-phosphor)] text-[18px]">
                      ~20 500 €
                    </td>
                    <td className="py-4 px-4 text-[color:var(--color-hazard)] text-[18px] font-bold">
                      ~1 740 €
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="mt-8 font-mono text-[13px] text-[color:var(--color-phosphor-dim)] max-w-3xl leading-[1.65]">
              Pour une asso bénévole, c&apos;est <span className="text-[color:var(--color-phosphor)] font-bold">~18 700 € économisés</span> sur cinq ans, soit l&apos;équivalent de plusieurs interventions
              majeures financées. Économies réinvestissables dans
              d&apos;autres équipements vitaux.
            </p>
          </div>
        </section>

        {/* DISCLAIMER */}
        <section
          aria-labelledby="warning-heading"
          role="region"
          className="px-6 lg:px-10 py-10 border-b border-[color:var(--color-divider)] bg-[color:var(--color-substrate-2)]"
        >
          <div className="max-w-4xl mx-auto font-mono text-[12px] leading-[1.7]">
            <h2
              id="warning-heading"
              className="text-[color:var(--color-hazard)] uppercase tracking-[0.15em] mb-3 font-bold text-[12px]"
            >
              <span aria-hidden="true">[ </span>AVERTISSEMENT&nbsp;/&nbsp;OBLIGATOIRE<span aria-hidden="true"> ]</span>
            </h2>
            <p className="text-[color:var(--color-phosphor-dim)]">
              MAILLON ne se substitue ni au réseau Antarès ni au{" "}
              <a href="tel:112" className="text-[color:var(--color-phosphor)] font-bold maillon-link">112</a>.
              Les communications officielles de la sécurité civile française
              passent par Antarès (sapeurs-pompiers professionnels) et le 112.
              MAILLON est un outil d&apos;appoint pour les associations bénévoles,
              qui complète mais ne remplace pas ces réseaux officiels. Avant
              déploiement opérationnel, vérifier la compatibilité avec les
              protocoles de votre fédération (FFSS, FFRS, ADRASEC, etc.) et
              de votre préfecture.
            </p>
          </div>
        </section>

        {/* CTA */}
        <section
          aria-labelledby="cta-heading"
          className="px-6 lg:px-10 py-24 border-b-2 border-[color:var(--color-hazard)]"
        >
          <div className="max-w-4xl mx-auto text-center">
            <p className="font-mono text-[11px] tracking-[0.18em] uppercase text-[color:var(--color-phosphor-dim)] mb-4">
              Démo terrain possible
            </p>
            <h2
              id="cta-heading"
              className="font-mono text-[clamp(22px,3vw,36px)] text-[color:var(--color-phosphor)] leading-[1.2] font-bold mb-6"
            >
              Une semaine pour le tester en vrai.
            </h2>
            <p className="font-mono text-[14px] text-[color:var(--color-phosphor-dim)] leading-[1.7] mb-10 max-w-2xl mx-auto">
              On vient avec un kit complet, on le met en route avec votre équipe,
              on simule une intervention. Vous gardez le matériel une semaine
              pour le tester en vrai. Aucun engagement.
            </p>
            <Link href="/contact?sujet=kit-secours" className="btn-tactical btn-tactical-hazard inline-flex">
              <span>Demander une démo</span>
              <span aria-hidden="true">{" ›"}</span>
            </Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
