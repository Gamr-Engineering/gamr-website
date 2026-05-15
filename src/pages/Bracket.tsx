import ContentPage from "@/components/ContentPage";
import EcosystemHero from "@/components/ecosystem/EcosystemHero";
import EcosystemSection from "@/components/ecosystem/EcosystemSection";
import EcosystemCTA from "@/components/ecosystem/EcosystemCTA";

const Bracket = () => {
  return (
    <ContentPage
      title="Gamr Bracket | Tournament Infrastructure for African Esports"
      description="Gamr Bracket helps organizers, players, and communities run trusted esports tournaments across Africa."
    >
      <EcosystemHero
        eyebrow="Gamr Bracket"
        headline="TOURNAMENT INFRASTRUCTURE FOR AFRICAN ESPORTS."
        body="Gamr Bracket is designed to make competitive gaming easier to organize, manage, and scale. From grassroots competitions to major championships, we help communities run tournaments with structure, fairness, and trust."
        primaryCTA={{
          text: "Run a Tournament",
          href: "/contact",
        }}
        secondaryCTA={{
          text: "Contact Gamr",
          href: "/contact",
        }}
      />

      <EcosystemSection
        heading="THE PROBLEM WITH TOURNAMENTS"
        body="Across African gaming communities, tournaments often struggle with manual registration, unclear rules, poor communication, bracket confusion, delayed payouts, and lack of trust. Gamr Bracket exists to fix that."
        variant="darker"
      />

      <EcosystemSection
        heading="BUILT FOR PLAYERS AND ORGANIZERS"
        body="Our tournament infrastructure supports organizers with smoother operations while giving players a better competitive experience — from registration to results."
      />

      <EcosystemSection
        heading="FEATURES TO POWER COMPETITION"
        bullets={[
          "Player registration",
          "Tournament brackets",
          "Match scheduling",
          "Team management",
          "Rules and format communication",
          "Result tracking",
          "Community updates",
          "Prize and payout support",
          "Organizer tools",
        ]}
        variant="darker"
      />

      <EcosystemSection
        heading="FROM GRASSROOTS TO GLOBAL STAGES"
        body="Gamr Bracket is part of our larger mission to professionalize African esports and create trusted systems that allow players, teams, and communities to grow."
      />

      <EcosystemCTA
        heading="READY TO RUN BETTER TOURNAMENTS?"
        ctaText="Start With Gamr Bracket"
        ctaHref="/contact"
      />
    </ContentPage>
  );
};

export default Bracket;
