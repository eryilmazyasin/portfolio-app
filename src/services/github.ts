import { Redis } from '@upstash/redis';
import { unstable_cache } from 'next/cache';

// Vercel / Upstash REST istemcisi (Serverless ortamlar için en stabil yöntem)
const redis =
  process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
    ? Redis.fromEnv()
    : null;

export interface GitHubProfile {
  name: string;
  login: string;
  avatar_url: string;
  html_url: string;
  public_repos: number;
  followers: number;
  bio: string;
}

export interface GitHubActivitySummary {
  login: string;
  profileUrl: string;
  totalContributions: number;
  totalRepositories: number;
}

interface GitHubActivityGraphQLResponse {
  data?: {
    viewer: {
      login: string;
      url: string;
      contributionsCollection: {
        contributionCalendar: {
          totalContributions: number;
        };
      };
      repositories: {
        totalCount: number;
      };
    };
  };
  errors?: Array<{ message: string }>;
}

const GITHUB_ACTIVITY_QUERY = `
  query ViewerActivitySummary($from: DateTime!) {
    viewer {
      login
      url
      contributionsCollection(from: $from) {
        contributionCalendar {
          totalContributions
        }
      }
      repositories(privacy: PUBLIC) {
        totalCount
      }
    }
  }
`;

export async function getGithubProfile(): Promise<GitHubProfile | null> {
  const cacheKey = "github_profile_data";

  // 1. Redis Cache Kontrolü (Varsa doğrudan cache'ten dön)
  if (redis) {
    try {
      const cached = await redis.get<GitHubProfile>(cacheKey);
      if (cached) return cached;
    } catch (err) {
      console.warn("Upstash Redis read error:", err);
    }
  }

  // 2. GitHub API İsteği
  try {
    const token = process.env.GITHUB_TOKEN;
    const response = await fetch("https://api.github.com/user", {
      headers: {
        Accept: "application/vnd.github+json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      next: { revalidate: 3600 }, // ⏱️ Next.js ISR: 1 saatlik fallback önbellek
    });

    if (!response.ok) {
      console.error("Failed to fetch GitHub profile:", response.statusText);
      return null;
    }

    const data: GitHubProfile = await response.json();

    // 3. Redis Cache Yazma (TTL: 1 Saat / 3600 saniye)
    if (redis) {
      try {
        await redis.set(cacheKey, data, { ex: 3600 });
      } catch (err) {
        console.warn("Upstash Redis write error:", err);
      }
    }

    return data;
  } catch (error) {
    console.error("GitHub profile fetch error:", error);
    return null;
  }
}

async function fetchGithubActivitySummary(): Promise<GitHubActivitySummary | null> {
  const cacheKey = "github_account_activity_summary";

  // Redis katmanı GitHub API çağrısını azaltır ve serverless instance'lar arasında ortak bir saatlik cache sağlar.
  if (redis) {
    try {
      const cached = await redis.get<GitHubActivitySummary>(cacheKey);
      if (cached) return cached;
    } catch (error) {
      console.warn("Upstash Redis activity read error:", error);
    }
  }

  const token = process.env.GITHUB_TOKEN;

  if (!token) {
    console.error("GitHub token is not configured.");
    return null;
  }

  try {
    // GraphQL viewer sorgusu belirli bir repoya bağlanmadan hesap genelindeki katkı ve repository toplamlarını döndürür.
    const currentYearStart = `${new Date().getUTCFullYear()}-01-01T00:00:00.000Z`;
    const response = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Accept: "application/vnd.github+json",
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      // Yıl başlangıcı sabit kaldığı için Next.js fetch cache anahtarı aynı takvim yılı boyunca değişmez.
      body: JSON.stringify({
        query: GITHUB_ACTIVITY_QUERY,
        variables: { from: currentYearStart },
      }),
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      console.error(
        "Failed to fetch GitHub activity summary:",
        response.status,
        response.statusText
      );
      return null;
    }

    const result =
      (await response.json()) as GitHubActivityGraphQLResponse;

    // GraphQL HTTP 200 döndürse bile errors alanı içerebildiği için uygulama verisini ayrıca doğruluyoruz.
    if (result.errors?.length || !result.data?.viewer) {
      console.error(
        "GitHub GraphQL activity query failed:",
        result.errors ?? "Missing viewer data"
      );
      return null;
    }

    const { viewer } = result.data;
    const summary: GitHubActivitySummary = {
      login: viewer.login,
      profileUrl: viewer.url,
      totalContributions:
        viewer.contributionsCollection.contributionCalendar.totalContributions,
      totalRepositories: viewer.repositories.totalCount,
    };

    if (redis) {
      try {
        // ex değeri cache kaydını 3600 saniye sonra otomatik olarak geçersiz kılar.
        await redis.set(cacheKey, summary, { ex: 3600 });
      } catch (error) {
        console.warn("Upstash Redis activity write error:", error);
      }
    }

    return summary;
  } catch (error) {
    console.error("GitHub activity summary fetch error:", error);
    return null;
  }
}

async function fetchCacheableGithubActivitySummary(): Promise<GitHubActivitySummary> {
  const activity = await fetchGithubActivitySummary();

  // Geçici API veya ağ hataları null sonucunun bir saat boyunca cache'te kalmasına neden olmamalıdır.
  if (!activity) {
    throw new Error("GitHub activity summary is unavailable.");
  }

  return activity;
}

export const getGithubActivitySummary = unstable_cache(
  fetchCacheableGithubActivitySummary,
  ["github-account-activity-summary"],
  {
    // Next cache hit durumunda locale geçişi Upstash ağ isteğini dahi beklemeden aynı hesap özetini kullanır.
    revalidate: 3600,
    tags: ["github-activity-summary"],
  }
);
