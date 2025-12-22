import withPWA from 'next-pwa';

const withPWAFunc = withPWA({
  dest: 'public',
  register: true,
  skipWaiting: true
});

/** @type {import('next').NextConfig} */
const nextConfig = withPWAFunc({
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "randomuser.me",
      },
    ],
  },

  experimental: {
    serverActions: {
      bodySizeLimit: "5mb",
    },
  },
});

export default nextConfig;
