import ContentPage from "@/components/ContentPage";
import PageHero from "@/components/PageHero";
import ContentSection from "@/components/ContentSection";
import ClosingCTA from "@/components/ClosingCTA";

const Gaming = () => {
  return (
    <ContentPage
      title="Gaming Culture in Africa | Gamr"
      description="Gamr celebrates and supports African gaming culture across communities, events, content, technology, creators, and competitive play."
    >
      <PageHero
        eyebrow="Gaming"
        headline="MORE THAN A GAME. A CULTURE."
        body="Gaming is where Africa's next generation competes, creates, connects, learns, and expresses identity. Gamr exists to support the full culture around play — from casual communities to professional opportunities."
        primaryCTA={{
          text: "Join the Community",
          href: "https://discord.gg/qV9e4ErZN2",
          external: true,
        }}
        secondaryCTA={{
          text: "Explore Gamr",
          href: "/vision",
        }}
      />

      <ContentSection
        heading="THE CULTURE IS ALIVE"
        body="Across the continent, gaming culture lives in group chats, cafés, campuses, homes, streams, tournaments, memes, watch parties, and creator communities. Gamr brings these moments together into one connected ecosystem."
        variant="darker"
      />

      <ContentSection
        heading="WHAT GAMING MEANS TO US"
        bullets={[
          "Community",
          "Competition",
          "Creativity",
          "Technology",
          "Storytelling",
          "Identity",
          "Entertainment",
          "Opportunity",
        ]}
      />

      <ContentSection
        heading="BRIDGING DIGITAL AND PHYSICAL PLAY"
        body="The future of gaming is phygital — online communities supported by physical spaces, live events, creator moments, and shared experiences. Gamr builds across both worlds."
        variant="darker"
      />

      <ContentSection
        heading="AFRICAN STORIES, GLOBAL STAGE"
        body="African gaming culture has its own voice, humor, rhythm, energy, and perspective. Gamr helps bring that culture to the world."
      />

      <ClosingCTA
        heading="COME PLAY WHERE CULTURE LIVES."
        ctaText="Join Gamr"
        ctaHref="https://discord.gg/qV9e4ErZN2"
        ctaExternal
      />
    </ContentPage>
  );
};

export default Gaming;
