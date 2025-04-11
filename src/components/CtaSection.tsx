import { ArrowRight, Shield, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
const CtaSection = () => {
  return <section className="py-16 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-compliance-900 to-innovation-900 -z-10"></div>
      
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-white/5 rounded-full blur-3xl -z-10"></div>
      
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <Shield className="h-16 w-16 mx-auto mb-6 text-white/90" />
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-white">
            Start Your AI-Powered Compliance Journey Today
          </h2>
          
          <p className="text-lg md:text-xl text-white/80 mb-8 max-w-2xl mx-auto">
            Join hundreds of organizations that have transformed their compliance processes with our intelligent platform.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <h3 className="text-xl font-semibold text-white mb-3">For Enterprise</h3>
              <p className="text-white/70 mb-4">Comprehensive compliance management for complex regulatory environments.</p>
              <div className="flex items-start mb-2">
                <CheckCircle className="h-5 w-5 text-compliance-300 mt-0.5 mr-2 flex-shrink-0" />
                <p className="text-white/80">Multi-entity managment</p>
              </div>
              <div className="flex items-start">
                <CheckCircle className="h-5 w-5 text-compliance-300 mt-0.5 mr-2 flex-shrink-0" />
                <p className="text-white/80">Full access to all features</p>
              </div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <h3 className="text-xl font-semibold text-white mb-3">For Mid-Market</h3>
              <p className="text-white/70 mb-4">Scalable solutions to grow with your compliance needs.</p>
              <div className="flex items-start mb-2">
                <CheckCircle className="h-5 w-5 text-innovation-300 mt-0.5 mr-2 flex-shrink-0" />
                <p className="text-white/80">Flexible implementation</p>
              </div>
              <div className="flex items-start">
                <CheckCircle className="h-5 w-5 text-innovation-300 mt-0.5 mr-2 flex-shrink-0" />
                <p className="text-white/80">Right-sized automation</p>
              </div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <h3 className="text-xl font-semibold text-white mb-3">For Startups</h3>
              <p className="text-white/70 mb-4">Build compliance into your foundation from day one.</p>
              <div className="flex items-start mb-2">
                <CheckCircle className="h-5 w-5 text-compliance-300 mt-0.5 mr-2 flex-shrink-0" />
                <p className="text-white/80">Essential features</p>
              </div>
              <div className="flex items-start">
                <CheckCircle className="h-5 w-5 text-compliance-300 mt-0.5 mr-2 flex-shrink-0" />
                <p className="text-white/80">Affordable pricing








              </p>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button className="bg-white text-slate-900 hover:bg-white/90 px-8 py-6 text-lg" size="lg">
              Request Demo
            </Button>
            <Button variant="outline" size="lg" className="border-white/20 px-8 py-6 text-lg group bg-gray-50 text-innovation-900">
              View Pricing
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
        </div>
      </div>
    </section>;
};
export default CtaSection;