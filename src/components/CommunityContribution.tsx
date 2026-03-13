import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle, AlertCircle, FileText, User, ShieldCheck } from "lucide-react";

export const CommunityContribution = () => {
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    setTimeout(() => setStatus("success"), 2000);
  };

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-[3rem] p-12 relative overflow-hidden group">
      <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
         <ShieldCheck className="w-64 h-64 text-blue-500" />
      </div>

      <div className="max-w-xl relative z-10">
        <h2 className="text-4xl font-black mb-4 tracking-tighter">Become an OS Contributor</h2>
        <p className="text-zinc-500 text-lg font-medium mb-12">
          Submit tournament reports, local gaming news, or community highlights. Verified contributions are published to the global intelligence feed.
        </p>

        <AnimatePresence mode="wait">
          {status === "success" ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-green-500/10 border border-green-500/20 p-10 rounded-3xl text-center"
            >
              <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-6" />
              <h3 className="text-2xl font-bold mb-2">Submission Received</h3>
              <p className="text-zinc-400 font-medium">Our editorial team will review your report within 24 hours.</p>
              <button 
                onClick={() => setStatus("idle")}
                className="mt-8 text-green-400 font-black uppercase tracking-widest text-xs underline underline-offset-8"
              >
                SUBMIT ANOTHER REPORT
              </button>
            </motion.div>
          ) : (
            <motion.form 
              exit={{ opacity: 0, y: -20 }}
              onSubmit={handleSubmit} 
              className="space-y-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest ml-4">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600" />
                    <input 
                      required
                      type="text" 
                      placeholder="Emmanuel Oyalabu" 
                      className="w-full bg-black/40 border border-white/5 rounded-2xl py-5 pl-14 pr-6 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest ml-4">Report Type</label>
                  <select className="w-full bg-black/40 border border-white/5 rounded-2xl py-5 px-6 text-sm font-bold appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all">
                    <option>Tournament Results</option>
                    <option>Local News</option>
                    <option>Community Spotlight</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest ml-4">Content / Payload</label>
                <div className="relative">
                  <FileText className="absolute left-6 top-6 w-4 h-4 text-zinc-600" />
                  <textarea 
                    required
                    placeholder="Describe the event, major wins, and ecosystem impact..." 
                    className="w-full h-40 bg-black/40 border border-white/5 rounded-2xl py-6 pl-14 pr-6 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all resize-none"
                  />
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-blue-500/5 border border-blue-500/10 rounded-2xl mb-4">
                 <AlertCircle className="w-5 h-5 text-blue-400 flex-shrink-0" />
                 <p className="text-[10px] font-bold text-zinc-500 leading-normal">
                   By submitting, you agree to the Gamr Contributor Guidelines. All data is subject to verification.
                 </p>
              </div>

              <button 
                disabled={status === "submitting"}
                className={`w-full py-5 rounded-2xl font-black uppercase tracking-widest text-sm flex items-center justify-center gap-3 transition-all ${
                  status === "submitting" ? "bg-zinc-800 text-zinc-500" : "bg-blue-600 hover:bg-blue-500 text-white shadow-[0_0_30px_rgba(37,99,235,0.3)]"
                }`}
              >
                {status === "submitting" ? "PROCESSING PAYLOAD..." : <>SUBMIT FOR REVIEW <Send className="w-4 h-4" /></>}
              </button>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
