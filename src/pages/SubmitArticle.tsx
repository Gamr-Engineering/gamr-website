import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ContributorForm from '@/components/ContributorForm';
import { motion } from 'framer-motion';

const SubmitArticle = () => {
  const navigate = useNavigate();
  const heroRef = React.useRef<HTMLDivElement>(null);

  React.useLayoutEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    
    // Attempt scroll immediately
    window.scrollTo(0, 0);
    
    // Focus the hero to pull the browser viewport to the top
    if (heroRef.current) {
      heroRef.current.focus();
    }
    
    // Extended polling for 1 second to ensure we stay at top 
    // despite any child component autofocus or layout shifts
    let count = 0;
    const interval = setInterval(() => {
      window.scrollTo(0, 0);
      count++;
      if (count > 20) clearInterval(interval);
    }, 50);
    
    return () => {
      if ('scrollRestoration' in window.history) {
        window.history.scrollRestoration = 'auto';
      }
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="min-h-screen bg-black pt-28 pb-20 overflow-x-hidden">
      <div className="container mx-auto px-6 relative">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[120px] -z-10" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-orange-600/5 rounded-full blur-[120px] -z-10" />
        
        <header 
          ref={heroRef}
          tabIndex={-1} // Allow focus without showing outline
          className="max-w-3xl mx-auto mb-16 text-center outline-none"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-widest mb-8"
          >
            <Globe className="w-3 h-3" />
            Join the Network
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-4xl md:text-6xl font-black text-white mb-6 uppercase tracking-tight leading-[0.9]"
          >
            Become a <span className="text-blue-500">Contributor</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto font-medium"
          >
            Share your insights, case studies, and gaming stories with the largest esports community in Africa.
          </motion.p>
        </header>

        <motion.div
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           transition={{ delay: 0.2 }}
        >
          <ContributorForm />
        </motion.div>

        <div className="mt-16 text-center">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/insights')}
            className="text-gray-500 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Insights
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SubmitArticle;
