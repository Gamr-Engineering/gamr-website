import { Insight } from "../data/insightsData";

/**
 * calculates the trending score based on the weighted formula:
 * score = (views * 0.5) + (shares * 0.3) + (recentness * 0.2)
 */
export const calculateTrendingScore = (insight: Insight): number => {
  const viewsWeight = 0.5;
  const sharesWeight = 0.3;
  const recencyWeight = 0.2;

  const recencyScore = getRecencyScore(insight.publishedAt);
  
  return (insight.views * viewsWeight) + (insight.shares * sharesWeight) + (recencyScore * recencyWeight);
};

/**
 * calculates a recency score from 0 to 1000 based on how new the article is.
 * decay factor: older articles get lower scores.
 */
export const getRecencyScore = (publishedAt: string): number => {
  const now = new Date();
  const pubDate = new Date(publishedAt);
  const diffInMs = now.getTime() - pubDate.getTime();
  const diffInDays = diffInMs / (1000 * 60 * 60 * 24);

  // decay: 1000 points start, lose 10 points per day, min 0.
  return Math.max(0, 1000 - (diffInDays * 10));
};

/**
 * gets recommended articles based on keyword similarity and category.
 */
export const getAIRecommendations = (current: Insight, all: Insight[], limit: number = 3): Insight[] => {
  return all
    .filter(a => a.slug !== current.slug)
    .map(a => {
      // Keyword matching score
      const keywordMatch = a.keywords.filter(k => 
        current.keywords.some(ck => ck.toLowerCase() === k.toLowerCase())
      ).length;

      // Category match bonus
      const categoryBonus = a.category === current.category ? 2 : 0;

      return {
        ...a,
        recommendationScore: keywordMatch + categoryBonus
      };
    })
    .sort((a, b) => (b as any).recommendationScore - (a as any).recommendationScore)
    .slice(0, limit);
};

/**
 * sorts insights by trending score and returns the top N.
 */
export const getTrendingInsights = (insights: Insight[], limit: number = 5): Insight[] => {
  return [...insights]
    .map(i => ({
      ...i,
      tempScore: calculateTrendingScore(i)
    }))
    .sort((a, b) => b.tempScore - a.tempScore)
    .map(({ tempScore, ...i }) => i as Insight)
    .slice(0, limit);
};
