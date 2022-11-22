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

  return <Component {...pageProps} />;
}

MyApp.getInitialProps = async ({ router }) => {
  const { asPath } = router;
  const plainPath = asPath.split("?");

  if (nonlocalePages.includes(plainPath[0])) {
    return {
      pageProps: {
        isnonlocalePage: true,
      },
    };
  }

  return {
    pageProps: {
      isnonlocalePage: false,
      locale: locale.currentLocale(router.locale),
    },
  };
};

export default MyApp;
