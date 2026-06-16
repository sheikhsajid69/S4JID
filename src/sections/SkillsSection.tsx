import { BrainCircuit, Braces, CloudCog, Code2, Database, Cpu } from "lucide-react";
import { skillGroups } from "../content";
import { SectionHeading } from "../components/SectionHeading";

const categoryIcons = {
  Languages: Code2,
  Frameworks: Braces,
  "AI / ML": BrainCircuit,
  "Cloud / DevOps": CloudCog,
  Databases: Database,
} as const;

/* Map skill names to devicon CSS classes */
const deviconMap: Record<string, string> = {
  JavaScript: "devicon-javascript-plain colored",
  Python: "devicon-python-plain colored",
  Java: "devicon-java-plain colored",
  Swift: "devicon-swift-plain colored",
  TypeScript: "devicon-typescript-plain colored",
  HTML5: "devicon-html5-plain colored",
  CSS3: "devicon-css3-plain colored",
  SQL: "devicon-azuresqldatabase-plain",
  React: "devicon-react-original colored",
  "Next.js": "devicon-nextjs-plain",
  "Node.js": "devicon-nodejs-plain colored",
  Express: "devicon-express-original",
  TailwindCSS: "devicon-tailwindcss-original colored",
  Vue: "devicon-vuejs-plain colored",
  Flutter: "devicon-flutter-plain colored",
  TensorFlow: "devicon-tensorflow-original colored",
  PyTorch: "devicon-pytorch-original colored",
  AWS: "devicon-amazonwebservices-plain-wordmark colored",
  "OCI (Oracle Certified 2025)": "devicon-oracle-original colored",
  Docker: "devicon-docker-plain colored",
  Kubernetes: "devicon-kubernetes-plain colored",
  "GitHub Actions": "devicon-githubactions-plain",
  Vercel: "devicon-vercel-original",
  Firebase: "devicon-firebase-plain colored",
  MongoDB: "devicon-mongodb-plain colored",
  PostgreSQL: "devicon-postgresql-plain colored",
  MySQL: "devicon-mysql-plain colored",
  Redis: "devicon-redis-plain colored",
  Supabase: "devicon-supabase-plain colored",
};

export default function SkillsSection() {
  return (
    <section id="skills" className="section-shell pt-24 md:pt-32">
      <SectionHeading
        eyebrow="Skills"
        title="Full-stack depth with AI, infrastructure, and product shipping range."
        description="Grouped by discipline, displayed as monochrome glass badges, and tuned to the stack behind real shipped work."
      />

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {skillGroups.map((group, index) => {
          const Icon = categoryIcons[group.category as keyof typeof categoryIcons];

          return (
            <article
              key={group.category}
              data-reveal
              className="glass-panel reveal-item p-6"
              style={{ transitionDelay: `${index * 90}ms` }}
            >
              <div className="mb-5 flex items-center gap-3">
                <span className="grid h-11 w-11 place-items-center rounded-full border border-white/12 bg-white/6 text-white/82 shadow-[0_0_30px_rgba(124,92,252,0.18)]">
                  <Icon size={18} />
                </span>
                <div>
                  <p className="text-[0.72rem] uppercase tracking-[0.32em] text-white/40">Category</p>
                  <h3 className="font-display text-2xl italic tracking-[-0.04em] text-white">
                    {group.category}
                  </h3>
                </div>
              </div>
              <p className="mb-5 text-sm leading-6 text-white/56">{group.description}</p>
              <div className="flex flex-wrap gap-3">
                {group.skills.map((skill) => {
                  const deviconClass = deviconMap[skill.name];
                  return (
                    <span key={skill.name} className="skill-pill">
                      {deviconClass ? (
                        <i className={deviconClass} style={{ fontSize: "16px" }} />
                      ) : (
                        <Cpu size={14} className="text-white/60" />
                      )}
                      {skill.name}
                    </span>
                  );
                })}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
