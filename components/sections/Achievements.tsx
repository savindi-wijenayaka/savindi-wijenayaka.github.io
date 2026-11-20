"use client";

import { useState } from "react";
import Image from "next/image";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import Achievements from "@/data/achievements";

export default function AchievementsSection() {
  // Touch devices have no hover: tap toggles the story overlay (one open at a time).
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <section className="sec" id="achievements">
      <div className="wrap">
        <RevealOnScroll>
          <p className="eyebrow">Recognition</p>
          <h2 className="sec-title">Wins and leadership</h2>
          <p className="lede">Hover (or tap) a card for the story behind it.</p>
        </RevealOnScroll>
        <div className="ac">
          {Achievements.map((a, i) => {
            const open = openId === a.id;
            const storyId = `acd-story-${a.id}`;
            return (
              <RevealOnScroll key={a.id} delay={(i % 3) * 60}>
                <div
                  className={`acd${open ? " open" : ""}`}
                  onKeyDown={(e) => {
                    if (e.key === "Escape") setOpenId(null);
                  }}
                >
                  <div className="acd-photo">
                    <Image src={a.photo} alt="" fill sizes="(max-width: 560px) 100vw, (max-width: 900px) 50vw, 340px" />
                  </div>
                  <div className="acd-body">
                    <h3>
                      {/* The button's hit area stretches over the whole card (see .acd-toggle::after). */}
                      <button
                        type="button"
                        className="acd-toggle"
                        aria-expanded={open}
                        aria-controls={storyId}
                        onClick={() => setOpenId(open ? null : a.id)}
                      >
                        {a.title}
                      </button>
                    </h3>
                    <p className="acd-award">{a.award}</p>
                    <p className="acd-meta">
                      <b>{a.year}</b>
                      {a.level ? <span>{a.level}</span> : null}
                    </p>
                    {a.representing && <p className="acd-rep">{a.representing}</p>}
                  </div>

                  <div className="acd-over" id={storyId}>
                    <p>{a.description}</p>
                    {a.projectUrl && (
                      <a href={a.projectUrl} target="_blank" rel="noopener noreferrer">
                        View project ↗
                      </a>
                    )}
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
