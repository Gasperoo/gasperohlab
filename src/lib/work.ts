import {
  Gamepad2,
  LayoutGrid,
  BrainCircuit,
  TerminalSquare,
  type LucideIcon,
} from "lucide-react";

export type Status = "In Production" | "Released" | "Coming Soon";
export type Discipline = "Game" | "App" | "AI" | "Program";

export type Shot = { src: string; label: string };

/** A short looping clip (portrait phone capture) shown in the "In motion" section. */
export type Clip = { src: string; poster: string; label: string };

/** One prose block inside a case study. */
export type CaseSection = { heading: string; body: string[] };

export type Metric = { value: string; label: string };

export type CaseStudy = {
  /** One-line hero subtitle for the case page. */
  tagline: string;
  role: string; // what we did
  timeframe: string;
  heroVideo?: string;
  heroImage?: string;
  /** Render the hero video as a centred portrait phone rather than a 16:9 band. */
  heroVideoPortrait?: boolean;
  overview: string[];
  metrics?: Metric[];
  sections: CaseSection[];
  /** Short looping phone clips shown in an "In motion" section. */
  motion?: Clip[];
  gallery?: Shot[];
  /** Portrait phone-frame gallery instead of landscape. */
  galleryPhone?: boolean;
  integrations?: { name: string; src: string }[];
  /** Engine/platform the project is built on, shown as a logo + name block. */
  engine?: { name: string; src: string; note?: string };
  stack?: string[];
  liveUrl?: string;
  liveLabel?: string;
  /** Beta signup block — invites people to join the waitlist for this project. */
  waitlist?: {
    /** Platforms the beta will target, offered as pickers on the form. */
    platforms?: string[];
    /** Optional custom line under the heading. */
    blurb?: string;
  };
};

export type Project = {
  slug: string;
  name: string;
  discipline: Discipline;
  status: Status;
  blurb: string;
  progress?: number; // 0-100, shown while In Production
  year: string;
  /** Card cover: an image, or a discipline-tinted procedural fallback. */
  cover?: string;
  /** External live product link, surfaced on the case page. */
  href?: string;
  external?: boolean;
  caseStudy?: CaseStudy;
};

export const disciplineIcon: Record<Discipline, LucideIcon> = {
  Game: Gamepad2,
  App: LayoutGrid,
  AI: BrainCircuit,
  Program: TerminalSquare,
};

export const projects: Project[] = [
  {
    slug: "maraponeai",
    name: "MaraponeAI",
    discipline: "AI",
    status: "Released",
    blurb:
      "Private AI you own outright — domain-tuned models deployed on your own hardware, no cloud and no subscriptions. The platform behind Marapone's construction and logistics suites.",
    year: "2025",
    cover: "/work/maraponeai/cover.png",
    href: "https://marapone.com",
    external: true,
    caseStudy: {
      tagline: "Private, owned intelligence — not another AI subscription.",
      role: "Model training, systems architecture, on-prem deployment",
      timeframe: "2025 — ongoing",
      liveUrl: "https://marapone.com",
      liveLabel: "marapone.com",
      overview: [
        "MaraponeAI is the engine we build the rest of Marapone on: a way to give a company real document intelligence and risk analysis without handing its data — or its budget — to a third-party cloud.",
        "The premise is simple and unfashionable. You buy it once. It runs on your infrastructure. You get the source. Nothing you feed it leaves the building, and there is no monthly meter running against your usage.",
      ],
      metrics: [
        { value: "100%", label: "On-prem — no cloud dependency" },
        { value: "0", label: "Per-seat subscriptions" },
        { value: "2", label: "Industry suites shipped on it" },
      ],
      sections: [
        {
          heading: "The problem",
          body: [
            "Every AI vendor selling into construction and logistics wants the same thing: your documents in their cloud, and a seat-based bill that grows forever. For firms whose entire edge is proprietary — bids, drawings, rates, contracts — that is a non-starter.",
            "We wanted to prove the opposite could work: a serious, domain-tuned model that lives entirely inside the customer's walls and is theirs to keep.",
          ],
        },
        {
          heading: "What we built",
          body: [
            "A private inference stack that runs a quantised llama.cpp engine on commodity hardware, wrapped in a domain layer trained on real operational data — blueprints, RFIs, bills of lading, tender packages.",
            "On top of it sits GasperAI, the assistant that ships inside every Marapone product. Same engine, same privacy guarantee, whether it is reading an Ontario Building Code drawing or auditing a freight invoice.",
          ],
        },
        {
          heading: "The outcome",
          body: [
            "Two full industry suites — construction and logistics — now run on the same owned engine, in production, on customer hardware. No black boxes we can't open, no dependency we can't replace.",
          ],
        },
      ],
      stack: ["llama.cpp", "Python", "PyQt6", "Custom fine-tuning", "On-prem"],
    },
  },
  {
    slug: "marapone-construction",
    name: "Marapone Construction Suite",
    discipline: "App",
    status: "Released",
    blurb:
      "Private construction AI that audits blueprints, clears RFI backlogs and flags tender risk before it costs you — owned outright, no cloud, no subscriptions.",
    year: "2025",
    href: "https://marapone.com/construction",
    external: true,
    cover: "/work/construction/summary.jpg",
    caseStudy: {
      tagline: "Reads the drawings, clears the backlog, flags the risk.",
      role: "Product design, model training, mobile + desktop build",
      timeframe: "2025",
      heroVideo: "/work/construction/blueprint-auditor.mp4",
      heroImage: "/work/construction/blueprint-auditor-poster.jpg",
      liveUrl: "https://marapone.com/construction",
      liveLabel: "marapone.com/construction",
      overview: [
        "The Construction Suite is Marapone's document brain for builders. Point it at a set of drawings and it audits them against the building code, surfaces the scope gaps, and turns a pile of PDFs into something you can actually query.",
        "It runs on the firm's own hardware and mobile devices — a superintendent can scan a plan on an iPad on site and get a code audit back before they've left the trailer.",
      ],
      metrics: [
        { value: "11", label: "Analysis modules per project" },
        { value: "On-device", label: "Blueprint scanning on iPad" },
        { value: "OBC", label: "Building-code checks built in" },
      ],
      sections: [
        {
          heading: "The problem",
          body: [
            "Construction runs on documents nobody has time to read closely — hundreds of drawings, RFIs stacking up, tender packages hiding the clause that blows the margin. The cost of missing something doesn't show up until it's a change order.",
            "The work isn't glamorous, which is exactly why it's valuable: catch the scope gap, the code failure, the buried risk, before it becomes money.",
          ],
        },
        {
          heading: "What we built",
          body: [
            "A suite of focused tools around one private model: an RFI backlog that triages itself, a scope-gap finder, a tender-risk scanner, a change-order risk tracker, daily logs, meeting-minute tracking and deficiency lists — each one a view onto the same audited project.",
            "The blueprint auditor is the centrepiece. It reads a drawing set, checks it against the Ontario Building Code, and hands back a summary, a room-by-room takeoff, a cost view and a list of issues ranked by what they'll cost you.",
            "All of it ships as a mobile app and desktop tool that a crew owns and runs themselves — nothing leaves the site.",
          ],
        },
        {
          heading: "The outcome",
          body: [
            "In production today across construction firms, with GasperAI — the built-in assistant — answering questions against a project's own documents. Shipped, owned, and running on the customer's hardware.",
          ],
        },
      ],
      gallery: [
        { src: "/work/construction/summary.jpg", label: "Audit summary" },
        { src: "/work/construction/audit.jpg", label: "Code audit" },
        { src: "/work/construction/costs.jpg", label: "Cost estimate" },
        { src: "/work/construction/tender-risk.jpg", label: "Tender risk scanner" },
        { src: "/work/construction/change-order.jpg", label: "Change-order risk" },
        { src: "/work/construction/deficiency.jpg", label: "Deficiency list" },
      ],
      stack: ["Private LLM", "Python", "iOS / iPadOS", "Computer vision", "On-prem"],
    },
  },
  {
    slug: "marapone-logistics",
    name: "Marapone Logistics Suite",
    discipline: "App",
    status: "Released",
    blurb:
      "Private AI for freight, import/export and trade compliance — automating the paperwork and surfacing risk across every shipment. Owned and on-prem.",
    year: "2025",
    href: "https://marapone.com/logistics",
    external: true,
    cover: "/work/logistics/dashboard.jpg",
    caseStudy: {
      tagline: "The paperwork, audited. The risk, surfaced. On your own hardware.",
      role: "Desktop application, model training, trade-data integrations",
      timeframe: "2025",
      heroVideo: "/work/logistics/dashboard.mp4",
      heroImage: "/work/logistics/dashboard.jpg",
      liveUrl: "https://marapone.com/logistics",
      liveLabel: "marapone.com/logistics",
      overview: [
        "Freight moves on documents — bills of lading, commercial invoices, customs declarations, rate sheets — and every one of them is a place for money to leak or compliance to slip.",
        "The Logistics Suite is a private desktop application that reads those documents, audits the invoices, and flags trade-compliance risk before a shipment clears. Like everything at Marapone, it runs offline on the company's own machines.",
      ],
      metrics: [
        { value: "Offline", label: "Runs fully on-prem" },
        { value: "5+", label: "Trade-data integrations" },
        { value: "1×", label: "One-time price, source included" },
      ],
      sections: [
        {
          heading: "The problem",
          body: [
            "Freight forwarders and importers drown in documents and live or die on margins measured in single percent. A mis-audited invoice or a missed compliance flag isn't an inconvenience — it's the deal.",
            "And it's exactly the kind of data nobody wants sitting in someone else's cloud.",
          ],
        },
        {
          heading: "What we built",
          body: [
            "A native desktop app built on the same private MaraponeAI engine, with GasperAI running an embedded, fully-offline model. It ingests shipping documents, audits invoices line by line, and reads trade paperwork for the risk hiding in the fine print.",
            "It plugs into the rate and container ecosystems forwarders already use, so quoting and tracking live alongside the intelligence rather than in a separate tab.",
          ],
        },
        {
          heading: "The outcome",
          body: [
            "A shipped, owned logistics brain that never phones home — released and in use, with the whole thing running on the customer's own hardware.",
          ],
        },
      ],
      gallery: [
        { src: "/work/logistics/quote.jpg", label: "Instant freight quote" },
        { src: "/work/logistics/customs.jpg", label: "Customs & duty calculator" },
        { src: "/work/logistics/sanctions.jpg", label: "Sanctions screening" },
        { src: "/work/logistics/sea-tracking.jpg", label: "Live vessel tracking" },
        { src: "/work/logistics/ports.jpg", label: "Port intelligence" },
        { src: "/work/logistics/markets.jpg", label: "Live markets" },
      ],
      integrations: [
        { name: "SeaRates", src: "/work/logistics/searates-logo-white.svg" },
        { name: "Container xChange", src: "/work/logistics/container-xchange-logo.svg" },
        { name: "Freightos", src: "/work/logistics/freightos-logo.png" },
        { name: "AirRates", src: "/work/logistics/airrates-logo.svg" },
        { name: "FedEx", src: "/work/logistics/fedex-logo.svg" },
      ],
      stack: ["Private LLM", "llama.cpp", "Python", "PyQt6", "On-prem"],
    },
  },
  {
    slug: "marapone-construction-app",
    name: "Marapone Construction App",
    discipline: "App",
    status: "In Production",
    blurb:
      "The mobile companion to the Construction Suite — take the blueprint auditor, RFIs and daily logs on the go. Native for iOS and Android.",
    progress: 70,
    year: "2026",
    caseStudy: {
      tagline: "The Construction Suite, in your pocket, on site.",
      role: "Mobile product design, native iOS + Android build",
      timeframe: "2026 — in production",
      overview: [
        "The Construction App is the companion to Marapone's Construction Suite, built so a crew can carry its tools onto the site instead of leaving them on a desktop back in the trailer.",
        "It works alongside the suite: scan a plan, clear an RFI, file a daily log or pull up a code audit from a phone in the field. Native on iOS and Android, it keeps the same private, owned engine — nothing leaves the site.",
      ],
      metrics: [
        { value: "iOS + Android", label: "Native on both platforms" },
        { value: "Companion", label: "Pairs with the Construction Suite" },
        { value: "70%", label: "Build progress" },
      ],
      sections: [
        {
          heading: "Why a companion app",
          body: [
            "The Construction Suite lives where the documents do — but the work happens on site, hands full, no desk. The app closes that gap: the same audits, RFIs and logs, on the device already in the superintendent's pocket.",
            "It's built to work alongside the suite rather than replace it, so a firm's tools travel with the crew instead of staying behind.",
          ],
        },
        {
          heading: "Where it is",
          body: [
            "In production at roughly 70%, with the core on-the-go workflows — blueprint scanning, RFI triage and daily logs — coming together natively on both platforms.",
          ],
        },
      ],
      gallery: [
        { src: "/work/construction-app/home.png", label: "Home" },
        { src: "/work/construction-app/summary.png", label: "Audit summary" },
        { src: "/work/construction-app/audit.png", label: "Code audit" },
        { src: "/work/construction-app/takeoff.png", label: "Quantity takeoff" },
        { src: "/work/construction-app/costs.png", label: "Cost estimate" },
        { src: "/work/construction-app/projects.png", label: "Projects" },
      ],
      galleryPhone: true,
      stack: ["Swift", "iOS", "Android", "Private LLM", "On-prem"],
    },
  },
  {
    slug: "marapone-logistics-app",
    name: "Marapone Logistics App",
    discipline: "App",
    status: "In Production",
    blurb:
      "The mobile companion to the Logistics Suite — quoting, tracking and document audits wherever the freight is. Native for iOS and Android.",
    progress: 70,
    year: "2026",
    caseStudy: {
      tagline: "The Logistics Suite, wherever the freight is.",
      role: "Mobile product design, native iOS + Android build",
      timeframe: "2026 — in production",
      overview: [
        "The Logistics App is the companion to Marapone's Logistics Suite, built for the forwarders and importers who aren't sitting at a desk when a shipment needs a decision.",
        "It works alongside the suite: quote freight, track a vessel, and run a document or invoice audit from a phone. Native on iOS and Android, on the same private engine that never phones home.",
      ],
      metrics: [
        { value: "iOS + Android", label: "Native on both platforms" },
        { value: "Companion", label: "Pairs with the Logistics Suite" },
        { value: "70%", label: "Build progress" },
      ],
      sections: [
        {
          heading: "Why a companion app",
          body: [
            "Freight doesn't wait for anyone to get back to their desk. The app puts the suite's quoting, tracking and document intelligence on the device the team already carries, so a call can be made where the shipment is.",
            "It's built to work alongside the Logistics Suite rather than replace it — the same tools, on the go.",
          ],
        },
        {
          heading: "Where it is",
          body: [
            "In production at roughly 70%, bringing the core workflows — instant quoting, live tracking and invoice audits — to both platforms natively.",
          ],
        },
      ],
      stack: ["Swift", "iOS", "Android", "Private LLM", "On-prem"],
    },
  },
  {
    slug: "yugidex",
    name: "YuGi-Dex",
    discipline: "Game",
    status: "In Production",
    blurb:
      "A native mobile card game for iOS and Android where you rip open packs, build a collection, track live market prices and trade with other collectors.",
    progress: 40,
    year: "2026",
    cover: "/yugidex/cover.jpg",
    caseStudy: {
      tagline: "Rip packs, build the collection, watch the market move.",
      role: "Game design, native iOS + Android build, live pricing",
      timeframe: "2026 — in production",
      heroVideo: "/yugidex/motion/packs.mp4",
      heroImage: "/yugidex/motion/packs.jpg",
      heroVideoPortrait: true,
      overview: [
        "YuGi-Dex is a native mobile game about the best part of trading cards — the rip. You open packs, pull cards, build a collection, and watch what it's worth as real market prices move underneath it. It's built for iOS and Android.",
        "The core loop — packs, collection and the forge — is playable today. Live market data and collector-to-collector trading are taking shape in the lab now.",
      ],
      metrics: [
        { value: "iOS + Android", label: "Native on both platforms" },
        { value: "Live", label: "Real market pricing" },
        { value: "40%", label: "Build progress" },
      ],
      sections: [
        {
          heading: "The idea",
          body: [
            "Collecting is half the game and no app treats the collection itself as the toy. We wanted the tactile hit of a pack opening, backed by the one thing a physical binder can't give you: a live valuation that moves.",
          ],
        },
        {
          heading: "Where it is",
          body: [
            "Packs, the collection view, the forge and player profiles are built and playable. The live market feed and multiplayer trading — the parts that turn a solo collection into an economy — are in active development.",
          ],
        },
      ],
      motion: [
        {
          src: "/yugidex/motion/collection.mp4",
          poster: "/yugidex/motion/collection.jpg",
          label: "Collection & slabs",
        },
        {
          src: "/yugidex/motion/forge.mp4",
          poster: "/yugidex/motion/forge.jpg",
          label: "The forge",
        },
        {
          src: "/yugidex/motion/market.mp4",
          poster: "/yugidex/motion/market.jpg",
          label: "Live market",
        },
      ],
      gallery: [
        { src: "/yugidex/packs.jpg", label: "Packs" },
        { src: "/yugidex/collection.jpg", label: "Collection" },
        { src: "/yugidex/forge.jpg", label: "Forge" },
        { src: "/yugidex/market.jpg", label: "Market" },
        { src: "/yugidex/profile.jpg", label: "Profile" },
      ],
      galleryPhone: true,
      stack: ["Swift", "iOS", "Android", "Live market data"],
      waitlist: {
        platforms: ["iOS", "Android"],
        blurb:
          "Leave your email to join the beta waitlist. When it opens we'll notify you with your invite and everything you need to start ripping packs.",
      },
    },
  },
  {
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
  },
  {
    slug: "orbit",
    name: "Orbit",
    discipline: "App",
    status: "In Production",
    blurb:
      "A calm planning tool for small teams who resent project software. Design is locked and the build is in flight — private beta later this year.",
    progress: 70,
    year: "2026",
    cover: "/work/orbit/cover.png",
    caseStudy: {
      tagline: "Planning software for people who hate planning software.",
      role: "Product design, full-stack build",
      timeframe: "2026 — in production",
      heroVideo: "/work/orbit/app-preview.mp4",
      heroImage: "/work/orbit/now.png",
      heroVideoPortrait: true,
      overview: [
        "Orbit is a planning tool for small teams who've bounced off every heavyweight project app — the ones with a hundred fields nobody fills in. It optimises for the opposite: the smallest amount of structure that still keeps a team pointed the same way.",
        "The design is locked and the build is well underway. A private beta is planned for later this year.",
      ],
      metrics: [
        { value: "Calm", label: "Structure without the overhead" },
        { value: "Beta", label: "Private beta this year" },
        { value: "70%", label: "Build progress" },
      ],
      sections: [
        {
          heading: "The problem",
          body: [
            "Project software scales its complexity to the biggest customer, then makes everyone else live with it. Small teams end up maintaining a tool instead of using one.",
            "Orbit is our answer: keep the surface tiny, make the defaults good, and let a team plan in the time they'd otherwise spend configuring.",
          ],
        },
        {
          heading: "Where it is",
          body: [
            "Design is finished and the build is in flight. We're heads-down toward a private beta with a small group of teams later this year.",
          ],
        },
      ],
      motion: [
        {
          src: "/work/orbit/system-export.mp4",
          poster: "/work/orbit/system.png",
          label: "System",
        },
      ],
      gallery: [
        { src: "/work/orbit/now.png", label: "Now" },
        { src: "/work/orbit/system.png", label: "System" },
        { src: "/work/orbit/gravity.png", label: "Gravity" },
        { src: "/work/orbit/drift.png", label: "Drift" },
        { src: "/work/orbit/ideas.png", label: "Ideas" },
        { src: "/work/orbit/widgets.png", label: "Widgets" },
        { src: "/work/orbit/share.png", label: "Share" },
      ],
      galleryPhone: true,
      stack: ["TypeScript", "React", "Next.js"],
      waitlist: {
        blurb:
          "We're opening a private beta to a small group of teams later this year. Leave your email and we'll reach out with an invite and instructions when a spot opens up.",
      },
    },
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export const caseStudySlugs = projects
  .filter((p) => p.caseStudy)
  .map((p) => p.slug);
