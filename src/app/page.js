import CoreValues from "@/sections/CoreValue";
import CustomersAndTestimonials from "@/sections/Customers";
import HeroSection from "@/sections/Hero";
import AboutSection from "@/sections/HomeAbout";
import HomeFaq, { homeFaqSchema } from "@/sections/HomeFaq";
import ProductsSection from "@/sections/HomeProducts";

import React from "react";

export const metadata = {
  title: "Faith Engineering Works | Blow Moulding Machine Manufacturer",
  description:
    "Faith Engineering Works is a trusted Blow Moulding Machine Manufacturer in Delhi since 2000, offering single-head, double-head and double-stage machines for 250 ml to 10 L bottles. Contact us today!",
  keywords: [
    "Faith Engineering Works",
    "Blow Moulding Machine Manufacturer",
    "Blow Moulding Machine Manufacturer in India",
  ],
  alternates: {
    canonical: "https://www.blowmouldmachinemanufacturer.com/",
  },
};

function page() {
  return (
    <>
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD schema
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(homeFaqSchema).replace(/</g, "\\u003c"),
        }}
      />
      <HeroSection />
      <AboutSection />
      <ProductsSection />
      <CoreValues />
      <CustomersAndTestimonials />
      <HomeFaq />
    </>
  );
}

export default page;
