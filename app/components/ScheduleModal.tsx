"use client";

import Script from "next/script";
import { useEffect, useRef, useState } from "react";
import {
  CALENDLY_URL,
  SCHEDULE_FORMSPREE_ACTION,
  submitFormspreeForm,
} from "../lib/config";

type ScheduleModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

declare global {
  interface Window {
    Calendly?: {
      initInlineWidget: (options: {
        url: string;
        parentElement: HTMLElement;
      }) => void;
    };
  }
}

export default function ScheduleModal({ isOpen, onClose }: ScheduleModalProps) {
  const calendlyRef = useRef<HTMLDivElement>(null);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [calendlyReady, setCalendlyReady] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      setSubmitted(false);
      setHasError(false);
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleEscape);
    }
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen || !calendlyReady || !calendlyRef.current) return;

    calendlyRef.current.innerHTML = "";
    window.Calendly?.initInlineWidget({
      url: CALENDLY_URL,
      parentElement: calendlyRef.current,
    });
  }, [isOpen, calendlyReady]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setHasError(false);

    try {
      await submitFormspreeForm(SCHEDULE_FORMSPREE_ACTION, e.currentTarget);
      setSubmitted(true);
      e.currentTarget.reset();
    } catch {
      setHasError(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Script
        src="https://assets.calendly.com/assets/external/widget.js"
        onLoad={() => setCalendlyReady(true)}
      />

      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
        role="dialog"
        aria-modal="true"
        aria-labelledby="schedule-modal-title"
      >
        <button
          type="button"
          className="absolute inset-0 bg-foreground/40 transition-opacity duration-500"
          onClick={onClose}
          aria-label="Close schedule modal"
        />

        <div className="relative z-10 max-h-[90vh] w-full max-w-3xl overflow-y-auto border border-border bg-surface shadow-none">
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center text-foreground/60 transition-colors duration-500 hover:text-foreground"
            aria-label="Close"
          >
            <span className="text-2xl leading-none">&times;</span>
          </button>

          <div className="p-8 md:p-12">
            <h2
              id="schedule-modal-title"
              className="font-serif text-3xl text-foreground md:text-4xl"
            >
              Schedule a Consultation
            </h2>
            <div className="mt-2 h-px w-12 bg-accent" />
            <p className="mt-4 text-base leading-relaxed text-foreground/70">
              Share your project details below, then choose a time that works
              for you. We&apos;ll be in touch to confirm your appointment.
            </p>

            <div className="mt-8 space-y-6">
              {submitted ? (
                <p className="text-base leading-relaxed text-foreground/80">
                  Thank you — your project details have been sent. Choose a time
                  below to complete your booking.
                </p>
              ) : (
                <form
                  action={SCHEDULE_FORMSPREE_ACTION}
                  method="POST"
                  onSubmit={handleSubmit}
                  className="space-y-6"
                >
                  {/* TODO: Replace SCHEDULE_FORMSPREE_ACTION in app/lib/config.ts */}
                  <div>
                    <label
                      htmlFor="schedule-comments"
                      className="mb-1.5 block text-sm tracking-wide text-foreground/60"
                    >
                      Comments &amp; Project Details
                    </label>
                    <textarea
                      id="schedule-comments"
                      name="comments"
                      rows={4}
                      placeholder="Tell us about your project — room type, style, budget, timeline, etc."
                      className="w-full resize-y border border-border bg-background px-4 py-2.5 text-foreground placeholder:text-foreground/40 outline-none transition-colors duration-500 focus:border-accent"
                    />
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="schedule-name"
                        className="mb-1.5 block text-sm tracking-wide text-foreground/60"
                      >
                        Name
                      </label>
                      <input
                        id="schedule-name"
                        name="name"
                        type="text"
                        required
                        className="w-full border border-border bg-background px-4 py-2.5 text-foreground outline-none transition-colors duration-500 focus:border-accent"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="schedule-phone"
                        className="mb-1.5 block text-sm tracking-wide text-foreground/60"
                      >
                        Phone
                      </label>
                      <input
                        id="schedule-phone"
                        name="phone"
                        type="tel"
                        required
                        className="w-full border border-border bg-background px-4 py-2.5 text-foreground outline-none transition-colors duration-500 focus:border-accent"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="schedule-email"
                      className="mb-1.5 block text-sm tracking-wide text-foreground/60"
                    >
                      Email
                    </label>
                    <input
                      id="schedule-email"
                      name="email"
                      type="email"
                      required
                      className="w-full border border-border bg-background px-4 py-2.5 text-foreground outline-none transition-colors duration-500 focus:border-accent"
                    />
                  </div>

                  {hasError && (
                    <p className="text-sm text-accent">
                      Something went wrong. Please try again.
                    </p>
                  )}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full border border-accent bg-accent px-8 py-3.5 text-sm tracking-[0.15em] text-background uppercase transition-colors duration-500 hover:bg-transparent hover:text-accent disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
                  >
                    {isSubmitting ? "Sending…" : "Submit Request"}
                  </button>
                </form>
              )}

              <div className="border-t border-border pt-6">
                <h3 className="mb-4 text-sm tracking-[0.2em] text-foreground/50 uppercase">
                  Select a Time
                </h3>
                {/* TODO: Replace CALENDLY_URL in app/lib/config.ts with your real scheduling link */}
                <div
                  ref={calendlyRef}
                  className="border border-border bg-background"
                  style={{ minWidth: "320px", height: "650px" }}
                >
                  {!calendlyReady && (
                    <div className="flex h-full items-center justify-center text-sm text-foreground/50">
                      Loading calendar…
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
