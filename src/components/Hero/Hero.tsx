import Link from "next/link"
import { ArrowDown, ArrowUpRight, Code2 } from "lucide-react"

export function Hero() {
  return (
    <section
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-svh items-center overflow-hidden px-4 pb-16 pt-32 font-sans sm:px-6 sm:pt-36 lg:px-8"
      id="top"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-20 bg-[linear-gradient(to_right,rgba(148,163,184,0.10)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.10)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:linear-gradient(to_bottom,black,transparent_85%)]"
      />
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-0 -z-10 h-[36rem] w-[52rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(148,163,184,0.22),transparent_68%)] blur-2xl"
      />

      <div className="mx-auto w-full max-w-6xl">
        <div className="max-w-5xl">
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-slate-200/80 bg-white/75 px-3 py-1.5 text-xs font-medium text-slate-600 shadow-sm backdrop-blur-xl sm:text-sm">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-60 motion-reduce:animate-none" />
              <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
            </span>
            Yeni projeler için müsait
          </div>

          <h1
            className="max-w-5xl text-balance font-sans text-5xl font-semibold leading-[0.96] tracking-[-0.06em] text-slate-950 sm:text-7xl lg:text-[6rem] lg:leading-[0.94]"
            id="hero-title"
          >
            6+ yıllık deneyimle, ölçeklenen dijital ürünler geliştiriyorum.
          </h1>

          <div className="mt-10 grid gap-9 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
            <p className="max-w-2xl text-pretty text-base font-normal leading-7 text-slate-600 sm:text-lg sm:leading-8">
              Frontend ve Full-Stack geliştirici olarak; Next.js, Node.js,
              PostgreSQL ve Docker ile ürünleri ilk kurulumdan production
              dağıtımına kadar uçtan uca hayata geçiriyorum. Teslimat odaklı,
              analitik yaklaşımımla temiz, ölçeklenebilir ve performanslı
              deneyimler üretiyorum.
            </p>

            <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
              <Link
                className="group inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-slate-950 px-5 text-sm font-medium text-white shadow-[0_10px_30px_rgba(15,23,42,0.18)] transition-all hover:-translate-y-0.5 hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 motion-reduce:transform-none"
                href="#projects"
              >
                Projeleri incele
                <ArrowUpRight
                  aria-hidden="true"
                  className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transform-none"
                />
              </Link>
              <Link
                className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white/70 px-5 text-sm font-medium text-slate-700 shadow-sm backdrop-blur-xl transition-colors hover:border-slate-300 hover:bg-white hover:text-slate-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2"
                href="#skills"
              >
                <Code2 aria-hidden="true" className="size-4" />
                Yeteneklerim
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-16 flex items-center justify-between border-t border-slate-200/80 pt-5 text-xs font-medium uppercase tracking-[0.16em] text-slate-400 sm:mt-24">
          <span>İstanbul, Türkiye</span>
          <Link
            aria-label="Sonraki bölüme kaydır"
            className="flex items-center gap-2 rounded-lg py-1 text-slate-500 transition-colors hover:text-slate-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400"
            href="#skills"
          >
            Keşfet
            <ArrowDown aria-hidden="true" className="size-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
