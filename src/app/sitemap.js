import { products } from "@/lib/data.js";
import {
  absoluteUrl,
  blogPosts,
  mainPages,
  productPath,
  servicePages,
} from "@/lib/site.js";

export const dynamic = "force-static";

export default function sitemap() {
  const lastModified = new Date();

  const entry = (path, priority) => ({
    url: absoluteUrl(path),
    lastModified,
    changeFrequency: "daily",
    priority,
  });

  // Every product is listed, including location products hidden from the
  // catalog, so search engines can still discover them.
  return [
    ...mainPages.map((page) => entry(page.path, page.path === "/" ? 1 : 0.9)),
    ...servicePages.map((page) => entry(page.path, 0.8)),
    ...products
      .filter((product) => product?.slug)
      .map((product) => entry(productPath(product), 0.8)),
    ...blogPosts.map((post) => entry(post.path, 0.7)),
  ];
}
