import { campaigns } from "@/data/campaigns";
import CampaignBanner from "./CampaignBanner";

const TopBar = () => {
    return (
        <>
            {campaigns.map((campaign) => (
                <CampaignBanner key={campaign.id} campaign={campaign} />
            ))}
        </>
    );
};

export default TopBar;
