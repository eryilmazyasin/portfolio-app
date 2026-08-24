import { boolean, json, pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';

// 1. PROJELER TABLOSU (Projects - i18n Destekli)
export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull().unique(), // URL dostu isim (örn: /projects/hotel-automation)

  // Çoklu dil alanları
  titleTr: text("title_tr").notNull(),
  titleEn: text("title_en").notNull(),
  summaryTr: text("summary_tr"), // Kartlarda görünen kısa özet
  summaryEn: text("summary_en"),
  descriptionTr: text("description_tr").notNull(), // Detaylı vaka analizi / açıklama
  descriptionEn: text("description_en").notNull(),

  // Proje detayları ve linkler
  techStack: json("tech_stack").$type<string[]>().notNull(), // Örn: ["Next.js", "TypeScript", "Tailwind CSS", "Docker"]
  githubUrl: text("github_url"),
  liveUrl: text("live_url"),
  imageUrl: text("image_url"), // Proje kapak görseli

  isFeatured: boolean("is_featured").default(false), // Öne çıkanlar bölümünde listelemek için
  order: serial("order"), // Sıralama önceliği
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// 2. DENEYİMLER / İŞ GEÇMİŞİ TABLOSU (Experiences - i18n Destekli)
export const experiences = pgTable("experiences", {
  id: serial("id").primaryKey(),
  company: text("company").notNull(), // Şirket Adı
  companyUrl: text("company_url"), // Şirket Web Sitesi
  location: text("location"), // Örn: "İstanbul, Türkiye"
  type: text("type"), // Örn: "Full-time / Remote"

  // Pozisyon & Görev Tanımları (TR / EN)
  roleTr: text("role_tr").notNull(), // Örn: "Kıdemli Frontend Geliştirici"
  roleEn: text("role_en").notNull(), // Örn: "Senior Frontend Developer"
  descriptionTr: text("description_tr").notNull(), // Yapılan işler / Başarılar
  descriptionEn: text("description_en").notNull(),

  startDate: text("start_date").notNull(), // Örn: "Ekim 2023" veya "Oct 2023"
  endDate: text("end_date"), // Null ise "Halen Devam Ediyor / Present"
  isCurrent: boolean("is_current").default(false),

  order: serial("order"), // Sıralama önceliği
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// 3. YETENEKLER TABLOSU (Skills)
export const skills = pgTable("skills", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(), // Örn: "TypeScript", "Next.js", "PostgreSQL", "Docker"
  category: text("category").notNull(), // Örn: "Frontend", "Backend", "DevOps & Tools", "State Management"
  iconName: text("icon_name"), // Lucide icon adı veya SVG referansı
  isFeatured: boolean("is_featured").default(false),
  order: serial("order"),
});

// 4. İLETİŞİM MESAJLARI TABLOSU (Messages)
export const messages = pgTable("messages", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  subject: text("subject"),
  content: text("content").notNull(),
  isRead: boolean("is_read").default(false), // Admin okundu takibi
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
