import { CATEGORY_PRESENTATIONS } from "@/components/Skills/Skills.constants"
import type { PortfolioSkill } from "@/services/portfolio.types"

export function groupSkillsByCategory(skills: PortfolioSkill[]) {
  // Map kullanımı kategori başına tek bir grup oluşturur ve sorgudan gelen skill sırasını korur.
  const groups = new Map<string, PortfolioSkill[]>()

  for (const skill of skills) {
    const group = groups.get(skill.category) ?? []
    group.push(skill)
    groups.set(skill.category, group)
  }

  return Array.from(groups, ([category, items]) => ({ category, items }))
}

export function getCategoryPresentation(category: string) {
  const normalizedCategory = category.toLowerCase()

  if (normalizedCategory.includes("front")) {
    return CATEGORY_PRESENTATIONS.frontend
  }

  if (normalizedCategory.includes("state")) {
    return CATEGORY_PRESENTATIONS.state
  }

  if (normalizedCategory.includes("devops")) {
    return CATEGORY_PRESENTATIONS.devops
  }

  if (normalizedCategory.includes("back")) {
    return CATEGORY_PRESENTATIONS.backend
  }

  if (normalizedCategory.includes("tool")) {
    return CATEGORY_PRESENTATIONS.tooling
  }

  return null
}
