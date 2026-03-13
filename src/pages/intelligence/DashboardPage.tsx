import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import IndustryDashboard from "@/components/intelligence/IndustryDashboard";
import { BarChart3 } from "lucide-react";

const DashboardPage = () => {
  return (
    <div className="min-h-screen bg-black text-white font-sans">
      <Header />
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-6">
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-4">
               <div className="p-3 bg-cyan-600 rounded-2xl shadow-[0_0_20px_rgba(8,145,178,0.4)]">
                  <BarChart3 className="w-6 h-6 text-white" />
               </div>
               <h1 className="text-4xl font-black uppercase tracking-tighter">Industry Dashboard</h1>
            </div>
            <p className="text-zinc-500 text-lg max-w-2xl font-medium">
               A comprehensive analytical suite tracking market growth, prize pool evolution, and comparative participation across the continent.
            </p>
          </div>
          
          <IndustryDashboard />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default DashboardPage;
