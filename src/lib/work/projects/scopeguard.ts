import type { Project } from "../types";

export const scopeguard: Project = {
  slug: "scopeguard",
  name: "Marapone ScopeGuard",
  discipline: "App",
  status: "Released",
  blurb:
    "Reads every subcontractor proposal against the tender package and reports what nobody priced, what two trades both carried, and which wording will not survive a dispute.",
  year: "2026",
  cover: "/work/scopeguard/dashboard.webp",
  href: "https://marapone.com/construction/scopeguard",
  external: true,
  caseStudy: {
    tagline: "The scope gaps in a buyout, found before award.",
    role: "Product design, cross-reference engine, macOS build — with Marapone",
    partner: {
      name: "Marapone",
      href: "https://marapone.com/construction",
      note: "Built with the Marapone team, whose buyout standards and Ontario trade knowledge define what the engine looks for.",
    },
    timeframe: "2026",
    heroVideo: "/work/scopeguard/scopeguard-tour.mp4",
    heroImage: "/work/scopeguard/scopeguard-tour-poster.jpg",
    liveUrl: "https://marapone.com/construction/scopeguard",
    liveLabel: "the product page",
    overview: [
      "You win a job, then send scopes to twenty trades. What comes back is prose — inclusions, exclusions and qualifications written by twenty different estimators, each protecting their own number. Buried in that pile is work the spec requires that nobody priced, work two trades are both carrying, and wording that will be read against you in an adjudication.",
      "Most general contractors review this by hand, against a checklist, under time pressure, days before award. ScopeGuard turns it into a structured pass that produces a defensible record.",
    ],
    metrics: [
      { value: "8", label: "Classes of finding, each with a citation" },
      { value: "20", label: "Trade packages modelled" },
      { value: "100%", label: "On-prem — proposals stay in the office" },
    ],
    sections: [
      {
        heading: "Reading exclusions, not just inclusions",
        body: [
          "The commercially dangerous sentence in a subcontractor proposal is almost never a line item. It is a clause: “excludes winter concreting” on a structure running November to March, or “fire alarm verification by others” on work that cannot be occupied without it.",
          "The engine reads the master documents and every proposal, then cross-references them — missing scope, required scope explicitly excluded, double coverage between trades, interface grey zones, unusable pricing, and addenda that were never acknowledged.",
        ],
      },
      {
        heading: "Every finding is citable",
        body: [
          "A finding nobody can check is worse than no finding, because it costs an estimator an hour to disprove. So each one carries a plain-language explanation, a citation on both sides — the clause in the master documents and the page and line in the sub's letter — a confidence score, and a cost exposure range with its stated basis.",
          "That structure is what makes the output usable in a buyout meeting rather than just interesting.",
        ],
      },
      {
        heading: "Proven on a real package",
        body: [
          "The app ships with a full Toronto buyout — a project manual, three addenda and fourteen real subcontractor proposals — that runs through the same reader, extractor and cross-reference engine a customer's own documents go through. Nothing about the demo is canned.",
          "On that package it finds, among other things, an excluded fire pump that explains why the sprinkler price looks sharp, an air-barrier tie-in that both the glazing and envelope trades excluded, firestopping that nobody carried at all, and four proposals that never acknowledged Addendum 3.",
        ],
      },
    ],
    motion: [
      {
        src: "/work/scopeguard/clip-findings.mp4",
        poster: "/work/scopeguard/clip-findings-poster.jpg",
        label: "Findings",
      },
      {
        src: "/work/scopeguard/clip-compare.mp4",
        poster: "/work/scopeguard/clip-compare-poster.jpg",
        label: "Comparing trades",
      },
      {
        src: "/work/scopeguard/clip-clarifications.mp4",
        poster: "/work/scopeguard/clip-clarifications-poster.jpg",
        label: "Clarifications",
      },
    ],
    motionLandscape: true,
    gallery: [
      { src: "/work/scopeguard/findings.webp", label: "Findings" },
      { src: "/work/scopeguard/scopes.webp", label: "Scopes" },
      { src: "/work/scopeguard/compare.webp", label: "Trade comparison" },
      { src: "/work/scopeguard/clarifications.webp", label: "Clarifications" },
      { src: "/work/scopeguard/intelligence.webp", label: "Intelligence" },
      { src: "/work/scopeguard/trades.webp", label: "Trade packages" },
    ],
    stack: ["Python", "PyQt6", "MaraponeAI", "On-device OCR", "macOS"],
  },
};
