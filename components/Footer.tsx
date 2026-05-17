"use client";

import { useState } from "react";
import { useTranslations } from "./I18nProvider";
import { motion } from "framer-motion";

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

export default function Footer() {
  const { dict } = useTranslations();
  const [showPhone, setShowPhone] = useState(false);

  return (
    <footer id="footer" className="py-12 text-center text-sm text-zinc-500 relative">
      <div className="mx-auto max-w-4xl px-6 flex flex-col items-center gap-8">

        {/* Cute Sisyphus Blob Animation */}
        <div
          className="w-full max-w-[250px] h-[30px] overflow-hidden relative mx-auto opacity-70"
          style={{ WebkitMaskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)' }}
        >
          {/* Static Ground */}
          <div className="absolute bottom-[4px] left-0 w-full border-b-[1.5px] border-dashed border-zinc-600" />

          <motion.div
            animate={{ x: [-60, 250] }}
            transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
            className="absolute top-0 left-0"
          >
            <svg width="50" height="30" viewBox="0 0 50 30" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">

              {/* Cute Blob */}
              <motion.g
                className="text-cyan-500"
                animate={{ y: [0, -1.5, 0] }}
                transition={{ duration: 0.35, repeat: Infinity, ease: "easeInOut" }}
              >
                <path d="M 8 26 C 8 14, 20 14, 20 26 Z" fill="currentColor" stroke="none" />
                {/* Eyes */}
                <circle cx="15" cy="19" r="1" fill="#000" stroke="none" />
                <circle cx="18" cy="19" r="1" fill="#000" stroke="none" />
                {/* Hands pushing */}
                <path d="M 19 20 L 22 18" stroke="currentColor" />
                <path d="M 19 23 L 22 22" stroke="currentColor" />
              </motion.g>

              {/* Giant Rock */}
              <motion.g
                animate={{ rotate: 360 }}
                transition={{ duration: 1.4, repeat: Infinity, ease: "linear" }}
                style={{ transformOrigin: "32px 16px" }}
                className="text-zinc-400"
              >
                <circle cx="32" cy="16" r="10" fill="none" stroke="currentColor" />
                <circle cx="29" cy="12" r="2" fill="currentColor" opacity="0.3" stroke="none" />
                <circle cx="36" cy="18" r="1.5" fill="currentColor" opacity="0.3" stroke="none" />
                <circle cx="30" cy="21" r="1" fill="currentColor" opacity="0.3" stroke="none" />
              </motion.g>
            </svg>
          </motion.div>
        </div>

        {/* Contact Info */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12 text-base text-zinc-300">
          <a href="mailto:kartoziasoso@gmail.com" className="hover:text-cyan-400 transition-colors">
            kartoziasoso@gmail.com
          </a>
          <div className="w-1 h-1 rounded-full bg-zinc-700 hidden md:block" />
          <button
            onClick={() => setShowPhone(true)}
            className="group relative flex items-center gap-2 hover:text-cyan-400 transition-colors"
          >
            <span className="tracking-wider">
              +995 555 36 77 <span className={showPhone ? "" : "blur-[4px] select-none opacity-50"}>{showPhone ? "70" : "XX"}</span>
            </span>
            {!showPhone && (
              <span className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-cyan-400/10 px-2 py-1 text-xs text-cyan-400 opacity-0 transition-opacity group-hover:opacity-100">
                Click to reveal
              </span>
            )}
          </button>
        </div>


        {/* Bottom Border moved here */}
        <div className="w-full h-px bg-white/5" />

        {/* Credit */}
        <p className="mt-4">
          {dict.footer.creditPrefix}{" "}
          <span className="text-white font-semibold">
            {dict.footer.creditName}
          </span>
        </p>
      </div>
    </footer>
  );
}
