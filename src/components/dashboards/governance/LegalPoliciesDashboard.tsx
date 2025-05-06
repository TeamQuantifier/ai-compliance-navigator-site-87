
import React from 'react';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, PieChart, Pie, Cell, Legend, LineChart, Line } from 'recharts';
import { FileText, Bell, CheckCircle2, AlertTriangle, BrainCircuit, MessageSquare, ClipboardCheck, Shield } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

const LegalPoliciesDashboard = () => {
  // Sample data for Legal Policies dashboard
  const policyComplianceData = [
    { month: 'Jan', value: 78 },
    { month: 'Feb', value: 82 },
    { month: 'Mar', value: 85 },
    { month: 'Apr', value: 89 },
    { month: 'May', value: 92 },
    { month: 'Jun', value: 95 }
  ];

  const documentsByStatusData = [
    { name: 'Acknowledged', value: 85 },
    { name: 'Pending', value: 12 },
    { name: 'Expired', value: 3 },
  ];
  
  const COLORS = ['#22c55e', '#f97316', '#ef4444'];
  
  const policyDistributionData = [
    { month: 'Jan', employees: 120 },
    { month: 'Feb', employees: 156 },
    { month: 'Mar', employees: 187 },
    { month: 'Apr', employees: 205 },
    { month: 'May', employees: 230 },
    { month: 'Jun', employees: 255 }
  ];
  
  const policyCategories = [
    { name: 'Code of Conduct', progress: 96 },
    { name: 'Data Protection', progress: 88 },
    { name: 'Anti-Corruption', progress: 92 }
  ];

  const aiAgentActions = [
    { action: 'Policy update notification sent to Sales team', time: '2 hours ago' },
    { action: 'GDPR compliance reminder scheduled for next week', time: '1 day ago' },
    { action: 'Anti-corruption training completion report generated', time: 'Yesterday' },
    { action: 'New employees onboarding policy package prepared', time: '3 days ago' },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Policy Compliance Card */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <FileText className="h-4 w-4 mr-2 text-purple-600" />
              Policy Compliance Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600 mb-2">95%</div>
            <p className="text-xs text-slate-500 mb-2">Overall acknowledgment rate</p>
            <div className="h-32">
              <ChartContainer
                config={{
                  compliance: { 
                    theme: { 
                      light: '#9b87f5',
                      dark: '#7E69AB'
                    } 
                  }
                }}
              >
                <BarChart data={policyComplianceData} margin={{ top: 5, right: 5, bottom: 5, left: 0 }}>
                  <XAxis dataKey="month" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
                  <YAxis hide domain={[70, 100]} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="value" name="compliance" radius={[4, 4, 0, 0]} barSize={12} />
                </BarChart>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>

        {/* Documentation Status */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <ClipboardCheck className="h-4 w-4 mr-2 text-purple-600" />
              Documentation Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={documentsByStatusData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={70}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {documentsByStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Legend 
                    layout="vertical" 
                    verticalAlign="middle" 
                    align="right"
                    wrapperStyle={{ fontSize: '10px' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Policy Categories */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <Shield className="h-4 w-4 mr-2 text-purple-600" />
              Policy Categories
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {policyCategories.map((category) => (
                <div key={category.name}>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs font-medium">{category.name}</span>
                    <span className="text-xs font-semibold">{category.progress}%</span>
                  </div>
                  <Progress value={category.progress} className="h-1.5" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Policy Distribution Trend */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <Bell className="h-4 w-4 mr-2 text-purple-600" />
              Policy Distribution Trend
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={policyDistributionData}>
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
                    dataKey="employees" 
                    name="Employees Reached"
                    stroke="#9b87f5" 
                    strokeWidth={2} 
                    dot={{ r: 3 }} 
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* AI Agent Activity */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <BrainCircuit className="h-4 w-4 mr-2 text-purple-600" />
              AI Agent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {aiAgentActions.map((item, index) => (
                <div key={index} className="flex items-start pb-3 border-b border-slate-100 last:border-0 last:pb-0">
                  <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center mr-3 flex-shrink-0">
                    <BrainCircuit className="h-4 w-4 text-purple-600" />
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

export default LegalPoliciesDashboard;
