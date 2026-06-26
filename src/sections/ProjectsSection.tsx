import { ArrowUpRight, Lock } from "lucide-react";
import { projects } from "../content";
import { SectionHeading } from "../components/SectionHeading";

export default function ProjectsSection() {
  return (
    <section id="projects" className="section-shell pt-24 md:pt-32">
      <SectionHeading
        eyebrow="Projects"
        title="Pinned builds spanning DevTools, AI, fintech, frontend, and platform scale."
        description="A curated slice of open-source work, product experiments, and shipped systems tied directly to the S4JID build profile."
      />

      <div className="grid gap-6 lg:grid-cols-2">
        {projects.map((project, index) => (
          <article
            key={project.name}
            data-reveal
            className="project-card glass-panel reveal-item flex h-full flex-col p-6 md:p-7"
            style={{ transitionDelay: `${index * 70}ms` }}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[0.72rem] uppercase tracking-[0.32em] text-white/40">Featured build</p>
                <h3 className="mt-2 font-display text-3xl italic tracking-[-0.04em] text-white">
                  {project.name}
                </h3>
                <p className="mt-3 text-sm uppercase tracking-[0.24em] text-white/40">{project.meta}</p>
              </div>
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.25em] text-white/45">
                {String(index + 1).padStart(2, "0")}
              </span>
            </div>

            <p className="mt-5 flex-1 text-sm leading-7 text-white/62 md:text-base">{project.description}</p>

            <div className="mt-6 flex flex-wrap gap-3">
              {project.tags.map((tag) => (
                <span key={tag} className="tag-pill">
                  {tag}
                </span>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              {project.href && (
                <a
                  href={project.href}
                  target="_blank"
                  rel="noreferrer"
                  className="glass-button w-fit"
                >
                  {project.ctaLabel}
                  <ArrowUpRight size={16} />
                </a>
              )}
              {project.website && (
                <a
                  href={project.website}
                  target="_blank"
                  rel="noreferrer"
                  className="glass-button w-fit"
                  style={{
                    background: "rgba(221, 91, 0, 0.15)",
                    borderColor: "rgba(221, 91, 0, 0.35)",
                  }}
                >
                  Visit Site
                  <ArrowUpRight size={16} />
                </a>
              )}
              {!project.href && !project.website && (
                <span className="glass-button-disabled w-fit">
                  {project.ctaLabel}
                  <Lock size={16} />
                </span>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
