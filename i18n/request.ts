import { cookies, headers } from "next/headers"
import { getRequestConfig } from "next-intl/server"

const LOCALE_HEADER = "X-NEXT-INTL-LOCALE"

export default getRequestConfig(async () => {
  // Proxy, yerelleştirilmiş URL segmentini üst layout çalışmadan önce istek başlığına taşır.
  const routeLocale = (await headers()).get(LOCALE_HEADER)
  // Yalnızca desteklenen cookie değerlerini kabul eder; diğer tüm durumlarda İngilizce kullanılır.
  const cookieLocale = (await cookies()).get("NEXT_LOCALE")?.value
  const cookieFallbackLocale = cookieLocale === "tr" ? "tr" : "en"
  // URL'deki desteklenen dil segmenti SEO sayfalarında cookie tercihinden daha yüksek önceliğe sahiptir.
  const locale =
    routeLocale === "en" || routeLocale === "tr"
      ? routeLocale
      : cookieFallbackLocale

  return {
    locale,
    messages: (await import(`../locales/${locale}.json`)).default,
  }
})
