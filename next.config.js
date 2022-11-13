/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n: {
    locales: ['en', 'es'],
    defaultLocale: 'en',
  },
  images: {
    domains: ['theaipaper.b-cdn.net'],
  },
}

module.exports = nextConfig
