import type { ReactNode } from "react";

type LegalArticleProps = {
  title: string;
  updated: string;
  children: ReactNode;
};

/**
 * Wrapper sémantique pour pages légales (CGV, confidentialité, cookies,
 * mentions). Direction CRT brutalist : substrate / phosphor / hazard,
 * mono partout, pas de macro typo (lecture longue, pas hero).
 */
export function LegalArticle({ title, updated, children }: LegalArticleProps) {
  return (
    <article className="py-20 lg:py-28">
      <div className="mx-auto max-w-3xl px-6 lg:px-10">
        <p className="font-mono text-[11px] tracking-[0.18em] uppercase text-[color:var(--color-hazard)] mb-6">
          Document légal
        </p>
        <h1 className="font-mono text-[clamp(28px,3.5vw,42px)] text-[color:var(--color-phosphor)] leading-[1.2] font-bold mb-4">
          {title}
        </h1>
        <p className="font-mono text-[12px] text-[color:var(--color-phosphor-dim)] mb-12">
          Dernière mise à jour&nbsp;:{" "}
          <time dateTime={updated}>{updated}</time>
        </p>
        <div
          className={[
            // Layout & couleurs CRT
            "font-mono text-[14px] text-[color:var(--color-phosphor-dim)] leading-[1.7] space-y-5",
            // h2
            "[&_h2]:font-mono [&_h2]:text-[clamp(18px,2vw,22px)] [&_h2]:font-bold [&_h2]:text-[color:var(--color-phosphor)] [&_h2]:mt-12 [&_h2]:mb-4 [&_h2]:leading-[1.3]",
            // h3
            "[&_h3]:font-mono [&_h3]:text-[16px] [&_h3]:font-bold [&_h3]:text-[color:var(--color-phosphor)] [&_h3]:mt-8 [&_h3]:mb-3",
            // strong / em
            "[&_strong]:text-[color:var(--color-phosphor)] [&_strong]:font-bold",
            "[&_em]:italic",
            // links
            "[&_a]:text-[color:var(--color-phosphor)] [&_a]:underline [&_a]:underline-offset-4 [&_a]:decoration-[color:var(--color-divider)] hover:[&_a]:decoration-[color:var(--color-hazard)]",
            // listes
            "[&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-2 [&_ul]:marker:text-[color:var(--color-hazard)]",
            "[&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:space-y-2 [&_ol]:marker:text-[color:var(--color-hazard)]",
            // tables
            "[&_table]:w-full [&_table]:my-6 [&_table]:border [&_table]:border-[color:var(--color-divider)] [&_table]:font-mono [&_table]:text-[13px]",
            "[&_th]:text-left [&_th]:py-2 [&_th]:px-3 [&_th]:border-b [&_th]:border-[color:var(--color-divider)] [&_th]:text-[color:var(--color-phosphor-dim)] [&_th]:text-[10px] [&_th]:tracking-[0.18em] [&_th]:uppercase [&_th]:font-bold",
            "[&_td]:py-2 [&_td]:px-3 [&_td]:border-b [&_td]:border-[color:var(--color-divider)] [&_td]:text-[color:var(--color-phosphor)]",
            "[&_tr:last-child_td]:border-b-0",
            // code inline
            "[&_code]:bg-[color:var(--color-substrate-2)] [&_code]:border [&_code]:border-[color:var(--color-divider)] [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:text-[12px] [&_code]:text-[color:var(--color-phosphor)]",
            // hr
            "[&_hr]:my-8 [&_hr]:border-0 [&_hr]:border-t [&_hr]:border-[color:var(--color-divider)]",
            // blockquotes
            "[&_blockquote]:border-l-2 [&_blockquote]:border-[color:var(--color-hazard)] [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-[color:var(--color-phosphor)]",
          ].join(" ")}
        >
          {children}
        </div>
      </div>
    </article>
  );
}
