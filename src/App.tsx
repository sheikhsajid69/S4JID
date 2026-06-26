import { AnimatePresence, motion, useMotionValue, useSpring } from "framer-motion";
import { ArrowRight, Mail, Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link, Route, Routes, useLocation } from "react-router-dom";
import { Glass } from "@samasante/liquid-glass";

import GlassCursor from "./components/GlassCursor";
import { GitHubIcon, LeetCodeIcon, LinkedInIcon, XIcon } from "./components/BrandIcons";

import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ExperiencePage from "./pages/ExperiencePage";
import EducationPage from "./pages/EducationPage";
import SkillsPage from "./pages/SkillsPage";
import ProjectsPage from "./pages/ProjectsPage";
import AchievementsPage from "./pages/AchievementsPage";
import ContactPage from "./pages/ContactPage";

const navItems = [
  { label: "About", to: "/about" },
  { label: "Experience", to: "/experience" },
  { label: "Education", to: "/education" },
  { label: "Skills", to: "/skills" },
  { label: "Projects", to: "/projects" },
  { label: "Achievements", to: "/achievements" },
];

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const videoRef = useRef<HTMLVideoElement>(null);

  // Play background video automatically and handle autoplay blocking policies
  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      const attemptPlay = () => {
        video.play().catch((err) => {
          console.log("Autoplay failed, retrying on user interaction...", err);
          const enablePlay = () => {
            video.play();
            document.removeEventListener("click", enablePlay);
            document.removeEventListener("touchstart", enablePlay);
          };
          document.addEventListener("click", enablePlay);
          document.addEventListener("touchstart", enablePlay);
        });
      };
      
      attemptPlay();
      
      const handleVisibilityChange = () => {
        if (document.visibilityState === "visible") {
          video.play().catch(() => {});
        }
      };
      document.addEventListener("visibilitychange", handleVisibilityChange);
      
      return () => {
        document.removeEventListener("visibilitychange", handleVisibilityChange);
      };
    }
  }, []);
  const rawGlowX = useMotionValue(-200);
  const rawGlowY = useMotionValue(-200);
  const glowX = useSpring(rawGlowX, { stiffness: 90, damping: 18, mass: 0.6 });
  const glowY = useSpring(rawGlowY, { stiffness: 90, damping: 18, mass: 0.6 });

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  // Reveal observer
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
  }, [location.pathname]);

  // Glow orb tracking
  useEffect(() => {
    const handlePointerMove = (event: PointerEvent) => {
      rawGlowX.set(event.clientX - 180);
      rawGlowY.set(event.clientY - 180);
    };
    window.addEventListener("pointermove", handlePointerMove);
    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, [rawGlowX, rawGlowY]);

  // Close menu on large screens
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="glass-cursor-area relative min-h-screen overflow-x-clip bg-[#0a0a0f] text-[#f0f0f5]">
      {/* Glass cursor (desktop only) */}
      <GlassCursor />

      {/* Background Video */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-[#0a0a0f]">
        <video
          ref={videoRef}
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260422_112520_ee819691-f2e8-4c54-bb77-3fb72c84eaa5.mp4"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="h-full w-full object-cover opacity-60"
        />
        {/* Dark overlay & slight blur to protect content readability */}
        <div className="absolute inset-0 bg-[#0a0a0f]/50 backdrop-blur-[1px]" />
      </div>

      {/* Liquid Glass Header */}
      <header className="fixed inset-x-0 top-0 z-40 flex flex-col items-center px-4 pt-4 md:px-6">
        <div className="w-full max-w-5xl">
          <Glass
            style={{
              background: "rgba(10, 10, 15, 0.55)",
              borderRadius: 9999,
              border: "1px solid rgba(255, 255, 255, 0.12)",
            }}
          >
            <nav className="flex items-center justify-between gap-4 px-4 py-3 md:px-6 md:gap-8">
              {/* Logo container */}
              <div className="flex shrink-0 items-center">
                <Link to="/" className="flex items-center gap-3">
                  <img
                    src="/s4jid_avatar.png"
                    alt="S4JID"
                    className="h-11 w-11 rounded-full border border-white/10 object-cover"
                  />
                  <div className="hidden sm:block">
                    <p className="font-display text-2xl italic tracking-[-0.05em] text-white">S4JID</p>
                  </div>
                </Link>
              </div>

              {/* Middle links container */}
              <div className="hidden shrink-0 items-center gap-5 md:flex lg:gap-8">
                {navItems.map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    className={`nav-link ${location.pathname === item.to ? "text-white" : ""}`}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>

              {/* Right side container */}
              <div className="flex shrink-0 items-center gap-3">
                <div className="hidden items-center md:flex">
                  <Link to="/contact" className="flex items-center">
                    <Glass
                      style={{
                        background: "rgba(255, 255, 255, 0.08)",
                        borderRadius: 9999,
                        border: "1px solid rgba(255, 255, 255, 0.14)",
                        padding: "8px 16px",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 8,
                        fontSize: 14,
                        fontWeight: 500,
                        lineHeight: 1,
                      }}
                    >
                      <Mail size={16} className="shrink-0" />
                      <span>Get In Touch</span>
                    </Glass>
                  </Link>
                </div>

                <button
                  type="button"
                  aria-label={menuOpen ? "Close navigation" : "Open navigation"}
                  className="glass-icon-button md:hidden"
                  onClick={() => setMenuOpen((current) => !current)}
                >
                  {menuOpen ? <X size={18} /> : <Menu size={18} />}
                </button>
              </div>
            </nav>
          </Glass>

          {/* Mobile menu */}
          <AnimatePresence>
            {menuOpen ? (
              <motion.div
                initial={{ opacity: 0, y: -18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.28, ease: [0.23, 1, 0.32, 1] }}
              >
                <Glass
                  style={{
                    background: "rgba(10, 10, 15, 0.7)",
                    borderRadius: 28,
                    border: "1px solid rgba(255, 255, 255, 0.12)",
                    marginTop: 12,
                    padding: 16,
                  }}
                >
                  <div className="flex flex-col gap-2">
                    {navItems.map((item) => (
                      <Link
                        key={item.to}
                        to={item.to}
                        className="rounded-2xl px-4 py-3 text-sm text-white/76 transition hover:bg-white/6 hover:text-white"
                        onClick={() => setMenuOpen(false)}
                      >
                        {item.label}
                      </Link>
                    ))}
                    <Link
                      to="/contact"
                      className="rounded-2xl px-4 py-3 text-sm text-white/76 transition hover:bg-white/6 hover:text-white"
                      onClick={() => setMenuOpen(false)}
                    >
                      Contact
                    </Link>
                    <a
                      href="mailto:sheikhsajid69@protonmail.com"
                      className="glass-button mt-2 w-full justify-center"
                      onClick={() => setMenuOpen(false)}
                    >
                      <Mail size={16} />
                      sheikhsajid69@protonmail.com
                    </a>
                  </div>
                </Glass>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      </header>

      {/* Routes */}
      <main className="relative z-10">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/experience" element={<ExperiencePage />} />
          <Route path="/education" element={<EducationPage />} />
          <Route path="/skills" element={<SkillsPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/achievements" element={<AchievementsPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </main>

      {/* Footer */}
      <footer className="relative z-10 px-4 pb-8 pt-[4.5rem] text-center md:px-6">

        <div className="relative mx-auto max-w-6xl border-t border-white/10 pt-8">
          <div className="mb-6 flex justify-center gap-4">
            <a href="https://github.com/sheikhsajid69" target="_blank" rel="noreferrer" className="glass-icon-button h-10 w-10" aria-label="GitHub">
              <GitHubIcon className="h-[18px] w-[18px]" />
            </a>
            <a href="https://linkedin.com/in/sheikhsajid69" target="_blank" rel="noreferrer" className="glass-icon-button h-10 w-10" aria-label="LinkedIn">
              <LinkedInIcon className="h-[18px] w-[18px]" />
            </a>
            <a href="https://leetcode.com/u/sheikhsajid69/" target="_blank" rel="noreferrer" className="glass-icon-button h-10 w-10" aria-label="LeetCode">
              <LeetCodeIcon className="h-[18px] w-[18px]" />
            </a>
            <a href="https://x.com/SheikhSajid69" target="_blank" rel="noreferrer" className="glass-icon-button h-10 w-10" aria-label="X">
              <XIcon className="h-[18px] w-[18px]" />
            </a>
          </div>
          <p className="text-sm text-white/42">{"\u00A9 2026 S4JID \u00B7 Sheikh Sajid"}</p>
          <p className="mt-1 text-xs text-white/30">Bangalore, India</p>
          <p className="mt-2 text-sm font-display italic tracking-[0.04em] text-white/55">Viva La Vida.</p>
        </div>
      </footer>
    </div>
  );
}
