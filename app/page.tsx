"use client";

import { useState } from "react";
import ContactModal from "./components/ContactModal";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import ScheduleModal from "./components/ScheduleModal";

export default function Home() {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isScheduleOpen, setIsScheduleOpen] = useState(false);

  return (
    <>
      <Navbar />
      <main>
        <Hero
          onContactClick={() => setIsContactOpen(true)}
          onScheduleClick={() => setIsScheduleOpen(true)}
        />
      </main>
      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />
      <ScheduleModal
        isOpen={isScheduleOpen}
        onClose={() => setIsScheduleOpen(false)}
      />
    </>
  );
}
