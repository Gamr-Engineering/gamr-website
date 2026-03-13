import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import InsightExplorer from "@/components/intelligence/InsightExplorer";

const InsightSearchPage = () => {
    return (
        <div className="min-h-screen bg-black text-white selection:bg-blue-500/30 flex flex-col font-sans">
            <Header />
            <main className="flex-grow pt-32 pb-20">
                <div className="container mx-auto px-6">
                    <InsightExplorer />
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default InsightSearchPage;
