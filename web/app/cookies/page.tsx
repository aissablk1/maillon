import type { Metadata } from "next";
import { SiteHeader } from "@components/SiteHeader";
import { SiteFooter } from "@components/SiteFooter";
import { LegalArticle } from "@components/LegalArticle";

export const metadata: Metadata = {
  title: "Politique cookies",
  description:
    "Comment MAILLON utilise (très peu de) cookies. Pas de tracking publicitaire, pas de cookie tiers.",
};

export default function CookiesPage() {
  return (
    <>
      <SiteHeader />
      <main id="main">
        <LegalArticle title="Politique cookies" updated="25 avril 2026">
          <p>
            <strong>Synthèse&nbsp;:</strong> nous n&apos;utilisons aucun
            cookie publicitaire, aucun pixel de tracking, aucun cookie
            tiers. Vous n&apos;avez pas besoin de cliquer sur un bouton
            de bandeau cookies pour accepter quoi que ce soit. C&apos;est
            réfléchi.
          </p>

          <h2>Cookies strictement nécessaires</h2>
          <p>
            Quand vous vous connectez à votre compte SaaS, nous utilisons
            un seul cookie technique pour maintenir votre session
            authentifiée (nom&nbsp;: <code>maillon_session</code>,
            durée&nbsp;: 7 jours, HttpOnly, Secure, SameSite=Lax).
            Ce cookie est exempté de consentement par la directive
            ePrivacy car il est strictement nécessaire au service.
          </p>

          <h2>Statistiques anonymisées</h2>
          <p>
            Nous utilisons{" "}
            <a
              href="https://plausible.io"
              target="_blank"
              rel="noopener noreferrer"
            >
              Plausible Analytics
            </a>
            , une solution d&apos;analytique respectueuse de la vie
            privée hébergée en UE. Plausible{" "}
            <strong>n&apos;utilise aucun cookie</strong> et anonymise
            toutes les données. Aucune information personnelle n&apos;est
            collectée. Conformément à la position de la CNIL, ce
            traitement est exempté de consentement.
          </p>

          <h2>Pas de cookies tiers</h2>
          <p>
            Nous n&apos;intégrons aucun pixel Facebook, aucun Google
            Analytics, aucun bouton de partage social qui charge des
            cookies tiers, aucune balise marketing externe.
          </p>

          <h2>Comment supprimer les cookies&nbsp;?</h2>
          <p>
            La plupart des navigateurs permettent de supprimer ou
            bloquer les cookies. Les démarches diffèrent selon le
            navigateur&nbsp;:
          </p>
          <ul>
            <li>Firefox&nbsp;: Préférences → Vie privée → Cookies</li>
            <li>Chrome&nbsp;: Paramètres → Confidentialité → Cookies</li>
            <li>Safari&nbsp;: Préférences → Confidentialité</li>
            <li>Edge&nbsp;: Paramètres → Cookies</li>
          </ul>

          <h2>Évolution</h2>
          <p>
            Nous nous engageons à maintenir cette philosophie&nbsp;:
            zéro cookie publicitaire, zéro tracking tiers. Si nous
            devions un jour ajouter un service nécessitant des cookies
            non essentiels, nous mettrions en place un bandeau de
            consentement explicite respectant les exigences CNIL.
          </p>
        </LegalArticle>
      </main>
      <SiteFooter />
    </>
  );
}
