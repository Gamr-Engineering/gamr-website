import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import InsightCarousel from "@/components/InsightCarousel";
import { caseStudies, blogPosts } from "@/data/insightsData";

const InsightsSection = () => {
    return (
        <section id="case-studies" className="py-32 bg-black text-white overflow-hidden">
            <div id="blog" />
            <div className="container mx-auto px-6">
                <div className="flex flex-col gap-12 mb-20 animate-fade-in">
                    <span className="text-blue-500 font-bold uppercase tracking-widest text-sm">Insights &amp; Impact</span>
                    <h2 className="text-5xl md:text-8xl font-bold tracking-tighter leading-none uppercase">
                        Beyond The<br />Screen.
                    </h2>
                    <p className="text-xl text-gray-400 max-w-2xl leading-relaxed">
                        Exploring the intersection of technology, culture, and competition. Our latest research and success stories.
                    </p>
                </div>

                <div className="space-y-16">
                    <InsightCarousel title="SUCCESS STORIES" insights={caseStudies} />
                    <InsightCarousel title="THE FUTURE OF PLAY" insights={blogPosts} />
                </div>

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
