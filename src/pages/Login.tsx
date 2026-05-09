import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Loader2, ShieldCheck, Mail } from "lucide-react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false); // Toggle for first-time password setup
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/insights/admin";
  // SECURITY FIX: Removed environment variable dependency for admin check.
  const ADMIN_EMAIL = "olamide.michael@gamr.africa";

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // SECURITY FIX: Removed insecure frontend master password bypass.
    // All authentication must route through Supabase.

    if (isSignUp) {
      // ... existing signup logic ...
      if (email !== ADMIN_EMAIL) {
        toast.error("Account creation is restricted to the administrator.");
        setLoading(false);
        return;
      }
      
      const { error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        toast.error(error.message);
      } else {
        toast.success("Account created successfully!");
        setIsSignUp(false);
      }
    } else {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        if (error.message.includes("Email not confirmed")) {
            toast.error("Email not confirmed. We've sent another confirmation link to your inbox.");
            await supabase.auth.resend({
                type: 'signup',
                email: email,
            });
        } else if (error.message.includes("Invalid login credentials")) {
            toast.error("Invalid email or password. If this is your first time, use 'First-time setup'.");
        } else {
            toast.error(error.message);
        }
      } else {
        toast.success("Access granted. Welcome back!");
        navigate(from);
      }
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
          <h1 className="text-3xl font-black uppercase tracking-tighter mb-2">
            {isSignUp ? "Account Setup" : "Admin Gate"}
          </h1>
          <p className="text-gray-400 text-sm font-medium">
            {isSignUp ? "Create a secure password for your admin account." : "Identify yourself to access the command center."}
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 ml-1">Work Email</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <Input
                type="email"
                placeholder="olamide.michael@gamr.africa"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-black/50 border-white/10 h-14 pl-12 rounded-xl focus:ring-blue-500 focus:border-blue-500 text-white"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 ml-1">Password</label>
            <div className="relative">
              <ShieldCheck className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <Input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-black/50 border-white/10 h-14 pl-12 rounded-xl focus:ring-blue-500 focus:border-blue-500 text-white"
                required
              />
            </div>
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full h-14 bg-blue-600 hover:bg-blue-500 text-white font-black uppercase tracking-widest text-xs rounded-xl transition-all mt-4"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : (isSignUp ? "Initialize Account" : "Access Admin")}
          </Button>

          <div className="text-center pt-2">
            <button
                type="button"
                onClick={() => setIsSignUp(!isSignUp)}
                className="text-[10px] text-gray-400 hover:text-white uppercase tracking-widest font-bold"
            >
                {isSignUp ? "Return to Login" : "First-time setup? Click here"}
            </button>
          </div>
        </form>

        <div className="mt-10 pt-8 border-t border-white/5 text-center">
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
