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
  DialogScrollArea,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Loader2, Eye, CheckCircle, XCircle, FileText } from "lucide-react";
import { toast } from "sonner";

interface Submission {
  id: string;
  name: string;
  email: string;
  title: string;
  category: string;
  content: string;
  status: string;
  created_at: string;
}

const SubmissionsAdmin = () => {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchSubmissions = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("article_submissions")
        .select("*")
        .eq("status", "pending")
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

  const handleStatusUpdate = async (id: string, newStatus: 'approved' | 'rejected') => {
    try {
      const { error } = await supabase
        .from("article_submissions")
        .update({ status: newStatus })
        .eq("id", id);
      
      if (error) throw error;
      
      toast.success(`Article marked as ${newStatus}`);
      fetchSubmissions(); // Refresh the list
    } catch (error: any) {
      toast.error("Failed to update status");
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <Header />
      
      <main className="flex-grow pt-32 pb-20">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="flex items-center justify-between mb-10 border-b border-white/10 pb-8">
            <div>
              <h1 className="text-4xl font-black uppercase tracking-tighter mb-2">Editorial Queue</h1>
              <p className="text-gray-400">Review pending article submissions from the community.</p>
            </div>
            
            <Badge variant="outline" className="text-blue-400 border-blue-400/30 bg-blue-500/10 px-4 py-2 uppercase tracking-widest text-xs">
              {submissions.length} Pending
            </Badge>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
            </div>
          ) : submissions.length === 0 ? (
            <div className="text-center py-20 border border-white/5 border-dashed rounded-2xl bg-gray-900/20">
              <FileText className="w-12 h-12 text-gray-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold uppercase tracking-widest text-gray-400">Queue is Empty</h3>
              <p className="text-gray-500 mt-2">No pending article submissions at the moment.</p>
            </div>
          ) : (
            <div className="rounded-xl border border-white/10 overflow-hidden bg-gray-900/50 backdrop-blur-sm">
              <Table>
                <TableHeader className="bg-black/50">
                  <TableRow className="border-white/10 hover:bg-transparent">
                    <TableHead className="text-gray-400 font-bold uppercase tracking-widest text-xs h-14">Submitted</TableHead>
                    <TableHead className="text-gray-400 font-bold uppercase tracking-widest text-xs">Author</TableHead>
                    <TableHead className="text-gray-400 font-bold uppercase tracking-widest text-xs">Title</TableHead>
                    <TableHead className="text-gray-400 font-bold uppercase tracking-widest text-xs">Category</TableHead>
                    <TableHead className="text-right text-gray-400 font-bold uppercase tracking-widest text-xs">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {submissions.map((sub) => (
                    <TableRow key={sub.id} className="border-white/10 hover:bg-white/5 transition-colors">
                      <TableCell className="text-gray-300 font-medium align-top py-5 text-sm">
                        {format(new Date(sub.created_at), "MMM d, yyyy")}
                      </TableCell>
                      <TableCell className="align-top py-5">
                        <div className="font-bold text-white mb-1.5">{sub.name}</div>
                        <div className="text-xs text-gray-500 font-medium">{sub.email}</div>
                      </TableCell>
                      <TableCell className="font-bold text-white max-w-sm align-top py-5 leading-snug">
                        {sub.title}
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
                              Review
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-4xl max-h-[90vh] bg-gray-950 border-white/10 text-white p-0 flex flex-col gap-0 overflow-hidden shadow-2xl">
                            <DialogHeader className="p-8 border-b border-white/10 bg-black flex-shrink-0">
                              <div className="flex items-center gap-3 mb-4">
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
                                {/* Simple split rendering since react-markdown isn't heavily used in the rest of the app */}
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
                            <div className="p-6 border-t border-white/10 bg-black flex justify-end gap-4 flex-shrink-0">
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
                                  Approve
                                </Button>
                              </DialogTrigger>
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
