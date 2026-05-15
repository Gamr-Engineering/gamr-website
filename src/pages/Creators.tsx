import ContentPage from "@/components/ContentPage";
import TalentHero from "@/components/talent/TalentHero";
import TalentSection from "@/components/talent/TalentSection";
import TalentCTA from "@/components/talent/TalentCTA";

import creatorsHero from "@/assets/creators-hero.jpg";
import creatorsStorytellers from "@/assets/creators-storytellers.jpg";
import creatorsBenefits from "@/assets/creators-benefits.jpg";
import creatorsVoices from "@/assets/creators-voices.jpg";

const Creators = () => {
  return (
    <ContentPage
      title="African Gaming Creators | Build Your Audience with Gamr"
      description="Gamr supports African gaming creators with visibility, community, collaboration, brand partnerships, and creator-first tools and experiences."
    >
      <TalentHero
        eyebrow="For Creators"
        headline="YOUR VOICE. YOUR PLATFORM. YOUR COMMUNITY."
        body="Gamr supports streamers, content creators, commentators, producers, designers, and storytellers building audiences around African gaming culture."
        backgroundImage={creatorsHero}
        primaryCTA={{
          text: "Join the Creator Network",
          href: "https://discord.gg/qV9e4ErZN2",
          external: true,
        }}
        secondaryCTA={{
          text: "Explore Opportunities",
          href: "/contact",
        }}
      />

      <TalentSection
        heading="AFRICA'S NEXT STORYTELLERS"
        body="The most powerful voices in African gaming will not come from outside the continent. They will come from inside the community. Gamr helps creators grow audiences, build credibility, and find opportunities."
        variant="darker"
        image={creatorsStorytellers}
      />

      <TalentSection
        heading="WHAT CREATORS GET"
        bullets={[
          "Community exposure and amplification",
          "Brand partnership opportunities",
          "Event hosting and coverage roles",
          "Content collaboration",
          "Creator-first tools and resources",
          "Access to Gamr platforms and audiences",
          "Mentorship and support",
        ]}
        image={creatorsBenefits}
      />

      <TalentSection
        heading="MANY VOICES, ONE CULTURE"
        body="Whether you stream on Twitch, post on TikTok, commentate tournaments, design fan art, or tell stories through video — if your work moves gaming culture forward, Gamr wants to support you."
        variant="darker"
        image={creatorsVoices}
      />

      <TalentCTA
        heading="THE CULTURE NEEDS YOUR VOICE."
        ctaText="Join the Creator Network"
        ctaHref="https://discord.gg/qV9e4ErZN2"
        ctaExternal
      />
    </ContentPage>
  );
};

export default Creators;
