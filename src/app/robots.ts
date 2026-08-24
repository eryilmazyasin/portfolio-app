import type { MetadataRoute } from "next"

const BASE_URL = "https://yasineryilmaz.com"

export default function robots(): MetadataRoute.Robots {
  return {
    // Genel sayfalar taranabilir; form ve diğer sunucu uçları arama indeksinin dışında tutulur.
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/"],
    },
    sitemap: `${BASE_URL}/sitemap.xml`,
  }
}
