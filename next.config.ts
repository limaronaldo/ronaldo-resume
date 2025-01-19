// next.config.ts
import { NextConfig } from 'next';
import { Configuration as WebpackConfig, RuleSetRule } from 'webpack';

const nextConfig: NextConfig = {
  webpack: (config: WebpackConfig) => {
    // Ensure that config.module is defined
    if (!config.module) {
      config.module = { rules: [] };
    }

    // Ensure that config.module.rules is defined
    if (!config.module.rules) {
      config.module.rules = [];
    }

    // Define your custom rule
    const customRule: RuleSetRule = {
      test: /locales\/.*\.json$/,
      type: 'json',
    };

    // Push the custom rule
    config.module.rules.push(customRule);

    return config;
  },
  experimental: {
    turbo: {
      // If you don’t have anything special to configure,
      // you can leave this empty. This silences the warning
      // about having Webpack configured but not Turbopack.
    },
  },
};

export default nextConfig;