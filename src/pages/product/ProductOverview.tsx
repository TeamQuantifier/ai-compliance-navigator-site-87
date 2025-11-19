
import { ArrowRight, Shield, CheckCircle, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';

const ProductOverview = () => {
  const { t, currentLocale } = useLanguage();
  
  const features = [
    {
      title: t('product.overview.mainFeatures.title'),
      href: "/product/features",
      description: t('product.overview.mainFeatures.description')
    },
    {
      title: t('product.overview.aiOfficer.title'),
      href: "/product/ai-compliance-officer",
      description: t('product.overview.aiOfficer.description')
    },
    {
      title: t('product.overview.taskManagement.title'),
      href: "/product/task-data-management",
      description: t('product.overview.taskManagement.description')
    },
    {
      title: t('product.overview.documents.title'),
      href: "/product/documents-management",
      description: t('product.overview.documents.description')
    },
    {
      title: t('product.overview.valueChain.title'),
      href: "/product/value-chain",
      description: t('product.overview.valueChain.description')
    },
    {
      title: t('product.overview.riskAssessment.title'),
      href: "/product/risk-assessment",
      description: t('product.overview.riskAssessment.description')
    },
    {
      title: t('product.overview.analytics.title'),
      href: "/product/analytics-dashboards",
      description: t('product.overview.analytics.description')
    },
    {
      title: t('product.overview.apiIntegrations.title'),
      href: "/product/api-integrations",
      description: t('product.overview.apiIntegrations.description')
    }
  ];

  return (
    <div className="min-h-screen">
      <div className="bg-gradient-to-b from-compliance-50 to-white pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 gradient-heading">
              {t('product.overview.title')}
            </h1>
            <p className="text-xl text-slate-700 mb-8">
              {t('product.overview.subtitle')}
            </p>
            <Button className="group" asChild>
              <Link to={`/${currentLocale}/contact`}>
                {t('product.overview.requestDemo')}
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold mb-6 gradient-heading">
            {t('product.overview.featuresTitle')}
          </h2>
          <p className="text-lg text-slate-700 mb-8">
            {t('product.overview.featuresSubtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature) => (
            <div key={feature.title} className="border border-slate-200 rounded-lg p-6 hover:shadow-md transition-shadow">
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-slate-600 mb-4">{feature.description}</p>
              <Link to={feature.href} className="flex items-center text-primary font-medium hover:text-primary/80 transition-colors">
                {t('product.overview.learnMore')} <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductOverview;
