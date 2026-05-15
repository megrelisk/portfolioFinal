"use client";

import { useRef } from "react";
import { useScroll } from "framer-motion";
import { timelineEvents } from "@/lib/timeline-data";
import TimelineItem, { TimelineMobileCard } from "./TimelineItem";
import TimelineProgressLine from "./TimelineProgressLine";

export default function TimelineSection() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  return (
    <section id="timeline" className="py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16 flex flex-col gap-3">
          <span className="text-xs uppercase tracking-[0.3em] text-cyan-400">
            Career path
          </span>
          <h2 className="text-4xl font-black tracking-tight sm:text-5xl">
            JOURNEY
          </h2>
        </div>

        <div className="timeline-scroll-x md:hidden flex overflow-x-auto snap-x snap-mandatory gap-6 pb-6 -mx-6 px-6">
          {timelineEvents.map((event) => (
            <TimelineMobileCard key={event.id} event={event} />
          ))}
        </div>

        <div ref={containerRef} className="relative hidden md:block">
          <TimelineProgressLine scrollYProgress={scrollYProgress} />
          <div className="relative">
            {timelineEvents.map((event, i) => (
              <TimelineItem key={event.id} event={event} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
