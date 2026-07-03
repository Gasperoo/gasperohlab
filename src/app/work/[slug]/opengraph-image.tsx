import { ImageResponse } from "next/og";
import { getProject, caseStudySlugs } from "@/lib/work";

export const alt = "GASPEROHLAB case study";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return caseStudySlugs.map((slug) => ({ slug }));
}

export default async function OgImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  const name = project?.name ?? "GASPEROHLAB";
  const tagline = project?.caseStudy?.tagline ?? "Games, apps & AI, engineered.";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#08090a",
          color: "#f4f5f6",
          padding: 72,
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div
            style={{
              display: "flex",
              width: 40,
              height: 40,
              borderRadius: 10,
              background: "#ff3b47",
            }}
          />
          <div style={{ display: "flex", fontSize: 26, fontWeight: 700, letterSpacing: 2 }}>
            <span>GASPEROH</span>
            <span style={{ color: "#ff3b47" }}>LAB</span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 32, color: "#9a9ca1", marginBottom: 16 }}>
            {project?.discipline ?? "Case study"} · {project?.year ?? ""}
          </div>
          <div style={{ display: "flex", fontSize: 76, fontWeight: 700, letterSpacing: -2, lineHeight: 1 }}>
            {name}
          </div>
          <div style={{ display: "flex", fontSize: 34, color: "#9a9ca1", marginTop: 26, maxWidth: 940 }}>
            {tagline}
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
