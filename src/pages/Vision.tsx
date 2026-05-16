import ContentPage from "@/components/ContentPage";
import CompanyHero from "@/components/company/CompanyHero";
import CompanySection from "@/components/company/CompanySection";
import CompanyCTA from "@/components/company/CompanyCTA";
import visionHero from "@/assets/vision-hero.jpg";
import visionCommunity from "@/assets/vision-community.jpg";
import visionOS from "@/assets/vision-os.jpg";
import visionProfessionals from "@/assets/vision-professionals.jpg";

const Vision = () => {
  return (
    <ContentPage
      title="Gamr Vision | Building the Future of African Gaming"
      description="Discover Gamr's vision to unlock Africa's gaming potential through esports, technology, community, and creator infrastructure."
    >
      <CompanyHero
        headline="BUILDING THE FUTURE OF PLAY IN AFRICA."
        body="Africa is home to one of the youngest, fastest-growing gaming audiences in the world. At Gamr, we see a future where African gamers are not just players, but competitors, creators, developers, storytellers, founders, and global cultural leaders. Our vision is to build the infrastructure that allows African gaming to scale beyond boundaries."
        backgroundImage={visionHero}
        primaryCTA={{
          text: "Join the Community",
          href: "https://discord.gg/qV9e4ErZN2",
          external: true,
        }}
        secondaryCTA={{
          text: "Explore the Ecosystem",
          href: "/gaming",
        }}
      />

      <CompanySection
        heading="A CONTINENT READY TO PLAY"
        body="Gaming in Africa is no longer a niche. It is a cultural movement powered by mobile access, youth creativity, digital communities, and rising global interest. But the opportunity needs structure: reliable tournaments, trusted platforms, physical hubs, talent development, creator support, and industry pathways. Gamr exists to build that structure."
        variant="darker"
        image={visionCommunity}
        sectionIndex={1}
      />

      <CompanySection
        heading="FROM PLAYERS TO PROFESSIONALS"
        body="We believe every gamer should have a path forward — whether that means competing in esports, building content, learning game development, joining a creator network, or participating in Africa's next digital economy. Our work connects passion to opportunity."
        image={visionProfessionals}
        sectionIndex={2}
      />

      <CompanySection
        heading="THE AFRICAN GAMING OPERATING SYSTEM"
        body="Gamr is creating an interconnected ecosystem across esports, education, community, media, talent, and gaming infrastructure. Every product, event, hub, and program is designed to move African gaming from fragmented passion into organized industry."
        variant="darker"
        image={visionOS}
        sectionIndex={3}
      />

      <CompanyCTA
        heading="THE FUTURE OF PLAY IS AFRICAN."
        body="Join the movement shaping the next generation of gaming, creativity, and digital culture."
        ctaText="Join Community"
        ctaHref="https://discord.gg/qV9e4ErZN2"
        ctaExternal
      />
    </ContentPage>
  );
};

export default Vision;
