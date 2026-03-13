import { useEffect } from "react";
import { useParams, Navigate, Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, Clock, Calendar, User } from "lucide-react";
import ArticleQuickSummary from "@/components/intelligence/ArticleQuickSummary";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ReadingProgress from "@/components/ReadingProgress";
import SocialShare from "@/components/SocialShare";
import { initAnalytics, trackArticleScroll, trackView } from "@/utils/analytics";
import { allInsights } from "@/data/insightsData";

const InsightPost = () => {
    const { slug } = useParams<{ slug: string }>();
    const post = slug ? allInsights.find((i) => i.slug === slug) : null;

    // ── SEO & Analytics ───────────────────────────────────────────────────
    useEffect(() => {
        initAnalytics();
        
        if (post) {
            document.title = `${post.title} | Gamr Insights`;
            trackView(`/insights/${post.slug}`);
            
            // Basic Meta Description
            let metaDesc = document.querySelector("meta[name='description']");
            if (!metaDesc) {
                metaDesc = document.createElement("meta");
                metaDesc.setAttribute("name", "description");
                document.head.appendChild(metaDesc);
            }
            metaDesc.setAttribute("content", post.excerpt);

            // OpenGraph Title
            let ogTitle = document.querySelector("meta[property='og:title']");
            if (!ogTitle) {
                ogTitle = document.createElement("meta");
                ogTitle.setAttribute("property", "og:title");
                document.head.appendChild(ogTitle);
            }
            ogTitle.setAttribute("content", post.title);

            // OpenGraph Image
            let ogImage = document.querySelector("meta[property='og:image']");
            if (!ogImage) {
                ogImage = document.createElement("meta");
                ogImage.setAttribute("property", "og:image");
                document.head.appendChild(ogImage);
            }
            ogImage.setAttribute("content", post.coverImage);
        }
        
        return () => {
            document.title = "Gamr";
        };
    }, [post]);

    // ── Scroll Depth Tracking ─────────────────────────────────────────────
    useEffect(() => {
        if (!post) return;
        
        let maxScroll = 0;
        const handleScroll = () => {
            const h = document.documentElement;
            const b = document.body;
            const st = "scrollTop";
            const sh = "scrollHeight";
            
            const percent = ((h[st] || b[st]) / ((h[sh] || b[sh]) - h.clientHeight)) * 100;
            if (percent > maxScroll) {
                maxScroll = percent;
                if (maxScroll >= 25 && maxScroll < 26) trackArticleScroll(post.slug, 25);
                if (maxScroll >= 50 && maxScroll < 51) trackArticleScroll(post.slug, 50);
                if (maxScroll >= 75 && maxScroll < 76) trackArticleScroll(post.slug, 75);
                if (maxScroll >= 99) trackArticleScroll(post.slug, 100);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [post]);

    if (!post) {
        return <Navigate to="/insights" replace />;
    }

    // ── Related articles: same category, exclude self, max 3 ──────────────
    const related = allInsights
        .filter((i) => i.category === post.category && i.slug !== post.slug)
        .slice(0, 3);

    const categoryLabel =
        post.category === "case-study" ? "Case Study" : "Blog";

    return (
        <div className="min-h-screen bg-black text-white selection:bg-blue-500/30">
            <ReadingProgress />
            <Header />
            <main className="pt-32 pb-20">
                <div className="container mx-auto px-6 max-w-4xl">

                    {/* ── Back link ──────────────────────────────────────── */}
                    <Link
                        to="/insights"
                        className="inline-flex items-center text-sm font-bold text-gray-500 hover:text-white uppercase tracking-widest transition-colors mb-12"
                    >
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Insights
                    </Link>

                    {/* ── Article hero / meta ────────────────────────────── */}
                    <div className="mb-14 border-b border-white/10 pb-12">
                        <div className="flex flex-wrap items-center gap-4 mb-6">
                            <span className="text-[10px] font-bold text-blue-400 uppercase tracking-widest bg-blue-500/10 px-3 py-1">
                                {categoryLabel}
                            </span>
                            <span className="flex items-center gap-1.5 text-xs text-gray-500 font-medium">
                                <Calendar className="h-3 w-3" />
                                {post.date}
                            </span>
                            <span className="flex items-center gap-1.5 text-xs text-gray-500 font-medium">
                                <Clock className="h-3 w-3" />
                                {post.readTime}
                            </span>
                            <Link to={`/authors/${encodeURIComponent(post.author)}`} className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-blue-400 transition-colors font-medium">
                                <User className="h-3 w-3" />
                                {post.author}
                            </Link>
                        </div>

                        <h1 className="text-4xl md:text-6xl font-bold tracking-tighter leading-tight uppercase">
                            {post.title}
                        </h1>

                        <p className="mt-6 text-lg text-gray-400 leading-relaxed max-w-2xl">
                            {post.excerpt}
                        </p>
                        
                        {post.tags && post.tags.length > 0 && (
                            <div className="flex flex-wrap gap-2 mt-6">
                                {post.tags.map((tag) => (
                                    <Link key={tag} to={`/insights/search?q=${encodeURIComponent(tag)}`} className="text-[10px] font-bold text-gray-500 hover:text-white uppercase tracking-widest border border-white/10 px-3 py-1.5 rounded-full transition-colors">
                                        #{tag}
                                    </Link>
                                ))}
                            </div>
                        )}

                        <ArticleQuickSummary excerpt={post.excerpt} tags={post.tags} />
                    </div>
                    
                    <div className="mb-14 overflow-hidden rounded-xl border border-white/10 bg-gray-900 aspect-video">
                        <img 
                            src={post.coverImage} 
                            alt={post.title} 
                            className="w-full h-full object-cover"
                            loading="lazy"
                        />
                    </div>

                    {/* ── Article body ───────────────────────────────────── */}
                    <div className="mb-20 space-y-6">
                        {post.content
                            .split("\n\n")
                            .map((paragraph, index) => {
                                const trimmed = paragraph.trim();
                                if (!trimmed) return null;
                                return (
                                    <p
                                        key={index}
                                        className="text-gray-300 leading-relaxed text-lg"
                                    >
                                        {trimmed}
                                    </p>
                                );
                            })}
                    </div>
                    
                    <SocialShare url={window.location.href} title={post.title} />

                    {/* ── Related articles ───────────────────────────────── */}
                    {related.length > 0 && (
                        <div className="border-t border-white/10 pt-16">
                            <span className="text-white font-bold uppercase tracking-widest text-sm mb-8 block">
                                Related Insights
                            </span>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {related.map((item) => (
                                    <Link
                                        key={item.slug}
                                        to={`/insights/${item.slug}`}
                                        className="group flex flex-col justify-between p-7 border border-white/10 hover:border-blue-500/40 hover:bg-blue-900/10 transition-all duration-500"
                                    >
                                        <div className="space-y-4">
                                            <span className="text-[10px] font-bold text-gray-500 group-hover:text-blue-400 uppercase tracking-widest transition-colors">
                                                {item.category === "case-study"
                                                    ? "Case Study"
                                                    : "Blog"}
                                            </span>
                                            <h3 className="text-base font-bold uppercase tracking-tighter leading-tight line-clamp-3">
                                                {item.title}
                                            </h3>
                                            <p className="text-gray-500 group-hover:text-gray-300 transition-colors text-sm leading-relaxed line-clamp-3">
                                                {item.excerpt}
                                            </p>
                                        </div>
                                        <div className="pt-6 flex items-center gap-2 text-blue-400 group-hover:text-white font-bold uppercase text-xs tracking-widest transition-colors">
                                            Read Article
                                            <ArrowRight className="h-3.5 w-3.5 transform group-hover:translate-x-1 transition-all duration-300" />
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default InsightPost;
