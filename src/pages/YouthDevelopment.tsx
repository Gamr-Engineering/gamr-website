import ContentPage from "@/components/ContentPage";
import PageHero from "@/components/PageHero";
import ContentSection from "@/components/ContentSection";
import ClosingCTA from "@/components/ClosingCTA";

const YouthDevelopment = () => {
  return (
    <ContentPage
      title="Gaming and Youth Development in Africa | Gamr"
      description="Gamr uses gaming, esports, and creative technology to develop skills, confidence, community, and opportunities for African youth."
    >
      <PageHero
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
      />

      <ContentSection
        heading="MEETING YOUNG PEOPLE WHERE THEY ARE"
        body="Young Africans are already deeply engaged with gaming and digital culture. Instead of treating gaming as a distraction, Gamr uses it as an entry point into learning, confidence, community, and opportunity."
        variant="darker"
      />

      <ContentSection
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

      <ContentSection
        heading="PATHWAYS BEYOND PLAY"
        body="Through tournaments, workshops, creator programs, development sprints, and community experiences, Gamr helps young people discover career pathways in gaming, media, design, technology, and live entertainment."
        variant="darker"
      />

      <ContentSection
        heading="FOR PARTNERS AND INSTITUTIONS"
        body="We collaborate with schools, brands, nonprofits, development organizations, and public institutions to create youth-focused gaming programs with real outcomes."
      />

      <ClosingCTA
        heading="PLAY CAN CHANGE FUTURES."
        ctaText="Build a Youth Program With Gamr"
        ctaHref="/contact"
      />
    </ContentPage>
  );
};

export default YouthDevelopment;
