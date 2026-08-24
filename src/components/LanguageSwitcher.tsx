"use client"

import { Languages } from "lucide-react"
import { useLocale, useTranslations } from "next-intl"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"

const ONE_YEAR_IN_SECONDS = 60 * 60 * 24 * 365

export function LanguageSwitcher() {
  const locale = useLocale()
  const router = useRouter()
  const t = useTranslations("LanguageSwitcher")

  function toggleLanguage() {
    const nextLocale = locale === "en" ? "tr" : "en"

    // Tercihi temiz URL yapısını değiştirmeden bir yıl boyunca tarayıcıda saklar.
    document.cookie = `NEXT_LOCALE=${nextLocale}; path=/; max-age=${ONE_YEAR_IN_SECONDS}; SameSite=Lax`
    router.refresh()
  }

  const nextLocale = locale === "en" ? "TR" : "EN"

  return (
    <Button
      aria-label={t("switchTo", { locale: nextLocale })}
      className="h-9 rounded-xl border-white/70 bg-white/70 px-3 text-xs font-semibold tracking-[0.08em] text-slate-700 shadow-sm backdrop-blur-xl hover:border-slate-200 hover:bg-white hover:text-slate-950 dark:border-white/10 dark:bg-slate-900/75 dark:text-slate-300 dark:hover:border-white/20 dark:hover:bg-slate-800 dark:hover:text-white"
      onClick={toggleLanguage}
      size="sm"
      variant="outline"
    >
      <Languages aria-hidden="true" data-icon="inline-start" />
      {nextLocale}
    </Button>
  )
}
