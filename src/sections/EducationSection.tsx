import { GitCommitHorizontal } from "lucide-react";
import { education } from "../content";
import { SectionHeading } from "../components/SectionHeading";

export default function EducationSection() {
  return (
    <section id="education" className="section-shell">
      <SectionHeading
        eyebrow="Education"
        title="Academic foundations behind the builder mindset."
        description="Formal education blended with real-world execution — from Harvard Business School to commerce studies."
      />

      <div className="git-timeline">
        {education.map((item, index) => {
          const isLast = index === education.length - 1;

          return (
            <div
              key={item.institution}
              data-reveal
              className={`git-timeline__item reveal-item ${index === 0 ? "git-timeline__item--active" : ""}`}
              style={{ transitionDelay: `${index * 120}ms` }}
            >
              {/* Connecting line */}
              {!isLast && <div className="git-timeline__line" />}

              {/* Bullet node */}
              <div className={`git-timeline__bullet ${index === 0 ? "git-timeline__bullet--active" : ""}`}>
                <GitCommitHorizontal size={14} />
              </div>

              {/* Card body */}
              <div className="git-timeline__body glass-panel p-6 md:p-7">
                <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                  <div className="flex items-start gap-4">
                    {/* Institution logo */}
                    <div className="git-timeline__logo">
                      <img
                        src={item.logo}
                        alt={item.institution}
                        className="h-full w-full object-contain"
                        loading="lazy"
                      />
                    </div>
                    <div>
                      <p className="text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-white/38">
                        {item.degree}
                      </p>
                      <h3 className="mt-1 font-display text-2xl italic tracking-[-0.04em] text-white md:text-3xl">
                        {item.institution}
                      </h3>
                    </div>
                  </div>
                  <span className="tag-pill w-fit shrink-0">{item.period}</span>
                </div>

                <hr className="hairline my-5" />

                <ul className="space-y-3 text-sm leading-7 text-white/62 md:text-base">
                  {item.highlights.map((highlight) => (
                    <li key={highlight} className="flex gap-3">
                      <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-[#dd5b00] shadow-[0_0_12px_rgba(221,91,0,0.8)]" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
