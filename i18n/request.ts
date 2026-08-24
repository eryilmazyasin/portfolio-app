import { cookies } from "next/headers"
import { getRequestConfig } from "next-intl/server"

export default getRequestConfig(async () => {
  // Yalnızca desteklenen cookie değerlerini kabul eder; diğer tüm durumlarda İngilizce kullanılır.
  const cookieLocale = (await cookies()).get("NEXT_LOCALE")?.value
  const locale = cookieLocale === "tr" ? "tr" : "en"

  return {
    locale,
    messages: (await import(`../locales/${locale}.json`)).default,
  }
})
