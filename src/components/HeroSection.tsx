import { ArrowRight, Shield, CheckCircle, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
const HeroSection = () => {
  return <div className="relative pt-20 pb-10 lg:pt-32 lg:pb-20 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900/90 to-compliance-950/80 -z-10"></div>
      
      {/* Decorative circles */}
      <div className="absolute top-20 right-0 w-96 h-96 bg-innovation-700 rounded-full blur-3xl opacity-20 -z-10"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-compliance-800 rounded-full blur-3xl opacity-30 -z-10"></div>

      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          {/* Main Header - Full Width */}
          <h1 className="text-4xl mb-8 text-white text-center leading-tight font-semibold md:text-7xl">Quantifier.ai
The AI-native compliance layer for organizations

        </h1>
          
          {/* Subheader - Full Width */}
          <h2 className="text-xl md:text-2xl text-slate-300 mb-12 text-center leading-relaxed">Your right-hand AI Agent Compliance Officer that manages projects, collects data across your organization, and showcases results—significantly automating the entire compliance process</h2>
          
          {/* ChatGPT-like input */}
          <div className="max-w-3xl mx-auto mb-16 relative">
            <div className="bg-slate-800/80 shadow-xl shadow-slate-900/30 rounded-xl p-4 border border-slate-700">
              <div className="flex items-center">
                <Input className="flex-grow pr-20 pl-12 py-4 text-base rounded-lg bg-slate-700/50 text-white border-slate-600 placeholder:text-slate-400" placeholder="Let's chat about type of compliance you need..." />
                <MessageSquare className="absolute left-8 text-slate-400" size={20} />
                <Button className="absolute right-8 bg-innovation-600 hover:bg-innovation-700" size="sm">
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
          
          {/* Framework icons */}
          <div className="text-center mb-16">
            <h3 className="text-lg font-medium text-white mb-6">
              Supporting key compliance frameworks
            </h3>
            <div className="flex flex-wrap justify-center items-center gap-8">
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-compliance-800/70 flex items-center justify-center mb-2 shadow-lg shadow-compliance-900/20">
                  <Shield className="h-8 w-8 text-compliance-300" />
                </div>
                <span className="text-sm font-medium text-slate-300">ISO 27001</span>
              </div>
              
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-innovation-800/70 flex items-center justify-center mb-2 shadow-lg shadow-innovation-900/20">
                  <Shield className="h-8 w-8 text-innovation-300" />
                </div>
                <span className="text-sm font-medium text-slate-300">SOC</span>
              </div>
              
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-compliance-800/70 flex items-center justify-center mb-2 shadow-lg shadow-compliance-900/20">
                  <Shield className="h-8 w-8 text-compliance-300" />
                </div>
                <span className="text-sm font-medium text-slate-300">NIS</span>
              </div>
              
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-innovation-800/70 flex items-center justify-center mb-2 shadow-lg shadow-innovation-900/20">
                  <Shield className="h-8 w-8 text-innovation-300" />
                </div>
                <span className="text-sm font-medium text-slate-300">ESG</span>
              </div>
              
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-compliance-800/70 flex items-center justify-center mb-2 shadow-lg shadow-compliance-900/20">
                  <Shield className="h-8 w-8 text-compliance-300" />
                </div>
                <span className="text-sm font-medium text-slate-300">CCPA</span>
              </div>
              
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-innovation-800/70 flex items-center justify-center mb-2 shadow-lg shadow-innovation-900/20">
                  <Shield className="h-8 w-8 text-innovation-300" />
                </div>
                <span className="text-sm font-medium text-slate-300">Others</span>
              </div>
            </div>
          </div>
          
          {/* Call-to-action buttons */}
          <div className="flex flex-wrap justify-center gap-4">
            <Button className="bg-gradient-to-r from-compliance-600 to-innovation-600 hover:from-compliance-700 hover:to-innovation-700 text-white px-6 py-2.5 shadow-lg shadow-slate-900/20" size="lg">
              Request Demo
            </Button>
            <Button variant="outline" size="lg" className="border-slate-600 group text-slate-900 bg-gray-100">
              Explore Features
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
        </div>
      </div>
    </div>;
};
export default HeroSection;