"use client";

import { useEffect, useId, useRef, useState } from "react";
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

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

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
  const [fieldErrors, setFieldErrors] = useState<{ name?: string; email?: string; message?: string }>({});

  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);

  const formId = useId();
  const nameId = useId();
  const emailId = useId();
  const orgId = useId();
  const subjectId = useId();
  const messageId = useId();

  useEffect(() => {
    setSubject(safeInitial);
  }, [safeInitial]);

  function validate(): boolean {
    const errs: typeof fieldErrors = {};
    if (name.trim().length < 2) errs.name = "Nom requis (2 caractères minimum)";
    if (!EMAIL_RE.test(email.trim())) errs.email = "Format attendu : prenom@domaine.fr";
    if (message.trim().length < 10) errs.message = "Message trop court (10 caractères minimum)";

    setFieldErrors(errs);

    if (errs.name) nameRef.current?.focus();
    else if (errs.email) emailRef.current?.focus();
    else if (errs.message) messageRef.current?.focus();

    return Object.keys(errs).length === 0;
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    if (!validate()) return;

    setState("submitting");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, organization, subject, message }),
      });

      if (!res.ok) {
        const data = (await res.json().catch(() => ({}))) as { error?: string };
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
      <div
        role="status"
        aria-live="polite"
        className="border border-[color:var(--color-uplink)] bg-[color:var(--color-substrate-2)] p-8 lg:p-10"
      >
        <p className="font-mono text-[10px] tracking-[0.22em] text-[color:var(--color-uplink)] uppercase mb-4 font-bold">
          <span aria-hidden="true">[ </span>MSG&nbsp;ACK&nbsp;/&nbsp;200&nbsp;OK<span aria-hidden="true"> ]</span>
        </p>
        <h2 className="macro text-[clamp(28px,3vw,40px)] text-[color:var(--color-phosphor)] mb-4 leading-[0.95]">
          Message reçu.
        </h2>
        <p className="font-mono text-[13px] text-[color:var(--color-phosphor-dim)] leading-[1.6]">
          Réponse sous 48&nbsp;heures ouvrées. Si c&apos;est urgent, écrivez en
          parallèle à{" "}
          <a href="mailto:aissa.belkoussa5@gmail.com?subject=Urgent" className="maillon-link">
            aissa.belkoussa5@gmail.com
          </a>{" "}
          en mentionnant «&nbsp;Urgent&nbsp;» dans l&apos;objet.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      aria-labelledby={`${formId}-heading`}
      className="border border-[color:var(--color-divider)] bg-[color:var(--color-substrate-2)] p-6 lg:p-8 space-y-5"
      noValidate
    >
      <div className="flex items-center justify-between border-b border-[color:var(--color-divider)] pb-3 mb-2">
        <h2
          id={`${formId}-heading`}
          className="font-mono text-[10px] tracking-[0.22em] text-[color:var(--color-hazard)] uppercase font-bold"
        >
          <span aria-hidden="true">[ </span>FORM&nbsp;/&nbsp;CONTACT<span aria-hidden="true"> ]</span>
        </h2>
        <span className="font-mono text-[10px] tracking-[0.18em] text-[color:var(--color-phosphor-dim)] uppercase">
          REV&nbsp;0.1.0
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label
            htmlFor={nameId}
            className="block font-mono text-[10px] tracking-[0.2em] uppercase text-[color:var(--color-phosphor-dim)] mb-2"
          >
            <span aria-hidden="true">// </span>Nom complet
          </label>
          <input
            ref={nameRef}
            id={nameId}
            type="text"
            required
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              if (fieldErrors.name) setFieldErrors({ ...fieldErrors, name: undefined });
            }}
            aria-invalid={fieldErrors.name ? "true" : "false"}
            aria-describedby={fieldErrors.name ? `${nameId}-err` : undefined}
            aria-required="true"
            className="w-full bg-transparent border border-[color:var(--color-phosphor-faint)] px-4 py-3 font-mono text-[13px] text-[color:var(--color-phosphor)] placeholder:text-[color:var(--color-phosphor-dim)]"
            autoComplete="name"
          />
          {fieldErrors.name && (
            <p id={`${nameId}-err`} role="alert" className="mt-2 font-mono text-[12px] text-[color:var(--color-hazard)] font-bold">
              <span aria-hidden="true">[ ERR ] </span>{fieldErrors.name}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor={emailId}
            className="block font-mono text-[10px] tracking-[0.2em] uppercase text-[color:var(--color-phosphor-dim)] mb-2"
          >
            <span aria-hidden="true">// </span>Email
          </label>
          <input
            ref={emailRef}
            id={emailId}
            type="email"
            required
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (fieldErrors.email) setFieldErrors({ ...fieldErrors, email: undefined });
            }}
            aria-invalid={fieldErrors.email ? "true" : "false"}
            aria-describedby={fieldErrors.email ? `${emailId}-err` : undefined}
            aria-required="true"
            className="w-full bg-transparent border border-[color:var(--color-phosphor-faint)] px-4 py-3 font-mono text-[13px] text-[color:var(--color-phosphor)] placeholder:text-[color:var(--color-phosphor-dim)]"
            autoComplete="email"
          />
          {fieldErrors.email && (
            <p id={`${emailId}-err`} role="alert" className="mt-2 font-mono text-[12px] text-[color:var(--color-hazard)] font-bold">
              <span aria-hidden="true">[ ERR ] </span>{fieldErrors.email}
            </p>
          )}
        </div>
      </div>

      <div>
        <label
          htmlFor={orgId}
          className="block font-mono text-[10px] tracking-[0.2em] uppercase text-[color:var(--color-phosphor-dim)] mb-2"
        >
          <span aria-hidden="true">// </span>Organisation <span className="text-[color:var(--color-phosphor-dim)] normal-case tracking-normal">(optionnel)</span>
        </label>
        <input
          id={orgId}
          type="text"
          value={organization}
          onChange={(e) => setOrganization(e.target.value)}
          placeholder="Asso, entreprise, fédération, commune…"
          className="w-full bg-transparent border border-[color:var(--color-phosphor-faint)] px-4 py-3 font-mono text-[13px] text-[color:var(--color-phosphor)] placeholder:text-[color:var(--color-phosphor-dim)]"
          autoComplete="organization"
        />
      </div>

      <div>
        <label
          htmlFor={subjectId}
          className="block font-mono text-[10px] tracking-[0.2em] uppercase text-[color:var(--color-phosphor-dim)] mb-2"
        >
          <span aria-hidden="true">// </span>Objet
        </label>
        <select
          id={subjectId}
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="w-full bg-[color:var(--color-substrate)] border border-[color:var(--color-phosphor-faint)] px-4 py-3 font-mono text-[13px] text-[color:var(--color-phosphor)]"
        >
          {Object.entries(SUBJECTS).map(([key, label]) => (
            <option key={key} value={key}>
              {label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label
          htmlFor={messageId}
          className="block font-mono text-[10px] tracking-[0.2em] uppercase text-[color:var(--color-phosphor-dim)] mb-2"
        >
          <span aria-hidden="true">// </span>Message
        </label>
        <textarea
          ref={messageRef}
          id={messageId}
          required
          minLength={10}
          rows={6}
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
            if (fieldErrors.message) setFieldErrors({ ...fieldErrors, message: undefined });
          }}
          aria-invalid={fieldErrors.message ? "true" : "false"}
          aria-describedby={fieldErrors.message ? `${messageId}-err` : undefined}
          aria-required="true"
          placeholder="Décrivez votre cas d'usage, vos contraintes, le calendrier…"
          className="w-full bg-transparent border border-[color:var(--color-phosphor-faint)] px-4 py-3 font-mono text-[13px] text-[color:var(--color-phosphor)] placeholder:text-[color:var(--color-phosphor-dim)] resize-y"
        />
        {fieldErrors.message && (
          <p id={`${messageId}-err`} role="alert" className="mt-2 font-mono text-[12px] text-[color:var(--color-hazard)] font-bold">
            <span aria-hidden="true">[ ERR ] </span>{fieldErrors.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={state === "submitting"}
        aria-busy={state === "submitting"}
        className="btn-tactical btn-tactical-hazard w-full justify-between disabled:border-[color:var(--color-phosphor-dim)] disabled:text-[color:var(--color-phosphor-dim)] disabled:cursor-wait"
      >
        <span>{state === "submitting" ? "TX EN COURS…" : "ENVOYER"}</span>
        <span aria-hidden="true">{" ›"}</span>
      </button>

      {state === "submitting" && (
        <span role="status" className="sr-only">
          Envoi du message en cours…
        </span>
      )}

      {error && (
        <p
          role="alert"
          aria-live="assertive"
          className="font-mono text-[12px] text-[color:var(--color-hazard)] font-bold"
        >
          <span aria-hidden="true">[ ERR ] </span>
          {error}. Vous pouvez aussi écrire directement à{" "}
          <a href="mailto:aissa.belkoussa5@gmail.com" className="underline maillon-link">
            aissa.belkoussa5@gmail.com
          </a>.
        </p>
      )}

      <p className="font-mono text-[10px] tracking-[0.05em] text-[color:var(--color-phosphor-dim)] leading-[1.6] border-t border-[color:var(--color-divider)] pt-4">
        En envoyant ce message, vous nous autorisez à vous répondre par email.
        Aucune transmission à un tiers, hébergement&nbsp;UE, conservation
        12&nbsp;mois max après dernière interaction. Voir notre{" "}
        <a href="/confidentialite" className="maillon-link">
          politique de confidentialité
        </a>.
      </p>
    </form>
  );
}
