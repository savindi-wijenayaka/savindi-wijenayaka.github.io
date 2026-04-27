"use client";

import SectionHeader from "@/components/ui/SectionHeader";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import TechTag from "@/components/ui/TechTag";
import Projects from "@/data/projects";

export default function ProjectsSection() {
  const featured = Projects.filter((p) => p.featured);

  return (
    <section
      id="projects"
      style={{
        background: "var(--bg-base)",
        padding: "clamp(4rem, 8vw, 7rem) clamp(1.5rem, 5vw, 4rem)",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <RevealOnScroll>
          <SectionHeader
            label="Projects"
            accent="blue"
            plain="Things I've "
            italic="built"
            description="Production systems and research projects that solve real problems."
          />
        </RevealOnScroll>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {featured.map((project, idx) => (
            <RevealOnScroll key={project.id} delay={idx * 80}>
              <div
                style={{
                  background: "var(--bg-elevated)",
                  borderRadius: "var(--radius-md)",
                  padding: "1.75rem",
                  border: "1px solid var(--border)",
                  transition: "transform 220ms, border-color 220ms",
                  display: "flex",
                  flexDirection: "column",
                  position: "relative",
                  overflow: "hidden",
                  height: "100%",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLDivElement;
                  el.style.transform = "translateY(-4px)";
                  el.style.borderColor = "var(--border-blue)";
                  const bar = el.querySelector(".proj-top-bar") as HTMLElement;
                  if (bar) bar.style.transform = "scaleX(1)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLDivElement;
                  el.style.transform = "translateY(0)";
                  el.style.borderColor = "var(--border)";
                  const bar = el.querySelector(".proj-top-bar") as HTMLElement;
                  if (bar) bar.style.transform = "scaleX(0)";
                }}
              >
                {/* Top accent line */}
                <div
                  className="proj-top-bar"
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: 2,
                    background: "var(--blue)",
                    transform: "scaleX(0)",
                    transformOrigin: "left",
                    transition: "transform 200ms var(--ease-out)",
                  }}
                />

                {/* Status badge */}
                <div
                  style={{
                    fontFamily: "var(--font-mono), monospace",
                    fontSize: 10,
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    color:
                      project.status === "Live"
                        ? "var(--blue)"
                        : project.status === "Research"
                        ? "var(--lavender)"
                        : "var(--text-muted)",
                    marginBottom: "0.75rem",
                  }}
                >
                  {project.status}
                </div>

                {/* Title */}
                <h3
                  style={{
                    fontFamily: "var(--font-mono), monospace",
                    fontSize: 15,
                    fontWeight: 500,
                    color: "var(--text-primary)",
                    marginBottom: "0.6rem",
                    lineHeight: 1.4,
                    letterSpacing: "-0.2px",
                  }}
                >
                  {project.title}
                </h3>

                {/* Description */}
                <p
                  style={{
                    fontSize: 14,
                    color: "var(--text-secondary)",
                    lineHeight: 1.85,
                    flex: 1,
                    marginBottom: "1.25rem",
                  }}
                >
                  {project.description}
                </p>

                {/* Tech stack */}
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 5,
                    marginBottom: "1.25rem",
                  }}
                >
                  {project.techStack.map((tech) => (
                    <TechTag key={tech} label={tech} />
                  ))}
                </div>

                {/* Links */}
                <div style={{ display: "flex", gap: "1rem" }}>
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        fontFamily: "var(--font-mono), monospace",
                        fontSize: 11,
                        color: "var(--blue)",
                        textDecoration: "none",
                        letterSpacing: "0.06em",
                        borderBottom: "1px solid var(--border-blue)",
                        paddingBottom: 1,
                        transition: "color 150ms",
                      }}
                    >
                      GitHub ↗
                    </a>
                  )}
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        fontFamily: "var(--font-mono), monospace",
                        fontSize: 11,
                        color: "var(--blue)",
                        textDecoration: "none",
                        letterSpacing: "0.06em",
                        borderBottom: "1px solid var(--border-blue)",
                        paddingBottom: 1,
                        transition: "color 150ms",
                      }}
                    >
                      Live ↗
                    </a>
                  )}
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
