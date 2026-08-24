import { db } from './index';
import { experiences, projects, skills } from './schema';

async function main() {
  console.log("🌱 Starting database seeding...");

  // 1. SKILLS (Yetenekler tablosunu doldurma)
  console.log("-> Inserting skills...");
  await db.insert(skills).values([
    // Frontend
    {
      name: "React.js",
      category: "Frontend",
      iconName: "React",
      isFeatured: true,
      order: 1,
    },
    {
      name: "Next.js",
      category: "Frontend",
      iconName: "Nextjs",
      isFeatured: true,
      order: 2,
    },
    {
      name: "TypeScript",
      category: "Frontend",
      iconName: "Typescript",
      isFeatured: true,
      order: 3,
    },
    {
      name: "Tailwind CSS",
      category: "Frontend",
      iconName: "Tailwindcss",
      isFeatured: true,
      order: 4,
    },
    {
      name: "Zustand / Redux",
      category: "Frontend",
      iconName: "Store",
      isFeatured: false,
      order: 5,
    },
    {
      name: "TanStack Query",
      category: "Frontend",
      iconName: "Database",
      isFeatured: false,
      order: 6,
    },
    // Backend & DB
    {
      name: "Node.js",
      category: "Backend",
      iconName: "Nodejs",
      isFeatured: true,
      order: 7,
    },
    {
      name: "PostgreSQL",
      category: "Backend",
      iconName: "Postgresql",
      isFeatured: true,
      order: 8,
    },
    {
      name: "Drizzle ORM",
      category: "Backend",
      iconName: "Drizzle",
      isFeatured: true,
      order: 9,
    },
    {
      name: "Redis",
      category: "Backend",
      iconName: "Redis",
      isFeatured: false,
      order: 10,
    },
    // DevOps & Tools
    {
      name: "Docker & Compose",
      category: "DevOps",
      iconName: "Docker",
      isFeatured: true,
      order: 11,
    },
    {
      name: "Git & GitHub Actions",
      category: "DevOps",
      iconName: "Git",
      isFeatured: false,
      order: 12,
    },
    {
      name: "Nginx",
      category: "DevOps",
      iconName: "Nginx",
      isFeatured: false,
      order: 13,
    },
  ]);

  // 2. PROJECTS (Projeler tablosunu doldurma - TR/EN destekli)
  console.log("-> Inserting projects...");
  await db.insert(projects).values([
    {
      slug: "easyjot",
      titleTr: "EasyJot - Kişisel Finans ve Gider Takip Platformu",
      titleEn: "EasyJot - Personal Finance & Expense Tracker",
      summaryTr:
        "Next.js, Node.js ve PostgreSQL ile geliştirilen, Dockerize edilmiş modern finans takip uygulaması.",
      summaryEn:
        "A modern, containerized expense and finance tracking platform built with Next.js, Node.js, and PostgreSQL.",
      descriptionTr:
        "Drizzle ORM, Redis önbellekleme ve Docker Compose çoklu konteyner mimarisi kullanılarak sıfırdan geliştirilmiş tam teşekküllü full-stack finans platformu.",
      descriptionEn:
        "A full-stack finance web app architected with Drizzle ORM, Redis caching, and a multi-container Docker Compose infrastructure.",
      techStack: [
        "Next.js",
        "TypeScript",
        "Node.js",
        "PostgreSQL",
        "Drizzle ORM",
        "Redis",
        "Docker",
      ],
      githubUrl: "https://github.com/eryilmazyasin",
      liveUrl: "https://yasineryilmaz.com",
      imageUrl: "/projects/easyjot.png",
      isFeatured: true,
      order: 1,
    },
    {
      slug: "developer-portfolio",
      titleTr: "Dinamik Geliştirici Portföyü",
      titleEn: "Dynamic Developer Portfolio",
      summaryTr:
        "Next.js 14, Tailwind CSS, next-intl ve Drizzle ORM ile çok dilli ve veritabanı destekli portföy sitesi.",
      summaryEn:
        "Multilingual and database-driven personal portfolio site powered by Next.js 14, Tailwind CSS, next-intl, and Drizzle ORM.",
      descriptionTr:
        "Performans, tip güvenliği ve SEO odaklı modern arayüz tasarımı. GitHub Actions CI/CD pipeline'ı ve Vercel üzerinde canlı dağıtım.",
      descriptionEn:
        "Performance, type-safety, and SEO-oriented developer showcase with GitHub Actions CI/CD and production deployment on Vercel.",
      techStack: [
        "Next.js",
        "TypeScript",
        "Tailwind CSS",
        "Drizzle ORM",
        "PostgreSQL",
        "next-intl",
      ],
      githubUrl: "https://github.com/eryilmazyasin/portfolio-app",
      liveUrl: "https://yasineryilmaz.com",
      imageUrl: "/projects/portfolio.png",
      isFeatured: true,
      order: 2,
    },
  ]);

  // 3. EXPERIENCES (Deneyimler tablosunu doldurma)
  console.log("-> Inserting experiences...");
  await db.insert(experiences).values([
    {
      company: "Freelance / Bağımsız Projeler",
      companyUrl: "https://yasineryilmaz.com",
      location: "İstanbul, Türkiye",
      type: "Remote",
      roleTr: "Frontend & Full-Stack Geliştirici",
      roleEn: "Frontend & Full-Stack Developer",
      descriptionTr:
        "React, Next.js, TypeScript ve modern state yönetim kütüphaneleri ile ölçeklenebilir web uygulamaları geliştirme, Docker ortamları kurma ve API entegrasyonları.",
      descriptionEn:
        "Building scalable web applications, designing Dockerized local stacks, and crafting responsive frontend architectures using React, Next.js, TypeScript, and modern state tools.",
      startDate: "2023",
      endDate: null,
      isCurrent: true,
      order: 1,
    },
  ]);

  console.log("✅ Seeding completed successfully!");
  process.exit(0);
}

main().catch((err) => {
  console.error("❌ An error occurred during seeding:", err);
  process.exit(1);
});
