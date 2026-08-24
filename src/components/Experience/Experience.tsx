import { BriefcaseBusiness } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const experiences = [
  {
    company: "Metus",
    role: "Frontend Developer",
    period: "Ağustos 2021 — Günümüz",
    description:
      "React.js ile Metance ürününü, Next.js ile yüksek performanslı landing page'leri geliştiriyorum; TypeScript, TanStack Query ve SignalR ile sürdürülebilir ürün deneyimleri oluşturuyorum.",
    technologies: ["React.js", "Next.js", "TypeScript", "TanStack Query", "SignalR"],
  },
  {
    company: "Freelance",
    role: "Full Stack Developer",
    period: "2023 — Günümüz",
    description:
      "Otel yönetim otomasyonu için frontend ve backend mimarisini uçtan uca geliştiriyor; operasyonel ihtiyaçları güvenilir ve ölçeklenebilir ürün akışlarına dönüştürüyorum.",
    technologies: ["React.js", "TypeScript", "Node.js", "MySQL"],
  },
  {
    company: "Akinon & Detroit Digital",
    role: "Frontend Developer",
    period: "Önceki deneyim · Toplam 2,5+ yıl",
    description:
      "E-ticaret ürünleri ve kurumsal web projeleri için yeniden kullanılabilir, ölçeklenebilir ve kullanıcı odaklı arayüz mimarileri geliştirdim.",
    technologies: ["E-ticaret", "Kurumsal UI", "Frontend Architecture"],
  },
] as const

export function Experience() {
  return (
    <section
      aria-labelledby="experience-title"
      className="bg-slate-50 px-4 py-24 font-sans sm:px-6 sm:py-32 lg:px-8"
      id="experience"
    >
      <div className="mx-auto max-w-6xl">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
            Kariyer yolculuğu
          </p>
          <h2
            className="mt-4 text-4xl font-semibold tracking-[-0.045em] text-slate-950 sm:text-5xl"
            id="experience-title"
          >
            Deneyim
          </h2>
          <p className="mt-5 text-pretty text-base leading-7 text-slate-600">
            Ürün geliştirme, e-ticaret ve kurumsal projelerde; fikir aşamasından
            production teslimatına uzanan 6+ yıllık deneyim.
          </p>
        </div>

        <ol className="relative mt-14 space-y-5 before:absolute before:bottom-8 before:left-[0.4375rem] before:top-8 before:w-px before:bg-slate-200 sm:ml-2 sm:space-y-6">
          {experiences.map((experience, index) => (
            <li className="relative pl-8 sm:pl-10" key={experience.company}>
              <span
                aria-hidden="true"
                className="absolute left-0 top-8 z-10 grid size-3.5 place-items-center rounded-full border-4 border-slate-50 bg-slate-950 ring-1 ring-slate-300"
              />

              <Card className="gap-0 rounded-2xl border-0 bg-white py-0 shadow-[0_8px_32px_rgba(15,23,42,0.04)] ring-1 ring-slate-200/80">
                <CardHeader className="gap-4 border-b border-slate-100 p-6 sm:grid-cols-[1fr_auto] sm:p-7">
                  <div>
                    <div className="flex items-center gap-2 text-sm font-medium text-slate-500">
                      <BriefcaseBusiness aria-hidden="true" className="size-4" />
                      {experience.company}
                    </div>
                    <CardTitle className="mt-3 text-xl font-semibold tracking-[-0.025em] text-slate-950 sm:text-2xl">
                      {experience.role}
                    </CardTitle>
                  </div>
                  <CardDescription className="text-sm font-medium text-slate-400 sm:text-right">
                    {experience.period}
                  </CardDescription>
                </CardHeader>

                <CardContent className="grid gap-6 p-6 sm:p-7 lg:grid-cols-[1fr_auto] lg:items-end">
                  <p className="max-w-3xl text-sm leading-6 text-slate-600 sm:text-base sm:leading-7">
                    {experience.description}
                  </p>
                  <div className="flex flex-wrap gap-2 lg:max-w-sm lg:justify-end">
                    {experience.technologies.map((technology) => (
                      <Badge
                        className="border-slate-200 bg-slate-50 text-slate-600"
                        key={technology}
                        variant="outline"
                      >
                        {technology}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <span className="sr-only">Deneyim {index + 1}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
