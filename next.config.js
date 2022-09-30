/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    nextScriptWorkers: true,
  },
  i18n: {
    locales: ["en", "es"],
    defaultLocale: "en",
  },
};

module.exports = nextConfig;
