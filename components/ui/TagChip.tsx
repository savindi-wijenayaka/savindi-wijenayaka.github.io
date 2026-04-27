/**
 * Uppercase monospace tag chip for blog post tags.
 *
 * variant="bordered" — lavender border + color (featured post tags, publication badge)
 * variant="plain"    — muted color only, no border (secondary post tags)
 */
export default function TagChip({
  label,
  variant = "plain",
}: {
  label: string;
  variant?: "bordered" | "plain";
}) {
  if (variant === "bordered") {
    return (
      <span
        style={{
          fontFamily: "var(--font-mono), monospace",
          fontSize: 10,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: "var(--lavender)",
          border: "1px solid var(--border-lavender)",
          borderRadius: "var(--radius-sm)",
          padding: "2px 8px",
        }}
      >
        {label}
      </span>
    );
  }

  return (
    <span
      style={{
        fontFamily: "var(--font-mono), monospace",
        fontSize: 10,
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        color: "var(--text-muted)",
      }}
    >
      {label}
    </span>
  );
}
