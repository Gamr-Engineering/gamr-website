import { useState } from "react";
import { ArrowRight, CheckCircle2, Loader2, User, Mail } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { emailService } from "@/services/emailService";
import { toast } from "sonner";

interface NewsletterFormProps {
  source?: string;
  tags?: string[];
}

const NewsletterForm = ({ source = "general", tags = [] }: NewsletterFormProps) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !name) return;

    setStatus("loading");
    
    try {
      // 1. Insert into Supabase
      const { error: dbError } = await supabase
        .from('gamr_subscribers')
        .insert([{ 
          name, 
          email, 
          status: 'active',
          source,
          tags
        }]);

      if (dbError) {
        if (dbError.code === '23505') { // Unique constraint violation
          toast.error("You're already subscribed!");
          setStatus("idle");
          return;
        }
        throw dbError;
      }

      // 2. Trigger Welcome Email (Async, don't block UI if it fails)
      emailService.sendWelcome(name, email).catch(err => {
        console.error("Welcome email failed:", err);
      });

      // 3. Mark success
      setStatus("success");
      setName("");
      setEmail("");
      
      // Track success
      if (typeof window !== "undefined" && (window as any).trackEvent) {
        (window as any).trackEvent("newsletter_signup", { source });
      }
      
      // Reset after 5 seconds
      setTimeout(() => setStatus("idle"), 5000);
    } catch (error: any) {
      console.error("Subscription error:", error);
      toast.error("Something went wrong. Please try again.");
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  return (
    <div className="bg-zinc-950 border border-white/5 rounded-sm p-10 md:p-20 mt-32 mb-12 relative overflow-hidden group shadow-[0_0_50px_rgba(0,0,0,0.5)]">
      {/* Decorative Glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/5 blur-[120px] rounded-full -mr-32 -mt-32 transition-transform duration-1000 group-hover:scale-110" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-600/5 blur-[100px] rounded-full -ml-32 -mb-32" />

      <div className="flex flex-col lg:flex-row gap-16 items-center justify-between relative z-10">
        <div className="max-w-2xl text-center lg:text-left">
          <div className="flex items-center gap-4 mb-8 justify-center lg:justify-start">
            <div className="h-px w-8 bg-blue-500" />
            <span className="text-blue-400 font-bold uppercase tracking-[0.3em] text-[10px]">Newsletter</span>
          </div>
          <h3 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-8 text-white leading-[0.9]">
            STAY UPDATED <br/> WITH GAMR INSIGHTS.
          </h3>
          <p className="text-xl text-gray-400 leading-relaxed font-light">
            Get the latest esports analysis, infrastructure case studies, and gaming culture trends delivered directly to your inbox. No noise, just signal.
          </p>
        </div>

        <div className="w-full lg:max-w-md">
          <form onSubmit={handleSubmit} className="relative">
            {status === "success" ? (
              <div className="flex items-center gap-4 w-full bg-blue-500/10 border border-blue-500/30 text-white px-8 py-8 rounded-sm font-bold uppercase tracking-widest text-xs transition-all animate-fade-in">
                <CheckCircle2 className="h-6 w-6 text-blue-500" />
                Welcome to the ecosystem!
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                <div className="grid grid-cols-1 gap-4">
                  <div className="relative group/input">
                    <User className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600 group-focus-within/input:text-blue-500 transition-colors" />
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="YOUR FULL NAME"
                      className="w-full bg-white/[0.03] border border-white/10 px-14 py-5 text-white placeholder-gray-700 focus:outline-none focus:border-blue-500/50 focus:bg-white/[0.05] transition-all rounded-sm text-[10px] font-bold tracking-widest uppercase"
                      required
                      disabled={status === "loading"}
                    />
                  </div>
                  <div className="relative group/input">
                    <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600 group-focus-within/input:text-blue-500 transition-colors" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="EMAIL ADDRESS"
                      className="w-full bg-white/[0.03] border border-white/10 px-14 py-5 text-white placeholder-gray-700 focus:outline-none focus:border-blue-500/50 focus:bg-white/[0.05] transition-all rounded-sm text-[10px] font-bold tracking-widest uppercase"
                      required
                      disabled={status === "loading"}
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="bg-blue-600 hover:bg-blue-500 text-white w-full py-5 font-black uppercase tracking-[0.2em] text-[10px] transition-all flex items-center justify-center rounded-sm gap-3 hover:scale-[1.01] active:scale-[0.99] shadow-xl shadow-blue-900/20 mt-2"
                >
                  {status === "loading" ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <>
                      SUBSCRIBE TO INSIGHTS
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
                <p className="text-[9px] text-gray-600 text-center mt-4 tracking-widest uppercase font-bold">
                  By subscribing, you agree to our privacy policy.
                </p>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewsletterForm;
