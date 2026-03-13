import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { BarChart3, Globe, Zap, Cpu, Search, Trophy, TrendingUp } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { EcosystemMap } from "../components/EcosystemMap";
import { CareerPathVisualizer } from "../components/CareerPathVisualizer";
import { CommunityContribution } from "../components/CommunityContribution";

const stats = [
  { label: "Active Players", value: "2.4M+", trend: "+12%", icon: <Zap className="w-5 h-5 text-yellow-400" /> },
  { label: "Tournament Prize Pools", value: "$4.1M", trend: "+25%", icon: <Trophy className="w-5 h-5 text-blue-400" /> },
  { label: "Community Hubs", value: "180+", trend: "+8%", icon: <Globe className="w-5 h-5 text-green-400" /> },
  { label: "Partner Brands", value: "45", trend: "+15%", icon: <Cpu className="w-5 h-5 text-purple-400" /> },
];

const InsightOS = () => {
  return (
    <div className="min-h-screen bg-black text-white p-6 md:p-12 font-sans overflow-x-hidden">
      {/* Navigation Header */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-6">
        <div>
          <h1 className="text-5xl font-black tracking-tighter flex items-center gap-3">
            Insight<span className="text-blue-600">OS</span>
            <span className="text-xs bg-blue-600/20 text-blue-400 px-3 py-1 rounded-full uppercase tracking-widest font-bold border border-blue-500/30">Intelligence v1.0</span>
          </h1>
          <p className="text-zinc-500 mt-2 font-medium">Global Esports Intelligence & African Ecosystem Analytics</p>
        </div>
        
        <div className="flex gap-3">
           <Link to="/insights" className="px-6 py-3 bg-zinc-900 rounded-xl hover:bg-zinc-800 transition-colors border border-zinc-800 font-bold text-sm">READ ARTICLES</Link>
           <button className="px-6 py-3 bg-blue-600 rounded-xl hover:bg-blue-500 transition-colors font-bold text-sm shadow-[0_0_20px_rgba(37,99,235,0.3)]">EXPORT DATA</button>
        </div>
      </header>

      {/* Hero Analytics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
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
            <div className="text-3xl font-black tracking-tight">{stat.value}</div>
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
              
              <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
                <Zap className="w-6 h-6 text-yellow-500" />
                Featured Intelligence Story
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div>
                  <h2 className="text-4xl font-black mb-6 tracking-tight leading-none">
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
                 <h3 className="text-xl font-bold mb-6">Trending Cities</h3>
                 <div className="space-y-4">
                    {["Lagos", "Nairobi", "Johannesburg", "Cairo"].map((city, idx) => (
                      <div key={city} className="flex justify-between items-center p-4 bg-black/40 rounded-2xl border border-white/5">
                        <span className="font-bold">{city}</span>
                        <div className="flex gap-2">
                          <span className="text-xs bg-zinc-800 px-2 py-1 rounded uppercase font-black text-zinc-500">Tier {idx + 1}</span>
                        </div>
                      </div>
                    ))}
                 </div>
              </div>
              <div className="p-8 bg-zinc-900 border border-zinc-800 rounded-[2.5rem]">
                 <h3 className="text-xl font-bold mb-6">Competitive Games</h3>
                 <div className="space-y-4">
                    {["EA Sports FC", "PUBG Mobile", "CODM"].map((game) => (
                      <div key={game} className="flex justify-between items-center p-4 bg-black/40 rounded-2xl border border-white/5">
                        <span className="font-bold">{game}</span>
                        <TrendingUp className="w-4 h-4 text-green-400" />
                      </div>
                    ))}
                 </div>
              </div>
           </div>
        </div>

        {/* Full Width Ecosystem Map */}
        <div className="lg:col-span-3">
           <div className="p-12 bg-zinc-900 border border-zinc-800 rounded-[3rem]">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
                <div>
                  <h2 className="text-4xl font-black mb-3">Live Infrastructure Map</h2>
                  <p className="text-zinc-500 font-medium">Real-time visualization of African esports hubs and competitive density.</p>
                </div>
                <div className="flex gap-4">
                   <div className="flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-xl text-blue-400 text-xs font-bold">
                      <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                      HIGH ACTIVITY
                   </div>
                   <div className="flex items-center gap-2 px-4 py-2 bg-cyan-500/10 border border-cyan-500/20 rounded-xl text-cyan-400 text-xs font-bold">
                      <div className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
                      EMERGING
                   </div>
                </div>
              </div>
              <EcosystemMap />
           </div>
        </div>

        {/* Career Path Visualizer Hub */}
        <div className="lg:col-span-3">
           <CareerPathVisualizer />
        </div>

        {/* Global Community Contribution System */}
        <div className="lg:col-span-2">
           <CommunityContribution />
        </div>

        {/* Sidebar: Global Intelligence Feed */}
        <div className="space-y-8">
           <div className="p-8 bg-blue-600 rounded-[2.5rem] text-white">
              <h3 className="text-2xl font-black mb-6 tracking-tight">Gamr Intelligence Newsletter</h3>
              <p className="text-blue-100 mb-8 font-medium">Get the weekly data report delivered to your inbox.</p>
              <div className="relative">
                <input 
                  type="email" 
                  placeholder="name@company.com" 
                  className="w-full bg-white/10 border border-white/20 rounded-2xl py-4 px-6 placeholder:text-blue-200 focus:outline-none focus:ring-2 focus:ring-white/50 mb-4"
                />
                <button className="w-full bg-white text-blue-600 py-4 rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-zinc-100 transition-colors">SUBSCRIBE</button>
              </div>
           </div>

           <div className="p-8 bg-zinc-900 border border-zinc-800 rounded-[2.5rem]">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                 <Search className="w-5 h-5 text-zinc-500" />
                 OS Quick Explorer
              </h3>
              <div className="space-y-3">
                 {["Career Pathways", "Infrastructure Maps", "Historical Timelines", "Prize Pool Data"].map((tag) => (
                   <button key={tag} className="w-full text-left p-4 bg-black/40 rounded-2xl border border-white/5 hover:border-blue-500/50 transition-all text-sm font-bold text-zinc-400 hover:text-white uppercase tracking-tighter">
                     {tag}
                   </button>
                 ))}
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default InsightOS;
