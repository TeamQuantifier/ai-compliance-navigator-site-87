import { useLanguage } from "@/contexts/LanguageContext";
import PageTemplate from "@/components/PageTemplate";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import FAQSection from "@/components/seo/FAQSection";
import { Link } from "react-router-dom";
import {
  Shield,
  FileText,
  Clock,
  Euro,
  CheckCircle,
  AlertTriangle,
  Building2,
  TrendingUp,
  Briefcase,
  Scale,
  Zap,
  Network,
  Activity,
  Bell,
  ClipboardCheck,
  Search,
  Settings,
  Sparkles,
} from "lucide-react";

const Dora = () => {
  const { t, currentLocale } = useLanguage();

  const getArrayTranslation = (key: string): string[] => {
    const value = t(key);
    if (Array.isArray(value)) return value;
    if (typeof value === "string") return [value];
    return [];
  };

  const getObjectArrayTranslation = (
    key: string
  ): Array<{ question: string; answer: string }> => {
    const value = t(key);
    if (Array.isArray(value)) return value;
    return [];
  };

  const faqItems = getObjectArrayTranslation("doraPage.faq.items");

  return (
    <PageTemplate
      title={t("doraPage.meta.title")}
      description={t("doraPage.meta.description")}
    >
      <div className="container mx-auto px-4 py-8 md:py-16">
        {/* Hero Section */}
        <section className="mb-20">
          <div className="bg-gradient-to-r from-brand-blue-dark via-brand-blue to-brand-purple rounded-2xl p-8 md:p-16 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-white/5"></div>
            <div className="relative z-10">
              <div className="flex flex-col lg:flex-row items-start gap-12">
                {/* Left side - Title and description */}
                <div className="lg:w-1/2">
                  <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6">
                    <Shield className="w-5 h-5 mr-2" />
                    <span className="text-sm font-medium">
                      {t("doraPage.hero.badge")}
                    </span>
                  </div>
                  <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">
                    {t("doraPage.hero.title")}
                  </h1>
                  <p className="text-xl md:text-2xl opacity-90 mb-8 text-white/80">
                    {t("doraPage.hero.subtitle")}
                  </p>
                </div>

                {/* Right side - Demo form */}
                <div className="lg:w-1/2">
                  <div className="relative bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                    <h3 className="text-xl font-semibold mb-4 text-white">
                      {t("doraPage.hero.formTitle")}
                    </h3>
                    <form className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-white/80 mb-1">
                          {t("doraPage.hero.nameLabel")}
                        </label>
                        <Input
                          type="text"
                          placeholder={t("doraPage.hero.namePlaceholder")}
                          className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-white/80 mb-1">
                          {t("doraPage.hero.emailLabel")}
                        </label>
                        <Input
                          type="email"
                          placeholder={t("doraPage.hero.emailPlaceholder")}
                          className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                        />
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="marketing"
                          className="border-white/40 data-[state=checked]:bg-white data-[state=checked]:text-brand-blue-dark"
                        />
                        <label
                          htmlFor="marketing"
                          className="text-sm text-white/70"
                        >
                          {t("doraPage.hero.marketingConsent")}
                        </label>
                      </div>
                      <Button className="w-full bg-white text-brand-blue-dark hover:bg-white/90 font-semibold">
                        {t("doraPage.hero.requestDemoButton")}
                      </Button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why DORA Is Critical Section */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-brand-blue-dark mb-4">
              {t("doraPage.whyCritical.title")}
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              {t("doraPage.whyCritical.subtitle")}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-brand-gray-light hover:border-brand-purple/30 transition-colors">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 rounded-full bg-brand-purple/10 flex items-center justify-center mx-auto mb-6">
                  <Euro className="w-8 h-8 text-brand-purple" />
                </div>
                <div className="text-4xl font-bold text-brand-blue-dark mb-2">
                  {t("doraPage.whyCritical.cards.penalties.stat")}
                </div>
                <h3 className="text-xl font-semibold text-brand-blue-dark mb-2">
                  {t("doraPage.whyCritical.cards.penalties.title")}
                </h3>
                <p className="text-muted-foreground">
                  {t("doraPage.whyCritical.cards.penalties.description")}
                </p>
              </CardContent>
            </Card>

            <Card className="border-brand-gray-light hover:border-brand-purple/30 transition-colors">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 rounded-full bg-brand-blue/10 flex items-center justify-center mx-auto mb-6">
                  <FileText className="w-8 h-8 text-brand-blue" />
                </div>
                <div className="text-4xl font-bold text-brand-blue-dark mb-2">
                  {t("doraPage.whyCritical.cards.complexity.stat")}
                </div>
                <h3 className="text-xl font-semibold text-brand-blue-dark mb-2">
                  {t("doraPage.whyCritical.cards.complexity.title")}
                </h3>
                <p className="text-muted-foreground">
                  {t("doraPage.whyCritical.cards.complexity.description")}
                </p>
              </CardContent>
            </Card>

            <Card className="border-brand-gray-light hover:border-brand-purple/30 transition-colors">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 rounded-full bg-brand-mint flex items-center justify-center mx-auto mb-6">
                  <Clock className="w-8 h-8 text-brand-blue-dark" />
                </div>
                <div className="text-4xl font-bold text-brand-blue-dark mb-2">
                  {t("doraPage.whyCritical.cards.deadline.stat")}
                </div>
                <h3 className="text-xl font-semibold text-brand-blue-dark mb-2">
                  {t("doraPage.whyCritical.cards.deadline.title")}
                </h3>
                <p className="text-muted-foreground">
                  {t("doraPage.whyCritical.cards.deadline.description")}
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Understanding DORA Section */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-brand-blue-dark mb-4">
              {t("doraPage.understanding.title")}
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              {t("doraPage.understanding.description")}
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <Card className="border-brand-gray-light">
              <CardContent className="p-8">
                <div className="w-12 h-12 rounded-lg bg-brand-purple/10 flex items-center justify-center mb-6">
                  <Shield className="w-6 h-6 text-brand-purple" />
                </div>
                <h3 className="text-xl font-semibold text-brand-blue-dark mb-4">
                  {t("doraPage.understanding.whatIs.title")}
                </h3>
                <p className="text-muted-foreground">
                  {t("doraPage.understanding.whatIs.description")}
                </p>
              </CardContent>
            </Card>

            <Card className="border-brand-gray-light">
              <CardContent className="p-8">
                <div className="w-12 h-12 rounded-lg bg-brand-blue/10 flex items-center justify-center mb-6">
                  <Building2 className="w-6 h-6 text-brand-blue" />
                </div>
                <h3 className="text-xl font-semibold text-brand-blue-dark mb-4">
                  {t("doraPage.understanding.whoMustComply.title")}
                </h3>
                <ul className="space-y-2">
                  {getArrayTranslation(
                    "doraPage.understanding.whoMustComply.items"
                  ).map((item, index) => (
                    <li
                      key={index}
                      className="flex items-center text-muted-foreground"
                    >
                      <CheckCircle className="w-4 h-4 text-brand-purple mr-2 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="border-brand-gray-light">
              <CardContent className="p-8">
                <div className="w-12 h-12 rounded-lg bg-brand-mint flex items-center justify-center mb-6">
                  <FileText className="w-6 h-6 text-brand-blue-dark" />
                </div>
                <h3 className="text-xl font-semibold text-brand-blue-dark mb-4">
                  {t("doraPage.understanding.pillars.title")}
                </h3>
                <ul className="space-y-2">
                  {getArrayTranslation(
                    "doraPage.understanding.pillars.items"
                  ).map((item, index) => (
                    <li
                      key={index}
                      className="flex items-center text-muted-foreground"
                    >
                      <span className="w-6 h-6 rounded-full bg-brand-purple/10 text-brand-purple text-xs font-semibold flex items-center justify-center mr-2 flex-shrink-0">
                        {index + 1}
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Why DORA Matters for Leadership Section */}
        <section className="mb-20">
          <div className="bg-gradient-to-r from-brand-blue-dark to-brand-purple rounded-2xl p-8 md:p-12 text-white">
            <div className="max-w-4xl mx-auto">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6">
                <Briefcase className="w-5 h-5 mr-2" />
                <span className="text-sm font-medium">
                  {t("doraPage.whyLeadership.badge")}
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                {t("doraPage.whyLeadership.title")}
              </h2>
              <p className="text-lg opacity-90 mb-8">
                {t("doraPage.whyLeadership.description")}
              </p>

              <div className="grid md:grid-cols-2 gap-6">
                {[
                  {
                    icon: AlertTriangle,
                    title: t("doraPage.whyLeadership.points.0.title"),
                    description: t(
                      "doraPage.whyLeadership.points.0.description"
                    ),
                  },
                  {
                    icon: Activity,
                    title: t("doraPage.whyLeadership.points.1.title"),
                    description: t(
                      "doraPage.whyLeadership.points.1.description"
                    ),
                  },
                  {
                    icon: Network,
                    title: t("doraPage.whyLeadership.points.2.title"),
                    description: t(
                      "doraPage.whyLeadership.points.2.description"
                    ),
                  },
                  {
                    icon: TrendingUp,
                    title: t("doraPage.whyLeadership.points.3.title"),
                    description: t(
                      "doraPage.whyLeadership.points.3.description"
                    ),
                  },
                ].map((point, index) => (
                  <div
                    key={index}
                    className="flex items-start space-x-4 bg-white/10 rounded-xl p-6"
                  >
                    <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center flex-shrink-0">
                      <point.icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white mb-1">
                        {point.title}
                      </h3>
                      <p className="text-white/70 text-sm">
                        {point.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* How Quantifier Helps Section */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-brand-blue-dark mb-4">
              {t("doraPage.howQuantifierHelps.title")}
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              {t("doraPage.howQuantifierHelps.description")}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Search,
                key: "ictRisk",
              },
              {
                icon: Bell,
                key: "incidentResponse",
              },
              {
                icon: Activity,
                key: "resilienceTesting",
              },
              {
                icon: Network,
                key: "thirdPartyRisk",
              },
              {
                icon: Settings,
                key: "policyManagement",
              },
              {
                icon: ClipboardCheck,
                key: "auditReadiness",
              },
            ].map((feature, index) => (
              <Card
                key={index}
                className="border-brand-gray-light hover:border-brand-purple/30 transition-colors group"
              >
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-lg bg-brand-purple/10 flex items-center justify-center mb-4 group-hover:bg-brand-purple/20 transition-colors">
                    <feature.icon className="w-6 h-6 text-brand-purple" />
                  </div>
                  <h3 className="text-lg font-semibold text-brand-blue-dark mb-2">
                    {t(`doraPage.howQuantifierHelps.features.${feature.key}.title`)}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {t(`doraPage.howQuantifierHelps.features.${feature.key}.description`)}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* AI-Native DORA Module Section */}
        <section className="mb-20">
          <div className="bg-brand-mint/30 rounded-2xl p-8 md:p-12">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="flex-1">
                <div className="inline-flex items-center px-4 py-2 rounded-full bg-brand-purple/10 border border-brand-purple/20 mb-6">
                  <Sparkles className="w-5 h-5 mr-2 text-brand-purple" />
                  <span className="text-sm font-medium text-brand-purple">
                    {t("doraPage.aiModule.badge")}
                  </span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-brand-blue-dark mb-4">
                  {t("doraPage.aiModule.title")}
                </h2>
                <p className="text-lg text-muted-foreground">
                  {t("doraPage.aiModule.description")}
                </p>
              </div>
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-brand-purple to-brand-blue flex items-center justify-center">
                <Zap className="w-16 h-16 text-white" />
              </div>
            </div>
          </div>
        </section>

        {/* Results Section */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-brand-blue-dark mb-4">
              {t("doraPage.results.title")}
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              {t("doraPage.results.description")}
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                value: t("doraPage.results.metrics.compliance"),
                label: t("doraPage.results.metrics.complianceLabel"),
                color: "text-brand-purple",
              },
              {
                value: t("doraPage.results.metrics.pillars"),
                label: t("doraPage.results.metrics.pillarsLabel"),
                color: "text-brand-blue",
              },
              {
                value: t("doraPage.results.metrics.monitoring"),
                label: t("doraPage.results.metrics.monitoringLabel"),
                color: "text-brand-blue-dark",
              },
              {
                value: t("doraPage.results.metrics.reduction"),
                label: t("doraPage.results.metrics.reductionLabel"),
                color: "text-brand-purple",
              },
            ].map((metric, index) => (
              <Card
                key={index}
                className="border-brand-gray-light text-center"
              >
                <CardContent className="p-6">
                  <div className={`text-4xl md:text-5xl font-bold ${metric.color} mb-2`}>
                    {metric.value}
                  </div>
                  <p className="text-muted-foreground text-sm">
                    {metric.label}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* For Whom Section */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-brand-blue-dark mb-4">
              {t("doraPage.forWhom.title")}
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              {t("doraPage.forWhom.subtitle")}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: TrendingUp,
                key: "cro",
              },
              {
                icon: Shield,
                key: "ciso",
              },
              {
                icon: Briefcase,
                key: "ceo",
              },
              {
                icon: Scale,
                key: "compliance",
              },
            ].map((persona, index) => (
              <Card
                key={index}
                className="border-brand-gray-light hover:border-brand-purple/30 transition-colors text-center"
              >
                <CardContent className="p-6">
                  <div className="w-16 h-16 rounded-full bg-brand-purple/10 flex items-center justify-center mx-auto mb-4">
                    <persona.icon className="w-8 h-8 text-brand-purple" />
                  </div>
                  <h3 className="text-lg font-semibold text-brand-blue-dark mb-2">
                    {t(`doraPage.forWhom.personas.${persona.key}.title`)}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {t(`doraPage.forWhom.personas.${persona.key}.description`)}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Continuous DORA Operations Section */}
        <section className="mb-20">
          <div className="bg-brand-gray-light/50 rounded-2xl p-8 md:p-12">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-brand-blue-dark mb-4">
                {t("doraPage.continuousCompliance.title")}
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                {t("doraPage.continuousCompliance.description")}
              </p>
            </div>

            <div className="flex flex-col lg:flex-row gap-8">
              {/* Form */}
              <div className="lg:w-1/3">
                <Card className="border-brand-gray-light">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold text-brand-blue-dark mb-4">
                      {t("doraPage.continuousCompliance.form.title")}
                    </h3>
                    <form className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-muted-foreground mb-1">
                          {t("doraPage.continuousCompliance.form.nameLabel")}
                        </label>
                        <Input
                          type="text"
                          placeholder={t(
                            "doraPage.continuousCompliance.form.namePlaceholder"
                          )}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-muted-foreground mb-1">
                          {t("doraPage.continuousCompliance.form.emailLabel")}
                        </label>
                        <Input
                          type="email"
                          placeholder={t(
                            "doraPage.continuousCompliance.form.emailPlaceholder"
                          )}
                        />
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="marketing2" />
                        <label
                          htmlFor="marketing2"
                          className="text-sm text-muted-foreground"
                        >
                          {t(
                            "doraPage.continuousCompliance.form.marketingConsent"
                          )}
                        </label>
                      </div>
                      <Button className="w-full bg-brand-purple hover:bg-brand-purple/90 text-white">
                        {t("doraPage.continuousCompliance.form.submitButton")}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>

              {/* Features Grid */}
              <div className="lg:w-2/3">
                <div className="grid md:grid-cols-2 gap-6">
                  {[
                    {
                      icon: Activity,
                      key: "monitoring",
                    },
                    {
                      icon: Search,
                      key: "riskAssessment",
                    },
                    {
                      icon: Bell,
                      key: "incidentReporting",
                    },
                    {
                      icon: Network,
                      key: "thirdPartyOversight",
                    },
                  ].map((feature, index) => (
                    <Card key={index} className="border-brand-gray-light">
                      <CardContent className="p-6">
                        <div className="w-10 h-10 rounded-lg bg-brand-blue/10 flex items-center justify-center mb-4">
                          <feature.icon className="w-5 h-5 text-brand-blue" />
                        </div>
                        <h3 className="font-semibold text-brand-blue-dark mb-2">
                          {t(
                            `doraPage.continuousCompliance.features.${feature.key}.title`
                          )}
                        </h3>
                        <p className="text-muted-foreground text-sm">
                          {t(
                            `doraPage.continuousCompliance.features.${feature.key}.description`
                          )}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <div className="mt-6 flex justify-center">
                  <div className="inline-flex items-center px-4 py-2 rounded-full bg-brand-mint border border-brand-purple/20">
                    <CheckCircle className="w-5 h-5 mr-2 text-brand-purple" />
                    <span className="text-sm font-medium text-brand-blue-dark">
                      {t("doraPage.continuousCompliance.statusBadge")}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-20">
          <FAQSection
            title={t("doraPage.faq.title")}
            faqs={faqItems.map((item) => ({
              question: item.question,
              answer: item.answer,
            }))}
            pageUrl={`https://quantifier.ai/${currentLocale}/frameworks/dora`}
          />
        </section>

        {/* Final CTA Section */}
        <section>
          <div className="bg-gradient-to-r from-brand-blue-dark to-brand-purple rounded-2xl p-8 md:p-16 text-white text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {t("doraPage.finalCta.title")}
            </h2>
            <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
              {t("doraPage.finalCta.description")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-white text-brand-blue-dark hover:bg-white/90 font-semibold"
              >
                <Link to={`/${currentLocale}/contact`}>
                  {t("doraPage.finalCta.bookDemo")}
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white/20 bg-gray-50 text-[#324691] hover:bg-white"
              >
                <Link to={`/${currentLocale}/plans`}>
                  {t("doraPage.finalCta.seePricing")}
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </PageTemplate>
  );
};

export default Dora;
