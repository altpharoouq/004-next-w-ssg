import i18n from "i18next";
import ChainedBackend from "i18next-chained-backend";
import FsBackend from "i18next-fs-backend";
import { initReactI18next } from "react-i18next";
import locale from "../utils/locale";
import nonlocalePages from "../config/nonlocalePages.json";
import LocizeBackend from "i18next-locize-backend";
import LastUsed from "locize-lastused";
import { locizePlugin } from "locize";

import "../styles/globals.css";

const locizeOptions = {
  backends: [FsBackend, LocizeBackend],
  backendOptions: [
    {
      expirationTime: 7 * 24 * 60 * 60 * 1000,
      loadPath: "./locales_cache/{{lng}}/{{ns}}.json",
      addPath: "./locales_cache/{{lng}}/{{ns}}.json",
    },
    {
      projectId: "a3fd4d6d-27d4-4df1-acac-e58ba4066290",
      apiKey: "ad2d590c-5243-403a-b1ea-9104f8572661",
      referenceLng: "en",
      version: "latest",
    },
  ],
};

i18n
  .use(ChainedBackend)
  .use(LastUsed)
  .use(locizePlugin)
  .use(initReactI18next)
  .init({
    debug: false,
    saveMissing: true,
    saveMissingTo: "current",
    interpolation: {
      escapeValue: false,
    },
    backend: locizeOptions,
    locizeLastUsed: locizeOptions,
    react: {
      bindI18n: "languageChanged editorSaved",
    },
  });

function MyApp({ Component, pageProps }) {
  if (!pageProps.isnonlocalePage) {
    const language = pageProps.language;
    i18n.changeLanguage(language);
  }

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

  // Delete unneeded parameters
  // const url = new URL(req[NextRequestMetaSymbol].__NEXT_INIT_URL);
  // url.searchParams.delete("id");

  const language =
    req[NextRequestMetaSymbol].__NEXT_INIT_QUERY?.language || null;
  const languageConfig = locale.languageConfig(router.locale, language);

  return {
    pageProps: {
      url,
      // url: url.href,
      isnonlocalePage: false,
      locale: locale.currentLocale(router.locale),
      language: languageConfig.symbol.toLowerCase(),
    },
  };
};

export default MyApp;
