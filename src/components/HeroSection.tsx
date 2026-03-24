import { ArrowRight, Shield, Lock, Network, Leaf, FileCheck, Brain, Award, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { useState, useEffect, useCallback } from 'react';

const screenshots = [
  {
    src: "/lovable-uploads/platform-screenshot.png",
    alt: "Quantifier Platform - Multi-Framework Policy Hub",
    label: "Policy Hub",
  },
  {
    src: "/lovable-uploads/ghg-compliance-screenshot.png",
    alt: "Quantifier Platform - GHG Compliance and Reporting",
    label: "GHG Compliance",
  },
  {
    src: "/lovable-uploads/nis2-diagram-screenshot.png",
    alt: "Quantifier Platform - NIS2 Policy & Procedures Flow",
    label: "NIS2 Workflow",
  },
];

const HeroSection = () => {
  const { t, currentLocale } = useLanguage();
  const [activeIdx, setActiveIdx] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(() => {
    setActiveIdx((i) => (i + 1) % screenshots.length);
  }, []);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(next, 4000);
    return () => clearInterval(id);
  }, [paused, next]);

  return <div className="relative pt-20 pb-10 lg:pt-32 lg:pb-20 overflow-hidden">
      {/* Background gradient - darkened further */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-950 to-compliance-950 -z-10"></div>
      
      {/* Decorative circles */}
      <div className="absolute top-20 right-0 w-96 h-96 bg-innovation-800 rounded-full blur-3xl opacity-25 -z-10"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-compliance-800 rounded-full blur-3xl opacity-30 -z-10"></div>
      <div className="absolute top-40 left-20 w-72 h-72 bg-slate-800 rounded-full blur-3xl opacity-20 -z-10"></div>

      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Two-column layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            {/* Left column - text content */}
            <div className="text-left">
              <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight">
                {t('hero.title')}<br />
                {t('hero.titleLine2')}
              </h1>
              
              <h2 className="text-xl text-slate-400 mb-8">
                {t('hero.grcExplanation')}
              </h2>
              
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
            
            {/* Right column - auto-rotating screenshots */}
            <div
              className="relative"
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => setPaused(false)}
            >
              {/* Tab indicators */}
              <div className="flex gap-2 mb-4">
                {screenshots.map((s, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveIdx(i)}
                    className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-300 ${
                      i === activeIdx
                        ? 'bg-compliance-700/80 text-white shadow-md'
                        : 'bg-slate-800/60 text-slate-400 hover:text-slate-200 hover:bg-slate-700/60'
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>

              {/* Screenshot container */}
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden border border-slate-700/50 shadow-2xl shadow-black/40 bg-slate-900">
                {screenshots.map((s, i) => (
                  <img
                    key={i}
                    src={s.src}
                    alt={s.alt}
                    width="800"
                    height="600"
                    loading={i === 0 ? undefined : "lazy"}
                    className={`absolute inset-0 w-full h-full object-cover object-left-top transition-all duration-700 ${
                      i === activeIdx
                        ? 'opacity-100 scale-100'
                        : 'opacity-0 scale-[1.02]'
                    }`}
                  />
                ))}
                
                {/* Progress bar */}
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-slate-800">
                  <div
                    className="h-full bg-gradient-to-r from-compliance-500 to-innovation-500 transition-none"
                    style={{
                      animation: paused ? 'none' : 'hero-progress 4s linear infinite',
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
          
          {/* Framework icons - centered section */}
          <div className="text-center">
            <h2 className="text-lg font-medium text-white mb-6">
              {t('hero.supportingFrameworks')}
            </h2>
            <div className="flex flex-wrap justify-center items-center gap-8">
              <Link to={`/${currentLocale}/frameworks/iso-27001`} className="flex flex-col items-center group">
                <div className="w-16 h-16 rounded-full bg-compliance-950 flex items-center justify-center mb-2 shadow-lg shadow-black/50 border border-compliance-700/30 group-hover:scale-110 transition-transform">
                  <Shield className="h-8 w-8 text-compliance-300" />
                </div>
                <span className="text-sm font-medium text-slate-300 group-hover:text-white transition-colors">ISO 27001</span>
              </Link>
              
              <Link to={`/${currentLocale}/frameworks/soc`} className="flex flex-col items-center group">
                <div className="w-16 h-16 rounded-full bg-innovation-950 flex items-center justify-center mb-2 shadow-lg shadow-black/50 border border-innovation-700/30 group-hover:scale-110 transition-transform">
                  <Lock className="h-8 w-8 text-innovation-300" />
                </div>
                <span className="text-sm font-medium text-slate-300 group-hover:text-white transition-colors">SOC 1/2</span>
              </Link>
              
              <Link to={`/${currentLocale}/frameworks/nis-ii`} className="flex flex-col items-center group">
                <div className="w-16 h-16 rounded-full bg-compliance-950 flex items-center justify-center mb-2 shadow-lg shadow-black/50 border border-compliance-700/30 group-hover:scale-110 transition-transform">
                  <Network className="h-8 w-8 text-compliance-300" />
                </div>
                <span className="text-sm font-medium text-slate-300 group-hover:text-white transition-colors">NIS 2</span>
              </Link>
              
              <Link to={`/${currentLocale}/frameworks/esg`} className="flex flex-col items-center group">
                <div className="w-16 h-16 rounded-full bg-innovation-950 flex items-center justify-center mb-2 shadow-lg shadow-black/50 border border-innovation-700/30 group-hover:scale-110 transition-transform">
                  <Leaf className="h-8 w-8 text-innovation-300" />
                </div>
                <span className="text-sm font-medium text-slate-300 group-hover:text-white transition-colors">ESG</span>
              </Link>
              
              <Link to={`/${currentLocale}/frameworks/gdpr`} className="flex flex-col items-center group">
                <div className="w-16 h-16 rounded-full bg-compliance-950 flex items-center justify-center mb-2 shadow-lg shadow-black/50 border border-compliance-700/30 group-hover:scale-110 transition-transform">
                  <FileCheck className="h-8 w-8 text-compliance-300" />
                </div>
                <span className="text-sm font-medium text-slate-300 group-hover:text-white transition-colors">GDPR</span>
              </Link>
              
              <Link to={`/${currentLocale}/frameworks`} className="flex flex-col items-center group">
                <div className="w-16 h-16 rounded-full bg-innovation-950 flex items-center justify-center mb-2 shadow-lg shadow-black/50 border border-innovation-700/30 group-hover:scale-110 transition-transform">
                  <Brain className="h-8 w-8 text-innovation-300" />
                </div>
                <span className="text-sm font-medium text-slate-300 group-hover:text-white transition-colors">AI Act</span>
              </Link>
              
              <Link to={`/${currentLocale}/frameworks`} className="flex flex-col items-center group">
                <div className="w-16 h-16 rounded-full bg-compliance-950 flex items-center justify-center mb-2 shadow-lg shadow-black/50 border border-compliance-700/30 group-hover:scale-110 transition-transform">
                  <Award className="h-8 w-8 text-compliance-300" />
                </div>
                <span className="text-sm font-medium text-slate-300 group-hover:text-white transition-colors">ISO 42001</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>;
};
export default HeroSection;
