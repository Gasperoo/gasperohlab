import { ImageResponse } from "next/og";

export const alt = "GASPEROHLAB — Games, apps & AI, engineered.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#08090a",
          color: "#f4f5f6",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 116,
              height: 116,
              borderRadius: 24,
              background: "#ff3b47",
            }}
          >
            <svg
              width="74"
              height="74"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#fff"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
              <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
              <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
              <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
            </svg>
          </div>
          <div style={{ display: "flex", fontSize: 92, fontWeight: 700, letterSpacing: -2 }}>
            <span>GASPEROH</span>
            <span style={{ color: "#ff3b47" }}>LAB</span>
          </div>
        </div>
        <div style={{ marginTop: 40, fontSize: 34, color: "#9a9ca1" }}>
          Games, apps &amp; AI, engineered.
        </div>
      </div>
    ),
    { ...size }
  );
}
