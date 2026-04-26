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
      <div className="border border-[color:var(--color-uplink)] bg-[color:var(--color-substrate-2)] p-8">
        <p className="font-mono text-[10px] tracking-[0.22em] text-[color:var(--color-uplink)] uppercase mb-4">
          [ TX&nbsp;ACK&nbsp;/&nbsp;200&nbsp;OK ]
        </p>
        <h3 className="macro text-[clamp(28px,3vw,40px)] text-[color:var(--color-phosphor)] mb-4 leading-[0.95]">
          INSCRIPTION CONFIRMÉE.
        </h3>
        <p className="font-mono text-[13px] text-[color:var(--color-phosphor-dim)] leading-[1.6]">
          Un message de confirmation est en transit vers votre boîte. Le
          prochain transmit MAILLON vous parvient à la livraison du
          premier batch — juin&nbsp;2026.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="border border-[color:var(--color-phosphor-faint)] bg-[color:var(--color-substrate-2)] p-6 lg:p-8 space-y-5"
      noValidate
    >
      <div className="flex items-center justify-between border-b border-[color:var(--color-phosphor-faint)] pb-3 mb-2">
        <span className="font-mono text-[10px] tracking-[0.22em] text-[color:var(--color-hazard)] uppercase">
          [ FORM&nbsp;/&nbsp;PRÉCOMMANDE ]
        </span>
        <span className="font-mono text-[10px] tracking-[0.18em] text-[color:var(--color-phosphor-faint)] uppercase">
          REV&nbsp;0.1.0
        </span>
      </div>

      <div>
        <label
          htmlFor="email"
          className="block font-mono text-[10px] tracking-[0.2em] uppercase text-[color:var(--color-phosphor-dim)] mb-2"
        >
          // Adresse email
        </label>
        <input
          id="email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="vous@exemple.fr"
          className="w-full bg-transparent border border-[color:var(--color-phosphor-faint)] px-4 py-3 font-mono text-[13px] text-[color:var(--color-phosphor)] placeholder:text-[color:var(--color-phosphor-faint)] focus:outline-none focus:border-[color:var(--color-hazard)]"
          autoComplete="email"
        />
      </div>

      <div>
        <label
          htmlFor="interest"
          className="block font-mono text-[10px] tracking-[0.2em] uppercase text-[color:var(--color-phosphor-dim)] mb-2"
        >
          // Kit ciblé
        </label>
        <select
          id="interest"
          value={interest}
          onChange={(e) => setInterest(e.target.value)}
          className="w-full bg-[color:var(--color-substrate)] border border-[color:var(--color-phosphor-faint)] px-4 py-3 font-mono text-[13px] text-[color:var(--color-phosphor)] focus:outline-none focus:border-[color:var(--color-hazard)]"
        >
          <option value="decouverte">UNIT&nbsp;01 — Découverte&nbsp;/&nbsp;99&nbsp;€</option>
          <option value="pro">UNIT&nbsp;02 — Pro&nbsp;/&nbsp;399&nbsp;€</option>
          <option value="secours">UNIT&nbsp;03 — Secours&nbsp;/&nbsp;1&nbsp;199&nbsp;€</option>
          <option value="sur-mesure">UNIT&nbsp;XX — Sur-mesure (devis flotte)</option>
        </select>
      </div>

      <div>
        <label
          htmlFor="usage"
          className="block font-mono text-[10px] tracking-[0.2em] uppercase text-[color:var(--color-phosphor-dim)] mb-2"
        >
          // Théâtre d&apos;usage
        </label>
        <select
          id="usage"
          value={usage}
          onChange={(e) => setUsage(e.target.value)}
          className="w-full bg-[color:var(--color-substrate)] border border-[color:var(--color-phosphor-faint)] px-4 py-3 font-mono text-[13px] text-[color:var(--color-phosphor)] focus:outline-none focus:border-[color:var(--color-hazard)]"
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
        className="btn-tactical btn-tactical-hazard w-full justify-between disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <span>{state === "submitting" ? "TX EN COURS…" : "TRANSMETTRE"}</span>
        <span aria-hidden>{">>"}</span>
      </button>

      {state === "error" && (
        <p className="font-mono text-[12px] text-[color:var(--color-hazard)]">
          [ ERR&nbsp;/&nbsp;TX&nbsp;FAIL ] · réessayer ou écrire à bonjour@maillon.fr
        </p>
      )}

      <p className="font-mono text-[10px] tracking-[0.05em] text-[color:var(--color-phosphor-faint)] leading-[1.6] border-t border-[color:var(--color-phosphor-faint)] pt-4">
        Email utilisé uniquement pour vous prévenir du lancement. Hébergement&nbsp;UE,
        désabonnement en un clic. Voir{" "}
        <a href="/confidentialite" className="maillon-link">politique de confidentialité</a>.
      </p>
    </form>
  );
}
