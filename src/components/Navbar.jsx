"use client";

import { useState, useMemo, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  Search,
  X,
  Menu,
  ArrowUpRight,
  PackageSearch,
  ArrowRight,
  Sparkles,
} from "lucide-react";

import { catalogProducts } from "@/lib/data.js";

const navLinks = [
  { name: "HOME", href: "/" },
  { name: "ABOUT US", href: "/about-us" },
  { name: "PRODUCTS", href: "/products", hasDropdown: true },
  { name: "GALLERY", href: "/gallery" },
  { name: "GLOBAL EXPORT", href: "/global-export" },
  { name: "CONTACT US", href: "/contact-us" },
  { name: "BLOG", href: "/blog" },
];

// 40 products ke common manufacturing attributes
const STATIC_FILTER_TAGS = [
  { label: "All", value: "ALL" },
  { label: "Auto Deflashing", value: "deflashing" },
  { label: "Single Head", value: "single head" },
  { label: "Double Head", value: "double head" },
  { label: "Triple Head", value: "triple head" },
  {
    label: "Small (≤ 1L)",
    value: "100ml|200ml|250ml|500ml|1000ml|1 litre|1 ltr",
  },
  {
    label: "Large (2L - 10L)",
    value: "2 litre|3 litre|5 litre|10 litre|5 ltr|10 ltr",
  },
];

function getProductHref(product) {
  if (!product?.slug) return "/products";
  const cleanSlug = product.slug.startsWith("/")
    ? product.slug
    : `/${product.slug}`;
  return `/products${cleanSlug}`;
}

function getProductImage(product) {
  if (Array.isArray(product?.images) && product.images.length > 0) {
    return product.images[0];
  }
  return product?.image || product?.path || null;
}

function SearchBox({
  mobile = false,
  searchQuery,
  setSearchQuery,
  activeTag,
  setActiveTag,
  isSearchFocused,
  setIsSearchFocused,
  filteredProducts,
  desktopSearchRef,
  mobileSearchRef,
  handleLinkClick,
}) {
  const searchRef = mobile ? mobileSearchRef : desktopSearchRef;
  const query = searchQuery.trim();
  const showResults =
    isSearchFocused && (query.length > 0 || activeTag !== "ALL");
  const hasResults = filteredProducts.length > 0;

  // Dropdown mein max 8 dikhayenge taaki UI fast aur clean rahe
  const visibleProducts = useMemo(() => {
    return filteredProducts.slice(0, 8);
  }, [filteredProducts]);

  const clearSearch = () => {
    setSearchQuery("");
    setActiveTag("ALL");
    setIsSearchFocused(true);

    requestAnimationFrame(() => {
      searchRef.current?.querySelector("input")?.focus();
    });
  };

  return (
    <div
      ref={searchRef}
      className={
        mobile
          ? "relative z-30 w-full lg:hidden"
          : "relative z-30 w-full shrink-0"
      }
    >
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setIsSearchFocused(true);
        }}
        className={`group relative z-10 flex items-center gap-2 rounded-2xl border p-1.5 transition-all duration-300 ${
          mobile
            ? "h-[48px] border-red-100/80 bg-white shadow-[0_5px_18px_rgba(132,0,25,0.10)] focus-within:border-[#B00020] focus-within:shadow-[0_0_0_4px_rgba(176,0,32,0.09),0_8px_24px_rgba(132,0,25,0.12)]"
            : "h-[42px] border-white/25 bg-white/10 shadow-[0_3px_12px_rgba(0,0,0,0.08)] focus-within:border-white/70 focus-within:bg-white/20 focus-within:shadow-[0_0_0_3px_rgba(255,255,255,0.10)]"
        }`}
      >
        <span
          className={`ml-2 flex shrink-0 items-center justify-center transition-transform duration-300 group-focus-within:scale-110 ${
            mobile ? "text-[#A4001D]" : "text-white"
          }`}
        >
          <Search size={19} strokeWidth={2.3} />
        </span>

        <input
          type="text"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setIsSearchFocused(true);
          }}
          onFocus={() => setIsSearchFocused(true)}
          placeholder={
            mobile ? "Search machines, models..." : "Model, 100ml, head..."
          }
          aria-label="Search machines"
          aria-expanded={showResults}
          aria-autocomplete="list"
          autoComplete="off"
          spellCheck={false}
          className={`h-full min-w-0 flex-1 bg-transparent text-xs font-medium outline-none ${
            mobile
              ? "text-gray-900 placeholder:text-gray-400"
              : "text-white placeholder:text-white/75"
          }`}
        />

        {(searchQuery.length > 0 || activeTag !== "ALL") && (
          <button
            type="button"
            onMouseDown={(e) => e.preventDefault()}
            onClick={clearSearch}
            aria-label="Clear search"
            className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg transition ${
              mobile
                ? "text-gray-500 hover:bg-red-50 hover:text-[#A4001D]"
                : "text-white/80 hover:bg-white/15 hover:text-white"
            }`}
          >
            <X size={15} />
          </button>
        )}

        <button
          type="submit"
          aria-label="Search"
          className={`flex h-8 w-9 shrink-0 items-center justify-center rounded-xl transition-all duration-300 active:scale-90 ${
            mobile
              ? "bg-gradient-to-br from-[#850019] via-[#B00020] to-[#D20B19] text-white shadow-[0_3px_8px_rgba(176,0,32,0.25)] hover:shadow-[0_5px_14px_rgba(176,0,32,0.35)]"
              : "bg-white/15 text-white shadow-sm hover:bg-white/25 hover:shadow-md"
          }`}
        >
          <ArrowRight size={17} />
        </button>
      </form>

      {showResults && (
        <div
          className={`absolute z-[120] flex flex-col overflow-hidden rounded-[20px] border border-gray-100 bg-white text-gray-900 shadow-[0_20px_55px_rgba(65,0,15,0.20)] ${
            mobile
              ? "inset-x-0 bottom-full mb-2 max-h-[min(62dvh,500px)]"
              : "right-0 top-[calc(100%+12px)] w-[min(420px,calc(100vw-24px))]"
          }`}
        >
          {/* Results Header + Quick Dynamic Filters */}
          <div className="shrink-0 border-b border-red-50 bg-gradient-to-br from-[#FFF7F7] via-white to-[#FFF0F1] px-3.5 py-3">
            <div className="flex items-center justify-between gap-3">
              <div className="flex min-w-0 items-center gap-2.5">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#850019] to-[#D20B19] text-white shadow-sm">
                  <PackageSearch size={18} />
                </div>

                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <p className="text-[12px] font-extrabold text-gray-900">
                      Machine Directory
                    </p>
                    <Sparkles size={12} className="shrink-0 text-[#B00020]" />
                  </div>
                  <p className="truncate text-[10px] text-gray-500">
                    {hasResults
                      ? `Showing ${visibleProducts.length} of ${filteredProducts.length} machines`
                      : "No machines found"}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => setIsSearchFocused(false)}
                aria-label="Close"
                className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-gray-100 bg-white text-gray-500 transition hover:bg-red-50 hover:text-[#A4001D]"
              >
                <X size={15} />
              </button>
            </div>

            {/* Quick Filter Tags */}
            <div className="mt-2.5 flex items-center gap-1.5 overflow-x-auto pb-0.5 scrollbar-none">
              {STATIC_FILTER_TAGS.map((tag) => {
                const isSelected = activeTag === tag.value;
                return (
                  <button
                    key={tag.label}
                    type="button"
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => setActiveTag(tag.value)}
                    className={`shrink-0 rounded-lg px-2.5 py-1 text-[10px] font-bold transition-all duration-150 ${
                      isSelected
                        ? "bg-[#A4001D] text-white shadow-sm"
                        : "border border-gray-200/80 bg-white text-gray-600 hover:border-red-200 hover:text-[#A4001D]"
                    }`}
                  >
                    {tag.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Results List */}
          {hasResults ? (
            <div className="min-h-0 max-h-[min(48dvh,340px)] flex-1 space-y-2 overflow-y-auto overscroll-contain p-2.5 sm:p-3">
              {visibleProducts.map((product) => {
                const imageSrc = getProductImage(product);

                return (
                  <Link
                    key={product.slug}
                    href={getProductHref(product)}
                    onClick={handleLinkClick}
                    className="group flex items-center gap-3 rounded-2xl border border-gray-100 bg-white p-2.5 transition duration-200 hover:border-red-100 hover:bg-[#FFF8F8] hover:shadow-sm"
                  >
                    <div className="relative flex h-[52px] w-[52px] shrink-0 items-center justify-center overflow-hidden rounded-xl border border-gray-100 bg-gray-50 sm:h-[58px] sm:w-[58px]">
                      {imageSrc ? (
                        <Image
                          src={imageSrc}
                          alt={product.name}
                          fill
                          sizes="58px"
                          className="object-contain p-1 transition-transform duration-300 group-hover:scale-110"
                        />
                      ) : (
                        <PackageSearch
                          size={22}
                          className="text-[#A4001D]/50"
                        />
                      )}
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="line-clamp-2 text-[11px] font-extrabold leading-4 text-gray-800 group-hover:text-[#A4001D]">
                        {product.name}
                      </p>
                      {product.category && (
                        <span className="mt-0.5 inline-block text-[9px] font-semibold text-gray-400">
                          {product.category}
                        </span>
                      )}
                    </div>

                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-xl bg-gray-50 text-gray-400 transition group-hover:bg-[#A4001D] group-hover:text-white">
                      <ArrowUpRight size={15} />
                    </div>
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className="px-5 py-7 text-center">
              <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-2xl bg-red-50 text-[#A4001D]/60">
                <PackageSearch size={25} />
              </div>
              <p className="mt-2.5 text-xs font-bold text-gray-800">
                No matching machine found
              </p>
              <p className="mt-1 text-[11px] text-gray-500">
                Try searching by capacity (e.g., &quot;1 Litre&quot;) or model.
              </p>
            </div>
          )}

          {/* Explore Catalog Link */}
          <div className="shrink-0 border-t border-gray-100 bg-gray-50/95 p-2 sm:p-2.5">
            <Link
              href="/products"
              onClick={handleLinkClick}
              className="flex items-center justify-between gap-3 rounded-xl bg-gradient-to-r from-[#850019] to-[#D20B19] px-3.5 py-2.5 text-[11px] font-bold text-white shadow-sm transition hover:shadow-md"
            >
              <span>Explore All Machines</span>
              <span className="flex items-center gap-1.5">
                View Catalog
                <ArrowRight size={14} />
              </span>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default function Navbar() {
  const pathname = usePathname();

  const [searchQuery, setSearchQuery] = useState("");
  const [activeTag, setActiveTag] = useState("ALL");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isProductHovered, setIsProductHovered] = useState(false);
  const [isDesktopSearchOpen, setIsDesktopSearchOpen] = useState(false);

  const desktopSearchRef = useRef(null);
  const mobileSearchRef = useRef(null);
  const desktopSearchWrapRef = useRef(null);

  const isActiveLink = useCallback(
    (href) => {
      if (href === "/") return pathname === "/";
      return pathname === href || pathname.startsWith(`${href}/`);
    },
    [pathname],
  );

  // 1. Static site optimization: 40 products ke text ko pehle se flat index banana (zero-lag on typing)
  const indexedProducts = useMemo(() => {
    return catalogProducts.map((p) => {
      const name = p.name?.toLowerCase() || "";
      const category = p.category?.toLowerCase() || "";
      const keywords = (p.seo?.keywords || [])
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      const specDetails = (p.data?.sideContent || [])
        .flatMap((block) => {
          if (block.type === "p") {
            return block.segments?.map((s) => s.text) || [];
          }
          if (block.type === "table") {
            return block.rows?.flat() || [];
          }
          return [];
        })
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return {
        ...p,
        _searchIndex: `${name} ${category} ${keywords} ${specDetails}`,
      };
    });
  }, []);

  // 2. High-performance multi-term filter logic
  const filteredProducts = useMemo(() => {
    const rawQuery = searchQuery.trim().toLowerCase();
    const hasActiveTag = activeTag !== "ALL";

    if (!rawQuery && !hasActiveTag) return [];

    const queryTokens = rawQuery.split(/\s+/).filter(Boolean);

    return indexedProducts.filter((product) => {
      const targetText = product._searchIndex;

      // Tag match (supports regex or exact words)
      if (hasActiveTag) {
        const regex = new RegExp(activeTag, "i");
        if (!regex.test(targetText)) return false;
      }

      // Input query match (har ek typed word present hona chahiye)
      if (queryTokens.length > 0) {
        return queryTokens.every((token) => targetText.includes(token));
      }

      return true;
    });
  }, [searchQuery, activeTag, indexedProducts]);

  const handleLinkClick = useCallback(() => {
    setIsMenuOpen(false);
    setIsSearchFocused(false);
    setIsProductHovered(false);
  }, []);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      const insideDesktop = desktopSearchRef.current?.contains(event.target);
      const insideMobile = mobileSearchRef.current?.contains(event.target);

      if (!insideDesktop && !insideMobile) {
        setIsSearchFocused(false);
      }

      if (!desktopSearchWrapRef.current?.contains(event.target)) {
        setIsDesktopSearchOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("touchstart", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("touchstart", handleOutsideClick);
    };
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
    setIsSearchFocused(false);
    setIsProductHovered(false);
    setIsDesktopSearchOpen(false);
  }, [pathname]);

  const searchProps = {
    searchQuery,
    setSearchQuery,
    activeTag,
    setActiveTag,
    isSearchFocused,
    setIsSearchFocused,
    filteredProducts,
    desktopSearchRef,
    mobileSearchRef,
    handleLinkClick,
  };

  return (
    <header className="fixed inset-x-0 top-0 z-[100] w-full bg-white shadow-[0_4px_20px_rgba(80,0,15,0.08)] lg:bg-transparent lg:shadow-none">
      {/* Desktop: floating red bar with white logo panel */}
      <div className="relative mx-auto hidden h-[67px] w-[91%] lg:block">
        <div className="absolute inset-x-0 top-0 h-[57px] rounded-b-[14px] bg-gradient-to-r from-[#7D1A2A] via-[#8A1B2C] to-[#AE2720] shadow-[0_6px_18px_rgba(80,0,15,0.18)]" />

        {/* White strip along the top edge */}
        <div className="absolute left-[24px] right-0 top-0 h-[10.5px] bg-white" />

        {/* White logo panel with curved edge */}
        <svg
          className="pointer-events-none absolute left-[24px] top-0 h-[67px] w-[clamp(200px,20.4vw,300px)] drop-shadow-[0_4px_8px_rgba(80,0,15,0.12)]"
          viewBox="0 0 300 64"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            d="M0 0 H300 V10.5 H292 C278 10.5 268 14 256 23 C241 35 233 45 222 51 C208 59 199 64 180 64 H15 Q0 64 0 49 Z"
            fill="#FFFFFF"
          />
        </svg>

        <Link
          href="/"
          aria-label="Go to homepage"
          onClick={handleLinkClick}
          className="absolute left-[clamp(58px,6.05vw,89px)] top-[2px] z-10 h-[72px] w-[72px] transition-transform duration-300 hover:scale-105"
        >
          <Image
            src="/logo/logo.webp"
            alt="Company Logo"
            width={72}
            height={72}
            priority
            className="h-full w-full object-contain"
          />
        </Link>

        {/* Nav links, search and enquiry */}
        <div className="absolute right-[clamp(20px,4.5vw,66px)] top-[15px] left-[calc(clamp(200px,20.4vw,300px)+15px)] z-10 flex h-[44px] items-center justify-between gap-6">
          <nav className="flex min-w-0 max-w-[740px] flex-1 items-center justify-between gap-2">
            {navLinks.map((link) => {
              const active = isActiveLink(link.href);

              if (link.hasDropdown) {
                return (
                  <div
                    key={link.href}
                    className="relative flex items-center py-3"
                    onMouseEnter={() => setIsProductHovered(true)}
                    onMouseLeave={() => setIsProductHovered(false)}
                  >
                    <Link
                      href={link.href}
                      onClick={handleLinkClick}
                      aria-current={active ? "page" : undefined}
                      className={`group relative flex items-center whitespace-nowrap py-1 text-[clamp(11px,1.02vw,15px)] font-medium leading-none tracking-[0.01em] transition-colors duration-300 ${
                        active
                          ? "text-[#F8D5C5]"
                          : "text-white hover:text-[#F8D5C5]"
                      }`}
                    >
                      {link.name}
                      <span
                        className={`absolute bottom-[1px] left-0 h-[2px] bg-[#F8D5C5] transition-all duration-300 ${
                          active ? "w-full" : "w-0 group-hover:w-full"
                        }`}
                      />
                    </Link>

                    {/* Mega Dropdown for Products */}
                    {isProductHovered && (
                      <div className="absolute left-1/2 top-full z-[150] w-[min(1200px,92vw)] -translate-x-1/2 overflow-hidden rounded-2xl border border-gray-100 bg-white text-gray-900 shadow-[0_25px_60px_rgba(65,0,15,0.22)]">
                        <div className="flex items-center justify-between border-b border-red-50 bg-gradient-to-r from-[#FFF5F5] via-white to-[#FFF5F5] px-5 py-3">
                          <div className="flex items-center gap-2">
                            <PackageSearch
                              size={18}
                              className="text-[#B00020]"
                            />
                            <span className="text-xs font-extrabold uppercase tracking-wider text-gray-900">
                              All Blow Moulding Machines
                            </span>
                          </div>
                          <Link
                            href="/products"
                            onClick={handleLinkClick}
                            className="flex items-center gap-1 text-[11px] font-bold text-[#A4001D] hover:underline"
                          >
                            View Entire Catalog
                            <ArrowRight size={13} />
                          </Link>
                        </div>

                        <div className="max-h-[62vh] overflow-y-auto overscroll-contain p-4">
                          <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                            {catalogProducts.map((product) => {
                              const imgSrc = getProductImage(product);
                              return (
                                <Link
                                  key={product.slug}
                                  href={getProductHref(product)}
                                  onClick={handleLinkClick}
                                  className="group flex items-center gap-2.5 rounded-xl border border-gray-100 bg-gray-50/50 p-2 transition-all duration-200 hover:border-red-100 hover:bg-[#FFF8F8] hover:shadow-sm"
                                >
                                  <div className="relative flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-gray-200/80 bg-white p-1">
                                    {imgSrc ? (
                                      <Image
                                        src={imgSrc}
                                        alt={product.name}
                                        fill
                                        sizes="48px"
                                        className="object-contain transition-transform duration-300 group-hover:scale-110"
                                      />
                                    ) : (
                                      <PackageSearch
                                        size={20}
                                        className="text-[#A4001D]/40"
                                      />
                                    )}
                                  </div>
                                  <div className="min-w-0 flex-1">
                                    <p className="line-clamp-2 text-[11px] font-bold leading-4 text-gray-800 transition-colors group-hover:text-[#A4001D]">
                                      {product.name}
                                    </p>
                                  </div>
                                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-white text-gray-400 transition group-hover:bg-[#A4001D] group-hover:text-white">
                                    <ArrowUpRight size={14} />
                                  </div>
                                </Link>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={handleLinkClick}
                  aria-current={active ? "page" : undefined}
                  className={`group relative whitespace-nowrap py-1 text-[clamp(11px,1.02vw,15px)] font-medium leading-none tracking-[0.01em] transition-colors duration-300 ${
                    active
                      ? "text-[#F8D5C5]"
                      : "text-white hover:text-[#F8D5C5]"
                  }`}
                >
                  {link.name}

                  <span
                    className={`absolute bottom-[1px] left-0 h-[2px] bg-[#F8D5C5] transition-all duration-300 ${
                      active ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </Link>
              );
            })}
          </nav>

          <div className="flex shrink-0 items-center gap-4">
            <div ref={desktopSearchWrapRef} className="relative">
              <button
                type="button"
                onClick={() => {
                  setIsDesktopSearchOpen((open) => !open);
                  requestAnimationFrame(() => {
                    desktopSearchRef.current?.querySelector("input")?.focus();
                  });
                }}
                aria-label={
                  isDesktopSearchOpen ? "Close search" : "Open search"
                }
                aria-expanded={isDesktopSearchOpen}
                className="flex h-9 w-9 items-center justify-center rounded-full text-white transition-colors hover:bg-white/10 hover:text-[#F8D5C5]"
              >
                {isDesktopSearchOpen ? (
                  <X size={20} strokeWidth={2} />
                ) : (
                  <Search size={20} strokeWidth={2} />
                )}
              </button>

              {isDesktopSearchOpen && (
                <div className="absolute right-0 top-[calc(100%+12px)] z-[140] w-[300px] rounded-2xl bg-gradient-to-r from-[#7D1A2A] to-[#AE2720] p-2 shadow-[0_15px_40px_rgba(65,0,15,0.25)]">
                  <SearchBox {...searchProps} />
                </div>
              )}
            </div>

            <Link
              href="/contact-us"
              onClick={handleLinkClick}
              className="flex h-[34px] items-center whitespace-nowrap rounded-[5px] bg-[#EBC4C6] px-[clamp(12px,1.36vw,20px)] text-[clamp(11px,1.02vw,15px)] font-medium tracking-[0.01em] text-[#1A1A1A] transition-colors hover:bg-white"
            >
              ENQUIRY NOW
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile / tablet bar */}
      <div className="mx-auto w-full px-3 sm:px-5 lg:hidden">
        <div className="relative flex h-[68px] items-center">
          <Link
            href="/"
            aria-label="Go to homepage"
            onClick={handleLinkClick}
            className="relative z-10 flex h-[54px] w-[54px] shrink-0 items-center justify-center"
          >
            <Image
              src="/logo/logo.webp"
              alt="Company Logo"
              width={54}
              height={54}
              priority
              className="h-full w-full object-contain"
            />
          </Link>

          {/* Mobile Hamburger */}
          <div className="ml-auto flex shrink-0 items-center lg:hidden">
            <button
              type="button"
              onClick={() => {
                setIsMenuOpen((prev) => !prev);
                setIsSearchFocused(false);
              }}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMenuOpen}
              className={`flex h-11 w-11 items-center justify-center rounded-xl border transition-all duration-300 active:scale-95 ${
                isMenuOpen
                  ? "border-[#A4001D] bg-[#A4001D] text-white"
                  : "border-red-100 bg-white text-[#A4001D] shadow-sm hover:bg-red-50"
              }`}
            >
              {isMenuOpen ? <X size={23} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        <div
          className={`grid transition-[grid-template-rows,opacity] duration-300 ease-in-out lg:hidden ${
            isMenuOpen
              ? "grid-rows-[1fr] opacity-100"
              : "grid-rows-[0fr] opacity-0"
          }`}
          aria-hidden={!isMenuOpen}
          inert={!isMenuOpen}
        >
          <div className="min-h-0 overflow-hidden">
            <div className="mb-3 mt-2 rounded-2xl border border-red-100 bg-white p-3 shadow-[0_8px_25px_rgba(100,0,15,0.10)]">
              <nav className="space-y-1">
                {navLinks.map((link) => {
                  const active = isActiveLink(link.href);

                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={handleLinkClick}
                      tabIndex={isMenuOpen ? 0 : -1}
                      aria-current={active ? "page" : undefined}
                      className={`group flex items-center justify-between rounded-xl border border-transparent px-4 py-3 text-[13px] font-bold tracking-wide transition-colors ${
                        active
                          ? "border-red-100 bg-red-50 text-[#A4001D]"
                          : "text-gray-800 hover:bg-red-50 hover:text-[#A4001D]"
                      }`}
                    >
                      {link.name}

                      <ArrowUpRight
                        size={17}
                        className={`transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 ${
                          active ? "text-[#A4001D]" : "text-[#A4001D]/60"
                        }`}
                      />
                    </Link>
                  );
                })}
              </nav>

              <div className="mt-3 border-t border-red-50 pt-3">
                <SearchBox mobile {...searchProps} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="h-px w-full bg-gradient-to-r from-transparent via-[#EAB7BB]/60 to-transparent lg:hidden" />
    </header>
  );
}
