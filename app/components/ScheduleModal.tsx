"use client";

import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

type ScheduleModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

type ValuePiece = Date | null;
type CalendarValue = ValuePiece | [ValuePiece, ValuePiece];

export default function ScheduleModal({ isOpen, onClose }: ScheduleModalProps) {
  const [selectedDate, setSelectedDate] = useState<CalendarValue>(null);
  const [comments, setComments] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

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

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Consultation request submitted:", {
      selectedDate,
      comments,
      name,
      email,
      phone,
    });
    setSelectedDate(null);
    setComments("");
    setName("");
    setEmail("");
    setPhone("");
  };

  return (
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
            id="schedule-modal-title"
            className="font-serif text-3xl text-foreground md:text-4xl"
          >
            Schedule a Consultation
          </h2>
          <div className="mt-2 h-px w-12 bg-accent" />
          <p className="mt-4 text-base leading-relaxed text-foreground/70">
            Select a preferred date and tell us about your project. We&apos;ll
            be in touch to confirm your appointment.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <div>
              <label className="mb-3 block text-sm tracking-[0.2em] text-foreground/50 uppercase">
                Preferred Date
              </label>
              <Calendar
                onChange={setSelectedDate}
                value={selectedDate}
                minDate={today}
                tileDisabled={({ date }) => date < today}
                className="w-full border border-border bg-background p-4 font-body text-foreground [&_.react-calendar__month-view__days__day--neighboringMonth]:text-foreground/30 [&_.react-calendar__navigation]:mb-4 [&_.react-calendar__navigation__arrow]:text-foreground/60 [&_.react-calendar__navigation__arrow]:transition-colors [&_.react-calendar__navigation__arrow]:duration-500 [&_.react-calendar__navigation__arrow:hover]:text-foreground [&_.react-calendar__navigation__label]:font-serif [&_.react-calendar__navigation__label]:text-lg [&_.react-calendar__tile]:rounded-sm [&_.react-calendar__tile]:p-2 [&_.react-calendar__tile]:text-sm [&_.react-calendar__tile]:transition-colors [&_.react-calendar__tile]:duration-500 [&_.react-calendar__tile--active]:bg-accent [&_.react-calendar__tile--active]:text-background [&_.react-calendar__tile--now]:bg-accent-muted/30 [&_.react-calendar__tile:disabled]:text-foreground/20 [&_.react-calendar__tile:enabled:hover]:bg-border/50 [&_.react-calendar__tile:enabled:focus]:bg-border/50"
              />
            </div>

            <div>
              <label
                htmlFor="schedule-comments"
                className="mb-1.5 block text-sm tracking-wide text-foreground/60"
              >
                Comments &amp; Project Details
              </label>
              <textarea
                id="schedule-comments"
                rows={4}
                value={comments}
                onChange={(e) => setComments(e.target.value)}
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
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
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
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
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
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-border bg-background px-4 py-2.5 text-foreground outline-none transition-colors duration-500 focus:border-accent"
              />
            </div>

            <button
              type="submit"
              className="w-full border border-accent bg-accent px-8 py-3.5 text-sm tracking-[0.15em] text-background uppercase transition-colors duration-500 hover:bg-transparent hover:text-accent sm:w-auto"
            >
              Submit Request
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
