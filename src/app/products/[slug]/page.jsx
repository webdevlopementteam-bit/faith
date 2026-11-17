// src/app/products/[slug]/page.jsx

import { Suspense } from "react";
import { notFound } from "next/navigation";
import { products } from "@/lib/data.js";
import ProductDetailView from "@/components/ProductDetailView";

const SITE_URL = "https://www.blowmouldmachinemanufacturer.com";

const getCleanSlug = (slug = "") => {
  try {
    return decodeURIComponent(String(slug))
      .trim()
      .replace(/^\/+|\/+$/g, "");
  } catch {
    return String(slug)
      .trim()
      .replace(/^\/+|\/+$/g, "");
  }
};

const getProductBySlug = (slug) => {
  const targetSlug = getCleanSlug(slug);
  return products.find((product) => getCleanSlug(product.slug) === targetSlug);
};

export async function generateStaticParams() {
  if (!Array.isArray(products)) return [];

  return products
    .filter((product) => product?.slug)
    .map((product) => ({
      slug: getCleanSlug(product.slug),
    }));
}

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const product = getProductBySlug(resolvedParams?.slug);

  if (!product) {
    return {
      title: "Product Not Found",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const seo = product.seo || {};

  const title =
    typeof seo.title === "string" && seo.title.trim()
      ? seo.title.trim()
      : product.name || "Product";

  const description =
    typeof seo.description === "string" && seo.description.trim()
      ? seo.description.trim()
      : `Explore ${product.name || "this product"} from Faith Engineering Works. Contact us for product details and pricing.`;

  const keywords = Array.isArray(seo.keywords)
    ? seo.keywords.filter(
        (keyword) => typeof keyword === "string" && keyword.trim(),
      )
    : [];

  const canonical = new URL(
    `/products/${getCleanSlug(product.slug)}`,
    SITE_URL,
  ).toString();

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical,
    },
  };
}

async function ProductContent({ paramsPromise }) {
  const resolvedParams = await paramsPromise;
  const product = getProductBySlug(resolvedParams?.slug);

  if (!product) notFound();

  return <ProductDetailView product={product} />;
}

export default function ProductPage({ params }) {
  return (
    <main className="min-h-screen bg-white">
      <Suspense
        fallback={
          <div className="mx-auto max-w-7xl animate-pulse px-4 py-10 text-gray-400 sm:px-6 lg:px-8">
            Loading product details...
          </div>
        }
      >
        <ProductContent paramsPromise={params} />
      </Suspense>
    </main>
  );
}
