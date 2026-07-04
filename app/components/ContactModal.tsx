"use client";

import { useEffect, useState } from "react";
import BusinessName from "./BusinessName";
import {
  CONTACT_FORMSPREE_ACTION,
  submitFormspreeForm,
} from "../lib/config";

type ContactModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasError, setHasError] = useState(false);

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

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setHasError(false);

    try {
      await submitFormspreeForm(CONTACT_FORMSPREE_ACTION, e.currentTarget);
      setSubmitted(true);
      e.currentTarget.reset();
    } catch {
      setHasError(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
      role="dialog"
      aria-modal="true"
      aria-labelledby="contact-modal-title"
    >
      <button
        type="button"
        className="absolute inset-0 bg-foreground/40 transition-opacity duration-500"
        onClick={onClose}
        aria-label="Close contact modal"
      />

      <div className="relative z-10 max-h-[90vh] w-full max-w-2xl overflow-y-auto border border-border bg-surface shadow-none">
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
            id="contact-modal-title"
            className="font-serif text-3xl text-foreground md:text-4xl"
          >
            Contact Us
          </h2>
          <div className="mt-2 h-px w-12 bg-accent" />

          <div className="mt-8 space-y-6">
            <div>
              <h3 className="mb-3 text-sm tracking-[0.2em] text-foreground/50 uppercase">
                About Us
              </h3>
              <p className="text-base leading-relaxed text-foreground/80">
                <BusinessName /> is a boutique interior design studio devoted
                to creating spaces that feel collected over time, not assembled
                overnight. We work closely with homeowners and design students
                alike, blending classical proportion with contemporary comfort.
                Every project begins with listening — to the light, the
                architecture, and the way you move through your home.
              </p>
            </div>

            <div className="border-t border-border pt-6">
              <h3 className="mb-3 text-sm tracking-[0.2em] text-foreground/50 uppercase">
                Get in Touch
              </h3>
              <div className="space-y-1 text-foreground/80">
                <p>
                  <span className="text-foreground/50">Phone:</span>{" "}
                  208-922-8104
                </p>
                <p>
                  <span className="text-foreground/50">Email:</span>{" "}
                  <a
                    href="mailto:florakayferg@gmail.com"
                    className="underline decoration-border underline-offset-4 transition-colors duration-500 hover:decoration-accent"
                  >
                    florakayferg@gmail.com
                  </a>
                  {", "}
                  <a
                    href="mailto:breck8.h@gmail.com"
                    className="underline decoration-border underline-offset-4 transition-colors duration-500 hover:decoration-accent"
                  >
                    breck8.h@gmail.com
                  </a>
                </p>
              </div>
            </div>

            <div className="border-t border-border pt-6">
              {submitted ? (
                <p className="py-4 text-base leading-relaxed text-foreground/80">
                  Thank you — we&apos;ll be in touch soon!
                </p>
              ) : (
                <form
                  action={CONTACT_FORMSPREE_ACTION}
                  method="POST"
                  onSubmit={handleSubmit}
                  className="space-y-5"
                >
                  {/* TODO: Replace CONTACT_FORMSPREE_ACTION in app/lib/config.ts */}
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="mb-1.5 block text-sm tracking-wide text-foreground/60"
                    >
                      Name
                    </label>
                    <input
                      id="contact-name"
                      name="name"
                      type="text"
                      required
                      className="w-full border border-border bg-background px-4 py-2.5 text-foreground outline-none transition-colors duration-500 focus:border-accent"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="contact-email"
                      className="mb-1.5 block text-sm tracking-wide text-foreground/60"
                    >
                      Email
                    </label>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      required
                      className="w-full border border-border bg-background px-4 py-2.5 text-foreground outline-none transition-colors duration-500 focus:border-accent"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="contact-message"
                      className="mb-1.5 block text-sm tracking-wide text-foreground/60"
                    >
                      Message
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      required
                      rows={4}
                      className="w-full resize-y border border-border bg-background px-4 py-2.5 text-foreground outline-none transition-colors duration-500 focus:border-accent"
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
                    className="w-full border border-foreground bg-foreground px-8 py-3.5 text-sm tracking-[0.15em] text-background uppercase transition-colors duration-500 hover:bg-transparent hover:text-foreground disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
                  >
                    {isSubmitting ? "Sending…" : "Submit"}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
