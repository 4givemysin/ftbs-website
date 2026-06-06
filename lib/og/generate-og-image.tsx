import { ImageResponse } from "next/og";
import { company } from "@/lib/company";
import { OG_IMAGE, type OgImageContent } from "./config";

const colors = {
  navy: "#1b2a4a",
  blue: "#2e5a8b",
  gold: "#b8860b",
  white: "#ffffff",
  muted: "#cbd5e1",
  bgwEarth: "#4a4035",
  bgwGreen: "#2d5a3d",
};

export function generateOgImage(content: OgImageContent) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: `linear-gradient(135deg, ${colors.navy} 0%, ${colors.blue} 100%)`,
          padding: "64px 72px",
          fontFamily: "Arial, Helvetica, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <div
              style={{
                fontSize: 28,
                fontWeight: 700,
                color: colors.gold,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
              }}
            >
              {company.shortName}
            </div>
            <div style={{ fontSize: 18, color: colors.muted }}>
              Finesse Technology Business Solutions
            </div>
          </div>
          <div
            style={{
              width: 72,
              height: 6,
              background: colors.gold,
              borderRadius: 3,
            }}
          />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div
            style={{
              fontSize: 64,
              fontWeight: 700,
              color: colors.white,
              lineHeight: 1.1,
              maxWidth: 900,
            }}
          >
            {content.headline}
          </div>
          <div
            style={{
              fontSize: 28,
              color: colors.muted,
              lineHeight: 1.4,
              maxWidth: 820,
            }}
          >
            {content.subheadline}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
          }}
        >
          {content.showBgw ? (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 8,
                padding: "20px 24px",
                background: "rgba(255,255,255,0.08)",
                borderLeft: `4px solid ${colors.gold}`,
                borderRadius: 8,
                maxWidth: 680,
              }}
            >
              <div
                style={{
                  fontSize: 18,
                  fontWeight: 700,
                  color: colors.white,
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                }}
              >
                {content.divisionLabel}
              </div>
              <div style={{ fontSize: 16, color: colors.muted }}>
                {content.divisionTagline}
              </div>
            </div>
          ) : (
            <div />
          )}
          <div
            style={{
              fontSize: 16,
              color: colors.muted,
              textAlign: "right",
            }}
          >
            {company.url.replace("https://", "")}
          </div>
        </div>
      </div>
    ),
    {
      width: OG_IMAGE.width,
      height: OG_IMAGE.height,
    },
  );
}
