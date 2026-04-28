import type { Metadata } from "next";
import { SiteHeader } from "@components/SiteHeader";
import { SiteFooter } from "@components/SiteFooter";
import { LegalArticle } from "@components/LegalArticle";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  description:
    "Comment MAILLON collecte, utilise et protège vos données personnelles. Conformité RGPD, hébergement UE, droits des personnes, durée de conservation.",
};

export default function ConfidentialitePage() {
  return (
    <>
      <SiteHeader />
      <main id="main">
        <LegalArticle
          title="Politique de confidentialité"
          updated="25 avril 2026"
        >
          <p>
            La présente politique décrit comment MAILLON SAS
            (<em>« MAILLON », « nous »</em>) collecte, utilise et
            protège vos données personnelles, en application du
            Règlement Général sur la Protection des Données (RGPD,
            règlement UE 2016/679) et de la loi française Informatique
            et Libertés modifiée.
          </p>

          <h2>1. Qui est responsable du traitement&nbsp;?</h2>
          <p>
            MAILLON SAS, en cours d&apos;immatriculation à Paris.
            Pour toute question, écrivez à{" "}
            <a href="mailto:bonjour@maillon.fr">bonjour@maillon.fr</a>.
          </p>

          <h2>2. Quelles données collectons-nous&nbsp;?</h2>
          <h3>2.1 Données d&apos;identification</h3>
          <ul>
            <li>Nom, prénom, email (création de compte, support, livraison)</li>
            <li>Adresse postale (livraison de kits)</li>
            <li>Numéro de téléphone (optionnel, pour livraison)</li>
            <li>Nom de l&apos;organisation (B2B)</li>
          </ul>

          <h3>2.2 Données de paiement</h3>
          <p>
            Les paiements sont traités par Stripe (PCI DSS niveau 1).
            Nous ne stockons ni ne voyons vos données de carte bancaire.
            Nous conservons uniquement le justificatif de transaction
            pour nos obligations comptables (10 ans).
          </p>

          <h3>2.3 Données issues du SaaS Fleet Manager</h3>
          <ul>
            <li>Positions GPS des nœuds (lat/lon, précision, timestamp)</li>
            <li>Télémétrie (batterie, voltage, température, humidité, niveau signal)</li>
            <li>Messages texte transitant par MQTT (chiffrés bout-en-bout)</li>
            <li>Logs d&apos;authentification, d&apos;audit (qui fait quoi, quand)</li>
          </ul>

          <h3>2.4 Données techniques</h3>
          <ul>
            <li>Adresse IP (sécurité, anti-abus)</li>
            <li>User-Agent (compatibilité technique)</li>
            <li>Statistiques d&apos;usage anonymisées (Plausible, sans cookie)</li>
          </ul>

          <h2>3. Pourquoi traitons-nous vos données&nbsp;?</h2>
          <table>
            <thead>
              <tr>
                <th>Finalité</th>
                <th>Base légale</th>
                <th>Durée de conservation</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Création et gestion compte</td>
                <td>Exécution contrat</td>
                <td>5 ans après dernière activité</td>
              </tr>
              <tr>
                <td>Livraison kits</td>
                <td>Exécution contrat</td>
                <td>3 ans après livraison</td>
              </tr>
              <tr>
                <td>Facturation</td>
                <td>Obligation légale</td>
                <td>10 ans</td>
              </tr>
              <tr>
                <td>Support technique</td>
                <td>Exécution contrat</td>
                <td>3 ans après dernier ticket</td>
              </tr>
              <tr>
                <td>Tracking flotte SaaS</td>
                <td>Exécution contrat + intérêt légitime</td>
                <td>Selon plan : 7j / 90j / 1 an / configurable</td>
              </tr>
              <tr>
                <td>Newsletter</td>
                <td>Consentement explicite</td>
                <td>Jusqu&apos;à désinscription</td>
              </tr>
              <tr>
                <td>Sécurité et fraude</td>
                <td>Intérêt légitime</td>
                <td>13 mois max</td>
              </tr>
              <tr>
                <td>Statistiques anonymisées</td>
                <td>Intérêt légitime</td>
                <td>13 mois max</td>
              </tr>
            </tbody>
          </table>

          <h2>4. Avec qui partageons-nous vos données&nbsp;?</h2>
          <p>
            Nous ne vendons jamais vos données. Nous ne les transmettons
            à des sous-traitants que dans la stricte mesure de ce qui
            est nécessaire à la fourniture du service&nbsp;:
          </p>
          <ul>
            <li><strong>Stripe</strong> (paiements) — DPA signé, données minimales</li>
            <li><strong>Scaleway / OVH</strong> (hébergement UE) — DPA signé</li>
            <li><strong>Resend / Mailjet</strong> (emails transactionnels) — DPA signé</li>
            <li><strong>Cabinet comptable</strong> (factures) — secret professionnel</li>
            <li><strong>Plausible Analytics</strong> (stats anonymisées, hébergement UE) — DPA signé</li>
          </ul>
          <p>
            <strong>Aucune donnée personnelle ne franchit l&apos;Atlantique sans
            cadre juridique dédié.</strong> En cas de transfert hors UE
            (rare), nous appliquons les Clauses Contractuelles Types
            (CCT) approuvées par la Commission européenne.
          </p>

          <h2>5. Vos droits</h2>
          <p>
            Vous disposez des droits suivants&nbsp;:
          </p>
          <ul>
            <li><strong>Droit d&apos;accès</strong> : obtenir une copie de vos données</li>
            <li><strong>Droit de rectification</strong> : corriger une information erronée</li>
            <li><strong>Droit à l&apos;effacement</strong> : supprimer votre compte et vos données</li>
            <li><strong>Droit à la portabilité</strong> : récupérer vos données au format JSON ou GPX</li>
            <li><strong>Droit d&apos;opposition</strong> : vous opposer à un traitement basé sur l&apos;intérêt légitime</li>
            <li><strong>Droit à la limitation</strong> : geler temporairement un traitement</li>
            <li><strong>Droit de retirer votre consentement</strong> à tout moment</li>
          </ul>
          <p>
            Vous pouvez exercer ces droits directement depuis votre
            compte SaaS (panneau « Mes données ») ou par email à{" "}
            <a href="mailto:bonjour@maillon.fr">bonjour@maillon.fr</a>.
            Réponse sous 30 jours maximum.
          </p>
          <p>
            Si vous estimez que vos droits ne sont pas respectés, vous
            pouvez introduire une réclamation auprès de la{" "}
            <a
              href="https://www.cnil.fr"
              target="_blank"
              rel="noopener noreferrer"
            >
              CNIL
            </a>
            .
          </p>

          <h2>6. Sécurité</h2>
          <p>
            Nous mettons en œuvre des mesures techniques et
            organisationnelles appropriées au regard du risque&nbsp;:
            chiffrement TLS 1.3 en transit, AES-256 au repos, 2FA
            obligatoire dès le plan Team, journalisation des accès,
            backups chiffrés, principe du moindre privilège.
          </p>

          <h2>7. Cookies</h2>
          <p>
            Notre site n&apos;utilise pas de cookies tiers. Nous
            utilisons un seul cookie technique (jeton de session) et
            l&apos;analytique Plausible qui fonctionne sans cookie.
            Voir notre <a href="/cookies">politique cookies</a> pour
            le détail.
          </p>

          <h2>8. Modifications</h2>
          <p>
            Cette politique peut être mise à jour. Toute modification
            substantielle vous sera notifiée par email au moins 15 jours
            avant son entrée en vigueur. La version actuelle est
            datée en haut de ce document.
          </p>
        </LegalArticle>
      </main>
      <SiteFooter />
    </>
  );
}
