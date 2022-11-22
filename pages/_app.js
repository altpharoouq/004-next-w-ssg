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
    const language = pageProps.language;
    i18n.changeLanguage(language);
  }

  console.log(pageProps);

  return <Component {...pageProps} />;
}

MyApp.getInitialProps = async ({ router, ctx }) => {
  const { asPath } = router;
  const plainPath = asPath.split("?");
  const { req } = ctx;

  if (nonlocalePages.includes(plainPath[0])) {
    return {
      pageProps: {
        isnonlocalePage: true,
      },
    };
  }

  const NextRequestMetaSymbol = Reflect.ownKeys(req).find(
    (key) => key.toString() === "Symbol(NextRequestMeta)"
  );
  const url = req[NextRequestMetaSymbol].__NEXT_INIT_URL;
  const language =
    req[NextRequestMetaSymbol].__NEXT_INIT_QUERY?.language || null;
  const languageConfig = locale.languageConfig(router.locale, language);

  return {
    pageProps: {
      url,
      isnonlocalePage: false,
      locale: locale.currentLocale(router.locale),
      language: languageConfig.symbol.toLowerCase(),
    },
  };
};

export default MyApp;
