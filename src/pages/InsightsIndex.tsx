import { useState, useEffect, useRef } from "react";
import { ArrowRight, Flame } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import InsightCard from "@/components/InsightCard";
import NewsletterForm from "@/components/NewsletterForm";
import InsightSearch from "@/components/InsightSearch";
import { Insight } from "@/data/insightsData";
import { useInsights } from "@/context/InsightsContext";
import TrendingSection from "@/components/TrendingSection";
import { PlusCircle, Loader2 } from "lucide-react";

type FilterTab = "all" | "case-study" | "blog";

const InsightsIndex = () => {
    const { allInsights, loading } = useInsights();
    const [activeTab, setActiveTab] = useState<FilterTab>("all");
    const [visibleCount, setVisibleCount] = useState<number>(6);
    const observerTarget = useRef<HTMLDivElement>(null);

    // Derive data
    const featuredArticle = allInsights.find(i => i.featured) || allInsights[0];
    
    // Sort for trending
    const trendingInsights = [...allInsights]
        .sort((a, b) => (b.trendingScore || 0) - (a.trendingScore || 0))
        .slice(0, 5);

    // Filter main feed (exclude featured if you want, but often it stays in the feed)
    const filteredInsights = activeTab === "all"
        ? allInsights.filter(i => i.slug !== featuredArticle.slug) // Exclude hero from feed to avoid dupes
        : allInsights.filter((i) => i.category === activeTab && i.slug !== featuredArticle.slug);
        
    const visibleInsights = filteredInsights.slice(0, visibleCount);
    const hasMore = visibleCount < filteredInsights.length;

    // Infinite scroll observer
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && hasMore) {
                    setVisibleCount(prev => prev + 6);
                }
            },
            { threshold: 0.1 }
        );

        if (observerTarget.current) {
            observer.observe(observerTarget.current);
        }

        return () => observer.disconnect();
    }, [hasMore]);

    // Reset visible count on tab change
    useEffect(() => {
        setVisibleCount(6);
    }, [activeTab]);

    if (loading || !allInsights.length) {
        return <div className="min-h-screen bg-black flex items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-blue-500" /></div>;
    }

    return (
        <div className="min-h-screen bg-black text-white selection:bg-blue-500/30">
            <Header />
            <main className="pt-32 pb-20">
                <div className="container mx-auto px-6">
                    
                    {/* Header Text */}
                    <div className="flex flex-col gap-6 mb-12 animate-fade-in">
                        <span className="text-blue-500 font-bold uppercase tracking-widest text-sm">Gamr Media</span>
                        <h1 className="text-5xl md:text-8xl font-bold tracking-tighter leading-none uppercase">
                            Insights.
                        </h1>
                        <p className="text-xl text-gray-400 max-w-2xl leading-relaxed mb-6">
                            Exploring the intersection of technology, culture, and competition. Our latest research and success stories.
                        </p>
                        <InsightSearch />
                    </div>

                    {/* Featured Article Hero */}
                    <Link 
                        to={`/insights/${featuredArticle.slug}`}
                        className="group relative block w-full h-[500px] mb-20 overflow-hidden border border-white/10"
                    >
                        <div className="absolute inset-0">
                            <img 
                                src={featuredArticle.coverImage} 
                                alt={featuredArticle.title}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                        </div>
                        <div className="absolute bottom-0 left-0 w-full p-8 md:p-12">
                            <span className="inline-block bg-blue-500 text-white text-xs font-bold uppercase tracking-widest px-3 py-1 mb-4">
                                Featured
                            </span>
                            <h2 className="text-3xl md:text-5xl font-bold uppercase tracking-tighter max-w-4xl mb-4 group-hover:text-blue-400 transition-colors">
                                {featuredArticle.title}
                            </h2>
                            <p className="text-gray-300 max-w-2xl mb-6 line-clamp-2 md:line-clamp-none">
                                {featuredArticle.excerpt}
                            </p>
                            <div className="flex items-center text-blue-400 font-bold uppercase text-sm tracking-widest">
                                Read Article
                                <ArrowRight className="ml-2 h-4 w-4 transform group-hover:translate-x-2 transition-all duration-300" />
                            </div>
                        </div>
                    </Link>

                    {/* New Trending Section (Horizontal Scroll) */}
                    <div className="mb-20">
                        <TrendingSection insights={allInsights} />
                    </div>

                    {/* Main Layout: Grid + Sidebar */}
                    <div className="flex flex-col lg:flex-row gap-12">
                        
                        {/* Left: Feed */}
                        <div className="flex-grow">
                            {/* Filter Tabs */}
                            <div className="flex items-center gap-2 mb-8 border-b border-white/10 pb-4 overflow-x-auto whitespace-nowrap">
                                {(["all", "case-study", "blog"] as FilterTab[]).map((tab) => (
                                    <button
                                        key={tab}
                                        onClick={() => setActiveTab(tab)}
                                        className={`flex-shrink-0 px-5 py-2 text-xs font-bold uppercase tracking-widest transition-all border ${
                                            activeTab === tab
                                                ? "bg-white text-black border-white"
                                                : "bg-transparent text-gray-400 border-white/20 hover:border-white/50 hover:text-white"
                                        }`}
                                    >
                                        {tab === "all" ? "All" : tab === "case-study" ? "Case Studies" : "Blog Posts"}
                                    </button>
                                ))}
                            </div>

                            {/* Feed Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {visibleInsights.map((item) => (
                                    <InsightCard key={item.slug} insight={item} />
                                ))}
                            </div>

                            {/* Infinite Scroll Trigger */}
                            {hasMore && (
                                <div ref={observerTarget} className="py-12 flex justify-center">
                                    <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                                </div>
                            )}
                            {!hasMore && filteredInsights.length > 0 && (
                                <div className="py-12 text-center text-gray-500 text-sm font-bold uppercase tracking-widest">
                                    You've reached the end
                                </div>
                            )}
                        </div>

                        {/* Right: Sidebar / CTA */}
                        <div className="lg:w-80 flex-shrink-0">
                            <div className="bg-blue-600 p-8 sticky top-32 rounded-3xl overflow-hidden group">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl group-hover:scale-150 transition-transform duration-500" />
                                <PlusCircle className="h-10 w-10 text-white mb-6" />
                                <h3 className="text-2xl font-black uppercase tracking-tighter leading-tight text-white mb-4">
                                    Become a <br/>Contributor
                                </h3>
                                <p className="text-blue-100 text-sm mb-8 font-medium leading-relaxed">
                                    Got a story about gaming culture, technology, or competition? Join our editorial network.
                                </p>
                                <Link to="/insights/submit">
                                    <button className="w-full bg-white text-blue-600 font-bold py-4 rounded-xl hover:bg-gray-100 transition-colors uppercase tracking-widest text-xs">
                                        Submit Article
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Newsletter Container */}
                    <NewsletterForm source="insights" tags={["insights_index"]} />
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default InsightsIndex;
