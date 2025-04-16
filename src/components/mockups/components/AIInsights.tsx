
import React from 'react';
import { BrainCircuit, AlertTriangle } from 'lucide-react';

const AIInsights = () => {
  const insights = [
    {
      title: 'Risk Assessment Improvement',
      description: 'AI identified 3 areas to improve ISO 27001 risk assessment.',
      type: 'info',
      icon: BrainCircuit,
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-100'
    },
    {
      title: 'Documentation Gap',
      description: '5 ISO 9001 documents need updating - automation plan suggested.',
      type: 'warning',
      icon: AlertTriangle,
      bgColor: 'bg-amber-50',
      borderColor: 'border-amber-100'
    }
  ];

  return (
    <div className="bg-white rounded-lg border border-slate-200 p-4">
      <h3 className="text-sm font-medium flex items-center gap-2 mb-3">
        <BrainCircuit className="h-4 w-4 text-[#7E69AB]" /> AI Insights
      </h3>
      
      <div className="space-y-3">
        {insights.map((insight) => (
          <InsightCard key={insight.title} {...insight} />
        ))}
      </div>
    </div>
  );
};

const InsightCard = ({ title, description, type, icon: Icon, bgColor, borderColor }) => (
  <div className={`${bgColor} ${borderColor} p-3 rounded-lg border`}>
    <div className="flex items-start gap-2 mb-2">
      <Icon className={`h-4 w-4 ${type === 'info' ? 'text-blue-600' : 'text-amber-600'} mt-0.5`} />
      <div>
        <p className={`text-xs font-medium ${type === 'info' ? 'text-blue-800' : 'text-amber-800'}`}>{title}</p>
        <p className={`text-[10px] ${type === 'info' ? 'text-blue-600' : 'text-amber-600'}`}>{description}</p>
      </div>
    </div>
    <div className="flex items-center gap-2">
      <button className={`text-[10px] ${type === 'info' ? 'bg-blue-600' : 'bg-amber-600'} text-white px-2 py-0.5 rounded`}>
        View Details
      </button>
      <button className={`text-[10px] ${type === 'info' ? 'text-blue-700' : 'text-amber-700'}`}>Dismiss</button>
    </div>
  </div>
);

export default AIInsights;
