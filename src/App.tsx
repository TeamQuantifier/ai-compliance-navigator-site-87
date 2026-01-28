import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import { LanguageProvider } from "./contexts/LanguageContext";
import { AuthProvider } from "./contexts/AuthContext";
import { CookieConsentProvider } from "./contexts/CookieConsentContext";
import { RedirectToPreferredLocale } from "./components/RedirectToPreferredLocale";
import { Navbar } from "./components/Navbar";
import Footer from "./components/Footer";
import { CookieConsentBanner } from "./components/cookies/CookieConsentBanner";
import { CookiePreferencesModal } from "./components/cookies/CookiePreferencesModal";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

// Product pages
import ProductOverview from "./pages/product/ProductOverview";
import Features from "./pages/product/Features";

// By Roles
import ByRoles from "./pages/roles/ByRoles";

// Frameworks
import Frameworks from "./pages/frameworks/Frameworks";
import Esg from "./pages/frameworks/Esg";
import Environmental from "./pages/frameworks/Environmental";
import Governance from "./pages/frameworks/Governance";
import ProductLevel from "./pages/frameworks/ProductLevel";

// Framework specific pages (flattened structure)
import Soc from "./pages/frameworks/cybersecurity/Soc";
import NisII from "./pages/frameworks/cybersecurity/NisII";

import Iso27001 from "./pages/frameworks/information-security/Iso27001";
import Iso9001 from "./pages/frameworks/information-security/Iso9001";
import Dora from "./pages/frameworks/information-security/Dora";
import Gdpr from "./pages/frameworks/data-security/Gdpr";
import Hipaa from "./pages/frameworks/data-security/Hipaa";
import Ccpa from "./pages/frameworks/data-security/Ccpa";

// Plans, Partners, etc.
import Plans from "./pages/Plans";
import Partners from "./pages/Partners";
import SuccessStories from "./pages/SuccessStories";

import Contact from "./pages/Contact";

// Blog pages
import BlogList from "./pages/blog/BlogList";
import BlogPost from "./pages/blog/BlogPost";
import StoryDetail from "./pages/blog/StoryDetail";

// SEO Landing pages
import GrcPlatform from "./pages/seo-landing/GrcPlatform";

// Legal pages
import CookiesPolicy from "./pages/legal/CookiesPolicy";
import PrivacyPolicy from "./pages/legal/PrivacyPolicy";
import TermsOfService from "./pages/legal/TermsOfService";

// Admin pages
import Login from "./pages/admin/Login";
import { ProtectedRoute } from "./components/admin/ProtectedRoute";
import { AdminLayout } from "./components/admin/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import PostsList from "./pages/admin/PostsList";
import PostEditor from "./pages/admin/PostEditor";
import StoriesList from "./pages/admin/StoriesList";
import StoryEditor from "./pages/admin/StoryEditor";
import SeoAudit from "./pages/admin/SeoAudit";
import SeoSettings from "./pages/admin/SeoSettings";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <HelmetProvider>
      <TooltipProvider>
        <BrowserRouter>
          <AuthProvider>
            <LanguageProvider>
              <CookieConsentProvider>
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
              
                  {/* Frameworks main page */}
                  <Route path="/:locale/frameworks" element={<Frameworks />} />
                  
                  {/* Flattened framework routes - direct access */}
                  <Route path="/:locale/frameworks/soc" element={<Soc />} />
                  <Route path="/:locale/frameworks/nis-ii" element={<NisII />} />
                  
                  <Route path="/:locale/frameworks/iso-27001" element={<Iso27001 />} />
                  <Route path="/:locale/frameworks/iso-9001" element={<Iso9001 />} />
                  <Route path="/:locale/frameworks/dora" element={<Dora />} />
                  <Route path="/:locale/frameworks/gdpr" element={<Gdpr />} />
                  <Route path="/:locale/frameworks/hipaa" element={<Hipaa />} />
                  <Route path="/:locale/frameworks/ccpa" element={<Ccpa />} />
                  
                  {/* Category pages - still needed for ESG, Environmental, Governance, Product Level */}
                  <Route path="/:locale/frameworks/esg" element={<Esg />} />
                  <Route path="/:locale/frameworks/environmental" element={<Environmental />} />
                  <Route path="/:locale/frameworks/governance" element={<Governance />} />
                  <Route path="/:locale/frameworks/product-level" element={<ProductLevel />} />
                  
                  {/* Redirects from old nested URLs to new flattened URLs */}
                  <Route path="/:locale/frameworks/cybersecurity" element={<Navigate to="../frameworks" replace />} />
                  <Route path="/:locale/frameworks/information-security" element={<Navigate to="../frameworks" replace />} />
                  <Route path="/:locale/frameworks/data-security" element={<Navigate to="../frameworks" replace />} />
                  <Route path="/:locale/frameworks/cybersecurity/soc" element={<Navigate to="../../soc" replace />} />
                  <Route path="/:locale/frameworks/cybersecurity/nis-ii" element={<Navigate to="../../nis-ii" replace />} />
                  
                  <Route path="/:locale/frameworks/information-security/iso-27001" element={<Navigate to="../../iso-27001" replace />} />
                  <Route path="/:locale/frameworks/information-security/iso-9001" element={<Navigate to="../../iso-9001" replace />} />
                  <Route path="/:locale/frameworks/information-security/dora" element={<Navigate to="../../dora" replace />} />
                  <Route path="/:locale/frameworks/data-security/gdpr" element={<Navigate to="../../gdpr" replace />} />
                  <Route path="/:locale/frameworks/data-security/hipaa" element={<Navigate to="../../hipaa" replace />} />
                  <Route path="/:locale/frameworks/data-security/ccpa" element={<Navigate to="../../ccpa" replace />} />
              
                  {/* SEO Landing Pages - Redirects to framework pages */}
                  <Route path="/:locale/soc2-automation" element={<Navigate to="frameworks/soc" replace />} />
                  <Route path="/:locale/iso27001" element={<Navigate to="frameworks/iso-27001" replace />} />
                  <Route path="/:locale/gdpr-compliance" element={<Navigate to="frameworks/gdpr" replace />} />
                  <Route path="/:locale/nis2" element={<Navigate to="frameworks/nis-ii" replace />} />
                  <Route path="/:locale/grc-platform" element={<GrcPlatform />} />

                  {/* Blog routes */}
                  <Route path="/:locale/blog" element={<BlogList />} />
                  <Route path="/:locale/blog/:slug" element={<BlogPost />} />
                  
                  {/* Other main routes */}
                  <Route path="/:locale/plans" element={<Plans />} />
                  <Route path="/:locale/partners" element={<Partners />} />
                  <Route path="/:locale/success-stories" element={<SuccessStories />} />
                  <Route path="/:locale/success-stories/:slug" element={<StoryDetail />} />
                  
                  <Route path="/:locale/contact" element={<Contact />} />
                  
                  {/* Legal routes */}
                  <Route path="/:locale/legal/privacy" element={<PrivacyPolicy />} />
                  <Route path="/:locale/legal/terms" element={<TermsOfService />} />
                  <Route path="/:locale/legal/cookies" element={<CookiesPolicy />} />
                  
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
                    <Route path="seo-audit" element={<SeoAudit />} />
                    <Route path="seo-settings" element={<SeoSettings />} />
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
              <CookieConsentBanner />
              <CookiePreferencesModal />
              </CookieConsentProvider>
            </LanguageProvider>
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </HelmetProvider>
  </QueryClientProvider>
);

export default App;
