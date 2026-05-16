"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import TypingTagline from "./TypingTagline";
import StatsBar from "./StatsBar";
import HeroParticles from "./HeroParticles";

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 50 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const },
  },
};

function ArrowIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.77l-.44 2.89h-2.33v6.99A10 10 0 0 0 22 12z" />
    </svg>
  );
}

export default function Hero() {
  const heroRef = useRef<HTMLDivElement | null>(null);


  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-screen w-full overflow-hidden flex flex-col justify-center items-center px-6 md:px-12 py-24 lg:py-0"
    >
      {/* ── Constellation / particle layer — sits behind everything ── */}
      <HeroParticles />

      <div className="w-full max-w-7xl mx-auto grid lg:grid-cols-2 items-center gap-12">

        {/* LEFT COLUMN */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="flex flex-col justify-center gap-8 w-full max-w-xl mx-auto lg:mx-0 lg:ml-auto lg:pr-12"
        >
          {/* Get in touch & Tagline - Moved above Title */}
          <motion.div variants={item} className="flex flex-wrap items-center gap-6">
            <a
              href="mailto:kartoziasoso@gmail.com"
              className="group inline-flex items-center gap-2 rounded-full border border-cyan-400/40 bg-cyan-400/10 px-6 py-3 text-sm font-medium text-white transition-all duration-300 hover:border-cyan-400 hover:bg-cyan-400/20 hover:shadow-cyan-glow"
            >
              <span>Get in touch</span>
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                <ArrowIcon />
              </span>
            </a>
            <div className="text-zinc-300">
              <TypingTagline />
            </div>
          </motion.div>

          {/* Title */}
          <motion.h1
            variants={item}
            className="font-sans font-black leading-[0.95] text-7xl md:text-8xl lg:text-9xl tracking-tighter text-white"
          >
            <span className="block">SOSO</span>
            <span className="block">KARTOZIA</span>
          </motion.h1>
        </motion.div>

        {/* RIGHT COLUMN */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-full flex justify-center items-center"
        >
          <div className="w-full max-w-md mx-auto flex flex-col items-center gap-6">
            {/* Top Row: Social Links + Available For Hire */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="flex flex-col items-center gap-4 w-full"
            >
              <div className="flex items-center gap-3 text-xs font-medium uppercase tracking-[0.25em] text-zinc-400">
                <span className="inline-block h-2 w-2 animate-blink rounded-full bg-cyan-400 shadow-cyan-dot" />
                AVAILABLE FOR HIRE · 2026
              </div>

              {/* Social Links - Moved above image */}
              <div className="flex items-center gap-5">
                <a
                  href="https://www.linkedin.com/in/soso-kartozia-27a29621a/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="text-[#0077B5] transition-colors duration-200 hover:scale-110"
                >
                  <LinkedInIcon />
                </a>
                <a
                  href="https://www.instagram.com/sosokartozia/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="text-[#E1306C] transition-colors duration-200 hover:scale-110"
                >
                  <InstagramIcon />
                </a>
                <a
                  href="https://www.facebook.com/soso.kartozia.1/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="text-[#1877F2] transition-colors duration-200 hover:scale-110"
                >
                  <FacebookIcon />
                </a>
              </div>
            </motion.div>

            {/* Image Container */}
            <div className="relative overflow-hidden rounded-3xl shadow-[0_0_40px_-10px_rgba(0,229,255,0.3)] border border-cyan-400/20 w-full">
              <Image
                src="/card.png"
                alt="Soso Kartozia"
                width={800}
                height={1000}
                priority
                className="w-full h-auto object-cover transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#000] via-transparent to-transparent opacity-80 pointer-events-none" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* STATS BAR CENTERED BELOW */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.8 }}
        className="w-full flex justify-center mt-12 lg:mt-24"
      >
        <StatsBar />
      </motion.div>
    </section>
  );
}
