import { BriefcaseBusiness } from "lucide-react"
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

export function Experience({ experiences, locale }: ExperienceProps) {
  const t = useTranslations("Experience")

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
            {t("description")}
          </p>
        </div>

        <ol className="relative mt-14 space-y-5 before:absolute before:bottom-8 before:left-[0.4375rem] before:top-8 before:w-px before:bg-slate-200 dark:before:bg-white/10 sm:ml-2 sm:space-y-6">
          {experiences.map((experience, index) => {
            const role = locale === "tr" ? experience.roleTr : experience.roleEn
            const description =
              locale === "tr"
                ? experience.descriptionTr
                : experience.descriptionEn
            const period = experience.isCurrent
              ? `${experience.startDate} — ${t("present")}`
              : [experience.startDate, experience.endDate]
                  .filter(Boolean)
                  .join(" — ")

            return (
            <li className="relative pl-8 sm:pl-10" key={experience.company}>
              <span
                aria-hidden="true"
                className="absolute left-0 top-8 z-10 grid size-3.5 place-items-center rounded-full border-4 border-slate-50 bg-slate-950 ring-1 ring-slate-300 dark:border-slate-950 dark:bg-white dark:ring-slate-700"
              />

              <Card className="gap-0 rounded-2xl border-0 bg-white py-0 shadow-[0_8px_32px_rgba(15,23,42,0.04)] ring-1 ring-slate-200/80 dark:bg-slate-900 dark:shadow-[0_12px_36px_rgba(0,0,0,0.2)] dark:ring-white/10">
                <CardHeader className="gap-4 border-b border-slate-100 p-6 dark:border-white/10 sm:grid-cols-[1fr_auto] sm:p-7">
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

                <CardContent className="grid gap-6 p-6 sm:p-7 lg:grid-cols-[1fr_auto] lg:items-end">
                  <p className="max-w-3xl text-sm leading-6 text-slate-600 dark:text-slate-400 sm:text-base sm:leading-7">
                    {description}
                  </p>
                  <div className="flex flex-wrap gap-2 lg:max-w-sm lg:justify-end">
                    {[experience.location, experience.type]
                      .filter((detail): detail is string => Boolean(detail))
                      .map((detail) => (
                      <Badge
                        className="border-slate-200 bg-slate-50 text-slate-600 dark:border-white/10 dark:bg-slate-950/60 dark:text-slate-300"
                        key={detail}
                        variant="outline"
                      >
                        {detail}
                      </Badge>
                      ))}
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
