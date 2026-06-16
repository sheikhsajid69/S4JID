import { useEffect, useRef } from "react";

/** Particle representing a single pixel from the rendered text */
interface Particle {
  x: number;
  y: number;
  originX: number;
  originY: number;
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
      buildParticles();
    }

    function buildParticles() {
      particles = [];

      // Render text to offscreen canvas to sample pixels
      const offscreen = document.createElement("canvas");
      const offCtx = offscreen.getContext("2d");
      if (!offCtx) return;

      const fontSize = Math.min(width * 0.085, 90);
      offscreen.width = width;
      offscreen.height = height;

      offCtx.fillStyle = "#ffffff";
      offCtx.font = `700 ${fontSize}px "Inter", sans-serif`;
      offCtx.textAlign = "center";
      offCtx.textBaseline = "middle";
      offCtx.fillText(TEXT, width / 2, height / 2);

      const imageData = offCtx.getImageData(0, 0, width, height);
      const data = imageData.data;

      // Sample every Nth pixel to create particles
      const gap = Math.max(3, Math.round(4 * (900 / width)));

      for (let y = 0; y < height; y += gap) {
        for (let x = 0; x < width; x += gap) {
          const i = (y * width + x) * 4;
          if (data[i + 3] > 128) {
            const angle = Math.random() * Math.PI * 2;
            const dist = Math.random() * Math.max(width, height) * 0.6 + 100;

            particles.push({
              x: centerX + Math.cos(angle) * dist,
              y: centerY + Math.sin(angle) * dist,
              originX: x,
              originY: y,
              vx: 0,
              vy: 0,
              size: PARTICLE_SIZE + Math.random() * 0.6,
              color: `rgba(221, 91, 0, ${0.5 + Math.random() * 0.5})`,
              alpha: 0,
              phase: "form",
              timer: 0,
              angle: 0,
              dist: 0,
            });
          }
        }
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

      // Draw particles
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
