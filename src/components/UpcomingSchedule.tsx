import { Button } from "@/components/ui/button";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import fifaImg from "@/assets/gaming-hub.jpg";
import managementImg from "@/assets/workshop.jpg";
import streamingImg from "@/assets/training-studio.jpg";

const UpcomingSchedule = () => {
  const sessions = [
    { 
      title: "FIFA Pro Strategies", 
      date: "Dec 20", 
      time: "2:00 PM", 
      category: "Gameplay", 
      image: fifaImg 
    },
    { 
      title: "Esports Management", 
      date: "Dec 27", 
      time: "4:00 PM", 
      category: "Business", 
      image: managementImg 
    },
    { 
      title: "Streaming Basics", 
      date: "Jan 03", 
      time: "10:00 AM", 
      category: "Content", 
      image: streamingImg 
    }
  ];

  return (
    <section id="upcoming-schedule" className="bg-black text-white">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row gap-12 items-center mb-16">
          <div className="flex-1 animate-fade-in">
            <span className="text-blue-500 font-bold tracking-widest text-sm uppercase mb-4 block">Calendar</span>
            <h2 className="text-6xl md:text-7xl font-bold text-white mb-6 tracking-tighter uppercase leading-none">
              Upcoming <br />
              <span className="text-gray-500">Sessions.</span>
            </h2>
            <p className="text-xl text-gray-400 leading-relaxed max-w-md">
              Join our expert-led workshops and enhance your skills in gaming, streaming, and esports management.
            </p>
          </div>
          <div className="flex-none">
            <Button className="bg-white text-black hover:bg-gray-200 rounded-none px-10 py-7 text-sm font-bold uppercase tracking-widest transition-all duration-300">
              View Full Calendar
            </Button>
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
              <div className="space-y-3">
                <span className="text-xs font-bold text-blue-500 uppercase tracking-widest">{session.category}</span>
                <h3 className="text-2xl font-bold text-white group-hover:text-gray-300 transition-colors uppercase tracking-tight">{session.title}</h3>
                <div className="flex items-center gap-4 text-sm text-gray-400 font-medium uppercase tracking-wider">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-white" />
                    <span>{session.date}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-white" />
                    <span>{session.time}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UpcomingSchedule;