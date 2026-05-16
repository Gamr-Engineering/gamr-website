import ContentPage from "@/components/ContentPage";
import CompanyHero from "@/components/company/CompanyHero";
import CompanySection from "@/components/company/CompanySection";
import CompanyCTA from "@/components/company/CompanyCTA";

import whynowVibe from "@/assets/whynow-vibe.jpg";
import whynowNeed from "@/assets/whynow-need.jpg";
import whynowOpportunity from "@/assets/whynow-opportunity.jpg";
import whynowTransition from "@/assets/whynow-transition.jpg";
import whynowQueue from "@/assets/whynow-queue.jpg";

const WhyNow = () => {
  return (
    <ContentPage
      title="Why Now | Africa's Gaming Moment Has Arrived"
      description="Learn why Africa's gaming ecosystem is entering a defining growth moment across esports, creators, mobile gaming, youth culture, and digital infrastructure."
    >
      <CompanyHero
        headline="AFRICA'S GAMING MOMENT HAS ARRIVED."
        body="The world is paying attention to African music, fashion, film, sport, and technology. Gaming is next. With a young population, rising smartphone access, expanding digital payments, creator culture, and global demand for new audiences, Africa is positioned to become one of the most important gaming markets of the next decade."
        backgroundImage={whynowVibe}
        primaryCTA={{
          text: "Explore the Opportunity",
          href: "/gaming",
        }}
        secondaryCTA={{
          text: "Partner With Us",
          href: "/contact",
        }}
      />

      <CompanySection
        heading="THE AUDIENCE IS ALREADY HERE"
        body="Africa's gaming audience is massive, mobile-first, social, and ambitious. Young people are already competing, streaming, building communities, designing worlds, and organizing tournaments — often without formal infrastructure. Gamr is building for the audience that already exists."
        variant="darker"
        image={whynowQueue}
        sectionIndex={1}
      />

      <CompanySection
        heading="THE DIGITAL TRANSITION"
        body="Players are ready. Creators are ready. Brands are ready. But the ecosystem still needs better systems for discovery, competition, monetization, education, and trust. That gap is the opportunity."
        image={whynowTransition}
        sectionIndex={2}
      />

      <CompanySection
        heading="WHAT WE NEED"
        body="Gaming now sits at the intersection of media, technology, education, commerce, sports, and youth development. It creates careers in content, design, events, production, community management, software, marketing, and storytelling."
        variant="darker"
        image={whynowOpportunity}
        sectionIndex={3}
      />

      <CompanySection
        heading="INFRASTRUCTURE GAP"
        body="Africa will not simply consume gaming culture. Africa will shape it. The next wave of stories, teams, creators, studios, and competitive communities can come from this continent — if the right infrastructure is built now."
        image={whynowNeed}
        sectionIndex={4}
      />

      <CompanyCTA
        heading="THIS IS THE TIME TO BUILD."
        body="Gamr is building the foundation for Africa's gaming economy."
        ctaText="Build With Us"
        ctaHref="/contact"
      />
    </ContentPage>
  );
};

export default WhyNow;
