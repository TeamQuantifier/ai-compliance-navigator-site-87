import React from 'react';
import { BarChart3, TrendingUp, AlertTriangle, Shield, Activity, Target } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

const NIS2AnalyticsMockup = () => {
  const complianceData = [
    { month: 'Jan', score: 68 },
    { month: 'Feb', score: 72 },
    { month: 'Mar', score: 78 },
    { month: 'Apr', score: 82 },
    { month: 'May', score: 87 },
    { month: 'Jun', score: 91 },
  ];

  const riskData = [
    { category: 'High', count: 3, color: '#ef4444' },
    { category: 'Medium', count: 12, color: '#f59e0b' },
    { category: 'Low', count: 25, color: '#10b981' },
  ];

  const incidentData = [
    { week: 'W1', incidents: 2 },
    { week: 'W2', incidents: 1 },
    { week: 'W3', incidents: 4 },
    { week: 'W4', incidents: 1 },
  ];

  return (
    <div className="bg-white rounded-lg border border-slate-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
          <BarChart3 className="h-5 w-5 text-[#7E69AB]" />
          NIS2 AI Analytics Dashboard
        </h3>
        <div className="flex items-center gap-2 text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full">
          <Activity className="h-3 w-3" />
          Real-time Monitoring Active
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {/* Key Metrics */}
        <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <Shield className="h-5 w-5 text-blue-600" />
            <span className="text-xs text-blue-600 font-medium">+5%</span>
          </div>
          <div className="text-2xl font-bold text-blue-900">91%</div>
          <div className="text-xs text-blue-700">NIS2 Compliance Score</div>
        </div>

        <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <Target className="h-5 w-5 text-green-600" />
            <span className="text-xs text-green-600 font-medium">-12%</span>
          </div>
          <div className="text-2xl font-bold text-green-900">40</div>
          <div className="text-xs text-green-700">Active Risks</div>
        </div>

        <div className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <AlertTriangle className="h-5 w-5 text-purple-600" />
            <span className="text-xs text-purple-600 font-medium">-25%</span>
          </div>
          <div className="text-2xl font-bold text-purple-900">8</div>
          <div className="text-xs text-purple-700">Incidents This Month</div>
        </div>

        <div className="bg-gradient-to-r from-orange-50 to-orange-100 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <TrendingUp className="h-5 w-5 text-orange-600" />
            <span className="text-xs text-orange-600 font-medium">+18%</span>
          </div>
          <div className="text-2xl font-bold text-orange-900">96%</div>
          <div className="text-xs text-orange-700">Policy Automation</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Compliance Trend */}
        <div className="lg:col-span-2">
          <h4 className="text-sm font-medium text-slate-700 mb-3">NIS2 Compliance Trend</h4>
          <div className="h-40 bg-slate-50 rounded-lg p-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={complianceData}>
                <XAxis dataKey="month" tick={{ fontSize: 10 }} />
                <YAxis tick={{ fontSize: 10 }} />
                <Line 
                  type="monotone" 
                  dataKey="score" 
                  stroke="#7E69AB" 
                  strokeWidth={2}
                  dot={{ fill: '#7E69AB', r: 3 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Risk Distribution */}
        <div>
          <h4 className="text-sm font-medium text-slate-700 mb-3">Risk Distribution</h4>
          <div className="h-40 bg-slate-50 rounded-lg p-4">
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
          <div className="grid grid-cols-3 gap-2 mt-2">
            {riskData.map((item, index) => (
              <div key={index} className="text-center">
                <div className="text-xs font-medium" style={{ color: item.color }}>
                  {item.count}
                </div>
                <div className="text-[10px] text-slate-500">{item.category}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Incident Timeline */}
      <div className="mt-6">
        <h4 className="text-sm font-medium text-slate-700 mb-3">Weekly Incident Reports</h4>
        <div className="h-24 bg-slate-50 rounded-lg p-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={incidentData}>
              <XAxis dataKey="week" tick={{ fontSize: 10 }} />
              <YAxis tick={{ fontSize: 10 }} />
              <Bar dataKey="incidents" fill="#7E69AB" radius={[2, 2, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* AI Insights Footer */}
      <div className="mt-6 pt-4 border-t border-slate-200">
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-3">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
              <Shield className="h-4 w-4 text-white" />
            </div>
            <div className="flex-1">
              <div className="text-sm font-medium text-slate-800 mb-1">AI Recommendation</div>
              <div className="text-xs text-slate-600">
                Based on current trends, consider implementing additional access controls for high-risk assets. 
                Compliance score projected to reach 95% within 2 weeks with recommended actions.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NIS2AnalyticsMockup;