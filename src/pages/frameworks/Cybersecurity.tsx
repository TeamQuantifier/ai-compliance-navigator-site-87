
import PageTemplate from '@/components/PageTemplate';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, CheckCircle, Lock, FileCheck, AlertTriangle, Server, Clock, Zap, Globe, ArrowRight } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

const Cybersecurity = () => {
  return (
    <PageTemplate
      title="Cybersecurity Frameworks"
      description="Ensure your systems and data are protected with comprehensive cybersecurity compliance solutions."
    >
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <section className="mb-16">
          <div className="bg-gradient-to-r from-compliance-800 to-innovation-800 rounded-xl p-8 md:p-12 text-white flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-3/5">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Cybersecurity Compliance That Handles Itself
              </h2>
              <p className="text-xl opacity-90 mb-6">
                From SOC to NIS 2 — stay secure, audit-ready, and fully aligned. Automatically.
              </p>
              <Button size="lg" className="bg-white text-compliance-800 hover:bg-white/90">
                Book a Demo <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
            <div className="md:w-2/5">
              <img 
                src="https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
                alt="Cybersecurity Dashboard" 
                className="rounded-lg shadow-lg border border-white/20 w-full"
              />
            </div>
          </div>
        </section>

        {/* Built for Modern Security Demands */}
        <section className="mb-16">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="md:w-1/2">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-compliance-100 text-compliance-800 mb-4">
                <Shield className="w-5 h-5 mr-2" />
                <span className="font-medium">Built for Modern Security Demands</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold mb-4 gradient-heading">
                Automate Your Compliance Journey
              </h2>
              <p className="text-lg text-slate-700 mb-6">
                Cybersecurity frameworks are complex. Staying compliant shouldn't be. 
                Our autonomous agents manage every step—from assigning tasks to collecting audit-ready 
                evidence—so you can focus on what matters.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-compliance-600 mt-1 mr-2" />
                  <span className="text-slate-700">Continuous Monitoring</span>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-compliance-600 mt-1 mr-2" />
                  <span className="text-slate-700">Automated Evidence</span>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-compliance-600 mt-1 mr-2" />
                  <span className="text-slate-700">Risk Identification</span>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-compliance-600 mt-1 mr-2" />
                  <span className="text-slate-700">Real-time Alerts</span>
                </div>
              </div>
            </div>
            <div className="md:w-1/2">
              <img 
                src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2034&q=80" 
                alt="Security Dashboard" 
                className="rounded-xl shadow-lg border border-slate-200 w-full"
              />
            </div>
          </div>
        </section>

        {/* Supported Frameworks */}
        <section className="mb-16">
          <div className="text-center mb-10">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-compliance-100 text-compliance-800 mb-4">
              <Lock className="w-5 h-5 mr-2" />
              <span className="font-medium">Supported Frameworks</span>
            </div>
            <h2 className="text-3xl font-bold mb-4 gradient-heading">
              Comprehensive Framework Coverage
            </h2>
            <p className="text-lg text-slate-700 max-w-3xl mx-auto">
              Our platform supports the most important cybersecurity frameworks, helping you stay compliant 
              across multiple standards simultaneously.
            </p>
          </div>

          <Tabs defaultValue="soc" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="soc" className="text-base py-3">SOC 1 & SOC 2</TabsTrigger>
              <TabsTrigger value="nis2" className="text-base py-3">NIS 2 Directive (EU)</TabsTrigger>
              <TabsTrigger value="nist" className="text-base py-3">NIST Cybersecurity</TabsTrigger>
            </TabsList>
            
            <div className="bg-slate-50 p-1 rounded-xl">
              <TabsContent value="soc" className="mt-0">
                <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-100">
                  <div className="flex flex-col lg:flex-row gap-8">
                    <div className="lg:w-1/2">
                      <div className="flex items-center mb-4">
                        <Shield className="h-8 w-8 text-compliance-600 mr-3" />
                        <h3 className="text-2xl font-bold text-slate-900">SOC 1 & SOC 2</h3>
                      </div>
                      <p className="text-lg font-medium text-slate-800 mb-4">
                        Demonstrate trust to your customers, investors, and partners.
                      </p>
                      <p className="text-slate-700 mb-6">
                        Our platform ensures continuous readiness for both SOC 1 and SOC 2, covering controls 
                        around data handling, privacy, availability, and more.
                      </p>
                      
                      <h4 className="font-semibold text-lg mb-3">You get:</h4>
                      <ul className="space-y-2 mb-6">
                        <li className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-compliance-600 mt-1 mr-2 flex-shrink-0" />
                          <span>Automated task assignment & evidence collection</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-compliance-600 mt-1 mr-2 flex-shrink-0" />
                          <span>Control monitoring across the Trust Services Criteria</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-compliance-600 mt-1 mr-2 flex-shrink-0" />
                          <span>Real-time audit readiness dashboards</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-compliance-600 mt-1 mr-2 flex-shrink-0" />
                          <span>Secure data mapping to controls</span>
                        </li>
                      </ul>
                    </div>
                    <div className="lg:w-1/2">
                      <img 
                        src="https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
                        alt="SOC Compliance Dashboard" 
                        className="rounded-lg shadow-md w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="nis2" className="mt-0">
                <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-100">
                  <div className="flex flex-col lg:flex-row gap-8">
                    <div className="lg:w-1/2">
                      <div className="flex items-center mb-4">
                        <Globe className="h-8 w-8 text-compliance-600 mr-3" />
                        <h3 className="text-2xl font-bold text-slate-900">NIS 2 Directive (EU)</h3>
                      </div>
                      <p className="text-lg font-medium text-slate-800 mb-4">
                        Stay ahead of critical infrastructure security regulations.
                      </p>
                      <p className="text-slate-700 mb-6">
                        NIS 2 expands cybersecurity obligations across sectors in the EU. Our platform keeps you
                        ahead—automatically identifying risks, assigning responsibilities, and ensuring compliance across your organization.
                      </p>
                      
                      <h4 className="font-semibold text-lg mb-3">You get:</h4>
                      <ul className="space-y-2 mb-6">
                        <li className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-compliance-600 mt-1 mr-2 flex-shrink-0" />
                          <span>AI agents driving real-time policy checks & enforcement</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-compliance-600 mt-1 mr-2 flex-shrink-0" />
                          <span>Role-based actioning for IT, legal, and ops teams</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-compliance-600 mt-1 mr-2 flex-shrink-0" />
                          <span>Gap analysis aligned with NIS 2 mandates</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-compliance-600 mt-1 mr-2 flex-shrink-0" />
                          <span>Scalable compliance across multiple jurisdictions</span>
                        </li>
                      </ul>
                    </div>
                    <div className="lg:w-1/2">
                      <img 
                        src="https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
                        alt="NIS 2 Compliance Dashboard" 
                        className="rounded-lg shadow-md w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="nist" className="mt-0">
                <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-100">
                  <div className="flex flex-col lg:flex-row gap-8">
                    <div className="lg:w-1/2">
                      <div className="flex items-center mb-4">
                        <FileCheck className="h-8 w-8 text-compliance-600 mr-3" />
                        <h3 className="text-2xl font-bold text-slate-900">NIST Cybersecurity Framework</h3>
                      </div>
                      <p className="text-lg font-medium text-slate-800 mb-4">
                        Align your organization to the gold standard in security.
                      </p>
                      <p className="text-slate-700 mb-6">
                        From Identify to Recover—our platform automates NIST implementation by continuously mapping your assets, risks, and mitigations to the five NIST functions.
                      </p>
                      
                      <h4 className="font-semibold text-lg mb-3">You get:</h4>
                      <ul className="space-y-2 mb-6">
                        <li className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-compliance-600 mt-1 mr-2 flex-shrink-0" />
                          <span>Intelligent asset and risk mapping</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-compliance-600 mt-1 mr-2 flex-shrink-0" />
                          <span>Proactive tasking aligned with NIST categories</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-compliance-600 mt-1 mr-2 flex-shrink-0" />
                          <span>Integrated reporting for regulators and auditors</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-compliance-600 mt-1 mr-2 flex-shrink-0" />
                          <span>Alerts when controls fall out of scope</span>
                        </li>
                      </ul>
                    </div>
                    <div className="lg:w-1/2">
                      <img 
                        src="https://images.unsplash.com/photo-1591453089816-0fbb971b454c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
                        alt="NIST Compliance Dashboard" 
                        className="rounded-lg shadow-md w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </section>

        {/* Why Quantifier */}
        <section className="mb-16">
          <div className="text-center mb-10">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-compliance-100 text-compliance-800 mb-4">
              <AlertTriangle className="w-5 h-5 mr-2" />
              <span className="font-medium">Why Choose Our Platform</span>
            </div>
            <h2 className="text-3xl font-bold mb-4 gradient-heading">
              Why Our Platform for Cybersecurity Compliance?
            </h2>
            <p className="text-lg text-slate-700 max-w-3xl mx-auto">
              Our automated approach to cybersecurity compliance helps organizations stay secure
              while reducing the resource burden of manual compliance work.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="border-compliance-100 hover:border-compliance-300 transition-all card-hover">
              <CardHeader className="pb-2">
                <Clock className="h-12 w-12 text-compliance-500 mb-2" />
                <CardTitle>Always-On Compliance</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base text-slate-700">
                  Agents run 24/7, so you're always prepared for audits and compliance reviews.
                </CardDescription>
              </CardContent>
            </Card>
            
            <Card className="border-compliance-100 hover:border-compliance-300 transition-all card-hover">
              <CardHeader className="pb-2">
                <Zap className="h-12 w-12 text-compliance-500 mb-2" />
                <CardTitle>Zero Manual Oversight</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base text-slate-700">
                  Tasks are assigned, followed up, and closed—without project managers or manual tracking.
                </CardDescription>
              </CardContent>
            </Card>
            
            <Card className="border-compliance-100 hover:border-compliance-300 transition-all card-hover">
              <CardHeader className="pb-2">
                <Shield className="h-12 w-12 text-compliance-500 mb-2" />
                <CardTitle>Full Framework Coverage</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base text-slate-700">
                  SOC 1 & 2, NIS 2, NIST—and growing library of supported frameworks and standards.
                </CardDescription>
              </CardContent>
            </Card>
            
            <Card className="border-compliance-100 hover:border-compliance-300 transition-all card-hover">
              <CardHeader className="pb-2">
                <ArrowRight className="h-12 w-12 text-compliance-500 mb-2" />
                <CardTitle>Faster Rollout</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base text-slate-700">
                  Go live in hours, not months, with pre-configured controls and compliance templates.
                </CardDescription>
              </CardContent>
            </Card>
            
            <Card className="border-compliance-100 hover:border-compliance-300 transition-all card-hover">
              <CardHeader className="pb-2">
                <Globe className="h-12 w-12 text-compliance-500 mb-2" />
                <CardTitle>Global-Ready</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base text-slate-700">
                  Designed for multi-entity, multi-region compliance across various regulatory landscapes.
                </CardDescription>
              </CardContent>
            </Card>
            
            <Card className="border-compliance-100 hover:border-compliance-300 transition-all card-hover">
              <CardHeader className="pb-2">
                <Server className="h-12 w-12 text-compliance-500 mb-2" />
                <CardTitle>Evidence Automation</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base text-slate-700">
                  Automatically collect, organize, and maintain evidence needed for audits and certification.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* CTA Section */}
        <section className="mb-8">
          <div className="bg-gradient-to-r from-compliance-800 to-innovation-700 rounded-xl p-8 md:p-12 text-white">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Let's Secure Your Organization. Automatically.
              </h2>
              <p className="text-xl opacity-90 mb-8">
                Join hundreds of organizations that trust our platform to automate their cybersecurity compliance.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button size="lg" className="bg-white text-compliance-800 hover:bg-white/90 px-8">
                  Book a Demo <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button variant="outline" size="lg" className="border-white/20 text-white hover:bg-white/10">
                  Watch Platform Tour
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </PageTemplate>
  );
};

export default Cybersecurity;
