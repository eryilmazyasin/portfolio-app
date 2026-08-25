"use client"

import { useEffect } from "react"
import { NextIntlClientProvider } from "next-intl"

import type { IntlProviderProps } from "@/providers/IntlProvider.types"

export function IntlProvider({
  children,
  locale,
  messages,
}: IntlProviderProps) {
  useEffect(() => {
    // Root layout navigasyonlar arasında korunduğu için belge dilini aktif locale ile istemcide eşitler.
    document.documentElement.lang = locale
  }, [locale])

  return (
    <NextIntlClientProvider
      key={locale}
      locale={locale}
      messages={messages}
    >
      {children}
    </NextIntlClientProvider>
  )
}
