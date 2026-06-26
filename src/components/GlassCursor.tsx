import { useEffect, useRef, useState } from "react";
import { Glass } from "@samasante/liquid-glass";

/**
 * A highly optimized, hardware-accelerated liquid-glass cursor.
 * Uses requestAnimationFrame and Lerp interpolation to prevent lag and stutter.
 * Uses pointer-events-none to prevent glitching when hovering over interactive elements.
 */
export default function GlassCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    // Only show on fine pointer (non-touch) devices
    const mq = window.matchMedia("(pointer: fine)");
    if (!mq.matches) return;

    setVisible(true);

    let mouseX = -100;
    let mouseY = -100;
    let currentX = -100;
    let currentY = -100;

    const onMove = (e: PointerEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      // Check if mouse is hovering over an interactive element
      const target = e.target as HTMLElement | null;
      if (target) {
        const isInteractable = !!(
          target.closest("a") ||
          target.closest("button") ||
          target.closest("[role='button']") ||
          target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA"
        );
        setIsHovered(isInteractable);
      }
    };

    const onLeave = () => {
      mouseX = -100;
      mouseY = -100;
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);

    let frameId: number;

    const updatePosition = () => {
      if (cursorRef.current) {
        // Smooth linear interpolation (Lerp)
        const lerpFactor = 0.15;
        currentX += (mouseX - currentX) * lerpFactor;
        currentY += (mouseY - currentY) * lerpFactor;

        // Position the 36px wide cursor so it is centered on the pointer coords
        cursorRef.current.style.transform = `translate3d(${currentX - 18}px, ${currentY - 18}px, 0)`;
      }
      frameId = requestAnimationFrame(updatePosition);
    };

    frameId = requestAnimationFrame(updatePosition);

    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      cancelAnimationFrame(frameId);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      ref={cursorRef}
      className="pointer-events-none fixed left-0 top-0 z-[9999] h-9 w-9"
      style={{
        transform: "translate3d(-100px, -100px, 0)",
        willChange: "transform",
        pointerEvents: "none",
      }}
    >
      <div
        className="pointer-events-none h-full w-full transition-transform duration-200 ease-out"
        style={{
          transform: isHovered ? "scale(1.35)" : "scale(1)",
        }}
      >
        <Glass
          style={{
            width: "100%",
            height: "100%",
            borderRadius: "50%",
            background: isHovered
              ? "rgba(124, 92, 252, 0.24)"
              : "rgba(124, 92, 252, 0.12)",
            border: isHovered
              ? "1px solid rgba(255, 255, 255, 0.35)"
              : "1px solid rgba(255, 255, 255, 0.15)",
            pointerEvents: "none",
            transition: "background 0.2s ease, border 0.2s ease",
          }}
        />
      </div>
    </div>
  );
}
