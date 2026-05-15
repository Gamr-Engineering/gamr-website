import ContentPage from "@/components/ContentPage";
import TalentHero from "@/components/talent/TalentHero";
import TalentSection from "@/components/talent/TalentSection";
import TalentCTA from "@/components/talent/TalentCTA";

import developersHero from "@/assets/developers-hero.jpg";
import developersBuilders from "@/assets/developers-builders.jpg";
import developersAudience from "@/assets/developers-audience.jpg";
import developersSupport from "@/assets/developers-support.jpg";

import developersHero from "@/assets/developers-hero.jpg";
import developersBuilders from "@/assets/developers-builders.jpg";
import developersAudience from "@/assets/developers-audience.jpg";
import developersSupport from "@/assets/developers-support.jpg";

const Developers = () => {
  return (
    <ContentPage
      title="African Game Developers | Build with Gamr Studios"
      description="Gamr supports developers, technical creators, Roblox builders, designers, and digital world makers with training, infrastructure, mentorship, and opportunities to publish."
    >
      <TalentHero
        eyebrow="For Developers"
        headline="BUILD THE WORLDS AFRICA WILL PLAY IN."
        body="Gamr supports developers, technical creators, Roblox builders, designers, and digital world makers with training, infrastructure, mentorship, and opportunities to publish."
        backgroundImage={developersHero}
        primaryCTA={{
          text: "Explore Gamr Studios",
          href: "/studios",
        }}
        secondaryCTA={{
          text: "Join a Program",
          href: "/gamr-lab",
        }}
      />

      <TalentSection
        heading="AFRICA NEEDS MORE BUILDERS"
        body="The future of gaming will not only be decided by who plays. It will be shaped by who builds. Gamr is helping African developers create games, virtual experiences, interactive stories, and new digital economies."
        variant="darker"
        image={developersBuilders}
      />

      <TalentSection
        heading="WHO THIS IS FOR"
        bullets={[
          "Game developers",
          "Roblox builders",
          "Luau and Lua scripters",
          "3D environment artists",
          "Game designers",
          "Technical artists",
          "Students and early-stage creators",
          "Indie studios and creative teams",
        ]}
        image={developersAudience}
      />

      <TalentSection
        heading="HOW GAMR SUPPORTS DEVELOPERS"
        bullets={[
          "Training programs",
          "Hardware-backed build sprints",
          "Mentorship",
          "Community showcases",
          "Publishing support",
          "Brand activation opportunities",
          "Revenue and monetization education",
        ]}
        variant="darker"
        image={developersSupport}
      />

      <TalentCTA
        heading="THE NEXT GREAT GAME COULD COME FROM AFRICA."
        ctaText="Start Building"
        ctaHref="/gamr-lab"
      />
    </ContentPage>
  );
};

export default Developers;
