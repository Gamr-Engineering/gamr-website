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
          <Route path="/gamr-lab" element={<GamrLab />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/insights" element={<InsightsIndex />} />
          <Route path="/insights/search" element={<InsightSearchPage />} />
          <Route path="/insights/:slug" element={<InsightPost />} />
          <Route path="/authors/:author" element={<AuthorProfile />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
