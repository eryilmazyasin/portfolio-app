import type { ComponentPropsWithRef } from "react"

export interface ScrollToSectionProps
  extends Omit<ComponentPropsWithRef<"button">, "type"> {
  targetId: string
  scrollBehavior?: ScrollBehavior
}
