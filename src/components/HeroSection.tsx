
import { ArrowRight, Shield, CheckCircle, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';

const HeroSection = () => {
  return (
    <div className="relative pt-20 pb-10 lg:pt-32 lg:pb-20 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-compliance-50/50 to-white -z-10"></div>
      
      {/* Decorative circles */}
      <div className="absolute top-20 right-0 w-96 h-96 bg-innovation-100 rounded-full blur-3xl opacity-40 -z-10"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-compliance-100 rounded-full blur-3xl opacity-30 -z-10"></div>

      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          {/* Main Header - Full Width */}
          <h1 className="text-4xl md:text-6xl font-bold mb-8 gradient-heading text-center leading-tight">
            Quantifier.ai. The AI-native compliance layer for organizations
          </h1>
          
          {/* Subheader - Full Width */}
          <h2 className="text-xl md:text-2xl text-slate-700 mb-12 text-center leading-relaxed">
            Your right hand AI Agent Compliance Officer that manages projects, collects data across your organization, and showcases results—significantly automating the entire compliance process
          </h2>
          
          {/* ChatGPT-like input */}
          <div className="max-w-3xl mx-auto mb-16 relative">
            <div className="bg-white shadow-lg rounded-xl p-4 border border-slate-200">
              <div className="flex items-center">
                <Input 
                  className="flex-grow pr-20 pl-12 py-4 text-base rounded-lg"
                  placeholder="Let's chat about type of compliance you need..."
                />
                <MessageSquare className="absolute left-8 text-slate-400" size={20} />
                <Button className="absolute right-8" size="sm">
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
          
          {/* Framework icons */}
          <div className="text-center mb-16">
            <h3 className="text-lg font-medium text-slate-700 mb-6">
              Supporting key compliance frameworks
            </h3>
            <div className="flex flex-wrap justify-center items-center gap-8">
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-compliance-100 flex items-center justify-center mb-2">
                  <Shield className="h-8 w-8 text-compliance-600" />
                </div>
                <span className="text-sm font-medium">ISO 27001</span>
              </div>
              
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-innovation-100 flex items-center justify-center mb-2">
                  <Shield className="h-8 w-8 text-innovation-600" />
                </div>
                <span className="text-sm font-medium">SOC</span>
              </div>
              
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-compliance-100 flex items-center justify-center mb-2">
                  <Shield className="h-8 w-8 text-compliance-600" />
                </div>
                <span className="text-sm font-medium">NIS</span>
              </div>
              
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-innovation-100 flex items-center justify-center mb-2">
                  <Shield className="h-8 w-8 text-innovation-600" />
                </div>
                <span className="text-sm font-medium">ESG</span>
              </div>
              
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-compliance-100 flex items-center justify-center mb-2">
                  <Shield className="h-8 w-8 text-compliance-600" />
                </div>
                <span className="text-sm font-medium">CCPA</span>
              </div>
              
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-innovation-100 flex items-center justify-center mb-2">
                  <Shield className="h-8 w-8 text-innovation-600" />
                </div>
                <span className="text-sm font-medium">Others</span>
              </div>
            </div>
          </div>
          
          {/* Call-to-action buttons */}
          <div className="flex flex-wrap justify-center gap-4">
            <Button className="bg-primary hover:bg-primary/90 text-white px-6 py-2.5" size="lg">
              Request Demo
            </Button>
            <Button variant="outline" size="lg" className="group">
              Explore Features
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
