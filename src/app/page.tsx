import { getLocale } from "next-intl/server"

import { Contact } from "@/components/Contact/Contact"
import { Experience } from "@/components/Experience/Experience"
import { Hero } from "@/components/Hero/Hero"
import { Navbar } from "@/components/Navbar/Navbar"
import { Projects } from "@/components/Projects/Projects"
import { Skills } from "@/components/Skills/Skills"
import {
  getExperiences,
  getProjects,
  getSkills,
} from "@/services/portfolio"

export default async function Home() {
  // Bağımsız sorgular Promise.all ile aynı anda başlatılarak toplam bekleme süresi azaltılır.
  const portfolioDataPromise = Promise.all([
    getProjects(true),
    getExperiences(),
    getSkills(),
  ])
  const [locale, [projects, experiences, skills]] = await Promise.all([
    getLocale(),
    portfolioDataPromise,
  ])
  const activeLocale = locale === "tr" ? "tr" : "en"

  return (
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
  )
}
