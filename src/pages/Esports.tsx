import ContentPage from "@/components/ContentPage";
import PageHero from "@/components/PageHero";
import ContentSection from "@/components/ContentSection";
import ClosingCTA from "@/components/ClosingCTA";

const Esports = () => {
  return (
    <ContentPage
      title="Esports in Africa | Gamr Competitive Gaming Ecosystem"
      description="Gamr is professionalizing esports in Africa through tournaments, infrastructure, communities, events, talent development, and trusted competition systems."
    >
      <PageHero
        eyebrow="Esports"
        headline="BUILDING THE COMPETITIVE FUTURE OF AFRICAN GAMING."
        body="Gamr is helping African esports move from fragmented competitions to trusted, scalable, world-class competitive experiences. From grassroots tournaments to major events, we are building the systems that let players compete with confidence."
        primaryCTA={{
          text: "Run a Tournament",
          href: "/bracket",
        }}
        secondaryCTA={{
          text: "Sponsor Esports",
          href: "/contact",
        }}
      />

      <ContentSection
        heading="COMPETITION NEEDS TRUST"
        body="Players need fair brackets, clear rules, reliable communication, transparent prize structures, and organizers who understand the community. Gamr brings structure to competitive gaming."
        variant="darker"
      />

      <ContentSection
        heading="WHAT WE POWER"
        bullets={[
          "Tournaments and leagues",
          "Community competitions",
          "Campus esports",
          "Brand-sponsored tournaments",
          "Live finals and gaming events",
          "Team and player discovery",
          "Tournament operations",
          "Bracket and registration systems",
        ]}
      />

      <ContentSection
        heading="FROM GRASSROOTS TO MAIN STAGE"
        body="African esports will grow by connecting everyday players to bigger stages. Gamr creates pathways from local competition to national and continental visibility."
        variant="darker"
      />

      <ContentSection
        heading="FOR BRANDS AND PARTNERS"
        body="Esports gives brands a direct connection to youth culture, digital communities, and high-engagement entertainment. Gamr helps partners enter the space credibly."
      />

      <ClosingCTA
        heading="LET'S BUILD THE NEXT ARENA."
        ctaText="Partner With Gamr Esports"
        ctaHref="/contact"
      />
    </ContentPage>
  );
};

export default Esports;
