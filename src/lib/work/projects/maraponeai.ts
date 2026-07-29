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
          "Both are below, each with the tools, screens and mobile companion it ships with.",
        ],
      },
    ],
    chapters: [
      {
        id: "construction",
        name: "The Construction Suite",
        tagline: "Reads the drawings, clears the backlog, flags the risk.",
        heroVideo: "/work/construction/blueprint-auditor.mp4",
        heroImage: "/work/construction/blueprint-auditor-poster.jpg",
        liveUrl: "https://marapone.com/construction",
        liveLabel: "marapone.com/construction",
        body: [
          "Construction runs on documents nobody has time to read closely — hundreds of drawings, RFIs stacking up, tender packages hiding the clause that blows the margin. The cost of missing something doesn't show up until it's a change order.",
          "The suite is the document brain for that problem: an RFI backlog that triages itself, a scope-gap finder, a tender-risk scanner, change-order risk tracking, daily logs, meeting minutes and deficiency lists. Eleven modules, each a different question asked of the same audited project.",
          "It runs on the firm's own hardware and on the devices already on site, with GasperAI answering against the project's own documents. In production across construction firms today.",
        ],
        metrics: [
          { value: "11", label: "Analysis modules per project" },
          { value: "On-device", label: "Blueprint scanning on iPad" },
          { value: "OBC", label: "Building-code checks built in" },
        ],
        gallery: [
          { src: "/work/construction/summary.jpg", label: "Audit summary" },
          { src: "/work/construction/audit.jpg", label: "Code audit" },
          { src: "/work/construction/costs.jpg", label: "Cost estimate" },
          { src: "/work/construction/tender-risk.jpg", label: "Tender risk scanner" },
          { src: "/work/construction/change-order.jpg", label: "Change-order risk" },
          { src: "/work/construction/deficiency.jpg", label: "Deficiency list" },
        ],
        companion: {
          heading: "On site, in the pocket",
          body: [
            "The suite lives where the documents do, but the work happens on site — hands full, no desk. The companion app closes that gap: scan a plan, clear an RFI, file a daily log or pull up a code audit from the phone already in the superintendent's pocket.",
            "It's native on both platforms and built to work alongside the desktop suite rather than replace it, on the same private engine. Nothing leaves the site.",
          ],
          status: "iOS + Android · In production, ~70%",
          shots: [
            { src: "/work/construction-app/home.png", label: "Home" },
            { src: "/work/construction-app/summary.png", label: "Audit summary" },
            { src: "/work/construction-app/audit.png", label: "Code audit" },
            { src: "/work/construction-app/takeoff.png", label: "Quantity takeoff" },
            { src: "/work/construction-app/costs.png", label: "Cost estimate" },
            { src: "/work/construction-app/projects.png", label: "Projects" },
          ],
        },
        tools: ["blueprint-auditor", "ai-estimator", "scopeguard"],
        stack: [
          "Private LLM",
          "Python",
          "Swift",
          "iOS / iPadOS",
          "Android",
          "Computer vision",
          "On-prem",
        ],
      },
      {
        id: "logistics",
        name: "The Logistics Suite",
        tagline: "The paperwork, audited. The risk, surfaced.",
        heroVideo: "/work/logistics/dashboard.mp4",
        heroImage: "/work/logistics/dashboard.jpg",
        liveUrl: "https://marapone.com/logistics",
        liveLabel: "marapone.com/logistics",
        body: [
          "Freight moves on documents — bills of lading, commercial invoices, customs declarations, rate sheets — and every one of them is a place for money to leak or compliance to slip. Forwarders and importers live on margins measured in single percent, and it is exactly the data nobody wants sitting in someone else's cloud.",
          "The suite reads those documents, audits invoices line by line, and flags trade-compliance risk before a shipment clears — with quoting, customs and duty, sanctions screening, vessel tracking and port intelligence in the same window as the intelligence.",
          "It plugs into the rate and container ecosystems forwarders already use, and the whole thing runs offline on the company's own machines. Released and in use.",
        ],
        metrics: [
          { value: "Offline", label: "Runs fully on-prem" },
          { value: "5+", label: "Trade-data integrations" },
          { value: "1×", label: "One-time price, source included" },
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
        companion: {
          heading: "Wherever the freight is",
          body: [
            "Freight doesn't wait for anyone to get back to their desk. The companion app puts the suite's quoting, tracking and document intelligence on the device the team already carries, so the call can be made where the shipment is.",
            "Native on iOS and Android, running the same offline engine as the desktop app — a shipment's paperwork is read on the phone, not uploaded somewhere to be read for you.",
          ],
          status: "iOS + Android · In production, ~70%",
        },
        stack: [
          "Private LLM",
          "llama.cpp",
          "Python",
          "PyQt6",
          "Swift",
          "iOS + Android",
          "On-prem",
        ],
      },
    ],
    stack: ["llama.cpp", "Python", "PyQt6", "Custom fine-tuning", "On-prem"],
  },
};
