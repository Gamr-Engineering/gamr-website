import ContentPage from "@/components/ContentPage";
import EcosystemHero from "@/components/ecosystem/EcosystemHero";
import EcosystemSection from "@/components/ecosystem/EcosystemSection";
import EcosystemCTA from "@/components/ecosystem/EcosystemCTA";

import studiosHero from "@/assets/studios-hero.jpg";
import studiosStories from "@/assets/studios-stories.jpg";
import studiosProcess from "@/assets/studios-process.jpg";
import studiosGlobal from "@/assets/studios-global.jpg";

const Studios = () => {
  return (
    <ContentPage
      title="Gamr Studios | Training Africa's Next Creative Technologists"
      description="Gamr Studios trains African creators in game design, digital worlds, Roblox development, spatial computing, and interactive media."
    >
      <EcosystemHero
        eyebrow={
          <>
            gam<span className="text-red-600">r</span>studi<span className="relative inline-flex items-center justify-center">o<span className="absolute w-[20%] h-[20%] bg-red-600 rounded-full top-[55%] left-[50%] -translate-x-1/2 -translate-y-1/2"></span></span>s
          </>
        }
        headline="FORGING THE NEXT GENERATION OF CREATIVE TECHNOLOGISTS."
        body="Gamr Studios is where African talent learns to build the future of interactive entertainment. Through hands-on programs, mentorship, production sprints, and real-world publishing pathways, we help players become builders."
        backgroundImage={studiosHero}
        primaryCTA={{
          text: "Explore Programs",
          href: "/gamr-lab",
        }}
        secondaryCTA={{
          text: "Join the Waitlist",
          href: "/contact",
        }}
      />

      <EcosystemSection
        heading="AFRICAN STORIES"
        body="The next generation of African creators will design games, digital fashion, immersive worlds, branded experiences, and virtual communities. Gamr Studios provides the training, tools, and environment to help them start."
        variant="darker"
        image={studiosStories}
      />

      <EcosystemSection
        heading="THE PROCESS"
        body="Our programs are production-first. Participants do not just learn theory — they build, test, publish, present, and improve. Every cohort is designed to move talent closer to real opportunities in the global gaming economy."
        image={studiosProcess}
      />

      <EcosystemSection
        heading="GLOBAL REACH"
        body="We bridge the gap between African talent and the global market. Our graduates gain the skills to publish games that resonate across the continent and beyond, reaching players on every platform."
        bullets={[
          "Game design and interactive storytelling",
          "Roblox Studio and Luau scripting",
          "3D environment design",
          "Digital fashion and avatar culture",
          "Spatial computing and immersive experiences",
          "Monetization, analytics, and publishing",
          "Creative entrepreneurship",
        ]}
        variant="darker"
        image={studiosGlobal}
      />

      <EcosystemSection
        heading={
          <>
            POWERED BY gam<span className="text-red-600">r</span>lab
          </>
        }
        body="With access to gaming-grade workstations, stable power, high-speed internet, mentorship, and a community of builders, Gamr Studios removes the barriers that often stop African creators from turning ideas into products."
      />

      <EcosystemCTA
        heading="AFRICA SHOULD NOT JUST PLAY THE FUTURE. WE SHOULD BUILD IT."
        ctaText="Join the Next Program"
        ctaHref="/gamr-lab"
      />
    </ContentPage>
  );
};

export default Studios;
