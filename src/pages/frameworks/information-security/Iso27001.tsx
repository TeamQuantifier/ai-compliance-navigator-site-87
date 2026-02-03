import PageTemplate from "@/components/PageTemplate";
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

  return (
    <PageTemplate
      title={t("seo.frameworks.informationSecurity.iso27001.title")}
      description={t("seo.frameworks.informationSecurity.iso27001.description")}
    >
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <section className="mb-16">
          <div className="bg-gradient-to-r from-brand-blue-dark via-brand-blue to-brand-purple rounded-2xl p-8 md:p-12 text-white">
            <div className="flex flex-col lg:flex-row items-center gap-10">
              <div className="lg:w-1/2">
                <Badge className="bg-white/20 text-white border-white/30 mb-4">
                  {t("iso27001Page.hero.badge")}
                </Badge>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                  {t("iso27001Page.hero.title")}
                </h1>
                <p className="text-lg md:text-xl opacity-90 mb-6">
                  {t("iso27001Page.hero.subtitle")}
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button
                    asChild
                    size="lg"
                    className="bg-white text-brand-blue-dark hover:bg-white/90 font-semibold"
                  >
                    <Link to={`/${currentLocale}/contact`}>
                      {t("iso27001Page.hero.button")} <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                </div>
              </div>
              <div className="lg:w-1/2">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                  <h3 className="text-xl font-semibold mb-4">
                    {t("iso27001Page.hero.formTitle")}
                  </h3>
                  <form className="space-y-4">
                    <Input
                      placeholder={t("iso27001Page.hero.nameLabel")}
                      className="bg-white/10 border-white/30 text-white placeholder:text-white/60"
                    />
                    <Input
                      type="email"
                      placeholder={t("iso27001Page.hero.emailLabel")}
                      className="bg-white/10 border-white/30 text-white placeholder:text-white/60"
                    />
                    <div className="flex items-center space-x-2">
                      <Checkbox id="marketing" className="border-white/50" />
                      <label htmlFor="marketing" className="text-sm opacity-80">
                        {t("iso27001Page.hero.marketingConsent")}
                      </label>
                    </div>
                    <Button className="w-full bg-white text-brand-blue-dark hover:bg-white/90">
                      {t("iso27001Page.hero.requestDemoButton")}
                    </Button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why ISO 27001 Matters Section */}
        <section className="mb-16">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-brand-blue-dark mb-4">
              {t("iso27001Page.whyMatters.title")}
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              {t("iso27001Page.whyMatters.subtitle")}
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Penalties Card */}
            <Card className="border-brand-gray-light bg-white text-center p-6">
              <CardContent className="pt-4">
                <div className="mx-auto w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mb-4">
                  <Euro className="h-8 w-8 text-red-600" />
                </div>
                <div className="text-3xl font-bold text-brand-blue-dark mb-2">
                  {t("iso27001Page.whyMatters.cards.penalties.stat")}
                </div>
                <h3 className="font-semibold text-lg mb-2">
                  {t("iso27001Page.whyMatters.cards.penalties.title")}
                </h3>
                <p className="text-slate-600 text-sm">
                  {t("iso27001Page.whyMatters.cards.penalties.description")}
                </p>
              </CardContent>
            </Card>
            {/* Downtime Card */}
            <Card className="border-brand-gray-light bg-white text-center p-6">
              <CardContent className="pt-4">
                <div className="mx-auto w-16 h-16 rounded-full bg-amber-100 flex items-center justify-center mb-4">
                  <AlertTriangle className="h-8 w-8 text-amber-600" />
                </div>
                <h3 className="font-semibold text-lg mb-2 mt-4">
                  {t("iso27001Page.whyMatters.cards.downtime.title")}
                </h3>
                <p className="text-slate-600 text-sm">
                  {t("iso27001Page.whyMatters.cards.downtime.description")}
                </p>
              </CardContent>
            </Card>
            {/* Reputation Card */}
            <Card className="border-brand-gray-light bg-white text-center p-6">
              <CardContent className="pt-4">
                <div className="mx-auto w-16 h-16 rounded-full bg-brand-purple/10 flex items-center justify-center mb-4">
                  <Users className="h-8 w-8 text-brand-purple" />
                </div>
                <h3 className="font-semibold text-lg mb-2 mt-4">
                  {t("iso27001Page.whyMatters.cards.reputation.title")}
                </h3>
                <p className="text-slate-600 text-sm">
                  {t("iso27001Page.whyMatters.cards.reputation.description")}
                </p>
              </CardContent>
            </Card>
            {/* Timeline Card */}
            <Card className="border-brand-gray-light bg-white text-center p-6">
              <CardContent className="pt-4">
                <div className="mx-auto w-16 h-16 rounded-full bg-brand-blue/10 flex items-center justify-center mb-4">
                  <Clock className="h-8 w-8 text-brand-blue" />
                </div>
                <div className="text-3xl font-bold text-brand-blue-dark mb-2">
                  {t("iso27001Page.whyMatters.cards.timeline.stat")}
                </div>
                <h3 className="font-semibold text-lg mb-2">
                  {t("iso27001Page.whyMatters.cards.timeline.title")}
                </h3>
                <p className="text-slate-600 text-sm">
                  {t("iso27001Page.whyMatters.cards.timeline.description")}
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Understanding ISO 27001 Section */}
        <section className="mb-16">
          <div className="bg-brand-gray-light/30 p-8 rounded-2xl">
            <h2 className="text-3xl font-bold text-center text-brand-blue-dark mb-4">
              {t("iso27001Page.understanding.title")}
            </h2>
            <p className="text-lg text-slate-600 text-center max-w-3xl mx-auto mb-10">
              {t("iso27001Page.understanding.description")}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="border-brand-gray-light bg-white">
                <CardContent className="pt-6">
                  <div className="w-12 h-12 rounded-full bg-brand-blue/10 flex items-center justify-center mb-4">
                    <Shield className="h-6 w-6 text-brand-blue" />
                  </div>
                  <h3 className="font-semibold text-lg mb-3 text-brand-blue-dark">
                    {t("iso27001Page.understanding.whatIs.title")}
                  </h3>
                  <p className="text-slate-600">
                    {t("iso27001Page.understanding.whatIs.description")}
                  </p>
                </CardContent>
              </Card>
              <Card className="border-brand-gray-light bg-white">
                <CardContent className="pt-6">
                  <div className="w-12 h-12 rounded-full bg-brand-purple/10 flex items-center justify-center mb-4">
                    <Users className="h-6 w-6 text-brand-purple" />
                  </div>
                  <h3 className="font-semibold text-lg mb-3 text-brand-blue-dark">
                    {t("iso27001Page.understanding.whoNeeds.title")}
                  </h3>
                  <p className="text-slate-600">
                    {t("iso27001Page.understanding.whoNeeds.description")}
                  </p>
                </CardContent>
              </Card>
              <Card className="border-brand-gray-light bg-white">
                <CardContent className="pt-6">
                  <div className="w-12 h-12 rounded-full bg-brand-mint/50 flex items-center justify-center mb-4">
                    <FileText className="h-6 w-6 text-brand-blue-dark" />
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
        </section>

        {/* Why Leadership Should Care Section */}
        <section className="mb-16">
          <div className="bg-gradient-to-r from-brand-purple/10 to-brand-blue/10 rounded-2xl p-8 md:p-12">
            <Badge className="bg-brand-purple text-white mb-4">
              {t("iso27001Page.whyLeadership.badge")}
            </Badge>
            <h2 className="text-3xl font-bold text-brand-blue-dark mb-4">
              {t("iso27001Page.whyLeadership.title")}
            </h2>
            <p className="text-lg text-slate-600 mb-8 max-w-3xl">
              {t("iso27001Page.whyLeadership.description")}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {getObjectArrayTranslation<{ title: string; description: string }>(
                "iso27001Page.whyLeadership.points"
              ).map((point, index) => (
                <div key={index} className="flex items-start bg-white rounded-xl p-5 shadow-sm">
                  <div className="w-10 h-10 rounded-full bg-brand-purple/10 flex items-center justify-center mr-4 flex-shrink-0">
                    {index === 0 && <AlertTriangle className="h-5 w-5 text-brand-purple" />}
                    {index === 1 && <Target className="h-5 w-5 text-brand-purple" />}
                    {index === 2 && <Lock className="h-5 w-5 text-brand-purple" />}
                    {index === 3 && <BarChart4 className="h-5 w-5 text-brand-purple" />}
                  </div>
                  <div>
                    <h3 className="font-semibold text-brand-blue-dark mb-1">{point.title}</h3>
                    <p className="text-slate-600 text-sm">{point.description}</p>
                  </div>
                </div>
              ))}
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
              <div className="relative flex flex-col md:flex-row md:items-center">
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
                <div className="md:w-1/2 md:pl-12" />
              </div>

              {/* Step 2 - Gap Analysis */}
              <div className="relative flex flex-col md:flex-row md:items-center">
                <div className="md:w-1/2 md:pr-12" />
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
              </div>

              {/* Step 3 - Risk Assessment */}
              <div className="relative flex flex-col md:flex-row md:items-center">
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
                <div className="md:w-1/2 md:pl-12" />
              </div>

              {/* Step 4 - Policies */}
              <div className="relative flex flex-col md:flex-row md:items-center">
                <div className="md:w-1/2 md:pr-12" />
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
              </div>

              {/* Step 5 - Controls */}
              <div className="relative flex flex-col md:flex-row md:items-center">
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
                <div className="md:w-1/2 md:pl-12" />
              </div>

              {/* Step 6 - Certification */}
              <div className="relative flex flex-col md:flex-row md:items-center">
                <div className="md:w-1/2 md:pr-12" />
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
              </div>

              {/* Step 7 - Maintenance */}
              <div className="relative flex flex-col md:flex-row md:items-center">
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
                <div className="md:w-1/2 md:pl-12" />
              </div>
            </div>
          </div>
        </section>


        <section className="mb-16">
          <div className="bg-brand-mint/30 rounded-2xl p-8 md:p-12">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="md:w-2/3">
                <Badge className="bg-brand-purple text-white mb-4">
                  <Sparkles className="h-4 w-4 mr-1" />
                  {t("iso27001Page.aiModule.badge")}
                </Badge>
                <h2 className="text-3xl font-bold text-brand-blue-dark mb-4">
                  {t("iso27001Page.aiModule.title")}
                </h2>
                <p className="text-lg text-slate-600">
                  {t("iso27001Page.aiModule.description")}
                </p>
              </div>
              <div className="md:w-1/3 flex justify-center">
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-brand-purple to-brand-blue flex items-center justify-center">
                  <Sparkles className="h-16 w-16 text-white" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Results Section */}
        <section className="mb-16">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-brand-blue-dark mb-4">
              {t("iso27001Page.results.title")}
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              {t("iso27001Page.results.description")}
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-white rounded-xl p-6 text-center border border-brand-gray-light">
              <div className="text-4xl font-bold text-brand-purple mb-2">
                {t("iso27001Page.results.metrics.coverage.value")}
              </div>
              <p className="text-slate-600 text-sm">
                {t("iso27001Page.results.metrics.coverage.label")}
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 text-center border border-brand-gray-light">
              <div className="text-4xl font-bold text-brand-blue mb-2">
                {t("iso27001Page.results.metrics.controls.value")}
              </div>
              <p className="text-slate-600 text-sm">
                {t("iso27001Page.results.metrics.controls.label")}
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 text-center border border-brand-gray-light">
              <div className="text-4xl font-bold text-brand-blue-dark mb-2">
                {t("iso27001Page.results.metrics.monitoring.value")}
              </div>
              <p className="text-slate-600 text-sm">
                {t("iso27001Page.results.metrics.monitoring.label")}
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 text-center border border-brand-gray-light">
              <div className="text-4xl font-bold text-green-600 mb-2">
                {t("iso27001Page.results.metrics.reduction.value")}
              </div>
              <p className="text-slate-600 text-sm">
                {t("iso27001Page.results.metrics.reduction.label")}
              </p>
            </div>
          </div>
        </section>

        {/* For Whom Section */}
        <section className="mb-16">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-brand-blue-dark mb-4">
              {t("iso27001Page.forWhom.title")}
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              {t("iso27001Page.forWhom.subtitle")}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="border-brand-gray-light bg-white hover:border-brand-purple/30 transition-all">
              <CardContent className="pt-6 text-center">
                <div className="mx-auto w-16 h-16 rounded-full bg-brand-purple/10 flex items-center justify-center mb-4">
                  <Shield className="h-8 w-8 text-brand-purple" />
                </div>
                <h3 className="font-semibold text-lg mb-2 text-brand-blue-dark">
                  {t("iso27001Page.forWhom.personas.ciso.title")}
                </h3>
                <p className="text-slate-600 text-sm">
                  {t("iso27001Page.forWhom.personas.ciso.description")}
                </p>
              </CardContent>
            </Card>
            <Card className="border-brand-gray-light bg-white hover:border-brand-purple/30 transition-all">
              <CardContent className="pt-6 text-center">
                <div className="mx-auto w-16 h-16 rounded-full bg-brand-blue/10 flex items-center justify-center mb-4">
                  <Briefcase className="h-8 w-8 text-brand-blue" />
                </div>
                <h3 className="font-semibold text-lg mb-2 text-brand-blue-dark">
                  {t("iso27001Page.forWhom.personas.ceo.title")}
                </h3>
                <p className="text-slate-600 text-sm">
                  {t("iso27001Page.forWhom.personas.ceo.description")}
                </p>
              </CardContent>
            </Card>
            <Card className="border-brand-gray-light bg-white hover:border-brand-purple/30 transition-all">
              <CardContent className="pt-6 text-center">
                <div className="mx-auto w-16 h-16 rounded-full bg-brand-mint/50 flex items-center justify-center mb-4">
                  <UserCheck className="h-8 w-8 text-brand-blue-dark" />
                </div>
                <h3 className="font-semibold text-lg mb-2 text-brand-blue-dark">
                  {t("iso27001Page.forWhom.personas.itManager.title")}
                </h3>
                <p className="text-slate-600 text-sm">
                  {t("iso27001Page.forWhom.personas.itManager.description")}
                </p>
              </CardContent>
            </Card>
            <Card className="border-brand-gray-light bg-white hover:border-brand-purple/30 transition-all">
              <CardContent className="pt-6 text-center">
                <div className="mx-auto w-16 h-16 rounded-full bg-brand-gray-light flex items-center justify-center mb-4">
                  <Scale className="h-8 w-8 text-brand-blue-dark" />
                </div>
                <h3 className="font-semibold text-lg mb-2 text-brand-blue-dark">
                  {t("iso27001Page.forWhom.personas.compliance.title")}
                </h3>
                <p className="text-slate-600 text-sm">
                  {t("iso27001Page.forWhom.personas.compliance.description")}
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

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
