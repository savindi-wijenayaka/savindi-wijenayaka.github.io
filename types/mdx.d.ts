declare module "*.md" {
  import type { MDXComponents } from "mdx/types";
  const MDXContent: (props: { components?: MDXComponents }) => JSX.Element;
  export default MDXContent;
}
