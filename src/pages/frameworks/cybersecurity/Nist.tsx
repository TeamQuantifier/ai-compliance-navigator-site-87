
import PageTemplate from '@/components/PageTemplate';
import { FileCheck, CheckCircle, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';

const Nist = () => {
  const { t, currentLocale } = useLanguage();
  
  return (
    <PageTemplate
      title={t('seo.frameworks.cybersecurity.nist.title')}
      description={t('seo.frameworks.cybersecurity.nist.description')}
    >
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <section className="mb-16">
          <div className="bg-gradient-to-r from-compliance-800 to-innovation-800 rounded-xl p-8 md:p-12 text-white flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-3/5">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                {t('nistPage.hero.title')}
              </h2>
              <p className="text-xl opacity-90 mb-6">
                {t('nistPage.hero.subtitle')}
              </p>
              <Button size="lg" className="bg-gradient-to-r from-compliance-600 to-innovation-600 hover:from-compliance-700 hover:to-innovation-700 text-white" asChild>
                <Link to={`/${currentLocale}/contact`}>
                  {t('nistPage.hero.button')} <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
            <div className="md:w-2/5">
              <img 
                src="/mockups/nist-framework-dashboard.png" 
                alt={t('nistPage.hero.dashboardAlt')}
                className="rounded-lg shadow-lg border border-white/20 w-full"
              />
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="mb-16">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="md:w-1/2">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-compliance-100 text-compliance-800 mb-4">
                <FileCheck className="w-5 h-5 mr-2" />
                <span className="font-medium">{t('nistPage.mainContent.badge')}</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold mb-4 gradient-heading">
                {t('nistPage.mainContent.title')}
              </h2>
              <p className="text-lg text-slate-700 mb-6">
                {t('nistPage.mainContent.description')}
              </p>
              
              <h4 className="font-semibold text-lg mb-3">{t('nistPage.mainContent.benefitsTitle')}</h4>
              <ul className="space-y-3 mb-6">
                {(t('nistPage.mainContent.benefits', { returnObjects: true }) as string[]).map((benefit, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-compliance-600 mt-1 mr-2 flex-shrink-0" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
              <Button className="group bg-gradient-to-r from-compliance-600 to-innovation-600 hover:from-compliance-700 hover:to-innovation-700 text-white" asChild>
                <Link to={`/${currentLocale}/contact`}>
                  {t('nistPage.mainContent.button')}
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>
            <div className="md:w-1/2">
              <Card className="border-compliance-100">
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl">{t('nistPage.mainContent.fiveFunctions.title')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-compliance-600 mt-1 mr-2 flex-shrink-0" />
                      <div>
                        <span className="font-medium">{t('nistPage.mainContent.fiveFunctions.identify.title')}</span>
                        <span className="text-slate-600 ml-1">{t('nistPage.mainContent.fiveFunctions.identify.description')}</span>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-compliance-600 mt-1 mr-2 flex-shrink-0" />
                      <div>
                        <span className="font-medium">{t('nistPage.mainContent.fiveFunctions.protect.title')}</span>
                        <span className="text-slate-600 ml-1">{t('nistPage.mainContent.fiveFunctions.protect.description')}</span>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-compliance-600 mt-1 mr-2 flex-shrink-0" />
                      <div>
                        <span className="font-medium">{t('nistPage.mainContent.fiveFunctions.detect.title')}</span>
                        <span className="text-slate-600 ml-1">{t('nistPage.mainContent.fiveFunctions.detect.description')}</span>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-compliance-600 mt-1 mr-2 flex-shrink-0" />
                      <div>
                        <span className="font-medium">{t('nistPage.mainContent.fiveFunctions.respond.title')}</span>
                        <span className="text-slate-600 ml-1">{t('nistPage.mainContent.fiveFunctions.respond.description')}</span>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-compliance-600 mt-1 mr-2 flex-shrink-0" />
                      <div>
                        <span className="font-medium">{t('nistPage.mainContent.fiveFunctions.recover.title')}</span>
                        <span className="text-slate-600 ml-1">{t('nistPage.mainContent.fiveFunctions.recover.description')}</span>
                      </div>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Platform Screenshot Section */}
        <section className="mb-16">
          <div className="bg-gradient-to-r from-compliance-100 to-slate-100 p-6 rounded-xl">
            <div className="flex flex-col items-center text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-compliance-900">
                {t('nistPage.platformScreenshots.title')}
              </h2>
              <p className="text-lg text-slate-700 max-w-2xl">
                {t('nistPage.platformScreenshots.description')}
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <img 
                src="/mockups/nist-functions-tracking.png" 
                alt={t('nistPage.platformScreenshots.functionsTrackingAlt')}
                className="rounded-lg shadow-lg border border-compliance-200 w-full object-cover h-72"
              />
              <img 
                src="/mockups/nist-risk-assessment.png" 
                alt={t('nistPage.platformScreenshots.riskAssessmentAlt')}
                className="rounded-lg shadow-lg border border-compliance-200 w-full object-cover h-72"
              />
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="mb-8">
          <div className="bg-gradient-to-r from-compliance-800 to-innovation-700 rounded-xl p-8 md:p-12 text-white">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                {t('nistPage.cta.title')}
              </h2>
              <p className="text-xl opacity-90 mb-8">
                {t('nistPage.cta.description')}
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button size="lg" className="bg-gradient-to-r from-compliance-600 to-innovation-600 hover:from-compliance-700 hover:to-innovation-700 text-white px-8" asChild>
                  <Link to={`/${currentLocale}/contact`}>
                    {t('nistPage.cta.bookDemo')} <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" className="border-white/20 text-white hover:bg-white/10" asChild>
                  <Link to={`/${currentLocale}/contact`}>
                    {t('nistPage.cta.watchTour')}
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </PageTemplate>
  );
};

export default Nist;
