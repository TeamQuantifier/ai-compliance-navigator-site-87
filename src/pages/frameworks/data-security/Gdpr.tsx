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
  Globe,
  Database,
  UserX,
  Bell,
  FileSearch,
  ClipboardCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { useLanguage } from "@/contexts/LanguageContext";
import { Link } from "react-router-dom";
import FAQSection from "@/components/seo/FAQSection";

const Gdpr = () => {
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
    "gdprPage.faq.items"
  );

  // Data subject rights
  const dataSubjectRights = getArrayTranslation("gdprPage.understanding.dataSubjectRights.items");

  return (
    <PageTemplate
      title={t("gdprPage.seo.title")}
      description={t("gdprPage.seo.description")}
    >
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <section className="mb-16">
          <div className="bg-gradient-to-r from-brand-blue-dark via-brand-blue to-brand-purple rounded-2xl p-8 md:p-12 text-white">
            <div className="flex flex-col lg:flex-row items-center gap-10">
              <div className="lg:w-1/2">
                <Badge className="bg-white/20 text-white border-white/30 mb-4">
                  {t("gdprPage.hero.badge")}
                </Badge>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                  {t("gdprPage.hero.title")}
                </h1>
                <p className="text-lg md:text-xl opacity-90 mb-6">
                  {t("gdprPage.hero.subtitle")}
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button
                    asChild
                    size="lg"
                    className="bg-white text-brand-blue-dark hover:bg-white/90 font-semibold"
                  >
                    <Link to={`/${currentLocale}/contact`}>
                      {t("gdprPage.hero.button")} <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                </div>
              </div>
              <div className="lg:w-1/2">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                  <h3 className="text-xl font-semibold mb-4">
                    {t("gdprPage.hero.formTitle")}
                  </h3>
                  <form className="space-y-4">
                    <Input
                      placeholder={t("gdprPage.hero.nameLabel")}
                      className="bg-white/10 border-white/30 text-white placeholder:text-white/60"
                    />
                    <Input
                      type="email"
                      placeholder={t("gdprPage.hero.emailLabel")}
                      className="bg-white/10 border-white/30 text-white placeholder:text-white/60"
                    />
                    <div className="flex items-center space-x-2">
                      <Checkbox id="marketing" className="border-white/50" />
                      <label htmlFor="marketing" className="text-sm opacity-80">
                        {t("gdprPage.hero.marketingConsent")}
                      </label>
                    </div>
                    <Button className="w-full bg-white text-brand-blue-dark hover:bg-white/90">
                      {t("gdprPage.hero.requestDemoButton")}
                    </Button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why GDPR Is Critical Section */}
        <section className="mb-16">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-brand-blue-dark mb-4">
              {t("gdprPage.whyCritical.title")}
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              {t("gdprPage.whyCritical.subtitle")}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="border-brand-gray-light bg-white text-center p-6">
              <CardContent className="pt-4">
                <div className="mx-auto w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mb-4">
                  <Euro className="h-8 w-8 text-red-600" />
                </div>
                <div className="text-4xl font-bold text-brand-blue-dark mb-2">
                  {t("gdprPage.whyCritical.cards.fines.stat")}
                </div>
                <h3 className="font-semibold text-lg mb-2">
                  {t("gdprPage.whyCritical.cards.fines.title")}
                </h3>
                <p className="text-slate-600">
                  {t("gdprPage.whyCritical.cards.fines.description")}
                </p>
              </CardContent>
            </Card>
            <Card className="border-brand-gray-light bg-white text-center p-6">
              <CardContent className="pt-4">
                <div className="mx-auto w-16 h-16 rounded-full bg-brand-purple/10 flex items-center justify-center mb-4">
                  <FileText className="h-8 w-8 text-brand-purple" />
                </div>
                <div className="text-4xl font-bold text-brand-blue-dark mb-2">
                  {t("gdprPage.whyCritical.cards.complexity.stat")}
                </div>
                <h3 className="font-semibold text-lg mb-2">
                  {t("gdprPage.whyCritical.cards.complexity.title")}
                </h3>
                <p className="text-slate-600">
                  {t("gdprPage.whyCritical.cards.complexity.description")}
                </p>
              </CardContent>
            </Card>
            <Card className="border-brand-gray-light bg-white text-center p-6">
              <CardContent className="pt-4">
                <div className="mx-auto w-16 h-16 rounded-full bg-brand-blue/10 flex items-center justify-center mb-4">
                  <Globe className="h-8 w-8 text-brand-blue" />
                </div>
                <div className="text-4xl font-bold text-brand-blue-dark mb-2">
                  {t("gdprPage.whyCritical.cards.scope.stat")}
                </div>
                <h3 className="font-semibold text-lg mb-2">
                  {t("gdprPage.whyCritical.cards.scope.title")}
                </h3>
                <p className="text-slate-600">
                  {t("gdprPage.whyCritical.cards.scope.description")}
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Understanding GDPR Section */}
        <section className="mb-16">
          <div className="bg-brand-gray-light/30 p-8 rounded-2xl">
            <h2 className="text-3xl font-bold text-center text-brand-blue-dark mb-4">
              {t("gdprPage.understanding.title")}
            </h2>
            <p className="text-lg text-slate-600 text-center max-w-3xl mx-auto mb-10">
              {t("gdprPage.understanding.description")}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="border-brand-gray-light bg-white">
                <CardContent className="pt-6">
                  <div className="w-12 h-12 rounded-full bg-brand-blue/10 flex items-center justify-center mb-4">
                    <Shield className="h-6 w-6 text-brand-blue" />
                  </div>
                  <h3 className="font-semibold text-lg mb-3 text-brand-blue-dark">
                    {t("gdprPage.understanding.whatIs.title")}
                  </h3>
                  <p className="text-slate-600">
                    {t("gdprPage.understanding.whatIs.description")}
                  </p>
                </CardContent>
              </Card>
              <Card className="border-brand-gray-light bg-white">
                <CardContent className="pt-6">
                  <div className="w-12 h-12 rounded-full bg-brand-purple/10 flex items-center justify-center mb-4">
                    <Building2 className="h-6 w-6 text-brand-purple" />
                  </div>
                  <h3 className="font-semibold text-lg mb-3 text-brand-blue-dark">
                    {t("gdprPage.understanding.whoItApplies.title")}
                  </h3>
                  <p className="text-slate-600">
                    {t("gdprPage.understanding.whoItApplies.description")}
                  </p>
                </CardContent>
              </Card>
              <Card className="border-brand-gray-light bg-white">
                <CardContent className="pt-6">
                  <div className="w-12 h-12 rounded-full bg-brand-mint flex items-center justify-center mb-4">
                    <Users className="h-6 w-6 text-brand-blue-dark" />
                  </div>
                  <h3 className="font-semibold text-lg mb-3 text-brand-blue-dark">
                    {t("gdprPage.understanding.dataSubjectRights.title")}
                  </h3>
                  <ul className="text-slate-600 space-y-1 text-sm">
                    {dataSubjectRights.map((right, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-brand-purple mt-0.5 flex-shrink-0" />
                        <span>{right}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Why GDPR Matters for Leadership */}
        <section className="mb-16">
          <div className="bg-gradient-to-r from-brand-blue-dark to-brand-purple rounded-2xl p-8 md:p-12 text-white">
            <Badge className="bg-white/20 text-white border-white/30 mb-4">
              {t("gdprPage.whyLeadership.badge")}
            </Badge>
            <h2 className="text-3xl font-bold mb-4">
              {t("gdprPage.whyLeadership.title")}
            </h2>
            <p className="text-lg opacity-90 mb-8 max-w-3xl">
              {t("gdprPage.whyLeadership.description")}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                  <AlertTriangle className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">
                    {t("gdprPage.whyLeadership.points.liability.title")}
                  </h3>
                  <p className="opacity-80">
                    {t("gdprPage.whyLeadership.points.liability.description")}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                  <Users className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">
                    {t("gdprPage.whyLeadership.points.trust.title")}
                  </h3>
                  <p className="opacity-80">
                    {t("gdprPage.whyLeadership.points.trust.description")}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                  <Target className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">
                    {t("gdprPage.whyLeadership.points.advantage.title")}
                  </h3>
                  <p className="opacity-80">
                    {t("gdprPage.whyLeadership.points.advantage.description")}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                  <Euro className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">
                    {t("gdprPage.whyLeadership.points.fines.title")}
                  </h3>
                  <p className="opacity-80">
                    {t("gdprPage.whyLeadership.points.fines.description")}
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
              {t("gdprPage.howQuantifierHelps.title")}
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              {t("gdprPage.howQuantifierHelps.description")}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="border-brand-gray-light bg-white hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="w-12 h-12 rounded-full bg-brand-blue/10 flex items-center justify-center mb-4">
                  <Database className="h-6 w-6 text-brand-blue" />
                </div>
                <h3 className="font-semibold text-lg mb-2 text-brand-blue-dark">
                  {t("gdprPage.howQuantifierHelps.features.dataMapping.title")}
                </h3>
                <p className="text-slate-600">
                  {t("gdprPage.howQuantifierHelps.features.dataMapping.description")}
                </p>
              </CardContent>
            </Card>
            <Card className="border-brand-gray-light bg-white hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="w-12 h-12 rounded-full bg-brand-purple/10 flex items-center justify-center mb-4">
                  <CheckCircle className="h-6 w-6 text-brand-purple" />
                </div>
                <h3 className="font-semibold text-lg mb-2 text-brand-blue-dark">
                  {t("gdprPage.howQuantifierHelps.features.consentManagement.title")}
                </h3>
                <p className="text-slate-600">
                  {t("gdprPage.howQuantifierHelps.features.consentManagement.description")}
                </p>
              </CardContent>
            </Card>
            <Card className="border-brand-gray-light bg-white hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="w-12 h-12 rounded-full bg-brand-mint flex items-center justify-center mb-4">
                  <UserX className="h-6 w-6 text-brand-blue-dark" />
                </div>
                <h3 className="font-semibold text-lg mb-2 text-brand-blue-dark">
                  {t("gdprPage.howQuantifierHelps.features.dsarAutomation.title")}
                </h3>
                <p className="text-slate-600">
                  {t("gdprPage.howQuantifierHelps.features.dsarAutomation.description")}
                </p>
              </CardContent>
            </Card>
            <Card className="border-brand-gray-light bg-white hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="w-12 h-12 rounded-full bg-brand-blue/10 flex items-center justify-center mb-4">
                  <FileSearch className="h-6 w-6 text-brand-blue" />
                </div>
                <h3 className="font-semibold text-lg mb-2 text-brand-blue-dark">
                  {t("gdprPage.howQuantifierHelps.features.dpiaTemplates.title")}
                </h3>
                <p className="text-slate-600">
                  {t("gdprPage.howQuantifierHelps.features.dpiaTemplates.description")}
                </p>
              </CardContent>
            </Card>
            <Card className="border-brand-gray-light bg-white hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mb-4">
                  <Bell className="h-6 w-6 text-red-600" />
                </div>
                <h3 className="font-semibold text-lg mb-2 text-brand-blue-dark">
                  {t("gdprPage.howQuantifierHelps.features.breachManagement.title")}
                </h3>
                <p className="text-slate-600">
                  {t("gdprPage.howQuantifierHelps.features.breachManagement.description")}
                </p>
              </CardContent>
            </Card>
            <Card className="border-brand-gray-light bg-white hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="w-12 h-12 rounded-full bg-brand-purple/10 flex items-center justify-center mb-4">
                  <ClipboardCheck className="h-6 w-6 text-brand-purple" />
                </div>
                <h3 className="font-semibold text-lg mb-2 text-brand-blue-dark">
                  {t("gdprPage.howQuantifierHelps.features.auditReadiness.title")}
                </h3>
                <p className="text-slate-600">
                  {t("gdprPage.howQuantifierHelps.features.auditReadiness.description")}
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* AI-Native GDPR Module */}
        <section className="mb-16">
          <div className="bg-brand-gray-light/30 p-8 rounded-2xl text-center">
            <Badge className="bg-brand-purple/10 text-brand-purple border-brand-purple/30 mb-4">
              <Sparkles className="h-4 w-4 mr-1" />
              {t("gdprPage.aiModule.badge")}
            </Badge>
            <h2 className="text-3xl font-bold text-brand-blue-dark mb-4">
              {t("gdprPage.aiModule.title")}
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              {t("gdprPage.aiModule.description")}
            </p>
          </div>
        </section>

        {/* Results Section */}
        <section className="mb-16">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-brand-blue-dark mb-4">
              {t("gdprPage.results.title")}
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              {t("gdprPage.results.description")}
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <Card className="border-brand-gray-light bg-white text-center p-6">
              <CardContent className="pt-4">
                <div className="text-4xl font-bold text-brand-blue mb-2">
                  {t("gdprPage.results.metrics.coverage.value")}
                </div>
                <p className="text-slate-600 font-medium">
                  {t("gdprPage.results.metrics.coverage.label")}
                </p>
              </CardContent>
            </Card>
            <Card className="border-brand-gray-light bg-white text-center p-6">
              <CardContent className="pt-4">
                <div className="text-4xl font-bold text-brand-purple mb-2">
                  {t("gdprPage.results.metrics.dsar.value")}
                </div>
                <p className="text-slate-600 font-medium">
                  {t("gdprPage.results.metrics.dsar.label")}
                </p>
              </CardContent>
            </Card>
            <Card className="border-brand-gray-light bg-white text-center p-6">
              <CardContent className="pt-4">
                <div className="text-4xl font-bold text-brand-blue-dark mb-2">
                  {t("gdprPage.results.metrics.monitoring.value")}
                </div>
                <p className="text-slate-600 font-medium">
                  {t("gdprPage.results.metrics.monitoring.label")}
                </p>
              </CardContent>
            </Card>
            <Card className="border-brand-gray-light bg-white text-center p-6">
              <CardContent className="pt-4">
                <div className="text-4xl font-bold text-brand-blue mb-2">
                  {t("gdprPage.results.metrics.reduction.value")}
                </div>
                <p className="text-slate-600 font-medium">
                  {t("gdprPage.results.metrics.reduction.label")}
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* For Whom Section */}
        <section className="mb-16">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-brand-blue-dark mb-4">
              {t("gdprPage.forWhom.title")}
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              {t("gdprPage.forWhom.subtitle")}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="border-brand-gray-light bg-white text-center p-6">
              <CardContent className="pt-4">
                <div className="mx-auto w-16 h-16 rounded-full bg-brand-blue/10 flex items-center justify-center mb-4">
                  <Shield className="h-8 w-8 text-brand-blue" />
                </div>
                <h3 className="font-semibold text-lg mb-2 text-brand-blue-dark">
                  {t("gdprPage.forWhom.personas.dpo.title")}
                </h3>
                <p className="text-slate-600 text-sm">
                  {t("gdprPage.forWhom.personas.dpo.description")}
                </p>
              </CardContent>
            </Card>
            <Card className="border-brand-gray-light bg-white text-center p-6">
              <CardContent className="pt-4">
                <div className="mx-auto w-16 h-16 rounded-full bg-brand-purple/10 flex items-center justify-center mb-4">
                  <Lock className="h-8 w-8 text-brand-purple" />
                </div>
                <h3 className="font-semibold text-lg mb-2 text-brand-blue-dark">
                  {t("gdprPage.forWhom.personas.ciso.title")}
                </h3>
                <p className="text-slate-600 text-sm">
                  {t("gdprPage.forWhom.personas.ciso.description")}
                </p>
              </CardContent>
            </Card>
            <Card className="border-brand-gray-light bg-white text-center p-6">
              <CardContent className="pt-4">
                <div className="mx-auto w-16 h-16 rounded-full bg-brand-mint flex items-center justify-center mb-4">
                  <Briefcase className="h-8 w-8 text-brand-blue-dark" />
                </div>
                <h3 className="font-semibold text-lg mb-2 text-brand-blue-dark">
                  {t("gdprPage.forWhom.personas.ceo.title")}
                </h3>
                <p className="text-slate-600 text-sm">
                  {t("gdprPage.forWhom.personas.ceo.description")}
                </p>
              </CardContent>
            </Card>
            <Card className="border-brand-gray-light bg-white text-center p-6">
              <CardContent className="pt-4">
                <div className="mx-auto w-16 h-16 rounded-full bg-brand-blue/10 flex items-center justify-center mb-4">
                  <Scale className="h-8 w-8 text-brand-blue" />
                </div>
                <h3 className="font-semibold text-lg mb-2 text-brand-blue-dark">
                  {t("gdprPage.forWhom.personas.legal.title")}
                </h3>
                <p className="text-slate-600 text-sm">
                  {t("gdprPage.forWhom.personas.legal.description")}
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Continuous GDPR Operations Section */}
        <section className="mb-16">
          <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-2xl p-8 md:p-12 text-white">
            <div className="flex flex-col lg:flex-row items-center gap-10">
              <div className="lg:w-1/2">
                <Badge className="bg-brand-purple/30 text-brand-purple border-brand-purple/50 mb-4">
                  {t("gdprPage.continuousCompliance.statusBadge")}
                </Badge>
                <h2 className="text-3xl font-bold mb-4">
                  {t("gdprPage.continuousCompliance.title")}
                </h2>
                <p className="text-lg opacity-90 mb-6">
                  {t("gdprPage.continuousCompliance.description")}
                </p>
                <form className="space-y-4">
                  <Input
                    placeholder={t("gdprPage.continuousCompliance.form.nameLabel")}
                    className="bg-white/10 border-white/30 text-white placeholder:text-white/60"
                  />
                  <Input
                    type="email"
                    placeholder={t("gdprPage.continuousCompliance.form.emailLabel")}
                    className="bg-white/10 border-white/30 text-white placeholder:text-white/60"
                  />
                  <Button className="w-full bg-brand-purple hover:bg-brand-purple/90">
                    {t("gdprPage.continuousCompliance.form.button")}
                  </Button>
                </form>
              </div>
              <div className="lg:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Card className="bg-white/10 border-white/20">
                  <CardContent className="pt-6">
                    <Activity className="h-8 w-8 text-brand-purple mb-3" />
                    <h3 className="font-semibold mb-2">
                      {t("gdprPage.continuousCompliance.features.monitoring.title")}
                    </h3>
                    <p className="text-sm opacity-80">
                      {t("gdprPage.continuousCompliance.features.monitoring.description")}
                    </p>
                  </CardContent>
                </Card>
                <Card className="bg-white/10 border-white/20">
                  <CardContent className="pt-6">
                    <CheckCircle className="h-8 w-8 text-brand-mint mb-3" />
                    <h3 className="font-semibold mb-2">
                      {t("gdprPage.continuousCompliance.features.consentTracking.title")}
                    </h3>
                    <p className="text-sm opacity-80">
                      {t("gdprPage.continuousCompliance.features.consentTracking.description")}
                    </p>
                  </CardContent>
                </Card>
                <Card className="bg-white/10 border-white/20">
                  <CardContent className="pt-6">
                    <Users className="h-8 w-8 text-brand-blue mb-3" />
                    <h3 className="font-semibold mb-2">
                      {t("gdprPage.continuousCompliance.features.dsarProcessing.title")}
                    </h3>
                    <p className="text-sm opacity-80">
                      {t("gdprPage.continuousCompliance.features.dsarProcessing.description")}
                    </p>
                  </CardContent>
                </Card>
                <Card className="bg-white/10 border-white/20">
                  <CardContent className="pt-6">
                    <Bell className="h-8 w-8 text-red-400 mb-3" />
                    <h3 className="font-semibold mb-2">
                      {t("gdprPage.continuousCompliance.features.breachNotification.title")}
                    </h3>
                    <p className="text-sm opacity-80">
                      {t("gdprPage.continuousCompliance.features.breachNotification.description")}
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-16">
          <FAQSection
            title={t("gdprPage.faq.title")}
            faqs={faqItems.map((item) => ({
              question: item.question,
              answer: item.answer,
            }))}
            pageUrl={`https://quantifier.io/${currentLocale}/frameworks/data-security/gdpr`}
          />
        </section>

        {/* Final CTA Section */}
        <section className="mb-16">
          <div className="bg-gradient-to-r from-brand-blue-dark to-brand-purple rounded-2xl p-8 md:p-12 text-white text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {t("gdprPage.finalCta.title")}
            </h2>
            <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
              {t("gdprPage.finalCta.description")}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button
                asChild
                size="lg"
                className="bg-white text-brand-blue-dark hover:bg-white/90 font-semibold"
              >
                <Link to={`/${currentLocale}/contact`}>
                  {t("gdprPage.finalCta.bookDemo")} <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white/10"
              >
                <Link to={`/${currentLocale}/plans`}>
                  {t("gdprPage.finalCta.seePricing")}
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </PageTemplate>
  );
};

export default Gdpr;
