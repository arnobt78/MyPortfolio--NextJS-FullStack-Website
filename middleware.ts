import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const supportedLanguages = ["en", "de"];

export function middleware(request: NextRequest) {
  // Redirect non-www and vercel.app to www (308 = permanent, tells Google canonical URL)
  const host = request.headers.get("host") ?? "";
  if (host === "arnobmahmud.com" || host === "arnob-mahmud.vercel.app") {
    const url = request.nextUrl.clone();
    url.host = "www.arnobmahmud.com";
    url.protocol = "https:";
    return NextResponse.redirect(url, 308);
  }

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
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|assets|monitoring).*)"],
};
