import type { MetadataRoute } from "next"

const BASE_URL = "https://yasineryilmaz.com"

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
      // Dil alternatifleri arama motorlarına aynı içeriğin yerelleştirilmiş URL'lerini bildirir.
      alternates: {
        languages: {
          en: `${BASE_URL}/en`,
          tr: `${BASE_URL}/tr`,
        },
      },
    },
  ]
}
