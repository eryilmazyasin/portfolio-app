import { type NextRequest, NextResponse } from "next/server"

const LOCALE_HEADER = "X-NEXT-INTL-LOCALE"

export function proxy(request: NextRequest) {
  const locale = request.nextUrl.pathname.split("/")[1]

  if (locale !== "en" && locale !== "tr") return NextResponse.next()

  // Üst layout çalışmadan önce URL dilini istek başlığına taşır; böylece html lang değeri de doğru üretilir.
  const requestHeaders = new Headers(request.headers)
  requestHeaders.set(LOCALE_HEADER, locale)

  return NextResponse.next({ request: { headers: requestHeaders } })
}

export const config = {
  matcher: ["/en/:path*", "/tr/:path*"],
}
