import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  // Turbopack configuration
  turbopack: {
    // Configure rules for file transformations
    rules: {
      '*.svg': {
        loaders: ['@svgr/webpack'],
        as: '*.js',
      },
    },
  },
  // Disable image optimization for Cloudflare
  images: {
    unoptimized: true, // Required for static export
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'dd.dexscreener.com',
        pathname: '/ds-data/tokens/**',
      },
      // Google authentication profile images
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        pathname: '/a/**',
      },
      // GitHub authentication profile images
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
        pathname: '/**',
      },
      // Additional Google image domains
      {
        protocol: 'https',
        hostname: '*.googleusercontent.com',
        pathname: '/**',
      }
    ]
  },
  // Configure webpack to handle .glb files and path resolution
  webpack: (config, { isServer }) => {
    config.module.rules.push({
      test: /\.glb$/,
      type: 'asset/resource',
      generator: {
        filename: 'static/media/[name].[hash][ext]'
      }
    });

    // Handle path resolution for Windows
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        path: false,
        fs: false,
      };
    }

    // Ensure path aliases are properly resolved
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve(__dirname),
    };

    return config;
  },
   
  // Server external packages configuration
  serverExternalPackages: [],
};


export default nextConfig;
