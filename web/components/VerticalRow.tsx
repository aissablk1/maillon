type VerticalRowProps = {
  index: string;
  title: string;
  tags: string[];
  description: string;
};

export function VerticalRow({ index, title, tags, description }: VerticalRowProps) {
  return (
    <div className="vertical-row grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 py-8 lg:py-10">
      <div className="lg:col-span-1">
        <span className="font-mono text-sm text-[color:var(--color-forest)] tabular-nums">
          {index}
        </span>
      </div>

      <div className="lg:col-span-4">
        <h3 className="text-2xl lg:text-3xl font-bold tracking-tight">
          {title}
        </h3>
      </div>

      <div className="lg:col-span-3">
        <ul className="flex flex-wrap gap-2">
          {tags.map((t) => (
            <li
              key={t}
              className="text-xs uppercase tracking-wider px-2.5 py-1 border border-[color:var(--color-charcoal)]/20 rounded-pill text-[color:var(--color-charcoal)]/70"
            >
              {t}
            </li>
          ))}
        </ul>
      </div>

      <div className="lg:col-span-4">
        <p className="text-base lg:text-lg text-[color:var(--color-charcoal)]/75 leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
}
