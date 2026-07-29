import { ImageResponse } from "next/og";
import { Logo } from "@/components/Logo";

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
          background: "#faf9f7",
          color: "#16161a",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 34 }}>
          <Logo width={92} height={118} fill="#c4302a" />
          <div style={{ display: "flex", fontSize: 92, fontWeight: 500, letterSpacing: -2 }}>
            <span>GASPEROH</span>
            <span style={{ color: "#c4302a" }}>LAB</span>
          </div>
        </div>
        <div style={{ marginTop: 40, fontSize: 34, color: "#5c5c65" }}>
          Games, apps &amp; AI, engineered.
        </div>
      </div>
    ),
    { ...size }
  );
}
