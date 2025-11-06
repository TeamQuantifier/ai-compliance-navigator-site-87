import { Shield, FileCheck, Users, BarChart3, RefreshCw, Database, CheckCircle, Zap } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/contexts/LanguageContext';
interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  className?: string;
}
const FeatureCard = ({
  title,
  description,
  icon,
  className
}: FeatureCardProps) => {
  return <Card className={cn("p-6 border border-slate-200 card-hover", className)}>
      <div className="mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-slate-600">{description}</p>
    </Card>;
};
const FeatureSection = () => {
  const { t } = useLanguage();
  
  return <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-heading">
            {t('features.title')}
          </h2>
          <p className="text-lg text-slate-600">
            {t('features.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureCard title={t('features.aiOfficer.title')} description={t('features.aiOfficer.description')} icon={<Shield className="h-10 w-10 text-compliance-600" />} />
          
          <FeatureCard title={t('features.documents.title')} description={t('features.documents.description')} icon={<FileCheck className="h-10 w-10 text-innovation-600" />} />
          
          <FeatureCard title={t('features.roleAccess.title')} description={t('features.roleAccess.description')} icon={<Users className="h-10 w-10 text-compliance-600" />} />
          
          <FeatureCard title={t('features.analytics.title')} description={t('features.analytics.description')} icon={<BarChart3 className="h-10 w-10 text-innovation-600" />} />
          
          <FeatureCard title={t('features.workflows.title')} description={t('features.workflows.description')} icon={<RefreshCw className="h-10 w-10 text-compliance-600" />} />
          
          <FeatureCard title={t('features.dataManagement.title')} description={t('features.dataManagement.description')} icon={<Database className="h-10 w-10 text-innovation-600" />} />
        </div>
        
        <div className="mt-16 bg-slate-50 rounded-2xl p-8 border border-slate-100">
          <div className="flex flex-col md:flex-row gap-8 md:items-center">
            <div className="md:w-1/2">
              <h3 className="text-2xl font-bold mb-4 gradient-heading">
                {t('features.multiFramework.title')}
              </h3>
              <p className="text-slate-600 mb-6">
                {t('features.multiFramework.subtitle')}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-compliance-600 mt-1 mr-2 flex-shrink-0" />
                  <p className="text-slate-700">{t('features.multiFramework.cybersecurity')}</p>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-compliance-600 mt-1 mr-2 flex-shrink-0" />
                  <p className="text-slate-700">{t('features.multiFramework.infoSecurity')}</p>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-compliance-600 mt-1 mr-2 flex-shrink-0" />
                  <p className="text-slate-700">{t('features.multiFramework.dataPrivacy')}</p>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-compliance-600 mt-1 mr-2 flex-shrink-0" />
                  <p className="text-slate-700">{t('features.multiFramework.environmental')}</p>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-compliance-600 mt-1 mr-2 flex-shrink-0" />
                  <p className="text-slate-700">{t('features.multiFramework.esg')}</p>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-compliance-600 mt-1 mr-2 flex-shrink-0" />
                  <p className="text-slate-700">{t('features.multiFramework.governance')}</p>
                </div>
              </div>
              
              {/* Certificate of Quality */}
              <div className="mt-8 flex flex-col items-center sm:items-start">
                <div className="flex items-center space-x-3 mb-3">
                  <img src="/lovable-uploads/edcfd427-dd46-414b-a937-7fcf86b91e04.png" alt="TÜV NORD Verified Product Certificate" className="h-20 w-auto" />
                  <div>
                    <h4 className="font-semibold text-slate-800">{t('features.multiFramework.certified')}</h4>
                    <p className="text-sm text-slate-600">{t('features.multiFramework.verifiedBy')}</p>
                  </div>
                </div>
                <p className="text-sm text-slate-600 italic max-w-md">{t('features.multiFramework.certDescription')}</p>
              </div>
            </div>
            
            <div className="md:w-1/2">
              <div className="bg-white rounded-xl shadow-md p-6 border border-slate-200">
                <div className="flex items-center justify-between mb-6">
                  <h4 className="font-medium text-slate-900">{t('features.multiFramework.compatibility')}</h4>
                  <Zap className="h-5 w-5 text-yellow-500" />
                </div>
                
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-slate-700">Cybersecurity</span>
                      <span className="text-sm text-slate-500">98%</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div className="bg-compliance-600 h-2 rounded-full" style={{
                      width: '98%'
                    }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-slate-700">Data Privacy</span>
                      <span className="text-sm text-slate-500">95%</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div className="bg-innovation-600 h-2 rounded-full" style={{
                      width: '95%'
                    }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-slate-700">ESG</span>
                      <span className="text-sm text-slate-500">92%</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div className="bg-compliance-500 h-2 rounded-full" style={{
                      width: '92%'
                    }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-slate-700">Information Security</span>
                      <span className="text-sm text-slate-500">96%</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div className="bg-innovation-500 h-2 rounded-full" style={{
                      width: '96%'
                    }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-slate-700">Environmental</span>
                      <span className="text-sm text-slate-500">90%</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div className="bg-compliance-400 h-2 rounded-full" style={{
                      width: '90%'
                    }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default FeatureSection;