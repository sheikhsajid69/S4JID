import { GitCommitHorizontal, GitBranch, GitPullRequest } from "lucide-react";
import { experiences } from "../content";
import { SectionHeading } from "../components/SectionHeading";

/* Git-style icons per card index */
const gitIcons = [GitCommitHorizontal, GitBranch, GitPullRequest, GitCommitHorizontal, GitBranch];

export default function ExperienceSection() {
  const leftItems = experiences.slice(0, 3);
  const rightItems = experiences.slice(3);

  return (
    <section id="experience" className="section-shell pt-24 md:pt-32">
      <SectionHeading
        eyebrow="Experience"
        title="Built across startups, freelance, open source, and founder mode."
        description="A career shaped by product speed, engineering quality, and execution pressure."
      />

      <div className="exp-grid">
        {/* LEFT COLUMN */}
        <div className="exp-grid__col exp-grid__col--left">
          {leftItems.map((item, index) => {
            const GitIcon = gitIcons[index];
            const isActive = index === 0;

            return (
              <div key={`${item.role}-${item.company}`} className="git-timeline__item-inline git-timeline__item-inline--right">
                {/* Card */}
                <article
                  data-reveal
                  className="exp-grid__card reveal-item glass-panel"
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <p className="exp-grid__eyebrow">{item.period}</p>
                  <h3 className="exp-grid__title">{item.role}</h3>
                  <p className="exp-grid__company">{item.company}</p>
                  <hr className="hairline my-4" />
                  <ul className="exp-grid__highlights">
                    {item.highlights.map((h) => (
                      <li key={h}>{h}</li>
                    ))}
                  </ul>
                </article>

                {/* Bullet node */}
                <div className={`git-timeline__node ${isActive ? "git-timeline__node--active" : ""}`}>
                  <GitIcon size={12} />
                </div>
              </div>
            );
          })}
        </div>

        {/* CENTER COLUMN — portrait image */}
        <div className="exp-grid__col exp-grid__col--center">
          <div className="exp-grid__image-wrap">
            <div className="exp-grid__image-glow" />
            <img
              src="/s4jid_experience.png"
              alt="Sheikh Sajid"
              className="exp-grid__image"
              loading="lazy"
            />
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="exp-grid__col exp-grid__col--right">
          {rightItems.map((item, index) => {
            const GitIcon = gitIcons[index + 3];
            return (
              <div key={`${item.role}-${item.company}`} className="git-timeline__item-inline git-timeline__item-inline--left">
                {/* Bullet node */}
                <div className="git-timeline__node">
                  <GitIcon size={12} />
                </div>

                {/* Card */}
                <article
                  data-reveal
                  className="exp-grid__card reveal-item glass-panel"
                  style={{ transitionDelay: `${(index + 3) * 100}ms` }}
                >
                  <p className="exp-grid__eyebrow">{item.period}</p>
                  <h3 className="exp-grid__title">{item.role}</h3>
                  <p className="exp-grid__company">{item.company}</p>
                  <hr className="hairline my-4" />
                  <ul className="exp-grid__highlights">
                    {item.highlights.map((h) => (
                      <li key={h}>{h}</li>
                    ))}
                  </ul>
                </article>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
