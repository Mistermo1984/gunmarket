import { ImageResponse } from "next/og";

export const runtime = "nodejs";
export const alt = "GunMarket.ch — Der Schweizer Waffenmarktplatz";
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
          backgroundColor: "#111613",
          fontFamily: "sans-serif",
        }}
      >
        {/* Top accent line */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 6,
            backgroundColor: "#22c55e",
          }}
        />

        {/* Logo area */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            marginBottom: 32,
          }}
        >
          <div
            style={{
              width: 64,
              height: 64,
              backgroundColor: "#22c55e",
              borderRadius: 12,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 36,
              fontWeight: 900,
              color: "white",
            }}
          >
            GM
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span
              style={{
                fontSize: 48,
                fontWeight: 900,
                color: "white",
                letterSpacing: -1,
              }}
            >
              GunMarket
              <span style={{ color: "#22c55e" }}>.ch</span>
            </span>
          </div>
        </div>

        {/* Tagline */}
        <p
          style={{
            fontSize: 28,
            color: "#a3a3a3",
            marginTop: 0,
            textAlign: "center",
            maxWidth: 700,
          }}
        >
          Der Schweizer Waffenmarktplatz
        </p>

        {/* Features */}
        <div
          style={{
            display: "flex",
            gap: 40,
            marginTop: 40,
          }}
        >
          {["Kostenlose Inserate", "Privat & Händler", "Alle 26 Kantone"].map(
            (text) => (
              <div
                key={text}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                <div
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    backgroundColor: "#22c55e",
                  }}
                />
                <span style={{ fontSize: 20, color: "#d4d4d4" }}>{text}</span>
              </div>
            )
          )}
        </div>

        {/* Bottom URL */}
        <p
          style={{
            position: "absolute",
            bottom: 30,
            fontSize: 18,
            color: "#525252",
          }}
        >
          gunmarket.ch
        </p>
      </div>
    ),
    { ...size }
  );
}
