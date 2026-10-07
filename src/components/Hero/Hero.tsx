import Image from "next/image"
import { ArrowUpRight, Code2 } from "lucide-react"
import { useTranslations } from "next-intl"

import { LiveStatusBadge } from "@/components/home/LiveStatusBadge"
import { ScrollToSection } from "@/components/ScrollToSection/ScrollToSection"
import { getYearsOfExperience } from "@/lib/experience"

export function Hero() {
  const t = useTranslations("Hero")
  const yearsOfExperience = getYearsOfExperience()

  return (
    <section
      aria-labelledby="hero-title"
      className="relative overflow-hidden px-4 pb-16 pt-24 sm:px-6 sm:pt-32 lg:px-8"
      id="top"
    >
      <div className="mx-auto max-w-6xl">
        <div className="relative grid min-h-[min(46rem,calc(100dvh-9rem))] overflow-hidden rounded-[1.4rem] bg-[#18242a] text-[#f4f7f7] md:items-center">
          <Image
            alt=""
            className="absolute inset-0 h-full w-full object-cover object-[64%_center] opacity-45 md:object-center md:opacity-75"
            fill
            priority
            sizes="(max-width: 768px) 100vw, 1152px"
            src="/images/istanbul-workspace.jpg"
          />
          <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-[#18242a] via-[#18242a]/95 to-[#18242a]/40" />
          <div className="relative px-6 py-10 sm:px-10 sm:py-16 lg:px-16">
            <p className="mb-5 text-sm font-medium text-[#c8d8df] sm:mb-7">Yasin Eryılmaz / {t("location")}</p>
            <h1
              className="max-w-[40ch] text-balance text-[clamp(2.3rem,4vw,3.8rem)] font-semibold leading-[1.06] tracking-[-0.06em] text-[#f4f7f7]"
              id="hero-title"
            >
              {t("title", { years: yearsOfExperience })}
            </h1>
            <p className="mt-5 max-w-[57ch] text-pretty text-sm leading-7 text-[#d6e0e4] sm:mt-7 sm:text-base">
              {t("description")}
            </p>
            <div className="mt-6 flex flex-wrap gap-3 sm:mt-8">
              <ScrollToSection
                className="group inline-flex min-h-11 cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-lg bg-[#d7e8ed] px-5 text-sm font-semibold text-[#162b35] transition-transform hover:-translate-y-0.5 hover:bg-white active:translate-y-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white motion-reduce:transform-none"
                targetId="projects"
              >
                {t("ctaProjects")}
                <ArrowUpRight aria-hidden="true" className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transform-none" />
              </ScrollToSection>
              <ScrollToSection
                className="inline-flex min-h-11 cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-lg border border-white/45 bg-[#18242a]/45 px-5 text-sm font-medium text-white transition-colors hover:bg-white/15 active:bg-white/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                targetId="skills"
              >
                <Code2 aria-hidden="true" className="size-4" />
                {t("ctaSkills")}
              </ScrollToSection>
            </div>
          </div>
        </div>
        {/* Next server cache, locale geçişlerinde badge verisini uzak servise yeniden gitmeden paylaşır. */}
        <LiveStatusBadge />
      </div>
    </section>
  )
}
