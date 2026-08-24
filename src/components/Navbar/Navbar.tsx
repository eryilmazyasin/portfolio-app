import Link from "next/link"
import { useTranslations } from "next-intl"

import { LanguageSwitcher } from "@/components/LanguageSwitcher"
import { MobileNavigation } from "@/components/Navbar/MobileNavigation"
import { navigationItems } from "@/components/Navbar/navigation"
import { ThemeToggle } from "@/components/ThemeToggle"

export function Navbar() {
  const t = useTranslations("Navbar")

  return (
    <header className="fixed inset-x-0 top-0 z-40 px-4 pt-4 sm:px-6 lg:px-8">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between rounded-2xl border border-white/70 bg-white/70 px-4 font-sans shadow-[0_8px_32px_rgba(15,23,42,0.06)] backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/75 dark:shadow-[0_8px_32px_rgba(0,0,0,0.28)] sm:px-5">
        <Link
          aria-label={t("homeLabel")}
          className="group flex items-center gap-3 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400"
          href="#top"
        >
          <span className="grid size-9 place-items-center rounded-xl bg-slate-950 text-sm font-semibold tracking-tight text-white transition-transform group-hover:-rotate-3 dark:bg-white dark:text-slate-950">
            YE
          </span>
          <span className="hidden sm:flex sm:flex-col">
            <span className="text-sm font-semibold leading-tight tracking-[-0.02em] text-slate-950 dark:text-white">
              Yasin Eryılmaz
            </span>
            <span className="mt-0.5 text-[0.65rem] font-medium leading-tight tracking-wide text-slate-500 dark:text-slate-400">
              {t("role")}
            </span>
          </span>
        </Link>

        <nav aria-label={t("mainNavigationLabel")} className="hidden items-center gap-1 md:flex">
          {navigationItems.map((item) => (
            <Link
              key={item.href}
              className="rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-white/80 hover:text-slate-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 dark:text-slate-400 dark:hover:bg-white/10 dark:hover:text-white"
              href={item.href}
            >
              {t(item.key)}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            className="hidden h-9 items-center justify-center rounded-xl bg-slate-950 px-4 text-sm font-medium text-white shadow-sm transition-colors hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200 dark:focus-visible:ring-offset-slate-950 md:inline-flex"
            href="#contact"
          >
            {t("contact")}
          </Link>
          <LanguageSwitcher />
          <ThemeToggle />
          <MobileNavigation />
        </div>
      </div>
    </header>
  )
}
