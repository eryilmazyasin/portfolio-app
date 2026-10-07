import { useTranslations } from "next-intl"

import { LanguageSwitcher } from "@/components/LanguageSwitcher"
import { MobileNavigation } from "@/components/Navbar/MobileNavigation"
import { navigationItems } from "@/components/Navbar/navigation"
import { ScrollToSection } from "@/components/ScrollToSection/ScrollToSection"
import { ThemeToggle } from "@/components/ThemeToggle"

export function Navbar() {
  const t = useTranslations("Navbar")

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-slate-200/80 bg-[#f8faf9]/95 px-4 backdrop-blur-lg dark:border-slate-800 dark:bg-[#101c22]/95 sm:px-6 lg:px-8">
      <div className="mx-auto flex h-[4.5rem] max-w-6xl items-center justify-between gap-3 font-sans">
        <ScrollToSection
          aria-label={t("homeLabel")}
          className="group flex cursor-pointer items-center gap-3 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400"
          targetId="top"
        >
          <span className="grid size-9 place-items-center rounded-lg bg-[#315f72] text-sm font-semibold tracking-tight text-white transition-transform group-hover:-rotate-3 dark:bg-[#b9d4dd] dark:text-[#17252b]">
            YE
          </span>
          <span className="hidden h-9 flex-col justify-center text-left sm:flex">
            <span className="text-sm font-semibold leading-none tracking-[-0.02em] text-slate-950 dark:text-white">
              Yasin Eryılmaz
            </span>
            <span className="mt-1 text-[0.65rem] font-medium leading-none tracking-wide text-slate-500 dark:text-slate-400">
              {t("role")}
            </span>
          </span>
        </ScrollToSection>

        <nav aria-label={t("mainNavigationLabel")} className="hidden items-center gap-1 lg:flex">
          {navigationItems.map((item) => (
            <ScrollToSection
              key={item.targetId}
              className="cursor-pointer rounded-lg px-2.5 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-[#e4eef1] hover:text-[#315f72] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#315f72] dark:text-slate-300 dark:hover:bg-[#25404d] dark:hover:text-[#d7e8ed]"
              targetId={item.targetId}
            >
              {t(item.key)}
            </ScrollToSection>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ScrollToSection
            className="hidden h-9 cursor-pointer items-center justify-center whitespace-nowrap rounded-lg bg-[#315f72] px-4 text-sm font-medium text-white transition-colors hover:bg-[#254d5e] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#315f72] focus-visible:ring-offset-2 dark:bg-[#b9d4dd] dark:text-[#17252b] dark:hover:bg-[#d7e8ed] dark:focus-visible:ring-offset-[#101c22] lg:inline-flex"
            targetId="contact"
          >
            {t("contact")}
          </ScrollToSection>
          <LanguageSwitcher />
          <ThemeToggle />
          <MobileNavigation />
        </div>
      </div>
    </header>
  )
}
