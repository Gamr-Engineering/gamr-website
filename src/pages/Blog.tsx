import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { allInsights } from "@/data/insightsData";

type FilterTab = "all" | "case-study" | "blog";

const Blog = () => {
    const [activeTab, setActiveTab] = useState<FilterTab>("all");

    const filtered =
        activeTab === "all"
            ? allInsights
            : allInsights.filter((i) => i.category === activeTab);

    return (
        <div className="min-h-screen bg-black text-white selection:bg-blue-500/30">
            <Header />
            <main className="pt-32 pb-20">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col gap-6 mb-12 animate-fade-in">
                        <span className="text-blue-500 font-bold uppercase tracking-widest text-sm">Insights &amp; Impact</span>
                        <h1 className="text-5xl md:text-8xl font-bold tracking-tighter leading-none uppercase">
                            Our Blog.
                        </h1>
                        <p className="text-xl text-gray-400 max-w-2xl leading-relaxed">
                            Exploring the intersection of technology, culture, and competition. Our latest research and success stories.
                        </p>
                    </div>

                    {/* Filter Tabs */}
                    <div className="flex items-center gap-2 mb-10 border-b border-white/10 pb-4">
                        {(["all", "case-study", "blog"] as FilterTab[]).map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-5 py-2 text-xs font-bold uppercase tracking-widest transition-all border ${
                                    activeTab === tab
                                        ? "bg-white text-black border-white"
                                        : "bg-transparent text-gray-400 border-white/20 hover:border-white/50 hover:text-white"
                                }`}
                            >
                                {tab === "all" ? "All" : tab === "case-study" ? "Case Studies" : "Blog Posts"}
                            </button>
                        ))}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filtered.map((item) => (
                            <Link
                                to={`/blog/${item.id}`}
                                key={item.id}
                                className="group flex flex-col justify-between p-8 border border-white/10 hover:border-blue-500/50 hover:bg-blue-900/10 transition-all duration-500 cursor-pointer"
                            >
                                <div className="space-y-5">
                                    <div className="flex justify-between items-center">
                                        <span className="text-[10px] font-bold text-gray-500 group-hover:text-blue-400 uppercase tracking-widest transition-colors">
                                            {item.category === "case-study" ? "Case Study" : "Blog"}
                                        </span>
                                        <span className="text-[10px] text-gray-600 font-medium">
                                            {item.date}
                                        </span>
                                    </div>
                                    <h3 className="text-xl font-bold uppercase tracking-tighter leading-tight line-clamp-3">
                                        {item.title}
                                    </h3>
                                    <p className="text-gray-400 group-hover:text-gray-300 transition-colors leading-relaxed text-sm line-clamp-3">
                                        {item.excerpt}
                                    </p>
                                </div>
                                <div className="pt-10 flex items-center text-blue-500 font-bold uppercase text-xs tracking-widest">
                                    Read Article
                                    <ArrowRight className="ml-2 h-4 w-4 transform group-hover:translate-x-2 transition-all duration-300" />
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default Blog;
