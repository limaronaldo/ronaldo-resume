// next.config.ts
import { NextConfig } from 'next';
import { Configuration as WebpackConfig, RuleSetRule } from 'webpack';

const nextConfig: NextConfig = {
  webpack: (config: WebpackConfig) => {
    if (!config.module) {
      config.module = { rules: [] };
    }

    if (!config.module.rules) {
      config.module.rules = [];
    }

    const customRule: RuleSetRule = {
      test: /locales\/.*\.json$/,
      type: 'json',
    };

    config.module.rules.push(customRule);

    return config;
  },
  experimental: {
    serverComponentsExternalPackages: ['@sparticuz/chromium', 'puppeteer-core'],
    turbo: {},
  },
};

export default nextConfig;