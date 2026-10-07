"use client";

import { useActionState, useEffect, useRef } from 'react';

import { submitContactForm } from '@/actions/contact';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { CircleCheck, LoaderCircle, Send, TriangleAlert } from 'lucide-react';
import { useTranslations } from 'next-intl';

import type { ContactActionResult } from "@/actions/contact.types";
const initialState: ContactActionResult | null = null;

export function ContactForm() {
  const t = useTranslations("Contact");
  const formRef = useRef<HTMLFormElement>(null);
  const [state, formAction, isPending] = useActionState(
    submitContactForm,
    initialState,
  );

  // Başarılı kayıt sonrasında uncontrolled form alanlarını DOM form API'siyle temizler.
  useEffect(() => {
    if (state?.success) {
      formRef.current?.reset();
    }
  }, [state]);

  return (
    <form
      action={formAction}
      className="space-y-5 text-left"
      ref={formRef}
    >
      {/* Bot Tuzağı: Kullanıcı görmez, botlar doldurursa Action DB'ye kaydetmeden başarılı döner */}
      <div className="hidden" aria-hidden="true">
        <input type="text" name="botField" tabIndex={-1} autoComplete="off" />
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <label
            className="block text-sm font-medium text-slate-700 dark:text-slate-300"
            htmlFor="name"
          >
            {t("nameLabel")}
          </label>
          <Input
            autoComplete="name"
            className="h-12 rounded-lg border border-slate-300 bg-white px-4 shadow-sm transition-colors hover:border-slate-400 focus-visible:border-slate-500 dark:border-white/10 dark:bg-slate-900/70 dark:text-white dark:hover:border-white/20 dark:focus-visible:border-slate-600"
            id="name"
            maxLength={100}
            minLength={2}
            name="name"
            placeholder={t("namePlaceholder")}
            required
          />
        </div>

        <div className="space-y-2">
          <label
            className="block text-sm font-medium text-slate-700 dark:text-slate-300"
            htmlFor="email"
          >
            {t("emailLabel")}
          </label>
          <Input
            autoComplete="email"
            className="h-12 rounded-lg border border-slate-300 bg-white px-4 shadow-sm transition-colors hover:border-slate-400 focus-visible:border-slate-500 dark:border-white/10 dark:bg-slate-900/70 dark:text-white dark:hover:border-white/20 dark:focus-visible:border-slate-600"
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
        <label
          className="block text-sm font-medium text-slate-700 dark:text-slate-300"
          htmlFor="subject"
        >
          {t("subjectLabel")}
        </label>
        <Input
          className="h-12 rounded-lg border border-slate-300 bg-white px-4 shadow-sm transition-colors hover:border-slate-400 focus-visible:border-slate-500 dark:border-white/10 dark:bg-slate-900/70 dark:text-white dark:hover:border-white/20 dark:focus-visible:border-slate-600"
          id="subject"
          maxLength={160}
          minLength={3}
          name="subject"
          placeholder={t("subjectPlaceholder")}
          required
        />
      </div>

      <div className="space-y-2">
        <label
          className="block text-sm font-medium text-slate-700 dark:text-slate-300"
          htmlFor="message"
        >
          {t("messageLabel")}
        </label>
        <Textarea
          className="min-h-36 resize-y rounded-lg border border-slate-300 bg-white px-4 py-3 shadow-sm transition-colors hover:border-slate-400 focus-visible:border-slate-500 dark:border-white/10 dark:bg-slate-900/70 dark:text-white dark:hover:border-white/20 dark:focus-visible:border-slate-600"
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
          className={`flex items-center gap-2 rounded-lg border px-4 py-3 text-sm ${
            state.success
              ? "border-emerald-500 bg-emerald-100 text-emerald-700 dark:border-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-300"
              : "border-red-500 bg-red-100 text-red-700 dark:border-red-600 dark:bg-red-900/20 dark:text-red-300"
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
        className="h-12 w-full rounded-lg bg-[#315f72] px-6 text-sm font-semibold text-white transition-colors duration-200 hover:bg-[#254d5e] active:scale-[0.98] dark:bg-[#b9d4dd] dark:text-[#17252b] dark:hover:bg-[#d7e8ed] motion-reduce:transform-none"
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
  );
}
