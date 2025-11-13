import type { NextConfig } from 'next';

const domains = process.env.NODE_ENV === 'development' ? ['localhost'] : [];

const nextConfig: NextConfig = {
  images: {
    domains,
  },
  // No custom rewrites required
};

export default nextConfig;
