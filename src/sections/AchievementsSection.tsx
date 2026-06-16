import {
  Award,
  BadgeCheck,
  Cloud,
  FlaskConical,
  Globe2,
  GraduationCap,
  Languages,
  PenSquare,
  ScrollText,
  SearchCheck,
  Trophy,
} from "lucide-react";
import { achievements } from "../content";
import { SectionHeading } from "../components/SectionHeading";

const iconMap = {
  trophy: Trophy,
  flask: FlaskConical,
  cloud: Cloud,
  badge: BadgeCheck,
  graduation: GraduationCap,
  speech: Languages,
  pen: PenSquare,
  globe: Globe2,
  scroll: ScrollText,
  search: SearchCheck,
  award: Award,
} as const;

export default function AchievementsSection() {
  return (
    <section id="achievements" className="section-shell pt-24 md:pt-32">
      <SectionHeading
        eyebrow="Achievements"
        title="Signals of credibility across entrepreneurship, cloud, academics, and AI."
        description="These are proof points across founder execution, technical depth, academics, and public recognition."
      />

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {achievements.map((item, index) => {
          const Icon = iconMap[item.icon as keyof typeof iconMap];

          return (
            <article
              key={item.title}
              data-reveal
              className="glass-panel reveal-item p-6"
              style={{ transitionDelay: `${index * 60}ms` }}
            >
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl border border-white/12 bg-white/7 text-[#f0f0f5] shadow-[0_0_28px_rgba(124,92,252,0.14)]">
                <Icon size={20} />
              </div>
              <p className="text-[0.68rem] uppercase tracking-[0.28em] text-white/38">Achievement</p>
              <h3 className="mt-2 text-lg font-medium leading-7 text-white">{item.title}</h3>
              <p className="mt-2 text-sm leading-6 text-white/56">{item.subtitle}</p>
            </article>
          );
        })}
      </div>
    </section>
  );
}
