import ContentPage from "@/components/ContentPage";
import PageHero from "@/components/PageHero";
import ContentSection from "@/components/ContentSection";
import ClosingCTA from "@/components/ClosingCTA";

import gamrtagHero from "@/assets/gamrtag-hero.jpg";
import gamrtagIdentity from "@/assets/gamrtag-identity.jpg";
import gamrtagAccess from "@/assets/gamrtag-access.jpg";
import gamrtagRewards from "@/assets/gamrtag-rewards.jpg";

const GamrTag = () => {
  return (
    <ContentPage
      title="GamrTag | Your Identity Across the Gamr Ecosystem"
      description="Claim your GamrTag — your unique gaming identity across Gamr tournaments, events, communities, creator programs, and digital experiences."
    >
      <PageHero
        eyebrow={
          <>
            gam<span className="text-red-600">r</span>tag
          </>
        }
        headline={
          <>
            YOUR IDENTITY ACROSS THE GAM<span className="text-red-600">R</span> ECOSYSTEM.
          </>
        }
        body="Your GamrTag is more than a username. It is your identity across tournaments, events, community experiences, creator programs, leaderboards, rewards, and future Gamr products. Claim your name. Build your reputation. Be known across the ecosystem."
        backgroundImage={gamrtagHero}
        primaryCTA={{
          text: "Claim Your GamrTag",
          href: "/claim-gamrtag",
        }}
      />

      <ContentSection
        heading="YOUR DIGITAL IDENTITY"
        body="As Gamr grows, your GamrTag becomes your passport into competitions, sessions, hubs, creator programs, rewards, and community access. It helps us connect your activity, achievements, and opportunities in one place."
        variant="darker"
        image={gamrtagIdentity}
      />

      <ContentSection
        heading="UNIVERSAL ACCESS"
        body="Whether you play casually, compete professionally, create content, attend events, or join training programs, your GamrTag gives you a consistent identity inside the Gamr world."
        image={gamrtagAccess}
      />

      <ContentSection
        heading="THE REWARDS"
        body="Unlock more as you play. Your GamrTag tracks your achievements and opens doors to exclusive perks, partner rewards, and community opportunities across the entire continent."
        bullets={[
          "Tournament registration and player profiles",
          "Community access and event check-ins",
          "Creator and talent network applications",
          "Leaderboards, rankings, and achievements",
          "Rewards, perks, and partner opportunities",
          "Future digital identity features across Gamr",
        ]}
        variant="darker"
        image={gamrtagRewards}
      />

      <ClosingCTA
        heading="CLAIM YOUR NAME BEFORE SOMEONE ELSE DOES."
        ctaText="Claim GamrTag"
        ctaHref="/claim-gamrtag"
      />
    </ContentPage>
  );
};

export default GamrTag;
