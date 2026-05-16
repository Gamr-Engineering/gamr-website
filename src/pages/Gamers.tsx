import ContentPage from "@/components/ContentPage";
import TalentHero from "@/components/talent/TalentHero";
import TalentSection from "@/components/talent/TalentSection";
import TalentCTA from "@/components/talent/TalentCTA";

import gamersHero from "@/assets/gamers-hero.jpg";
import gamersCommunity from "@/assets/gamers-community.jpg";
import gamersFeatures from "@/assets/gamers-features.jpg";
import gamersPathway from "@/assets/gamers-pathway.jpg";

const Gamers = () => {
  return (
    <ContentPage
      title="African Gamers | Compete, Create and Connect with Gamr"
      description="Gamr empowers African gamers through tournaments, community experiences, creator pathways, digital identity, and competitive infrastructure."
    >
      <TalentHero
        headline="THIS IS YOUR ERA."
        body="Whether you play casually, compete seriously, or dream of going pro — Gamr is building the infrastructure to support your journey. Tournaments, community, creator tools, digital identity, and real opportunities."
        backgroundImage={gamersHero}
        primaryCTA={{
          text: "Join the Community",
          href: "https://discord.gg/qV9e4ErZN2",
          external: true,
        }}
        secondaryCTA={{
          text: "Claim Your GamrTag",
          href: "/claim-gamrtag",
        }}
      />

      <TalentSection
        heading="BUILT FOR THE COMMUNITY"
        body="From Discord servers to gaming cafés, from watch parties to national tournaments — Gamr brings African gamers together with structure, energy, and purpose."
        variant="darker"
        image={gamersCommunity}
      />

      <TalentSection
        heading="WHAT YOU GET"
        bullets={[
          "Competitive tournaments with structure and trust",
          "Your own GamrTag — a digital identity across the ecosystem",
          "Community events and experiences",
          "Access to Carven Gaming Hub",
          "Creator and content pathways",
          "Visibility and recognition",
          "Rewards, perks, and growth",
        ]}
        image={gamersFeatures}
      />

      <TalentSection
        heading="YOUR PATHWAY"
        body="Whether you want to compete, create, build, or just belong — Gamr creates real pathways for African gamers. From your first match to your biggest stage."
        variant="darker"
        image={gamersPathway}
      />

      <TalentCTA
        heading="YOUR GAME. YOUR COMMUNITY. YOUR FUTURE."
        ctaText="Join Gamr"
        ctaHref="https://discord.gg/qV9e4ErZN2"
        ctaExternal
      />
    </ContentPage>
  );
};

export default Gamers;
