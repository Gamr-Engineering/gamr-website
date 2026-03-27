import { useState } from "react";
import { ArrowRight, CheckCircle2, Loader2, User, Mail } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { emailService } from "@/services/emailService";
import { toast } from "sonner";

const NewsletterForm = () => {
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
        .insert([{ name, email, status: 'active' }]);

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
        (window as any).trackEvent("newsletter_signup", { source: "insights" });
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
    <div className="bg-blue-900/20 border border-blue-500/20 rounded-2xl p-8 md:p-12 mt-20 mb-12">
      <div className="flex flex-col md:flex-row gap-8 items-center justify-between">
        <div className="max-w-xl">
          <h3 className="text-3xl font-bold uppercase tracking-tighter mb-4 text-white">
            Stay Updated With Gamr Insights
          </h3>
          <p className="text-gray-400">
            Get the latest esports analysis, infrastructure case studies, and gaming culture trends delivered directly to your inbox.
          </p>
        </div>

        <div className="w-full md:w-auto flex-grow max-w-md">
          <form onSubmit={handleSubmit} className="relative space-y-3">
            {status === "success" ? (
              <div className="flex items-center gap-3 w-full bg-blue-500/10 border border-blue-500/30 text-blue-400 px-6 py-6 rounded-2xl font-bold uppercase tracking-widest text-xs transition-all animate-fade-in shadow-[0_0_30px_rgba(59,130,246,0.1)]">
                <CheckCircle2 className="h-5 w-5" />
                Welcome to the ecosystem! Check your inbox.
              </div>
            ) : (
              <div className="flex flex-col gap-3 group">
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your Full Name"
                    className="w-full bg-black/40 border border-white/10 px-12 py-4 text-white placeholder-gray-600 focus:outline-none focus:border-blue-500/50 focus:bg-black/60 transition-all rounded-xl text-sm"
                    required
                    disabled={status === "loading"}
                  />
                </div>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email Address"
                    className="w-full bg-black/40 border border-white/10 px-12 py-4 text-white placeholder-gray-600 focus:outline-none focus:border-blue-500/50 focus:bg-black/60 transition-all rounded-xl text-sm"
                    required
                    disabled={status === "loading"}
                  />
                </div>
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="bg-blue-600 hover:bg-blue-500 text-white w-full py-4 font-black uppercase tracking-widest text-xs transition-all flex items-center justify-center rounded-xl gap-2 hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-blue-900/20"
                >
                  {status === "loading" ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <>
                      Subscribe to Insights
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewsletterForm;
