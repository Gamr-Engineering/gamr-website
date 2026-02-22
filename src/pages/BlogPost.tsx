import { useParams, Navigate, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const blogContent = {
    "redefining-mobile-esports": {
        category: "Case Study",
        title: "REDEFINING MOBILE ESPORTS IN NIGERIA",
        date: "Oct 12, 2025",
        content: `
Mobile gaming has surged across Africa, fundamentally changing the landscape of competitive gaming. Gamr recognized this shift early and partnered with top telecom and device brands to launch the largest mobile gaming circuit in West Africa.

This initiative required overcoming significant infrastructure hurdles. We optimized our tournament platform, Bracketpro.gg, for low-bandwidth environments, ensuring that players in remote areas could compete seamlessly.

The results were unprecedented. Over 100,000 unique players registered for the inaugural season. Prize pools were distributed securely via integrated fintech partners, establishing trust and viability for mobile esports as a legitimate career path.

By democratizing access, Gamr is ensuring that the next global esports superstar can emerge from anywhere, armed with nothing but a smartphone and raw talent.
        `
    },
    "future-of-play-2026": {
        category: "Blog",
        title: "THE FUTURE OF PLAY: 2026 OUTLOOK",
        date: "Nov 05, 2025",
        content: `
As we look toward 2026, the African gaming ecosystem is poised for an explosive transformation. The groundwork laid over the past five years—improved internet penetration, localized server infrastructure, and a booming youth population—is culminating in a vibrant digital renaissance.

One major trend is the rise of indigenous game development. African studios are creating titles that resonate with local culture while appealing to a global audience. Gamr is actively supporting these creators by integrating their games into our competitive circuits.

Furthermore, Web3 integration and verifiable digital ownership are beginning to influence how gamers interact with platforms. While still in its infancy here, the potential for decentralized gaming economies in Africa is massive.

Infrastructure remains the key. As Gamr expands its physical hubs across the continent, we are bridging the gap between digital aspirations and physical realities, building a cohesive ecosystem where gamers, creators, and brands thrive together.
        `
    },
    "gamrx-vision-to-stadium": {
        category: "Case Study",
        title: "GAMR X: FROM VISION TO STADIUM",
        date: "Jan 22, 2026",
        content: `
GAMR X began as a bold vision: to host Africa's premier gaming festival, uniting the entire continent's gaming community under one roof. What started as an ambitious concept evolved into a massive stadium event that redefined African esports.

Logistically, GAMR X was a monumental undertaking. We coordinated travel and accommodations for hundreds of teams from over 20 African countries. The technical setup required laying miles of high-speed fiber to ensure ultra-low latency for main stage matches, alongside massive LED displays and broadcast infrastructure capable of reaching millions online.

The festival wasn't just about esports. It featured tech expos, cosplay competitions, and live performances by top African artists, blurring the lines between gaming and mainstream entertainment.

The success of GAMR X proved undeniably that the African gaming community is passionate, highly engaged, and ready for the world stage. It wasn't just an event; it was a cultural milestone.
        `
    }
};

const BlogPost = () => {
    const { id } = useParams<{ id: string }>();
    const post = id ? blogContent[id as keyof typeof blogContent] : null;

    if (!post) {
        return <Navigate to="/blog" replace />;
    }

    return (
        <div className="min-h-screen bg-black text-white selection:bg-blue-500/30">
            <Header />
            <main className="pt-32 pb-20">
                <div className="container mx-auto px-6 max-w-4xl">
                    <div className="mb-12">
                        <Link to="/blog" className="inline-flex items-center text-sm font-bold text-gray-500 hover:text-white uppercase tracking-widest transition-colors mb-8">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to Insights
                        </Link>

                        <div className="flex items-center gap-4 mb-6">
                            <span className="text-[10px] font-bold text-blue-500 uppercase tracking-widest bg-blue-500/10 px-3 py-1 rounded-full">
                                {post.category}
                            </span>
                            <span className="text-sm text-gray-500 font-medium">
                                {post.date}
                            </span>
                        </div>

                        <h1 className="text-4xl md:text-6xl font-bold tracking-tighter leading-tight uppercase mb-8">
                            {post.title}
                        </h1>
                    </div>

                    <div className="prose prose-invert prose-lg max-w-none">
                        {post.content.split('\\n\\n').map((paragraph, index) => (
                            <p key={index} className="text-gray-300 leading-relaxed mb-6">
                                {paragraph.trim()}
                            </p>
                        ))}
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default BlogPost;
