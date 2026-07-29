import type { Project } from "../types";

export const maraponeConstructionApp: Project = {
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
    role: "Mobile product design, native iOS + Android build — with Marapone",
    partner: {
      name: "Marapone",
      href: "https://marapone.com",
      note: "Built with the Marapone team as the mobile companion to their desktop suite.",
    },

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
};
