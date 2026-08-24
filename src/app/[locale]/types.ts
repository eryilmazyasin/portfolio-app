import type { ReactNode } from "react"

export type SupportedLocale = "en" | "tr"

export interface LocaleRouteProps {
  params: Promise<{ locale: string }>
}

export interface LocaleLayoutProps extends LocaleRouteProps {
  children: ReactNode
}
