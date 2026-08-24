import { Contact } from "@/components/Contact/Contact"
import { Experience } from "@/components/Experience/Experience"
import { Hero } from "@/components/Hero/Hero"
import { Navbar } from "@/components/Navbar/Navbar"
import { Projects } from "@/components/Projects/Projects"
import { Skills } from "@/components/Skills/Skills"

export default function Home() {
  return (
    <div className="min-h-svh bg-slate-50 text-slate-950 dark:bg-slate-950 dark:text-slate-50">
      <Navbar />
      <main>
        <Hero />
        <Skills />
        <Experience />
        <Projects />
        <Contact />
      </main>
    </div>
  )
}
