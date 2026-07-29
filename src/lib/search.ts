import { projects } from "./work";
import { notes } from "./notes";

export type SearchItem = {
  href: string;
  title: string;
  /** Group heading in the palette: "Work", "Notes", "Pages". */
  group: string;
  /** Right-hand metadata, e.g. "AI · 2025". */
  meta?: string;
  /** Extra terms to match on that aren't shown. */
  keywords?: string;
};

const pages: SearchItem[] = [
  { href: "/", title: "Home", group: "Pages" },
  { href: "/work", title: "Work", group: "Pages", keywords: "projects archive portfolio" },
  { href: "/lab", title: "The Lab", group: "Pages", keywords: "notes blog devlog writing" },
  { href: "/log", title: "Shipping log", group: "Pages", keywords: "changelog releases cut" },
  { href: "/ethos", title: "Ethos", group: "Pages", keywords: "principles beliefs values" },
  { href: "/about", title: "About", group: "Pages", keywords: "story method team" },
  { href: "/uses", title: "Uses", group: "Pages", keywords: "stack tools hardware setup editor" },
  { href: "/press", title: "Press kit", group: "Pages", keywords: "brand logo assets media" },
  { href: "/feed.xml", title: "RSS feed", group: "Pages", keywords: "subscribe atom" },
];

/**
 * The flat index the command palette searches.
 *
 * Built on the server and handed to the palette as a prop. Importing
 * `@/lib/work` from a client component would pull every case study's prose
 * into the browser bundle to search over eleven titles — this keeps the
 * payload to one short line per entry.
 */
export function searchIndex(): SearchItem[] {
  const work: SearchItem[] = projects.map((p) => ({
    href: `/work/${p.slug}`,
    title: p.name,
    group: "Work",
    meta: `${p.discipline} · ${p.year}`,
    keywords: `${p.status} ${p.blurb}`.slice(0, 160),
  }));

  const writing: SearchItem[] = notes.map((n) => ({
    href: `/lab/${n.slug}`,
    title: n.title,
    group: "Notes",
    meta: n.kind,
    keywords: `${n.excerpt} ${n.tags?.join(" ") ?? ""}`.slice(0, 160),
  }));

  return [...work, ...writing, ...pages];
}
