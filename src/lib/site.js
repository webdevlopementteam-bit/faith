// Single source of truth for the site URL and the page list used by
// sitemap.xml, robots.txt and llms.txt.

export const SITE_URL = "https://www.blowmouldmachinemanufacturer.com";

export const absoluteUrl = (path = "/") => `${SITE_URL}${path}`;

export const productPath = (product) =>
  `/products/${String(product?.slug || "").replace(/^\/+|\/+$/g, "")}/`;

export const company = {
  name: "Faith Engineering Works",
  summary:
    "Faith Engineering Works is a Delhi-based blow moulding machine manufacturer, exporter and supplier, building machines in-house since 2000.",
  phone: "+91 9871580960",
  emails: ["faithengineering4@gmail.com", "faithengineering39@yahoo.co.in"],
  addresses: [
    "Unit I: G-129, Sec.1, DSIIDC, Bawana Industrial Area, New Delhi-110039",
    "Unit II: Plot No-728, Khasra No-154, Near Beakon Public School, Pooth Khurd, Delhi-110039",
  ],
};

export const mainPages = [
  {
    path: "/",
    title: "Home",
    description:
      "Delhi-based blow moulding machine manufacturer since 2000. Single, double head & double stage machines, 250ml-10L.",
  },
  {
    path: "/about-us/",
    title: "About Us",
    description:
      "Company background, 25+ years of in-house engineering experience, mission and vision.",
  },
  {
    path: "/products/",
    title: "Products",
    description:
      "Full range of blow moulding machines — single, double & triple head models from 100ml to 10 litres capacity.",
  },
  {
    path: "/gallery/",
    title: "Gallery",
    description:
      "Photos of machines, the Delhi manufacturing facility and national & international exhibitions.",
  },
  {
    path: "/global-export/",
    title: "Global Export",
    description:
      "Worldwide export of blow moulding machines from Delhi, India.",
  },
  {
    path: "/contact-us/",
    title: "Contact Us",
    description:
      "Enquiries for pricing, support and custom blow moulding solutions.",
  },
  {
    path: "/blog/",
    title: "Blog",
    description: "Machinery articles and buying guides.",
  },
];

export const servicePages = [
  {
    path: "/blow-moulding-machine-manufacturer/",
    title: "Blow Moulding Machine Manufacturer",
    description:
      "Single, double & triple head and accumulator machines, 100ml-10L capacity.",
  },
  {
    path: "/hdpe-blow-moulding-machine/",
    title: "HDPE Blow Moulding Machine Manufacturer in Delhi",
    description: "Machines calibrated for HDPE, 250ml-10L.",
  },
  {
    path: "/plastic-blow-moulding-machine/",
    title: "Plastic Blow Moulding Machine",
  },
  {
    path: "/automatic-blow-moulding-machine/",
    title: "Automatic Blow Moulding Machine",
  },
  {
    path: "/blow-moulding-machines/",
    title:
      "1 Litre Triple Head Double Stage With De-Flashing (Model – FEW1000H)",
  },
  {
    path: "/blow-moulding-machine-manufacturer-in-delhi/",
    title: "Blow Moulding Machine Manufacturer in Delhi",
    description: "In-house manufacturing from Bawana Industrial Area, Delhi.",
  },
  {
    path: "/jharkhand/",
    title: "Blow Moulding Machine Manufacturer in Jharkhand",
    description: "Serving Ranchi, Jamshedpur & beyond.",
  },
  {
    path: "/blow-moulding-machine-manufacturer-in-telangana/",
    title: "Blow Moulding Machine Manufacturer in Telangana",
    description: "Serving Hyderabad & beyond.",
  },
  {
    path: "/blow-moulding-machine-manufacturer-in-uttar-pradesh/",
    title: "Blow Moulding Machine Manufacturer in Uttar Pradesh",
    description: "Serving Noida & Meerut with fast delivery.",
  },
  {
    path: "/hdpe-blow-moulding-machine-manufacturer-in-jharkhand/",
    title: "HDPE Blow Moulding Machine Manufacturer in Jharkhand",
    description: "Serving Ranchi, Jamshedpur & Dhanbad.",
  },
  {
    path: "/hdpe-blow-moulding-machine-manufacturer-in-punjab/",
    title: "HDPE Blow Moulding Machine Manufacturer in Punjab",
    description: "Serving Ludhiana, Jalandhar & Amritsar.",
  },
  {
    path: "/hdpe-blow-moulding-machine-manufacturer-in-telangana/",
    title: "HDPE Blow Moulding Machine Manufacturer in Telangana",
    description: "In-house built machines for Telangana.",
  },
  {
    path: "/hdpe-blow-moulding-machine-manufacturer-in-uttar-pradesh/",
    title: "HDPE Blow Moulding Machine Manufacturer in Uttar Pradesh",
    description: "Serving Noida & Meerut.",
  },
  {
    path: "/hdpe-blow-moulding-machine-manufacturer-in-uttarakhand/",
    title: "HDPE Blow Moulding Machine Manufacturer in Uttarakhand",
    description: "Serving Haridwar, Rudrapur & Dehradun.",
  },
];

export const blogPosts = [
  {
    path: "/blog/auto-deflashing-blow-moulding-machine-manufacturers-suppliers/",
    title: "Auto Deflashing Blow Moulding Machine Manufacturers & Suppliers",
    description:
      "Buyer's guide to auto deflashing machines — real specs, pricing and quality checks.",
  },
  {
    path: "/blog/accumulator-blow-moulding-machine-manufacturers-in-delhi-ncr/",
    title: "Best Accumulator Blow Moulding Machine Manufacturer in Delhi NCR",
    description:
      "Accumulator machines from 250ml–10L with price, specs & pan-India supply.",
  },
  {
    path: "/blog/automatic-blow-moulding-machine-manufacturer-guide/",
    title: "Automatic Blow Moulding Machine Manufacturer Complete Buying Guide",
    description:
      "A-to-Z buying guide for automatic blow moulding machines, 250ml–10L+.",
  },
  {
    path: "/blog/fully-automatic-blow-moulding-machine-price-in-delhi/",
    title: "Fully Automatic Blow Moulding Machine Price in Delhi",
    description:
      "How fully automatic machine prices in Delhi compare and what drives them.",
  },
  {
    path: "/blog/plastic-and-hdpe-blow-moulding-machine-manufacturer-guide/",
    title:
      "500ml Plastic & 200ml HDPE Blow Moulding Machine Manufacturer in Delhi",
    description:
      "200ml, 500ml & 2 Litre plastic and HDPE blow moulding machines.",
  },
  {
    path: "/blog/blow-moulding-machine-manufacturer-complete-guide/",
    title: "Top Blow Moulding Machine Manufacturer: Complete Guide",
    description:
      "Machine types and what to check before choosing a blow moulding machine manufacturer.",
  },
];
