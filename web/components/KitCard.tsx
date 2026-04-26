import Link from "next/link";

type KitKind = "decouverte" | "pro" | "secours";

type KitCardProps = {
  kind: KitKind;
  eyebrow: string;
  price: string;
  priceNote: string;
  title: string;
  description: string;
  features: string[];
  cta: string;
  href: string;
  highlight?: boolean;
};

export function KitCard({
  kind,
  eyebrow,
  price,
  priceNote,
  title,
  description,
  features,
  cta,
  href,
  highlight,
}: KitCardProps) {
  return (
    <article
      className={`kit-card rounded-lg p-8 flex flex-col ${
        highlight ? "shadow-2xl shadow-[color:var(--color-charcoal)]/10 -translate-y-2" : ""
      }`}
      data-kit={kind}
    >
      <p className="eyebrow text-[color:var(--color-charcoal)]/70 mb-6">
        {eyebrow}
      </p>

      <div className="mb-8">
        <p className="text-5xl font-bold tracking-tight tabular-nums">
          {price}
        </p>
        <p className="text-sm text-[color:var(--color-charcoal)]/55 mt-1">
          {priceNote}
        </p>
      </div>

      <h3 className="text-2xl font-bold leading-snug mb-4 text-[color:var(--color-charcoal)]">
        {title}
      </h3>
      <p className="text-base text-[color:var(--color-charcoal)]/70 mb-8">
        {description}
      </p>

      <ul className="space-y-3 mb-10 flex-1">
        {features.map((f) => (
          <li
            key={f}
            className="flex items-start gap-3 text-sm text-[color:var(--color-charcoal)]/85"
          >
            <span
              className="mt-2 block w-1.5 h-1.5 rounded-full bg-[color:var(--color-forest)] flex-shrink-0"
              aria-hidden
            />
            <span>{f}</span>
          </li>
        ))}
      </ul>

      <Link
        href={href}
        className="inline-flex items-center justify-center bg-[color:var(--color-forest)] hover:bg-[color:var(--color-charcoal)] text-[color:var(--color-sand)] px-6 py-3 rounded-md text-sm font-medium transition-colors"
      >
        {cta}&nbsp;›
      </Link>
    </article>
  );
}
