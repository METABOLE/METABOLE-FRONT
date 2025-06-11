import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  transpilePackages: ['gsap'],
  reactStrictMode: true,
  experimental: {
    esmExternals: 'loose',
  },
};

export default nextConfig;
