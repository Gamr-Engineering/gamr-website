import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { Insight } from "@/data/insightsData";

interface InsightCardProps {
  insight: Insight;
}

const InsightCard = ({ insight }: InsightCardProps) => {
  const navigate = useNavigate();
  const { slug, title, category, excerpt, coverImage, tags, views, date } = insight;
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
      className="group flex-shrink-0 flex flex-col justify-between p-0 border border-white/10
                 hover:border-blue-500/40 transition-all duration-500 cursor-pointer
                 w-full h-full overflow-hidden
                 scroll-snap-align-start bg-gray-950"
      style={{ scrollSnapAlign: "start" }}
    >
      {/* Image container — fixed 16:9 aspect ratio, no cropping of subject */}
      <div className="relative w-full overflow-hidden bg-gray-900" style={{ aspectRatio: "16/9" }}>
        <img
          src={coverImage}
          alt={title}
          className="w-full h-full object-cover object-[center_25%] group-hover:scale-105 transition-transform duration-700"
          loading="lazy"
        />
        {/* High-visibility category badge — works on light or dark images */}
        <div className="absolute top-3 left-3 z-20">
          <span className="text-[9px] font-black text-white bg-black/60 backdrop-blur-md border border-white/20 px-2.5 py-1 uppercase tracking-widest shadow-xl">
            {categoryLabel}
          </span>
        </div>
      </div>

      {/* Text content */}
      <div className="flex flex-col flex-grow p-6">
        <div className="flex justify-between items-center mb-3">
          {views > 0 && (
            <span className="text-[10px] text-blue-400 font-bold group-hover:text-blue-300 transition-colors">
              {views.toLocaleString()} views
            </span>
          )}
          <span className="text-[10px] text-gray-500 group-hover:text-white uppercase tracking-widest transition-colors ml-auto">
            {date}
          </span>
        </div>

        <h3 className="text-lg font-bold uppercase tracking-tighter leading-tight line-clamp-2 mb-3 text-white group-hover:text-blue-300 transition-colors">
          {title}
        </h3>
        <p className="text-gray-400 group-hover:text-gray-300 transition-colors leading-relaxed text-sm line-clamp-3 mb-4 flex-grow">
          {excerpt}
        </p>

        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {tags.slice(0, 2).map(tag => (
              <span key={tag} className="text-[9px] font-bold text-gray-500 bg-black/50 px-2 py-1 uppercase tracking-widest border border-white/10 group-hover:border-blue-500/30 transition-colors">
                {tag}
              </span>
            ))}
          </div>
        )}

        <div className="flex items-center gap-2 text-blue-400 group-hover:text-white font-bold uppercase text-xs tracking-widest transition-colors mt-auto pt-4 border-t border-white/5">
          Read Article
          <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-all duration-300" />
        </div>
      </div>
    </div>
  );
};

export default InsightCard;
