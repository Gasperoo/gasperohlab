import type { Project } from "../types";

export const orbit: Project = {
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
};
