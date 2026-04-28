import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@components/SiteHeader";
import { SiteFooter } from "@components/SiteFooter";

export const metadata: Metadata = {
  title: "Fleet Manager — Le SaaS MAILLON",
  description:
    "Gestion de flotte mesh longue portée pour pros : carto temps réel, géofences, alertes, replay, audit log. Hébergement UE, RGPD by design. Plans Free, Team, Business, Enterprise.",
  alternates: { canonical: "https://github.com/aissablk1/maillon/saas" },
};

const PLANS = [
  {
    name: "Free",
    price: "0 €",
    note: "Pour la communauté",
    nodes: "Jusqu'à 5 nœuds",
    features: [
      "Carto temps réel des nœuds",
      "Messagerie via navigateur",
      "Historique 7 jours",
      "Export GPX/CSV basique",
      "Authentification 2FA",
    ],
    cta: "Créer un compte",
    href: "/#preorder",
    highlight: false,
  },
  {
    name: "Team",
    price: "9 €",
    note: "/nœud/mois HT",
    nodes: "Jusqu'à 50 nœuds",
    features: [
      "Tout Free, plus",
      "Géofences avec alertes entrée/sortie",
      "Annotations carte (POI, abris, dangers)",
      "Replay temporel des trajets",
      "Webhooks Slack/Discord/email",
      "MQTT broker privé chiffré",
      "Historique 90 jours",
      "Support email < 24 h ouvrées",
    ],
    cta: "Démarrer un essai",
    href: "/contact?sujet=saas-team",
    highlight: true,
  },
  {
    name: "Business",
    price: "6 €",
    note: "/nœud/mois HT, dès 50 nœuds",
    nodes: "Jusqu'à 200 nœuds",
    features: [
      "Tout Team, plus",
      "SSO SAML/OIDC",
      "API publique REST documentée",
      "Niveaux d'accès granulaires",
      "Audit log immutable",
      "Historique 1 an",
      "Rapports PDF automatiques",
      "Support prioritaire < 4 h ouvrées",
    ],
    cta: "Demander un devis",
    href: "/contact?sujet=saas-business",
    highlight: false,
  },
  {
    name: "Enterprise",
    price: "Sur devis",
    note: "Volume illimité",
    nodes: "Multi-flottes, multi-sites",
    features: [
      "Tout Business, plus",
      "Option déploiement on-premise (Docker)",
      "SLA 99.9 % avec pénalités",
      "Audit RGPD personnalisé",
      "Formation présentielle incluse",
      "Account manager dédié",
      "Conformité ISO 27001 (en cours)",
    ],
    cta: "Parler à un expert",
    href: "/contact?sujet=saas-enterprise",
    highlight: false,
  },
];

const MODULES = [
  {
    title: "Carte temps réel",
    body: "Vos nœuds sur une carte MapLibre, sans tracker américain. Couleur par état (en ligne, alerte, batterie faible). Filtrage par équipe, par mission, par période.",
  },
  {
    title: "Géofences",
    body: "Dessinez une zone d'intervention. Recevez une alerte quand un nœud entre, sort, ou s'attarde trop longtemps. Configurable par mission.",
  },
  {
    title: "Alertes",
    body: "Webhook Slack, Discord, email. Sur batterie faible, déconnexion prolongée, sortie de zone, message contenant un mot-clé. Vous filtrez le bruit, vous gardez le signal.",
  },
  {
    title: "Replay",
    body: "Rejouez la trajectoire d'une équipe sur les 90 derniers jours en Team, ou un an en Business. Pour le débrief, l'audit, ou la formation des nouveaux.",
  },
  {
    title: "API publique",
    body: "REST documentée OpenAPI 3. Récupérez positions, télémétrie, alertes. Intégrez à votre SI existant sans verrouillage propriétaire.",
  },
  {
    title: "Audit log",
    body: "Qui a fait quoi, quand, depuis où. Immutable, exportable. Conforme aux exigences des organisations institutionnelles.",
  },
];

const SECURITY = [
  {
    title: "Hébergement UE",
    body: "Scaleway (Paris) en primaire, OVHcloud (Roubaix) en backup. Aucune donnée ne franchit l'Atlantique.",
  },
  {
    title: "Chiffrement bout-en-bout",
    body: "AES-256 par canal, PKC pour messages directs sensibles, TLS 1.3 sur toutes les API, disques chiffrés au repos.",
  },
  {
    title: "RGPD by design",
    body: "Registre des traitements, DPA avec sous-traitants, panneau « Mes données » dans le SaaS, suppression compte en un clic, export JSON complet.",
  },
  {
    title: "Open standards",
    body: "API REST OpenAPI 3, MQTT format Meshtastic standard. Vous n'êtes jamais prisonnier de MAILLON — exportez et partez.",
  },
];

export default function SaasPage() {
  return (
    <>
      <SiteHeader />
      <main id="main">
        {/* HERO — narratif posé, sans macro 4-mot avec point hazard */}
        <section
          aria-labelledby="saas-hero"
          className="border-b border-[color:var(--color-divider)] bg-[color:var(--color-substrate-2)]"
        >
          <div className="max-w-7xl mx-auto px-6 lg:px-10 py-20 lg:py-28">
            <p className="font-mono text-[11px] tracking-[0.18em] uppercase text-[color:var(--color-hazard)] mb-8">
              Fleet Manager
            </p>
            <h1
              id="saas-hero"
              className="font-mono text-[clamp(28px,4vw,52px)] text-[color:var(--color-phosphor)] leading-[1.15] max-w-4xl font-bold"
            >
              Le tableau de bord cloud qui transforme une flotte Meshtastic
              en infrastructure de coordination opérationnelle.
            </h1>
            <p className="mt-8 max-w-2xl font-mono text-[14px] lg:text-[15px] text-[color:var(--color-phosphor-dim)] leading-[1.7]">
              Hébergement UE. Chiffrement bout-en-bout. Respect RGPD. Aucune
              dépendance à un service américain.
            </p>
            <div className="mt-12 flex flex-col sm:flex-row gap-3">
              <Link href="/#preorder" className="btn-tactical btn-tactical-hazard">
                <span>Démarrer en Free</span>
                <span aria-hidden="true">{" ›"}</span>
              </Link>
              <Link href="/contact?sujet=saas-demo" className="btn-tactical">
                <span>Demander une démo guidée</span>
                <span aria-hidden="true">{" ›"}</span>
              </Link>
            </div>
          </div>
        </section>

        {/* MODULES — grille 3×2 séparée par dividers, pas de /01 /02 /03 */}
        <section
          aria-labelledby="modules-heading"
          className="border-b border-[color:var(--color-divider)] py-20 lg:py-28"
        >
          <div className="max-w-7xl mx-auto px-6 lg:px-10">
            <header className="mb-16 max-w-3xl">
              <p className="font-mono text-[11px] tracking-[0.18em] uppercase text-[color:var(--color-phosphor-dim)] mb-4">
                Six modules essentiels
              </p>
              <h2
                id="modules-heading"
                className="font-mono text-[clamp(24px,3vw,40px)] text-[color:var(--color-phosphor)] leading-[1.2] font-bold"
              >
                Pensé pour les opérations, pas pour la démo.
              </h2>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-[color:var(--color-divider)] border border-[color:var(--color-divider)]">
              {MODULES.map((m) => (
                <article
                  key={m.title}
                  className="bg-[color:var(--color-substrate)] p-6 lg:p-8"
                >
                  <h3 className="font-mono text-[16px] text-[color:var(--color-phosphor)] mb-3 font-bold">
                    {m.title}
                  </h3>
                  <p className="font-mono text-[13px] text-[color:var(--color-phosphor-dim)] leading-[1.65]">
                    {m.body}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* PRICING — 4 plans, plan featured = ring hazard, pas /01 /02 /03 */}
        <section
          aria-labelledby="pricing-heading"
          className="border-b border-[color:var(--color-divider)] py-20 lg:py-28 bg-[color:var(--color-substrate-2)]"
        >
          <div className="max-w-7xl mx-auto px-6 lg:px-10">
            <header className="mb-12 max-w-3xl">
              <p className="font-mono text-[11px] tracking-[0.18em] uppercase text-[color:var(--color-phosphor-dim)] mb-4">
                Tarification transparente
              </p>
              <h2
                id="pricing-heading"
                className="font-mono text-[clamp(24px,3vw,40px)] text-[color:var(--color-phosphor)] leading-[1.2] font-bold"
              >
                Quatre plans, aucun piège.
              </h2>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-[color:var(--color-divider)] border border-[color:var(--color-divider)]">
              {PLANS.map((plan) => {
                const isFeatured = plan.highlight;
                return (
                  <article
                    key={plan.name}
                    aria-labelledby={`plan-${plan.name}`}
                    className={`bg-[color:var(--color-substrate)] p-6 lg:p-7 flex flex-col relative ${
                      isFeatured
                        ? "outline outline-2 outline-[color:var(--color-hazard)] outline-offset-[-2px] z-10"
                        : ""
                    }`}
                  >
                    {isFeatured && (
                      <p className="font-mono text-[10px] tracking-[0.22em] uppercase text-[color:var(--color-hazard)] font-bold mb-3">
                        Recommandé
                      </p>
                    )}
                    <h3
                      id={`plan-${plan.name}`}
                      className="font-mono text-[18px] text-[color:var(--color-phosphor)] font-bold mb-3"
                    >
                      {plan.name}
                    </h3>
                    <div className="flex items-baseline gap-2 mb-1">
                      <span className="font-mono text-[clamp(32px,4vw,44px)] text-[color:var(--color-phosphor)] tabular-nums leading-none font-bold">
                        {plan.price}
                      </span>
                    </div>
                    <p className="font-mono text-[11px] text-[color:var(--color-phosphor-dim)] mb-2">
                      {plan.note}
                    </p>
                    <p className="font-mono text-[12px] text-[color:var(--color-phosphor)] mb-6 pb-4 border-b border-[color:var(--color-divider)]">
                      {plan.nodes}
                    </p>
                    <ul className="space-y-2 mb-8 flex-1 list-none p-0 m-0">
                      {plan.features.map((f) => (
                        <li
                          key={f}
                          className="font-mono text-[12px] text-[color:var(--color-phosphor-dim)] grid grid-cols-[auto_1fr] gap-2 items-baseline leading-[1.5]"
                        >
                          <span aria-hidden="true" className="text-[color:var(--color-hazard)]">
                            ·
                          </span>
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                    <Link
                      href={plan.href}
                      className={`btn-tactical w-full justify-between text-[10px] ${
                        isFeatured ? "btn-tactical-hazard" : ""
                      }`}
                    >
                      <span>{plan.cta}</span>
                      <span aria-hidden="true">{" ›"}</span>
                    </Link>
                  </article>
                );
              })}
            </div>

            <p className="mt-10 font-mono text-[12px] text-[color:var(--color-phosphor-dim)] max-w-3xl leading-[1.65]">
              Tarification dégressive au-delà de 50 nœuds. Engagement annuel
              −15 %. Engagement 3 ans −25 %. Modèle ONG / association
              d&apos;intérêt général −30 %. Tarifs HT, en euros.
            </p>
          </div>
        </section>

        {/* RGPD — split asymétrique titre / dl, pas de /01 /02 /03 */}
        <section
          aria-labelledby="rgpd-heading"
          className="border-b border-[color:var(--color-divider)] py-20 lg:py-28"
        >
          <div className="max-w-6xl mx-auto px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-12 gap-12">
            <header className="lg:col-span-5">
              <p className="font-mono text-[11px] tracking-[0.18em] uppercase text-[color:var(--color-phosphor-dim)] mb-4">
                RGPD et souveraineté
              </p>
              <h2
                id="rgpd-heading"
                className="font-mono text-[clamp(24px,3vw,40px)] text-[color:var(--color-phosphor)] leading-[1.2] font-bold"
              >
                Vos données restent en France.
              </h2>
            </header>

            <dl className="lg:col-span-7 space-y-8">
              {SECURITY.map((s) => (
                <div
                  key={s.title}
                  className="border-t border-[color:var(--color-divider)] pt-6"
                >
                  <dt className="font-mono text-[14px] text-[color:var(--color-phosphor)] font-bold mb-2">
                    {s.title}
                  </dt>
                  <dd className="font-mono text-[13px] text-[color:var(--color-phosphor-dim)] leading-[1.65] max-w-[60ch]">
                    {s.body}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* CTA — sobre, pas de macro caps */}
        <section
          aria-labelledby="cta-saas"
          className="px-6 lg:px-10 py-20 border-b-2 border-[color:var(--color-hazard)]"
        >
          <div className="max-w-3xl mx-auto text-center">
            <p className="font-mono text-[11px] tracking-[0.18em] uppercase text-[color:var(--color-phosphor-dim)] mb-4">
              Démo guidée
            </p>
            <h2
              id="cta-saas"
              className="font-mono text-[clamp(22px,3vw,36px)] text-[color:var(--color-phosphor)] leading-[1.2] font-bold mb-6"
            >
              Trente minutes en visio. Une vraie flotte. Aucun engagement.
            </h2>
            <p className="font-mono text-[14px] text-[color:var(--color-phosphor-dim)] leading-[1.7] mb-10">
              On partage notre écran, on vous montre le SaaS sur une flotte
              de démonstration, on répond à vos questions techniques.
            </p>
            <Link
              href="/contact?sujet=saas-demo"
              className="btn-tactical btn-tactical-hazard inline-flex"
            >
              <span>Réserver une démo</span>
              <span aria-hidden="true">{" ›"}</span>
            </Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
