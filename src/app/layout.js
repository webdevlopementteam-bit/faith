import { Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppButton";
import EnquiryPopup from "@/components/EnquiryPopup";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata = {
  title: "Best Blow Moulding Machine Manufacturers | Faith Engineering Works",
  description:
    "Faith Engineering Works is a Delhi-based blow moulding machine manufacturer since 2000. Single, double head & double stage machines, 250ml-10L. Contact Us Today!",
  keywords: ["", ""],
  alternates: {
    canonical: "https://www.blowmouldmachinemanufacturer.com/",
  },
  icons: {
    icon: "/logo/logo.webp",
  },
  verification: {
    google: "hB7njTcGWC9wbtVp2nmb1mfm_zr_kxBndpIOIuQjSsw",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${poppins.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <Navbar />
        <main className="flex-1 pt-[68px] lg:pt-[67px]">{children}</main>
        <Footer />
        <WhatsAppFloat
          phoneNumber="919871580960"
          message="Hi! I have an inquiry regarding your products."
        />
        <EnquiryPopup />
      </body>
    </html>
  );
}
