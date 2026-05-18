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

/* ─────────────────────────────────────────────────────────────
   SEO & SOCIAL METADATA
   Comprehensive metadata for Google ranking + OG/Twitter cards
───────────────────────────────────────────────────────────────*/
const SITE_URL = "https://sosokartozia.com";
const OG_IMAGE_URL = `${SITE_URL}/og-image.png`;

export function generateMetadata(): Metadata {
  const locale = getServerLocale();
  const dict = getDictionary(locale);

  const title = "Soso Kartozia | Professional Portfolio";
  const description =
    "Discover the professional journey, projects, and expertise of Soso Kartozia. Co-Founder & Strategic Leader at Youth-GE, AI Automation Specialist, and Web Developer.";

  return {
    /* ── Core SEO ── */
    title: {
      default: title,
      template: "%s | Soso Kartozia",
    },
    description,
    keywords: [
      "Soso Kartozia",
      "სოსო კართოზია",
      "Soso Kartozia Portfolio",
      "Youth-GE",
      "Youth-GE Georgia",
      "Next.js Developer",
      "AI Automation",
      "Project Manager Georgia",
      "Strategic Leader",
      "BI Developer Georgia",
      "Web Developer Tbilisi",
      "Soso Kartozia Resume",
      "სოსო კართოზია პორტფოლიო",
    ],
    authors: [{ name: "Soso Kartozia", url: SITE_URL }],
    creator: "Soso Kartozia",
    publisher: "Soso Kartozia",

    /* ── Canonical & Alternates ── */
    metadataBase: new URL(SITE_URL),
    alternates: {
      canonical: "/",
      languages: {
        en: "/",
        ka: "/?locale=ka",
        ru: "/?locale=ru",
      },
    },

    /* ── Robots ── */
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },

    /* ── Open Graph (Facebook, LinkedIn, etc.) ── */
    openGraph: {
      type: "website",
      locale: locale === "ka" ? "ka_GE" : locale === "ru" ? "ru_RU" : "en_US",
      url: SITE_URL,
      siteName: "Soso Kartozia",
      title,
      description,
      images: [
        {
          url: OG_IMAGE_URL,
          width: 1200,
          height: 630,
          alt: "Soso Kartozia — Strategic Leader & AI Specialist",
          type: "image/png",
        },
      ],
    },

    /* ── Twitter / X Card ── */
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [OG_IMAGE_URL],
      creator: "@sosokartozia",
    },

    /* ── Additional SEO signals ── */
    category: "portfolio",
    verification: {
      // Add your Google Search Console verification code here when ready:
      // google: "your-verification-code",
    },
    other: {
      "google-site-verification": "",
    },
  };
}

/* ─────────────────────────────────────────────────────────────
   JSON-LD STRUCTURED DATA
   Helps Google understand who you are and powers Knowledge Panels
───────────────────────────────────────────────────────────────*/
function JsonLd() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Soso Kartozia",
    alternateName: "სოსო კართოზია",
    url: SITE_URL,
    image: OG_IMAGE_URL,
    jobTitle: "Co-Founder & Strategic Leader",
    worksFor: {
      "@type": "Organization",
      name: "Youth-GE Georgia",
    },
    description:
      "Strategic Leader, AI Automation Specialist, and Web Developer based in Georgia. Co-Founder of Youth-GE Georgia.",
    knowsAbout: [
      "AI Automation",
      "Next.js",
      "Project Management",
      "Business Intelligence",
      "Web Development",
      "Agile Methodology",
    ],
    sameAs: [
      "https://www.linkedin.com/in/soso-kartozia-27a29621a/",
      "https://www.instagram.com/sosokartozia/",
      "https://www.facebook.com/soso.kartozia.1/",
    ],
    address: {
      "@type": "PostalAddress",
      addressCountry: "GE",
      addressLocality: "Tbilisi",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = getServerLocale();

  return (
    <html lang={locale} className={`${inter.variable} ${notoGeorgian.variable}`}>
      <head>
        <JsonLd />
      </head>
      <body className="bg-black text-white font-sans antialiased">
        <I18nProvider initialLocale={locale}>
          <LenisScrollProvider>{children}</LenisScrollProvider>
        </I18nProvider>
      </body>
    </html>
  );
}
