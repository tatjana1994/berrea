import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'testapp.local',
        pathname: '/**',
      },
    ],
    unoptimized: true,
  },
};

export default nextConfig;
