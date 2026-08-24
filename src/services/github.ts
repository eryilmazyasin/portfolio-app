import Redis from 'ioredis';

// Global Redis istemcisi (Lazy & Error-safe)
let redis: Redis | null = null;

function getRedisClient(): Redis | null {
  // Eğer REDIS_URL tanımlı değilse (örneğin Vercel'de henüz eklenmediyse) Redis'i başlatma
  if (!process.env.REDIS_URL) {
    return null;
  }

  if (!redis) {
    redis = new Redis(process.env.REDIS_URL, {
      lazyConnect: true,
      maxRetriesPerRequest: 1,
      enableOfflineQueue: false,
    });

    // Bağlantı koparsa veya hata verirse build'in çökmesini engelliyoruz
    redis.on("error", (err) => {
      console.warn(
        "Redis bağlantı uyarısı (Cache devre dışı bırakıldı):",
        err.message,
      );
    });
  }

  return redis;
}

export async function getGithubProfile() {
  const cacheKey = "github_profile";
  const client = getRedisClient();

  // 1. ADIM: Redis aktifse ve çalışıyorsa Cache'e bak
  if (client) {
    try {
      if (client.status !== "ready" && client.status !== "connecting") {
        await client.connect();
      }
      const cachedData = await client.get(cacheKey);
      if (cachedData) {
        console.log("Veri Redis'ten (Cache) getirildi!");
        return JSON.parse(cachedData);
      }
    } catch (error) {
      console.warn("Redis okuma hatası, API'ye geçiliyor:", error);
    }
  }

  // 2. ADIM: Cache yoksa veya Redis kapalıysa doğrudan GitHub API'ye istek at
  console.log("Veri GitHub API'den çekiliyor...");
  const headers: HeadersInit = {};
  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }

  const response = await fetch("https://api.github.com/user", {
    headers,
    next: { revalidate: 3600 }, // Next.js'in kendi cache mekanizmasını da yedek olarak ekliyoruz
  });

  if (!response.ok) {
    throw new Error("GitHub verisi çekilemedi");
  }

  const data = await response.json();

  // 3. ADIM: Veri başarıyla geldiyse ve Redis aktifse Cache'e yaz
  if (client) {
    try {
      await client.set(cacheKey, JSON.stringify(data), "EX", 3600);
    } catch (error) {
      console.warn("Redis yazma hatası:", error);
    }
  }

  return data;
}
