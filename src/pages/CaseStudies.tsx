import ContentPage from "@/components/ContentPage";
import PageHero from "@/components/PageHero";
import ContentSection from "@/components/ContentSection";
import ClosingCTA from "@/components/ClosingCTA";

const CaseStudies = () => {
  return (
    <ContentPage
      title="Gamr Case Studies | African Gaming, Esports and Community Insights"
      description="Explore Gamr case studies on African esports, gaming communities, tournament infrastructure, shared gaming hubs, and the future of play."
    >
      <PageHero
        eyebrow="Case Studies"
        headline="LESSONS FROM BUILDING AFRICA'S GAMING ECOSYSTEM."
        body="Explore the strategies, stories, and systems shaping the future of gaming in Africa. Our case studies document what we are learning across esports, infrastructure, community, technology, and culture."
        primaryCTA={{
          text: "Read Case Studies",
          href: "/insights",
        }}
        secondaryCTA={{
          text: "View Insights",
          href: "/insights",
        }}
      />

      <ContentSection
        heading="FIELD NOTES FROM THE FRONTLINE"
        body="Gamr is not studying African gaming from the outside. We are building inside the ecosystem — running events, supporting creators, operating hubs, hosting tournaments, and working with players directly. These case studies share what we have learned."
        variant="darker"
      />

      <ContentSection
        heading="TOPICS WE EXPLORE"
        bullets={[
          "Competitive gaming in Africa",
          "Tournament operations",
          "Community esports",
          "Gaming infrastructure",
          "Shared gaming hubs",
          "Mobile-first gaming",
          "Creator economy",
          "Youth development",
          "Brand participation",
          "Game development pathways",
        ]}
      />

      <ContentSection
        heading="WHO SHOULD READ THIS"
        body="These insights are built for brands, investors, partners, policymakers, founders, educators, game studios, media teams, and anyone interested in the future of African gaming."
        variant="darker"
      />

      <ClosingCTA
        heading="UNDERSTAND THE ECOSYSTEM BEFORE YOU ENTER IT."
        ctaText="Read the Latest"
        ctaHref="/insights"
      />
    </ContentPage>
  );
};

export default CaseStudies;
