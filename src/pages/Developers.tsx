import ContentPage from "@/components/ContentPage";
import PageHero from "@/components/PageHero";
import ContentSection from "@/components/ContentSection";
import ClosingCTA from "@/components/ClosingCTA";

const Developers = () => {
  return (
    <ContentPage
      title="Gamr for Developers | Build Games and Digital Worlds from Africa"
      description="Gamr supports African game developers, Roblox builders, technical creators, and digital world designers through training, infrastructure, and publishing pathways."
    >
      <PageHero
        eyebrow="For Developers"
        headline="BUILD THE WORLDS AFRICA WILL PLAY IN."
        body="Gamr supports developers, technical creators, Roblox builders, designers, and digital world makers with training, infrastructure, mentorship, and opportunities to publish."
        primaryCTA={{
          text: "Explore Gamr Studios",
          href: "/studios",
        }}
        secondaryCTA={{
          text: "Join a Program",
          href: "/gamr-lab",
        }}
      />

      <ContentSection
        heading="AFRICA NEEDS MORE BUILDERS"
        body="The future of gaming will not only be decided by who plays. It will be shaped by who builds. Gamr is helping African developers create games, virtual experiences, interactive stories, and new digital economies."
        variant="darker"
      />

      <ContentSection
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
      />

      <ContentSection
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
      />

      <ClosingCTA
        heading="STOP WAITING FOR THE FUTURE. BUILD IT."
        ctaText="Join Gamr Studios"
        ctaHref="/studios"
      />
    </ContentPage>
  );
};

export default Developers;
