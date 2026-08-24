"use client"

import Link from "next/link"
import { ArrowUpRight, Menu } from "lucide-react"

import { navigationItems } from "@/components/Navbar/navigation"
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
  return (
    <Sheet>
      <SheetTrigger
        render={
          <Button
            aria-label="Menüyü aç"
            className="rounded-full border-white/70 bg-white/70 shadow-sm backdrop-blur-xl md:hidden"
            size="icon-lg"
            variant="outline"
          />
        }
      >
        <Menu aria-hidden="true" />
      </SheetTrigger>

      <SheetContent className="w-[min(88vw,22rem)] border-l-slate-200/80 bg-white/95 p-2 backdrop-blur-2xl">
        <SheetHeader className="border-b border-slate-200/80 px-4 py-5">
          <SheetTitle className="text-lg font-semibold tracking-tight">
            Navigasyon
          </SheetTitle>
          <SheetDescription>Portfolyo bölümlerini keşfedin.</SheetDescription>
        </SheetHeader>

        <nav aria-label="Mobil navigasyon" className="flex flex-col gap-1 p-2">
          {navigationItems.map((item) => (
            <SheetClose
              key={item.href}
              render={
                <Link
                  className="flex items-center justify-between rounded-xl px-3 py-3 text-base font-medium text-slate-700 transition-colors hover:bg-slate-100 hover:text-slate-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400"
                  href={item.href}
                />
              }
            >
              {item.label}
              <ArrowUpRight aria-hidden="true" className="size-4" />
            </SheetClose>
          ))}

          <SheetClose
            render={
              <Link
                className="mt-3 inline-flex h-11 items-center justify-center rounded-xl bg-slate-950 px-5 text-sm font-medium text-white transition-colors hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2"
                href="#contact"
              />
            }
          >
            İletişime geç
          </SheetClose>
        </nav>
      </SheetContent>
    </Sheet>
  )
}
