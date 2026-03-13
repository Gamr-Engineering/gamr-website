import { useState } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";

const NewsletterForm = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");
    
    // Track attempt
    if (typeof window !== "undefined" && (window as any).trackEvent) {
      (window as any).trackEvent("newsletter_signup_attempt", { source: "insights" });
    }

    // Mock API call
    setTimeout(() => {
      setStatus("success");
      setEmail("");
      
      // Track success
      if (typeof window !== "undefined" && (window as any).trackEvent) {
        (window as any).trackEvent("newsletter_signup", { source: "insights" });
      }
      
      // Reset after 3 seconds
      setTimeout(() => setStatus("idle"), 3000);
    }, 1000);
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
          <form onSubmit={handleSubmit} className="relative">
            {status === "success" ? (
              <div className="flex items-center gap-3 w-full bg-green-500/10 border border-green-500/30 text-green-400 px-6 py-4 rounded-none font-bold uppercase tracking-widest text-sm transition-all animate-fade-in">
                <CheckCircle2 className="h-5 w-5" />
                Successfully Subscribed!
              </div>
            ) : (
              <div className="flex w-full">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="w-full bg-black/50 border border-white/10 px-6 py-4 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
                  required
                  disabled={status === "loading"}
                />
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 font-bold uppercase tracking-widest text-sm transition-colors flex items-center justify-center min-w-[140px]"
                >
                  {status === "loading" ? "..." : "Subscribe"}
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
