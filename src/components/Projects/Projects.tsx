import { ChevronRight, ExternalLink, GitFork, Layers3 } from "lucide-react"
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
        <div>
          <div data-scroll-reveal>
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
        </div>

        <div className="mt-12 grid grid-cols-1 gap-5 lg:grid-cols-2">
          {projects.map((project, index) => {
            const title = locale === "tr" ? project.titleTr : project.titleEn
            const summary =
              locale === "tr"
                ? project.summaryTr ?? project.descriptionTr
                : project.summaryEn ?? project.descriptionEn
            const description =
              locale === "tr"
                ? project.descriptionTr
                : project.descriptionEn
            const descriptionLines = description
              .split("\n")
              .map((line) => line.trim().replace(/^•\s*/, ""))
              .filter(Boolean)

            return (
            <div className="flex" data-scroll-reveal key={project.slug}>
            <Card
              className="project-card group isolate flex-1 gap-0 overflow-hidden rounded-xl border border-zinc-200/80 bg-white/70 p-6 shadow-sm ring-0 backdrop-blur-sm transition-all duration-300 has-data-[slot=card-footer]:pb-6 hover:-translate-y-0.5 hover:border-sky-400/50 hover:shadow-lg hover:shadow-sky-500/10 dark:border-zinc-800/80 dark:bg-zinc-900/50 dark:shadow-[0_8px_28px_rgba(0,0,0,0.18)] dark:hover:border-sky-500/40 dark:hover:shadow-sky-500/5 motion-reduce:transform-none motion-reduce:transition-none sm:p-7 sm:has-data-[slot=card-footer]:pb-7"
            >
              <CardHeader className="gap-6 border-b border-zinc-200/70 p-0 pb-6 dark:border-zinc-800/80">
                <div className="flex items-center justify-between">
                  <div className="grid size-11 place-items-center rounded-xl border border-sky-200/80 bg-sky-50/80 text-sky-600 shadow-sm transition-all duration-300 group-hover:border-sky-300 group-hover:shadow-[0_0_20px_rgba(14,165,233,0.16)] dark:border-sky-500/20 dark:bg-sky-500/[0.08] dark:text-sky-300 dark:group-hover:border-sky-400/40 dark:group-hover:bg-sky-500/15">
                    <Layers3 aria-hidden="true" className="size-5" />
                  </div>
                  <span className="font-mono text-xs font-medium text-zinc-400 dark:text-zinc-500">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                <div>
                  <CardTitle className="text-2xl font-semibold tracking-[-0.035em] text-zinc-950 dark:text-zinc-50 sm:text-3xl">
                    {title}
                  </CardTitle>
                  <CardDescription className="mt-3 max-w-xl text-sm leading-relaxed text-zinc-600 dark:text-zinc-400 sm:text-base">
                    {summary}
                  </CardDescription>
                </div>
              </CardHeader>

              <CardContent className="flex flex-1 flex-col p-0 py-6">
                <div className="space-y-3 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
                  {descriptionLines.map((line) => (
                    <div className="flex items-start gap-2.5" key={line}>
                      <ChevronRight
                        aria-hidden="true"
                        className="mt-0.5 size-4 shrink-0 text-sky-500 dark:text-sky-400"
                      />
                      <p>{line}</p>
                    </div>
                  ))}
                </div>

                <div aria-hidden="true" className="min-h-6 flex-1" />

                <div className="border-t border-zinc-200/70 pt-5 dark:border-zinc-800/80 lg:min-h-28">
                  <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-zinc-400 dark:text-zinc-500">
                    {t("techStack")}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.map((technology) => (
                      <Badge
                        className="h-auto min-h-7 rounded-md border-sky-300/50 bg-sky-50/80 px-2.5 py-1 font-mono text-xs font-medium text-sky-800 backdrop-blur-sm dark:border-sky-500/20 dark:bg-sky-500/[0.06] dark:text-sky-200/90"
                        key={technology}
                        variant="outline"
                      >
                        {technology}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>

              {(project.githubUrl || project.liveUrl) && (
                <CardFooter className="mt-auto gap-2.5 rounded-none border-t border-zinc-200/70 bg-transparent p-0 pt-5 dark:border-zinc-800/80">
                  {project.githubUrl && (
                    <Button
                      aria-label={t("githubAria", { project: title })}
                      className="h-9 rounded-md border-zinc-300/80 bg-transparent px-3.5 text-zinc-700 transition-colors hover:border-zinc-400 hover:bg-zinc-100 hover:text-zinc-950 dark:border-zinc-700/70 dark:text-zinc-200 dark:hover:border-zinc-600 dark:hover:bg-zinc-800 dark:hover:text-white"
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
                      className="h-9 rounded-md border-zinc-300/80 bg-transparent px-3.5 text-zinc-700 transition-colors hover:border-sky-400/60 hover:bg-zinc-100 hover:text-zinc-950 dark:border-zinc-700/70 dark:text-zinc-200 dark:hover:border-sky-500/40 dark:hover:bg-zinc-800 dark:hover:text-white"
                      nativeButton={false}
                      render={
                        <a
                          href={project.liveUrl}
                          rel="noreferrer"
                          target="_blank"
                        />
                      }
                      variant="outline"
                    >
                      <ExternalLink aria-hidden="true" data-icon="inline-start" />
                      {t("liveDemo")}
                    </Button>
                  )}
                </CardFooter>
              )}
            </Card>
            </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
