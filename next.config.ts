import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // other config options here

  eslint: {
    ignoreDuringBuilds: true, // <-- This disables ESLint checking during builds
  },
};

export default nextConfig;
