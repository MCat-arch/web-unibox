import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/activities",
        destination: "/news",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
