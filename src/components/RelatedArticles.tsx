import React, { useMemo } from 'react';
import { Insight } from '../data/insightsData';
import { getAIRecommendations } from '../utils/insightsUtils';
import InsightCard from './InsightCard';
import { Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

interface RelatedArticlesProps {
  currentArticle: Insight;
  allInsights: Insight[];
}

const RelatedArticles: React.FC<RelatedArticlesProps> = ({ currentArticle, allInsights }) => {
  const recommendations = useMemo(() => 
    getAIRecommendations(currentArticle, allInsights, 3), 
    [currentArticle, allInsights]
  );

  if (recommendations.length === 0) return null;

  return (
    <section className="py-16 mt-16 border-t border-white/5">
      <div className="flex items-center gap-3 mb-10">
        <div className="p-2 bg-blue-500/10 rounded-lg">
          <Sparkles className="w-5 h-5 text-blue-500 fill-blue-500/20" />
        </div>
        <h2 className="text-xl md:text-2xl font-bold text-white uppercase tracking-tighter">
          You May Also Like
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {recommendations.map((article, index) => (
          <motion.div
            key={article.slug}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
          >
            <InsightCard insight={article} />
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default RelatedArticles;
