import { ExternalLink, GitFork, Layers3 } from "lucide-react"
import { useTranslations } from "next-intl"

import type { ProjectsProps } from "@/components/Projects/Projects.types"
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

export function Projects({ locale, projects }: ProjectsProps) {
  const t = useTranslations("Projects")

  return (
    <section
      aria-labelledby="projects-title"
      className="border-t border-slate-200/80 bg-white px-4 py-24 font-sans dark:border-white/10 dark:bg-slate-900/40 sm:px-6 sm:py-32 lg:px-8"
      id="projects"
    >
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
              {t("sectionTitle")}
            </p>
            <h2
              className="mt-4 text-4xl font-semibold tracking-[-0.045em] text-slate-950 dark:text-white sm:text-5xl"
              id="projects-title"
            >
              {t("title")}
            </h2>
          </div>
          <p className="max-w-2xl text-pretty text-base leading-7 text-slate-600 dark:text-slate-400 lg:justify-self-end">
            {t("description")}
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-5 lg:grid-cols-2">
          {projects.map((project, index) => {
            const title = locale === "tr" ? project.titleTr : project.titleEn
            const summary =
              locale === "tr"
                ? project.summaryTr ?? project.descriptionTr
                : project.summaryEn ?? project.descriptionEn

            return (
            <Card
              className="group gap-0 rounded-2xl border border-slate-200/80 bg-white py-0 shadow-sm ring-0 transition-all duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-[0_20px_48px_rgba(15,23,42,0.12)] dark:border-white/10 dark:bg-slate-950/70 dark:shadow-[0_8px_28px_rgba(0,0,0,0.18)] dark:hover:border-slate-600 dark:hover:shadow-[0_20px_48px_rgba(0,0,0,0.32)] motion-reduce:transform-none motion-reduce:transition-none"
              key={project.slug}
            >
              <CardHeader className="gap-6 border-b border-slate-100 p-6 dark:border-white/10 sm:p-8">
                <div className="flex items-center justify-between">
                  <div className="grid size-11 place-items-center rounded-xl border border-slate-200 bg-slate-50 text-slate-700 transition-colors group-hover:bg-slate-950 group-hover:text-white dark:border-white/10 dark:bg-slate-900 dark:text-slate-300 dark:group-hover:bg-white dark:group-hover:text-slate-950">
                    <Layers3 aria-hidden="true" className="size-5" />
                  </div>
                  <span className="font-mono text-xs font-medium text-slate-400 dark:text-slate-500">
                    0{index + 1}
                  </span>
                </div>

                <div>
                  <CardTitle className="text-2xl font-semibold tracking-[-0.035em] text-slate-950 dark:text-white sm:text-3xl">
                    {title}
                  </CardTitle>
                  <CardDescription className="mt-3 max-w-xl text-sm leading-6 text-slate-600 dark:text-slate-400 sm:text-base sm:leading-7">
                    {summary}
                  </CardDescription>
                </div>
              </CardHeader>

              <CardContent className="flex-1 p-6 sm:p-8">
                <p className="mb-4 text-xs font-semibold uppercase tracking-[0.14em] text-slate-400 dark:text-slate-500">
                  {t("techStack")}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((technology) => (
                    <Badge
                      className="h-7 border-slate-200 bg-slate-50 px-2.5 text-xs font-medium text-slate-700 dark:border-white/10 dark:bg-slate-900 dark:text-slate-300"
                      key={technology}
                      variant="outline"
                    >
                      {technology}
                    </Badge>
                  ))}
                </div>
              </CardContent>

              {(project.githubUrl || project.liveUrl) && (
                <CardFooter className="gap-3 rounded-none border-t border-slate-100 bg-slate-50/70 p-5 dark:border-white/10 dark:bg-slate-900/70 sm:p-6">
                  {project.githubUrl && (
                    <Button
                      aria-label={t("githubAria", { project: title })}
                      className="h-9 rounded-lg px-3.5 transition-all duration-300 hover:border-slate-400 hover:bg-white hover:shadow-sm dark:border-white/10 dark:bg-slate-950/60 dark:text-slate-300 dark:hover:border-white/20 dark:hover:bg-slate-800 dark:hover:text-white"
                      nativeButton={false}
                      render={
                        <a
                          href={project.githubUrl}
                          rel="noreferrer"
                          target="_blank"
                        />
                      }
                      variant="outline"
                    >
                      <GitFork aria-hidden="true" data-icon="inline-start" />
                      {t("github")}
                    </Button>
                  )}
                  {project.liveUrl && (
                    <Button
                      aria-label={t("liveDemoAria", { project: title })}
                      className="h-9 rounded-lg bg-slate-950 px-3.5 transition-all duration-300 hover:-translate-y-0.5 hover:bg-slate-700 hover:shadow-md dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200 motion-reduce:transform-none"
                      nativeButton={false}
                      render={
                        <a
                          href={project.liveUrl}
                          rel="noreferrer"
                          target="_blank"
                        />
                      }
                    >
                      {t("liveDemo")}
                      <ExternalLink aria-hidden="true" data-icon="inline-end" />
                    </Button>
                  )}
                </CardFooter>
              )}
            </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
