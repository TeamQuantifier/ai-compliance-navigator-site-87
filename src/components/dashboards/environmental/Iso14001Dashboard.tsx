
import React from 'react';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import { BarChart3, FileCheck2, CheckCircle2, AlertTriangle, BrainCircuit, TreePine, Activity } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

const Iso14001Dashboard = () => {
  // Sample data for ISO 14001 dashboard
  const complianceData = [
    { month: 'Jan', value: 68 },
    { month: 'Feb', value: 72 },
    { month: 'Mar', value: 78 },
    { month: 'Apr', value: 82 },
    { month: 'May', value: 85 },
    { month: 'Jun', value: 90 }
  ];

  const documentsByStatusData = [
    { name: 'Approved', value: 42 },
    { name: 'Pending Review', value: 15 },
    { name: 'Needs Update', value: 8 },
  ];
  
  const COLORS = ['#22c55e', '#f97316', '#ef4444'];
  
  const environmentalObjectives = [
    { name: 'Waste Reduction', progress: 72 },
    { name: 'Energy Efficiency', progress: 85 },
    { name: 'Water Conservation', progress: 64 }
  ];

  const aiAgentActions = [
    { action: 'Automated policy updates based on regulatory changes', time: '2 days ago' },
    { action: 'Environmental risk assessment completed', time: '1 week ago' },
    { action: 'Documentation review and approval workflow initiated', time: 'Yesterday' },
    { action: 'Non-compliance issue identified and corrective action suggested', time: '3 hours ago' },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Compliance Progress Card */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <FileCheck2 className="h-4 w-4 mr-2 text-green-600" />
              ISO 14001 Compliance Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600 mb-2">90%</div>
            <p className="text-xs text-slate-500 mb-2">Overall compliance score</p>
            <div className="h-32">
              <ChartContainer
                config={{
                  compliance: { 
                    theme: { 
                      light: '#22c55e',
                      dark: '#16a34a'
                    } 
                  }
                }}
              >
                <BarChart data={complianceData} margin={{ top: 5, right: 5, bottom: 5, left: 0 }}>
                  <XAxis dataKey="month" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
                  <YAxis hide domain={[50, 100]} />
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
              <BarChart3 className="h-4 w-4 mr-2 text-green-600" />
              Documentation Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-48">
              <ChartContainer
                config={{
                  status: { 
                    theme: { 
                      light: '#22c55e',
                      dark: '#16a34a'
                    } 
                  }
                }}
              >
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
                    <ChartTooltip content={<ChartTooltipContent />} />
                  </PieChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>

        {/* Environmental Objectives */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <TreePine className="h-4 w-4 mr-2 text-green-600" />
              Environmental Objectives
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {environmentalObjectives.map((objective) => (
                <div key={objective.name}>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs font-medium">{objective.name}</span>
                    <span className="text-xs font-semibold">{objective.progress}%</span>
                  </div>
                  <Progress value={objective.progress} className="h-1.5" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* AI Agent Activity */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium flex items-center">
            <BrainCircuit className="h-4 w-4 mr-2 text-green-600" />
            AI Agent Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {aiAgentActions.map((item, index) => (
              <div key={index} className="flex items-start pb-3 border-b border-slate-100 last:border-0 last:pb-0">
                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mr-3 flex-shrink-0">
                  <BrainCircuit className="h-4 w-4 text-green-600" />
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
  );
};

export default Iso14001Dashboard;
