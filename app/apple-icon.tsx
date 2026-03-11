import { ImageResponse } from "next/og";

export const runtime = "edge";
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
          background: "#2F80ED",
          borderRadius: 36,
        }}
      >
        <span
          style={{
            fontSize: 110,
            fontWeight: 900,
            color: "white",
            lineHeight: 1,
          }}
        >
          A
        </span>
      </div>
    ),
    { ...size }
  );
}
