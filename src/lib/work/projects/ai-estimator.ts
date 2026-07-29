import type { Project } from "../types";

export const aiEstimator: Project = {
  slug: "ai-estimator",
  name: "Marapone AI Estimator",
  discipline: "App",
  status: "Released",
  blurb:
    "Turns measured quantities into a bid you can defend — 57 assemblies, Toronto permits and development charges, a risk-weighted contingency and a margin ladder priced off your own win history.",
  year: "2026",
  cover: "/work/ai-estimator/dashboard.webp",
  href: "https://marapone.com/construction/ai-estimator",
  external: true,
  caseStudy: {
    tagline: "From measured quantities to a number you can stand behind.",
    role: "Product design, estimating and risk engine, macOS build — with Marapone",
    partner: {
      name: "Marapone",
      href: "https://marapone.com/construction",
      note: "Built with the Marapone team — the Toronto cost data, the assembly library and the bid strategy that make it accurate are theirs.",
    },
    timeframe: "2026",
    heroVideo: "/work/ai-estimator/ai-estimator-tour.mp4",
    heroImage: "/work/ai-estimator/ai-estimator-tour-poster.jpg",
    liveUrl: "https://marapone.com/construction/ai-estimator",
    liveLabel: "the product page",
    overview: [
      "Takeoff tells you how much there is. It does not tell you what to charge. Between a measured quantity and a submitted bid sits everything that decides whether the job makes money: assemblies, crew productivity, permits, development charges, escalation, risk, and a margin call made against a competitor you cannot see.",
      "The AI Estimator is the second half of that. It takes quantities as its input — from the Blueprint Auditor or a spreadsheet — and produces a priced, risk-adjusted, defensible bid.",
    ],
    metrics: [
      { value: "57", label: "Assemblies across 20 CSI divisions" },
      { value: "27", label: "Risk rules behind the contingency" },
      { value: "100%", label: "Runs on the estimator's own machine" },
    ],
    sections: [
      {
        heading: "Your rates come first",
        body: [
          "Every estimating tool that leads with its own cost catalogue eventually gets ignored, because the estimator already knows what their drywall sub charges. So the rate sheet you import is the primary source, always. The bundled Toronto catalogue fills the gaps, validates what you brought, and drives contingency where your data is thin — it never overrules a number you know to be true.",
          "Feed in completed jobs and it goes further: catalogue defaults get replaced by your crews' measured productivity and cost variance, weighted by how much history it actually has.",
        ],
      },
      {
        heading: "The soft costs nobody models",
        body: [
          "On a Toronto residential project the development charge routinely exceeds the entire finishes package, and it is the line most often carried as a guess. The estimator models it properly — permits on the current fee schedule with surcharges, DCs gross and reduced, parkland, the Community Benefits Charge, HST and the new housing rebate.",
          "Municipal schedules change every year, so every figure is editable in-app and stored on the user's own machine. Nothing about staying current depends on us shipping an update.",
        ],
      },
      {
        heading: "A number with a reason attached",
        body: [
          "Twenty-seven risk rules produce a recommended contingency, each with a written reason and a mitigation rather than a single opaque percentage. On top sits what-if scenarios, tornado sensitivity, and a Monte Carlo distribution that answers the only question that matters — what is the chance this job loses money.",
          "The bid strategy layer closes it out: a margin ladder with win probability drawn from the firm's own recorded outcomes, an expected-value optimum, a risk-adjusted floor and a walk-away number.",
        ],
      },
    ],
    motion: [
      {
        src: "/work/ai-estimator/clip-estimate.mp4",
        poster: "/work/ai-estimator/clip-estimate-poster.jpg",
        label: "Building the estimate",
      },
      {
        src: "/work/ai-estimator/clip-risk.mp4",
        poster: "/work/ai-estimator/clip-risk-poster.jpg",
        label: "Risk & contingency",
      },
      {
        src: "/work/ai-estimator/clip-strategy.mp4",
        poster: "/work/ai-estimator/clip-strategy-poster.jpg",
        label: "Bid strategy",
      },
    ],
    motionLandscape: true,
    gallery: [
      { src: "/work/ai-estimator/estimate.webp", label: "Estimate" },
      { src: "/work/ai-estimator/risk.webp", label: "Risk register" },
      { src: "/work/ai-estimator/scenarios.webp", label: "What-if scenarios" },
      { src: "/work/ai-estimator/softcosts.webp", label: "Soft costs" },
      { src: "/work/ai-estimator/strategy.webp", label: "Bid strategy" },
      { src: "/work/ai-estimator/history.webp", label: "Historical learning" },
    ],
    stack: ["Python", "PyQt6", "MaraponeAI", "Monte Carlo", "macOS"],
  },
};
