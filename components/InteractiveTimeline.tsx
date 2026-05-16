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
import { timelineEvents } from "@/lib/timeline-data";
import type { TimelineEvent } from "@/lib/timeline-data";

/* ─────────────────────────────────────────────────────────────
   SCROLL-DRIVEN CARD
   Each card measures its own position relative to the viewport
   center and derives scale / opacity / blur from that distance.
───────────────────────────────────────────────────────────────*/
function TimelineCard({
  event,
  index,
  totalCount,
  registerRef,
}: {
  event: TimelineEvent;
  index: number;
  totalCount: number;
  registerRef?: (el: HTMLDivElement | null) => void;
}) {
  const cardRef = useRef<HTMLDivElement | null>(null);

  const setRefs = (el: HTMLDivElement | null) => {
    cardRef.current = el;
    registerRef?.(el);
  };

  // Track card's scroll progress through the viewport
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });

  // Map 0→0.5 (entering) and 0.5→1 (leaving) to a -1…0…-1 distance
  // 0.5 = dead center → distance 0 = fully active
  const distanceFromCenter = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0, 1]);

  // Spring-smooth so transitions feel physical, not snappy
  const smoothDistance = useSpring(distanceFromCenter, {
    stiffness: 80,
    damping: 20,
    mass: 0.8,
  });

  const scale = useTransform(smoothDistance, [0, 1], [1.0, 0.85]);
  const opacity = useTransform(smoothDistance, [0, 1], [1.0, 0.35]);
  const blur = useTransform(
    smoothDistance,
    [0, 1],
    ["blur(0px)", "blur(6px)"]
  );
  // Glow intensifies at center
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
          <div className="relative overflow-visible rounded-2xl border border-white/10 bg-white/[0.035] backdrop-blur-xl p-7 pt-10">
            {/* Year badge */}
            <span className="absolute -top-5 left-6 text-5xl font-black leading-none text-gradient-cyan select-none">
              {event.year}
            </span>

            <div className="flex flex-col gap-6 md:flex-row md:items-start md:gap-8">
              {/* Text content */}
              <div className="flex-1 min-w-0">
                <div className="mb-2 flex items-center gap-2.5">
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-400 shadow-[0_0_6px_2px_rgba(0,229,255,0.6)]" />
                  <span className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-400">
                    {event.subtitle}
                  </span>
                </div>

                <h3 className="mb-3 text-2xl font-bold leading-tight tracking-tight text-white sm:text-3xl">
                  {event.title}
                </h3>

                <p className="text-sm leading-relaxed text-zinc-400">
                  {event.text}
                </p>
              </div>

              {/* ── Floating overlapping image ──
                  Negative top margin lets it bleed over the glass frame border,
                  creating the 3D "floating layer" effect. */}
              <div className="relative md:w-52 lg:w-60 shrink-0">
                <div
                  className="
                    relative w-full aspect-[4/3]
                    rounded-xl overflow-hidden
                    border border-cyan-400/20
                    shadow-[0_8px_32px_rgba(0,229,255,0.15),0_2px_8px_rgba(0,0,0,0.6)]
                    md:-mt-12 md:-mr-4 md:mb-[-1rem]
                    bg-white/[0.02]
                  "
                >
                  <Image
                    src={event.imageUrl}
                    alt={`${event.title} — ${event.subtitle}`}
                    fill
                    sizes="(max-width: 768px) 90vw, 240px"
                    className="object-cover transition-transform duration-700 hover:scale-105"
                  />
                  {/* Inner gradient overlay for cinematic look */}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-cyan-900/20 via-transparent to-black/50" />
                  {/* Subtle neon border reflection */}
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
   Fills from top → bottom as the user scrolls through the section.
───────────────────────────────────────────────────────────────*/
function RailLine({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) {
  const scaleY = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  return (
    /* Absolute rail container — left edge of the content area */
    <div className="pointer-events-none absolute left-0 top-0 h-full w-px" aria-hidden>
      {/* Static dim track */}
      <div className="h-full w-full bg-white/10" />
      {/* Animated glowing fill */}
      <motion.div
        style={{ scaleY, originY: 0 }}
        className="absolute inset-0 w-full bg-gradient-to-b from-cyan-400 via-cyan-300 to-cyan-500"
      />
      {/* Travelling glow head */}
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
      {/* Ambient background glow — purely decorative */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="absolute left-0 top-1/4 h-[600px] w-[400px] -translate-x-1/2 rounded-full bg-cyan-500/5 blur-[120px]" />
        <div className="absolute right-0 bottom-1/4 h-[400px] w-[300px] translate-x-1/2 rounded-full bg-cyan-400/4 blur-[100px]" />
      </div>

      <div className="mx-auto max-w-4xl px-6">
        {/* ── Section header ── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-20 flex flex-col gap-3"
        >
          <span className="text-xs font-semibold uppercase tracking-[0.35em] text-cyan-400">
            Career path
          </span>
          <h2 className="text-4xl font-black tracking-tight sm:text-5xl text-white">
            JOURNEY
          </h2>
          <div className="mt-2 h-px w-16 bg-gradient-to-r from-cyan-400 to-transparent" />
        </motion.div>

        {/* ── Rail + Cards ── */}
        <div ref={sectionRef} className="relative pl-6">
          {/* Left glowing vertical rail */}
          <RailLine scrollYProgress={scrollYProgress} />

          {/* Cards */}
          <div className="flex flex-col">
            {timelineEvents.map((event, i) => (
              <TimelineCard
                key={event.id}
                event={event}
                index={i}
                totalCount={timelineEvents.length}
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
