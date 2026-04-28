"use client";

import { useId, useRef, useState } from "react";

type FormState = "idle" | "submitting" | "success" | "error";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function PreorderForm() {
  const [state, setState] = useState<FormState>("idle");
  const [email, setEmail] = useState("");
  const [interest, setInterest] = useState<string>("decouverte");
  const [usage, setUsage] = useState<string>("outdoor");
  const [emailError, setEmailError] = useState<string | null>(null);
  const emailRef = useRef<HTMLInputElement>(null);

  const emailId = useId();
  const emailHintId = useId();
  const emailErrId = useId();
  const interestId = useId();
  const usageId = useId();
  const formStatusId = useId();

  function validate(): boolean {
    if (!EMAIL_RE.test(email.trim())) {
      setEmailError("Format attendu : prenom@domaine.fr");
      emailRef.current?.focus();
      return false;
    }
    setEmailError(null);
    return true;
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!validate()) return;

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
      <div
        role="status"
        aria-live="polite"
        className="border border-[color:var(--color-uplink)] bg-[color:var(--color-substrate-2)] p-8"
      >
        <p className="font-mono text-[10px] tracking-[0.22em] text-[color:var(--color-uplink)] uppercase mb-4">
          <span aria-hidden="true">[ </span>TX&nbsp;ACK&nbsp;/&nbsp;200&nbsp;OK<span aria-hidden="true"> ]</span>
        </p>
        <h3 className="macro text-[clamp(28px,3vw,40px)] text-[color:var(--color-phosphor)] mb-4 leading-[0.95]">
          Inscription confirmée.
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
      aria-labelledby={`${formStatusId}-heading`}
      className="border border-[color:var(--color-divider)] bg-[color:var(--color-substrate-2)] p-6 lg:p-8 space-y-5"
      noValidate
    >
      <div className="flex items-center justify-between border-b border-[color:var(--color-divider)] pb-3 mb-2">
        <h2
          id={`${formStatusId}-heading`}
          className="font-mono text-[10px] tracking-[0.22em] text-[color:var(--color-hazard)] uppercase font-bold"
        >
          <span aria-hidden="true">[ </span>FORM&nbsp;/&nbsp;PRÉCOMMANDE<span aria-hidden="true"> ]</span>
        </h2>
        <span className="font-mono text-[10px] tracking-[0.18em] text-[color:var(--color-phosphor-dim)] uppercase">
          REV&nbsp;0.1.0
        </span>
      </div>

      <div>
        <label
          htmlFor={emailId}
          className="block font-mono text-[10px] tracking-[0.2em] uppercase text-[color:var(--color-phosphor-dim)] mb-2"
        >
          <span aria-hidden="true">// </span>Adresse email
        </label>
        <input
          ref={emailRef}
          id={emailId}
          type="email"
          required
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (emailError) setEmailError(null);
          }}
          aria-invalid={emailError ? "true" : "false"}
          aria-describedby={emailError ? `${emailHintId} ${emailErrId}` : emailHintId}
          aria-required="true"
          placeholder="vous@exemple.fr"
          className="w-full bg-transparent border border-[color:var(--color-phosphor-faint)] px-4 py-3 font-mono text-[13px] text-[color:var(--color-phosphor)] placeholder:text-[color:var(--color-phosphor-dim)]"
          autoComplete="email"
        />
        <p id={emailHintId} className="mt-2 font-mono text-[10px] tracking-[0.05em] text-[color:var(--color-phosphor-dim)]">
          Format attendu&nbsp;: prenom@domaine.fr
        </p>
        {emailError && (
          <p
            id={emailErrId}
            role="alert"
            className="mt-2 font-mono text-[12px] text-[color:var(--color-hazard)] font-bold"
          >
            <span aria-hidden="true">[ ERR ] </span>{emailError}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor={interestId}
          className="block font-mono text-[10px] tracking-[0.2em] uppercase text-[color:var(--color-phosphor-dim)] mb-2"
        >
          <span aria-hidden="true">// </span>Kit ciblé
        </label>
        <select
          id={interestId}
          value={interest}
          onChange={(e) => setInterest(e.target.value)}
          className="w-full bg-[color:var(--color-substrate)] border border-[color:var(--color-phosphor-faint)] px-4 py-3 font-mono text-[13px] text-[color:var(--color-phosphor)]"
        >
          <option value="decouverte">UNIT&nbsp;01 — Découverte&nbsp;/&nbsp;99&nbsp;€</option>
          <option value="pro">UNIT&nbsp;02 — Pro&nbsp;/&nbsp;399&nbsp;€</option>
          <option value="secours">UNIT&nbsp;03 — Secours&nbsp;/&nbsp;1&nbsp;199&nbsp;€</option>
          <option value="sur-mesure">UNIT&nbsp;XX — Sur-mesure (devis flotte)</option>
        </select>
      </div>

      <div>
        <label
          htmlFor={usageId}
          className="block font-mono text-[10px] tracking-[0.2em] uppercase text-[color:var(--color-phosphor-dim)] mb-2"
        >
          <span aria-hidden="true">// </span>Théâtre d&apos;usage
        </label>
        <select
          id={usageId}
          value={usage}
          onChange={(e) => setUsage(e.target.value)}
          className="w-full bg-[color:var(--color-substrate)] border border-[color:var(--color-phosphor-faint)] px-4 py-3 font-mono text-[13px] text-[color:var(--color-phosphor)]"
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
        aria-busy={state === "submitting"}
        className="btn-tactical btn-tactical-hazard w-full justify-between disabled:border-[color:var(--color-phosphor-dim)] disabled:text-[color:var(--color-phosphor-dim)] disabled:cursor-wait"
      >
        <span>{state === "submitting" ? "TX EN COURS…" : "TRANSMETTRE"}</span>
        <span aria-hidden="true">{" ›"}</span>
      </button>

      {state === "submitting" && (
        <span role="status" className="sr-only">
          Envoi de la précommande en cours…
        </span>
      )}

      {state === "error" && (
        <p
          role="alert"
          aria-live="assertive"
          className="font-mono text-[12px] text-[color:var(--color-hazard)] font-bold"
        >
          <span aria-hidden="true">[ ERR&nbsp;/&nbsp;TX&nbsp;FAIL ] </span>
          Réessayer ou écrire à <a href="mailto:bonjour@maillon.fr" className="underline maillon-link">bonjour@maillon.fr</a>
        </p>
      )}

      <p className="font-mono text-[10px] tracking-[0.05em] text-[color:var(--color-phosphor-dim)] leading-[1.6] border-t border-[color:var(--color-divider)] pt-4">
        Email utilisé uniquement pour vous prévenir du lancement. Hébergement&nbsp;UE,
        désabonnement en un clic. Voir{" "}
        <a href="/confidentialite" className="maillon-link">politique de confidentialité</a>.
      </p>
    </form>
  );
}
