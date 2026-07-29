import type { Project } from "../types";

export const yugidex: Project = {
  slug: "yugidex",
  name: "YuGi-Dex",
  discipline: "Game",
  status: "In Production",
  blurb:
    "A native mobile card game for iOS and Android where you rip open packs, build a collection, track live market prices and trade with other collectors.",
  progress: 40,
  year: "2026",
  cover: "/yugidex/cover.jpg",
  caseStudy: {
    tagline: "Rip packs, build the collection, watch the market move.",
    role: "Game design, native iOS + Android build, live pricing",
    timeframe: "2026 — in production",
    heroVideo: "/yugidex/motion/packs.mp4",
    heroImage: "/yugidex/motion/packs.jpg",
    heroVideoPortrait: true,
    overview: [
      "YuGi-Dex is a native mobile game about the best part of trading cards — the rip. You open packs, pull cards, build a collection, and watch what it's worth as real market prices move underneath it. It's built for iOS and Android.",
      "The core loop — packs, collection and the forge — is playable today. Live market data and collector-to-collector trading are taking shape in the lab now.",
    ],
    metrics: [
      { value: "iOS + Android", label: "Native on both platforms" },
      { value: "Live", label: "Real market pricing" },
      { value: "40%", label: "Build progress" },
    ],
    sections: [
      {
        heading: "The idea",
        body: [
          "Collecting is half the game and no app treats the collection itself as the toy. We wanted the tactile hit of a pack opening, backed by the one thing a physical binder can't give you: a live valuation that moves.",
        ],
      },
      {
        heading: "Where it is",
        body: [
          "Packs, the collection view, the forge and player profiles are built and playable. The live market feed and multiplayer trading — the parts that turn a solo collection into an economy — are in active development.",
        ],
      },
    ],
    motion: [
      {
        src: "/yugidex/motion/collection.mp4",
        poster: "/yugidex/motion/collection.jpg",
        label: "Collection & slabs",
      },
      {
        src: "/yugidex/motion/forge.mp4",
        poster: "/yugidex/motion/forge.jpg",
        label: "The forge",
      },
      {
        src: "/yugidex/motion/market.mp4",
        poster: "/yugidex/motion/market.jpg",
        label: "Live market",
      },
    ],
    gallery: [
      { src: "/yugidex/packs.jpg", label: "Packs" },
      { src: "/yugidex/collection.jpg", label: "Collection" },
      { src: "/yugidex/forge.jpg", label: "Forge" },
      { src: "/yugidex/market.jpg", label: "Market" },
      { src: "/yugidex/profile.jpg", label: "Profile" },
    ],
    galleryPhone: true,
    stack: ["Swift", "iOS", "Android", "Live market data"],
    waitlist: {
      platforms: ["iOS", "Android"],
      blurb:
        "Leave your email to join the beta waitlist. When it opens we'll notify you with your invite and everything you need to start ripping packs.",
    },
  },
};
