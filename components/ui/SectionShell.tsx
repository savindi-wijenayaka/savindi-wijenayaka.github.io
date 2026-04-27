import type { ReactNode } from "react";

/**
 * Standard section wrapper used by every full-width portfolio section.
 * Provides consistent vertical padding and the centred 1200px content column.
 *
 * Used by: Skills, Timeline, Projects, Achievements, Blog
 */
export default function SectionShell({
  id,
  bg,
  children,
  style,
}: {
  id: string;
  bg: string;
  children: ReactNode;
  /** Extra styles applied to the outer <section> (e.g. borderTop) */
  style?: React.CSSProperties;
}) {
  return (
    <section
      id={id}
      style={{
        background: bg,
        padding: "clamp(4rem, 8vw, 7rem) clamp(1.5rem, 5vw, 4rem)",
        ...style,
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        {children}
      </div>
    </section>
  );
}
