"use client";

import SectionHeader from "@/components/ui/SectionHeader";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import Skills, { SkillCategories } from "@/data/skills";

export default function SkillsSection() {
  return (
    <section
      id="skills"
      style={{
        background: "var(--bg-base)",
        padding: "clamp(4rem, 8vw, 7rem) clamp(1.5rem, 5vw, 4rem)",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <RevealOnScroll>
          <SectionHeader
            label="Technical Skills"
            accent="blue"
            plain="Tools of "
            italic="the trade"
            description="From research models to production systems — across modalities, stacks, and disciplines."
          />
        </RevealOnScroll>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {SkillCategories.map((category, catIdx) => {
            const categorySkills = Skills.filter((s) => s.category === category);
            return (
              <RevealOnScroll key={category} delay={catIdx * 60}>
                <div
                  style={{
                    background: "var(--bg-elevated)",
                    border: "1px solid var(--border)",
                    borderRadius: "var(--radius-md)",
                    padding: "1.5rem",
                    transition: "border-color 200ms",
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
      </div>
    </section>
  );
}
