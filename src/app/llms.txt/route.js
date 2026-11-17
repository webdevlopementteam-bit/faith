import { catalogProducts, products } from "@/lib/data.js";
import {
  absoluteUrl,
  blogPosts,
  company,
  mainPages,
  productPath,
  servicePages,
} from "@/lib/site.js";

export const dynamic = "force-static";

const link = (title, path, description) =>
  `- [${title}](${absoluteUrl(path)})${description ? `: ${description}` : ""}`;

const productLink = (product) =>
  link(product.name, productPath(product), product.seo?.description?.trim());

function buildLlmsTxt() {
  const catalogSlugs = new Set(catalogProducts.map((product) => product.slug));
  const locationProducts = products.filter(
    (product) => product?.slug && !catalogSlugs.has(product.slug),
  );

  return [
    `# ${company.name}`,
    "",
    `> ${company.summary} The range covers plastic, HDPE, automatic, auto-deflashing and accumulator blow moulding machines in single, double and triple head and single or double stage configurations, from 100 ml to 10 litre capacity, supplied across India and exported worldwide.`,
    "",
    `- Phone / WhatsApp: ${company.phone}`,
    `- Email: ${company.emails.join(", ")}`,
    ...company.addresses.map((address) => `- ${address}`),
    "",
    "## Main pages",
    "",
    ...mainPages.map((page) => link(page.title, page.path, page.description)),
    "",
    "## Products",
    "",
    ...catalogProducts.map(productLink),
    "",
    "## Blow moulding machines by type and region",
    "",
    ...servicePages.map((page) =>
      link(page.title, page.path, page.description),
    ),
    "",
    "## Blog",
    "",
    ...blogPosts.map((post) => link(post.title, post.path, post.description)),
    "",
    "## Optional",
    "",
    ...locationProducts.map(productLink),
    "",
  ].join("\n");
}

export function GET() {
  return new Response(buildLlmsTxt(), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
