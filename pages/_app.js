import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import locale from "../utils/locale";
import nonlocalePages from "../config/nonlocalePages.json";

import "../styles/globals.css";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        good: "Good",
        better: "Better",
        best: "Best",
        bad: "Bad",
        worse: "Worse",
        worst: "Worst",
      },
    },
    fr: {
      translation: {
        good: "Bien",
        better: "Milleure",
        best: "Milleure",
        bad: "Mal",
        worse: "Pire",
        worst: "Pire",
      },
    },
  },
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

function MyApp({ Component, pageProps }) {
  if (!pageProps.isnonlocalePage) {
    const language = pageProps.currentLanguage.symbol?.toLowerCase();
    i18n.changeLanguage(language);
  }

  return <Component {...pageProps} />;
}

MyApp.getInitialProps = async (context) => {
  const pathname = context.ctx.asPath;
  const plainPath = pathname.split("?");

  if (nonlocalePages.includes(plainPath[0])) {
    return {
      pageProps: {
        isnonlocalePage: true,
      },
    };
  }

  const router = context.router;
  const req = context.ctx.req;
  const NextRequestMetaSymbol = Reflect.ownKeys(req).find(
    (key) => key.toString() === "Symbol(NextRequestMeta)"
  );
  const language = req[NextRequestMetaSymbol].__NEXT_INIT_QUERY.language;

  const languageConfig = locale.languageConfig(router.locale, language);

  const res = context.ctx.res;
  res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");

  return {
    pageProps: {
      isnonlocalePage: false,
      locale: locale.currentLocale(router.locale),
      currentLanguage: languageConfig,
    },
  };
};

export default MyApp;
