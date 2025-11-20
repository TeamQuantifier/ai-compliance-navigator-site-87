import PageTemplate from '@/components/PageTemplate';
import { Shield, Check, ArrowRight, MessageSquare } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLanguage } from '@/contexts/LanguageContext';
import { Link } from 'react-router-dom';

const Plans = () => {
  const { t, currentLocale } = useLanguage();
  
  const planFeatures = [{
    name: t('plans.starter.name'),
    subtitle: t('plans.starter.subtitle'),
    description: t('plans.starter.description'),
    features: [t('plans.starter.feature1'), t('plans.starter.feature2'), t('plans.starter.feature3'), t('plans.starter.feature4')],
    cta: t('plans.starter.cta'),
    buttonText: t('plans.talkToSales'),
    highlighted: false
  }, {
    name: t('plans.growth.name'),
    subtitle: t('plans.growth.subtitle'),
    description: t('plans.growth.description'),
    features: [t('plans.growth.feature1'), t('plans.growth.feature2'), t('plans.growth.feature3'), t('plans.growth.feature4'), t('plans.growth.feature5')],
    cta: t('plans.growth.cta'),
    buttonText: t('plans.talkToSales'),
    highlighted: true
  }, {
    name: t('plans.enterprise.name'),
    subtitle: t('plans.enterprise.subtitle'),
    description: t('plans.enterprise.description'),
    features: [t('plans.enterprise.feature1'), t('plans.enterprise.feature2'), t('plans.enterprise.feature3'), t('plans.enterprise.feature4'), t('plans.enterprise.feature5'), t('plans.enterprise.feature6')],
    cta: t('plans.enterprise.cta'),
    buttonText: t('plans.talkToSales'),
    highlighted: false
  }];

  return <PageTemplate title={t('plans.title')} description={t('plans.description')}>
      <div className="max-w-3xl mx-auto text-center mb-12">
        
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        {planFeatures.map(plan => <Card key={plan.name} className={`p-6 border ${plan.highlighted ? 'border-primary shadow-lg relative' : 'border-slate-200 overflow-hidden'} h-full flex flex-col card-hover`}>
            {plan.highlighted && <div className="absolute -top-1 -right-1 overflow-hidden w-24 h-24">
                <div className="bg-primary text-white text-xs font-semibold px-8 py-1 transform rotate-45 translate-x-6 translate-y-4 shadow-md">
                  {t('plans.popular')}
                </div>
              </div>}
            <div className="mb-6">
              <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
              <p className="font-medium text-primary">{plan.subtitle}</p>
              <p className="text-slate-600 mt-3">{plan.description}</p>
            </div>
            
            <ul className="space-y-3 mb-6 flex-grow">
              {plan.features.map(feature => <li key={feature} className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                  <span className="text-slate-700">{feature}</span>
                </li>)}
            </ul>
            
            <div className="mt-auto">
              <p className="text-sm font-medium mb-4">{plan.cta}</p>
              <Button className="w-full bg-gradient-to-r from-compliance-600 to-innovation-600 hover:from-compliance-700 hover:to-innovation-700 text-white group shadow-md hover:shadow-lg transition-all" asChild>
                <Link to={`/${currentLocale}/contact`}>
                  <MessageSquare className="mr-2 h-4 w-4" />
                  {plan.buttonText}
                </Link>
              </Button>
            </div>
          </Card>)}
      </div>
      
      <div className="bg-slate-50 rounded-xl p-8 border border-slate-100">
        <div className="max-w-3xl mx-auto text-center">
          <Shield className="h-12 w-12 mx-auto mb-6 text-primary" />
          <h2 className="text-2xl font-bold mb-4 gradient-heading">
            {t('plans.customSolution.title')}
          </h2>
          <p className="text-lg text-slate-600 mb-6">
            {t('plans.customSolution.description')}
          </p>
          <Button size="lg" className="bg-gradient-to-r from-compliance-600 to-innovation-600 hover:from-compliance-700 hover:to-innovation-700 text-white group shadow-lg hover:shadow-xl transition-all" asChild>
            <Link to={`/${currentLocale}/contact`}>
              {t('plans.customSolution.button')}
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </div>
    </PageTemplate>;
};

export default Plans;
