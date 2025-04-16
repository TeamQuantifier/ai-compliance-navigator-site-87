
import React from 'react';
import { 
  BarChart4, 
  Shield, 
  CheckCircle, 
  AlertCircle, 
  Clock, 
  FileText, 
  Calendar, 
  Users, 
  Activity,
  TrendingUp,
  Gauge,
  Info,
  Eye,
  Bell,
  Search,
  Filter,
  BrainCircuit,
  Zap,
  AlertTriangle,
  ArrowUpRight,
  ArrowDownRight,
  BadgeCheck
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

const AiComplianceDashboard = () => {
  return (
    <div className="w-full bg-slate-100 rounded-lg overflow-hidden border border-slate-200 shadow-lg">
      {/* Dashboard Header */}
      <div className="bg-white px-6 py-4 border-b border-slate-200 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Shield className="h-6 w-6 text-[#7E69AB]" />
          <h2 className="font-semibold text-lg">Quantifier AI Compliance Platform</h2>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex bg-slate-50 rounded-md p-1.5 border border-slate-200">
            <Search className="h-4 w-4 text-slate-400 mr-2" />
            <span className="text-xs text-slate-400">Search compliance data...</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Bell className="h-5 w-5 text-slate-500" />
              <span className="absolute -top-1 -right-1 h-3.5 w-3.5 bg-red-500 rounded-full flex items-center justify-center text-[10px] text-white font-bold">3</span>
            </div>
            <div className="h-8 w-8 bg-[#7E69AB] rounded-full flex items-center justify-center">
              <span className="text-xs text-white font-medium">JD</span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats Bar */}
      <div className="bg-white px-6 py-3 border-b border-slate-200 flex justify-between items-center">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
              <CheckCircle className="h-4 w-4 text-green-600" />
            </div>
            <div>
              <div className="text-xs text-slate-500">Overall Compliance</div>
              <div className="text-sm font-semibold">87%</div>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-amber-100 flex items-center justify-center">
              <AlertCircle className="h-4 w-4 text-amber-600" />
            </div>
            <div>
              <div className="text-xs text-slate-500">Open Issues</div>
              <div className="text-sm font-semibold">12</div>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
              <Calendar className="h-4 w-4 text-blue-600" />
            </div>
            <div>
              <div className="text-xs text-slate-500">Next Audit</div>
              <div className="text-sm font-semibold">15 days</div>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-2 text-sm text-[#7E69AB]">
          <BrainCircuit className="h-4 w-4" />
          <span className="font-medium">AI Compliance Assistant</span>
        </div>
      </div>

      {/* Dashboard Content */}
      <div className="p-6 grid grid-cols-12 gap-6 bg-slate-50">
        {/* Compliance Status Card */}
        <Card className="col-span-12 md:col-span-8 border-slate-200">
          <CardContent className="p-0">
            <div className="p-4 border-b border-slate-100 bg-white flex justify-between items-center">
              <h3 className="font-medium text-lg flex items-center gap-2">
                <BarChart4 className="h-5 w-5 text-[#7E69AB]" />
                Compliance Status by Framework
              </h3>
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-slate-400" />
                <span className="text-xs text-slate-400">Filter</span>
              </div>
            </div>
            
            <div className="p-4 grid grid-cols-3 gap-4">
              <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="text-sm font-medium text-slate-700">ISO 27001</h4>
                  <span className="text-xs bg-green-100 text-green-800 rounded-full px-2 py-0.5">94%</span>
                </div>
                <Progress value={94} className="h-2 mb-3" />
                <div className="flex justify-between items-center">
                  <p className="text-xs text-slate-500">4 tasks remaining</p>
                  <span className="text-xs text-green-600 flex items-center">
                    <ArrowUpRight className="h-3 w-3 mr-0.5" />+5%
                  </span>
                </div>
              </div>
              
              <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="text-sm font-medium text-slate-700">ISO 9001</h4>
                  <span className="text-xs bg-amber-100 text-amber-800 rounded-full px-2 py-0.5">78%</span>
                </div>
                <Progress value={78} className="h-2 mb-3" />
                <div className="flex justify-between items-center">
                  <p className="text-xs text-slate-500">12 tasks remaining</p>
                  <span className="text-xs text-amber-600 flex items-center">
                    <ArrowDownRight className="h-3 w-3 mr-0.5" />-2%
                  </span>
                </div>
              </div>
              
              <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="text-sm font-medium text-slate-700">DORA</h4>
                  <span className="text-xs bg-amber-100 text-amber-800 rounded-full px-2 py-0.5">82%</span>
                </div>
                <Progress value={82} className="h-2 mb-3" />
                <div className="flex justify-between items-center">
                  <p className="text-xs text-slate-500">9 tasks remaining</p>
                  <span className="text-xs text-green-600 flex items-center">
                    <ArrowUpRight className="h-3 w-3 mr-0.5" />+3%
                  </span>
                </div>
              </div>
            </div>
            
            <div className="p-4 bg-white border-t border-slate-100">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-sm font-medium text-slate-700 flex items-center gap-1">
                  <Zap className="h-4 w-4 text-[#7E69AB]" />
                  AI-Driven Insights
                </h4>
                <span className="text-xs text-[#7E69AB]">View all</span>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg border border-blue-100">
                  <BrainCircuit className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-blue-800 font-medium">Risk Assessment Improvement</p>
                    <p className="text-xs text-blue-600">AI has identified 3 areas where risk assessment can be improved for ISO 27001 compliance.</p>
                    <div className="flex items-center gap-2 mt-2">
                      <button className="text-xs bg-blue-600 text-white px-2 py-1 rounded">View Details</button>
                      <button className="text-xs text-blue-700">Dismiss</button>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 p-3 bg-amber-50 rounded-lg border border-amber-100">
                  <AlertTriangle className="h-4 w-4 text-amber-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-amber-800 font-medium">Documentation Gap</p>
                    <p className="text-xs text-amber-600">5 required documents for ISO 9001 need updating - automation plan suggested.</p>
                    <div className="flex items-center gap-2 mt-2">
                      <button className="text-xs bg-amber-600 text-white px-2 py-1 rounded">View Plan</button>
                      <button className="text-xs text-amber-700">Dismiss</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Key Metrics Card */}
        <Card className="col-span-12 md:col-span-4 border-slate-200">
          <CardContent className="p-0">
            <div className="p-4 border-b border-slate-100 bg-white">
              <h3 className="font-medium text-lg flex items-center gap-2">
                <Gauge className="h-5 w-5 text-[#7E69AB]" />
                Real-time Risk Assessment
              </h3>
            </div>
            
            <div className="p-4 space-y-4 bg-white">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-sm font-medium text-slate-700">Risk Categories</h4>
                <span className="text-xs px-2 py-0.5 bg-green-100 text-green-800 rounded-full">Updated 5m ago</span>
              </div>
              
              <div className="bg-white p-3 rounded-lg border border-slate-200 flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="bg-red-100 p-1.5 rounded-full">
                    <AlertCircle className="h-4 w-4 text-red-600" />
                  </div>
                  <span className="text-sm font-medium">Critical Risks</span>
                </div>
                <span className="text-lg font-semibold">2</span>
              </div>
              
              <div className="bg-white p-3 rounded-lg border border-slate-200 flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="bg-amber-100 p-1.5 rounded-full">
                    <AlertTriangle className="h-4 w-4 text-amber-600" />
                  </div>
                  <span className="text-sm font-medium">High Risks</span>
                </div>
                <span className="text-lg font-semibold">5</span>
              </div>
              
              <div className="bg-white p-3 rounded-lg border border-slate-200 flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="bg-blue-100 p-1.5 rounded-full">
                    <Info className="h-4 w-4 text-blue-600" />
                  </div>
                  <span className="text-sm font-medium">Medium Risks</span>
                </div>
                <span className="text-lg font-semibold">14</span>
              </div>
            </div>

            <div className="p-4 border-t border-slate-100 bg-white">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-sm font-medium text-slate-700">Recent Risk Alerts</h4>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-start gap-2 p-3 bg-red-50 rounded-lg border border-red-100">
                  <AlertCircle className="h-4 w-4 text-red-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-xs font-medium text-red-800">Unauthorized Access Attempt</p>
                    <p className="text-xs text-red-600">Detected 12 minutes ago</p>
                    <button className="text-xs bg-red-600 text-white px-2 py-0.5 rounded mt-1">Investigate</button>
                  </div>
                </div>
                
                <div className="flex items-start gap-2 p-3 bg-amber-50 rounded-lg border border-amber-100">
                  <AlertTriangle className="h-4 w-4 text-amber-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-xs font-medium text-amber-800">Outdated Security Policy</p>
                    <p className="text-xs text-amber-600">Requires attention within 7 days</p>
                    <button className="text-xs bg-amber-600 text-white px-2 py-0.5 rounded mt-1">Review</button>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Compliance Trend */}
        <Card className="col-span-12 md:col-span-6 border-slate-200">
          <CardContent className="p-0">
            <div className="p-4 border-b border-slate-100 bg-white">
              <h3 className="font-medium text-lg flex items-center gap-2">
                <Activity className="h-5 w-5 text-[#7E69AB]" />
                Compliance Trend Analysis
              </h3>
            </div>
            
            <div className="p-4 bg-white">
              <div className="space-y-4">
                <div className="h-36 w-full bg-white rounded-lg border border-slate-200 p-3">
                  <div className="flex justify-between items-center mb-3">
                    <div className="text-sm font-medium">Overall Compliance Score</div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-green-600 flex items-center">
                        <ArrowUpRight className="h-3 w-3 mr-0.5" />+8%
                      </span>
                      <span className="text-xs text-slate-500">vs last quarter</span>
                    </div>
                  </div>
                  
                  <div className="h-16 relative">
                    {/* Simplified chart visualization */}
                    <div className="absolute bottom-0 left-0 w-full h-full flex items-end">
                      <div className="w-1/12 h-[30%] bg-slate-200"></div>
                      <div className="w-1/12 h-[45%] bg-slate-200"></div>
                      <div className="w-1/12 h-[40%] bg-slate-200"></div>
                      <div className="w-1/12 h-[60%] bg-slate-200"></div>
                      <div className="w-1/12 h-[55%] bg-slate-200"></div>
                      <div className="w-1/12 h-[70%] bg-slate-200"></div>
                      <div className="w-1/12 h-[65%] bg-slate-200"></div>
                      <div className="w-1/12 h-[75%] bg-slate-200"></div>
                      <div className="w-1/12 h-[80%] bg-slate-200"></div>
                      <div className="w-1/12 h-[78%] bg-slate-200"></div>
                      <div className="w-1/12 h-[85%] bg-[#9b87f5]"></div>
                      <div className="w-1/12 h-[87%] bg-[#7E69AB]"></div>
                    </div>
                  </div>
                  
                  <div className="flex justify-between text-xs text-slate-400 mt-2">
                    <span>Jan</span>
                    <span>Feb</span>
                    <span>Mar</span>
                    <span>Apr</span>
                    <span>May</span>
                    <span>Jun</span>
                    <span>Jul</span>
                    <span>Aug</span>
                    <span>Sep</span>
                    <span>Oct</span>
                    <span>Nov</span>
                    <span>Dec</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="bg-white p-3 rounded-lg border border-slate-200 flex-1">
                    <div className="text-xs text-slate-500 mb-1">ISO 27001</div>
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-semibold">94%</span>
                      <span className="text-xs text-green-600 flex items-center">
                        <ArrowUpRight className="h-3 w-3 mr-0.5" />+5%
                      </span>
                    </div>
                  </div>
                  
                  <div className="bg-white p-3 rounded-lg border border-slate-200 flex-1">
                    <div className="text-xs text-slate-500 mb-1">ISO 9001</div>
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-semibold">78%</span>
                      <span className="text-xs text-amber-600 flex items-center">
                        <ArrowDownRight className="h-3 w-3 mr-0.5" />-2%
                      </span>
                    </div>
                  </div>
                  
                  <div className="bg-white p-3 rounded-lg border border-slate-200 flex-1">
                    <div className="text-xs text-slate-500 mb-1">DORA</div>
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-semibold">82%</span>
                      <span className="text-xs text-green-600 flex items-center">
                        <ArrowUpRight className="h-3 w-3 mr-0.5" />+3%
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Team Engagement */}
        <Card className="col-span-12 md:col-span-6 border-slate-200">
          <CardContent className="p-0">
            <div className="p-4 border-b border-slate-100 bg-white">
              <h3 className="font-medium text-lg flex items-center gap-2">
                <Users className="h-5 w-5 text-[#7E69AB]" />
                Team Engagement & Tasks
              </h3>
            </div>
            
            <div className="p-4 bg-white">
              <div className="grid grid-cols-3 gap-3 mb-4">
                <div className="bg-white p-3 rounded-lg border border-slate-200 text-center">
                  <p className="text-sm font-medium text-slate-700">Assigned</p>
                  <p className="text-xl font-bold text-[#7E69AB]">42</p>
                  <p className="text-xs text-slate-500">tasks</p>
                </div>
                
                <div className="bg-white p-3 rounded-lg border border-slate-200 text-center">
                  <p className="text-sm font-medium text-slate-700">Completed</p>
                  <p className="text-xl font-bold text-green-600">36</p>
                  <p className="text-xs text-slate-500">tasks</p>
                </div>
                
                <div className="bg-white p-3 rounded-lg border border-slate-200 text-center">
                  <p className="text-sm font-medium text-slate-700">Overdue</p>
                  <p className="text-xl font-bold text-red-600">6</p>
                  <p className="text-xs text-slate-500">tasks</p>
                </div>
              </div>
              
              <div className="bg-white rounded-lg border border-slate-200 p-3">
                <h4 className="text-sm font-medium mb-3">Upcoming Tasks</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-2 border-b border-slate-100">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-[#7E69AB]" />
                      <div>
                        <p className="text-xs font-medium">Update Access Control Policy</p>
                        <p className="text-xs text-slate-500">Due in 3 days</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="h-5 w-5 rounded-full bg-slate-200 flex items-center justify-center text-[10px] text-slate-600">JD</div>
                      <div className="h-5 w-5 rounded-full bg-slate-200 flex items-center justify-center text-[10px] text-slate-600">TK</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between p-2 border-b border-slate-100">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-[#7E69AB]" />
                      <div>
                        <p className="text-xs font-medium">Review Third-party Risk Assessment</p>
                        <p className="text-xs text-slate-500">Due in 5 days</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="h-5 w-5 rounded-full bg-slate-200 flex items-center justify-center text-[10px] text-slate-600">SL</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between p-2">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-[#7E69AB]" />
                      <div>
                        <p className="text-xs font-medium">Conduct Security Awareness Training</p>
                        <p className="text-xs text-slate-500">Due in 8 days</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="h-5 w-5 rounded-full bg-slate-200 flex items-center justify-center text-[10px] text-slate-600">JD</div>
                      <div className="h-5 w-5 rounded-full bg-slate-200 flex items-center justify-center text-[10px] text-slate-600">RL</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Bottom Row - AI Recommendations */}
        <Card className="col-span-12 border-slate-200">
          <CardContent className="p-0">
            <div className="p-4 border-b border-slate-100 bg-white">
              <h3 className="font-medium text-lg flex items-center gap-2">
                <BrainCircuit className="h-5 w-5 text-[#7E69AB]" />
                AI Recommendations for Compliance Improvements
              </h3>
            </div>
            
            <div className="p-4 bg-white">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="h-8 w-8 rounded-full bg-[#E5DEFF] flex items-center justify-center">
                      <BadgeCheck className="h-4 w-4 text-[#7E69AB]" />
                    </div>
                    <h4 className="font-medium">Documentation Enhancement</h4>
                  </div>
                  <p className="text-sm text-slate-600 mb-3">
                    AI analysis suggests updating 5 key policies to improve ISO 9001 compliance by approximately 12%.
                  </p>
                  <button className="w-full text-sm bg-[#7E69AB] text-white p-2 rounded-lg">View Details</button>
                </div>
                
                <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="h-8 w-8 rounded-full bg-[#E5DEFF] flex items-center justify-center">
                      <Shield className="h-4 w-4 text-[#7E69AB]" />
                    </div>
                    <h4 className="font-medium">Risk Mitigation Plan</h4>
                  </div>
                  <p className="text-sm text-slate-600 mb-3">
                    Automated plan to address 3 critical security risks identified in the access control domain.
                  </p>
                  <button className="w-full text-sm bg-[#7E69AB] text-white p-2 rounded-lg">Implement Plan</button>
                </div>
                
                <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="h-8 w-8 rounded-full bg-[#E5DEFF] flex items-center justify-center">
                      <Activity className="h-4 w-4 text-[#7E69AB]" />
                    </div>
                    <h4 className="font-medium">Process Optimization</h4>
                  </div>
                  <p className="text-sm text-slate-600 mb-3">
                    Streamline audit preparation workflows to reduce manual effort by 35% and improve evidence quality.
                  </p>
                  <button className="w-full text-sm bg-[#7E69AB] text-white p-2 rounded-lg">Review & Approve</button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AiComplianceDashboard;
