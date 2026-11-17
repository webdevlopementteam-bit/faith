import { absoluteUrl } from "@/lib/site.js";

export const dynamic = "force-static";

export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/thank-you/"],
    },
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}
