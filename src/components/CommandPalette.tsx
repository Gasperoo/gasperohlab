"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import type { ReactNode } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import type { SearchItem } from "@/lib/search";

const PaletteContext = createContext<(() => void) | null>(null);

export function usePalette() {
  const open = useContext(PaletteContext);
  if (!open) throw new Error("usePalette must be used inside <CommandPalette>");
  return open;
}

/**
 * Rank an item against a query.
 *
 * Not a fuzzy matcher. Every term has to appear somewhere, which keeps results
 * predictable on an index of forty-odd entries — subsequence matching only
 * earns its complexity when there is enough content for exact matching to come
 * back empty, and there isn't. What it does buy is ordering: a title that
 * starts with what you typed beats one that merely contains it, which beats a
 * match found only in the hidden keywords.
 *
 * Returns -1 for no match.
 */
function score(item: SearchItem, terms: string[]): number {
  const title = item.title.toLowerCase();
  const hay = `${title} ${item.meta ?? ""} ${item.keywords ?? ""}`.toLowerCase();

  let total = 0;
  for (const term of terms) {
    if (title.startsWith(term)) total += 100;
    else if (title.includes(term)) total += 60;
    else if (hay.includes(term)) total += 20;
    else return -1;
  }
  return total;
}

const GROUP_ORDER = ["Work", "Notes", "Pages"];

export function CommandPalette({
  items,
  children,
}: {
  items: SearchItem[];
  children: ReactNode;
}) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [cursor, setCursor] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const openPalette = useCallback(() => setOpen(true), []);

  const results = useMemo(() => {
    const terms = query.trim().toLowerCase().split(/\s+/).filter(Boolean);

    // Empty query: show the index in its natural order rather than nothing.
    // A palette that opens blank makes you guess what it knows about.
    if (terms.length === 0) {
      return [...items].sort(
        (a, b) => GROUP_ORDER.indexOf(a.group) - GROUP_ORDER.indexOf(b.group)
      );
    }

    return items
      .map((item) => ({ item, s: score(item, terms) }))
      .filter((r) => r.s >= 0)
      .sort((a, b) => b.s - a.s)
      .map((r) => r.item);
  }, [items, query]);

  // Any change to the query invalidates the highlighted row. Adjusted during
  // render rather than in an effect, so the list never paints for a frame with
  // the cursor pointing at a result that is no longer there.
  const [cursorQuery, setCursorQuery] = useState(query);
  if (cursorQuery !== query) {
    setCursorQuery(query);
    setCursor(0);
  }

  // ⌘K / Ctrl-K from anywhere. Registered once at the root rather than per
  // page, so the shortcut works on the 404 and on case studies too.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((v) => !v);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Lock the page and focus the field while open.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const t = window.setTimeout(() => inputRef.current?.focus(), 30);
    return () => {
      document.body.style.overflow = prev;
      window.clearTimeout(t);
      setQuery("");
    };
  }, [open]);

  // Keep the highlighted row in view when arrowing past the fold.
  useEffect(() => {
    listRef.current
      ?.querySelector('[data-active="true"]')
      ?.scrollIntoView({ block: "nearest" });
  }, [cursor]);

  function go(item: SearchItem) {
    setOpen(false);
    // The RSS feed is a route handler, not a page — the client router can't
    // navigate to it.
    if (item.href.endsWith(".xml")) window.location.assign(item.href);
    else router.push(item.href);
  }

  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Escape") {
      setOpen(false);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setCursor((c) => (results.length ? (c + 1) % results.length : 0));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setCursor((c) =>
        results.length ? (c - 1 + results.length) % results.length : 0
      );
    } else if (e.key === "Enter") {
      e.preventDefault();
      const item = results[cursor];
      if (item) go(item);
    }
  }

  return (
    <PaletteContext.Provider value={openPalette}>
      {children}

      {open && (
        <div className="fixed inset-0 z-[90] flex items-start justify-center p-4 pt-[12vh]">
          <div
            className="absolute inset-0"
            style={{ background: "var(--backdrop)" }}
            onClick={() => setOpen(false)}
            aria-hidden
          />

          <div
            role="dialog"
            aria-modal="true"
            aria-label="Search the site"
            onKeyDown={onKeyDown}
            className="relative flex w-full max-w-lg flex-col overflow-hidden rounded-lg border border-border bg-background-elevated"
            style={{ boxShadow: "var(--shadow-panel)" }}
          >
            <div className="flex items-center gap-3 border-b border-border px-4">
              <Search className="h-4 w-4 shrink-0 text-faint" aria-hidden />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search work, notes and pages…"
                aria-label="Search"
                aria-controls="palette-results"
                autoComplete="off"
                spellCheck={false}
                className="w-full bg-transparent py-4 text-sm text-foreground outline-none placeholder:text-faint"
              />
              <kbd className="eyebrow hidden shrink-0 rounded border border-border px-1.5 py-1 sm:block">
                Esc
              </kbd>
            </div>

            <div
              ref={listRef}
              id="palette-results"
              role="listbox"
              className="max-h-[52vh] overflow-y-auto"
            >
              {results.length === 0 ? (
                <p className="px-4 py-10 text-center text-sm text-muted">
                  Nothing matches &ldquo;{query}&rdquo;.
                </p>
              ) : (
                results.map((item, i) => {
                  // Only label the first row of each run, so the list reads as
                  // grouped without needing a separate nested structure.
                  const heading =
                    i === 0 || results[i - 1].group !== item.group
                      ? item.group
                      : null;
                  const active = i === cursor;

                  return (
                    <div key={item.href}>
                      {heading && (
                        <p className="eyebrow border-b border-border bg-surface px-4 py-2">
                          {heading}
                        </p>
                      )}
                      <button
                        type="button"
                        role="option"
                        aria-selected={active}
                        data-active={active}
                        onMouseMove={() => setCursor(i)}
                        onClick={() => go(item)}
                        className="flex w-full items-baseline justify-between gap-4 border-b border-border px-4 py-3 text-left last:border-b-0"
                        style={
                          active ? { background: "var(--hover-tint)" } : undefined
                        }
                      >
                        <span className="flex items-baseline gap-2 truncate text-sm text-foreground">
                          {active && (
                            <span
                              aria-hidden
                              className="h-3 w-px shrink-0 self-center bg-accent"
                            />
                          )}
                          <span className="truncate">{item.title}</span>
                        </span>
                        {item.meta && (
                          <span className="eyebrow shrink-0">{item.meta}</span>
                        )}
                      </button>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      )}
    </PaletteContext.Provider>
  );
}
