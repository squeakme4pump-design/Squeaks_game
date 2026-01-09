/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config, { isServer }) => {
    if (isServer) {
      // Do not bundle phaser into server build
      config.externals = config.externals || [];
      config.externals.push("phaser");
    }
    return config;
  }
};

module.exports = nextConfig;
