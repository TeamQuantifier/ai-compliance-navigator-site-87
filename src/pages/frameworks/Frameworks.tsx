import PageTemplate from '@/components/PageTemplate';
import { Shield, ArrowRight } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';

const Frameworks = () => {
  const { t, currentLocale } = useLanguage();
  
  const frameworkCategories = [
    {
      key: "cybersecurity",
      href: `/${currentLocale}/frameworks/cybersecurity`,
      color: "bg-compliance-50"
    },
    {
      key: "informationSecurity",
      href: `/${currentLocale}/frameworks/information-security`,
      color: "bg-innovation-50"
    },
    {
      key: "dataSecurity",
      href: `/${currentLocale}/frameworks/data-security`,
      color: "bg-compliance-50"
    },
    {
      key: "esg",
      href: `/${currentLocale}/frameworks/esg`,
      color: "bg-innovation-50"
    },
    {
      key: "environmental",
      href: `/${currentLocale}/frameworks/environmental`,
      color: "bg-compliance-50"
    },
    {
      key: "governance",
      href: `/${currentLocale}/frameworks/governance`,
      color: "bg-innovation-50"
    },
    {
      key: "productLevel",
      href: `/${currentLocale}/frameworks/product-level`,
      color: "bg-compliance-50"
    }
  ];

  return (
    <PageTemplate
      title={t('frameworksPage.hero.title')}
      description={t('frameworksPage.hero.description')}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {frameworkCategories.map((category) => (
          <Card key={category.key} className={`p-6 border border-slate-200 card-hover ${category.color}`}>
            <h3 className="text-xl font-semibold mb-3">
              {t(`frameworksPage.categories.${category.key}.title`)}
            </h3>
            <p className="text-slate-600 mb-4">
              {t(`frameworksPage.categories.${category.key}.description`)}
            </p>
            <div className="mb-4">
              <h4 className="font-medium text-slate-800 mb-2">
                {t('frameworksPage.labels.supportedFrameworks')}
              </h4>
              <ul className="space-y-1 pl-5 list-disc text-slate-600">
                {(t(`frameworksPage.categories.${category.key}.items`, { returnObjects: true }) as string[]).map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <Link to={category.href}>
              <Button variant="outline" className="w-full group" size="sm">
                {t('frameworksPage.labels.exploreButton')} {t(`frameworksPage.categories.${category.key}.title`)}
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </Card>
        ))}
      </div>
      
      <div className="mt-16 text-center">
        <h2 className="text-2xl font-bold mb-4 gradient-heading">
          {t('frameworksPage.cta.title')}
        </h2>
        <p className="text-lg text-slate-600 mb-6 max-w-2xl mx-auto">
          {t('frameworksPage.cta.description')}
        </p>
        <Button className="group">
          {t('frameworksPage.cta.button')}
          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Button>
      </div>
    </PageTemplate>
  );
};

export default Frameworks;
