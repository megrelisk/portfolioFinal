"use client";

import { motion, useTransform, type MotionValue } from "framer-motion";

interface Props {
  scrollYProgress: MotionValue<number>;
}

export default function TimelineProgressLine({ scrollYProgress }: Props) {
  const dotY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div className="pointer-events-none absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 md:block">
      <div className="absolute inset-0 w-px bg-white/5" />
      <motion.div
        style={{ scaleY: scrollYProgress, transformOrigin: "top" }}
        className="absolute inset-0 w-px"
      >
        <div
          className="h-full w-full"
          style={{
            background:
              "linear-gradient(180deg, rgba(0,229,255,0.0) 0%, #00E5FF 30%, #00E5FF 100%)",
            boxShadow: "0 0 12px #00E5FF, 0 0 24px rgba(0,229,255,0.4)",
          }}
        />
      </motion.div>
      <motion.div
        style={{ top: dotY }}
        className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2"
      >
        <span className="block h-3 w-3 animate-pulse-glow rounded-full bg-cyan-400" />
      </motion.div>
    </div>
  );
}
