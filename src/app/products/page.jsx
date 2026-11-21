import React from "react";
import Products from "./Products";

export const metadata = {
  title: "Our Products | Blow Moulding Machines | Faith Engineering Works",
  description:
    "Browse Faith Engineering Works' full range of Our Products blow moulding machines — Single, Double & Triple Head models from 100ml to 10 litres capacity",
  keywords: [
    "Our Products Faith Engineering Works",
    "Buy Blow Moulding Machines",
  ],

  alternates: {
    canonical: "https://www.blowmouldmachinemanufacturer.com/products/",
  },
};

function page() {
  return (
    <>
      <Products />
    </>
  );
}

export default page;
