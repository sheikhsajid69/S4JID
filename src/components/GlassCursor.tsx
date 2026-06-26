import { useEffect, useRef, useState } from "react";
import { Glass } from "@samasante/liquid-glass";

/**
 * A highly optimized, hardware-accelerated liquid-glass cursor.
 * Maps 1-to-1 with the system pointer coordinates instantly (cursor-to-cursor)
 * without any interpolation lag, and scales smoothly on interactive hovers.
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

    const onMove = (e: PointerEvent) => {
      if (cursorRef.current) {
        // Position the 36px wide cursor so it is centered on the pointer coordinates instantly
        cursorRef.current.style.transform = `translate3d(${e.clientX - 18}px, ${e.clientY - 18}px, 0)`;
      }

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
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(-100px, -100px, 0)`;
      }
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);

    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
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
