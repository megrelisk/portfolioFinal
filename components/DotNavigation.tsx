"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "./I18nProvider";

const SECTION_IDS = ["hero", "2025", "2024", "2023", "2021", "2020"] as const;
type SectionId = (typeof SECTION_IDS)[number];

export default function DotNavigation() {
  const { dict } = useTranslations();
  const [active, setActive] = useState<SectionId>("hero");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id as SectionId);
          }
        });
      },
      { threshold: 0.5 }
    );

    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: SectionId) => {
    e.preventDefault();
    const el = document.getElementById(id);
    window.scrollTo({ top: el?.offsetTop ?? 0, behavior: "smooth" });
  };

  return (
    <nav
      aria-label={dict.nav.ariaLabel}
      className="fixed right-8 top-1/2 z-40 hidden -translate-y-1/2 flex-col gap-4 md:flex"
    >
      {SECTION_IDS.map((id) => {
        const isActive = active === id;
        const label = dict.nav.labels[id];
        return (
          <a
            key={id}
            href={`#${id}`}
            onClick={(e) => handleClick(e, id)}
            aria-label={dict.nav.goTo.replace("{label}", label)}
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
