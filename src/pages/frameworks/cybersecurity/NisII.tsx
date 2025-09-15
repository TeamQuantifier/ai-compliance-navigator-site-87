
import PageTemplate from '@/components/PageTemplate';
import { Globe, CheckCircle, ArrowRight, Shield, Users, FileText, Monitor, AlertTriangle, Building } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import GanttChart from '@/components/charts/GanttChart';

const NisII = () => {
  const ganttTasks = [
    {
      id: 'onboarding',
      name: 'Onboarding (NIS2): Data, Assets, Risk, Register',
      startMonth: 1,
      duration: 1,
      roles: ['Administrator'],
      color: 'bg-gradient-to-r from-blue-500 to-blue-600',
    },
    {
      id: 'gap-analysis',
      name: 'Gap Analysis & Implementation Strategy',
      startMonth: 1,
      duration: 1,
      roles: ['Administrator'],
      color: 'bg-gradient-to-r from-purple-500 to-purple-600',
    },
    {
      id: 'implementation',
      name: 'Implementation: 19 Cybersecurity Policies',
      startMonth: 2,
      duration: 1,
      roles: ['Administrator', 'CISO'],
      color: 'bg-gradient-to-r from-green-500 to-green-600',
    },
    {
      id: 'procedures',
      name: 'Procedures: Rollout, Monitoring, Verification',
      startMonth: 3,
      duration: 3,
      roles: ['Administrator', 'CISO', 'HR Manager', 'Asset Manager'],
      color: 'bg-gradient-to-r from-orange-500 to-orange-600',
    },
    {
      id: 'continuous',
      name: 'Continuous Compliance: Risk Monitoring, Incident Management, Reporting',
      startMonth: 1,
      duration: 6,
      roles: ['AI', 'Administrator'],
      color: 'bg-gradient-to-r from-cyan-500 to-cyan-600',
      isContinuous: true,
    },
  ];

  return (
    <PageTemplate
      title="NIS 2 Directive (EU)"
      description="Comprehensive NIS2 compliance solution with AI-native workflows for European organizations."
    >
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <section className="mb-20">
          <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 rounded-2xl p-8 md:p-16 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-purple-500/10"></div>
            <div className="relative z-10">
              <div className="flex flex-col lg:flex-row items-center gap-12">
                <div className="lg:w-3/5">
                  <div className="inline-flex items-center px-4 py-2 rounded-full bg-cyan-500/20 text-cyan-300 mb-6 border border-cyan-500/30">
                    <Shield className="w-5 h-5 mr-2" />
                    <span className="font-medium">NIS 2 Directive Landing Page</span>
                  </div>
                  <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-cyan-200 to-blue-200 bg-clip-text text-transparent">
                    NIS2 Compliance Made Simple
                  </h1>
                  <p className="text-xl md:text-2xl opacity-90 mb-8 text-slate-300">
                    Navigate EU cybersecurity requirements with confidence. Our AI-native platform transforms complex NIS2 obligations into streamlined, automated workflows.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button size="lg" className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white px-8 py-4 text-lg">
                      <Link to="/contact" className="flex items-center">
                        Get Started <ArrowRight className="ml-2 h-6 w-6" />
                      </Link>
                    </Button>
                    <Button variant="outline" size="lg" className="border-white/20 text-white hover:bg-white/10 px-8 py-4 text-lg">
                      Learn More
                    </Button>
                  </div>
                </div>
                <div className="lg:w-2/5">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-blue-400/20 rounded-xl blur-3xl"></div>
                    <img 
                      src="/lovable-uploads/9c1dd21a-e99c-4c0d-b845-8ca517904897.png" 
                      alt="NIS2 Compliance Dashboard" 
                      className="relative rounded-xl shadow-2xl border border-white/20 w-full transform hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* What is NIS2 Section */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
              Understanding the NIS 2 Directive
            </h2>
            <p className="text-xl text-slate-600 max-w-4xl mx-auto">
              The Network and Information Security (NIS) 2 Directive strengthens cybersecurity across the EU, expanding requirements to more sectors and organizations.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <Card className="border-slate-200 hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center mb-4">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-xl">What is NIS2?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600">
                  An EU directive that establishes cybersecurity requirements for essential and important entities across 18 sectors, including energy, transport, banking, health, and digital infrastructure.
                </p>
              </CardContent>
            </Card>

            <Card className="border-slate-200 hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg flex items-center justify-center mb-4">
                  <Building className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-xl">Who Must Comply?</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-slate-600 space-y-2">
                  <li>• Medium & large enterprises (50+ employees OR €10M+ turnover)</li>
                  <li>• Essential entities in critical sectors</li>
                  <li>• Important entities in key sectors</li>
                  <li>• Digital service providers</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-slate-200 hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-xl">Key Requirements</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-slate-600 space-y-2">
                  <li>• Risk management measures</li>
                  <li>• Incident handling & reporting</li>
                  <li>• Business continuity planning</li>
                  <li>• Supply chain security</li>
                  <li>• Management accountability</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* How Quantifier Helps */}
        <section className="mb-20">
          <div className="bg-gradient-to-r from-slate-50 to-blue-50 rounded-2xl p-8 md:p-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-slate-900">
                How Quantifier Transforms NIS2 Compliance
              </h2>
              <p className="text-xl text-slate-600 max-w-4xl mx-auto">
                Our AI-native platform eliminates complexity, automates workflows, and ensures continuous compliance across your entire organization.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300">
                <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-cyan-600 rounded-lg flex items-center justify-center mb-4">
                  <Monitor className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-slate-900">Automated Risk Assessment</h3>
                <p className="text-slate-600">
                  AI-powered continuous monitoring identifies vulnerabilities and assesses risks across your digital infrastructure in real-time.
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-slate-900">Role-Based Workflows</h3>
                <p className="text-slate-600">
                  Intelligent task assignment ensures the right people handle compliance activities across IT, legal, and operations teams.
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg flex items-center justify-center mb-4">
                  <AlertTriangle className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-slate-900">Incident Management</h3>
                <p className="text-slate-600">
                  Streamlined incident detection, response, and reporting workflows that meet NIS2 notification requirements.
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex items-center justify-center mb-4">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-slate-900">Policy Automation</h3>
                <p className="text-slate-600">
                  Deploy and manage all 19 required cybersecurity policies with automated updates and compliance tracking.
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300">
                <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg flex items-center justify-center mb-4">
                  <Globe className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-slate-900">Multi-Jurisdiction Support</h3>
                <p className="text-slate-600">
                  Scale compliance across different EU member states with localized requirements and reporting capabilities.
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300">
                <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-red-600 rounded-lg flex items-center justify-center mb-4">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-slate-900">Audit-Ready Documentation</h3>
                <p className="text-slate-600">
                  Generate comprehensive compliance reports and maintain audit trails that demonstrate NIS2 adherence.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* NIS2 AI-Native Compliance Module Section */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
              NIS2 AI-Native Compliance Module
            </h2>
            <p className="text-xl text-slate-600 max-w-4xl mx-auto mb-8">
              Our AI-native compliance module helps organizations achieve NIS2 compliance using intelligent workflows — from onboarding and gap analysis to policy implementation and continuous monitoring.
            </p>
            <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-cyan-500/10 to-blue-500/10 text-slate-700 border border-cyan-200">
              <Shield className="w-5 h-5 mr-2 text-cyan-600" />
              <span className="font-medium">From NIS2 Onboarding to Continuous Compliance – All in One Platform</span>
            </div>
          </div>

          {/* Gantt Chart */}
          <div className="mb-12">
            <GanttChart 
              title="NIS2 Implementation Timeline"
              subtitle="Complete roadmap from initial onboarding to continuous compliance monitoring"
              tasks={ganttTasks}
            />
          </div>

          {/* Implementation Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <Card className="border-slate-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-gradient-to-r from-blue-500 to-blue-600"></div>
                  Phase 1: Rapid Onboarding
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 mb-4">
                  <strong>Duration:</strong> 5-15 hours | <strong>Owner:</strong> Administrator
                </p>
                <ul className="space-y-2 text-slate-600">
                  <li>• Automated data discovery and asset inventory</li>
                  <li>• AI-powered risk assessment and classification</li>
                  <li>• Regulatory scope determination and entity register</li>
                  <li>• Initial compliance gap identification</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-slate-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-gradient-to-r from-purple-500 to-purple-600"></div>
                  Phase 2: Strategic Planning
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 mb-4">
                  <strong>Duration:</strong> 1 hour | <strong>Owner:</strong> Administrator
                </p>
                <ul className="space-y-2 text-slate-600">
                  <li>• Comprehensive gap analysis report</li>
                  <li>• Tailored implementation roadmap</li>
                  <li>• Resource allocation and team assignment</li>
                  <li>• Integration planning for existing systems</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-slate-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-gradient-to-r from-green-500 to-green-600"></div>
                  Phase 3: Policy Implementation
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 mb-4">
                  <strong>Duration:</strong> 1 month | <strong>Owners:</strong> Administrator & CISO
                </p>
                <ul className="space-y-2 text-slate-600">
                  <li>• Deployment of 19 cybersecurity policies</li>
                  <li>• Automated policy customization for your organization</li>
                  <li>• Management approval workflows</li>
                  <li>• Policy integration with existing frameworks</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-slate-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-gradient-to-r from-orange-500 to-orange-600"></div>
                  Phase 4: Operational Rollout
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 mb-4">
                  <strong>Duration:</strong> 1-3 months | <strong>Owners:</strong> Multi-team collaboration
                </p>
                <ul className="space-y-2 text-slate-600">
                  <li>• Procedure implementation and staff training</li>
                  <li>• Monitoring system deployment and verification</li>
                  <li>• Incident response workflow activation</li>
                  <li>• Supply chain security assessment</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Continuous Compliance Highlight */}
          <div className="bg-gradient-to-r from-cyan-900/10 via-blue-900/10 to-purple-900/10 rounded-2xl p-8 border border-cyan-200/20">
            <div className="flex items-center justify-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center">
                <Monitor className="w-8 h-8 text-white" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-center mb-4 text-slate-900">
              Continuous Compliance Operations
            </h3>
            <p className="text-lg text-slate-600 text-center mb-6 max-w-3xl mx-auto">
              Once implemented, our AI agents take over continuous monitoring, risk assessment, incident management, and regulatory reporting — ensuring your NIS2 compliance never lapses.
            </p>
            <div className="flex justify-center">
              <Button className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white px-8 py-3">
                Request a Demo of NIS2 AI-Native Compliance Module
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="mb-12">
          <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 rounded-2xl p-8 md:p-16 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-purple-500/10"></div>
            <div className="relative z-10 text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Ready to Achieve NIS2 Compliance?
              </h2>
              <p className="text-xl opacity-90 mb-8 max-w-3xl mx-auto">
                Join European organizations that trust our AI-native platform to automate their NIS2 compliance journey from start to finish.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button size="lg" className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white px-8 py-4 text-lg">
                  <Link to="/contact" className="flex items-center">
                    Book a Demo <ArrowRight className="ml-2 h-6 w-6" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" className="border-white/20 text-white hover:bg-white/10 px-8 py-4 text-lg">
                  Download NIS2 Guide
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </PageTemplate>
  );
};

export default NisII;
