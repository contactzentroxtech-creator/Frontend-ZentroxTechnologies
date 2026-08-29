import type { MetadataRoute } from "next";

const SITE_URL = "https://zentroxtechnologies.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/admin/",
          "/dashboard/",
          "/auth/",
          "/api/",
        ],
      },
    ],

    sitemap: `${SITE_URL}/sitemap.xml`,

    host: SITE_URL,
  };
}
