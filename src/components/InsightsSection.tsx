import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import InsightCarousel from "@/components/InsightCarousel";
import AuthorSpotlight from "@/components/AuthorSpotlight";
import { useInsights } from "@/context/InsightsContext";

const InsightsSection = () => {
    const { allInsights, caseStudies, blogPosts } = useInsights();
    const navigate = useNavigate();
    const featuredArticle = allInsights.find(i => i.featured) || allInsights[0];

    return (
        <section id="case-studies" className="py-32 bg-black text-white overflow-hidden">
            <div id="blog" />
            <div className="container mx-auto px-6">
                {/* Section Header */}
                <div className="flex flex-col gap-12 mb-20 animate-fade-in">
                    <span className="text-blue-500 font-bold uppercase tracking-widest text-sm">Insights &amp; Impact</span>
                    <h2 className="text-5xl md:text-8xl font-bold tracking-tighter leading-none uppercase">
                        Beyond The<br />Screen.
                    </h2>
                    <p className="text-xl text-gray-400 max-w-2xl leading-relaxed">
                        Exploring the intersection of technology, culture, and competition. Our latest research and success stories.
                    </p>
                </div>

                {/* ── Queen of Venus Featured Spotlight ─────────────────── */}
                <div className="mb-16">
                    <div
                        className="group relative block w-full h-[420px] overflow-hidden border border-white/10 hover:border-blue-500/40 transition-all duration-500 cursor-pointer"
                        onClick={() => navigate(`/insights/${featuredArticle.slug}`)}
                        role="link"
                        tabIndex={0}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") navigate(`/insights/${featuredArticle.slug}`);
                        }}
                    >
                        {/* Background image */}
                        <div className="absolute inset-0">
                            <img
                                src={featuredArticle.coverImage}
                                alt={featuredArticle.title}
                                className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                                loading="lazy"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
                        </div>

                        {/* Content overlay */}
                        <div className="absolute bottom-0 left-0 w-full p-8 md:p-10">
                            {/* Badges row */}
                            <div className="flex items-center gap-3 mb-4">
                                <span className="bg-blue-600 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1.5">
                                    Featured Story
                                </span>
                                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                                    {featuredArticle.category === "case-study" ? "Case Study" : "Blog"} · {featuredArticle.readTime}
                                </span>
                            </div>

                            <h3 className="text-3xl md:text-5xl font-black uppercase tracking-tighter leading-tight mb-3 group-hover:text-blue-300 transition-colors max-w-3xl">
                                {featuredArticle.title}
                            </h3>
                            <p className="text-gray-300 text-sm max-w-2xl mb-6 line-clamp-2 md:line-clamp-none">
                                {featuredArticle.excerpt}
                            </p>

                            <div className="flex items-center gap-2 text-blue-400 group-hover:text-white font-bold uppercase text-xs tracking-widest transition-colors">
                                Read Story
                                <ArrowRight className="h-4 w-4 transform group-hover:translate-x-2 transition-all duration-300" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* ── Author Spotlight ───────────────────────────────────── */}
                <div className="mb-20">
                    <AuthorSpotlight />
                </div>

                {/* ── Content Carousels ──────────────────────────────────── */}
                <div className="space-y-16">
                    <InsightCarousel title="SUCCESS STORIES" insights={caseStudies} />
                    <InsightCarousel title="THE FUTURE OF PLAY" insights={blogPosts} />
                </div>

                {/* ── CTA ────────────────────────────────────────────────── */}
                <div className="pt-20 flex justify-center">
                    <Button
                        className="bg-transparent border border-white text-white hover:bg-white hover:text-black rounded-none px-12 py-8 text-sm font-bold uppercase tracking-widest transition-all"
                        asChild
                    >
                        <Link to="/insights">
                            View All Insights
                        </Link>
                    </Button>
                </div>
            </div>
        </section>
    );
};

export default InsightsSection;
