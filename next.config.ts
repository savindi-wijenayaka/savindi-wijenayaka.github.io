import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/savindi-wijenayaka.github.io",
  experimental: {
    optimizePackageImports: ["@chakra-ui/react"],
  },
};

export default nextConfig;
