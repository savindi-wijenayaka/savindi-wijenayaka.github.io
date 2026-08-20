"use client";

import SectionHeader from "@/components/ui/SectionHeader";
import SectionShell from "@/components/ui/SectionShell";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import Skills, { SkillCategories } from "@/data/skills";

export default function SkillsSection() {
  return (
    <SectionShell id="skills" bg="var(--bg-base-t)">
        <RevealOnScroll>
          <SectionHeader
            label="Technical Skills"
            accent="blue"
            plain="Tools of "
            italic="the trade"
          />
        </RevealOnScroll>

        <div
          className="skills-grid"
          style={{
            display: "grid",
            gap: "1.5rem",
            alignItems: "stretch",
          }}
        >
          {SkillCategories.map((category, catIdx) => {
            const categorySkills = Skills.filter((s) => s.category === category);
            return (
              <RevealOnScroll key={category} delay={catIdx * 60} style={{ height: "100%" }}>
                <div
                  style={{
                    background: "var(--bg-elevated)",
                    border: "1px solid var(--border)",
                    borderRadius: "var(--radius-md)",
                    padding: "1.5rem",
                    transition: "border-color 200ms",
                    height: "100%",
                    boxSizing: "border-box",
                  }}
                  onMouseEnter={(e) =>
                    ((e.currentTarget as HTMLDivElement).style.borderColor =
                      "var(--border-blue)")
                  }
                  onMouseLeave={(e) =>
                    ((e.currentTarget as HTMLDivElement).style.borderColor = "var(--border)")
                  }
                >
                  <h3
                    style={{
                      fontFamily: "var(--font-mono), monospace",
                      fontSize: 11,
                      fontWeight: 500,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      color: "var(--blue)",
                      marginBottom: "1rem",
                    }}
                  >
                    {category}
                  </h3>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                    {categorySkills.map((skill) => {
                      const Icon = skill.icon;
                      return (
                        <span key={skill.name} className="skill-tag">
                          <Icon size={12} />
                          {skill.name}
                        </span>
                      );
                    })}
                  </div>
                </div>
              </RevealOnScroll>
            );
          })}
        </div>
    </SectionShell>
  );
}
