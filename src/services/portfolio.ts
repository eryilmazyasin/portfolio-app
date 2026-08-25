import { asc, eq } from "drizzle-orm"
import { unstable_cache } from "next/cache"

import { db } from "@/db"
import { experiences, projects, skills } from "@/db/schema"
import type {
  PortfolioExperience,
  PortfolioData,
  PortfolioProject,
  PortfolioSkill,
} from "@/services/portfolio.types"

const PORTFOLIO_CACHE_REVALIDATE_SECONDS = 3600

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

export const getPortfolioData = unstable_cache(
  async (): Promise<PortfolioData> => {
    // Locale değişse de aynı iki dilli kayıtlar kullanıldığı için üç sorguyu tek cache snapshot'ında toplar.
    const [featuredProjects, portfolioExperiences, portfolioSkills] =
      await Promise.all([getProjects(true), getExperiences(), getSkills()])

    return {
      experiences: portfolioExperiences,
      projects: featuredProjects,
      skills: portfolioSkills,
    }
  },
  ["portfolio-data"],
  {
    // İçerik seyrek değiştiğinden bir saatlik TTL gereksiz PostgreSQL roundtrip'lerini önler.
    revalidate: PORTFOLIO_CACHE_REVALIDATE_SECONDS,
    tags: ["portfolio-data"],
  }
)
