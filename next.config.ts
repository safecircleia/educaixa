import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: (config, { isServer }) => {
    // Configure webpack to handle .glb files
    config.module.rules.push({
      test: /\.glb$/,
      type: 'asset/resource',
      generator: {
        filename: 'static/media/[name].[hash][ext]'
      }
    });
    return config;
  },
};

export default nextConfig;
