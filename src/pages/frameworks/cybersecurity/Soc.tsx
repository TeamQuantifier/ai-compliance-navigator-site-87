
import PageTemplate from '@/components/PageTemplate';
import { Shield, CheckCircle, ArrowRight, BarChart2, CheckSquare, Clock, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';

const Soc = () => {
  return (
    <PageTemplate
      title="SOC 1 & SOC 2 Compliance"
      description="Demonstrate trust to your customers, investors, and partners with automated SOC compliance."
    >
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <section className="mb-16">
          <div className="bg-gradient-to-r from-compliance-800 to-innovation-800 rounded-xl p-8 md:p-12 text-white flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-3/5">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                SOC Compliance That Handles Itself
              </h2>
              <p className="text-xl opacity-90 mb-6">
                Stay audit-ready with continuous SOC 1 & SOC 2 compliance automation.
              </p>
              <Button size="lg" className="bg-gradient-to-r from-compliance-600 to-innovation-600 hover:from-compliance-700 hover:to-innovation-700 text-white">
                <Link to="/contact" className="flex items-center">
                  Book a Demo <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
            <div className="md:w-2/5">
              <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-slate-200">
                <div className="bg-innovation-900 text-white p-3 flex items-center justify-between">
                  <div className="flex items-center">
                    <Shield className="h-5 w-5 mr-2 text-innovation-400" />
                    <span className="font-medium">Quantifier SOC Dashboard</span>
                  </div>
                  <div className="flex space-x-1">
                    <div className="w-3 h-3 rounded-full bg-red-400"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                    <div className="w-3 h-3 rounded-full bg-green-400"></div>
                  </div>
                </div>
                <div className="p-4 bg-slate-50">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-semibold text-slate-800">SOC 2 Readiness Overview</h3>
                    <div className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium">93% Complete</div>
                  </div>
                  <div className="grid grid-cols-2 gap-3 mb-3">
                    <div className="bg-white p-3 rounded-lg border border-slate-200 shadow-sm">
                      <div className="flex items-center text-sm text-slate-500 mb-1">
                        <CheckSquare className="h-4 w-4 mr-1 text-innovation-600" />
                        <span>Controls Status</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-semibold text-slate-800">107/115</span>
                        <div className="w-16 bg-slate-200 rounded-full h-2">
                          <div className="bg-innovation-600 h-2 rounded-full" style={{ width: '93%' }}></div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-white p-3 rounded-lg border border-slate-200 shadow-sm">
                      <div className="flex items-center text-sm text-slate-500 mb-1">
                        <FileText className="h-4 w-4 mr-1 text-compliance-600" />
                        <span>Evidence Items</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-semibold text-slate-800">243</span>
                        <div className="text-xs text-compliance-600 bg-compliance-100 px-2 py-0.5 rounded">
                          Up to date
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white p-3 rounded-lg border border-slate-200 shadow-sm mb-3">
                    <div className="flex items-center text-sm text-slate-500 mb-1">
                      <Clock className="h-4 w-4 mr-1 text-yellow-600" />
                      <span>Due Tasks</span>
                    </div>
                    <div className="space-y-2 mt-1">
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-600">Review security risk assessment</span>
                        <span className="text-yellow-600">3 days</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-600">Update access control logs</span>
                        <span className="text-yellow-600">5 days</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <button className="text-xs text-innovation-600 hover:text-innovation-700 font-medium">Open Dashboard →</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="mb-16">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="md:w-1/2">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-compliance-100 text-compliance-800 mb-4">
                <Shield className="w-5 h-5 mr-2" />
                <span className="font-medium">SOC 1 & SOC 2 Compliance</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold mb-4 gradient-heading">
                Demonstrate Trust to Your Stakeholders
              </h2>
              <p className="text-lg text-slate-700 mb-6">
                Our platform ensures continuous readiness for both SOC 1 and SOC 2, covering controls 
                around data handling, privacy, availability, and more.
              </p>
              
              <h4 className="font-semibold text-lg mb-3">Key Benefits:</h4>
              <ul className="space-y-3 mb-6">
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
              <Button className="group bg-gradient-to-r from-compliance-600 to-innovation-600 hover:from-compliance-700 hover:to-innovation-700 text-white">
                Schedule SOC Readiness Assessment
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
            <div className="md:w-1/2">
              <Card className="border-compliance-100">
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl">SOC 2 Trust Services Criteria Coverage</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-compliance-600 mt-1 mr-2 flex-shrink-0" />
                      <div>
                        <span className="font-medium">Security:</span>
                        <span className="text-slate-600 ml-1">Protection against unauthorized access</span>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-compliance-600 mt-1 mr-2 flex-shrink-0" />
                      <div>
                        <span className="font-medium">Availability:</span>
                        <span className="text-slate-600 ml-1">Systems are available for operation and use</span>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-compliance-600 mt-1 mr-2 flex-shrink-0" />
                      <div>
                        <span className="font-medium">Processing Integrity:</span>
                        <span className="text-slate-600 ml-1">System processing is complete, accurate, and authorized</span>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-compliance-600 mt-1 mr-2 flex-shrink-0" />
                      <div>
                        <span className="font-medium">Confidentiality:</span>
                        <span className="text-slate-600 ml-1">Information designated as confidential is protected</span>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-compliance-600 mt-1 mr-2 flex-shrink-0" />
                      <div>
                        <span className="font-medium">Privacy:</span>
                        <span className="text-slate-600 ml-1">Personal information is collected, used, and retained appropriately</span>
                      </div>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Platform Screenshot Section */}
        <section className="mb-16">
          <div className="bg-gradient-to-r from-compliance-100 to-slate-100 p-6 rounded-xl">
            <div className="flex flex-col items-center text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-compliance-900">
                SOC Compliance Dashboard
              </h2>
              <p className="text-lg text-slate-700 max-w-2xl">
                Get a comprehensive view of your SOC compliance status with our interactive dashboard.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* First Screenshot: Evidence Collection */}
              <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-slate-200">
                <div className="bg-compliance-900 text-white p-3 flex justify-between items-center">
                  <div className="flex items-center">
                    <FileText className="h-4 w-4 mr-2 text-compliance-400" />
                    <span className="font-medium">Evidence Collection</span>
                  </div>
                  <div className="flex space-x-2">
                    <div className="text-xs bg-compliance-700 px-2 py-0.5 rounded-full">SOC 2</div>
                  </div>
                </div>
                <div className="p-4">
                  <div className="mb-4 border-b border-slate-200 pb-3">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-medium text-slate-800">Access Control Evidence</h3>
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded">Verified</span>
                    </div>
                    <p className="text-sm text-slate-600 mb-2">Control ID: CC6.1 - Access to systems is limited to authorized users</p>
                    <div className="flex flex-wrap gap-2">
                      <div className="text-xs px-2 py-1 bg-slate-100 rounded-full flex items-center">
                        <FileText className="h-3 w-3 mr-1 text-slate-600" />
                        <span>Access_Policy_v2.pdf</span>
                      </div>
                      <div className="text-xs px-2 py-1 bg-slate-100 rounded-full flex items-center">
                        <FileText className="h-3 w-3 mr-1 text-slate-600" />
                        <span>User_Access_Log_Q2.xlsx</span>
                      </div>
                    </div>
                  </div>
                  <div className="mb-4 border-b border-slate-200 pb-3">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-medium text-slate-800">Risk Assessment</h3>
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded">Verified</span>
                    </div>
                    <p className="text-sm text-slate-600 mb-2">Control ID: CC3.1 - Risk identification and mitigation</p>
                    <div className="flex flex-wrap gap-2">
                      <div className="text-xs px-2 py-1 bg-slate-100 rounded-full flex items-center">
                        <FileText className="h-3 w-3 mr-1 text-slate-600" />
                        <span>Risk_Assessment_2025.pdf</span>
                      </div>
                    </div>
                  </div>
                  <div className="mb-2">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-medium text-slate-800">Security Monitoring</h3>
                      <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded">Pending</span>
                    </div>
                    <p className="text-sm text-slate-600 mb-2">Control ID: CC7.2 - Security incidents are identified and remediated</p>
                    <button className="text-xs bg-compliance-600 text-white px-3 py-1 rounded-full hover:bg-compliance-700">
                      Upload Evidence
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Second Screenshot: Control Monitoring */}
              <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-slate-200">
                <div className="bg-innovation-900 text-white p-3 flex justify-between items-center">
                  <div className="flex items-center">
                    <BarChart2 className="h-4 w-4 mr-2 text-innovation-400" />
                    <span className="font-medium">Control Monitoring</span>
                  </div>
                  <div className="flex space-x-2">
                    <div className="text-xs bg-innovation-700 px-2 py-0.5 rounded-full">Analytics</div>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-medium text-slate-800">Trust Services Categories</h3>
                    <select className="text-xs border border-slate-300 rounded py-1 px-2">
                      <option>Last 30 days</option>
                      <option>Last quarter</option>
                      <option>Year to date</option>
                    </select>
                  </div>
                  
                  <div className="space-y-4 mb-5">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="font-medium text-slate-800">Security</span>
                        <span className="text-slate-600">98%</span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-2">
                        <div className="bg-green-500 h-2 rounded-full" style={{ width: '98%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="font-medium text-slate-800">Availability</span>
                        <span className="text-slate-600">85%</span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-2">
                        <div className="bg-green-500 h-2 rounded-full" style={{ width: '85%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="font-medium text-slate-800">Processing Integrity</span>
                        <span className="text-slate-600">90%</span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-2">
                        <div className="bg-green-500 h-2 rounded-full" style={{ width: '90%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="font-medium text-slate-800">Confidentiality</span>
                        <span className="text-slate-600">95%</span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-2">
                        <div className="bg-green-500 h-2 rounded-full" style={{ width: '95%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="font-medium text-slate-800">Privacy</span>
                        <span className="text-slate-600">92%</span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-2">
                        <div className="bg-green-500 h-2 rounded-full" style={{ width: '92%' }}></div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-slate-50 p-3 rounded border border-slate-200">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="p-1.5 bg-innovation-100 rounded-full">
                        <Shield className="h-4 w-4 text-innovation-700" />
                      </div>
                      <h4 className="font-medium text-sm text-slate-800">AI Suggestions</h4>
                    </div>
                    <p className="text-xs text-slate-600">
                      Consider improving your change management documentation to strengthen your Processing Integrity score. Our AI has identified 3 controls that need attention.
                    </p>
                    <button className="text-xs text-innovation-600 hover:text-innovation-700 font-medium mt-2">
                      View Recommendations →
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="mb-8">
          <div className="bg-gradient-to-r from-compliance-800 to-innovation-700 rounded-xl p-8 md:p-12 text-white">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to Streamline Your SOC Compliance?
              </h2>
              <p className="text-xl opacity-90 mb-8">
                Join organizations that trust our platform to automate their SOC compliance journey.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button size="lg" className="bg-gradient-to-r from-compliance-600 to-innovation-600 hover:from-compliance-700 hover:to-innovation-700 text-white px-8">
                  <Link to="/contact" className="flex items-center">
                    Book a Demo <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
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

export default Soc;
