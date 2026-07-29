import type { Project } from "../types";

export const maraponeLogisticsApp: Project = {
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
    role: "Mobile product design, native iOS + Android build — with Marapone",
    partner: {
      name: "Marapone",
      href: "https://marapone.com",
      note: "Built with the Marapone team as the mobile companion to their desktop suite.",
    },

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
};
