export type { Author } from "./insights/authors";
export { authors } from "./insights/authors";

export type InsightCategory = "case-study" | "blog";

import type { Author } from "./insights/authors";

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
