import { Boxes } from "lucide-react"
import { useTranslations } from "next-intl"

import type { SkillsProps } from "@/components/Skills/Skills.types"
import {
  getCategoryPresentation,
  groupSkillsByCategory,
} from "@/components/Skills/Skills.utils"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

export function Skills({ skills }: SkillsProps) {
  const t = useTranslations("Skills")
  const skillGroups = groupSkillsByCategory(skills)

  return (
    <section
      aria-labelledby="skills-title"
      className="border-y border-slate-200/80 bg-white px-4 py-24 font-sans dark:border-white/10 dark:bg-slate-900/40 sm:px-6 sm:py-28 lg:px-8"
      id="skills"
    >
      <div className="mx-auto max-w-6xl">
        <div className="max-w-2xl" data-scroll-reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
            {t("sectionTitle")}
          </p>
          <h2
            className="mt-4 text-4xl font-semibold tracking-[-0.045em] text-slate-950 dark:text-white sm:text-5xl"
            id="skills-title"
          >
            {t("title")}
          </h2>
          <p className="mt-5 text-pretty text-base leading-7 text-slate-600 dark:text-slate-400">
            {t("description")}
          </p>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-2">
          {skillGroups.map((group) => {
            const presentation = getCategoryPresentation(group.category)
            const Icon = presentation?.icon ?? Boxes

            return (
              <div data-scroll-reveal key={group.category}>
              <article
                className={cn(
                  "group/card relative h-full overflow-hidden rounded-2xl border border-slate-200/80 bg-white/65 p-6 shadow-[0_1px_2px_rgba(15,23,42,0.03)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 dark:border-white/10 dark:bg-slate-950/55 dark:shadow-[0_8px_28px_rgba(0,0,0,0.18)] motion-reduce:transform-none sm:p-7",
                  presentation?.cardClassName
                )}
              >
                <div
                  aria-hidden="true"
                  className={cn(
                    "absolute inset-x-0 top-0 h-px opacity-80",
                    presentation?.accentClassName
                  )}
                />
                <div
                  className={cn(
                    "grid size-10 place-items-center rounded-xl border shadow-sm transition-colors duration-300",
                    presentation?.iconClassName ??
                      "border-slate-200 bg-white text-slate-700 dark:border-white/10 dark:bg-slate-900 dark:text-slate-300"
                  )}
                >
                  <Icon aria-hidden="true" className="size-4" />
                </div>
                <h3 className="mt-6 text-lg font-semibold tracking-[-0.025em] text-slate-950 dark:text-white">
                  {presentation
                    ? t(presentation.titleKey)
                    : group.category}
                </h3>
                <p className="mt-2 min-h-12 text-sm leading-6 text-slate-500 dark:text-slate-400">
                  {presentation
                    ? t(presentation.descriptionKey)
                    : t("otherDesc")}
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {group.items.map((skill) => (
                    <Badge
                      className={cn(
                        "h-7 rounded-md border px-2.5 font-mono text-[0.7rem] font-medium tracking-[-0.015em] shadow-sm backdrop-blur-md transition-all duration-200 hover:scale-105 motion-reduce:transform-none",
                        presentation?.badgeClassName ??
                          "border-slate-200/80 bg-white/70 text-slate-700 hover:border-slate-300 hover:shadow-md dark:border-white/10 dark:bg-slate-900/70 dark:text-slate-300"
                      )}
                      key={skill.id}
                      variant="outline"
                    >
                      {skill.name}
                    </Badge>
                  ))}
                </div>
              </article>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
