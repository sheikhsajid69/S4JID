import { useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, ArrowDown, Mail } from "lucide-react";
import { BlurText } from "../components/BlurText";
import { SocialPill } from "../components/SocialPill";
import { GitHubIcon, LinkedInIcon, LeetCodeIcon, XIcon } from "../components/BrandIcons";
import { socialLinks } from "../content";
import BlackHole from "../components/BlackHole";

const socialIconMap: Record<string, React.ReactNode> = {
  GitHub: <GitHubIcon className="h-[18px] w-[18px]" />,
  LinkedIn: <LinkedInIcon className="h-[18px] w-[18px]" />,
  LeetCode: <LeetCodeIcon className="h-[18px] w-[18px]" />,
  X: <XIcon className="h-[18px] w-[18px]" />,
};

export default function HomePage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const socialButtons = useMemo(
    () =>
      socialLinks
        .filter((link) => link.label !== "YouTube")
        .map((link) => (
          <SocialPill
            key={link.label}
            href={link.href}
            label={link.label}
            icon={socialIconMap[link.label]}
          />
        )),
    [],
  );

  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center px-4 pb-16 pt-28 text-center md:px-6">
      <BlackHole />

      <div className="relative z-10 flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
          className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[0.72rem] uppercase tracking-[0.125px] text-white/56 shadow-[0_0_40px_rgba(124,92,252,0.08)] backdrop-blur-xl"
        >
          <span className="h-2 w-2 rounded-full bg-[#dd5b00] shadow-[0_0_10px_rgba(221,91,0,0.9)]" />
          Available for collaborations
        </motion.div>

        <h1 className="mt-8 font-display text-[5rem] italic leading-[0.88] tracking-[-0.08em] text-white sm:text-[7rem] md:text-[9rem] lg:text-[12rem]">
          <BlurText text="S4JID" delay={0.2} wordDelay={0.12} forceAnimate />
        </h1>

        <p className="mt-6 max-w-2xl font-display text-xl italic leading-snug tracking-[-0.03em] text-white/70 md:text-2xl lg:text-3xl">
          <BlurText text="Systems Builder · AI Engineer · Technical Founder" delay={0.6} wordDelay={0.06} forceAnimate />
        </p>

        <p className="mx-auto mt-6 max-w-lg text-sm leading-7 text-white/50 md:text-base">
          Full-stack engineer, technical entrepreneur, and open-source builder based in Bangalore, India.
        </p>

        {/* Profile photo */}
        <div className="relative mt-10 w-fit">
          <div className="absolute -inset-3 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(221,91,0,0.22),transparent_70%)] blur-xl pointer-events-none" />
          <div
            className="relative overflow-hidden rounded-full border border-white/12"
            style={{
              background: "linear-gradient(160deg, rgba(255,255,255,0.08), rgba(255,255,255,0.02))",
              boxShadow: "0 24px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.06) inset, 0 0 40px rgba(221,91,0,0.12)",
              backdropFilter: "blur(20px)",
            }}
          >
            <img
              src="/s4jid_profile_pic.png"
              alt="Sheikh Sajid"
              width={160}
              height={160}
              className="block h-40 w-40 object-cover object-top"
              style={{ filter: "contrast(1.05) brightness(0.96)" }}
            />
          </div>
          <div
            className="absolute -bottom-2 -right-2 flex items-center gap-2 rounded-full border border-white/12 px-3 py-1.5 text-[0.68rem] uppercase tracking-[0.28em] text-white/70"
            style={{ background: "rgba(221,91,0,0.12)", backdropFilter: "blur(20px)" }}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[#dd5b00] shadow-[0_0_8px_rgba(221,91,0,1)]" />
            Bangalore
          </div>
        </div>

        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Link to="/projects" className="glass-button">
            View Projects
            <ArrowRight size={16} />
          </Link>
          <Link to="/contact" className="glass-button-alt">
            Get In Touch
            <Mail size={16} />
          </Link>
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {socialButtons}
        </div>
      </div>

      <Link to="/about" className="scroll-indicator">
        <span className="text-[0.72rem] uppercase tracking-[0.32em] text-white/46">Scroll</span>
        <span className="glass-icon-button h-11 w-11 animate-bounce-subtle">
          <ArrowDown size={16} />
        </span>
      </Link>
    </section>
  );
}
