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
import { Loader2, Eye, CheckCircle, XCircle, FileText, Star, Trash2, ArrowLeft, Users, Send, Mail, Search } from "lucide-react";
import { toast } from "sonner";
import { useInsights } from "@/context/InsightsContext";
import { allInsights as staticInsights } from "@/data/insightsData";
import MarkdownToolbar from "@/components/MarkdownToolbar";
import { emailService } from "@/services/emailService";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface Subscriber {
  id: string;
  name: string;
  email: string;
  status: string;
  source: string;
  tags: string[];
  subscribed_at: string;
}

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

type TabType = "pending" | "approved" | "subscribers";

const SubmissionsAdmin = () => {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<TabType>("pending");
  const [broadcastModalOpen, setBroadcastModalOpen] = useState(false);
  const [broadcastLoading, setBroadcastLoading] = useState(false);
  const [broadcastData, setBroadcastData] = useState({ subject: "", content: "" });
  const [subscriberSearch, setSubscriberSearch] = useState("");
  
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);
  const { refreshInsights } = useInsights();

  const fetchSubscribers = async () => {
    try {
      const { data, error } = await supabase
        .from("gamr_subscribers")
        .select("*")
        .order("subscribed_at", { ascending: false });

      if (error) throw error;
      setSubscribers(data || []);
    } catch (error: any) {
      console.error("Error fetching subscribers:", error);
    }
  };

  const fetchSubmissions = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("article_submissions")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      
      let allData = data || [];
      const mockStr = localStorage.getItem('gamr_mock_submissions');
      if (mockStr) {
        try {
          const mocks = JSON.parse(mockStr);
          allData = [...mocks, ...allData];
        } catch (e) {}
      }

      setSubmissions(allData);
      await fetchSubscribers();
    } catch (error: any) {
      console.error("Error fetching submissions:", error);
      
      let fallbackData: Submission[] = [];
      const mockStr = localStorage.getItem('gamr_mock_submissions');
      if (mockStr) {
        try {
          fallbackData = [...JSON.parse(mockStr)];
        } catch (e) {}
      }
      
      const staticMapped: Submission[] = staticInsights.map((i: any) => ({
        id: i.slug,
        name: i.author.name,
        email: 'editorial@gamr.africa',
        title: i.title,
        category: i.category,
        content: i.content || i.excerpt || '',
        status: 'approved',
        featured: i.featured || false,
        slug: i.slug,
        created_at: new Date(i.publishedAt || new Date()).toISOString()
      }));

      fallbackData = [...fallbackData, ...staticMapped];
      setSubmissions(fallbackData);
      
      if (error.message?.includes('Failed to fetch')) {
        console.warn("Using local fallback data due to network disconnect");
      } else {
        toast.error("Failed to load dashboard data.");
      }
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

  const handleInsertMarkdown = (text: string) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const currentContent = broadcastData.content;

    const newContent = currentContent.substring(0, start) + text + currentContent.substring(end);
    setBroadcastData({ ...broadcastData, content: newContent });

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + text.length, start + text.length);
    }, 0);
  };

  const handleSendBroadcast = async () => {
    if (!broadcastData.subject || !broadcastData.content) {
      toast.error("Please fill in both subject and content.");
      return;
    }

    const activeEmails = subscribers
      .filter(s => s.status === 'active')
      .map(s => s.email);

    if (activeEmails.length === 0) {
      toast.error("No active subscribers to send to.");
      return;
    }

    setBroadcastLoading(true);
    try {
      // For the broadcast HTML, we'll wrap the content in a container consistent with our branding
      const styledHtml = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px; background-color: #030712; color: #ffffff; border-radius: 16px;">
          <h2 style="color: #3b82f6; text-transform: uppercase;">Gamr Insights Update</h2>
          <div style="color: #cbd5e1; line-height: 1.8; font-size: 16px;">
            ${broadcastData.content.replace(/\n/g, '<br/>')}
          </div>
          <div style="margin-top: 40px; border-top: 1px solid #1f2937; padding-top: 20px; font-[12px] color: #64748b;">
            Gamr Africa - Building the future of African Esports.
          </div>
        </div>
      `;

      await emailService.sendBroadcast(broadcastData.subject, styledHtml, activeEmails);
      
      toast.success(`Broadcast successfully sent to ${activeEmails.length} subscribers!`);
      setBroadcastModalOpen(false);
      setBroadcastData({ subject: "", content: "" });
    } catch (error: any) {
      console.error(error);
      toast.error("Failed to execute broadcast batch.");
    } finally {
      setBroadcastLoading(false);
    }
  };

  const displayedSubmissions = submissions.filter(s => s.status === activeTab);
  const pendingCount = submissions.filter(s => s.status === "pending").length;
  const activeSubscribersCount = subscribers.filter(s => s.status === 'active').length;
  
  const filteredSubscribers = subscribers.filter(s => 
    s.name.toLowerCase().includes(subscriberSearch.toLowerCase()) || 
    s.email.toLowerCase().includes(subscriberSearch.toLowerCase())
  );

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
              <button
                onClick={() => setActiveTab("subscribers")}
                className={`flex-1 md:flex-none px-6 py-2.5 text-xs font-bold uppercase tracking-widest rounded-md transition-all flex justify-center items-center gap-2 ${
                  activeTab === "subscribers" ? "bg-purple-600 text-white shadow-lg" : "text-gray-400 hover:text-white"
                }`}
              >
                <Users className="w-3.5 h-3.5" />
                Subscribers
              </button>
            </div>
          </div>

          {activeTab === "subscribers" ? (
             <div className="space-y-6">
                <div className="flex justify-between items-center bg-gray-900/30 p-8 rounded-2xl border border-white/5">
                   <div>
                      <h2 className="text-2xl font-black uppercase tracking-tighter text-white">Your Audience</h2>
                      <p className="text-gray-400">Total active subscribers: <span className="text-purple-400 font-bold">{activeSubscribersCount}</span></p>
                   </div>
                   
                   <Dialog open={broadcastModalOpen} onOpenChange={setBroadcastModalOpen}>
                      <DialogTrigger asChild>
                         <Button className="bg-purple-600 hover:bg-purple-700 text-white h-12 px-8 uppercase tracking-widest font-black text-xs rounded-xl shadow-lg shadow-purple-900/20">
                            <Send className="w-4 h-4 mr-2" />
                            Launch Broadcast
                         </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-3xl bg-gray-950 border-white/10 text-white p-0 overflow-hidden shadow-2xl">
                         <div className="p-8 border-b border-white/10 bg-black">
                            <DialogTitle className="text-2xl font-black uppercase tracking-tighter text-white flex items-center gap-3">
                               <Mail className="w-6 h-6 text-purple-500" />
                               Compose Global Broadcast
                            </DialogTitle>
                            <p className="text-gray-500 mt-2 text-sm uppercase tracking-widest font-bold">Sending to {activeSubscribersCount} active subscribers</p>
                         </div>
                         
                         <div className="p-8 space-y-6">
                            <div className="space-y-2">
                               <Label className="text-xs uppercase tracking-widest text-gray-400 font-bold">Email Subject</Label>
                               <Input 
                                  placeholder="e.g. Weekly Roundup: The State of African Esports"
                                  value={broadcastData.subject}
                                  onChange={(e) => setBroadcastData({...broadcastData, subject: e.target.value})}
                                  className="bg-black/40 border-white/10 h-12 rounded-xl focus:ring-purple-500/50"
                               />
                            </div>
                            
                            <div className="space-y-0">
                               <Label className="text-xs uppercase tracking-widest text-gray-400 font-bold mb-2 block">Message Body</Label>
                               <MarkdownToolbar onInsert={handleInsertMarkdown} />
                               <Textarea 
                                  ref={textareaRef}
                                  rows={10}
                                  value={broadcastData.content}
                                  onChange={(e) => setBroadcastData({...broadcastData, content: e.target.value})}
                                  placeholder="What do you want to tell your audience today?"
                                  className="bg-black/40 border-white/10 rounded-b-xl rounded-t-none border-t-0 p-5 focus:ring-0 focus-visible:ring-0 leading-relaxed"
                               />
                            </div>
                         </div>
                         
                         <div className="p-6 bg-black border-t border-white/10 flex justify-end">
                            <Button 
                               onClick={handleSendBroadcast}
                               disabled={broadcastLoading}
                               className="bg-purple-600 hover:bg-purple-700 text-white h-12 px-10 uppercase tracking-widest font-black text-xs rounded-xl"
                            >
                               {broadcastLoading ? <Loader2 className="w-4 h-4 animate-spin text-white" /> : "Blast to Audience"}
                            </Button>
                         </div>
                      </DialogContent>
                   </Dialog>
                </div>

                <div className="relative mb-6">
                   <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                   <Input 
                      placeholder="Search subscribers by name or email..."
                      value={subscriberSearch}
                      onChange={(e) => setSubscriberSearch(e.target.value)}
                      className="bg-gray-900/50 border-white/10 h-12 pl-12 rounded-xl focus:ring-purple-500/50 w-full md:w-[400px]"
                   />
                </div>
                
                <div className="rounded-xl border border-white/10 overflow-hidden bg-gray-900/50">
                  <Table>
                    <TableHeader className="bg-black/50">
                      <TableRow className="border-white/10 hover:bg-transparent">
                        <TableHead className="text-gray-400 font-bold uppercase tracking-widest text-xs h-14">Full Name</TableHead>
                        <TableHead className="text-gray-400 font-bold uppercase tracking-widest text-xs">Email Address</TableHead>
                        <TableHead className="text-gray-400 font-bold uppercase tracking-widest text-xs">Source</TableHead>
                        <TableHead className="text-gray-400 font-bold uppercase tracking-widest text-xs">Tags</TableHead>
                        <TableHead className="text-gray-400 font-bold uppercase tracking-widest text-xs">Status</TableHead>
                        <TableHead className="text-right text-gray-400 font-bold uppercase tracking-widest text-xs">Joined</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredSubscribers.map((sub) => (
                        <TableRow key={sub.id} className="border-white/10 hover:bg-white/5 transition-colors">
                          <TableCell className="text-white font-bold py-5">{sub.name}</TableCell>
                          <TableCell className="text-gray-400 py-5">{sub.email}</TableCell>
                          <TableCell className="py-5">
                            <Badge className="bg-blue-500/10 text-blue-400 border-blue-500/20 uppercase tracking-widest text-[9px] rounded-sm">{sub.source || 'direct'}</Badge>
                          </TableCell>
                          <TableCell className="py-5">
                            <div className="flex flex-wrap gap-1">
                              {sub.tags && sub.tags.length > 0 ? (
                                sub.tags.map((tag, i) => (
                                  <Badge key={i} className="bg-gray-800 text-gray-400 border-white/5 uppercase tracking-widest text-[8px] rounded-sm px-1.5">{tag}</Badge>
                                ))
                              ) : (
                                <span className="text-gray-600 text-[10px]">—</span>
                              )}
                            </div>
                          </TableCell>
                          <TableCell className="py-5">
                            <Badge className="bg-purple-500/10 text-purple-400 border-purple-500/20 uppercase tracking-widest text-[9px] rounded-sm">{sub.status}</Badge>
                          </TableCell>
                          <TableCell className="text-right text-gray-500 text-xs py-5">
                            {format(new Date(sub.subscribed_at), "MMM d, yyyy")}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
             </div>
          ) : (
          <>
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
                                {sub.content.split('\n\n').map((block, i) => {
                                  const line = block.trim();
                                  if (!line) return <br key={i} />;
                                  
                                  // Handle injected markdown images
                                  if (line.startsWith('![') && line.includes('](')) {
                                    const match = line.match(/!\[(.*?)\]\((.*?)\)/);
                                    if (match) {
                                      return (
                                        <div key={i} className="my-8 rounded-xl overflow-hidden border border-white/10 shadow-lg bg-black">
                                          <img src={match[2]} alt={match[1]} className="w-full h-auto object-cover" />
                                        </div>
                                      );
                                    }
                                  }

                                  // Handle injected HTML5 Media from MarkdownToolbar
                                  if (line.startsWith('<video') || line.startsWith('<audio')) {
                                    return <div key={i} className="my-6" dangerouslySetInnerHTML={{ __html: line }} />;
                                  }

                                  if (line.startsWith('# ')) return <h1 key={i} className="text-3xl font-black mb-6 mt-8">{line.replace('# ', '')}</h1>;
                                  if (line.startsWith('## ')) return <h2 key={i} className="text-2xl font-black mb-4 mt-6">{line.replace('## ', '')}</h2>;
                                  if (line.startsWith('### ')) return <h3 key={i} className="text-xl font-bold mb-3 mt-5">{line.replace('### ', '')}</h3>;
                                  
                                  const formatted = line.replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-white">$1</strong>').replace(/\*(.*?)\*/g, '<em class="italic text-gray-400">$1</em>');
                                  return <p key={i} className="mb-4 text-lg text-gray-300 leading-relaxed font-medium" dangerouslySetInnerHTML={{ __html: formatted }} />;
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
          </>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default SubmissionsAdmin;
