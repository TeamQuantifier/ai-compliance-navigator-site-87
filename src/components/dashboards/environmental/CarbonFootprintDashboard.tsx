
import React from 'react';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, PieChart, Pie, Cell, Legend, LineChart, Line } from 'recharts';
import { BarChart3, ChartLine, Activity, Cloud, BrainCircuit, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const CarbonFootprintDashboard = () => {
  // Sample data for Carbon Footprint dashboard
  const emissionsByScope = [
    { name: 'Scope 1', value: 25 },
    { name: 'Scope 2', value: 40 },
    { name: 'Scope 3', value: 35 },
  ];
  
  const COLORS = ['#22c55e', '#3b82f6', '#8b5cf6'];
  
  const monthlyEmissions = [
    { month: 'Jan', emissions: 120 },
    { month: 'Feb', emissions: 132 },
    { month: 'Mar', emissions: 125 },
    { month: 'Apr', emissions: 118 },
    { month: 'May', emissions: 110 },
    { month: 'Jun', emissions: 105 },
  ];
  
  const emissionsByCategoryData = [
    { category: 'Energy', value: 35 },
    { category: 'Transportation', value: 28 },
    { category: 'Procurement', value: 18 },
    { category: 'Business Travel', value: 12 },
    { category: 'Other', value: 7 },
  ];
  
  const emission_trend_data = [
    { year: '2020', co2e: 1200 },
    { year: '2021', co2e: 1150 },
    { year: '2022', co2e: 1050 },
    { year: '2023', co2e: 980 },
    { year: '2024', co2e: 900, estimated: true },
    { year: '2025', co2e: 840, estimated: true },
  ];
  
  const RISK_COLORS = ['#ef4444', '#f97316', '#eab308', '#22c55e'];
  
  const emissionHotspots = [
    { source: 'Manufacturing Plant A', emissions: 42, risk: 'High' },
    { source: 'Vehicle Fleet', emissions: 28, risk: 'Medium' },
    { source: 'Office Buildings', emissions: 15, risk: 'Low' },
    { source: 'Business Travel', emissions: 12, risk: 'Medium' },
  ];
  
  const aiInsights = [
    "Your Scope 3 emissions have increased 5% this quarter, primarily due to supplier changes",
    "Recommendation: Switch to renewable energy in office locations X, Y to reduce Scope 2 by 12%",
    "There's an anomaly in energy consumption data from your eastern facilities",
    "Carbon offset verification completed for Q1 2024"
  ];

  const getRiskColor = (risk) => {
    switch (risk) {
      case 'Critical': return 'bg-red-100 text-red-800';
      case 'High': return 'bg-orange-100 text-orange-800';
      case 'Medium': return 'bg-amber-100 text-amber-800';
      case 'Low': return 'bg-green-100 text-green-800';
      default: return 'bg-slate-100 text-slate-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Total Carbon Footprint Card */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <Cloud className="h-4 w-4 mr-2 text-teal-600" />
              Total Carbon Footprint
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-3">
            <div className="text-3xl font-bold">980 <span className="text-sm font-normal text-slate-500">tCO₂e</span></div>
            <div className="flex items-center mt-2 text-xs">
              <Badge className="bg-green-100 text-green-800 mr-2">-7.2%</Badge>
              <span className="text-slate-500">vs previous year</span>
            </div>
            <div className="h-32 mt-3">
              <ChartContainer
                config={{
                  emissions: { 
                    theme: { 
                      light: '#0d9488',
                      dark: '#0d9488'
                    } 
                  }
                }}
              >
                <LineChart data={monthlyEmissions} margin={{ top: 5, right: 5, bottom: 5, left: 0 }}>
                  <XAxis dataKey="month" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
                  <YAxis hide />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line type="monotone" dataKey="emissions" name="emissions" stroke="#0d9488" strokeWidth={2} dot={{ r: 2 }} />
                </LineChart>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>

        {/* Emissions by Scope */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <BarChart3 className="h-4 w-4 mr-2 text-teal-600" />
              Emissions by Scope
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={emissionsByScope}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={70}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {emissionsByScope.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Legend 
                    layout="vertical" 
                    verticalAlign="middle" 
                    align="right"
                    wrapperStyle={{ fontSize: '10px' }}
                  />
                  <ChartTooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Emissions by Category */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <ChartLine className="h-4 w-4 mr-2 text-teal-600" />
              Emissions by Category
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-48">
              <ChartContainer
                config={{
                  value: { 
                    theme: { 
                      light: '#0d9488',
                      dark: '#0d9488'
                    } 
                  }
                }}
              >
                <BarChart data={emissionsByCategoryData} layout="vertical" margin={{ top: 5, right: 30, bottom: 5, left: 80 }}>
                  <XAxis type="number" hide />
                  <YAxis type="category" dataKey="category" tick={{ fontSize: 10 }} width={80} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="value" name="value" radius={[0, 4, 4, 0]} barSize={12} />
                </BarChart>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Emission Reduction Trend */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <Activity className="h-4 w-4 mr-2 text-teal-600" />
              Emission Reduction Trend
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-60">
              <ChartContainer
                config={{
                  co2e: { 
                    theme: { 
                      light: '#0d9488',
                      dark: '#0d9488'
                    },
                    label: 'CO₂e (tonnes)'
                  }
                }}
              >
                <LineChart data={emission_trend_data} margin={{ top: 10, right: 10, bottom: 20, left: 10 }}>
                  <XAxis dataKey="year" />
                  <YAxis domain={[800, 1300]} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line 
                    type="monotone" 
                    dataKey="co2e" 
                    name="co2e" 
                    stroke="#0d9488" 
                    strokeWidth={2} 
                    activeDot={{ r: 6 }}
                    strokeDasharray={d => d.estimated ? "5 5" : ""}
                  />
                </LineChart>
              </ChartContainer>
            </div>
            <div className="flex items-center justify-center mt-2 text-xs">
              <div className="flex items-center mr-4">
                <div className="h-1 w-8 bg-teal-600 mr-2"></div>
                <span>Actual</span>
              </div>
              <div className="flex items-center">
                <div className="h-1 w-8 bg-teal-600 mr-2" style={{backgroundImage: "linear-gradient(to right, #0d9488 50%, transparent 50%)", backgroundSize: "10px 1px"}}></div>
                <span>Projected</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Emission Hotspots */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <AlertTriangle className="h-4 w-4 mr-2 text-teal-600" />
              Emission Hotspots
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="text-left py-2 font-medium text-slate-500">Source</th>
                    <th className="text-right py-2 font-medium text-slate-500">Emissions (tCO₂e)</th>
                    <th className="text-right py-2 font-medium text-slate-500">Risk Level</th>
                  </tr>
                </thead>
                <tbody>
                  {emissionHotspots.map((item, index) => (
                    <tr key={index} className="border-b border-slate-100 last:border-0">
                      <td className="py-3">{item.source}</td>
                      <td className="py-3 text-right">{item.emissions}</td>
                      <td className="py-3 text-right">
                        <Badge className={getRiskColor(item.risk)}>
                          {item.risk}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* AI Insights */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium flex items-center">
            <BrainCircuit className="h-4 w-4 mr-2 text-teal-600" />
            AI Carbon Intelligence Insights
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {aiInsights.map((insight, index) => (
              <div key={index} className="flex items-start pb-3 border-b border-slate-100 last:border-0 last:pb-0">
                <div className="w-8 h-8 rounded-full bg-teal-100 flex items-center justify-center mr-3 flex-shrink-0">
                  <BrainCircuit className="h-4 w-4 text-teal-600" />
                </div>
                <p className="text-sm">{insight}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CarbonFootprintDashboard;
