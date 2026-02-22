import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Blog = () => {
    const insights = [
        {
            id: "redefining-mobile-esports",
            category: "Case Study",
            title: "REDEFINING MOBILE ESPORTS IN NIGERIA",
            desc: "How Gamr partnered with top brands to create the largest mobile gaming circuit in West Africa.",
            date: "Oct 12, 2025"
        },
        {
            id: "future-of-play-2026",
            category: "Blog",
            title: "THE FUTURE OF PLAY: 2026 OUTLOOK",
            desc: "An exploration of emerging trends in the African gaming ecosystem and the role of infrastructure.",
            date: "Nov 05, 2025"
        },
        {
            id: "gamrx-vision-to-stadium",
            category: "Case Study",
            title: "GAMR X: FROM VISION TO STADIUM",
            desc: "A deep dive into the logistics and impact of Africa's premier gaming festival.",
            date: "Jan 22, 2026"
        }
    ];

    return (
        <div className="min-h-screen bg-black text-white selection:bg-blue-500/30">
            <Header />
            <main className="pt-32 pb-20">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col gap-6 mb-16 animate-fade-in">
                        <span className="text-blue-500 font-bold uppercase tracking-widest text-sm">Insights & Impact</span>
                        <h1 className="text-5xl md:text-8xl font-bold tracking-tighter leading-none uppercase">
                            Our Blog.
                        </h1>
                        <p className="text-xl text-gray-400 max-w-2xl leading-relaxed">
                            Exploring the intersection of technology, culture, and competition. Our latest research and success stories.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {insights.map((item) => (
                            <Link
                                to={`/blog/${item.id}`}
                                key={item.id}
                                className="group flex flex-col justify-between p-8 border border-white/10 hover:border-blue-500/50 hover:bg-blue-900/10 transition-all duration-500 cursor-pointer"
                            >
                                <div className="space-y-6">
                                    <div className="flex justify-between items-center">
                                        <span className="text-[10px] font-bold text-gray-500 group-hover:text-blue-400 uppercase tracking-widest transition-colors">
                                            {item.category}
                                        </span>
                                        <span className="text-[10px] text-gray-600 font-medium">
                                            {item.date}
                                        </span>
                                    </div>
                                    <h3 className="text-2xl font-bold uppercase tracking-tighter leading-tight">
                                        {item.title}
                                    </h3>
                                    <p className="text-gray-400 group-hover:text-gray-300 transition-colors leading-relaxed line-clamp-3">
                                        {item.desc}
                                    </p>
                                </div>
                                <div className="pt-12 flex items-center text-blue-500 font-bold uppercase text-xs tracking-widest">
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
