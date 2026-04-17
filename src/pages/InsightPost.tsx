import { useEffect } from "react";
import { useParams, Navigate, Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, Clock, Calendar, User } from "lucide-react";
import ArticleQuickSummary from "@/components/intelligence/ArticleQuickSummary";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ReadingProgress from "@/components/ReadingProgress";
import SocialShare from "@/components/SocialShare";
import { initAnalytics, trackArticleScroll, trackView } from "@/utils/analytics";
import { useInsights } from "@/context/InsightsContext";
import RelatedArticles from "@/components/RelatedArticles";
import InsightCard from "@/components/InsightCard";

const InsightPost = () => {
    const { allInsights, loading } = useInsights();
    const { slug } = useParams<{ slug: string }>();
    const post = slug 
        ? allInsights.find((i) => 
            i.slug === slug || 
            encodeURIComponent(i.slug) === encodeURIComponent(slug) ||
            i.slug === decodeURIComponent(slug)
          ) 
        : null;

    // ── SEO & Analytics ───────────────────────────────────────────────────
    useEffect(() => {
        initAnalytics();
        
        if (post) {
            document.title = post.metaTitle || `${post.title} | Gamr Insights`;
            trackView(`/insights/${post.slug}`);
            
            // Basic Meta Description
            let metaDesc = document.querySelector("meta[name='description']");
            if (!metaDesc) {
                metaDesc = document.createElement("meta");
                metaDesc.setAttribute("name", "description");
                document.head.appendChild(metaDesc);
            }
            metaDesc.setAttribute("content", post.metaDescription || post.excerpt);

            // Keywords
            if (post.keywords && post.keywords.length > 0) {
                let metaKeywords = document.querySelector("meta[name='keywords']");
                if (!metaKeywords) {
                    metaKeywords = document.createElement("meta");
                    metaKeywords.setAttribute("name", "keywords");
                    document.head.appendChild(metaKeywords);
                }
                metaKeywords.setAttribute("content", post.keywords.join(", "));
            }

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

    if (loading) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <div className="flex flex-col items-center gap-4 text-center">
                    <div className="w-10 h-10 rounded-full border-4 border-blue-500 border-t-transparent animate-spin mx-auto" />
                    <p className="text-gray-400 uppercase tracking-widest text-xs font-bold">Loading Article...</p>
                </div>
            </div>
        );
    }

    if (!post) {
        return <Navigate to="/insights" replace />;
    }


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
                            <Link to={`/insights/author/${post.author.slug}`} className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-blue-400 transition-colors font-medium">
                                <User className="h-3 w-3" />
                                {post.author.name}
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
                            className="w-full h-full object-cover object-[center_20%]"
                            loading="lazy"
                        />
                    </div>

                    {/* ── Article body ───────────────────────────────────── */}
                    <div className="mb-20">
                        {/* Detect HTML content (from TipTap rich text editor) vs markdown (static articles) */}
                        {/<[a-z][\s\S]*>/i.test(post.content) ? (
                            /* ── HTML renderer (TipTap / Rich Text submissions) ─── */
                            <>
                                <style>{`
                                    .article-html-content h1 { font-size: 2rem; font-weight: 800; color: white; margin-top: 2.5rem; margin-bottom: 1rem; text-transform: uppercase; letter-spacing: -0.02em; border-left: 4px solid #2563eb; padding-left: 1.5rem; }
                                    .article-html-content h2 { font-size: 1.5rem; font-weight: 700; color: white; margin-top: 2rem; margin-bottom: 0.75rem; text-transform: uppercase; letter-spacing: -0.02em; border-left: 4px solid #2563eb; padding-left: 1.5rem; }
                                    .article-html-content h3 { font-size: 1.25rem; font-weight: 700; color: white; margin-top: 1.5rem; margin-bottom: 0.5rem; }
                                    .article-html-content p { color: #d1d5db; line-height: 1.8; font-size: 1.125rem; margin-bottom: 1.25rem; font-weight: 500; }
                                    .article-html-content strong { color: white; font-weight: 700; }
                                    .article-html-content em { color: #e5e7eb; font-style: italic; }
                                    .article-html-content a { color: #60a5fa; text-decoration: underline; text-underline-offset: 4px; }
                                    .article-html-content a:hover { color: #93c5fd; }
                                    .article-html-content ul, .article-html-content ol { color: #d1d5db; padding-left: 1.5rem; margin-bottom: 1.25rem; line-height: 1.8; font-size: 1.125rem; }
                                    .article-html-content ul { list-style-type: disc; }
                                    .article-html-content ol { list-style-type: decimal; }
                                    .article-html-content li { margin-bottom: 0.5rem; }
                                    .article-html-content blockquote { border-left: 4px solid #3b82f6; padding: 1rem 1.5rem; margin: 1.5rem 0; background: rgba(59,130,246,0.05); color: #9ca3af; font-style: italic; }
                                    .article-html-content img { width: 100%; border-radius: 0.75rem; margin: 2rem 0; border: 1px solid rgba(255,255,255,0.1); }
                                    .article-html-content video, .article-html-content audio { width: 100%; margin: 1.5rem 0; border-radius: 0.75rem; }
                                    .article-html-content table { width: 100%; border-collapse: collapse; margin: 1.5rem 0; }
                                    .article-html-content th, .article-html-content td { border: 1px solid rgba(255,255,255,0.1); padding: 0.75rem 1rem; text-align: left; color: #d1d5db; }
                                    .article-html-content th { background: rgba(255,255,255,0.05); color: white; font-weight: 700; text-transform: uppercase; font-size: 0.75rem; letter-spacing: 0.1em; }
                                    .article-html-content code { background: rgba(255,255,255,0.1); padding: 0.2rem 0.4rem; border-radius: 0.25rem; font-size: 0.875em; color: #f472b6; }
                                    .article-html-content pre { background: rgba(0,0,0,0.5); padding: 1.5rem; border-radius: 0.75rem; overflow-x: auto; margin: 1.5rem 0; border: 1px solid rgba(255,255,255,0.1); }
                                    .article-html-content pre code { background: transparent; padding: 0; color: #d1d5db; }
                                    .article-html-content hr { border: none; border-top: 1px solid rgba(255,255,255,0.1); margin: 2rem 0; }
                                `}</style>
                                <div
                                    className="article-html-content"
                                    dangerouslySetInnerHTML={{ __html: post.content }}
                                />
                            </>
                        ) : (
                            /* ── Markdown renderer (static articles) ──────────── */
                            <div className="space-y-8">
                                {post.content
                                    .split("\n\n")
                                    .map((paragraph, index) => {
                                        const trimmed = paragraph.trim();
                                        if (!trimmed) return null;

                                        // Handle Section Headers (Lines that are entirely bold)
                                        if (trimmed.startsWith("**") && trimmed.endsWith("**") && !trimmed.includes("\n")) {
                                            return (
                                                <h2 
                                                    key={index} 
                                                    className="text-2xl md:text-3xl font-bold text-white pt-10 pb-4 tracking-tight uppercase border-l-4 border-blue-600 pl-6"
                                                >
                                                    {trimmed.replace(/\*\*/g, "")}
                                                </h2>
                                            );
                                        }

                                        // Handle Inline Images
                                        if (trimmed.startsWith("![") && trimmed.endsWith(")")) {
                                            const match = trimmed.match(/!\[(.*?)\]\((.*?)\)/);
                                            if (match) {
                                                const alt = match[1];
                                                const src = match[2];
                                                return (
                                                    <div key={index} className="my-14 overflow-hidden rounded-2xl border border-white/10 bg-gray-900 w-full aspect-[4/3] md:aspect-video shadow-2xl shadow-blue-500/10 group">
                                                        <img 
                                                            src={src} 
                                                            alt={alt} 
                                                            className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-700" 
                                                            loading="lazy" 
                                                        />
                                                    </div>
                                                );
                                            }
                                        }

                                        // Handle Pacing (Short emphasized lines)
                                        if (trimmed.split(" ").length < 4 && trimmed.endsWith(".")) {
                                            return (
                                                <p 
                                                    key={index} 
                                                    className="text-2xl font-black text-white italic tracking-tighter opacity-90 py-2"
                                                >
                                                    {trimmed}
                                                </p>
                                            );
                                        }

                                        // Simple formatting for bold, italic and links
                                        const formatted = trimmed
                                            .replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-white">$1</strong>')
                                            .replace(/\*(.*?)\*/g, '<em class="italic text-gray-200">$1</em>')
                                            .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" class="text-blue-400 hover:text-blue-300 underline underline-offset-4 transition-colors" target="_blank" rel="noopener noreferrer">$1</a>');

                                        return (
                                            <p
                                                key={index}
                                                className="text-gray-300 leading-relaxed text-lg md:text-xl font-medium"
                                                dangerouslySetInnerHTML={{ __html: formatted }}
                                            />
                                        );
                                    })}
                            </div>
                        )}
                    </div>
                    
                    <SocialShare url={window.location.href} title={post.title} />

                    {/* More from this Author */}
                    {(() => {
                        const authorArticles = allInsights.filter(i => i.author.slug === post.author.slug && i.slug !== post.slug).slice(0, 3);
                        if (authorArticles.length > 0) {
                            return (
                                <div className="mt-20 border-t border-white/10 pt-16 mb-16">
                                    <div className="flex items-center gap-4 mb-8">
                                        <div className="h-4 w-1 bg-blue-600" />
                                        <h3 className="text-xl md:text-2xl font-black uppercase tracking-widest">
                                            More from {post.author.name.split(' ')[0]}
                                        </h3>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                        {authorArticles.map((story) => (
                                            <InsightCard key={story.slug} insight={story} />
                                        ))}
                                    </div>
                                    <div className="mt-8 text-center">
                                        <Link 
                                            to={`/insights/author/${post.author.slug}`}
                                            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-blue-400 transition-colors"
                                        >
                                            View Author Profile
                                            <ArrowRight className="w-4 h-4" />
                                        </Link>
                                    </div>
                                </div>
                            );
                        }
                        return null;
                    })()}

                    {/* Related Articles (AI Recommendations) */}
                    <div className="mt-16 sm:mt-24 border-t border-white/10 pt-16">
                        <RelatedArticles currentArticle={post} allInsights={allInsights} />
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default InsightPost;
