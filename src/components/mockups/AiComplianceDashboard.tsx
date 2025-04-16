
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
  Info
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
          <h2 className="font-semibold text-lg">Quantifier AI Compliance Dashboard</h2>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1 text-sm text-slate-500">
            <Clock className="h-4 w-4" />
            <span>Last updated: 10 minutes ago</span>
          </div>
          <div className="flex items-center gap-1 bg-green-50 text-green-700 px-2 py-1 rounded-full text-xs font-medium">
            <CheckCircle className="h-3.5 w-3.5" />
            <span>System Online</span>
          </div>
        </div>
      </div>

      {/* Dashboard Content */}
      <div className="p-6 grid grid-cols-12 gap-6 bg-slate-50">
        {/* Compliance Status Card */}
        <Card className="col-span-12 md:col-span-8 border-slate-200">
          <CardContent className="p-0">
            <div className="p-4 border-b border-slate-100 bg-white">
              <h3 className="font-medium text-lg flex items-center gap-2">
                <BarChart4 className="h-5 w-5 text-[#7E69AB]" />
                Compliance Status Overview
              </h3>
            </div>
            <div className="p-4 grid grid-cols-3 gap-4">
              <div className="bg-slate-50 p-4 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="text-sm font-medium text-slate-700">ISO 27001</h4>
                  <span className="text-xs bg-green-100 text-green-800 rounded-full px-2 py-0.5">94%</span>
                </div>
                <Progress value={94} className="h-2 mb-3" />
                <p className="text-xs text-slate-500">4 tasks remaining</p>
              </div>
              
              <div className="bg-slate-50 p-4 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="text-sm font-medium text-slate-700">ISO 9001</h4>
                  <span className="text-xs bg-amber-100 text-amber-800 rounded-full px-2 py-0.5">78%</span>
                </div>
                <Progress value={78} className="h-2 mb-3" />
                <p className="text-xs text-slate-500">12 tasks remaining</p>
              </div>
              
              <div className="bg-slate-50 p-4 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="text-sm font-medium text-slate-700">DORA</h4>
                  <span className="text-xs bg-amber-100 text-amber-800 rounded-full px-2 py-0.5">82%</span>
                </div>
                <Progress value={82} className="h-2 mb-3" />
                <p className="text-xs text-slate-500">9 tasks remaining</p>
              </div>
            </div>
            
            <div className="p-4 bg-white">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-sm font-medium text-slate-700">Recent AI-Driven Insights</h4>
                <span className="text-xs text-[#7E69AB]">View all</span>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg border border-blue-100">
                  <Info className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-blue-800 font-medium">Risk Assessment Improvement</p>
                    <p className="text-xs text-blue-600">AI has identified 3 areas where risk assessment can be improved for ISO 27001 compliance.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 p-3 bg-amber-50 rounded-lg border border-amber-100">
                  <AlertCircle className="h-4 w-4 text-amber-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-amber-800 font-medium">Documentation Gap</p>
                    <p className="text-xs text-amber-600">5 required documents for ISO 9001 need updating - automation plan suggested.</p>
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
                Key Metrics
              </h3>
            </div>
            
            <div className="p-4 space-y-4">
              <div className="bg-slate-50 p-3 rounded-lg flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="bg-green-100 p-1.5 rounded-full">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  </div>
                  <span className="text-sm font-medium">Controls Implemented</span>
                </div>
                <span className="text-lg font-semibold">87/95</span>
              </div>
              
              <div className="bg-slate-50 p-3 rounded-lg flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="bg-amber-100 p-1.5 rounded-full">
                    <Clock className="h-4 w-4 text-amber-600" />
                  </div>
                  <span className="text-sm font-medium">Pending Tasks</span>
                </div>
                <span className="text-lg font-semibold">24</span>
              </div>
              
              <div className="bg-slate-50 p-3 rounded-lg flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="bg-blue-100 p-1.5 rounded-full">
                    <FileText className="h-4 w-4 text-blue-600" />
                  </div>
                  <span className="text-sm font-medium">Policies</span>
                </div>
                <span className="text-lg font-semibold">18/20</span>
              </div>
            </div>

            <div className="p-4 border-t border-slate-100">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-sm font-medium text-slate-700">Upcoming Deadlines</h4>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center gap-2 p-2 bg-white rounded-lg border border-slate-200">
                  <Calendar className="h-4 w-4 text-[#7E69AB]" />
                  <div>
                    <p className="text-xs font-medium">ISO 27001 Audit</p>
                    <p className="text-xs text-slate-500">In 15 days</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 p-2 bg-white rounded-lg border border-slate-200">
                  <Calendar className="h-4 w-4 text-[#7E69AB]" />
                  <div>
                    <p className="text-xs font-medium">DORA Assessment</p>
                    <p className="text-xs text-slate-500">In 22 days</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Bottom Row */}
        <Card className="col-span-12 md:col-span-6 border-slate-200">
          <CardContent className="p-0">
            <div className="p-4 border-b border-slate-100 bg-white">
              <h3 className="font-medium text-lg flex items-center gap-2">
                <Activity className="h-5 w-5 text-[#7E69AB]" />
                Compliance Trend
              </h3>
            </div>
            
            <div className="p-4 flex justify-center">
              <div className="h-36 w-full bg-slate-50 rounded-lg flex items-center justify-center">
                <div className="flex flex-col items-center">
                  <TrendingUp className="h-8 w-8 text-green-500 mb-2" />
                  <p className="text-sm text-slate-600 text-center">Chart visualizing<br/>compliance improvement</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="col-span-12 md:col-span-6 border-slate-200">
          <CardContent className="p-0">
            <div className="p-4 border-b border-slate-100 bg-white">
              <h3 className="font-medium text-lg flex items-center gap-2">
                <Users className="h-5 w-5 text-[#7E69AB]" />
                Team Engagement
              </h3>
            </div>
            
            <div className="p-4">
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-slate-50 p-3 rounded-lg text-center">
                  <p className="text-sm font-medium text-slate-700">Assigned</p>
                  <p className="text-xl font-bold text-[#7E69AB]">42</p>
                  <p className="text-xs text-slate-500">tasks</p>
                </div>
                
                <div className="bg-slate-50 p-3 rounded-lg text-center">
                  <p className="text-sm font-medium text-slate-700">Completed</p>
                  <p className="text-xl font-bold text-green-600">36</p>
                  <p className="text-xs text-slate-500">tasks</p>
                </div>
                
                <div className="bg-slate-50 p-3 rounded-lg text-center">
                  <p className="text-sm font-medium text-slate-700">Overdue</p>
                  <p className="text-xl font-bold text-red-600">6</p>
                  <p className="text-xs text-slate-500">tasks</p>
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
