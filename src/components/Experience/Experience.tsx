import { BriefcaseBusiness, ChevronRight } from "lucide-react"
import { useTranslations } from "next-intl"

import type { ExperienceProps } from "@/components/Experience/Experience.types"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { getYearsOfExperience } from "@/lib/experience"

const experienceTechnologies: Record<string, readonly string[]> = {
  "Hotel Management Automation": [
    "React.js",
    "TypeScript",
    "Node.js",
    "TanStack Query",
    "Axios",
    "MySQL",
  ],
  Metus: [
    "React.js",
    "Next.js",
    "TypeScript",
    "TanStack Query",
    "SignalR",
    "Docker",
    "SonarQube",
  ],
  Akinon: ["JavaScript", "HTML5", "CSS3", "SCSS", "Python / Jinja"],
  "Detroit Digital": [
    "HTML5",
    "CSS3",
    "JavaScript",
    "PHP",
    "Laravel",
    "WordPress",
  ],
}

export function Experience({ experiences, locale }: ExperienceProps) {
  const t = useTranslations("Experience")
  const yearsOfExperience = getYearsOfExperience()

  return (
    <section
      aria-labelledby="experience-title"
      className="bg-slate-50 px-4 py-24 font-sans dark:bg-slate-950 sm:px-6 sm:py-32 lg:px-8"
      id="experience"
    >
      <div className="mx-auto max-w-6xl">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
            {t("sectionTitle")}
          </p>
          <h2
            className="mt-4 text-4xl font-semibold tracking-[-0.045em] text-slate-950 dark:text-white sm:text-5xl"
            id="experience-title"
          >
            {t("title")}
          </h2>
          <p className="mt-5 text-pretty text-base leading-7 text-slate-600 dark:text-slate-400">
            {t("description", { years: yearsOfExperience })}
          </p>
        </div>

        <ol className="relative mt-14 space-y-5 before:absolute before:bottom-8 before:left-[0.4375rem] before:top-8 before:w-px before:bg-slate-200 dark:before:bg-white/10 sm:ml-2 sm:space-y-6">
          {experiences.map((experience, index) => {
            const role = locale === "tr" ? experience.roleTr : experience.roleEn
            const description =
              locale === "tr"
                ? experience.descriptionTr
                : experience.descriptionEn
            const descriptionLines = description
              .split("\n")
              .map((line) => line.trim().replace(/^•\s*/, ""))
              .filter(Boolean)
            const technologies = experienceTechnologies[experience.company] ?? []
            const period = experience.isCurrent
              ? `${experience.startDate} — ${t("present")}`
              : [experience.startDate, experience.endDate]
                  .filter(Boolean)
                  .join(" — ")

            return (
            <li className="relative pl-8 sm:pl-10" key={experience.company}>
              <span
                aria-hidden="true"
                className={cn(
                  "absolute left-0.5 top-8 z-10 rounded-full",
                  experience.isCurrent
                    ? "size-3.5 animate-pulse bg-sky-400 ring-4 ring-sky-500/20 motion-reduce:animate-none"
                    : "size-3 border-2 border-zinc-400 bg-white dark:border-zinc-700 dark:bg-zinc-900"
                )}
              />

              <Card className="gap-0 rounded-2xl border border-zinc-200/80 bg-white py-0 shadow-[0_8px_32px_rgba(15,23,42,0.04)] ring-0 transition-all duration-200 hover:-translate-y-0.5 hover:border-zinc-300 hover:shadow-[0_14px_36px_rgba(15,23,42,0.07)] dark:border-zinc-800/80 dark:bg-zinc-900/60 dark:shadow-[0_12px_36px_rgba(0,0,0,0.2)] dark:hover:border-zinc-700/80 dark:hover:shadow-[0_16px_40px_rgba(0,0,0,0.28)] motion-reduce:transform-none">
                <CardHeader className="gap-4 border-b border-zinc-200/70 p-6 dark:border-zinc-800/80 sm:grid-cols-[1fr_auto] sm:p-7">
                  <div>
                    <div className="flex items-center gap-2 text-sm font-medium text-slate-500 dark:text-slate-400">
                      <BriefcaseBusiness aria-hidden="true" className="size-4" />
                      {experience.companyUrl ? (
                        <a
                          className="transition-colors hover:text-slate-950 dark:hover:text-white"
                          href={experience.companyUrl}
                          rel="noreferrer"
                          target="_blank"
                        >
                          {experience.company}
                        </a>
                      ) : (
                        experience.company
                      )}
                    </div>
                    <CardTitle className="mt-3 text-xl font-semibold tracking-[-0.025em] text-slate-950 dark:text-white sm:text-2xl">
                      {role}
                    </CardTitle>
                  </div>
                  <CardDescription className="text-sm font-medium text-slate-400 dark:text-slate-500 sm:text-right">
                    {period}
                  </CardDescription>
                </CardHeader>

                <CardContent className="p-6 sm:p-7">
                  <div className="max-w-4xl space-y-3 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300 sm:text-base">
                    {descriptionLines.map((line) => (
                      <div className="flex items-start gap-2.5" key={line}>
                        <ChevronRight
                          aria-hidden="true"
                          className="mt-1 size-4 shrink-0 text-sky-500 dark:text-sky-400"
                        />
                        <p>{line}</p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 flex flex-col gap-4 border-t border-zinc-200/70 pt-5 dark:border-zinc-800/80 lg:flex-row lg:items-end lg:justify-between">
                    <div className="flex flex-wrap gap-2">
                      {technologies.map((technology) => (
                        <Badge
                          className="h-7 rounded-md border-zinc-300/70 bg-zinc-100/70 px-2.5 font-mono text-xs font-medium text-zinc-700 backdrop-blur-sm dark:border-zinc-700/60 dark:bg-zinc-800/60 dark:text-zinc-300"
                          key={technology}
                          variant="outline"
                        >
                          {technology}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex flex-wrap gap-2 lg:max-w-sm lg:justify-end">
                      {[experience.location, experience.type]
                        .filter((detail): detail is string => Boolean(detail))
                        .map((detail) => (
                          <Badge
                            className="h-7 rounded-md border-zinc-300/70 bg-transparent px-2.5 text-xs font-medium text-zinc-600 dark:border-zinc-700/60 dark:text-zinc-400"
                            key={detail}
                            variant="outline"
                          >
                            {detail}
                          </Badge>
                        ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <span className="sr-only">
                {t("itemLabel", { number: index + 1 })}
              </span>
            </li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}
