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
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'dd.dexscreener.com',
        pathname: '/ds-data/tokens/**',
      }
    ]
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "frame-src 'self' https://dexscreener.com https://*.dexscreener.com;"
          }
        ],
      },
    ]
  },
  experimental: {
    turbo: {
    },
  },
};

export default nextConfig;
