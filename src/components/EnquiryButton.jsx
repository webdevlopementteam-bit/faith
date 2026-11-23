"use client";

import { openEnquiryPopup } from "@/components/EnquiryPopup";

// Button that opens the site-wide enquiry popup instead of the contact page.
export default function EnquiryButton({ className, children, onClick }) {
  return (
    <button
      type="button"
      onClick={(event) => {
        onClick?.(event);
        openEnquiryPopup();
      }}
      className={`cursor-pointer ${className || ""}`}
    >
      {children}
    </button>
  );
}
