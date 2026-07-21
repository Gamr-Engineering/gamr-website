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
    title: "Build Africa on Roblox — Summer Edition (Cohort 2)",
    shortTitle: "Build Africa on Roblox",
    startDate: "2026-07-17",
    endDate: "2026-08-01",
    closingSoonDays: 7,
    bannerEnabled: true,
    applicationUrl: "/gamr-lab",
    description: "This initiative launches the second cohort of the “Build Africa on Roblox” program, focused on a Summer Edition that deepens Gamr’s presence on Roblox, re-engages alumni, attracts new African Roblox creators, and strengthens Gamr Lab as a year-round Roblox creation hub."
  }
];
