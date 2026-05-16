import ContentPage from "@/components/ContentPage";
import IndustryHero from "@/components/industry/IndustryHero";
import IndustrySection from "@/components/industry/IndustrySection";
import IndustryCTA from "@/components/industry/IndustryCTA";

const YouthDevelopment = () => {
  return (
    <ContentPage
      title="Gaming and Youth Development in Africa | Gamr"
      description="Gamr uses gaming, esports, and creative technology to develop skills, confidence, community, and opportunities for African youth."
    >
      <IndustryHero
        headline="USING PLAY TO UNLOCK POTENTIAL."
        body="Gaming can be more than entertainment. It can teach teamwork, discipline, creativity, problem-solving, communication, leadership, and digital skills. Gamr uses gaming as a platform for youth development across Africa."
        image="/assets/youth/hero.jpg"
        primaryCTA={{
          text: "Partner With Us",
          href: "/contact",
        }}
        secondaryCTA={{
          text: "Explore Programs",
          href: "/education",
        }}
        stats={[
          { value: "70%", label: "Youth Population" },
          { value: "40%", label: "Digital Natives" },
          { value: "9+", label: "Skills Built" },
          { value: "∞", label: "Potential" },
        ]}
      />

      <IndustrySection
        heading="MEETING YOUNG PEOPLE WHERE THEY ARE"
        body="Young Africans are already deeply engaged with gaming and digital culture. Instead of treating gaming as a distraction, Gamr uses it as an entry point into learning, confidence, community, and opportunity."
        variant="darker"
        image="/assets/youth/potential.jpg"
        category="Potential"
      />

      <IndustrySection
        heading="SKILLS BUILT THROUGH GAMING"
        bullets={[
          "Teamwork",
          "Strategic thinking",
          "Digital literacy",
          "Communication",
          "Leadership",
          "Creativity",
          "Resilience",
          "Technical skills",
          "Entrepreneurship",
        ]}
        image="/assets/youth/skills.jpg"
        category="Skills"
      />

      <IndustrySection
        heading="PATHWAYS BEYOND PLAY"
        body="Through tournaments, workshops, creator programs, development sprints, and community experiences, Gamr helps young people discover career pathways in gaming, media, design, technology, and live entertainment."
        variant="darker"
        image="/assets/youth/pathways.jpg"
        category="Pathways"
      />

      <IndustrySection
        heading="FOR PARTNERS AND INSTITUTIONS"
        body="We collaborate with schools, brands, nonprofits, development organizations, and public institutions to create youth-focused gaming programs with real outcomes."
        image="/assets/youth/partnership.jpg"
        category="Partnership"
      />

      <IndustryCTA
        heading="PLAY CAN CHANGE FUTURES."
        ctaText="Build a Youth Program With Gamr"
        ctaHref="/contact"
        image="/assets/youth/cta.jpg"
        imageFit="contain"
      />
    </ContentPage>
  );
};

export default YouthDevelopment;
