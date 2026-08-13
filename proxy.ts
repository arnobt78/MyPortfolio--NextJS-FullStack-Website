import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const supportedLanguages = ["en", "de"];

// Next 16 request interceptor: keep `proxy` (Node runtime). Do not restore middleware.ts.
export function proxy(request: NextRequest) {
  const cookieLang = request.cookies.get("selectedLanguage")?.value;
  let lang = "en";
  if (cookieLang && supportedLanguages.includes(cookieLang)) {
    lang = cookieLang;
  } else {
    const browserLang = request.headers.get("accept-language")?.toLowerCase() ?? "en";
    if (browserLang.startsWith("de")) lang = "de";
  }
  const response = NextResponse.next();
  response.headers.set("x-initial-language", lang);
  response.headers.set("x-pathname", request.nextUrl.pathname);
  return response;
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|assets|monitoring|robots.txt|sitemap.xml).*)"],
};
