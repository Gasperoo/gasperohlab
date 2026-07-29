import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

/**
 * The page's structural grammar.
 *
 * Every section is separated by a single full-bleed hairline rather than by
 * spacing alone, so the page reads as a ruled document instead of a stack of
 * floating cards. Section headers put a mono index in a narrow left column and
 * the headline in the right — the asymmetry is the only decoration the layout
 * gets, and it's the same on every section.
 */

const CONTAINER = "mx-auto w-full max-w-[76rem] px-5 sm:px-8";

export function Section({
  id,
  children,
  className = "",
}: {
  id?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className="border-t border-border">
      <div className={`${CONTAINER} py-20 sm:py-28 ${className}`}>{children}</div>
    </section>
  );
}

export function SectionHead({
  index,
  label,
  title,
  lede,
  action,
}: {
  /** Two-digit section index, e.g. "01". */
  index: string;
  label: string;
  title: ReactNode;
  lede?: ReactNode;
  /** Optional trailing link, right-aligned on desktop. */
  action?: ReactNode;
}) {
  return (
    <Reveal className="grid gap-6 lg:grid-cols-[13rem_1fr] lg:gap-16">
      <p className="eyebrow lg:pt-2.5">
        <span className="text-muted">{index}</span>
        <span className="mx-2 opacity-40">/</span>
        {label}
      </p>

      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between sm:gap-12">
        <div className="max-w-2xl">
          <h2 className="t-h2 text-balance">{title}</h2>
          {lede && <p className="t-lede mt-5 max-w-xl text-pretty">{lede}</p>}
        </div>
        {action && <div className="shrink-0 sm:pb-1">{action}</div>}
      </div>
    </Reveal>
  );
}

/**
 * Standing link with a trailing rule that extends on hover. Used instead of a
 * secondary button wherever an action is a navigation, not a commitment.
 */
export function TextLink({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center gap-2 text-sm font-medium text-foreground ${className}`}
    >
      {children}
      <span
        aria-hidden
        className="h-px w-6 bg-border-strong transition-all duration-300 group-hover:w-10 group-hover:bg-foreground"
      />
    </span>
  );
}
