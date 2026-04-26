import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@components/SiteHeader";
import { SiteFooter } from "@components/SiteFooter";

export const metadata: Metadata = {
  title: "Kit Secours — 1 199 €",
  description:
    "Six secouristes terrain en boîtier IP67, deux relais redondants, une console PC. Conçu pour les associations FFSS, ADRASEC, Croix-Rouge qui interviennent en zone blanche.",
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

export default function KitSecoursPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="bg-[color:var(--color-sand)] py-20 lg:py-28">
          <div className="mx-auto max-w-6xl px-6 lg:px-10">
            <p className="eyebrow text-[color:var(--color-signal)] mb-6">
              Kit Secours · 1 199 € TTC
            </p>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
              <div className="lg:col-span-7">
                <h1 className="maillon-hero text-[clamp(2.4rem,5vw,4.5rem)] leading-[1.05]">
                  Pour les FFSS.<br />
                  <span className="italic font-light">Pour les ADRASEC.</span>
                </h1>
                <p className="text-xl mt-8 text-[color:var(--color-charcoal)]/80 max-w-2xl">
                  Six secouristes terrain en boîtier IP67, deux relais
                  redondants, une console PC opérateur. Couverture
                  opérationnelle 30 km². Conçu pour les associations
                  bénévoles qui interviennent en zone blanche, sans
                  budget pour des radios DMR à 1 500 € pièce.
                </p>
              </div>
              <div className="lg:col-span-5">
                <div className="bg-white border border-[color:var(--color-charcoal)]/10 rounded-lg p-8">
                  <p className="text-6xl font-bold tabular-nums">1 199 €</p>
                  <p className="text-sm text-[color:var(--color-charcoal)]/60 mt-1 mb-8">
                    TTC, livré et configuré 10–15 jours
                  </p>
                  <Link
                    href="/contact?sujet=kit-secours"
                    className="block w-full text-center bg-[color:var(--color-signal)] hover:bg-[color:var(--color-charcoal)] text-[color:var(--color-charcoal)] hover:text-[color:var(--color-sand)] px-6 py-3.5 rounded-md text-base font-medium transition-colors"
                  >
                    Demander un devis&nbsp;›
                  </Link>
                  <p className="mt-4 text-xs text-[color:var(--color-charcoal)]/55">
                    Appel découverte 30 minutes offert. Démo terrain possible.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 lg:py-28">
          <div className="mx-auto max-w-6xl px-6 lg:px-10">
            <h2 className="text-3xl lg:text-4xl font-bold tracking-tight mb-12">
              Ce que vous recevez.
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
                          className="mt-2 block w-1.5 h-1.5 rounded-full bg-[color:var(--color-signal)] flex-shrink-0"
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
              Trois scénarios d&apos;intervention
            </p>
            <h2 className="text-3xl lg:text-4xl font-bold tracking-tight mb-12">
              Quand chaque seconde compte.
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {SCENARIOS.map((s) => (
                <div
                  key={s.title}
                  className="border-l-2 border-[color:var(--color-signal)] pl-6"
                >
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
          <div className="mx-auto max-w-5xl px-6 lg:px-10">
            <p className="eyebrow text-[color:var(--color-forest)] mb-6">
              Économies réelles
            </p>
            <h2 className="text-3xl lg:text-4xl font-bold tracking-tight mb-12">
              Pour 6 secouristes équipés, sur 5 ans.
            </h2>
            <div className="overflow-x-auto -mx-6 lg:mx-0">
              <table className="w-full min-w-[560px] text-base">
                <thead>
                  <tr className="border-b-2 border-[color:var(--color-charcoal)]/15">
                    <th className="text-left py-4 px-6 text-sm font-medium text-[color:var(--color-charcoal)]/60">
                      Poste
                    </th>
                    <th className="text-left py-4 px-6 text-sm font-medium text-[color:var(--color-charcoal)]/60">
                      DMR Hytera
                    </th>
                    <th className="text-left py-4 px-6 text-sm font-medium text-[color:var(--color-forest)]">
                      Kit Secours MAILLON
                    </th>
                  </tr>
                </thead>
                <tbody className="font-mono text-sm tabular-nums">
                  <tr className="border-b border-[color:var(--color-charcoal)]/10">
                    <td className="py-4 px-6 font-sans">6 radios</td>
                    <td className="py-4 px-6">9 000 €</td>
                    <td className="py-4 px-6">inclus</td>
                  </tr>
                  <tr className="border-b border-[color:var(--color-charcoal)]/10">
                    <td className="py-4 px-6 font-sans">Console PC opérateur</td>
                    <td className="py-4 px-6">4 000 €</td>
                    <td className="py-4 px-6">inclus</td>
                  </tr>
                  <tr className="border-b border-[color:var(--color-charcoal)]/10">
                    <td className="py-4 px-6 font-sans">Carto temps réel</td>
                    <td className="py-4 px-6">2 000 €</td>
                    <td className="py-4 px-6">inclus (SaaS)</td>
                  </tr>
                  <tr className="border-b border-[color:var(--color-charcoal)]/10">
                    <td className="py-4 px-6 font-sans">Licence ARCEP (5 ans)</td>
                    <td className="py-4 px-6">4 000 €</td>
                    <td className="py-4 px-6">0 €</td>
                  </tr>
                  <tr className="border-b border-[color:var(--color-charcoal)]/10">
                    <td className="py-4 px-6 font-sans">Formation</td>
                    <td className="py-4 px-6">1 500 €</td>
                    <td className="py-4 px-6">incluse (1/2 j)</td>
                  </tr>
                  <tr>
                    <td className="py-5 px-6 font-sans font-semibold">Total 5 ans</td>
                    <td className="py-5 px-6 text-lg">~20 500 €</td>
                    <td className="py-5 px-6 text-lg text-[color:var(--color-forest)] font-semibold">
                      ~1 740 €
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="mt-8 text-base text-[color:var(--color-charcoal)]/70 max-w-3xl">
              Pour une asso bénévole, c&apos;est <strong>~18 700 € économisés</strong> sur
              cinq ans, soit l&apos;équivalent de plusieurs interventions
              majeures financées. Économies réinvestissables dans
              d&apos;autres équipements vitaux.
            </p>
          </div>
        </section>

        <section className="bg-[color:var(--color-charcoal)]/95 text-[color:var(--color-sand)] py-12">
          <div className="mx-auto max-w-4xl px-6 lg:px-10">
            <p className="font-semibold mb-3">
              Important — MAILLON n&apos;est pas un substitut au réseau Antarès
              ni au 112.
            </p>
            <p className="text-sm text-[color:var(--color-sand)]/70">
              Les communications officielles de la sécurité civile française
              passent par Antarès (sapeurs-pompiers professionnels) et le
              112. MAILLON est un outil d&apos;appoint pour les associations
              bénévoles, qui complète mais ne remplace pas ces réseaux
              officiels. Avant déploiement opérationnel, vérifier la
              compatibilité avec les protocoles de votre fédération
              (FFSS, FFRS, ADRASEC, etc.) et de votre préfecture.
            </p>
          </div>
        </section>

        <section className="bg-[color:var(--color-forest)] text-[color:var(--color-sand)] py-20">
          <div className="mx-auto max-w-3xl px-6 lg:px-10 text-center">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              Démo terrain possible.
            </h2>
            <p className="text-lg text-[color:var(--color-sand)]/85 mb-8">
              On vient avec un kit complet, on le met en route avec votre
              équipe, on simule une intervention. Vous gardez le matériel
              une semaine pour le tester en vrai. Aucun engagement.
            </p>
            <Link
              href="/contact?sujet=kit-secours"
              className="inline-flex bg-[color:var(--color-signal)] hover:bg-[color:var(--color-sand)] hover:text-[color:var(--color-forest)] text-[color:var(--color-charcoal)] px-8 py-4 rounded-md text-base font-semibold transition-colors"
            >
              Réserver une démo&nbsp;›
            </Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
