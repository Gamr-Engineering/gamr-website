import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Briefcase, GraduationCap, ChevronRight, User, Tv, BarChart, Mic2 } from "lucide-react";

interface PathNode {
  id: string;
  label: string;
  description: string;
  icon: React.ReactNode;
  skills: string[];
  next: string[];
}

const CareerNodes: PathNode[] = [
  {
    id: "player",
    label: "Professional Player",
    description: "The core of the ecosystem. Competing at local, regional, and global levels.",
    icon: <User className="w-8 h-8 text-blue-400" />,
    skills: ["Mechanical Skill", "Game Sense", "Teamwork"],
    next: ["streamer", "analyst"],
  },
  {
    id: "streamer",
    label: "Pro Streamer",
    description: "Building an audience through personality and high-level gameplay.",
    icon: <Tv className="w-8 h-8 text-cyan-400" />,
    skills: ["Entertainment", "Technical Setup", "Community MGMT"],
    next: ["creator"],
  },
  {
    id: "analyst",
    label: "Esports Analyst",
    description: "Breaking down matches, strategies, and player performance data.",
    icon: <BarChart className="w-8 h-8 text-purple-400" />,
    skills: ["Data Analysis", "Strategy", "Video Review"],
    next: ["coach"],
  },
  {
    id: "host",
    label: "Caster / Host",
    description: "The voice of the tournament. Providing play-by-play and analysis live.",
    icon: <Mic2 className="w-8 h-8 text-yellow-400" />,
    skills: ["Public Speaking", "Game Knowledge", "Storytelling"],
    next: ["producer"],
  },
];

export const CareerPathVisualizer = () => {
  const [selectedNode, setSelectedNode] = useState<PathNode>(CareerNodes[0]);

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-[3rem] p-8 md:p-12 overflow-hidden">
      <div className="flex flex-col md:flex-row gap-12 items-start">
        {/* Navigation Sidebar */}
        <div className="w-full md:w-80 space-y-4">
          <h3 className="text-xl font-black uppercase tracking-widest mb-8 flex items-center gap-3">
             <GraduationCap className="w-6 h-6 text-blue-500" />
             Career Pathways
          </h3>
          {CareerNodes.map((node) => (
            <button
              key={node.id}
              onClick={() => setSelectedNode(node)}
              className={`w-full flex items-center justify-between p-6 rounded-2xl border transition-all ${
                selectedNode.id === node.id 
                ? "bg-blue-600 border-blue-500 shadow-[0_0_20px_rgba(37,99,235,0.3)]" 
                : "bg-black/40 border-white/5 hover:border-blue-500/30"
              }`}
            >
              <span className="font-bold text-sm tracking-tight">{node.label}</span>
              <ChevronRight className={`w-4 h-4 ${selectedNode.id === node.id ? "text-white" : "text-zinc-600"}`} />
            </button>
          ))}
        </div>

        {/* Node Content */}
        <div className="flex-grow">
          <AnimatePresence mode="wait">
             <motion.div
               key={selectedNode.id}
               initial={{ opacity: 0, x: 20 }}
               animate={{ opacity: 1, x: 0 }}
               exit={{ opacity: 0, x: -20 }}
               className="bg-black/60 backdrop-blur-3xl border border-white/5 p-10 rounded-[2.5rem] relative min-h-[400px]"
             >
                <div className="p-6 bg-zinc-900 rounded-3xl border border-white/10 w-fit mb-8 shadow-2xl">
                   {selectedNode.icon}
                </div>
                
                <h2 className="text-4xl font-black mb-4 tracking-tighter">{selectedNode.label}</h2>
                <p className="text-zinc-400 text-lg leading-relaxed mb-10 max-w-xl">
                   {selectedNode.description}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                   <div>
                      <h4 className="text-xs font-black text-blue-400 uppercase tracking-widest mb-4">Core Skills Req.</h4>
                      <div className="flex flex-wrap gap-2">
                         {selectedNode.skills.map(skill => (
                           <span key={skill} className="px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-xl text-xs font-bold text-blue-200">
                             {skill}
                           </span>
                         ))}
                      </div>
                   </div>
                   <div>
                      <h4 className="text-xs font-black text-zinc-500 uppercase tracking-widest mb-4">Evolution Paths</h4>
                      <div className="flex gap-4">
                        {selectedNode.next.map(nextId => {
                          const nextNode = CareerNodes.find(n => n.id === nextId);
                          return (
                            <div key={nextId} className="flex items-center gap-2 text-sm font-bold text-zinc-400">
                               <div className="w-2 h-2 rounded-full bg-zinc-700" />
                               {nextNode?.label || nextId}
                            </div>
                          );
                        })}
                      </div>
                   </div>
                </div>

                <div className="absolute bottom-10 right-10">
                   <button className="flex items-center gap-3 px-8 py-4 bg-white text-black rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-zinc-200 transition-colors">
                      <Briefcase className="w-4 h-4" />
                      Find Training & Jobs
                   </button>
                </div>
             </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
