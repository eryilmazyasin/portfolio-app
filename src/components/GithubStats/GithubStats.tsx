import { ArrowUpRight, GitFork } from "lucide-react"
import { getTranslations } from "next-intl/server"

import { getGithubProfile, type GitHubProfile } from "@/services/github"

export async function GithubStats() {
  let profile: GitHubProfile | null

  try {
    // Veri doğrudan Server Component içinde alındığı için GitHub yanıtı ve erişim bilgileri istemci paketine taşınmaz.
    profile = await getGithubProfile()
  } catch (error) {
    console.error("Failed to render GitHub stats:", error)

    return null
  }

  if (!profile) {
    return null
  }

  const t = await getTranslations("GithubStats").catch((error) => {
    console.error("Failed to load GitHub stats translations:", error)

    return null
  })

  if (!t) {
    return null
  }

  return (
    <a
        aria-label={t("profileLabel", { username: profile.login })}
        className="group mt-10 flex w-full max-w-2xl flex-col gap-4 rounded-2xl border border-slate-200/80 bg-white/70 p-4 shadow-sm backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 hover:border-slate-300 hover:bg-white hover:shadow-md dark:border-white/10 dark:bg-slate-900/70 dark:hover:border-white/20 dark:hover:bg-slate-900 sm:flex-row sm:items-center sm:justify-between sm:p-5 motion-reduce:transform-none"
        href={profile.html_url}
        rel="noreferrer"
        target="_blank"
      >
        <div className="flex min-w-0 items-center gap-3">
          <div className="grid size-10 shrink-0 place-items-center rounded-xl bg-slate-950 text-white dark:bg-white dark:text-slate-950">
            <GitFork aria-hidden="true" className="size-4" />
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold tracking-[-0.02em] text-slate-950 dark:text-white">
              @{profile.login}
            </p>
            <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
              {t("liveProfile")}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-5 border-t border-slate-200/80 pt-4 sm:border-l sm:border-t-0 sm:pl-5 sm:pt-0 dark:border-white/10">
          <div>
            <p className="text-base font-semibold tabular-nums text-slate-950 dark:text-white">
              {profile.public_repos}
            </p>
            <p className="text-[0.65rem] font-medium uppercase tracking-[0.12em] text-slate-400 dark:text-slate-500">
              {t("repositories")}
            </p>
          </div>
          <div>
            <p className="text-base font-semibold tabular-nums text-slate-950 dark:text-white">
              {profile.followers}
            </p>
            <p className="text-[0.65rem] font-medium uppercase tracking-[0.12em] text-slate-400 dark:text-slate-500">
              {t("followers")}
            </p>
          </div>
          <ArrowUpRight
            aria-hidden="true"
            className="ml-auto size-4 text-slate-400 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 dark:text-slate-500 motion-reduce:transform-none"
          />
        </div>
    </a>
  )
}
