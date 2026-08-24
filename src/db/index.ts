// src/db/index.ts
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

// [ÖĞRENME NOTU]: Docker'daki PostgreSQL'e bağlanmak için .env dosyasındaki adresi alıyoruz.
// Next.js server component'leri bu connection üzerinden doğrudan DB'ye erişebilecek.
const connectionString = process.env.DATABASE_URL!;

// [ÖĞRENME NOTU]: 'postgres' kütüphanesi ile veritabanı istemcisini oluşturuyoruz.
const client = postgres(connectionString);

// [ÖĞRENME NOTU]: Drizzle'ı istemcimizle sarmalayıp tüm projede kullanmak üzere dışarı aktarıyoruz.
export const db = drizzle(client);
