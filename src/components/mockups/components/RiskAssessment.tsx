
import React from 'react';
import { Gauge, AlertCircle, AlertTriangle, Info } from 'lucide-react';

const RiskAssessment = () => {
  const riskCategories = [
    { name: 'Critical Risks', count: 2, icon: AlertCircle, color: 'text-red-600', bg: 'bg-red-100' },
    { name: 'High Risks', count: 5, icon: AlertTriangle, color: 'text-amber-600', bg: 'bg-amber-100' },
    { name: 'Medium Risks', count: 14, icon: Info, color: 'text-blue-600', bg: 'bg-blue-100' }
  ];

  return (
    <div className="bg-white rounded-lg border border-slate-200 p-4">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-sm font-medium flex items-center gap-2">
          <Gauge className="h-4 w-4 text-[#7E69AB]" /> Risk Assessment
        </h3>
        <span className="text-[10px] px-2 py-0.5 bg-green-100 text-green-800 rounded-full">Updated 5m ago</span>
      </div>
      
      <div className="space-y-2">
        {riskCategories.map((category) => (
          <RiskItem key={category.name} {...category} />
        ))}
      </div>
    </div>
  );
};

const RiskItem = ({ name, count, icon: Icon, color, bg }) => (
  <div className="bg-slate-50 p-2 rounded-lg flex justify-between items-center">
    <div className="flex items-center gap-2">
      <div className={`${bg} p-1 rounded-full`}>
        <Icon className={`h-3 w-3 ${color}`} />
      </div>
      <span className="text-xs font-medium">{name}</span>
    </div>
    <span className="text-sm font-semibold">{count}</span>
  </div>
);

export default RiskAssessment;
