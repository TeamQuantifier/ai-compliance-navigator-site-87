import { useState } from 'react';
import PageTemplate from '@/components/PageTemplate';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, FileText, Bell, Shield, Users, Clock, CheckCircle, Lock, AlertTriangle, BarChart3, Globe, MessageSquare } from 'lucide-react';
import LegalPoliciesDashboard from '@/components/dashboards/governance/LegalPoliciesDashboard';
import WhistleblowingDashboard from '@/components/dashboards/governance/WhistleblowingDashboard';
import { useLanguage } from '@/contexts/LanguageContext';

const Governance = () => {
  const [activeTab, setActiveTab] = useState("legal-policies");
  const { t, currentLocale } = useLanguage();
  const FeatureItem = ({
    icon: Icon,
    title,
    children
  }) => <div className="flex gap-3 mb-5">
      <div className="flex-shrink-0 mt-1">
        <div className="bg-purple-100 p-2 rounded-full">
          <Icon className="h-5 w-5 text-purple-600" />
        </div>
      </div>
      <div>
        <h4 className="font-medium text-slate-800 mb-1">{title}</h4>
        <p className="text-slate-600">{children}</p>
      </div>
    </div>;
  return <PageTemplate title={t('governancePage.title')} description={t('governancePage.description')}>
      <div className="max-w-6xl mx-auto">
        {/* Framework Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
          <TabsList className="grid grid-cols-2 w-full max-w-md mx-auto mb-8">
            <TabsTrigger value="legal-policies" className="data-[state=active]:bg-purple-100 data-[state=active]:text-purple-800">
              {t('governancePage.tabs.legalPolicies')}
            </TabsTrigger>
            <TabsTrigger value="whistleblowing" className="data-[state=active]:bg-purple-100 data-[state=active]:text-purple-800">
              {t('governancePage.tabs.whistleblowing')}
            </TabsTrigger>
          </TabsList>

          {/* Dashboard Sections - Added before the description content */}
          <TabsContent value="legal-policies" className="space-y-8">
            <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
              <h3 className="text-xl font-bold mb-6 text-slate-800">Legal Policies Dashboard</h3>
              <LegalPoliciesDashboard />
            </div>
            
            <div className="grid md:grid-cols-2 gap-10 items-center">
              <div>
                <h2 className="text-2xl font-bold mb-4 text-slate-800">
                  Legal Policies: From Documents to Day-to-Day Enforcement
                </h2>
                <p className="text-slate-600 mb-6">
                  Having policies isn't enough—compliance means they're read, understood, and followed. Quantifier ensures your legal frameworks don't sit in drawers. They're alive, automated, and actionable.
                </p>
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-4 text-slate-800">You get:</h3>
                  <FeatureItem icon={MessageSquare} title="AI-powered delivery">
                    AI agents that deliver policies directly to employees via Slack or email.
                  </FeatureItem>
                  <FeatureItem icon={CheckCircle} title="Automated workflows">
                    Automated read & acknowledge workflows and version control.
                  </FeatureItem>
                  <FeatureItem icon={FileText} title="Audit-ready evidence">
                    Evidence of acceptance, with audit-ready logs.
                  </FeatureItem>
                  <FeatureItem icon={Bell} title="Smart alerts">
                    Alerts for expired policies or pending acknowledgments.
                  </FeatureItem>
                  <FeatureItem icon={BarChart3} title="Real-time insights">
                    Real-time compliance dashboards and automated escalations.
                  </FeatureItem>
                </div>
              </div>
              
            </div>
          </TabsContent>

          {/* Whistleblowing Tab Content */}
          <TabsContent value="whistleblowing" className="space-y-8">
            <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
              <h3 className="text-xl font-bold mb-6 text-slate-800">Whistleblowing Dashboard</h3>
              <WhistleblowingDashboard />
            </div>
            
            <div className="grid md:grid-cols-2 gap-10 items-center">
              <div>
                <h2 className="text-2xl font-bold mb-4 text-slate-800">
                  Whistleblowing: Confidential, Compliant, Always Monitored
                </h2>
                <p className="text-slate-600 mb-6">
                  Stay ahead of regulation and foster a speak-up culture with Quantifier's secure, autonomous whistleblowing system—compliant with EU Whistleblower Directive, SOX, and other global frameworks.
                </p>
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-4 text-slate-800">You get:</h3>
                  <FeatureItem icon={Shield} title="Secure submission portal">
                    A secure, anonymous submission portal fully aligned with legal requirements.
                  </FeatureItem>
                  <FeatureItem icon={Users} title="AI-based triage">
                    AI-based triage and routing of reports to designated compliance officers.
                  </FeatureItem>
                  <FeatureItem icon={Clock} title="Time-stamped tracking">
                    Time-stamped case tracking and resolution workflows.
                  </FeatureItem>
                  <FeatureItem icon={FileText} title="Audit trails">
                    Audit trails and evidence logs for regulators and internal audits.
                  </FeatureItem>
                  <FeatureItem icon={Lock} title="Confidentiality controls">
                    Built-in retention, escalation, and confidentiality controls.
                  </FeatureItem>
                </div>
              </div>
              
            </div>
          </TabsContent>
        </Tabs>

        {/* Why Choose Quantifier Section */}
        <div className="my-16 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl p-8 border border-purple-100">
          <h2 className="text-2xl font-bold mb-6 text-center text-slate-800">
            Why Quantifier for Governance?
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="p-6 border-purple-100 bg-white/80">
              <CheckCircle className="h-8 w-8 text-purple-600 mb-4" />
              <h3 className="font-semibold text-slate-800 mb-2">Fully Autonomous Enforcement</h3>
              <p className="text-slate-600">Legal doesn't need to chase acknowledgments or monitor inboxes—our agents do it for you.</p>
            </Card>
            
            <Card className="p-6 border-purple-100 bg-white/80">
              <FileText className="h-8 w-8 text-purple-600 mb-4" />
              <h3 className="font-semibold text-slate-800 mb-2">Always Audit-Ready</h3>
              <p className="text-slate-600">Every interaction is logged, tracked, and instantly exportable for internal or external audits.</p>
            </Card>
            
            <Card className="p-6 border-purple-100 bg-white/80">
              <Shield className="h-8 w-8 text-purple-600 mb-4" />
              <h3 className="font-semibold text-slate-800 mb-2">Built-in Privacy & Compliance</h3>
              <p className="text-slate-600">Stay compliant with GDPR, SOX, EU Directive 2019/1937, and beyond.</p>
            </Card>
            
            <Card className="p-6 border-purple-100 bg-white/80">
              <Globe className="h-8 w-8 text-purple-600 mb-4" />
              <h3 className="font-semibold text-slate-800 mb-2">Multilingual, Multi-Entity Support</h3>
              <p className="text-slate-600">Roll out governance processes across countries and business units with ease.</p>
            </Card>
          </div>
        </div>
        
        {/* Call to Action */}
        <div className="mt-10 text-center">
          <p className="text-lg text-slate-700 mb-6">
            Take the Work Out of Governance
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-purple-600 hover:bg-purple-700">
              Book a Demo <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline" className="border-purple-200 text-purple-700 hover:bg-purple-50">
              Watch a Quick Tour
            </Button>
          </div>
        </div>
      </div>
    </PageTemplate>;
};
export default Governance;