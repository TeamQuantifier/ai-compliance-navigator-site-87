import PageTemplate from '@/components/PageTemplate';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { UserCog, User, FileCheck, Users, ArrowRight, CheckCircle, BarChart3, Calendar, Zap, Shield, Lock, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
const ByRoles = () => {
  return <PageTemplate title="Built for Every Role" description="Whether you're driving strategy, contributing data, or verifying controls — Quantifier is tailored to you.">
      {/* Hero section with darker colors */}
      <div className="bg-slate-900 text-white py-16 px-6 rounded-xl mb-12 relative overflow-hidden shadow-xl">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-innovation-800 rounded-full blur-3xl opacity-20 -z-10"></div>
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-compliance-800 rounded-full blur-3xl opacity-20 -z-10"></div>
        
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center justify-center p-4 bg-slate-800 rounded-full mb-8 border border-slate-700 shadow-lg">
            <Users className="h-10 w-10 text-innovation-400" />
          </div>
          <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
            Role-Based Access and Functionality
          </h2>
          <p className="text-lg text-slate-300 mb-8">
            We understand that different roles have different compliance needs. Our platform provides tailored experiences for managers, contributors, and auditors, ensuring everyone has the right tools for their specific responsibilities.
          </p>
        </div>
      </div>

      {/* Tabs with role-specific content */}
      <div className="mb-20">
        <Tabs defaultValue="managers" className="w-full">
          <TabsList className="w-full grid grid-cols-3 mb-8">
            <TabsTrigger value="managers" className="py-6 text-slate-900 bg-slate-200 hover:bg-slate-100">
              <UserCog className="h-5 w-5 mr-2" />
              Managers
            </TabsTrigger>
            <TabsTrigger value="contributors" className="data-[state=active]:bg-innovation-900 data-[state=active]:text-white py-6">
              <User className="h-5 w-5 mr-2" />
              Contributors
            </TabsTrigger>
            <TabsTrigger value="auditors" className="data-[state=active]:bg-compliance-900 data-[state=active]:text-white py-6">
              <FileCheck className="h-5 w-5 mr-2" />
              Auditors
            </TabsTrigger>
          </TabsList>

          {/* Managers Tab Content */}
          <TabsContent value="managers" className="mt-6">
            <div className="bg-slate-900 text-white rounded-xl p-8 shadow-xl border border-slate-800">
              <div className="grid md:grid-cols-2 gap-10">
                <div>
                  <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                    Executive Control. Real-Time Insights. One Platform.
                  </h3>
                  
                  <h4 className="text-lg font-semibold text-compliance-300 mt-6 mb-3">Who they are:</h4>
                  <p className="text-slate-300 mb-6">
                    Managers are compliance, governance, and risk leaders — from CFOs to key managers and board-level executives — responsible for oversight, strategic planning, and ensuring their organization is always audit-ready.
                  </p>
                  
                  <h4 className="text-lg font-semibold text-compliance-300 mt-8 mb-3">What they get with Quantifier:</h4>
                  <ul className="space-y-3 mb-8">
                    {["A unified compliance view across teams, frameworks, and entities", "Executive dashboards with risk scoring, progress tracking, and timeline oversight", "Clarity on what's done, what's pending, and where the biggest risks lie", "Full visibility into team contributions and bottlenecks", "A single platform that consolidates compliance workflows, documents, and audits"].map((item, index) => <li key={index} className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-compliance-400 mr-2 flex-shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>)}
                  </ul>
                </div>
                
                <div className="flex flex-col justify-between">
                  {/* Manager visualization */}
                  <div className="bg-slate-800 rounded-xl p-6 shadow-lg border border-slate-700 mb-8">
                    <div className="flex justify-between items-center mb-4">
                      <h5 className="font-medium text-slate-300">Executive Dashboard</h5>
                      <BarChart3 className="h-5 w-5 text-compliance-400" />
                    </div>
                    
                    {/* Mock dashboard visualization */}
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <div className="bg-slate-700 rounded-lg p-3">
                        <div className="text-sm text-slate-400 mb-1">Risk Status</div>
                        <div className="text-xl font-semibold text-white mb-2">87<span className="text-compliance-400 text-sm ml-1">/ 100</span></div>
                        <div className="w-full bg-slate-600 rounded-full h-2">
                          <div className="bg-gradient-to-r from-red-400 to-green-400 h-2 rounded-full" style={{
                          width: '87%'
                        }}></div>
                        </div>
                      </div>
                      
                      <div className="bg-slate-700 rounded-lg p-3">
                        <div className="text-sm text-slate-400 mb-1">Task Completion</div>
                        <div className="text-xl font-semibold text-white mb-2">92<span className="text-innovation-400 text-sm ml-1">%</span></div>
                        <div className="w-full bg-slate-600 rounded-full h-2">
                          <div className="bg-innovation-500 h-2 rounded-full" style={{
                          width: '92%'
                        }}></div>
                        </div>
                      </div>
                      
                      <div className="bg-slate-700 rounded-lg p-3">
                        <div className="text-sm text-slate-400 mb-1">Frameworks</div>
                        <div className="text-xl font-semibold text-white">3<span className="text-slate-400 text-sm ml-1">active</span></div>
                      </div>
                      
                      <div className="bg-slate-700 rounded-lg p-3">
                        <div className="text-sm text-slate-400 mb-1">Due Tasks</div>
                        <div className="text-xl font-semibold text-white">7<span className="text-slate-400 text-sm ml-1">this week</span></div>
                      </div>
                    </div>
                    
                    <div className="bg-slate-700 rounded-lg p-3">
                      <div className="text-sm text-slate-400 mb-2">Framework Progress</div>
                      <div className="space-y-2">
                        <div>
                          <div className="flex justify-between text-xs mb-1">
                            <span>ISO 27001</span>
                            <span>78%</span>
                          </div>
                          <div className="w-full bg-slate-600 rounded-full h-1.5">
                            <div className="bg-compliance-500 h-1.5 rounded-full" style={{
                            width: '78%'
                          }}></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between text-xs mb-1">
                            <span>SOC 2</span>
                            <span>93%</span>
                          </div>
                          <div className="w-full bg-slate-600 rounded-full h-1.5">
                            <div className="bg-compliance-500 h-1.5 rounded-full" style={{
                            width: '93%'
                          }}></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between text-xs mb-1">
                            <span>GDPR</span>
                            <span>65%</span>
                          </div>
                          <div className="w-full bg-slate-600 rounded-full h-1.5">
                            <div className="bg-compliance-500 h-1.5 rounded-full" style={{
                            width: '65%'
                          }}></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-compliance-900 rounded-xl p-6 shadow-lg border border-compliance-800">
                    <h4 className="text-lg font-semibold text-compliance-300 mb-3">What the AI Agent Officer does:</h4>
                    <ul className="space-y-3 mb-6">
                      {["Delegates and assigns tasks across the organization", "Ensures integrations, data, and documentation are up to date", "Recommends implementation plans for standards like ISO 27001 or CSRD", "Drives the company toward continuous audit readiness"].map((item, index) => <li key={index} className="flex items-start">
                          <Zap className="h-5 w-5 text-compliance-400 mr-2 flex-shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>)}
                    </ul>
                    
                    <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
                      <h5 className="font-semibold text-white mb-2">Outcome:</h5>
                      <p className="text-slate-300">
                        Know exactly where your organization stands — without having to chase updates. Make decisions backed by live, intelligent compliance data.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Contributors Tab Content */}
          <TabsContent value="contributors" className="mt-6">
            <div className="bg-innovation-900 text-white rounded-xl p-8 shadow-xl border border-innovation-800">
              <div className="grid md:grid-cols-2 gap-10">
                <div>
                  <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                    Actionable Tasks. Streamlined Workflows. No Guesswork.
                  </h3>
                  
                  <h4 className="text-lg font-semibold text-innovation-300 mt-6 mb-3">Who they are:</h4>
                  <p className="text-slate-300 mb-6">
                    Contributors are the internal experts and specialists across departments — responsible for providing documents, confirming controls, and executing specific compliance tasks.
                  </p>
                  
                  <h4 className="text-lg font-semibold text-innovation-300 mt-8 mb-3">What they get with Quantifier:</h4>
                  <ul className="space-y-3 mb-8">
                    {["A clear to-do list with deadlines, task status, and context", "One place to upload documents, answer evidence requests, and track progress", "Help resources and training embedded in the workflow", "Ability to collaborate and comment directly in the platform"].map((item, index) => <li key={index} className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-innovation-400 mr-2 flex-shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>)}
                  </ul>
                </div>
                
                <div className="flex flex-col justify-between">
                  {/* Contributor visualization */}
                  <div className="bg-slate-800 rounded-xl p-6 shadow-lg border border-slate-700 mb-8">
                    <div className="flex justify-between items-center mb-4">
                      <h5 className="font-medium text-slate-300">Task Dashboard</h5>
                      <Calendar className="h-5 w-5 text-innovation-400" />
                    </div>
                    
                    {/* Mock task view */}
                    <div className="space-y-3">
                      <div className="bg-slate-700 rounded-lg p-3 border-l-4 border-red-500">
                        <div className="flex justify-between">
                          <div className="text-sm font-medium mb-1">Update Incident Response Policy</div>
                          <div className="text-xs text-red-400">Due today</div>
                        </div>
                        <div className="text-xs text-slate-400 mb-2">For: ISO 27001 - A.16.1.1</div>
                        <div className="flex justify-between items-center">
                          <div className="text-xs px-2 py-1 bg-slate-600 rounded">High Priority</div>
                          <button className="text-xs text-innovation-400 hover:text-innovation-300">Mark Complete</button>
                        </div>
                      </div>
                      
                      <div className="bg-slate-700 rounded-lg p-3 border-l-4 border-yellow-500">
                        <div className="flex justify-between">
                          <div className="text-sm font-medium mb-1">Upload Q2 Security Training Records</div>
                          <div className="text-xs text-yellow-400">Due in 3 days</div>
                        </div>
                        <div className="text-xs text-slate-400 mb-2">For: SOC 2 - CC1.4</div>
                        <div className="flex justify-between items-center">
                          <div className="text-xs px-2 py-1 bg-slate-600 rounded">Medium Priority</div>
                          <button className="text-xs text-innovation-400 hover:text-innovation-300">Upload Files</button>
                        </div>
                      </div>
                      
                      <div className="bg-slate-700 rounded-lg p-3 border-l-4 border-green-500">
                        <div className="flex justify-between">
                          <div className="text-sm font-medium mb-1">Review Password Policy</div>
                          <div className="text-xs text-green-400">Due in 7 days</div>
                        </div>
                        <div className="text-xs text-slate-400 mb-2">For: GDPR - Art. 32</div>
                        <div className="flex justify-between items-center">
                          <div className="text-xs px-2 py-1 bg-slate-600 rounded">Low Priority</div>
                          <button className="text-xs text-innovation-400 hover:text-innovation-300">Start Review</button>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-innovation-900 rounded-xl p-6 shadow-lg border border-innovation-800">
                    <h4 className="text-lg font-semibold text-innovation-300 mb-3">What the AI Agent Officer does:</h4>
                    <ul className="space-y-3 mb-6">
                      {["Sends smart reminders about required data or upcoming deadlines", "Provides suggestions on where to find necessary documentation", "Connects to internal systems via API to auto-fill and fetch data", "Minimizes manual work and reduces task confusion"].map((item, index) => <li key={index} className="flex items-start">
                          <Zap className="h-5 w-5 text-innovation-400 mr-2 flex-shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>)}
                    </ul>
                    
                    <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
                      <h5 className="font-semibold text-white mb-2">Outcome:</h5>
                      <p className="text-slate-300">
                        Spend less time digging for data and more time doing your job. Contributors stay informed, supported, and focused — with AI guiding the way.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Auditors Tab Content */}
          <TabsContent value="auditors" className="mt-6">
            <div className="text-white rounded-xl p-8 shadow-xl border border-slate-800 bg-compliance-900">
              <div className="grid md:grid-cols-2 gap-10">
                <div>
                  <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                    Everything They Need. Nothing They Don't.
                  </h3>
                  
                  <h4 className="text-lg font-semibold text-compliance-300 mt-6 mb-3">Who they are:</h4>
                  <p className="text-slate-300 mb-6">
                    Internal and external auditors verifying compliance, controls, and documentation across frameworks like SOC 2, ISO, GDPR, and more.
                  </p>
                  
                  <h4 className="text-lg font-semibold text-compliance-300 mt-8 mb-3">What they get with Quantifier:</h4>
                  <ul className="space-y-3 mb-8">
                    {["Access to complete audit logs and evidence history", "One centralized workspace with mapped documents, task trails, and timelines", "Framework-specific audit methodology and control mappings", "Visibility into responses, remediation actions, and contributor trails"].map((item, index) => <li key={index} className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-compliance-400 mr-2 flex-shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>)}
                  </ul>
                </div>
                
                <div className="flex flex-col justify-between">
                  {/* Auditor visualization */}
                  <div className="bg-slate-800 rounded-xl p-6 shadow-lg border border-slate-700 mb-8">
                    <div className="flex justify-between items-center mb-4">
                      <h5 className="font-medium text-slate-300">Audit Evidence Portal</h5>
                      <Shield className="h-5 w-5 text-compliance-400" />
                    </div>
                    
                    {/* Mock evidence view */}
                    <div className="space-y-3">
                      <div className="bg-slate-700 rounded-lg p-3">
                        <div className="flex items-center gap-2 mb-2">
                          <Lock className="h-4 w-4 text-compliance-400" />
                          <div className="text-sm font-medium">Access Control Policy</div>
                        </div>
                        <div className="flex justify-between text-xs text-slate-400 mb-2">
                          <span>ISO 27001 - A.9.2</span>
                          <span>Last updated: 2025-01-15</span>
                        </div>
                        <div className="flex items-center gap-1 text-xs">
                          <FileText className="h-3 w-3 text-slate-400" />
                          <span>AccessControlPolicy_v3.2.pdf</span>
                        </div>
                      </div>
                      
                      <div className="bg-slate-700 rounded-lg p-3">
                        <div className="flex items-center gap-2 mb-2">
                          <Shield className="h-4 w-4 text-compliance-400" />
                          <div className="text-sm font-medium">Annual Risk Assessment</div>
                        </div>
                        <div className="flex justify-between text-xs text-slate-400 mb-2">
                          <span>SOC 2 - CC3.1</span>
                          <span>Last updated: 2025-03-22</span>
                        </div>
                        <div className="flex items-center gap-1 text-xs">
                          <FileText className="h-3 w-3 text-slate-400" />
                          <span>RiskAssessment_2025_Q1.xlsx</span>
                        </div>
                      </div>
                      
                      <div className="bg-slate-700 rounded-lg p-3">
                        <div className="flex items-center gap-2 mb-2">
                          <Shield className="h-4 w-4 text-compliance-400" />
                          <div className="text-sm font-medium">Security Awareness Training</div>
                        </div>
                        <div className="flex justify-between text-xs text-slate-400 mb-2">
                          <span>Multiple frameworks</span>
                          <span>Last updated: 2025-02-10</span>
                        </div>
                        <div className="flex flex-wrap gap-1 mt-1">
                          <div className="text-xs px-2 py-0.5 bg-slate-600 rounded flex items-center">
                            <span>4 files</span>
                          </div>
                          <div className="text-xs px-2 py-0.5 bg-slate-600 rounded flex items-center">
                            <span>2 screenshots</span>
                          </div>
                          <div className="text-xs px-2 py-0.5 bg-slate-600 rounded flex items-center">
                            <span>1 video</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-compliance-900 rounded-xl p-6 shadow-lg border border-compliance-800">
                    <h4 className="text-lg font-semibold text-compliance-300 mb-3">What the AI Agent Officer does:</h4>
                    <ul className="space-y-3 mb-6">
                      {["Organizes supporting materials automatically", "Reduces time spent reviewing and filtering irrelevant documents", "Structures evidence to match the auditor's methodology", "Flags potential risks or control gaps before audit day"].map((item, index) => <li key={index} className="flex items-start">
                          <Zap className="h-5 w-5 text-compliance-400 mr-2 flex-shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>)}
                    </ul>
                    
                    <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
                      <h5 className="font-semibold text-white mb-2">Outcome:</h5>
                      <p className="text-slate-300">
                        Faster, clearer audits with less friction. Auditors can focus on validation — not administration.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-br from-slate-900 to-compliance-950 text-white rounded-xl p-8 shadow-xl border border-slate-800 mt-16">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
            Ready to See How Quantifier Works for You?
          </h2>
          <p className="text-lg text-slate-300 mb-8">
            No matter your role, Quantifier adapts to how you work — and elevates how you manage compliance.
          </p>
          <Button size="lg" className="bg-gradient-to-r from-compliance-600 to-innovation-600 hover:from-compliance-700 hover:to-innovation-700 text-white px-8 py-6 shadow-lg">
            Book a Demo
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </PageTemplate>;
};
export default ByRoles;