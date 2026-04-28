import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@components/SiteHeader";
import { SiteFooter } from "@components/SiteFooter";

export const metadata: Metadata = {
  title: "Communauté — réseau, code, terrain",
  description:
    "MAILLON ne vit pas seul. Forum Meshtastic, Discord communauté FR, code open-source compagnon, post-mortem honnête — tous les liens d'entraide et de contribution autour du mesh longue portée.",
  alternates: { canonical: "https://github.com/aissablk1/maillon/communaute" },
};

type Channel = {
  id: string;
  index: string;
  title: string;
  url: string;
  cadence: string;
  audience: string;
  description: string;
  external?: boolean;
  emphasis?: boolean;
};

const CHANNELS: Channel[] = [
  {
    id: "forum",
    index: "01",
    title: "Forum Meshtastic Discourse",
    url: "https://meshtastic.discourse.group/",
    cadence: "Réponse < 24 h",
    audience: "Anglophone · 40 000+ utilisateurs mondialement",
    description:
      "Le canal officiel pour les questions techniques de fond — firmware, modulation, antennes, debug. Si votre question concerne le protocole et pas spécifiquement MAILLON, postez ici. Vous aurez une réponse plus rapide et meilleure que ce que peut produire un humain seul.",
    external: true,
    emphasis: true,
  },
  {
    id: "github-firmware",
    index: "02",
    title: "GitHub Meshtastic firmware",
    url: "https://github.com/meshtastic/firmware",
    cadence: "Issues sous 1 semaine",
    audience: "Développeurs C++ embedded",
    description:
      "Le firmware open-source GPL v3 sur lequel MAILLON s'appuie. Issues, pull requests, releases mensuelles. MAILLON s'engage à reverser au moins 1 % de son CA hardware annuel à ce projet upstream — voir notre politique sur l'engagement open-source.",
    external: true,
  },
  {
    id: "preconfig",
    index: "03",
    title: "maillon-preconfig (MIT)",
    url: "https://github.com/aissablk1/maillon-preconfig",
    cadence: "Maintenu",
    audience: "Pros & intégrateurs Meshtastic",
    description:
      "Notre script de préconfiguration usine, publié en MIT comme companion repo de la communauté. Registre GDPR-friendly à double table (technique chiffrée AES-256, nominale séparée), batch CSV pour chaînes de production, carte d'identité kit imprimable. Forks et PRs bienvenus pour traduction des commentaires inline.",
    external: true,
  },
  {
    id: "article",
    index: "04",
    title: "Long-range mesh 2026 — article communautaire",
    url: "https://gist.github.com/aissablk1/49241daaf68509a9386d22be03a11280",
    cadence: "Mise à jour annuelle",
    audience: "Décideurs techniques EU",
    description:
      "État de l'art sourcé du mesh longue portée en 2026 — Meshtastic, Reticulum, MeshCore, alternatives non-mesh (Garmin, Apple, goTenna), cadre réglementaire ETSI/ARCEP/RGPD pour l'EU. Document libre, anglais, conçu comme référence neutre pour la communauté mondiale.",
    external: true,
  },
  {
    id: "post-mortem",
    index: "05",
    title: "POST-MORTEM honnête",
    url: "https://github.com/aissablk1/maillon/blob/main/POST-MORTEM.md",
    cadence: "Lu une fois",
    audience: "Constructeurs solo · post-mortem-amateurs",
    description:
      "Le récit honnête des 84 fichiers, 3 thèses successives, et 0 entretien client menés en avril 2026 avant l'archivage du projet. Publié pour que d'autres builders solo prolifiques évitent les mêmes pièges et arrivent plus vite à la décision.",
    external: true,
  },
];

const COMMITMENTS = [
  {
    label: "GPL v3 / Meshtastic",
    detail:
      "Le firmware reste open-source. Aucun fork propriétaire, aucun blob fermé sur les nœuds vendus.",
  },
  {
    label: "1 % CA hardware reversé",
    detail:
      "Reversement annuel à Meshtastic Solutions Inc. Modèle Patagonia 1% for the Planet, mais pour l'open-source upstream.",
  },
  {
    label: "API publique documentée",
    detail:
      "OpenAPI 3, MQTT public, GPX/JSON exports natifs. Vos données sortent en un clic, sans ticket support.",
  },
  {
    label: "Conformité ETSI/CE/GDPR",
    detail:
      "Chaque hardware est pré-CE certifié. Le SaaS est hébergé UE, registre traitement à jour, DPO joignable.",
  },
];

export default function CommunautePage() {
  return (
    <>
      <SiteHeader />
      <main id="main">
        {/* HERO — split asymétrique 5/7 inversé */}
        <section
          aria-labelledby="comm-hero"
          className="border-b border-[color:var(--color-divider)]"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* Bloc gauche — métriques */}
            <aside className="lg:col-span-5 px-6 lg:px-10 pt-12 lg:pt-20 pb-16 lg:border-r border-[color:var(--color-divider)] flex flex-col justify-center bg-[color:var(--color-substrate-2)]">
              <p className="font-mono text-[10px] tracking-[0.22em] uppercase text-[color:var(--color-hazard)] mb-8" aria-hidden="true">
                [ NETWORK&nbsp;/&nbsp;LIVE ]
              </p>
              <dl className="space-y-10">
                <div>
                  <dt className="font-mono text-[10px] tracking-[0.22em] uppercase text-[color:var(--color-phosphor-dim)] mb-2">
                    Nœuds Meshtastic actifs
                  </dt>
                  <dd className="macro text-[clamp(72px,8vw,128px)] text-[color:var(--color-phosphor)] tabular-nums leading-none">
                    40&nbsp;000+
                  </dd>
                </div>
                <div>
                  <dt className="font-mono text-[10px] tracking-[0.22em] uppercase text-[color:var(--color-phosphor-dim)] mb-2">
                    Communauté FR estimée
                  </dt>
                  <dd className="macro text-[clamp(48px,6vw,88px)] text-[color:var(--color-phosphor-dim)] tabular-nums leading-none">
                    200–500
                  </dd>
                </div>
                <div>
                  <dt className="font-mono text-[10px] tracking-[0.22em] uppercase text-[color:var(--color-phosphor-dim)] mb-2">
                    Engagement hardware MAILLON
                  </dt>
                  <dd className="macro text-[clamp(48px,6vw,88px)] text-[color:var(--color-hazard)] tabular-nums leading-none">
                    1&nbsp;%
                  </dd>
                  <p className="mt-2 font-mono text-[11px] tracking-[0.05em] text-[color:var(--color-phosphor-dim)]">
                    du CA reversé upstream
                  </p>
                </div>
              </dl>
            </aside>

            {/* Bloc droit — titre + manifeste */}
            <div className="lg:col-span-7 px-6 lg:px-10 pt-12 lg:pt-20 pb-16">
              <div className="flex items-center gap-4 mb-12">
                <span className="font-mono text-[10px] tracking-[0.22em] uppercase text-[color:var(--color-hazard)]" aria-hidden="true">
                  [ COMMUN&nbsp;/&nbsp;OPEN ]
                </span>
                <span aria-hidden="true" className="flex-1 border-t border-[color:var(--color-divider)]" />
              </div>

              <h1
                id="comm-hero"
                className="macro text-[clamp(56px,11vw,160px)] text-[color:var(--color-phosphor)]"
              >
                ON NE
                <br />
                FERME
                <br />
                <span className="text-[color:var(--color-phosphor-dim)]">RIEN</span>
                <span className="text-[color:var(--color-hazard)]" aria-hidden="true">.</span>
              </h1>

              <p className="mt-12 max-w-2xl font-mono text-[14px] lg:text-[15px] text-[color:var(--color-phosphor-dim)] leading-[1.7]">
                MAILLON ne se construit pas en silo. Le firmware est open-source
                Meshtastic GPL&nbsp;v3, le script de préconfiguration usine est
                publié en MIT, l&apos;article d&apos;état de l&apos;art mesh
                2026 est en libre lecture, le post-mortem du projet est
                publiquement archivé. Voici les cinq canaux où la communauté se
                rencontre, contribue, et nous tient honnêtes.
              </p>
            </div>
          </div>
        </section>

        {/* CANAUX — liste verticale dense */}
        <section
          aria-labelledby="canaux-heading"
          className="border-b border-[color:var(--color-divider)] py-20 lg:py-28"
        >
          <header className="px-6 lg:px-10 mb-16 max-w-7xl mx-auto">
            <p className="font-mono text-[10px] tracking-[0.22em] uppercase text-[color:var(--color-hazard)] mb-6" aria-hidden="true">
              [ CHANNELS&nbsp;/&nbsp;5 ]
            </p>
            <h2
              id="canaux-heading"
              className="macro text-[clamp(40px,6vw,80px)] text-[color:var(--color-phosphor)] leading-[0.92]"
            >
              CINQ CANAUX
              <br />
              <span className="text-[color:var(--color-phosphor-dim)]">D&apos;ENTRAIDE.</span>
            </h2>
          </header>

          <ol className="px-6 lg:px-10 max-w-7xl mx-auto list-none p-0 m-0">
            {CHANNELS.map((c) => (
              <li
                key={c.id}
                className={`grid grid-cols-1 lg:grid-cols-12 gap-x-8 gap-y-4 py-10 lg:py-12 border-t border-[color:var(--color-divider)] last:border-b ${
                  c.emphasis ? "bg-[color:var(--color-substrate-2)] -mx-6 lg:-mx-10 px-6 lg:px-10" : ""
                }`}
              >
                <div className="lg:col-span-1">
                  <span
                    className="macro text-[clamp(36px,4vw,56px)] text-[color:var(--color-hazard)] tabular-nums leading-none"
                    aria-hidden="true"
                  >
                    /{c.index}
                  </span>
                </div>

                <div className="lg:col-span-4">
                  <h3 className="macro text-[clamp(22px,2.6vw,36px)] text-[color:var(--color-phosphor)] leading-[0.95] mb-3">
                    {c.title}
                  </h3>
                  <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-[color:var(--color-phosphor-dim)]">
                    {c.audience}
                  </p>
                </div>

                <div className="lg:col-span-5">
                  <p className="font-mono text-[14px] text-[color:var(--color-phosphor)] leading-[1.65] max-w-[60ch]">
                    {c.description}
                  </p>
                </div>

                <div className="lg:col-span-2 flex flex-col items-start lg:items-end gap-3">
                  <span className="font-mono text-[10px] tracking-[0.18em] uppercase text-[color:var(--color-phosphor-dim)]">
                    {c.cadence}
                  </span>
                  <a
                    href={c.url}
                    {...(c.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="btn-tactical text-[10px] py-2 px-4"
                  >
                    <span>OUVRIR</span>
                    <span aria-hidden="true">{" ›"}</span>
                    {c.external && <span className="sr-only"> (nouvelle fenêtre)</span>}
                  </a>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* ENGAGEMENTS — grille brutalist 2 colonnes décalées */}
        <section
          aria-labelledby="engagements-heading"
          className="border-b border-[color:var(--color-divider)] py-20 lg:py-28 bg-[color:var(--color-substrate-2)]"
        >
          <div className="max-w-6xl mx-auto px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-12 gap-12">
            <header className="lg:col-span-4">
              <p className="font-mono text-[10px] tracking-[0.22em] uppercase text-[color:var(--color-hazard)] mb-6" aria-hidden="true">
                [ ENGAGEMENTS&nbsp;/&nbsp;4 ]
              </p>
              <h2
                id="engagements-heading"
                className="macro text-[clamp(36px,5vw,72px)] text-[color:var(--color-phosphor)] leading-[0.92]"
              >
                CE QU&apos;ON
                <br />
                <span className="text-[color:var(--color-phosphor-dim)]">PROMET</span>
                <br />
                EN COMMUN.
              </h2>
            </header>

            <dl className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-10">
              {COMMITMENTS.map((c) => (
                <div key={c.label} className="border-t border-[color:var(--color-divider)] pt-6">
                  <dt className="macro text-[18px] lg:text-[22px] text-[color:var(--color-hazard)] mb-3 leading-[0.95]">
                    {c.label}
                  </dt>
                  <dd className="font-mono text-[13px] text-[color:var(--color-phosphor-dim)] leading-[1.65]">
                    {c.detail}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* CTA contribution */}
        <section
          aria-labelledby="contrib-cta"
          className="px-6 lg:px-10 py-24 border-b-2 border-[color:var(--color-hazard)]"
        >
          <div className="max-w-4xl mx-auto text-center">
            <p className="font-mono text-[10px] tracking-[0.22em] uppercase text-[color:var(--color-hazard)] mb-8" aria-hidden="true">
              [ CONTRIBUER ]
            </p>
            <h2
              id="contrib-cta"
              className="macro text-[clamp(40px,6vw,80px)] text-[color:var(--color-phosphor)] leading-[0.9] mb-8"
            >
              VOUS AVEZ
              <br />
              UN REX
              <br />
              <span className="text-[color:var(--color-hazard)]">À PARTAGER ?</span>
            </h2>
            <p className="font-mono text-[14px] text-[color:var(--color-phosphor-dim)] leading-[1.7] mb-10 max-w-2xl mx-auto">
              Test terrain, métrologie portée, debug protocole, intégration
              vertical&nbsp;: tous les retours d&apos;expérience sont accueillis.
              On les remonte au forum Meshtastic upstream et on crédite l&apos;auteur.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/contact?sujet=presse" className="btn-tactical btn-tactical-hazard">
                <span>PARTAGER UN REX</span>
                <span aria-hidden="true">{" ›"}</span>
              </Link>
              <a
                href="https://github.com/aissablk1/maillon-preconfig"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-tactical"
              >
                <span>OUVRIR UNE PR</span>
                <span aria-hidden="true">{" ›"}</span>
                <span className="sr-only"> (nouvelle fenêtre)</span>
              </a>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
