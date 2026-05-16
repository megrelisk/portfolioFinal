"use client";

import Image from "next/image";
import { motion, useMotionValue, animate } from "framer-motion";
import type { TimelineEvent } from "@/lib/timeline-data";

interface Props {
  event: TimelineEvent;
  index: number;
}

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
}

function TiltCard({ children, className }: TiltCardProps) {
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    rotateY.set(x * 12);
    rotateX.set(-y * 12);
  };

  const handleMouseLeave = () => {
    animate(rotateX, 0, { duration: 0.5, ease: "easeOut" });
    animate(rotateY, 0, { duration: 0.5, ease: "easeOut" });
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformPerspective: 1000 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function TimelineItem({ event, index }: Props) {
  const isImageLeft = index % 2 === 0;

  const imageBlock = (
    <div className="group relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02]">
      <Image
        src={event.imageUrl}
        alt={`${event.title} — ${event.subtitle}`}
        fill
        sizes="(max-width: 768px) 90vw, 40vw"
        className="object-cover transition-transform duration-700 group-hover:scale-110"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
    </div>
  );

  const textBlock = (
    <TiltCard className="group glass rounded-2xl p-7 transition-all duration-300 hover:border-cyan-400/30 hover:shadow-cyan-glow">
      <div className="mb-3 flex items-center gap-3">
        <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 shadow-cyan-dot" />
        <span className="text-xs uppercase tracking-[0.3em] text-cyan-400">
          {event.subtitle}
        </span>
      </div>
      <h3 className="mb-3 text-2xl font-bold leading-tight sm:text-3xl">
        {event.title}
      </h3>
      <p className="text-zinc-300">{event.text}</p>
    </TiltCard>
  );

  return (
    <motion.article
      id={event.id}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="relative py-16"
    >
      <div className="grid grid-cols-2 items-center gap-12">
        {isImageLeft ? (
          <>
            <div>{imageBlock}</div>
            <div className="relative z-10 pt-8 mb-4">
              <span className="absolute -top-4 left-0 text-6xl font-black text-white lg:text-7xl">
                {event.year}
              </span>
              <div className="pt-16">{textBlock}</div>
            </div>
          </>
        ) : (
          <>
            <div className="relative z-10 pt-8 mb-4">
              <span className="absolute -top-4 right-0 text-6xl font-black text-white lg:text-7xl">
                {event.year}
              </span>
              <div className="pt-16">{textBlock}</div>
            </div>
            <div>{imageBlock}</div>
          </>
        )}
      </div>
    </motion.article>
  );
}

export function TimelineMobileCard({ event }: { event: TimelineEvent }) {
  return (
    <div className="snap-center shrink-0 w-[85vw]">
      <div className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
        <span className="text-5xl font-black text-white">{event.year}</span>
        <div className="flex items-center gap-3">
          <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 shadow-cyan-dot" />
          <span className="text-xs uppercase tracking-[0.3em] text-cyan-400">
            {event.subtitle}
          </span>
        </div>
        <h3 className="text-2xl font-bold leading-tight">{event.title}</h3>
        <p className="text-zinc-300">{event.text}</p>
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl border border-white/10">
          <Image
            src={event.imageUrl}
            alt={`${event.title} — ${event.subtitle}`}
            fill
            sizes="85vw"
            className="object-cover"
          />
        </div>
      </div>
    </div>
  );
}
