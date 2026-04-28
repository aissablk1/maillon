import type { Metadata } from "next";
import { Suspense } from "react";
import { SiteHeader } from "@components/SiteHeader";
import { SiteFooter } from "@components/SiteFooter";
import { ContactForm } from "@components/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Demandez un devis, une démo, ou posez vos questions techniques. Réponse sous 48 heures ouvrées garantie. Email bonjour@maillon.fr.",
};

export default function ContactPage() {
  return (
    <>
      <SiteHeader />
      <main id="main">
        <section className="py-20 lg:py-28">
          <div className="mx-auto max-w-6xl px-6 lg:px-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
              <div className="lg:col-span-5">
                <p className="eyebrow text-[color:var(--color-forest)] mb-6">
                  Contact
                </p>
                <h1 className="maillon-hero text-[clamp(2rem,4.5vw,3.6rem)] mb-8 leading-[1.05]">
                  Une question.<br />
                  <span className="italic font-light">Une réponse.</span>
                </h1>
                <p className="text-lg text-[color:var(--color-charcoal)]/75 mb-10">
                  On répond personnellement, en français, sous 48 heures
                  ouvrées maximum. Pas de chatbot. Pas de ticketing
                  automatique pour la première interaction.
                </p>

                <div className="space-y-6 text-sm">
                  <div>
                    <p className="eyebrow text-[color:var(--color-forest)] mb-2">
                      Email
                    </p>
                    <a
                      href="mailto:bonjour@maillon.fr"
                      className="text-base font-medium underline-offset-4 hover:underline"
                    >
                      bonjour@maillon.fr
                    </a>
                  </div>
                  <div>
                    <p className="eyebrow text-[color:var(--color-forest)] mb-2">
                      Communauté
                    </p>
                    <p className="text-base">
                      Discord MAILLON FR — réponses entraide quasi-instantanées
                    </p>
                  </div>
                  <div>
                    <p className="eyebrow text-[color:var(--color-forest)] mb-2">
                      Adresse postale
                    </p>
                    <p className="text-base text-[color:var(--color-charcoal)]/75">
                      MAILLON SAS<br />
                      Adresse à venir, Paris<br />
                      France
                    </p>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-7">
                <Suspense
                  fallback={
                    <div className="bg-[color:var(--color-sand)] border border-[color:var(--color-charcoal)]/10 rounded-lg p-8 min-h-[600px]" />
                  }
                >
                  <ContactForm />
                </Suspense>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
