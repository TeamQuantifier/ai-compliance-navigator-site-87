
import PageTemplate from '@/components/PageTemplate';
import { 
  Shield, 
  CheckCircle, 
  ArrowRight, 
  FileCheck, 
  Lock,
  BarChart4, 
  FileWarning,
  ListChecks,
  AlertTriangle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import AiComplianceDashboard from '@/components/mockups/AiComplianceDashboard';

const Iso27001 = () => {
  return (
    <PageTemplate
      title="ISO 27001 Framework"
      description="Protect your information assets with the globally recognized ISO 27001 standard for information security management."
    >
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <section className="mb-12">
          <div className="bg-gradient-to-r from-[#7E69AB] to-[#9b87f5] rounded-xl p-8 md:p-12 text-white flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-3/5">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                ISO 27001: Build Trust Through Information Security
              </h2>
              <p className="text-xl opacity-90 mb-6">
                Quantifier automates your ISO 27001 journey—from establishing policies to ongoing audits—so you can focus on what truly matters: securing your business.
              </p>
              <Button size="lg" className="bg-white text-[#7E69AB] hover:bg-white/90">
                Book a Demo <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
            <div className="md:w-2/5">
              <div className="bg-white/5 backdrop-blur-sm p-3 rounded-lg shadow-xl border border-white/20">
                <AiComplianceDashboard 
                  title="ISO 27001 Compliance" 
                  themeColor="#7E69AB" 
                  variant="compact"
                />
              </div>
            </div>
          </div>
        </section>

        {/* What is ISO 27001 Section */}
        <section className="mb-16">
          <div className="bg-[#E5DEFF]/40 p-8 rounded-xl">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center text-[#1A1F2C]">
              What is ISO 27001?
            </h2>
            <p className="text-lg text-slate-700 mb-8 max-w-4xl mx-auto">
              ISO 27001 is the international standard for information security management systems (ISMS). It provides a systematic approach to managing sensitive company information, ensuring it remains secure. ISO 27001 helps organizations identify, manage, and reduce risks to their information security.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white rounded-lg p-6 shadow-sm border border-[#E5DEFF]">
                <h3 className="text-xl font-semibold mb-4 text-[#7E69AB]">Key Requirements</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <AlertTriangle className="h-5 w-5 text-[#9b87f5] mt-1 mr-3 flex-shrink-0" />
                    <span>Risk Assessment and Treatment</span>
                  </li>
                  <li className="flex items-start">
                    <FileWarning className="h-5 w-5 text-[#9b87f5] mt-1 mr-3 flex-shrink-0" />
                    <span>Security Policy Documentation</span>
                  </li>
                  <li className="flex items-start">
                    <ListChecks className="h-5 w-5 text-[#9b87f5] mt-1 mr-3 flex-shrink-0" />
                    <span>114 Security Controls Across 14 Domains</span>
                  </li>
                  <li className="flex items-start">
                    <Lock className="h-5 w-5 text-[#9b87f5] mt-1 mr-3 flex-shrink-0" />
                    <span>Ongoing Monitoring and Improvement</span>
                  </li>
                </ul>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-sm border border-[#E5DEFF]">
                <h3 className="text-xl font-semibold mb-4 text-[#7E69AB]">Benefits of Certification</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-[#9b87f5] mt-1 mr-3 flex-shrink-0" />
                    <span>Increased customer and partner trust</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-[#9b87f5] mt-1 mr-3 flex-shrink-0" />
                    <span>Competitive advantage in the marketplace</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-[#9b87f5] mt-1 mr-3 flex-shrink-0" />
                    <span>Better risk management and reduced incidents</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-[#9b87f5] mt-1 mr-3 flex-shrink-0" />
                    <span>Legal and regulatory compliance</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* How Quantifier Helps Section */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center text-[#1A1F2C]">
            How Quantifier Automates ISO 27001 Compliance
          </h2>
          
          <div className="mb-10">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-[#E5DEFF]">
              <h3 className="text-xl font-semibold mb-4 text-[#7E69AB] flex items-center">
                <Shield className="h-5 w-5 text-[#9b87f5] mr-3 flex-shrink-0" />
                AI-Powered ISO 27001 Dashboard
              </h3>
              <p className="text-slate-700 mb-4">
                Monitor your organization's ISO 27001 compliance with our intuitive AI-powered dashboard.
              </p>
              <div className="rounded-lg overflow-hidden border border-[#E5DEFF]">
                <AiComplianceDashboard 
                  title="ISO 27001 Security Compliance" 
                  themeColor="#7E69AB"
                />
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="border-[#9b87f5]/20 bg-white hover:shadow-md transition-all">
              <CardContent className="pt-6">
                <div className="flex items-start mb-4">
                  <div className="rounded-full bg-[#9b87f5]/10 p-2 mr-4">
                    <Shield className="h-6 w-6 text-[#9b87f5]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Automated Risk Management</h3>
                    <p className="text-slate-600">Our AI identifies, assesses, and mitigates information security risks in real-time, continuously updating your risk register.</p>
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
                    <h3 className="font-semibold text-lg mb-2">Evidence Collection</h3>
                    <p className="text-slate-600">Automatically collect and organize the necessary documentation for ISO 27001 compliance, ensuring you're always audit-ready.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-[#9b87f5]/20 bg-white hover:shadow-md transition-all">
              <CardContent className="pt-6">
                <div className="flex items-start mb-4">
                  <div className="rounded-full bg-[#9b87f5]/10 p-2 mr-4">
                    <BarChart4 className="h-6 w-6 text-[#9b87f5]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Compliance Monitoring</h3>
                    <p className="text-slate-600">Track your ISO 27001 compliance status in real-time with comprehensive dashboards and automated alerts for potential issues.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* CTA Section */}
        <section className="mb-8">
          <div className="bg-gradient-to-r from-[#7E69AB] to-[#9b87f5] rounded-xl p-8 md:p-12 text-white">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to Simplify ISO 27001 Compliance?
              </h2>
              <p className="text-xl opacity-90 mb-8">
                Join organizations that trust Quantifier to automate their ISO 27001 compliance journey.
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

export default Iso27001;
