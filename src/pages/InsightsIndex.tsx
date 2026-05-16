import { useState, useEffect, useRef } from "react";
import { ArrowRight, Flame, PlusCircle, Loader2, Search } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import InsightCard from "@/components/InsightCard";
import NewsletterForm from "@/components/NewsletterForm";
import { useInsights } from "@/context/InsightsContext";
import TrendingSection from "@/components/TrendingSection";
import AuthorSpotlight from "@/components/AuthorSpotlight";

type FilterTab = "all" | "case-study" | "blog";

const InsightsIndex = () => {
    const { allInsights, loading } = useInsights();
    const [activeTab, setActiveTab] = useState<FilterTab>("all");
    const [visibleCount, setVisibleCount] = useState<number>(6);
    const observerTarget = useRef<HTMLDivElement>(null);
    const heroRef = useRef<HTMLDivElement>(null);

    // deriving data
    const featuredArticle = allInsights.find(i => i.featured) || allInsights[0];
    
    // sorting for main feed
    const filteredInsights = activeTab === "all"
        ? allInsights.filter(i => i.slug !== featuredArticle.slug)
        : allInsights.filter((i) => i.category === activeTab && i.slug !== featuredArticle.slug);
        
    const visibleInsights = filteredInsights.slice(0, visibleCount);
    const hasMore = visibleCount < filteredInsights.length;

    // Reset visible count on tab change
    useEffect(() => {
        setVisibleCount(6);
    }, [activeTab]);

    if (loading) {
        return <div className="min-h-screen bg-black flex items-center justify-center"><Loader2 className="w-12 h-12 animate-spin text-blue-500" /></div>;
    }

    return (
        <div className="min-h-screen bg-black text-white selection:bg-blue-500/30 font-sans">
            <Header />
            <main className="pt-32 pb-32">
                <div className="container mx-auto px-6">
                    
                    {/* Editorial Header */}
                    <div 
                        ref={heroRef}
                        className="flex flex-col gap-8 mb-20 animate-fade-in"
                    >
                        <div className="flex items-center gap-4">
                            <span className="text-blue-500 font-bold uppercase tracking-[0.3em] text-[10px]">Insights & Impact</span>
                            <div className="h-px w-12 bg-white/10" />
                        </div>
                        <h1 className="text-6xl md:text-9xl font-black tracking-tighter leading-[0.8] uppercase max-w-4xl">
                            BEYOND THE <br/> SCREEN.
                        </h1>
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mt-4">
                            <p className="text-xl text-gray-400 max-w-xl leading-relaxed font-light">
                                Exploring the intersection of technology, culture, and competition. Our latest research, success stories, and deep dives.
                            </p>
                            <div className="relative group max-w-xs w-full">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-hover:text-blue-500 transition-colors" />
                                <input 
                                    type="text" 
                                    placeholder="SEARCH ARTICLES..." 
                                    className="w-full bg-white/[0.03] border border-white/10 py-4 pl-12 pr-4 rounded-sm text-[10px] font-bold tracking-widest focus:outline-none focus:border-blue-500/50 transition-all uppercase"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Featured Article — High End Presentation */}
                    {featuredArticle && (
                        <div className="mb-32 relative group">
                            <Link 
                                to={`/insights/${featuredArticle.slug}`}
                                className="block relative aspect-[21/9] min-h-[500px] overflow-hidden rounded-sm border border-white/5"
                            >
                                <img 
                                    src={featuredArticle.coverImage} 
                                    alt={featuredArticle.title}
                                    className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 transition-all duration-1000 scale-[1.02] group-hover:scale-100" 
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                                
                                <div className="absolute bottom-0 left-0 w-full p-8 md:p-16 flex flex-col md:flex-row md:items-end justify-between gap-8">
                                    <div className="max-w-3xl space-y-6">
                                        <div className="flex items-center gap-3">
                                            <span className="bg-blue-600 text-white text-[9px] font-bold uppercase tracking-[0.2em] px-3 py-1 rounded-sm">
                                                Featured Story
                                            </span>
                                            <span className="text-white/50 text-[9px] font-bold uppercase tracking-[0.2em] ml-2">
                                                {featuredArticle.category === 'blog' ? 'Blog' : 'Case Study'} • {featuredArticle.readTime}
                                            </span>
                                        </div>
                                        <h2 className="text-4xl md:text-7xl font-bold uppercase tracking-tighter leading-[0.9] group-hover:text-blue-400 transition-colors">
                                            {featuredArticle.title}
                                        </h2>
                                        <p className="text-gray-300 text-lg font-light max-w-xl line-clamp-2">
                                            {featuredArticle.excerpt}
                                        </p>
                                    </div>
                                    <div className="flex-shrink-0">
                                        <div className="w-20 h-20 rounded-full border border-white/20 flex items-center justify-center group-hover:border-blue-500 group-hover:bg-blue-500 transition-all duration-500">
                                            <ArrowRight className="w-8 h-8 text-white group-hover:scale-110 transition-transform" />
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    )}

                    {/* Trending Insights Bar */}
                    <div className="mb-32">
                        <TrendingSection insights={allInsights} />
                    </div>

                    {/* Author Spotlight — Restored Omission */}
                    <div className="mb-32">
                        <AuthorSpotlight />
                    </div>

                    {/* Content Section */}
                    <div className="flex flex-col lg:flex-row gap-20">
                        
                        {/* Feed */}
                        <div className="flex-grow">
                            <div className="flex items-center justify-between mb-12 border-b border-white/5 pb-8">
                                <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
                                    {(["all", "case-study", "blog"] as FilterTab[]).map((tab) => (
                                        <button
                                            key={tab}
                                            onClick={() => setActiveTab(tab)}
                                            className={`px-6 py-3 text-[10px] font-bold uppercase tracking-[0.2em] transition-all rounded-sm border ${
                                                activeTab === tab
                                                    ? "bg-white text-black border-white"
                                                    : "bg-transparent text-gray-500 border-white/10 hover:border-white/30 hover:text-white"
                                            }`}
                                        >
                                            {tab === "all" ? "All Stories" : tab === "case-study" ? "Success Stories" : "Latest Blog"}
                                        </button>
                                    ))}
                                </div>
                                <span className="hidden md:block text-gray-600 text-[10px] font-bold uppercase tracking-widest">
                                    {filteredInsights.length} Articles
                                </span>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                {visibleInsights.map((item) => (
                                    <InsightCard key={item.slug} insight={item} />
                                ))}
                            </div>

                            {hasMore && (
                                <div className="mt-20 flex justify-center">
                                    <button 
                                        onClick={() => setVisibleCount(prev => prev + 6)}
                                        className="px-16 py-5 border border-white/10 text-white font-bold uppercase tracking-widest text-[10px] hover:bg-white hover:text-black transition-all rounded-sm"
                                    >
                                        Explore More
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* Sidebar */}
                        <div className="lg:w-96 flex-shrink-0">
                            <div className="space-y-12 sticky top-32">
                                {/* Contributor CTA */}
                                <div className="bg-gradient-to-br from-blue-600 to-blue-800 p-10 rounded-sm relative overflow-hidden group">
                                    <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -mr-20 -mt-20 blur-3xl group-hover:scale-150 transition-transform duration-700" />
                                    <PlusCircle className="h-12 w-12 text-white mb-8" />
                                    <h3 className="text-3xl font-black uppercase tracking-tighter leading-tight text-white mb-6">
                                        JOIN THE <br/>EDITORIAL <br/>NETWORK.
                                    </h3>
                                    <p className="text-blue-100 text-sm mb-10 font-medium leading-relaxed opacity-80">
                                        We are looking for writers, researchers, and creators shaping the African gaming landscape.
                                    </p>
                                    <Link to="/insights/submit">
                                        <button className="w-full bg-white text-blue-600 font-bold py-5 rounded-sm hover:bg-gray-100 transition-colors uppercase tracking-widest text-[10px]">
                                            Submit Your Story
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Large Footer-level Newsletter */}
                    <NewsletterForm source="blog" tags={["blog_index"]} />
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default InsightsIndex;
