import ContentPage from "@/components/ContentPage";
import CompanyHero from "@/components/company/CompanyHero";
import CompanySection from "@/components/company/CompanySection";
import CompanyCTA from "@/components/company/CompanyCTA";
import PartnersSection from "@/components/PartnersSection";
import teamHero from "@/assets/team-hero.jpg";
import teamLeadership from "@/assets/team-leadership.jpg";
import teamCulture from "@/assets/team-culture.jpg";

const Team = () => {
  return (
    <ContentPage
      title="Gamr Team | The Squad Behind Africa's Gaming Ecosystem"
      description="Meet the team building Gamr — a collective of gamers, operators, technologists, storytellers, and ecosystem builders."
    >
      <CompanyHero
        headline="BUILT BY GAMERS. DESIGNED FOR AFRICA."
        body="Gamr is powered by a team of operators, technologists, creatives, community builders, and lifelong gamers united by one mission: to build the future of play across Africa."
        backgroundImage={teamHero}
        primaryCTA={{
          text: "Meet the Squad",
          href: "#team-categories",
        }}
        secondaryCTA={{
          text: "Join the Mission",
          href: "/contact",
        }}
      />

      <CompanySection
        heading="LEADERSHIP"
        body="We are builders at the intersection of gaming, culture, technology, education, and live experiences. Our team understands the energy of grassroots gaming and the discipline required to build scalable infrastructure. We are not just observing the ecosystem. We are part of it."
        variant="darker"
        image={teamLeadership}
        sectionIndex={1}
      />

      <CompanySection
        heading="TEAM CULTURE"
        body="We move fast, play seriously, think globally, and stay rooted in the realities of African gamers. We believe in experimentation, ownership, collaboration, and building with the community — not above it."
        image={teamCulture}
        sectionIndex={2}
      />

      {/* Team Categories — custom section preserved with Company styling */}
      <section id="team-categories" className="py-32 md:py-40 bg-black text-white">
        <div className="container mx-auto px-6">
          {/* Numbered divider */}
          <div className="mb-16 flex items-center gap-6">
            <span className="text-white/20 font-mono text-xs tracking-widest">03</span>
            <div className="h-px bg-white/10 flex-1" />
          </div>

          <div className="max-w-4xl mb-16">
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tighter leading-none uppercase">
              THE TEAM
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: "Leadership",
                description:
                  "Strategic direction, partnerships, operations, and ecosystem growth.",
              },
              {
                title: "Community & Events",
                description:
                  "Tournament operations, player engagement, live experiences, and grassroots activation.",
              },
              {
                title: "Technology & Product",
                description:
                  "Digital tools, gaming infrastructure, platforms, and ecosystem systems.",
              },
              {
                title: "Content & Culture",
                description:
                  "Storytelling, creator support, brand voice, and media.",
              },
            ].map((category, i) => (
              <div
                key={i}
                className="group p-10 border-l border-white/10 hover:border-white/30 transition-all duration-500"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-white/20 font-mono text-xs">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="text-2xl font-bold uppercase tracking-tight mb-3">
                  {category.title}
                </h3>
                <p className="text-gray-400 leading-relaxed font-light">
                  {category.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      <div id="advisors-partners" className="pt-24 border-t border-white/5">
        <div className="container mx-auto px-6 mb-8">
          <h2 className="text-4xl md:text-6xl font-bold tracking-tighter leading-none uppercase text-white">
            ADVISORS & PARTNERS
          </h2>
        </div>
        <PartnersSection />
      </div>

      <CompanyCTA
        heading="WANT TO BUILD THE FUTURE OF PLAY?"
        body="We are always looking for passionate people who understand gaming, culture, and Africa's digital future."
        ctaText="Contact Gamr"
        ctaHref="/contact"
      />
    </ContentPage>
  );
};

export default Team;
