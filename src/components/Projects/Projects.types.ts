import type { PortfolioProject } from "@/services/portfolio.types"

export interface ProjectsProps {
  locale: "en" | "tr"
  projects: PortfolioProject[]
}
