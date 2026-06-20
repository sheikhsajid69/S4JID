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
const EVENT_HORIZON = 8;

/** Fixed offscreen canvas dimensions for text sampling — keeps memory low */
const SAMPLE_W = 600;
const SAMPLE_H = 150;

export default function BlackHole() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);

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

    // ── Sample text pixels ONCE using a small fixed-size canvas ──
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

      // Clean up reference so GC can reclaim the canvas backing store
      offscreen.width = 0;
      offscreen.height = 0;

      return points;
    }

    // Sample once
    const textSamples = sampleTextPixels();

    function buildParticles() {
      const spread = Math.min(width * 0.85, 900);

      particles = textSamples.map((sample) => {
        const originX = centerX + sample.relX * spread;
        const originY = centerY + sample.relY * spread * (SAMPLE_H / SAMPLE_W);

        const angle = Math.random() * Math.PI * 2;
        const dist = Math.random() * Math.max(width, height) * 0.6 + 100;

        return {
          x: centerX + Math.cos(angle) * dist,
          y: centerY + Math.sin(angle) * dist,
          originX,
          originY,
          relX: sample.relX,
          relY: sample.relY,
          vx: 0,
          vy: 0,
          size: PARTICLE_SIZE + Math.random() * 0.6,
          color: `rgba(221, 91, 0, ${0.5 + Math.random() * 0.5})`,
          alpha: 0,
          phase: "form" as const,
          timer: 0,
          angle: 0,
          dist: 0,
        };
      });
    }

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const parent = canvas!.parentElement;
      width = parent?.clientWidth || window.innerWidth;
      height = parent?.clientHeight || window.innerHeight;
      canvas!.width = width * dpr;
      canvas!.height = height * dpr;
      canvas!.style.width = `${width}px`;
      canvas!.style.height = `${height}px`;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      centerX = width / 2;
      centerY = height / 2;

      // Recalculate origins from relative positions — no getImageData needed
      const spread = Math.min(width * 0.85, 900);
      if (particles.length > 0) {
        for (const p of particles) {
          p.originX = centerX + p.relX * spread;
          p.originY = centerY + p.relY * spread * (SAMPLE_H / SAMPLE_W);
        }
      } else {
        buildParticles();
      }
    }

    function update() {
      for (const p of particles) {
        switch (p.phase) {
          case "form": {
            // Lerp toward origin position
            const dx = p.originX - p.x;
            const dy = p.originY - p.y;
            p.x += dx * FORM_SPEED;
            p.y += dy * FORM_SPEED;
            p.alpha = Math.min(p.alpha + 0.025, 1);

            // Check if close enough to origin
            if (Math.abs(dx) < 1 && Math.abs(dy) < 1) {
              p.x = p.originX;
              p.y = p.originY;
              p.phase = "hold";
              p.timer = 0;
            }
            break;
          }

          case "hold": {
            p.timer++;
            // Slight shimmer
            p.alpha = 0.8 + Math.sin(p.timer * 0.08) * 0.2;
            if (p.timer >= HOLD_DURATION) {
              p.phase = "collapse";
              p.vx = (Math.random() - 0.5) * 0.5;
              p.vy = (Math.random() - 0.5) * 0.5;
            }
            break;
          }

          case "collapse": {
            // Gravitational pull toward center
            const dx = centerX - p.x;
            const dy = centerY - p.y;
            const distSq = dx * dx + dy * dy;
            const dist = Math.sqrt(distSq);

            if (dist < EVENT_HORIZON) {
              p.phase = "reset";
              p.timer = 0;
              break;
            }

            // Gravity scales with 1/dist (not 1/dist² for visual effect)
            const force = COLLAPSE_FORCE * Math.max(width, 600);
            const ax = (dx / dist) * (force / Math.max(dist, 1));
            const ay = (dy / dist) * (force / Math.max(dist, 1));

            // Add tangential component for spiral effect
            const tangentX = -dy / dist;
            const tangentY = dx / dist;
            const spiralStrength = 0.3;

            p.vx += ax + tangentX * spiralStrength * (force / Math.max(dist, 1)) * 0.3;
            p.vy += ay + tangentY * spiralStrength * (force / Math.max(dist, 1)) * 0.3;
            p.vx *= FRICTION;
            p.vy *= FRICTION;
            p.x += p.vx;
            p.y += p.vy;

            // Fade as it approaches center
            p.alpha = Math.min(1, dist / 100);
            break;
          }

          case "reset": {
            p.timer++;
            if (p.timer > 20) {
              // Respawn at random edge position
              const angle = Math.random() * Math.PI * 2;
              const respawnDist = Math.random() * Math.max(width, height) * 0.5 + 200;
              p.x = centerX + Math.cos(angle) * respawnDist;
              p.y = centerY + Math.sin(angle) * respawnDist;
              p.vx = 0;
              p.vy = 0;
              p.alpha = 0;
              p.phase = "form";
            }
            break;
          }
        }
      }
    }

    function drawBlackHole() {
      // Dark center
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

      // Subtle orange rim glow
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

      // Draw particles — batch by color to reduce state changes
      for (const p of particles) {
        if (p.alpha <= 0.01) continue;
        ctx!.globalAlpha = p.alpha;
        ctx!.fillStyle = p.color;
        ctx!.fillRect(p.x, p.y, p.size, p.size);
      }

      ctx!.globalAlpha = 1;
    }

    function loop() {
      update();
      render();
      rafRef.current = requestAnimationFrame(loop);
    }

    resize();
    loop();

    window.addEventListener("resize", resize);
    return () => {
      window.removeEventListener("resize", resize);
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
