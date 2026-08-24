"use client"

import { useEffect, useRef, useState } from "react"
import { Check, Copy, Mail } from "lucide-react"
import { useTranslations } from "next-intl"

import { Button } from "@/components/ui/button"

const CONTACT_EMAIL = "yasineryilmazfb@gmail.com"

export function EmailContact() {
  const t = useTranslations("Contact")
  const [isCopied, setIsCopied] = useState(false)
  const resetTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    return () => {
      if (resetTimerRef.current) clearTimeout(resetTimerRef.current)
    }
  }, [])

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(CONTACT_EMAIL)
      setIsCopied(true)

      // Art arda tıklamalarda yalnızca son geri bildirim zamanlayıcısını aktif tutar.
      if (resetTimerRef.current) clearTimeout(resetTimerRef.current)
      resetTimerRef.current = setTimeout(() => setIsCopied(false), 2000)
    } catch (error) {
      console.error("Failed to copy email address:", error)
    }
  }

  return (
    <div className="mt-7 flex flex-col items-center justify-center gap-2 sm:flex-row">
      <a
        className="inline-flex h-10 items-center gap-2 rounded-xl border border-slate-200 bg-white/70 px-4 text-sm font-medium text-slate-700 shadow-sm backdrop-blur-xl transition-colors hover:border-slate-300 hover:bg-white hover:text-slate-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 dark:border-white/10 dark:bg-slate-900/70 dark:text-slate-300 dark:hover:border-white/20 dark:hover:bg-slate-800 dark:hover:text-white"
        href={`mailto:${CONTACT_EMAIL}`}
      >
        <Mail aria-hidden="true" className="size-4" />
        {CONTACT_EMAIL}
      </a>

      <Button
        aria-label={isCopied ? t("emailCopied") : t("copyEmail")}
        className="h-10 rounded-xl border-slate-200 bg-white/70 px-3.5 text-slate-700 shadow-sm backdrop-blur-xl hover:border-slate-300 hover:bg-white hover:text-slate-950 dark:border-white/10 dark:bg-slate-900/70 dark:text-slate-300 dark:hover:border-white/20 dark:hover:bg-slate-800 dark:hover:text-white"
        onClick={handleCopy}
        type="button"
        variant="outline"
      >
        {isCopied ? (
          <Check aria-hidden="true" data-icon="inline-start" />
        ) : (
          <Copy aria-hidden="true" data-icon="inline-start" />
        )}
        {isCopied ? t("emailCopied") : t("copyEmail")}
      </Button>
    </div>
  )
}
