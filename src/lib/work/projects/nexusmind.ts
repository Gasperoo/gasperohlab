import type { Project } from "../types";

export const nexusmind: Project = {
  slug: "nexusmind",
  name: "NexusMind",
  discipline: "App",
  status: "In Production",
  blurb:
    "A notebook that reads what you wrote and finds the threads between it — including the places you've quietly changed your mind. Every model runs on the phone: no account, no server.",
  progress: 80,
  year: "2026",
  cover: "/work/nexusmind/cover.png",
  caseStudy: {
    tagline: "A notebook that reads what you wrote.",
    role: "Product design, on-device ML, iOS build",
    timeframe: "2026 — in production",
    heroImage: "/work/nexusmind/hero.png",
    overview: [
      "NexusMind is a commonplace book that reads what you put in it. You write badly — half-formed, by thumb or by voice — and it titles and tags the note for you, then goes looking for the note you'd forgotten you already wrote about the same idea.",
      "All of it runs on the phone. There is no account and no server, because a half-formed thought is exactly the content you shouldn't ship to somebody else's cloud.",
    ],
    metrics: [
      { value: "On-device", label: "No account, no server" },
      { value: "0", label: "Junk links on the labelled corpus" },
      { value: "80%", label: "Build progress" },
    ],
    sections: [
      {
        heading: "The bet",
        body: [
          "Notes apps are good at storage and bad at memory. They'll hold ten years of your thinking and never once mention that you've circled the same idea five times, or that the position you're defending today is one you argued against in March.",
          "NexusMind starts from the opposite premise: the notebook should read what you wrote. Capture stays instant and deliberately unintelligent — the note is saved the moment you hit save, and nothing clever is allowed to block it — and everything else happens quietly afterward.",
        ],
      },
      {
        heading: "Why a similarity score wasn't enough",
        body: [
          "The obvious build is \"propose any pair above 0.7 cosine\". We measured it, and it doesn't work. On a real corpus two notes sharing a genuine idea scored 0.921, while a note about descaling an espresso machine and a note about a product roadmap scored 0.936. The worst true pair sat below the best false one, so no threshold exists that separates them — tuning the number isn't a fix, the mechanism is wrong.",
          "What replaced it isn't a better number, it's a different question. A pair is only proposed if each note is a statistical standout for the other, and if some third note vouches for both. Corroboration is structural rather than numeric: a real connection lives inside a cluster, while a loner's best neighbour is just an artifact of having nothing better to be near.",
          "It cost recall, and it was the right trade. Mutual standouts alone gave 64% precision on the labelled corpus; adding the shared-neighbour rule took it to zero junk proposals. One absurd suggestion costs more trust than five good ones earn, and a review queue nobody trusts is worth nothing.",
        ],
      },
      {
        heading: "Second thoughts",
        body: [
          "The part no other notes tool does: NexusMind flags where you appear to have changed your mind. Not \"these two notes share a topic\" — \"in March you argued shipping beats polishing, and in June you concluded the rushed launch cost more than polish would have\".",
          "It only fires on notes separated in time, because two notes written the same afternoon that seem to disagree are usually one thought in progress rather than a reversal. Distance is what makes it interesting: it means you'd genuinely forgotten.",
          "It also requires the real on-device model, with no heuristic fallback. You cannot detect a contradiction by counting shared nouns, and a keyword-based imitation would produce confident nonsense about the most important claim the app ever makes.",
        ],
      },
      {
        heading: "It learns what you keep",
        body: [
          "Every accept and reject trains a small model on the device, over six features: how alike two notes read, how much they stand out from your other notes, how many other notes vouch for the pair, tags they share, how close together they were captured, and whether they were captured the same way.",
          "Interpretability here is a product requirement rather than a technical preference. The app tells you what it has learned about you — \"you tend to accept connections based on how many other notes vouch for the pair\" — and it can only say that honestly if every weight maps to something you'd recognise about your own habits.",
        ],
      },
      {
        heading: "Where it is",
        body: [
          "The engine, the taste model, threads and second thoughts are all built and measured. A regression harness runs the shipping linker over a hand-labelled corpus on every change, and it has already earned its keep twice — catching a chunking bug that halved link quality, and proving that z-scoring alone leaks junk. Both were invisible from the UI, which still looked like it worked.",
          "Store assets are staged. What's left is polish and the beta.",
        ],
      },
    ],
    gallery: [
      { src: "/work/nexusmind/welcome.png", label: "Welcome" },
      { src: "/work/nexusmind/write.png", label: "Write" },
      { src: "/work/nexusmind/notes.png", label: "Notes" },
      { src: "/work/nexusmind/connections.png", label: "Connections" },
      { src: "/work/nexusmind/threads.png", label: "Threads" },
      { src: "/work/nexusmind/today.png", label: "Today" },
    ],
    galleryPhone: true,
    stack: [
      "Swift",
      "SwiftUI",
      "SwiftData",
      "Foundation Models",
      "NaturalLanguage",
      "On-device",
    ],
    waitlist: {
      platforms: ["iOS"],
      blurb:
        "NexusMind is heading for a beta on iOS. Leave your email and we'll send you an invite and everything you need to start writing when it opens.",
    },
  },
};
