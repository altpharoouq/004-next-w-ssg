const locale = require("./utils/locale");

const countries = locale.countries();

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  i18n: {
    locales: ["default", ...countries],
    defaultLocale: "default",
    localeDetection: false,
  },
  trailingSlash: false,
};

module.exports = nextConfig;
