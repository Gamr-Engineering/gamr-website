import ContentPage from "@/components/ContentPage";
import ResourcesHero from "@/components/resources/ResourcesHero";
import ResourcesSection from "@/components/resources/ResourcesSection";
import ResourcesCTA from "@/components/resources/ResourcesCTA";
import { useInsights } from "@/context/InsightsContext";
import InsightCard from "@/components/InsightCard";
import { Link } from "react-router-dom";
import { ArrowRight, Image as ImageIcon } from "lucide-react";

const Assets = () => {
  const { allInsights } = useInsights();
  // Pull latest blog posts or relevant media highlights
  const mediaHighlights = allInsights.filter(i => i.category === "blog").slice(0, 3);

  return (
    <ContentPage
      title="Gamr Brand Assets | Logos, Media and Press Resources"
      description="Access Gamr logos, brand assets, media resources, company information, and press materials."
    >
      <ResourcesHero
        headline={
          <>
            GAM<span className="text-red-600">R</span> MEDIA AND BRAND RESOURCES.
          </>
        }
        body="Find approved Gamr logos, brand materials, company descriptions, product information, and media resources for press, partners, sponsors, and collaborators."
        images={[
          "/assets/assets-page/hero-1.jpg",
          "/assets/assets-page/hero-2.jpg",
          "/assets/assets-page/hero-3.jpg",
          "/assets/assets-page/hero-4.jpg",
        ]}
        primaryCTA={{
          text: "Download Assets",
          href: "#available-assets",
        }}
        secondaryCTA={{
          text: "Contact Media Team",
          href: "/contact",
        }}
      />

      <div className="container mx-auto px-4 md:px-6 space-y-8 md:space-y-12 py-8">
        <div className="rounded-3xl overflow-hidden border border-white/5 shadow-2xl">
          <ResourcesSection
            category="About"
            heading="ABOUT GAMR"
            backgroundImage="/assets/assets-page/about.jpg"
            subsections={[
              {
                title: "Short Boilerplate",
                description: "Gamr is the engine powering African esports. We are building the infrastructure, community, and technology to unlock the potential of Africa's gaming ecosystem."
              },
              {
                title: "Long Boilerplate",
                description: "Gamr is building Africa's premier gaming ecosystem across esports, creator development, gaming hubs, education, community, and digital infrastructure. Through tournaments, talent programs, physical spaces, content, and technology, Gamr connects gamers, creators, developers, brands, and partners shaping the future of play on the continent."
              }
            ]}
          />
        </div>

        <div id="available-assets" className="rounded-3xl overflow-hidden border border-white/5 shadow-2xl">
          <ResourcesSection
            heading="AVAILABLE ASSETS"
            bullets={[
              "Gamr logo files",
              "Brand guidelines",
              "Product screenshots",
              "Event photos",
              "Founder and team photos",
              "Press boilerplates",
              "Partner deck",
              "Media kit",
              "Contact information",
            ]}
            category="Downloads"
            backgroundImage="/assets/assets-page/available.jpg"
            variant="darker"
          />
        </div>

        <div className="rounded-3xl overflow-hidden border border-white/5 shadow-2xl">
          <ResourcesSection
            heading="BRAND USAGE"
            body="Please use Gamr assets as provided and do not distort, recolor, or modify official brand materials without approval. For press, partnership, or campaign usage, contact our team for guidance."
            variant="dark"
            category="Guidelines"
            backgroundImage="/assets/assets-page/usage.jpg"
          />
        </div>

        {/* Media Highlights — The "Insights" transfer */}
        <div className="rounded-3xl overflow-hidden border border-white/5 shadow-2xl bg-black relative">
          <section className="py-24 md:py-32 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-violet-900/10 via-black to-black opacity-50" />
            <div className="container mx-auto px-6 relative z-10">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
                <div className="space-y-6">
                  <span className="inline-block bg-violet-500/10 border border-violet-500/20 text-violet-300 rounded-full px-4 py-1.5 text-xs font-mono uppercase tracking-widest">
                    Highlights
                  </span>
                  <h2 className="text-4xl md:text-6xl font-bold uppercase tracking-tighter leading-none">
                    MEDIA & PRESS <br/> HIGHLIGHTS.
                  </h2>
                </div>
                <Link to="/insights" className="group flex items-center gap-3 text-violet-400 font-bold uppercase tracking-widest text-xs hover:text-white transition-colors">
                  View All Press Insights
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-2 transition-transform" />
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {mediaHighlights.map((item) => (
                  <InsightCard key={item.slug} insight={item} />
                ))}
                {mediaHighlights.length === 0 && (
                  <div className="col-span-full py-20 border border-dashed border-white/10 flex flex-col items-center justify-center gap-4 text-gray-500">
                    <ImageIcon className="w-12 h-12 opacity-20" />
                    <span className="uppercase tracking-widest text-xs font-bold">More press highlights coming soon</span>
                  </div>
                )}
              </div>
            </div>
          </section>
        </div>

        <div className="rounded-3xl overflow-hidden border border-white/5 shadow-2xl">
          <ResourcesSection
            category="Contact"
            heading="PRESS CONTACT"
            body="For media requests, interviews, brand approvals, or partnership information, contact:"
            backgroundImage="/assets/assets-page/contact.jpg"
            variant="darker"
            subsections={[
              {
                title: "Direct Email",
                description: "hello@gamr.africa"
              }
            ]}
          />
        </div>

        <div className="rounded-3xl overflow-hidden border border-white/5 shadow-2xl">
          <ResourcesCTA
            heading="NEED SOMETHING SPECIFIC?"
            ctaText="Contact Gamr"
            ctaHref="/contact"
            backgroundImage="/assets/assets-page/cta.jpg"
          />
        </div>
      </div>
    </ContentPage>
  );
};

export default Assets;
