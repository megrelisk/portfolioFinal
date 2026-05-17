"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  MotionValue,
} from "framer-motion";
import { useLenis } from "@studio-freight/react-lenis";
import { timelineEvents, type TimelineEvent } from "@/lib/timeline-data";
import { useTranslations } from "./I18nProvider";
import type { Dictionary } from "@/lib/i18n/config";

type EventCopy = Dictionary["timeline"]["events"][keyof Dictionary["timeline"]["events"]];

/* ─────────────────────────────────────────────────────────────
   SCROLL-DRIVEN CARD
   Each card measures its own position relative to the viewport
   center and derives scale / opacity / blur from that distance.
───────────────────────────────────────────────────────────────*/
function TimelineCard({
  event,
  copy,
  registerRef,
}: {
  event: TimelineEvent;
  copy: EventCopy;
  registerRef?: (el: HTMLDivElement | null) => void;
}) {
  const cardRef = useRef<HTMLDivElement | null>(null);

  const setRefs = (el: HTMLDivElement | null) => {
    cardRef.current = el;
    registerRef?.(el);
  };

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });

  const distanceFromCenter = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0, 1]);

  const smoothDistance = useSpring(distanceFromCenter, {
    stiffness: 80,
    damping: 20,
    mass: 0.8,
  });

  const scale = useTransform(smoothDistance, [0, 1], [1.0, 0.85]);
  const opacity = useTransform(smoothDistance, [0, 1], [1.0, 0.35]);
  const blur = useTransform(smoothDistance, [0, 1], ["blur(0px)", "blur(6px)"]);
  const glowOpacity = useTransform(smoothDistance, [0, 1], [1, 0]);

  return (
    <motion.div
      ref={setRefs}
      style={{ scale, opacity, filter: blur }}
      className="relative flex items-start gap-0 py-16 first:pt-0 last:pb-0"
    >
      {/* ── Dot on the rail ── */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-[calc(50%-0px)] z-20 flex items-center justify-center">
        <motion.span
          style={{ opacity: glowOpacity }}
          className="absolute h-5 w-5 rounded-full bg-cyan-400/30 blur-sm"
        />
        <span className="relative h-3 w-3 rounded-full bg-cyan-400 shadow-[0_0_8px_2px_rgba(0,229,255,0.7)] ring-2 ring-cyan-400/30" />
      </div>

      {/* ── Card body (offset right of the rail) ── */}
      <div className="ml-10 w-full">
        <div className="relative">
          {/* Outer neon glow ring — only visible when active */}
          <motion.div
            style={{ opacity: glowOpacity }}
            className="pointer-events-none absolute -inset-px rounded-2xl"
            aria-hidden
          >
            <div className="absolute inset-0 rounded-2xl shadow-[0_0_40px_4px_rgba(0,229,255,0.18)]" />
            <div className="absolute inset-0 rounded-2xl border border-cyan-400/40" />
          </motion.div>

          {/* Glass panel */}
          <div className="relative overflow-visible rounded-2xl border border-white/10 bg-white/[0.035] backdrop-blur-xl p-7 pt-12 sm:p-9 sm:pt-14">
            {/* Year badge */}
            <span className="absolute -top-5 left-6 text-5xl font-black leading-none text-gradient-cyan select-none">
              {event.year}
            </span>

            <div className="flex flex-col gap-7 md:flex-row md:items-start md:gap-9">
              {/* Text content */}
              <div className="flex-1 min-w-0">
                {/* Title block */}
                <header className="mb-5">
                  <h3 className="text-2xl font-bold leading-tight tracking-tight text-white sm:text-3xl">
                    {copy.title}
                  </h3>
                  <p className="mt-2 text-xs font-medium uppercase tracking-[0.22em] text-cyan-400/90">
                    {copy.companyAndDate}
                  </p>
                </header>

                {/* Intro paragraph */}
                <p className="mb-6 text-sm leading-relaxed text-zinc-300 sm:text-[15px]">
                  {copy.intro}
                </p>

                {/* Bullets — premium CV layout */}
                <ul className="space-y-4">
                  {copy.bullets.map((bullet, idx) => (
                    <li
                      key={`${event.id}-bullet-${idx}`}
                      className="relative flex gap-3 pl-1"
                    >
                      {/* Glowing cyan dot marker */}
                      <span
                        aria-hidden
                        className="relative mt-[10px] h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-400 shadow-[0_0_8px_2px_rgba(0,229,255,0.65)]"
                      />
                      <p className="min-w-0 text-sm leading-relaxed text-zinc-400">
                        <span className="font-semibold text-zinc-200">
                          {bullet.label}
                        </span>{" "}
                        {bullet.detail}
                      </p>
                    </li>
                  ))}
                </ul>

                {/* Tags */}
                {copy.tags.length > 0 && (
                  <ul className="mt-7 flex flex-wrap gap-2">
                    {copy.tags.map((tag) => (
                      <li
                        key={`${event.id}-tag-${tag}`}
                        className="rounded-full border border-cyan-400/20 bg-cyan-400/[0.06] px-3 py-1 text-[11px] font-medium uppercase tracking-[0.14em] text-cyan-300/90"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* ── Floating overlapping image ── */}
              <div className="relative md:w-52 lg:w-60 shrink-0">
                <div
                  className="
                    relative w-full aspect-[4/3]
                    rounded-xl overflow-hidden
                    border border-cyan-400/20
                    shadow-[0_8px_32px_rgba(0,229,255,0.15),0_2px_8px_rgba(0,0,0,0.6)]
                    md:-mt-10 md:-mr-4
                    bg-white/[0.02]
                  "
                >
                  <Image
                    src={event.imageUrl}
                    alt={copy.title}
                    fill
                    sizes="(max-width: 768px) 90vw, 240px"
                    className="object-cover transition-transform duration-700 hover:scale-105"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-cyan-900/20 via-transparent to-black/50" />
                  <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-cyan-400/10" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────
   ANIMATED LEFT RAIL LINE
───────────────────────────────────────────────────────────────*/
function RailLine({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) {
  const scaleY = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  return (
    <div className="pointer-events-none absolute left-0 top-0 h-full w-px" aria-hidden>
      <div className="h-full w-full bg-white/10" />
      <motion.div
        style={{ scaleY, originY: 0 }}
        className="absolute inset-0 w-full bg-gradient-to-b from-cyan-400 via-cyan-300 to-cyan-500"
      />
      <motion.div
        style={{ top: useTransform(scrollYProgress, [0, 1], ["0%", "100%"]) }}
        className="absolute left-1/2 -translate-x-1/2 h-8 w-px blur-sm bg-cyan-400"
      />
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   ROOT EXPORT
───────────────────────────────────────────────────────────────*/
export default function InteractiveTimeline() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const outerSectionRef = useRef<HTMLElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const isSnappingRef = useRef(false);
  const isSectionActiveRef = useRef(false);
  const wheelIdleTimer = useRef<number | null>(null);

  const lenis = useLenis();
  const { dict } = useTranslations();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start center", "end center"],
  });

  useEffect(() => {
    if (typeof window === "undefined" || !lenis) return;

    const mql = window.matchMedia("(hover: hover) and (pointer: fine)");
    if (!mql.matches) return;

    const sectionEl = outerSectionRef.current;
    if (!sectionEl) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        isSectionActiveRef.current = entry.isIntersecting;
      },
      { rootMargin: "-30% 0px -30% 0px", threshold: 0 }
    );
    io.observe(sectionEl);

    const snapToNearestCard = () => {
      const viewportH = window.innerHeight;
      const viewportCenter = viewportH / 2;
      const currentY = lenis.scroll;

      let bestY = currentY;
      let bestDist = Infinity;

      for (const el of cardRefs.current) {
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        const cardCenterViewport = rect.top + rect.height / 2;
        const delta = cardCenterViewport - viewportCenter;
        const targetY = currentY + delta;
        const dist = Math.abs(delta);
        if (dist < bestDist) {
          bestDist = dist;
          bestY = targetY;
        }
      }

      if (bestDist < 4) return;
      if (bestDist > viewportH * 0.6) return;

      isSnappingRef.current = true;
      lenis.scrollTo(bestY, {
        duration: 0.7,
        easing: (t: number) => 1 - Math.pow(1 - t, 3),
        lock: true,
        onComplete: () => {
          window.setTimeout(() => {
            isSnappingRef.current = false;
          }, 60);
        },
      });
    };

    const maybeSnap = () => {
      if (isSnappingRef.current) return;
      if (!isSectionActiveRef.current) return;
      if (lenis.isScrolling) {
        wheelIdleTimer.current = window.setTimeout(maybeSnap, 80);
        return;
      }
      snapToNearestCard();
    };

    const onWheel = () => {
      if (wheelIdleTimer.current !== null) {
        window.clearTimeout(wheelIdleTimer.current);
      }
      wheelIdleTimer.current = window.setTimeout(maybeSnap, 180);
    };

    window.addEventListener("wheel", onWheel, { passive: true });

    return () => {
      window.removeEventListener("wheel", onWheel);
      if (wheelIdleTimer.current !== null) {
        window.clearTimeout(wheelIdleTimer.current);
        wheelIdleTimer.current = null;
      }
      io.disconnect();
    };
  }, [lenis]);

  return (
    <section
      ref={outerSectionRef}
      id="interactive-timeline"
      className="relative py-24 overflow-hidden"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-0 top-1/4 h-[600px] w-[400px] -translate-x-1/2 rounded-full bg-cyan-500/5 blur-[120px]" />
        <div className="absolute right-0 bottom-1/4 h-[400px] w-[300px] translate-x-1/2 rounded-full bg-cyan-400/4 blur-[100px]" />
      </div>

      <div className="mx-auto max-w-4xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-20 flex flex-col gap-3"
        >
          <span className="text-xs font-semibold uppercase tracking-[0.35em] text-cyan-400">
            {dict.timeline.eyebrow}
          </span>
          <h2 className="text-4xl font-black tracking-tight sm:text-5xl text-white">
            {dict.timeline.title}
          </h2>
          <div className="mt-2 h-px w-16 bg-gradient-to-r from-cyan-400 to-transparent" />
        </motion.div>

        <div ref={sectionRef} className="relative pl-6">
          <RailLine scrollYProgress={scrollYProgress} />

          <div className="flex flex-col">
            {timelineEvents.map((event, i) => (
              <TimelineCard
                key={event.id}
                event={event}
                copy={dict.timeline.events[event.id]}
                registerRef={(el) => {
                  cardRefs.current[i] = el;
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
