import React from "react";
import About from "./About";

export const metadata = {
  title: "About | Faith Engineering Works",
  description:
    "Know about us Faith Engineering Works — a Delhi-based blow moulding machine manufacturer since 2000, built on 25+ years of in-house engineering experience.",
  keywords: ["About Faith Engineering Works", "Blow Moulding Machines"],

  alternates: {
    canonical: "https://www.blowmouldmachinemanufacturer.com/about-us/",
  },
};

function page() {
  return (
    <>
      <About />
    </>
  );
}

export default page;
