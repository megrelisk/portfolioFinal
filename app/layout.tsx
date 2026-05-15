import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import LenisScrollProvider from "../components/LenisScrollProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Soso Kartozia — Strategic Leader & Data Analyst",
  description:
    "Strategic Leader, Data-Driven Builder, and Co-Founder. Open to new opportunities and interesting challenges.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="bg-black text-white font-sans antialiased">
        <LenisScrollProvider>
          {children}
        </LenisScrollProvider>
      </body>
    </html>
  );
}
