import type { Project } from "../types";

export const maraponeConstruction: Project = {
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
    role: "Product design, model training, desktop build — with Marapone",
    partner: {
      name: "Marapone",
      href: "https://marapone.com",
      note: "Built with the Marapone team, who own the product and the construction domain expertise behind it.",
    },

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
};
