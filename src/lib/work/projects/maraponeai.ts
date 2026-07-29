import type { Project } from "../types";

export const maraponeai: Project = {
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
    role: "Model training, systems architecture, on-prem deployment — with Marapone",
    partner: {
      name: "Marapone",
      href: "https://marapone.com",
      note: "Built with the Marapone team — they brought the domain and the operational data, we brought the model and systems work.",
    },

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
};
