"use client";

import { useEffect, useState } from "react";

type ContactModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Contact form submitted:", { name, email, message });
    setName("");
    setEmail("");
    setMessage("");
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
              {/* TODO: Replace with your studio's about text */}
              <p className="text-base leading-relaxed text-foreground/80">
                Atelier &amp; Co. is a boutique interior design studio devoted
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
                {/* TODO: Replace with your phone number */}
                <p>
                  <span className="text-foreground/50">Phone:</span>{" "}
                  (555) 123-4567
                </p>
                {/* TODO: Replace with your email address */}
                <p>
                  <span className="text-foreground/50">Email:</span>{" "}
                  <a
                    href="mailto:hello@atelierandco.com"
                    className="underline decoration-border underline-offset-4 transition-colors duration-500 hover:decoration-accent"
                  >
                    hello@atelierandco.com
                  </a>
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5 border-t border-border pt-6">
              <div>
                <label
                  htmlFor="contact-name"
                  className="mb-1.5 block text-sm tracking-wide text-foreground/60"
                >
                  Name
                </label>
                <input
                  id="contact-name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
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
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full resize-y border border-border bg-background px-4 py-2.5 text-foreground outline-none transition-colors duration-500 focus:border-accent"
                />
              </div>
              <button
                type="submit"
                className="w-full border border-foreground bg-foreground px-8 py-3.5 text-sm tracking-[0.15em] text-background uppercase transition-colors duration-500 hover:bg-transparent hover:text-foreground sm:w-auto"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
