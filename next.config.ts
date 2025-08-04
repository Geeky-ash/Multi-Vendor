import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Your existing ESLint configuration
  eslint: {
    ignoreDuringBuilds: true,
  },
  
  // ⚙️ ADD THIS PART
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com', // <-- ⚠️ REPLACE THIS
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
