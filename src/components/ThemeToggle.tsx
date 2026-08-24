"use client"

import { Moon, Sun } from "lucide-react"
import { useTranslations } from "next-intl"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  const t = useTranslations("ThemeToggle")

  function toggleTheme() {
    setTheme(resolvedTheme === "dark" ? "light" : "dark")
  }

  return (
    <Button
      aria-label={t("toggle")}
      className="relative size-9 rounded-xl border-white/70 bg-white/70 text-slate-700 shadow-sm backdrop-blur-xl hover:border-slate-200 hover:bg-white hover:text-slate-950 dark:border-white/10 dark:bg-slate-900/75 dark:text-slate-300 dark:hover:border-white/20 dark:hover:bg-slate-800 dark:hover:text-white"
      onClick={toggleTheme}
      size="icon-lg"
      title={t("toggle")}
      variant="outline"
    >
      <Sun
        aria-hidden="true"
        className="size-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
      />
      <Moon
        aria-hidden="true"
        className="absolute size-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
      />
    </Button>
  )
}
