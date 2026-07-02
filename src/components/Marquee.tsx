const items = [
  "Game development",
  "Application engineering",
  "AI models & fine-tuning",
  "Systems & tooling",
  "Product design",
  "Prototype to production",
];

function Row({ ariaHidden = false }: { ariaHidden?: boolean }) {
  return (
    <div
      className="animate-marquee flex shrink-0 items-center"
      aria-hidden={ariaHidden || undefined}
    >
      {items.map((w, i) => (
        <div key={i} className="flex items-center">
          <span className="font-mono text-xs uppercase tracking-[0.18em] text-faint">
            {w}
          </span>
          <span className="mx-8 h-3 w-px bg-border" />
        </div>
      ))}
    </div>
  );
}

export function Marquee() {
  return (
    <div className="relative flex overflow-hidden border-y border-border py-4 select-none">
      <Row />
      <Row ariaHidden />

      {/* Edge fades */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-linear-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-linear-to-l from-background to-transparent" />
    </div>
  );
}
