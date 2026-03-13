import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import type { Insight } from "@/data/insightsData";

interface InsightCardProps {
  insight: Insight;
}

const InsightCard = ({ insight }: InsightCardProps) => {
  const { id, title, category, excerpt } = insight;
  const categoryLabel = category === "case-study" ? "Case Study" : "Blog";

  return (
    <Link
      to={`/blog/${id}`}
      draggable={false}
      onDragStart={(e) => e.preventDefault()}
      className="group flex-shrink-0 flex flex-col justify-between p-10 border border-white/10
                 hover:border-blue-500/40 hover:bg-blue-600 transition-all duration-500 cursor-pointer
                 w-[80vw] sm:w-[380px] md:w-[400px]
                 scroll-snap-align-start"
      style={{ scrollSnapAlign: "start" }}
    >
      <div className="space-y-5">
        <span className="text-[10px] font-bold text-gray-500 group-hover:text-blue-200 uppercase tracking-widest transition-colors">
          {categoryLabel}
        </span>
        <h3 className="text-xl font-bold uppercase tracking-tighter leading-tight line-clamp-3">
          {title}
        </h3>
        <p className="text-gray-400 group-hover:text-white transition-colors leading-relaxed text-sm line-clamp-3">
          {excerpt}
        </p>
      </div>
      <div className="pt-10 flex items-center gap-2 text-blue-400 group-hover:text-white font-bold uppercase text-xs tracking-widest transition-colors">
        Read Article
        <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-all duration-300" />
      </div>
    </Link>
  );
};

export default InsightCard;
