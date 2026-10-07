"use client"

import { ArrowUpRight, Menu } from "lucide-react"
import { useTranslations } from "next-intl"

import { navigationItems } from "@/components/Navbar/navigation"
import { ScrollToSection } from "@/components/ScrollToSection/ScrollToSection"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

export function MobileNavigation() {
  const t = useTranslations("Navbar")

  return (
    <Sheet>
      <SheetTrigger
        render={
          <Button
            aria-label={t("openMenu")}
            className="rounded-lg border-slate-200 bg-white text-slate-700 dark:border-slate-700 dark:bg-[#17252b] dark:text-slate-200 dark:hover:bg-[#25404d] lg:hidden"
            size="icon-lg"
            variant="outline"
          />
        }
      >
        <Menu aria-hidden="true" />
      </SheetTrigger>

      <SheetContent className="w-[min(88vw,22rem)] border-l-slate-200/80 bg-white/95 p-2 backdrop-blur-2xl dark:border-l-white/10 dark:bg-slate-950/95">
        <SheetHeader className="border-b border-slate-200/80 px-4 py-5 dark:border-white/10">
          <SheetTitle className="text-lg font-semibold tracking-tight">
            {t("navigationTitle")}
          </SheetTitle>
          <SheetDescription>{t("navigationDescription")}</SheetDescription>
        </SheetHeader>

        <nav aria-label={t("mobileNavigationLabel")} className="flex flex-col gap-1 p-2">
          {navigationItems.map((item) => (
            <SheetClose
              key={item.targetId}
              nativeButton
              render={
                <ScrollToSection
                  className="flex cursor-pointer items-center justify-between rounded-xl px-3 py-3 text-base font-medium text-slate-700 transition-colors hover:bg-slate-100 hover:text-slate-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 dark:text-slate-300 dark:hover:bg-white/10 dark:hover:text-white"
                  targetId={item.targetId}
                />
              }
            >
              {t(item.key)}
              <ArrowUpRight aria-hidden="true" className="size-4" />
            </SheetClose>
          ))}

          <SheetClose
            nativeButton
            render={
              <ScrollToSection
                className="mt-3 inline-flex h-11 cursor-pointer items-center justify-center rounded-lg bg-[#315f72] px-5 text-sm font-medium text-white transition-colors hover:bg-[#254d5e] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#315f72] focus-visible:ring-offset-2 dark:bg-[#b9d4dd] dark:text-[#17252b] dark:hover:bg-[#d7e8ed] dark:focus-visible:ring-offset-[#101c22]"
                targetId="contact"
              />
            }
          >
            {t("contact")}
          </SheetClose>
        </nav>
      </SheetContent>
    </Sheet>
  )
}
