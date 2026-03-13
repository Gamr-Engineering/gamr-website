export type InsightCategory = "case-study" | "blog";

export interface Insight {
  id: string;
  title: string;
  category: InsightCategory;
  excerpt: string;
  date: string;
}

export const allInsights: Insight[] = [
  // ─── Case Studies ─────────────────────────────────────────────────────────
  {
    id: "redefining-mobile-esports",
    title: "REDEFINING MOBILE ESPORTS IN NIGERIA",
    category: "case-study",
    excerpt:
      "How Gamr partnered with top brands to create the largest mobile gaming circuit in West Africa.",
    date: "Oct 12, 2025",
  },
  {
    id: "gamrx-vision-to-stadium",
    title: "GAMR X: FROM VISION TO STADIUM",
    category: "case-study",
    excerpt:
      "A deep dive into the logistics and impact of Africa's premier gaming festival.",
    date: "Jan 22, 2026",
  },
  {
    id: "carven-effect",
    title: "THE CARVEN EFFECT: BRIDGING AFRICA'S DIGITAL-PHYSICAL GAMING DIVIDE",
    category: "case-study",
    excerpt:
      "How Carven gaming hubs are solving infrastructure challenges and enabling African esports athletes to train and compete in professional environments.",
    date: "Feb 05, 2026",
  },
  {
    id: "gamr-lab-talent-pipeline",
    title: "GAMR LAB: BUILDING AFRICA'S GAMING TALENT PIPELINE",
    category: "case-study",
    excerpt:
      "Inside the Gamr Lab initiative and its mission to train thousands of African youth in game design, esports production, and digital entertainment careers.",
    date: "Feb 14, 2026",
  },
  {
    id: "fintech-fair-play",
    title: "FINTECH & FAIR PLAY: AUTOMATING ESPORTS PRIZE PAYOUTS",
    category: "case-study",
    excerpt:
      "How Gamr integrated automated tournament brackets and digital payment systems to build trust and transparency in African esports competitions.",
    date: "Feb 20, 2026",
  },
  {
    id: "community-to-competition",
    title: "COMMUNITY TO COMPETITION: THE RISE OF LOCAL ESPORTS LEAGUES",
    category: "case-study",
    excerpt:
      "A look at how grassroots gaming communities are evolving into structured competitive leagues across African cities.",
    date: "Mar 01, 2026",
  },
  {
    id: "internet-cafes-to-esports-arenas",
    title: "FROM INTERNET CAFÉS TO ESPORTS ARENAS",
    category: "case-study",
    excerpt:
      "The transformation of African gaming culture as casual gaming spaces evolve into professional esports venues.",
    date: "Mar 08, 2026",
  },

  // ─── Blog Posts ───────────────────────────────────────────────────────────
  {
    id: "future-of-play-2026",
    title: "THE FUTURE OF PLAY: 2026 OUTLOOK",
    category: "blog",
    excerpt:
      "An exploration of emerging trends in the African gaming ecosystem and the role of infrastructure.",
    date: "Nov 05, 2025",
  },
  {
    id: "infrastructure-trends",
    title: "INFRASTRUCTURE TRENDS",
    category: "blog",
    excerpt:
      "Building the backbone of African esports with high-speed latency and decentralized servers.",
    date: "Dec 10, 2025",
  },
  {
    id: "africa-esports-market",
    title: "WHY AFRICA IS THE NEXT BILLION-DOLLAR ESPORTS MARKET",
    category: "blog",
    excerpt:
      "Exploring the demographic, technological, and cultural factors positioning Africa as one of the fastest-growing esports markets globally.",
    date: "Jan 08, 2026",
  },
  {
    id: "gaming-career-paths",
    title: "HOW GAMING IS CREATING NEW CAREER PATHS FOR AFRICAN YOUTH",
    category: "blog",
    excerpt:
      "From esports broadcasting to game development, discover how the gaming industry is unlocking new economic opportunities for African youth.",
    date: "Jan 30, 2026",
  },
  {
    id: "esports-communities-african-cities",
    title: "THE RISE OF ESPORTS COMMUNITIES IN AFRICAN CITIES",
    category: "blog",
    excerpt:
      "How grassroots gaming communities in cities like Lagos and Nairobi are shaping the future of competitive gaming across the continent.",
    date: "Feb 18, 2026",
  },
  {
    id: "local-game-servers",
    title: "WHY LOCAL GAME SERVERS MATTER FOR AFRICAN PLAYERS",
    category: "blog",
    excerpt:
      "Understanding latency challenges and why regional gaming infrastructure is essential for African esports growth.",
    date: "Feb 28, 2026",
  },
  {
    id: "phygital-gaming",
    title: "THE FUTURE OF PHYGITAL GAMING EXPERIENCES",
    category: "blog",
    excerpt:
      "How the combination of digital platforms and physical gaming hubs is reshaping esports participation in emerging markets.",
    date: "Mar 10, 2026",
  },
];

export const caseStudies = allInsights.filter(
  (i) => i.category === "case-study"
);
export const blogPosts = allInsights.filter((i) => i.category === "blog");
