import { ArrowRight, Shield, Lock, Network, Leaf, FileKey, Layers } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Link } from 'react-router-dom';
const HeroSection = () => {
  return <div className="relative pt-20 pb-10 lg:pt-32 lg:pb-20 overflow-hidden">
      {/* Background gradient - darkened further */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-950 to-compliance-950 -z-10"></div>
      
      {/* Decorative circles - increased opacity and size for more dramatic effect */}
      <div className="absolute top-20 right-0 w-96 h-96 bg-innovation-800 rounded-full blur-3xl opacity-25 -z-10"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-compliance-800 rounded-full blur-3xl opacity-30 -z-10"></div>
      <div className="absolute top-40 left-20 w-72 h-72 bg-slate-800 rounded-full blur-3xl opacity-20 -z-10"></div>

      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          {/* Main Header - Full Width */}
          <h1 className="text-4xl mb-8 text-white text-center leading-tight font-semibold md:text-7xl bg-clip-text bg-gradient-to-r from-white via-gray-100 to-gray-300">
            The AI-native compliance layer for organizations
          </h1>
          
          {/* Subheader - Full Width */}
          <h2 className="text-xl md:text-2xl text-slate-300 mb-12 text-center leading-relaxed">Your AI Agent Compliance Officer that manages projects, collects data, and showcases results—automating the entire compliance process</h2>
          
          {/* ChatGPT-like input - darkened */}
          <div className="max-w-3xl mx-auto mb-16 relative">
            
          </div>
          
          {/* Framework icons - updated with darker backgrounds and higher contrast */}
          <div className="text-center mb-16">
            <h3 className="text-lg font-medium text-white mb-6">
              Supporting key compliance frameworks
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
                <span className="text-sm font-medium text-slate-300">SOC</span>
              </div>
              
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-compliance-950 flex items-center justify-center mb-2 shadow-lg shadow-black/50 border border-compliance-700/30">
                  <Network className="h-8 w-8 text-compliance-300" />
                </div>
                <span className="text-sm font-medium text-slate-300">NIS</span>
              </div>
              
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-innovation-950 flex items-center justify-center mb-2 shadow-lg shadow-black/50 border border-innovation-700/30">
                  <Leaf className="h-8 w-8 text-innovation-300" />
                </div>
                <span className="text-sm font-medium text-slate-300">ESG</span>
              </div>
              
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-compliance-950 flex items-center justify-center mb-2 shadow-lg shadow-black/50 border border-compliance-700/30">
                  <FileKey className="h-8 w-8 text-compliance-300" />
                </div>
                <span className="text-sm font-medium text-slate-300">CCPA</span>
              </div>
              
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-innovation-950 flex items-center justify-center mb-2 shadow-lg shadow-black/50 border border-innovation-700/30">
                  <Layers className="h-8 w-8 text-innovation-300" />
                </div>
                <span className="text-sm font-medium text-slate-300">Others</span>
              </div>
            </div>
          </div>
          
          {/* Call-to-action buttons - enhanced with better contrast and darker gradients */}
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild className="bg-gradient-to-r from-compliance-700 to-innovation-700 hover:from-compliance-800 hover:to-innovation-800 text-white px-6 py-2.5 shadow-lg shadow-black/40" size="lg">
              <Link to="/contact">Request Demo</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-slate-700 group bg-slate-100 text-slate-800">
              <Link to="/product/features">
                Explore Features
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>;
};
export default HeroSection;