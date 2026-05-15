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
        eyebrow="Brand Assets"
        headline={
          <>
            GAM<span className="text-red-600">R</span> MEDIA AND BRAND RESOURCES.
          </>
        }
        body="Find approved Gamr logos, brand materials, company descriptions, product information, and media resources for press, partners, sponsors, and collaborators."
        primaryCTA={{
          text: "Download Assets",
          href: "#available-assets",
        }}
        secondaryCTA={{
          text: "Contact Media Team",
          href: "/contact",
        }}
      />

      {/* About Gamr - Boilerplates — custom section with Resources styling */}
      <section className="py-20 md:py-28 bg-zinc-950 text-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl space-y-10">
            <span className="inline-block bg-violet-500/10 border border-violet-500/20 text-violet-300 rounded-full px-4 py-1.5 text-xs font-mono uppercase tracking-widest">
              About
            </span>

            <h2 className="text-3xl md:text-5xl font-bold tracking-tighter leading-none uppercase">
              ABOUT GAMR
            </h2>

            <div className="space-y-6">
              <div className="p-6 border border-white/10 rounded-lg bg-white/[0.02] hover:border-violet-500/20 transition-colors duration-300">
                <h3 className="text-violet-400 font-mono font-bold uppercase tracking-widest text-xs mb-4">
                  Short Boilerplate
                </h3>
                <p className="text-lg text-gray-300 leading-relaxed font-light">
                  Gamr is the engine powering African esports. We are building the
                  infrastructure, community, and technology to unlock the potential of
                  Africa's gaming ecosystem.
                </p>
              </div>

              <div className="p-6 border border-white/10 rounded-lg bg-white/[0.02] hover:border-violet-500/20 transition-colors duration-300">
                <h3 className="text-violet-400 font-mono font-bold uppercase tracking-widest text-xs mb-4">
                  Long Boilerplate
                </h3>
                <p className="text-lg text-gray-300 leading-relaxed font-light">
                  Gamr is building Africa's premier gaming ecosystem across esports,
                  creator development, gaming hubs, education, community, and digital
                  infrastructure. Through tournaments, talent programs, physical spaces,
                  content, and technology, Gamr connects gamers, creators, developers,
                  brands, and partners shaping the future of play on the continent.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div id="available-assets">
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
        />
      </div>

      <ResourcesSection
        heading="BRAND USAGE"
        body="Please use Gamr assets as provided and do not distort, recolor, or modify official brand materials without approval. For press, partnership, or campaign usage, contact our team for guidance."
        variant="darker"
        category="Guidelines"
      />

      {/* Media Highlights — The "Insights" transfer */}
      <section className="py-24 md:py-32 bg-black text-white">
        <div className="container mx-auto px-6">
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
            {/* If no articles, show a cool placeholder/empty state */}
            {mediaHighlights.length === 0 && (
              <div className="col-span-full py-20 border border-dashed border-white/10 flex flex-col items-center justify-center gap-4 text-gray-500">
                <ImageIcon className="w-12 h-12 opacity-20" />
                <span className="uppercase tracking-widest text-xs font-bold">More press highlights coming soon</span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Press Contact — custom section with Resources styling */}
      <section className="py-20 md:py-28 bg-zinc-950 text-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl space-y-6">
            <span className="inline-block bg-violet-500/10 border border-violet-500/20 text-violet-300 rounded-full px-4 py-1.5 text-xs font-mono uppercase tracking-widest">
              Contact
            </span>

            <h2 className="text-3xl md:text-5xl font-bold tracking-tighter leading-none uppercase">
              PRESS CONTACT
            </h2>
            <p className="text-lg text-gray-400 leading-relaxed max-w-2xl font-light">
              For media requests, interviews, brand approvals, or partnership
              information, contact:
            </p>
            <a
              href="mailto:hello@gamr.africa"
              className="inline-block text-2xl md:text-3xl font-bold text-violet-400 hover:text-violet-300 transition-colors duration-300 uppercase tracking-tight"
            >
              hello@gamr.africa
            </a>
          </div>
        </div>
      </section>

      <ResourcesCTA
        heading="NEED SOMETHING SPECIFIC?"
        ctaText="Contact Gamr"
        ctaHref="/contact"
      />
    </ContentPage>
  );
};

export default Assets;
