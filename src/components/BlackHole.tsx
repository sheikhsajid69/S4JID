import { useEffect, useRef } from "react";

/** Particle representing a single pixel from the rendered text */
interface Particle {
  x: number;
  y: number;
  originX: number;
  originY: number;
  /** Relative position (0-1) within the text sample — set once on mount */
  relX: number;
  relY: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  alpha: number;
  phase: "form" | "hold" | "collapse" | "reset";
  timer: number;
  angle: number;
  dist: number;
}

const TEXT = "CODE / COFFEE";
const PARTICLE_SIZE = 1.8;
const FORM_SPEED = 0.04;
const HOLD_DURATION = 180; // frames
const COLLAPSE_FORCE = 0.0008;
const FRICTION = 0.985;

/** Fixed offscreen canvas dimensions for text sampling — keeps memory low */
const SAMPLE_W = 600;
const SAMPLE_H = 150;

export default function BlackHole() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const isVisibleRef = useRef<boolean>(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let centerX = 0;
    let centerY = 0;
    let particles: Particle[] = [];

    // Sample text pixels ONCE using a small fixed-size canvas
    function sampleTextPixels(): { relX: number; relY: number }[] {
      const offscreen = document.createElement("canvas");
      offscreen.width = SAMPLE_W;
      offscreen.height = SAMPLE_H;
      const offCtx = offscreen.getContext("2d");
      if (!offCtx) return [];

      const fontSize = 52;
      offCtx.fillStyle = "#ffffff";
      offCtx.font = `700 ${fontSize}px "Inter", sans-serif`;
      offCtx.textAlign = "center";
      offCtx.textBaseline = "middle";
      offCtx.fillText(TEXT, SAMPLE_W / 2, SAMPLE_H / 2);

      const imageData = offCtx.getImageData(0, 0, SAMPLE_W, SAMPLE_H);
      const data = imageData.data;
      const gap = 3;
      const points: { relX: number; relY: number }[] = [];

      for (let y = 0; y < SAMPLE_H; y += gap) {
        for (let x = 0; x < SAMPLE_W; x += gap) {
          const i = (y * SAMPLE_W + x) * 4;
          if (data[i + 3] > 128) {
            points.push({
              relX: (x - SAMPLE_W / 2) / SAMPLE_W,
              relY: (y - SAMPLE_H / 2) / SAMPLE_H,
            });
          }
        }
      }

      offscreen.width = 0;
      offscreen.height = 0;

      return points;
    }

    const textSamples = sampleTextPixels();

    function buildParticles() {
      const spread = Math.min(width * 0.85, 900);

      particles = textSamples.map((sample) => {
        const originX = centerX + sample.relX * spread;
        const originY = centerY + sample.relY * spread * (SAMPLE_H / SAMPLE_W);

        const angle = Math.random() * Math.PI * 2;
        const startDist = 300 + Math.random() * 400;

        const isAmber = Math.random() > 0.45;
        const color = isAmber
          ? `rgba(221, ${91 + Math.floor(Math.random() * 40)}, 0, `
          : `rgba(124, ${92 + Math.floor(Math.random() * 40)}, 252, `;

        return {
          x: centerX + Math.cos(angle) * startDist,
          y: centerY + Math.sin(angle) * startDist,
          originX,
          originY,
          relX: sample.relX,
          relY: sample.relY,
          vx: 0,
          vy: 0,
          size: PARTICLE_SIZE + (Math.random() - 0.5) * 0.6,
          color,
          alpha: 0,
          phase: "form",
          timer: Math.floor(Math.random() * 40),
          angle,
          dist: startDist,
        };
      });
    }

    function resize() {
      if (!canvas) return;
      width = canvas.offsetWidth;
      height = canvas.offsetHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx!.scale(dpr, dpr);
      centerX = width / 2;
      centerY = height / 2;
      buildParticles();
    }

    function update() {
      for (const p of particles) {
        if (p.phase === "form") {
          if (p.timer > 0) {
            p.timer--;
            continue;
          }

          p.x += (p.originX - p.x) * FORM_SPEED;
          p.y += (p.originY - p.y) * FORM_SPEED;

          if (p.alpha < 0.85) p.alpha += 0.03;

          const dx = p.originX - p.x;
          const dy = p.originY - p.y;
          if (dx * dx + dy * dy < 4) {
            p.x = p.originX;
            p.y = p.originY;
            p.phase = "hold";
            p.timer = HOLD_DURATION + Math.floor(Math.random() * 60);
          }
        } else if (p.phase === "hold") {
          p.timer--;
          p.x = p.originX + Math.sin(Date.now() * 0.002 + p.originX) * 0.6;
          p.y = p.originY + Math.cos(Date.now() * 0.002 + p.originY) * 0.6;

          if (p.timer <= 0) {
            p.phase = "collapse";
            const dx = p.x - centerX;
            const dy = p.y - centerY;
            const angle = Math.atan2(dy, dx);
            const tangentSpeed = 1.2 + Math.random() * 1.5;
            p.vx = -Math.sin(angle) * tangentSpeed;
            p.vy = Math.cos(angle) * tangentSpeed;
          }
        } else if (p.phase === "collapse") {
          const dx = centerX - p.x;
          const dy = centerY - p.y;
          const distSq = dx * dx + dy * dy;
          const dist = Math.sqrt(distSq);

          if (dist < 12) {
            p.phase = "reset";
            p.alpha = 0;
            p.timer = Math.floor(Math.random() * 30);
            continue;
          }

          const force = COLLAPSE_FORCE * (4000 / (dist + 20));
          p.vx += dx * force;
          p.vy += dy * force;

          p.vx *= FRICTION;
          p.vy *= FRICTION;

          p.x += p.vx;
          p.y += p.vy;

          if (dist < 80) {
            p.alpha = Math.max(0, (dist - 12) / 68);
          }
        } else if (p.phase === "reset") {
          p.timer--;
          if (p.timer <= 0) {
            const angle = Math.random() * Math.PI * 2;
            const startDist = 250 + Math.random() * 350;
            p.x = centerX + Math.cos(angle) * startDist;
            p.y = centerY + Math.sin(angle) * startDist;
            p.vx = 0;
            p.vy = 0;
            p.alpha = 0;
            p.phase = "form";
            p.timer = 0;
          }
        }
      }
    }

    function drawBlackHole() {
      const gradient = ctx!.createRadialGradient(
        centerX, centerY, 0,
        centerX, centerY, 60
      );
      gradient.addColorStop(0, "rgba(0, 0, 0, 0.9)");
      gradient.addColorStop(0.3, "rgba(0, 0, 0, 0.5)");
      gradient.addColorStop(0.6, "rgba(221, 91, 0, 0.04)");
      gradient.addColorStop(1, "transparent");
      ctx!.fillStyle = gradient;
      ctx!.beginPath();
      ctx!.arc(centerX, centerY, 60, 0, Math.PI * 2);
      ctx!.fill();

      const rimGlow = ctx!.createRadialGradient(
        centerX, centerY, 3,
        centerX, centerY, 25
      );
      rimGlow.addColorStop(0, "rgba(221, 91, 0, 0.15)");
      rimGlow.addColorStop(0.5, "rgba(221, 91, 0, 0.05)");
      rimGlow.addColorStop(1, "transparent");
      ctx!.fillStyle = rimGlow;
      ctx!.beginPath();
      ctx!.arc(centerX, centerY, 25, 0, Math.PI * 2);
      ctx!.fill();
    }

    function render() {
      ctx!.clearRect(0, 0, width, height);
      drawBlackHole();

      for (const p of particles) {
        if (p.alpha <= 0.01) continue;
        ctx!.globalAlpha = p.alpha;
        ctx!.fillStyle = p.color;
        ctx!.fillRect(p.x, p.y, p.size, p.size);
      }

      ctx!.globalAlpha = 1;
    }

    let isRunning = false;
    function loop() {
      if (!isVisibleRef.current || document.hidden) {
        isRunning = false;
        return;
      }
      isRunning = true;
      update();
      render();
      rafRef.current = requestAnimationFrame(loop);
    }

    function startLoop() {
      if (!isRunning) {
        isRunning = true;
        loop();
      }
    }

    // IntersectionObserver to pause loop when canvas is scrolled off-screen
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        isVisibleRef.current = entry.isIntersecting;
        if (entry.isIntersecting) {
          startLoop();
        }
      },
      { threshold: 0.05 }
    );
    observer.observe(canvas);

    const handleVisibility = () => {
      if (document.hidden) {
        isVisibleRef.current = false;
      } else {
        isVisibleRef.current = true;
        startLoop();
      }
    };
    document.addEventListener("visibilitychange", handleVisibility);

    resize();
    startLoop();

    window.addEventListener("resize", resize);
    return () => {
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", handleVisibility);
      observer.disconnect();
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 z-0"
      style={{ opacity: 0.55 }}
    />
  );
}
