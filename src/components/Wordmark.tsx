import Link from "next/link";
import { Logo } from "./Logo";

/**
 * The brand lockup: the circuit-"G" monogram beside the GASPEROHLAB wordmark,
 * with LAB in accent.
 *
 * The mark replaces the previous rocket glyph and is now drawn in the accent
 * itself rather than reversed out of an accent tile. Losing the tile matters —
 * a filled square was the loudest object in a header built entirely from
 * hairlines, and the monogram is distinctive enough not to need a badge around
 * it.
 *
 * It is set taller than the rocket was. The mark is fine line art at roughly a
 * 3% stroke-to-width ratio, so below about 24px the strokes stop resolving; the
 * app-icon tiles solve the same problem the other way, by reversing the mark
 * out of a solid field.
 */
export function Wordmark({
  size = "sm",
  href = "/",
  onClick,
}: {
  size?: "sm" | "lg";
  /** Pass null to render as a plain (non-linking) mark, e.g. in the footer. */
  href?: string | null;
  onClick?: () => void;
}) {
  const lg = size === "lg";

  const inner = (
    <>
      <Logo
        className={`w-auto shrink-0 text-accent transition-opacity duration-300 group-hover:opacity-80 ${
          lg ? "h-9" : "h-7"
        }`}
      />
      <span
        className={`font-medium tracking-[0.14em] ${lg ? "text-base" : "text-[0.8125rem]"}`}
      >
        GASPEROH<span className="text-accent-text">LAB</span>
      </span>
    </>
  );

  if (href === null) {
    return <span className="group flex items-center gap-2.5">{inner}</span>;
  }

  return (
    <Link href={href} onClick={onClick} className="group flex items-center gap-2.5">
      {inner}
    </Link>
  );
}
