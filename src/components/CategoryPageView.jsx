import Image from "next/image";
import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";
import DescriptionRenderer from "@/components/DescriptionRenderer";

const cleanSlug = (slug = "") => String(slug).replace(/^\/+|\/+$/g, "");

// Category layout for product entries with pageType: "category".
// Banner with the H1, then the listed model cards in order, then the content.
export default function CategoryPageView({ product, allProducts = [] }) {
  const models = (product.modelSlugs || [])
    .map((slug) =>
      allProducts.find((item) => cleanSlug(item.slug) === cleanSlug(slug)),
    )
    .filter(Boolean);

  const descriptionData = Array.isArray(product.data?.descriptionData)
    ? product.data.descriptionData
    : [];

  return (
    <>
      <Breadcrumb title={product.h1 || product.name} />

      {models.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 pt-12 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {models.map((model, index) => {
              const slug = cleanSlug(model.slug);
              const imgSrc =
                (Array.isArray(model.images) && model.images[0]) ||
                model.image ||
                "/images/placeholder.webp";

              return (
                <Link
                  key={slug}
                  href={`/products/${slug}/`}
                  className="group flex flex-col rounded-3xl border border-red-100/90 bg-white p-2 shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-500 ease-out hover:-translate-y-2 hover:border-[#C5071E]/50 hover:shadow-[0_25px_50px_-12px_rgba(197,7,30,0.22)]"
                >
                  <div className="relative aspect-square w-full overflow-hidden rounded-2xl border border-red-50/80 bg-gradient-to-b from-[#FFFDFB] via-white to-red-50/40 p-6">
                    <div className="relative h-full w-full">
                      <Image
                        src={imgSrc}
                        alt={model.name}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                        className="object-contain transition-transform duration-500 group-hover:scale-105"
                        priority={index < 4}
                      />
                    </div>
                  </div>
                  <div className="mt-2 flex min-h-[82px] flex-1 items-center justify-center rounded-2xl border border-neutral-200/60 bg-gradient-to-b from-neutral-50 to-neutral-100/80 px-5 py-4 text-center transition-all duration-300 group-hover:border-transparent group-hover:from-[#D90822] group-hover:to-[#A80519]">
                    <span className="line-clamp-2 text-[15px] font-bold leading-snug tracking-tight text-neutral-800 transition-colors duration-300 group-hover:text-white xl:text-[16px]">
                      {model.name}
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      )}

      {descriptionData.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
          <DescriptionRenderer blocks={descriptionData} showHeader={false} />
        </section>
      )}
    </>
  );
}
