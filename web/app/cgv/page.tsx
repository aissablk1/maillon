import type { Metadata } from "next";
import { SiteHeader } from "@components/SiteHeader";
import { SiteFooter } from "@components/SiteFooter";
import { LegalArticle } from "@components/LegalArticle";

export const metadata: Metadata = {
  title: "Conditions générales de vente",
  description:
    "Conditions générales de vente des produits MAILLON (kits matériel, accessoires).",
};

export default function CgvPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <LegalArticle title="Conditions générales de vente" updated="25 avril 2026">
          <p>
            <em>
              Document préliminaire — version applicable dès l&apos;ouverture
              effective de la boutique en ligne. Les pré-commandes
              n&apos;impliquent aucun paiement et ne constituent pas une
              vente jusqu&apos;à confirmation explicite.
            </em>
          </p>

          <h2>Article 1 — Objet</h2>
          <p>
            Les présentes Conditions Générales de Vente (CGV) régissent
            les ventes de produits matériel (kits, accessoires) effectuées
            par MAILLON SAS (« le Vendeur ») via le site maillon.fr aux
            consommateurs et aux professionnels (« l&apos;Acheteur »).
          </p>

          <h2>Article 2 — Produits</h2>
          <p>
            Les produits proposés sont décrits avec exactitude sur la
            fiche produit. Les photographies sont indicatives. Le Vendeur
            se réserve le droit d&apos;ajuster les références
            sans préavis tant qu&apos;une commande n&apos;est pas
            confirmée.
          </p>

          <h2>Article 3 — Prix</h2>
          <p>
            Les prix sont indiqués en euros, toutes taxes comprises (TVA
            française 20 %). Les frais de livraison sont précisés avant
            confirmation de commande. Le Vendeur se réserve le droit de
            modifier ses prix à tout moment, étant entendu que le prix
            applicable est celui en vigueur au moment de la commande.
          </p>

          <h2>Article 4 — Commande</h2>
          <p>
            La commande devient ferme et définitive après confirmation
            par email récapitulatif. Le Vendeur peut refuser une commande
            en cas d&apos;impayé antérieur, de fraude soupçonnée, ou de
            rupture de stock prolongée (notification sous 7 jours
            ouvrés).
          </p>

          <h2>Article 5 — Paiement</h2>
          <p>
            Le paiement s&apos;effectue par carte bancaire via Stripe
            (3D Secure activé), virement SEPA pour les commandes B2B
            supérieures à 500 €, ou tout autre moyen précisé sur le
            site. Le paiement est dû en intégralité à la commande, sauf
            convention écrite spécifique (B2B avec acompte).
          </p>

          <h2>Article 6 — Livraison</h2>
          <p>
            Les produits sont livrés à l&apos;adresse indiquée par
            l&apos;Acheteur. Délai indicatif&nbsp;: 5 à 15 jours ouvrés
            selon le kit et la disponibilité du stock. En cas de retard
            supérieur à 30 jours sans communication préalable,
            l&apos;Acheteur peut annuler la commande et obtenir
            remboursement intégral.
          </p>

          <h2>Article 7 — Droit de rétractation (consommateurs)</h2>
          <p>
            Conformément à l&apos;article L221-18 du Code de la
            consommation, l&apos;Acheteur consommateur dispose d&apos;un
            délai de <strong>14 jours</strong> à compter de la réception
            du produit pour exercer son droit de rétractation, sans
            justification.
          </p>
          <p>
            Pour exercer ce droit&nbsp;: notifier MAILLON par email à{" "}
            <a href="mailto:retours@maillon.fr">retours@maillon.fr</a>{" "}
            avec le numéro de commande. Renvoyer le produit dans son
            emballage d&apos;origine, complet et en parfait état, dans
            les 14 jours suivant la notification. Frais de retour à la
            charge de l&apos;Acheteur. Remboursement sous 14 jours après
            réception.
          </p>

          <h2>Article 8 — Garanties</h2>
          <p>
            Outre la garantie commerciale MAILLON de 24 mois sur le
            matériel, l&apos;Acheteur bénéficie de plein droit de&nbsp;:
          </p>
          <ul>
            <li>
              La <strong>garantie légale de conformité</strong>{" "}
              (articles L217-3 à L217-17 du Code de la consommation),
              valable 2 ans à compter de la livraison
            </li>
            <li>
              La <strong>garantie des vices cachés</strong>{" "}
              (articles 1641 à 1649 du Code civil), valable 2 ans à
              compter de la découverte du vice
            </li>
          </ul>

          <h2>Article 9 — Force majeure</h2>
          <p>
            Le Vendeur ne saurait être tenu responsable des manquements
            résultant d&apos;un cas de force majeure, tel que défini par
            la jurisprudence française.
          </p>

          <h2>Article 10 — Données personnelles</h2>
          <p>
            Le traitement des données personnelles est régi par notre{" "}
            <a href="/confidentialite">politique de confidentialité</a>.
          </p>

          <h2>Article 11 — Médiation et règlement des litiges</h2>
          <p>
            En cas de litige, l&apos;Acheteur consommateur peut recourir
            gratuitement au médiateur de la consommation auquel MAILLON
            adhère (coordonnées à publier).
          </p>
          <p>
            Plateforme européenne de règlement en ligne des litiges&nbsp;:
            <br />
            <a
              href="https://ec.europa.eu/consumers/odr/"
              target="_blank"
              rel="noopener noreferrer"
            >
              ec.europa.eu/consumers/odr
            </a>
          </p>

          <h2>Article 12 — Droit applicable</h2>
          <p>
            Les présentes CGV sont soumises au droit français. À défaut
            de résolution amiable, tout litige relèvera de la compétence
            des tribunaux français.
          </p>
        </LegalArticle>
      </main>
      <SiteFooter />
    </>
  );
}
