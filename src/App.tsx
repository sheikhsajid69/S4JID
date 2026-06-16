import { AnimatePresence, motion, useMotionValue, useSpring } from "framer-motion";
import { ArrowDown, ArrowRight, Mail, Menu, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { BlurText } from "./components/BlurText";
import { GitHubIcon, LeetCodeIcon, LinkedInIcon, XIcon, YouTubeIcon } from "./components/BrandIcons";
import { SocialPill } from "./components/SocialPill";
import { socialLinks } from "./content";
import BlackHole from "./components/BlackHole";

import AboutSection from "./sections/AboutSection";
import ExperienceSection from "./sections/ExperienceSection";
import EducationSection from "./sections/EducationSection";
import SkillsSection from "./sections/SkillsSection";
import ProjectsSection from "./sections/ProjectsSection";
import AchievementsSection from "./sections/AchievementsSection";
import ContactSection from "./sections/ContactSection";

const navItems = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Education", href: "#education" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Achievements", href: "#achievements" },
  { label: "Contact", href: "#contact" },
];

const socialIconMap = {
  GitHub: <GitHubIcon className="h-[18px] w-[18px]" />,
  LinkedIn: <LinkedInIcon className="h-[18px] w-[18px]" />,
  LeetCode: <LeetCodeIcon className="h-[18px] w-[18px]" />,
  X: <XIcon className="h-[18px] w-[18px]" />,
  YouTube: <YouTubeIcon className="h-[18px] w-[18px]" />,
};



export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const rawGlowX = useMotionValue(-200);
  const rawGlowY = useMotionValue(-200);
  const rawTiltX = useMotionValue(0);
  const rawTiltY = useMotionValue(0);
  const glowX = useSpring(rawGlowX, { stiffness: 90, damping: 18, mass: 0.6 });
  const glowY = useSpring(rawGlowY, { stiffness: 90, damping: 18, mass: 0.6 });
  const tiltX = useSpring(rawTiltX, { stiffness: 120, damping: 16, mass: 0.55 });
  const tiltY = useSpring(rawTiltY, { stiffness: 120, damping: 16, mass: 0.55 });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.18, rootMargin: "0px 0px -10% 0px" },
    );

    const items = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    items.forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handlePointerMove = (event: PointerEvent) => {
      rawGlowX.set(event.clientX - 180);
      rawGlowY.set(event.clientY - 180);
      const horizontalOffset = event.clientX / window.innerWidth - 0.5;
      const verticalOffset = event.clientY / window.innerHeight - 0.5;
      rawTiltX.set(verticalOffset * -9);
      rawTiltY.set(horizontalOffset * 9);
    };

    window.addEventListener("pointermove", handlePointerMove);

    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, [rawGlowX, rawGlowY, rawTiltX, rawTiltY]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const socialButtons = useMemo(
    () =>
      socialLinks.map((link) => (
        <SocialPill
          key={link.label}
          href={link.href}
          label={link.label}
          icon={socialIconMap[link.label as keyof typeof socialIconMap]}
        />
      )),
    [],
  );

  return (
    <div className="relative min-h-screen overflow-x-clip bg-[#0a0a0f] text-[#f0f0f5]">
      <div className="pointer-events-none fixed inset-0 z-0 opacity-90">
        <div className="noise-mask" />
        <div className="hero-bleed hero-bleed-left" />
        <div className="hero-bleed hero-bleed-right" />
        <motion.div className="glow-orb" style={{ x: glowX, y: glowY }} />
      </div>

      <header className="fixed inset-x-0 top-0 z-40 px-4 pt-4 md:px-6">
        <nav className="glass-panel mx-auto flex max-w-6xl items-center justify-between rounded-full px-4 py-3 md:px-6">
          <a href="#top" className="flex items-center gap-3">
            <img
              src="/s4jid_avatar.png"
              alt="S4JID"
              className="h-11 w-11 rounded-full border border-white/10 object-cover"
            />
            <div className="hidden sm:block">
              <p className="font-display text-2xl italic tracking-[-0.05em] text-white">S4JID</p>
              <p className="text-xs uppercase tracking-[0.28em] text-white/42">Bangalore, India</p>
            </div>
          </a>

          <div className="hidden items-center gap-5 md:flex">
            {navItems.map((item) => (
              <a key={item.href} href={item.href} className="nav-link">
                {item.label}
              </a>
            ))}
          </div>

          <div className="hidden items-center gap-3 md:flex">
            <a href="mailto:sheikhsajid.com@gmail.com" className="glass-button">
              <Mail size={16} />
              Get In Touch
            </a>
          </div>

          <button
            type="button"
            aria-label={menuOpen ? "Close navigation" : "Open navigation"}
            className="glass-icon-button md:hidden"
            onClick={() => setMenuOpen((current) => !current)}
          >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </nav>

        <AnimatePresence>
          {menuOpen ? (
            <motion.div
              initial={{ opacity: 0, y: -18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.28, ease: [0.23, 1, 0.32, 1] }}
              className="glass-panel mx-auto mt-3 max-w-6xl rounded-[28px] p-4 md:hidden"
            >
              <div className="flex flex-col gap-2">
                {navItems.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className="rounded-2xl px-4 py-3 text-sm text-white/76 transition hover:bg-white/6 hover:text-white"
                    onClick={() => setMenuOpen(false)}
                  >
                    {item.label}
                  </a>
                ))}
                <a
                  href="mailto:sheikhsajid.com@gmail.com"
                  className="glass-button mt-2 w-full justify-center"
                  onClick={() => setMenuOpen(false)}
                >
                  <Mail size={16} />
                  sheikhsajid.com@gmail.com
                </a>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </header>

      <main id="top" className="relative z-10">
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
              <a href="#projects" className="glass-button">
                View Projects
                <ArrowRight size={16} />
              </a>
              <a href="#contact" className="glass-button-alt">
                Get In Touch
                <Mail size={16} />
              </a>
            </div>

            <div className="mt-8 flex flex-wrap justify-center gap-3">
              {socialButtons}
            </div>
          </div>

          <a href="#about" className="scroll-indicator">
            <span className="text-[0.72rem] uppercase tracking-[0.32em] text-white/46">Scroll</span>
            <span className="glass-icon-button h-11 w-11 animate-bounce-subtle">
              <ArrowDown size={16} />
            </span>
          </a>
        </section>

          <AboutSection />
          <ExperienceSection />
          <EducationSection />
          <SkillsSection />
          <ProjectsSection />
          <AchievementsSection />
          <ContactSection />
      </main>

      <footer className="relative z-10 px-4 pb-8 pt-[4.5rem] text-center md:px-6">
        <div className="mx-auto max-w-6xl border-t border-white/10 pt-8">
          <p className="text-sm text-white/42">{"\u00A9 2026 S4JID \u00B7 Sheikh Sajid"}</p>
          <p className="mt-2 text-sm font-display italic tracking-[0.04em] text-white/55">Viva La Vida.</p>
        </div>
      </footer>
    </div>
  );
}
