"use client";

import React, { useEffect, useState } from "react";
import { useTranslations } from "./I18nProvider";
import { timelineEvents } from "../lib/timeline-data";

export default function DotNavigation() {
  const dict = useTranslations().dict as any;
  
  // Combine static sections and dynamic timeline events
  const sections = [
    { id: "hero", label: dict.nav?.labels?.hero || "Intro" },
    { id: "skills", label: dict.nav?.labels?.skills || "Skills" },
    ...timelineEvents.map((event) => ({
      id: event.id,
      label: event.year,
    })),
    { id: "contact", label: dict.nav?.labels?.contact || "Contact" },
  ];

  const [active, setActive] = useState<string>("hero");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      { threshold: 0.3 }
    );

    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [sections]);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      window.scrollTo({
        top: el.offsetTop,
        behavior: "smooth",
      });
    }
  };

  return (
    <nav
      aria-label={dict.nav?.ariaLabel || "Section navigation"}
      className="fixed right-8 top-1/2 z-40 hidden -translate-y-1/2 flex-col gap-4 md:flex"
    >
      {sections.map((s) => {
        const isActive = active === s.id;
        return (
          <a
            key={s.id}
            href={`#${s.id}`}
            onClick={(e: React.MouseEvent<HTMLAnchorElement>) => handleClick(e, s.id)}
            aria-label={dict.nav?.goTo?.replace("{label}", s.label) || `Go to ${s.label}`}
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
