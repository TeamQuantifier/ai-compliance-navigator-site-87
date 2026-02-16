import { Helmet } from "react-helmet-async";
import PageTemplate from "@/components/PageTemplate";
import DefinitionsBlock from "@/components/seo/DefinitionsBlock";
import {
  Shield,
  CheckCircle,
  ArrowRight,
  FileCheck,
  Lock,
  BarChart4,
  AlertTriangle,
  FileText,
  Clock,
  Users,
  Briefcase,
  Scale,
  Activity,
  Eye,
  Target,
  Sparkles,
  DollarSign,
  Building2,
  UserCheck,
  Heart,
  Database,
  Key,
  Bell,
  FileSearch,
  ClipboardCheck,
  BookOpen,
  Stethoscope,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { useLanguage } from "@/contexts/LanguageContext";
import { Link } from "react-router-dom";
import FAQSection from "@/components/seo/FAQSection";

const Hipaa = () => {
  const { t, currentLocale } = useLanguage();

  // Helper function for array translations
  const getArrayTranslation = (key: string): string[] => {
    const result = t(key, { returnObjects: true });
    return Array.isArray(result) ? result : [];
  };

  // Helper function for object array translations
  const getObjectArrayTranslation = <T,>(key: string): T[] => {
    const result = t(key, { returnObjects: true });
    return Array.isArray(result) ? result : [];
  };

  // FAQ items
  const faqItems = getObjectArrayTranslation<{ question: string; answer: string }>(
    "hipaaPage.faq.items"
  );

  // HIPAA rules
  const hipaaRules = getArrayTranslation("hipaaPage.understanding.keyRules.items");

  const softwareAppSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Quantifier.ai",
    "applicationCategory": "BusinessApplication",
    "applicationSubCategory": "Governance, Risk and Compliance (GRC)",
    "operatingSystem": "Web Browser",
    "url": "https://quantifier.ai",
    "description": t("hipaaPage.seo.description"),
    "featureList": ["HIPAA Compliance Automation", "PHI Protection", "Access Controls", "Audit Trails", "Breach Detection", "Training Management"],
    "offers": { "@type": "Offer", "url": `https://quantifier.ai/${currentLocale}/plans`, "priceCurrency": "USD", "availability": "https://schema.org/OnlineOnly" },
    "provider": { "@type": "Organization", "name": "Quantifier.ai", "url": "https://quantifier.ai" }
  };

  return (
    <PageTemplate
      title={t("hipaaPage.seo.title")}
      description={t("hipaaPage.seo.description")}
    >
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(softwareAppSchema)}</script>
      </Helmet>
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <section className="mb-16">
          <div className="bg-gradient-to-r from-brand-blue-dark via-brand-blue to-brand-purple rounded-2xl p-8 md:p-12 text-white">
            <div className="flex flex-col lg:flex-row items-center gap-10">
              <div className="lg:w-1/2">
                <Badge className="bg-white/20 text-white border-white/30 mb-4">
                  {t("hipaaPage.hero.badge")}
                </Badge>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                  {t("hipaaPage.hero.title")}
                </h1>
                <p className="text-lg md:text-xl opacity-90 mb-6">
                  {t("hipaaPage.hero.subtitle")}
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button
                    asChild
                    size="lg"
                    className="bg-white text-brand-blue-dark hover:bg-white/90 font-semibold"
                  >
                    <Link to={`/${currentLocale}/contact`}>
                      {t("hipaaPage.hero.button")} <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                </div>
              </div>
              <div className="lg:w-1/2">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                  <h3 className="text-xl font-semibold mb-4">
                    {t("hipaaPage.hero.formTitle")}
                  </h3>
                  <form className="space-y-4">
                    <Input
                      placeholder={t("hipaaPage.hero.nameLabel")}
                      className="bg-white/10 border-white/30 text-white placeholder:text-white/60"
                    />
                    <Input
                      type="email"
                      placeholder={t("hipaaPage.hero.emailLabel")}
                      className="bg-white/10 border-white/30 text-white placeholder:text-white/60"
                    />
                    <div className="flex items-center space-x-2">
                      <Checkbox id="marketing" className="border-white/50" />
                      <label htmlFor="marketing" className="text-sm opacity-80">
                        {t("hipaaPage.hero.marketingConsent")}
                      </label>
                    </div>
                    <Button className="w-full bg-white text-brand-blue-dark hover:bg-white/90">
                      {t("hipaaPage.hero.requestDemoButton")}
                    </Button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why HIPAA Is Critical Section */}
        <section className="mb-16">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-brand-blue-dark mb-4">
              {t("hipaaPage.whyCritical.title")}
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              {t("hipaaPage.whyCritical.subtitle")}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="border-brand-gray-light bg-white text-center p-6">
              <CardContent className="pt-4">
                <div className="mx-auto w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mb-4">
                  <DollarSign className="h-8 w-8 text-red-600" />
                </div>
                <div className="text-4xl font-bold text-brand-blue-dark mb-2">
                  {t("hipaaPage.whyCritical.cards.fines.stat")}
                </div>
                <h3 className="font-semibold text-lg mb-2">
                  {t("hipaaPage.whyCritical.cards.fines.title")}
                </h3>
                <p className="text-slate-600">
                  {t("hipaaPage.whyCritical.cards.fines.description")}
                </p>
              </CardContent>
            </Card>
            <Card className="border-brand-gray-light bg-white text-center p-6">
              <CardContent className="pt-4">
                <div className="mx-auto w-16 h-16 rounded-full bg-brand-purple/10 flex items-center justify-center mb-4">
                  <FileText className="h-8 w-8 text-brand-purple" />
                </div>
                <div className="text-4xl font-bold text-brand-blue-dark mb-2">
                  {t("hipaaPage.whyCritical.cards.complexity.stat")}
                </div>
                <h3 className="font-semibold text-lg mb-2">
                  {t("hipaaPage.whyCritical.cards.complexity.title")}
                </h3>
                <p className="text-slate-600">
                  {t("hipaaPage.whyCritical.cards.complexity.description")}
                </p>
              </CardContent>
            </Card>
            <Card className="border-brand-gray-light bg-white text-center p-6">
              <CardContent className="pt-4">
                <div className="mx-auto w-16 h-16 rounded-full bg-brand-blue/10 flex items-center justify-center mb-4">
                  <Heart className="h-8 w-8 text-brand-blue" />
                </div>
                <div className="text-4xl font-bold text-brand-blue-dark mb-2">
                  {t("hipaaPage.whyCritical.cards.scope.stat")}
                </div>
                <h3 className="font-semibold text-lg mb-2">
                  {t("hipaaPage.whyCritical.cards.scope.title")}
                </h3>
                <p className="text-slate-600">
                  {t("hipaaPage.whyCritical.cards.scope.description")}
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Understanding HIPAA Section */}
        <section className="mb-16">
          <div className="bg-brand-gray-light/30 p-8 rounded-2xl">
            <h2 className="text-3xl font-bold text-center text-brand-blue-dark mb-4">
              {t("hipaaPage.understanding.title")}
            </h2>
            <p className="text-lg text-slate-600 text-center max-w-3xl mx-auto mb-10">
              {t("hipaaPage.understanding.description")}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="border-brand-gray-light bg-white">
                <CardContent className="pt-6">
                  <div className="w-12 h-12 rounded-full bg-brand-blue/10 flex items-center justify-center mb-4">
                    <Shield className="h-6 w-6 text-brand-blue" />
                  </div>
                  <h3 className="font-semibold text-lg mb-3 text-brand-blue-dark">
                    {t("hipaaPage.understanding.whatIs.title")}
                  </h3>
                  <p className="text-slate-600">
                    {t("hipaaPage.understanding.whatIs.description")}
                  </p>
                </CardContent>
              </Card>
              <Card className="border-brand-gray-light bg-white">
                <CardContent className="pt-6">
                  <div className="w-12 h-12 rounded-full bg-brand-purple/10 flex items-center justify-center mb-4">
                    <Stethoscope className="h-6 w-6 text-brand-purple" />
                  </div>
                  <h3 className="font-semibold text-lg mb-3 text-brand-blue-dark">
                    {t("hipaaPage.understanding.whoItApplies.title")}
                  </h3>
                  <p className="text-slate-600">
                    {t("hipaaPage.understanding.whoItApplies.description")}
                  </p>
                </CardContent>
              </Card>
              <Card className="border-brand-gray-light bg-white">
                <CardContent className="pt-6">
                  <div className="w-12 h-12 rounded-full bg-brand-mint flex items-center justify-center mb-4">
                    <FileCheck className="h-6 w-6 text-brand-blue-dark" />
                  </div>
                  <h3 className="font-semibold text-lg mb-3 text-brand-blue-dark">
                    {t("hipaaPage.understanding.keyRules.title")}
                  </h3>
                  <ul className="text-slate-600 space-y-1 text-sm">
                    {hipaaRules.map((rule, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-brand-purple mt-0.5 flex-shrink-0" />
                        <span>{rule}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Why HIPAA Matters for Leadership */}
        <section className="mb-16">
          <div className="bg-gradient-to-r from-brand-blue-dark to-brand-purple rounded-2xl p-8 md:p-12 text-white">
            <Badge className="bg-white/20 text-white border-white/30 mb-4">
              {t("hipaaPage.whyLeadership.badge")}
            </Badge>
            <h2 className="text-3xl font-bold mb-4">
              {t("hipaaPage.whyLeadership.title")}
            </h2>
            <p className="text-lg opacity-90 mb-8 max-w-3xl">
              {t("hipaaPage.whyLeadership.description")}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                  <AlertTriangle className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">
                    {t("hipaaPage.whyLeadership.points.criminal.title")}
                  </h3>
                  <p className="opacity-80">
                    {t("hipaaPage.whyLeadership.points.criminal.description")}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                  <Users className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">
                    {t("hipaaPage.whyLeadership.points.trust.title")}
                  </h3>
                  <p className="opacity-80">
                    {t("hipaaPage.whyLeadership.points.trust.description")}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                  <Target className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">
                    {t("hipaaPage.whyLeadership.points.reputation.title")}
                  </h3>
                  <p className="opacity-80">
                    {t("hipaaPage.whyLeadership.points.reputation.description")}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                  <DollarSign className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">
                    {t("hipaaPage.whyLeadership.points.fines.title")}
                  </h3>
                  <p className="opacity-80">
                    {t("hipaaPage.whyLeadership.points.fines.description")}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How Quantifier Helps Section */}
        <section className="mb-16">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-brand-blue-dark mb-4">
              {t("hipaaPage.howQuantifierHelps.title")}
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              {t("hipaaPage.howQuantifierHelps.description")}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="border-brand-gray-light bg-white hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="w-12 h-12 rounded-full bg-brand-blue/10 flex items-center justify-center mb-4">
                  <Lock className="h-6 w-6 text-brand-blue" />
                </div>
                <h3 className="font-semibold text-lg mb-2 text-brand-blue-dark">
                  {t("hipaaPage.howQuantifierHelps.features.phiProtection.title")}
                </h3>
                <p className="text-slate-600">
                  {t("hipaaPage.howQuantifierHelps.features.phiProtection.description")}
                </p>
              </CardContent>
            </Card>
            <Card className="border-brand-gray-light bg-white hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="w-12 h-12 rounded-full bg-brand-purple/10 flex items-center justify-center mb-4">
                  <Key className="h-6 w-6 text-brand-purple" />
                </div>
                <h3 className="font-semibold text-lg mb-2 text-brand-blue-dark">
                  {t("hipaaPage.howQuantifierHelps.features.accessControls.title")}
                </h3>
                <p className="text-slate-600">
                  {t("hipaaPage.howQuantifierHelps.features.accessControls.description")}
                </p>
              </CardContent>
            </Card>
            <Card className="border-brand-gray-light bg-white hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="w-12 h-12 rounded-full bg-brand-mint flex items-center justify-center mb-4">
                  <FileSearch className="h-6 w-6 text-brand-blue-dark" />
                </div>
                <h3 className="font-semibold text-lg mb-2 text-brand-blue-dark">
                  {t("hipaaPage.howQuantifierHelps.features.auditTrails.title")}
                </h3>
                <p className="text-slate-600">
                  {t("hipaaPage.howQuantifierHelps.features.auditTrails.description")}
                </p>
              </CardContent>
            </Card>
            <Card className="border-brand-gray-light bg-white hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="w-12 h-12 rounded-full bg-brand-blue/10 flex items-center justify-center mb-4">
                  <Bell className="h-6 w-6 text-brand-blue" />
                </div>
                <h3 className="font-semibold text-lg mb-2 text-brand-blue-dark">
                  {t("hipaaPage.howQuantifierHelps.features.breachDetection.title")}
                </h3>
                <p className="text-slate-600">
                  {t("hipaaPage.howQuantifierHelps.features.breachDetection.description")}
                </p>
              </CardContent>
            </Card>
            <Card className="border-brand-gray-light bg-white hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="w-12 h-12 rounded-full bg-brand-purple/10 flex items-center justify-center mb-4">
                  <BookOpen className="h-6 w-6 text-brand-purple" />
                </div>
                <h3 className="font-semibold text-lg mb-2 text-brand-blue-dark">
                  {t("hipaaPage.howQuantifierHelps.features.trainingManagement.title")}
                </h3>
                <p className="text-slate-600">
                  {t("hipaaPage.howQuantifierHelps.features.trainingManagement.description")}
                </p>
              </CardContent>
            </Card>
            <Card className="border-brand-gray-light bg-white hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="w-12 h-12 rounded-full bg-brand-mint flex items-center justify-center mb-4">
                  <ClipboardCheck className="h-6 w-6 text-brand-blue-dark" />
                </div>
                <h3 className="font-semibold text-lg mb-2 text-brand-blue-dark">
                  {t("hipaaPage.howQuantifierHelps.features.complianceReporting.title")}
                </h3>
                <p className="text-slate-600">
                  {t("hipaaPage.howQuantifierHelps.features.complianceReporting.description")}
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* AI Module Section */}
        <section className="mb-16">
          <div className="bg-brand-gray-light/30 p-8 rounded-2xl">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="md:w-1/3 flex justify-center">
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-brand-blue to-brand-purple flex items-center justify-center">
                  <Sparkles className="h-16 w-16 text-white" />
                </div>
              </div>
              <div className="md:w-2/3">
                <Badge className="bg-brand-purple/10 text-brand-purple border-brand-purple/30 mb-4">
                  {t("hipaaPage.aiModule.badge")}
                </Badge>
                <h2 className="text-3xl font-bold text-brand-blue-dark mb-4">
                  {t("hipaaPage.aiModule.title")}
                </h2>
                <p className="text-lg text-slate-600">
                  {t("hipaaPage.aiModule.description")}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Results Section */}
        <section className="mb-16">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-brand-blue-dark mb-4">
              {t("hipaaPage.results.title")}
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              {t("hipaaPage.results.description")}
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <Card className="border-brand-gray-light bg-white text-center p-6">
              <CardContent className="pt-4">
                <div className="text-4xl font-bold text-brand-purple mb-2">
                  {t("hipaaPage.results.metrics.coverage.value")}
                </div>
                <p className="text-slate-600 text-sm">
                  {t("hipaaPage.results.metrics.coverage.label")}
                </p>
              </CardContent>
            </Card>
            <Card className="border-brand-gray-light bg-white text-center p-6">
              <CardContent className="pt-4">
                <div className="text-4xl font-bold text-brand-blue mb-2">
                  {t("hipaaPage.results.metrics.breach.value")}
                </div>
                <p className="text-slate-600 text-sm">
                  {t("hipaaPage.results.metrics.breach.label")}
                </p>
              </CardContent>
            </Card>
            <Card className="border-brand-gray-light bg-white text-center p-6">
              <CardContent className="pt-4">
                <div className="text-4xl font-bold text-brand-blue-dark mb-2">
                  {t("hipaaPage.results.metrics.monitoring.value")}
                </div>
                <p className="text-slate-600 text-sm">
                  {t("hipaaPage.results.metrics.monitoring.label")}
                </p>
              </CardContent>
            </Card>
            <Card className="border-brand-gray-light bg-white text-center p-6">
              <CardContent className="pt-4">
                <div className="text-4xl font-bold text-brand-purple mb-2">
                  {t("hipaaPage.results.metrics.reduction.value")}
                </div>
                <p className="text-slate-600 text-sm">
                  {t("hipaaPage.results.metrics.reduction.label")}
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* For Whom Section */}
        <section className="mb-16">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-brand-blue-dark mb-4">
              {t("hipaaPage.forWhom.title")}
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              {t("hipaaPage.forWhom.subtitle")}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="border-brand-gray-light bg-white hover:shadow-lg transition-shadow">
              <CardContent className="pt-6 text-center">
                <div className="mx-auto w-16 h-16 rounded-full bg-brand-blue/10 flex items-center justify-center mb-4">
                  <Shield className="h-8 w-8 text-brand-blue" />
                </div>
                <h3 className="font-semibold text-lg mb-2 text-brand-blue-dark">
                  {t("hipaaPage.forWhom.personas.privacyOfficer.title")}
                </h3>
                <p className="text-slate-600 text-sm">
                  {t("hipaaPage.forWhom.personas.privacyOfficer.description")}
                </p>
              </CardContent>
            </Card>
            <Card className="border-brand-gray-light bg-white hover:shadow-lg transition-shadow">
              <CardContent className="pt-6 text-center">
                <div className="mx-auto w-16 h-16 rounded-full bg-brand-purple/10 flex items-center justify-center mb-4">
                  <Lock className="h-8 w-8 text-brand-purple" />
                </div>
                <h3 className="font-semibold text-lg mb-2 text-brand-blue-dark">
                  {t("hipaaPage.forWhom.personas.ciso.title")}
                </h3>
                <p className="text-slate-600 text-sm">
                  {t("hipaaPage.forWhom.personas.ciso.description")}
                </p>
              </CardContent>
            </Card>
            <Card className="border-brand-gray-light bg-white hover:shadow-lg transition-shadow">
              <CardContent className="pt-6 text-center">
                <div className="mx-auto w-16 h-16 rounded-full bg-brand-mint flex items-center justify-center mb-4">
                  <Stethoscope className="h-8 w-8 text-brand-blue-dark" />
                </div>
                <h3 className="font-semibold text-lg mb-2 text-brand-blue-dark">
                  {t("hipaaPage.forWhom.personas.healthcareAdmin.title")}
                </h3>
                <p className="text-slate-600 text-sm">
                  {t("hipaaPage.forWhom.personas.healthcareAdmin.description")}
                </p>
              </CardContent>
            </Card>
            <Card className="border-brand-gray-light bg-white hover:shadow-lg transition-shadow">
              <CardContent className="pt-6 text-center">
                <div className="mx-auto w-16 h-16 rounded-full bg-brand-blue/10 flex items-center justify-center mb-4">
                  <ClipboardCheck className="h-8 w-8 text-brand-blue" />
                </div>
                <h3 className="font-semibold text-lg mb-2 text-brand-blue-dark">
                  {t("hipaaPage.forWhom.personas.complianceDirector.title")}
                </h3>
                <p className="text-slate-600 text-sm">
                  {t("hipaaPage.forWhom.personas.complianceDirector.description")}
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Continuous Compliance Section */}
        <section className="mb-16">
          <div className="bg-brand-gray-light/30 p-8 rounded-2xl">
            <div className="flex flex-col lg:flex-row gap-10">
              <div className="lg:w-1/2">
                <Badge className="bg-brand-purple/10 text-brand-purple border-brand-purple/30 mb-4">
                  {t("hipaaPage.continuousCompliance.statusBadge")}
                </Badge>
                <h2 className="text-3xl font-bold text-brand-blue-dark mb-4">
                  {t("hipaaPage.continuousCompliance.title")}
                </h2>
                <p className="text-lg text-slate-600 mb-6">
                  {t("hipaaPage.continuousCompliance.description")}
                </p>
                <form className="space-y-4 max-w-md">
                  <Input
                    placeholder={t("hipaaPage.continuousCompliance.form.nameLabel")}
                    className="bg-white border-brand-gray-light"
                  />
                  <Input
                    type="email"
                    placeholder={t("hipaaPage.continuousCompliance.form.emailLabel")}
                    className="bg-white border-brand-gray-light"
                  />
                  <Button className="w-full bg-brand-purple hover:bg-brand-purple/90 text-white">
                    {t("hipaaPage.continuousCompliance.form.button")}
                  </Button>
                </form>
              </div>
              <div className="lg:w-1/2 grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="border-brand-gray-light bg-white">
                  <CardContent className="pt-6">
                    <Activity className="h-8 w-8 text-brand-blue mb-3" />
                    <h3 className="font-semibold mb-2 text-brand-blue-dark">
                      {t("hipaaPage.continuousCompliance.features.monitoring.title")}
                    </h3>
                    <p className="text-slate-600 text-sm">
                      {t("hipaaPage.continuousCompliance.features.monitoring.description")}
                    </p>
                  </CardContent>
                </Card>
                <Card className="border-brand-gray-light bg-white">
                  <CardContent className="pt-6">
                    <Lock className="h-8 w-8 text-brand-purple mb-3" />
                    <h3 className="font-semibold mb-2 text-brand-blue-dark">
                      {t("hipaaPage.continuousCompliance.features.accessControl.title")}
                    </h3>
                    <p className="text-slate-600 text-sm">
                      {t("hipaaPage.continuousCompliance.features.accessControl.description")}
                    </p>
                  </CardContent>
                </Card>
                <Card className="border-brand-gray-light bg-white">
                  <CardContent className="pt-6">
                    <FileSearch className="h-8 w-8 text-brand-blue-dark mb-3" />
                    <h3 className="font-semibold mb-2 text-brand-blue-dark">
                      {t("hipaaPage.continuousCompliance.features.riskAssessment.title")}
                    </h3>
                    <p className="text-slate-600 text-sm">
                      {t("hipaaPage.continuousCompliance.features.riskAssessment.description")}
                    </p>
                  </CardContent>
                </Card>
                <Card className="border-brand-gray-light bg-white">
                  <CardContent className="pt-6">
                    <Bell className="h-8 w-8 text-red-600 mb-3" />
                    <h3 className="font-semibold mb-2 text-brand-blue-dark">
                      {t("hipaaPage.continuousCompliance.features.incidentResponse.title")}
                    </h3>
                    <p className="text-slate-600 text-sm">
                      {t("hipaaPage.continuousCompliance.features.incidentResponse.description")}
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Key Definitions */}
        <DefinitionsBlock
          title="Key HIPAA Terms & Definitions"
          definitions={[
            { term: "HIPAA (Health Insurance Portability and Accountability Act)", definition: "A US federal law that establishes national standards for protecting sensitive patient health information (PHI) from being disclosed without the patient's consent or knowledge." },
            { term: "Protected Health Information (PHI)", definition: "Any individually identifiable health information held or transmitted by a covered entity or business associate, including demographic data, medical records, insurance information, and any data that can identify a patient." },
            { term: "Business Associate Agreement (BAA)", definition: "A legally required contract between a HIPAA covered entity and a business associate that establishes permitted uses and disclosures of PHI, required safeguards, and breach notification procedures." },
            { term: "Security Rule", definition: "The HIPAA Security Rule establishes administrative, physical, and technical safeguards that covered entities must implement to ensure the confidentiality, integrity, and availability of electronic PHI (ePHI)." }
          ]}
          className="mb-16"
        />

        {/* FAQ Section */}
        <section className="mb-16">
      <FAQSection
        title={t("hipaaPage.faq.title")}
        faqs={faqItems.map((item) => ({
          question: item.question,
          answer: item.answer,
        }))}
        pageUrl={`https://quantifier.ai/${currentLocale}/frameworks/hipaa`}
      />
        </section>

        {/* Final CTA Section */}
        <section className="mb-16">
          <div className="bg-gradient-to-r from-brand-blue-dark to-brand-purple rounded-2xl p-8 md:p-12 text-white text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {t("hipaaPage.finalCta.title")}
            </h2>
            <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
              {t("hipaaPage.finalCta.description")}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button
                asChild
                size="lg"
                className="bg-white text-brand-blue-dark hover:bg-white/90 font-semibold"
              >
                <Link to={`/${currentLocale}/contact`}>
                  {t("hipaaPage.finalCta.bookDemo")} <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white/20 bg-gray-50 text-[#324691] hover:bg-white"
              >
                <Link to={`/${currentLocale}/plans`}>
                  {t("hipaaPage.finalCta.seePricing")}
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </PageTemplate>
  );
};

export default Hipaa;
