import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import { SiteHeader } from "@components/SiteHeader";
import { SiteFooter } from "@components/SiteFooter";
import { ContactForm } from "@components/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Demandez un devis, une démo, ou posez vos questions techniques. Contact via github.com/aissablk1.",
  alternates: { canonical: "https://github.com/aissablk1/maillon/contact" },
};

export default function ContactPage() {
  return (
    <>
      <SiteHeader />
      <main id="main">
        <section
          aria-labelledby="contact-hero"
          className="py-20 lg:py-28 border-b border-[color:var(--color-divider)]"
        >
          <div className="mx-auto max-w-6xl px-6 lg:px-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
              {/* Colonne gauche — texte d'accueil + canaux */}
              <div className="lg:col-span-5">
                <p className="font-mono text-[11px] tracking-[0.18em] uppercase text-[color:var(--color-hazard)] mb-8">
                  Contact
                </p>
                <h1
                  id="contact-hero"
                  className="font-mono text-[clamp(26px,3.5vw,44px)] text-[color:var(--color-phosphor)] leading-[1.2] font-bold mb-8"
                >
                  Une question. Une réponse, sous 48 heures ouvrées.
                </h1>
                <p className="font-mono text-[14px] text-[color:var(--color-phosphor-dim)] leading-[1.7] mb-12 max-w-md">
                  On répond personnellement, en français. Pas de chatbot, pas
                  de ticketing automatique pour la première interaction.
                </p>

                <dl className="space-y-8 font-mono text-[13px]">
                  <div className="border-t border-[color:var(--color-divider)] pt-5">
                    <dt className="text-[10px] tracking-[0.18em] uppercase text-[color:var(--color-phosphor-dim)] mb-2">
                      Profil GitHub
                    </dt>
                    <dd>
                      <Link
                        href="https://github.com/aissablk1"
                        className="text-[color:var(--color-phosphor)] maillon-link inline-block py-1"
                      >
                        github.com/aissablk1
                      </Link>
                    </dd>
                  </div>
                  <div className="border-t border-[color:var(--color-divider)] pt-5">
                    <dt className="text-[10px] tracking-[0.18em] uppercase text-[color:var(--color-phosphor-dim)] mb-2">
                      Communauté Meshtastic
                    </dt>
                    <dd className="text-[color:var(--color-phosphor)] leading-[1.6]">
                      Forum officiel{" "}
                      <Link
                        href="https://meshtastic.discourse.group/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="maillon-link inline-block py-1"
                      >
                        meshtastic.discourse.group
                      </Link>
                      {" "}— pour les questions techniques de fond.
                    </dd>
                  </div>
                  <div className="border-t border-[color:var(--color-divider)] pt-5">
                    <dt className="text-[10px] tracking-[0.18em] uppercase text-[color:var(--color-phosphor-dim)] mb-2">
                      Adresse postale
                    </dt>
                    <dd className="text-[color:var(--color-phosphor-dim)] leading-[1.6]">
                      MAILLON SAS<br />
                      Adresse à venir, Paris<br />
                      France
                    </dd>
                  </div>
                </dl>
              </div>

              {/* Colonne droite — formulaire CRT (refondu en commit a040afb/efe85f0) */}
              <div className="lg:col-span-7">
                <Suspense
                  fallback={
                    <div className="border border-[color:var(--color-divider)] bg-[color:var(--color-substrate-2)] p-6 lg:p-8 min-h-[600px]" />
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
