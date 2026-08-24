import { ArrowUpRight, GitFork, Zap } from "lucide-react"
import { getTranslations } from "next-intl/server"

import {
  getGithubActivitySummary,
  type GitHubActivitySummary,
} from "@/services/github"

export async function LiveStatusBadge() {
  let activity: GitHubActivitySummary | null

  try {
    // Aktivite verisi Server Component içinde alındığı için GitHub token ve sorgu ayrıntıları tarayıcıya gönderilmez.
    activity = await getGithubActivitySummary()
  } catch (error) {
    console.error("Failed to render GitHub activity badge:", error)
    return null
  }

  if (!activity) {
    return null
  }

  const t = await getTranslations("LiveStatusBadge").catch((error) => {
    console.error("Failed to load GitHub activity translations:", error)
    return null
  })

  if (!t) {
    return null
  }

  return (
    <a
      aria-label={t("profileLabel", { username: activity.login })}
      className="group mt-8 inline-flex max-w-full items-center gap-2 overflow-hidden rounded-full border border-slate-200/80 bg-white/75 px-3 py-2 text-xs font-medium text-slate-600 shadow-sm backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 hover:border-slate-300 hover:bg-white hover:text-slate-950 hover:shadow-md dark:border-white/10 dark:bg-slate-900/75 dark:text-slate-300 dark:hover:border-white/20 dark:hover:bg-slate-900 dark:hover:text-white sm:gap-3 sm:px-4 motion-reduce:transform-none"
      href={activity.profileUrl}
      rel="noreferrer"
      target="_blank"
    >
      <span className="relative flex size-2 shrink-0">
        <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-60 motion-reduce:animate-none" />
        <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
      </span>
      <span className="truncate text-slate-700 dark:text-slate-200">
        {t("activeStatus")}
      </span>
      <span aria-hidden="true" className="h-4 w-px shrink-0 bg-slate-200 dark:bg-white/10" />
      <span className="inline-flex shrink-0 items-center gap-1.5 tabular-nums">
        <Zap aria-hidden="true" className="size-3.5 text-amber-500" />
        {t("contributions", { count: activity.totalContributions })}
      </span>
      <span aria-hidden="true" className="hidden h-4 w-px shrink-0 bg-slate-200 dark:bg-white/10 md:block" />
      <span className="hidden shrink-0 items-center gap-1.5 tabular-nums md:inline-flex">
        <GitFork aria-hidden="true" className="size-3.5" />
        {t("repositories", { count: activity.totalRepositories })}
      </span>
      <ArrowUpRight
        aria-hidden="true"
        className="size-3.5 shrink-0 text-slate-400 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 dark:text-slate-500 motion-reduce:transform-none"
      />
    </a>
  )
}
