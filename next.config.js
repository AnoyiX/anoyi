/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  /* config options here */
  reactStrictMode: false,
  i18n: {
    locales: ["zh"],
    defaultLocale: "zh",
  },
  // experimental: {
  //   runtime: 'experimental-edge',
  // },
}

module.exports = nextConfig