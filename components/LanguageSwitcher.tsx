"use client";

import { LOCALES, type Locale } from "@/lib/i18n/config";
import { useTranslations } from "./I18nProvider";

const LABELS: Record<Locale, string> = {
  en: "English",
  ru: "Russian",
  zh: "ZH",
  ka: "Georgian",
};

// Chinese is a hidden easter egg — visible only if locale is already zh
const VISIBLE_LOCALES: Locale[] = ["en", "ru", "ka"];

export default function LanguageSwitcher() {
  const { locale, setLocale, dict } = useTranslations();

  return (
    <div
      role="group"
      aria-label={dict.languageSwitcher.ariaLabel}
      className="fixed right-4 top-4 z-50 flex items-center gap-0.5 rounded-full border border-white/10 bg-black/40 p-1 text-[11px] font-semibold tracking-[0.18em] backdrop-blur-xl shadow-[0_4px_24px_rgba(0,0,0,0.45)] sm:right-6 sm:top-6 sm:text-xs"
    >
      {([...VISIBLE_LOCALES, ...(locale === "zh" ? ["zh" as Locale] : [])]).map((code) => {
        const active = code === locale;
        return (
          <button
            key={code}
            type="button"
            onClick={() => setLocale(code)}
            aria-pressed={active}
            aria-label={dict.languageSwitcher.names[code]}
            className={
              active
                ? "rounded-full bg-cyan-400/15 px-2.5 py-1 text-cyan-300 shadow-[inset_0_0_0_1px_rgba(0,229,255,0.45)] sm:px-3 sm:py-1.5"
                : "rounded-full px-2.5 py-1 text-zinc-400 transition-colors duration-200 hover:text-white sm:px-3 sm:py-1.5"
            }
          >
            {LABELS[code]}
          </button>
        );
      })}
    </div>
  );
}
