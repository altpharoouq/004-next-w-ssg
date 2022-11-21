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
  poweredByHeader: false,
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "Content-Security-Policy",
            value:
              "default-src 'self'; img-src 'self' https://i.annihil.us; script-src 'self' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; font-src 'self';",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "origin-when-cross-origin",
          },
          {
            key: "Cache-Control",
            value: "s-maxage=31536000, stale-while-revalidate",
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
