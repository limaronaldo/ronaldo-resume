/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    config.module.rules.push({
      test: /locales\/.*\.json$/,
      type: 'json',
    });
    return config;
  },
}

module.exports = nextConfig 