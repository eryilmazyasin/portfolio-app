import { useTranslations } from "next-intl"

import type { SkillsProps } from "@/components/Skills/Skills.types"
import {
  getCategoryPresentation,
  groupSkillsByCategory,
} from "@/components/Skills/Skills.utils"

export function Skills({ skills }: SkillsProps) {
  const t = useTranslations("Skills")
  const skillGroups = groupSkillsByCategory(skills)

  return (
    <section
      aria-labelledby="skills-title"
      className="border-t border-slate-200 px-4 py-20 dark:border-slate-800 sm:px-6 sm:py-28 lg:px-8"
      id="skills"
    >
      <div className="mx-auto max-w-6xl">
        <div className="max-w-2xl" data-scroll-reveal>
          <h2 className="text-4xl font-semibold tracking-[-0.055em] text-slate-950 dark:text-slate-50 sm:text-5xl" id="skills-title">
            {t("title")}
          </h2>
          <p className="mt-5 max-w-[60ch] text-pretty text-base leading-7 text-slate-600 dark:text-slate-300">
            {t("description")}
          </p>
        </div>

        <div className="mt-12 border-t border-slate-300 dark:border-slate-700">
          {skillGroups.map((group) => {
            const presentation = getCategoryPresentation(group.category)

            return (
              <article
                className="grid gap-6 border-b border-slate-200 py-8 dark:border-slate-800 md:grid-cols-[minmax(0,0.8fr)_minmax(0,1.6fr)] md:gap-12 md:py-10"
                key={group.category}
              >
                <div>
                  <h3 className="text-xl font-semibold tracking-[-0.035em] text-slate-950 dark:text-slate-50 sm:text-2xl">
                    {presentation ? t(presentation.titleKey) : group.category}
                  </h3>
                  <p className="mt-2 max-w-[34ch] text-sm leading-6 text-slate-600 dark:text-slate-300">
                    {presentation ? t(presentation.descriptionKey) : t("otherDesc")}
                  </p>
                </div>
                <ul className="grid grid-cols-2 gap-x-4 gap-y-3 sm:grid-cols-3 lg:grid-cols-4">
                  {group.items.map((skill) => (
                    <li className="text-sm font-medium leading-5 text-slate-700 dark:text-slate-200" key={skill.id}>
                      {skill.name}
                    </li>
                  ))}
                </ul>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
