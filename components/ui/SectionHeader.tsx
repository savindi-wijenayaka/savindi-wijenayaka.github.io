import React from "react";

type Accent = "emerald" | "blue" | "lavender";

interface SectionHeaderProps {
  label: string;
  accent?: Accent;
  plain: string;
  italic: string;
  description?: string;
}

const accentVar: Record<Accent, string> = {
  emerald: "var(--emerald)",
  blue: "var(--blue)",
  lavender: "var(--lavender)",
};

export default function SectionHeader({
  label,
  accent = "emerald",
  plain,
  italic,
  description,
}: SectionHeaderProps) {
  return (
    <div className="mb-10">
      <div className="section-label" style={{ color: accentVar[accent] }}>
        {label}
      </div>
      <h2 className="section-title">
        <span>{plain}</span>
        <em className="heading-accent">{italic}</em>
      </h2>
      {description && <p className="section-desc">{description}</p>}
    </div>
  );
}
