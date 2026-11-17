import ProductDetailView from "@/components/ProductDetailView";

const product = {
  name: "Plastic Blow Moulding Machine",
  images: ["/home/p2.webp"],
  data: {
    sideContent: [
      {
        type: "p",
        segments: [
          { text: "Plastic Blow Moulding Machine", bold: true },
          {
            text: " — built in-house by Faith Engineering Works at our Delhi facility, where we have been manufacturing blow moulding machines since 2000. Machines are available in single head, double head and double stage configurations for bottles, jars, cans and containers from 250 ml to 10 litres.",
          },
        ],
      },
    ],
    descriptionData: [
      {
        type: "h2",
        content: "Plastic Blow Moulding Machines Built for Everyday Production",
      },
      {
        type: "p",
        segments: [
          {
            text: "A plastic blow moulding machine turns plastic granules into hollow containers. The plastic is melted, formed into a tube (parison), closed inside a mould and blown with air until it takes the shape of the mould. Once cooled, the finished container is released and the cycle starts again.",
          },
        ],
      },
      { type: "h3", content: "Materials" },
      {
        type: "list",
        items: [
          "HDPE (High-Density Polyethylene)",
          "PP (Polypropylene)",
          "LDPE (Low-Density Polyethylene)",
        ],
      },
      { type: "h3", content: "Common Applications" },
      {
        type: "list",
        items: [
          "Edible oil bottles and containers",
          "Chemical, detergent and lubricant containers",
          "Pharmaceutical and personal care bottles",
          "Jars, cans and general packaging containers",
        ],
      },
      { type: "h3", content: "Why Faith Engineering Works" },
      {
        type: "list",
        items: [
          "Manufacturing blow moulding machines since 2000",
          "Machines built in-house at Bawana Industrial Area, Delhi",
          "Custom capacity and mould design on request",
          "Supply across India and export worldwide",
        ],
      },
      {
        type: "p",
        segments: [
          { text: "For full specifications, see our " },
          {
            type: "link",
            text: "plastic blow moulding machine",
            href: "/products/plastic-blow-moulding-machine/",
          },
          { text: " product page, or " },
          {
            type: "link",
            text: "contact us",
            href: "/contact-us",
          },
          { text: " for a quotation." },
        ],
      },
    ],
  },
};

export const metadata = {
  title: "Plastic Blow Moulding Machine | Faith Engineering Works",
  description:
    "Plastic blow moulding machines built in-house in Delhi since 2000. Single head, double head & double stage models for 250ml–10L containers. Get a quote.",
  alternates: {
    canonical:
      "https://www.blowmouldmachinemanufacturer.com/plastic-blow-moulding-machine/",
  },
};

function page() {
  return (
    <div className="min-h-screen bg-white">
      <ProductDetailView product={product} />
    </div>
  );
}

export default page;
