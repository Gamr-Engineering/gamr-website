import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TournamentTimeline from "@/components/intelligence/TournamentTimeline";
import { Trophy } from "lucide-react";

const TimelinePage = () => {
  return (
    <div className="min-h-screen bg-black text-white font-sans">
      <Header />
      <main className="pt-32">
        <div className="container mx-auto px-6 pb-20">
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-4">
               <div className="p-3 bg-yellow-600 rounded-2xl shadow-[0_0_20px_rgba(202,138,4,0.4)]">
                  <Trophy className="w-6 h-6 text-white" />
               </div>
               <h1 className="text-4xl font-black uppercase tracking-tighter">Tournament Timeline</h1>
            </div>
            <p className="text-zinc-500 text-lg max-w-2xl font-medium">
               Explore the evolution of competitive gaming in Africa. From grassroot cafe tournaments to million-dollar international circuits.
            </p>
          </div>
        </div>
        
        <TournamentTimeline />

        <div className="container mx-auto px-6 py-20">
           <div className="p-16 bg-zinc-900/40 border border-zinc-800 rounded-[3rem] text-center">
              <h2 className="text-3xl font-black uppercase tracking-tighter mb-6">Contribute to the Archive</h2>
              <p className="text-zinc-500 max-w-2xl mx-auto mb-8 font-medium">
                 Do you have records of historic African esports events that aren't listed here? Submit your community report to help us build the definitive history.
              </p>
              <button className="px-10 py-5 bg-blue-600 rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-blue-500 transition-all">
                SUBMIT EVENT RECORD
              </button>
           </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TimelinePage;
