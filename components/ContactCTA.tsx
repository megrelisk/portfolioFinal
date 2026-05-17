"use client";

import { useTranslations } from "./I18nProvider";

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

export default function ContactCTA() {
  const { dict } = useTranslations();

  return (
    <section id="contact" className="py-32">
      <div className="mx-auto flex max-w-3xl flex-col items-center px-6 text-center">
        <h2 className="text-5xl font-black tracking-tight sm:text-6xl">
          <span className="text-gradient-cyan">{dict.contact.title}</span>
        </h2>
        <p className="mt-6 max-w-xl text-lg text-zinc-300">
          {dict.contact.description}
        </p>

        <div className="mt-10 flex flex-col items-center gap-6">
          <div className="flex items-center gap-5 text-zinc-500">
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={dict.social.linkedin}
              className="transition-colors duration-300 hover:text-cyan-400"
            >
              <LinkedInIcon />
            </a>
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={dict.social.instagram}
              className="transition-colors duration-300 hover:text-cyan-400"
            >
              <InstagramIcon />
            </a>
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={dict.social.facebook}
              className="transition-colors duration-300 hover:text-cyan-400"
            >
              <FacebookIcon />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
