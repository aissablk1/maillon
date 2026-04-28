import Link from "next/link";

type KitKind = "decouverte" | "pro" | "secours";

type KitCardProps = {
  kind: KitKind;
  index: string;          // "01", "02", "03" — typographie tactique
  eyebrow: string;
  price: string;
  priceNote: string;
  title: string;
  description: string;
  features: string[];
  cta: string;
  href: string;
  /** Détermine la taille bento (1 ou 2 colonnes) */
  span?: 1 | 2;
};

export function KitCard({
  kind,
  index,
  eyebrow,
  price,
  priceNote,
  title,
  description,
  features,
  cta,
  href,
  span = 1,
}: KitCardProps) {
  const isHazard = kind === "secours";

  const titleId = `kit-${kind}-title`;

  return (
    <article
      aria-labelledby={titleId}
      className={`group relative border border-[color:var(--color-divider)] hover:border-[color:var(--color-phosphor)] transition-colors duration-150 bg-[color:var(--color-substrate-2)] ${
        span === 2 ? "md:col-span-2" : ""
      }`}
      data-kit={kind}
    >
      {/* Bandeau supérieur : index + tag */}
      <header className="flex items-center justify-between px-5 py-3 border-b border-[color:var(--color-divider)]">
        <span
          className="font-mono text-[10px] tracking-[0.2em] uppercase text-[color:var(--color-phosphor-dim)]"
        >
          UNIT&nbsp;/&nbsp;{index}
        </span>
        <span
          className={`font-mono text-[10px] tracking-[0.2em] uppercase ${
            isHazard ? "text-[color:var(--color-hazard)]" : "text-[color:var(--color-phosphor-dim)]"
          }`}
        >
          {eyebrow}
        </span>
      </header>

      {/* Bloc principal — macro typo + meta */}
      <div className="px-5 py-8">
        {/* Numéro de prix en macro typographie */}
        <div className="flex items-baseline gap-3 mb-1">
          <span className="macro text-[clamp(48px,7vw,80px)] text-[color:var(--color-phosphor)]">
            {price}
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[color:var(--color-phosphor-dim)]">
            {priceNote}
          </span>
        </div>

        <span aria-hidden="true" className="block divider-solid mb-6 mt-2" />

        <h3 id={titleId} className="macro text-[clamp(20px,2.4vw,32px)] text-[color:var(--color-phosphor)] mb-4 leading-[0.95]">
          {title}
        </h3>

        <p className="font-mono text-[13px] text-[color:var(--color-phosphor-dim)] leading-[1.55] mb-8 max-w-[55ch]">
          {description}
        </p>

        {/* Liste features — table tactique */}
        <ul className="font-mono text-[12px] text-[color:var(--color-phosphor)] space-y-1.5 mb-10">
          {features.map((f, i) => (
            <li key={f} className="grid grid-cols-[auto_1fr] gap-3 items-baseline">
              <span className="text-[color:var(--color-hazard)] tabular-nums" aria-hidden="true">
                /{String(i + 1).padStart(2, "0")}
              </span>
              <span className="text-[color:var(--color-phosphor-dim)]">{f}</span>
            </li>
          ))}
        </ul>

        <Link
          href={href}
          className={`btn-tactical w-full justify-between ${
            isHazard ? "btn-tactical-hazard" : ""
          }`}
        >
          <span>{cta}</span>
          <span aria-hidden="true">{" ›"}</span>
        </Link>
      </div>
    </article>
  );
}
