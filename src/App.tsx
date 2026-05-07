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
import GamrNexusEditor from "./pages/GamrNexusEditor";
import IntelligenceHub from "./pages/intelligence/IntelligenceHub";
import MapPage from "./pages/intelligence/MapPage";
import DashboardPage from "./pages/intelligence/DashboardPage";
import TimelinePage from "./pages/intelligence/TimelinePage";
import CareersPage from "./pages/intelligence/CareersPage";
import CommunityReportForm from "./pages/community/CommunityReportForm";
import SubmissionsAdmin from "./pages/admin/SubmissionsAdmin";
import Login from "./pages/Login";
import Vision from "./pages/Vision";
import Mission from "./pages/Mission";
import WhyNow from "./pages/WhyNow";
import Team from "./pages/Team";
import GamrTag from "./pages/GamrTag";
import Studios from "./pages/Studios";
import Carven from "./pages/Carven";
import Bracket from "./pages/Bracket";
import Gamers from "./pages/Gamers";
import Creators from "./pages/Creators";
import Developers from "./pages/Developers";
import Education from "./pages/Education";
import Esports from "./pages/Esports";
import Gaming from "./pages/Gaming";
import YouthDevelopment from "./pages/YouthDevelopment";
import CaseStudies from "./pages/CaseStudies";
import Assets from "./pages/Assets";
import Contact from "./pages/Contact";
import { InsightsProvider } from "./context/InsightsContext";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <InsightsProvider>
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
            <Route path="/insights/submit" element={<SubmitArticle />} />
            <Route 
              path="/insights/admin" 
              element={
                <ProtectedRoute>
                  <SubmissionsAdmin />
                </ProtectedRoute>
              } 
            />
            <Route path="/login" element={<Login />} />
            <Route path="/insights/author/:slug" element={<AuthorProfile />} />
            <Route path="/insights/stories/rising-esports" element={<RisingEsports />} />
            <Route path="/insights/os" element={<InsightOS />} />
            <Route path="/insights/intelligence" element={<IntelligenceHub />} />
            <Route path="/insights/intelligence/map" element={<MapPage />} />
            <Route path="/insights/intelligence/dashboard" element={<DashboardPage />} />
            <Route path="/insights/intelligence/timeline" element={<TimelinePage />} />
            <Route path="/insights/intelligence/careers" element={<CareersPage />} />
            <Route path="/insights/community-report" element={<CommunityReportForm />} />
            {/* Company */}
            <Route path="/vision" element={<Vision />} />
            <Route path="/mission" element={<Mission />} />
            <Route path="/why-now" element={<WhyNow />} />
            <Route path="/team" element={<Team />} />
            {/* Ecosystem */}
            <Route path="/gamrtag" element={<GamrTag />} />
            <Route path="/studios" element={<Studios />} />
            <Route path="/carven" element={<Carven />} />
            <Route path="/bracket" element={<Bracket />} />
            {/* Talent */}
            <Route path="/gamers" element={<Gamers />} />
            <Route path="/creators" element={<Creators />} />
            <Route path="/developers" element={<Developers />} />
            {/* Industry */}
            <Route path="/education" element={<Education />} />
            <Route path="/esports" element={<Esports />} />
            <Route path="/gaming" element={<Gaming />} />
            <Route path="/youth-development" element={<YouthDevelopment />} />
            {/* Resources */}
            <Route path="/case-studies" element={<CaseStudies />} />
            <Route path="/assets" element={<Assets />} />
            {/* Contact */}
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
        </InsightsProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
