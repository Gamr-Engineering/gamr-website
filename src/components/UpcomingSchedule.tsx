import { ArrowRight } from "lucide-react";
import gameplayImg from "@/assets/session-gameplay.jpg";
import businessImg from "@/assets/session-business.jpg";
import contentImg from "@/assets/session-content.jpg";

const UpcomingSchedule = () => {
  const sessions = [
    { 
      title: "FIFA Pro Strategies", 
      category: "Gameplay", 
      image: gameplayImg 
    },
    { 
      title: "Esports Management", 
      category: "Business", 
      image: businessImg 
    },
    { 
      title: "Streaming Basics", 
      category: "Content", 
      image: contentImg 
    }
  ];

  return (
    <section id="upcoming-schedule" className="bg-black text-white">
      <div className="container mx-auto px-6">
        <div className="mb-16">
          <div className="max-w-xl animate-fade-in">
            <span className="text-blue-500 font-bold tracking-widest text-sm uppercase mb-4 block">Calendar</span>
            <h2 className="text-6xl md:text-7xl font-bold text-white mb-6 tracking-tighter uppercase leading-none">
              Upcoming <br />
              <span className="text-gray-500">Sessions.</span>
            </h2>
            <p className="text-xl text-gray-400 leading-relaxed max-w-md">
              Join our expert-led workshops and enhance your skills in gaming, streaming, and esports management.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {sessions.map((session, index) => (
            <div key={index} className="group cursor-pointer">
              <div className="aspect-video rounded-none border border-white/10 mb-6 relative overflow-hidden bg-zinc-900">
                <img 
                  src={session.image} 
                  alt={session.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=800";
                  }}
                />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40">
                  <ArrowRight className="w-8 h-8 text-white -rotate-45" />
                </div>
              </div>
              <div className="space-y-2">
                <span className="text-xs font-bold text-blue-500 uppercase tracking-widest">{session.category}</span>
                <h3 className="text-2xl font-bold text-white group-hover:text-gray-300 transition-colors uppercase tracking-tight">{session.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UpcomingSchedule;