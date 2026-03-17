import { Campaign } from "@/data/campaigns";

export type CampaignStatus = "UPCOMING" | "OPEN" | "CLOSING_SOON" | "CLOSED";

export interface StatusInfo {
  status: CampaignStatus;
  daysRemaining?: number;
  hoursRemaining?: number;
}

export function getCampaignStatus(campaign: Campaign, customNow?: Date): StatusInfo {
  const now = customNow || new Date();
  const start = new Date(campaign.startDate);
  const end = new Date(campaign.endDate);

  const closingSoonDate = new Date(end);
  closingSoonDate.setDate(end.getDate() - campaign.closingSoonDays);

  if (now < start) {
    return { status: "UPCOMING" };
  }

  if (now >= end) {
    return { status: "CLOSED" };
  }

  const timeDiff = end.getTime() - now.getTime();
  const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
  const hoursRemaining = Math.floor(timeDiff / (1000 * 3600)) % 24;

  if (now >= closingSoonDate) {
    return { 
      status: "CLOSING_SOON", 
      daysRemaining: daysDiff,
      hoursRemaining
    };
  }

  return { status: "OPEN" };
}

export function formatRemainingTime(days?: number, hours?: number): string {
  if (days === undefined) return "";
  if (days > 1) {
    return `${days} days ${hours ?? 0} hours`;
  }
  if (days === 1) {
    return `1 day ${hours ?? 0} hours`;
  }
  return `${hours ?? 0} hours`;
}
