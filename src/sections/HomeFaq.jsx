import React from "react";

export const homeFaqs = [
  {
    q: "Who is the best Blow Moulding Machine Manufacturer in India?",
    a: "Faith Engineering Works is a trusted Blow Moulding Machine Manufacturer established in 2000. The company manufactures single-head, double-head, triple-head, automatic and double-stage blow moulding machines for different industrial production requirements.",
  },
  {
    q: "What is a blow moulding machine used for?",
    a: "A blow moulding machine is used to manufacture hollow plastic products such as bottles, jars, cans and containers. It is commonly used in packaging, pharmaceutical, chemical, edible oil and FMCG industries.",
  },
  {
    q: "What is the price of a blow moulding machine in India?",
    a: "The price of a blow moulding machine depends on its capacity, automation level, number of heads, production speed and technical specifications. Contact Faith Engineering Works to get a quotation based on your production requirements.",
  },
  {
    q: "What types of blow moulding machines are available at Faith Engineering Works?",
    a: "Faith Engineering Works offers different types of machines, including automatic blow moulding machines, HDPE blow moulding machines, single-head machines, double-head machines, triple-head machines, accumulator-head machines and double-stage machines.",
  },
  {
    q: "What is the difference between single-head and double-head blow moulding machines?",
    a: "A single-head blow moulding machine produces one container per cycle, whereas a double-head machine can produce two containers simultaneously. Double-head machines are suitable for businesses requiring higher production output.",
  },
  {
    q: "What production capacity do blow moulding machines offer?",
    a: "Production capacity depends on the machine model, container size, mould design and number of heads. Faith Engineering Works offers machines for manufacturing plastic containers ranging from 250ml to 10 litres.",
  },
  {
    q: "Which raw materials are used in blow moulding machines?",
    a: "Common plastic materials used in extrusion blow moulding include HDPE, LDPE and PP. The suitable material depends on the product design, container application and machine compatibility.",
  },
  {
    q: "What industries use plastic blow moulding machines?",
    a: "Plastic blow moulding machines are widely used in packaging, pharmaceuticals, cosmetics, chemicals, edible oil, automotive and FMCG industries for manufacturing bottles, cans, jars and industrial containers.",
  },
  {
    q: "How do I choose the right blow moulding machine for my business?",
    a: "Choose a blow moulding machine based on your required container capacity, production volume, plastic material, automation level and mould design. You should also consider machine quality, maintenance requirements and after-sales technical support.",
  },
  {
    q: "Why choose Faith Engineering Works as your blow moulding machine manufacturer?",
    a: "Faith Engineering Works has been manufacturing blow moulding machines since 2000. The company offers multiple machine configurations, customized solutions, quality-focused manufacturing and technical support to meet different industrial production requirements.",
  },
];

export const homeFaqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: homeFaqs.map((faq) => ({
    "@type": "Question",
    name: faq.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.a,
    },
  })),
};

export default function HomeFaq() {
  return (
    <section className="w-full bg-white py-12 md:py-16 px-4 sm:px-6 lg:px-12">
      <div className="max-w-[1100px] mx-auto">
        <div className="text-center mb-8 md:mb-10">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-gray-900">
            Frequently Asked Questions
          </h2>
          <div className="w-36 h-[2px] bg-[#8A000C] mx-auto mt-3" />
        </div>

        <div className="space-y-3">
          {homeFaqs.map((faq, idx) => (
            <details
              key={faq.q}
              open={idx === 0}
              className="group rounded-[4px] border border-gray-200 bg-white shadow-sm open:border-[#8A000C]/40"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 [&::-webkit-details-marker]:hidden">
                <h3 className="font-semibold text-gray-900 text-base md:text-lg">
                  {idx + 1}. {faq.q}
                </h3>
                <span className="shrink-0 text-2xl leading-none text-[#8A000C] transition-transform duration-300 group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="px-5 pb-5 text-gray-700 leading-relaxed">
                {faq.a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
