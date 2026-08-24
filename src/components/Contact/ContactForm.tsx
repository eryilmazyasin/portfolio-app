"use client"

import { useActionState, useEffect, useRef } from "react"
import { CircleCheck, LoaderCircle, Send, TriangleAlert } from "lucide-react"
import { useTranslations } from "next-intl"

import { submitContactForm } from "@/actions/contact"
import type { ContactActionResult } from "@/actions/contact.types"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

const initialState: ContactActionResult | null = null

export function ContactForm() {
  const t = useTranslations("Contact")
  const formRef = useRef<HTMLFormElement>(null)
  const [state, formAction, isPending] = useActionState(
    submitContactForm,
    initialState
  )

  // Başarılı kayıt sonrasında uncontrolled form alanlarını DOM form API'siyle temizler.
  useEffect(() => {
    if (state?.success) {
      formRef.current?.reset()
    }
  }, [state])

  return (
    <form
      action={formAction}
      className="mt-12 space-y-5 text-left"
      ref={formRef}
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700 dark:text-slate-300" htmlFor="name">
            {t("nameLabel")}
          </label>
          <Input
            autoComplete="name"
            className="h-12 rounded-xl border-slate-200 bg-white px-4 shadow-sm transition-colors hover:border-slate-300 focus-visible:border-slate-400 focus-visible:ring-slate-200 dark:border-white/10 dark:bg-slate-900/70 dark:text-white dark:hover:border-white/20 dark:focus-visible:border-slate-600 dark:focus-visible:ring-slate-800"
            id="name"
            maxLength={100}
            minLength={2}
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
            maxLength={254}
            name="email"
            placeholder={t("emailPlaceholder")}
            required
            type="email"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-700 dark:text-slate-300" htmlFor="subject">
          {t("subjectLabel")}
        </label>
        <Input
          className="h-12 rounded-xl border-slate-200 bg-white px-4 shadow-sm transition-colors hover:border-slate-300 focus-visible:border-slate-400 focus-visible:ring-slate-200 dark:border-white/10 dark:bg-slate-900/70 dark:text-white dark:hover:border-white/20 dark:focus-visible:border-slate-600 dark:focus-visible:ring-slate-800"
          id="subject"
          maxLength={160}
          minLength={3}
          name="subject"
          placeholder={t("subjectPlaceholder")}
          required
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-700 dark:text-slate-300" htmlFor="message">
          {t("messageLabel")}
        </label>
        <Textarea
          className="min-h-36 resize-y rounded-xl border-slate-200 bg-white px-4 py-3 shadow-sm transition-colors hover:border-slate-300 focus-visible:border-slate-400 focus-visible:ring-slate-200 dark:border-white/10 dark:bg-slate-900/70 dark:text-white dark:hover:border-white/20 dark:focus-visible:border-slate-600 dark:focus-visible:ring-slate-800"
          id="message"
          maxLength={5000}
          minLength={10}
          name="message"
          placeholder={t("messagePlaceholder")}
          required
        />
      </div>

      {state && (
        <p
          aria-live="polite"
          className={`flex items-center gap-2 rounded-xl border px-4 py-3 text-sm ${
            state.success
              ? "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950/50 dark:text-emerald-300"
              : "border-red-200 bg-red-50 text-red-700 dark:border-red-900 dark:bg-red-950/50 dark:text-red-300"
          }`}
        >
          {state.success ? (
            <CircleCheck aria-hidden="true" className="size-4 shrink-0" />
          ) : (
            <TriangleAlert aria-hidden="true" className="size-4 shrink-0" />
          )}
          {state.success ? t("successMessage") : state.error}
        </p>
      )}

      <Button
        className="h-12 w-full rounded-xl bg-slate-950 px-6 text-sm font-medium text-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-slate-800 hover:shadow-lg dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200 motion-reduce:transform-none"
        disabled={isPending}
        type="submit"
      >
        {isPending ? (
          <LoaderCircle aria-hidden="true" className="animate-spin" />
        ) : (
          <Send aria-hidden="true" data-icon="inline-start" />
        )}
        {isPending ? t("submitting") : t("submitBtn")}
      </Button>
    </form>
  )
}
