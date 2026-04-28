import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@components/SiteHeader";
import { SiteFooter } from "@components/SiteFooter";

export const metadata: Metadata = {
  title: "Cinq terrains où MAILLON tient",
  description:
    "Secours bénévoles, chantiers BTP, festivals, outdoor, agriculture extensive — cinq cas d'usage où MAILLON garde une équipe en lien là où le mobile lâche et où le satellite coûte trop cher.",
  alternates: { canonical: "https://maillon.fr/cas-usage" },
};

type Verticale = {
  id: string;
  index: string;
  title: string;
  subtitle: string;
  paragraphs: string[];
  metrics: { label: string; value: string }[];
  protagonists: string[];
  recommendedKit: { name: string; href: string; price: string };
};

const VERTICALES: Verticale[] = [
  {
    id: "secours",
    index: "01",
    title: "Secours bénévoles",
    subtitle: "FFSS · ADRASEC · SDIS bénévoles · Croix-Rouge",
    paragraphs: [
      "Une intervention en zone blanche démarre souvent par 4 minutes de jonction radio chaotique. Le pilote en patrouille a perdu le contact avec le PC base, le médecin n'a pas la position GPS du blessé, l'équipe relais arrive sans savoir où aller.",
      "MAILLON ramène cette latence à 30 secondes. Texte chiffré bout-en-bout, position GPS partagée toutes les 60 s, alertes silencieuses sur l'app équipe — pour 1 199 € au lieu des 16 500 € d'un dispositif Tetra équivalent.",
    ],
    metrics: [
      { label: "Latence jonction", value: "30 s" },
      { label: "Coût équivalent Tetra", value: "16 500 €" },
      { label: "Coût MAILLON", value: "1 199 €" },
    ],
    protagonists: [
      "Pilote patrouille",
      "Médecin urgentiste",
      "PC base",
      "Équipe relais",
    ],
    recommendedKit: { name: "Kit Secours", href: "/kits/secours", price: "1 199 €" },
  },
  {
    id: "btp",
    index: "02",
    title: "Chantiers BTP",
    subtitle: "Forêt · Carrière · Pose réseau · Photovoltaïque",
    paragraphs: [
      "Conducteur de travaux au bureau, équipes sur le chantier à 8 km. Pas de SIM, pas de licence radio professionnelle, pas de relais à louer au mois. Aujourd'hui, le contact se fait par retour à la base toutes les 90 minutes.",
      "MAILLON garde le lien permanent. Le conducteur voit ses 4 équipes en temps réel, déclenche une alerte sécurité en un clic, archive les positions pour le PV journal. Sans dépendre d'un opérateur télécom qui ne déploie rien dans cette vallée.",
    ],
    metrics: [
      { label: "Portée typique", value: "5–15 km" },
      { label: "Équipes simultanées", value: "8" },
      { label: "Abonnement mensuel", value: "0 €" },
    ],
    protagonists: [
      "Conducteur de travaux",
      "Chef de chantier",
      "Équipes terrain",
      "Bureau d'études",
    ],
    recommendedKit: { name: "Kit Pro", href: "/kits/pro", price: "399 €" },
  },
  {
    id: "festival",
    index: "03",
    title: "Festivals & événementiel",
    subtitle: "Sécurité · Logistique · Médical · Backstage",
    paragraphs: [
      "Pour un festival de 3 jours, 80 talkies de location coûtent 1 920 € HT — et n'incluent ni messagerie écrite, ni géofence backstage, ni replay des événements en cas d'incident.",
      "Un Kit Pro MAILLON est amorti dès la deuxième édition. Géofences sur les zones critiques, alertes médical instantanées vers le PC sécu, journal complet exportable post-event pour le débrief assurance.",
    ],
    metrics: [
      { label: "Coût location 3 j (équiv.)", value: "1 920 €" },
      { label: "Achat MAILLON Pro", value: "399 €" },
      { label: "Amortissement", value: "2 éditions" },
    ],
    protagonists: [
      "PC sécurité",
      "Régie médicale",
      "Logistique technique",
      "Régie backstage",
    ],
    recommendedKit: { name: "Kit Pro", href: "/kits/pro", price: "399 €" },
  },
  {
    id: "outdoor",
    index: "04",
    title: "Outdoor & expéditions",
    subtitle: "Alpinisme · Trail · Voile côtière · Overland",
    paragraphs: [
      "Un Garmin inReach Mini coûte 450 € hardware, plus 15 € par mois d'abonnement Iridium. Sur 5 ans, c'est 1 350 €. Et c'est du 1-vers-base satellite, pas de messagerie de groupe entre cordées.",
      "Le Kit Découverte MAILLON pour deux : 99 €. Aucun abonnement. Messages de groupe, position partagée, fonctionne en altitude comme en fond de vallée. Pour les expéditions polaires extrêmes, Garmin reste pertinent — pour tout le reste, MAILLON suffit.",
    ],
    metrics: [
      { label: "Garmin inReach 5 ans", value: "1 350 €" },
      { label: "MAILLON Découverte 2 nœuds", value: "99 €" },
      { label: "Économie", value: "1 251 €" },
    ],
    protagonists: [
      "Cordée alpinisme",
      "Trail solo / paire",
      "Équipages voile côtière",
      "Voyage overland 4×4",
    ],
    recommendedKit: { name: "Kit Découverte", href: "/kits/decouverte", price: "99 €" },
  },
  {
    id: "agri",
    index: "05",
    title: "Agriculture extensive",
    subtitle: "Estive · Saisonniers · Multi-sites · Bergers",
    paragraphs: [
      "50 % du foncier agricole français est en zone blanche cellulaire. Coordonner trois bergers sur 800 ha d'estive sans risquer la sécurité d'un saisonnier isolé impose aujourd'hui un check-point toutes les 4 heures, à pied ou à cheval.",
      "Avec MAILLON, le berger envoie sa position toutes les 5 minutes au gîte, la responsable d'estive voit toute l'équipe sur une carte, déclenche une alerte si quelqu'un sort de zone ou ne bouge plus pendant 30 minutes (homme à terre).",
    ],
    metrics: [
      { label: "Foncier agricole en zone blanche", value: "50 %" },
      { label: "Surface couvrable par kit", value: "1 000 ha" },
      { label: "Coût par berger", value: "200 €" },
    ],
    protagonists: [
      "Berger d'estive",
      "Responsable saisonniers",
      "Multi-sites élevage",
      "Vétérinaire itinérant",
    ],
    recommendedKit: { name: "Kit Pro", href: "/kits/pro", price: "399 €" },
  },
];

export default function CasUsagePage() {
  return (
    <>
      <SiteHeader />
      <main id="main">
        {/* HERO — split asymétrique 8/4 brutalist */}
        <section
          aria-labelledby="cas-hero"
          className="border-b border-[color:var(--color-divider)]"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12">
            <div className="lg:col-span-8 px-6 lg:px-10 pt-12 lg:pt-20 pb-16 lg:border-r border-[color:var(--color-divider)]">
              <div className="flex items-center gap-4 mb-12">
                <span className="font-mono text-[10px] tracking-[0.22em] uppercase text-[color:var(--color-hazard)]" aria-hidden="true">
                  [ TERRAINS&nbsp;/&nbsp;5&nbsp;DOSSIERS ]
                </span>
                <span aria-hidden="true" className="flex-1 border-t border-[color:var(--color-divider)]" />
                <span className="font-mono text-[10px] tracking-[0.18em] uppercase text-[color:var(--color-phosphor-dim)]">
                  CAS_USAGE.LOG
                </span>
              </div>

              <h1
                id="cas-hero"
                className="macro text-[clamp(56px,11vw,160px)] text-[color:var(--color-phosphor)]"
              >
                CINQ
                <br />
                MONDES
                <span className="text-[color:var(--color-hazard)]" aria-hidden="true">.</span>
                <br />
                <span className="text-[color:var(--color-phosphor-dim)]">UN MÊME</span>
                <br />
                BESOIN.
              </h1>

              <p className="mt-12 max-w-2xl font-mono text-[14px] lg:text-[15px] text-[color:var(--color-phosphor-dim)] leading-[1.7]">
                Voici cinq terrains précis où MAILLON ne fait pas mieux qu&apos;une
                radio pro &mdash; mais beaucoup mieux que rien, beaucoup moins
                cher qu&apos;un satellite, et infiniment plus discret qu&apos;un
                opérateur cellulaire absent. Si vous opérez dans un de ces
                contextes, le calcul est simple.
              </p>
            </div>

            <aside className="lg:col-span-4 px-6 lg:px-10 pt-12 lg:pt-20 pb-16">
              <div className="border border-[color:var(--color-divider)] p-6 bg-[color:var(--color-substrate-2)]">
                <p className="font-mono text-[10px] tracking-[0.22em] uppercase text-[color:var(--color-hazard)] mb-4" aria-hidden="true">
                  [ SOMMAIRE ]
                </p>
                <ul className="font-mono text-[12px] uppercase tracking-[0.1em] space-y-3 list-none p-0 m-0">
                  {VERTICALES.map((v) => (
                    <li key={v.id} className="grid grid-cols-[auto_1fr] gap-3">
                      <span className="text-[color:var(--color-hazard)] tabular-nums" aria-hidden="true">
                        /{v.index}
                      </span>
                      <a
                        href={`#${v.id}`}
                        className="text-[color:var(--color-phosphor-dim)] hover:text-[color:var(--color-phosphor)] maillon-link tap-target"
                      >
                        {v.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </div>
        </section>

        {/* DOSSIERS détaillés — chaque verticale en bloc plein écran */}
        {VERTICALES.map((v, i) => (
          <section
            key={v.id}
            id={v.id}
            aria-labelledby={`${v.id}-title`}
            className={`px-6 lg:px-10 py-20 lg:py-28 border-b border-[color:var(--color-divider)] ${
              i % 2 === 1 ? "bg-[color:var(--color-substrate-2)]" : ""
            }`}
          >
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-x-8 gap-y-12">
              {/* Colonne gauche — index + titre */}
              <header className="lg:col-span-4">
                <div className="flex items-baseline gap-4 mb-6">
                  <span
                    className="macro text-[clamp(72px,8vw,128px)] text-[color:var(--color-hazard)] tabular-nums leading-none"
                    aria-hidden="true"
                  >
                    {v.index}
                  </span>
                  <span className="font-mono text-[10px] tracking-[0.22em] uppercase text-[color:var(--color-phosphor-dim)]">
                    DOSSIER
                  </span>
                </div>
                <h2
                  id={`${v.id}-title`}
                  className="macro text-[clamp(32px,4vw,56px)] text-[color:var(--color-phosphor)] leading-[0.92] mb-6"
                >
                  {v.title}
                </h2>
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[color:var(--color-phosphor-dim)]">
                  {v.subtitle}
                </p>
              </header>

              {/* Colonne centrale — narratif */}
              <div className="lg:col-span-5">
                {v.paragraphs.map((p, idx) => (
                  <p
                    key={idx}
                    className="font-mono text-[14px] text-[color:var(--color-phosphor)] leading-[1.7] mb-5 last:mb-0"
                  >
                    {p}
                  </p>
                ))}

                <div className="mt-10 border-t border-[color:var(--color-divider)] pt-6">
                  <p className="font-mono text-[10px] tracking-[0.22em] uppercase text-[color:var(--color-hazard)] mb-3" aria-hidden="true">
                    [ PROTAGONISTES ]
                  </p>
                  <ul className="flex flex-wrap gap-x-3 gap-y-1 list-none p-0 m-0 font-mono text-[11px] uppercase tracking-[0.12em] text-[color:var(--color-phosphor-dim)]">
                    {v.protagonists.map((p, idx) => (
                      <li key={p}>
                        {p}
                        {idx < v.protagonists.length - 1 && (
                          <span aria-hidden="true" className="ml-3">|</span>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Colonne droite — métriques + recommandation kit */}
              <aside className="lg:col-span-3 flex flex-col gap-6">
                <div className="border border-[color:var(--color-divider)] p-5">
                  <p className="font-mono text-[10px] tracking-[0.22em] uppercase text-[color:var(--color-hazard)] mb-4" aria-hidden="true">
                    [ MÉTRIQUES ]
                  </p>
                  <dl className="space-y-3 font-mono text-[12px]">
                    {v.metrics.map((m) => (
                      <div key={m.label} className="grid grid-cols-1 gap-1">
                        <dt className="text-[color:var(--color-phosphor-dim)] text-[10px] uppercase tracking-[0.12em]">
                          {m.label}
                        </dt>
                        <dd className="text-[color:var(--color-phosphor)] tabular-nums text-[18px] font-bold">
                          {m.value}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>

                <div className="border border-[color:var(--color-hazard)] p-5">
                  <p className="font-mono text-[10px] tracking-[0.22em] uppercase text-[color:var(--color-hazard)] mb-3" aria-hidden="true">
                    [ KIT RECOMMANDÉ ]
                  </p>
                  <p className="macro text-[28px] text-[color:var(--color-phosphor)] mb-3 leading-[0.95]">
                    {v.recommendedKit.name}
                  </p>
                  <p className="font-mono text-[18px] text-[color:var(--color-hazard)] tabular-nums mb-4">
                    {v.recommendedKit.price}
                  </p>
                  <Link
                    href={v.recommendedKit.href}
                    className="btn-tactical btn-tactical-hazard w-full justify-between text-[10px]"
                  >
                    <span>VOIR LE KIT</span>
                    <span aria-hidden="true">{" ›"}</span>
                  </Link>
                </div>
              </aside>
            </div>
          </section>
        ))}

        {/* CTA final — même pattern que home preorder mais léger */}
        <section
          aria-labelledby="cas-cta"
          className="px-6 lg:px-10 py-24 border-b-2 border-[color:var(--color-hazard)]"
        >
          <div className="max-w-4xl mx-auto text-center">
            <p className="font-mono text-[10px] tracking-[0.22em] uppercase text-[color:var(--color-hazard)] mb-8" aria-hidden="true">
              [ VOTRE TERRAIN N&apos;EST PAS LISTÉ ? ]
            </p>
            <h2
              id="cas-cta"
              className="macro text-[clamp(40px,6vw,80px)] text-[color:var(--color-phosphor)] leading-[0.9] mb-8"
            >
              ON EN PARLE.
              <br />
              <span className="text-[color:var(--color-phosphor-dim)]">VINGT MINUTES.</span>
            </h2>
            <p className="font-mono text-[14px] text-[color:var(--color-phosphor-dim)] leading-[1.7] mb-10 max-w-2xl mx-auto">
              Vous opérez en zone blanche dans un secteur que nous n&apos;avons pas
              cartographié&nbsp;? Logistique, eau, ski, forêt, expédition
              scientifique&nbsp;? On échange 20 minutes par téléphone pour
              comprendre votre besoin avant de proposer quoi que ce soit.
            </p>
            <Link href="/contact" className="btn-tactical btn-tactical-hazard inline-flex">
              <span>PRENDRE RENDEZ-VOUS</span>
              <span aria-hidden="true">{" ›"}</span>
            </Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
