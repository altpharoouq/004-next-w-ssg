import { NextRequest, NextResponse } from "next/server";

import locale from "./utils/locale";
import nonlocalePages from "./config/nonlocalePages.json";

const PUBLIC_FILE = /\.(.*)$/;

const updateLanguageRequestParameter = (
  symbol: any,
  language: any,
  req: NextRequest
) => {
  const referer = req.headers.get("referer");
  const url = new URL(referer);
  const params = new URLSearchParams(url.search);

  const languageParam = params.get("language");

  const languageConfig = locale.languageConfig(symbol, language);

  if (languageParam) {
    req.nextUrl.searchParams.set("language", languageParam);
  }

  if (!languageConfig.isValid || languageConfig.isDefault) {
    req.nextUrl.searchParams.delete("language");
  }

  return;
};

export async function middleware(req: NextRequest) {
  const validatedCountryFromCookie = locale.isValidSymbol(
    req.cookies.get("locale")
  );

  const validatedCountryFromUrl = locale.isValidSymbol(req.nextUrl.locale);
  const language = req.nextUrl.searchParams.get("language");

  if (
    req.nextUrl.pathname.startsWith("/_next") ||
    nonlocalePages.some((page) => req.nextUrl.pathname.startsWith(page)) ||
    req.nextUrl.pathname.includes("/api/") ||
    PUBLIC_FILE.test(req.nextUrl.pathname)
  ) {
    return;
  }

  // No locale provided
  if (!validatedCountryFromUrl.status && !validatedCountryFromCookie.status) {
    return NextResponse.redirect(new URL(`/welcome`, req.url));
  }

  // Picks locale from URL
  if (validatedCountryFromUrl.status && !validatedCountryFromCookie.status) {
    updateLanguageRequestParameter(
      validatedCountryFromUrl.urlCompatible,
      language,
      req
    );

    const response = NextResponse.redirect(req.url);
    response.cookies.set("locale", validatedCountryFromUrl.urlCompatible);

    return response;
  }

  // Picks locale from cookie
  if (!validatedCountryFromUrl.status && validatedCountryFromCookie.status) {
    updateLanguageRequestParameter(
      validatedCountryFromCookie.urlCompatible,
      language,
      req
    );

    return NextResponse.redirect(
      new URL(
        `/${validatedCountryFromCookie.urlCompatible}${req.nextUrl.pathname}${req.nextUrl.search}`,
        req.url
      )
    );
  }

  // Overrides the locale from cookie if a different one is set on URL
  if (
    validatedCountryFromUrl.status &&
    validatedCountryFromCookie.status &&
    validatedCountryFromUrl.urlCompatible !==
      validatedCountryFromCookie.urlCompatible
  ) {
    updateLanguageRequestParameter(
      validatedCountryFromUrl.urlCompatible,
      language,
      req
    );

    const response = NextResponse.redirect(req.url);
    response.cookies.set("locale", validatedCountryFromUrl.urlCompatible);

    return response;
  } else {
    // const referer = req.headers.get("referer");
    // const url = new URL(referer);
    // const params = new URLSearchParams(url.search);

    // const languageParam = params.get("language");

    const languageConfig = locale.languageConfig(
      validatedCountryFromUrl.urlCompatible,
      language
    );

    // if (languageParam && !req.nextUrl.searchParams.get("language")) {
    //   req.nextUrl.searchParams.set("language", languageParam);

    //   const response = NextResponse.redirect(req.url);

    //   return response;
    // }

    if (
      (!languageConfig.isValid || languageConfig.isDefault) &&
      req.nextUrl.searchParams.get("language")
    ) {
      req.nextUrl.searchParams.delete("language");
      const response = NextResponse.redirect(req.url);

      return response;
    }

    return;
  }
}
