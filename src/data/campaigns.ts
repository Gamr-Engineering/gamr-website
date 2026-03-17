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
    startDate: "2026-03-01",
    endDate: "2026-03-20", // 3 days from now (2026-03-17)
    closingSoonDays: 7,
    bannerEnabled: true,
    applicationUrl: "/gamr-lab",
    description: "A 30-day, hardware-backed sprint at Gamr Lab turning African players into Roblox creators."
  },
  {
    id: "esports-championship",
    title: "Gamr Esports Championship 2026",
    shortTitle: "Esports Championship",
    startDate: "2026-04-01",
    endDate: "2026-05-01",
    closingSoonDays: 7,
    bannerEnabled: true,
    applicationUrl: "/insights/stories/rising-esports",
    description: "The biggest esports tournament in Africa."
  }
];
