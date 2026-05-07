import ContentPage from "@/components/ContentPage";
import PageHero from "@/components/PageHero";
import ContentSection from "@/components/ContentSection";
import ClosingCTA from "@/components/ClosingCTA";

const Gamers = () => {
  return (
    <ContentPage
      title="Gamr for Gamers | Compete, Connect and Grow"
      description="Gamr helps African gamers compete in tournaments, join communities, access events, claim identities, and grow within the gaming ecosystem."
    >
      <PageHero
        eyebrow="For Gamers"
        headline="COMPETE. CONNECT. LEVEL UP."
        body="Gamr gives African gamers access to tournaments, communities, events, training, content, rewards, and opportunities across the gaming ecosystem. Whether you play for fun or compete for glory, there is a place for you here."
        primaryCTA={{
          text: "Join the Community",
          href: "https://discord.gg/qV9e4ErZN2",
          external: true,
        }}
        secondaryCTA={{
          text: "Claim GamrTag",
          href: "/claim-gamrtag",
        }}
      />

      <ContentSection
        heading="YOUR HOME IN AFRICAN GAMING"
        body="Find players, join competitions, attend events, learn new skills, and become part of a growing network of gamers across the continent."
        variant="darker"
      />

      <ContentSection
        heading="WHAT GAMERS GET"
        bullets={[
          "Access to tournaments and events",
          "Community spaces and gaming sessions",
          "GamrTag identity",
          "Leaderboards and recognition",
          "Workshops and training",
          "Creator and career pathways",
          "Opportunities to connect with brands and teams",
        ]}
      />

      <ContentSection
        heading="FROM CASUAL TO COMPETITIVE"
        body="Not every gamer starts as a professional. Gamr creates pathways for casual players to discover communities, sharpen their skills, join tournaments, and grow into competitive opportunities."
        variant="darker"
      />

      <ClosingCTA
        heading="THIS IS YOUR ARENA."
        ctaText="Join Gamr"
        ctaHref="https://discord.gg/qV9e4ErZN2"
        ctaExternal
      />
    </ContentPage>
  );
};

export default Gamers;
