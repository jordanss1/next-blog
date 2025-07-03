import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: false,
  productionBrowserSourceMaps: false,

  experimental: {
    webpackMemoryOptimizations: true,
    preloadEntriesOnStart: false,
  },

  webpack: (config, { dev }) => {
    if (dev) {
      config.devtool = 'cheap-module-source-map';

      if (config.cache) {
        config.cache = {
          type: 'memory',
        };
      }
    }

    return config;
  },
};

export default nextConfig;
