import { ArrowRight } from "lucide-react";
import gamrIntroVideo from "@/assets/gamr-intro-video.mp4";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="relative h-screen w-full overflow-hidden flex items-end pb-32 justify-start bg-black">
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
      <div className="relative z-10 container mx-auto px-6">
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