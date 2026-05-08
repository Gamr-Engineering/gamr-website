import ContentPage from "@/components/ContentPage";
import PageHero from "@/components/PageHero";
import ContentSection from "@/components/ContentSection";
import ClosingCTA from "@/components/ClosingCTA";

const Assets = () => {
  return (
    <ContentPage
      title="Gamr Brand Assets | Logos, Media and Press Resources"
      description="Access Gamr logos, brand assets, media resources, company information, and press materials."
    >
      <PageHero
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

      {/* About Gamr - Boilerplates */}
      <section className="py-24 md:py-32 bg-zinc-950 text-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl space-y-12">
            <h2 className="text-4xl md:text-6xl font-bold tracking-tighter leading-none uppercase">
              ABOUT GAMR
            </h2>

            <div className="space-y-8">
              <div className="p-8 border border-white/10 bg-white/[0.02]">
                <h3 className="text-blue-500 font-bold uppercase tracking-widest text-xs mb-4">
                  Short Boilerplate
                </h3>
                <p className="text-lg text-gray-300 leading-relaxed">
                  Gamr is the engine powering African esports. We are building the
                  infrastructure, community, and technology to unlock the potential of
                  Africa's gaming ecosystem.
                </p>
              </div>

              <div className="p-8 border border-white/10 bg-white/[0.02]">
                <h3 className="text-blue-500 font-bold uppercase tracking-widest text-xs mb-4">
                  Long Boilerplate
                </h3>
                <p className="text-lg text-gray-300 leading-relaxed">
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

      <ContentSection
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
      />

      <ContentSection
        heading="BRAND USAGE"
        body="Please use Gamr assets as provided and do not distort, recolor, or modify official brand materials without approval. For press, partnership, or campaign usage, contact our team for guidance."
        variant="darker"
      />

      {/* Press Contact */}
      <section className="py-24 md:py-32 bg-black text-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl space-y-6">
            <h2 className="text-4xl md:text-6xl font-bold tracking-tighter leading-none uppercase">
              PRESS CONTACT
            </h2>
            <p className="text-lg md:text-xl text-gray-400 leading-relaxed max-w-2xl">
              For media requests, interviews, brand approvals, or partnership
              information, contact:
            </p>
            <a
              href="mailto:hello@gamr.africa"
              className="inline-block text-2xl md:text-3xl font-bold text-white hover:text-blue-400 transition-colors duration-300 uppercase tracking-tight"
            >
              hello@gamr.africa
            </a>
          </div>
        </div>
      </section>

      <ClosingCTA
        heading="NEED SOMETHING SPECIFIC?"
        ctaText="Contact Gamr"
        ctaHref="/contact"
      />
    </ContentPage>
  );
};

export default Assets;
