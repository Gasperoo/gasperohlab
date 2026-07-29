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
 *
 * Set as a numbered document: each clause carries its own index in the margin,
 * which is both how legal copy is normally read and a use of the site's mono
 * index that costs nothing. Bullets are hairline-ruled rather than accent dots.
 */
export function LegalPage({
  eyebrow = "Legal",
  title,
  updated,
  intro,
  sections,
}: LegalPageProps) {
  return (
    <>
      <section>
        <div className="mx-auto w-full max-w-[76rem] px-5 pt-36 pb-14 sm:px-8 sm:pt-44 sm:pb-16">
          <p className="rise eyebrow" style={{ animationDelay: "0.05s" }}>
            {eyebrow}
            <span className="mx-2 opacity-40">/</span>
            Last updated {updated}
          </p>
          <h1
            className="rise t-h1 mt-7 max-w-3xl text-balance"
            style={{ animationDelay: "0.13s" }}
          >
            {title}
          </h1>
          <div
            className="rise mt-7 flex max-w-2xl flex-col gap-4"
            style={{ animationDelay: "0.21s" }}
          >
            {intro.map((p, i) => (
              <p key={i} className="t-lede text-pretty">
                {p}
              </p>
            ))}
          </div>
        </div>
      </section>

      <div className="mx-auto w-full max-w-[76rem] border-t border-border px-5 pb-24 sm:px-8 sm:pb-32">
        {sections.map((section, i) => (
          <Reveal
            key={section.heading}
            delay={Math.min(i, 4) * 0.04}
            className="grid gap-4 border-b border-border py-10 lg:grid-cols-[13rem_1fr] lg:gap-16"
          >
            <p className="eyebrow lg:pt-1.5">
              <span className="text-muted">
                {String(i + 1).padStart(2, "0")}
              </span>
            </p>

            <section className="max-w-2xl">
              <h2 className="t-h3 text-xl">{section.heading}</h2>
              <div className="mt-4 flex flex-col gap-4">
                {section.body.map((block, j) =>
                  Array.isArray(block) ? (
                    <ul key={j} className="border-t border-border">
                      {block.map((item, k) => (
                        <li
                          key={k}
                          className="border-b border-border py-3 text-pretty text-[0.9375rem] leading-relaxed text-muted"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p
                      key={j}
                      className="t-body text-pretty text-[0.9375rem] sm:text-base"
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
    </>
  );
}
