import Link from "next/link"

import { MobileNavigation } from "@/components/Navbar/MobileNavigation"
import { navigationItems } from "@/components/Navbar/navigation"

export function Navbar() {
  return (
    <header className="fixed inset-x-0 top-0 z-40 px-4 pt-4 sm:px-6 lg:px-8">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between rounded-2xl border border-white/70 bg-white/70 px-4 font-sans shadow-[0_8px_32px_rgba(15,23,42,0.06)] backdrop-blur-xl sm:px-5">
        <Link
          aria-label="Ana sayfaya git"
          className="group flex items-center gap-3 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400"
          href="#top"
        >
          <span className="grid size-9 place-items-center rounded-xl bg-slate-950 text-sm font-semibold tracking-tight text-white transition-transform group-hover:-rotate-3">
            YE
          </span>
          <span className="hidden sm:flex sm:flex-col">
            <span className="text-sm font-semibold leading-tight tracking-[-0.02em] text-slate-950">
              Yasin Eryılmaz
            </span>
            <span className="mt-0.5 text-[0.65rem] font-medium leading-tight tracking-wide text-slate-500">
              Frontend · Full Stack
            </span>
          </span>
        </Link>

        <nav aria-label="Ana navigasyon" className="hidden items-center gap-1 md:flex">
          {navigationItems.map((item) => (
            <Link
              key={item.href}
              className="rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-white/80 hover:text-slate-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400"
              href={item.href}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <Link
          className="hidden h-9 items-center justify-center rounded-xl bg-slate-950 px-4 text-sm font-medium text-white shadow-sm transition-colors hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 md:inline-flex"
          href="#contact"
        >
          İletişime geç
        </Link>

        <MobileNavigation />
      </div>
    </header>
  )
}
