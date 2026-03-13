import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Trophy, Calendar, MapPin, Users } from "lucide-react";

interface Milestone {
  year: string;
  title: string;
  description: string;
  location: string;
  impact: string;
  icon: React.ReactNode;
}

const Milestones: Milestone[] = [
  {
    year: "2016",
    title: "The Silent Awakening",
    description: "First major cross-border Nigerian tournaments organized in Lagos internet cafes.",
    location: "Lagos, Nigeria",
    impact: "Established the first structured competitive rulesets for regional play.",
    icon: <Calendar className="w-12 h-12 text-blue-400" />,
  },
  {
    year: "2019",
    title: "Mobile Revolution",
    description: "PUBG Mobile and Free Fire player counts exceed 50M across the continent.",
    location: "Pan-African",
    impact: "Esports became accessible to anyone with a smartphone, removing the console barrier.",
    icon: <Users className="w-12 h-12 text-cyan-400" />,
  },
  {
    year: "2022",
    title: "The Regional League Boom",
    description: "Gamr launches regional leagues connecting West, East, and South African talent.",
    location: "Regional Hubs",
    impact: "Created the first sustainable professional pathway for African gamers.",
    icon: <Trophy className="w-12 h-12 text-yellow-400" />,
  },
  {
    year: "2025",
    title: "Championship Circuit",
    description: "Introduction of the first unified African Championship Circuit with $1M+ aggregate prizes.",
    location: "Johannesburg",
    impact: "Africa recognized as a tier-1 global competitive region by major publishers.",
    icon: <MapPin className="w-12 h-12 text-red-400" />,
  },
];

const TournamentTimeline = () => {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-75%"]);

  return (
    <section ref={targetRef} className="relative h-[300vh] bg-black">
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        <motion.div style={{ x }} className="flex gap-12 px-24">
          {Milestones.map((milestone, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="flex-shrink-0 w-[450px] p-12 bg-zinc-900/50 backdrop-blur-xl border border-zinc-800 rounded-[3rem] shadow-2xl relative group"
            >
              <div className="absolute -top-6 -left-6 bg-blue-600 text-white px-8 py-3 rounded-full font-black text-2xl shadow-[0_0_30px_rgba(37,99,235,0.4)]">
                {milestone.year}
              </div>
              
              <div className="mb-8 p-6 bg-black/40 rounded-2xl border border-white/5 w-fit">
                {milestone.icon}
              </div>

              <h3 className="text-3xl font-black mb-4 tracking-tighter text-white group-hover:text-blue-400 transition-colors">
                {milestone.title}
              </h3>
              
              <p className="text-zinc-400 text-lg leading-relaxed mb-6">
                {milestone.description}
              </p>

              <div className="space-y-4 pt-6 border-t border-zinc-800">
                <div className="flex items-center gap-3 text-sm text-zinc-500 font-bold uppercase tracking-widest">
                  <MapPin className="w-4 h-4 text-zinc-600" />
                  {milestone.location}
                </div>
                <div className="text-blue-400/80 text-sm font-medium italic">
                  "{milestone.impact}"
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
      
      {/* Background Year Overlay */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-[0.02] select-none">
        <span className="text-[40rem] font-black leading-none">AFRICA</span>
      </div>
    </section>
  );
};

export default TournamentTimeline;
