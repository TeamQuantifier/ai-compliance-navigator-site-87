import { useState } from 'react';
import PageTemplate from '@/components/PageTemplate';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle, Leaf, Recycle, FileText, BarChart3, Clock, Globe, AlertCircle, Zap, Shield, PieChart, Activity, Target } from 'lucide-react';
import { Link } from 'react-router-dom';
import Iso14001Dashboard from '@/components/dashboards/environmental/Iso14001Dashboard';
import LcaDashboard from '@/components/dashboards/environmental/LcaDashboard';
import CarbonFootprintDashboard from '@/components/dashboards/environmental/CarbonFootprintDashboard';
import DecarbonisationDashboard from '@/components/dashboards/environmental/DecarbonisationDashboard';
import { useLanguage } from '@/contexts/LanguageContext';

const Environmental = () => {
  const [activeTab, setActiveTab] = useState("iso14001");
  const { t, currentLocale } = useLanguage();

  const FeatureItem = ({ icon: Icon, title, children }) => (
    <div className="flex gap-3 mb-5">
      <div className="flex-shrink-0 mt-1">
        <div className="bg-green-100 p-2 rounded-full">
          <Icon className="h-5 w-5 text-green-600" />
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
      title="Environmental Compliance, Fully Automated"
      description="Quantifier powers your environmental strategy with AI-native automation — from ISO 14001 to decarbonization. Whether you're aiming for certification, tracking emissions, or building a science-based reduction plan, Quantifier takes the manual work out of environmental compliance and makes climate leadership scalable."
    >
      <div className="max-w-6xl mx-auto">
        {/* Framework Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-12">
          <TabsList className="grid grid-cols-4 w-full max-w-3xl mx-auto mb-8">
            <TabsTrigger value="iso14001" className="data-[state=active]:bg-green-100 data-[state=active]:text-green-800">
              ISO 14001
            </TabsTrigger>
            <TabsTrigger value="lca" className="data-[state=active]:bg-green-100 data-[state=active]:text-green-800">
              LCA
            </TabsTrigger>
            <TabsTrigger value="carbon" className="data-[state=active]:bg-green-100 data-[state=active]:text-green-800">
              Carbon Footprint
            </TabsTrigger>
            <TabsTrigger value="decarbonisation" className="data-[state=active]:bg-green-100 data-[state=active]:text-green-800">
              Decarbonisation
            </TabsTrigger>
          </TabsList>

          {/* ISO 14001 Tab Content */}
          <TabsContent value="iso14001" className="space-y-8">
            <div className="grid md:grid-cols-2 gap-10 items-center">
              <div>
                <h2 className="text-2xl font-bold mb-4 text-slate-800">
                  ISO 14001: Build and Maintain a Certified EMS
                </h2>
                <p className="text-slate-600 mb-6">
                  Achieve and sustain your Environmental Management System (EMS) with zero overhead. Quantifier automates the evidence collection, reporting, and policy enforcement required to stay aligned with ISO 14001 standards.
                </p>
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-4 text-slate-800">You get:</h3>
                  <FeatureItem icon={CheckCircle} title="Autonomous task assignments">
                    Automated assignments for EMS implementation and reviews across your organization.
                  </FeatureItem>
                  <FeatureItem icon={FileText} title="Real-time audit readiness">
                    Version-controlled documentation and evidence that's always ready for auditors.
                  </FeatureItem>
                  <FeatureItem icon={Clock} title="Automated reminders">
                    Timely alerts for corrective actions, training requirements, and policy updates.
                  </FeatureItem>
                  <FeatureItem icon={BarChart3} title="Full visibility">
                    Comprehensive dashboard showing compliance status across teams and sites.
                  </FeatureItem>
                </div>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-4 rounded-lg border border-green-100">
                <div className="rounded-lg shadow-md w-full overflow-hidden">
                  <Iso14001Dashboard />
                </div>
              </div>
            </div>
          </TabsContent>

          {/* LCA Tab Content */}
          <TabsContent value="lca" className="space-y-8">
            <div className="grid md:grid-cols-2 gap-10 items-center">
              <div>
                <h2 className="text-2xl font-bold mb-4 text-slate-800">
                  LCA (Life Cycle Assessment): Instant, Intelligent Impact Analysis
                </h2>
                <p className="text-slate-600 mb-6">
                  Go beyond reporting—Quantifier gives you the tools to understand the true environmental impact of your products and processes with AI-powered LCA workflows.
                </p>
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-4 text-slate-800">You get:</h3>
                  <FeatureItem icon={Zap} title="Guided life cycle assessments">
                    Intelligent data ingestion makes complex assessments simple and accurate.
                  </FeatureItem>
                  <FeatureItem icon={CheckCircle} title="Automated data requests">
                    Streamlined collection from internal teams and suppliers with built-in follow-ups.
                  </FeatureItem>
                  <FeatureItem icon={BarChart3} title="Built-in benchmarks">
                    Access comprehensive material libraries and industry comparisons.
                  </FeatureItem>
                  <FeatureItem icon={FileText} title="Exportable reports">
                    Generate reports aligned with ISO 14040/44 standards at the click of a button.
                  </FeatureItem>
                </div>
              </div>
              <div className="bg-gradient-to-br from-emerald-50 to-teal-50 p-4 rounded-lg border border-emerald-100">
                <div className="rounded-lg shadow-md w-full overflow-hidden">
                  <LcaDashboard />
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Carbon Footprint Tab Content */}
          <TabsContent value="carbon" className="space-y-8">
            <div className="grid md:grid-cols-2 gap-10 items-center">
              <div>
                <h2 className="text-2xl font-bold mb-4 text-slate-800">
                  Carbon Footprint & GHG: Track, Reduce, Report
                </h2>
                <p className="text-slate-600 mb-6">
                  From Scope 1 to Scope 3, Quantifier helps you quantify, track, and report greenhouse gas (GHG) emissions across your value chain—with no spreadsheets, no gaps, and no stress.
                </p>
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-4 text-slate-800">You get:</h3>
                  <FeatureItem icon={PieChart} title="Automated emissions calculations">
                    Accurate emissions data by location, activity, or supplier with minimal effort.
                  </FeatureItem>
                  <FeatureItem icon={Zap} title="AI-powered data collection">
                    AI agents that gather activity data across your organization automatically.
                  </FeatureItem>
                  <FeatureItem icon={BarChart3} title="Real-time dashboards">
                    Comprehensive visibility into Scope 1, 2, and 3 emissions in one place.
                  </FeatureItem>
                  <FeatureItem icon={FileText} title="Ready-to-submit reports">
                    Formatted reports for GHG Protocol, ISO 14064, and regulatory submissions.
                  </FeatureItem>
                </div>
              </div>
              <div className="bg-gradient-to-br from-teal-50 to-green-50 p-4 rounded-lg border border-teal-100">
                <div className="rounded-lg shadow-md w-full overflow-hidden">
                  <CarbonFootprintDashboard />
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Decarbonisation Tab Content */}
          <TabsContent value="decarbonisation" className="space-y-8">
            <div className="grid md:grid-cols-2 gap-10 items-center">
              <div>
                <h2 className="text-2xl font-bold mb-4 text-slate-800">
                  Decarbonisation: Go from Reporting to Action
                </h2>
                <p className="text-slate-600 mb-6">
                  Quantifier doesn't stop at carbon measurement—it helps you execute your decarbonization strategy. Set science-based targets, track reduction progress, and stay compliant with climate regulations.
                </p>
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-4 text-slate-800">You get:</h3>
                  <FeatureItem icon={Target} title="Science-based goal setting">
                    Establish targets aligned with SBTi pathways for credible climate action.
                  </FeatureItem>
                  <FeatureItem icon={Activity} title="Automated progress tracking">
                    Monitor emissions reduction initiatives with real-time data and insights.
                  </FeatureItem>
                  <FeatureItem icon={AlertCircle} title="Smart alerts">
                    Receive notifications when targets are off-track or risk thresholds are breached.
                  </FeatureItem>
                  <FeatureItem icon={Globe} title="Full data integration">
                    Connect with procurement, travel, and operations systems for comprehensive visibility.
                  </FeatureItem>
                </div>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-4 rounded-lg border border-green-100">
                <div className="rounded-lg shadow-md w-full overflow-hidden">
                  <DecarbonisationDashboard />
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* Why Choose Quantifier Section */}
        <div className="my-16 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-8 border border-green-100">
          <h2 className="text-2xl font-bold mb-6 text-center text-slate-800">
            Why Quantifier for Environmental Compliance?
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="p-6 border-green-100 bg-white/80">
              <Zap className="h-8 w-8 text-green-600 mb-4" />
              <h3 className="font-semibold text-slate-800 mb-2">AI-Native & Autonomous</h3>
              <p className="text-slate-600">Compliance agents collect data, follow up with teams, and drive timely reporting—so you don't have to.</p>
            </Card>
            
            <Card className="p-6 border-green-100 bg-white/80">
              <Clock className="h-8 w-8 text-green-600 mb-4" />
              <h3 className="font-semibold text-slate-800 mb-2">Always Up to Date</h3>
              <p className="text-slate-600">Get notified when regulations change and update your processes automatically—no lag, no consulting fees.</p>
            </Card>
            
            <Card className="p-6 border-green-100 bg-white/80">
              <Shield className="h-8 w-8 text-green-600 mb-4" />
              <h3 className="font-semibold text-slate-800 mb-2">End-to-End Coverage</h3>
              <p className="text-slate-600">Manage ISO 14001, LCAs, GHG reporting, and decarbonization in one secure platform.</p>
            </Card>
            
            <Card className="p-6 border-green-100 bg-white/80">
              <Leaf className="h-8 w-8 text-green-600 mb-4" />
              <h3 className="font-semibold text-slate-800 mb-2">Fast Implementation</h3>
              <p className="text-slate-600">Set up your environmental workflows in minutes. No complex onboarding required.</p>
            </Card>
          </div>
        </div>
        
        {/* Call to Action */}
        <div className="mt-10 text-center">
          <p className="text-lg text-slate-700 mb-6">
            Ready to Make Environmental Compliance Effortless?
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-green-600 hover:bg-green-700">
              Book a Demo <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline" className="border-green-200 text-green-700 hover:bg-green-50">
              Watch a Quick Tour
            </Button>
          </div>
        </div>
      </div>
    </PageTemplate>
  );
};

export default Environmental;
