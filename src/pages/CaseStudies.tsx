import { useState, useEffect } from "react";
import ContentPage from "@/components/ContentPage";
import { useInsights } from "@/context/InsightsContext";
import InsightCard from "@/components/InsightCard";
import TrendingSection from "@/components/TrendingSection";
import NewsletterForm from "@/components/NewsletterForm";
import { ArrowRight, BookOpen, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";

const CaseStudies = () => {
  const { allInsights, loading } = useInsights();
  const [visibleCount, setVisibleCount] = useState(6);

  const caseStudyInsights = allInsights.filter(i => i.category === "case-study");
  const featuredCaseStudy = caseStudyInsights.find(i => i.featured) || caseStudyInsights[0];
  const otherCaseStudies = caseStudyInsights.filter(i => i.slug !== featuredCaseStudy?.slug);
  const visibleCaseStudies = otherCaseStudies.slice(0, visibleCount);
  const hasMore = visibleCount < otherCaseStudies.length;

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-violet-500" />
      </div>
    );
  }

  return (
    <ContentPage
      title="Gamr Case Studies | African Gaming, Esports and Community Insights"
      description="Explore Gamr case studies on African esports, gaming communities, tournament infrastructure, shared gaming hubs, and the future of play."
    >
      <div className="container mx-auto px-6 pt-12">
        {/* Header Branding */}
        <div className="flex flex-col gap-6 mb-16 animate-fade-in">
          <div className="flex items-center gap-3">
            <div className="h-1 w-8 bg-violet-500" />
            <span className="text-violet-400 font-bold uppercase tracking-widest text-xs">Resources / Case Studies</span>
          </div>
          <h1 className="text-5xl md:text-8xl font-black tracking-tighter leading-[0.85] uppercase text-white drop-shadow-2xl">
            SUCCESS <br/> STORIES.
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl leading-relaxed font-light">
            Documenting the strategies and systems shaping the future of play. Real data, real community impact, and lessons from the African gaming frontline.
          </p>
        </div>

        {/* Featured Case Study Hero */}
        {featuredCaseStudy && (
          <div className="mb-24">
            <Link 
              to={`/insights/${featuredCaseStudy.slug}`}
              className="group relative block w-full aspect-[21/9] min-h-[400px] overflow-hidden border border-white/10 rounded-sm bg-zinc-900"
            >
              <div className="absolute inset-0">
                <img 
                  src={featuredCaseStudy.coverImage} 
                  alt={featuredCaseStudy.title}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 opacity-80 group-hover:opacity-100" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
              </div>
              <div className="absolute bottom-0 left-0 w-full p-8 md:p-12">
                <span className="inline-block bg-violet-600 text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 mb-4 rounded-sm">
                  Featured Study
                </span>
                <h2 className="text-3xl md:text-5xl font-bold uppercase tracking-tighter max-w-4xl mb-4 group-hover:text-violet-400 transition-colors text-white">
                  {featuredCaseStudy.title}
                </h2>
                <p className="text-gray-300 max-w-2xl mb-6 line-clamp-2 font-light">
                  {featuredCaseStudy.excerpt}
                </p>
                <div className="flex items-center text-violet-400 font-bold uppercase text-sm tracking-widest">
                  Read Full Case Study
                  <ArrowRight className="ml-2 h-4 w-4 transform group-hover:translate-x-2 transition-all duration-300" />
                </div>
              </div>
            </Link>
          </div>
        )}

        {/* Trending Insights Bar */}
        <div className="mb-24">
          <TrendingSection insights={allInsights} />
        </div>

        {/* Main Feed */}
        <div className="space-y-12 mb-24">
          <div className="flex items-center justify-between border-b border-white/10 pb-6">
            <h2 className="text-2xl font-black uppercase tracking-widest flex items-center gap-3 text-white">
              <BookOpen className="w-6 h-6 text-violet-500" />
              RECENT STUDIES
            </h2>
            <span className="text-gray-500 font-mono text-[10px] uppercase tracking-widest">{caseStudyInsights.length} Stories</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {visibleCaseStudies.map((item) => (
              <InsightCard key={item.slug} insight={item} />
            ))}
          </div>

          {hasMore && (
            <div className="flex justify-center pt-12">
              <button 
                onClick={() => setVisibleCount(prev => prev + 6)}
                className="px-12 py-4 border border-white/10 text-white font-bold uppercase tracking-widest text-[10px] hover:bg-white hover:text-black transition-all"
              >
                Load More Studies
              </button>
            </div>
          )}
        </div>

        {/* Knowledge CTA */}
        <div className="mb-24 bg-zinc-950 p-12 md:p-20 border border-white/5 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-violet-600/5 blur-[120px] rounded-full" />
          <div className="relative z-10 max-w-3xl">
            <h3 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-8 leading-[0.9] text-white">
              BUILDING ON <br/> PROVEN INSIGHTS.
            </h3>
            <p className="text-xl text-gray-400 mb-10 font-light leading-relaxed">
              Our case studies are designed to help brands and partners understand the nuances of the African gaming market. If you need a custom deep-dive or specific data, reach out to our strategy team.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/contact">
                <button className="bg-violet-600 text-white px-8 py-4 rounded-sm font-bold uppercase tracking-widest text-xs hover:bg-violet-500 transition-colors">
                  Contact Strategy Team
                </button>
              </Link>
              <Link to="/insights">
                <button className="border border-white/10 text-white px-8 py-4 rounded-sm font-bold uppercase tracking-widest text-xs hover:bg-white/5 transition-colors">
                  View All Insights
                </button>
              </Link>
            </div>
          </div>
        </div>

        <NewsletterForm source="case-studies" tags={["case_studies_page"]} />
      </div>
    </ContentPage>
  );
};

export default CaseStudies;
