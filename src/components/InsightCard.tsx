import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { Insight } from "@/data/insightsData";

interface InsightCardProps {
  insight: Insight;
}

const InsightCard = ({ insight }: InsightCardProps) => {
  const navigate = useNavigate();
  const { slug, title, category, excerpt, coverImage, author, tags } = insight;
  const categoryLabel = category === "case-study" ? "Case Study" : "Blog";

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (window.getSelection()?.toString()) return;
    navigate(`/insights/${slug}`);
  };

  return (
    <div
      onClick={handleClick}
      role="link"
      tabIndex={0}
      draggable={false}
      onDragStart={(e) => e.preventDefault()}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          navigate(`/insights/${slug}`);
        }
      }}
      className="group flex-shrink-0 flex flex-col justify-between p-10 border border-white/10
                 hover:border-blue-500/40 hover:bg-blue-600 transition-all duration-500 cursor-pointer
                 w-[80vw] sm:w-[380px] md:w-[400px]
                 scroll-snap-align-start"
      style={{ scrollSnapAlign: "start" }}
    >
      <div className="flex-grow">
        <div className="relative w-full h-48 mb-6 overflow-hidden rounded-md border border-white/5">
            <img 
                src={coverImage} 
                alt={title} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                loading="lazy" 
            />
        </div>
        <div className="flex justify-between items-center mb-4">
            <span className="text-[10px] font-bold text-gray-500 group-hover:text-blue-200 uppercase tracking-widest transition-colors">
            {categoryLabel}
            </span>
            <span className="text-[10px] text-gray-400 group-hover:text-white uppercase tracking-widest transition-colors">
            {author}
            </span>
        </div>
        
        <h3 className="text-xl font-bold uppercase tracking-tighter leading-tight line-clamp-3 mb-4">
          {title}
        </h3>
        <p className="text-gray-400 group-hover:text-white transition-colors leading-relaxed text-sm line-clamp-3 mb-4">
          {excerpt}
        </p>
        
        {tags && tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
                {tags.slice(0, 2).map(tag => (
                    <span key={tag} className="text-[9px] font-bold text-gray-500 bg-black/50 px-2 py-1 uppercase tracking-widest rounded-sm border border-white/10 group-hover:border-blue-500/30 transition-colors">
                        {tag}
                    </span>
                ))}
            </div>
        )}
      </div>
      <div className="pt-10 flex items-center gap-2 text-blue-400 group-hover:text-white font-bold uppercase text-xs tracking-widest transition-colors">
        Read Article
        <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-all duration-300" />
      </div>
    </div>
  );
};

export default InsightCard;
