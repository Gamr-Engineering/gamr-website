import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Map, BarChart3, Network, Trophy, GraduationCap, ArrowRight, Zap, Search } from "lucide-react";
import KnowledgeGraph from "@/components/intelligence/KnowledgeGraph";

const IntelligenceHub = () => {
  const features = [
    {
      title: "Ecosystem Map",
      desc: "Live geospatial intelligence of African hubs and tournaments.",
      icon: <Map className="w-8 h-8 text-blue-400" />,
      link: "/insights/intelligence/map",
      color: "blue",
    },
    {
      title: "Industry Dashboard",
      desc: "Real-time market analytics and competitive performance metrics.",
      icon: <BarChart3 className="w-8 h-8 text-cyan-400" />,
      link: "/insights/intelligence/dashboard",
      color: "cyan",
    },
    {
      title: "Tournment Timeline",
      desc: "An interactive history of the Pan-African competitive circuit.",
      icon: <Trophy className="w-8 h-8 text-yellow-400" />,
      link: "/insights/intelligence/timeline",
      color: "yellow",
    },
    {
      title: "Career Explorer",
      desc: "Interactive roadmaps for professional esports trajectories.",
      icon: <GraduationCap className="w-8 h-8 text-purple-400" />,
      link: "/insights/intelligence/careers",
      color: "purple",
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white selection:bg-blue-500/30 font-sans">
      <Header />
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-6">
          {/* Hero Section */}
          <div className="mb-24 text-center md:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600/10 border border-blue-500/20 rounded-full text-blue-400 text-[10px] font-black uppercase tracking-widest mb-6"
            >
              <Zap className="w-3 h-3" />
              Gamr Intelligence Platform v1.0
            </motion.div>
            
            <h1 className="text-5xl md:text-8xl font-black tracking-tighter leading-none uppercase mb-8">
              The Intelligence <br /> <span className="text-blue-600">Layer</span> of Esports
            </h1>
            
            <p className="text-zinc-500 text-xl font-medium max-w-3xl leading-relaxed mb-12">
              Transforming raw ecosystem data into actionable industry intelligence. Explore the African esports landscape through geospatial mapping, relationship engines, and data dashboards.
            </p>

            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
               <button className="px-8 py-5 bg-blue-600 rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-blue-500 transition-all shadow-[0_0_30px_rgba(37,99,235,0.3)]">
                 REQUEST API ACCESS
               </button>
               <button className="px-8 py-5 bg-zinc-900 border border-zinc-800 rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-zinc-800 transition-all">
                 DOWNLOAD REPORT
               </button>
            </div>
          </div>

          {/* Interactive Knowledge Graph Preview */}
          <div className="mb-24">
             <div className="flex items-center justify-between mb-8">
                <div>
                   <h2 className="text-3xl font-black uppercase tracking-tighter flex items-center gap-3">
                      <Network className="w-6 h-6 text-blue-500" />
                      Knowledge Graph Engine
                   </h2>
                </div>
                <div className="text-xs font-black text-zinc-500 uppercase tracking-widest border-b border-zinc-800 pb-2">
                   Interactive Node Relationship Visualization
                </div>
             </div>
             <KnowledgeGraph />
          </div>

          {/* Feature Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-24">
            {features.map((feature, idx) => (
              <Link 
                key={idx} 
                to={feature.link}
                className="group p-10 bg-zinc-900/40 border border-zinc-800 rounded-[2.5rem] hover:border-blue-500/30 transition-all flex flex-col justify-between min-h-[350px]"
              >
                <div>
                  <div className="p-5 bg-black rounded-3xl border border-zinc-800 w-fit mb-8 group-hover:border-blue-500/30 transition-all">
                    {feature.icon}
                  </div>
                  <h3 className="text-2xl font-black uppercase tracking-tighter text-white mb-4 transition-colors group-hover:text-blue-400">
                    {feature.title}
                  </h3>
                  <p className="text-zinc-500 font-medium leading-relaxed">
                    {feature.desc}
                  </p>
                </div>

                <div className="flex items-center gap-3 text-blue-400 font-black uppercase tracking-widest text-[10px] mt-8">
                   EXPLORE SYSTEM <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>

          {/* Search CTA */}
          <div className="p-16 bg-blue-600 rounded-[3rem] text-white flex flex-col md:flex-row items-center justify-between gap-12 relative overflow-hidden group">
             <div className="absolute top-0 right-0 p-12 opacity-10 pointer-events-none transition-transform group-hover:scale-110">
                <Search className="w-64 h-64" />
             </div>
             <div className="relative z-10 max-w-xl">
                <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-6">
                   Looking for specific industry intel?
                </h2>
                <p className="text-blue-100 text-lg font-medium">
                   Try our Insight Explorer to filter through thousands of articles, case studies, and career guides.
                </p>
             </div>
             
             <Link 
               to="/insights/search"
               className="relative z-10 px-12 py-6 bg-white text-blue-600 rounded-3xl font-black uppercase tracking-widest text-sm hover:bg-zinc-100 transition-all shadow-2xl"
             >
               LAUNCH EXPLORER
             </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default IntelligenceHub;
