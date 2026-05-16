"use client";

import { useEffect, useState } from "react";

const sections = [
  { id: "hero", label: "Intro" },
  { id: "2025", label: "2025" },
  { id: "2024", label: "2024" },
  { id: "2023", label: "2023" },
  { id: "2021", label: "2021" },
  { id: "2020", label: "2020" },
];

export default function DotNavigation() {
  const [active, setActive] = useState<string>("hero");

  useEffect(() => {
    const elements = sections
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    const updateActive = () => {
      const viewportCenter = window.innerHeight / 2;
      let bestId = elements[0].id;
      let bestDist = Infinity;
      for (const el of elements) {
        const rect = el.getBoundingClientRect();
        const center = rect.top + rect.height / 2;
        const dist = Math.abs(center - viewportCenter);
        if (dist < bestDist) {
          bestDist = dist;
          bestId = el.id;
        }
      }
      setActive(bestId);
    };

    updateActive();
    window.addEventListener("scroll", updateActive, { passive: true });
    window.addEventListener("resize", updateActive);

    return () => {
      window.removeEventListener("scroll", updateActive);
      window.removeEventListener("resize", updateActive);
    };
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    window.scrollTo({ top: el?.offsetTop ?? 0, behavior: "smooth" });
  };

  return (
    <nav
      aria-label="Section navigation"
      className="fixed right-8 top-1/2 z-40 hidden -translate-y-1/2 flex-col gap-4 md:flex"
    >
      {sections.map((s) => {
        const isActive = active === s.id;
        return (
          <a
            key={s.id}
            href={`#${s.id}`}
            onClick={(e) => handleClick(e, s.id)}
            aria-label={`Go to ${s.label}`}
            className={
              isActive
                ? "h-8 w-2 rounded-full bg-cyan-400 shadow-cyan-dot transition-all duration-300"
                : "h-2 w-2 rounded-full bg-white/20 transition-all duration-300 hover:bg-white/50"
            }
          />
        );
      })}
    </nav>
  );
}
