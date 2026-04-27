import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  reactCompiler: true,
  pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
};

const withMDX = createMDX({
  extension: /\.(md|mdx)$/,
  options: {
    // Use string names for Turbopack compatibility (functions are not serializable to Rust)
    remarkPlugins: ["remark-gfm", "remark-frontmatter"],
    rehypePlugins: [],
  },
});

export default withMDX(nextConfig);
