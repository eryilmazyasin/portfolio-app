import { ArrowUpRight, BriefcaseBusiness, GitFork } from "lucide-react"
import { useTranslations } from "next-intl"

import { ContactForm } from "@/components/Contact/ContactForm"
import { EmailContact } from "@/components/Contact/EmailContact"
import { ScrollToSection } from "@/components/ScrollToSection/ScrollToSection"

const socialLinks = [
  { label: "GitHub", href: "https://github.com/eryilmazyasin", icon: GitFork },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/eryilmazyasin/", icon: BriefcaseBusiness },
] as const

export function Contact() {
  const t = useTranslations("Contact")

  return (
    <section
      aria-labelledby="contact-title"
      className="border-t border-slate-200 bg-[#edf2f3] px-4 pt-20 dark:border-slate-800 dark:bg-[#17252b] sm:px-6 sm:pt-28 lg:px-8"
      id="contact"
    >
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-8 md:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] md:gap-16">
          <div data-scroll-reveal>
            <p className="text-sm font-medium text-[#315f72] dark:text-[#b9d4dd]">{t("eyebrow")}</p>
            <h2 className="mt-3 text-4xl font-semibold tracking-[-0.055em] text-slate-950 dark:text-slate-50 sm:text-5xl" id="contact-title">
              {t("title")}
            </h2>
            <p className="mt-5 max-w-[45ch] text-pretty text-base leading-7 text-slate-600 dark:text-slate-300">{t("subtitle")}</p>
            <EmailContact />
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-900/65 sm:p-8" data-scroll-reveal>
            <ContactForm />
          </div>
        </div>

        <footer className="mt-20 flex flex-col gap-5 border-t border-slate-300 py-8 text-sm text-slate-600 dark:border-slate-600 dark:text-slate-300 sm:mt-28 sm:flex-row sm:items-center sm:justify-between">
          <p>{t("copyright")}</p>
          <nav aria-label={t("socialNavigationLabel")} className="flex items-center gap-4">
            {socialLinks.map((link) => {
              const Icon = link.icon
              return (
                <a className="group inline-flex items-center gap-2 font-medium text-slate-700 underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 dark:text-slate-200" href={link.href} key={link.label} rel="noreferrer" target="_blank">
                  <Icon aria-hidden="true" className="size-4" />
                  {link.label}
                  <ArrowUpRight aria-hidden="true" className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transform-none" />
                </a>
              )
            })}
          </nav>
          <ScrollToSection aria-label={t("backToTop")} className="sr-only focus:not-sr-only focus:rounded-lg focus:bg-white focus:px-3 focus:py-2 focus:text-slate-950 dark:focus:bg-slate-900 dark:focus:text-white" targetId="top">
            {t("backToTop")}
          </ScrollToSection>
        </footer>
      </div>
    </section>
  )
}
