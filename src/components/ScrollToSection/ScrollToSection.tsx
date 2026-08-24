"use client"

import type { MouseEvent } from "react"

import type { ScrollToSectionProps } from "@/components/ScrollToSection/ScrollToSection.types"

export function ScrollToSection({
  onClick,
  scrollBehavior = "smooth",
  targetId,
  ...buttonProps
}: ScrollToSectionProps) {
  function handleClick(event: MouseEvent<HTMLButtonElement>) {
    onClick?.(event)

    if (event.defaultPrevented) return

    const target = document.getElementById(targetId)
    if (!target) return

    // Hareket azaltma tercihi olan kullanıcılar için animasyonsuz geçiş yapılır.
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches

    target.scrollIntoView({
      behavior: prefersReducedMotion ? "auto" : scrollBehavior,
      block: "start",
    })
  }

  return <button {...buttonProps} onClick={handleClick} type="button" />
}
