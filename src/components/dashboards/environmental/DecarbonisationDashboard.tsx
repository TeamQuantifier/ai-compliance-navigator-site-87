
import React from 'react';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, LineChart, Line, Area, AreaChart, ComposedChart, Legend } from 'recharts';
import { BarChart3, Target, BrainCircuit, Activity, ChartLine, CheckCircle2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

const DecarbonisationDashboard = () => {
  // Sample data for Decarbonisation dashboard
  const emissionReductionGoals = [
    { name: '2025 Target', progress: 65, goal: 25 },
    { name: '2030 Target', progress: 30, goal: 55 },
    { name: '2040 Target', progress: 10, goal: 85 },
    { name: '2050 Target', progress: 5, goal: 100 },
  ];
  
  const carbonProjections = [
    { year: '2020', actual: 1200, target: 1200, businessAsUsual: 1200 },
    { year: '2025', actual: 980, target: 900, businessAsUsual: 1250 },
    { year: '2030', projected: true, target: 600, businessAsUsual: 1300 },
    { year: '2040', projected: true, target: 240, businessAsUsual: 1350 },
    { year: '2050', projected: true, target: 0, businessAsUsual: 1400 },
  ];
  
  const reductionByInitiative = [
    { name: 'Renewable Energy', value: 42 },
    { name: 'Efficiency Improvements', value: 28 },
    { name: 'Supply Chain', value: 18 },
    { name: 'Fleet Electrification', value: 12 },
  ];
  
  const carbonIntensityData = [
    { year: 2020, value: 12.5 },
    { year: 2021, value: 11.2 },
    { year: 2022, value: 9.8 },
    { year: 2023, value: 8.5 },
    { year: 2024, value: 7.6 },
  ];
  
  const aiRecommendations = [
    {
      title: "Increase Renewable Energy Procurement",
      impact: "Reduce emissions by 15% by 2026",
      roi: "High",
      ease: "Medium"
    },
    {
      title: "Implement Smart Building Management",
      impact: "Reduce emissions by 8% by 2025",
      roi: "Medium",
      ease: "High"
    },
    {
      title: "Electric Fleet Transition",
      impact: "Reduce emissions by 12% by 2027",
      roi: "Medium",
      ease: "Low"
    },
    {
      title: "Supply Chain Optimization",
      impact: "Reduce Scope 3 emissions by 10% by 2026",
      roi: "High",
      ease: "Low"
    }
  ];

  const getROIColor = (roi) => {
    switch (roi) {
      case 'High': return 'bg-green-100 text-green-800';
      case 'Medium': return 'bg-blue-100 text-blue-800';
      case 'Low': return 'bg-amber-100 text-amber-800';
      default: return 'bg-slate-100 text-slate-800';
    }
  };
  
  const getEaseColor = (ease) => {
    switch (ease) {
      case 'High': return 'bg-green-100 text-green-800';
      case 'Medium': return 'bg-blue-100 text-blue-800';
      case 'Low': return 'bg-amber-100 text-amber-800';
      default: return 'bg-slate-100 text-slate-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Progress Towards Targets */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium flex items-center">
            <Target className="h-4 w-4 mr-2 text-green-600" />
            Science-Based Targets Progress
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {emissionReductionGoals.map((goal) => (
              <div key={goal.name} className="space-y-1">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-medium">{goal.name} ({goal.goal}% reduction)</span>
                  <span className="text-xs font-semibold">{goal.progress}% complete</span>
                </div>
                <Progress value={goal.progress} className="h-2" />
                <div className="flex justify-between text-[10px] text-slate-500">
                  <span>Current: {goal.progress}%</span>
                  <span>Target: {goal.goal}%</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Carbon Projections Chart */}
        <Card className="md:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <ChartLine className="h-4 w-4 mr-2 text-green-600" />
              Emission Reduction Pathway
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-72">
              <ChartContainer
                config={{
                  actual: { 
                    theme: { light: '#16a34a', dark: '#16a34a' },
                    label: 'Actual Emissions'
                  },
                  target: { 
                    theme: { light: '#2563eb', dark: '#2563eb' },
                    label: 'Target Pathway'
                  },
                  businessAsUsual: { 
                    theme: { light: '#dc2626', dark: '#dc2626' },
                    label: 'Business as Usual'
                  }
                }}
              >
                <ComposedChart data={carbonProjections} margin={{ top: 10, right: 10, bottom: 20, left: 10 }}>
                  <XAxis dataKey="year" />
                  <YAxis domain={[0, 1500]} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Legend />
                  <Area 
                    type="monotone" 
                    dataKey="businessAsUsual" 
                    name="businessAsUsual"
                    fill="#fee2e2" 
                    stroke="#dc2626" 
                    fillOpacity={0.3}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="actual" 
                    name="actual"
                    stroke="#16a34a" 
                    strokeWidth={2} 
                    dot={{ r: 6 }} 
                  />
                  <Line 
                    type="monotone" 
                    dataKey="target" 
                    name="target"
                    stroke="#2563eb" 
                    strokeWidth={2} 
                    strokeDasharray="5 5"
                    dot={{ r: 6 }}
                  />
                </ComposedChart>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>

        {/* Emission Reduction by Initiative */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <BarChart3 className="h-4 w-4 mr-2 text-green-600" />
              Emission Reduction by Initiative
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-56">
              <ChartContainer
                config={{
                  value: { 
                    theme: { 
                      light: '#16a34a',
                      dark: '#16a34a'
                    } 
                  }
                }}
              >
                <BarChart data={reductionByInitiative} layout="vertical" margin={{ top: 5, right: 30, bottom: 5, left: 80 }}>
                  <XAxis type="number" />
                  <YAxis type="category" dataKey="name" tick={{ fontSize: 10 }} width={80} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="value" name="value" radius={[0, 4, 4, 0]} barSize={12} />
                </BarChart>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>

        {/* Carbon Intensity Trend */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <Activity className="h-4 w-4 mr-2 text-green-600" />
              Carbon Intensity (tCO₂e/$M Revenue)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-56">
              <ChartContainer
                config={{
                  value: { 
                    theme: { 
                      light: '#16a34a',
                      dark: '#16a34a'
                    } 
                  }
                }}
              >
                <LineChart data={carbonIntensityData} margin={{ top: 20, right: 30, bottom: 5, left: 30 }}>
                  <XAxis dataKey="year" />
                  <YAxis domain={[0, 15]} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line 
                    type="monotone" 
                    dataKey="value" 
                    name="value" 
                    stroke="#16a34a" 
                    strokeWidth={2}
                    dot={{ r: 4 }}
                  />
                </LineChart>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* AI Recommendations */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium flex items-center">
            <BrainCircuit className="h-4 w-4 mr-2 text-green-600" />
            AI-Generated Decarbonisation Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {aiRecommendations.map((rec, index) => (
              <div key={index} className="flex items-start pb-4 border-b border-slate-100 last:border-0 last:pb-0">
                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mr-3 flex-shrink-0">
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-medium mb-1">{rec.title}</p>
                  <p className="text-xs text-slate-600 mb-2">{rec.impact}</p>
                  <div className="flex gap-2">
                    <Badge className={getROIColor(rec.roi)}>
                      ROI: {rec.roi}
                    </Badge>
                    <Badge className={getEaseColor(rec.ease)}>
                      Ease: {rec.ease}
                    </Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DecarbonisationDashboard;
