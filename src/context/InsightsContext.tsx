import React, { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { allInsights as staticInsights, Insight, Author } from "@/data/insightsData";

// Temporary generic author fallback for dynamic articles
const genericExternalAuthor: Author = {
  name: "Community Contributor",
  avatar: "/assets/authors/akins-ebenezer.png", // Fallback to an existing generic asset
  slug: "community",
  bio: "A guest contributor from the Gamr Africa ecosystem.",
  socials: {
    twitter: "https://twitter.com/gamrafrica",
  }
};

interface InsightsContextType {
  allInsights: Insight[];
  caseStudies: Insight[];
  blogPosts: Insight[];
  loading: boolean;
  refreshInsights: () => Promise<void>;
}

const InsightsContext = createContext<InsightsContextType>({
  allInsights: staticInsights,
  caseStudies: staticInsights.filter(i => i.category === "case-study"),
  blogPosts: staticInsights.filter(i => i.category === "blog"),
  loading: true,
  refreshInsights: async () => {},
});

export const useInsights = () => useContext(InsightsContext);

export const InsightsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mergedInsights, setMergedInsights] = useState<Insight[]>(staticInsights);
  const [loading, setLoading] = useState(true);

  const fetchInsights = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("article_submissions")
        .select("*")
        .eq("status", "approved");

      if (error) {
        console.error("Error loading dynamic insights:", error);
        return;
      }

      if (data && data.length > 0) {
        const dynamicInsights: Insight[] = data.map((sub: any) => ({
          title: sub.title,
          slug: sub.slug,
          excerpt: sub.content.substring(0, 150) + "...", // Auto-generate excerpt
          category: sub.category === 'case-study' ? 'case-study' : 'blog',
          date: new Date(sub.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
          readTime: Math.max(1, Math.ceil(sub.content.split(" ").length / 200)) + " min read", // Calculate dynamic read time ~200 WPM
          coverImage: "/lovable-uploads/eb289bd7-d3eb-41db-829d-ee1ec80242af.png", // Generic fallback image for now
          author: {
            ...genericExternalAuthor,
            name: sub.name, // Use the real submitting name
          },
          tags: ["Community", sub.category === 'case-study' ? "Case Study" : "Editorial"],
          content: sub.content,
          featured: sub.featured === true,
          views: 0,
          shares: 0,
          publishedAt: sub.created_at,
          keywords: ["gamr", "community", sub.category]
        }));

        // Replace any static 'featured' flags if a dynamic one has taken over
        const hasDynamicFeatured = dynamicInsights.some(i => i.featured);
        
        const finalMerged = [...dynamicInsights, ...staticInsights];
        
        if (hasDynamicFeatured) {
          // Unflag static ones if a dynamic article is taking the spotlight
          setMergedInsights(finalMerged.map(i => {
            // Only keep exactly one featured article (the newest dynamic one)
            if (i.featured && !dynamicInsights.includes(i)) {
              return { ...i, featured: false };
            }
            return i;
          }));
        } else {
          setMergedInsights(finalMerged);
        }
      } else {
        setMergedInsights(staticInsights);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInsights();
  }, []);

  const value = {
    allInsights: mergedInsights,
    caseStudies: mergedInsights.filter(i => i.category === "case-study"),
    blogPosts: mergedInsights.filter(i => i.category === "blog"),
    loading,
    refreshInsights: fetchInsights
  };

  return (
    <InsightsContext.Provider value={value}>
      {children}
    </InsightsContext.Provider>
  );
};
