import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // Sanity CDN — 所有从 Sanity 上传的图片
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        pathname: "/images/**",
      },
      // 工具 favicon（各官网域名）
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

export default nextConfig;
