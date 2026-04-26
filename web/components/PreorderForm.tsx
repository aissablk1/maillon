"use client";

import { useState } from "react";

type FormState = "idle" | "submitting" | "success" | "error";

export function PreorderForm() {
  const [state, setState] = useState<FormState>("idle");
  const [email, setEmail] = useState("");
  const [interest, setInterest] = useState<string>("decouverte");
  const [usage, setUsage] = useState<string>("outdoor");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("submitting");

    try {
      const res = await fetch("/api/preorder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, interest, usage }),
      });

      if (!res.ok) throw new Error("Failed");
      setState("success");
    } catch {
      setState("error");
    }
  }

  if (state === "success") {
    return (
      <div className="bg-[color:var(--color-sand)]/10 border border-[color:var(--color-sand)]/20 rounded-lg p-8">
        <p className="eyebrow text-[color:var(--color-moss)] mb-4">
          Merci&nbsp;!
        </p>
        <h3 className="text-2xl font-bold mb-3">
          Vous êtes inscrit·e à la pré-commande.
        </h3>
        <p className="text-[color:var(--color-sand)]/85">
          Un email de confirmation arrive dans votre boîte. Le prochain
          message MAILLON vous parvient le jour du lancement officiel,
          en juin 2026.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-[color:var(--color-sand)]/10 border border-[color:var(--color-sand)]/20 rounded-lg p-8 space-y-6"
      noValidate
    >
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium mb-2"
        >
          Adresse email
        </label>
        <input
          id="email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="vous@exemple.fr"
          className="w-full bg-transparent border border-[color:var(--color-sand)]/25 rounded-md px-4 py-3 text-[color:var(--color-sand)] placeholder:text-[color:var(--color-sand)]/40 focus:outline-none focus:border-[color:var(--color-moss)]"
        />
      </div>

      <div>
        <label
          htmlFor="interest"
          className="block text-sm font-medium mb-2"
        >
          Kit d&apos;intérêt principal
        </label>
        <select
          id="interest"
          value={interest}
          onChange={(e) => setInterest(e.target.value)}
          className="w-full bg-[color:var(--color-forest)] border border-[color:var(--color-sand)]/25 rounded-md px-4 py-3 text-[color:var(--color-sand)] focus:outline-none focus:border-[color:var(--color-moss)]"
        >
          <option value="decouverte">Kit Découverte — 99 €</option>
          <option value="pro">Kit Pro — 399 €</option>
          <option value="secours">Kit Secours — 1 199 €</option>
          <option value="sur-mesure">Sur-mesure (devis flotte)</option>
        </select>
      </div>

      <div>
        <label
          htmlFor="usage"
          className="block text-sm font-medium mb-2"
        >
          Usage prévu
        </label>
        <select
          id="usage"
          value={usage}
          onChange={(e) => setUsage(e.target.value)}
          className="w-full bg-[color:var(--color-forest)] border border-[color:var(--color-sand)]/25 rounded-md px-4 py-3 text-[color:var(--color-sand)] focus:outline-none focus:border-[color:var(--color-moss)]"
        >
          <option value="outdoor">Outdoor / randonnée / alpinisme</option>
          <option value="secours">Secours bénévole / asso</option>
          <option value="btp">BTP / chantier / exploitation</option>
          <option value="evenement">Événementiel / festival</option>
          <option value="agri">Agriculture / élevage</option>
          <option value="maritime">Maritime / plaisance</option>
          <option value="autre">Autre</option>
        </select>
      </div>

      <button
        type="submit"
        disabled={state === "submitting"}
        className="w-full inline-flex items-center justify-center bg-[color:var(--color-signal)] hover:bg-[color:var(--color-sand)] hover:text-[color:var(--color-forest)] text-[color:var(--color-charcoal)] px-6 py-4 rounded-md text-base font-semibold transition-colors disabled:opacity-50"
      >
        {state === "submitting" ? "Envoi…" : "Réserver ma pré-commande ›"}
      </button>

      {state === "error" && (
        <p className="text-sm text-[color:var(--color-signal)]">
          Un souci est survenu, réessayez dans un instant ou écrivez à
          bonjour@maillon.fr.
        </p>
      )}

      <p className="text-xs text-[color:var(--color-sand)]/60 leading-relaxed">
        Nous utilisons votre email uniquement pour vous prévenir du
        lancement et vous proposer la pré-commande. Aucune transmission à
        un tiers, hébergement UE, désabonnement en un clic. Voir notre{" "}
        <a
          href="/confidentialite"
          className="underline underline-offset-2 hover:text-[color:var(--color-sand)]"
        >
          politique de confidentialité
        </a>
        .
      </p>
    </form>
  );
}
