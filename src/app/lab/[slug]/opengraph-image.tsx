import { ImageResponse } from "next/og";
import { Logo } from "@/components/Logo";
import { getNote, notes } from "@/lib/notes";

export const alt = "GASPEROHLAB lab note";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return notes.map((n) => ({ slug: n.slug }));
}

export default async function OgImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const note = getNote(slug);
  const title = note?.title ?? "The Lab";
  const kind = note?.kind ?? "Note";
  const excerpt =
    note?.excerpt ??
    "Engineering write-ups and design notes on how the work is built.";

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
          <div
            style={{
              display: "flex",
              fontSize: 28,
              color: "#c4302a",
              letterSpacing: 4,
              textTransform: "uppercase",
              marginBottom: 20,
            }}
          >
            {kind} · The Lab
          </div>
          <div style={{ display: "flex", fontSize: 66, fontWeight: 500, letterSpacing: -2, lineHeight: 1.05, maxWidth: 1000 }}>
            {title}
          </div>
          <div style={{ display: "flex", fontSize: 30, color: "#5c5c65", marginTop: 26, maxWidth: 960, lineHeight: 1.35 }}>
            {excerpt}
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
