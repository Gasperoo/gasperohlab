import type { ReactNode } from "react";

/**
 * Shared header for every page below the home page.
 *
 * Each sub-page used to build its own hero, and they had drifted: different
 * paddings, different title sizes, and three of them framed a voxel character
 * in a bordered square with an accent glow behind it. One component now sets
 * all of them, so /work, /about, /ethos and /lab open identically.
 */
export function PageHero({
  label,
  title,
  lede,
  facts,
  children,
}: {
  label: string;
  title: ReactNode;
  lede?: ReactNode;
  /** Optional ruled strip under the lede. */
  facts?: { label: string; value: string }[];
  /** Optional trailing content, e.g. an RSS link. */
  children?: ReactNode;
}) {
  return (
    <section>
      <div className="mx-auto w-full max-w-[76rem] px-5 pt-36 pb-14 sm:px-8 sm:pt-44 sm:pb-20">
        <p className="rise eyebrow" style={{ animationDelay: "0.05s" }}>
          {label}
        </p>
        <h1
          className="rise t-h1 mt-7 max-w-3xl text-balance"
          style={{ animationDelay: "0.13s" }}
        >
          {title}
        </h1>
        {lede && (
          <p
            className="rise t-lede mt-7 max-w-2xl text-pretty"
            style={{ animationDelay: "0.21s" }}
          >
            {lede}
          </p>
        )}
        {children && (
          <div className="rise mt-8" style={{ animationDelay: "0.29s" }}>
            {children}
          </div>
        )}
      </div>

      {facts && facts.length > 0 && (
        <div className="rise border-t border-border" style={{ animationDelay: "0.33s" }}>
          <dl className="mx-auto grid w-full max-w-[76rem] gap-px px-5 sm:grid-cols-3 sm:px-8">
            {facts.map((f, i) => (
              <div
                key={f.label}
                className={`py-6 ${
                  i > 0 ? "border-t border-border sm:border-l sm:border-t-0 sm:pl-6" : ""
                } ${i < facts.length - 1 ? "sm:pr-6" : ""}`}
              >
                <dt className="eyebrow">{f.label}</dt>
                <dd className="mt-2.5 text-sm text-foreground">{f.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      )}
    </section>
  );
}
