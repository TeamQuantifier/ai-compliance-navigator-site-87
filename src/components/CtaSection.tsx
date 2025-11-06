
import { ArrowRight, Shield, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';

const CtaSection = () => {
  const { t, currentLocale } = useLanguage();
  return <section className="py-16 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-compliance-900 to-innovation-900 -z-10"></div>
      
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-white/5 rounded-full blur-3xl -z-10"></div>
      
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <Shield className="h-16 w-16 mx-auto mb-6 text-white/90" />
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-white">
            {t('cta.title')}
          </h2>
          
          <p className="text-lg md:text-xl text-white/80 mb-8 max-w-2xl mx-auto">
            {t('cta.subtitle')}
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <h3 className="text-xl font-semibold text-white mb-3">{t('cta.enterprise.title')}</h3>
              <p className="text-white/70 mb-4">{t('cta.enterprise.description')}</p>
              <div className="flex items-start mb-2">
                <CheckCircle className="h-5 w-5 text-compliance-300 mt-0.5 mr-2 flex-shrink-0" />
                <p className="text-white/80">{t('cta.enterprise.feature1')}</p>
              </div>
              <div className="flex items-start">
                <CheckCircle className="h-5 w-5 text-compliance-300 mt-0.5 mr-2 flex-shrink-0" />
                <p className="text-white/80">{t('cta.enterprise.feature2')}</p>
              </div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <h3 className="text-xl font-semibold text-white mb-3">{t('cta.midMarket.title')}</h3>
              <p className="text-white/70 mb-4">{t('cta.midMarket.description')}</p>
              <div className="flex items-start mb-2">
                <CheckCircle className="h-5 w-5 text-innovation-300 mt-0.5 mr-2 flex-shrink-0" />
                <p className="text-white/80">{t('cta.midMarket.feature1')}</p>
              </div>
              <div className="flex items-start">
                <CheckCircle className="h-5 w-5 text-innovation-300 mt-0.5 mr-2 flex-shrink-0" />
                <p className="text-white/80">{t('cta.midMarket.feature2')}</p>
              </div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <h3 className="text-xl font-semibold text-white mb-3">{t('cta.startups.title')}</h3>
              <p className="text-white/70 mb-4">{t('cta.startups.description')}</p>
              <div className="flex items-start mb-2">
                <CheckCircle className="h-5 w-5 text-compliance-300 mt-0.5 mr-2 flex-shrink-0" />
                <p className="text-white/80">{t('cta.startups.feature1')}</p>
              </div>
              <div className="flex items-start">
                <CheckCircle className="h-5 w-5 text-compliance-300 mt-0.5 mr-2 flex-shrink-0" />
                <p className="text-white/80">{t('cta.startups.feature2')}</p>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button asChild className="bg-white text-slate-900 hover:bg-white/90 px-8 py-6 text-lg" size="lg">
              <Link to={`/${currentLocale}/contact`}>{t('cta.requestDemo')}</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-white/20 px-8 py-6 text-lg group bg-gray-50 text-innovation-900">
              <Link to={`/${currentLocale}/plans`}>
                {t('cta.viewPricing')}
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>;
};
export default CtaSection;
