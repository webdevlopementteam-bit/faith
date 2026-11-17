import ProductDetailView from "@/components/ProductDetailView";

const product = {
  name: "Automatic Blow Moulding Machine",
  images: ["/home/p3.webp"],
  data: {
    sideContent: [
      {
        type: "p",
        segments: [
          { text: "Automatic Blow Moulding Machine", bold: true },
          {
            text: " — runs the full production cycle with minimal manual work, from melting the plastic to releasing the finished container. Available in single, double and triple head models with auto de-flashing, for containers from 100 ml to 10 litres.",
          },
        ],
      },
    ],
    descriptionData: [
      {
        type: "h2",
        content: "Automatic Blow Moulding Machines for Consistent Output",
      },
      {
        type: "p",
        segments: [
          {
            text: "An automatic blow moulding machine handles every step of the cycle on its own. Because trimming and forming are automated, each container comes out the same — shift after shift — with less labour and less wastage than manual or semi-automatic machines.",
          },
        ],
      },
      { type: "h3", content: "How It Works" },
      {
        type: "list",
        ordered: true,
        items: [
          "Plastic granules are melted inside the extruder.",
          "The melted plastic is pushed out as a hollow tube (parison).",
          "The mould closes around the parison and air is blown in.",
          "The container cools and takes the exact shape of the mould.",
          "Extra plastic (flash) is trimmed automatically and the container is released.",
        ],
      },
      { type: "h3", content: "Benefits" },
      {
        type: "list",
        items: [
          "Fewer operators needed per shift",
          "Uniform container quality across every cycle",
          "Less material wastage from manual trimming",
          "Higher output with multi-head options",
        ],
      },
      {
        type: "p",
        segments: [
          { text: "For full specifications, see our " },
          {
            type: "link",
            text: "automatic blow moulding machine",
            href: "/products/automatic-blow-moulding-machine-manufacturer/",
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
  title: "Automatic Blow Moulding Machine | Faith Engineering Works",
  description:
    "Automatic blow moulding machines with auto de-flashing, single, double & triple head models for 100ml–10L containers. Built in-house in Delhi since 2000.",
  alternates: {
    canonical:
      "https://www.blowmouldmachinemanufacturer.com/automatic-blow-moulding-machine/",
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
