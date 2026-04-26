type VerticalRowProps = {
  index: string;
  title: string;
  tags: string[];
  description: string;
};

export function VerticalRow({ index, title, tags, description }: VerticalRowProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-6 gap-y-3 py-10 border-b border-[color:var(--color-phosphor-faint)]">
      {/* Index tactique */}
      <div className="lg:col-span-1">
        <span className="font-mono text-[10px] tracking-[0.22em] text-[color:var(--color-hazard)]">
          /{index}
        </span>
      </div>

      {/* Titre macro */}
      <div className="lg:col-span-4">
        <h3 className="macro text-[clamp(28px,3.5vw,48px)] text-[color:var(--color-phosphor)] leading-[0.9]">
          {title}
        </h3>
      </div>

      {/* Tags monospace, séparés par tube */}
      <div className="lg:col-span-3 flex flex-wrap items-start gap-x-3 gap-y-1">
        {tags.map((t, i) => (
          <span
            key={t}
            className="font-mono text-[10px] uppercase tracking-[0.15em] text-[color:var(--color-phosphor-dim)]"
          >
            {t}
            {i < tags.length - 1 && (
              <span className="ml-3 text-[color:var(--color-phosphor-faint)]">|</span>
            )}
          </span>
        ))}
      </div>

      {/* Description data-monospace */}
      <div className="lg:col-span-4">
        <p className="font-mono text-[13px] text-[color:var(--color-phosphor-dim)] leading-[1.6] max-w-[55ch]">
          {description}
        </p>
      </div>
    </div>
  );
}
