import { useState, useEffect } from "react";
import ContentPage from "@/components/ContentPage";
import ResourcesHero from "@/components/resources/ResourcesHero";
import ResourcesCTA from "@/components/resources/ResourcesCTA";
import { useInsights } from "@/context/InsightsContext";
import InsightCard from "@/components/InsightCard";
import TrendingSection from "@/components/TrendingSection";
import NewsletterForm from "@/components/NewsletterForm";
import AuthorSpotlight from "@/components/AuthorSpotlight";
import InsightCarousel from "@/components/InsightCarousel";
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
      <ResourcesHero
        headline={
          <>
            SUCCESS <br/> STORIES.
          </>
        }
        body="Documenting the strategies and systems shaping the future of play. Real data, real community impact, and lessons from the African gaming frontline."
        backgroundImage="/assets/case-studies/hero.jpg"
        imageFit="contain"
        primaryCTA={{
          text: "Contact Strategy Team",
          href: "/contact",
        }}
      />

      <div className="container mx-auto px-6 py-12">
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

        {/* Author Spotlight — Williams Falodun Section */}
        <div className="mb-32">
          <AuthorSpotlight />
        </div>

        {/* Main Feed — Carousel for "WOW" Factor */}
        <div className="space-y-12 mb-32">
          <div className="flex items-center justify-between border-b border-white/10 pb-6">
            <h2 className="text-2xl font-black uppercase tracking-widest flex items-center gap-3 text-white">
              <BookOpen className="w-6 h-6 text-violet-500" />
              RECENT STUDIES
            </h2>
            <span className="text-gray-500 font-mono text-[10px] uppercase tracking-widest">{caseStudyInsights.length} Stories</span>
          </div>

          <div className="mb-12">
            <InsightCarousel title="SUCCESS STORIES" insights={caseStudyInsights} />
          </div>
        </div>

        <ResourcesCTA
          heading="BUILDING ON PROVEN INSIGHTS."
          body="Our case studies are designed to help brands and partners understand the nuances of the African gaming market. If you need a custom deep-dive or specific data, reach out to our strategy team."
          ctaText="Contact Strategy Team"
          ctaHref="/contact"
          backgroundImage="/assets/case-studies/cta.jpg"
          imageFit="contain"
        />

        <NewsletterForm source="case-studies" tags={["case_studies_page"]} />
      </div>
    </ContentPage>
  );
};

export default CaseStudies;
