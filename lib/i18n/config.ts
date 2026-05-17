import enDict from "@/locales/en.json";
import kaDict from "@/locales/ka.json";
import ruDict from "@/locales/ru.json";
import zhDict from "@/locales/zh.json";

export const LOCALES = ["en", "ru", "zh", "ka"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "en";
export const LOCALE_COOKIE = "locale";

export type Dictionary = typeof enDict;

const dictionaries: Record<Locale, Dictionary> = {
  en: enDict,
  ka: kaDict as Dictionary,
  ru: ruDict as Dictionary,
  zh: zhDict as Dictionary,
};

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale] ?? dictionaries[DEFAULT_LOCALE];
}

export function isLocale(value: string | undefined | null): value is Locale {
  return !!value && (LOCALES as readonly string[]).includes(value);
}
