"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Mail, MessageSquare, Phone, Send, User, X } from "lucide-react";
import { z } from "zod";
import {
  markEnquirySubmitted,
  readPopupState,
  recordPopupClose,
  sendToWeb3Forms,
} from "@/lib/enquiry.js";
import { company } from "@/lib/site.js";

const FIRST_DELAY_MS = 8000;
const REPEAT_DELAY_MS = 15000;
const MAX_CLOSES = 2;

export const OPEN_ENQUIRY_EVENT = "open-enquiry-popup";

// Call from any button to open the enquiry popup.
export const openEnquiryPopup = () =>
  window.dispatchEvent(new Event(OPEN_ENQUIRY_EVENT));

// Pages that already have a form or confirm a submission.
const HIDDEN_ON = ["/contact-us", "/thank-you"];

const popupSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Please enter your name.")
    .max(80, "Name must be 80 characters or less."),
  mobile: z
    .string()
    .regex(/^\d{10}$/, "Please enter a 10-digit mobile number."),
  email: z
    .string()
    .trim()
    .email("Please enter a valid email address.")
    .or(z.literal("")),
  requirement: z
    .string()
    .trim()
    .max(1000, "Please keep it under 1000 characters."),
});

const initialForm = { name: "", mobile: "", email: "", requirement: "" };

const inputClass =
  "w-full rounded-xl border border-stone-200 bg-stone-50/70 py-3 pl-10 pr-3.5 text-[15px] text-stone-800 outline-none transition-all duration-200 placeholder:text-stone-400 hover:border-[#AF0020]/40 focus:border-[#AF0020] focus:bg-white focus:shadow-[0_0_0_4px_rgba(175,0,32,0.08)]";

export default function EnquiryPopup() {
  const pathname = usePathname();
  const router = useRouter();

  const [isDue, setIsDue] = useState(false);
  const [isDone, setIsDone] = useState(true);
  const [formData, setFormData] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const timerRef = useRef(null);
  const dialogRef = useRef(null);
  const botcheckRef = useRef(null);

  const schedule = useCallback((delay) => {
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setIsDue(true), delay);
  }, []);

  useEffect(() => {
    const { closeCount, submitted } = readPopupState();
    if (submitted || closeCount >= MAX_CLOSES) return;

    setIsDone(false);
    schedule(closeCount === 0 ? FIRST_DELAY_MS : REPEAT_DELAY_MS);

    return () => clearTimeout(timerRef.current);
  }, [schedule]);

  // Buttons (Enquiry Now, Get Quotation) open the popup on demand.
  const [isManualOpen, setIsManualOpen] = useState(false);

  useEffect(() => {
    const open = () => {
      clearTimeout(timerRef.current);
      setIsManualOpen(true);
    };
    window.addEventListener(OPEN_ENQUIRY_EVENT, open);
    return () => window.removeEventListener(OPEN_ENQUIRY_EVENT, open);
  }, []);

  const currentPath = (pathname || "/").replace(/\/+$/, "") || "/";

  // Re-check storage so an enquiry sent from the contact page also stops it.
  const isOpen =
    isManualOpen ||
    (isDue &&
      !isDone &&
      !HIDDEN_ON.includes(currentPath) &&
      !readPopupState().submitted);

  const handleClose = useCallback(() => {
    // A popup the visitor asked for doesn't count toward the auto-popup limit.
    if (isManualOpen) {
      setIsManualOpen(false);
      return;
    }

    setIsDue(false);

    const { closeCount } = recordPopupClose();

    if (closeCount >= MAX_CLOSES) {
      setIsDone(true);
      return;
    }

    schedule(REPEAT_DELAY_MS);
  }, [schedule, isManualOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") handleClose();
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);
    dialogRef.current?.focus({ preventScroll: true });

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, handleClose]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    const nextValue =
      name === "mobile" ? value.replace(/\D/g, "").slice(0, 10) : value;

    setFormData((current) => ({ ...current, [name]: nextValue }));
    setErrors((current) => ({ ...current, [name]: undefined }));
    setSubmitError("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Hidden honeypot field: only bots fill it in.
    if (botcheckRef.current?.checked) return;

    const result = popupSchema.safeParse(formData);

    if (!result.success) {
      const nextErrors = {};

      result.error.issues.forEach((issue) => {
        nextErrors[issue.path[0]] = issue.message;
      });

      setErrors(nextErrors);
      return;
    }

    const { name, mobile, email, requirement } = result.data;

    setErrors({});
    setSubmitError("");
    setSubmitting(true);

    try {
      await sendToWeb3Forms({
        subject: "New Enquiry from Website Popup",
        from_name: "Faith Engineering Website",
        name,
        email: email || undefined,
        message: `Mobile: +91${mobile}\nPage: ${window.location.href}\n\n${
          requirement || "No requirement details provided."
        }`,
      });

      markEnquirySubmitted();
      setIsManualOpen(false);
      setIsDone(true);

      sessionStorage.setItem("contactFormSubmitted", "true");
      router.push("/thank-you");
    } catch (error) {
      setSubmitError(
        error.message || "Something went wrong. Please try again.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  const errorText = (field) =>
    errors[field] ? (
      <p
        id={`popup-${field}-error`}
        className="mt-1.5 text-xs font-semibold text-red-600"
      >
        {errors[field]}
      </p>
    ) : null;

  const fieldProps = (field) => ({
    id: `popup-${field}`,
    name: field,
    value: formData[field],
    onChange: handleChange,
    "aria-invalid": Boolean(errors[field]),
    "aria-describedby": errors[field] ? `popup-${field}-error` : undefined,
  });

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="enquiry-popup"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[300] flex items-center justify-center p-4"
        >
          <button
            type="button"
            tabIndex={-1}
            aria-label="Close enquiry form"
            onClick={handleClose}
            className="absolute inset-0 cursor-default bg-black/55 backdrop-blur-[2px]"
          />

          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="enquiry-popup-title"
            tabIndex={-1}
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="relative max-h-[calc(100dvh-2rem)] w-full max-w-md overflow-y-auto rounded-2xl bg-white shadow-[0_25px_60px_rgba(65,0,15,0.3)] outline-none"
          >
            <div className="relative bg-gradient-to-r from-[#7D1A2A] via-[#8A1B2C] to-[#AE2720] px-6 pb-5 pt-6 text-white">
              <button
                type="button"
                onClick={handleClose}
                aria-label="Close enquiry form"
                className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full text-white/85 transition hover:bg-white/15 hover:text-white"
              >
                <X size={20} />
              </button>

              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#F8D5C5]">
                {company.name}
              </p>
              <h2
                id="enquiry-popup-title"
                className="mt-1.5 pr-8 text-2xl font-bold"
              >
                Get a Quotation
              </h2>
              <p className="mt-1 text-sm text-white/85">
                Share your requirement and our team will get back to you.
              </p>
            </div>

            <form
              onSubmit={handleSubmit}
              noValidate
              className="space-y-3.5 px-6 py-5"
            >
              <div>
                <label htmlFor="popup-name" className="sr-only">
                  Your name
                </label>
                <div className="relative">
                  <User
                    size={17}
                    className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400"
                  />
                  <input
                    {...fieldProps("name")}
                    type="text"
                    autoComplete="name"
                    placeholder="Your name *"
                    className={inputClass}
                  />
                </div>
                {errorText("name")}
              </div>

              <div>
                <label htmlFor="popup-mobile" className="sr-only">
                  Mobile number
                </label>
                <div className="relative">
                  <Phone
                    size={17}
                    className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400"
                  />
                  <input
                    {...fieldProps("mobile")}
                    type="tel"
                    inputMode="numeric"
                    autoComplete="tel-national"
                    placeholder="10-digit mobile number *"
                    className={inputClass}
                  />
                </div>
                {errorText("mobile")}
              </div>

              <div>
                <label htmlFor="popup-email" className="sr-only">
                  Email address
                </label>
                <div className="relative">
                  <Mail
                    size={17}
                    className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400"
                  />
                  <input
                    {...fieldProps("email")}
                    type="email"
                    autoComplete="email"
                    placeholder="Email address (optional)"
                    className={inputClass}
                  />
                </div>
                {errorText("email")}
              </div>

              <div>
                <label htmlFor="popup-requirement" className="sr-only">
                  Your requirement
                </label>
                <div className="relative">
                  <MessageSquare
                    size={17}
                    className="pointer-events-none absolute left-3.5 top-3.5 text-stone-400"
                  />
                  <textarea
                    {...fieldProps("requirement")}
                    rows={3}
                    placeholder="Machine / capacity required (optional)"
                    className={`${inputClass} resize-none`}
                  />
                </div>
                {errorText("requirement")}
              </div>

              <input
                ref={botcheckRef}
                type="checkbox"
                name="botcheck"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="hidden"
              />

              {submitError && (
                <p
                  role="alert"
                  className="rounded-lg bg-red-50 px-3 py-2 text-sm font-medium text-red-700"
                >
                  {submitError}
                </p>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#850019] to-[#D20B19] px-5 py-3.5 text-[15px] font-semibold text-white shadow-[0_8px_20px_-6px_rgba(176,0,32,0.5)] transition hover:shadow-[0_10px_24px_-6px_rgba(176,0,32,0.6)] active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-70"
              >
                <Send size={17} />
                {submitting ? "Sending..." : "Send Enquiry"}
              </button>

              <p className="text-center text-xs text-stone-500">
                Or call us at{" "}
                <a
                  href={`tel:${company.phone.replace(/\s/g, "")}`}
                  className="font-semibold text-[#A4001D] hover:underline"
                >
                  {company.phone}
                </a>
              </p>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
