import { ImageResponse } from "next/og"

import type { LocaleRouteProps } from "./types"

export const runtime = "edge"

export const alt = "Yasin Eryılmaz — Frontend & Full-Stack Developer"

export const size = {
  width: 1200,
  height: 630,
}

export const contentType = "image/png"

const technologies = [
  "React",
  "Next.js",
  "TypeScript",
  "Node.js",
  "PostgreSQL",
  "Docker",
]

export default async function OpenGraphImage({ params }: LocaleRouteProps) {
  const { locale } = await params
  const localeLabel = locale === "tr" ? "TR" : "EN"

  return new ImageResponse(
    (
      <div
        style={{
          position: "relative",
          display: "flex",
          width: "100%",
          height: "100%",
          overflow: "hidden",
          color: "#f8fafc",
          backgroundColor: "#09090b",
          fontFamily: "sans-serif",
        }}
      >
        {/* Izgara ve ışık katmanları marka içeriğini gölgelemeyen teknik bir derinlik oluşturur. */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            opacity: 0.18,
            backgroundImage:
              "linear-gradient(rgba(148, 163, 184, 0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(148, 163, 184, 0.2) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: -220,
            right: -100,
            display: "flex",
            width: 620,
            height: 620,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(59, 130, 246, 0.28) 0%, rgba(59, 130, 246, 0) 68%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -260,
            left: -140,
            display: "flex",
            width: 680,
            height: 680,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(16, 185, 129, 0.2) 0%, rgba(16, 185, 129, 0) 68%)",
          }}
        />

        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: "100%",
            padding: "72px 80px 58px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                color: "#a1a1aa",
                fontSize: 20,
                fontWeight: 600,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
              }}
            >
              <span
                style={{
                  display: "flex",
                  width: 10,
                  height: 10,
                  borderRadius: "50%",
                  backgroundColor: "#22c55e",
                  boxShadow: "0 0 22px rgba(34, 197, 94, 0.9)",
                }}
              />
              Available for selected projects
            </div>
            <div
              style={{
                display: "flex",
                border: "1px solid rgba(255, 255, 255, 0.14)",
                borderRadius: 999,
                padding: "8px 14px",
                color: "#a1a1aa",
                fontSize: 17,
                fontWeight: 700,
                letterSpacing: "0.12em",
              }}
            >
              {localeLabel}
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                display: "flex",
                marginBottom: 12,
                color: "#ffffff",
                fontSize: 70,
                fontWeight: 800,
                letterSpacing: "-0.045em",
                lineHeight: 1,
              }}
            >
              Yasin Eryılmaz
            </div>
            <div
              style={{
                display: "flex",
                color: "#a1a1aa",
                fontSize: 34,
                fontWeight: 500,
                letterSpacing: "-0.025em",
              }}
            >
              Frontend &amp; Full-Stack Developer
            </div>

            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 12,
                marginTop: 38,
              }}
            >
              {technologies.map((technology) => (
                <div
                  key={technology}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    border: "1px solid rgba(255, 255, 255, 0.12)",
                    borderRadius: 999,
                    padding: "10px 18px",
                    color: "#d4d4d8",
                    backgroundColor: "rgba(24, 24, 27, 0.72)",
                    fontSize: 18,
                    fontWeight: 600,
                  }}
                >
                  {technology}
                </div>
              ))}
            </div>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              borderTop: "1px solid rgba(255, 255, 255, 0.1)",
              paddingTop: 24,
              color: "#a1a1aa",
              fontSize: 20,
              fontWeight: 600,
            }}
          >
            <span>yasineryilmaz.com</span>
            <span style={{ color: "#52525b" }}>Design · Build · Ship</span>
          </div>
        </div>
      </div>
    ),
    size
  )
}
