
import React from 'react';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Bar, BarChart, XAxis, YAxis, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { BarChart3, FileCheck2, BrainCircuit, Layers, ChartLine } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const LcaDashboard = () => {
  // Sample data for LCA dashboard
  const environmentalImpactData = [
    { stage: 'Raw Materials', carbon: 42, water: 28, land: 15 },
    { stage: 'Manufacturing', carbon: 28, water: 15, land: 8 },
    { stage: 'Distribution', carbon: 15, water: 5, land: 3 },
    { stage: 'Use', carbon: 30, water: 40, land: 2 },
    { stage: 'End of Life', carbon: 10, water: 8, land: 12 },
  ];
  
  const materialBreakdownData = [
    { name: 'Plastics', value: 35 },
    { name: 'Metals', value: 25 },
    { name: 'Textiles', value: 20 },
    { name: 'Electronics', value: 15 },
    { name: 'Other', value: 5 },
  ];
  
  const COLORS = ['#3b82f6', '#22c55e', '#f97316', '#8b5cf6', '#a1a1aa'];
  
  const recentAssessments = [
    { product: 'Product A', status: 'Completed', date: '2023-05-01', score: 'A' },
    { product: 'Product B', status: 'In Progress', date: '2023-05-12', score: 'NA' },
    { product: 'Product C', status: 'Completed', date: '2023-04-28', score: 'B' },
    { product: 'Product D', status: 'Planned', date: '2023-05-20', score: 'NA' },
  ];

  const aiSuggestions = [
    "Consider alternative packaging materials to reduce environmental impact by ~15%",
    "Optimize transportation routes to reduce emissions by 8.2%",
    "Implement recycled material substitution for components A, B, and C",
    "Energy reduction opportunity identified in manufacturing phase"
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed': return 'bg-green-100 text-green-800';
      case 'In Progress': return 'bg-blue-100 text-blue-800';
      case 'Planned': return 'bg-slate-100 text-slate-800';
      default: return 'bg-slate-100 text-slate-800';
    }
  };

  const getScoreColor = (score) => {
    switch (score) {
      case 'A': return 'bg-green-100 text-green-800';
      case 'B': return 'bg-blue-100 text-blue-800';
      case 'C': return 'bg-amber-100 text-amber-800';
      case 'D': return 'bg-orange-100 text-orange-800';
      case 'E': return 'bg-red-100 text-red-800';
      default: return 'bg-slate-100 text-slate-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Environmental Impact Chart */}
        <Card className="col-span-1 md:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <ChartLine className="h-4 w-4 mr-2 text-emerald-600" />
              Environmental Impact by Lifecycle Stage
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-72">
              <ChartContainer
                config={{
                  carbon: { 
                    theme: { light: '#3b82f6', dark: '#2563eb' },
                    label: 'Carbon Footprint'
                  },
                  water: { 
                    theme: { light: '#22c55e', dark: '#16a34a' },
                    label: 'Water Usage'
                  },
                  land: { 
                    theme: { light: '#f97316', dark: '#ea580c' },
                    label: 'Land Use'
                  }
                }}
              >
                <BarChart data={environmentalImpactData} barGap={0} margin={{ top: 10, right: 10, bottom: 20, left: 10 }}>
                  <XAxis dataKey="stage" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Legend />
                  <Bar dataKey="carbon" name="carbon" stackId="a" radius={[4, 4, 0, 0]} barSize={20} />
                  <Bar dataKey="water" name="water" stackId="a" radius={[4, 4, 0, 0]} barSize={20} />
                  <Bar dataKey="land" name="land" stackId="a" radius={[4, 4, 0, 0]} barSize={20} />
                </BarChart>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>

        {/* Material Breakdown */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <Layers className="h-4 w-4 mr-2 text-emerald-600" />
              Material Composition
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={materialBreakdownData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={70}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {materialBreakdownData.map((entry, index) => (
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

        {/* Recent LCA Projects */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <FileCheck2 className="h-4 w-4 mr-2 text-emerald-600" />
              Recent LCA Assessments
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="text-left py-2 font-medium text-slate-500">Product</th>
                    <th className="text-left py-2 font-medium text-slate-500">Status</th>
                    <th className="text-left py-2 font-medium text-slate-500">Date</th>
                    <th className="text-left py-2 font-medium text-slate-500">Score</th>
                  </tr>
                </thead>
                <tbody>
                  {recentAssessments.map((assessment, index) => (
                    <tr key={index} className="border-b border-slate-100 last:border-0">
                      <td className="py-2">{assessment.product}</td>
                      <td className="py-2">
                        <Badge variant="outline" className={getStatusColor(assessment.status)}>
                          {assessment.status}
                        </Badge>
                      </td>
                      <td className="py-2">{assessment.date}</td>
                      <td className="py-2">
                        {assessment.score !== 'NA' ? (
                          <Badge className={getScoreColor(assessment.score)}>
                            {assessment.score}
                          </Badge>
                        ) : (
                          <span className="text-slate-400">—</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* AI Agent Suggestions */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium flex items-center">
            <BrainCircuit className="h-4 w-4 mr-2 text-emerald-600" />
            AI-Generated Improvement Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {aiSuggestions.map((suggestion, index) => (
              <div key={index} className="flex items-start pb-3 border-b border-slate-100 last:border-0 last:pb-0">
                <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center mr-3 flex-shrink-0">
                  <BrainCircuit className="h-4 w-4 text-emerald-600" />
                </div>
                <p className="text-sm">{suggestion}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LcaDashboard;
