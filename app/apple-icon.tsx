import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#1b2a4a",
          borderRadius: 32,
        }}
      >
        <div style={{ display: "flex", flexWrap: "wrap", width: 100, height: 100, gap: 8 }}>
          <div style={{ width: 44, height: 44, background: "#b8860b", borderRadius: 8 }} />
          <div style={{ width: 44, height: 44, background: "#2e5a8b", borderRadius: 8 }} />
          <div style={{ width: 44, height: 44, background: "#2e5a8b", borderRadius: 8 }} />
          <div style={{ width: 44, height: 44, background: "#ffffff", borderRadius: 8, opacity: 0.9 }} />
        </div>
      </div>
    ),
    { ...size },
  );
}
