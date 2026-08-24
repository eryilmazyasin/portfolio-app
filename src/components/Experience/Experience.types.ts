import type { PortfolioExperience } from "@/services/portfolio.types"

export interface ExperienceProps {
  experiences: PortfolioExperience[]
  locale: "en" | "tr"
}
