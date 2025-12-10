import { useState } from 'react';
import { ArrowRight, Brain, BarChart3, Database, ShieldAlert, ClipboardCheck, Zap, Link2, FileSpreadsheet } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import PageTemplate from '@/components/PageTemplate';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';

const ProductFeatures = () => {
  const { t, currentLocale } = useLanguage();
  const [activeTab, setActiveTab] = useState("ai-officer");
  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };
  return <PageTemplate title={t('product.features.title')} description={t('product.features.description')}>
      <div className="max-w-4xl mx-auto mb-12">
        
        
      </div>

      <Tabs defaultValue="ai-officer" className="w-full mb-16" onValueChange={handleTabChange}>
        <TabsList className="grid grid-cols-2 md:grid-cols-4 gap-2 bg-transparent h-auto p-0">
          <TabsTrigger value="ai-officer" className={`data-[state=active]:bg-compliance-100 data-[state=active]:border-compliance-500 border-2 border-transparent px-4 py-3 h-auto`}>
            <Brain className="h-5 w-5 mr-2" />
            <span>{t('product.features.tabs.aiOfficer')}</span>
          </TabsTrigger>
          <TabsTrigger value="analytics" className={`data-[state=active]:bg-innovation-100 data-[state=active]:border-innovation-500 border-2 border-transparent px-4 py-3 h-auto`}>
            <BarChart3 className="h-5 w-5 mr-2" />
            <span>{t('product.features.tabs.analytics')}</span>
          </TabsTrigger>
          <TabsTrigger value="task-hub" className={`data-[state=active]:bg-compliance-100 data-[state=active]:border-compliance-500 border-2 border-transparent px-4 py-3 h-auto`}>
            <Database className="h-5 w-5 mr-2" />
            <span>{t('product.features.tabs.taskHub')}</span>
          </TabsTrigger>
          <TabsTrigger value="risk-assessment" className={`data-[state=active]:bg-innovation-100 data-[state=active]:border-innovation-500 border-2 border-transparent px-4 py-3 h-auto`}>
            <ShieldAlert className="h-5 w-5 mr-2" />
            <span>{t('product.features.tabs.riskAssessment')}</span>
          </TabsTrigger>
        </TabsList>

        {/* AI Agent Officer Tab */}
        <TabsContent value="ai-officer" className="mt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-4 gradient-heading">{t('product.features.aiOfficer.title')}</h3>
              <p className="text-slate-700 mb-6">
                {t('product.features.aiOfficer.description')}
              </p>
              
              <h4 className="text-lg font-semibold mb-3">{t('product.features.aiOfficer.whatItDoes')}</h4>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start">
                  <div className="h-6 w-6 rounded-full bg-compliance-100 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                    <span className="text-compliance-700 text-sm">✓</span>
                  </div>
                  <span>{t('product.features.aiOfficer.feature1')}</span>
                </li>
                <li className="flex items-start">
                  <div className="h-6 w-6 rounded-full bg-compliance-100 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                    <span className="text-compliance-700 text-sm">✓</span>
                  </div>
                  <span>{t('product.features.aiOfficer.feature2')}</span>
                </li>
                <li className="flex items-start">
                  <div className="h-6 w-6 rounded-full bg-compliance-100 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                    <span className="text-compliance-700 text-sm">✓</span>
                  </div>
                  <span>{t('product.features.aiOfficer.feature3')}</span>
                </li>
                <li className="flex items-start">
                  <div className="h-6 w-6 rounded-full bg-compliance-100 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                    <span className="text-compliance-700 text-sm">✓</span>
                  </div>
                  <span>{t('product.features.aiOfficer.feature4')}</span>
                </li>
                <li className="flex items-start">
                  <div className="h-6 w-6 rounded-full bg-compliance-100 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                    <span className="text-compliance-700 text-sm">✓</span>
                  </div>
                  <span>{t('product.features.aiOfficer.feature5')}</span>
                </li>
              </ul>
              
              <div className="bg-compliance-50 p-4 rounded-lg mb-6">
                <div className="flex items-start">
                  <div className="text-compliance-600 mr-3">💡</div>
                  <p className="text-sm text-slate-700">
                    <strong>{t('product.features.aiOfficer.whyItMatters')}</strong> {t('product.features.aiOfficer.importance')}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-compliance-50 to-compliance-100 rounded-xl p-6 border border-compliance-200 shadow-md">
              <div className="rounded-lg bg-white p-4 shadow-sm mb-4">
                <h4 className="font-medium text-slate-800 mb-2">{t('product.features.aiOfficer.assistant')}</h4>
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
                    <p className="text-slate-600">{t('product.features.aiOfficer.greeting')}</p>
                  </div>
                  <div className="bg-compliance-50 rounded p-2 text-sm ml-8">
                    <p className="text-slate-700">{t('product.features.aiOfficer.userRequest')}</p>
                  </div>
                  <div className="bg-slate-50 rounded p-2 text-sm">
                    <p className="text-slate-600">{t('product.features.aiOfficer.response')}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm p-4">
                <h4 className="font-medium text-slate-800 mb-3">{t('product.features.aiOfficer.frameworkProgress')}</h4>
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
              <h3 className="text-2xl font-bold mb-4 gradient-heading">{t('product.features.analytics.title')}</h3>
              <h4 className="text-xl mb-4">{t('product.features.analytics.subtitle')}</h4>
              <p className="text-slate-700 mb-6">
                {t('product.features.analytics.description')}
              </p>
              
              <h4 className="text-lg font-semibold mb-3">{t('product.features.analytics.keyFeatures')}</h4>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start">
                  <div className="h-6 w-6 rounded-full bg-innovation-100 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                    <span className="text-innovation-700 text-sm">✓</span>
                  </div>
                  <span>{t('product.features.analytics.feature1')}</span>
                </li>
                <li className="flex items-start">
                  <div className="h-6 w-6 rounded-full bg-innovation-100 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                    <span className="text-innovation-700 text-sm">✓</span>
                  </div>
                  <span>{t('product.features.analytics.feature2')}</span>
                </li>
                <li className="flex items-start">
                  <div className="h-6 w-6 rounded-full bg-innovation-100 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                    <span className="text-innovation-700 text-sm">✓</span>
                  </div>
                  <span>{t('product.features.analytics.feature3')}</span>
                </li>
                <li className="flex items-start">
                  <div className="h-6 w-6 rounded-full bg-innovation-100 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                    <span className="text-innovation-700 text-sm">✓</span>
                  </div>
                  <span>{t('product.features.analytics.feature4')}</span>
                </li>
                <li className="flex items-start">
                  <div className="h-6 w-6 rounded-full bg-innovation-100 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                    <span className="text-innovation-700 text-sm">✓</span>
                  </div>
                  <span>{t('product.features.analytics.feature5')}</span>
                </li>
              </ul>
              
              <div className="bg-innovation-50 p-4 rounded-lg">
                <p className="text-sm text-slate-700">
                  <strong>{t('product.features.analytics.whyItMatters')}</strong> {t('product.features.analytics.importance')}
                </p>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-innovation-50 to-innovation-100 rounded-xl p-6 border border-innovation-200 shadow-md">
              <div className="bg-white rounded-lg p-4 shadow-sm mb-4">
                <h4 className="font-medium text-slate-800 mb-3">{t('product.features.analytics.dashboard')}</h4>
                
                <div className="grid grid-cols-3 gap-3 mb-4">
                  <div className="bg-slate-50 p-3 rounded-lg text-center">
                    <div className="text-3xl font-bold text-innovation-600 mb-1">93%</div>
                    <div className="text-xs text-slate-500">{t('product.features.analytics.overallReadiness')}</div>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-lg text-center">
                    <div className="text-3xl font-bold text-innovation-600 mb-1">12</div>
                    <div className="text-xs text-slate-500">{t('product.features.analytics.pendingTasks')}</div>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-lg text-center">
                    <div className="text-3xl font-bold text-innovation-600 mb-1">4</div>
                    <div className="text-xs text-slate-500">{t('product.features.analytics.frameworks')}</div>
                  </div>
                </div>
                
                <h5 className="text-sm font-medium mb-2">{t('product.features.analytics.frameworkCompliance')}</h5>
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
                  <h4 className="font-medium text-slate-800">{t('product.features.analytics.riskAnalysis')}</h4>
                  <FileSpreadsheet className="h-4 w-4 text-slate-400" />
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="flex items-center"><span className="h-3 w-3 rounded-full bg-green-500 mr-2"></span>{t('product.features.analytics.lowRisk')}</span>
                    <span>68%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="flex items-center"><span className="h-3 w-3 rounded-full bg-yellow-500 mr-2"></span>{t('product.features.analytics.mediumRisk')}</span>
                    <span>25%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="flex items-center"><span className="h-3 w-3 rounded-full bg-red-500 mr-2"></span>{t('product.features.analytics.highRisk')}</span>
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
              <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-slate-800 to-compliance-700 bg-clip-text text-transparent">{t('product.features.taskHub.title')}</h3>
              <h4 className="text-xl mb-4 text-slate-800">{t('product.features.taskHub.subtitle')}</h4>
              <p className="text-slate-700 mb-6">
                {t('product.features.taskHub.description')}
              </p>
              
              <h4 className="text-lg font-semibold mb-3 text-slate-800">{t('product.features.taskHub.whatYouCanDo')}</h4>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start">
                  <div className="h-6 w-6 rounded-full bg-slate-900 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                    <span className="text-white text-sm">✓</span>
                  </div>
                  <span className="text-slate-700">{t('product.features.taskHub.feature1')}</span>
                </li>
                <li className="flex items-start">
                  <div className="h-6 w-6 rounded-full bg-slate-900 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                    <span className="text-white text-sm">✓</span>
                  </div>
                  <span className="text-slate-700">{t('product.features.taskHub.feature2')}</span>
                </li>
                <li className="flex items-start">
                  <div className="h-6 w-6 rounded-full bg-slate-900 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                    <span className="text-white text-sm">✓</span>
                  </div>
                  <span className="text-slate-700">{t('product.features.taskHub.feature3')}</span>
                </li>
                <li className="flex items-start">
                  <div className="h-6 w-6 rounded-full bg-slate-900 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                    <span className="text-white text-sm">✓</span>
                  </div>
                  <span className="text-slate-700">{t('product.features.taskHub.feature4')}</span>
                </li>
                <li className="flex items-start">
                  <div className="h-6 w-6 rounded-full bg-slate-900 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                    <span className="text-white text-sm">✓</span>
                  </div>
                  <span className="text-slate-700">{t('product.features.taskHub.feature5')}</span>
                </li>
              </ul>
              
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <div className="flex items-start">
                  <div className="text-compliance-400 mr-3">💡</div>
                  <p className="text-sm text-slate-700">
                    <strong>{t('product.features.taskHub.whyItMatters')}</strong> {t('product.features.taskHub.importance')} {t('product.features.taskHub.importance2')}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-lg">
              <div className="bg-slate-50 rounded-lg p-4 shadow-md mb-4 border border-slate-200">
                <h4 className="font-medium text-slate-900 mb-3">Task Management</h4>
                
                <div className="space-y-3">
                  <div className="bg-white p-3 rounded border border-slate-200">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium text-slate-900">Update Privacy Policy</span>
                      <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-0.5 rounded">Medium</span>
                    </div>
                    <div className="flex justify-between text-xs text-slate-600">
                      <span>Assigned: Legal Team</span>
                      <span>Due: April 18</span>
                    </div>
                  </div>
                  
                  <div className="bg-white p-3 rounded border border-slate-200">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium text-slate-900">Security Control Review</span>
                      <span className="bg-red-100 text-red-800 text-xs px-2 py-0.5 rounded">High</span>
                    </div>
                    <div className="flex justify-between text-xs text-slate-600">
                      <span>Assigned: CISO</span>
                      <span>Due: April 15</span>
                    </div>
                  </div>
                  
                  <div className="bg-white p-3 rounded border border-slate-200">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium text-slate-900">Vendor Assessment</span>
                      <span className="bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded">Completed</span>
                    </div>
                    <div className="flex justify-between text-xs text-slate-600">
                      <span>Completed by: Procurement</span>
                      <span>April 10</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-slate-50 rounded-lg p-4 shadow-md border border-slate-200">
                <div className="flex justify-between items-center mb-3">
                  <h4 className="font-medium text-slate-900">Document Repository</h4>
                  <div className="flex items-center text-xs text-slate-600">
                    <ClipboardCheck className="h-3 w-3 mr-1" />
                    <span>256 Files</span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-2 border-b border-slate-200">
                    <div className="flex items-center">
                      <div className="h-8 w-8 bg-blue-100 rounded flex items-center justify-center mr-3">
                        <span className="text-xs text-blue-700">PDF</span>
                      </div>
                      <span className="text-sm text-slate-900">Security_Policy_v2.4.pdf</span>
                    </div>
                    <span className="text-xs text-slate-600">Updated 2d ago</span>
                  </div>
                  
                  <div className="flex items-center justify-between p-2 border-b border-slate-200">
                    <div className="flex items-center">
                      <div className="h-8 w-8 bg-green-100 rounded flex items-center justify-center mr-3">
                        <span className="text-xs text-green-700">XLS</span>
                      </div>
                      <span className="text-sm text-slate-900">Risk_Register_Q2.xlsx</span>
                    </div>
                    <span className="text-xs text-slate-600">Updated 1w ago</span>
                  </div>
                  
                  <div className="flex items-center justify-between p-2">
                    <div className="flex items-center">
                      <div className="h-8 w-8 bg-purple-100 rounded flex items-center justify-center mr-3">
                        <span className="text-xs text-purple-700">DOC</span>
                      </div>
                      <span className="text-sm text-slate-900">GDPR_Compliance_Plan.docx</span>
                    </div>
                    <span className="text-xs text-slate-600">Updated 3d ago</span>
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
              <h3 className="text-2xl font-bold mb-4 gradient-heading">{t('product.features.riskAssessment.title')}</h3>
              <h4 className="text-xl mb-4">{t('product.features.riskAssessment.subtitle')}</h4>
              <p className="text-slate-700 mb-6">
                {t('product.features.riskAssessment.description')}
              </p>
              
              <h4 className="text-lg font-semibold mb-3">{t('product.features.riskAssessment.keyCapabilities')}</h4>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start">
                  <div className="h-6 w-6 rounded-full bg-innovation-100 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                    <span className="text-innovation-700 text-sm">✓</span>
                  </div>
                  <span>{t('product.features.riskAssessment.feature1')}</span>
                </li>
                <li className="flex items-start">
                  <div className="h-6 w-6 rounded-full bg-innovation-100 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                    <span className="text-innovation-700 text-sm">✓</span>
                  </div>
                  <span>{t('product.features.riskAssessment.feature2')}</span>
                </li>
                <li className="flex items-start">
                  <div className="h-6 w-6 rounded-full bg-innovation-100 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                    <span className="text-innovation-700 text-sm">✓</span>
                  </div>
                  <span>{t('product.features.riskAssessment.feature3')}</span>
                </li>
                <li className="flex items-start">
                  <div className="h-6 w-6 rounded-full bg-innovation-100 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                    <span className="text-innovation-700 text-sm">✓</span>
                  </div>
                  <span>{t('product.features.riskAssessment.feature4')}</span>
                </li>
                <li className="flex items-start">
                  <div className="h-6 w-6 rounded-full bg-innovation-100 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                    <span className="text-innovation-700 text-sm">✓</span>
                  </div>
                  <span>{t('product.features.riskAssessment.feature5')}</span>
                </li>
              </ul>
              
              <div className="bg-innovation-50 p-4 rounded-lg">
                <p className="text-sm text-slate-700">
                  <strong>{t('product.features.riskAssessment.whyItMatters')}</strong> {t('product.features.riskAssessment.importance')}
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
              <h3 className="text-xl font-bold mb-2">{t('product.features.audit.title')}</h3>
              <h4 className="text-lg mb-3">{t('product.features.audit.subtitle')}</h4>
            </div>
          </div>
          <p className="text-slate-700 mb-4">
            {t('product.features.audit.description')}
          </p>
          <h5 className="font-medium mb-3">{t('product.features.audit.functionality')}</h5>
          <ul className="space-y-2 mb-4">
            <li className="flex items-center">
              <div className="h-5 w-5 rounded-full bg-compliance-100 flex items-center justify-center mr-3 flex-shrink-0">
                <span className="text-compliance-700 text-xs">✓</span>
              </div>
              <span className="text-sm">{t('product.features.audit.feature1')}</span>
            </li>
            <li className="flex items-center">
              <div className="h-5 w-5 rounded-full bg-compliance-100 flex items-center justify-center mr-3 flex-shrink-0">
                <span className="text-compliance-700 text-xs">✓</span>
              </div>
              <span className="text-sm">{t('product.features.audit.feature2')}</span>
            </li>
            <li className="flex items-center">
              <div className="h-5 w-5 rounded-full bg-compliance-100 flex items-center justify-center mr-3 flex-shrink-0">
                <span className="text-compliance-700 text-xs">✓</span>
              </div>
              <span className="text-sm">{t('product.features.audit.feature3')}</span>
            </li>
            <li className="flex items-center">
              <div className="h-5 w-5 rounded-full bg-compliance-100 flex items-center justify-center mr-3 flex-shrink-0">
                <span className="text-compliance-700 text-xs">✓</span>
              </div>
              <span className="text-sm">{t('product.features.audit.feature4')}</span>
            </li>
            <li className="flex items-center">
              <div className="h-5 w-5 rounded-full bg-compliance-100 flex items-center justify-center mr-3 flex-shrink-0">
                <span className="text-compliance-700 text-xs">✓</span>
              </div>
              <span className="text-sm">{t('product.features.audit.feature5')}</span>
            </li>
          </ul>
        </div>
        
        <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
          <div className="flex items-start mb-4">
            <Zap className="h-10 w-10 text-innovation-600 mr-4" />
            <div>
              <h3 className="text-xl font-bold mb-2">{t('product.features.apiIntegration.title')}</h3>
              <h4 className="text-lg mb-3">{t('product.features.apiIntegration.subtitle')}</h4>
            </div>
          </div>
          <p className="text-slate-700 mb-4">
            {t('product.features.apiIntegration.description')}
          </p>
          <p className="text-slate-700 italic mb-4">{t('product.features.apiIntegration.noManual')}</p>
          <h5 className="font-medium mb-3">{t('product.features.apiIntegration.whatYouGet')}</h5>
          <ul className="space-y-2 mb-4">
            <li className="flex items-center">
              <div className="h-5 w-5 rounded-full bg-innovation-100 flex items-center justify-center mr-3 flex-shrink-0">
                <span className="text-innovation-700 text-xs">✓</span>
              </div>
              <span className="text-sm">{t('product.features.apiIntegration.feature1')}</span>
            </li>
            <li className="flex items-center">
              <div className="h-5 w-5 rounded-full bg-innovation-100 flex items-center justify-center mr-3 flex-shrink-0">
                <span className="text-innovation-700 text-xs">✓</span>
              </div>
              <span className="text-sm">{t('product.features.apiIntegration.feature2')}</span>
            </li>
            <li className="flex items-center">
              <div className="h-5 w-5 rounded-full bg-innovation-100 flex items-center justify-center mr-3 flex-shrink-0">
                <span className="text-innovation-700 text-xs">✓</span>
              </div>
              <span className="text-sm">{t('product.features.apiIntegration.feature3')}</span>
            </li>
            <li className="flex items-center">
              <div className="h-5 w-5 rounded-full bg-innovation-100 flex items-center justify-center mr-3 flex-shrink-0">
                <span className="text-innovation-700 text-xs">✓</span>
              </div>
              <span className="text-sm">{t('product.features.apiIntegration.feature4')}</span>
            </li>
          </ul>
        </div>
      </div>
      
      <div className="mt-8 bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
        <div className="flex items-start mb-4">
          <Link2 className="h-10 w-10 text-compliance-600 mr-4" />
          <div>
            <h3 className="text-xl font-bold mb-2">{t('product.features.valueChain.title')}</h3>
            <h4 className="text-lg mb-3">{t('product.features.valueChain.subtitle')}</h4>
          </div>
        </div>
        <p className="text-slate-700 mb-4">
          {t('product.features.valueChain.description')}
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
          <div>
            <h5 className="font-medium mb-3">{t('product.features.valueChain.whatYouGet')}</h5>
            <ul className="space-y-2">
              <li className="flex items-center">
                <div className="h-5 w-5 rounded-full bg-compliance-100 flex items-center justify-center mr-3 flex-shrink-0">
                  <span className="text-compliance-700 text-xs">✓</span>
                </div>
              <span className="text-sm">{t('product.features.valueChain.feature1')}</span>
            </li>
            <li className="flex items-center">
              <div className="h-5 w-5 rounded-full bg-compliance-100 flex items-center justify-center mr-3 flex-shrink-0">
                <span className="text-compliance-700 text-xs">✓</span>
              </div>
              <span className="text-sm">{t('product.features.valueChain.feature2')}</span>
            </li>
            <li className="flex items-center">
              <div className="h-5 w-5 rounded-full bg-compliance-100 flex items-center justify-center mr-3 flex-shrink-0">
                <span className="text-compliance-700 text-xs">✓</span>
              </div>
              <span className="text-sm">{t('product.features.valueChain.feature3')}</span>
            </li>
            <li className="flex items-center">
              <div className="h-5 w-5 rounded-full bg-compliance-100 flex items-center justify-center mr-3 flex-shrink-0">
                <span className="text-compliance-700 text-xs">✓</span>
              </div>
              <span className="text-sm">{t('product.features.valueChain.feature4')}</span>
            </li>
          </ul>
        </div>
        
        <div>
          <h5 className="font-medium mb-3">{t('product.features.valueChain.whatAgentDoes')}</h5>
            <ul className="space-y-2">
              <li className="flex items-center">
                <div className="h-5 w-5 rounded-full bg-innovation-100 flex items-center justify-center mr-3 flex-shrink-0">
                  <span className="text-innovation-700 text-xs">✓</span>
                </div>
              <span className="text-sm">{t('product.features.valueChain.agentFeature1')}</span>
            </li>
            <li className="flex items-center">
              <div className="h-5 w-5 rounded-full bg-innovation-100 flex items-center justify-center mr-3 flex-shrink-0">
                <span className="text-innovation-700 text-xs">✓</span>
              </div>
              <span className="text-sm">{t('product.features.valueChain.agentFeature2')}</span>
            </li>
            <li className="flex items-center">
              <div className="h-5 w-5 rounded-full bg-innovation-100 flex items-center justify-center mr-3 flex-shrink-0">
                <span className="text-innovation-700 text-xs">✓</span>
              </div>
              <span className="text-sm">{t('product.features.valueChain.agentFeature3')}</span>
            </li>
            <li className="flex items-center">
              <div className="h-5 w-5 rounded-full bg-innovation-100 flex items-center justify-center mr-3 flex-shrink-0">
                <span className="text-innovation-700 text-xs">✓</span>
              </div>
              <span className="text-sm">{t('product.features.valueChain.agentFeature4')}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      
      <div className="mt-12 text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-4 gradient-heading">
          {t('product.features.cta.title')}
        </h2>
        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6">
          <Button asChild size="lg" className="bg-gradient-to-r from-compliance-600 to-innovation-600 hover:from-compliance-700 hover:to-innovation-700 text-white px-8 py-6 h-auto text-lg shadow-lg shadow-slate-900/30 group">
            <Link to={`/${currentLocale}/contact`}>
              {t('product.features.cta.bookDemo')}
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </div>
    </PageTemplate>;
};
export default ProductFeatures;
