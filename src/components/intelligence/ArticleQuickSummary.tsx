import React from "react";
import { Zap } from "lucide-react";

interface ArticleQuickSummaryProps {
  excerpt: string;
  tags?: string[];
}

const ArticleQuickSummary = ({ excerpt, tags }: ArticleQuickSummaryProps) => {
  return (
    <div className="mt-12 p-8 bg-blue-600/5 border border-blue-500/20 rounded-3xl relative overflow-hidden group">
      <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
        <Zap className="w-12 h-12 text-blue-400" />
      </div>
      <h3 className="text-blue-400 font-black text-xs uppercase tracking-widest mb-4 flex items-center gap-2">
        <Zap className="w-3 h-3" />
        Quick Take (AI Summary)
      </h3>
      <ul className="space-y-3">
        <li className="flex items-start gap-4 text-sm text-gray-300 font-medium leading-relaxed">
          <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 flex-shrink-0" />
          {excerpt.split('. ')[0]}
        </li>
        <li className="flex items-start gap-4 text-sm text-gray-400 font-medium leading-relaxed">
          <div className="w-1.5 h-1.5 rounded-full bg-blue-500/40 mt-2 flex-shrink-0" />
          Analyzing the core impact of structural development and competitive growth in the {tags?.[0] || 'gaming'} sector.
        </li>
        <li className="flex items-start gap-4 text-sm text-gray-500 font-medium leading-relaxed">
          <div className="w-1.5 h-1.5 rounded-full bg-blue-500/20 mt-2 flex-shrink-0" />
          Key takeaways include infrastructure scalability and regional community engagement.
        </li>
      </ul>
    </div>
  );
};

export default ArticleQuickSummary;
