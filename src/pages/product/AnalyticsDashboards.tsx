
import PageTemplate from '@/components/PageTemplate';
import { ArrowRight, BarChart4, Shield, CheckCircle, FileText, PieChart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import AiComplianceDashboard from '@/components/mockups/AiComplianceDashboard';

const AnalyticsDashboards = () => {
  return (
    <PageTemplate
      title="AI Analytics and Dashboards"
      description="Gain insights with intelligent analytics and visualizations of your compliance data."
    >
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <section className="mb-12">
          <div className="bg-gradient-to-r from-[#7E69AB] to-[#9b87f5] rounded-xl p-8 md:p-12 text-white flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-1/2">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                AI-Powered Analytics That Drive Compliance
              </h2>
              <p className="text-xl opacity-90 mb-6">
                Turn compliance data into actionable insights with Quantifier's AI analytics dashboards.
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

        {/* Dashboard Features */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center text-[#1A1F2C]">
            Key Features of Our AI Analytics Dashboards
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="border-[#9b87f5]/20 bg-white hover:shadow-md transition-all">
              <CardContent className="pt-6">
                <div className="flex items-start mb-4">
                  <div className="rounded-full bg-[#9b87f5]/10 p-2 mr-4">
                    <BarChart4 className="h-6 w-6 text-[#9b87f5]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Real-Time Metrics</h3>
                    <p className="text-slate-600">Monitor your compliance status across all frameworks in real-time, with instant updates as changes occur.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-[#9b87f5]/20 bg-white hover:shadow-md transition-all">
              <CardContent className="pt-6">
                <div className="flex items-start mb-4">
                  <div className="rounded-full bg-[#9b87f5]/10 p-2 mr-4">
                    <Shield className="h-6 w-6 text-[#9b87f5]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Risk Intelligence</h3>
                    <p className="text-slate-600">AI-powered risk assessments and predictions help you prioritize actions and prevent compliance gaps.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-[#9b87f5]/20 bg-white hover:shadow-md transition-all">
              <CardContent className="pt-6">
                <div className="flex items-start mb-4">
                  <div className="rounded-full bg-[#9b87f5]/10 p-2 mr-4">
                    <PieChart className="h-6 w-6 text-[#9b87f5]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Custom Reports</h3>
                    <p className="text-slate-600">Generate tailored reports for different stakeholders, from executive summaries to detailed technical documentation.</p>
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
                Elevate Your Compliance Reporting
              </h2>
              <p className="text-xl opacity-90 mb-8">
                Join organizations that use Quantifier's AI analytics to transform compliance data into strategic insights.
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

export default AnalyticsDashboards;
