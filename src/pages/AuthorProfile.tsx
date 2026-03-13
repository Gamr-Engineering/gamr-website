import { useParams } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { allInsights } from "@/data/insightsData";
import InsightCard from "@/components/InsightCard";

const AuthorProfile = () => {
    const { author } = useParams<{ author: string }>();
    const decodedAuthor = decodeURIComponent(author || "");

    const authorArticles = allInsights.filter(
        (article) => article.author === decodedAuthor
    );

    return (
        <div className="min-h-screen bg-black text-white selection:bg-blue-500/30 flex flex-col">
            <Header />
            <main className="flex-grow pt-32 pb-20">
                <div className="container mx-auto px-6">
                    <div className="mb-16 border-b border-white/10 pb-12 flex flex-col md:flex-row items-center md:items-start gap-8">
                        <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-blue-500 flex-shrink-0 bg-gray-900">
                            {/* Placeholder author avatar */}
                            <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${decodedAuthor}`} alt={decodedAuthor} className="w-full h-full object-cover" />
                        </div>
                        <div>
                            <span className="text-blue-500 font-bold uppercase tracking-widest text-sm">Author Profile</span>
                            <h1 className="text-4xl md:text-6xl font-bold uppercase tracking-tighter mt-2 mb-4">
                                {decodedAuthor}
                            </h1>
                            <p className="text-gray-400 leading-relaxed max-w-2xl">
                                Content creator and editorial lead at Gamr Africa, passionate about the intersection of gaming culture, esports infrastructure, and developing Africa's digital economy.
                            </p>
                        </div>
                    </div>
                    
                    <h2 className="text-2xl font-bold uppercase tracking-widest mb-8">Articles by {decodedAuthor}</h2>
                    
                    {authorArticles.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {authorArticles.map((insight) => (
                                <InsightCard key={insight.slug} insight={insight} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-gray-500 py-10">No articles found for this author.</div>
                    )}
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default AuthorProfile;
