import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, GraduationCap, Users } from "lucide-react";
import gamrLabVideo from "@/assets/gamr-lab-video.mp4";
import carven1 from "@/assets/carven/carven-1.jpg";
import { campaigns } from "@/data/campaigns";
import { getCampaignStatus } from "@/utils/campaignStatus";

const ServicesSection = () => {
  return (
    <section id="gamr-studios" className="bg-black text-white">
      {/* Gamr Lab Section - Video Background Split - Education */}
      <div id="education" className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          {/* Fallback image if video fails or loads slow, but video is primary */}
          <div className="absolute inset-0 bg-black/60 z-10" />
          <video
            src={gamrLabVideo}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover opacity-50"
          />
        </div>

        <div className="container mx-auto px-6 relative z-20 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="flex items-center space-x-2 text-blue-500">
              <GraduationCap className="h-5 w-5" />
              <span className="text-sm font-bold uppercase tracking-widest">Education</span>
            </div>
            <h2 className="text-5xl md:text-7xl font-bold tracking-tighter leading-none uppercase">
              Gamr Studios
            </h2>
            <p className="text-xl text-gray-300 max-w-lg leading-relaxed">
              Forging the next generation of creative technologists. Intensive training in game design, digital fashion, and spatial computing.
            </p>
            <div className="pt-4">
              <Button
                className="bg-transparent border border-white text-white hover:bg-white hover:text-black rounded-none px-8 py-6 text-sm font-bold uppercase tracking-widest transition-all"
                asChild
              >
                <Link to="/gamr-lab">
                  {(() => {
                    const campaign = campaigns.find(c => c.id === "roblox-creator-pathway");
                    const status = campaign ? getCampaignStatus(campaign).status : "CLOSED";
                    return status === "OPEN" ? "Start Learning" : 
                           status === "CLOSING_SOON" ? "Apply Before Deadline" : 
                           "Learn More";
                  })()}
                </Link>
              </Button>
            </div>
          </div>

          <div className="hidden md:block">
            {/* Optional visualization or empty space for video to show */}
          </div>
        </div>
      </div>

      {/* Carven Section - Photo Background */}
      <div id="carven" className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={carven1}
            alt="Carven Gaming Hub"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent" />
        </div>

        <div className="container mx-auto px-6 relative z-20">
          <div className="max-w-2xl space-y-6">
            <div className="flex items-center space-x-2 text-blue-500">
              <Users className="h-5 w-5" />
              <span className="text-sm font-bold uppercase tracking-widest">Community</span>
            </div>
            <h2 className="text-5xl md:text-7xl font-bold tracking-tighter leading-none uppercase">
              Carven<br />Gaming Hub
            </h2>
            <p className="text-xl text-gray-300 leading-relaxed">
              Africa's premium gaming, lifestyle, and creative sanctuary. <br />
              Where competition meets culture.
            </p>

            <div className="grid grid-cols-2 gap-8 py-8">
              <div>
                <h4 className="text-3xl font-bold">VIP</h4>
                <p className="text-sm text-gray-400 uppercase tracking-widest">Experience</p>
              </div>
              <div>
                <h4 className="text-3xl font-bold">24/7</h4>
                <p className="text-sm text-gray-400 uppercase tracking-widest">Access</p>
              </div>
              <div>
                <h4 className="text-3xl font-bold">50+</h4>
                <p className="text-sm text-gray-400 uppercase tracking-widest">Stations</p>
              </div>
              <div>
                <h4 className="text-3xl font-bold">1Gbs</h4>
                <p className="text-sm text-gray-400 uppercase tracking-widest">Internet</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                className="bg-white text-black hover:bg-gray-200 rounded-none px-8 py-6 text-sm font-bold uppercase tracking-widest"
                asChild
              >
                <a href="https://maps.app.goo.gl/XjkHsMv46uG2LsJA7" target="_blank" rel="noopener noreferrer">
                  Visit Carven
                </a>
              </Button>
              <Button
                variant="outline"
                className="bg-transparent border border-white text-white hover:bg-white hover:text-black rounded-none px-8 py-6 text-sm font-bold uppercase tracking-widest"
                asChild
              >
                <a href="#" className="pointer-events-none">
                  Learn More <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;