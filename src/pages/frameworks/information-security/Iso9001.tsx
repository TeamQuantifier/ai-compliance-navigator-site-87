
import PageTemplate from '@/components/PageTemplate';
import { 
  Shield, 
  CheckCircle, 
  ArrowRight, 
  FileCheck, 
  BarChart4, 
  ClipboardCheck,
  Users,
  Settings,
  Repeat
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const Iso9001 = () => {
  return (
    <PageTemplate
      title="ISO 9001 Framework"
      description="Streamline quality management with ISO 9001 - the international standard for quality management systems (QMS)."
    >
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <section className="mb-12">
          <div className="bg-gradient-to-r from-[#7E69AB] to-[#9b87f5] rounded-xl p-8 md:p-12 text-white flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-3/5">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                ISO 9001: Quality Management Made Simple
              </h2>
              <p className="text-xl opacity-90 mb-6">
                Quantifier makes achieving and maintaining ISO 9001 compliance effortless by continuously driving quality management actions, tracking key metrics, and ensuring all necessary documentation is in place.
              </p>
              <Button size="lg" className="bg-white text-[#7E69AB] hover:bg-white/90">
                Book a Demo <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
            <div className="md:w-2/5">
              <img 
                src="/mockups/iso9001-quality-detail.png" 
                alt="ISO 9001 Quality Management Dashboard" 
                className="rounded-lg shadow-lg border border-white/20 w-full"
              />
            </div>
          </div>
        </section>

        {/* What is ISO 9001 Section */}
        <section className="mb-16">
          <div className="bg-[#E5DEFF]/40 p-8 rounded-xl">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center text-[#1A1F2C]">
              What is ISO 9001?
            </h2>
            <p className="text-lg text-slate-700 mb-8 max-w-4xl mx-auto">
              ISO 9001 is the international standard for quality management systems (QMS). It provides a framework for organizations to ensure they consistently deliver products and services that meet customer and regulatory requirements, while continuously improving their processes.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white rounded-lg p-6 shadow-sm border border-[#E5DEFF]">
                <h3 className="text-xl font-semibold mb-4 text-[#7E69AB]">Key Principles</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <Users className="h-5 w-5 text-[#9b87f5] mt-1 mr-3 flex-shrink-0" />
                    <span>Customer Focus</span>
                  </li>
                  <li className="flex items-start">
                    <Settings className="h-5 w-5 text-[#9b87f5] mt-1 mr-3 flex-shrink-0" />
                    <span>Process Approach</span>
                  </li>
                  <li className="flex items-start">
                    <ClipboardCheck className="h-5 w-5 text-[#9b87f5] mt-1 mr-3 flex-shrink-0" />
                    <span>Evidence-Based Decision Making</span>
                  </li>
                  <li className="flex items-start">
                    <Repeat className="h-5 w-5 text-[#9b87f5] mt-1 mr-3 flex-shrink-0" />
                    <span>Continual Improvement</span>
                  </li>
                </ul>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-sm border border-[#E5DEFF]">
                <h3 className="text-xl font-semibold mb-4 text-[#7E69AB]">Benefits of Certification</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-[#9b87f5] mt-1 mr-3 flex-shrink-0" />
                    <span>Increased customer satisfaction and loyalty</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-[#9b87f5] mt-1 mr-3 flex-shrink-0" />
                    <span>Process efficiency and cost reduction</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-[#9b87f5] mt-1 mr-3 flex-shrink-0" />
                    <span>Enhanced product and service quality</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-[#9b87f5] mt-1 mr-3 flex-shrink-0" />
                    <span>Access to new markets and opportunities</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* How Quantifier Helps Section */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center text-[#1A1F2C]">
            How Quantifier Automates ISO 9001 Compliance
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="border-[#9b87f5]/20 bg-white hover:shadow-md transition-all">
              <CardContent className="pt-6">
                <div className="flex items-start mb-4">
                  <div className="rounded-full bg-[#9b87f5]/10 p-2 mr-4">
                    <ClipboardCheck className="h-6 w-6 text-[#9b87f5]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Automated Task Assignment</h3>
                    <p className="text-slate-600">Ensure quality management activities are performed consistently and on schedule across your organization.</p>
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
                    <h3 className="font-semibold text-lg mb-2">Audit-Ready Reporting</h3>
                    <p className="text-slate-600">Gather the required quality evidence without manual effort, ensuring you're always prepared for audits.</p>
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
                    <h3 className="font-semibold text-lg mb-2">Quality Monitoring</h3>
                    <p className="text-slate-600">Identify quality gaps and resolve them before they escalate with real-time metrics and alerts.</p>
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
                Ready to Streamline Your Quality Management?
              </h2>
              <p className="text-xl opacity-90 mb-8">
                Join organizations that trust Quantifier to automate their ISO 9001 compliance journey.
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

export default Iso9001;
