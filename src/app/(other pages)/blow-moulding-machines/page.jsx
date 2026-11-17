import ProductDetailView from "@/components/ProductDetailView";

const product = {
  name: "1 Litre Triple Head Double Stage With De-Flashing (Model – FEW1000H)",
  images: ["/home/p4.webp"],
  data: {
    sideContent: [
      {
        type: "p",
        segments: [
          {
            text: "1 Litre Triple Head Double Stage With De-Flashing (Model – FEW1000H)",
            bold: true,
          },
          {
            text: " — a high-output blow moulding machine for containers up to 1 litre. Three heads produce three containers per cycle, two stations work alternately to keep production running, and de-flashing removes extra plastic automatically.",
          },
        ],
      },
    ],
    descriptionData: [
      { type: "h2", content: "Key Features" },
      {
        type: "list",
        items: [
          "Triple head — three containers in every cycle",
          "Double stage — two mould stations work alternately for continuous output",
          "Auto de-flashing — no manual trimming of excess plastic",
          "Capacity up to 1 litre",
          "Built in-house by Faith Engineering Works, Delhi",
        ],
      },
      {
        type: "p",
        segments: [
          {
            text: "Need specifications, mould options or pricing for the FEW1000H? ",
          },
          {
            type: "link",
            text: "Contact us",
            href: "/contact-us",
          },
          { text: " and our engineering team will share the details." },
        ],
      },
    ],
  },
};

export const metadata = {
  title:
    "1 Litre Triple Head Double Stage With De-Flashing (Model – FEW1000H) | Faith Engineering Works",
  description:
    "FEW1000H 1 litre triple head double stage blow moulding machine with auto de-flashing. Three containers per cycle. Built in-house in Delhi. Get a quote.",
  alternates: {
    canonical:
      "https://www.blowmouldmachinemanufacturer.com/blow-moulding-machines/",
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
