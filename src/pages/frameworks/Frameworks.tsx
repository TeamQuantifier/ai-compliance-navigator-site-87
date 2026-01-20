import PageTemplate from '@/components/PageTemplate';
import { Shield, Lock, Network, FileCheck, ArrowRight, Star, Zap } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { LucideIcon } from 'lucide-react';

const Frameworks = () => {
  const { t, currentLocale } = useLanguage();
  
  // Popular frameworks with direct links - icons matched from HeroSection
  const popularFrameworks: {
    key: string;
    name: string;
    href: string;
    icon: LucideIcon;
    bgColor: string;
    iconColor: string;
  }[] = [
    {
      key: "nisII",
      name: "NIS II",
      href: `/${currentLocale}/frameworks/nis-ii`,
      icon: Network,
      bgColor: "bg-compliance-950",
      iconColor: "text-compliance-300"
    },
    {
      key: "iso27001",
      name: "ISO 27001",
      href: `/${currentLocale}/frameworks/iso-27001`,
      icon: Shield,
      bgColor: "bg-compliance-950",
      iconColor: "text-compliance-300"
    },
    {
      key: "soc2",
      name: "SOC 2",
      href: `/${currentLocale}/frameworks/soc`,
      icon: Lock,
      bgColor: "bg-innovation-950",
      iconColor: "text-innovation-300"
    },
    {
      key: "gdpr",
      name: "GDPR / RODO",
      href: `/${currentLocale}/frameworks/gdpr`,
      icon: FileCheck,
      bgColor: "bg-compliance-950",
      iconColor: "text-compliance-300"
    },
    {
      key: "nist",
      name: "NIST",
      href: `/${currentLocale}/frameworks/nist`,
      icon: Shield,
      bgColor: "bg-innovation-950",
      iconColor: "text-innovation-300"
    }
  ];

  // All frameworks organized by category
  const frameworksByCategory = [
    {
      categoryKey: "cybersecurity",
      frameworks: [
        { name: "NIS II", href: `/${currentLocale}/frameworks/nis-ii` },
        { name: "SOC I & SOC II", href: `/${currentLocale}/frameworks/soc` },
        { name: "NIST", href: `/${currentLocale}/frameworks/nist` }
      ]
    },
    {
      categoryKey: "informationSecurity",
      frameworks: [
        { name: "ISO 27001", href: `/${currentLocale}/frameworks/iso-27001` },
        { name: "ISO 9001", href: `/${currentLocale}/frameworks/iso-9001` }
      ]
    },
    {
      categoryKey: "dataSecurity",
      frameworks: [
        { name: "GDPR / RODO", href: `/${currentLocale}/frameworks/gdpr` },
        { name: "HIPAA", href: `/${currentLocale}/frameworks/hipaa` },
        { name: "CCPA", href: `/${currentLocale}/frameworks/ccpa` }
      ]
    },
    {
      categoryKey: "esg",
      href: `/${currentLocale}/frameworks/esg`,
      isCategory: true
    },
    {
      categoryKey: "environmental",
      href: `/${currentLocale}/frameworks/environmental`,
      isCategory: true
    },
    {
      categoryKey: "governance",
      href: `/${currentLocale}/frameworks/governance`,
      isCategory: true
    },
    {
      categoryKey: "productLevel",
      href: `/${currentLocale}/frameworks/product-level`,
      isCategory: true
    }
  ];

  return (
    <PageTemplate
      title={t('seo.frameworks.title')}
      description={t('seo.frameworks.description')}
    >
      {/* Popular Frameworks Section */}
      <div className="mb-16">
        <div className="flex items-center gap-2 mb-6">
          <Star className="h-6 w-6 text-amber-500 fill-amber-500" />
          <h2 className="text-2xl font-bold text-slate-900">
            {t('frameworksPage.popular.title')}
          </h2>
        </div>
        <p className="text-slate-600 mb-8 max-w-3xl">
          {t('frameworksPage.popular.description')}
        </p>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {popularFrameworks.map((framework) => {
            const IconComponent = framework.icon;
            return (
              <Link 
                key={framework.key} 
                to={framework.href}
                className="group"
              >
                <Card className="p-4 h-full border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                  <div className={`w-12 h-12 rounded-full ${framework.bgColor} flex items-center justify-center mb-3 shadow-lg shadow-black/20 border border-slate-700/30`}>
                    <IconComponent className={`h-6 w-6 ${framework.iconColor}`} />
                  </div>
                  <h3 className="font-semibold text-slate-900 group-hover:text-primary transition-colors">
                    {framework.name}
                  </h3>
                  <div className="flex items-center gap-1 mt-2 text-sm text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                    <span>{t('frameworksPage.labels.learnMore')}</span>
                    <ArrowRight className="h-3 w-3" />
                  </div>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>

      {/* All Frameworks by Category */}
      <div className="mb-16">
        <div className="flex items-center gap-2 mb-6">
          <Zap className="h-6 w-6 text-primary" />
          <h2 className="text-2xl font-bold text-slate-900">
            {t('frameworksPage.allFrameworks.title')}
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {frameworksByCategory.map((category) => (
            <Card key={category.categoryKey} className="p-6 border border-slate-200 hover:border-primary/30 transition-colors">
              <h3 className="text-lg font-semibold mb-4 text-slate-900">
                {t(`frameworksPage.categories.${category.categoryKey}.title`)}
              </h3>
              <p className="text-sm text-slate-600 mb-4">
                {t(`frameworksPage.categories.${category.categoryKey}.description`)}
              </p>
              
              {category.isCategory ? (
                <Link to={category.href!}>
                  <Button variant="outline" className="w-full group" size="sm">
                    {t('frameworksPage.labels.exploreButton')}
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
              ) : (
                <div className="space-y-2">
                  {category.frameworks?.map((framework) => (
                    <Link 
                      key={framework.name} 
                      to={framework.href}
                      className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-50 group transition-colors"
                    >
                      <span className="text-slate-700 group-hover:text-primary transition-colors">
                        {framework.name}
                      </span>
                      <ArrowRight className="h-4 w-4 text-slate-400 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                    </Link>
                  ))}
                </div>
              )}
            </Card>
          ))}
        </div>
      </div>
      
      {/* GRC Platform Link */}
      <div className="mt-12 bg-gradient-to-r from-compliance-50 to-innovation-50 rounded-xl p-6 border border-compliance-100">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-semibold text-slate-900 mb-1">{t('frameworksPage.grcPlatform.title')}</h3>
            <p className="text-slate-600">{t('frameworksPage.grcPlatform.description')}</p>
          </div>
          <Button className="bg-gradient-to-r from-compliance-600 to-innovation-600 hover:from-compliance-700 hover:to-innovation-700 text-white whitespace-nowrap group" asChild>
            <Link to={`/${currentLocale}/grc-platform`}>
              {t('frameworksPage.grcPlatform.button')}
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </div>

      <div className="mt-16 text-center">
        <h2 className="text-2xl font-bold mb-4 gradient-heading">
          {t('frameworksPage.cta.title')}
        </h2>
        <p className="text-lg text-slate-600 mb-6 max-w-2xl mx-auto">
          {t('frameworksPage.cta.description')}
        </p>
            <Button className="group" asChild>
              <Link to={`/${currentLocale}/contact`}>
                {t('frameworksPage.cta.button')}
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
      </div>
    </PageTemplate>
  );
};

export default Frameworks;
