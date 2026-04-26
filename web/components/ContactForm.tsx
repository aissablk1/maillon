"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

type FormState = "idle" | "submitting" | "success" | "error";

const SUBJECTS: Record<string, string> = {
  general: "Question générale",
  "kit-decouverte": "Pré-commande Kit Découverte",
  "kit-pro": "Devis Kit Pro",
  "kit-secours": "Devis Kit Secours",
  "saas-demo": "Démo guidée du SaaS",
  "saas-team": "Essai SaaS Team",
  "saas-business": "Devis SaaS Business",
  "saas-enterprise": "SaaS Enterprise / sur-mesure",
  partenariat: "Partenariat / distribution",
  presse: "Presse / communication",
};

export function ContactForm() {
  const searchParams = useSearchParams();
  const initialSubject = searchParams.get("sujet") ?? "general";
  const safeInitial = initialSubject in SUBJECTS ? initialSubject : "general";

  const [state, setState] = useState<FormState>("idle");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [organization, setOrganization] = useState("");
  const [subject, setSubject] = useState(safeInitial);
  const [message, setMessage] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setSubject(safeInitial);
  }, [safeInitial]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setState("submitting");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, organization, subject, message }),
      });

      if (!res.ok) {
        const data = (await res.json().catch(() => ({}))) as {
          error?: string;
        };
        throw new Error(data.error ?? "Erreur réseau");
      }
      setState("success");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur inconnue");
      setState("error");
    }
  }

  if (state === "success") {
    return (
      <div className="bg-[color:var(--color-forest)] text-[color:var(--color-sand)] rounded-lg p-10">
        <p className="eyebrow text-[color:var(--color-moss)] mb-4">
          Message reçu
        </p>
        <h2 className="text-3xl font-bold mb-4">
          Merci. On vous répond sous 48 heures ouvrées.
        </h2>
        <p className="text-[color:var(--color-sand)]/85">
          Si c&apos;est urgent, écrivez en parallèle à{" "}
          <a
            href="mailto:bonjour@maillon.fr"
            className="underline underline-offset-2"
          >
            bonjour@maillon.fr
          </a>{" "}
          en mentionnant « Urgent » dans l&apos;objet.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-[color:var(--color-sand)] border border-[color:var(--color-charcoal)]/10 rounded-lg p-8 space-y-5"
      noValidate
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-2">
            Nom complet
          </label>
          <input
            id="name"
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-white border border-[color:var(--color-charcoal)]/15 rounded-md px-4 py-3 text-base focus:outline-none focus:border-[color:var(--color-forest)]"
            autoComplete="name"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-2">
            Email
          </label>
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-white border border-[color:var(--color-charcoal)]/15 rounded-md px-4 py-3 text-base focus:outline-none focus:border-[color:var(--color-forest)]"
            autoComplete="email"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="organization"
          className="block text-sm font-medium mb-2"
        >
          Organisation <span className="text-[color:var(--color-charcoal)]/50">(optionnel)</span>
        </label>
        <input
          id="organization"
          type="text"
          value={organization}
          onChange={(e) => setOrganization(e.target.value)}
          placeholder="Asso, entreprise, fédération, commune…"
          className="w-full bg-white border border-[color:var(--color-charcoal)]/15 rounded-md px-4 py-3 text-base focus:outline-none focus:border-[color:var(--color-forest)]"
          autoComplete="organization"
        />
      </div>

      <div>
        <label htmlFor="subject" className="block text-sm font-medium mb-2">
          Objet
        </label>
        <select
          id="subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="w-full bg-white border border-[color:var(--color-charcoal)]/15 rounded-md px-4 py-3 text-base focus:outline-none focus:border-[color:var(--color-forest)]"
        >
          {Object.entries(SUBJECTS).map(([key, label]) => (
            <option key={key} value={key}>
              {label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium mb-2">
          Message
        </label>
        <textarea
          id="message"
          required
          minLength={10}
          rows={6}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Décrivez votre cas d'usage, vos contraintes, le calendrier…"
          className="w-full bg-white border border-[color:var(--color-charcoal)]/15 rounded-md px-4 py-3 text-base focus:outline-none focus:border-[color:var(--color-forest)] resize-y"
        />
      </div>

      <button
        type="submit"
        disabled={state === "submitting"}
        className="w-full inline-flex items-center justify-center bg-[color:var(--color-forest)] hover:bg-[color:var(--color-charcoal)] text-[color:var(--color-sand)] px-6 py-4 rounded-md text-base font-medium transition-colors disabled:opacity-50"
      >
        {state === "submitting" ? "Envoi…" : "Envoyer ›"}
      </button>

      {error && (
        <p className="text-sm text-[color:var(--color-danger)]">
          {error}. Vous pouvez aussi écrire directement à bonjour@maillon.fr.
        </p>
      )}

      <p className="text-xs text-[color:var(--color-charcoal)]/55 leading-relaxed">
        En envoyant ce message, vous nous autorisez à vous répondre par
        email. Aucune transmission à un tiers, hébergement UE, conservation
        12 mois max après dernière interaction. Voir notre{" "}
        <a
          href="/confidentialite"
          className="underline underline-offset-2 hover:text-[color:var(--color-forest)]"
        >
          politique de confidentialité
        </a>
        .
      </p>
    </form>
  );
}
