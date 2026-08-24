// src/db/schema.ts
import {
  boolean,
  json,
  pgTable,
  serial,
  text,
  timestamp,
} from "drizzle-orm/pg-core";

// 1. PROJELER TABLOSU
// [ÖĞRENME NOTU]: Veritabanı tiplerini (text, serial, boolean) TypeScript ile eşleştiriyoruz.
export const projects = pgTable("projects", {
  id: serial("id").primaryKey(), // Otomatik artan, benzersiz kimlik (Primary Key)
  title: text("title").notNull(), // Projenin görünen adı
  slug: text("slug").notNull().unique(), // URL dostu isim (örn: /projects/hotel-automation)
  description: text("description").notNull(), // Vaka analizi veya kısa açıklama
  techStack: json("tech_stack").notNull(), // Kullanılan teknolojiler (Örn: ["React", "Next.js", "Docker"])
  githubUrl: text("github_url"), // Kaynak kod linki (Opsiyonel)
  liveUrl: text("live_url"), // Canlı demo linki (Opsiyonel)
  isFeatured: boolean("is_featured").default(false), // Anasayfada veya öne çıkanlarda göstermek için
  createdAt: timestamp("created_at").defaultNow(), // Kaydın oluşturulma tarihi
});

// 2. YETENEKLER TABLOSU
export const skills = pgTable("skills", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(), // Yetenek adı (örn: TypeScript, Tailwind)
  category: text("category").notNull(), // Gruplamak için (örn: Frontend, Backend, DevOps)
});

// 3. İLETİŞİM MESAJLARI TABLOSU
export const messages = pgTable("messages", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  content: text("content").notNull(),
  isRead: boolean("is_read").default(false), // Admin panelinde mesajı 'okundu' yapmak için
  createdAt: timestamp("created_at").defaultNow(),
});
