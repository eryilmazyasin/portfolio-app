import Link from "next/link"
import { ArrowUpRight, BriefcaseBusiness, GitFork, Mail } from "lucide-react"

import { ContactForm } from "@/components/Contact/ContactForm"

const socialLinks = [
  {
    label: "GitHub",
    href: "https://github.com/eryilmazyasin",
    icon: GitFork,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/eryilmazyasin/",
    icon: BriefcaseBusiness,
  },
] as const

export function Contact() {
  return (
    <section
      aria-labelledby="contact-title"
      className="border-t border-slate-200/80 bg-slate-50 px-4 pt-24 font-sans sm:px-6 sm:pt-32 lg:px-8"
      id="contact"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mx-auto grid size-12 place-items-center rounded-2xl border border-slate-200 bg-white text-slate-700 shadow-sm">
            <Mail aria-hidden="true" className="size-5" />
          </div>
          <p className="mt-6 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
            Birlikte çalışalım
          </p>
          <h2
            className="mt-4 text-4xl font-semibold tracking-[-0.045em] text-slate-950 sm:text-5xl"
            id="contact-title"
          >
            İletişime Geç
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-pretty text-base leading-7 text-slate-600">
            Yeni bir ürün, mevcut bir sistemi ölçeklendirme veya teknik iş
            birliği için projenizi paylaşın. En kısa sürede dönüş yapacağım.
          </p>

          <ContactForm />
        </div>

        <footer className="mt-24 flex flex-col gap-5 border-t border-slate-200 py-8 text-sm text-slate-500 sm:mt-32 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Yasin Eryılmaz. Tüm hakları saklıdır.</p>

          <nav aria-label="Sosyal medya bağlantıları" className="flex items-center gap-2">
            {socialLinks.map((link) => {
              const Icon = link.icon

              return (
                <a
                  className="group inline-flex h-9 items-center gap-2 rounded-lg px-3 font-medium text-slate-600 transition-colors hover:bg-white hover:text-slate-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400"
                  href={link.href}
                  key={link.label}
                  rel="noreferrer"
                  target="_blank"
                >
                  <Icon aria-hidden="true" className="size-4" />
                  {link.label}
                  <ArrowUpRight
                    aria-hidden="true"
                    className="size-3.5 text-slate-400 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transform-none"
                  />
                </a>
              )
            })}
          </nav>

          <Link
            aria-label="Sayfanın başına dön"
            className="sr-only focus:not-sr-only focus:rounded-lg focus:bg-white focus:px-3 focus:py-2 focus:text-slate-950"
            href="#top"
          >
            Başa dön
          </Link>
        </footer>
      </div>
    </section>
  )
}
