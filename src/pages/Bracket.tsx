import ContentPage from "@/components/ContentPage";
import PageHero from "@/components/PageHero";
import ContentSection from "@/components/ContentSection";
import ClosingCTA from "@/components/ClosingCTA";

const Bracket = () => {
  return (
    <ContentPage
      title="Gamr Bracket | Tournament Infrastructure for African Esports"
      description="Gamr Bracket helps organizers, players, and communities run trusted esports tournaments across Africa."
    >
      <PageHero
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

      <ContentSection
        heading="THE PROBLEM WITH TOURNAMENTS"
        body="Across African gaming communities, tournaments often struggle with manual registration, unclear rules, poor communication, bracket confusion, delayed payouts, and lack of trust. Gamr Bracket exists to fix that."
        variant="darker"
      />

      <ContentSection
        heading="BUILT FOR PLAYERS AND ORGANIZERS"
        body="Our tournament infrastructure supports organizers with smoother operations while giving players a better competitive experience — from registration to results."
      />

      <ContentSection
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

      <ContentSection
        heading="FROM GRASSROOTS TO GLOBAL STAGES"
        body="Gamr Bracket is part of our larger mission to professionalize African esports and create trusted systems that allow players, teams, and communities to grow."
      />

      <ClosingCTA
        heading="READY TO RUN BETTER TOURNAMENTS?"
        ctaText="Start With Gamr Bracket"
        ctaHref="/contact"
      />
    </ContentPage>
  );
};

export default Bracket;
