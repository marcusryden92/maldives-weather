import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["*"], // Allows any domain (not recommended for production)
  },
};

export default nextConfig;
