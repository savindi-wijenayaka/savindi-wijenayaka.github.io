import RevealOnScroll from "@/components/ui/RevealOnScroll";
import Projects from "@/data/projects";

export default function ProjectsSection() {
  const featured = Projects.filter((p) => p.featured);

  return (
    <section className="sec" id="work">
      <div className="wrap">
        <RevealOnScroll>
          <p className="eyebrow">Selected work</p>
          <h2 className="sec-title">Things I&apos;ve shipped and studied</h2>
          <p className="lede">Production systems and research projects.</p>
        </RevealOnScroll>
        <div className="cards">
          {featured.map((p, i) => (
            <RevealOnScroll key={p.id} delay={i * 70}>
              <article className="pc">
                <span className={`tag ${p.status === "Research" ? "tag-res" : "tag-ind"}`}>
                  {p.status === "Research" ? "Research" : `${p.status} · Industry`}
                </span>
                <h3>{p.title}</h3>
                <p>{p.description}</p>
                <div className="stack">
                  {p.techStack.slice(0, 4).map((t) => (
                    <span key={t}>{t}</span>
                  ))}
                </div>
              </article>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
