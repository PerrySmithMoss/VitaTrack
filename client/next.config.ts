import type { NextConfig } from 'next';

const isProd = process.env.NODE_ENV === 'production';
const imageHosts = [
  'vita-track-api.perrysmithmoss.com',
  'nix-tag-images.s3.amazonaws.com',
  'assets.syndigo.cloud',
  'nutritionix-api.s3.amazonaws.com',
  'd2eawub7utcl6.cloudfront.net',
  'lh3.googleusercontent.com',
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      ...imageHosts.map((hostname) => ({ protocol: 'https' as const, hostname, port: '' })),
      ...(!isProd ? [{ protocol: 'http' as const, hostname: 'localhost', port: '5500' }] : []),
    ],
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/:path*`,
      },
    ];
  },
};

export default nextConfig;
