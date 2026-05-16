import ContentPage from "@/components/ContentPage";
import IndustryHero from "@/components/industry/IndustryHero";
import IndustrySection from "@/components/industry/IndustrySection";
import IndustryCTA from "@/components/industry/IndustryCTA";
import { useToast } from "@/hooks/use-toast";

const Esports = () => {
  const { toast } = useToast();
  
  return (
    <ContentPage
      title="Esports in Africa | Gamr Competitive Gaming Ecosystem"
      description="Gamr is professionalizing esports in Africa through tournaments, infrastructure, communities, events, talent development, and trusted competition systems."
    >
      <IndustryHero
        eyebrow="Esports"
        headline="BUILDING THE COMPETITIVE FUTURE OF AFRICAN GAMING."
        body="Gamr is helping African esports move from fragmented competitions to trusted, scalable, world-class competitive experiences. From grassroots tournaments to major events, we are building the systems that let players compete with confidence."
        image="/assets/esports/hero.jpg"
        primaryCTA={{
          text: "Run a Tournament",
          onClick: () => toast({
            title: "Coming Soon",
            description: "Tournament infrastructure (Gamr Bracket) is currently in development.",
          }),
        }}
        secondaryCTA={{
          text: "Sponsor Esports",
          href: "/contact",
        }}
        stats={[
          { value: "50+", label: "Tournaments" },
          { value: "10K+", label: "Competitors" },
          { value: "20+", label: "Game Titles" },
          { value: "5", label: "Countries" },
        ]}
      />

      <IndustrySection
        heading="COMPETITION NEEDS TRUST"
        body="Players need fair brackets, clear rules, reliable communication, transparent prize structures, and organizers who understand the community. Gamr brings structure to competitive gaming."
        image="/assets/esports/trust.png"
        variant="darker"
        category="Trust"
        imageFit="contain"
      />

      <IndustrySection
        heading="WHAT WE POWER"
        body="From grassroots tournaments to major festivals, we provide the infrastructure that makes competitive gaming scale."
        bullets={[
          "Tournaments and leagues",
          "Community competitions",
          "Campus esports",
          "Brand-sponsored tournaments",
          "Live finals and gaming events",
          "Team and player discovery",
          "Tournament operations",
          "Bracket and registration systems",
        ]}
        image="/assets/esports/power.jpg"
        category="Ecosystem"
      />

      <IndustrySection
        heading="FROM GRASSROOTS TO MAIN STAGE"
        body="African esports will grow by connecting everyday players to bigger stages. Gamr creates pathways from local competition to national and continental visibility."
        image="/assets/esports/grassroots.jpg"
        variant="darker"
        category="Pathways"
      />

      <IndustrySection
        heading="FOR BRANDS AND PARTNERS"
        body="Esports gives brands a direct connection to youth culture, digital communities, and high-engagement entertainment. Gamr helps partners enter the space credibly."
        image="/assets/esports/partners.jpg"
        category="Partnerships"
      />

      <IndustryCTA
        heading="LET'S BUILD THE NEXT ARENA."
        ctaText="Partner With Gamr Esports"
        ctaHref="/contact"
        image="/assets/esports/cta.jpg"
      />
    </ContentPage>
  );
};

export default Esports;
