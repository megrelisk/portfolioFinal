"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useTranslations } from "./I18nProvider";

function Counter({ to, suffix }: { to: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const duration = 1400;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setCount(Math.round(eased * to));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

export default function StatsBar() {
  const { dict } = useTranslations();

  const stats = [
    { value: 8, suffix: "+", label: dict.stats.experience },
    { value: 10, suffix: "+", label: dict.stats.industries },
    { value: 100, suffix: "%", label: dict.stats.roles },
    { value: 1, suffix: "", label: dict.stats.companies },
  ];

  return (
    <div className="grid grid-cols-2 gap-6 py-8 md:grid-cols-4">
      {stats.map((s, i) => (
        <motion.div
          key={s.label}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center text-center"
        >
          <span className="text-3xl font-black text-cyan-400 sm:text-4xl">
            <Counter to={s.value} suffix={s.suffix} />
          </span>
          <span className="mt-2 text-xs uppercase tracking-widest text-zinc-400">
            {s.label}
          </span>
        </motion.div>
      ))}
    </div>
  );
}
