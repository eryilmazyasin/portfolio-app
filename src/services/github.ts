import Redis from 'ioredis';

// Sadece REDIS_URL varsa Redis'i ayağa kaldır, yoksa null dön (localhost'a asla düşme!)
const redisUrl = process.env.REDIS_URL;
const redis = redisUrl
  ? new Redis(redisUrl, { maxRetriesPerRequest: 1 })
  : null;

export async function getGithubProfile() {
  const cacheKey = "github_profile";

  // 1. Eğer Redis aktifse cache'e bak
  if (redis) {
    try {
      const cachedData = await redis.get(cacheKey);
      if (cachedData) {
        return JSON.parse(cachedData);
      }
    } catch (err) {
      console.warn("Redis okuma hatası:", err);
    }
  }

  // 2. Cache yoksa veya Redis yok direkt GitHub API'ye git
  const response = await fetch("https://api.github.com/user", {
    headers: {
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
    },
    next: { revalidate: 3600 },
  });

  if (!response.ok) {
    throw new Error("GitHub verisi çekilemedi");
  }

  const data = await response.json();

  // 3. Redis aktifse cache'e yaz
  if (redis) {
    try {
      await redis.set(cacheKey, JSON.stringify(data), "EX", 3600);
    } catch (err) {
      console.warn("Redis yazma hatası:", err);
    }
  }

  return data;
}
