import Link from "next/link";
import { Rocket } from "lucide-react";

/**
 * The one piece of the old design that stays: the rocket mark and the
 * GASPEROHLAB wordmark with LAB in accent.
 *
 * Two of the site's four permitted uses of colour live here. Everything about
 * the mark's *setting* is new — the tile is squared off rather than pill-like,
 * the wordmark is medium weight instead of bold, and the letterspacing is
 * opened up so it reads as an identity rather than a headline.
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
      <span
        className={`flex items-center justify-center rounded-[5px] bg-accent text-white ${
          lg ? "h-8 w-8" : "h-6 w-6"
        }`}
      >
        <Rocket
          className={`${lg ? "h-4 w-4" : "h-3.5 w-3.5"} transition-transform duration-500 group-hover:-translate-y-px group-hover:translate-x-px`}
          strokeWidth={2}
        />
      </span>
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
