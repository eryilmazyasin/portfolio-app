import { Boxes, Container, Database, PanelsTopLeft, Wrench } from "lucide-react"

export const CATEGORY_PRESENTATIONS = {
  frontend: {
    titleKey: "frontendTitle",
    descriptionKey: "frontendDesc",
    icon: PanelsTopLeft,
    accentClassName:
      "bg-gradient-to-r from-transparent via-sky-400/80 to-transparent",
    cardClassName:
      "hover:border-sky-300/70 hover:shadow-[0_18px_48px_rgba(14,165,233,0.10)] dark:hover:border-cyan-400/30 dark:hover:shadow-[0_18px_48px_rgba(6,182,212,0.08)]",
    iconClassName:
      "border-sky-200/80 bg-sky-50/80 text-sky-600 dark:border-cyan-400/20 dark:bg-cyan-400/10 dark:text-cyan-300",
    badgeClassName:
      "border-sky-200/80 bg-sky-50/60 text-sky-800 hover:border-sky-300 hover:bg-sky-100/80 hover:shadow-[0_0_18px_rgba(14,165,233,0.22)] dark:border-cyan-400/20 dark:bg-cyan-400/[0.07] dark:text-cyan-200 dark:hover:border-cyan-300/40 dark:hover:bg-cyan-400/15 dark:hover:shadow-[0_0_20px_rgba(34,211,238,0.16)]",
  },
  state: {
    titleKey: "stateTitle",
    descriptionKey: "stateDesc",
    icon: Boxes,
    accentClassName:
      "bg-gradient-to-r from-transparent via-sky-400/80 to-transparent",
    cardClassName:
      "hover:border-sky-300/70 hover:shadow-[0_18px_48px_rgba(14,165,233,0.10)] dark:hover:border-cyan-400/30",
    iconClassName:
      "border-sky-200/80 bg-sky-50/80 text-sky-600 dark:border-cyan-400/20 dark:bg-cyan-400/10 dark:text-cyan-300",
    badgeClassName:
      "border-sky-200/80 bg-sky-50/60 text-sky-800 hover:border-sky-300 hover:bg-sky-100/80 hover:shadow-[0_0_18px_rgba(14,165,233,0.22)] dark:border-cyan-400/20 dark:bg-cyan-400/[0.07] dark:text-cyan-200 dark:hover:border-cyan-300/40 dark:hover:bg-cyan-400/15",
  },
  backend: {
    titleKey: "backendTitle",
    descriptionKey: "backendDesc",
    icon: Database,
    accentClassName:
      "bg-gradient-to-r from-transparent via-emerald-400/80 to-transparent",
    cardClassName:
      "hover:border-emerald-300/70 hover:shadow-[0_18px_48px_rgba(16,185,129,0.10)] dark:hover:border-emerald-400/30 dark:hover:shadow-[0_18px_48px_rgba(16,185,129,0.08)]",
    iconClassName:
      "border-emerald-200/80 bg-emerald-50/80 text-emerald-600 dark:border-emerald-400/20 dark:bg-emerald-400/10 dark:text-emerald-300",
    badgeClassName:
      "border-emerald-200/80 bg-emerald-50/60 text-emerald-800 hover:border-emerald-300 hover:bg-emerald-100/80 hover:shadow-[0_0_18px_rgba(16,185,129,0.22)] dark:border-emerald-400/20 dark:bg-emerald-400/[0.07] dark:text-emerald-200 dark:hover:border-emerald-300/40 dark:hover:bg-emerald-400/15 dark:hover:shadow-[0_0_20px_rgba(52,211,153,0.16)]",
  },
  devops: {
    titleKey: "devopsTitle",
    descriptionKey: "devopsDesc",
    icon: Container,
    accentClassName:
      "bg-gradient-to-r from-transparent via-amber-400/80 to-transparent",
    cardClassName:
      "hover:border-amber-300/70 hover:shadow-[0_18px_48px_rgba(245,158,11,0.10)] dark:hover:border-orange-400/30 dark:hover:shadow-[0_18px_48px_rgba(251,146,60,0.08)]",
    iconClassName:
      "border-amber-200/80 bg-amber-50/80 text-amber-700 dark:border-orange-400/20 dark:bg-orange-400/10 dark:text-orange-300",
    badgeClassName:
      "border-amber-200/80 bg-amber-50/60 text-amber-900 hover:border-amber-300 hover:bg-amber-100/80 hover:shadow-[0_0_18px_rgba(245,158,11,0.22)] dark:border-orange-400/20 dark:bg-orange-400/[0.07] dark:text-orange-200 dark:hover:border-orange-300/40 dark:hover:bg-orange-400/15 dark:hover:shadow-[0_0_20px_rgba(251,146,60,0.16)]",
  },
  tooling: {
    titleKey: "toolingTitle",
    descriptionKey: "toolingDesc",
    icon: Wrench,
    accentClassName:
      "bg-gradient-to-r from-transparent via-violet-400/80 to-transparent",
    cardClassName:
      "hover:border-violet-300/70 hover:shadow-[0_18px_48px_rgba(139,92,246,0.10)] dark:hover:border-violet-400/30 dark:hover:shadow-[0_18px_48px_rgba(167,139,250,0.08)]",
    iconClassName:
      "border-violet-200/80 bg-violet-50/80 text-violet-600 dark:border-violet-400/20 dark:bg-violet-400/10 dark:text-violet-300",
    badgeClassName:
      "border-violet-200/80 bg-violet-50/60 text-violet-800 hover:border-violet-300 hover:bg-violet-100/80 hover:shadow-[0_0_18px_rgba(139,92,246,0.22)] dark:border-violet-400/20 dark:bg-violet-400/[0.07] dark:text-violet-200 dark:hover:border-violet-300/40 dark:hover:bg-violet-400/15 dark:hover:shadow-[0_0_20px_rgba(167,139,250,0.16)]",
  },
} as const
