import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@components/SiteHeader";
import { SiteFooter } from "@components/SiteFooter";

export const metadata: Metadata = {
  title: "Fleet Manager — Le SaaS MAILLON",
  description:
    "Gestion de flotte mesh longue portée pour pros : carto temps réel, géofences, alertes, replay, audit log. Hébergement UE, RGPD by design. Plans Free, Team, Business, Enterprise.",
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
      "Tout Free, plus :",
      "Géofences avec alertes entrée/sortie",
      "Annotations carte (POI, abris, dangers)",
      "Replay temporel des trajets",
      "Webhooks Slack/Discord/email",
      "MQTT broker privé chiffré",
      "Historique 90 jours",
      "Support email < 24h ouvrées",
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
      "Tout Team, plus :",
      "SSO SAML/OIDC",
      "API publique REST documentée",
      "Niveaux d'accès granulaires",
      "Audit log immutable",
      "Historique 1 an",
      "Rapports PDF automatiques",
      "Support prioritaire < 4h ouvrées",
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
      "Tout Business, plus :",
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
    body: "Vos nœuds sur une carte MapLibre (sans tracker US). Couleur par état (en ligne, alerte, batterie faible). Filtrage par équipe, par mission, par période.",
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
    body: "Rejouez la trajectoire d'une équipe sur les 90 derniers jours (Team) ou 1 an (Business). Pour le débrief, l'audit, ou la formation des nouveaux.",
  },
  {
    title: "API publique",
    body: "REST documentée OpenAPI 3. Récupérez positions, télémétrie, alertes. Intégrez à votre SI existant sans verrouillage.",
  },
  {
    title: "Audit log",
    body: "Qui a fait quoi, quand, depuis où. Immutable, exportable. Conforme aux exigences des organisations institutionnelles.",
  },
];

export default function SaasPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="bg-[color:var(--color-charcoal)] text-[color:var(--color-sand)] py-20 lg:py-28">
          <div className="mx-auto max-w-6xl px-6 lg:px-10">
            <p className="eyebrow text-[color:var(--color-moss)] mb-6">
              MAILLON Fleet Manager
            </p>
            <h1 className="maillon-hero text-[clamp(2.6rem,5.5vw,5rem)] mb-8 leading-[1.05]">
              Vos nœuds sur une carte.<br />
              <span className="italic font-light">En français.</span>
            </h1>
            <p className="text-xl max-w-2xl text-[color:var(--color-sand)]/85">
              Le tableau de bord cloud qui transforme une flotte
              Meshtastic en vraie infrastructure de coordination
              opérationnelle. Hébergement UE, chiffrement bout-en-bout,
              respect RGPD. Aucune dépendance à un service américain.
            </p>
            <div className="mt-12 flex flex-col sm:flex-row gap-4">
              <Link
                href="/#preorder"
                className="btn-primary inline-flex items-center justify-center bg-[color:var(--color-moss)] hover:bg-[color:var(--color-sand)] hover:text-[color:var(--color-charcoal)] text-[color:var(--color-charcoal)] px-8 py-4 rounded-md text-base font-medium"
              >
                Démarrer en Free&nbsp;›
              </Link>
              <Link
                href="/contact?sujet=saas-demo"
                className="inline-flex items-center justify-center border border-[color:var(--color-sand)]/30 text-[color:var(--color-sand)] px-8 py-4 rounded-md text-base font-medium hover:border-[color:var(--color-sand)]"
              >
                Demander une démo guidée&nbsp;›
              </Link>
            </div>
          </div>
        </section>

        <section className="py-20 lg:py-28">
          <div className="mx-auto max-w-6xl px-6 lg:px-10">
            <p className="eyebrow text-[color:var(--color-forest)] mb-6">
              Six modules essentiels
            </p>
            <h2 className="text-3xl lg:text-4xl font-bold tracking-tight mb-12">
              Pensé pour les opérations, pas pour la démo.
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {MODULES.map((m) => (
                <div key={m.title}>
                  <h3 className="text-xl font-semibold mb-3 text-[color:var(--color-charcoal)]">
                    {m.title}
                  </h3>
                  <p className="text-base text-[color:var(--color-charcoal)]/75 leading-relaxed">
                    {m.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[color:var(--color-sand)] py-20 lg:py-28 border-y border-[color:var(--color-charcoal)]/10">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <p className="eyebrow text-[color:var(--color-forest)] mb-6">
              Tarification transparente
            </p>
            <h2 className="text-3xl lg:text-4xl font-bold tracking-tight mb-12">
              Quatre plans. Aucun piège.
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {PLANS.map((plan) => (
                <article
                  key={plan.name}
                  className={`rounded-lg p-6 lg:p-8 flex flex-col ${
                    plan.highlight
                      ? "bg-[color:var(--color-charcoal)] text-[color:var(--color-sand)] shadow-2xl shadow-[color:var(--color-charcoal)]/10 -translate-y-2"
                      : "bg-white border border-[color:var(--color-charcoal)]/10"
                  }`}
                >
                  <p
                    className={`eyebrow mb-4 ${
                      plan.highlight
                        ? "text-[color:var(--color-moss)]"
                        : "text-[color:var(--color-forest)]"
                    }`}
                  >
                    {plan.name}
                  </p>
                  <p className="text-4xl font-bold tabular-nums">{plan.price}</p>
                  <p
                    className={`text-sm mt-1 mb-6 ${
                      plan.highlight
                        ? "text-[color:var(--color-sand)]/60"
                        : "text-[color:var(--color-charcoal)]/55"
                    }`}
                  >
                    {plan.note}
                  </p>
                  <p
                    className={`text-sm font-mono mb-6 ${
                      plan.highlight
                        ? "text-[color:var(--color-sand)]/70"
                        : "text-[color:var(--color-charcoal)]/70"
                    }`}
                  >
                    {plan.nodes}
                  </p>
                  <ul className="space-y-2 mb-8 flex-1">
                    {plan.features.map((f) => (
                      <li
                        key={f}
                        className={`text-sm flex items-start gap-2 ${
                          plan.highlight
                            ? "text-[color:var(--color-sand)]/85"
                            : "text-[color:var(--color-charcoal)]/85"
                        }`}
                      >
                        <span
                          className={`mt-1.5 block w-1 h-1 rounded-full flex-shrink-0 ${
                            plan.highlight
                              ? "bg-[color:var(--color-moss)]"
                              : "bg-[color:var(--color-forest)]"
                          }`}
                          aria-hidden
                        />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={plan.href}
                    className={`block text-center rounded-md px-4 py-3 text-sm font-medium transition-colors ${
                      plan.highlight
                        ? "bg-[color:var(--color-moss)] hover:bg-[color:var(--color-sand)] hover:text-[color:var(--color-charcoal)] text-[color:var(--color-charcoal)]"
                        : "bg-[color:var(--color-forest)] hover:bg-[color:var(--color-charcoal)] text-[color:var(--color-sand)]"
                    }`}
                  >
                    {plan.cta}&nbsp;›
                  </Link>
                </article>
              ))}
            </div>

            <p className="mt-10 text-base text-[color:var(--color-charcoal)]/65 max-w-3xl">
              Tarification dégressive selon volume au-delà de 50 nœuds.
              Engagement annuel = -15 %. Engagement 3 ans = -25 %.
              Modèle ONG / association reconnue d&apos;intérêt général :
              -30 %. Tarifs HT, en euros.
            </p>
          </div>
        </section>

        <section className="py-20 lg:py-28">
          <div className="mx-auto max-w-5xl px-6 lg:px-10">
            <p className="eyebrow text-[color:var(--color-forest)] mb-6">
              RGPD et souveraineté
            </p>
            <h2 className="text-3xl lg:text-4xl font-bold tracking-tight mb-10">
              Vos données restent en France.
            </h2>
            <ul className="space-y-5 text-base text-[color:var(--color-charcoal)]/85">
              <li>
                <strong>Hébergement UE.</strong> Scaleway (Paris) en
                primaire, OVHcloud (Roubaix) en backup. Aucune donnée ne
                franchit l&apos;Atlantique.
              </li>
              <li>
                <strong>Chiffrement bout-en-bout.</strong> AES-256 par
                canal, PKC pour messages directs sensibles, TLS 1.3 sur
                toutes les API, disques chiffrés au repos.
              </li>
              <li>
                <strong>RGPD by design.</strong> Registre des traitements,
                DPA avec sous-traitants, panneau « Mes données » dans le
                SaaS, suppression compte en un clic, export JSON complet.
              </li>
              <li>
                <strong>Open standards.</strong> API REST OpenAPI 3,
                MQTT format Meshtastic standard. Vous n&apos;êtes jamais
                prisonnier de MAILLON.
              </li>
            </ul>
          </div>
        </section>

        <section className="bg-[color:var(--color-forest)] text-[color:var(--color-sand)] py-20">
          <div className="mx-auto max-w-3xl px-6 lg:px-10 text-center">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              Démo guidée 30 minutes.
            </h2>
            <p className="text-lg text-[color:var(--color-sand)]/85 mb-8">
              On partage notre écran, on vous montre le SaaS sur une vraie
              flotte de démonstration, on répond à vos questions techniques.
              Aucun engagement.
            </p>
            <Link
              href="/contact?sujet=saas-demo"
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
