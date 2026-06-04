import React, { useEffect, useRef } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import SamsungSpotlightBanner from "@/components/SamsungSpotlightBanner";
import AboutSection from "@/components/AboutSection";
import ServicesSection from "@/components/ServicesSection";
import PartnersSection from "@/components/PartnersSection";
import EventsSection from "@/components/EventsSection";

import UpcomingSchedule from "@/components/UpcomingSchedule";
import CreatorFlier from "@/components/CreatorFlier";
import Footer from "@/components/Footer";

const SectionSeparator = () => (
  <div className="w-full h-16 md:h-20 bg-black shrink-0" />
);

const Index = () => {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    
    // Immediate scroll
    window.scrollTo(0, 0);
    
    // Focus the hero area to hijack viewport
    if (heroRef.current) {
      heroRef.current.focus();
    }

    // Extended polling for 1 second to ensure we stay at top
    let count = 0;
    const interval = setInterval(() => {
      window.scrollTo(0, 0);
      count++;
      if (count > 20) clearInterval(interval);
    }, 50);

    return () => {
      if ('scrollRestoration' in window.history) {
        window.history.scrollRestoration = 'auto';
      }
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="min-h-screen bg-black">
      <Header />
      <main className="flex flex-col gap-16 md:gap-20">
        <div ref={heroRef} tabIndex={-1} className="outline-none">
          <Hero />
        </div>
        
        <SamsungSpotlightBanner />
        
        <AboutSection />
        
        <ServicesSection />
        
        <EventsSection />

        <UpcomingSchedule />
        
        <PartnersSection />
        
        <CreatorFlier />
      </main>
      
      <SectionSeparator />
      <div id="contact">
        <Footer />
      </div>
    </div>
  );
};

export default Index;
