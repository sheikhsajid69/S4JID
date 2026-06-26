import { stats } from "../content";
import { SectionHeading } from "../components/SectionHeading";

export default function AboutSection() {
  return (
    <section id="about" className="section-shell pt-24 md:pt-32">
      <SectionHeading
        eyebrow="About"
        title="Builder mindset. Founder pressure. Engineer discipline."
        description="A cinematic bio anchored in real numbers: scale, velocity, systems thinking, and a long record of shipping."
      />

      <div className="grid gap-6 lg:grid-cols-[1.25fr_1fr]">
        <article data-reveal className="glass-panel reveal-item p-6 md:p-8">
          <p className="font-display text-3xl italic tracking-[-0.04em] text-white md:text-4xl">
            "I build things that scale, break them to understand them, then rebuild them better."
          </p>
          <div className="mt-6 space-y-5 text-sm leading-7 text-white/66 md:text-base">
            <p>
              Started a first EdTech platform at 15, then kept compounding through founder mode, client
              delivery, and open-source engineering. That path led to Sphereworks Inc., a CTO seat at
              Neptune.dev, and a GSoC 2025 contribution run.
            </p>
            <p>
              The operating model stays consistent: build quickly, pressure-test the system, then refine it
              until it can scale. So far that has translated into 740+ production apps, 3,000+ active
              clients, teams across continents, and products that have reached more than a million users.
            </p>
            <p>
              Right now the focus is AI-native developer tools, open-source projects, and durable product
              systems that compress the gap between idea, implementation, and deployment.
            </p>
          </div>
          <hr className="hairline my-6" />
          <div className="flex flex-wrap gap-2">
            {[
              "Started at 15",
              "Sphereworks Inc.",
              "Neptune.dev",
              "GSoC 2025",
              "Open Source",
            ].map((item) => (
              <span key={item} className="achievement-badge">
                {item}
              </span>
            ))}
          </div>
        </article>

        <div className="grid gap-4 sm:grid-cols-2">
          {stats.map((stat) => (
            <div key={stat.label} data-reveal className="glass-panel reveal-item stat-pill p-5">
              <p className="font-display text-3xl italic tracking-[-0.05em] text-white md:text-4xl">
                {stat.value}
              </p>
              <p className="mt-2 text-sm text-white/55">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* GitHub 3D Contributions Chart */}
      <div className="mt-6 w-full glass-panel reveal-item p-6 md:p-8" data-reveal>
        <h3 className="font-display text-2xl italic tracking-[-0.03em] text-white mb-6">
          Contributions
        </h3>
        <div className="w-full overflow-x-auto rounded-xl bg-white/[0.02] border border-white/5 p-4 flex justify-center">
          <img
            src="https://contri3d.vercel.app/api/contributions?user=sheikhsajid69&lc=sheikhsajid69&theme=red&size=lg&type=iso&animate=1&labels=1"
            alt="3D Contribution Chart"
            className="max-h-[360px] w-full max-w-4xl h-auto object-contain"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}
