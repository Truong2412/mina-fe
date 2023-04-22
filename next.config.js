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

module.exports = {
  images: {
    // Tắt cảnh báo khi sử dụng thẻ img bằng cách sử dụng next/image
    disableStaticImages: true,
  },
}