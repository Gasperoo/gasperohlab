import { Reveal } from "./Reveal";

/** A paragraph (string) or a bullet list (array of strings). */
type Block = string | string[];

export type LegalSection = {
  heading: string;
  body: Block[];
};

type LegalPageProps = {
  eyebrow?: string;
  title: string;
  updated: string;
  intro: string[];
  sections: LegalSection[];
};

/**
 * Shared layout for the plain-language legal pages (privacy, terms, cookies).
 * Same visual language as the rest of the site — mono eyebrow, display title,
 * muted prose — kept deliberately readable rather than dense legalese.
 */
export function LegalPage({
  eyebrow = "Legal",
  title,
  updated,
  intro,
  sections,
}: LegalPageProps) {
  return (
    <article className="relative mx-auto max-w-3xl px-5 pt-36 pb-20 sm:px-6 sm:pt-44 sm:pb-28">
      {/* Header */}
      <Reveal>
        <p className="eyebrow mb-4">{eyebrow}</p>
        <h1 className="font-display text-balance text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl">
          {title}
        </h1>
        <p className="mt-5 font-mono text-xs uppercase tracking-[0.18em] text-faint">
          Last updated · {updated}
        </p>
        <div className="mt-8 flex flex-col gap-4">
          {intro.map((p, i) => (
            <p
              key={i}
              className="text-pretty text-lg leading-relaxed text-muted"
            >
              {p}
            </p>
          ))}
        </div>
      </Reveal>

      <hr className="my-12 border-border" />

      {/* Sections */}
      <div className="flex flex-col gap-12">
        {sections.map((section, i) => (
          <Reveal key={section.heading} delay={Math.min(i, 4) * 0.04}>
            <section>
              <h2 className="font-display text-2xl font-bold tracking-tight">
                {section.heading}
              </h2>
              <div className="mt-4 flex flex-col gap-4">
                {section.body.map((block, j) =>
                  Array.isArray(block) ? (
                    <ul key={j} className="flex flex-col gap-2.5">
                      {block.map((item, k) => (
                        <li
                          key={k}
                          className="relative pl-5 text-pretty leading-relaxed text-muted"
                        >
                          <span
                            className="absolute left-0 top-[0.6em] h-1.5 w-1.5 rounded-full bg-accent"
                            aria-hidden
                          />
                          {item}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p
                      key={j}
                      className="text-pretty leading-relaxed text-muted"
                    >
                      {block}
                    </p>
                  )
                )}
              </div>
            </section>
          </Reveal>
        ))}
      </div>
    </article>
  );
}
