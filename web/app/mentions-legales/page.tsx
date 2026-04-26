import type { Metadata } from "next";
import { SiteHeader } from "@components/SiteHeader";
import { SiteFooter } from "@components/SiteFooter";
import { LegalArticle } from "@components/LegalArticle";

export const metadata: Metadata = {
  title: "Mentions légales",
  description:
    "Mentions légales de MAILLON SAS, éditeur du site maillon.fr et du service Fleet Manager.",
  robots: { index: true, follow: true },
};

export default function MentionsLegalesPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <LegalArticle title="Mentions légales" updated="25 avril 2026">
          <h2>Éditeur du site</h2>
          <p>
            Le présent site <strong>maillon.fr</strong> est édité par
            MAILLON SAS, société par actions simplifiée au capital social
            à définir lors de l&apos;immatriculation, dont le siège
            social est en cours de domiciliation à Paris, France.
          </p>
          <ul>
            <li>Forme juridique : SAS (en cours d&apos;immatriculation au RCS de Paris)</li>
            <li>SIREN : à publier après immatriculation</li>
            <li>Numéro de TVA intracommunautaire : à publier</li>
            <li>Représentant légal (président) : à publier après immatriculation</li>
            <li>Email : <a href="mailto:bonjour@maillon.fr">bonjour@maillon.fr</a></li>
          </ul>

          <h2>Hébergeur</h2>
          <p>
            Le site est hébergé par Vercel Inc. (couche edge mondiale, données utilisateur
            stockées dans la région UE) et/ou Scaleway SAS, BP 438, 75366 Paris CEDEX 08.
            Le broker MQTT est hébergé sur l&apos;infrastructure Scaleway située à Paris (DC4) et/ou
            OVH SAS, 2 rue Kellermann, 59100 Roubaix.
          </p>

          <h2>Directeur de la publication</h2>
          <p>
            Le directeur de la publication est le président de MAILLON SAS.
          </p>

          <h2>Propriété intellectuelle</h2>
          <p>
            La marque <strong>MAILLON</strong> est en cours de dépôt à
            l&apos;INPI dans les classes 9, 38 et 42. Les contenus
            originaux du site (textes, illustrations, logos hors marques
            tierces, mises en page) sont la propriété de MAILLON SAS.
          </p>
          <p>
            Le firmware Meshtastic utilisé dans nos kits est distribué
            sous licence GPL v3 par Meshtastic LLC ; <em>Meshtastic</em> est
            une marque déposée. MAILLON ne se présente pas comme un
            représentant officiel de Meshtastic LLC.
          </p>

          <h2>Crédits</h2>
          <p>
            Police Inter par Rasmus Andersson (licence SIL Open Font Licence 1.1).
            Police JetBrains Mono par JetBrains s.r.o. (licence SIL OFL 1.1).
            Icônes Lucide (licence ISC).
          </p>

          <h2>Médiateur de la consommation</h2>
          <p>
            Conformément à l&apos;article L.612-1 du Code de la consommation,
            MAILLON adhère à un dispositif de médiation de la consommation.
            Les coordonnées du médiateur seront publiées dès finalisation
            de l&apos;adhésion.
          </p>

          <h2>Crédit photo</h2>
          <p>Mentions photographiques à compléter au lancement public.</p>
        </LegalArticle>
      </main>
      <SiteFooter />
    </>
  );
}
