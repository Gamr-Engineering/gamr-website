import { Link } from "react-router-dom";
import { ArrowRight, Clock } from "lucide-react";
import { Campaign } from "@/data/campaigns";
import { getCampaignStatus, formatRemainingTime } from "@/utils/campaignStatus";
import { cn } from "@/lib/utils";

interface CampaignBannerProps {
  campaign: Campaign;
}

const CampaignBanner = ({ campaign }: CampaignBannerProps) => {
  const statusInfo = getCampaignStatus(campaign);
  const { status, daysRemaining, hoursRemaining } = statusInfo;

  if (!campaign.bannerEnabled || status === "UPCOMING") {
    return null;
  }

  const isClosingSoon = status === "CLOSING_SOON";
  const isClosed = status === "CLOSED";

  return (
    <div className={cn(
      "text-white py-2 px-4 transition-all duration-500 relative z-50",
      isClosingSoon ? "bg-orange-600 animate-pulse" : isClosed ? "bg-orange-600" : "bg-blue-600"
    )}>
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-center gap-2 md:gap-4 text-xs md:text-sm font-bold uppercase tracking-widest">
        <div className="flex items-center gap-2">
          {isClosingSoon && <Clock className="w-4 h-4 animate-bounce" />}
          <span className="hidden md:inline">{campaign.shortTitle || campaign.title}:</span>
          <span>
            {isClosed ? "Application Period Ended" : 
             isClosingSoon ? "Closing Soon!" : "Application Now Open"}
          </span>
        </div>

        {isClosingSoon && (
          <div className="text-[10px] md:text-xs bg-black/20 px-2 py-0.5 rounded-full border border-white/20">
            Ends in: {formatRemainingTime(daysRemaining, hoursRemaining)}
          </div>
        )}

        <div className="flex items-center gap-3">
          {isClosed ? (
            <span className="px-3 py-1 bg-white/10 border border-white/20 text-white/60 cursor-not-allowed text-[10px] md:text-xs uppercase tracking-tighter">
              Closed
            </span>
          ) : (
            <Link
              to={campaign.applicationUrl}
              className={cn(
                "inline-flex items-center px-3 py-1 transition-all duration-200 text-[10px] md:text-xs uppercase tracking-tight underline-offset-4 hover:underline",
                isClosingSoon ? "bg-white text-orange-600 hover:bg-zinc-100" : "hover:text-black"
              )}
            >
              {isClosingSoon ? "Apply Now — Hurry!" : "Apply Now"} 
              <ArrowRight className="ml-1 w-3 h-3" />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default CampaignBanner;
