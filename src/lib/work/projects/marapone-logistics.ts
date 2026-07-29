import type { Project } from "../types";

export const maraponeLogistics: Project = {
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
    role: "Desktop application, model training, integrations — with Marapone",
    partner: {
      name: "Marapone",
      href: "https://marapone.com",
      note: "Built with the Marapone team, who own the product and the freight and trade-compliance expertise behind it.",
    },

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
};
