
import { ArrowRight, Shield, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const HeroSection = () => {
  return (
    <div className="relative pt-20 pb-10 lg:pt-32 lg:pb-20 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-compliance-50/50 to-white -z-10"></div>
      
      {/* Decorative circles */}
      <div className="absolute top-20 right-0 w-96 h-96 bg-innovation-100 rounded-full blur-3xl opacity-40 -z-10"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-compliance-100 rounded-full blur-3xl opacity-30 -z-10"></div>

      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1 max-w-2xl">
            <div className="inline-flex items-center px-3 py-1 mb-6 rounded-full bg-compliance-100 text-compliance-800 text-sm font-medium">
              <Shield className="h-4 w-4 mr-2" />
              AI-Driven Compliance Platform
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 gradient-heading leading-tight">
              Simplify Compliance with AI Intelligence
            </h1>
            
            <p className="text-lg md:text-xl text-slate-700 mb-8">
              A comprehensive B2B platform that leverages AI to streamline compliance processes, manage risks, and ensure your business meets regulatory requirements across multiple frameworks.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <div className="flex items-start">
                <CheckCircle className="h-5 w-5 text-compliance-600 mt-1 mr-2 flex-shrink-0" />
                <p className="text-slate-700">Automated compliance monitoring</p>
              </div>
              <div className="flex items-start">
                <CheckCircle className="h-5 w-5 text-compliance-600 mt-1 mr-2 flex-shrink-0" />
                <p className="text-slate-700">AI-powered risk assessment</p>
              </div>
              <div className="flex items-start">
                <CheckCircle className="h-5 w-5 text-compliance-600 mt-1 mr-2 flex-shrink-0" />
                <p className="text-slate-700">Multi-framework coverage</p>
              </div>
              <div className="flex items-start">
                <CheckCircle className="h-5 w-5 text-compliance-600 mt-1 mr-2 flex-shrink-0" />
                <p className="text-slate-700">Role-based access controls</p>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-4">
              <Button className="bg-primary hover:bg-primary/90 text-white px-6 py-2.5" size="lg">
                Request Demo
              </Button>
              <Button variant="outline" size="lg" className="group">
                Explore Features
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          </div>
          
          <div className="flex-1 w-full max-w-lg">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-compliance-200/30 to-innovation-200/30 rounded-xl blur-xl -z-10"></div>
              <div className="bg-white/80 backdrop-blur-sm border border-slate-100 rounded-xl shadow-xl p-6 relative z-10">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-semibold">AI Compliance Dashboard</h3>
                  <div className="flex space-x-1">
                    <div className="w-3 h-3 rounded-full bg-red-400"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                    <div className="w-3 h-3 rounded-full bg-green-400"></div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="h-4 bg-slate-100 rounded-full w-full"></div>
                  <div className="grid grid-cols-3 gap-3">
                    <div className="bg-compliance-50 rounded-lg p-3 h-24 flex flex-col justify-between">
                      <div className="h-2 bg-compliance-200 rounded-full w-1/2"></div>
                      <div className="h-2 bg-compliance-200 rounded-full w-3/4"></div>
                      <div className="h-2 bg-compliance-200 rounded-full w-2/3"></div>
                    </div>
                    <div className="bg-innovation-50 rounded-lg p-3 h-24 flex flex-col justify-between">
                      <div className="h-2 bg-innovation-200 rounded-full w-1/2"></div>
                      <div className="h-2 bg-innovation-200 rounded-full w-3/4"></div>
                      <div className="h-2 bg-innovation-200 rounded-full w-2/3"></div>
                    </div>
                    <div className="bg-slate-50 rounded-lg p-3 h-24 flex flex-col justify-between">
                      <div className="h-2 bg-slate-200 rounded-full w-1/2"></div>
                      <div className="h-2 bg-slate-200 rounded-full w-3/4"></div>
                      <div className="h-2 bg-slate-200 rounded-full w-2/3"></div>
                    </div>
                  </div>
                  
                  <div className="bg-slate-50 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <div className="h-2 bg-slate-200 rounded-full w-1/4"></div>
                      <div className="h-2 bg-green-200 rounded-full w-1/6"></div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-full bg-slate-200 rounded-full h-2.5">
                        <div className="bg-gradient-to-r from-compliance-400 to-innovation-500 h-2.5 rounded-full w-[75%]"></div>
                      </div>
                      <span className="text-xs text-slate-500">75%</span>
                    </div>
                  </div>
                  
                  <div className="flex space-x-3">
                    <div className="bg-slate-50 rounded-lg p-3 flex-1">
                      <div className="h-2 bg-slate-200 rounded-full w-1/2 mb-2"></div>
                      <div className="h-8 bg-compliance-100 rounded-md"></div>
                    </div>
                    <div className="bg-slate-50 rounded-lg p-3 flex-1">
                      <div className="h-2 bg-slate-200 rounded-full w-1/2 mb-2"></div>
                      <div className="h-8 bg-innovation-100 rounded-md"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
