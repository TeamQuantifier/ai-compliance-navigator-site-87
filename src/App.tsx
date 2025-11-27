
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import { LanguageProvider } from "./contexts/LanguageContext";
import { AuthProvider } from "./contexts/AuthContext";
import { RedirectToPreferredLocale } from "./components/RedirectToPreferredLocale";
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

import Contact from "./pages/Contact";

// Blog pages
import BlogList from "./pages/blog/BlogList";
import BlogPost from "./pages/blog/BlogPost";
import StoryDetail from "./pages/blog/StoryDetail";

// Admin pages
import Login from "./pages/admin/Login";
import { ProtectedRoute } from "./components/admin/ProtectedRoute";
import { AdminLayout } from "./components/admin/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import PostsList from "./pages/admin/PostsList";
import PostEditor from "./pages/admin/PostEditor";
import StoriesList from "./pages/admin/StoriesList";
import StoryEditor from "./pages/admin/StoryEditor";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <HelmetProvider>
      <TooltipProvider>
        <BrowserRouter>
          <AuthProvider>
            <LanguageProvider>
              <Toaster />
              <Sonner />
              <div className="min-h-screen flex flex-col">
                <Navbar />
                <main className="flex-grow pt-16">
                  <Routes>
                  {/* Redirect root to preferred locale */}
                  <Route path="/" element={<RedirectToPreferredLocale />} />
                  
                  {/* Locale-based routes */}
                  <Route path="/:locale" element={<Index />} />
              
                  {/* Product routes */}
                  <Route path="/:locale/product" element={<Features />} />
                  <Route path="/:locale/product/overview" element={<ProductOverview />} />
                  <Route path="/:locale/product/features" element={<Features />} />
                  <Route path="/:locale/product/ai-compliance-officer" element={<Features />} />
                  <Route path="/:locale/product/task-data-management" element={<Features />} />
                  <Route path="/:locale/product/documents-management" element={<Features />} />
                  <Route path="/:locale/product/value-chain" element={<Features />} />
                  <Route path="/:locale/product/risk-assessment" element={<Features />} />
                  <Route path="/:locale/product/analytics-dashboards" element={<Features />} />
                  <Route path="/:locale/product/api-integrations" element={<Features />} />
              
                  {/* By Roles routes - all pointing to ByRoles component */}
                  <Route path="/:locale/by-roles" element={<ByRoles />} />
                  <Route path="/:locale/by-roles/managers" element={<ByRoles />} />
                  <Route path="/:locale/by-roles/contributors" element={<ByRoles />} />
                  <Route path="/:locale/by-roles/auditor" element={<ByRoles />} />
              
                  {/* Frameworks routes */}
                  <Route path="/:locale/frameworks" element={<Frameworks />} />
                  <Route path="/:locale/frameworks/cybersecurity" element={<Cybersecurity />} />
                  <Route path="/:locale/frameworks/information-security" element={<InformationSecurity />} />
                  <Route path="/:locale/frameworks/data-security" element={<DataSecurity />} />
                  <Route path="/:locale/frameworks/esg" element={<Esg />} />
                  <Route path="/:locale/frameworks/environmental" element={<Environmental />} />
                  <Route path="/:locale/frameworks/governance" element={<Governance />} />
                  <Route path="/:locale/frameworks/product-level" element={<ProductLevel />} />
                  
                  {/* Cybersecurity Framework specific routes */}
                  <Route path="/:locale/frameworks/cybersecurity/soc" element={<Soc />} />
                  <Route path="/:locale/frameworks/cybersecurity/nis-ii" element={<NisII />} />
                  <Route path="/:locale/frameworks/cybersecurity/nist" element={<Nist />} />
                  
                  {/* Information Security Framework specific routes */}
                  <Route path="/:locale/frameworks/information-security/iso-27001" element={<Iso27001 />} />
                  <Route path="/:locale/frameworks/information-security/iso-9001" element={<Iso9001 />} />
                  <Route path="/:locale/frameworks/information-security/dora" element={<Dora />} />
              
                  {/* Blog routes */}
                  <Route path="/:locale/blog" element={<BlogList />} />
                  <Route path="/:locale/blog/:slug" element={<BlogPost />} />
                  
                  {/* Other main routes */}
                  <Route path="/:locale/plans" element={<Plans />} />
                  <Route path="/:locale/partners" element={<Partners />} />
                  <Route path="/:locale/success-stories" element={<SuccessStories />} />
                  <Route path="/:locale/success-stories/:slug" element={<StoryDetail />} />
                  
                  <Route path="/:locale/contact" element={<Contact />} />
                  
                  {/* Admin routes */}
                  <Route path="/admin/login" element={<Login />} />
                  <Route path="/admin" element={
                    <ProtectedRoute>
                      <AdminLayout />
                    </ProtectedRoute>
                  }>
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="posts" element={<PostsList />} />
                    <Route path="posts/new" element={<PostEditor />} />
                    <Route path="posts/:id" element={<PostEditor />} />
                    <Route path="stories" element={<StoriesList />} />
                    <Route path="stories/:id" element={<StoryEditor />} />
                    <Route path="categories" element={<div className="p-6"><h1 className="text-3xl font-bold">Categories (Coming Soon)</h1></div>} />
                    <Route path="authors" element={<div className="p-6"><h1 className="text-3xl font-bold">Authors (Coming Soon)</h1></div>} />
                    <Route path="redirects" element={<div className="p-6"><h1 className="text-3xl font-bold">Redirects (Coming Soon)</h1></div>} />
                    <Route path="settings" element={<div className="p-6"><h1 className="text-3xl font-bold">Settings (Coming Soon)</h1></div>} />
                  </Route>
                  
                  {/* Catch-all route */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
              <Footer />
            </div>
          </LanguageProvider>
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </HelmetProvider>
  </QueryClientProvider>
);

export default App;

