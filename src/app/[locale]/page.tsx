import { notFound } from "next/navigation"

import Home from "../page"
import type { LocaleRouteProps, SupportedLocale } from "./types"

function isSupportedLocale(locale: string): locale is SupportedLocale {
  return locale === "en" || locale === "tr"
}

export default async function LocalizedHome({ params }: LocaleRouteProps) {
  const { locale } = await params

  if (!isSupportedLocale(locale)) notFound()

  return <Home />
}
