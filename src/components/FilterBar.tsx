"use client";

/**
 * Text filter row.
 *
 * Replaces the old segmented control — a bordered tray with a red pill sliding
 * between options on a framer `layoutId` spring. The spring was the loudest
 * interaction on a page about shipped software. This is the same control as
 * plain mono labels, where the active one is simply brighter and underlined.
 */
export function FilterBar<T extends string>({
  options,
  value,
  onChange,
  label,
}: {
  options: readonly T[];
  value: T;
  onChange: (value: T) => void;
  /** Accessible name for the group, e.g. "Filter work by discipline". */
  label: string;
}) {
  return (
    <div role="group" aria-label={label} className="flex flex-wrap items-center gap-x-6 gap-y-2">
      {options.map((option) => {
        const active = option === value;
        return (
          <button
            key={option}
            type="button"
            onClick={() => onChange(option)}
            aria-pressed={active}
            className={`relative py-2 font-mono text-[0.6875rem] uppercase tracking-[0.16em] transition-colors ${
              active ? "text-foreground" : "text-faint hover:text-muted"
            }`}
          >
            {option}
            {active && (
              <span
                aria-hidden
                className="absolute bottom-0 left-0 h-px w-full bg-foreground"
              />
            )}
          </button>
        );
      })}
    </div>
  );
}
