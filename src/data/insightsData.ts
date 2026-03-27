export type InsightCategory = "case-study" | "blog";

export interface Author {
  name: string;
  slug: string;
  bio: string;
  avatar?: string;
  social?: {
    twitter?: string;
    linkedin?: string;
    instagram?: string;
  };
}

export const authors: Record<string, Author> = {
  "williams-falodun": {
    name: "Williams Falodun",
    slug: "williams-falodun",
    bio: "Williams Falodun is a storyteller focused on African gaming culture, identity, and the evolving ecosystem shaping the next generation of creators.",
    social: {
      twitter: "https://twitter.com/williamsfalodun",
      linkedin: "https://linkedin.com/in/williamsfalodun"
    }
  },
  "emmanuel-oyalabu": {
    name: "Emmanuel Oyalabu",
    slug: "emmanuel-oyalabu",
    bio: "Emmanuel is a tech enthusiast and esports researcher dedicated to documenting the growth of gaming infrastructure across Africa.",
    social: {}
  },
  "oladapo-dosekun": {
    name: "Oladapo Dosekun",
    slug: "oladapo-dosekun",
    bio: "Oladapo is a logistics and operations expert focusing on the scale and impact of large-scale gaming festivals in emerging markets.",
    social: {}
  },
  "gamr-editorial": {
    name: "Gamr Editorial",
    slug: "gamr-editorial",
    bio: "The official editorial voice of Gamr Africa, bringing you the latest news, case studies, and deep dives into the gaming ecosystem.",
    social: {}
  }
};

export interface Insight {
  slug: string;
  title: string;
  category: InsightCategory;
  excerpt: string;
  date: string;
  readTime: string;
  coverImage: string;
  author: Author;
  tags: string[];
  featured?: boolean;
  trendingScore?: number;
  content: string;
  metaTitle?: string;
  metaDescription?: string;
  keywords: string[];
  views: number;
  shares: number;
  publishedAt: string; // ISO String
}

import { newCaseStudies } from "./insights/caseStudies";
import { blogsPart1 } from "./insights/blogsPart1";
import { blogsPart2 } from "./insights/blogsPart2";
import { queenOfVenus } from "./insights/queenOfVenus";

export const allInsights: Insight[] = [
  queenOfVenus,
  ...newCaseStudies,
  ...blogsPart1,
  ...blogsPart2,
];

export const caseStudies = allInsights.filter(
  (i) => i.category === "case-study"
);
export const blogPosts = allInsights.filter((i) => i.category === "blog");
