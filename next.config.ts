import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lure-fracture-sustainer.ngrok-free.dev',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'localhost',
        port: '10003',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '10003',
        pathname: '/**',
      },
    ],
    unoptimized: true,
  },
};

export default nextConfig;
