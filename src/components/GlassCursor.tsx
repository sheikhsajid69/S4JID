import { useEffect, useState } from "react";
import { Glass } from "@samasante/liquid-glass";

/**
 * A liquid-glass cursor that follows the pointer on desktop.
 * Automatically hidden on touch devices.
 */
export default function GlassCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Only show on pointer (non-touch) devices
    const mq = window.matchMedia("(pointer: fine)");
    if (!mq.matches) return;

    setVisible(true);

    const onMove = (e: PointerEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
    };

    const onLeave = () => setPos({ x: -100, y: -100 });

    window.addEventListener("pointermove", onMove);
    document.addEventListener("pointerleave", onLeave);

    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[9999]"
      style={{ cursor: "none" }}
    >
      <Glass
        style={{
          position: "absolute",
          left: pos.x - 18,
          top: pos.y - 18,
          width: 36,
          height: 36,
          borderRadius: "50%",
          background: "rgba(124, 92, 252, 0.12)",
          border: "1px solid rgba(255, 255, 255, 0.15)",
          transition: "left 0.08s ease-out, top 0.08s ease-out",
          pointerEvents: "none",
        }}
      />
    </div>
  );
}
