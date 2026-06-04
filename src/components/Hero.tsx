import React, { useState, useEffect } from "react";
import { ArrowRight, X, ChevronRight } from "lucide-react";
import gamrIntroVideo from "@/assets/gamr-intro-video.mp4";
import { Button } from "@/components/ui/button";

const Hero = () => {
  const [showBanner, setShowBanner] = useState(false);
  const [isRendered, setIsRendered] = useState(false);

  useEffect(() => {
    const isDismissed = sessionStorage.getItem("sxg-banner-dismissed");
    if (!isDismissed) {
      setIsRendered(true);
      // Wait 300ms after mount to slide down
      const timer = setTimeout(() => {
        setShowBanner(true);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleDismiss = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowBanner(false);
    sessionStorage.setItem("sxg-banner-dismissed", "true");
    setTimeout(() => {
      setIsRendered(false);
    }, 500);
  };

  const handleBannerClick = () => {
    const target = document.getElementById("samsung-gamr-event");
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      
      // Pulse animation flash
      target.classList.add("sxg-card-pulse");
      setTimeout(() => {
        target.classList.remove("sxg-card-pulse");
      }, 1800);
    }
  };

  return (
    <section className="relative h-screen w-full overflow-hidden flex items-end pb-32 justify-start bg-black lg:flex-col lg:justify-between lg:pb-0 lg:pt-[72px]">
      {/* Event Announcement Banner */}
      {isRendered && (
        <div 
          className={`absolute top-[72px] left-0 right-0 z-30 bg-[#0A0A14] border-l-4 border-[#007AFF] shadow-[0_4px_30px_rgba(0,122,255,0.15)] transition-all duration-500 ease-out cursor-pointer ${
            showBanner ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0 pointer-events-none"
          } lg:relative lg:top-0 lg:left-auto lg:right-auto lg:translate-y-0 lg:pointer-events-auto lg:w-full ${
            showBanner 
              ? "lg:opacity-100 lg:max-h-[200px]" 
              : "lg:opacity-0 lg:max-h-0 lg:py-0 lg:border-l-0 lg:overflow-hidden lg:shadow-none"
          } motion-reduce:transition-opacity motion-reduce:translate-y-0`}
          onClick={handleBannerClick}
        >
          <style dangerouslySetInnerHTML={{__html: `
            @keyframes dot-pulse {
              0% { transform: scale(0.8); opacity: 0.5; }
              50% { transform: scale(1.2); opacity: 1; }
              100% { transform: scale(0.8); opacity: 0.5; }
            }
            .sxg-pulse-dot {
              animation: dot-pulse 1.5s infinite ease-in-out;
            }
          `}} />
          
          <div className="max-w-6xl mx-auto px-4 py-3 lg:py-2 flex items-center justify-between gap-4 min-h-[48px] relative">
            <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-3 flex-1">
              <div className="flex items-center gap-1.5 shrink-0">
                <span className="w-2 h-2 rounded-full bg-[#007AFF] sxg-pulse-dot" />
                <span className="text-[10px] md:text-xs font-bold text-[#007AFF] uppercase tracking-wider">
                  Featured Experience
                </span>
              </div>
              
              <div className="flex flex-col md:flex-row md:items-center gap-0.5 md:gap-2">
                <span className="text-xs md:text-sm font-bold text-white uppercase tracking-wide">
                  Samsung × Gamr: Galaxy Gaming Experience
                </span>
                <span className="text-[10px] md:text-xs text-zinc-400 uppercase tracking-widest font-semibold md:border-l md:border-zinc-800 md:pl-2">
                  13th June • 10AM • Carven, Lagos • Free Entry
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <span className="hidden md:inline-flex items-center text-xs font-bold text-[#007AFF] uppercase tracking-wider group hover:underline">
                View Event <ArrowRight className="ml-1 w-3.5 h-3.5" />
              </span>
              <span className="md:hidden text-[#007AFF]">
                <ChevronRight className="w-5 h-5" />
              </span>
              
              <button 
                onClick={handleDismiss}
                className="text-zinc-500 hover:text-white p-1 hover:bg-white/10 rounded transition-colors"
                aria-label="Dismiss banner"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <video
          className="w-full h-full object-cover opacity-90"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src={gamrIntroVideo} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/80" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 lg:flex-1 lg:flex lg:items-end lg:pb-32 lg:w-full">
        <div className="max-w-2xl space-y-6 animate-fade-in">
          <h5 className="text-white font-bold tracking-widest uppercase text-sm md:text-base">
            Powering the African Gaming Ecosystem
          </h5>
          <h1 className="text-5xl md:text-8xl font-bold tracking-tighter text-white leading-none uppercase">
            Beyond<br />Boundaries
          </h1>

          <div className="pt-8 flex flex-wrap gap-4">
            <Button
              className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-black rounded-none px-10 py-7 text-sm font-bold uppercase tracking-widest transition-all duration-300"
              asChild
            >
              <a
                href="https://discord.gg/qV9e4ErZN2"
                target="_blank"
                rel="noopener noreferrer"
              >
                Join Community
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;