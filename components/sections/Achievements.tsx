"use client";

import { useState } from "react";
import Image from "next/image";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import Achievements from "@/data/achievements";

export default function AchievementsSection() {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <section className="sec" id="achievements">
      <div className="wrap">
        <RevealOnScroll>
          <p className="eyebrow">Recognition</p>
          <h2 className="sec-title">Wins and leadership</h2>
          <p className="lede">Hover (or tap) a photo for the story.</p>
        </RevealOnScroll>
        <div className="ac">
          {Achievements.map((a, i) => {
            const open = openId === a.id;
            const toggle = () => setOpenId(open ? null : a.id);
            return (
              <RevealOnScroll key={a.id} delay={(i % 3) * 60}>
                <div
                  role="button"
                  className={`acd${open ? " open" : ""}`}
                  tabIndex={0}
                  aria-expanded={open}
                  onClick={toggle}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      toggle();
                    }
                  }}
                >
                  <Image src={a.photo} alt="" fill sizes="(max-width: 560px) 100vw, (max-width: 900px) 50vw, 340px" />
                  <span className="acd-badge">{a.category === "Engineering" ? "Engineering" : "Leadership"}</span>
                  <div className="acd-cap">
                    <span className="acd-y">
                      {a.year}
                      {a.level ? ` · ${a.level}` : ""}
                    </span>
                    <h3>
                      {a.title}, {a.award}
                    </h3>
                    <span className="acd-sub">
                      {[a.issuer, a.representing].filter(Boolean).join(" · ")}
                    </span>
                    <div className="acd-more">
                      <div>
                        <p>{a.description}</p>
                        {a.projectUrl && (
                          <p>
                            <a href={a.projectUrl} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>
                              View project →
                            </a>
                          </p>
                        )}
                      </div>
                    </div>
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
