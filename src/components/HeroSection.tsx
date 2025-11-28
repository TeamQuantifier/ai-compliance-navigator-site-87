import { ArrowRight, Shield, Lock, Network, Leaf, FileCheck, Brain, Award, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';

const HeroSection = () => {
  const { t, currentLocale } = useLanguage();
  return <div className="relative pt-20 pb-10 lg:pt-32 lg:pb-20 overflow-hidden">
      {/* Background gradient - darkened further */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-950 to-compliance-950 -z-10"></div>
      
      {/* Decorative circles - increased opacity and size for more dramatic effect */}
      <div className="absolute top-20 right-0 w-96 h-96 bg-innovation-800 rounded-full blur-3xl opacity-25 -z-10"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-compliance-800 rounded-full blur-3xl opacity-30 -z-10"></div>
      <div className="absolute top-40 left-20 w-72 h-72 bg-slate-800 rounded-full blur-3xl opacity-20 -z-10"></div>

      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          {/* Main content - left aligned */}
          <div className="text-left mb-16">
            {/* H1 */}
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight">
              {t('hero.title')}
            </h1>
            
            {/* GRC Explanation - smaller subtitle */}
            <p className="text-xl text-slate-400 mb-8">
              {t('hero.grcExplanation')}
            </p>
            
            {/* Bullet points */}
            <ul className="space-y-3 mb-8">
              <li className="flex items-center text-lg text-slate-300">
                <CheckCircle className="h-5 w-5 text-compliance-400 mr-3 flex-shrink-0" />
                {t('hero.bullet1')}
              </li>
              <li className="flex items-center text-lg text-slate-300">
                <CheckCircle className="h-5 w-5 text-compliance-400 mr-3 flex-shrink-0" />
                {t('hero.bullet2')}
              </li>
              <li className="flex items-center text-lg text-slate-300">
                <CheckCircle className="h-5 w-5 text-compliance-400 mr-3 flex-shrink-0" />
                {t('hero.bullet3')}
              </li>
              <li className="flex items-center text-lg text-slate-300">
                <CheckCircle className="h-5 w-5 text-compliance-400 mr-3 flex-shrink-0" />
                {t('hero.bullet4')}
              </li>
              <li className="flex items-center text-lg text-slate-300">
                <CheckCircle className="h-5 w-5 text-compliance-400 mr-3 flex-shrink-0" />
                {t('hero.bullet5')}
              </li>
            </ul>
            
            {/* Call-to-action buttons - left aligned */}
            <div className="flex flex-wrap gap-4">
              <Button asChild className="bg-gradient-to-r from-compliance-700 to-innovation-700 hover:from-compliance-800 hover:to-innovation-800 text-white px-6 py-2.5 shadow-lg shadow-black/40" size="lg">
                <Link to={`/${currentLocale}/contact`}>{t('hero.requestDemo')}</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-slate-700 group bg-slate-100 text-slate-800">
                <Link to={`/${currentLocale}/product/features`}>
                  {t('hero.exploreFeatures')}
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>
          </div>
          
          {/* Framework icons - centered section */}
          <div className="text-center mb-16">
            <h3 className="text-lg font-medium text-white mb-6">
              {t('hero.supportingFrameworks')}
            </h3>
            <div className="flex flex-wrap justify-center items-center gap-8">
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-compliance-950 flex items-center justify-center mb-2 shadow-lg shadow-black/50 border border-compliance-700/30">
                  <Shield className="h-8 w-8 text-compliance-300" />
                </div>
                <span className="text-sm font-medium text-slate-300">ISO 27001</span>
              </div>
              
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-innovation-950 flex items-center justify-center mb-2 shadow-lg shadow-black/50 border border-innovation-700/30">
                  <Lock className="h-8 w-8 text-innovation-300" />
                </div>
                <span className="text-sm font-medium text-slate-300">SOC 1/2</span>
              </div>
              
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-compliance-950 flex items-center justify-center mb-2 shadow-lg shadow-black/50 border border-compliance-700/30">
                  <Network className="h-8 w-8 text-compliance-300" />
                </div>
                <span className="text-sm font-medium text-slate-300">NIS 2</span>
              </div>
              
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-innovation-950 flex items-center justify-center mb-2 shadow-lg shadow-black/50 border border-innovation-700/30">
                  <Leaf className="h-8 w-8 text-innovation-300" />
                </div>
                <span className="text-sm font-medium text-slate-300">ESG</span>
              </div>
              
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-compliance-950 flex items-center justify-center mb-2 shadow-lg shadow-black/50 border border-compliance-700/30">
                  <FileCheck className="h-8 w-8 text-compliance-300" />
                </div>
                <span className="text-sm font-medium text-slate-300">GDPR</span>
              </div>
              
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-innovation-950 flex items-center justify-center mb-2 shadow-lg shadow-black/50 border border-innovation-700/30">
                  <Brain className="h-8 w-8 text-innovation-300" />
                </div>
                <span className="text-sm font-medium text-slate-300">AI Act</span>
              </div>
              
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-compliance-950 flex items-center justify-center mb-2 shadow-lg shadow-black/50 border border-compliance-700/30">
                  <Award className="h-8 w-8 text-compliance-300" />
                </div>
                <span className="text-sm font-medium text-slate-300">ISO 42001</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>;
};
export default HeroSection;