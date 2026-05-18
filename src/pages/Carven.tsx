import ContentPage from "@/components/ContentPage";
import EcosystemHero from "@/components/ecosystem/EcosystemHero";
import EcosystemSection from "@/components/ecosystem/EcosystemSection";
import EcosystemCTA from "@/components/ecosystem/EcosystemCTA";
import carvenHero from "@/assets/carven-hero.jpg";
import carvenSpace from "@/assets/carven-space.jpg";
import carvenFeatures from "@/assets/carven-features.jpg";
import carvenCommunity from "@/assets/carven-community.jpg";
import carvenBrands from "@/assets/carven-brands.jpg";
import carvenLogo from "@/assets/carven-logo.png";

const Carven = () => {
  return (
    <ContentPage
      title="Carven Gaming Hub | Premium Gaming and Culture Space in Lagos"
      description="Visit Carven Gaming Hub by Gamr — a premium gaming, lifestyle, esports, and creative sanctuary at Landmark Center, Victoria Island, Lagos."
    >
      <EcosystemHero
        headline="WHERE COMPETITION MEETS CULTURE."
        body="Carven is Africa's premium gaming, lifestyle, and creative sanctuary — built for players, creators, teams, brands, and communities who want to experience gaming at the highest level. Located at Landmark Center, Victoria Island, Lagos."
        backgroundImage={carvenHero}
        backgroundVideo="/assets/carven/carven_gaming_intro.mp4"
        videoDelay={3000}
        primaryCTA={{
          text: "Visit Carven",
          href: "https://maps.app.goo.gl/XjkHsMv46uG2LsJA7",
          external: true,
        }}
        secondaryCTA={{
          text: "Book an Experience",
          href: "/contact",
        }}
      />

      <EcosystemSection
        heading="A NEW KIND OF GAMING SPACE"
        body="Carven is more than a gaming hub. It is a physical home for esports, content creation, community events, private sessions, brand activations, and premium entertainment."
        variant="darker"
        image={carvenSpace}
      />

      <EcosystemSection
        heading="WHAT YOU'LL FIND AT CARVEN"
        bullets={[
          "Premium gaming stations",
          "High-speed internet",
          "Console and PC gaming experiences",
          "Esports viewing and tournament setups",
          "Creator-friendly spaces",
          "Community events and private bookings",
          "VIP gaming experiences",
        ]}
        image={carvenFeatures}
      />

      <EcosystemSection
        heading="BUILT FOR THE COMMUNITY"
        body="From casual matches to competitive tournaments, Carven gives gamers a reliable place to gather, compete, watch, create, and connect."
        variant="darker"
        image={carvenCommunity}
      />

      <EcosystemSection
        heading="BUILT FOR BRANDS"
        body="Carven gives brands a direct gateway into gaming culture through activations, launches, watch parties, tournaments, creator sessions, and youth-focused experiences."
        image={carvenBrands}
      />

      <EcosystemCTA
        heading="STEP INTO THE FUTURE OF GAMING CULTURE."
        ctaText="Get Directions"
        ctaHref="https://maps.app.goo.gl/XjkHsMv46uG2LsJA7"
        ctaExternal
        secondaryCtaText="Partner With Carven"
        secondaryCtaHref="/contact"
      />
    </ContentPage>
  );
};

export default Carven;
