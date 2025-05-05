import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'vita-track-api.perrysmithmoss.com',
      'nix-tag-images.s3.amazonaws.com',
      'assets.syndigo.cloud',
      'nutritionix-api.s3.amazonaws.com',
      'd2eawub7utcl6.cloudfront.net',
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
