import logosGrid from '@/assets/logos-grid.png';
import gs1LogoNew from '@/assets/gs1-logo-new.png';
import envirlyLogo from '@/assets/envirly-logo.png';
import PageTemplate from '@/components/PageTemplate';
import { Check, ArrowRight, Globe, MessageSquare, Sparkles, Users, BarChart, Gift, MapPin, Building, Handshake, Leaf, FileCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import PartnerMap from '@/components/PartnerMap';
import { Separator } from '@/components/ui/separator';
import CtaSection from '@/components/CtaSection';
import { useLanguage } from '@/contexts/LanguageContext';
import { Link } from 'react-router-dom';

const Partners = () => {
  const { t, currentLocale } = useLanguage();
  
  const partnerBenefits = [{
    title: t('partners.benefits.expand.title'),
    description: t('partners.benefits.expand.description'),
    icon: <Sparkles className="h-10 w-10 text-primary" />
  }, {
    title: t('partners.benefits.access.title'),
    description: t('partners.benefits.access.description'),
    icon: <Gift className="h-10 w-10 text-primary" />
  }, {
    title: t('partners.benefits.comarket.title'),
    description: t('partners.benefits.comarket.description'),
    icon: <Users className="h-10 w-10 text-primary" />
  }, {
    title: t('partners.benefits.value.title'),
    description: t('partners.benefits.value.description'),
    icon: <BarChart className="h-10 w-10 text-primary" />
  }];
  
  const partnerTypes = [{
    name: t('partners.types.consulting'),
    icon: <Building className="h-6 w-6 text-compliance-600" />
  }, {
    name: t('partners.types.audit'),
    icon: <Check className="h-6 w-6 text-compliance-600" />
  }, {
    name: t('partners.types.technology'),
    icon: <Sparkles className="h-6 w-6 text-compliance-600" />
  }, {
    name: t('partners.types.financial'),
    icon: <Building className="h-6 w-6 text-compliance-600" />
  }, {
    name: t('partners.types.ngos'),
    icon: <Globe className="h-6 w-6 text-compliance-600" />
  }];
  
  return <PageTemplate title={t('seo.partners.title')} description={t('seo.partners.description')}>
      <div className="max-w-4xl mx-auto">
        <section className="mb-12">
          <div className="bg-gradient-to-r from-compliance-50 to-blue-50 p-8 rounded-xl mb-10">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-compliance-100 text-compliance-800 mb-6">
              <Handshake className="w-5 h-5 mr-2" />
              <span className="font-medium">{t('partners.network.badge')}</span>
            </div>
            
            <h2 className="text-2xl font-bold mb-4 gradient-heading">{t('partners.network.heading')}</h2>
            
            <div className="prose prose-lg max-w-none text-slate-700">
              <p className="text-lg mb-4">
                {t('partners.network.intro1')}
              </p>
              
              <p className="text-lg">
                {t('partners.network.intro2')}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 mt-8">
            {partnerTypes.map((type, idx) => <div key={idx} className="flex flex-col items-center p-4 bg-white rounded-lg shadow-sm border border-slate-100 hover:shadow-md transition-all">
                {type.icon}
                <p className="mt-2 text-sm font-medium text-slate-700 text-center">{type.name}</p>
              </div>)}
          </div>

          {/* GS1 Polska highlight */}
          <div className="mt-10">
            <Link to={`/${currentLocale}/partners/gs1-polska`} className="block group">
              <Card className="overflow-hidden border-amber-200/60 bg-gradient-to-br from-amber-50 via-stone-50 to-white hover:shadow-xl transition-all">
                <div className="flex flex-col md:flex-row">
                  {/* Left: logo + branding */}
                  <div className="md:w-2/5 bg-white p-6 flex items-center justify-center gap-3">
                    <img src={gs1LogoNew} alt="GS1 Polska logo" className="h-20 object-contain" />
                    <span className="text-slate-400 font-medium text-2xl">×</span>
                    <img src={envirlyLogo} alt="Envirly by Quantifier logo" className="h-14 object-contain" />
                  </div>
                  
                  {/* Right: content */}
                  <div className="md:w-2/3 p-6 md:p-8">
                    <h3 className="text-xl font-bold text-foreground mb-3">{t('partners.gs1.headline')}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-5">
                      {t('partners.gs1.description')}
                    </p>
                    
                    {/* Stats badges */}
                    <div className="flex flex-wrap gap-3 mb-5">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-100 text-amber-800 text-xs font-medium">
                        <FileCheck className="h-3.5 w-3.5" />
                        {t('partners.gs1.dpp')}
                      </span>
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-green-100 text-green-800 text-xs font-medium">
                        <Leaf className="h-3.5 w-3.5" />
                        {t('partners.gs1.ghg')}
                      </span>
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-stone-100 text-stone-700 text-xs font-medium">
                        <Users className="h-3.5 w-3.5" />
                        {t('partners.gs1.members')}
                      </span>
                    </div>
                    
                    <span className="inline-flex items-center text-amber-700 font-semibold text-sm group-hover:text-amber-900 transition-colors">
                      {t('partners.gs1.cta')}
                      <ArrowRight className="ml-1.5 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </div>
              </Card>
            </Link>
          </div>
        </section>
        
        <section className="mb-12 bg-gradient-to-r from-blue-50 to-compliance-50 p-8 rounded-xl">
          <h2 className="text-2xl font-bold mb-6 gradient-heading">{t('partners.map.title')}</h2>
          <p className="text-lg text-slate-700 mb-6">
            {t('partners.map.description')}
          </p>
          
          <div className="h-[400px] mb-8 bg-white rounded-lg shadow-lg overflow-hidden">
            <PartnerMap />
          </div>
          
          <div className="bg-white p-8 rounded-lg shadow-md border-l-4 border-primary">
            <p className="text-lg italic text-slate-700 mb-4">{t('partners.map.testimonial')}</p>
            <div className="flex items-center">
              <p className="font-medium text-slate-900">{t('partners.map.testimonialAuthor')}</p>
            </div>
          </div>
        </section>
        
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-8 gradient-heading text-center">{t('partners.benefits.title')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {partnerBenefits.map((benefit, index) => <Card key={index} className="p-6 border border-slate-200 h-full flex flex-col card-hover">
                <div className="mb-4 p-3 rounded-full bg-compliance-50 w-fit">
                  {benefit.icon}
                </div>
                <div>
                  <h3 className="text-xl font-medium text-slate-900 mb-2">{benefit.title}</h3>
                  <p className="text-slate-600">{benefit.description}</p>
                </div>
              </Card>)}
          </div>

          <div className="mt-12">
            <img
              src={logosGrid}
              alt="Partnerzy Quantifier.ai – logotypy"
              className="w-full object-contain"
              width={700}
              height={500}
              loading="lazy"
            />
          </div>
        </section>
        
        <div className="mb-16">
          <Separator className="my-8" />
          <div className="bg-gradient-to-r from-compliance-900 to-innovation-900 rounded-xl p-8 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -z-10"></div>
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-white/5 rounded-full blur-3xl -z-10"></div>
            
            <h2 className="text-3xl font-bold mb-4 text-white">
              {t('partners.cta.title')}
            </h2>
            <p className="text-xl text-white/80 mb-8 max-w-xl mx-auto">
              {t('partners.cta.description')}
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button size="lg" className="bg-white text-slate-900 hover:bg-white/90 px-8 py-6 text-lg group shadow-lg" asChild>
            <Link to={`/${currentLocale}/contact`}>
              <MessageSquare className="mr-2 h-5 w-5" />
              {t('partners.cta.button')}
            </Link>
          </Button>
              
            </div>
          </div>
        </div>
      </div>
    </PageTemplate>;
};
export default Partners;