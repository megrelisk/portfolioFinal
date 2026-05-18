"use client";

import { useState } from "react";
import { useTranslations } from "./I18nProvider";
import { motion } from "framer-motion";

/* ─── Social icons (colorful, matching Hero) ─── */
function LinkedInIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.77l-.44 2.89h-2.33v6.99A10 10 0 0 0 22 12z" />
    </svg>
  );
}

/* ─── Copy icon ─── */
function CopyIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  );
}

/* ─── Check icon ─── */
function CheckIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

/* ─── Hidden-digits subtext per language ─── */
const hiddenSubtext: Record<string, string> = {
  ka: "ბოლო ორ ციფრს არ ვასახელებ",
  en: "Click to reveal the last two digits",
  ru: "Нажмите, чтобы показать последние две цифры",
  zh: "间谍号码保密中，最后两位由特工保护 🕵️",
};

export default function Footer() {
  const { dict, locale } = useTranslations();
  const [showPhone, setShowPhone] = useState(false);
  const [emailCopied, setEmailCopied] = useState(false);
  const [phoneCopied, setPhoneCopied] = useState(false);

  function copyEmail() {
    navigator.clipboard.writeText("kartoziasoso@gmail.com").then(() => {
      setEmailCopied(true);
      setTimeout(() => setEmailCopied(false), 2000);
    });
  }

  function copyPhone() {
    navigator.clipboard.writeText("+995555367770").then(() => {
      setPhoneCopied(true);
      setTimeout(() => setPhoneCopied(false), 2000);
    });
  }

  const subtextKey = (locale as string) in hiddenSubtext ? (locale as string) : "en";

  return (
    <footer id="footer" className="py-12 text-center text-sm text-zinc-500 relative">
      <div className="mx-auto max-w-4xl px-6 flex flex-col items-center gap-8">

        {/* Sisyphus Animation — slightly scaled up */}
        <div
          className="w-full max-w-[300px] h-[36px] overflow-hidden relative mx-auto opacity-70"
          style={{ WebkitMaskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)' }}
        >
          {/* Static Ground */}
          <div className="absolute bottom-[4px] left-0 w-full border-b-[1.5px] border-dashed border-zinc-600" />

          <motion.div
            animate={{ x: [-72, 300] }}
            transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
            className="absolute top-0 left-0"
          >
            <svg width="60" height="36" viewBox="0 0 60 36" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">

              {/* Cute Blob */}
              <motion.g
                className="text-cyan-500"
                animate={{ y: [0, -1.5, 0] }}
                transition={{ duration: 0.35, repeat: Infinity, ease: "easeInOut" }}
              >
                <path d="M 9.6 31.2 C 9.6 16.8 24 16.8 24 31.2 Z" fill="currentColor" stroke="none" />
                {/* Eyes */}
                <circle cx="18" cy="22.8" r="1.2" fill="#000" stroke="none" />
                <circle cx="21.6" cy="22.8" r="1.2" fill="#000" stroke="none" />
                {/* Hands pushing */}
                <path d="M 22.8 24 L 26.4 21.6" stroke="currentColor" />
                <path d="M 22.8 27.6 L 26.4 26.4" stroke="currentColor" />
              </motion.g>

              {/* Giant Rock */}
              <motion.g
                animate={{ rotate: 360 }}
                transition={{ duration: 1.4, repeat: Infinity, ease: "linear" }}
                style={{ transformOrigin: "38.4px 19.2px" }}
                className="text-zinc-400"
              >
                <circle cx="38.4" cy="19.2" r="12" fill="none" stroke="currentColor" />
                <circle cx="34.8" cy="14.4" r="2.4" fill="currentColor" opacity="0.3" stroke="none" />
                <circle cx="43.2" cy="21.6" r="1.8" fill="currentColor" opacity="0.3" stroke="none" />
                <circle cx="36" cy="25.2" r="1.2" fill="currentColor" opacity="0.3" stroke="none" />
              </motion.g>
            </svg>
          </motion.div>
        </div>

        {/* Social Icons — colorful, matching header */}
        <div className="flex items-center gap-5">
          <a
            href="https://www.linkedin.com/in/soso-kartozia-27a29621a/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label={dict.social.linkedin}
            className="text-[#0077B5] transition-colors duration-200 hover:scale-110 inline-flex"
          >
            <LinkedInIcon />
          </a>
          <a
            href="https://www.instagram.com/sosokartozia/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label={dict.social.instagram}
            className="text-[#E1306C] transition-colors duration-200 hover:scale-110 inline-flex"
          >
            <InstagramIcon />
          </a>
          <a
            href="https://www.facebook.com/soso.kartozia.1/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label={dict.social.facebook}
            className="text-[#1877F2] transition-colors duration-200 hover:scale-110 inline-flex"
          >
            <FacebookIcon />
          </a>
        </div>

        {/* Contact Info */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12 text-base text-zinc-300">

          {/* Email + Copy */}
          <div className="flex items-center gap-2">
            <a href="mailto:kartoziasoso@gmail.com" className="hover:text-cyan-400 transition-colors">
              kartoziasoso@gmail.com
            </a>
            <button
              onClick={copyEmail}
              aria-label="Copy email address"
              className={`transition-colors duration-200 ${emailCopied ? "text-cyan-400" : "text-zinc-500 hover:text-zinc-300"}`}
            >
              {emailCopied ? <CheckIcon /> : <CopyIcon />}
            </button>
          </div>

          <div className="w-1 h-1 rounded-full bg-zinc-700 hidden md:block" />

          {/* Phone + Copy */}
          <div className="flex flex-col items-center gap-1">
            {/* Subtext when hidden */}
            {!showPhone && (
              <span className="text-xs text-zinc-500 italic">
                {hiddenSubtext[subtextKey]}
              </span>
            )}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowPhone(true)}
                className="group relative flex items-center gap-2 hover:text-cyan-400 transition-colors"
              >
                <span className="tracking-wider">
                  +995 555 36 77{" "}
                  <span className={showPhone ? "" : "blur-[4px] select-none opacity-50"}>
                    {showPhone ? "70" : "XX"}
                  </span>
                </span>
                {!showPhone && (
                  <span className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-cyan-400/10 px-2 py-1 text-xs text-cyan-400 opacity-0 transition-opacity group-hover:opacity-100">
                    Click to reveal
                  </span>
                )}
              </button>
              {/* Copy phone — always visible */}
              <button
                onClick={copyPhone}
                aria-label="Copy phone number"
                className={`transition-colors duration-200 ${phoneCopied ? "text-cyan-400" : "text-zinc-500 hover:text-zinc-300"}`}
              >
                {phoneCopied ? <CheckIcon /> : <CopyIcon />}
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Border */}
        <div className="w-full h-px bg-white/5" />

        {/* Credit — always English */}
        <p className="mt-4">
          Designed &amp; Developed by{" "}
          <span className="text-white font-semibold">Soso</span>
        </p>
      </div>
    </footer>
  );
}
