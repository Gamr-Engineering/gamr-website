import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { authors } from "@/data/insights/authors";
import { useInsights } from "@/context/InsightsContext";
import InsightCard from "@/components/InsightCard";
import { useMemo } from "react";

interface AuthorSpotlightProps {
    authorSlug?: string;
}

const AuthorSpotlight = ({ authorSlug = "williams-falodun" }: AuthorSpotlightProps) => {
    const { allInsights } = useInsights();
    const author = authors[authorSlug];

    // Memoize the filtered stories so we don't recalculate on every render
    const authorStories = useMemo(() => {
        return allInsights.filter((story) => story.author.slug === author.slug);
    }, [author.slug, allInsights]);

    if (!author) return null;

    return (
        <section className="group relative flex flex-col border border-white/10 hover:border-blue-500/40 bg-gradient-to-br from-gray-950 via-black to-blue-950/20 overflow-hidden transition-all duration-700">
            {/* Ambient glow */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-0">
                <div className="absolute -top-32 -left-32 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl" />
                <div className="absolute -bottom-32 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl" />
            </div>

            {/* Top Row: Author Identity */}
            <div className="relative z-10 p-8 md:p-12 pb-8 border-b border-white/5 flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-10">
                
                {/* Editorial label */}
                <div className="absolute top-0 left-0 bg-blue-600 text-white text-[10px] font-black uppercase tracking-widest px-4 py-2">
                    Featured Author
                </div>

                {/* Headshot */}
                <div className="relative flex-shrink-0 mt-6 md:mt-0">
                    <div
                        className="w-32 h-32 md:w-40 md:h-40 rounded-none overflow-hidden border-2 border-white/10 group-hover:border-blue-500/50 transition-all duration-500 bg-gray-900 relative z-10"
                        style={{ aspectRatio: "1/1" }}
                    >
                        {author.avatar ? (
                            <img
                                src={author.avatar}
                                alt={author.name}
                                className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-700"
                                loading="lazy"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center bg-blue-600/20">
                                <span className="text-5xl font-black text-blue-400">
                                    {author.name.charAt(0)}
                                </span>
                            </div>
                        )}
                    </div>
                    {/* Blue accent line */}
                    <div className="absolute -bottom-3 -left-3 -right-3 h-[1px] bg-blue-500/0 group-hover:bg-blue-500/50 transition-colors duration-500 z-0" />
                </div>

                {/* Text Content */}
                <div className="relative flex flex-col justify-center text-center md:text-left gap-4 flex-grow w-full md:mt-4">
                    <div>
                        <p className="text-[10px] font-bold text-blue-400 uppercase tracking-[0.3em] mb-2">
                            Staff Writer
                        </p>
                        <h3 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-white group-hover:text-blue-300 transition-colors leading-none">
                            {author.name}
                        </h3>
                    </div>
                    
                    <p className="text-gray-400 text-sm md:text-base leading-relaxed max-w-2xl group-hover:text-gray-300 transition-colors">
                        {author.bio}
                    </p>

                    <div className="flex flex-col md:flex-row items-center gap-6 mt-2 justify-between w-full">
                        {/* Socials */}
                        {author.social && (
                            <div className="flex items-center gap-5 justify-center md:justify-start">
                                {author.social.twitter && (
                                    <a
                                        href={author.social.twitter}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-[10px] font-bold uppercase tracking-widest text-gray-500 hover:text-blue-400 transition-colors flex items-center gap-2"
                                    >
                                        Twitter
                                    </a>
                                )}
                                {author.social.linkedin && (
                                    <a
                                        href={author.social.linkedin}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-[10px] font-bold uppercase tracking-widest text-gray-500 hover:text-blue-400 transition-colors flex items-center gap-2"
                                    >
                                        LinkedIn
                                    </a>
                                )}
                            </div>
                        )}

                        <Link
                            to={`/insights/author/${author.slug}`}
                            aria-label={`View profile of ${author.name}`}
                            className="flex items-center gap-2 text-blue-400 hover:text-white font-bold uppercase text-xs tracking-widest transition-colors py-2"
                        >
                            View Full Profile
                            <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-all duration-300" />
                        </Link>
                    </div>
                </div>
            </div>

            {/* Bottom Row: Authored Content Grouping */}
            {authorStories.length > 0 && (
                <div className="relative z-10 bg-black/40 p-8 md:p-12 pt-8">
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4 border-b border-white/10 pb-4">
                        <div className="flex items-center gap-3">
                            <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                            <h4 className="text-sm font-bold text-gray-400 uppercase tracking-[0.2em]">
                                Latest from {author.name.split(' ')[0]}
                            </h4>
                        </div>
                        <span className="text-[10px] font-bold text-gray-600 uppercase tracking-widest">
                            {authorStories.length} {authorStories.length === 1 ? 'Story' : 'Stories'}
                        </span>
                    </div>

                    {/* Horizontal Scroller for Content Ownership Signal */}
                    <div 
                        className="flex overflow-x-auto gap-6 pb-6 -mx-8 px-8 md:-mx-12 md:px-12 snap-x snap-mandatory hide-scrollbar"
                        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                    >
                        {/* Hide scrollbar styling for webkit */}
                        <style>{`
                            .hide-scrollbar::-webkit-scrollbar {
                                display: none;
                            }
                        `}</style>
                        
                        {authorStories.map((story) => (
                            <div key={story.slug} className="w-[85vw] md:w-[400px] flex-shrink-0 snap-center shadow-lg transform transition-transform duration-500 hover:-translate-y-1">
                                <InsightCard insight={story} />
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </section>
    );
};

export default AuthorSpotlight;
