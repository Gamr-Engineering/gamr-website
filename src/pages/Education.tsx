import ContentPage from "@/components/ContentPage";
import PageHero from "@/components/PageHero";
import ContentSection from "@/components/ContentSection";
import ClosingCTA from "@/components/ClosingCTA";

import educationHero from "@/assets/education-hero.jpg";
import educationEngine from "@/assets/education-engine.jpg";
import educationTeach from "@/assets/education-teach.jpg";
import educationOutcomes from "@/assets/education-outcomes.jpg";
import educationPartners from "@/assets/education-partners.jpg";

const Education = () => {
  return (
    <ContentPage
      title="Gaming Education in Africa | Gamr Studios and Learning Pathways"
      description="Gamr creates education pathways for African gamers, creators, and developers through practical training in esports, game design, content, and digital skills."
    >
      <PageHero
        eyebrow="Education"
        headline="TEACHING THE SKILLS BEHIND THE FUTURE OF PLAY."
        body="Gaming is a gateway into some of the most important skills of the digital economy — design, storytelling, software, production, community, entrepreneurship, and media. Gamr creates learning pathways that turn interest into capability."
        backgroundImage={educationHero}
        primaryCTA={{
          text: "Explore Programs",
          href: "/gamr-lab",
        }}
        secondaryCTA={{
          text: "Partner on Education",
          href: "/contact",
        }}
      />

      <ContentSection
        heading="GAMING AS A LEARNING ENGINE"
        body="For millions of young Africans, gaming is already a source of curiosity, discipline, teamwork, and creativity. With the right structure, that passion can become employable skill."
        variant="darker"
        image={educationEngine}
      />

      <ContentSection
        heading="WHAT WE TEACH"
        bullets={[
          "Game design",
          "Roblox development",
          "Esports management",
          "Streaming and content creation",
          "Community management",
          "Tournament operations",
          "Digital storytelling",
          "Creative technology",
          "Monetization and entrepreneurship",
        ]}
        image={educationTeach}
      />

      <ContentSection
        heading="BUILT FOR PRACTICAL OUTCOMES"
        body="Our education model is hands-on. Learners build, compete, publish, present, and collaborate. We focus on real-world output, not passive theory."
        variant="darker"
        image={educationOutcomes}
      />

      <ContentSection
        heading="PARTNER WITH GAMR EDUCATION"
        body="We work with schools, brands, institutions, foundations, and ecosystem partners to create programs that prepare young Africans for opportunities in gaming and technology."
        image={educationPartners}
      />

      <ClosingCTA
        heading="EDUCATION SHOULD FEEL LIKE THE FUTURE."
        ctaText="Build a Program With Us"
        ctaHref="/contact"
      />
    </ContentPage>
  );
};

export default Education;
