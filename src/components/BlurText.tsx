import { motion, useInView } from "framer-motion";
import { useMemo, useRef } from "react";

type BlurTextProps = {
  text: string;
  className?: string;
  delay?: number;
  wordDelay?: number;
  segment?: "words" | "chars";
  forceAnimate?: boolean;
};

export function BlurText({
  text,
  className = "",
  delay = 0,
  wordDelay = 0.08,
  segment = "words",
  forceAnimate = false,
}: BlurTextProps) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" });
  const units = useMemo(() => {
    return segment === "chars" ? Array.from(text) : text.split(" ");
  }, [segment, text]);
  const shouldAnimate = forceAnimate || isInView;

  return (
    <span ref={ref} className={className}>
      {units.map((unit, index) => (
        <motion.span
          key={`${unit}-${index}`}
          className="inline-block will-change-transform"
          initial={{ opacity: 0, y: 32, filter: "blur(14px)" }}
          animate={
            shouldAnimate
              ? { opacity: 1, y: 0, filter: "blur(0px)" }
              : { opacity: 0, y: 32, filter: "blur(14px)" }
          }
          transition={{
            duration: 0.7,
            ease: [0.23, 1, 0.32, 1],
            delay: delay + index * wordDelay,
          }}
        >
          {unit === " " ? "\u00A0" : unit}
          {segment === "words" && index < units.length - 1 ? "\u00A0" : ""}
        </motion.span>
      ))}
    </span>
  );
}
