"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  DEFAULT_LOCALE,
  LOCALES,
  LOCALE_COOKIE,
  getDictionary,
  isLocale,
  type Dictionary,
  type Locale,
} from "@/lib/i18n/config";

type I18nContextValue = {
  locale: Locale;
  setLocale: (next: Locale) => void;
  dict: Dictionary;
  t: (path: string) => string;
};

const I18nContext = createContext<I18nContextValue | null>(null);

function resolvePath(dict: Dictionary, path: string): unknown {
  return path
    .split(".")
    .reduce<unknown>(
      (acc, key) => (acc != null && typeof acc === "object" ? (acc as Record<string, unknown>)[key] : undefined),
      dict
    );
}

export default function I18nProvider({
  initialLocale,
  children,
}: {
  initialLocale: Locale;
  children: ReactNode;
}) {
  const [locale, setLocaleState] = useState<Locale>(initialLocale);

  useEffect(() => {
    if (typeof document === "undefined") return;
    document.documentElement.lang = locale;
  }, [locale]);

  useEffect(() => {
    if (typeof document === "undefined") return;
    const hasCookie = document.cookie
      .split(";")
      .some((c) => c.trim().startsWith(`${LOCALE_COOKIE}=`));
    if (hasCookie) return;

    const navLang = navigator.language?.toLowerCase().split("-")[0];
    if (navLang && (LOCALES as readonly string[]).includes(navLang) && navLang !== initialLocale) {
      const detected = navLang as Locale;
      writeLocaleCookie(detected);
      setLocaleState(detected);
    } else {
      writeLocaleCookie(initialLocale);
    }
  }, [initialLocale]);

  const setLocale = useCallback((next: Locale) => {
    if (!isLocale(next)) return;
    writeLocaleCookie(next);
    setLocaleState(next);
  }, []);

  const dict = useMemo(() => getDictionary(locale), [locale]);

  const t = useCallback(
    (path: string) => {
      const value = resolvePath(dict, path);
      return typeof value === "string" ? value : path;
    },
    [dict]
  );

  const value = useMemo<I18nContextValue>(
    () => ({ locale, setLocale, dict, t }),
    [locale, setLocale, dict, t]
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useTranslations(): I18nContextValue {
  const ctx = useContext(I18nContext);
  if (!ctx) {
    return {
      locale: DEFAULT_LOCALE,
      setLocale: () => undefined,
      dict: getDictionary(DEFAULT_LOCALE),
      t: (path: string) => path,
    };
  }
  return ctx;
}

function writeLocaleCookie(locale: Locale) {
  const oneYear = 60 * 60 * 24 * 365;
  document.cookie = `${LOCALE_COOKIE}=${locale}; path=/; max-age=${oneYear}; samesite=lax`;
}
