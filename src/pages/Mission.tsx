import ContentPage from "@/components/ContentPage";
import CompanyHero from "@/components/company/CompanyHero";
import CompanySection from "@/components/company/CompanySection";
import CompanyCTA from "@/components/company/CompanyCTA";

import missionHero from "@/assets/mission-hero.jpg";
import missionWhy from "@/assets/mission-why.jpg";
import missionBuild from "@/assets/mission-build.jpg";
import missionServe from "@/assets/mission-serve.jpg";

const Mission = () => {
  return (
    <ContentPage
      title="Gamr Mission | Connecting Gamers, Creators and Brands"
      description="Gamr's mission is to connect gamers, creators, developers, and brands through thrilling experiences and seamless technology."
    >
      <CompanyHero
        eyebrow="Our Mission"
        headline="CONNECTING GAMERS, CREATORS AND BRANDS THROUGH PLAY."
        body="Gamr's mission is to connect Africa's gaming ecosystem through experiences, technology, and opportunities that help people play, compete, create, learn, and earn. We are building the bridge between grassroots gaming culture and the global digital economy."
        backgroundImage={missionHero}
        primaryCTA={{
          text: "Join the Community",
          href: "https://discord.gg/qV9e4ErZN2",
          external: true,
        }}
        secondaryCTA={{
          text: "Partner With Gamr",
          href: "/contact",
        }}
      />

      <CompanySection
        heading="WHY WE EXIST"
        body="Across Africa, millions of gamers are already gathering in Discord servers, WhatsApp groups, gaming cafés, universities, homes, and live events. The talent is here. The passion is here. What has been missing is coordinated infrastructure. Gamr organizes the chaos into a trusted ecosystem."
        variant="darker"
        image={missionWhy}
        sectionIndex={1}
      />

      <CompanySection
        heading="WHAT WE BUILD"
        body="We build tournaments, gaming hubs, creator programs, education pathways, community events, digital identities, content platforms, and brand experiences that serve the gaming generation. From casual players to professional competitors, our mission is to create access."
        image={missionBuild}
        sectionIndex={2}
      />

      <CompanySection
        heading="WHO WE SERVE"
        body="We serve gamers looking for community, creators looking for platforms, developers looking for opportunities, brands looking for culture, and partners looking to participate in Africa's next major entertainment economy."
        variant="darker"
        image={missionServe}
        sectionIndex={3}
      />

      <CompanyCTA
        heading="PLAY HAS POWER."
        body="Together, we can turn gaming into a real engine for culture, jobs, creativity, and connection."
        ctaText="Start With Gamr"
        ctaHref="https://discord.gg/qV9e4ErZN2"
        ctaExternal
      />
    </ContentPage>
  );
};

export default Mission;
