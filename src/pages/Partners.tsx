import PageTemplate from '@/components/PageTemplate';
import { Check, ArrowRight, Globe, MessageSquare, Sparkles, Users, BarChart, Gift, MapPin, Building, Handshake } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import PartnerMap from '@/components/PartnerMap';
import { Separator } from '@/components/ui/separator';
import CtaSection from '@/components/CtaSection';
import { useLanguage } from '@/contexts/LanguageContext';

const Partners = () => {
  const { t } = useLanguage();
  
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
  
  return <PageTemplate title={t('partners.title')} description={t('partners.description')}>
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
              <Button size="lg" className="bg-white text-slate-900 hover:bg-white/90 px-8 py-6 text-lg group shadow-lg">
                <MessageSquare className="mr-2 h-5 w-5" />
                {t('partners.cta.button')}
              </Button>
              
            </div>
          </div>
        </div>
      </div>
    </PageTemplate>;
};
export default Partners;