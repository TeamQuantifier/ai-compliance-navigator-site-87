
import { useState } from 'react';
import { ArrowRight, Brain, BarChart3, Database, ShieldAlert, ClipboardCheck, Zap, Link2, FileSpreadsheet } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import PageTemplate from '@/components/PageTemplate';

const ProductFeatures = () => {
  const [activeTab, setActiveTab] = useState("ai-officer");
  
  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  return (
    <PageTemplate
      title="Features, Built-In Intelligence, Embedded Compliance"
      description="Explore the features behind Quantifier's Autonomous Compliance Engine"
    >
      <div className="max-w-4xl mx-auto mb-12">
        <p className="text-lg text-slate-700 mb-6">
          Quantifier is an AI-native platform driven by autonomous agents that actively manage compliance end-to-end.
        </p>
        <p className="text-lg text-slate-700 mb-10">
          Below, we walk you through the platform's most powerful capabilities — engineered for enterprises 
          that need accuracy, control, and continuous readiness across multiple frameworks and regulations.
        </p>
      </div>

      <Tabs defaultValue="ai-officer" className="w-full mb-16" onValueChange={handleTabChange}>
        <TabsList className="grid grid-cols-2 md:grid-cols-4 gap-2 bg-transparent h-auto p-0">
          <TabsTrigger 
            value="ai-officer" 
            className={`data-[state=active]:bg-compliance-100 data-[state=active]:border-compliance-500 border-2 border-transparent px-4 py-3 h-auto`}
          >
            <Brain className="h-5 w-5 mr-2" />
            <span>AI Officer</span>
          </TabsTrigger>
          <TabsTrigger 
            value="analytics" 
            className={`data-[state=active]:bg-innovation-100 data-[state=active]:border-innovation-500 border-2 border-transparent px-4 py-3 h-auto`}
          >
            <BarChart3 className="h-5 w-5 mr-2" />
            <span>Analytics</span>
          </TabsTrigger>
          <TabsTrigger 
            value="task-hub" 
            className={`data-[state=active]:bg-compliance-100 data-[state=active]:border-compliance-500 border-2 border-transparent px-4 py-3 h-auto`}
          >
            <Database className="h-5 w-5 mr-2" />
            <span>Task & Data Hub</span>
          </TabsTrigger>
          <TabsTrigger 
            value="risk-assessment" 
            className={`data-[state=active]:bg-innovation-100 data-[state=active]:border-innovation-500 border-2 border-transparent px-4 py-3 h-auto`}
          >
            <ShieldAlert className="h-5 w-5 mr-2" />
            <span>Risk Assessment</span>
          </TabsTrigger>
        </TabsList>

        {/* AI Agent Officer Tab */}
        <TabsContent value="ai-officer" className="mt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-4 gradient-heading">AI Agent Officer</h3>
              <p className="text-slate-700 mb-6">
                Quantifier's AI Agent Officer acts as your always-on compliance assistant — trained to understand 
                complex frameworks, coordinate tasks, assign responsibilities, and drive results in real time.
              </p>
              
              <h4 className="text-lg font-semibold mb-3">What It Does:</h4>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start">
                  <div className="h-6 w-6 rounded-full bg-compliance-100 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                    <span className="text-compliance-700 text-sm">✓</span>
                  </div>
                  <span>Onboards employees into the right controls and frameworks</span>
                </li>
                <li className="flex items-start">
                  <div className="h-6 w-6 rounded-full bg-compliance-100 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                    <span className="text-compliance-700 text-sm">✓</span>
                  </div>
                  <span>Guides teams step-by-step through SOC 2, ISO 27001, GDPR, CSRD, and more</span>
                </li>
                <li className="flex items-start">
                  <div className="h-6 w-6 rounded-full bg-compliance-100 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                    <span className="text-compliance-700 text-sm">✓</span>
                  </div>
                  <span>Sends intelligent nudges, escalations, and follow-ups</span>
                </li>
                <li className="flex items-start">
                  <div className="h-6 w-6 rounded-full bg-compliance-100 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                    <span className="text-compliance-700 text-sm">✓</span>
                  </div>
                  <span>Interprets framework requirements and translates them into plain language and actionable tasks</span>
                </li>
                <li className="flex items-start">
                  <div className="h-6 w-6 rounded-full bg-compliance-100 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                    <span className="text-compliance-700 text-sm">✓</span>
                  </div>
                  <span>Handles Q&A and training workflows across departments</span>
                </li>
              </ul>
              
              <div className="bg-compliance-50 p-4 rounded-lg mb-6">
                <div className="flex items-start">
                  <div className="text-compliance-600 mr-3">💡</div>
                  <p className="text-sm text-slate-700">
                    <strong>Why it matters:</strong> AI agents eliminate the bottlenecks of human coordination and 
                    static instructions. You get consistency, speed, and clarity — at scale.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-compliance-50 to-compliance-100 rounded-xl p-6 border border-compliance-200 shadow-md">
              <div className="rounded-lg bg-white p-4 shadow-sm mb-4">
                <h4 className="font-medium text-slate-800 mb-2">AI Compliance Assistant</h4>
                <div className="flex items-center space-x-2 mb-4">
                  <div className="h-10 w-10 rounded-full bg-compliance-100 flex items-center justify-center">
                    <Brain className="h-5 w-5 text-compliance-600" />
                  </div>
                  <div className="flex-1">
                    <div className="h-4 bg-slate-100 rounded-full w-2/3"></div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="bg-slate-50 rounded p-2 text-sm">
                    <p className="text-slate-600">Good morning! I've detected 3 new control tasks for ISO 27001 that need your attention.</p>
                  </div>
                  <div className="bg-compliance-50 rounded p-2 text-sm ml-8">
                    <p className="text-slate-700">Please prioritize these for me by deadline.</p>
                  </div>
                  <div className="bg-slate-50 rounded p-2 text-sm">
                    <p className="text-slate-600">I've sorted your tasks by urgency. Your top priority is updating the access control policy which is due in 3 days.</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm p-4">
                <h4 className="font-medium text-slate-800 mb-3">Framework Progress</h4>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>ISO 27001</span>
                      <span className="font-medium">68%</span>
                    </div>
                    <div className="h-2 bg-slate-100 rounded-full">
                      <div className="h-2 bg-compliance-500 rounded-full w-[68%]"></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>GDPR</span>
                      <span className="font-medium">92%</span>
                    </div>
                    <div className="h-2 bg-slate-100 rounded-full">
                      <div className="h-2 bg-compliance-500 rounded-full w-[92%]"></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>SOC 2</span>
                      <span className="font-medium">45%</span>
                    </div>
                    <div className="h-2 bg-slate-100 rounded-full">
                      <div className="h-2 bg-compliance-500 rounded-full w-[45%]"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* AI Analytics Tab */}
        <TabsContent value="analytics" className="mt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-4 gradient-heading">AI Analytics</h3>
              <h4 className="text-xl mb-4">Powerful Dashboards. Actionable Insights. Full Control.</h4>
              <p className="text-slate-700 mb-6">
                Forget stale reports. Quantifier gives you real-time visibility across all your compliance 
                domains — with powerful dashboards and full Power BI integrations.
              </p>
              
              <h4 className="text-lg font-semibold mb-3">Key Features:</h4>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start">
                  <div className="h-6 w-6 rounded-full bg-innovation-100 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                    <span className="text-innovation-700 text-sm">✓</span>
                  </div>
                  <span>Executive dashboards tailored to CFOs, CISOs, and compliance leads</span>
                </li>
                <li className="flex items-start">
                  <div className="h-6 w-6 rounded-full bg-innovation-100 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                    <span className="text-innovation-700 text-sm">✓</span>
                  </div>
                  <span>Live KPI monitoring by framework, team, entity, or risk domain</span>
                </li>
                <li className="flex items-start">
                  <div className="h-6 w-6 rounded-full bg-innovation-100 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                    <span className="text-innovation-700 text-sm">✓</span>
                  </div>
                  <span>Drill-down capability for granular evidence and documentation tracking</span>
                </li>
                <li className="flex items-start">
                  <div className="h-6 w-6 rounded-full bg-innovation-100 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                    <span className="text-innovation-700 text-sm">✓</span>
                  </div>
                  <span>AI-generated risk summaries and insight recommendations</span>
                </li>
                <li className="flex items-start">
                  <div className="h-6 w-6 rounded-full bg-innovation-100 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                    <span className="text-innovation-700 text-sm">✓</span>
                  </div>
                  <span>Custom reporting with export to XLSX, PDF, or direct BI tools</span>
                </li>
              </ul>
              
              <div className="bg-innovation-50 p-4 rounded-lg">
                <p className="text-sm text-slate-700">
                  <strong>Why it matters:</strong> You're not just tracking compliance — you're managing risk, 
                  allocating resources, and reporting to the board with confidence.
                </p>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-innovation-50 to-innovation-100 rounded-xl p-6 border border-innovation-200 shadow-md">
              <div className="bg-white rounded-lg p-4 shadow-sm mb-4">
                <h4 className="font-medium text-slate-800 mb-3">Compliance Dashboard</h4>
                
                <div className="grid grid-cols-3 gap-3 mb-4">
                  <div className="bg-slate-50 p-3 rounded-lg text-center">
                    <div className="text-3xl font-bold text-innovation-600 mb-1">93%</div>
                    <div className="text-xs text-slate-500">Overall Readiness</div>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-lg text-center">
                    <div className="text-3xl font-bold text-innovation-600 mb-1">12</div>
                    <div className="text-xs text-slate-500">Pending Tasks</div>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-lg text-center">
                    <div className="text-3xl font-bold text-innovation-600 mb-1">4</div>
                    <div className="text-xs text-slate-500">Frameworks</div>
                  </div>
                </div>
                
                <h5 className="text-sm font-medium mb-2">Framework Compliance</h5>
                <div className="flex items-center">
                  <div className="flex-1 h-28 flex items-end space-x-3">
                    <div className="w-1/4 bg-innovation-200 rounded-t-sm h-[65%]"></div>
                    <div className="w-1/4 bg-innovation-400 rounded-t-sm h-[90%]"></div>
                    <div className="w-1/4 bg-innovation-300 rounded-t-sm h-[75%]"></div>
                    <div className="w-1/4 bg-innovation-500 rounded-t-sm h-[85%]"></div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <div className="flex justify-between items-center mb-3">
                  <h4 className="font-medium text-slate-800">Risk Analysis</h4>
                  <FileSpreadsheet className="h-4 w-4 text-slate-400" />
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="flex items-center"><span className="h-3 w-3 rounded-full bg-green-500 mr-2"></span>Low Risk</span>
                    <span>68%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="flex items-center"><span className="h-3 w-3 rounded-full bg-yellow-500 mr-2"></span>Medium Risk</span>
                    <span>25%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="flex items-center"><span className="h-3 w-3 rounded-full bg-red-500 mr-2"></span>High Risk</span>
                    <span>7%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Task & Data Hub Tab */}
        <TabsContent value="task-hub" className="mt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-4 gradient-heading">Task & Data Hub</h3>
              <h4 className="text-xl mb-4">Centralize Every Request, Task, Document, and Interaction</h4>
              <p className="text-slate-700 mb-6">
                The Task & Data Hub brings together all actions across your compliance program — into one clean, 
                searchable, permissioned workspace.
              </p>
              
              <h4 className="text-lg font-semibold mb-3">What You Can Do:</h4>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start">
                  <div className="h-6 w-6 rounded-full bg-compliance-100 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                    <span className="text-compliance-700 text-sm">✓</span>
                  </div>
                  <span>Trigger evidence or input requests to specific individuals or teams</span>
                </li>
                <li className="flex items-start">
                  <div className="h-6 w-6 rounded-full bg-compliance-100 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                    <span className="text-compliance-700 text-sm">✓</span>
                  </div>
                  <span>Track and manage documentation submissions by control or framework</span>
                </li>
                <li className="flex items-start">
                  <div className="h-6 w-6 rounded-full bg-compliance-100 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                    <span className="text-compliance-700 text-sm">✓</span>
                  </div>
                  <span>Assign and reassign ownership, due dates, and priority levels</span>
                </li>
                <li className="flex items-start">
                  <div className="h-6 w-6 rounded-full bg-compliance-100 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                    <span className="text-compliance-700 text-sm">✓</span>
                  </div>
                  <span>Automate recurring workflows and SOPs</span>
                </li>
                <li className="flex items-start">
                  <div className="h-6 w-6 rounded-full bg-compliance-100 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                    <span className="text-compliance-700 text-sm">✓</span>
                  </div>
                  <span>See a real-time audit trail of what's done, what's delayed, and what's missing</span>
                </li>
              </ul>
              
              <div className="bg-compliance-50 p-4 rounded-lg">
                <p className="text-sm text-slate-700">
                  <strong>Why it matters:</strong> No more chasing people in Slack or through platform. 
                  No more shared folders or email chains. Everything is trackable, time-stamped, and mapped to your controls.
                </p>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-compliance-50 to-compliance-100 rounded-xl p-6 border border-compliance-200 shadow-md">
              <div className="bg-white rounded-lg p-4 shadow-sm mb-4">
                <h4 className="font-medium text-slate-800 mb-3">Task Management</h4>
                
                <div className="space-y-3">
                  <div className="bg-slate-50 p-3 rounded border border-slate-100">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium">Update Privacy Policy</span>
                      <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-0.5 rounded">Medium</span>
                    </div>
                    <div className="flex justify-between text-xs text-slate-500">
                      <span>Assigned: Legal Team</span>
                      <span>Due: April 18</span>
                    </div>
                  </div>
                  
                  <div className="bg-slate-50 p-3 rounded border border-slate-100">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium">Security Control Review</span>
                      <span className="bg-red-100 text-red-800 text-xs px-2 py-0.5 rounded">High</span>
                    </div>
                    <div className="flex justify-between text-xs text-slate-500">
                      <span>Assigned: CISO</span>
                      <span>Due: April 15</span>
                    </div>
                  </div>
                  
                  <div className="bg-green-50 p-3 rounded border border-green-100">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium">Vendor Assessment</span>
                      <span className="bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded">Completed</span>
                    </div>
                    <div className="flex justify-between text-xs text-slate-500">
                      <span>Completed by: Procurement</span>
                      <span>April 10</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <div className="flex justify-between items-center mb-3">
                  <h4 className="font-medium text-slate-800">Document Repository</h4>
                  <div className="flex items-center text-xs text-slate-500">
                    <ClipboardCheck className="h-3 w-3 mr-1" />
                    <span>256 Files</span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-2 border-b border-slate-100">
                    <div className="flex items-center">
                      <div className="h-8 w-8 bg-blue-100 rounded flex items-center justify-center mr-3">
                        <span className="text-xs text-blue-600">PDF</span>
                      </div>
                      <span className="text-sm">Security_Policy_v2.4.pdf</span>
                    </div>
                    <span className="text-xs text-slate-500">Updated 2d ago</span>
                  </div>
                  
                  <div className="flex items-center justify-between p-2 border-b border-slate-100">
                    <div className="flex items-center">
                      <div className="h-8 w-8 bg-green-100 rounded flex items-center justify-center mr-3">
                        <span className="text-xs text-green-600">XLS</span>
                      </div>
                      <span className="text-sm">Risk_Register_Q2.xlsx</span>
                    </div>
                    <span className="text-xs text-slate-500">Updated 1w ago</span>
                  </div>
                  
                  <div className="flex items-center justify-between p-2">
                    <div className="flex items-center">
                      <div className="h-8 w-8 bg-purple-100 rounded flex items-center justify-center mr-3">
                        <span className="text-xs text-purple-600">DOC</span>
                      </div>
                      <span className="text-sm">GDPR_Compliance_Plan.docx</span>
                    </div>
                    <span className="text-xs text-slate-500">Updated 3d ago</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Risk Assessment Tab */}
        <TabsContent value="risk-assessment" className="mt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-4 gradient-heading">AI Risk Assessment</h3>
              <h4 className="text-xl mb-4">Continuous Risk Visibility and Remediation Guidance</h4>
              <p className="text-slate-700 mb-6">
                Quantifier's agents proactively monitor your organization's compliance risk posture — surfacing 
                weaknesses, suggesting remediations, and tracking incidents automatically.
              </p>
              
              <h4 className="text-lg font-semibold mb-3">Key Capabilities:</h4>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start">
                  <div className="h-6 w-6 rounded-full bg-innovation-100 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                    <span className="text-innovation-700 text-sm">✓</span>
                  </div>
                  <span>Real-time incident detection and flagging</span>
                </li>
                <li className="flex items-start">
                  <div className="h-6 w-6 rounded-full bg-innovation-100 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                    <span className="text-innovation-700 text-sm">✓</span>
                  </div>
                  <span>Continuous control monitoring and deviation alerts</span>
                </li>
                <li className="flex items-start">
                  <div className="h-6 w-6 rounded-full bg-innovation-100 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                    <span className="text-innovation-700 text-sm">✓</span>
                  </div>
                  <span>AI-generated risk impact assessments</span>
                </li>
                <li className="flex items-start">
                  <div className="h-6 w-6 rounded-full bg-innovation-100 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                    <span className="text-innovation-700 text-sm">✓</span>
                  </div>
                  <span>Smart recommendations for mitigations or corrective action</span>
                </li>
                <li className="flex items-start">
                  <div className="h-6 w-6 rounded-full bg-innovation-100 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                    <span className="text-innovation-700 text-sm">✓</span>
                  </div>
                  <span>Integrated risk registers per entity, team, or framework</span>
                </li>
              </ul>
              
              <div className="bg-innovation-50 p-4 rounded-lg">
                <p className="text-sm text-slate-700">
                  <strong>Why it matters:</strong> You don't need a dedicated team to monitor every policy or control. 
                  The platform watches, assesses, and responds — before risk turns into failure.
                </p>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-innovation-50 to-innovation-100 rounded-xl p-6 border border-innovation-200 shadow-md">
              <div className="bg-white rounded-lg p-4 shadow-sm mb-4">
                <h4 className="font-medium text-slate-800 mb-3">Risk Heat Map</h4>
                
                <div className="h-48 bg-slate-50 rounded-lg p-3 relative mb-2">
                  <div className="absolute top-3 left-3 text-xs text-slate-400">Impact</div>
                  <div className="absolute bottom-3 left-[-15px] transform rotate-90 text-xs text-slate-400">Likelihood</div>
                  
                  {/* Heat map grid */}
                  <div className="h-full w-full grid grid-cols-3 grid-rows-3 gap-1">
                    <div className="bg-yellow-100 rounded relative">
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-4 w-4 rounded-full bg-yellow-500"></div>
                    </div>
                    <div className="bg-orange-100 rounded"></div>
                    <div className="bg-red-100 rounded relative">
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-5 w-5 rounded-full bg-red-500"></div>
                    </div>
                    <div className="bg-green-100 rounded"></div>
                    <div className="bg-yellow-100 rounded relative">
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-4 w-4 rounded-full bg-yellow-500"></div>
                    </div>
                    <div className="bg-orange-100 rounded relative">
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-3 w-3 rounded-full bg-orange-500"></div>
                    </div>
                    <div className="bg-green-100 rounded relative">
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-6 w-6 rounded-full bg-green-500"></div>
                    </div>
                    <div className="bg-green-100 rounded relative">
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-3 w-3 rounded-full bg-green-500"></div>
                    </div>
                    <div className="bg-yellow-100 rounded"></div>
                  </div>
                </div>
                
                <div className="flex justify-between text-xs text-slate-500">
                  <span>Low</span>
                  <span>Medium</span>
                  <span>High</span>
                </div>
              </div>
              
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <div className="flex justify-between items-center mb-3">
                  <h4 className="font-medium text-slate-800">AI Risk Alerts</h4>
                  <div className="bg-red-100 text-red-700 text-xs px-2 py-0.5 rounded-full">3 New</div>
                </div>
                
                <div className="space-y-3">
                  <div className="bg-red-50 p-3 rounded border border-red-100">
                    <div className="flex items-start">
                      <ShieldAlert className="h-4 w-4 text-red-500 mt-0.5 mr-2" />
                      <div>
                        <h5 className="text-sm font-medium">Critical: Access Control Violation</h5>
                        <p className="text-xs text-slate-600 mt-1">Unusual admin privileges granted outside approval process</p>
                        <div className="flex items-center mt-2">
                          <Button variant="outline" size="sm" className="h-7 text-xs mr-2">View Details</Button>
                          <Button size="sm" className="h-7 text-xs bg-red-600 hover:bg-red-700">Remediate</Button>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-yellow-50 p-3 rounded border border-yellow-100">
                    <div className="flex items-start">
                      <ShieldAlert className="h-4 w-4 text-yellow-500 mt-0.5 mr-2" />
                      <div>
                        <h5 className="text-sm font-medium">Warning: Policy Document Outdated</h5>
                        <p className="text-xs text-slate-600 mt-1">Data retention policy requires review (last updated 367 days ago)</p>
                        <Button variant="outline" size="sm" className="h-7 text-xs mt-2">Schedule Review</Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
      
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
          <div className="flex items-start mb-4">
            <ClipboardCheck className="h-10 w-10 text-compliance-600 mr-4" />
            <div>
              <h3 className="text-xl font-bold mb-2">Internal & External Audit Management</h3>
              <h4 className="text-lg mb-3">End-to-End Automation of the Audit Lifecycle</h4>
            </div>
          </div>
          <p className="text-slate-700 mb-4">
            From audit prep to remediation, Quantifier streamlines the full process — reducing manual work and increasing audit confidence.
          </p>
          <h5 className="font-medium mb-3">Functionality Includes:</h5>
          <ul className="space-y-2 mb-4">
            <li className="flex items-center">
              <div className="h-5 w-5 rounded-full bg-compliance-100 flex items-center justify-center mr-3 flex-shrink-0">
                <span className="text-compliance-700 text-xs">✓</span>
              </div>
              <span className="text-sm">Pre-audit checklists and readiness scoring</span>
            </li>
            <li className="flex items-center">
              <div className="h-5 w-5 rounded-full bg-compliance-100 flex items-center justify-center mr-3 flex-shrink-0">
                <span className="text-compliance-700 text-xs">✓</span>
              </div>
              <span className="text-sm">Role-based evidence collection from internal teams</span>
            </li>
            <li className="flex items-center">
              <div className="h-5 w-5 rounded-full bg-compliance-100 flex items-center justify-center mr-3 flex-shrink-0">
                <span className="text-compliance-700 text-xs">✓</span>
              </div>
              <span className="text-sm">Dedicated portal for external auditors with controlled access</span>
            </li>
            <li className="flex items-center">
              <div className="h-5 w-5 rounded-full bg-compliance-100 flex items-center justify-center mr-3 flex-shrink-0">
                <span className="text-compliance-700 text-xs">✓</span>
              </div>
              <span className="text-sm">Automated mapping of documents to control points</span>
            </li>
            <li className="flex items-center">
              <div className="h-5 w-5 rounded-full bg-compliance-100 flex items-center justify-center mr-3 flex-shrink-0">
                <span className="text-compliance-700 text-xs">✓</span>
              </div>
              <span className="text-sm">Remediation plans with AI-generated action items and timelines</span>
            </li>
          </ul>
        </div>
        
        <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
          <div className="flex items-start mb-4">
            <Zap className="h-10 w-10 text-innovation-600 mr-4" />
            <div>
              <h3 className="text-xl font-bold mb-2">Seamless API Integration</h3>
              <h4 className="text-lg mb-3">Automate Data Collection at the Source</h4>
            </div>
          </div>
          <p className="text-slate-700 mb-4">
            Quantifier connects directly to your systems—HRIS, ERP, cloud storage, financial tools, and more—through 
            secure APIs to collect evidence, pull logs, and verify data automatically.
          </p>
          <p className="text-slate-700 italic mb-4">No more manual uploads. No more copy-paste.</p>
          <h5 className="font-medium mb-3">What You Get:</h5>
          <ul className="space-y-2 mb-4">
            <li className="flex items-center">
              <div className="h-5 w-5 rounded-full bg-innovation-100 flex items-center justify-center mr-3 flex-shrink-0">
                <span className="text-innovation-700 text-xs">✓</span>
              </div>
              <span className="text-sm">Real-time data syncing from internal systems</span>
            </li>
            <li className="flex items-center">
              <div className="h-5 w-5 rounded-full bg-innovation-100 flex items-center justify-center mr-3 flex-shrink-0">
                <span className="text-innovation-700 text-xs">✓</span>
              </div>
              <span className="text-sm">Auto-filled evidence trails across multiple frameworks</span>
            </li>
            <li className="flex items-center">
              <div className="h-5 w-5 rounded-full bg-innovation-100 flex items-center justify-center mr-3 flex-shrink-0">
                <span className="text-innovation-700 text-xs">✓</span>
              </div>
              <span className="text-sm">Instant access to relevant documents, usage logs, and activity records</span>
            </li>
            <li className="flex items-center">
              <div className="h-5 w-5 rounded-full bg-innovation-100 flex items-center justify-center mr-3 flex-shrink-0">
                <span className="text-innovation-700 text-xs">✓</span>
              </div>
              <span className="text-sm">Fewer tasks for contributors, with higher confidence in data accuracy</span>
            </li>
          </ul>
        </div>
      </div>
      
      <div className="mt-8 bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
        <div className="flex items-start mb-4">
          <Link2 className="h-10 w-10 text-compliance-600 mr-4" />
          <div>
            <h3 className="text-xl font-bold mb-2">Value Chain Management</h3>
            <h4 className="text-lg mb-3">Bring Suppliers and Partners into Your Compliance Process</h4>
          </div>
        </div>
        <p className="text-slate-700 mb-4">
          Compliance doesn't stop at your organization's boundaries. Quantifier enables you to assess, manage, 
          and collaborate with suppliers, vendors, and partners across your entire value chain.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
          <div>
            <h5 className="font-medium mb-3">What You Get:</h5>
            <ul className="space-y-2">
              <li className="flex items-center">
                <div className="h-5 w-5 rounded-full bg-compliance-100 flex items-center justify-center mr-3 flex-shrink-0">
                  <span className="text-compliance-700 text-xs">✓</span>
                </div>
                <span className="text-sm">Secure access portals for third parties to respond to compliance requests</span>
              </li>
              <li className="flex items-center">
                <div className="h-5 w-5 rounded-full bg-compliance-100 flex items-center justify-center mr-3 flex-shrink-0">
                  <span className="text-compliance-700 text-xs">✓</span>
                </div>
                <span className="text-sm">Supplier-level risk scoring and automated due diligence</span>
              </li>
              <li className="flex items-center">
                <div className="h-5 w-5 rounded-full bg-compliance-100 flex items-center justify-center mr-3 flex-shrink-0">
                  <span className="text-compliance-700 text-xs">✓</span>
                </div>
                <span className="text-sm">Monitoring tools for ESG, cybersecurity, and regulatory performance</span>
              </li>
              <li className="flex items-center">
                <div className="h-5 w-5 rounded-full bg-compliance-100 flex items-center justify-center mr-3 flex-shrink-0">
                  <span className="text-compliance-700 text-xs">✓</span>
                </div>
                <span className="text-sm">Consolidated documentation for CBAM, Scope 3 emissions, GDPR contracts, and more</span>
              </li>
            </ul>
          </div>
          
          <div>
            <h5 className="font-medium mb-3">What the AI Agent Officer does:</h5>
            <ul className="space-y-2">
              <li className="flex items-center">
                <div className="h-5 w-5 rounded-full bg-innovation-100 flex items-center justify-center mr-3 flex-shrink-0">
                  <span className="text-innovation-700 text-xs">✓</span>
                </div>
                <span className="text-sm">Sends compliance requests directly to your suppliers</span>
              </li>
              <li className="flex items-center">
                <div className="h-5 w-5 rounded-full bg-innovation-100 flex items-center justify-center mr-3 flex-shrink-0">
                  <span className="text-innovation-700 text-xs">✓</span>
                </div>
                <span className="text-sm">Tracks progress and follows up automatically</span>
              </li>
              <li className="flex items-center">
                <div className="h-5 w-5 rounded-full bg-innovation-100 flex items-center justify-center mr-3 flex-shrink-0">
                  <span className="text-innovation-700 text-xs">✓</span>
                </div>
                <span className="text-sm">Evaluates submitted data for completeness and risk</span>
              </li>
              <li className="flex items-center">
                <div className="h-5 w-5 rounded-full bg-innovation-100 flex items-center justify-center mr-3 flex-shrink-0">
                  <span className="text-innovation-700 text-xs">✓</span>
                </div>
                <span className="text-sm">Flags gaps or inconsistencies before they affect your compliance posture</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      
      <div className="mt-12 text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-4 gradient-heading">
          Start Managing Compliance Intelligently
        </h2>
        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6">
          <Button size="lg" className="group">
            Book a Demo
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
      </div>
    </PageTemplate>
  );
};

export default ProductFeatures;
