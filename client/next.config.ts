import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*", // 프론트엔드에서 요청할 경로
        destination: "http://localhost:9000/api/:path*", // 백엔드로 프록시할 경로
      },
    ];
  },
};

export default nextConfig;
