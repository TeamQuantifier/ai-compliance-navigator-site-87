import React from 'react';
import { BarChart3, TrendingUp, AlertTriangle, Shield, Activity, Target } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
const NIS2AnalyticsMockup = () => {
  const complianceData = [{
    month: 'Jan',
    score: 68
  }, {
    month: 'Feb',
    score: 72
  }, {
    month: 'Mar',
    score: 78
  }, {
    month: 'Apr',
    score: 82
  }, {
    month: 'May',
    score: 87
  }, {
    month: 'Jun',
    score: 91
  }];
  const riskData = [{
    category: 'High',
    count: 3,
    color: '#ef4444'
  }, {
    category: 'Medium',
    count: 12,
    color: '#f59e0b'
  }, {
    category: 'Low',
    count: 25,
    color: '#10b981'
  }];
  const incidentData = [{
    week: 'W1',
    incidents: 2
  }, {
    week: 'W2',
    incidents: 1
  }, {
    week: 'W3',
    incidents: 4
  }, {
    week: 'W4',
    incidents: 1
  }];
  return (
    <div className="bg-card rounded-lg border p-6">
      <div className="flex items-center gap-3 mb-6">
        <BarChart3 className="h-6 w-6 text-primary" />
        <h3 className="text-xl font-semibold">NIS2 Compliance Analytics</h3>
      </div>
      
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Compliance Score Trend */}
        <div className="lg:col-span-2">
          <div className="p-4 border rounded-lg">
            <h4 className="font-medium mb-3 flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-green-600" />
              Compliance Score Trend
            </h4>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={complianceData}>
                  <XAxis dataKey="month" axisLine={false} tickLine={false} />
                  <YAxis axisLine={false} tickLine={false} />
                  <Line 
                    type="monotone" 
                    dataKey="score" 
                    stroke="hsl(var(--primary))" 
                    strokeWidth={3}
                    dot={{ fill: "hsl(var(--primary))", strokeWidth: 2, r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              Current score: <span className="font-semibold text-green-600">91%</span> (+23% improvement)
            </p>
          </div>
        </div>

        {/* Risk Distribution */}
        <div className="p-4 border rounded-lg">
          <h4 className="font-medium mb-3 flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-orange-600" />
            Risk Distribution
          </h4>
          <div className="h-32">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={riskData}
                  cx="50%"
                  cy="50%"
                  innerRadius={20}
                  outerRadius={50}
                  dataKey="count"
                >
                  {riskData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-1 mt-2">
            {riskData.map((risk, index) => (
              <div key={index} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: risk.color }}></div>
                  <span>{risk.category}</span>
                </div>
                <span className="font-medium">{risk.count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Incidents */}
        <div className="lg:col-span-2 p-4 border rounded-lg">
          <h4 className="font-medium mb-3 flex items-center gap-2">
            <Activity className="h-4 w-4 text-blue-600" />
            Security Incidents (Monthly)
          </h4>
          <div className="h-32">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={incidentData}>
                <XAxis dataKey="week" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Bar dataKey="incidents" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* AI Recommendations */}
        <div className="p-4 border rounded-lg bg-primary/5 border-primary/20">
          <h4 className="font-medium mb-3 flex items-center gap-2">
            <Target className="h-4 w-4 text-primary" />
            AI Recommendations
          </h4>
          <div className="space-y-2 text-sm">
            <div className="flex items-start gap-2">
              <Shield className="h-3 w-3 text-green-600 mt-1 flex-shrink-0" />
              <span>Deploy additional endpoint monitoring for critical assets</span>
            </div>
            <div className="flex items-start gap-2">
              <AlertTriangle className="h-3 w-3 text-orange-600 mt-1 flex-shrink-0" />
              <span>Review access policies for elevated privilege accounts</span>
            </div>
            <div className="flex items-start gap-2">
              <TrendingUp className="h-3 w-3 text-blue-600 mt-1 flex-shrink-0" />
              <span>Optimize incident response workflow automation</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default NIS2AnalyticsMockup;