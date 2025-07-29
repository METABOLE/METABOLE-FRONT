import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  transpilePackages: ['gsap'],
  reactStrictMode: true,
  // experimental: {
  //   esmExternals: 'loose',
  // },
  async redirects() {
    return [
      {
        source: '/:path*',
        destination: 'https://metabole.studio/:path*',
        permanent: true,
        has: [
          {
            type: 'host',
            value: 'www.metabole.studio',
          },
        ],
      },
      {
        source: '/',
        destination: '/fr',
        permanent: false,
        has: [
          {
            type: 'header',
            key: 'accept-language',
            value: '(.*fr.*)',
          },
        ],
      },
      {
        source: '/',
        destination: '/en',
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
