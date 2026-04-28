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
    <main
      id="main"
      className="min-h-screen flex items-center justify-center px-6 py-12 bg-[color:var(--color-substrate)]"
    >
      <div className="w-full max-w-sm">
        <div className="mb-8">
          <p className="font-mono text-[10px] tracking-[0.22em] uppercase text-[color:var(--color-hazard)] mb-3">
            <span lang="en">Fleet Manager</span>
          </p>
          <h1 className="font-mono text-[clamp(22px,3vw,28px)] text-[color:var(--color-phosphor)] font-bold leading-[1.2] mb-2">
            Créer un compte
          </h1>
          <p className="font-mono text-[12px] text-[color:var(--color-phosphor-dim)] leading-[1.5]">
            Compte personnel + organisation initiale.
          </p>
        </div>

        {error ? (
          <div
            role="alert"
            className="mb-6 font-mono text-[12px] text-[color:var(--color-hazard)] border border-[color:var(--color-hazard)] bg-[color:var(--color-substrate-2)] p-3"
          >
            <span aria-hidden="true">[ ERR ] </span>
            {error === "exists"
              ? "Un compte existe déjà avec cet email."
              : error === "weak"
                ? "Mot de passe trop faible (12 caractères minimum)."
                : error === "missing"
                  ? "Champs requis manquants."
                  : "Erreur serveur, réessayez plus tard."}
          </div>
        ) : null}

        <form
          action={signUp}
          className="space-y-5 border border-[color:var(--color-divider)] bg-[color:var(--color-substrate-2)] p-6"
        >
          <Field label="Nom complet" name="name" type="text" autoComplete="name" />
          <Field
            label="Email professionnel"
            name="email"
            type="email"
            required
            autoComplete="email"
          />
          <Field
            label="Mot de passe (12+ caractères)"
            name="password"
            type="password"
            required
            minLength={12}
            autoComplete="new-password"
          />
          <Field label="Nom de votre organisation" name="orgName" type="text" required />

          <button
            type="submit"
            className="btn-tactical btn-tactical-hazard w-full justify-between"
          >
            <span>Créer mon compte</span>
            <span aria-hidden="true">{" ›"}</span>
          </button>
        </form>

        <p className="mt-6 font-mono text-[12px] text-[color:var(--color-phosphor-dim)] text-center">
          Déjà un compte&nbsp;?{" "}
          <Link
            href="/auth/sign-in"
            className="text-[color:var(--color-phosphor)] maillon-link inline-block py-1"
          >
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
      <span className="block font-mono text-[10px] tracking-[0.18em] uppercase text-[color:var(--color-phosphor-dim)] mb-2">
        {label}
      </span>
      <input
        {...props}
        aria-required={props.required ? "true" : undefined}
        className="w-full bg-transparent border border-[color:var(--color-divider)] px-4 py-3 font-mono text-[13px] text-[color:var(--color-phosphor)] placeholder:text-[color:var(--color-phosphor-dim)]"
      />
    </label>
  );
}
