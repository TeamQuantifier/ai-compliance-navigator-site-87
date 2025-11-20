import PageTemplate from '@/components/PageTemplate';
import { Building2, Award, Users, BarChart4, Globe, GraduationCap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useLanguage } from '@/contexts/LanguageContext';
import { Link } from 'react-router-dom';

const About = () => {
  const { t, currentLocale } = useLanguage();
  
  return <PageTemplate title={t('about.title')} description={t('about.description')}>
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <div className="mb-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-compliance-700 to-innovation-600 bg-clip-text text-transparent">
            {t('about.heading')}
          </h1>
          <p className="text-xl text-slate-700 max-w-3xl mx-auto">
            {t('about.subtitle')}
          </p>
        </div>
        
        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="md:col-span-2 space-y-6">
            <p className="text-lg text-slate-700">
              {t('about.intro1')}
            </p>
            
            <p className="text-lg text-slate-700">
              {t('about.intro2')}
            </p>
            
            <p className="text-lg text-slate-700">
              {t('about.intro3')}
            </p>
            
            <p className="text-lg text-slate-700">
              {t('about.intro4')}
            </p>
          </div>
          
          <div>
            <Card className="p-6 bg-gradient-to-br from-slate-50 to-slate-100 border border-slate-200 shadow-sm">
              <h3 className="text-xl font-semibold text-slate-900 mb-4">{t('about.highlights.title')}</h3>
              <ul className="space-y-4">
                <li className="flex">
                  <Building2 className="h-6 w-6 text-compliance-600 mr-3 flex-shrink-0" />
                  <div>
                    <span className="font-medium">{t('about.highlights.organizations')}</span>
                    <p className="text-sm text-slate-600">{t('about.highlights.organizationsDesc')}</p>
                  </div>
                </li>
                <li className="flex">
                  <Globe className="h-6 w-6 text-compliance-600 mr-3 flex-shrink-0" />
                  <div>
                    <span className="font-medium">{t('about.highlights.globalReach')}</span>
                    <p className="text-sm text-slate-600">{t('about.highlights.globalReachDesc')}</p>
                  </div>
                </li>
                <li className="flex">
                  <Users className="h-6 w-6 text-compliance-600 mr-3 flex-shrink-0" />
                  <div>
                    <span className="font-medium">{t('about.highlights.partners')}</span>
                    <p className="text-sm text-slate-600">{t('about.highlights.partnersDesc')}</p>
                  </div>
                </li>
                <li className="flex">
                  <Award className="h-6 w-6 text-compliance-600 mr-3 flex-shrink-0" />
                  <div>
                    <span className="font-medium">{t('about.highlights.awardWinning')}</span>
                    <p className="text-sm text-slate-600">{t('about.highlights.awardWinningDesc')}</p>
                  </div>
                </li>
                <li className="flex">
                  <GraduationCap className="h-6 w-6 text-compliance-600 mr-3 flex-shrink-0" />
                  <div>
                    <span className="font-medium">{t('about.highlights.expertTeam')}</span>
                    <p className="text-sm text-slate-600">{t('about.highlights.expertTeamDesc')}</p>
                  </div>
                </li>
              </ul>
            </Card>
          </div>
        </div>
        
        {/* Stats Section */}
        <div className="bg-slate-50 rounded-xl p-8 mb-16">
          <h2 className="text-2xl font-bold text-slate-900 mb-8 text-center">{t('about.impact.title')}</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-compliance-600 mb-2">250+</div>
              <p className="text-slate-700">{t('about.impact.organizations')}</p>
            </div>
            
            <div className="text-center">
              <div className="text-4xl font-bold text-compliance-600 mb-2">3+</div>
              <p className="text-slate-700">{t('about.impact.years')}</p>
            </div>
            
            <div className="text-center">
              <div className="text-4xl font-bold text-compliance-600 mb-2">50+</div>
              <p className="text-slate-700">{t('about.impact.partners')}</p>
            </div>
          </div>
        </div>
        
        {/* Mission Section */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">{t('about.mission.title')}</h2>
          <p className="text-lg text-slate-700 mb-8">
            {t('about.mission.description')}
          </p>
          
          <div className="bg-white rounded-xl border border-slate-200 p-8">
            <h3 className="text-xl font-semibold text-slate-900 mb-4">{t('about.mission.different')}</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex">
                <BarChart4 className="h-6 w-6 text-compliance-600 mr-3 flex-shrink-0" />
                <div>
                  <p className="font-medium mb-1">{t('about.mission.aiNative')}</p>
                  <p className="text-slate-600">{t('about.mission.aiNativeDesc')}</p>
                </div>
              </div>
              
              <div className="flex">
                <Users className="h-6 w-6 text-compliance-600 mr-3 flex-shrink-0" />
                <div>
                  <p className="font-medium mb-1">{t('about.mission.expertise')}</p>
                  <p className="text-slate-600">{t('about.mission.expertiseDesc')}</p>
                </div>
              </div>
              
              <div className="flex">
                <Award className="h-6 w-6 text-compliance-600 mr-3 flex-shrink-0" />
                <div>
                  <p className="font-medium mb-1">{t('about.mission.innovation')}</p>
                  <p className="text-slate-600">{t('about.mission.innovationDesc')}</p>
                </div>
              </div>
              
              <div className="flex">
                <Globe className="h-6 w-6 text-compliance-600 mr-3 flex-shrink-0" />
                <div>
                  <p className="font-medium mb-1">{t('about.mission.global')}</p>
                  <p className="text-slate-600">{t('about.mission.globalDesc')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* CTA Section */}
        <div className="bg-gradient-to-r from-compliance-700 to-innovation-600 rounded-xl p-8 text-white text-center">
          <h2 className="text-2xl font-bold mb-4">{t('about.cta.title')}</h2>
          <p className="mb-6 max-w-2xl mx-auto">
            {t('about.cta.description')}
          </p>
          <Button 
            size="lg" 
            className="bg-white text-compliance-900 hover:bg-white/90 font-semibold border-2 border-white shadow-lg hover:shadow-xl transition-all"
            asChild
          >
            <Link to={`/${currentLocale}/contact`}>
              {t('about.cta.button')}
            </Link>
          </Button>
        </div>
      </div>
    </PageTemplate>;
};
export default About;