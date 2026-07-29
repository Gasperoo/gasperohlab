import type { Project } from "../types";

export const blueprintAuditor: Project = {
  slug: "blueprint-auditor",
  name: "Marapone Blueprint Auditor",
  discipline: "App",
  status: "Released",
  blurb:
    "Reads a drawing set the way a senior PM would — quantities off the page, code checks against the Ontario Building Code, and the risks in a tender flagged before it is priced.",
  year: "2026",
  cover: "/work/blueprint-auditor/blueprint-auditor-poster.jpg",
  href: "https://marapone.com/construction/blueprint-auditor",
  external: true,
  caseStudy: {
    tagline: "Takeoff, code review and tender risk, off the drawings.",
    role: "Product design, vision pipeline, desktop + mobile build — with Marapone",
    partner: {
      name: "Marapone",
      href: "https://marapone.com/construction",
      note: "Built with the Marapone team, whose estimators defined what a useful audit actually looks like and tested every release against live tenders.",
    },
    timeframe: "2025 — 2026",
    heroVideo: "/work/blueprint-auditor/blueprint-auditor-demo.mp4",
    heroImage: "/work/blueprint-auditor/blueprint-auditor-poster.jpg",
    liveUrl: "https://marapone.com/construction/blueprint-auditor",
    liveLabel: "the product page",
    overview: [
      "A set of drawings holds everything you need to price a job and every reason you might lose money on it. Reading it properly takes a senior estimator days, and the things that hurt — a detail that contradicts the spec, a quantity nobody carried, a clause in the tender that shifts risk onto you — are exactly the ones that get missed at 11pm before a close.",
      "The Blueprint Auditor reads the set instead. It measures, it cross-checks against the Ontario Building Code, and it says plainly what it found and where — page, detail, clause.",
    ],
    metrics: [
      { value: "8", label: "Audit tools in one pass" },
      { value: "100%", label: "On-device — drawings never leave" },
      { value: "0", label: "Per-drawing or per-seat fees" },
    ],
    sections: [
      {
        heading: "Reading a drawing, not scraping a PDF",
        body: [
          "Construction drawings defeat generic document AI. Scale lives in a title block, meaning lives in line weight and hatch, and half the information is in details referenced from somewhere else in the set.",
          "The pipeline handles the set as a set: it resolves scale, follows detail callouts, and keeps every measurement anchored to the sheet it came from — so a number you don't trust is always one click from the drawing that produced it.",
        ],
      },
      {
        heading: "Eight tools, one pass",
        body: [
          "Takeoff, code review, tender-risk scanning, RFI backlog triage, scope-gap finding, change-order risk, deficiency lists and meeting-minute tracking. Each one is a distinct question a project team asks of the same set of documents.",
          "Running them together is the point. A scope gap is only interesting next to the quantity that should have covered it, and a tender clause only matters when you can see the drawing it applies to.",
        ],
      },
      {
        heading: "Owned, not rented",
        body: [
          "It runs on the estimator's own machine, on the MaraponeAI engine. Drawings — often the most commercially sensitive documents a contractor holds — never leave the office, and there is no per-drawing charge that makes people ration the tool they bought.",
        ],
      },
    ],
    motion: [
      {
        src: "/work/blueprint-auditor/blueprint-auditor-takeoff.mp4",
        poster: "/work/blueprint-auditor/blueprint-auditor-takeoff-poster.jpg",
        label: "Quantity takeoff",
      },
      {
        src: "/work/blueprint-auditor/blueprint-auditor-review.mp4",
        poster: "/work/blueprint-auditor/blueprint-auditor-review-poster.jpg",
        label: "Code review",
      },
      {
        src: "/work/blueprint-auditor/blueprint-auditor-tender-risk.mp4",
        poster: "/work/blueprint-auditor/blueprint-auditor-tender-risk-poster.jpg",
        label: "Tender risk",
      },
    ],
    motionLandscape: true,
    gallery: [
      { src: "/work/blueprint-auditor/blueprint-auditor-assess-poster.jpg", label: "Assess" },
      { src: "/work/blueprint-auditor/blueprint-auditor-pricing-poster.jpg", label: "Pricing" },
      { src: "/work/blueprint-auditor/blueprint-auditor-deficiency-poster.jpg", label: "Deficiency list" },
      { src: "/work/blueprint-auditor/blueprint-auditor-change-order-poster.jpg", label: "Change-order risk" },
    ],
    stack: ["Python", "PyQt6", "MaraponeAI", "On-device OCR", "macOS + Windows"],
  },
};
