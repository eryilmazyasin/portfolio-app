// src/services/github.ts
import Redis from "ioredis";

// [ÖĞRENME NOTU]: Redis bağlantısını .env'den alıyoruz.
// Proje canlıya (production) çıktığında Vercel üzerinden sunucusuz Upstash URL'ini alacak.
const redis = new Redis(process.env.REDIS_URL || "redis://localhost:6379");

export async function getGithubProfile() {
  const cacheKey = "github_profile";

  // 1. ADIM: Veri Redis'te (Cache) var mı diye kontrol et
  const cachedData = await redis.get(cacheKey);

  if (cachedData) {
    // [ÖĞRENME NOTU]: Eğer veri önbellekte varsa, GitHub API'yi hiç yormadan anında geri dönüyoruz.
    console.log("Veri Redis'ten (Cache) getirildi!");
    return JSON.parse(cachedData);
  }

  // 2. ADIM: Cache'de yoksa, GitHub API'sine istek at
  console.log("Veri GitHub API'den çekiliyor...");
  const response = await fetch("https://api.github.com/user", {
    headers: {
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
    },
  });

  if (!response.ok) {
    throw new Error("GitHub verisi çekilemedi");
  }

  const data = await response.json();

  // 3. ADIM: Çekilen veriyi 1 saat (3600 saniye) boyunca Redis'te sakla (Cachele)
  // [ÖĞRENME NOTU]: EX parametresi "Expire" (Süresi Dolma) anlamına gelir.
  await redis.set(cacheKey, JSON.stringify(data), "EX", 3600);

  return data;
}
