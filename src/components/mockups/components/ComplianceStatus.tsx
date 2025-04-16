
import React from 'react';
import { BarChart4 } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

const ComplianceStatus = () => {
  const frameworks = [
    { name: 'ISO 27001', progress: 94, tasks: 4, trend: 'up' },
    { name: 'ISO 9001', progress: 78, tasks: 12, trend: 'down' },
    { name: 'DORA', progress: 82, tasks: 9, trend: 'up' }
  ];

  return (
    <div className="bg-white rounded-lg border border-slate-200 p-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-sm font-medium flex items-center gap-2">
          <BarChart4 className="h-4 w-4 text-[#7E69AB]" /> Compliance Status
        </h3>
      </div>
      
      <div className="space-y-3">
        {frameworks.map((framework) => (
          <FrameworkProgress key={framework.name} {...framework} />
        ))}
      </div>
    </div>
  );
};

const FrameworkProgress = ({ name, progress, tasks, trend }) => (
  <div className="bg-slate-50 p-3 rounded-lg">
    <div className="flex justify-between items-center mb-2">
      <h4 className="text-xs font-medium text-slate-700">{name}</h4>
      <span className={`text-[10px] ${progress > 80 ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'} rounded-full px-2 py-0.5`}>
        {progress}%
      </span>
    </div>
    <Progress value={progress} className="h-1.5 mb-2" />
    <div className="flex justify-between items-center">
      <p className="text-[10px] text-slate-500">{tasks} tasks remaining</p>
      <span className={`text-[10px] ${trend === 'up' ? 'text-green-600' : 'text-amber-600'}`}>
        {trend === 'up' ? '+5%' : '-2%'}
      </span>
    </div>
  </div>
);

export default ComplianceStatus;
