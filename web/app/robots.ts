import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/_next/", "/.data/"],
      },
    ],
    sitemap: "https://github.com/aissablk1/maillon/sitemap.xml",
    host: "https://github.com/aissablk1/maillon",
  };
}
