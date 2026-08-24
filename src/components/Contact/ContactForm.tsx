"use client"

import type { FormEvent } from "react"
import { Send } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

function handleSubmit(event: FormEvent<HTMLFormElement>) {
  event.preventDefault()

  const formData = new FormData(event.currentTarget)
  const name = String(formData.get("name") ?? "")
  const email = String(formData.get("email") ?? "")
  const message = String(formData.get("message") ?? "")
  const subject = encodeURIComponent(`Portfolyo iletişim — ${name}`)
  const body = encodeURIComponent(
    `İsim: ${name}\nE-posta: ${email}\n\nMesaj:\n${message}`
  )

  // Backend iletişim servisi eklenene kadar mesajı kullanıcının e-posta istemcisine aktarır.
  window.location.href = `mailto:yasineryilmazfb@gmail.com?subject=${subject}&body=${body}`
}

export function ContactForm() {
  return (
    <form className="mt-12 space-y-5 text-left" onSubmit={handleSubmit}>
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700" htmlFor="name">
            İsim
          </label>
          <Input
            autoComplete="name"
            className="h-12 rounded-xl border-slate-200 bg-white px-4 shadow-sm transition-colors hover:border-slate-300 focus-visible:border-slate-400 focus-visible:ring-slate-200"
            id="name"
            name="name"
            placeholder="Adınız ve soyadınız"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700" htmlFor="email">
            E-posta
          </label>
          <Input
            autoComplete="email"
            className="h-12 rounded-xl border-slate-200 bg-white px-4 shadow-sm transition-colors hover:border-slate-300 focus-visible:border-slate-400 focus-visible:ring-slate-200"
            id="email"
            name="email"
            placeholder="ornek@email.com"
            required
            type="email"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-700" htmlFor="message">
          Mesaj
        </label>
        <Textarea
          className="min-h-36 resize-y rounded-xl border-slate-200 bg-white px-4 py-3 shadow-sm transition-colors hover:border-slate-300 focus-visible:border-slate-400 focus-visible:ring-slate-200"
          id="message"
          name="message"
          placeholder="Projenizden ve birlikte nasıl çalışabileceğimizden bahsedin."
          required
        />
      </div>

      <Button
        className="h-12 w-full rounded-xl bg-slate-950 px-6 text-sm font-medium text-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-slate-800 hover:shadow-lg motion-reduce:transform-none"
        type="submit"
      >
        Mesaj Gönder
        <Send aria-hidden="true" data-icon="inline-end" />
      </Button>
    </form>
  )
}
