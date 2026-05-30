import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "dm5zirgho1fewp6s.public.blob.vercel-storage.com",
      },
    ],
  },
};

export default nextConfig;
