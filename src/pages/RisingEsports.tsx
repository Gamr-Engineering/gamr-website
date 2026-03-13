import React, { useMemo } from "react";
import { InteractiveStory, StorySection, StickyContent, FloatingData } from "../components/InteractiveStory";
import { motion } from "framer-motion";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts";
import { Trophy, Users, Wifi, Zap } from "lucide-react";

const GrowthData = [
  { year: "2016", players: 180 },
  { year: "2018", players: 240 },
  { year: "2020", players: 410 },
  { year: "2022", players: 680 },
  { year: "2024", players: 1200 },
  { year: "2026", players: 2100 },
];

const RisingEsports = () => {
  return (
    <InteractiveStory>
      {/* Hero Section */}
      <StorySection height="110vh" className="flex flex-col items-center justify-center p-8 bg-gradient-to-b from-blue-900 to-black">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="text-center"
        >
          <h1 className="text-7xl font-black mb-6 tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-300">
            THE RISE OF <br /> AFRICAN ESPORTS
          </h1>
          <p className="text-xl text-blue-200/60 max-w-2xl mx-auto uppercase tracking-widest font-light">
            A Living Documentary of the Digital Frontier
          </p>
        </motion.div>
        
        <div className="absolute bottom-12 animate-bounce">
          <p className="text-sm text-blue-400 font-bold">SCROLL TO EXPERIENCE</p>
        </div>
      </StorySection>

      {/* Population Growth Section */}
      <StorySection height="200vh">
        <StickyContent className="bg-black">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full max-w-7xl px-8 items-center">
            <div>
              <h2 className="text-5xl font-bold mb-6">Massive Population Growth</h2>
              <p className="text-lg text-gray-400 leading-relaxed mb-8">
                In less than a decade, the African gaming population has exploded from niche communities to a professional ecosystem of over 2,000 professional players and millions of enthusiasts.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-6 bg-blue-900/20 border border-blue-500/20 rounded-xl">
                  <span className="block text-4xl font-bold text-blue-400">210M</span>
                  <span className="text-xs uppercase text-gray-500 font-bold">Active Gamers</span>
                </div>
                <div className="p-6 bg-cyan-900/20 border border-cyan-500/20 rounded-xl">
                  <span className="block text-4xl font-bold text-cyan-400">12x</span>
                  <span className="text-xs uppercase text-gray-500 font-bold">Growth since 2016</span>
                </div>
              </div>
            </div>
            
            <div className="h-[400px] w-full p-8 bg-white/5 backdrop-blur-sm rounded-3xl border border-white/10">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={GrowthData}>
                  <defs>
                    <linearGradient id="colorPlayers" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#222" vertical={false} />
                  <XAxis dataKey="year" stroke="#444" fontSize={12} />
                  <YAxis hide />
                  <Tooltip 
                    contentStyle={{ backgroundColor: "#111", border: "1px solid #333", borderRadius: "10px" }}
                    itemStyle={{ color: "#3b82f6" }}
                  />
                  <Area type="monotone" dataKey="players" stroke="#3b82f6" fillOpacity={1} fill="url(#colorPlayers)" />
                </AreaChart>
              </ResponsiveContainer>
              <p className="text-center text-xs text-gray-500 mt-4 italic font-bold">PRO PLAYER GROWTH (INDEXED)</p>
            </div>
          </div>
        </StickyContent>
      </StorySection>

      {/* Infrastructure Section */}
      <StorySection height="150vh" className="bg-blue-950">
        <StickyContent>
           <h2 className="text-8xl font-black absolute opacity-5 pointer-events-none whitespace-nowrap">INFRASTRUCTURE INFRASTRUCTURE</h2>
           
           <div className="relative w-full max-w-4xl h-[600px] mx-auto">
             <FloatingData x="10%" y="20%">
               <Wifi className="w-8 h-8 text-blue-400 mb-3" />
               <h3 className="text-xl font-bold">Latency Reduction</h3>
               <p className="text-sm text-gray-300">New subsea cables have reduced ping from 200ms to sub-40ms in major coastal hubs.</p>
             </FloatingData>

             <FloatingData x="60%" y="40%" delay={0.2}>
               <Zap className="w-8 h-8 text-yellow-400 mb-3" />
               <h3 className="text-xl font-bold">Mobile First</h3>
               <p className="text-sm text-gray-300">92% of competitive gaming in Africa happens on mobile devices due to extreme accessibility.</p>
             </FloatingData>

             <FloatingData x="20%" y="70%" delay={0.4}>
               <Users className="w-8 h-8 text-cyan-400 mb-3" />
               <h3 className="text-xl font-bold">Gaming Hubs</h3>
               <p className="text-sm text-gray-300">Lagos, Nairobi, and Cairo now host over 150+ dedicated esports training centers.</p>
             </FloatingData>
           </div>
        </StickyContent>
      </StorySection>

      {/* Tournament Timeline */}
      <StorySection height="100vh" className="flex items-center justify-center p-8 bg-black">
        <div className="max-w-4xl text-center">
           <Trophy className="w-16 h-16 text-yellow-500 mx-auto mb-8" />
           <h2 className="text-5xl font-bold mb-6 italic tracking-tight">The Prize Pool Evolution</h2>
           <p className="text-xl text-gray-400 leading-relaxed italic">
             "African esports has moved from 'playing for fun' to 'playing for destiny'. The stakes are no longer just bragging rights—they are global titles and professional careers."
           </p>
           <div className="mt-12 p-8 border-t border-white/10">
              <button className="px-8 py-4 bg-blue-600 rounded-full font-bold hover:bg-blue-500 transition-colors uppercase tracking-widest text-sm">
                Explore Full Tournament History
              </button>
           </div>
        </div>
      </StorySection>
      
    </InteractiveStory>
  );
};

export default RisingEsports;
