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
        // Better-Auth pose le cookie via l'API runtime ; pour Next server actions,
        // il faut généralement passer headers/cookies de façon explicite.
        headers: new Headers(),
      });
    } catch {
      redirect(`/auth/sign-in?error=invalid&redirect=${encodeURIComponent(rt)}`);
    }
    redirect(rt);
  }

  return (
    <main id="main" className="min-h-screen flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <p className="eyebrow text-[var(--color-moss)]">MAILLON Fleet Manager</p>
          <h1 className="maillon-hero text-2xl mt-2">Connexion</h1>
        </div>

        {error ? (
          <div role="alert" className="mb-4 text-sm text-[var(--color-danger)] border border-[var(--color-danger)]/30 bg-[var(--color-danger)]/5 rounded p-3">
            {error === "invalid"
              ? "Identifiants invalides."
              : "Champs requis manquants."}
          </div>
        ) : null}

        <form action={signIn} className="space-y-4">
          <input type="hidden" name="redirect" value={redirectTo} />
          <label className="block">
            <span className="block text-xs uppercase tracking-wider text-[var(--color-charcoal)]/60 mb-1">
              E-mail
            </span>
            <input
              type="email"
              name="email"
              required
              autoComplete="email"
              className="w-full px-3 py-2 border border-[rgba(26,31,28,0.15)] rounded bg-white"
            />
          </label>
          <label className="block">
            <span className="block text-xs uppercase tracking-wider text-[var(--color-charcoal)]/60 mb-1">
              Mot de passe
            </span>
            <input
              type="password"
              name="password"
              required
              minLength={12}
              autoComplete="current-password"
              className="w-full px-3 py-2 border border-[rgba(26,31,28,0.15)] rounded bg-white"
            />
          </label>
          <button
            type="submit"
            className="btn-primary w-full bg-[var(--color-forest)] text-[var(--color-sand)] py-2.5 rounded font-medium"
          >
            Se connecter
          </button>
        </form>

        <p className="mt-6 text-sm text-center text-[var(--color-charcoal)]/60">
          Pas encore de compte&nbsp;?{" "}
          <Link href="/auth/sign-up" className="text-[var(--color-forest)] underline">
            Créer un compte
          </Link>
        </p>
      </div>
    </main>
  );
}
