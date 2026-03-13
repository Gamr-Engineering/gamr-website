import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Users, Trophy, Zap } from "lucide-react";

interface Hub {
  id: string;
  name: string;
  coords: { x: string; y: string };
  stats: {
    players: string;
    tournaments: string;
    priority: "high" | "medium";
  };
}

const hubs: Hub[] = [
  { id: "lagos", name: "Lagos", coords: { x: "42%", y: "58%" }, stats: { players: "850k", tournaments: "120", priority: "high" } },
  { id: "nairobi", name: "Nairobi", coords: { x: "65%", y: "62%" }, stats: { players: "320k", tournaments: "45", priority: "medium" } },
  { id: "jo_burg", name: "Johannesburg", coords: { x: "55%", y: "85%" }, stats: { players: "580k", tournaments: "90", priority: "high" } },
  { id: "cairo", name: "Cairo", coords: { x: "55%", y: "15%" }, stats: { players: "740k", tournaments: "110", priority: "high" } },
  { id: "accra", name: "Accra", coords: { x: "38%", y: "58%" }, stats: { players: "150k", tournaments: "25", priority: "medium" } },
];

export const EcosystemMap = () => {
  const [activeHub, setActiveHub] = useState<Hub | null>(null);

  return (
    <div className="relative w-full aspect-[4/5] md:aspect-video bg-zinc-900/20 rounded-[3rem] border border-zinc-800 overflow-hidden group">
      {/* Abstract Map Background (SVG) */}
      <svg viewBox="0 0 800 1000" className="w-full h-full opacity-20 stroke-zinc-700 fill-transparent stroke-[0.5]">
         <path d="M250,150 Q400,50 600,150 T750,400 T600,800 T300,900 T100,600 T250,150" strokeWidth="2" strokeDasharray="10 10" />
         <circle cx="400" cy="500" r="300" strokeWidth="1" />
         <circle cx="400" cy="500" r="150" strokeWidth="1" />
      </svg>

      {/* Hub Markers */}
      {hubs.map((hub) => (
        <motion.button
          key={hub.id}
          className="absolute z-10"
          style={{ left: hub.coords.x, top: hub.coords.y }}
          whileHover={{ scale: 1.2 }}
          onClick={() => setActiveHub(hub)}
        >
          <div className="relative">
            <motion.div 
              animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0.2, 0.5] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className={`absolute -inset-4 rounded-full ${hub.stats.priority === 'high' ? 'bg-blue-500/20' : 'bg-cyan-500/20'}`}
            />
            <div className={`w-4 h-4 rounded-full border-2 border-white shadow-lg ${hub.stats.priority === 'high' ? 'bg-blue-500' : 'bg-cyan-500'}`} />
          </div>
        </motion.button>
      ))}

      {/* Stats Overlay */}
      <AnimatePresence>
        {activeHub && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="absolute top-12 right-12 w-80 bg-black/80 backdrop-blur-2xl border border-white/10 p-8 rounded-3xl shadow-2xl z-20"
          >
            <button 
              onClick={() => setActiveHub(null)}
              className="absolute top-4 right-4 text-zinc-500 hover:text-white"
            >
              ✕
            </button>
            
            <h3 className="text-3xl font-black mb-1">{activeHub.name}</h3>
            <p className="text-xs text-blue-400 font-bold uppercase tracking-widest mb-6">Regional Esports Hub</p>
            
            <div className="space-y-6">
               <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center border border-blue-500/20">
                    <Users className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">{activeHub.stats.players}</div>
                    <div className="text-[10px] text-zinc-500 font-bold uppercase tracking-tighter">Active Competitors</div>
                  </div>
               </div>

               <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center border border-cyan-500/20">
                    <Trophy className="w-5 h-5 text-cyan-400" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">{activeHub.stats.tournaments}</div>
                    <div className="text-[10px] text-zinc-500 font-bold uppercase tracking-tighter">Annual Tournaments</div>
                  </div>
               </div>
            </div>

            <button className="w-full mt-8 py-4 bg-white text-black rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-zinc-200 transition-colors">
              VIEW CITY INTEL
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="absolute bottom-12 left-12">
        <h4 className="text-xl font-black flex items-center gap-3">
          <Globe className="w-6 h-6 text-blue-500" />
          African Ecosystem Live
        </h4>
        <p className="text-sm text-zinc-500 font-medium">Click a node to explore city-level intelligence.</p>
      </div>
    </div>
  );
};

const Globe = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="10" />
    <path d="M12 2a14.5 14.5 0 0 0 0 20M12 2a14.5 14.5 0 0 1 0 20M2 12h20" />
  </svg>
);
