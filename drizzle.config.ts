import * as dotenv from "dotenv";
// drizzle.config.ts
import { defineConfig } from "drizzle-kit";

// [ÖĞRENME NOTU]: Terminal komutlarında çevre değişkenlerini (.env) okuyabilmek için dotenv kullanıyoruz.
dotenv.config({ path: ".env" });

export default defineConfig({
  schema: "./src/db/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    // dotenv sayesinde process.env.DATABASE_URL artık undefined dönmeyecek.
    url: process.env.DATABASE_URL!,
  },
  verbose: true,
  strict: true,
});
