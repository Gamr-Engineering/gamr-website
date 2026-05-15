import ContentPage from "@/components/ContentPage";
import IndustryHero from "@/components/industry/IndustryHero";
import IndustrySection from "@/components/industry/IndustrySection";
import IndustryCTA from "@/components/industry/IndustryCTA";

const Gaming = () => {
  return (
    <ContentPage
      title="Gaming Culture in Africa | Gamr"
      description="Gamr celebrates and supports African gaming culture across communities, events, content, technology, creators, and competitive play."
    >
      <IndustryHero
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
        stats={[
          { value: "3B+", label: "Global Gamers" },
          { value: "200M+", label: "In Africa" },
          { value: "$180B", label: "Industry Value" },
          { value: "#1", label: "Youth Culture" },
        ]}
      />

      <IndustrySection
        heading="THE CULTURE IS ALIVE"
        body="Across the continent, gaming culture lives in group chats, cafés, campuses, homes, streams, tournaments, memes, watch parties, and creator communities. Gamr brings these moments together into one connected ecosystem."
        variant="darker"
      />

      <IndustrySection
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

      <IndustrySection
        heading="BRIDGING DIGITAL AND PHYSICAL PLAY"
        body="The future of gaming is phygital — online communities supported by physical spaces, live events, creator moments, and shared experiences. Gamr builds across both worlds."
        variant="darker"
      />

      <IndustrySection
        heading="AFRICAN STORIES, GLOBAL STAGE"
        body="African gaming culture has its own voice, humor, rhythm, energy, and perspective. Gamr helps bring that culture to the world."
      />

      <IndustryCTA
        heading="COME PLAY WHERE CULTURE LIVES."
        ctaText="Join Gamr"
        ctaHref="https://discord.gg/qV9e4ErZN2"
        ctaExternal
      />
    </ContentPage>
  );
};

export default Gaming;
