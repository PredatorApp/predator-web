import type { NextConfig } from 'next';

const domains = process.env.NODE_ENV === 'development' ? ['localhost'] : [];

const creatorPaths = [
  '/nypredhunters',
  '/catchemonlive',
  '/highervids',
  '/huntforpreds',
] as const;

const nextConfig: NextConfig = {
  images: {
    domains,
  },
  async rewrites() {
    return creatorPaths.map((source) => ({
      source,
      destination: '/',
    }));
  },
  async redirects() {
    return [
      {
        source: '/discord',
        destination: 'https://discord.com/invite/EMd9ARMHex',
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
