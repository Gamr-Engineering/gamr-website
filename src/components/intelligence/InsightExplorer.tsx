import React from "react";
import { Link, useSearchParams } from "react-router-dom";
import { allInsights } from "@/data/insightsData";
import InsightCard from "@/components/InsightCard";
import { Search, Filter, Cpu, Trophy, Zap } from "lucide-react";

const InsightExplorer = () => {
    const [searchParams] = useSearchParams();
    const query = searchParams.get("q") || "";
    const categoryFilter = searchParams.get("category");

    const results = allInsights.filter((article) => {
        const lowerQuery = query.toLowerCase();
        const matchesQuery = (
            article.title.toLowerCase().includes(lowerQuery) ||
            article.excerpt.toLowerCase().includes(lowerQuery) ||
            article.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
        );
        const matchesCategory = !categoryFilter || article.category === categoryFilter;
        
        return matchesQuery && matchesCategory;
    });

    const filters = [
      { id: "blog", label: "Market Insights", icon: <Cpu className="w-4 h-4" /> },
      { id: "case-study", label: "Success Stories", icon: <Trophy className="w-4 h-4" /> },
    ];

    return (
        <div className="w-full font-sans">
            {/* Intelligence Explorer Header */}
            <div className="mb-20">
              <div className="flex items-center gap-3 mb-6">
                 <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center shadow-[0_0_20px_rgba(37,99,235,0.4)]">
                    <Search className="w-5 h-5 text-white" />
                 </div>
                 <h1 className="text-3xl font-black uppercase tracking-tighter text-white">
                    Insight Explorer
                 </h1>
              </div>
              
              <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-12">
                 <div className="max-w-2xl">
                    <p className="text-zinc-500 text-lg font-medium leading-relaxed">
                       Discover deep industry intelligence, career roadmaps, and regional market analysis within the African esports ecosystem.
                    </p>
                 </div>
                 
                 <div className="flex flex-wrap gap-3">
                    {filters.map(filter => (
                      <Link 
                        key={filter.id}
                        to={`/insights/search?category=${filter.id}`}
                        className={`flex items-center gap-3 px-6 py-3 rounded-2xl border transition-all font-bold text-xs uppercase tracking-widest ${
                          categoryFilter === filter.id 
                          ? "bg-blue-600 border-blue-500 text-white" 
                          : "bg-zinc-900 border-zinc-800 hover:border-zinc-700 text-zinc-400"
                        }`}
                      >
                        {filter.icon}
                        {filter.label}
                      </Link>
                    ))}
                 </div>
              </div>
            </div>

            <div className="mb-8 flex items-center justify-between border-b border-zinc-800 pb-8 text-white">
               <div className="text-sm font-bold text-zinc-500">
                  SHOWING <span className="text-white">{results.length}</span> INTELLIGENCE ASSETS 
                  {query && <> FOR <span className="text-blue-400">"{query.toUpperCase()}"</span></>}
               </div>
               
               <div className="flex items-center gap-6">
                  <button className="flex items-center gap-2 text-xs font-black text-white hover:text-blue-400 transition-colors">
                     <Filter className="w-4 h-4" />
                     ADVANCED FILTERS
                  </button>
               </div>
            </div>

            {results.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {results.map((insight) => (
                        <InsightCard key={insight.slug} insight={insight} />
                    ))}
                </div>
            ) : (
                <div className="text-zinc-600 py-32 text-center bg-zinc-900/20 rounded-[3rem] border border-dashed border-zinc-800">
                    <Zap className="w-12 h-12 mx-auto mb-6 opacity-20" />
                    <p className="text-lg font-bold">No intelligence assets found matching your explorer criteria.</p>
                    <Link to="/insights/search" className="text-blue-400 text-sm mt-4 font-black inline-block underline underline-offset-8">CLEAR ALL FILTERS</Link>
                </div>
            )}
        </div>
    );
};

export default InsightExplorer;
