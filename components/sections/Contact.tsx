import RevealOnScroll from "@/components/ui/RevealOnScroll";
import Socials from "@/data/socials";

const CV_URL = "/CV_SavindiWijenayaka_ML.pdf";

export default function Contact() {
  const linkedin = Socials.find((s) => s.label === "LinkedIn");

  return (
    <section className="sec contact" id="contact">
      <div className="wrap">
        <RevealOnScroll>
          <p className="eyebrow">Contact</p>
          <h2 className="sec-title">Let&apos;s build something thoughtful</h2>
          <p className="lede">
            Open to machine learning engineering roles and research collaborations. The fastest way to reach me is
            LinkedIn.
          </p>
          <div className="contact-cta">
            {linkedin && (
              <a className="btn btn-honey" href={linkedin.link} target="_blank" rel="noopener noreferrer">
                Say hello
              </a>
            )}
            <a className="btn btn-ghost" href={CV_URL} target="_blank" rel="noopener noreferrer">
              Download CV
            </a>
          </div>
          <div className="contact-soc">
            {Socials.map((s) => (
              <a key={s.label} className="btn btn-ghost" href={s.link} target="_blank" rel="noopener noreferrer">
                {s.label}
              </a>
            ))}
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
