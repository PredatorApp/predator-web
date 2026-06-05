import type { NextConfig } from 'next';

const domains = process.env.NODE_ENV === 'development' ? ['localhost'] : [];

const nextConfig: NextConfig = {
  images: {
    domains,
  },
  async redirects() {
    return [
      {
        source: '/discord',
        destination: 'https://discord.gg/EMd9ARMHex',
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
