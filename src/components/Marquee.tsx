const words = [
  "Games",
  "Apps",
  "AI Models",
  "Programs",
  "Prototypes",
  "Tools",
  "Experiments",
  "Interfaces",
];

export function Marquee() {
  return (
    <div className="relative flex overflow-hidden border-y border-border py-5 select-none">
      <div className="animate-marquee flex shrink-0 items-center gap-8 pr-8">
        {[...words, ...words].map((w, i) => (
          <div key={i} className="flex items-center gap-8">
            <span className="text-lg font-medium tracking-tight text-muted">
              {w}
            </span>
            <span className="h-1.5 w-1.5 rounded-full bg-accent/60" />
          </div>
        ))}
      </div>
      <div className="animate-marquee flex shrink-0 items-center gap-8 pr-8" aria-hidden>
        {[...words, ...words].map((w, i) => (
          <div key={i} className="flex items-center gap-8">
            <span className="text-lg font-medium tracking-tight text-muted">
              {w}
            </span>
            <span className="h-1.5 w-1.5 rounded-full bg-accent/60" />
          </div>
        ))}
      </div>

      {/* Edge fades */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-linear-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-linear-to-l from-background to-transparent" />
    </div>
  );
}
