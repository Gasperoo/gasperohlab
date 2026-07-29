import { Reveal } from "./Reveal";
import { stats } from "@/lib/ethos";

/**
 * The ethos figures, shown under the /ethos hero.
 *
 * This file used to also export a full home-page ethos section — principles,
 * a lede and these stats. That section is gone: the home page was running four
 * consecutive argument blocks, and this one overlapped with the ownership
 * block that sits above it while being the more abstract of the two. The
 * principles themselves still have a page of their own, which renders them
 * directly from lib/ethos.
 *
 * Two of the four figures are now counted from the work archive rather than
 * typed — see the note there.
 */

// Reflows 2×2 → 1×4, so which cells sit against a column rule changes with the
// breakpoint. Spelled out per cell for the same reason as the hero strip.
const statRules = [
  "pr-6",
  "border-l border-border pl-6 pr-6",
  "pr-6 lg:border-l lg:border-border lg:pl-6",
  "border-l border-border pl-6",
];

export function EthosStats({ className = "" }: { className?: string }) {
  return (
    <dl className={`grid grid-cols-2 border-t border-border lg:grid-cols-4 ${className}`}>
      {stats.map((s, i) => (
        <Reveal
          key={s.label}
          delay={i * 0.06}
          className={`py-6 ${statRules[i]} ${i < 2 ? "border-b border-border lg:border-b-0" : ""}`}
        >
          <dt className="text-[2rem] font-medium leading-none tracking-[-0.035em] text-foreground">
            {s.value}
          </dt>
          <dd className="mt-3 text-sm text-muted">{s.label}</dd>
        </Reveal>
      ))}
    </dl>
  );
}
