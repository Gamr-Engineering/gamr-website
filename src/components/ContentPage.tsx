import { useEffect, ReactNode } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface ContentPageProps {
  /** Page title for document.title */
  title: string;
  /** Meta description for SEO */
  description?: string;
  children: ReactNode;
}

const ContentPage = ({ title, description, children }: ContentPageProps) => {
  useEffect(() => {
    // Set document title
    document.title = title;

    // Set meta description
    if (description) {
      let meta = document.querySelector('meta[name="description"]');
      const originalDescription = meta?.getAttribute("content") || "";
      if (meta) {
        meta.setAttribute("content", description);
      } else {
        meta = document.createElement("meta");
        meta.setAttribute("name", "description");
        meta.setAttribute("content", description);
        document.head.appendChild(meta);
      }

      return () => {
        // Restore original on unmount
        const metaTag = document.querySelector('meta[name="description"]');
        if (metaTag) {
          metaTag.setAttribute("content", originalDescription);
        }
      };
    }
  }, [title, description]);

  useEffect(() => {
    // Scroll to top on mount
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-black">
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default ContentPage;
