const config = require("../config/locales.json");

const locale = {
  config,
  isValidSymbol: function (symbol) {
    if (symbol && this.countries().includes(symbol)) {
      return {
        status: true,
        urlCompatible: symbol.toLowerCase(),
        apiCompatible: symbol.toUpperCase(),
      };
    }

    return { status: false, urlCompatible: "", apiCompatible: "" };
  },
  currentLocale: function (symbol) {
    return config.find((x) => x.symbol === symbol?.toUpperCase());
  },
  languageConfig: function (symbol, language) {
    const languages = this.currentLocale(symbol)?.languages;
    const selectedLanguage = languages?.find(
      (x) => x.symbol === language?.toUpperCase()
    );
    const defaultLanguage = languages?.find((x) => x.default === true);

    return {
      isDefault: !language ? true : selectedLanguage?.default || false,
      isValid: !language ? true : !!selectedLanguage || false,
      symbol: !selectedLanguage
        ? defaultLanguage?.symbol
        : selectedLanguage?.symbol,
    };
  },
  countries: function (partialResponse) {
    return config.map((x) => {
      if (partialResponse) {
        let response = {};

        partialResponse.forEach((y) => (response[y] = x[y]));
        response.symbol = x.symbol.toLowerCase();

        return response;
      } else {
        return x.symbol.toLowerCase();
      }
    });
  },
};

module.exports = locale;
