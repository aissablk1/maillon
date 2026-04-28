import Link from "next/link";
import { SiteHeader } from "@components/SiteHeader";
import { SiteFooter } from "@components/SiteFooter";
import { MeshDiagram } from "@components/MeshDiagram";
import { KitCard } from "@components/KitCard";
import { VerticalRow } from "@components/VerticalRow";
import { PreorderForm } from "@components/PreorderForm";
import { HeroEntrance } from "@components/HeroEntrance";

export default function HomePage() {
  return (
    <>
      <SiteHeader />

      <main id="main">
        {/* ─────────── HERO — split asymétrique 7/5 brutalist ─────────── */}
        <section aria-labelledby="hero-heading" className="border-b border-[color:var(--color-divider)]">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* Bloc gauche — macro typographie */}
            <div className="lg:col-span-7 px-6 lg:px-10 pt-12 lg:pt-20 pb-16 lg:border-r border-[color:var(--color-divider)]">
              <HeroEntrance>
                <div className="flex items-center gap-4 mb-12">
                  <span className="font-mono text-[10px] tracking-[0.22em] uppercase text-[color:var(--color-hazard)]" aria-hidden="true">
                    [ TRANSMIT-001 / MAILLON ]
                  </span>
                  <span aria-hidden="true" className="flex-1 border-t border-[color:var(--color-divider)]" />
                  <span className="font-mono text-[10px] tracking-[0.18em] uppercase text-[color:var(--color-phosphor-dim)]">
                    <time dateTime={new Date().toISOString().slice(0, 10)}>
                      {new Date().toISOString().slice(0, 10)}
                    </time>
                  </span>
                </div>

                {/* Titre macro — viewport-bleeding */}
                <h1 id="hero-heading" className="macro text-[clamp(72px,15vw,220px)] text-[color:var(--color-phosphor)]">
                  RÉSEAU
                  <br />
                  <span className="text-[color:var(--color-hazard)]">QUI</span>
                  <br />
                  PORTE
                  <br />
                  LOIN
                  <span className="text-[color:var(--color-hazard)]" aria-hidden="true">.</span>
                </h1>

                <div className="mt-12 max-w-2xl">
                  <p className="font-mono text-[13px] lg:text-[15px] text-[color:var(--color-phosphor-dim)] leading-[1.6] mb-3">
                    Quand le réseau cellulaire vous lâche. Quand le satellite
                    coûte trop cher. Quand la radio pro est trop complexe. Un
                    kit MAILLON tient une équipe en lien sur 30&nbsp;km à vue,
                    jusqu&apos;à plusieurs centaines en relais.
                  </p>
                  <p className="font-mono text-[13px] text-[color:var(--color-phosphor)] leading-[1.6] uppercase tracking-[0.1em]">
                    Sans abonnement. Sans licence. Sans dépendance.
                  </p>
                </div>

                <div className="mt-12 flex flex-wrap items-center gap-4">
                  <Link href="#preorder" className="btn-tactical btn-tactical-hazard">
                    <span>PRÉCOMMANDER</span>
                    <span aria-hidden="true">{" ›"}</span>
                  </Link>
                  <Link href="#kits" className="btn-tactical">
                    <span>VOIR LES KITS</span>
                    <span aria-hidden="true">{" ›"}</span>
                  </Link>
                </div>
              </HeroEntrance>
            </div>

            {/* Bloc droit — diagramme mesh */}
            <div className="lg:col-span-5 px-6 lg:px-10 pt-12 lg:pt-20 pb-16 flex flex-col">
              <div className="font-mono text-[10px] tracking-[0.22em] uppercase text-[color:var(--color-phosphor-dim)] mb-4 flex items-center gap-2">
                <span className="uplink-indicator" aria-hidden="true" />
                <span>UPLINK ACTIF · 7 NODES SIM</span>
              </div>
              <MeshDiagram />
              <p className="mt-4 font-mono text-[11px] tracking-[0.05em] text-[color:var(--color-phosphor-dim)] leading-[1.5]">
                Démonstration multi-hop. Chaque nœud relaie pour son voisin.
                Perdez-en un, le maillage trouve un autre chemin.
              </p>
            </div>
          </div>
        </section>

        {/* ─────────── BANDEAU TÉLÉMÉTRIE — 3 chiffres ─────────── */}
        <section className="border-b-2 border-[color:var(--color-hazard)]">
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[color:var(--color-phosphor-faint)]">
            {[
              {
                tag: "[ PORTÉE / À VUE ]",
                value: "30",
                unit: "KM",
                note: "Mesurés en terrain ouvert avec antenne 7 dBi. Record mondial point-à-point : 331 km.",
              },
              {
                tag: "[ MULTI-HOP / RELAIS ]",
                value: "300",
                unit: "KM",
                note: "Avec un maillage de relais bien placés. Chaque nœud devient routeur du précédent.",
                hazard: true,
              },
              {
                tag: "[ ABONNEMENT ]",
                value: "0",
                unit: "€",
                note: "Bande ISM 868 MHz libre. Pas d'opérateur, pas de constellation, pas de licence.",
              },
            ].map((item) => (
              <div
                key={item.tag}
                className="px-6 lg:px-10 py-12 lg:py-16"
              >
                <p className={`font-mono text-[10px] tracking-[0.22em] uppercase mb-6 ${item.hazard ? "text-[color:var(--color-hazard)]" : "text-[color:var(--color-phosphor-dim)]"}`}>
                  {item.tag}
                </p>
                <div className="flex items-baseline gap-2">
                  <span className={`macro text-[clamp(96px,12vw,160px)] tabular-nums leading-none ${item.hazard ? "text-[color:var(--color-hazard)]" : "text-[color:var(--color-phosphor)]"}`}>
                    {item.value}
                  </span>
                  <span className="macro text-[clamp(28px,3vw,40px)] text-[color:var(--color-phosphor-dim)]">
                    {item.unit}
                  </span>
                </div>
                <p className="mt-4 font-mono text-[12px] text-[color:var(--color-phosphor-dim)] leading-[1.55] max-w-xs">
                  {item.note}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ─────────── COMMENT ÇA MARCHE — 4 étapes éditoriales ─────────── */}
        <section className="border-b border-[color:var(--color-phosphor-faint)]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-6">
            <header className="lg:col-span-4 px-6 lg:px-10 py-16 border-r border-[color:var(--color-phosphor-faint)]">
              <p className="font-mono text-[10px] tracking-[0.22em] uppercase text-[color:var(--color-hazard)] mb-6">
                [ DÉPLOIEMENT&nbsp;/&nbsp;T+0 ]
              </p>
              <h2 className="macro text-[clamp(40px,6vw,88px)] text-[color:var(--color-phosphor)] leading-[0.9]">
                CHAQUE
                <br />
                NŒUD
                <br />
                <span className="text-[color:var(--color-phosphor-dim)]">EST UN</span>
                <br />
                MAILLON.
              </h2>
              <p className="mt-8 font-mono text-[13px] text-[color:var(--color-phosphor-dim)] leading-[1.6]">
                MAILLON s&apos;appuie sur Meshtastic, le firmware open-source
                de référence pour les radios LoRa (40&nbsp;000+ nœuds actifs
                mondialement). Notre travail&nbsp;: préconfigurer, traduire en
                français, ajouter une console de gestion de flotte, rendre
                tout ça utilisable par un retraité randonneur ou un
                conducteur de travaux. Pas seulement par un radioamateur.
              </p>
            </header>

            <div className="lg:col-span-8 px-6 lg:px-10 py-16">
              <ol className="divide-y divide-[color:var(--color-phosphor-faint)]">
                {[
                  {
                    n: "01",
                    t: "Déballage",
                    d: "Les nœuds sont déjà flashés EU 868 MHz, antenne fixée, batterie chargée 100 %, étiquetés au nom de votre équipe.",
                  },
                  {
                    n: "02",
                    t: "Démarrage",
                    d: "Première synchro mesh en moins de 30 secondes. Position GPS verrouillée en 1 minute en extérieur.",
                  },
                  {
                    n: "03",
                    t: "Pairing",
                    d: "Bluetooth, app Meshtastic. Onboarding 4 écrans. Premier message envoyé en moins de 3 minutes après l'unboxing.",
                  },
                  {
                    n: "04",
                    t: "Transmission",
                    d: "Texte chiffré AES-256, position partagée, alertes batterie. Hors couverture cellulaire, hors couverture satellite.",
                  },
                ].map((step) => (
                  <li
                    key={step.n}
                    className="grid grid-cols-[auto_1fr] gap-6 lg:gap-12 py-8 first:pt-0"
                  >
                    <span className="macro text-[clamp(32px,4vw,56px)] text-[color:var(--color-hazard)] tabular-nums leading-none">
                      {step.n}
                    </span>
                    <div className="pt-1">
                      <h3 className="macro text-[clamp(18px,2vw,28px)] text-[color:var(--color-phosphor)] mb-2 leading-[0.95] uppercase">
                        {step.t}
                      </h3>
                      <p className="font-mono text-[13px] text-[color:var(--color-phosphor-dim)] leading-[1.55] max-w-[60ch]">
                        {step.d}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        {/* ─────────── KITS — bento asymétrique ─────────── */}
        <section
          id="kits"
          className="border-b border-[color:var(--color-phosphor-faint)]"
        >
          <header className="px-6 lg:px-10 py-16 border-b border-[color:var(--color-phosphor-faint)] grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-7 lg:col-start-1">
              <p className="font-mono text-[10px] tracking-[0.22em] uppercase text-[color:var(--color-hazard)] mb-6">
                [ CATALOGUE&nbsp;/&nbsp;3&nbsp;UNITS ]
              </p>
              <h2 className="macro text-[clamp(48px,8vw,128px)] text-[color:var(--color-phosphor)] leading-[0.88]">
                DU BIVOUAC
                <br />
                <span className="text-[color:var(--color-phosphor-dim)]">AU PC</span>
                <br />
                COMMANDE.
              </h2>
            </div>
            <div className="lg:col-span-4 lg:col-start-9 self-end">
              <p className="font-mono text-[13px] text-[color:var(--color-phosphor-dim)] leading-[1.6]">
                Trois unités, préconfigurées région EU&nbsp;868&nbsp;MHz,
                marquées&nbsp;CE, livrées avec notice illustrée FR et garantie
                24 mois.
              </p>
            </div>
          </header>

          {/* Bento : Kit Pro prend 2 colonnes en md+, autres 1 chacun */}
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[color:var(--color-phosphor-faint)] border-b border-[color:var(--color-phosphor-faint)]">
            <KitCard
              kind="decouverte"
              index="01"
              eyebrow="Découverte"
              price="99 €"
              priceNote="TTC livré"
              title="Pour deux. Le premier pas."
              description="Deux nœuds compacts. Famille en randonnée, initiation au mesh."
              features={[
                "2× LILYGO T-Echo préconfigurés",
                "Portée 5–10 km à vue",
                "Autonomie 5 jours",
                "Compte SaaS Free",
                "Notice 4 volets FR",
              ]}
              cta="PRÉCOMMANDER"
              href="/kits/decouverte"
            />
            <KitCard
              kind="pro"
              index="02"
              eyebrow="Pro"
              price="399 €"
              priceNote="TTC livré"
              title="Chantiers. Festivals. Exploitations."
              description="Quatre portatifs et une station relais. Coordonnez une équipe sur une zone d'opérations entière."
              features={[
                "4× T-Beam Supreme + 1 station",
                "Couverture 10–20 km²",
                "Mallette transport semi-rigide",
                "30 jours SaaS Team",
                "Configuration sur-mesure",
              ]}
              cta="DEMANDER UN DEVIS"
              href="/kits/pro"
            />
            <KitCard
              kind="secours"
              index="03"
              eyebrow="Secours"
              price="1 199 €"
              priceNote="TTC livré"
              title="FFSS. ADRASEC. Croix-Rouge."
              description="Six secouristes, deux relais redondants, console PC. Conçu pour les associations en zone blanche."
              features={[
                "6× RAK4631 IP67 antichoc",
                "2× Station G2 redondantes",
                "Console PC T-Deck Plus",
                "6 mois SaaS Team inclus",
                "Demi-journée formation",
              ]}
              cta="DEMANDER UN DEVIS"
              href="/kits/secours"
            />
          </div>

          <div className="px-6 lg:px-10 py-8 flex flex-wrap items-center justify-between gap-4">
            <p className="font-mono text-[12px] text-[color:var(--color-phosphor-dim)]">
              Flotte de 50, 200 ou 1&nbsp;000 nœuds&nbsp;? Étude personnalisée.
            </p>
            <Link href="/contact" className="font-mono text-[12px] uppercase tracking-[0.18em] text-[color:var(--color-hazard)] maillon-link">
              <span aria-hidden="true">{">> "}</span>Sur-mesure / devis volume
            </Link>
          </div>
        </section>

        {/* ─────────── VERTICALES ─────────── */}
        <section id="cas-usage" aria-labelledby="cas-usage-heading" className="border-b border-[color:var(--color-divider)]">
          <header className="px-6 lg:px-10 py-16 grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-8">
              <p className="font-mono text-[10px] tracking-[0.22em] uppercase text-[color:var(--color-hazard)] mb-6" aria-hidden="true">
                [ TERRAINS&nbsp;/&nbsp;5&nbsp;CIBLES ]
              </p>
              <h2 id="cas-usage-heading" className="macro text-[clamp(40px,6vw,88px)] text-[color:var(--color-phosphor)] leading-[0.92]">
                CINQ MONDES.
                <br />
                <span className="text-[color:var(--color-phosphor-dim)]">UN MÊME BESOIN&nbsp;:</span>
                <br />
                RESTER EN LIEN.
              </h2>
            </div>
          </header>

          <div className="px-6 lg:px-10">
            <div className="border-t border-[color:var(--color-divider)]">
              <VerticalRow
                index="01"
                title="Secours bénévoles"
                tags={["FFSS", "ADRASEC", "SDIS bénévoles", "Croix-Rouge"]}
                description="Une intervention en zone blanche peut perdre 4 minutes de jonction radio. MAILLON la ramène à 30 secondes — pour 1 199 € au lieu de 16 500 €."
              />
              <VerticalRow
                index="02"
                title="Chantiers BTP"
                tags={["Forêt", "Carrière", "Pose réseau", "Photovoltaïque"]}
                description="Conducteur de travaux au bureau, équipes sur le chantier à 8 km. MAILLON garde le lien sans SIM, sans licence, sans relais à louer."
              />
              <VerticalRow
                index="03"
                title="Festivals"
                tags={["Sécurité", "Logistique", "Médical", "Backstage"]}
                description="80 talkies de location à 1 920 €/édition. Achat MAILLON équivalent amorti dès la deuxième édition, plus messagerie chiffrée et géofences."
              />
              <VerticalRow
                index="04"
                title="Outdoor / Expéditions"
                tags={["Alpinisme", "Trail", "Voile côtière", "Overland"]}
                description="450 € hardware Garmin + 900 € abonnement sur 5 ans = 1 350 €. Kit Découverte MAILLON pour deux : 99 €. Le calcul est vite fait."
              />
              <VerticalRow
                index="05"
                title="Agriculture extensive"
                tags={["Estive", "Saisonniers", "Multi-sites", "Bergers"]}
                description="50 % du foncier agricole français est en zone blanche cellulaire. Coordonner trois bergers sur 800 ha d'estive sans risquer la sécurité d'un saisonnier isolé."
              />
            </div>
          </div>
        </section>

        {/* ─────────── COMPARAISON — table tactique ─────────── */}
        <section aria-labelledby="bench-heading" className="border-b border-[color:var(--color-divider)] px-6 lg:px-10 py-20">
          <header className="mb-12 grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-9">
              <p className="font-mono text-[10px] tracking-[0.22em] uppercase text-[color:var(--color-hazard)] mb-6" aria-hidden="true">
                [ BENCH&nbsp;/&nbsp;6 SECOURISTES&nbsp;×&nbsp;5 ANS ]
              </p>
              <h2 id="bench-heading" className="macro text-[clamp(40px,6vw,80px)] text-[color:var(--color-phosphor)] leading-[0.92]">
                MAILLON
                <span className="text-[color:var(--color-phosphor-dim)]"> vs </span>
                INREACH
                <span className="text-[color:var(--color-phosphor-dim)]"> vs </span>
                <span className="text-[color:var(--color-phosphor-dim)]">DMR.</span>
              </h2>
            </div>
          </header>

          <div className="overflow-x-auto -mx-6 lg:mx-0">
            <table className="w-full min-w-[640px] font-mono text-[13px]">
              <caption className="sr-only">
                Comparaison des coûts sur 5 ans pour 6 secouristes bénévoles entre DMR Hytera, Garmin inReach et MAILLON.
              </caption>
              <thead>
                <tr className="border-y-2 border-[color:var(--color-phosphor)]">
                  <th scope="col" className="text-left py-3 px-4 text-[10px] tracking-[0.2em] uppercase text-[color:var(--color-phosphor-dim)] font-normal">
                    Poste
                  </th>
                  <th scope="col" className="text-left py-3 px-4 text-[10px] tracking-[0.2em] uppercase text-[color:var(--color-phosphor-dim)] font-normal">
                    DMR Hytera
                  </th>
                  <th scope="col" className="text-left py-3 px-4 text-[10px] tracking-[0.2em] uppercase text-[color:var(--color-phosphor-dim)] font-normal">
                    Garmin inReach
                  </th>
                  <th scope="col" className="text-left py-3 px-4 text-[10px] tracking-[0.2em] uppercase text-[color:var(--color-hazard)] font-bold">
                    MAILLON
                  </th>
                </tr>
              </thead>
              <tbody className="tabular-nums">
                {[
                  ["Hardware initial", "9 000 €", "2 700 €", "1 199 €"],
                  ["Abonnement 5 ans", "4 000 €", "5 400 €", "540 €"],
                  ["Console centralisée", "4 000 €", "—", "incluse"],
                  ["Comms multi-utilisateurs", "oui", "non", "oui"],
                  ["Hors couverture cellulaire", "oui (relais)", "oui (satellite)", "oui (mesh)"],
                ].map(([poste, dmr, garmin, maillon]) => (
                  <tr
                    key={poste}
                    className="border-b border-[color:var(--color-divider)]"
                  >
                    <th scope="row" className="py-3 px-4 text-[color:var(--color-phosphor-dim)] text-left font-normal">
                      {poste}
                    </th>
                    <td className="py-3 px-4 text-[color:var(--color-phosphor)]">{dmr}</td>
                    <td className="py-3 px-4 text-[color:var(--color-phosphor)]">{garmin}</td>
                    <td className="py-3 px-4 text-[color:var(--color-phosphor)]">{maillon}</td>
                  </tr>
                ))}
                <tr className="border-y-2 border-[color:var(--color-hazard)]">
                  <th scope="row" className="py-4 px-4 text-[color:var(--color-phosphor)] uppercase tracking-[0.1em] text-[11px] text-left">
                    Total 5 ans
                  </th>
                  <td className="py-4 px-4 text-[color:var(--color-phosphor)] text-[18px]">
                    17 000 €
                  </td>
                  <td className="py-4 px-4 text-[color:var(--color-phosphor)] text-[18px]">
                    8 100 €
                  </td>
                  <td className="py-4 px-4 text-[color:var(--color-hazard)] text-[18px] font-bold">
                    1 739 €
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="mt-6 font-mono text-[11px] text-[color:var(--color-phosphor-dim)] max-w-3xl">
            Comparaison à valeur d&apos;usage équivalente pour une asso de 6
            secouristes bénévoles. Garmin reste pertinent pour les expéditions
            polaires extrêmes (Iridium). DMR reste obligatoire pour les
            pompiers professionnels (Antarès). MAILLON couvre les 90&nbsp;%
            restants.
          </p>
        </section>

        {/* ─────────── OPEN-SOURCE COMMITMENT ─────────── */}
        <section aria-labelledby="open-heading" className="border-b border-[color:var(--color-divider)] px-6 lg:px-10 py-24">
          <div className="max-w-4xl mx-auto text-center">
            <p className="font-mono text-[10px] tracking-[0.22em] uppercase text-[color:var(--color-hazard)] mb-8" aria-hidden="true">
              [ COMMUN / GPL-V3 ]
            </p>
            <h2 id="open-heading" className="macro text-[clamp(56px,9vw,144px)] text-[color:var(--color-phosphor)] leading-[0.88] mb-12">
              ON NE
              <br />
              FERME
              <br />
              <span className="text-[color:var(--color-phosphor-dim)]">RIEN.</span>
            </h2>
            <p className="font-mono text-[14px] text-[color:var(--color-phosphor-dim)] leading-[1.7] mb-10 max-w-2xl mx-auto">
              Le firmware Meshtastic est open-source GPL&nbsp;v3. MAILLON
              s&apos;engage à reverser au moins 1&nbsp;% de son CA hardware au
              projet upstream. Code SaaS propriétaire, mais API publique
              documentée en standards ouverts (OpenAPI&nbsp;3, MQTT, GPX).
              Données exportables JSON à tout moment. Pas de verrouillage.
              Pas de chantage.
            </p>
            <ul className="flex flex-wrap justify-center gap-x-8 gap-y-3 font-mono text-[11px] uppercase tracking-[0.18em] list-none p-0 m-0">
              <li>
                <a
                  href="https://meshtastic.org"
                  rel="noopener noreferrer"
                  target="_blank"
                  className="tap-target text-[color:var(--color-phosphor)] maillon-link"
                >
                  <span aria-hidden="true">{">> "}</span>meshtastic.org
                  <span className="sr-only"> (nouvelle fenêtre)</span>
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/meshtastic/firmware"
                  rel="noopener noreferrer"
                  target="_blank"
                  className="tap-target text-[color:var(--color-phosphor)] maillon-link"
                >
                  <span aria-hidden="true">{">> "}</span>github / firmware
                  <span className="sr-only"> (nouvelle fenêtre)</span>
                </a>
              </li>
              <li>
                <a
                  href="https://meshtastic.discourse.group/"
                  rel="noopener noreferrer"
                  target="_blank"
                  className="tap-target text-[color:var(--color-phosphor)] maillon-link"
                >
                  <span aria-hidden="true">{">> "}</span>forum communauté
                  <span className="sr-only"> (nouvelle fenêtre)</span>
                </a>
              </li>
            </ul>
          </div>
        </section>

        {/* ─────────── PRECOMMANDE ─────────── */}
        <section
          id="preorder"
          aria-labelledby="preorder-heading"
          className="border-b-2 border-[color:var(--color-hazard)] px-6 lg:px-10 py-20"
        >
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-7">
              <p className="font-mono text-[10px] tracking-[0.22em] uppercase text-[color:var(--color-hazard)] mb-6" aria-hidden="true">
                [ TX&nbsp;/&nbsp;PRÉCOMMANDE ]
              </p>
              <h2 id="preorder-heading" className="macro text-[clamp(48px,7vw,96px)] text-[color:var(--color-phosphor)] leading-[0.9] mb-8">
                LIVRAISON
                <br />
                JUIN
                <br />
                <span className="text-[color:var(--color-hazard)]">2026.</span>
              </h2>
              <p className="font-mono text-[14px] text-[color:var(--color-phosphor-dim)] leading-[1.7] mb-6 max-w-xl">
                Pas de paiement aujourd&apos;hui. Vous recevez un email quand
                les premiers kits arrivent. Vous décidez à ce moment-là.
              </p>
              <p className="font-mono text-[12px] text-[color:var(--color-phosphor-dim)] uppercase tracking-[0.1em]">
                <span aria-hidden="true">{">>> "}</span>100 précommandes ouvrent une remise fondateurs de
                -10&nbsp;% sur le premier achat.
              </p>
            </div>
            <div className="lg:col-span-5">
              <PreorderForm />
            </div>
          </div>
        </section>

        {/* ─────────── DISCLAIMER ─────────── */}
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
              MAILLON ne se substitue pas au 112 ni à aucun service officiel
              de secours. En cas d&apos;urgence vitale, composez le{" "}
              <a href="tel:112" className="text-[color:var(--color-phosphor)] font-bold maillon-link">112</a>
              {" "}(numéro européen) ou le{" "}
              <a href="tel:15" className="text-[color:var(--color-phosphor)] font-bold maillon-link">15</a>
              {" "}(SAMU),{" "}
              <a href="tel:17" className="text-[color:var(--color-phosphor)] font-bold maillon-link">17</a>
              {" "}(police),{" "}
              <a href="tel:18" className="text-[color:var(--color-phosphor)] font-bold maillon-link">18</a>
              {" "}(pompiers). MAILLON est un outil de communication d&apos;appoint et de
              coordination, qui complète mais ne remplace jamais les comms
              officielles de la sécurité civile.
            </p>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
