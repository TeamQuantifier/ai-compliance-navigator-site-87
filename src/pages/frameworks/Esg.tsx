
import { useState } from 'react';
import PageTemplate from '@/components/PageTemplate';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, FileText, BarChart3, Globe, CheckCircle, Zap, Shield, PieChart, Clock, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const Esg = () => {
  const [activeTab, setActiveTab] = useState("csdr");

  const FeatureItem = ({ icon: Icon, title, children }) => (
    <div className="flex gap-3 mb-5">
      <div className="flex-shrink-0 mt-1">
        <div className="bg-purple-100 p-2 rounded-full">
          <Icon className="h-5 w-5 text-purple-600" />
        </div>
      </div>
      <div>
        <h4 className="font-medium text-slate-800 mb-1">{title}</h4>
        <p className="text-slate-600">{children}</p>
      </div>
    </div>
  );

  return (
    <PageTemplate
      title="Simplify Your Sustainable & ESG Reporting"
      description="Automate CSDR, GRI, and CBAM Reporting with Ease. Quantifier is your partner in achieving transparent, accurate, and efficient ESG reporting. Whether you're meeting global sustainability standards or navigating complex regulatory landscapes, we've got you covered with full automation."
    >
      <div className="max-w-6xl mx-auto">
        {/* Framework Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-12">
          <TabsList className="grid grid-cols-3 w-full max-w-2xl mx-auto mb-8">
            <TabsTrigger value="csdr" className="data-[state=active]:bg-purple-100 data-[state=active]:text-purple-800">
              CSDR Reporting
            </TabsTrigger>
            <TabsTrigger value="gri" className="data-[state=active]:bg-purple-100 data-[state=active]:text-purple-800">
              GRI Reporting
            </TabsTrigger>
            <TabsTrigger value="cbam" className="data-[state=active]:bg-purple-100 data-[state=active]:text-purple-800">
              CBAM Reporting
            </TabsTrigger>
          </TabsList>

          {/* CSDR Tab Content */}
          <TabsContent value="csdr" className="space-y-8">
            <div className="grid md:grid-cols-2 gap-10 items-center">
              <div>
                <h2 className="text-2xl font-bold mb-4 text-slate-800">
                  CSDR Reporting: Streamline Corporate Sustainability
                </h2>
                <p className="text-slate-600 mb-6">
                  The Corporate Sustainability Reporting Directive (CSDR) requires companies to disclose their sustainability efforts, risks, and governance structures. With Quantifier, you can easily collect and report your sustainability data in compliance with CSDR regulations—automatically.
                </p>
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-4 text-slate-800">You get:</h3>
                  <FeatureItem icon={Zap} title="Automated Data Collection">
                    Quantifier aggregates sustainability data from across your organization, ensuring no data is left behind.
                  </FeatureItem>
                  <FeatureItem icon={CheckCircle} title="Double Materiality Assessment">
                    Identify and assess the impact of sustainability factors on your business and vice versa.
                  </FeatureItem>
                  <FeatureItem icon={BarChart3} title="CSDR-Aligned Dashboards">
                    Visualize your sustainability performance in real time with CSDR-compliant reporting.
                  </FeatureItem>
                  <FeatureItem icon={AlertCircle} title="Gap Detection">
                    Identify areas for improvement and ensure you meet the standards for mandatory reporting.
                  </FeatureItem>
                  <FeatureItem icon={Clock} title="Continuous Updates">
                    Stay up-to-date with regulatory changes—Quantifier automatically adjusts your reporting templates and criteria.
                  </FeatureItem>
                </div>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-indigo-50 p-4 rounded-lg border border-purple-100">
                <img 
                  src="https://placehold.co/600x400/e5deff/6E59A5?text=CSDR+Dashboard+Preview" 
                  alt="CSDR Reporting Dashboard" 
                  className="rounded-lg shadow-md w-full"
                />
              </div>
            </div>
          </TabsContent>

          {/* GRI Tab Content */}
          <TabsContent value="gri" className="space-y-8">
            <div className="grid md:grid-cols-2 gap-10 items-center">
              <div>
                <h2 className="text-2xl font-bold mb-4 text-slate-800">
                  GRI Reporting: Align with Global Standards
                </h2>
                <p className="text-slate-600 mb-6">
                  The Global Reporting Initiative (GRI) standards are the most widely used framework for sustainability reporting worldwide. Quantifier makes GRI reporting effortless by automating the data collection, analysis, and presentation—allowing you to focus on actionable insights.
                </p>
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-4 text-slate-800">You get:</h3>
                  <FeatureItem icon={Globe} title="Comprehensive Data Aggregation">
                    Quantifier collects ESG data across all business units to provide a holistic view of your sustainability performance.
                  </FeatureItem>
                  <FeatureItem icon={FileText} title="GRI-Compliant Templates">
                    Generate reports that comply with the latest GRI standards, ensuring your disclosures meet global expectations.
                  </FeatureItem>
                  <FeatureItem icon={PieChart} title="Impact Tracking">
                    Easily track your sustainability impact across key areas such as environment, governance, and social responsibility.
                  </FeatureItem>
                  <FeatureItem icon={Shield} title="Audit-Ready Evidence">
                    Automatically capture and store evidence for all GRI disclosures, reducing the need for manual data gathering during audits.
                  </FeatureItem>
                </div>
              </div>
              <div className="bg-gradient-to-br from-indigo-50 to-blue-50 p-4 rounded-lg border border-indigo-100">
                <img 
                  src="https://placehold.co/600x400/e7f0fd/517fa4?text=GRI+Data+Visualization" 
                  alt="GRI Reporting Dashboard" 
                  className="rounded-lg shadow-md w-full"
                />
              </div>
            </div>
          </TabsContent>

          {/* CBAM Tab Content */}
          <TabsContent value="cbam" className="space-y-8">
            <div className="grid md:grid-cols-2 gap-10 items-center">
              <div>
                <h2 className="text-2xl font-bold mb-4 text-slate-800">
                  CBAM Reporting: Navigate the Carbon Border Adjustment Mechanism
                </h2>
                <p className="text-slate-600 mb-6">
                  The Carbon Border Adjustment Mechanism (CBAM) imposes carbon-related reporting on imported goods entering the EU. As the regulatory landscape evolves, Quantifier helps you automate CBAM reporting, ensuring your business stays compliant with minimal effort.
                </p>
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-4 text-slate-800">You get:</h3>
                  <FeatureItem icon={BarChart3} title="Automatic Emission Tracking">
                    Quantifier tracks emissions from your supply chain, making it easy to report on carbon intensity for imports.
                  </FeatureItem>
                  <FeatureItem icon={CheckCircle} title="CBAM Compliance Monitoring">
                    Stay ahead of CBAM regulations with automatic updates and reporting templates.
                  </FeatureItem>
                  <FeatureItem icon={Globe} title="Supply Chain Integration">
                    Seamlessly integrate with your suppliers to track their emissions and ensure your imported goods meet EU standards.
                  </FeatureItem>
                  <FeatureItem icon={AlertCircle} title="Real-Time Alerts">
                    Receive proactive alerts when your emissions exceed thresholds, helping you manage CBAM-related costs.
                  </FeatureItem>
                </div>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-4 rounded-lg border border-green-100">
                <img 
                  src="https://placehold.co/600x400/eef1f5/304352?text=CBAM+Compliance+Dashboard" 
                  alt="CBAM Reporting Dashboard" 
                  className="rounded-lg shadow-md w-full"
                />
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* Why Choose Quantifier Section */}
        <div className="my-16 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl p-8 border border-purple-100">
          <h2 className="text-2xl font-bold mb-6 text-center text-slate-800">
            Why Choose Quantifier for ESG Reporting?
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="p-6 border-purple-100 bg-white/80">
              <Zap className="h-8 w-8 text-purple-600 mb-4" />
              <h3 className="font-semibold text-slate-800 mb-2">Fully Automated</h3>
              <p className="text-slate-600">Let Quantifier handle your ESG reporting from data collection to compliance—saving you time and reducing errors.</p>
            </Card>
            
            <Card className="p-6 border-purple-100 bg-white/80">
              <BarChart3 className="h-8 w-8 text-purple-600 mb-4" />
              <h3 className="font-semibold text-slate-800 mb-2">Real-Time Insights</h3>
              <p className="text-slate-600">Stay ahead of regulatory changes and get real-time visibility into your ESG performance across all frameworks.</p>
            </Card>
            
            <Card className="p-6 border-purple-100 bg-white/80">
              <Globe className="h-8 w-8 text-purple-600 mb-4" />
              <h3 className="font-semibold text-slate-800 mb-2">Seamless Integration</h3>
              <p className="text-slate-600">From GRI to CBAM, Quantifier integrates with your existing systems to ensure all reporting is accurate and streamlined.</p>
            </Card>
            
            <Card className="p-6 border-purple-100 bg-white/80">
              <Shield className="h-8 w-8 text-purple-600 mb-4" />
              <h3 className="font-semibold text-slate-800 mb-2">Global Compliance</h3>
              <p className="text-slate-600">Manage compliance with global ESG standards and regulations—all from one platform.</p>
            </Card>
            
            <Card className="p-6 border-purple-100 bg-white/80">
              <FileText className="h-8 w-8 text-purple-600 mb-4" />
              <h3 className="font-semibold text-slate-800 mb-2">Audit-Ready Reports</h3>
              <p className="text-slate-600">Generate reports that are always ready for audits, with detailed documentation to back up every claim.</p>
            </Card>
            
            <div className="flex items-center justify-center p-6 md:col-span-2 lg:col-span-1">
              <div className="text-center">
                <h3 className="font-semibold text-slate-800 mb-4 text-xl">Streamline Your ESG Reporting with Quantifier</h3>
                <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-white">
                  Request a Demo <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Call to Action */}
        <div className="mt-10 text-center">
          <p className="text-lg text-slate-700 mb-6">
            Ready to transform your ESG reporting process?
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-purple-600 hover:bg-purple-700">
              Book a Consultation
            </Button>
            <Button size="lg" variant="outline" className="border-purple-200 text-purple-700 hover:bg-purple-50">
              Watch Demo Video
            </Button>
          </div>
        </div>
      </div>
    </PageTemplate>
  );
};

export default Esg;
