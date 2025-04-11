
import PageTemplate from '@/components/PageTemplate';
import { 
  Shield, 
  CheckCircle, 
  ArrowRight, 
  FileCheck, 
  ServerCrash,
  BarChart4, 
  FileWarning,
  Building,
  AlertTriangle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const Dora = () => {
  return (
    <PageTemplate
      title="DORA Framework"
      description="Digital Operational Resilience Act - Ensure your financial institution meets EU standards for operational resilience."
    >
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <section className="mb-12">
          <div className="bg-gradient-to-r from-[#7E69AB] to-[#9b87f5] rounded-xl p-8 md:p-12 text-white flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-3/5">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                DORA: Digital Operational Resilience Made Simple
              </h2>
              <p className="text-xl opacity-90 mb-6">
                Quantifier automates DORA compliance for financial institutions, making operational resilience a competitive advantage instead of a burden.
              </p>
              <Button size="lg" className="bg-white text-[#7E69AB] hover:bg-white/90">
                Book a Demo <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
            <div className="md:w-2/5">
              <img 
                src="https://images.unsplash.com/photo-1561414927-6d86591d0c4f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80" 
                alt="DORA Compliance Dashboard" 
                className="rounded-lg shadow-lg border border-white/20 w-full"
              />
            </div>
          </div>
        </section>

        {/* What is DORA Section */}
        <section className="mb-16">
          <div className="bg-[#E5DEFF]/40 p-8 rounded-xl">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center text-[#1A1F2C]">
              What is DORA?
            </h2>
            <p className="text-lg text-slate-700 mb-8 max-w-4xl mx-auto">
              The Digital Operational Resilience Act (DORA) is an EU regulation that requires financial institutions to ensure they can withstand, respond to, and recover from all types of ICT-related disruptions and threats. It establishes uniform requirements for the security of network and information systems of companies and organizations operating in the financial sector.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white rounded-lg p-6 shadow-sm border border-[#E5DEFF]">
                <h3 className="text-xl font-semibold mb-4 text-[#7E69AB]">Key Requirements</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <AlertTriangle className="h-5 w-5 text-[#9b87f5] mt-1 mr-3 flex-shrink-0" />
                    <span>ICT Risk Management</span>
                  </li>
                  <li className="flex items-start">
                    <FileWarning className="h-5 w-5 text-[#9b87f5] mt-1 mr-3 flex-shrink-0" />
                    <span>ICT-Related Incident Reporting</span>
                  </li>
                  <li className="flex items-start">
                    <ServerCrash className="h-5 w-5 text-[#9b87f5] mt-1 mr-3 flex-shrink-0" />
                    <span>Digital Operational Resilience Testing</span>
                  </li>
                  <li className="flex items-start">
                    <Building className="h-5 w-5 text-[#9b87f5] mt-1 mr-3 flex-shrink-0" />
                    <span>ICT Third-Party Risk Management</span>
                  </li>
                </ul>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-sm border border-[#E5DEFF]">
                <h3 className="text-xl font-semibold mb-4 text-[#7E69AB]">Who Must Comply</h3>
                <p className="text-slate-700 mb-4">
                  DORA applies to a wide range of financial entities operating in the EU, including:
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-[#9b87f5] mt-1 mr-3 flex-shrink-0" />
                    <span>Banks and credit institutions</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-[#9b87f5] mt-1 mr-3 flex-shrink-0" />
                    <span>Insurance and reinsurance companies</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-[#9b87f5] mt-1 mr-3 flex-shrink-0" />
                    <span>Investment firms and payment institutions</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-[#9b87f5] mt-1 mr-3 flex-shrink-0" />
                    <span>Crypto-asset service providers</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* How Quantifier Helps Section */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center text-[#1A1F2C]">
            How Quantifier Automates DORA Compliance
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="border-[#9b87f5]/20 bg-white hover:shadow-md transition-all">
              <CardContent className="pt-6">
                <div className="flex items-start mb-4">
                  <div className="rounded-full bg-[#9b87f5]/10 p-2 mr-4">
                    <Shield className="h-6 w-6 text-[#9b87f5]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Automated Risk Monitoring</h3>
                    <p className="text-slate-600">Our AI continuously identifies, assesses, and mitigates risks to your digital operations in real-time, ensuring continuous compliance with DORA's risk management requirements.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-[#9b87f5]/20 bg-white hover:shadow-md transition-all">
              <CardContent className="pt-6">
                <div className="flex items-start mb-4">
                  <div className="rounded-full bg-[#9b87f5]/10 p-2 mr-4">
                    <FileCheck className="h-6 w-6 text-[#9b87f5]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Incident Response Automation</h3>
                    <p className="text-slate-600">Quantifier's AI agents help build, test, and execute comprehensive plans for operational disruptions, meeting DORA's incident reporting requirements.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-[#9b87f5]/20 bg-white hover:shadow-md transition-all">
              <CardContent className="pt-6">
                <div className="flex items-start mb-4">
                  <div className="rounded-full bg-[#9b87f5]/10 p-2 mr-4">
                    <Building className="h-6 w-6 text-[#9b87f5]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Third-Party Risk Management</h3>
                    <p className="text-slate-600">Monitor and manage your ICT third-party providers to ensure they comply with DORA requirements, reducing risk exposure across your supply chain.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Platform Screenshot Section */}
        <section className="mb-16">
          <div className="bg-gradient-to-r from-[#E5DEFF] to-[#F1F0FB] p-6 rounded-xl">
            <div className="flex flex-col items-center text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-[#1A1F2C]">
                DORA Compliance Dashboard
              </h2>
              <p className="text-lg text-slate-700 max-w-2xl">
                Get a comprehensive view of your DORA compliance status with Quantifier's intuitive dashboard.
              </p>
            </div>
            
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80" 
                alt="DORA Compliance Dashboard" 
                className="rounded-lg shadow-lg border border-white w-full object-cover max-h-[500px]"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <Button size="lg" className="bg-[#F97316] hover:bg-[#F97316]/90">
                  Watch Demo Video
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="mb-8">
          <div className="bg-gradient-to-r from-[#7E69AB] to-[#9b87f5] rounded-xl p-8 md:p-12 text-white">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to Simplify DORA Compliance?
              </h2>
              <p className="text-xl opacity-90 mb-8">
                Join financial institutions that trust Quantifier to automate their DORA compliance journey.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button size="lg" className="bg-white text-[#7E69AB] hover:bg-white/90 px-8">
                  Book a Demo <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
                  Explore Plans
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </PageTemplate>
  );
};

export default Dora;
