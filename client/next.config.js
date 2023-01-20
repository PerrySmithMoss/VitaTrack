/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      'vitatrack.onrender.com',
      'nix-tag-images.s3.amazonaws.com',
      'nutritionix-api.s3.amazonaws.com',
      'd2eawub7utcl6.cloudfront.net',
    ],
  },
};

module.exports = nextConfig;
