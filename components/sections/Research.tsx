import RevealOnScroll from "@/components/ui/RevealOnScroll";
import Achievements from "@/data/achievements";
import Experience from "@/data/experience";
import Publications from "@/data/publications";

const SPARC_IDS = ["sparc-2022", "sparc-2024"];

export default function ResearchSection() {
  const phd = Experience.find((e) => e.id === "uoa-phd");
  const sparc = SPARC_IDS.map((id) => Achievements.find((a) => a.id === id)).filter(
    (a): a is NonNullable<typeof a> => Boolean(a)
  );

  return (
    <section className="sec" id="research">
      <div className="wrap">
        <RevealOnScroll>
          <p className="eyebrow">Research</p>
          <h2 className="sec-title">Ph.D. work, in plain English</h2>
          <p className="lede">What I studied, what I built and why it matters.</p>
        </RevealOnScroll>

        <div className="rs">
          {phd && (
            <RevealOnScroll>
              <article className="rbig">
                <span className="tag tag-res">Ph.D. · {phd.company}</span>
                <h3>Teaching models to measure what they see</h3>
                <p>
                  I trained a segmentation model with multiscale attention to outline structures in medical
                  images, then turned the results into 3D measurements researchers can use. The automated
                  pipeline saves 40+ hours of manual processing per dataset.
                </p>
                <div className="stack">
                  {phd.techStack.map((t) => (
                    <span key={t}>{t}</span>
                  ))}
                </div>
              </article>
            </RevealOnScroll>
          )}
          <div className="rside">
            {sparc.map((a, i) => (
              <RevealOnScroll key={a.id} delay={(i + 1) * 70}>
                <article className="rcard">
                  <span className="tag tag-res">
                    {a.year} · {a.title}
                  </span>
                  <h3>{a.award}</h3>
                  <p>{a.description}</p>
                  {a.projectUrl && (
                    <a className="link" href={a.projectUrl} target="_blank" rel="noopener noreferrer">
                      GitHub <span aria-hidden>→</span>
                    </a>
                  )}
                </article>
              </RevealOnScroll>
            ))}
          </div>
        </div>

        {Publications.length > 0 && (
          <div className="pubs">
            {Publications.map((p) => (
              <RevealOnScroll key={p.id}>
                <article className="rcard">
                  <span className="tag tag-res">
                    {p.venue} · {p.year}
                  </span>
                  <h3>{p.title}</h3>
                  <p>{p.authors.join(", ")}</p>
                  {p.doiUrl && (
                    <a className="link" href={p.doiUrl} target="_blank" rel="noopener noreferrer">
                      DOI <span aria-hidden>→</span>
                    </a>
                  )}
                </article>
              </RevealOnScroll>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
