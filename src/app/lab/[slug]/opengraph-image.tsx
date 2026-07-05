import { ImageResponse } from "next/og";
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
    "Devlogs, engineering write-ups and the thinking behind what we build.";

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
          <div
            style={{
              display: "flex",
              fontSize: 28,
              color: "#ff3b47",
              letterSpacing: 4,
              textTransform: "uppercase",
              marginBottom: 20,
            }}
          >
            {kind} · The Lab
          </div>
          <div style={{ display: "flex", fontSize: 66, fontWeight: 700, letterSpacing: -2, lineHeight: 1.05, maxWidth: 1000 }}>
            {title}
          </div>
          <div style={{ display: "flex", fontSize: 30, color: "#9a9ca1", marginTop: 26, maxWidth: 960, lineHeight: 1.35 }}>
            {excerpt}
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
