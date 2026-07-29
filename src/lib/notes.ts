import { founder } from "./site";

export type NoteBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "quote"; text: string }
  | { type: "list"; items: string[] }
  /**
   * A source listing. No highlighter — see the `.code-block` note in
   * globals.css. `lang` is recorded for the feed and the caption, not to drive
   * a tokeniser.
   */
  | { type: "code"; lang?: string; caption?: string; code: string }
  /** An image from /public, with a required alt and an optional caption. */
  | { type: "figure"; src: string; alt: string; caption?: string };

export type Note = {
  slug: string;
  title: string;
  /** ISO date. */
  date: string;
  /** Short label, e.g. "Devlog", "Engineering", "Notes". */
  kind: string;
  excerpt: string;
  /** Minutes, rough. */
  readingTime: number;
  /** Free tags. Feed the related-notes list and the command palette. */
  tags?: string[];
  body: NoteBlock[];
};

/**
 * Byline for every note.
 *
 * The lab publishes as the lab until there's a real person to name — see
 * `founder` in lib/site.ts. Wiring it through here means filling that in
 * bylines every post at once, rather than needing an edit per note.
 */
export const author = founder?.name ?? "GASPEROHLAB";

// Newest first. This is the source of truth for /lab.
export const notes: Note[] = [
  {
    slug: "two-faces-one-palette",
    title: "Two faces, one palette",
    date: "2026-07-29",
    kind: "Engineering",
    excerpt:
      "Adding a dark theme to a near-monochrome site should be a palette swap. It was — but only after every literal colour in the codebase was made to admit it was a decision.",
    readingTime: 5,
    tags: ["design systems", "css", "accessibility"],
    body: [
      {
        type: "p",
        text: "This site is built on one idea: paper and ink, and a single red rationed to four places. That makes it an unusually good candidate for a dark theme — there is almost no colour to re-derive — and an unusually annoying one, because when a design has this few colours, the ones it does have get written inline without anyone noticing.",
      },
      {
        type: "p",
        text: "The tokens were already there. Background, foreground, muted, faint, border, accent: six variables doing nearly all the work. What wasn't tokenised were the tints — the two-percent black wash under a hovered row, the barely-there fill inside a text input, the flat black filter that flattens partner logos to a single ink value. Each of those is a colour decision wearing the costume of a utility class.",
      },
      { type: "h2", text: "A tint is a decision, not a value" },
      {
        type: "p",
        text: "Two percent black over warm paper is a faint grey wash. Two percent black over a near-black sheet is nothing at all. The fix isn't to write a dark variant beside every one of them — it's to name what the value means and let the theme answer:",
      },
      {
        type: "code",
        lang: "css",
        caption: "globals.css — the same intent, two answers",
        code: `:root[data-theme="light"] {
  --hover-tint: rgba(22, 22, 26, 0.022);
  --logo-filter: brightness(0);
  --grain-blend: multiply;
}

:root[data-theme="dark"] {
  --hover-tint: rgba(236, 236, 239, 0.035);
  --logo-filter: brightness(0) invert(1);
  --grain-blend: screen;
}`,
      },
      {
        type: "p",
        text: "The grain layer is the clearest case. It's one fractal-noise SVG multiplied over the page to give the flat sheet some tooth. Multiply over near-black is very nearly a no-op, so the dark theme screens instead — and at a lower opacity, because texture is far louder against dark than against paper.",
      },
      { type: "h2", text: "The accent had to split in two" },
      {
        type: "p",
        text: "The one genuinely hard part was the red. On paper, #c4302a clears AA as type and also works as a button fill under white text. On a dark sheet, no single red does both jobs: light enough to read as small text and it becomes far too weak a fill for white labels; dark enough to hold white text and it barely separates from the background.",
      },
      {
        type: "p",
        text: "So the dark theme has two reds. The fill sits at #cf3a33 — 4.9:1 under white text, 3.9:1 against the sheet, which clears both thresholds with nothing to spare. Small accent type gets #ff7a70, at 7.5:1. There was already an --accent-text token separate from --accent, added for a different reason entirely; it turned out to be exactly the seam the dark theme needed.",
      },
      {
        type: "quote",
        text: "Every colour in the codebase is now a token or a mistake. There is no third category.",
      },
      { type: "h2", text: "No flash, and no JavaScript required" },
      {
        type: "p",
        text: "Reading the stored theme in an effect means painting the wrong one first, which on a dark-theme page is a full white flash — worse than shipping no dark theme at all. So a small blocking script in the head stamps data-theme on the root element before the body paints. It's the one place an inline script genuinely earns its keep.",
      },
      {
        type: "p",
        text: "That script leaves readers without JavaScript unthemed, which is why none of this uses Tailwind's dark: variant. Everything resolves through custom properties instead, so a plain prefers-color-scheme block can serve those readers the correct face with no script involved at all. A utility-variant approach couldn't have done that — and the constraint made the implementation smaller, not larger.",
      },
    ],
  },
  {
    slug: "ai-you-actually-own",
    title: "The case for AI you actually own",
    date: "2026-06-18",
    kind: "Engineering",
    excerpt:
      "Every AI vendor wants your documents in their cloud and a seat-based bill that never stops. We built the opposite — and it turned out to be the easy part.",
    readingTime: 6,
    tags: ["ai", "on-prem", "privacy"],
    body: [
      {
        type: "p",
        text: "Most AI products sold to businesses share a shape: your data goes up to their cloud, and a per-seat meter runs against you forever. For a lot of companies that trade is fine. For the ones we build for — construction firms sitting on proprietary drawings and bids, freight forwarders whose whole edge is their rate book — it's a non-starter.",
      },
      {
        type: "p",
        text: "So MaraponeAI started from a constraint instead of a feature list: nothing the customer feeds it ever leaves the building, and they pay for it once. Everything else had to be designed around that.",
      },
      { type: "h2", text: "On-prem is a design decision, not a deployment note" },
      {
        type: "p",
        text: "When you commit to running on the customer's own hardware, a lot of comfortable assumptions disappear. You can't lean on a fleet of cloud GPUs. You can't ship a fix by redeploying a container nobody sees. The model has to be small enough to run on commodity machines and good enough that the size doesn't show.",
      },
      {
        type: "p",
        text: "That pushed us toward a quantised llama.cpp engine with a domain layer trained on real operational data, rather than a giant general model behind an API. It's less glamorous and far more useful: it runs offline, it's fast enough on hardware a firm already owns, and it's theirs.",
      },
      { type: "quote", text: "You buy it once. It runs on your infrastructure. You get the source. Nothing leaves the building." },
      { type: "h2", text: "The privacy guarantee is the product" },
      {
        type: "p",
        text: "Once the engine lived entirely on-prem, the same guarantee carried into everything built on top of it — the construction suite reading Ontario Building Code drawings, the logistics suite auditing freight invoices. Same engine, same promise. GasperAI, the assistant inside both, never phones home because there's nowhere for it to phone.",
      },
      {
        type: "p",
        text: "The lesson we keep relearning: the hard part wasn't the model. It was having the discipline to say no to the cloud-and-subscription default that every other tool in the category reaches for.",
      },
    ],
  },
  {
    slug: "prototypes-over-pitch-decks",
    title: "Why most of our ideas die in the second week",
    date: "2026-03-20",
    kind: "Notes",
    excerpt:
      "A lab optimises for learning, not throughput. That only works if you're willing to kill the thing you just built — on purpose, and quickly.",
    readingTime: 3,
    tags: ["process", "honesty"],
    body: [
      {
        type: "p",
        text: "We run every idea through the same four gates: ask, prototype, pressure-test, ship. The uncomfortable truth is that most ideas don't make it past the second one, and that's not a bug — it's the entire point of working as a lab instead of a factory.",
      },
      { type: "h2", text: "The fastest way to understand an idea is to build it" },
      {
        type: "p",
        text: "A slide deck can make anything sound inevitable. A prototype can't — it either does the thing or it doesn't. So we make the smallest real version we can and put it in front of the actual problem, early enough that walking away is cheap.",
      },
      { type: "list", items: [
        "Ask — if we can't say why it matters, we don't start.",
        "Prototype — the smallest thing that's real, not a mock.",
        "Pressure-test — break it on purpose and see what survives.",
        "Ship & own — what earns it goes to production, and we keep owning it.",
      ] },
      { type: "h2", text: "Saying no is part of the craft" },
      {
        type: "p",
        text: "Depth over breadth means the roadmap is mostly a list of things we chose not to build. It's easier to admire that in principle than to do it in practice — cutting something you've grown fond of always stings. But the work that survives the second week is the work worth putting our name on, and that filter is the reason anything ships at all.",
      },
      {
        type: "p",
        text: "If you'd rather have the receipts than the principle, the shipping log lists what got cut alongside what got released.",
      },
    ],
  },
];

export function getNote(slug: string): Note | undefined {
  return notes.find((n) => n.slug === slug);
}

/**
 * Newer and older neighbours in publication order.
 *
 * The note page previously offered "the first two other notes", which was the
 * same two posts on almost every page and bore no relation to what you had
 * just read.
 */
export function noteNeighbours(slug: string) {
  const i = notes.findIndex((n) => n.slug === slug);
  if (i === -1) return { newer: undefined, older: undefined };
  return { newer: notes[i - 1], older: notes[i + 1] };
}

/** Other notes sharing the most tags, best match first. */
export function relatedNotes(slug: string, limit = 2): Note[] {
  const note = getNote(slug);
  if (!note?.tags?.length) return [];
  const tags = new Set(note.tags);

  return notes
    .filter((n) => n.slug !== slug)
    .map((n) => ({
      note: n,
      shared: (n.tags ?? []).filter((t) => tags.has(t)).length,
    }))
    .filter((r) => r.shared > 0)
    .sort((a, b) => b.shared - a.shared)
    .slice(0, limit)
    .map((r) => r.note);
}

/**
 * A slug for a heading, used as its anchor id and by the table of contents.
 *
 * Both callers derive ids from the same ordered list of headings, so two
 * identically-worded headings in one note would produce a duplicate anchor
 * rather than a link pointing at nothing.
 */
export const headingId = (text: string) =>
  text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");

/** The h2s of a note, in order — drives the table of contents. */
export function tableOfContents(note: Note) {
  return note.body
    .filter((b): b is Extract<NoteBlock, { type: "h2" }> => b.type === "h2")
    .map((b) => ({ id: headingId(b.text), text: b.text }));
}

export const formatDate = (iso: string) =>
  new Date(iso + "T00:00:00").toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
