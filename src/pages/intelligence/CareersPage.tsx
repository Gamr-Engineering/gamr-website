import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CareerPathExplorer from "@/components/intelligence/CareerPathExplorer";
import { GraduationCap } from "lucide-react";

const CareersPage = () => {
  return (
    <div className="min-h-screen bg-black text-white font-sans">
      <Header />
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-6">
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-4">
               <div className="p-3 bg-purple-600 rounded-2xl shadow-[0_0_20px_rgba(147,51,234,0.4)]">
                  <GraduationCap className="w-6 h-6 text-white" />
               </div>
               <h1 className="text-4xl font-black uppercase tracking-tighter">Career Path Explorer</h1>
            </div>
            <p className="text-zinc-500 text-lg max-w-2xl font-medium">
               Navigate the professional esports landscape. Discover required skills, progression milestones, and industry roles tailored for the African market.
            </p>
          </div>
          
          <CareerPathExplorer />

          <div className="mt-12 p-12 bg-zinc-900 border border-zinc-800 rounded-[2.5rem] flex flex-col md:flex-row items-center justify-between gap-8">
             <div>
                <h3 className="text-2xl font-black uppercase tracking-tighter text-white mb-2">Join Gamr Lab</h3>
                <p className="text-zinc-500 font-medium">Ready to start your journey? Apply for our specialized training programs.</p>
             </div>
             <button className="px-8 py-4 bg-white text-black rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-zinc-200 transition-colors">
                APPLY TO LABS
             </button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CareersPage;
