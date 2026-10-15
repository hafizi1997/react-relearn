import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/react-relearn",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
