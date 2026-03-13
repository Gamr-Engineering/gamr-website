import { useRef, useState, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import InsightCard from "@/components/InsightCard";
import type { Insight } from "@/data/insightsData";

interface InsightCarouselProps {
  title: string;
  insights: Insight[];
}

const InsightCarousel = ({ title, insights }: InsightCarouselProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartX = useRef(0);
  const scrollStartLeft = useRef(0);

  const scrollBy = (offset: number) => {
    scrollRef.current?.scrollBy({ left: offset, behavior: "smooth" });
  };

  // ── Mouse drag ──────────────────────────────────────────────────────────
  const onPointerDown = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (!scrollRef.current) return;
    setIsDragging(true);
    dragStartX.current = e.clientX;
    scrollStartLeft.current = scrollRef.current.scrollLeft;
    scrollRef.current.setPointerCapture(e.pointerId);
  }, []);

  const onPointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (!isDragging || !scrollRef.current) return;
      const delta = dragStartX.current - e.clientX;
      scrollRef.current.scrollLeft = scrollStartLeft.current + delta;
    },
    [isDragging]
  );

  const onPointerUp = useCallback(() => setIsDragging(false), []);

  return (
    <div className="flex flex-col gap-4">
      {/* Header row */}
      <div className="flex items-center justify-between">
        <span className="text-white font-bold uppercase tracking-widest text-sm">
          {title}
        </span>
        {/* Arrow buttons – hidden on mobile */}
        <div className="hidden md:flex items-center gap-2">
          <button
            onClick={() => scrollBy(-420)}
            aria-label="Scroll left"
            className="p-2 border border-white/20 text-white hover:bg-white hover:text-black transition-colors duration-200"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={() => scrollBy(420)}
            aria-label="Scroll right"
            className="p-2 border border-white/20 text-white hover:bg-white hover:text-black transition-colors duration-200"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Scroll container */}
      <div
        ref={scrollRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerUp}
        className="flex gap-4 overflow-x-scroll pb-4 border-t border-white/10"
        style={{
          scrollSnapType: "x mandatory",
          scrollbarWidth: "none",       /* Firefox */
          msOverflowStyle: "none",     /* IE/Edge */
          cursor: isDragging ? "grabbing" : "grab",
          WebkitOverflowScrolling: "touch",
        }}
      >
        {/* Hide WebKit scrollbar */}
        <style>{`.insight-scroll::-webkit-scrollbar { display: none; }`}</style>

        {insights.map((insight) => (
          <InsightCard key={insight.id} insight={insight} />
        ))}
      </div>
    </div>
  );
};

export default InsightCarousel;
