import { ImageResponse } from "next/og";
import { Logo } from "@/components/Logo";
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
          background: "#faf9f7",
          color: "#16161a",
          padding: 72,
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <Logo width={34} height={44} fill="#c4302a" />
          <div style={{ display: "flex", fontSize: 26, fontWeight: 500, letterSpacing: 2 }}>
            <span>GASPEROH</span>
            <span style={{ color: "#c4302a" }}>LAB</span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 32, color: "#5c5c65", marginBottom: 16 }}>
            {project?.discipline ?? "Case study"} · {project?.year ?? ""}
          </div>
          <div style={{ display: "flex", fontSize: 76, fontWeight: 500, letterSpacing: -2, lineHeight: 1 }}>
            {name}
          </div>
          <div style={{ display: "flex", fontSize: 34, color: "#5c5c65", marginTop: 26, maxWidth: 940 }}>
            {tagline}
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
