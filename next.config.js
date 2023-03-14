/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
    serverComponentsExternalPackages: ["react-hot-toast"]
  },
}

module.exports = nextConfig