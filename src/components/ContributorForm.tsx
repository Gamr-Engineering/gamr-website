import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Upload, CheckCircle, AlertCircle, Loader2, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';

const ContributorForm: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    title: '',
    category: '',
    content: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Basic validation
      if (!formData.category) {
        toast.error("Please select a category");
        setLoading(false);
        return;
      }

      const { error } = await supabase
        .from('article_submissions')
        .insert([
          { 
            ...formData, 
            status: 'pending',
            created_at: new Date().toISOString()
          }
        ]);

      if (error) throw error;

      setSubmitted(true);
      toast.success("Article submitted successfully!");
    } catch (error: any) {
      console.error('Submission error:', error);
      toast.error(error.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="text-center py-20 px-6 max-w-2xl mx-auto">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-blue-500/10 p-4 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-8"
        >
          <CheckCircle className="w-10 h-10 text-blue-500" />
        </motion.div>
        <h2 className="text-3xl font-bold text-white mb-4 uppercase tracking-tighter">Submission Received</h2>
        <p className="text-gray-400 mb-10 leading-relaxed text-lg">
          Your article has been submitted to the Gamr Editorial team. We'll review it and reach out via email once it's ready for publication.
        </p>
        <Button 
          onClick={() => navigate('/insights')}
          className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 h-auto text-lg rounded-xl transition-all hover:scale-105"
        >
          Return to Insights
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-3xl mx-auto bg-gray-900/50 p-8 md:p-12 rounded-3xl border border-white/5 backdrop-blur-xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-3">
          <Label htmlFor="name" className="text-xs uppercase tracking-widest text-gray-500 font-bold">Full Name</Label>
          <Input 
            id="name"
            placeholder="John Doe"
            required
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            className="bg-black/40 border-white/10 h-14 rounded-xl focus:ring-blue-500/50"
          />
        </div>
        <div className="space-y-3">
          <Label htmlFor="email" className="text-xs uppercase tracking-widest text-gray-500 font-bold">Email Address</Label>
          <Input 
            id="email"
            type="email"
            placeholder="john@example.com"
            required
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            className="bg-black/40 border-white/10 h-14 rounded-xl focus:ring-blue-500/50"
          />
        </div>
      </div>

      <div className="space-y-3">
        <Label htmlFor="title" className="text-xs uppercase tracking-widest text-gray-500 font-bold">Article Title</Label>
        <Input 
          id="title"
          placeholder="e.g. The Future of Mobile Esports in Nigeria"
          required
          value={formData.title}
          onChange={(e) => setFormData({...formData, title: e.target.value})}
          className="bg-black/40 border-white/10 h-14 rounded-xl focus:ring-blue-500/50"
        />
      </div>

      <div className="space-y-3">
        <Label htmlFor="category" className="text-xs uppercase tracking-widest text-gray-500 font-bold">Category</Label>
        <Select onValueChange={(val) => setFormData({...formData, category: val})}>
          <SelectTrigger className="bg-black/40 border-white/10 h-14 rounded-xl focus:ring-blue-500/50 text-gray-400">
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent className="bg-gray-900 border-white/10 text-white">
            <SelectItem value="blog">Blog / Editorial</SelectItem>
            <SelectItem value="case-study">Case Study</SelectItem>
            <SelectItem value="news">News / Update</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-3">
        <Label htmlFor="content" className="text-xs uppercase tracking-widest text-gray-500 font-bold">Article Content</Label>
        <Textarea 
          id="content"
          placeholder="Write your story here... (Markdown supported)"
          required
          rows={12}
          value={formData.content}
          onChange={(e) => setFormData({...formData, content: e.target.value})}
          className="bg-black/40 border-white/10 rounded-2xl resize-none focus:ring-blue-500/50 p-6 leading-relaxed"
        />
      </div>

      <div className="pt-6">
        <Button 
          type="submit" 
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white h-16 rounded-2xl text-lg font-bold transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 group"
        >
          {loading ? (
            <Loader2 className="w-6 h-6 animate-spin" />
          ) : (
            <>
              Submit for Review
              <Send className="w-5 h-5 ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </>
          )}
        </Button>
        <p className="text-center text-xs text-gray-600 mt-6 uppercase tracking-widest font-medium">
          By submitting, you agree to our contributor guidelines and editorial standards.
        </p>
      </div>
    </form>
  );
};

export default ContributorForm;
