import type { Metadata } from "next"
import { notFound } from "next/navigation"

import type {
  LocaleLayoutProps,
  LocaleRouteProps,
  SupportedLocale,
} from "./types"

const BASE_URL = "https://yasineryilmaz.com"

const SEO_CONTENT = {
  en: {
    title: "Yasin Eryılmaz | Frontend & Full-Stack Developer",
    description:
      "Frontend and Full-Stack Developer with 6+ years of experience building reliable, scalable products with Next.js, React, Node.js, PostgreSQL, and Docker.",
    locale: "en_US",
  },
  tr: {
    title: "Yasin Eryılmaz | Frontend & Full-Stack Geliştirici",
    description:
      "Next.js, React, Node.js, PostgreSQL ve Docker ile güvenilir ve ölçeklenebilir ürünler geliştiren, 6+ yıl deneyimli Frontend ve Full-Stack geliştirici.",
    locale: "tr_TR",
  },
} as const

const COMMON_KEYWORDS = [
  "Yasin Eryılmaz",
  "Frontend Developer",
  "Full-Stack Developer",
  "Software Engineer",
  "Next.js Developer",
  "React Developer",
  "TypeScript",
  "Redux",
  "Node.js",
  "PostgreSQL",
  "Docker",
  "Web Development",
]

function isSupportedLocale(locale: string): locale is SupportedLocale {
  return locale === "en" || locale === "tr"
}

export function generateStaticParams() {
  // İki dilin de derleme sırasında bilinen, indekslenebilir sayfalara dönüşmesini sağlar.
  return [{ locale: "en" }, { locale: "tr" }]
}

export async function generateMetadata({
  params,
}: LocaleRouteProps): Promise<Metadata> {
  const { locale: routeLocale } = await params
  const locale = isSupportedLocale(routeLocale) ? routeLocale : "en"
  const content = SEO_CONTENT[locale]
  const socialImageUrl = `/${locale}/opengraph-image`

  return {
    metadataBase: new URL(BASE_URL),
    title: content.title,
    description: content.description,
    keywords: [
      ...COMMON_KEYWORDS,
      ...(locale === "tr" ? ["Yazılım Geliştirici"] : []),
    ],
    authors: [{ name: "Yasin Eryılmaz", url: BASE_URL }],
    openGraph: {
      type: "website",
      locale: content.locale,
      url: BASE_URL,
      siteName: "Yasin Eryılmaz Portfolio",
      title: content.title,
      description: content.description,
      // Mutlak URL metadataBase üzerinden çözülür; WhatsApp gibi scraper'lar banner rotasını doğrudan okuyabilir.
      images: [
        {
          url: socialImageUrl,
          width: 1200,
          height: 630,
          alt: "Yasin Eryılmaz — Frontend & Full-Stack Developer",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: content.title,
      description: content.description,
      images: [
        {
          url: socialImageUrl,
          alt: "Yasin Eryılmaz — Frontend & Full-Stack Developer",
        },
      ],
    },
    alternates: {
      canonical: `/${locale}`,
      languages: {
        en: "/en",
        tr: "/tr",
      },
    },
  }
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params

  if (!isSupportedLocale(locale)) notFound()

  return children
}
