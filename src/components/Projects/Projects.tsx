import { ExternalLink, GitFork, Layers3 } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const projects = [
  {
    title: "EasyJot",
    description:
      "Next.js, Node.js, Drizzle ORM, Redis ve Docker kullanılarak geliştirilen, konteyner mimarisine sahip full-stack uygulama.",
    technologies: [
      "Next.js",
      "Node.js",
      "Drizzle ORM",
      "PostgreSQL",
      "Redis",
      "Docker",
    ],
  },
  {
    title: "Hotel Management Automation",
    description:
      "Oteller için React (TypeScript) ve Node.js tabanlı, uçtan uca rezervasyon ve operasyon yönetim sistemi.",
    technologies: ["React.js", "TypeScript", "Node.js", "MySQL"],
  },
] as const

export function Projects() {
  return (
    <section
      aria-labelledby="projects-title"
      className="border-t border-slate-200/80 bg-white px-4 py-24 font-sans sm:px-6 sm:py-32 lg:px-8"
      id="projects"
    >
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
              Seçilmiş çalışmalar
            </p>
            <h2
              className="mt-4 text-4xl font-semibold tracking-[-0.045em] text-slate-950 sm:text-5xl"
              id="projects-title"
            >
              Projeler
            </h2>
          </div>
          <p className="max-w-2xl text-pretty text-base leading-7 text-slate-600 lg:justify-self-end">
            Ürün ihtiyaçlarını sürdürülebilir frontend mimarileri, güvenilir
            backend servisleri ve production odaklı altyapılarla buluşturan
            seçilmiş projeler.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-5 lg:grid-cols-2">
          {projects.map((project, index) => (
            <Card
              className="group gap-0 rounded-2xl border border-slate-200/80 bg-white py-0 shadow-sm ring-0 transition-all duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-[0_20px_48px_rgba(15,23,42,0.12)] dark:hover:border-slate-700 motion-reduce:transform-none motion-reduce:transition-none"
              key={project.title}
            >
              <CardHeader className="gap-6 border-b border-slate-100 p-6 sm:p-8">
                <div className="flex items-center justify-between">
                  <div className="grid size-11 place-items-center rounded-xl border border-slate-200 bg-slate-50 text-slate-700 transition-colors group-hover:bg-slate-950 group-hover:text-white">
                    <Layers3 aria-hidden="true" className="size-5" />
                  </div>
                  <span className="font-mono text-xs font-medium text-slate-400">
                    0{index + 1}
                  </span>
                </div>

                <div>
                  <CardTitle className="text-2xl font-semibold tracking-[-0.035em] text-slate-950 sm:text-3xl">
                    {project.title}
                  </CardTitle>
                  <CardDescription className="mt-3 max-w-xl text-sm leading-6 text-slate-600 sm:text-base sm:leading-7">
                    {project.description}
                  </CardDescription>
                </div>
              </CardHeader>

              <CardContent className="flex-1 p-6 sm:p-8">
                <p className="mb-4 text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">
                  Teknoloji seti
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((technology) => (
                    <Badge
                      className="h-7 border-slate-200 bg-slate-50 px-2.5 text-xs font-medium text-slate-700"
                      key={technology}
                      variant="outline"
                    >
                      {technology}
                    </Badge>
                  ))}
                </div>
              </CardContent>

              <CardFooter className="gap-3 rounded-none border-t border-slate-100 bg-slate-50/70 p-5 sm:p-6">
                <Button
                  aria-label={`${project.title} GitHub bağlantısı yakında`}
                  className="h-9 rounded-lg px-3.5 transition-all duration-300 hover:border-slate-400 hover:bg-white hover:shadow-sm"
                  nativeButton={false}
                  render={<a href="#projects" title="GitHub bağlantısı yakında" />}
                  variant="outline"
                >
                  <GitFork aria-hidden="true" data-icon="inline-start" />
                  GitHub
                </Button>
                <Button
                  aria-label={`${project.title} canlı demo bağlantısı yakında`}
                  className="h-9 rounded-lg bg-slate-950 px-3.5 transition-all duration-300 hover:-translate-y-0.5 hover:bg-slate-700 hover:shadow-md motion-reduce:transform-none"
                  nativeButton={false}
                  render={<a href="#projects" title="Canlı demo bağlantısı yakında" />}
                >
                  Canlı Demo
                  <ExternalLink aria-hidden="true" data-icon="inline-end" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
