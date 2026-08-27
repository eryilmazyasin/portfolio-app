"use client"

import { useEffect, useRef } from "react"

const GRID_SIZE = 48

export function HeroGrid() {
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const grid = gridRef.current
    const hero = grid?.parentElement

    if (!grid || !hero) return

    const supportsHover = window.matchMedia(
      "(hover: hover) and (pointer: fine)"
    ).matches

    if (!supportsHover) return

    let animationFrameId = 0
    let latestPointerEvent: PointerEvent | null = null

    function updateGridPosition() {
      if (!latestPointerEvent) return

      const bounds = hero.getBoundingClientRect()
      const x = latestPointerEvent.clientX - bounds.left
      const y = latestPointerEvent.clientY - bounds.top
      const isInside =
        x >= 0 && x <= bounds.width && y >= 0 && y <= bounds.height

      grid.dataset.active = String(isInside)

      if (isInside) {
        grid.style.setProperty("--pointer-x", `${x}px`)
        grid.style.setProperty("--pointer-y", `${y}px`)
        grid.style.setProperty(
          "--grid-x",
          `${Math.round(x / GRID_SIZE) * GRID_SIZE}px`
        )
        grid.style.setProperty(
          "--grid-y",
          `${Math.round(y / GRID_SIZE) * GRID_SIZE}px`
        )
      }

      animationFrameId = 0
    }

    function handlePointerMove(event: PointerEvent) {
      latestPointerEvent = event

      // Görsel güncellemeleri ekran yenileme hızına sabitleyerek gereksiz layout işini önler.
      if (!animationFrameId) {
        animationFrameId = window.requestAnimationFrame(updateGridPosition)
      }
    }

    function handlePointerLeave() {
      grid.dataset.active = "false"
    }

    window.addEventListener("pointermove", handlePointerMove, { passive: true })
    document.documentElement.addEventListener("pointerleave", handlePointerLeave)

    return () => {
      window.cancelAnimationFrame(animationFrameId)
      window.removeEventListener("pointermove", handlePointerMove)
      document.documentElement.removeEventListener(
        "pointerleave",
        handlePointerLeave
      )
    }
  }, [])

  return (
    <div
      aria-hidden="true"
      className="hero-grid absolute inset-0 -z-20"
      data-active="false"
      ref={gridRef}
    >
      <div className="hero-grid__base absolute inset-0" />
      <div className="hero-grid__glow absolute inset-0" />
      <div className="hero-grid__spotlight absolute inset-0" />
      <div className="hero-grid__intersection absolute" />
    </div>
  )
}
