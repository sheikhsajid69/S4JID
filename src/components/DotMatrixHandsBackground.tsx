import { useEffect, useRef } from "react";

export interface DotMatrixHandsProps {
  theme?: "light" | "dark";
  className?: string;
}

export default function DotMatrixHandsBackground({
  theme = "dark",
  className = "",
}: DotMatrixHandsProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const ASSET_URL =
      "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261030_025250_100df7b8-31fd-4614-aa4a-c1b7d5b6b273.png&w=1600&q=85";
    const LOCAL_FALLBACK = "/hands-spritesheet.webp";

    // Fractional slice rects on source sheet (2688x1520 aspect)
    const RECTS = {
      LA: [0, 0.06, 0.47, 0.4],
      RA: [0.53, 0.06, 0.47, 0.4],
      LB: [0, 0.55, 0.47, 0.4],
      RB: [0.53, 0.55, 0.47, 0.4],
    };

    const TILE_W = 420;
    const TILE_H = Math.round((TILE_W * (0.4 * 1520)) / (0.47 * 2688)); // ~202px

    let tiles: {
      LA: HTMLCanvasElement;
      RA: HTMLCanvasElement;
      LB: HTMLCanvasElement;
      RB: HTMLCanvasElement;
    } | null = null;

    let W = window.innerWidth;
    let H = window.innerHeight;
    let DPR = Math.min(2, window.devicePixelRatio || 1);

    let step = 0;
    let rowStep = 0;
    let cols = 0;
    let rows = 0;
    let R = 0;
    let seedGrid: Float32Array | null = null;

    // Offscreen field canvases for reading luminance
    const fA = document.createElement("canvas");
    const ctxA = fA.getContext("2d", { willReadFrequently: true });
    const fB = document.createElement("canvas");
    const ctxB = fB.getContext("2d", { willReadFrequently: true });

    function fract(x: number) {
      return x - Math.floor(x);
    }

    function hash(a: number, b: number) {
      return fract(Math.sin(a * 127.1 + b * 311.7) * 43758.5453);
    }

    function smooth(a: number, b: number, x: number) {
      const v = Math.max(0, Math.min(1, (x - a) / (b - a)));
      return v * v * (3 - 2 * v);
    }

    function mixAt(t: number, on: number, off: number, dur: number) {
      return smooth(on, on + dur, t) * (1 - smooth(off, off + dur, t));
    }

    function clamp(x: number, min: number, max: number) {
      return Math.max(min, Math.min(max, x));
    }

    function resize() {
      W = window.innerWidth;
      H = window.innerHeight;
      DPR = Math.min(2, window.devicePixelRatio || 1);

      if (!canvas || !ctx) return;
      canvas.width = Math.floor(W * DPR);
      canvas.height = Math.floor(H * DPR);
      canvas.style.width = `${W}px`;
      canvas.style.height = `${H}px`;
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);

      step = Math.max(5, W / 205);
      rowStep = step * 2.05;
      cols = Math.ceil(W / step);
      rows = Math.ceil(H / rowStep);
      R = step * 0.46;

      fA.width = cols;
      fA.height = rows;
      fB.width = cols;
      fB.height = rows;

      seedGrid = new Float32Array(cols * rows);
      for (let j = 0; j < rows; j++) {
        for (let i = 0; i < cols; i++) {
          seedGrid[j * cols + i] = 0.55 * hash(i, j) + 0.45 * hash(j * 3.1, 7.7);
        }
      }
    }

    function createTile(img: HTMLImageElement, rect: number[]) {
      const c = document.createElement("canvas");
      c.width = TILE_W;
      c.height = TILE_H;
      const cctx = c.getContext("2d");
      if (!cctx) return c;
      cctx.imageSmoothingQuality = "high";

      const sx = rect[0] * img.naturalWidth;
      const sy = rect[1] * img.naturalHeight;
      const sw = rect[2] * img.naturalWidth;
      const sh = rect[3] * img.naturalHeight;

      cctx.drawImage(img, sx, sy, sw, sh, 0, 0, TILE_W, TILE_H);
      return c;
    }

    function initAsset() {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => {
        tiles = {
          LA: createTile(img, RECTS.LA),
          RA: createTile(img, RECTS.RA),
          LB: createTile(img, RECTS.LB),
          RB: createTile(img, RECTS.RB),
        };
      };
      img.onerror = () => {
        // Fallback to local asset
        const localImg = new Image();
        localImg.onload = () => {
          tiles = {
            LA: createTile(localImg, RECTS.LA),
            RA: createTile(localImg, RECTS.RA),
            LB: createTile(localImg, RECTS.LB),
            RB: createTile(localImg, RECTS.RB),
          };
        };
        localImg.src = LOCAL_FALLBACK;
      };
      img.src = ASSET_URL;
    }

    resize();
    initAsset();

    window.addEventListener("resize", resize);

    const LOOP = 20;

    function render(timeSec: number) {
      if (!tiles || cols === 0 || rows === 0 || !ctx || !ctxA || !ctxB || !seedGrid) return;

      const t = ((timeSec % LOOP) + LOOP) % LOOP;
      const a = (2 * Math.PI * t) / LOOP;

      const isPortrait = H > W;
      const hw = W * (isPortrait ? 0.66 : 0.53);
      const hh = (hw * (0.4 * 1520)) / (0.47 * 2688);
      const cy = H * (isPortrait ? 0.66 : 0.54);

      // Kinematics Left (ph = 0)
      const reachL = (0.035 * Math.sin(a) + 0.012 * Math.sin(2 * a + 1.3)) * W;
      const scaleL = 1 + 0.07 * Math.sin(a + 0.9);
      const rotL = 0.045 * Math.sin(a + 2.1);
      const xL = reachL - W * 0.045;

      // Kinematics Right (ph = Math.PI)
      const aR = a + Math.PI;
      const reachR = (0.035 * Math.sin(aR) + 0.012 * Math.sin(2 * aR + 1.3)) * W;
      const scaleR = 1 + 0.07 * Math.sin(aR + 0.9);
      const rotR = -0.045 * Math.sin(aR + 2.1);
      const xR = W - hw + W * 0.045 - reachR;

      // 1. Offscreen luminance field rendering
      ctxA.fillStyle = "#ffffff";
      ctxA.fillRect(0, 0, cols, rows);
      ctxB.fillStyle = "#ffffff";
      ctxB.fillRect(0, 0, cols, rows);

      function drawHandToField(
        fCtx: CanvasRenderingContext2D,
        tile: HTMLCanvasElement,
        left: boolean,
        x: number,
        cyPos: number,
        handW: number,
        handH: number,
        rotation: number,
        scaleFactor: number
      ) {
        fCtx.save();
        fCtx.scale(cols / W, rows / H);
        const pivotX = left ? 0 : W;
        const pivotY = cyPos;
        fCtx.translate(pivotX, pivotY);
        fCtx.rotate(rotation);
        fCtx.scale(scaleFactor, scaleFactor);
        fCtx.translate(-pivotX, -pivotY);
        fCtx.drawImage(tile, x, cyPos - handH * 0.5, handW, handH);
        fCtx.restore();
      }

      // fA: Pointing Hands (LA, RA)
      drawHandToField(ctxA, tiles.LA, true, xL, cy, hw, hh, rotL, scaleL);
      drawHandToField(ctxA, tiles.RA, false, xR, cy, hw, hh, rotR, scaleR);

      // fB: Open Hands (LB, RB)
      drawHandToField(ctxB, tiles.LB, true, xL, cy, hw, hh, rotL, scaleL);
      drawHandToField(ctxB, tiles.RB, false, xR, cy, hw, hh, rotR, scaleR);

      const imgDataA = ctxA.getImageData(0, 0, cols, rows).data;
      const imgDataB = ctxB.getImageData(0, 0, cols, rows).data;

      // 2. Clear canvas with themed background
      const isLight = theme === "light";
      ctx.fillStyle = isLight ? "#f7f7f5" : "#0a0a0f";
      ctx.fillRect(0, 0, W, H);

      const mL = mixAt(t, 6.2, 14.6, 1.6);
      const mR = mixAt(t, 2.4, 10.4, 1.6);
      const tick = Math.floor(t * 7);
      const halfCols = cols / 2;

      // 3. Batched Halftone Dot Rasterization
      ctx.fillStyle = isLight ? "#0d0d0d" : "#f0f0f5";
      ctx.beginPath();

      for (let j = 0; j < rows; j++) {
        const rowOffset = j * cols;
        let colShift = 0;
        if (hash(j, tick) > 0.965) {
          colShift = Math.round((hash(tick, j) - 0.5) * 8);
        }

        const dotY = (j + 0.5) * rowStep;
        const quietCenterY = isPortrait ? 0.36 : 0.39;
        const quietRadiusY = isPortrait ? 0.19 : 0.17;
        const ey = (dotY / H - quietCenterY) / quietRadiusY;

        for (let i = 0; i < cols; i++) {
          const m = i < halfCols ? mL : mR;
          const seed = seedGrid[rowOffset + i];

          const sampleCol = clamp(i + colShift, 0, cols - 1);
          const idx = (rowOffset + sampleCol) * 4;

          const red = seed < m ? imgDataB[idx] : imgDataA[idx];
          const lum = red / 255;
          let v = clamp((1 - lum - 0.16) / 0.42, 0, 1);

          // Dissolve Front Flicker
          if (m > 0.001 && m < 0.999 && Math.abs(seed - m) < 0.12) {
            v *= Math.abs(seed - m) / 0.12;
            if (hash(i + tick, j) <= 0.4) {
              v *= 0.3;
            }
          }

          // Shimmer modulation
          v *= 0.86 + 0.14 * Math.sin(t * 3.2 + seed * 40);

          // Center gap fade
          const cx = Math.abs((i + 0.5) / cols - 0.5);
          v *= smooth(0.035, 0.11, cx);

          // Center quiet zone
          const quietRadiusX = isPortrait ? 0.48 : 0.32;
          const ex = cx / quietRadiusX;
          v *= smooth(0.8, 1.3, Math.hypot(ex, ey));

          // Quantization levels: [0, 0.26, 0.52, 0.78, 1]
          let level = 0;
          if (v >= 0.87) {
            level = 1;
          } else if (v >= 0.65) {
            level = 0.78;
          } else if (v >= 0.39) {
            level = 0.52;
          } else if (v >= 0.13) {
            level = 0.26;
          }

          if (level > 0) {
            const radius = R * (level === 0.26 ? 0.38 : level);
            const dotX = (i + 0.5) * step;
            ctx.moveTo(dotX + radius, dotY);
            ctx.arc(dotX, dotY, radius, 0, Math.PI * 2);
          }
        }
      }

      ctx.fill();
    }

    // Expose render function
    (window as unknown as { __render?: typeof render }).__render = render;

    let animId: number | null = null;
    let startTime: number | null = null;
    let isPaused = false;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let isReducedMotion = prefersReducedMotion.matches;

    function loop(timestamp: number) {
      if (!startTime) startTime = timestamp;
      if (!isPaused && !isReducedMotion) {
        const elapsedSec = (timestamp - startTime) * 0.001;
        render(elapsedSec);
      }
      if (!isReducedMotion) {
        animId = requestAnimationFrame(loop);
      }
    }

    if (isReducedMotion) {
      render(0);
    } else {
      animId = requestAnimationFrame(loop);
    }

    const handleVisibility = () => {
      isPaused = document.hidden;
    };
    document.addEventListener("visibilitychange", handleVisibility);

    const handleMotionChange = (e: MediaQueryListEvent) => {
      isReducedMotion = e.matches;
      if (isReducedMotion) {
        if (animId !== null) cancelAnimationFrame(animId);
        render(0);
      } else {
        startTime = null;
        animId = requestAnimationFrame(loop);
      }
    };
    prefersReducedMotion.addEventListener("change", handleMotionChange);

    return () => {
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", handleVisibility);
      prefersReducedMotion.removeEventListener("change", handleMotionChange);
      if (animId !== null) {
        cancelAnimationFrame(animId);
      }
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none fixed inset-0 z-0 ${className}`}
      style={{
        width: "100%",
        height: "100%",
        display: "block",
      }}
    />
  );
}
