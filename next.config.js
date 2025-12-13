/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'static.wixstatic.com',
      },
      {
        protocol: 'https',
        hostname: 'i.pinimg.com',
      },
    ],
  },
  // Enable React strict mode
  reactStrictMode: true,
}

module.exports = nextConfig
