
import PageTemplate from '@/components/PageTemplate';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, BrainCircuit, Shield, FileCheck2, AlertTriangle, CheckCircle, Activity, MessageCircle, Clock } from 'lucide-react';
import AiComplianceDashboard from '@/components/mockups/AiComplianceDashboard';

const ComplianceOfficer = () => {
  return (
    <PageTemplate
      title="AI Compliance Officer"
      description="Your virtual compliance assistant that continuously monitors and guides your compliance program."
    >
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <section className="mb-16">
          <div className="bg-gradient-to-r from-[#7E69AB] to-[#9b87f5] rounded-xl p-8 md:p-12 text-white flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-1/2">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Meet Your New AI Compliance Officer
              </h2>
              <p className="text-xl opacity-90 mb-6">
                A powerful AI that continuously monitors your compliance program, automates routine tasks, and provides intelligent recommendations.
              </p>
              <Button size="lg" className="bg-white text-[#7E69AB] hover:bg-white/90">
                Book a Demo <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
            <div className="md:w-1/2">
              <div className="bg-white/5 backdrop-blur-sm p-3 rounded-lg shadow-xl border border-white/20">
                <AiComplianceDashboard />
              </div>
            </div>
          </div>
        </section>
        
        {/* Key Features */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-2 text-center">How Our AI Compliance Officer Works</h2>
          <p className="text-lg text-slate-600 text-center mb-10 max-w-3xl mx-auto">
            Quantifier's AI Compliance Officer combines advanced language models, specialized compliance knowledge, and autonomous capabilities to transform how you manage compliance.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="border-[#9b87f5]/20 hover:shadow-md transition-all">
              <CardHeader className="pb-2">
                <div className="h-12 w-12 rounded-full bg-[#9b87f5]/10 flex items-center justify-center mb-4">
                  <BrainCircuit className="h-6 w-6 text-[#7E69AB]" />
                </div>
                <CardTitle className="text-lg">Continuous Monitoring</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600">
                  Our AI never sleeps, constantly analyzing your compliance status, identifying risks, and detecting potential gaps before they become issues.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-[#9b87f5]/20 hover:shadow-md transition-all">
              <CardHeader className="pb-2">
                <div className="h-12 w-12 rounded-full bg-[#9b87f5]/10 flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-[#7E69AB]" />
                </div>
                <CardTitle className="text-lg">Framework Expertise</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600">
                  Pre-trained on ISO 14001, GHG Protocol, ISO 14064, and dozens of other environmental standards and regulations with regular updates.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-[#9b87f5]/20 hover:shadow-md transition-all">
              <CardHeader className="pb-2">
                <div className="h-12 w-12 rounded-full bg-[#9b87f5]/10 flex items-center justify-center mb-4">
                  <Activity className="h-6 w-6 text-[#7E69AB]" />
                </div>
                <CardTitle className="text-lg">Autonomous Action</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600">
                  Beyond alerting, our AI can take action—assigning tasks, requesting information, scheduling reviews, and even drafting documentation.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>
        
        {/* Environmental Compliance Use Cases */}
        <section className="mb-16 bg-slate-50 p-8 rounded-xl">
          <h2 className="text-2xl font-bold mb-8 text-center">Environmental Compliance Use Cases</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                  <FileCheck2 className="h-5 w-5 text-green-600" />
                </div>
                <h3 className="text-xl font-bold">ISO 14001 Management</h3>
              </div>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 mr-3 flex-shrink-0" />
                  <span className="text-slate-700">Automated policy reviews and updates when standards change</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 mr-3 flex-shrink-0" />
                  <span className="text-slate-700">AI-driven internal audit preparation and evidence collection</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 mr-3 flex-shrink-0" />
                  <span className="text-slate-700">Continuous environmental objective tracking and reporting</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                  <AlertTriangle className="h-5 w-5 text-green-600" />
                </div>
                <h3 className="text-xl font-bold">Carbon Emissions Reporting</h3>
              </div>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 mr-3 flex-shrink-0" />
                  <span className="text-slate-700">Automated data collection across Scope 1, 2 and 3 emissions</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 mr-3 flex-shrink-0" />
                  <span className="text-slate-700">Anomaly detection in emissions data with root cause analysis</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 mr-3 flex-shrink-0" />
                  <span className="text-slate-700">AI-generated reduction strategy recommendations</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                  <Clock className="h-5 w-5 text-green-600" />
                </div>
                <h3 className="text-xl font-bold">Life Cycle Assessment</h3>
              </div>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 mr-3 flex-shrink-0" />
                  <span className="text-slate-700">Guided data collection and validation for product LCAs</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 mr-3 flex-shrink-0" />
                  <span className="text-slate-700">Intelligent gap filling for missing environmental impact data</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 mr-3 flex-shrink-0" />
                  <span className="text-slate-700">Automated impact hotspot identification and optimization</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                  <MessageCircle className="h-5 w-5 text-green-600" />
                </div>
                <h3 className="text-xl font-bold">Decarbonisation Planning</h3>
              </div>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 mr-3 flex-shrink-0" />
                  <span className="text-slate-700">Science-based target setting with automated progress tracking</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 mr-3 flex-shrink-0" />
                  <span className="text-slate-700">AI-recommended carbon reduction initiatives with ROI analysis</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 mr-3 flex-shrink-0" />
                  <span className="text-slate-700">Predictive modeling of future emissions based on business growth</span>
                </li>
              </ul>
            </div>
          </div>
        </section>
        
        {/* How It Works */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-8 text-center">How Our AI Works With Your Team</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <Card className="bg-white">
              <CardContent className="pt-6">
                <div className="text-center mb-4">
                  <div className="h-14 w-14 rounded-full bg-[#9b87f5]/10 flex items-center justify-center mx-auto">
                    <BrainCircuit className="h-7 w-7 text-[#7E69AB]" />
                  </div>
                  <h3 className="text-lg font-semibold mt-3">Learns Your Business</h3>
                </div>
                <p className="text-slate-600 text-center">
                  The AI studies your operations, processes, and previous compliance data to understand your unique environmental context.
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-white">
              <CardContent className="pt-6">
                <div className="text-center mb-4">
                  <div className="h-14 w-14 rounded-full bg-[#9b87f5]/10 flex items-center justify-center mx-auto">
                    <Activity className="h-7 w-7 text-[#7E69AB]" />
                  </div>
                  <h3 className="text-lg font-semibold mt-3">Monitors & Analyzes</h3>
                </div>
                <p className="text-slate-600 text-center">
                  Continuously monitors compliance status, environmental data, and regulatory changes, analyzing trends and patterns.
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-white">
              <CardContent className="pt-6">
                <div className="text-center mb-4">
                  <div className="h-14 w-14 rounded-full bg-[#9b87f5]/10 flex items-center justify-center mx-auto">
                    <MessageCircle className="h-7 w-7 text-[#7E69AB]" />
                  </div>
                  <h3 className="text-lg font-semibold mt-3">Communicates & Acts</h3>
                </div>
                <p className="text-slate-600 text-center">
                  Provides actionable insights, assigns tasks, sends alerts, and can even draft documentation for your approval.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>
        
        {/* CTA */}
        <section className="mb-8">
          <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl p-8 md:p-12 text-white">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-4">
                Ready to Transform Your Environmental Compliance?
              </h2>
              <p className="text-xl opacity-90 mb-8">
                Join organizations already using Quantifier's AI to make environmental compliance effortless and impactful.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button size="lg" className="bg-white text-green-700 hover:bg-white/90 px-8">
                  Book a Demo <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
                  Explore AI Features
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </PageTemplate>
  );
};

export default ComplianceOfficer;
