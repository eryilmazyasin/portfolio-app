import { getLocale, getMessages } from "next-intl/server"

import { Contact } from "@/components/Contact/Contact"
import { Experience } from "@/components/Experience/Experience"
import { Hero } from "@/components/Hero/Hero"
import { Navbar } from "@/components/Navbar/Navbar"
import { Projects } from "@/components/Projects/Projects"
import { Skills } from "@/components/Skills/Skills"
import { IntlProvider } from "@/providers/IntlProvider"
import { getPortfolioData } from "@/services/portfolio"

export default async function Home() {
  // Locale ve çeviri dosyaları cache'lenen portfolio verisinden bağımsız olarak paralel çözülür.
  const [locale, messages, { projects, experiences, skills }] =
    await Promise.all([getLocale(), getMessages(), getPortfolioData()])
  const activeLocale = locale === "tr" ? "tr" : "en"

  return (
    <IntlProvider locale={activeLocale} messages={messages}>
      <div className="min-h-svh bg-slate-50 text-slate-950 dark:bg-slate-950 dark:text-slate-50">
        <Navbar />
        <main>
          <Hero />
          <Skills skills={skills} />
          <Experience experiences={experiences} locale={activeLocale} />
          <Projects locale={activeLocale} projects={projects} />
          <Contact />
        </main>
      </div>
    </IntlProvider>
  )
}
