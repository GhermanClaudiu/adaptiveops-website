import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "AdaptiveOps — Operational Excellence through Training, Coaching and Digital Solutions";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#0B1F3B",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "Inter, sans-serif",
        }}
      >
        {/* Accent bar top */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 6,
            background: "#2F80ED",
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
              width: 56,
              height: 56,
              borderRadius: 12,
              background: "#2F80ED",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontSize: 28,
              fontWeight: 900,
            }}
          >
            A
          </div>
          <span
            style={{
              fontSize: 40,
              fontWeight: 700,
              color: "white",
              letterSpacing: "-0.02em",
            }}
          >
            Adaptive
            <span style={{ color: "#2F80ED" }}>Ops</span>
          </span>
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: 24,
            color: "rgba(255,255,255,0.6)",
            textAlign: "center",
            maxWidth: 700,
            lineHeight: 1.4,
          }}
        >
          Operational Excellence through Training, Coaching and Digital Solutions
        </div>

        {/* ECO badges */}
        <div
          style={{
            display: "flex",
            gap: 12,
            marginTop: 40,
          }}
        >
          {[
            { abbr: "QMS", color: "#1565C0" },
            { abbr: "EMS", color: "#E65100" },
            { abbr: "MMS", color: "#6A1B9A" },
            { abbr: "PMS", color: "#2E7D32" },
            { abbr: "OMS", color: "#558B2F" },
            { abbr: "CIS", color: "#00695C" },
          ].map((sys) => (
            <div
              key={sys.abbr}
              style={{
                padding: "8px 16px",
                borderRadius: 20,
                background: `${sys.color}30`,
                border: `1px solid ${sys.color}60`,
                color: "white",
                fontSize: 14,
                fontWeight: 600,
              }}
            >
              {sys.abbr}
            </div>
          ))}
        </div>

        {/* URL */}
        <div
          style={{
            position: "absolute",
            bottom: 32,
            fontSize: 16,
            color: "rgba(255,255,255,0.3)",
          }}
        >
          adaptiveops.eu
        </div>
      </div>
    ),
    { ...size }
  );
}
