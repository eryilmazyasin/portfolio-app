import { ArrowUpRight, GitFork } from "lucide-react"
import { useTranslations } from "next-intl"

import type { ProjectsProps } from "@/components/Projects/Projects.types"

export function Projects({ locale, projects }: ProjectsProps) {
  const t = useTranslations("Projects")

  return (
    <section
      aria-labelledby="projects-title"
      className="border-t border-slate-200 px-4 py-20 dark:border-slate-800 sm:px-6 sm:py-28 lg:px-8"
      id="projects"
    >
      <div className="mx-auto max-w-6xl">
        <div data-scroll-reveal>
          <h2 className="text-4xl font-semibold tracking-[-0.055em] text-slate-950 dark:text-slate-50 sm:text-5xl" id="projects-title">
            {t("title")}
          </h2>
          <p className="mt-3 text-sm font-medium text-[#315f72] dark:text-[#b9d4dd]">{t("sectionTitle")}</p>
        </div>

        <div className="mt-12 border-t border-slate-300 dark:border-slate-700">
          {projects.map((project) => {
            const title = locale === "tr" ? project.titleTr : project.titleEn
            const summary = locale === "tr"
              ? project.summaryTr ?? project.descriptionTr
              : project.summaryEn ?? project.descriptionEn
            const description = locale === "tr" ? project.descriptionTr : project.descriptionEn
            const descriptionLines = description.split("\n").map((line) => line.trim().replace(/^•\s*/, "")).filter(Boolean)

            return (
              <article
                className="grid gap-7 border-b border-slate-200 py-10 dark:border-slate-800 md:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] md:gap-14 md:py-12"
                key={project.slug}
              >
                <div>
                  <h3 className="max-w-[20ch] text-2xl font-semibold tracking-[-0.04em] text-slate-950 dark:text-slate-50 sm:text-3xl">{title}</h3>
                  <p className="mt-4 max-w-[48ch] text-base leading-7 text-slate-600 dark:text-slate-300">{summary}</p>
                  {(project.githubUrl || project.liveUrl) && (
                    <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3">
                      {project.githubUrl && (
                        <a aria-label={t("githubAria", { project: title })} className="inline-flex items-center gap-2 text-sm font-semibold text-[#315f72] underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 dark:text-[#b9d4dd]" href={project.githubUrl} rel="noreferrer" target="_blank">
                          <GitFork aria-hidden="true" className="size-4" />
                          {t("github")}
                          <ArrowUpRight aria-hidden="true" className="size-4" />
                        </a>
                      )}
                      {project.liveUrl && (
                        <a aria-label={t("liveDemoAria", { project: title })} className="inline-flex items-center gap-2 text-sm font-semibold text-[#315f72] underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 dark:text-[#b9d4dd]" href={project.liveUrl} rel="noreferrer" target="_blank">
                          {t("liveDemo")}
                          <ArrowUpRight aria-hidden="true" className="size-4" />
                        </a>
                      )}
                    </div>
                  )}
                </div>
                <div>
                  <ul className="space-y-2 text-sm leading-7 text-slate-700 dark:text-slate-200 sm:text-base">
                    {descriptionLines.map((line) => <li key={line}>{line}</li>)}
                  </ul>
                  <div className="mt-6">
                    <p className="text-xs font-semibold text-slate-600 dark:text-slate-300">{t("techStack")}</p>
                    <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-2">
                      {project.techStack.map((technology) => (
                        <li className="text-xs font-medium text-slate-600 dark:text-slate-300" key={technology}>{technology}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
