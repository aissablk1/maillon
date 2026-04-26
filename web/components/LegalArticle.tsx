import type { ReactNode } from "react";

type LegalArticleProps = {
  title: string;
  updated: string;
  children: ReactNode;
};

export function LegalArticle({ title, updated, children }: LegalArticleProps) {
  return (
    <article className="py-20 lg:py-28">
      <div className="mx-auto max-w-3xl px-6 lg:px-10">
        <p className="eyebrow text-[color:var(--color-forest)] mb-6">
          Document légal
        </p>
        <h1 className="text-4xl lg:text-5xl font-bold tracking-tight mb-4">
          {title}
        </h1>
        <p className="text-sm text-[color:var(--color-charcoal)]/55 mb-12">
          Dernière mise à jour&nbsp;: {updated}
        </p>
        <div className="prose-legal text-[color:var(--color-charcoal)]/85 space-y-6 [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:mt-12 [&_h2]:mb-4 [&_h2]:text-[color:var(--color-charcoal)] [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:mt-8 [&_h3]:mb-3 [&_h3]:text-[color:var(--color-charcoal)] [&_p]:leading-relaxed [&_a]:text-[color:var(--color-forest)] [&_a]:underline [&_a]:underline-offset-4 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-2 [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:space-y-2 [&_strong]:text-[color:var(--color-charcoal)] [&_em]:italic [&_table]:w-full [&_table]:my-6 [&_th]:text-left [&_th]:py-2 [&_th]:border-b [&_th]:border-[color:var(--color-charcoal)]/15 [&_td]:py-2 [&_td]:border-b [&_td]:border-[color:var(--color-charcoal)]/8">
          {children}
        </div>
      </div>
    </article>
  );
}
