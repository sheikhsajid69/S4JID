import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Mail, Menu, Moon, Sun, Video, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link, Route, Routes, useLocation } from "react-router-dom";
import { Glass } from "@samasante/liquid-glass";
import { useDeviceOrientation } from "./hooks/useDeviceOrientation";

import { GitHubIcon, LeetCodeIcon, LinkedInIcon, XIcon } from "./components/BrandIcons";
import DotMatrixHandsBackground from "./components/DotMatrixHandsBackground";

import HomePage from "./pages/HomePage";
import AboutSection from "./sections/AboutSection";
import ExperienceSection from "./sections/ExperienceSection";
import EducationSection from "./sections/EducationSection";
import SkillsSection from "./sections/SkillsSection";
import ProjectsSection from "./sections/ProjectsSection";
import AchievementsSection from "./sections/AchievementsSection";
import ContactSection from "./sections/ContactSection";
import BlogPage from "./pages/BlogPage";
import WorksPage from "./pages/WorksPage";

const navItems = [
  { label: "About", to: "/about" },
  { label: "Experience", to: "/experience" },
  { label: "Education", to: "/education" },
  { label: "Skills", to: "/skills" },
  { label: "Projects", to: "/projects" },
  { label: "Works", to: "/works" },
  { label: "Achievements", to: "/achievements" },
  { label: "Blog", to: "/blog" },
];

function SectionPage({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return <div className="pt-24">{children}</div>;
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [bgMode, setBgMode] = useState<"matrix-light" | "matrix-dark" | "video">("matrix-light");
  const location = useLocation();
  const videoRef = useRef<HTMLVideoElement>(null);
  const { requestPermission } = useDeviceOrientation(videoRef);

  // Trigger device orientation permission on user gesture (iOS requirement)
  useEffect(() => {
    requestPermission();
    const handleGesture = () => {
      requestPermission();
      document.removeEventListener("click", handleGesture);
      document.removeEventListener("touchstart", handleGesture);
    };
    document.addEventListener("click", handleGesture);
    document.addEventListener("touchstart", handleGesture);
    return () => {
      document.removeEventListener("click", handleGesture);
      document.removeEventListener("touchstart", handleGesture);
    };
  }, []);

  // Play background video automatically and handle autoplay blocking policies
  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        video.pause();
        return;
      }

      const attemptPlay = () => {
        video.play().catch((err) => {
          console.log("Autoplay failed, retrying on user interaction...", err);
          const enablePlay = () => {
            video.play();
            document.removeEventListener("click", enablePlay);
            document.removeEventListener("touchstart", enablePlay);
          };
          document.addEventListener("click", enablePlay, { once: true });
          document.addEventListener("touchstart", enablePlay, { once: true });
        });
      };

      attemptPlay();

      const handleVisibilityChange = () => {
        if (document.visibilityState === "visible") {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      };
      document.addEventListener("visibilitychange", handleVisibilityChange);

      return () => {
        document.removeEventListener("visibilitychange", handleVisibilityChange);
      };
    }
  }, []);


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
      { threshold: 0.02, rootMargin: "0px 0px 40px 0px" },
    );

    const items = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    items.forEach((item) => {
      const rect = item.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        item.classList.add("is-visible");
      } else {
        observer.observe(item);
      }
    });

    return () => observer.disconnect();
  }, [location.pathname]);



  // Close menu on large screens
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className={`relative min-h-screen overflow-x-clip ${bgMode === "matrix-light" ? "theme-paper-light bg-[#f7f7f5] text-[#0d0d0d]" : "bg-[#0a0a0f] text-[#f0f0f5]"}`}>
      {/* Background Layer: Dot-Matrix Reaching Hands or Video */}
      <div className={`pointer-events-none fixed inset-0 z-0 overflow-hidden ${bgMode === "matrix-light" ? "bg-[#f7f7f5]" : "bg-[#0a0a0f]"}`}>
        {bgMode === "video" ? (
          <video
            ref={videoRef}
            src="/background_video.mp4"
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            {...{ fetchpriority: "high" }}
            className="h-full w-full object-cover"
            style={{
              transform: "scale(1.08)",
              willChange: "transform",
            }}
          />
        ) : (
          <DotMatrixHandsBackground theme={bgMode === "matrix-light" ? "light" : "dark"} />
        )}
      </div>

      {/* Liquid Glass Header */}
      <header className="fixed inset-x-0 top-0 z-40 flex flex-col items-center px-3.5 pt-3 sm:px-4 sm:pt-4 md:px-6">
        <div className="w-full max-w-6xl">
          <Glass
            className="header-glass-bar !block !w-full"
            style={{
              width: "100%",
              display: "block",
              boxSizing: "border-box",
              background: bgMode === "matrix-light" ? "rgba(255, 255, 255, 0.85)" : "rgba(10, 10, 15, 0.65)",
              borderRadius: 9999,
              border: bgMode === "matrix-light" ? "1px solid rgba(0, 0, 0, 0.12)" : "1px solid rgba(255, 255, 255, 0.14)",
            }}
          >
            <nav className="w-full flex items-center justify-between gap-3 px-3.5 py-2 sm:px-5 sm:py-2.5 md:px-6 md:gap-4 lg:gap-6">
              {/* Logo container */}
              <div className="flex shrink-0 items-center">
                <Link to="/" className="flex items-center gap-2 sm:gap-2.5">
                  <img
                    src="/s4jid_avatar.png"
                    alt="S4JID"
                    className="h-8 w-auto sm:h-10 object-contain"
                  />
                  <span className={`font-display text-lg sm:text-2xl italic tracking-[-0.04em] ${bgMode === "matrix-light" ? "text-[#0d0d0d]" : "text-white"}`}>S4JID</span>
                </Link>
              </div>

              {/* Middle links container (Desktops & Laptops 1024px+) */}
              <div className="hidden shrink-0 items-center gap-3 lg:flex xl:gap-5.5 text-[13px] font-medium">
                {navItems.map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    className={`nav-link transition-colors ${
                      bgMode === "matrix-light"
                        ? "text-black/70 hover:text-black"
                        : "text-white/70 hover:text-white"
                    } ${location.pathname === item.to ? (bgMode === "matrix-light" ? "!text-black font-semibold" : "!text-white font-semibold") : ""}`}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>

              {/* Right side container */}
              <div className="flex shrink-0 items-center gap-2 sm:gap-2.5">
                {/* Background Animation Mode Switcher (Icon-only, matching Get In Touch height) */}
                <button
                  type="button"
                  onClick={() =>
                    setBgMode((prev) =>
                      prev === "matrix-light"
                        ? "matrix-dark"
                        : prev === "matrix-dark"
                          ? "video"
                          : "matrix-light"
                    )
                  }
                  aria-label={`Toggle background mode (current: ${bgMode})`}
                  title={
                    bgMode === "matrix-light"
                      ? "Current: Matrix Light (Click for Matrix Dark)"
                      : bgMode === "matrix-dark"
                        ? "Current: Matrix Dark (Click for Video BG)"
                        : "Current: Video BG (Click for Matrix Light)"
                  }
                  className="flex items-center justify-center cursor-pointer transition-transform duration-200 active:scale-95"
                >
                  <Glass
                    style={{
                      background: bgMode === "matrix-light" ? "rgba(0, 0, 0, 0.05)" : "rgba(255, 255, 255, 0.08)",
                      borderRadius: 9999,
                      border: bgMode === "matrix-light" ? "1px solid rgba(0, 0, 0, 0.12)" : "1px solid rgba(255, 255, 255, 0.14)",
                      padding: 0,
                      width: 33,
                      height: 33,
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: bgMode === "matrix-light" ? "#0d0d0d" : "#ffffff",
                    }}
                  >
                    {bgMode === "matrix-light" ? (
                      <Sun size={15} className="text-[#0d0d0d] transition-transform duration-300 hover:rotate-45" />
                    ) : bgMode === "matrix-dark" ? (
                      <Moon size={15} className="text-[#dd5b00] transition-transform duration-300 hover:-rotate-12" />
                    ) : (
                      <Video size={15} className="text-white/90 transition-transform duration-300 hover:scale-110" />
                    )}
                  </Glass>
                </button>

                <div className="hidden items-center lg:flex">
                  <Link to="/contact" className="flex items-center">
                    <Glass
                      style={{
                        background: bgMode === "matrix-light" ? "rgba(0, 0, 0, 0.05)" : "rgba(255, 255, 255, 0.08)",
                        borderRadius: 9999,
                        border: bgMode === "matrix-light" ? "1px solid rgba(0, 0, 0, 0.12)" : "1px solid rgba(255, 255, 255, 0.14)",
                        padding: "6px 14px",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 6,
                        fontSize: 13,
                        fontWeight: 500,
                        lineHeight: 1,
                        color: bgMode === "matrix-light" ? "#0d0d0d" : "#ffffff",
                      }}
                    >
                      <Mail size={15} className="shrink-0" />
                      <span>Get In Touch</span>
                    </Glass>
                  </Link>
                </div>

                <button
                  type="button"
                  aria-label={menuOpen ? "Close navigation" : "Open navigation"}
                  className="glass-icon-button h-8.5 w-8.5 shrink-0 flex items-center justify-center lg:hidden"
                  onClick={() => setMenuOpen((current) => !current)}
                >
                  {menuOpen ? <X size={16} /> : <Menu size={16} />}
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
                    background: bgMode === "matrix-light" ? "rgba(255, 255, 255, 0.95)" : "rgba(10, 10, 15, 0.7)",
                    borderRadius: 28,
                    border: bgMode === "matrix-light" ? "1px solid rgba(0, 0, 0, 0.12)" : "1px solid rgba(255, 255, 255, 0.12)",
                    marginTop: 12,
                    padding: 16,
                  }}
                >
                  <div className="flex flex-col gap-2">
                    {navItems.map((item) => (
                      <Link
                        key={item.to}
                        to={item.to}
                        className={`rounded-2xl px-4 py-3 text-sm transition ${
                          bgMode === "matrix-light"
                            ? "text-black/80 hover:bg-black/6 hover:text-black"
                            : "text-white/76 hover:bg-white/6 hover:text-white"
                        }`}
                        onClick={() => setMenuOpen(false)}
                      >
                        {item.label}
                      </Link>
                    ))}
                    <Link
                      to="/contact"
                      className={`rounded-2xl px-4 py-3 text-sm transition ${
                        bgMode === "matrix-light"
                          ? "text-black/80 hover:bg-black/6 hover:text-black"
                          : "text-white/76 hover:bg-white/6 hover:text-white"
                      }`}
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
          <Route path="/about" element={<SectionPage><AboutSection /></SectionPage>} />
          <Route path="/experience" element={<SectionPage><ExperienceSection /></SectionPage>} />
          <Route path="/education" element={<SectionPage><EducationSection /></SectionPage>} />
          <Route path="/skills" element={<SectionPage><SkillsSection /></SectionPage>} />
          <Route path="/projects" element={<SectionPage><ProjectsSection /></SectionPage>} />
          <Route path="/achievements" element={<SectionPage><AchievementsSection /></SectionPage>} />
          <Route path="/works" element={<SectionPage><WorksPage /></SectionPage>} />
          <Route path="/blog" element={<SectionPage><BlogPage /></SectionPage>} />
          <Route path="/contact" element={<SectionPage><ContactSection /></SectionPage>} />
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
