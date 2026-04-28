import Link from "next/link";
import { redirect } from "next/navigation";
import { auth, getCurrentSession } from "@lib/auth";

// Page de connexion. Server form action — pas d'état client, pas de mock.
// L'auth est appelée via Better-Auth ; en cas d'erreur, message côté query string.

type SearchParams = Promise<{ redirect?: string; error?: string }>;

export default async function SignInPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const session = await getCurrentSession();
  if (session?.user) redirect("/app");
  const sp = await searchParams;
  const redirectTo = sp.redirect ?? "/app";
  const error = sp.error;

  async function signIn(formData: FormData) {
    "use server";
    const email = String(formData.get("email") ?? "").trim().toLowerCase();
    const password = String(formData.get("password") ?? "");
    const rt = String(formData.get("redirect") ?? "/app");

    if (!email || !password) {
      redirect(`/auth/sign-in?error=missing&redirect=${encodeURIComponent(rt)}`);
    }

    try {
      await auth.api.signInEmail({
        body: { email, password },
        headers: new Headers(),
      });
    } catch {
      redirect(`/auth/sign-in?error=invalid&redirect=${encodeURIComponent(rt)}`);
    }
    redirect(rt);
  }

  return (
    <main
      id="main"
      className="min-h-screen flex items-center justify-center px-6 py-12 bg-[color:var(--color-substrate)]"
    >
      <div className="w-full max-w-sm">
        <div className="mb-8">
          <p className="font-mono text-[10px] tracking-[0.22em] uppercase text-[color:var(--color-hazard)] mb-3">
            <span lang="en">Fleet Manager</span>
          </p>
          <h1 className="font-mono text-[clamp(22px,3vw,28px)] text-[color:var(--color-phosphor)] font-bold leading-[1.2]">
            Connexion à votre console
          </h1>
        </div>

        {error ? (
          <div
            role="alert"
            className="mb-6 font-mono text-[12px] text-[color:var(--color-hazard)] border border-[color:var(--color-hazard)] bg-[color:var(--color-substrate-2)] p-3"
          >
            <span aria-hidden="true">[ ERR ] </span>
            {error === "invalid"
              ? "Identifiants invalides."
              : "Champs requis manquants."}
          </div>
        ) : null}

        <form
          action={signIn}
          className="space-y-5 border border-[color:var(--color-divider)] bg-[color:var(--color-substrate-2)] p-6"
        >
          <input type="hidden" name="redirect" value={redirectTo} />

          <label className="block">
            <span className="block font-mono text-[10px] tracking-[0.18em] uppercase text-[color:var(--color-phosphor-dim)] mb-2">
              Adresse email
            </span>
            <input
              type="email"
              name="email"
              required
              autoComplete="email"
              aria-required="true"
              className="w-full bg-transparent border border-[color:var(--color-divider)] px-4 py-3 font-mono text-[13px] text-[color:var(--color-phosphor)] placeholder:text-[color:var(--color-phosphor-dim)]"
            />
          </label>

          <label className="block">
            <span className="block font-mono text-[10px] tracking-[0.18em] uppercase text-[color:var(--color-phosphor-dim)] mb-2">
              Mot de passe
            </span>
            <input
              type="password"
              name="password"
              required
              minLength={12}
              autoComplete="current-password"
              aria-required="true"
              className="w-full bg-transparent border border-[color:var(--color-divider)] px-4 py-3 font-mono text-[13px] text-[color:var(--color-phosphor)]"
            />
          </label>

          <button
            type="submit"
            className="btn-tactical btn-tactical-hazard w-full justify-between"
          >
            <span>Se connecter</span>
            <span aria-hidden="true">{" ›"}</span>
          </button>
        </form>

        <p className="mt-6 font-mono text-[12px] text-[color:var(--color-phosphor-dim)] text-center">
          Pas encore de compte&nbsp;?{" "}
          <Link
            href="/auth/sign-up"
            className="text-[color:var(--color-phosphor)] maillon-link inline-block py-1"
          >
            Créer un compte
          </Link>
        </p>
      </div>
    </main>
  );
}
