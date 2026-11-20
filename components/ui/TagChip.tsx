/**
 * Tag chip for blog posts. Uses the site's .tag pill.
 *
 * variant="bordered": outlined (publication badge on featured posts)
 * variant="plain":    tinted plum (post tags)
 */
export default function TagChip({
  label,
  variant = "plain",
}: {
  label: string;
  variant?: "bordered" | "plain";
}) {
  return <span className={`tag ${variant === "bordered" ? "tag-pub" : "tag-ind"}`}>{label}</span>;
}
