import { asc, eq } from "drizzle-orm"

import { db } from "@/db"
import { experiences, projects, skills } from "@/db/schema"
import type {
  PortfolioExperience,
  PortfolioProject,
  PortfolioSkill,
} from "@/services/portfolio.types"

export async function getSkills(): Promise<PortfolioSkill[]> {
  // asc operatörü SQL tarafında artan sıralama üretir; id ikincil sıralaması eşit order değerlerinde kararlı sonuç sağlar.
  return db
    .select()
    .from(skills)
    .orderBy(asc(skills.order), asc(skills.id))
}

export async function getProjects(
  featuredOnly = false
): Promise<PortfolioProject[]> {
  if (featuredOnly) {
    // eq operatörü kolon ile değeri tip güvenli biçimde karşılaştırarak WHERE koşulunu oluşturur.
    return db
      .select()
      .from(projects)
      .where(eq(projects.isFeatured, true))
      .orderBy(asc(projects.order), asc(projects.id))
  }

  // select().from() çağrısı şemadaki kolonlardan dönüş tipini otomatik olarak çıkarır.
  return db
    .select()
    .from(projects)
    .orderBy(asc(projects.order), asc(projects.id))
}

export async function getProjectBySlug(
  slug: string
): Promise<PortfolioProject | null> {
  // limit(1) veritabanından gereksiz satır taşınmasını önler; unique slug tek kayıt garantisini destekler.
  const [project] = await db
    .select()
    .from(projects)
    .where(eq(projects.slug, slug))
    .limit(1)

  return project ?? null
}

export async function getExperiences(): Promise<PortfolioExperience[]> {
  return db
    .select()
    .from(experiences)
    .orderBy(asc(experiences.order), asc(experiences.id))
}
