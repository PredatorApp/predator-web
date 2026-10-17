import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  agentRules: false,
  async redirects() {
    return [
      {
        source: '/sources',
        destination: '/terms#public-records',
        permanent: true,
      },
      {
        source: '/discord',
        destination: 'https://discord.com/invite/EMd9ARMHex',
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
