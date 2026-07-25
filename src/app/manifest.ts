import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "GASPEROHLAB — Games, apps & AI, engineered.",
    short_name: "GASPEROHLAB",
    description:
      "An independent lab engineering games, applications and AI models — bold experiments, turned into shipped software.",
    start_url: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: "#08090a",
    theme_color: "#08090a",
    categories: ["business", "productivity", "developer"],
    icons: [
      {
        src: "/icons/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      // Padded so Android can crop to a circle or squircle without clipping.
      {
        src: "/icons/icon-maskable-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
