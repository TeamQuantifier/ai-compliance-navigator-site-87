
import React from 'react';
import { BarChart4, PieChart } from 'lucide-react';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, PieChart as RePieChart, Pie, Cell, Legend } from 'recharts';

const KeyCharts = () => {
  const frameworkData = [
    { name: 'ISO 27001', value: 78 },
    { name: 'ISO 9001', value: 65 },
    { name: 'DORA', value: 82 }
  ];

  const riskData = [
    { name: 'Critical', value: 2 },
    { name: 'High', value: 5 },
    { name: 'Medium', value: 8 },
    { name: 'Low', value: 14 }
  ];

  const RISK_COLORS = ['#ef4444', '#f97316', '#3b82f6', '#22c55e'];
  
  const complianceData = [
    { month: 'Jan', value: 65 },
    { month: 'Feb', value: 70 },
    { month: 'Mar', value: 75 },
    { month: 'Apr', value: 72 },
    { month: 'May', value: 80 },
    { month: 'Jun', value: 87 }
  ];

  return (
    <div className="grid grid-cols-2 gap-4">
      {/* Compliance Trend Chart */}
      <div className="bg-white rounded-lg border border-slate-200 p-3">
        <div className="flex items-center gap-2 mb-2">
          <BarChart4 className="h-4 w-4 text-[#7E69AB]" />
          <h3 className="text-xs font-medium">Compliance Trend</h3>
        </div>
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
            <BarChart data={complianceData} margin={{ top: 5, right: 5, bottom: 5, left: 0 }}>
              <XAxis dataKey="month" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis hide domain={[0, 100]} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="value" name="compliance" radius={[4, 4, 0, 0]} barSize={12} />
            </BarChart>
          </ChartContainer>
        </div>
      </div>

      {/* Risk Distribution Chart */}
      <div className="bg-white rounded-lg border border-slate-200 p-3">
        <div className="flex items-center gap-2 mb-2">
          <PieChart className="h-4 w-4 text-[#7E69AB]" />
          <h3 className="text-xs font-medium">Risk Distribution</h3>
        </div>
        <div className="h-32">
          <ResponsiveContainer width="100%" height="100%">
            <RePieChart>
              <Pie
                data={riskData}
                cx="50%"
                cy="50%"
                innerRadius={25}
                outerRadius={45}
                paddingAngle={2}
                dataKey="value"
              >
                {riskData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={RISK_COLORS[index % RISK_COLORS.length]} />
                ))}
              </Pie>
              <Legend 
                layout="horizontal" 
                verticalAlign="bottom" 
                align="center"
                wrapperStyle={{ fontSize: '10px' }}
              />
            </RePieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default KeyCharts;
