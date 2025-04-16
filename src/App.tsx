
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import Footer from "./components/Footer";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

// Product pages
import ProductOverview from "./pages/product/ProductOverview";
import Features from "./pages/product/Features";

// By Roles
import ByRoles from "./pages/roles/ByRoles";

// Frameworks
import Frameworks from "./pages/frameworks/Frameworks";
import Cybersecurity from "./pages/frameworks/Cybersecurity";
import InformationSecurity from "./pages/frameworks/InformationSecurity";
import DataSecurity from "./pages/frameworks/DataSecurity";
import Esg from "./pages/frameworks/Esg";
import Environmental from "./pages/frameworks/Environmental";
import Governance from "./pages/frameworks/Governance";
import ProductLevel from "./pages/frameworks/ProductLevel";

// Cybersecurity Framework specific pages
import Soc from "./pages/frameworks/cybersecurity/Soc";
import NisII from "./pages/frameworks/cybersecurity/NisII";
import Nist from "./pages/frameworks/cybersecurity/Nist";

// Information Security Framework specific pages
import Iso27001 from "./pages/frameworks/information-security/Iso27001";
import Iso9001 from "./pages/frameworks/information-security/Iso9001";
import Dora from "./pages/frameworks/information-security/Dora";

// Plans, Partners, etc.
import Plans from "./pages/Plans";
import Partners from "./pages/Partners";
import SuccessStories from "./pages/SuccessStories";
import About from "./pages/About";
import Contact from "./pages/Contact";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-grow pt-16">
            <Routes>
              <Route path="/" element={<Index />} />
              
              {/* Product routes */}
              <Route path="/product" element={<Features />} />
              <Route path="/product/overview" element={<ProductOverview />} />
              <Route path="/product/features" element={<Features />} />
              <Route path="/product/ai-compliance-officer" element={<Features />} />
              <Route path="/product/task-data-management" element={<Features />} />
              <Route path="/product/documents-management" element={<Features />} />
              <Route path="/product/value-chain" element={<Features />} />
              <Route path="/product/risk-assessment" element={<Features />} />
              <Route path="/product/analytics-dashboards" element={<Features />} />
              <Route path="/product/api-integrations" element={<Features />} />
              
              {/* By Roles routes - all pointing to ByRoles component */}
              <Route path="/by-roles" element={<ByRoles />} />
              <Route path="/by-roles/managers" element={<ByRoles />} />
              <Route path="/by-roles/contributors" element={<ByRoles />} />
              <Route path="/by-roles/auditor" element={<ByRoles />} />
              
              {/* Frameworks routes */}
              <Route path="/frameworks" element={<Frameworks />} />
              <Route path="/frameworks/cybersecurity" element={<Cybersecurity />} />
              <Route path="/frameworks/information-security" element={<InformationSecurity />} />
              <Route path="/frameworks/data-security" element={<DataSecurity />} />
              <Route path="/frameworks/esg" element={<Esg />} />
              <Route path="/frameworks/environmental" element={<Environmental />} />
              <Route path="/frameworks/governance" element={<Governance />} />
              <Route path="/frameworks/product-level" element={<ProductLevel />} />
              
              {/* Cybersecurity Framework specific routes */}
              <Route path="/frameworks/cybersecurity/soc" element={<Soc />} />
              <Route path="/frameworks/cybersecurity/nis-ii" element={<NisII />} />
              <Route path="/frameworks/cybersecurity/nist" element={<Nist />} />
              
              {/* Information Security Framework specific routes */}
              <Route path="/frameworks/information-security/iso-27001" element={<Iso27001 />} />
              <Route path="/frameworks/information-security/iso-9001" element={<Iso9001 />} />
              <Route path="/frameworks/information-security/dora" element={<Dora />} />
              
              {/* Other main routes */}
              <Route path="/plans" element={<Plans />} />
              <Route path="/partners" element={<Partners />} />
              <Route path="/success-stories" element={<SuccessStories />} />
              
              {/* About routes */}
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              
              {/* Catch-all route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

