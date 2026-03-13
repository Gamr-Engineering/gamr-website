import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Zap, Trophy, Globe, Cpu, TrendingUp } from "lucide-react";

interface Stat {
  label: string;
  value: string;
  trend: string;
  icon: React.ReactNode;
}

const stats: Stat[] = [
  { label: "Active Players", value: "2.4M+", trend: "+12%", icon: <Zap className="w-5 h-5 text-yellow-400" /> },
  { label: "Tournament Prize Pools", value: "$4.1M", trend: "+25%", icon: <Trophy className="w-5 h-5 text-blue-400" /> },
  { label: "Community Hubs", value: "180+", trend: "+8%", icon: <Globe className="w-5 h-5 text-green-400" /> },
  { label: "Partner Brands", value: "45", trend: "+15%", icon: <Cpu className="w-5 h-5 text-purple-400" /> },
];

const IndustryDashboard = () => {
  return (
    <div className="space-y-12">
      {/* Hero Analytics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="p-8 bg-zinc-900/40 backdrop-blur-md border border-zinc-800 rounded-3xl hover:border-blue-500/30 transition-all group"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-black rounded-xl border border-zinc-800 group-hover:border-blue-500/30 transition-all">
                {stat.icon}
              </div>
              <span className="text-green-400 text-xs font-black bg-green-400/10 px-2 py-1 rounded-lg">{stat.trend}</span>
            </div>
            <div className="text-zinc-500 text-sm font-bold uppercase tracking-widest mb-1">{stat.label}</div>
            <div className="text-3xl font-black tracking-tight text-white">{stat.value}</div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Intelligence Block */}
        <div className="lg:col-span-2 space-y-8">
           <div className="p-8 bg-zinc-900 border border-zinc-800 rounded-[2.5rem] relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8">
                <TrendingUp className="w-24 h-24 text-blue-600/5 group-hover:text-blue-600/10 transition-all -rotate-12" />
              </div>
              
              <h3 className="text-2xl font-bold mb-8 flex items-center gap-3 text-white">
                <Zap className="w-6 h-6 text-yellow-500" />
                Featured Intelligence Story
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div>
                  <h2 className="text-4xl font-black mb-6 tracking-tight leading-none text-white">
                    The Rise of <br /> West African <br /> Mobile Dominance
                  </h2>
                  <p className="text-zinc-400 mb-8 leading-relaxed">
                    Analyzing the 240% surge in mobile tournament participation across Nigeria and Ghana in 2025.
                  </p>
                  <Link 
                    to="/insights/stories/rising-esports" 
                    className="inline-flex items-center gap-3 text-blue-400 font-black uppercase tracking-tighter group/link"
                  >
                    ENTER INTERACTIVE STORY
                    <div className="w-8 h-8 rounded-full bg-blue-400/10 flex items-center justify-center group-hover/link:bg-blue-400 transition-all">
                      <Zap className="w-4 h-4 group-hover/link:text-black transition-all" />
                    </div>
                  </Link>
                </div>
                
                <div className="h-[250px] bg-black/50 rounded-2xl border border-zinc-800 p-6 flex flex-col justify-between">
                   <div className="text-xs font-black text-zinc-500 uppercase tracking-widest">Live Participation Index</div>
                   <div className="flex-grow flex items-end gap-3 pb-4">
                      {[40, 70, 45, 90, 65, 80, 55].map((h, i) => (
                        <div key={i} className="flex-grow bg-blue-600/20 rounded-t-lg relative group/bar">
                          <motion.div 
                            initial={{ height: 0 }}
                            animate={{ height: `${h}%` }}
                            className="bg-blue-600 rounded-t-lg w-full"
                          />
                        </div>
                      ))}
                   </div>
                </div>
              </div>
           </div>

           {/* Knowledge Cloud */}
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="p-8 bg-zinc-900 border border-zinc-800 rounded-[2.5rem]">
                 <h3 className="text-xl font-bold mb-6 text-white">Trending Cities</h3>
                 <div className="space-y-4">
                    {["Lagos", "Nairobi", "Johannesburg", "Cairo"].map((city, idx) => (
                      <div key={city} className="flex justify-between items-center p-4 bg-black/40 rounded-2xl border border-white/5">
                        <span className="font-bold text-white">{city}</span>
                        <div className="flex gap-2">
                          <span className="text-xs bg-zinc-800 px-2 py-1 rounded uppercase font-black text-zinc-500">Tier {idx + 1}</span>
                        </div>
                      </div>
                    ))}
                 </div>
              </div>
              <div className="p-8 bg-zinc-900 border border-zinc-800 rounded-[2.5rem]">
                 <h3 className="text-xl font-bold mb-6 text-white">Competitive Games</h3>
                 <div className="space-y-4">
                    {["EA Sports FC", "PUBG Mobile", "CODM"].map((game) => (
                      <div key={game} className="flex justify-between items-center p-4 bg-black/40 rounded-2xl border border-white/5">
                        <span className="font-bold text-white">{game}</span>
                        <TrendingUp className="w-4 h-4 text-green-400" />
                      </div>
                    ))}
                 </div>
              </div>
           </div>
        </div>

        {/* Sidebar: Global Intelligence Feed */}
        <div className="space-y-8">
           <div className="p-8 bg-blue-600 rounded-[2.5rem] text-white shadow-2xl">
              <h3 className="text-2xl font-black mb-6 tracking-tight">Intelligence Feed</h3>
              <p className="text-blue-100 mb-8 font-medium">Daily data snapshots from the Pan-African circuit.</p>
              <div className="space-y-4">
                 {[
                   { event: "Prize Pool Alert", desc: "$50k Ghana Open", time: "2h ago" },
                   { event: "Market Growth", desc: "Nairobi Hub expands", time: "5h ago" },
                 ].map((item, idx) => (
                   <div key={idx} className="p-4 bg-white/10 rounded-2xl border border-white/10">
                      <div className="flex justify-between text-[10px] font-black uppercase text-blue-200 mb-1">
                        <span>{item.event}</span>
                        <span>{item.time}</span>
                      </div>
                      <div className="text-sm font-bold">{item.desc}</div>
                   </div>
                 ))}
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default IndustryDashboard;
