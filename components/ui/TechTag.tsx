/**
 * Small monospace chip for tech stack labels.
 * Used in Timeline (experience panel) and Projects (project cards).
 */
export default function TechTag({ label }: { label: string }) {
  return (
    <span
      style={{
        fontFamily: "var(--font-mono), monospace",
        fontSize: 11,
        padding: "2px 8px",
        borderRadius: "var(--radius-sm)",
        background: "var(--bg-overlay)",
        border: "1px solid var(--border)",
        color: "var(--text-muted)",
        letterSpacing: "0.03em",
      }}
    >
      {label}
    </span>
  );
}
