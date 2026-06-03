import React from "react";
import { ArrowRight, Gamepad2, Calendar, MapPin } from "lucide-react";

const SamsungSpotlightBanner = () => {
  return (
    <section className="relative w-full px-6 py-8 md:py-12 bg-black overflow-hidden border-y border-zinc-900">
      {/* Background Glows */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[300px] h-[150px] bg-[#007AFF]/15 rounded-full filter blur-[60px] pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[250px] h-[120px] bg-[hsl(0,84%,60%)]/10 rounded-full filter blur-[50px] pointer-events-none" />

      {/* Cyberpunk Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.003)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.003)_1px,transparent_1px)] bg-[size:20px_20px] opacity-40 pointer-events-none" />

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes sxg-flash {
          0% { box-shadow: 0 0 0 rgba(0, 122, 255, 0); border-color: rgba(63, 63, 70, 0.8); transform: scale(1); }
          30% { box-shadow: 0 0 45px rgba(0, 122, 255, 0.7); border-color: #007AFF; transform: scale(1.015); }
          100% { box-shadow: 0 20px 50px rgba(0,0,0,0.5), 0 0 30px rgba(0,122,255,0.05); border-color: rgba(63, 63, 70, 0.8); transform: scale(1); }
        }
        .sxg-card-pulse {
          animation: sxg-flash 1.8s cubic-bezier(0.16, 1, 0.3, 1);
        }
      `}} />

      <div className="relative z-10 max-w-6xl mx-auto">
        <div id="samsung-gamr-event" className="relative overflow-hidden rounded-2xl bg-[#09090F] border border-zinc-800/80 p-6 md:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.5),_0_0_30px_rgba(0,122,255,0.05)] hover:border-[#007AFF]/50 transition-all duration-500 group">
          {/* Neon corner lines */}
          <div className="absolute top-0 left-0 w-8 h-[2px] bg-[#007AFF]" />
          <div className="absolute top-0 left-0 w-[2px] h-8 bg-[#007AFF]" />
          <div className="absolute bottom-0 right-0 w-8 h-[2px] bg-[hsl(0,84%,60%)]" />
          <div className="absolute bottom-0 right-0 w-[2px] h-8 bg-[hsl(0,84%,60%)]" />

          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="space-y-4 text-left max-w-3xl">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#007AFF]/10 border border-[#007AFF]/30 text-xs font-semibold uppercase tracking-wider text-[#007AFF] shadow-[0_0_15px_rgba(0,122,255,0.1)]">
                <span className="w-2 h-2 rounded-full bg-[#007AFF] animate-pulse" />
                Featured Experience
              </div>

              <h2 className="text-3xl md:text-5xl font-extrabold uppercase tracking-tight text-white leading-none">
                Samsung <span className="text-[#007AFF]">×</span> Gamr: <br className="hidden md:block" />
                Galaxy Gaming Experience
              </h2>
              
              <p className="text-zinc-400 text-sm md:text-base max-w-2xl leading-relaxed font-normal">
                Join Lagos gamers at Carven on June 13th for an immersive, mobile esports showcase. Battle in EFootball, Subway Surfers, and Asphalt, win devices, and get hands-on access to the new <strong className="text-white">Samsung Galaxy A57 & A37</strong>.
              </p>

              {/* Event Metadata */}
              <div className="flex flex-wrap items-center gap-y-3 gap-x-6 pt-2 text-xs md:text-sm font-semibold uppercase tracking-wider text-zinc-300">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-[#007AFF]" />
                  <span>13th June, 10:00 AM</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[hsl(0,84%,60%)]" />
                  <span>Carven, Lagos</span>
                </div>
                <div className="flex items-center gap-2">
                  <Gamepad2 className="w-4 h-4 text-[#007AFF]" />
                  <span>Free Entry • Open to All</span>
                </div>
              </div>
            </div>

            {/* Action CTA Button */}
            <div className="w-full lg:w-auto shrink-0 flex flex-col items-center">
              <a
                href="/samsung.html"
                className="relative inline-flex items-center justify-center px-8 py-5 w-full lg:w-[260px] bg-[#007AFF] hover:bg-[#3395ff] text-white font-bold text-sm md:text-base uppercase tracking-widest rounded-xl transition-all duration-300 shadow-[0_4px_25px_rgba(0,122,255,0.3)] hover:shadow-[0_6px_30px_rgba(0,122,255,0.5)] hover:-translate-y-0.5 active:translate-y-0.5"
              >
                <span>Register Now</span>
                <ArrowRight className="ml-2.5 w-5 h-5 group-hover:translate-x-1.5 transition-transform duration-300" />
              </a>
              <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-semibold mt-3">
                Tournament registration open
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SamsungSpotlightBanner;
