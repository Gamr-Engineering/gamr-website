import React, { useMemo } from 'react';
import { Insight } from '../data/insightsData';
import { getTrendingInsights } from '../utils/insightsUtils';
import { Link } from 'react-router-dom';
import { Flame, ArrowRight, Eye } from 'lucide-react';
import { motion } from 'framer-motion';

interface TrendingSectionProps {
  insights: Insight[];
}

const TrendingSection: React.FC<TrendingSectionProps> = ({ insights }) => {
  const trendingItems = useMemo(() => getTrendingInsights(insights, 6), [insights]);

  return (
    <section className="py-12 bg-black border-b border-white/5 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-orange-500/10 rounded-lg">
              <Flame className="w-6 h-6 text-orange-500 fill-orange-500 animate-pulse" />
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-white uppercase tracking-tighter">
                Trending Now
              </h2>
              <p className="text-xs text-gray-500 uppercase tracking-widest mt-1 font-medium">
                The most impactful stories in African gaming
              </p>
            </div>
          </div>
          <Link 
            to="/insights" 
            className="hidden md:flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors group"
          >
            View all insights
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="flex overflow-x-auto pb-4 gap-6 no-scrollbar snap-x touch-pan-x">
          {trendingItems.map((article, index) => (
            <motion.div
              key={article.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex-shrink-0 w-[280px] md:w-[350px] snap-start"
            >
              <Link 
                to={`/insights/${article.slug}`}
                className="group block relative aspect-[4/5] overflow-hidden rounded-2xl bg-gray-900"
              >
                <img 
                  src={article.coverImage} 
                  alt={article.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-60 group-hover:opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                
                <div className="absolute top-4 left-4">
                  <div className="px-3 py-1 bg-orange-500 text-black text-[10px] font-black uppercase rounded-full shadow-lg">
                    HOT #{index + 1}
                  </div>
                </div>

                <div className="absolute bottom-0 left-0 p-6 w-full">
                  <div className="flex items-center gap-2 text-[10px] text-gray-400 uppercase tracking-widest mb-2 font-bold">
                    <span>{article.category.replace('-', ' ')}</span>
                    <span className="w-1 h-1 bg-white/20 rounded-full" />
                    <div className="flex items-center gap-1 text-orange-400">
                      <Eye className="w-3 h-3" />
                      {article.views.toLocaleString()}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-white line-clamp-2 leading-tight group-hover:text-blue-400 transition-colors">
                    {article.title}
                  </h3>
                  <p className="mt-3 text-sm text-gray-400 line-clamp-2 font-medium opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0">
                    {article.excerpt}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrendingSection;
