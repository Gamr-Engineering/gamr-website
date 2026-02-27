import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const InsightsSection = () => {
    const successStories = [
        {
            id: "redefining-mobile-esports",
            category: "Case Study",
            title: "REDEFINING MOBILE ESPORTS IN NIGERIA",
            desc: "How Gamr partnered with top brands to create the largest mobile gaming circuit in West Africa.",
        },
        {
            category: "Case Study",
            title: "GAMR X: FROM VISION TO STADIUM",
            desc: "A deep dive into the logistics and impact of Africa's premier gaming festival.",
            link: "#"
        }
    ];

    const futureOfPlay = [
        {
            id: "future-of-play-2026",
            category: "Blog",
            title: "THE FUTURE OF PLAY: 2026 OUTLOOK",
            desc: "An exploration of emerging trends in the African gaming ecosystem and the role of infrastructure.",
        },
        {
            category: "Case Study",
            title: "GAMR X: FROM VISION TO STADIUM",
            desc: "A deep dive into the logistics and impact of Africa's premier gaming festival.",
            link: "#"
        }
    ];

    return (
        <section id="case-studies" className="py-32 bg-black text-white overflow-hidden">
            <div id="blog" />
            <div className="container mx-auto px-6">
                <div className="flex flex-col gap-12 mb-20 animate-fade-in">
                    <span className="text-blue-500 font-bold uppercase tracking-widest text-sm">Insights & Impact</span>
                    <h2 className="text-5xl md:text-8xl font-bold tracking-tighter leading-none uppercase">
                        Beyond The<br />Screen.
                    </h2>
                    <p className="text-xl text-gray-400 max-w-2xl leading-relaxed">
                        Exploring the intersection of technology, culture, and competition. Our latest research and success stories.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 border-t border-white/10">
                    {insights.map((item, index) => (
                        <div
                            key={index}
                            className="group flex flex-col justify-between p-12 border-b md:border-b-0 md:border-r border-white/10 hover:bg-blue-600 transition-all duration-500 cursor-pointer"
                        >
                            <div className="space-y-6">
                                <span className="text-[10px] font-bold text-gray-500 group-hover:text-blue-200 uppercase tracking-widest transition-colors">
                                    {item.category}
                                </span>
                                <h3 className="text-2xl font-bold uppercase tracking-tighter leading-tight">
                                    {item.title}
                                </h3>
                                <p className="text-gray-400 group-hover:text-white transition-colors leading-relaxed">
                                    {item.desc}
                                </p>
                            </div>
                            <div className="pt-12">
                                <ArrowRight className="h-6 w-6 text-white transform translate-x-[-10px] opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300" />
                            </div>
                        </div>
                    ))}
                </div>

                <div className="pt-20 flex justify-center">
                    <Button
                        className="bg-transparent border border-white text-white hover:bg-white hover:text-black rounded-none px-12 py-8 text-sm font-bold uppercase tracking-widest transition-all"
                        asChild
                    >
                        <Link to="/blog">
                            View All Insights
                        </Link>
                    </Button>
                </div>
            </div>
        </section>
    );
};

export default InsightsSection;
