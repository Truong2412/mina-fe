/** @type {import('next').NextConfig} */
const nextConfig = {
  publicRuntimeConfig: {
    favicon: './asset/minamg.png'
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos'
      },
      {
        protocol: 'http',
        hostname: 'localhost'
      }
    ]
  },
  reactStrictMode: true
}

module.exports = nextConfig
