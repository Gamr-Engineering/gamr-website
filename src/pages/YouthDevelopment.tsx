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
        eyebrow="Youth Development"
        headline="USING PLAY TO UNLOCK POTENTIAL."
        body="Gaming can be more than entertainment. It can teach teamwork, discipline, creativity, problem-solving, communication, leadership, and digital skills. Gamr uses gaming as a platform for youth development across Africa."
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
      />

      <IndustrySection
        heading="PATHWAYS BEYOND PLAY"
        body="Through tournaments, workshops, creator programs, development sprints, and community experiences, Gamr helps young people discover career pathways in gaming, media, design, technology, and live entertainment."
        variant="darker"
      />

      <IndustrySection
        heading="FOR PARTNERS AND INSTITUTIONS"
        body="We collaborate with schools, brands, nonprofits, development organizations, and public institutions to create youth-focused gaming programs with real outcomes."
      />

      <IndustryCTA
        heading="PLAY CAN CHANGE FUTURES."
        ctaText="Build a Youth Program With Gamr"
        ctaHref="/contact"
      />
    </ContentPage>
  );
};

export default YouthDevelopment;
