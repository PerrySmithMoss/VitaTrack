import type { NextConfig } from 'next';

const isProd = process.env.NODE_ENV === 'production';
const devDomains = ['localhost'];
const prodDomains = ['vita-track-api.perrysmithmoss.com'];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      ...(isProd ? prodDomains : devDomains),
      'nix-tag-images.s3.amazonaws.com',
      'assets.syndigo.cloud',
      'nutritionix-api.s3.amazonaws.com',
      'd2eawub7utcl6.cloudfront.net',
      'lh3.googleusercontent.com',
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
