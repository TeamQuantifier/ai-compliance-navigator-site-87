
import React from 'react';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, PieChart, Pie, Cell, Legend, LineChart, Line } from 'recharts';
import { FileText, Shield, CheckCircle2, AlertTriangle, BrainCircuit, Clock, MessageSquare, Lock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

const WhistleblowingDashboard = () => {
  // Sample data for Whistleblowing dashboard
  const caseResolutionData = [
    { month: 'Jan', value: 85 },
    { month: 'Feb', value: 82 },
    { month: 'Mar', value: 90 },
    { month: 'Apr', value: 86 },
    { month: 'May', value: 92 },
    { month: 'Jun', value: 95 }
  ];

  const casesByStatusData = [
    { name: 'Resolved', value: 24 },
    { name: 'In Progress', value: 9 },
    { name: 'New', value: 3 },
  ];
  
  const COLORS = ['#22c55e', '#f97316', '#ef4444'];
  
  const reportTrendData = [
    { month: 'Jan', reports: 8 },
    { month: 'Feb', reports: 12 },
    { month: 'Mar', reports: 7 },
    { month: 'Apr', reports: 10 },
    { month: 'May', reports: 6 },
    { month: 'Jun', reports: 4 }
  ];
  
  const caseCategories = [
    { name: 'Ethical Concerns', count: 12 },
    { name: 'Workplace Safety', count: 8 },
    { name: 'Compliance Issues', count: 16 }
  ];

  const aiAgentActions = [
    { action: 'Anonymous report triage completed', time: '1 hour ago' },
    { action: 'Follow-up questionnaire sent to reporter', time: '1 day ago' },
    { action: 'Case #245 evidence package prepared for review', time: 'Yesterday' },
    { action: 'Regulatory submission requirements verified', time: '2 days ago' },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Case Resolution Rate */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <FileText className="h-4 w-4 mr-2 text-indigo-600" />
              Case Resolution Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-indigo-600 mb-2">95%</div>
            <p className="text-xs text-slate-500 mb-2">Average time to resolution: 14 days</p>
            <div className="h-32">
              <ChartContainer
                config={{
                  resolution: { 
                    theme: { 
                      light: '#818cf8',
                      dark: '#6366f1'
                    } 
                  }
                }}
              >
                <BarChart data={caseResolutionData} margin={{ top: 5, right: 5, bottom: 5, left: 0 }}>
                  <XAxis dataKey="month" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
                  <YAxis hide domain={[80, 100]} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="value" name="resolution" radius={[4, 4, 0, 0]} barSize={12} />
                </BarChart>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>

        {/* Cases by Status */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <CheckCircle2 className="h-4 w-4 mr-2 text-indigo-600" />
              Cases by Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-48">
              <ChartContainer
                config={{
                  status: { 
                    theme: { 
                      light: '#818cf8',
                      dark: '#6366f1'
                    } 
                  }
                }}
              >
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={casesByStatusData}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={70}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {casesByStatusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Legend 
                      layout="vertical" 
                      verticalAlign="middle" 
                      align="right"
                      wrapperStyle={{ fontSize: '10px' }}
                    />
                    <ChartTooltip content={<ChartTooltipContent />} />
                  </PieChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>

        {/* Case Categories */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <Shield className="h-4 w-4 mr-2 text-indigo-600" />
              Report Categories
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {caseCategories.map((category) => (
                <div key={category.name}>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs font-medium">{category.name}</span>
                    <span className="text-xs font-semibold">{category.count} cases</span>
                  </div>
                  <Progress value={category.count * 100 / 20} className="h-1.5" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Report Trend */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <MessageSquare className="h-4 w-4 mr-2 text-indigo-600" />
              Report Submission Trend
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ChartContainer
                config={{
                  reports: { 
                    theme: { 
                      light: '#818cf8',
                      dark: '#6366f1'
                    } 
                  }
                }}
              >
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={reportTrendData}>
                    <XAxis 
                      dataKey="month" 
                      tick={{ fontSize: 10 }} 
                      axisLine={false} 
                      tickLine={false} 
                    />
                    <YAxis 
                      tick={{ fontSize: 10 }} 
                      axisLine={false} 
                      tickLine={false} 
                      width={30}
                    />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Line 
                      type="monotone" 
                      dataKey="reports" 
                      name="reports" 
                      stroke="#818cf8" 
                      strokeWidth={2} 
                      dot={{ r: 3 }} 
                    />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>

        {/* AI Agent Activity */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <BrainCircuit className="h-4 w-4 mr-2 text-indigo-600" />
              AI Agent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {aiAgentActions.map((item, index) => (
                <div key={index} className="flex items-start pb-3 border-b border-slate-100 last:border-0 last:pb-0">
                  <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center mr-3 flex-shrink-0">
                    <BrainCircuit className="h-4 w-4 text-indigo-600" />
                  </div>
                  <div>
                    <p className="text-sm">{item.action}</p>
                    <p className="text-xs text-slate-500 mt-1">{item.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default WhistleblowingDashboard;
