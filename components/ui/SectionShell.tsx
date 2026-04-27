import type { ReactNode } from "react";

/**
 * Standard section wrapper used by every full-width portfolio section.
 * Fills exactly one viewport height and centres content vertically.
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
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "clamp(2rem, 4vw, 3rem) clamp(1.5rem, 5vw, 4rem)",
        ...style,
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto", width: "100%" }}>
        {children}
      </div>
    </section>
  );
}
