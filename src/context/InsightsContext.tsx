import React, { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Insight, Author } from "@/data/insightsData";
import { authors } from "@/data/insights/authors";

// Temporary generic author fallback for external community submissions
const genericExternalAuthor: Author = {
  name: "Community Contributor",
  avatar: "/assets/authors/akins-ebenezer.png", // Fallback to an existing generic asset
  slug: "community",
  bio: "A guest contributor from the Gamr Africa ecosystem.",
  social: {
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
  allInsights: [],
  caseStudies: [],
  blogPosts: [],
  loading: true,
  refreshInsights: async () => {},
});

export const useInsights = () => useContext(InsightsContext);

export const InsightsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [allInsights, setAllInsights] = useState<Insight[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchInsights = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("article_submissions")
        .select("*")
        .eq("status", "approved")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error loading insights:", error);
        return;
      }

      if (data) {
        const parsedInsights: Insight[] = data.map((sub: any) => {
          // Resolve author via slug if it exists in local registry, otherwise fall back to generic community author
          const registryAuthor = sub.author_slug ? authors[sub.author_slug] : undefined;
          const author: Author = registryAuthor || {
            ...genericExternalAuthor,
            name: sub.name,
          };

          return {
            title: sub.title,
            slug: sub.slug,
            excerpt: sub.excerpt || (sub.content.substring(0, 150) + "..."),
            category: sub.category === 'case-study' ? 'case-study' : 'blog',
            date: new Date(sub.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
            readTime: sub.read_time || (Math.max(1, Math.ceil(sub.content.split(" ").length / 200)) + " min read"),
            coverImage: sub.cover_image || "/lovable-uploads/eb289bd7-d3eb-41db-829d-ee1ec80242af.png",
            author,
            tags: sub.tags?.length > 0 ? sub.tags : ["Community", sub.category === 'case-study' ? "Case Study" : "Editorial"],
            content: sub.content,
            featured: sub.featured === true,
            views: 0,
            shares: 0,
            publishedAt: sub.created_at,
            keywords: ["gamr", "community", sub.category]
          };
        });

        // Ensure ONLY ONE featured article exists at a time (most recently featured wins)
        // Sort by created_at DESC already happened via SQL.
        // Wait! Let's just find the very first featured article and unflag the rest.
        let foundFeatured = false;
        
        for (const i of parsedInsights) {
          if (i.featured && !foundFeatured) {
            foundFeatured = true;
          } else if (i.featured && foundFeatured) {
            i.featured = false;
          }
        }

        setAllInsights(parsedInsights);
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
    allInsights,
    caseStudies: allInsights.filter(i => i.category === "case-study"),
    blogPosts: allInsights.filter(i => i.category === "blog"),
    loading,
    refreshInsights: fetchInsights
  };

  return (
    <InsightsContext.Provider value={value}>
      {children}
    </InsightsContext.Provider>
  );
};
