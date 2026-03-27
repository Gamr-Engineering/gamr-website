import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import ClaimGamrTag from "./pages/ClaimGamrTag";
import GamrLab from "./pages/GamrLab";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import NotFound from "./pages/NotFound";
import InsightsIndex from "./pages/InsightsIndex";
import InsightPost from "./pages/InsightPost";
import InsightSearchPage from "./pages/InsightSearchPage";
import AuthorProfile from "./pages/AuthorProfile";
import RisingEsports from "./pages/RisingEsports";
import InsightOS from "./pages/InsightOS";
import SubmitArticle from "./pages/SubmitArticle";
import IntelligenceHub from "./pages/intelligence/IntelligenceHub";
import MapPage from "./pages/intelligence/MapPage";
import DashboardPage from "./pages/intelligence/DashboardPage";
import TimelinePage from "./pages/intelligence/TimelinePage";
import CareersPage from "./pages/intelligence/CareersPage";
import CommunityReportForm from "./pages/community/CommunityReportForm";
import SubmissionsAdmin from "./pages/admin/SubmissionsAdmin";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/claim-gamrtag" element={<ClaimGamrTag />} />
          <Route path="/gamr-lab" element={<GamrLab />} /> {/* Roblox campaign closed - archive state */}
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/insights" element={<InsightsIndex />} />
          <Route path="/insights/search" element={<InsightSearchPage />} />
          <Route path="/insights/:slug" element={<InsightPost />} />
          <Route path="/insights/submit" element={<SubmitArticle />} />
          <Route path="/insights/admin" element={<SubmissionsAdmin />} />
          <Route path="/insights/author/:slug" element={<AuthorProfile />} />
          <Route path="/insights/stories/rising-esports" element={<RisingEsports />} />
          <Route path="/insights/os" element={<InsightOS />} />
          <Route path="/insights/intelligence" element={<IntelligenceHub />} />
          <Route path="/insights/intelligence/map" element={<MapPage />} />
          <Route path="/insights/intelligence/dashboard" element={<DashboardPage />} />
          <Route path="/insights/intelligence/timeline" element={<TimelinePage />} />
          <Route path="/insights/intelligence/careers" element={<CareersPage />} />
          <Route path="/insights/community-report" element={<CommunityReportForm />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
