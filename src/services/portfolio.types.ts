import { experiences, projects, skills } from "@/db/schema"

export type PortfolioExperience = typeof experiences.$inferSelect
export type PortfolioProject = typeof projects.$inferSelect
export type PortfolioSkill = typeof skills.$inferSelect
