import PageTemplate from '@/components/PageTemplate';
import { Globe, CheckCircle, ArrowRight, Shield, Users, FileText, Monitor, AlertTriangle, Building } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Link } from 'react-router-dom';
import GanttChart from '@/components/charts/GanttChart';
import ProcedureFlowMockup from '@/components/mockups/components/ProcedureFlowMockup';
import NIS2AnalyticsMockup from '@/components/mockups/components/NIS2AnalyticsMockup';
import ComplianceDashboardMockup from '@/components/mockups/components/ComplianceDashboardMockup';
const NisII = () => {
  const ganttTasks = [{
    id: 'onboarding',
    name: 'Onboarding (NIS2): Data, Assets, Risk, Register',
    startMonth: 1,
    duration: 1,
    roles: ['Administrator'],
    color: 'bg-gradient-to-r from-blue-500 to-blue-600'
  }, {
    id: 'gap-analysis',
    name: 'Gap Analysis & Implementation Strategy',
    startMonth: 1,
    duration: 1,
    roles: ['Administrator'],
    color: 'bg-gradient-to-r from-purple-500 to-purple-600'
  }, {
    id: 'implementation',
    name: 'Implementation: 19 Cybersecurity Policies',
    startMonth: 2,
    duration: 1,
    roles: ['Administrator', 'CISO'],
    color: 'bg-gradient-to-r from-green-500 to-green-600'
  }, {
    id: 'procedures',
    name: 'Procedures: Rollout, Monitoring, Verification',
    startMonth: 3,
    duration: 3,
    roles: ['Administrator', 'CISO', 'HR Manager', 'Asset Manager'],
    color: 'bg-gradient-to-r from-orange-500 to-orange-600'
  }, {
    id: 'continuous',
    name: 'Continuous Compliance: Risk Monitoring, Incident Management, Reporting',
    startMonth: 1,
    duration: 6,
    roles: ['AI', 'Administrator'],
    color: 'bg-gradient-to-r from-cyan-500 to-cyan-600',
    isContinuous: true
  }];
  return <PageTemplate title="NIS 2 Directive (EU)" description="Comprehensive NIS2 compliance solution with AI-native workflows for European organizations.">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <section className="mb-20">
          <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 rounded-2xl p-8 md:p-16 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-purple-500/10"></div>
            <div className="relative z-10">
              <div className="flex flex-col lg:flex-row items-start gap-12">
                <div className="lg:w-1/2">
                  <div className="inline-flex items-center px-4 py-2 rounded-full bg-cyan-500/20 text-cyan-300 mb-6 border border-cyan-500/30">
                    <Shield className="w-5 h-5 mr-2" />
                    <span className="font-medium">NIS 2 Directive</span>
                  </div>
                  <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-cyan-200 to-blue-200 bg-clip-text text-transparent">
                    NIS2 Compliance Made Simple
                  </h1>
                  <p className="text-xl md:text-2xl opacity-90 mb-8 text-slate-300">Navigate EU cybersecurity requirements with confidence in weeks, not moths</p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    
                    
                  </div>
                </div>
                <div className="lg:w-1/2">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-blue-400/20 rounded-xl blur-3xl"></div>
                    <div className="relative bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                      <h3 className="text-xl font-semibold mb-4 text-white">Check how Quantifier can help you</h3>
                      <form className="space-y-4">
                        <div>
                          <Label htmlFor="name" className="text-white/90 text-sm">Name</Label>
                          <Input id="name" placeholder="Enter your name" className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-cyan-400" />
                        </div>
                        <div>
                          <Label htmlFor="email" className="text-white/90 text-sm">Work Email</Label>
                          <Input id="email" type="email" placeholder="Enter your work email" className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-cyan-400" />
                        </div>
                        <div>
                          
                          
                        </div>
                        <div className="flex items-start space-x-2 pt-2">
                          <Checkbox id="marketing" className="border-white/30 data-[state=checked]:bg-cyan-500" />
                          <Label htmlFor="marketing" className="text-xs text-white/80 leading-relaxed">
                            I consent to Quantifier processing my personal data to send me marketing communications about NIS2 compliance solutions. You can unsubscribe at any time.
                          </Label>
                        </div>
                        <Button className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-medium">
                          Request Demo
                        </Button>
                      </form>
                    </div>
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
                <h3 className="text-xl font-semibold mb-3 text-slate-900">Risk Assessment</h3>
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
                <h3 className="text-xl font-semibold mb-3 text-slate-900">Policy & Procedures Automation</h3>
                <p className="text-slate-600">Deploy and manage all required cybersecurity policies with automated updates and compliance tracking.</p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300">
                <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg flex items-center justify-center mb-4">
                  <Globe className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-slate-900">Multi-Jurisdiction Support</h3>
                <p className="text-slate-600">Continuously assessing vendor risks, enforcing contractual obligations, and ensuring timely incident reporting across all partners.</p>
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
              <span className="font-medium">Turn NIS2 From Obligation Into Operational Advantage
            </span>
            </div>
          </div>

          {/* Gantt Chart */}
          <div className="mb-12">
            <GanttChart title="NIS2 Implementation Timeline" subtitle="Complete roadmap from initial onboarding to continuous compliance monitoring" tasks={ganttTasks} />
          </div>


        </section>

        {/* Platform Mockups Section */}
        <section className="mb-20">
          <div className="text-center mb-12">
            
            
          </div>

            
        </section>

        {/* Results Section */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
              Results After Implementing Quantifier / NIS2
            </h2>
            <p className="text-xl text-slate-600 max-w-4xl mx-auto mb-8">
              Upon completion of the implementation, your organization has a comprehensive system for risk, security, and compliance management.
            </p>
            
            {/* Success Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16 max-w-4xl mx-auto">
              <div className="text-center animate-fade-in">
                <div className="text-3xl md:text-4xl font-bold text-green-600 mb-2">100%</div>
                <div className="text-sm text-slate-600">NIS2 Compliance Coverage</div>
              </div>
              <div className="text-center animate-fade-in" style={{
              animationDelay: '0.1s'
            }}>
                <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">6</div>
                <div className="text-sm text-slate-600">Key Areas Addressed</div>
              </div>
              <div className="text-center animate-fade-in" style={{
              animationDelay: '0.2s'
            }}>
                <div className="text-3xl md:text-4xl font-bold text-purple-600 mb-2">24/7</div>
                <div className="text-sm text-slate-600">Continuous Monitoring</div>
              </div>
              <div className="text-center animate-fade-in" style={{
              animationDelay: '0.3s'
            }}>
                <div className="text-3xl md:text-4xl font-bold text-cyan-600 mb-2">24h</div>
                <div className="text-sm text-slate-600">Incident Response Time</div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Risk Assessment */}
            <div className="group animate-fade-in hover-scale" style={{
            animationDelay: '0.1s'
          }}>
              <Card className="border-slate-200 hover:shadow-xl hover:border-red-200 transition-all duration-500 h-full">
                <CardHeader className="pb-4">
                  <div className="w-14 h-14 bg-gradient-to-r from-red-500 to-red-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <AlertTriangle className="w-7 h-7 text-white" />
                  </div>
                  <CardTitle className="text-xl font-semibold">Risk Assessment</CardTitle>
                  
                  
                </CardHeader>
                <CardContent className="pt-0">
                  <ul className="text-slate-600 space-y-3">
                    <li className="flex items-start">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      Complete list of identified risks and vulnerabilities
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      Probability and impact analysis with clear metrics
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      Risk evaluation with assigned significance levels
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      Comprehensive risk management plan
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      Technical and organizational controls implemented
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* Crisis Management */}
            <div className="group animate-fade-in hover-scale" style={{
            animationDelay: '0.2s'
          }}>
              <Card className="border-slate-200 hover:shadow-xl hover:border-orange-200 transition-all duration-500 h-full">
                <CardHeader className="pb-4">
                  <div className="w-14 h-14 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <Shield className="w-7 h-7 text-white" />
                  </div>
                  <CardTitle className="text-xl font-semibold">Crisis Management</CardTitle>
                  
                  
                </CardHeader>
                <CardContent className="pt-0">
                  <ul className="text-slate-600 space-y-3">
                    <li className="flex items-start">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      Ready crisis communication plans
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      Identified critical technologies and operations
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      Defined priorities for system recovery
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      Coordinated action procedures
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* Incidents */}
            <div className="group animate-fade-in hover-scale" style={{
            animationDelay: '0.3s'
          }}>
              <Card className="border-slate-200 hover:shadow-xl hover:border-yellow-200 transition-all duration-500 h-full">
                <CardHeader className="pb-4">
                  <div className="w-14 h-14 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <FileText className="w-7 h-7 text-white" />
                  </div>
                  <CardTitle className="text-xl font-semibold">Incidents</CardTitle>
                  
                  
                </CardHeader>
                <CardContent className="pt-0">
                  <ul className="text-slate-600 space-y-3">
                    <li className="flex items-start">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      Classified incident types with assessment criteria
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      Efficient reporting and management system
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      Internal and external reporting procedures
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      Comprehensive incident handling tools
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* Employees and Training */}
            <div className="group animate-fade-in hover-scale" style={{
            animationDelay: '0.4s'
          }}>
              <Card className="border-slate-200 hover:shadow-xl hover:border-blue-200 transition-all duration-500 h-full">
                <CardHeader className="pb-4">
                  <div className="w-14 h-14 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <Users className="w-7 h-7 text-white" />
                  </div>
                  <CardTitle className="text-xl font-semibold">Employees and Training</CardTitle>
                  
                  
                </CardHeader>
                <CardContent className="pt-0">
                  <ul className="text-slate-600 space-y-3">
                    <li className="flex items-start">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      Assigned responsibilities for all employees
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      Regular training programs implemented
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      Enhanced security awareness and competencies
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      HR and recruitment standards compliance
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* Suppliers */}
            <div className="group animate-fade-in hover-scale" style={{
            animationDelay: '0.5s'
          }}>
              <Card className="border-slate-200 hover:shadow-xl hover:border-purple-200 transition-all duration-500 h-full">
                <CardHeader className="pb-4">
                  <div className="w-14 h-14 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <Building className="w-7 h-7 text-white" />
                  </div>
                  <CardTitle className="text-xl font-semibold">Suppliers</CardTitle>
                  
                  
                </CardHeader>
                <CardContent className="pt-0">
                  <ul className="text-slate-600 space-y-3">
                    <li className="flex items-start">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      Supplier audits conducted and compliance confirmed
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      Communication obligations fulfilled
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      Required information provision under NIS2
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      Incident response coordination established
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* Assets and Security Measures */}
            <div className="group animate-fade-in hover-scale" style={{
            animationDelay: '0.6s'
          }}>
              <Card className="border-slate-200 hover:shadow-xl hover:border-green-200 transition-all duration-500 h-full">
                <CardHeader className="pb-4">
                  <div className="w-14 h-14 bg-gradient-to-r from-green-500 to-green-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <Monitor className="w-7 h-7 text-white" />
                  </div>
                  <CardTitle className="text-xl font-semibold">Assets and Security Measures</CardTitle>
                  
                  
                </CardHeader>
                <CardContent className="pt-0">
                  <ul className="text-slate-600 space-y-3">
                    <li className="flex items-start">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      Complete asset inventory with responsible persons
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      Tailored security measures for each asset
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      Asset classification by significance
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      Security requirements properly assigned
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Bottom Summary */}
          <div className="mt-16 text-center animate-fade-in" style={{
          animationDelay: '0.8s'
        }}>
            
          </div>
        </section>

        {/* Continuous Compliance Operations */}
        <section className="mb-20">
          <div className="bg-gradient-to-r from-cyan-900/10 via-blue-900/10 to-purple-900/10 rounded-2xl p-8 border border-cyan-200/20">
            <div className="flex items-center justify-center mb-6">
              
            </div>
            <h3 className="text-2xl font-bold text-center mb-4 text-slate-900">
              Continuous Compliance Operations
            </h3>
            <p className="text-lg text-slate-600 text-center mb-6 max-w-3xl mx-auto">
              Once implemented, our AI agents take over continuous monitoring, risk assessment, incident management, and regulatory reporting — ensuring your NIS2 compliance never lapses.
            </p>
            
            {/* Request Demo Form */}
            <div className="max-w-md mx-auto bg-white p-6 rounded-lg border border-slate-200 shadow-sm">
              <h4 className="text-lg font-semibold text-slate-900 mb-4 text-center">Request a Demo</h4>
              <form className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                    placeholder="Enter your full name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                    placeholder="Enter your email address"
                  />
                </div>
                <div className="flex items-start">
                  <input
                    type="checkbox"
                    id="marketing"
                    name="marketing"
                    className="mt-1 h-4 w-4 text-cyan-600 border-slate-300 rounded focus:ring-cyan-500"
                  />
                  <label htmlFor="marketing" className="ml-2 text-sm text-slate-600">
                    I agree to receive marketing communications and updates about NIS2 compliance solutions
                  </label>
                </div>
                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white"
                >
                  Request Demo
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </form>
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="mb-12">
          
        </section>
      </div>
    </PageTemplate>;
};
export default NisII;