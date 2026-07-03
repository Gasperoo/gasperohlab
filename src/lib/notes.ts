export type NoteBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "quote"; text: string }
  | { type: "list"; items: string[] };

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
  body: NoteBlock[];
};

// Newest first. This is the source of truth for /lab.
export const notes: Note[] = [
  {
    slug: "ai-you-actually-own",
    title: "The case for AI you actually own",
    date: "2026-06-18",
    kind: "Engineering",
    excerpt:
      "Every AI vendor wants your documents in their cloud and a seat-based bill that never stops. We built the opposite — and it turned out to be the easy part.",
    readingTime: 6,
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
        text: "The lesson we keep relearning: the hard part wasn't the model. It was having the discipline to say no to the cloud-and-subscription default that every other tool in the category defaults to.",
      },
    ],
  },
  {
    slug: "cursor-fire-hero",
    title: "A hero that catches fire under the cursor",
    date: "2026-05-02",
    kind: "Devlog",
    excerpt:
      "How the landing-page character reveal works — a radial mask, a smoothed rAF loop, and a deliberate decision to keep it off the main thread's back.",
    readingTime: 4,
    body: [
      {
        type: "p",
        text: "The character on our landing page has two states: a calm version, and an on-fire version layered directly over it. Move your cursor across it and a soft spotlight reveals the fire underneath. It's the one flourish on an otherwise deliberately quiet site, so it had to feel good and cost almost nothing.",
      },
      { type: "h2", text: "Reveal with a mask, not a second render" },
      {
        type: "p",
        text: "The trick is that both images are always painted. The fire layer just carries a CSS radial-gradient mask that's transparent everywhere except a circle around the pointer. Nudge the mask and the fire appears to move with the cursor — no canvas, no per-frame image work.",
      },
      {
        type: "p",
        text: "We drive the mask from a single requestAnimationFrame loop that eases the spotlight toward the pointer instead of snapping to it. That lerp is the whole reason it feels warm rather than twitchy.",
      },
      { type: "quote", text: "Cheap, no canvas re-serialization — just a mask string written each frame." },
      { type: "h2", text: "Know when to switch it off" },
      {
        type: "p",
        text: "The effect bails immediately on two conditions: prefers-reduced-motion, and any device without hover. On a phone there's no cursor to chase, so instead of shipping a broken interaction we show the calm character and move on. That's the next thing on the list — giving touch devices their own way to light the character up.",
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
    ],
  },
];

export function getNote(slug: string): Note | undefined {
  return notes.find((n) => n.slug === slug);
}

export const formatDate = (iso: string) =>
  new Date(iso + "T00:00:00").toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
