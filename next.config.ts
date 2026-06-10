import type { NextConfig } from 'next';

const domains = process.env.NODE_ENV === 'development' ? ['localhost'] : [];

const creatorRedirects = [
  {
    source: '/nypredhunters',
    destination: 'https://predator.onelink.me/RpE0/a4iku9xx',
  },
  {
    source: '/catchemonlive',
    destination: 'https://predator.onelink.me/RpE0/d8mz0963',
  },
] as const;

const nextConfig: NextConfig = {
  images: {
    domains,
  },
  async redirects() {
    return [
      ...creatorRedirects.map(({ source, destination }) => ({
        source,
        destination,
        permanent: false,
      })),
      {
        source: '/discord',
        destination: 'https://discord.com/invite/EMd9ARMHex',
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
