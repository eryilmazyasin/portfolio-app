import { Boxes, Database, PanelsTopLeft } from "lucide-react"
import { useTranslations } from "next-intl"

import { Badge } from "@/components/ui/badge"

const skillGroups = [
  {
    titleKey: "frontendTitle",
    descriptionKey: "frontendDesc",
    icon: PanelsTopLeft,
    skills: [
      "React.js",
      "Next.js",
      "TypeScript",
      "JavaScript (ES6+)",
      "Tailwind CSS",
      "shadcn/ui",
    ],
  },
  {
    titleKey: "stateTitle",
    descriptionKey: "stateDesc",
    icon: Boxes,
    skills: ["Redux", "TanStack Query", "Context API", "Zustand"],
  },
  {
    titleKey: "backendTitle",
    descriptionKey: "backendDesc",
    icon: Database,
    skills: [
      "Node.js",
      "PostgreSQL",
      "Docker",
      "Nginx",
      "AWS",
      "DigitalOcean",
      "Webpack",
      "Vercel",
    ],
  },
] as const

export function Skills() {
  const t = useTranslations("Skills")

  return (
    <section
      aria-labelledby="skills-title"
      className="border-y border-slate-200/80 bg-white px-4 py-24 font-sans dark:border-white/10 dark:bg-slate-900/40 sm:px-6 sm:py-28 lg:px-8"
      id="skills"
    >
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
              {t("sectionTitle")}
            </p>
            <h2
              className="mt-4 text-4xl font-semibold tracking-[-0.045em] text-slate-950 dark:text-white sm:text-5xl"
              id="skills-title"
            >
              {t("title")}
            </h2>
          </div>
          <p className="max-w-2xl text-pretty text-base leading-7 text-slate-600 dark:text-slate-400 lg:justify-self-end">
            {t("description")}
          </p>
        </div>

        <div className="mt-12 grid gap-4 lg:grid-cols-3">
          {skillGroups.map((group) => {
            const Icon = group.icon

            return (
              <article
                className="rounded-2xl border border-slate-200/80 bg-slate-50/70 p-6 shadow-[0_1px_2px_rgba(15,23,42,0.03)] dark:border-white/10 dark:bg-slate-950/60 dark:shadow-[0_8px_28px_rgba(0,0,0,0.18)] sm:p-7"
                key={group.titleKey}
              >
                <div className="grid size-10 place-items-center rounded-xl border border-slate-200 bg-white text-slate-700 shadow-sm dark:border-white/10 dark:bg-slate-900 dark:text-slate-300">
                  <Icon aria-hidden="true" className="size-4" />
                </div>
                <h3 className="mt-6 text-lg font-semibold tracking-[-0.025em] text-slate-950 dark:text-white">
                  {t(group.titleKey)}
                </h3>
                <p className="mt-2 min-h-12 text-sm leading-6 text-slate-500 dark:text-slate-400">
                  {t(group.descriptionKey)}
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <Badge
                      className="h-7 border-slate-200 bg-white px-2.5 text-xs font-medium text-slate-700 shadow-sm dark:border-white/10 dark:bg-slate-900 dark:text-slate-300"
                      key={skill}
                      variant="outline"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
