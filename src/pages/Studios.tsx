import ContentPage from "@/components/ContentPage";
import PageHero from "@/components/PageHero";
import ContentSection from "@/components/ContentSection";
import ClosingCTA from "@/components/ClosingCTA";

const Studios = () => {
  return (
    <ContentPage
      title="Gamr Studios | Training Africa's Next Creative Technologists"
      description="Gamr Studios trains African creators in game design, digital worlds, Roblox development, spatial computing, and interactive media."
    >
      <PageHero
        eyebrow="Gamr Studios"
        headline="FORGING THE NEXT GENERATION OF CREATIVE TECHNOLOGISTS."
        body="Gamr Studios is where African talent learns to build the future of interactive entertainment. Through hands-on programs, mentorship, production sprints, and real-world publishing pathways, we help players become builders."
        primaryCTA={{
          text: "Explore Programs",
          href: "/gamr-lab",
        }}
        secondaryCTA={{
          text: "Join the Waitlist",
          href: "/contact",
        }}
      />

      <ContentSection
        heading="FROM PLAYING GAMES TO BUILDING WORLDS"
        body="The next generation of African creators will design games, digital fashion, immersive worlds, branded experiences, and virtual communities. Gamr Studios provides the training, tools, and environment to help them start."
        variant="darker"
      />

      <ContentSection
        heading="WHAT WE TEACH"
        bullets={[
          "Game design and interactive storytelling",
          "Roblox Studio and Luau scripting",
          "3D environment design",
          "Digital fashion and avatar culture",
          "Spatial computing and immersive experiences",
          "Monetization, analytics, and publishing",
          "Creative entrepreneurship",
        ]}
      />

      <ContentSection
        heading="BUILT FOR REAL OUTCOMES"
        body="Our programs are production-first. Participants do not just learn theory — they build, test, publish, present, and improve. Every cohort is designed to move talent closer to real opportunities in the global gaming economy."
        variant="darker"
      />

      <ContentSection
        heading="POWERED BY GAMR LAB"
        body="With access to gaming-grade workstations, stable power, high-speed internet, mentorship, and a community of builders, Gamr Studios removes the barriers that often stop African creators from turning ideas into products."
      />

      <ClosingCTA
        heading="AFRICA SHOULD NOT JUST PLAY THE FUTURE. WE SHOULD BUILD IT."
        ctaText="Join the Next Program"
        ctaHref="/gamr-lab"
      />
    </ContentPage>
  );
};

export default Studios;
