import type { ComponentProps, ReactNode } from "react"
import type { NextIntlClientProvider } from "next-intl"

export interface IntlProviderProps {
  children: ReactNode
  locale: string
  messages: NonNullable<
    ComponentProps<typeof NextIntlClientProvider>["messages"]
  >
}
