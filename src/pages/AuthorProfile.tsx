import { useParams, Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useInsights } from "@/context/InsightsContext";
import { authors } from "@/data/insights/authors";
import InsightCard from "@/components/InsightCard";
import { ArrowLeft } from "lucide-react";

const AuthorProfile = () => {
    const { allInsights } = useInsights();
    const { slug } = useParams<{ slug: string }>();
    
    // Find author by slug, fallback to a 404 state if not found (or redirect)
    const authorData = slug ? authors[slug] : null;

    if (!authorData) {
        return (
            <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center">
                <h1 className="text-4xl font-bold uppercase tracking-tighter mb-4">Author Not Found</h1>
                <Link to="/insights" className="text-blue-500 hover:text-blue-400 flex items-center gap-2">
                    <ArrowLeft className="w-4 h-4" /> Back to Insights
                </Link>
            </div>
        );
    }

    const authorArticles = allInsights.filter(
        (article) => article.author.slug === authorData.slug
    );

    return (
        <div className="min-h-screen bg-black text-white selection:bg-blue-500/30 flex flex-col">
            <Header />
            <main className="flex-grow pt-32 pb-20">
                <div className="container mx-auto px-6">
                    {/* Breadcrumbs */}
                    <div className="mb-10">
                        <Link to="/insights" className="text-gray-500 hover:text-white transition-colors text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                            <ArrowLeft className="w-3 h-3" /> All Insights
                        </Link>
                    </div>

                    {/* Author Hero */}
                    <div className="mb-16 border-b border-white/10 pb-12 flex flex-col md:flex-row items-center md:items-start gap-8">
                        <div className="w-32 h-32 md:w-48 md:h-48 rounded-none overflow-hidden border border-white/20 flex-shrink-0 bg-gray-900 shadow-[0_0_30px_rgba(0,71,255,0.15)] object-cover object-top" style={{ aspectRatio: "1/1" }}>
                            {authorData.avatar ? (
                                <img src={authorData.avatar} alt={authorData.name} className="w-full h-full object-cover object-top" />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center bg-blue-600/20 text-blue-400 text-6xl font-black uppercase">
                                    {authorData.name.charAt(0)}
                                </div>
                            )}
                        </div>
                        <div className="text-center md:text-left">
                            <span className="text-blue-500 font-bold uppercase tracking-[0.3em] text-[10px]">Staff Writer</span>
                            <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mt-2 mb-4 leading-none">
                                {authorData.name}
                            </h1>
                            <p className="text-gray-400 leading-relaxed max-w-2xl text-lg">
                                {authorData.bio}
                            </p>
                            
                            {/* Socials */}
                            {authorData.social && (
                                <div className="flex items-center gap-4 justify-center md:justify-start mt-6">
                                    {authorData.social.twitter && (
                                        <a
                                            href={authorData.social.twitter}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            onClick={(e) => e.stopPropagation()}
                                            className="text-xs font-bold uppercase tracking-widest text-gray-500 hover:text-blue-400 transition-colors"
                                        >
                                            Twitter
                                        </a>
                                    )}
                                    {authorData.social.linkedin && (
                                        <a
                                            href={authorData.social.linkedin}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            onClick={(e) => e.stopPropagation()}
                                            className="text-xs font-bold uppercase tracking-widest text-gray-500 hover:text-blue-400 transition-colors"
                                        >
                                            LinkedIn
                                        </a>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                    
                    {/* Author Content Grid */}
                    <div className="mb-8 flex items-center gap-4">
                        <div className="h-4 w-1 bg-blue-600" />
                        <h2 className="text-xl md:text-2xl font-black uppercase tracking-widest">
                            Stories by {authorData.name.split(' ')[0]}
                        </h2>
                    </div>
                    
                    {authorArticles.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {authorArticles.map((insight) => (
                                <InsightCard key={insight.slug} insight={insight} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-gray-500 py-10 border border-white/5 border-dashed p-10 flex items-center justify-center">
                            No stories published yet.
                        </div>
                    )}
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default AuthorProfile;
