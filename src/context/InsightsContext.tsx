import React, { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { allInsights as staticInsights, Insight, Author } from "@/data/insightsData";
import { authors } from "@/data/insights/authors";

// Temporary generic author fallback for external community submissions
const genericExternalAuthor: Author = {
  name: "Community Contributor",
  avatar: "/assets/authors/akins-ebenezer.png",
  slug: "community",
  bio: "A guest contributor from the Gamr Africa ecosystem.",
  social: {
    twitter: "https://twitter.com/gamrafrica",
  }
};

// Build a reverse lookup: lowercased author name → author registry key
const authorsByName: Record<string, string> = {};
for (const [key, author] of Object.entries(authors)) {
  authorsByName[author.name.toLowerCase()] = key;
}

interface InsightsContextType {
  allInsights: Insight[];
  caseStudies: Insight[];
  blogPosts: Insight[];
  loading: boolean;
  refreshInsights: () => Promise<void>;
}

const stripMarkdown = (md: string) => {
  if (!md) return "";
  return md
    .replace(/!\[.*?\]\(.*?\)/g, '') // Remove images
    .replace(/\[.*?\]\(.*?\)/g, '') // Remove links entirely to avoid messy text
    .replace(/[#*`_~|>]/g, '') // Remove symbols
    .replace(/<\/?[^>]+(>|$)/g, "") // Strip HTML tags
    .trim();
};

const extractFirstImage = (md: string) => {
  if (!md) return null;
  const match = md.match(/!\[.*?\]\((.*?)\)/);
  if (match) return match[1];
  const imgMatch = md.match(/<img.*?src=["'](.*?)["'].*?>/);
  return imgMatch ? imgMatch[1] : null;
};

const InsightsContext = createContext<InsightsContextType>({
  allInsights: [],
  caseStudies: [],
  blogPosts: [],
  loading: true,
  refreshInsights: async () => {},
});

export const useInsights = () => useContext(InsightsContext);

export const InsightsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [allInsights, setAllInsights] = useState<Insight[]>(staticInsights);
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
        console.warn("Notice: Unable to reach Supabase. Safely falling back to local static insights.", error.message || error);
        // We already initialized with staticInsights, so just stop loading
        setLoading(false);
        return;
      }

      if (data && data.length > 0) {
        console.log(`[InsightsContext] Supabase returned ${data.length} approved articles:`, data.map((d: any) => ({ title: d.title, slug: d.slug, name: d.name })));
        const parsedInsights: Insight[] = data.map((sub: any) => {
          // Resolve author: try explicit author_slug first, then reverse-lookup by submitter name
          let resolvedAuthor: Author | undefined;
          if (sub.author_slug && authors[sub.author_slug]) {
            resolvedAuthor = authors[sub.author_slug];
          } else {
            // Reverse-lookup: match submitter name against author registry
            const nameKey = authorsByName[sub.name?.toLowerCase()];
            if (nameKey) {
              resolvedAuthor = authors[nameKey];
            }
          }
          const author: Author = resolvedAuthor || {
            ...genericExternalAuthor,
            name: sub.name,
          };

          // Build a clean excerpt from content if none provided
          const rawContent = sub.content || "";
          const strippedContent = stripMarkdown(rawContent);
          const excerpt = sub.excerpt || (strippedContent.length > 10 ? strippedContent.substring(0, 200) + "..." : "");

          const generatedSlug = sub.slug || sub.title?.toLowerCase().replace(/[^a-z0-9]+/g, '-') || `insight-${Date.now()}`;
          return {
            title: sub.title,
            slug: generatedSlug,
            excerpt,
            category: sub.category === 'case-study' ? 'case-study' : 'blog',
            date: new Date(sub.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
            readTime: sub.read_time || (Math.max(1, Math.ceil(rawContent.split(" ").length / 200)) + " min read"),
            coverImage: sub.cover_image || extractFirstImage(rawContent) || "/assets/insights/queen-of-venus-cover.jpg",
            author,
            tags: sub.tags?.length > 0 ? sub.tags : ["Community", sub.category === 'case-study' ? "Case Study" : "Editorial"],
            content: rawContent,
            featured: sub.featured === true,
            views: 0,
            shares: 0,
            publishedAt: sub.created_at,
            keywords: ["gamr", "community", sub.category]
          };
        });

        // Merge: Supabase articles take priority over static articles with the same slug
        const supabaseSlugs = new Set(parsedInsights.map(i => i.slug));
        const deduplicatedStatic = staticInsights.filter(si => !supabaseSlugs.has(si.slug));
        const merged = [...parsedInsights, ...deduplicatedStatic];

        // Sort by publishedAt descending (newest first)
        merged.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());

        // Ensure ONLY ONE featured article exists at a time (most recently featured wins)
        let foundFeatured = false;
        for (const i of merged) {
          if (i.featured && !foundFeatured) {
            foundFeatured = true;
          } else if (i.featured && foundFeatured) {
            i.featured = false;
          }
        }

        setAllInsights(merged);
        console.log(`[InsightsContext] Final merged: ${merged.length} articles (${parsedInsights.length} from Supabase + ${deduplicatedStatic.length} static)`);
      } else if (data && data.length === 0) {
        console.log("No approved insights found in database, using static fallback.");
      }
    } catch (err) {
      console.error("Critical error fetching insights:", err);
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
