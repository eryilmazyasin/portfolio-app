import { ImageResponse } from "next/og"

export const size = {
  width: 32,
  height: 32,
}

export const contentType = "image/png"

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100%",
          border: "1px solid rgba(52, 211, 153, 0.42)",
          borderRadius: 8,
          color: "#f8fafc",
          background: "linear-gradient(145deg, #111827 0%, #020617 100%)",
          fontFamily: "sans-serif",
          fontSize: 13,
          fontWeight: 800,
          letterSpacing: "-0.08em",
        }}
      >
        {/* İki harf küçük favicon ölçüsünde dahi okunabilir, kişisel ve geliştirici odaklı bir işaret oluşturur. */}
        <span>Y</span>
        <span style={{ color: "#34d399" }}>E</span>
      </div>
    ),
    size
  )
}
