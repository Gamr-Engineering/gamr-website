import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link, useSearchParams } from "react-router-dom";
import { allInsights } from "@/data/insightsData";
import InsightCard from "@/components/InsightCard";

const InsightSearchPage = () => {
    const [searchParams] = useSearchParams();
    const query = searchParams.get("q") || "";

    const results = allInsights.filter((article) => {
        const lowerQuery = query.toLowerCase();
        return (
            article.title.toLowerCase().includes(lowerQuery) ||
            article.excerpt.toLowerCase().includes(lowerQuery) ||
            article.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
        );
    });

    return (
        <div className="min-h-screen bg-black text-white selection:bg-blue-500/30 flex flex-col">
            <Header />
            <main className="flex-grow pt-32 pb-20">
                <div className="container mx-auto px-6">
                    <h1 className="text-4xl md:text-6xl font-bold uppercase tracking-tighter mb-8">
                        Search Results
                    </h1>
                    <p className="text-xl text-gray-400 mb-12">
                        Showing results for: <span className="text-white font-bold">"{query}"</span>
                    </p>
                    {results.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {results.map((insight) => (
                                <InsightCard key={insight.slug} insight={insight} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-gray-500 py-20 text-center">
                            No insights found matching your query.
                        </div>
                    )}
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default InsightSearchPage;
