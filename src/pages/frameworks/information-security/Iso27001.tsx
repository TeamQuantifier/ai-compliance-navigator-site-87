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
  Euro,
  Building2,
  UserCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { useLanguage } from "@/contexts/LanguageContext";
import { Link } from "react-router-dom";
import FAQSection from "@/components/seo/FAQSection";
import IndustryWhySection from "@/components/frameworks/IndustryWhySection";
import IsmsSchema from "@/components/frameworks/IsmsSchema";
import HomePlatformMockup from "@/components/mockups/HomePlatformMockup";
import leonOfficer from "@/assets/leon-compliance-officer.png";
import {
  Iso27001GapAnalysisMockup,
  Iso27001RiskHeatmapMockup,
  Iso27001PoliciesMockup,
  Iso27001ControlsMockup,
  Iso27001CertificationMockup,
  Iso27001MaintenanceMockup,
} from "@/components/mockups/Iso27001StepMockups";
import { useInView } from "@/hooks/useInView";

const StepMockup = ({ children, label }: { children: React.ReactNode; label: string }) => (
  <div className="rounded-xl border border-slate-700 bg-slate-900 p-3 shadow-xl">
    <div className="flex items-center justify-between mb-2 px-1">
      <div className="flex items-center gap-1.5">
        <span className="h-1.5 w-8 rounded-full bg-slate-600" />
      </div>
      <span className="text-[10px] font-medium text-slate-400 uppercase tracking-wide">{label}</span>
    </div>
    <div className="overflow-hidden rounded-lg max-h-[360px] border border-slate-800">
      {children}
    </div>
  </div>
);

const AnimatedStep = ({ children, index }: { children: React.ReactNode; index: number }) => {
  const { ref, inView } = useInView<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={`relative flex flex-col md:flex-row md:items-center transition-all duration-700 ease-out will-change-transform ${
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
      style={{ transitionDelay: inView ? `${Math.min(index * 80, 400)}ms` : "0ms" }}
    >
      {children}
    </div>
  );
};

const Iso27001 = () => {
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
    "iso27001Page.faq.items"
  );

  // SoftwareApplication JSON-LD
  const softwareAppSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Quantifier.ai",
    "applicationCategory": "BusinessApplication",
    "applicationSubCategory": "Governance, Risk and Compliance (GRC)",
    "operatingSystem": "Web Browser",
    "url": "https://quantifier.ai",
    "description": t("seo.frameworks.informationSecurity.iso27001.description"),
    "featureList": ["ISO 27001 ISMS Automation", "Risk Assessment & Treatment", "Statement of Applicability", "Policy & Document Management", "Internal Audit Management", "Certification Readiness"],
    "offers": { "@type": "Offer", "url": `https://quantifier.ai/${currentLocale}/plans`, "priceCurrency": "USD", "availability": "https://schema.org/OnlineOnly" },
    "provider": { "@type": "Organization", "name": "Quantifier.ai", "url": "https://quantifier.ai" }
  };

  return (
    <PageTemplate
      title={t("seo.frameworks.informationSecurity.iso27001.title")}
      description={t("seo.frameworks.informationSecurity.iso27001.description")}
    >
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(softwareAppSchema)}</script>
      </Helmet>
      <div className="max-w-6xl mx-auto">
        {/* Hero Section — modern, light, with ISMS schema */}
        <section className="mb-16">
          <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 md:p-12">
            {/* Subtle dot grid */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 opacity-[0.35]"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 1px 1px, rgba(56,127,239,0.18) 1px, transparent 0)",
                backgroundSize: "28px 28px",
                maskImage: "radial-gradient(ellipse at center, black 40%, transparent 75%)",
              }}
            />
            {/* Soft accent shapes */}
            <div aria-hidden="true" className="pointer-events-none absolute -top-20 -right-20 h-64 w-64 rounded-full bg-brand-blue/5" />
            <div aria-hidden="true" className="pointer-events-none absolute -bottom-24 -left-16 h-72 w-72 rounded-full bg-brand-purple/5" />

            <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              {/* LEFT: copy */}
              <div className="lg:col-span-6">
                <Badge className="bg-brand-blue/10 text-brand-blue-dark border border-brand-blue/20 mb-5 font-medium">
                  {t("iso27001Page.hero.badge")}
                </Badge>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-5 leading-[1.1] tracking-tight text-brand-blue-dark">
                  {t("iso27001Page.hero.title")}
                </h1>
                <p className="text-base md:text-lg text-slate-600 mb-7 max-w-xl leading-relaxed">
                  {t("iso27001Page.hero.subtitle")}
                </p>

                <div className="flex flex-col sm:flex-row gap-3 mb-7">
                  <Button
                    asChild
                    size="lg"
                    className="bg-brand-blue-dark text-white hover:bg-brand-blue-dark/90 font-semibold shadow-lg shadow-brand-blue/20"
                  >
                    <Link to={`/${currentLocale}/contact`}>
                      {t("iso27001Page.hero.button")} <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                  <Button
                    asChild
                    size="lg"
                    variant="outline"
                    className="border-slate-300 text-brand-blue-dark hover:bg-slate-50 hover:text-brand-blue-dark font-semibold"
                  >
                    <Link to={`/${currentLocale}/cybersecurity-check`}>
                      Sprawdź gotowość ISMS
                    </Link>
                  </Button>
                </div>

                <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-slate-600">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle className="h-4 w-4 text-brand-blue" />
                    <span>93 kontrole Aneksu A</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle className="h-4 w-4 text-brand-blue" />
                    <span>SoA automatycznie</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle className="h-4 w-4 text-brand-blue" />
                    <span>~70% SOC 2 w pakiecie</span>
                  </div>
                </div>
              </div>

              {/* RIGHT: ISMS schema */}
              <div className="lg:col-span-6">
                <IsmsSchema />
              </div>
            </div>
          </div>
        </section>

        {/* Why ISO 27001 matters — interactive industry selector */}
        <IndustryWhySection currentLocale={currentLocale} />

        {/* Understanding ISO 27001 — highlighted */}
        <section className="mb-16">
          <div className="relative overflow-hidden rounded-3xl border-2 border-brand-blue/20 bg-gradient-to-br from-white via-brand-mint/10 to-brand-blue/5 p-8 md:p-12 shadow-xl">
            <div aria-hidden="true" className="pointer-events-none absolute -top-16 -right-16 h-48 w-48 rounded-full bg-brand-blue/10 blur-2xl" />
            <div aria-hidden="true" className="pointer-events-none absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-brand-purple/10 blur-2xl" />

            <div className="relative">
              <div className="text-center max-w-3xl mx-auto mb-10">
                <Badge className="bg-brand-blue text-white mb-4 font-medium">
                  <FileText className="h-4 w-4 mr-1.5" />
                  Wprowadzenie
                </Badge>
                <h2 className="text-3xl md:text-4xl font-bold text-brand-blue-dark mb-4">
                  {t("iso27001Page.understanding.title")}
                </h2>
                <p className="text-lg text-slate-600">
                  {t("iso27001Page.understanding.description")}
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="border-brand-blue/20 bg-white shadow-md hover:shadow-xl hover:-translate-y-1 transition-all">
                  <CardContent className="pt-6">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-brand-blue to-brand-blue-dark flex items-center justify-center mb-4 shadow-lg">
                      <Shield className="h-7 w-7 text-white" />
                    </div>
                    <h3 className="font-semibold text-lg mb-3 text-brand-blue-dark">
                      {t("iso27001Page.understanding.whatIs.title")}
                    </h3>
                    <p className="text-slate-600">
                      {t("iso27001Page.understanding.whatIs.description")}
                    </p>
                  </CardContent>
                </Card>
                <Card className="border-brand-purple/20 bg-white shadow-md hover:shadow-xl hover:-translate-y-1 transition-all">
                  <CardContent className="pt-6">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-brand-purple to-brand-blue-dark flex items-center justify-center mb-4 shadow-lg">
                      <Users className="h-7 w-7 text-white" />
                    </div>
                    <h3 className="font-semibold text-lg mb-3 text-brand-blue-dark">
                      {t("iso27001Page.understanding.whoNeeds.title")}
                    </h3>
                    <p className="text-slate-600">
                      {t("iso27001Page.understanding.whoNeeds.description")}
                    </p>
                  </CardContent>
                </Card>
                <Card className="border-brand-mint bg-white shadow-md hover:shadow-xl hover:-translate-y-1 transition-all">
                  <CardContent className="pt-6">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-brand-mint to-brand-blue flex items-center justify-center mb-4 shadow-lg">
                      <FileText className="h-7 w-7 text-white" />
                    </div>
                    <h3 className="font-semibold text-lg mb-3 text-brand-blue-dark">
                      {t("iso27001Page.understanding.keyRequirements.title")}
                    </h3>
                    <ul className="text-slate-600 space-y-2">
                      {getArrayTranslation("iso27001Page.understanding.keyRequirements.items").map(
                        (item, index) => (
                          <li key={index} className="flex items-start">
                            <CheckCircle className="h-4 w-4 text-brand-blue mt-1 mr-2 flex-shrink-0" />
                            <span className="text-sm">{item}</span>
                          </li>
                        )
                      )}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
        {/* How Quantifier Helps Section */}
        <section className="mb-16">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-brand-blue-dark mb-4">
              {t("iso27001Page.howQuantifierHelps.title")}
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              {t("iso27001Page.howQuantifierHelps.description")}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="border-brand-gray-light bg-white hover:border-brand-blue/30 transition-all">
              <CardContent className="pt-6">
                <div className="w-12 h-12 rounded-full bg-brand-blue/10 flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-brand-blue" />
                </div>
                <h3 className="font-semibold text-lg mb-2 text-brand-blue-dark">
                  {t("iso27001Page.howQuantifierHelps.features.riskAssessment.title")}
                </h3>
                <p className="text-slate-600">
                  {t("iso27001Page.howQuantifierHelps.features.riskAssessment.description")}
                </p>
              </CardContent>
            </Card>
            <Card className="border-brand-gray-light bg-white hover:border-brand-blue/30 transition-all">
              <CardContent className="pt-6">
                <div className="w-12 h-12 rounded-full bg-brand-purple/10 flex items-center justify-center mb-4">
                  <FileCheck className="h-6 w-6 text-brand-purple" />
                </div>
                <h3 className="font-semibold text-lg mb-2 text-brand-blue-dark">
                  {t("iso27001Page.howQuantifierHelps.features.policyManagement.title")}
                </h3>
                <p className="text-slate-600">
                  {t("iso27001Page.howQuantifierHelps.features.policyManagement.description")}
                </p>
              </CardContent>
            </Card>
            <Card className="border-brand-gray-light bg-white hover:border-brand-blue/30 transition-all">
              <CardContent className="pt-6">
                <div className="w-12 h-12 rounded-full bg-brand-mint/50 flex items-center justify-center mb-4">
                  <FileText className="h-6 w-6 text-brand-blue-dark" />
                </div>
                <h3 className="font-semibold text-lg mb-2 text-brand-blue-dark">
                  {t("iso27001Page.howQuantifierHelps.features.assetInventory.title")}
                </h3>
                <p className="text-slate-600">
                  {t("iso27001Page.howQuantifierHelps.features.assetInventory.description")}
                </p>
              </CardContent>
            </Card>
            <Card className="border-brand-gray-light bg-white hover:border-brand-blue/30 transition-all">
              <CardContent className="pt-6">
                <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mb-4">
                  <AlertTriangle className="h-6 w-6 text-red-600" />
                </div>
                <h3 className="font-semibold text-lg mb-2 text-brand-blue-dark">
                  {t("iso27001Page.howQuantifierHelps.features.incidentManagement.title")}
                </h3>
                <p className="text-slate-600">
                  {t("iso27001Page.howQuantifierHelps.features.incidentManagement.description")}
                </p>
              </CardContent>
            </Card>
            <Card className="border-brand-gray-light bg-white hover:border-brand-blue/30 transition-all">
              <CardContent className="pt-6">
                <div className="w-12 h-12 rounded-full bg-brand-blue/10 flex items-center justify-center mb-4">
                  <Eye className="h-6 w-6 text-brand-blue" />
                </div>
                <h3 className="font-semibold text-lg mb-2 text-brand-blue-dark">
                  {t("iso27001Page.howQuantifierHelps.features.internalAudit.title")}
                </h3>
                <p className="text-slate-600">
                  {t("iso27001Page.howQuantifierHelps.features.internalAudit.description")}
                </p>
              </CardContent>
            </Card>
            <Card className="border-brand-gray-light bg-white hover:border-brand-blue/30 transition-all">
              <CardContent className="pt-6">
                <div className="w-12 h-12 rounded-full bg-brand-purple/10 flex items-center justify-center mb-4">
                  <CheckCircle className="h-6 w-6 text-brand-purple" />
                </div>
                <h3 className="font-semibold text-lg mb-2 text-brand-blue-dark">
                  {t("iso27001Page.howQuantifierHelps.features.certificationReadiness.title")}
                </h3>
                <p className="text-slate-600">
                  {t("iso27001Page.howQuantifierHelps.features.certificationReadiness.description")}
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Step by Step Section */}
        <section className="mb-16">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-brand-blue-dark mb-4">
              {t("iso27001Page.stepByStep.title")}
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              {t("iso27001Page.stepByStep.description")}
            </p>
          </div>
          <div className="relative">
            {/* Vertical timeline line */}
            <div className="absolute left-6 md:left-1/2 md:-ml-0.5 top-0 bottom-0 w-1 bg-gradient-to-b from-brand-blue via-brand-purple to-brand-mint hidden md:block" />
            
            <div className="space-y-8 md:space-y-12">
              {/* Step 1 - Onboarding */}
              <AnimatedStep index={0}>
                <div className="md:w-1/2 md:pr-12 md:text-right">
                  <Card className="border-brand-gray-light bg-white p-6 inline-block text-left w-full">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-full bg-brand-blue text-white flex items-center justify-center font-bold text-lg">
                        {t("iso27001Page.stepByStep.steps.onboarding.number")}
                      </div>
                      <h3 className="font-semibold text-lg text-brand-blue-dark">
                        {t("iso27001Page.stepByStep.steps.onboarding.title")}
                      </h3>
                    </div>
                    <p className="text-slate-600 mb-3">
                      {t("iso27001Page.stepByStep.steps.onboarding.description")}
                    </p>
                    <ul className="space-y-1">
                      {getArrayTranslation("iso27001Page.stepByStep.steps.onboarding.items").map((item, i) => (
                        <li key={i} className="flex items-center text-sm text-slate-500">
                          <CheckCircle className="h-3 w-3 text-brand-blue mr-2 flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </Card>
                </div>
                <div className="hidden md:flex absolute left-1/2 -ml-3 w-6 h-6 rounded-full bg-brand-blue border-4 border-white shadow" />
                <div className="md:w-1/2 md:pl-12 mt-6 md:mt-0">
                  <StepMockup label="Platforma · Onboarding">
                    <HomePlatformMockup />
                  </StepMockup>
                </div>
              </AnimatedStep>
              {/* Step 2 - Gap Analysis */}
              <AnimatedStep index={1}>
                <div className="md:w-1/2 md:pr-12 mb-6 md:mb-0">
                  <StepMockup label="AI Compliance · Gap Analysis">
                    <Iso27001GapAnalysisMockup />
                  </StepMockup>
                </div>
                <div className="hidden md:flex absolute left-1/2 -ml-3 w-6 h-6 rounded-full bg-brand-blue border-4 border-white shadow" />
                <div className="md:w-1/2 md:pl-12">
                  <Card className="border-brand-gray-light bg-white p-6 w-full">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-full bg-brand-blue text-white flex items-center justify-center font-bold text-lg">
                        {t("iso27001Page.stepByStep.steps.gapAnalysis.number")}
                      </div>
                      <h3 className="font-semibold text-lg text-brand-blue-dark">
                        {t("iso27001Page.stepByStep.steps.gapAnalysis.title")}
                      </h3>
                    </div>
                    <p className="text-slate-600 mb-3">
                      {t("iso27001Page.stepByStep.steps.gapAnalysis.description")}
                    </p>
                    <ul className="space-y-1">
                      {getArrayTranslation("iso27001Page.stepByStep.steps.gapAnalysis.items").map((item, i) => (
                        <li key={i} className="flex items-center text-sm text-slate-500">
                          <CheckCircle className="h-3 w-3 text-brand-blue mr-2 flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </Card>
                </div>
              </AnimatedStep>
              {/* Step 3 - Risk Assessment */}
              <AnimatedStep index={2}>
                <div className="md:w-1/2 md:pr-12 md:text-right">
                  <Card className="border-brand-gray-light bg-white p-6 inline-block text-left w-full">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-full bg-brand-purple text-white flex items-center justify-center font-bold text-lg">
                        {t("iso27001Page.stepByStep.steps.riskAssessment.number")}
                      </div>
                      <h3 className="font-semibold text-lg text-brand-blue-dark">
                        {t("iso27001Page.stepByStep.steps.riskAssessment.title")}
                      </h3>
                    </div>
                    <p className="text-slate-600 mb-3">
                      {t("iso27001Page.stepByStep.steps.riskAssessment.description")}
                    </p>
                    <ul className="space-y-1">
                      {getArrayTranslation("iso27001Page.stepByStep.steps.riskAssessment.items").map((item, i) => (
                        <li key={i} className="flex items-center text-sm text-slate-500">
                          <CheckCircle className="h-3 w-3 text-brand-purple mr-2 flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </Card>
                </div>
                <div className="hidden md:flex absolute left-1/2 -ml-3 w-6 h-6 rounded-full bg-brand-purple border-4 border-white shadow" />
                <div className="md:w-1/2 md:pl-12 mt-6 md:mt-0">
                  <StepMockup label="Risk Heatmap">
                    <Iso27001RiskHeatmapMockup />
                  </StepMockup>
                </div>
              </AnimatedStep>
              {/* Step 4 - Policies */}
              <AnimatedStep index={3}>
                <div className="md:w-1/2 md:pr-12 mb-6 md:mb-0">
                  <StepMockup label="Document Repository · Polityki">
                    <Iso27001PoliciesMockup />
                  </StepMockup>
                </div>
                <div className="hidden md:flex absolute left-1/2 -ml-3 w-6 h-6 rounded-full bg-brand-purple border-4 border-white shadow" />
                <div className="md:w-1/2 md:pl-12">
                  <Card className="border-brand-gray-light bg-white p-6 w-full">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-full bg-brand-purple text-white flex items-center justify-center font-bold text-lg">
                        {t("iso27001Page.stepByStep.steps.policies.number")}
                      </div>
                      <h3 className="font-semibold text-lg text-brand-blue-dark">
                        {t("iso27001Page.stepByStep.steps.policies.title")}
                      </h3>
                    </div>
                    <p className="text-slate-600 mb-3">
                      {t("iso27001Page.stepByStep.steps.policies.description")}
                    </p>
                    <ul className="space-y-1">
                      {getArrayTranslation("iso27001Page.stepByStep.steps.policies.items").map((item, i) => (
                        <li key={i} className="flex items-center text-sm text-slate-500">
                          <CheckCircle className="h-3 w-3 text-brand-purple mr-2 flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </Card>
                </div>
              </AnimatedStep>
              {/* Step 5 - Controls */}
              <AnimatedStep index={4}>
                <div className="md:w-1/2 md:pr-12 md:text-right">
                  <Card className="border-brand-gray-light bg-white p-6 inline-block text-left w-full">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-full bg-brand-blue-dark text-white flex items-center justify-center font-bold text-lg">
                        {t("iso27001Page.stepByStep.steps.controls.number")}
                      </div>
                      <h3 className="font-semibold text-lg text-brand-blue-dark">
                        {t("iso27001Page.stepByStep.steps.controls.title")}
                      </h3>
                    </div>
                    <p className="text-slate-600 mb-3">
                      {t("iso27001Page.stepByStep.steps.controls.description")}
                    </p>
                    <ul className="space-y-1">
                      {getArrayTranslation("iso27001Page.stepByStep.steps.controls.items").map((item, i) => (
                        <li key={i} className="flex items-center text-sm text-slate-500">
                          <CheckCircle className="h-3 w-3 text-brand-blue-dark mr-2 flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </Card>
                </div>
                <div className="hidden md:flex absolute left-1/2 -ml-3 w-6 h-6 rounded-full bg-brand-blue-dark border-4 border-white shadow" />
                <div className="md:w-1/2 md:pl-12 mt-6 md:mt-0">
                  <StepMockup label="Task Board · Wdrożenie kontroli">
                    <Iso27001ControlsMockup />
                  </StepMockup>
                </div>
              </AnimatedStep>
              {/* Step 6 - Certification */}
              <AnimatedStep index={5}>
                <div className="md:w-1/2 md:pr-12 mb-6 md:mb-0">
                  <StepMockup label="Auditor Dashboard · Certyfikacja">
                    <Iso27001CertificationMockup />
                  </StepMockup>
                </div>
                <div className="hidden md:flex absolute left-1/2 -ml-3 w-6 h-6 rounded-full bg-brand-mint border-4 border-white shadow" />
                <div className="md:w-1/2 md:pl-12">
                  <Card className="border-brand-gray-light bg-white p-6 w-full">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-full bg-brand-mint text-brand-blue-dark flex items-center justify-center font-bold text-lg">
                        {t("iso27001Page.stepByStep.steps.certification.number")}
                      </div>
                      <h3 className="font-semibold text-lg text-brand-blue-dark">
                        {t("iso27001Page.stepByStep.steps.certification.title")}
                      </h3>
                    </div>
                    <p className="text-slate-600 mb-3">
                      {t("iso27001Page.stepByStep.steps.certification.description")}
                    </p>
                    <ul className="space-y-1">
                      {getArrayTranslation("iso27001Page.stepByStep.steps.certification.items").map((item, i) => (
                        <li key={i} className="flex items-center text-sm text-slate-500">
                          <CheckCircle className="h-3 w-3 text-green-600 mr-2 flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </Card>
                </div>
              </AnimatedStep>
              {/* Step 7 - Maintenance */}
              <AnimatedStep index={6}>
                <div className="md:w-1/2 md:pr-12 md:text-right">
                  <Card className="border-brand-gray-light bg-gradient-to-r from-brand-blue/5 to-brand-purple/5 p-6 inline-block text-left w-full">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-brand-blue to-brand-purple text-white flex items-center justify-center font-bold text-lg">
                        {t("iso27001Page.stepByStep.steps.maintenance.number")}
                      </div>
                      <h3 className="font-semibold text-lg text-brand-blue-dark">
                        {t("iso27001Page.stepByStep.steps.maintenance.title")}
                      </h3>
                    </div>
                    <p className="text-slate-600 mb-3">
                      {t("iso27001Page.stepByStep.steps.maintenance.description")}
                    </p>
                    <ul className="space-y-1">
                      {getArrayTranslation("iso27001Page.stepByStep.steps.maintenance.items").map((item, i) => (
                        <li key={i} className="flex items-center text-sm text-slate-500">
                          <CheckCircle className="h-3 w-3 text-brand-purple mr-2 flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </Card>
                </div>
                <div className="hidden md:flex absolute left-1/2 -ml-3 w-6 h-6 rounded-full bg-gradient-to-r from-brand-blue to-brand-purple border-4 border-white shadow" />
                <div className="md:w-1/2 md:pl-12 mt-6 md:mt-0">
                  <StepMockup label="Manager Dashboard · Utrzymanie ISMS">
                    <Iso27001MaintenanceMockup />
                  </StepMockup>
                </div>
              </AnimatedStep>
            </div>
          </div>
        </section>


        {/* AI Module — highlighted */}
        <section className="mb-16">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-blue-dark via-brand-purple to-brand-blue p-8 md:p-12 text-white shadow-2xl">
            {/* Decorative elements */}
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-20"
              style={{
                backgroundImage: "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.4) 1px, transparent 0)",
                backgroundSize: "24px 24px",
              }} />
            <div aria-hidden="true" className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
            <div aria-hidden="true" className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-brand-mint/20 blur-3xl" />

            <div className="relative flex flex-col md:flex-row items-center gap-10">
              <div className="md:w-2/3">
                <Badge className="bg-white/20 backdrop-blur text-white border border-white/30 mb-5 font-medium">
                  <Sparkles className="h-4 w-4 mr-1.5" />
                  Poznaj Leona — Twojego AI Compliance Officera
                </Badge>
                <h2 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
                  Moduł ISMS oparty na AI — Leon czuwa 24/7
                </h2>
                <p className="text-lg text-white/85 leading-relaxed mb-4">
                  Leon to Twój wirtualny Compliance Officer, który nigdy nie śpi. Monitoruje status zgodności ISO 27001, przypomina o terminach przeglądów polityk, sygnalizuje luki w kontrolach i pomaga zespołowi reagować zanim audytor zapuka do drzwi.
                </p>
                <ul className="space-y-2 mb-6 text-white/90">
                  <li className="flex items-start gap-2"><CheckCircle className="h-5 w-5 mt-0.5 flex-shrink-0 text-brand-mint" /><span>Codzienna analiza ryzyka i automatyczne alerty o wygasających dowodach</span></li>
                  <li className="flex items-start gap-2"><CheckCircle className="h-5 w-5 mt-0.5 flex-shrink-0 text-brand-mint" /><span>Podpowiedzi „następnego najlepszego kroku" dla każdego właściciela kontroli</span></li>
                  <li className="flex items-start gap-2"><CheckCircle className="h-5 w-5 mt-0.5 flex-shrink-0 text-brand-mint" /><span>Asystent w czacie — zapytaj Leona o status SoA, polityki, audyt</span></li>
                </ul>
                <Button
                  asChild
                  size="lg"
                  className="bg-white text-brand-blue-dark hover:bg-white/90 font-semibold shadow-lg"
                >
                  <Link to={`/${currentLocale}/contact`}>
                    Porozmawiaj z Leonem <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
              <div className="md:w-1/3 flex justify-center">
                <div className="relative">
                  <div className="absolute inset-0 bg-white/30 blur-3xl rounded-full" />
                  <div className="relative w-56 h-56 rounded-full bg-gradient-to-br from-white/30 to-white/10 backdrop-blur border border-white/30 flex items-center justify-center overflow-hidden">
                    <img
                      src={leonOfficer}
                      alt="Leon — AI Compliance Officer Quantifier"
                      width={224}
                      height={224}
                      loading="lazy"
                      className="w-48 h-48 object-contain drop-shadow-xl"
                    />
                  </div>
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-white text-brand-blue-dark text-xs font-bold px-3 py-1 rounded-full shadow-lg whitespace-nowrap">
                    Leon · zawsze online
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Results & For Whom sections removed */}
        {/* Continuous ISMS Operations Section */}
        <section className="mb-16">
          <div className="bg-brand-gray-light/30 rounded-2xl p-8 md:p-12">
            <div className="flex flex-col lg:flex-row gap-10">
              <div className="lg:w-1/2">
                <Badge className="bg-brand-blue text-white mb-4">
                  {t("iso27001Page.continuousCompliance.statusBadge")}
                </Badge>
                <h2 className="text-3xl font-bold text-brand-blue-dark mb-4">
                  {t("iso27001Page.continuousCompliance.title")}
                </h2>
                <p className="text-lg text-slate-600 mb-6">
                  {t("iso27001Page.continuousCompliance.description")}
                </p>
                <div className="bg-white rounded-xl p-6 border border-brand-gray-light">
                  <h3 className="font-semibold text-lg mb-4 text-brand-blue-dark">
                    {t("iso27001Page.continuousCompliance.form.title")}
                  </h3>
                  <form className="space-y-4">
                    <Input
                      placeholder={t("iso27001Page.continuousCompliance.form.nameLabel")}
                      className="border-brand-gray-light"
                    />
                    <Input
                      type="email"
                      placeholder={t("iso27001Page.continuousCompliance.form.emailLabel")}
                      className="border-brand-gray-light"
                    />
                    <Button className="w-full bg-brand-purple hover:bg-brand-blue-dark text-white">
                      {t("iso27001Page.continuousCompliance.form.button")}
                    </Button>
                  </form>
                </div>
              </div>
              <div className="lg:w-1/2">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Card className="border-brand-gray-light bg-white">
                    <CardContent className="pt-6">
                      <Activity className="h-8 w-8 text-brand-blue mb-3" />
                      <h3 className="font-semibold mb-2">
                        {t("iso27001Page.continuousCompliance.features.monitoring.title")}
                      </h3>
                      <p className="text-slate-600 text-sm">
                        {t("iso27001Page.continuousCompliance.features.monitoring.description")}
                      </p>
                    </CardContent>
                  </Card>
                  <Card className="border-brand-gray-light bg-white">
                    <CardContent className="pt-6">
                      <Shield className="h-8 w-8 text-brand-purple mb-3" />
                      <h3 className="font-semibold mb-2">
                        {t("iso27001Page.continuousCompliance.features.riskAssessment.title")}
                      </h3>
                      <p className="text-slate-600 text-sm">
                        {t("iso27001Page.continuousCompliance.features.riskAssessment.description")}
                      </p>
                    </CardContent>
                  </Card>
                  <Card className="border-brand-gray-light bg-white">
                    <CardContent className="pt-6">
                      <AlertTriangle className="h-8 w-8 text-orange-500 mb-3" />
                      <h3 className="font-semibold mb-2">
                        {t("iso27001Page.continuousCompliance.features.incidentResponse.title")}
                      </h3>
                      <p className="text-slate-600 text-sm">
                        {t("iso27001Page.continuousCompliance.features.incidentResponse.description")}
                      </p>
                    </CardContent>
                  </Card>
                  <Card className="border-brand-gray-light bg-white">
                    <CardContent className="pt-6">
                      <Eye className="h-8 w-8 text-brand-blue-dark mb-3" />
                      <h3 className="font-semibold mb-2">
                        {t("iso27001Page.continuousCompliance.features.auditPreparation.title")}
                      </h3>
                      <p className="text-slate-600 text-sm">
                        {t("iso27001Page.continuousCompliance.features.auditPreparation.description")}
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Key Definitions */}
        <DefinitionsBlock
          title={t("iso27001Page.definitions.title", { defaultValue: "Key ISO 27001 Terms & Definitions" })}
          definitions={[
            { term: "ISMS (Information Security Management System)", definition: "A systematic approach to managing sensitive company information so that it remains secure. It includes people, processes, and IT/technology systems by applying a risk management process." },
            { term: "Statement of Applicability (SoA)", definition: "A document that lists all controls from ISO 27001 Annex A (93 controls in the 2022 version) and states which are applicable and which are not, with justification for exclusions." },
            { term: "Risk Treatment Plan", definition: "A structured plan that outlines how identified information security risks will be addressed — whether through mitigation, transfer, acceptance, or avoidance — including timelines, responsible parties, and expected outcomes." },
            { term: "Annex A Controls", definition: "A set of 93 reference controls organized into 4 themes (Organizational, People, Physical, Technological) that organizations can select based on their risk assessment results." }
          ]}
          className="mb-20"
        />

        {/* Related Content section removed */}
        {/* FAQ Section */}
        <section className="mb-20">
          <FAQSection
            title={t("iso27001Page.faq.title")}
            faqs={faqItems.map((item) => ({
              question: item.question,
              answer: item.answer,
            }))}
            pageUrl={`https://quantifier.ai/${currentLocale}/frameworks/iso-27001`}
          />
        </section>

        {/* Final CTA Section */}
        <section>
          <div className="bg-gradient-to-r from-brand-blue-dark to-brand-purple rounded-2xl p-8 md:p-16 text-white text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {t("iso27001Page.finalCta.title")}
            </h2>
            <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
              {t("iso27001Page.finalCta.description")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-white text-brand-blue-dark hover:bg-white/90 font-semibold"
              >
                <Link to={`/${currentLocale}/contact`}>
                  {t("iso27001Page.finalCta.bookDemo")}
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white/20 bg-gray-50 text-[#324691] hover:bg-white"
              >
                <Link to={`/${currentLocale}/plans`}>
                  {t("iso27001Page.finalCta.seePricing")}
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </PageTemplate>
  );
};

export default Iso27001;
