import Link from "next/link";
import { SiteHeader } from "@components/SiteHeader";
import { SiteFooter } from "@components/SiteFooter";
import { MeshDiagram } from "@components/MeshDiagram";
import { KitCard } from "@components/KitCard";
import { VerticalRow } from "@components/VerticalRow";
import { PreorderForm } from "@components/PreorderForm";

export default function HomePage() {
  return (
    <>
      <SiteHeader />

      <main>
        {/* ─────────── HERO ─────────── */}
        <section className="relative overflow-hidden">
          <div className="mx-auto max-w-7xl px-6 pt-24 pb-32 lg:px-10 lg:pt-32 lg:pb-40">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-end">
              <div className="lg:col-span-7">
                <p className="eyebrow text-[color:var(--color-forest)] mb-8">
                  Mesh longue portée · France · 868 MHz
                </p>
                <h1 className="maillon-hero text-[clamp(2.6rem,6vw,5.6rem)] text-[color:var(--color-charcoal)] mb-8">
                  Le réseau<br />
                  qui&nbsp;porte<br />
                  <span className="italic font-light">loin.</span>
                </h1>
                <p className="text-xl lg:text-[1.4rem] leading-relaxed max-w-2xl text-[color:var(--color-charcoal)]/80">
                  Quand le réseau cellulaire vous lâche, quand le satellite
                  coûte trop cher, quand la radio pro est trop complexe —
                  un kit MAILLON tient une équipe en lien sur 30 km à vue,
                  jusqu&apos;à plusieurs centaines en relais. Sans abonnement.
                  Sans licence. Sans dépendance.
                </p>

                <div className="mt-12 flex flex-col sm:flex-row gap-4">
                  <Link
                    href="#preorder"
                    className="btn-primary inline-flex items-center justify-center bg-[color:var(--color-forest)] text-[color:var(--color-sand)] px-8 py-4 text-base font-medium rounded-md"
                  >
                    Pré-commander un kit&nbsp;›
                  </Link>
                  <Link
                    href="#kits"
                    className="btn-secondary inline-flex items-center justify-center border border-[color:var(--color-charcoal)]/20 text-[color:var(--color-charcoal)] px-8 py-4 text-base font-medium rounded-md hover:border-[color:var(--color-charcoal)]/60"
                  >
                    Découvrir les kits&nbsp;›
                  </Link>
                </div>
              </div>

              <div className="lg:col-span-5 lg:pl-8">
                <div className="relative">
                  <MeshDiagram />
                </div>
                <p className="mt-6 text-sm text-[color:var(--color-charcoal)]/60 font-mono">
                  7 nœuds simulés · multi-hop actif · EU 868 MHz
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ─────────── NUMBERS STRIP ─────────── */}
        <section className="bg-[color:var(--color-charcoal)] text-[color:var(--color-sand)]">
          <div className="mx-auto max-w-7xl px-6 lg:px-10 py-20 lg:py-28">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-20">
              <div className="border-l-2 border-[color:var(--color-moss)] pl-6">
                <p className="eyebrow text-[color:var(--color-moss)] mb-4">
                  Portée à vue
                </p>
                <p className="text-7xl lg:text-8xl font-bold tabular-nums tracking-tight">
                  30<span className="text-3xl lg:text-4xl text-[color:var(--color-sand)]/60 ml-1">km</span>
                </p>
                <p className="mt-3 text-base text-[color:var(--color-sand)]/70">
                  Mesurés en terrain ouvert avec antenne 7 dBi.
                  Record mondial point-à-point&nbsp;: 331 km.
                </p>
              </div>

              <div className="border-l-2 border-[color:var(--color-signal)] pl-6">
                <p className="eyebrow text-[color:var(--color-signal)] mb-4">
                  En relais multi-sauts
                </p>
                <p className="text-7xl lg:text-8xl font-bold tabular-nums tracking-tight">
                  300<span className="text-3xl lg:text-4xl text-[color:var(--color-sand)]/60 ml-1">km</span>
                </p>
                <p className="mt-3 text-base text-[color:var(--color-sand)]/70">
                  Avec un maillage de relais bien positionnés.
                  Chaque nœud devient routeur du précédent.
                </p>
              </div>

              <div className="border-l-2 border-[color:var(--color-sand)] pl-6">
                <p className="eyebrow text-[color:var(--color-sand)] mb-4">
                  Abonnement obligatoire
                </p>
                <p className="text-7xl lg:text-8xl font-bold tabular-nums tracking-tight">
                  0<span className="text-3xl lg:text-4xl text-[color:var(--color-sand)]/60 ml-1">€</span>
                </p>
                <p className="mt-3 text-base text-[color:var(--color-sand)]/70">
                  Bande ISM 868 MHz libre. Pas d&apos;opérateur,
                  pas de constellation, pas de licence.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ─────────── COMMENT ÇA MARCHE ─────────── */}
        <section className="py-24 lg:py-36">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
              <div className="lg:col-span-5">
                <p className="eyebrow text-[color:var(--color-forest)] mb-8">
                  Comment ça marche
                </p>
                <h2 className="text-4xl lg:text-5xl font-bold tracking-tight mb-8 leading-[1.05]">
                  Chaque nœud est un&nbsp;
                  <span className="italic font-light">maillon</span>
                  . Perdez-en un, le réseau trouve un autre chemin.
                </h2>
                <p className="text-lg text-[color:var(--color-charcoal)]/75 mb-6">
                  MAILLON s&apos;appuie sur Meshtastic, le firmware
                  open-source de référence pour les radios LoRa
                  (40&nbsp;000+ nœuds actifs dans le monde, 200+ en France).
                </p>
                <p className="text-lg text-[color:var(--color-charcoal)]/75">
                  Notre travail&nbsp;: préconfigurer le matériel, traduire
                  l&apos;expérience en français, ajouter un tableau de bord
                  de gestion de flotte, et rendre tout ça utilisable
                  par un retraité randonneur ou un conducteur de travaux —
                  pas seulement par un radioamateur.
                </p>
              </div>

              <div className="lg:col-span-7">
                <div className="bg-[color:var(--color-sand)] border border-[color:var(--color-charcoal)]/10 rounded-lg p-8 lg:p-12">
                  <ol className="space-y-8">
                    {[
                      {
                        n: "01",
                        t: "Vous ouvrez la boîte",
                        d: "Les nœuds sont déjà flashés en région EU 868, antenne fixée, batterie chargée à 100%, étiquetés au nom de votre équipe.",
                      },
                      {
                        n: "02",
                        t: "Vous allumez",
                        d: "Première synchro mesh en moins de 30 secondes. Position GPS verrouillée en 1 minute en extérieur.",
                      },
                      {
                        n: "03",
                        t: "Vous appairez votre smartphone",
                        d: "Bluetooth, l'app Meshtastic. Onboarding en 4 écrans. Premier message envoyé en moins de 3 minutes après l'unboxing.",
                      },
                      {
                        n: "04",
                        t: "Vous communiquez",
                        d: "Texte chiffré AES-256, position partagée à votre équipe, alertes batterie. Hors couverture cellulaire, hors couverture satellite.",
                      },
                    ].map((step) => (
                      <li
                        key={step.n}
                        className="grid grid-cols-[auto_1fr] gap-6 items-baseline"
                      >
                        <span className="font-mono text-sm text-[color:var(--color-forest)] tabular-nums">
                          {step.n}
                        </span>
                        <div>
                          <h3 className="text-xl font-semibold mb-2">
                            {step.t}
                          </h3>
                          <p className="text-base text-[color:var(--color-charcoal)]/75">
                            {step.d}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─────────── KITS ─────────── */}
        <section
          id="kits"
          className="bg-[color:var(--color-sand)] py-24 lg:py-36 border-y border-[color:var(--color-charcoal)]/10"
        >
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <div className="max-w-3xl mb-16 lg:mb-24">
              <p className="eyebrow text-[color:var(--color-forest)] mb-6">
                Trois kits, trois usages
              </p>
              <h2 className="text-4xl lg:text-6xl font-bold tracking-tight leading-[1.05]">
                Du week-end en bivouac au PC commande de secours.
              </h2>
              <p className="mt-8 text-lg text-[color:var(--color-charcoal)]/75 max-w-2xl">
                Tous nos kits sont préconfigurés en région EU 868 MHz,
                marqués CE, livrés avec une notice illustrée en français
                et une garantie de 24 mois.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
              <KitCard
                kind="decouverte"
                eyebrow="Kit Découverte"
                price="99 €"
                priceNote="TTC, livré"
                title="Pour deux. Le premier pas."
                description="Deux nœuds compacts, parfait pour une famille en randonnée ou une initiation au mesh."
                features={[
                  "2× LILYGO T-Echo préconfigurés",
                  "5 à 10 km de portée à vue",
                  "5 jours d'autonomie",
                  "Compte SaaS Free inclus",
                  "Notice 4 volets en français",
                ]}
                cta="Pré-commander"
                href="/kits/decouverte"
              />

              <KitCard
                kind="pro"
                eyebrow="Kit Pro"
                price="399 €"
                priceNote="TTC, livré"
                title="Pour les chantiers. Pour les festivals."
                description="Quatre portatifs et une station relais. Coordonnez une équipe sur une zone d'opérations entière."
                features={[
                  "4× T-Beam Supreme + 1 station relais",
                  "10 à 20 km² de couverture utile",
                  "Mallette de transport semi-rigide",
                  "30 jours d'essai SaaS Team",
                  "Configuration sur-mesure incluse",
                ]}
                cta="Demander un devis"
                href="/kits/pro"
                highlight
              />

              <KitCard
                kind="secours"
                eyebrow="Kit Secours"
                price="1 199 €"
                priceNote="TTC, livré et configuré"
                title="Pour les FFSS. Pour les ADRASEC."
                description="Six secouristes terrain, deux relais redondants, une console PC. Conçu pour les associations qui interviennent en zone blanche."
                features={[
                  "6× RAK4631 IP67 antichoc",
                  "2× Station G2 redondantes",
                  "1× console PC opérateur T-Deck Plus",
                  "6 mois SaaS Team inclus",
                  "Demi-journée de formation offerte",
                ]}
                cta="Demander un devis"
                href="/kits/secours"
              />
            </div>

            <p className="mt-12 text-base text-[color:var(--color-charcoal)]/60 text-center">
              Besoin d&apos;une flotte de 50, 200 ou 1 000 nœuds&nbsp;?
              <Link
                href="/contact"
                className="ml-2 underline underline-offset-4 hover:text-[color:var(--color-forest)]"
              >
                Demander une étude personnalisée&nbsp;›
              </Link>
            </p>
          </div>
        </section>

        {/* ─────────── VERTICALES ─────────── */}
        <section className="py-24 lg:py-36">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
              <div className="lg:col-span-6 lg:col-start-1">
                <p className="eyebrow text-[color:var(--color-forest)] mb-6">
                  Là où MAILLON change la donne
                </p>
                <h2 className="text-4xl lg:text-5xl font-bold tracking-tight leading-[1.08]">
                  Cinq mondes. Un même besoin&nbsp;: rester en lien.
                </h2>
              </div>
            </div>

            <div className="border-t border-[color:var(--color-charcoal)]/10">
              <VerticalRow
                index="01"
                title="Secours bénévoles"
                tags={["FFSS", "ADRASEC", "SDIS bénévoles", "Croix-Rouge"]}
                description="Une intervention en zone blanche peut perdre 4 minutes de jonction radio. MAILLON la ramène à 30 secondes — pour 1 199 € au lieu de 16 500 €."
              />
              <VerticalRow
                index="02"
                title="Chantiers BTP isolés"
                tags={["Forêt", "Carrière", "Pose réseau", "Photovoltaïque"]}
                description="Conducteur de travaux au bureau, équipes sur le chantier à 8 km. MAILLON garde le lien sans SIM, sans licence, sans relais à louer."
              />
              <VerticalRow
                index="03"
                title="Festivals et événementiel"
                tags={["Sécurité", "Logistique", "Médical", "Backstage"]}
                description="80 talkies de location à 1 920 €/édition. Achat MAILLON équivalent amorti dès la deuxième édition, plus messagerie chiffrée et géofences."
              />
              <VerticalRow
                index="04"
                title="Outdoor et expéditions"
                tags={["Alpinisme", "Trail", "Voile côtière", "Overland"]}
                description="450 € hardware Garmin + 900 € abonnement sur 5 ans = 1 350 €. Kit Découverte MAILLON pour deux personnes : 99 €. Le calcul est vite fait."
              />
              <VerticalRow
                index="05"
                title="Agriculture et élevage extensif"
                tags={["Estive", "Saisonniers", "Multi-sites", "Bergers"]}
                description="50 % du foncier agricole français est en zone blanche cellulaire. Coordonner trois bergers sur 800 ha d'estive sans risquer la sécurité d'un saisonnier isolé."
              />
            </div>
          </div>
        </section>

        {/* ─────────── COMPARAISON ─────────── */}
        <section className="bg-[color:var(--color-charcoal)] text-[color:var(--color-sand)] py-24 lg:py-36">
          <div className="mx-auto max-w-6xl px-6 lg:px-10">
            <p className="eyebrow text-[color:var(--color-moss)] mb-6">
              Comparons honnêtement
            </p>
            <h2 className="text-4xl lg:text-5xl font-bold tracking-tight mb-12 lg:mb-16 leading-[1.08]">
              MAILLON vs Garmin inReach vs DMR pro.
            </h2>

            <div className="overflow-x-auto -mx-6 lg:mx-0">
              <table className="w-full min-w-[640px] text-base">
                <thead>
                  <tr className="border-b-2 border-[color:var(--color-sand)]/20">
                    <th className="text-left py-4 px-6 font-medium text-[color:var(--color-sand)]/60">
                      Cas&nbsp;: équiper 6 secouristes pendant 5 ans
                    </th>
                    <th className="text-left py-4 px-6 font-medium text-[color:var(--color-sand)]/60">
                      DMR Hytera
                    </th>
                    <th className="text-left py-4 px-6 font-medium text-[color:var(--color-sand)]/60">
                      Garmin inReach
                    </th>
                    <th className="text-left py-4 px-6 font-medium text-[color:var(--color-moss)]">
                      MAILLON
                    </th>
                  </tr>
                </thead>
                <tbody className="font-mono text-sm tabular-nums">
                  <tr className="border-b border-[color:var(--color-sand)]/10">
                    <td className="py-4 px-6 font-sans">Hardware initial</td>
                    <td className="py-4 px-6">9 000 €</td>
                    <td className="py-4 px-6">2 700 €</td>
                    <td className="py-4 px-6">1 199 €</td>
                  </tr>
                  <tr className="border-b border-[color:var(--color-sand)]/10">
                    <td className="py-4 px-6 font-sans">Abonnement (5 ans)</td>
                    <td className="py-4 px-6">4 000 €</td>
                    <td className="py-4 px-6">5 400 €</td>
                    <td className="py-4 px-6">540 € <span className="text-[color:var(--color-sand)]/40">(SaaS opt.)</span></td>
                  </tr>
                  <tr className="border-b border-[color:var(--color-sand)]/10">
                    <td className="py-4 px-6 font-sans">Console centralisée</td>
                    <td className="py-4 px-6">4 000 €</td>
                    <td className="py-4 px-6">N/A</td>
                    <td className="py-4 px-6">incluse</td>
                  </tr>
                  <tr className="border-b border-[color:var(--color-sand)]/10">
                    <td className="py-4 px-6 font-sans">Comms multi-utilisateurs</td>
                    <td className="py-4 px-6">oui</td>
                    <td className="py-4 px-6">non</td>
                    <td className="py-4 px-6">oui</td>
                  </tr>
                  <tr className="border-b border-[color:var(--color-sand)]/10">
                    <td className="py-4 px-6 font-sans">Hors couverture cellulaire</td>
                    <td className="py-4 px-6">oui (relais)</td>
                    <td className="py-4 px-6">oui (satellite)</td>
                    <td className="py-4 px-6">oui (mesh)</td>
                  </tr>
                  <tr>
                    <td className="py-5 px-6 font-sans font-semibold">
                      Total 5 ans
                    </td>
                    <td className="py-5 px-6 text-lg">17 000 €</td>
                    <td className="py-5 px-6 text-lg">8 100 €</td>
                    <td className="py-5 px-6 text-lg text-[color:var(--color-moss)] font-semibold">
                      1 739 €
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="mt-8 text-sm text-[color:var(--color-sand)]/50 max-w-3xl">
              Comparaison à valeur d&apos;usage équivalente pour une asso
              de 6 secouristes bénévoles. Garmin reste pertinent pour les
              expéditions polaires extrêmes (constellation Iridium), DMR
              reste obligatoire pour les pompiers professionnels (réseau
              Antarès). MAILLON couvre les 90&nbsp;% restants.
            </p>
          </div>
        </section>

        {/* ─────────── OPEN SOURCE COMMITMENT ─────────── */}
        <section className="py-24 lg:py-36">
          <div className="mx-auto max-w-5xl px-6 lg:px-10 text-center">
            <p className="eyebrow text-[color:var(--color-forest)] mb-6">
              Notre engagement
            </p>
            <h2 className="text-4xl lg:text-5xl font-bold tracking-tight leading-[1.08] mb-10">
              On ne ferme rien.<br />
              On <span className="italic font-light">contribue</span>.
            </h2>
            <p className="text-lg text-[color:var(--color-charcoal)]/75 max-w-2xl mx-auto">
              Le firmware Meshtastic est open-source sous licence GPL v3.
              MAILLON s&apos;engage à reverser au moins 1&nbsp;% de son
              chiffre d&apos;affaires hardware au projet upstream.
              Notre code SaaS est propriétaire mais l&apos;API publique est
              documentée en standards ouverts (OpenAPI 3, MQTT). Vos
              données sont exportables à tout moment au format JSON
              ou GPX. Pas de verrouillage. Pas de chantage.
            </p>
            <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://meshtastic.org"
                rel="noopener noreferrer"
                target="_blank"
                className="text-[color:var(--color-forest)] font-medium underline-offset-4 hover:underline"
              >
                meshtastic.org&nbsp;›
              </a>
              <a
                href="https://github.com/meshtastic/firmware"
                rel="noopener noreferrer"
                target="_blank"
                className="text-[color:var(--color-forest)] font-medium underline-offset-4 hover:underline"
              >
                Firmware sur GitHub&nbsp;›
              </a>
              <Link
                href="/communaute"
                className="text-[color:var(--color-forest)] font-medium underline-offset-4 hover:underline"
              >
                Communauté MAILLON FR&nbsp;›
              </Link>
            </div>
          </div>
        </section>

        {/* ─────────── PRECOMMANDE ─────────── */}
        <section
          id="preorder"
          className="bg-[color:var(--color-forest)] text-[color:var(--color-sand)] py-24 lg:py-36"
        >
          <div className="mx-auto max-w-5xl px-6 lg:px-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
              <div>
                <p className="eyebrow text-[color:var(--color-moss)] mb-6">
                  Pré-commande
                </p>
                <h2 className="text-4xl lg:text-5xl font-bold tracking-tight leading-[1.05] mb-8">
                  Premiers kits livrés en juin 2026.
                </h2>
                <p className="text-lg text-[color:var(--color-sand)]/85 mb-6">
                  Pas de paiement aujourd&apos;hui. Vous recevez un email
                  quand les premiers kits arrivent. Vous décidez à ce
                  moment-là.
                </p>
                <p className="text-base text-[color:var(--color-sand)]/70 font-mono">
                  &gt; 100 pré-commandes ouvrent une remise fondateurs
                  de -10&nbsp;% sur le premier achat.
                </p>
              </div>

              <PreorderForm />
            </div>
          </div>
        </section>

        {/* ─────────── DISCLAIMER ─────────── */}
        <section className="py-12 bg-[color:var(--color-charcoal)]/95 text-[color:var(--color-sand)]/70">
          <div className="mx-auto max-w-5xl px-6 lg:px-10 text-sm">
            <p className="font-semibold text-[color:var(--color-sand)] mb-2">
              Important — MAILLON n&apos;est pas un service de secours
              officiel.
            </p>
            <p>
              En cas d&apos;urgence vitale, composez le <strong>112</strong>{" "}
              (numéro européen) ou le <strong>15</strong> (SAMU),
              <strong> 17</strong> (police), <strong>18</strong>{" "}
              (pompiers). MAILLON est un outil de communication d&apos;appoint
              et de coordination, qui complète mais ne remplace
              jamais les comms officielles de la sécurité civile.
            </p>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
