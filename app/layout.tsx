import type { Metadata } from "next";
import { Inter, Noto_Sans_Georgian } from "next/font/google";
import "./globals.css";
import LenisScrollProvider from "../components/LenisScrollProvider";
import I18nProvider from "../components/I18nProvider";
import { getServerLocale } from "@/lib/i18n/server";
import { getDictionary } from "@/lib/i18n/config";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
  display: "swap",
});

const notoGeorgian = Noto_Sans_Georgian({
  subsets: ["georgian"],
  variable: "--font-noto-georgian",
  display: "swap",
});

export function generateMetadata(): Metadata {
  const locale = getServerLocale();
  const dict = getDictionary(locale);
  return {
    title: dict.meta.title,
    description: dict.meta.description,
  };
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = getServerLocale();

  return (
    <html lang={locale} className={`${inter.variable} ${notoGeorgian.variable}`}>
      <body className="bg-black text-white font-sans antialiased">
        <I18nProvider initialLocale={locale}>
          <LenisScrollProvider>{children}</LenisScrollProvider>
        </I18nProvider>
      </body>
    </html>
  );
}
