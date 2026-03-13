import React, { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface StorySectionProps {
  children: React.ReactNode;
  height?: string;
  className?: string;
}

export const StorySection = ({ children, height = "100vh", className = "" }: StorySectionProps) => {
  return (
    <section className={`relative w-full overflow-hidden story-section ${className}`} style={{ height }}>
      {children}
    </section>
  );
};

interface InteractiveStoryProps {
  children: React.ReactNode;
}

export const InteractiveStory = ({ children }: InteractiveStoryProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Reveal animation for sections
    const sections = gsap.utils.toArray(".story-section");
    sections.forEach((section: any) => {
      gsap.fromTo(
        section,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <div ref={containerRef} className="interactive-story-container bg-black text-white">
      {children}
    </div>
  );
};

export const StickyContent = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => {
  return (
    <div className={`sticky top-0 w-full h-screen overflow-hidden flex items-center justify-center ${className}`}>
      {children}
    </div>
  );
};

export const FloatingData = ({ 
  children, 
  x = 0, 
  y = 0, 
  delay = 0 
}: { 
  children: React.ReactNode; 
  x?: number | string; 
  y?: number | string; 
  delay?: number 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay }}
      className="absolute z-10 p-6 bg-blue-900/40 backdrop-blur-md border border-blue-500/30 rounded-2xl shadow-2xl"
      style={{ left: x, top: y }}
    >
      {children}
    </motion.div>
  );
};
