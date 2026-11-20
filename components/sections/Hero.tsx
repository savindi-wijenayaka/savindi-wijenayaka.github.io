import RevealOnScroll from "@/components/ui/RevealOnScroll";
import HeroNetwork from "@/components/ui/HeroNetwork";

const CV_URL = "/CV_SavindiWijenayaka_ML.pdf";

const GLANCE = [
  { big: "Auror", small: "ML Engineer, now" },
  { big: "Ph.D.", small: "Bioengineering, Auckland" },
  { big: "3 ML roles", small: "Auror · WSO2 · Pearson" },
  { big: "NLP · CV · MLOps", small: "plus research, end to end" },
];

/** First screen: hero + floating "at a glance" card. Fills one viewport on desktop. */
export default function Hero() {
  return (
    <div className="fold">
      <section className="hero" id="top">
        <HeroNetwork />
        <div className="hero-inner">
          <div className="hero-copy">
            <RevealOnScroll>
              <div className="hero-role">Machine Learning Engineer</div>
            </RevealOnScroll>
            <RevealOnScroll delay={60}>
              <h1>
                Savindi <em>Wijenayaka</em>
              </h1>
            </RevealOnScroll>
            <RevealOnScroll delay={120}>
              <p className="hero-intro">
                I build machine learning systems, from medical imaging research to production services.
              </p>
            </RevealOnScroll>
            <RevealOnScroll delay={180}>
              <div className="hero-cta">
                <a className="btn btn-honey" href="#work">
                  View my work
                </a>
                <a className="btn btn-ghost" href={CV_URL} target="_blank" rel="noopener noreferrer">
                  Download CV
                </a>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      <div className="glance">
        <RevealOnScroll delay={240}>
          <div className="glance-card">
            {GLANCE.map((g) => (
              <div className="glance-item" key={g.big}>
                <b>{g.big}</b>
                <span>{g.small}</span>
              </div>
            ))}
          </div>
        </RevealOnScroll>
      </div>
    </div>
  );
}
