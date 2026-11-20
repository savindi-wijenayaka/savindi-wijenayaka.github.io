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
            <div className="enter">
              <div className="hero-role">Machine Learning Engineer</div>
            </div>
            <div className="enter" style={{ animationDelay: "60ms" }}>
              <h1>
                Savindi <em>Wijenayaka</em>
              </h1>
            </div>
            <div className="enter" style={{ animationDelay: "120ms" }}>
              <p className="hero-intro">
                I build machine learning systems, from medical imaging research to production services.
              </p>
            </div>
            <div className="enter" style={{ animationDelay: "180ms" }}>
              <div className="hero-cta">
                <a className="btn btn-honey" href="#work">
                  View my work
                </a>
                <a className="btn btn-ghost" href={CV_URL} target="_blank" rel="noopener noreferrer">
                  Download CV
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="glance">
        <div className="enter" style={{ animationDelay: "240ms" }}>
          <div className="glance-card">
            {GLANCE.map((g) => (
              <div className="glance-item" key={g.big}>
                <b>{g.big}</b>
                <span>{g.small}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
