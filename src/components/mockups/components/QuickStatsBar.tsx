
import React from 'react';
import { CheckCircle, AlertCircle, Calendar, BrainCircuit } from 'lucide-react';

const QuickStatsBar = () => {
  return (
    <div className="bg-white rounded-lg border border-slate-200 p-3 flex justify-between items-center">
      <div className="flex items-center gap-3">
        <StatItem 
          icon={<CheckCircle className="h-4 w-4 text-green-600" />} 
          label="Compliance" 
          value="87%" 
          bgColor="bg-green-100"
        />
        <StatItem 
          icon={<AlertCircle className="h-4 w-4 text-amber-600" />} 
          label="Open Issues" 
          value="12" 
          bgColor="bg-amber-100"
        />
        <StatItem 
          icon={<Calendar className="h-4 w-4 text-blue-600" />} 
          label="Next Audit" 
          value="15d" 
          bgColor="bg-blue-100"
        />
      </div>
      <div className="flex items-center gap-2 text-xs text-[#7E69AB]">
        <BrainCircuit className="h-4 w-4" />
        <span>AI Assistant</span>
      </div>
    </div>
  );
};

const StatItem = ({ icon, label, value, bgColor }) => (
  <div className="flex items-center gap-2">
    <div className={`h-6 w-6 rounded-full ${bgColor} flex items-center justify-center`}>
      {icon}
    </div>
    <div>
      <div className="text-[10px] text-slate-500">{label}</div>
      <div className="text-xs font-semibold">{value}</div>
    </div>
  </div>
);

export default QuickStatsBar;
