import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  experimental: { webpackMemoryOptimizations: true },
  webpack: (
    config,
    { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack }
  ) => {
    if (config.cache) {
      config.cache = Object.freeze({
        type: 'memory',
      });
    }
    return config;
  },
};

export default nextConfig;
