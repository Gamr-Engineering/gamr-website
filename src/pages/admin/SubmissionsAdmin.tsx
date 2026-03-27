import React, { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Loader2, Eye, CheckCircle, XCircle, FileText, Star, Trash2, ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { useInsights } from "@/context/InsightsContext";

interface Submission {
  id: string;
  name: string;
  email: string;
  title: string;
  category: string;
  content: string;
  status: string;
  featured: boolean;
  slug: string;
  created_at: string;
}

type TabType = "pending" | "approved";

const SubmissionsAdmin = () => {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<TabType>("pending");
  const { refreshInsights } = useInsights(); // To refresh global context when changes are made

  const fetchSubmissions = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("article_submissions")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setSubmissions(data || []);
    } catch (error: any) {
      console.error("Error fetching submissions:", error);
      toast.error("Failed to load submissions.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const handleStatusUpdate = async (id: string, newStatus: 'approved' | 'rejected' | 'pending') => {
    try {
      const { error } = await supabase
        .from("article_submissions")
        .update({ status: newStatus })
        .eq("id", id);
      
      if (error) throw error;
      
      toast.success(`Article moved to ${newStatus}`);
      await fetchSubmissions(); // Refresh the list
      await refreshInsights(); // Refresh the global site feed
    } catch (error: any) {
      toast.error("Failed to update status");
      console.error(error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to permanently delete this article? This action cannot be undone.")) return;
    
    try {
      const { error } = await supabase
        .from("article_submissions")
        .delete()
        .eq("id", id);
      
      if (error) throw error;
      
      toast.success("Article permanently deleted");
      await fetchSubmissions();
      await refreshInsights();
    } catch (error: any) {
      toast.error("Failed to delete article");
      console.error(error);
    }
  };

  const handleFeatureToggle = async (id: string, currentFeatured: boolean) => {
    try {
      const { error } = await supabase
        .from("article_submissions")
        .update({ featured: !currentFeatured })
        .eq("id", id);
      
      if (error) throw error;
      
      toast.success(currentFeatured ? "Article un-featured" : "Article is now Featured!");
      await fetchSubmissions();
      await refreshInsights();
    } catch (error: any) {
      toast.error("Failed to update featured status");
      console.error(error);
    }
  };

  const displayedSubmissions = submissions.filter(s => s.status === activeTab);
  const pendingCount = submissions.filter(s => s.status === "pending").length;

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <Header />
      
      <main className="flex-grow pt-32 pb-20">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 border-b border-white/10 pb-8 gap-6">
            <div>
              <span className="text-blue-500 font-bold uppercase tracking-widest text-sm mb-2 block">CMS Dashboard</span>
              <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-2">Editorial Control</h1>
              <p className="text-gray-400">Manage community submissions and live platform content.</p>
            </div>
            
            {/* Custom Tabs */}
            <div className="flex bg-gray-900/50 p-1 rounded-lg border border-white/10 w-full md:w-auto">
              <button
                onClick={() => setActiveTab("pending")}
                className={`flex-1 md:flex-none px-6 py-2.5 text-xs font-bold uppercase tracking-widest rounded-md transition-all flex justify-center items-center gap-2 ${
                  activeTab === "pending" ? "bg-blue-600 text-white shadow-lg" : "text-gray-400 hover:text-white"
                }`}
              >
                In Review
                {pendingCount > 0 && <span className="bg-white text-blue-600 px-1.5 py-0.5 rounded-sm text-[10px] leading-none">{pendingCount}</span>}
              </button>
              <button
                onClick={() => setActiveTab("approved")}
                className={`flex-1 md:flex-none px-6 py-2.5 text-xs font-bold uppercase tracking-widest rounded-md transition-all ${
                  activeTab === "approved" ? "bg-white text-black shadow-lg" : "text-gray-400 hover:text-white"
                }`}
              >
                Published
              </button>
            </div>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
            </div>
          ) : displayedSubmissions.length === 0 ? (
            <div className="text-center py-20 border border-white/5 border-dashed rounded-2xl bg-gray-900/20">
              <FileText className="w-12 h-12 text-gray-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold uppercase tracking-widest text-gray-400">
                {activeTab === 'pending' ? 'Inbox is empty' : 'No Published Articles'}
              </h3>
              <p className="text-gray-500 mt-2">
                {activeTab === 'pending' ? 'You are all caught up on submissions.' : 'Approved articles will appear here.'}
              </p>
            </div>
          ) : (
            <div className="rounded-xl border border-white/10 overflow-hidden bg-gray-900/50 backdrop-blur-sm">
              <Table>
                <TableHeader className="bg-black/50">
                  <TableRow className="border-white/10 hover:bg-transparent">
                    <TableHead className="text-gray-400 font-bold uppercase tracking-widest text-xs h-14 w-[120px]">Date</TableHead>
                    <TableHead className="text-gray-400 font-bold uppercase tracking-widest text-xs w-[200px]">Author</TableHead>
                    <TableHead className="text-gray-400 font-bold uppercase tracking-widest text-xs">Title</TableHead>
                    <TableHead className="text-gray-400 font-bold uppercase tracking-widest text-xs w-[100px]">Status</TableHead>
                    <TableHead className="text-right text-gray-400 font-bold uppercase tracking-widest text-xs w-[150px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {displayedSubmissions.map((sub) => (
                    <TableRow key={sub.id} className="border-white/10 hover:bg-white/5 transition-colors group">
                      <TableCell className="text-gray-300 font-medium align-top py-5 text-sm">
                        {format(new Date(sub.created_at), "MMM d, yyyy")}
                      </TableCell>
                      <TableCell className="align-top py-5">
                        <div className="font-bold text-white mb-1.5 line-clamp-1">{sub.name}</div>
                        <div className="text-xs text-gray-500 font-medium line-clamp-1 break-all">{sub.email}</div>
                      </TableCell>
                      <TableCell className="font-bold text-white align-top py-5 leading-snug">
                        <div className="flex items-start gap-2">
                          {sub.featured && (
                            <Star className="w-4 h-4 text-yellow-500 fill-yellow-500 flex-shrink-0 mt-0.5" />
                          )}
                          <span className="line-clamp-2">{sub.title}</span>
                        </div>
                      </TableCell>
                      <TableCell className="align-top py-5">
                        <Badge variant="secondary" className="bg-gray-800 hover:bg-gray-700 text-gray-300 pointer-events-none rounded-sm uppercase tracking-wider text-[9px] px-2 py-0.5">
                          {sub.category}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right align-top py-5">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm" className="bg-transparent border-blue-500/30 text-blue-400 hover:bg-blue-500/10 hover:text-blue-300 rounded uppercase tracking-widest text-[10px] font-bold h-8">
                              <Eye className="w-3.5 h-3.5 mr-2" />
                              View
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-4xl max-h-[90vh] bg-gray-950 border-white/10 text-white p-0 flex flex-col gap-0 overflow-hidden shadow-2xl">
                            <DialogHeader className="p-8 border-b border-white/10 bg-black flex-shrink-0 relative">
                              {sub.featured && (
                                <div className="absolute top-0 left-0 bg-yellow-500 text-black text-[9px] font-black uppercase tracking-widest px-3 py-1">
                                  Featured on Homepage
                                </div>
                              )}
                              <div className="flex items-center gap-3 mb-4 mt-2">
                                <Badge className="bg-blue-600 hover:bg-blue-700 text-[10px] uppercase tracking-widest rounded-sm">{sub.category}</Badge>
                                <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">{format(new Date(sub.created_at), "MMMM d, yyyy")}</span>
                              </div>
                              <DialogTitle className="text-3xl md:text-4xl font-black uppercase tracking-tighter leading-none mb-2 text-left">
                                {sub.title}
                              </DialogTitle>
                              <div className="flex items-center gap-2 text-sm text-gray-400 text-left">
                                By <span className="font-bold text-gray-200">{sub.name}</span> ({sub.email})
                              </div>
                            </DialogHeader>
                            
                            {/* Read-only content area */}
                            <ScrollArea className="flex-grow p-8 md:p-12 overflow-y-auto bg-gray-950" style={{ maxHeight: 'calc(90vh - 250px)' }}>
                              <div className="max-w-3xl mx-auto prose prose-invert prose-blue prose-p:text-gray-300 prose-p:leading-relaxed prose-headings:uppercase prose-headings:tracking-tighter prose-a:text-blue-400">
                                {sub.content.split('\n').map((line, i) => {
                                  if (!line.trim()) return <br key={i} />;
                                  if (line.startsWith('# ')) return <h1 key={i} className="text-3xl font-black mb-6 mt-8">{line.replace('# ', '')}</h1>;
                                  if (line.startsWith('## ')) return <h2 key={i} className="text-2xl font-black mb-4 mt-6">{line.replace('## ', '')}</h2>;
                                  if (line.startsWith('### ')) return <h3 key={i} className="text-xl font-bold mb-3 mt-5">{line.replace('### ', '')}</h3>;
                                  return <p key={i} className="mb-4 text-lg text-gray-300 leading-relaxed font-medium">{line}</p>;
                                })}
                              </div>
                            </ScrollArea>

                            {/* Action footer */}
                            <div className="p-6 border-t border-white/10 bg-black flex justify-between items-center flex-shrink-0">
                              
                              {/* Left side actions (Delete) */}
                              <div>
                                <DialogTrigger asChild>
                                  <Button 
                                    variant="ghost" 
                                    className="text-gray-500 hover:text-red-500 hover:bg-transparent uppercase tracking-widest font-bold text-xs"
                                    onClick={() => handleDelete(sub.id)}
                                  >
                                    <Trash2 className="w-4 h-4 mr-2" />
                                    Delete
                                  </Button>
                                </DialogTrigger>
                              </div>

                              {/* Right side actions (Approve/Reject/Feature/Unpublish) */}
                              <div className="flex gap-3">
                                {activeTab === "pending" ? (
                                  <>
                                    <DialogTrigger asChild>
                                      <Button 
                                        variant="outline" 
                                        className="border-red-500/30 text-red-500 hover:bg-red-500/10 hover:text-red-400 uppercase tracking-widest font-bold text-xs"
                                        onClick={() => handleStatusUpdate(sub.id, 'rejected')}
                                      >
                                        <XCircle className="w-4 h-4 mr-2" />
                                        Reject
                                      </Button>
                                    </DialogTrigger>
                                    <DialogTrigger asChild>
                                      <Button 
                                        className="bg-green-600 hover:bg-green-700 text-white uppercase tracking-widest font-bold text-xs"
                                        onClick={() => handleStatusUpdate(sub.id, 'approved')}
                                      >
                                        <CheckCircle className="w-4 h-4 mr-2" />
                                        Publish
                                      </Button>
                                    </DialogTrigger>
                                  </>
                                ) : (
                                  <>
                                    <Button 
                                      variant="outline" 
                                      className={`${sub.featured ? "bg-yellow-500/10 border-yellow-500/50 text-yellow-500" : "border-gray-500/30 text-gray-400"} hover:bg-yellow-500/20 hover:text-yellow-400 hover:border-yellow-500/50 uppercase tracking-widest font-bold text-xs`}
                                      onClick={() => handleFeatureToggle(sub.id, sub.featured)}
                                    >
                                      <Star className={`w-4 h-4 mr-2 ${sub.featured ? "fill-yellow-500" : ""}`} />
                                      {sub.featured ? 'Un-Feature' : 'Feature Story'}
                                    </Button>

                                    <DialogTrigger asChild>
                                      <Button 
                                        variant="outline" 
                                        className="border-white/20 text-white hover:bg-white hover:text-black uppercase tracking-widest font-bold text-xs"
                                        onClick={() => handleStatusUpdate(sub.id, 'pending')}
                                      >
                                        <ArrowLeft className="w-4 h-4 mr-2" />
                                        Unpublish
                                      </Button>
                                    </DialogTrigger>
                                  </>
                                )}
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default SubmissionsAdmin;
