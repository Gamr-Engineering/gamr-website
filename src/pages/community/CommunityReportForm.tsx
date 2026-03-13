import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CommunityContribution } from "@/components/CommunityContribution";
import { Users } from "lucide-react";

const CommunityReportForm = () => {
  return (
    <div className="min-h-screen bg-black text-white font-sans">
      <Header />
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-20">
            <div className="lg:w-1/3">
              <div className="sticky top-32">
                <div className="flex items-center gap-3 mb-6">
                   <div className="p-3 bg-green-600 rounded-2xl shadow-[0_0_20px_rgba(22,163,74,0.4)]">
                      <Users className="w-6 h-6 text-white" />
                   </div>
                   <h1 className="text-3xl font-black uppercase tracking-tighter leading-none">
                      Community <br /> Insight Reports
                   </h1>
                </div>
                
                <p className="text-zinc-500 text-lg mb-8 font-medium leading-relaxed">
                  Help us map the entire African esports ecosystem. Verified reports from local communities power the Gamr Intelligence Layer.
                </p>

                <div className="p-8 bg-zinc-900/50 border border-zinc-800 rounded-3xl">
                   <h4 className="text-xs font-black text-green-400 uppercase tracking-widest mb-4">Submission Guidelines</h4>
                   <ul className="space-y-4 text-sm text-zinc-400 font-medium">
                      <li className="flex gap-3">
                         <div className="w-1 h-1 rounded-full bg-green-500 mt-2 flex-shrink-0" />
                         Ensure all location data is accurate.
                      </li>
                      <li className="flex gap-3">
                         <div className="w-1 h-1 rounded-full bg-green-500 mt-2 flex-shrink-0" />
                         Include high-resolution tournament photos if available.
                      </li>
                      <li className="flex gap-3">
                         <div className="w-1 h-1 rounded-full bg-green-500 mt-2 flex-shrink-0" />
                         Reports are reviewed by the Gamr Ops team within 48h.
                      </li>
                   </ul>
                </div>
              </div>
            </div>

            <div className="lg:w-2/3">
               <CommunityContribution />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CommunityReportForm;
