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
};

export default nextConfig;
