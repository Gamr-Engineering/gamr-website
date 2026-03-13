import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import EcosystemMap from "@/components/intelligence/EcosystemMap";
import { MapPin } from "lucide-react";

const MapPage = () => {
  return (
    <div className="min-h-screen bg-black text-white font-sans">
      <Header />
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-6">
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-4">
               <div className="p-3 bg-blue-600 rounded-2xl shadow-[0_0_20px_rgba(37,99,235,0.4)]">
                  <MapPin className="w-6 h-6 text-white" />
               </div>
               <h1 className="text-4xl font-black uppercase tracking-tighter">Live Ecosystem Map</h1>
            </div>
            <p className="text-zinc-500 text-lg max-w-2xl font-medium">
               Explore the African esports landscape through real-world geo-spatial intelligence. Track gaming hubs, tournament venues, and emerging regional communities.
            </p>
          </div>
          
          <EcosystemMap />

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
             <div className="p-8 bg-zinc-900/40 border border-zinc-800 rounded-3xl">
                <h4 className="text-xs font-black text-blue-400 uppercase tracking-widest mb-4">Data Source</h4>
                <p className="text-sm text-zinc-400">Aggregated from Gamr tournament APIs, community submissions, and regional infrastructure partners.</p>
             </div>
             <div className="p-8 bg-zinc-900/40 border border-zinc-800 rounded-3xl">
                <h4 className="text-xs font-black text-blue-400 uppercase tracking-widest mb-4">Update Pulse</h4>
                <p className="text-sm text-zinc-400">Hub activity metrics are refreshed every 24 hours based on tournament signups and active user logins.</p>
             </div>
             <div className="p-8 bg-zinc-900/40 border border-zinc-800 rounded-3xl">
                <h4 className="text-xs font-black text-blue-400 uppercase tracking-widest mb-4">Coverage</h4>
                <p className="text-sm text-zinc-400">Currently mapping 15+ major African cities with planned expansion to 30+ by the end of 2026.</p>
             </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default MapPage;
