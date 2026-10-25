import { ArrowUpRight, Sparkles } from "lucide-react";
import { stats, gitfutProfile } from "../content";
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

      {/* GitFUT Developer Rating & Card Showcase */}
      <div className="mt-6 w-full glass-panel reveal-item p-6 md:p-8" data-reveal>
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-5">
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-400 shadow-[0_0_20px_rgba(245,158,11,0.25)]">
              <Sparkles size={18} />
            </span>
            <div>
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.9)]" />
                <p className="text-[0.72rem] uppercase tracking-[0.32em] text-white/50">Developer Card</p>
              </div>
              <h3 className="mt-1 font-display text-2xl italic tracking-[-0.03em] text-white md:text-3xl">
                GitFUT Developer Rating
              </h3>
            </div>
          </div>
          <a
            href={gitfutProfile.profileUrl}
            target="_blank"
            rel="noreferrer"
            className="glass-button text-xs py-2 px-4"
            style={{
              background: "rgba(245, 158, 11, 0.12)",
              borderColor: "rgba(245, 158, 11, 0.35)",
            }}
          >
            <span>View Live on GitFUT</span>
            <ArrowUpRight size={14} className="text-amber-400" />
          </a>
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-[280px_1fr] items-center">
          {/* Card Presentation with ambient golden aura */}
          <div className="flex flex-col items-center">
            <a
              href={gitfutProfile.profileUrl}
              target="_blank"
              rel="noreferrer"
              className="group relative block w-full max-w-[250px] transition-transform duration-500 hover:scale-[1.03]"
              title="View card on GitFUT"
            >
              <div className="absolute -inset-4 rounded-3xl bg-[radial-gradient(ellipse_at_center,rgba(245,158,11,0.22),transparent_70%)] blur-2xl pointer-events-none transition-opacity duration-500 group-hover:opacity-100 opacity-70" />
              <img
                src={gitfutProfile.cardImage}
                alt="S4JID GitFUT Developer Card"
                width={674}
                height={1024}
                className="relative z-10 w-full h-auto object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.6)]"
                style={{
                  filter: "drop-shadow(0 15px 30px rgba(245, 158, 11, 0.25))",
                }}
              />
            </a>
            <div className="mt-4 flex items-center gap-2 text-xs text-white/45">
              <span>Verified GitHub Stats</span>
              <span>•</span>
              <a
                href={gitfutProfile.profileUrl}
                target="_blank"
                rel="noreferrer"
                className="text-amber-400/80 hover:text-amber-300 underline underline-offset-2 transition-colors"
              >
                gitfut.com/{gitfutProfile.handle.replace("@", "")}
              </a>
            </div>
          </div>

          {/* Stats Breakdown and Progress Bars */}
          <div className="flex flex-col justify-center">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-300">
                {gitfutProfile.overall} OVR • {gitfutProfile.cardTier}
              </span>
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
                Position: {gitfutProfile.position} ({gitfutProfile.positionFull})
              </span>
              <span className="rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 text-xs font-mono text-blue-300">
                {gitfutProfile.primaryLanguage}
              </span>
            </div>

            <p className="mt-4 text-sm leading-6 text-white/60">
              Real-time engineering telemetry synthesized by GitFUT from GitHub commit cadence, language breadth, and shipping frequency. Positioned as an offensive Striker (ST) leading with high technical agility (<span className="text-white font-medium">81 DRI</span>) and decisive execution velocity (<span className="text-white font-medium">79 SHO</span>).
            </p>

            {/* 6 Stat Bars Grid */}
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {gitfutProfile.attributes.map((attr) => (
                <div
                  key={attr.key}
                  className="rounded-xl border border-white/8 bg-white/[0.03] p-3.5 transition-all hover:border-amber-500/25 hover:bg-white/[0.05]"
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-mono font-bold tracking-wider text-amber-400">
                      {attr.key}{" "}
                      <span className="font-sans font-normal text-white/60">
                        ({attr.label})
                      </span>
                    </span>
                    <span className="font-mono font-bold text-white text-sm">
                      {attr.value}
                    </span>
                  </div>

                  {/* Progress Bar */}
                  <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-white/5 border border-white/10">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-300 shadow-[0_0_10px_rgba(245,158,11,0.5)] transition-all duration-1000"
                      style={{ width: `${attr.value}%` }}
                    />
                  </div>

                  <p className="mt-2 text-[0.72rem] text-white/45">
                    {attr.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
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
