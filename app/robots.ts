import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
      {
        userAgent: ["facebookexternalhit", "Twitterbot", "LinkedInBot"],
        allow: "/",
      },
    ],
    sitemap: "https://sosokartozia.com/sitemap.xml",
  };
}
