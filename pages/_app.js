import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import locale from "../utils/locale";
import nonlocalePages from "../config/nonlocalePages.json";
import absoluteUrl from 'next-absolute-url'

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
  console.log(pageProps);
  if (!pageProps.isnonlocalePage) {
    const language = pageProps.currentLanguage.symbol?.toLowerCase();
    i18n.changeLanguage(language);
  }

  return <Component {...pageProps} />;
}

MyApp.getInitialProps = async (context) => {
  const { router, ctx } = context 
  const { asPath } = router
  const { req } = ctx
  const { protocol, host, origin } = absoluteUrl(req)
  const url = new URL(`${origin}${asPath}`)
  const plainPath = asPath.split("?");

  if (nonlocalePages.includes(plainPath[0])) {
    return {
      pageProps: {
        isnonlocalePage: true,
      },
    };
  }

  console.log(protocol, host);

  const parameters = new URLSearchParams(url.search);
  const language = parameters?.get("language");

  const languageConfig = locale.languageConfig(router.locale, language);

  return {
    pageProps: {
      isnonlocalePage: false,
      locale: locale.currentLocale(router.locale),
      currentLanguage: languageConfig,
      url: url.href,
      protocol,
      host
    },
  };
};

export default MyApp;
