import { ImageResponse } from "next/og"

export const size = {
  width: 180,
  height: 180,
}

export const contentType = "image/png"

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100%",
          overflow: "hidden",
          borderRadius: 40,
          color: "#f8fafc",
          backgroundColor: "#090d16",
          fontFamily: "sans-serif",
        }}
      >
        {/* Emerald ışık katmanı portfolyonun koyu slate görsel dilini küçük ölçekte sürdürür. */}
        <div
          style={{
            position: "absolute",
            right: -48,
            bottom: -48,
            display: "flex",
            width: 150,
            height: 150,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(52, 211, 153, 0.32) 0%, rgba(52, 211, 153, 0) 70%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 8,
            display: "flex",
            border: "1px solid rgba(148, 163, 184, 0.18)",
            borderRadius: 33,
          }}
        />
        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              fontSize: 66,
              fontWeight: 800,
              letterSpacing: "-0.08em",
              lineHeight: 1,
            }}
          >
            <span>Y</span>
            <span style={{ color: "#34d399" }}>E</span>
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 12,
              color: "#94a3b8",
              fontSize: 13,
              fontWeight: 700,
              letterSpacing: "0.22em",
            }}
          >
            &lt;/DEV&gt;
          </div>
        </div>
      </div>
    ),
    size
  )
}
