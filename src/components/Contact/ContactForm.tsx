"use client"

import type { FormEvent } from "react"
import { Send } from "lucide-react"
import { useTranslations } from "next-intl"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export function ContactForm() {
  const t = useTranslations("Contact")

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const name = String(formData.get("name") ?? "")
    const email = String(formData.get("email") ?? "")
    const message = String(formData.get("message") ?? "")
    const subject = encodeURIComponent(t("emailSubject", { name }))
    const body = encodeURIComponent(t("emailBody", { name, email, message }))

    // Backend iletişim servisi eklenene kadar mesajı kullanıcının e-posta istemcisine aktarır.
    window.location.href = `mailto:yasineryilmazfb@gmail.com?subject=${subject}&body=${body}`
  }

  return (
    <form className="mt-12 space-y-5 text-left" onSubmit={handleSubmit}>
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700 dark:text-slate-300" htmlFor="name">
            {t("nameLabel")}
          </label>
          <Input
            autoComplete="name"
            className="h-12 rounded-xl border-slate-200 bg-white px-4 shadow-sm transition-colors hover:border-slate-300 focus-visible:border-slate-400 focus-visible:ring-slate-200 dark:border-white/10 dark:bg-slate-900/70 dark:text-white dark:hover:border-white/20 dark:focus-visible:border-slate-600 dark:focus-visible:ring-slate-800"
            id="name"
            name="name"
            placeholder={t("namePlaceholder")}
            required
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700 dark:text-slate-300" htmlFor="email">
            {t("emailLabel")}
          </label>
          <Input
            autoComplete="email"
            className="h-12 rounded-xl border-slate-200 bg-white px-4 shadow-sm transition-colors hover:border-slate-300 focus-visible:border-slate-400 focus-visible:ring-slate-200 dark:border-white/10 dark:bg-slate-900/70 dark:text-white dark:hover:border-white/20 dark:focus-visible:border-slate-600 dark:focus-visible:ring-slate-800"
            id="email"
            name="email"
            placeholder={t("emailPlaceholder")}
            required
            type="email"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-700 dark:text-slate-300" htmlFor="message">
          {t("messageLabel")}
        </label>
        <Textarea
          className="min-h-36 resize-y rounded-xl border-slate-200 bg-white px-4 py-3 shadow-sm transition-colors hover:border-slate-300 focus-visible:border-slate-400 focus-visible:ring-slate-200 dark:border-white/10 dark:bg-slate-900/70 dark:text-white dark:hover:border-white/20 dark:focus-visible:border-slate-600 dark:focus-visible:ring-slate-800"
          id="message"
          name="message"
          placeholder={t("messagePlaceholder")}
          required
        />
      </div>

      <Button
        className="h-12 w-full rounded-xl bg-slate-950 px-6 text-sm font-medium text-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-slate-800 hover:shadow-lg dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200 motion-reduce:transform-none"
        type="submit"
      >
        {t("submitBtn")}
        <Send aria-hidden="true" data-icon="inline-end" />
      </Button>
    </form>
  )
}
