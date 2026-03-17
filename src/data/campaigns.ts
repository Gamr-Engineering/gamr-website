export interface Campaign {
  id: string;
  title: string;
  startDate: string; // ISO format: YYYY-MM-DD
  endDate: string; // ISO format: YYYY-MM-DD
  closingSoonDays: number;
  bannerEnabled: boolean;
  applicationUrl: string;
  description?: string;
  shortTitle?: string;
}

export const campaigns: Campaign[] = [
  {
    id: "roblox-creator-pathway",
    title: "Lagos Creator Pathway: Build Africa on Roblox",
    shortTitle: "Build Africa on Roblox",
    startDate: "2026-02-01",
    endDate: "2026-03-10", // Set to past to keep CLOSED
    closingSoonDays: 7,
    bannerEnabled: true,
    applicationUrl: "/gamr-lab",
    description: "A 30-day, hardware-backed sprint at Gamr Lab turning African players into Roblox creators."
  }
];
