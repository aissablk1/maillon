import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "MAILLON — Le réseau qui porte loin";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          background: "#1F3D2E",
          color: "#F5F0E6",
          padding: "80px",
          fontFamily: "Inter, sans-serif",
          position: "relative",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            fontSize: "20px",
            letterSpacing: "0.18em",
            fontWeight: 700,
          }}
        >
          <svg width="40" height="40" viewBox="0 0 32 32">
            <circle cx="16" cy="8" r="3" fill="#F5F0E6" />
            <circle cx="8" cy="20" r="3" fill="#F5F0E6" />
            <circle cx="24" cy="20" r="3" fill="#F5F0E6" />
            <line
              x1="16"
              y1="8"
              x2="8"
              y2="20"
              stroke="#F5F0E6"
              strokeWidth="1.5"
            />
            <line
              x1="16"
              y1="8"
              x2="24"
              y2="20"
              stroke="#F5F0E6"
              strokeWidth="1.5"
            />
            <line
              x1="8"
              y1="20"
              x2="24"
              y2="20"
              stroke="#F5F0E6"
              strokeWidth="1.5"
            />
          </svg>
          <span>MAILLON</span>
        </div>

        <div style={{ flex: 1, display: "flex", alignItems: "flex-end" }}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                fontSize: "120px",
                fontWeight: 800,
                lineHeight: 1,
                letterSpacing: "-0.03em",
              }}
            >
              Le réseau
            </div>
            <div
              style={{
                fontSize: "120px",
                fontWeight: 800,
                lineHeight: 1,
                letterSpacing: "-0.03em",
              }}
            >
              qui porte
            </div>
            <div
              style={{
                fontSize: "120px",
                fontWeight: 300,
                fontStyle: "italic",
                lineHeight: 1,
                letterSpacing: "-0.03em",
                color: "#4A8B6A",
              }}
            >
              loin.
            </div>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: "20px",
            color: "#F5F0E6",
            opacity: 0.7,
          }}
        >
          <div style={{ display: "flex", gap: "24px" }}>
            <span>Mesh longue portée</span>
            <span>868 MHz</span>
            <span>Sans abonnement</span>
          </div>
          <span>github.com/aissablk1/maillon</span>
        </div>
      </div>
    ),
    size
  );
}
