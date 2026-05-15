import ContentPage from "@/components/ContentPage";
import PageHero from "@/components/PageHero";
import ContentSection from "@/components/ContentSection";
import ClosingCTA from "@/components/ClosingCTA";

import creatorsHero from "@/assets/creators-hero.jpg";
import creatorsStorytellers from "@/assets/creators-storytellers.jpg";
import creatorsBenefits from "@/assets/creators-benefits.jpg";
import creatorsVoices from "@/assets/creators-voices.jpg";

const Creators = () => {
  return (
    <ContentPage
      title="Gamr for Creators | Build Your Audience in Gaming Culture"
      description="Gamr supports African gaming creators with visibility, community, content opportunities, events, campaigns, and brand partnerships."
    >
      <PageHero
        eyebrow="For Creators"
        headline="TURN YOUR PASSION INTO CULTURE."
        body="Gamr helps African gaming creators grow their audience, access opportunities, collaborate with brands, tell better stories, and connect with the gaming community. You bring the voice. We help build the platform."
        backgroundImage={creatorsHero}
        primaryCTA={{
          text: "Apply to Join",
          href: "https://forms.gle/6SCjP3D4Zn4qiWU17",
          external: true,
        }}
        secondaryCTA={{
          text: "Explore Talent Network",
          href: "/gamers",
        }}
      />

      <ContentSection
        heading="THE NEXT GENERATION OF DIGITAL STORYTELLERS"
        body="Gaming creators are shaping how Africa plays, watches, learns, laughs, competes, and connects. Gamr supports creators who are building communities around gaming culture."
        variant="darker"
        image={creatorsStorytellers}
      />

      <ContentSection
        heading="WHAT CREATORS GET"
        bullets={[
          "Access to gaming events and activations",
          "Brand campaign opportunities",
          "Creator spotlights and storytelling",
          "Community growth support",
          "Collaboration with other creators",
          "Access to Gamr spaces and experiences",
          "Talent network visibility",
        ]}
        image={creatorsBenefits}
      />

      <ContentSection
        heading="BUILT FOR AUTHENTIC VOICES"
        body="We work with creators who understand gaming culture from the inside — streamers, commentators, storytellers, editors, community hosts, lifestyle creators, and competitive personalities."
        variant="darker"
        image={creatorsVoices}
      />

      <ClosingCTA
        heading="READY TO TELL THE STORY OF AFRICAN GAMING?"
        ctaText="Apply to Join"
        ctaHref="https://forms.gle/6SCjP3D4Zn4qiWU17"
        ctaExternal
      />
    </ContentPage>
  );
};

export default Creators;
