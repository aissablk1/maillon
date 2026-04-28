import Link from "next/link";
import { redirect } from "next/navigation";
import { auth, prisma, getCurrentSession } from "@lib/auth";

// Inscription : créé l'utilisateur, l'organisation initiale, et la membership OWNER.
// Aucune donnée mockée : la première organisation est dérivée du nom saisi.

type SearchParams = Promise<{ error?: string }>;

function slugify(s: string): string {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 60);
}

export default async function SignUpPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const session = await getCurrentSession();
  if (session?.user) redirect("/app");
  const sp = await searchParams;
  const error = sp.error;

  async function signUp(formData: FormData) {
    "use server";
    const email = String(formData.get("email") ?? "").trim().toLowerCase();
    const password = String(formData.get("password") ?? "");
    const name = String(formData.get("name") ?? "").trim();
    const orgName = String(formData.get("orgName") ?? "").trim();

    if (!email || !password || !orgName) {
      redirect("/auth/sign-up?error=missing");
    }
    if (password.length < 12) {
      redirect("/auth/sign-up?error=weak");
    }

    try {
      const result = await auth.api.signUpEmail({
        body: { email, password, name: name || email.split("@")[0] },
        headers: new Headers(),
      });
      const userId = (result as { user?: { id: string } }).user?.id;
      if (!userId) throw new Error("Création utilisateur échouée.");

      // Création atomique organisation + membership OWNER.
      let slug = slugify(orgName);
      const existing = await prisma.organization.findUnique({ where: { slug } });
      if (existing) slug = `${slug}-${Date.now().toString(36)}`;

      await prisma.$transaction([
        prisma.organization.create({
          data: {
            name: orgName,
            slug,
            memberships: {
              create: { userId, role: "OWNER" },
            },
          },
        }),
      ]);
    } catch (e) {
      const msg = e instanceof Error ? e.message : "unknown";
      if (msg.toLowerCase().includes("exist")) {
        redirect("/auth/sign-up?error=exists");
      }
      redirect("/auth/sign-up?error=server");
    }
    redirect("/app");
  }

  return (
    <main id="main" className="min-h-screen flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <p className="eyebrow text-[var(--color-moss)]">MAILLON Fleet Manager</p>
          <h1 className="maillon-hero text-2xl mt-2">Créer un compte</h1>
          <p className="text-sm text-[var(--color-charcoal)]/60 mt-1">
            Compte personnel + organisation initiale.
          </p>
        </div>

        {error ? (
          <div role="alert" className="mb-4 text-sm text-[var(--color-danger)] border border-[var(--color-danger)]/30 bg-[var(--color-danger)]/5 rounded p-3">
            {error === "exists"
              ? "Un compte existe déjà avec cet e-mail."
              : error === "weak"
                ? "Mot de passe trop faible (12 caractères minimum)."
                : error === "missing"
                  ? "Champs requis manquants."
                  : "Erreur serveur, réessayez plus tard."}
          </div>
        ) : null}

        <form action={signUp} className="space-y-4">
          <Field label="Nom complet" name="name" type="text" autoComplete="name" />
          <Field label="E-mail professionnel" name="email" type="email" required autoComplete="email" />
          <Field label="Mot de passe (12+ caractères)" name="password" type="password" required minLength={12} autoComplete="new-password" />
          <Field label="Nom de votre organisation" name="orgName" type="text" required />
          <button
            type="submit"
            className="btn-primary w-full bg-[var(--color-forest)] text-[var(--color-sand)] py-2.5 rounded font-medium"
          >
            Créer mon compte
          </button>
        </form>

        <p className="mt-6 text-sm text-center text-[var(--color-charcoal)]/60">
          Déjà un compte&nbsp;?{" "}
          <Link href="/auth/sign-in" className="text-[var(--color-forest)] underline">
            Se connecter
          </Link>
        </p>
      </div>
    </main>
  );
}

function Field({
  label,
  ...props
}: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="block">
      <span className="block text-xs uppercase tracking-wider text-[var(--color-charcoal)]/60 mb-1">
        {label}
      </span>
      <input
        {...props}
        className="w-full px-3 py-2 border border-[rgba(26,31,28,0.15)] rounded bg-white"
      />
    </label>
  );
}
