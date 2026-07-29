export type Testimonial = {
  /** The quote itself, without surrounding quotation marks. */
  quote: string;
  /** Who said it. A named person carries far more than a team or a company. */
  author: string;
  /** Their role, if they have one worth naming. */
  role?: string;
  /** Company or product, shown after the role. */
  org?: string;
  /** Optional link on the org — a live product beats a logo. */
  href?: string;
};

/**
 * Quotes from people who use what the lab built.
 *
 * The section renders whatever is in this array, so adding a second or third
 * voice is a data change and nothing else. That was the point of extracting
 * it: the page previously hardcoded a single quote, which made "get another
 * one" a layout job rather than a five-line edit.
 *
 * A deliberate note on what's missing. Right now there is exactly one quote,
 * and it comes from the partner the lab builds Marapone *with* — the same
 * entity as both logos in the strip below it. That is honest, but it is one
 * voice vouching for itself. The single highest-value addition to this site is
 * a quote from someone who *uses* the construction or logistics suite and has
 * no stake in the lab. Nothing here is invented to fill the gap in the
 * meantime; an empty slot is recoverable and a fabricated endorsement is not.
 */
export const testimonials: Testimonial[] = [
  {
    quote:
      "We wanted AI our clients could actually own — running in their own building, with the source in their hands and no meter ticking. The lab shipped exactly that, in production.",
    author: "The Marapone team",
    org: "marapone.com",
    href: "https://marapone.com",
  },
];
