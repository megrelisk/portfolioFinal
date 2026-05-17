"use client";

import { useTranslations } from "./I18nProvider";

export default function Footer() {
  const { dict } = useTranslations();

  return (
    <footer className="border-t border-white/5 py-8 text-center text-sm text-zinc-500">
      <p>
        {dict.footer.creditPrefix}{" "}
        <span className="text-white font-semibold">
          {dict.footer.creditName}
        </span>
      </p>
    </footer>
  );
}
