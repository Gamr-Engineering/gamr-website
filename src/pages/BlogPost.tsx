import { useEffect } from "react";
import { useParams, Navigate, Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, Clock, Calendar } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { allInsights } from "@/data/insightsData";

const BlogPost = () => {
    const { id } = useParams<{ id: string }>();
    const post = id ? allInsights.find((i) => i.id === id) : null;

    // ── SEO meta ──────────────────────────────────────────────────────────
    useEffect(() => {
        if (post) {
            document.title = `${post.title} | Gamr`;
            const metaDesc = document.querySelector("meta[name='description']");
            if (metaDesc) {
                metaDesc.setAttribute("content", post.excerpt);
            } else {
                const tag = document.createElement("meta");
                tag.name = "description";
                tag.content = post.excerpt;
                document.head.appendChild(tag);
            }
        }
        return () => {
            document.title = "Gamr";
        };
    }, [post]);

    if (!post) {
        return <Navigate to="/blog" replace />;
    }

    // ── Related articles: same category, exclude self, max 3 ──────────────
    const related = allInsights
        .filter((i) => i.category === post.category && i.id !== post.id)
        .slice(0, 3);

    const categoryLabel =
        post.category === "case-study" ? "Case Study" : "Blog";

    return (
        <div className="min-h-screen bg-black text-white selection:bg-blue-500/30">
            <Header />
            <main className="pt-32 pb-20">
                <div className="container mx-auto px-6 max-w-4xl">

                    {/* ── Back link ──────────────────────────────────────── */}
                    <Link
                        to="/blog"
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
                        </div>

                        <h1 className="text-4xl md:text-6xl font-bold tracking-tighter leading-tight uppercase">
                            {post.title}
                        </h1>

                        <p className="mt-6 text-lg text-gray-400 leading-relaxed max-w-2xl">
                            {post.excerpt}
                        </p>
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

                    {/* ── Related articles ───────────────────────────────── */}
                    {related.length > 0 && (
                        <div className="border-t border-white/10 pt-16">
                            <span className="text-white font-bold uppercase tracking-widest text-sm mb-8 block">
                                Related Insights
                            </span>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {related.map((item) => (
                                    <Link
                                        key={item.id}
                                        to={`/blog/${item.id}`}
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

export default BlogPost;
