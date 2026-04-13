import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Loader2, ShieldCheck, Mail } from "lucide-react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/insights/admin";

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: window.location.origin + from,
      },
    });

    if (error) {
      toast.error(error.message);
    } else {
      setSent(true);
      toast.success("Magic link sent! Check your email.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6 bg-[url('https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80')] bg-cover bg-center">
      <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" />
      
      <div className="relative w-full max-w-md bg-gray-950/50 border border-white/10 p-10 rounded-3xl backdrop-blur-xl animate-scale-in">
        <div className="flex flex-col items-center text-center mb-10">
          <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mb-6 shadow-2xl shadow-blue-500/20">
            <ShieldCheck className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-black uppercase tracking-tighter mb-2">Admin Gate</h1>
          <p className="text-gray-400 text-sm font-medium">Identify yourself to access the command center.</p>
        </div>

        {!sent ? (
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 ml-1">Work Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <Input
                  type="email"
                  placeholder="admin@gamr.africa"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-black/50 border-white/10 h-14 pl-12 rounded-xl focus:ring-blue-500 focus:border-blue-500 text-white"
                  required
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full h-14 bg-blue-600 hover:bg-blue-500 text-white font-black uppercase tracking-widest text-xs rounded-xl transition-all"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : "Send Magic Link"}
            </Button>
          </form>
        ) : (
          <div className="text-center py-6">
            <div className="w-12 h-12 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Mail className="w-6 h-6 text-green-500" />
            </div>
            <h3 className="text-lg font-bold mb-2">Link Sent!</h3>
            <p className="text-gray-400 text-sm leading-relaxed mb-8">
              We've sent a magic login link to <br/>
              <span className="text-white font-bold">{email}</span>
            </p>
            <Button 
                variant="ghost" 
                onClick={() => setSent(false)}
                className="text-xs font-bold uppercase tracking-widest text-gray-500 hover:text-white"
            >
                Use another email
            </Button>
          </div>
        )}

        <div className="mt-12 pt-8 border-t border-white/5 text-center">
          <button 
            onClick={() => navigate("/insights")}
            className="text-[10px] font-bold uppercase tracking-widest text-gray-600 hover:text-blue-400 transition-colors"
          >
            ← Public View
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
