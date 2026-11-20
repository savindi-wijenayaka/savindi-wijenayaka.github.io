import RevealOnScroll from "@/components/ui/RevealOnScroll";
import Skills, { SkillCategories } from "@/data/skills";

// Where I go deepest — shown as honey-filled chips.
const CORE_SKILLS = new Set(["LLM / VLM", "Computer Vision", "NLP", "Python", "PyTorch", "GCP", "Azure"]);

export default function SkillsSection() {
  return (
    <section className="sec" id="skills">
      <div className="wrap">
        <RevealOnScroll>
          <p className="eyebrow">Skills</p>
          <h2 className="sec-title">What I work with</h2>
          <p className="lede">The honey chips are where I go deepest.</p>
        </RevealOnScroll>
        <RevealOnScroll delay={80}>
          <div className="sk">
            {SkillCategories.map((cat) => (
              <div key={cat}>
                <h3>{cat}</h3>
                <div className="chips">
                  {Skills.filter((s) => s.category === cat).map((s) => (
                    <span key={s.name} className={CORE_SKILLS.has(s.name) ? "core" : undefined}>
                      {s.name}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
