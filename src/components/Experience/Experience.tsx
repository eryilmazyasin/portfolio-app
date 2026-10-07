import { BriefcaseBusiness, ChevronRight } from "lucide-react"
import { useTranslations } from "next-intl"

import type { ExperienceProps } from "@/components/Experience/Experience.types"
import { getYearsOfExperience } from "@/lib/experience"

const experienceTechnologies: Record<string, readonly string[]> = {
  "Hotel Management Automation": [
    "React.js", "TypeScript", "Node.js", "TanStack Query", "Axios", "MySQL",
  ],
  Metus: [
    "React.js", "Next.js", "TypeScript", "TanStack Query", "SignalR", "Docker", "SonarQube",
  ],
  Akinon: ["JavaScript", "HTML5", "CSS3", "SCSS", "Python / Jinja"],
  "Detroit Digital": ["HTML5", "CSS3", "JavaScript", "PHP", "Laravel", "WordPress"],
}

export function Experience({ experiences, locale }: ExperienceProps) {
  const t = useTranslations("Experience")
  const yearsOfExperience = getYearsOfExperience()

  return (
    <section
      aria-labelledby="experience-title"
      className="border-t border-slate-200 bg-[#edf2f3] px-4 py-20 dark:border-slate-800 dark:bg-[#17252b] sm:px-6 sm:py-28 lg:px-8"
      id="experience"
    >
      <div className="mx-auto max-w-6xl">
        <div className="max-w-2xl" data-scroll-reveal>
          <p className="text-sm font-medium text-[#315f72] dark:text-[#b9d4dd]">{t("sectionTitle")}</p>
          <h2 className="mt-3 text-4xl font-semibold tracking-[-0.055em] text-slate-950 dark:text-slate-50 sm:text-5xl" id="experience-title">
            {t("title")}
          </h2>
          <p className="mt-5 max-w-[60ch] text-pretty text-base leading-7 text-slate-600 dark:text-slate-300">
            {t("description", { years: yearsOfExperience })}
          </p>
        </div>

        <ol className="mt-12 border-t border-slate-300 dark:border-slate-600">
          {experiences.map((experience, index) => {
            const role = locale === "tr" ? experience.roleTr : experience.roleEn
            const description = locale === "tr" ? experience.descriptionTr : experience.descriptionEn
            const descriptionLines = description.split("\n").map((line) => line.trim().replace(/^•\s*/, "")).filter(Boolean)
            const technologies = experienceTechnologies[experience.company] ?? []
            const period = experience.isCurrent
              ? `${experience.startDate} — ${t("present")}`
              : [experience.startDate, experience.endDate].filter(Boolean).join(" — ")

            return (
              <li className="grid gap-5 border-b border-slate-300 py-8 dark:border-slate-600 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.35fr)] md:gap-12 md:py-10" data-scroll-reveal key={experience.company}>
                <div>
                  <div className="flex items-center gap-2 text-sm font-medium text-[#315f72] dark:text-[#b9d4dd]">
                    <BriefcaseBusiness aria-hidden="true" className="size-4" />
                    {experience.companyUrl ? (
                      <a className="underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2" href={experience.companyUrl} rel="noreferrer" target="_blank">
                        {experience.company}
                      </a>
                    ) : experience.company}
                  </div>
                  <h3 className="mt-3 text-2xl font-semibold tracking-[-0.04em] text-slate-950 dark:text-slate-50">{role}</h3>
                  <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{period}</p>
                </div>
                <div>
                  <div className="space-y-3 text-sm leading-7 text-slate-700 dark:text-slate-200 sm:text-base">
                    {descriptionLines.map((line) => (
                      <div className="flex items-start gap-2" key={line}>
                        <ChevronRight aria-hidden="true" className="mt-1.5 size-4 shrink-0 text-[#315f72] dark:text-[#b9d4dd]" />
                        <p>{line}</p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-5 flex flex-wrap gap-x-4 gap-y-2">
                    {technologies.map((technology) => (
                      <span className="text-xs font-medium text-[#315f72] dark:text-[#b9d4dd]" key={technology}>{technology}</span>
                    ))}
                  </div>
                  <div className="mt-4 flex flex-wrap gap-3 text-xs text-slate-500 dark:text-slate-400">
                    {[experience.location, experience.type]
                      .filter((detail): detail is string => Boolean(detail))
                      .map((detail) => <span key={detail}>{detail}</span>)}
                  </div>
                </div>
                <span className="sr-only">{t("itemLabel", { number: index + 1 })}</span>
              </li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}
