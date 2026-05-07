import ContentPage from "@/components/ContentPage";
import PageHero from "@/components/PageHero";
import ContentSection from "@/components/ContentSection";
import ClosingCTA from "@/components/ClosingCTA";

const WhyNow = () => {
  return (
    <ContentPage
      title="Why Now | Africa's Gaming Moment Has Arrived"
      description="Learn why Africa's gaming ecosystem is entering a defining growth moment across esports, creators, mobile gaming, youth culture, and digital infrastructure."
    >
      <PageHero
        eyebrow="Why Now"
        headline="AFRICA'S GAMING MOMENT HAS ARRIVED."
        body="The world is paying attention to African music, fashion, film, sport, and technology. Gaming is next. With a young population, rising smartphone access, expanding digital payments, creator culture, and global demand for new audiences, Africa is positioned to become one of the most important gaming markets of the next decade."
        primaryCTA={{
          text: "Explore the Opportunity",
          href: "/gaming",
        }}
        secondaryCTA={{
          text: "Partner With Us",
          href: "/contact",
        }}
      />

      <ContentSection
        heading="THE AUDIENCE IS ALREADY HERE"
        body="Africa's gaming audience is massive, mobile-first, social, and ambitious. Young people are already competing, streaming, building communities, designing worlds, and organizing tournaments — often without formal infrastructure. Gamr is building for the audience that already exists."
        variant="darker"
      />

      <ContentSection
        heading="CULTURE IS MOVING FASTER THAN INFRASTRUCTURE"
        body="Players are ready. Creators are ready. Brands are ready. But the ecosystem still needs better systems for discovery, competition, monetization, education, and trust. That gap is the opportunity."
      />

      <ContentSection
        heading="GAMING IS MORE THAN ENTERTAINMENT"
        body="Gaming now sits at the intersection of media, technology, education, commerce, sports, and youth development. It creates careers in content, design, events, production, community management, software, marketing, and storytelling."
        variant="darker"
      />

      <ContentSection
        heading="THE NEXT GLOBAL GAMING MARKET"
        body="Africa will not simply consume gaming culture. Africa will shape it. The next wave of stories, teams, creators, studios, and competitive communities can come from this continent — if the right infrastructure is built now."
      />

      <ClosingCTA
        heading="THIS IS THE TIME TO BUILD."
        body="Gamr is building the foundation for Africa's gaming economy."
        ctaText="Build With Us"
        ctaHref="/contact"
      />
    </ContentPage>
  );
};

export default WhyNow;
