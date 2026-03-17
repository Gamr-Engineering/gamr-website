import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { robloxCampaignConfig } from "@/config/campaign";
import { cn } from "@/lib/utils";

const TopBar = () => {
    const { isOpen } = robloxCampaignConfig;

    return (
        <div className="bg-blue-600 text-white py-2 px-4 text-center relative z-50">
            <div className="container mx-auto flex items-center justify-center gap-2 text-xs md:text-sm font-bold uppercase tracking-widest">
                <span className="hidden md:inline">Lagos Creator Pathway:</span>
                <span>Build Africa on Roblox Application {isOpen ? "Now Open" : "Closed"}</span>
                {isOpen ? (
                    <Link
                        to="/gamr-lab"
                        className="inline-flex items-center ml-2 underline hover:text-black transition-colors"
                    >
                        Apply Now <ArrowRight className="ml-1 w-3 h-3" />
                    </Link>
                ) : (
                    <span className="inline-flex items-center ml-2 px-2 py-0.5 bg-white/15 border border-white/40 text-white opacity-70 cursor-not-allowed">
                        Closed
                    </span>
                )}
            </div>
        </div>
    );
};

export default TopBar;
