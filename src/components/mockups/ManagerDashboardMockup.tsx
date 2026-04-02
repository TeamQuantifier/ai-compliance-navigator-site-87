import { BarChart3, CheckCircle, Clock, Users, TrendingUp, AlertTriangle } from 'lucide-react';

const teams = [
  { name: 'IT Security', progress: 87, tasks: 24, overdue: 1 },
  { name: 'Legal & Privacy', progress: 72, tasks: 18, overdue: 3 },
  { name: 'HR & Operations', progress: 65, tasks: 12, overdue: 2 },
  { name: 'Finance', progress: 91, tasks: 8, overdue: 0 },
];

const ManagerDashboardMockup = () => {
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-lg overflow-hidden">
      <div className="bg-slate-50 border-b border-slate-200 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-red-400" />
          <div className="h-3 w-3 rounded-full bg-amber-400" />
          <div className="h-3 w-3 rounded-full bg-green-400" />
        </div>
        <span className="text-xs font-medium text-slate-500">Manager Overview</span>
        <div className="flex items-center gap-1">
          <Users className="h-3 w-3 text-[#7E69AB]" />
          <span className="text-[10px] text-[#7E69AB] font-medium">4 Teams</span>
        </div>
      </div>

      {/* KPI bar */}
      <div className="grid grid-cols-4 gap-2 p-3 border-b border-slate-100">
        <div className="bg-[#9b87f5]/5 rounded-lg p-2 text-center">
          <div className="text-lg font-bold text-[#7E69AB]">78%</div>
          <div className="text-[10px] text-slate-500">Overall</div>
        </div>
        <div className="bg-green-50 rounded-lg p-2 text-center">
          <div className="text-lg font-bold text-green-600">52</div>
          <div className="text-[10px] text-green-600/70">Done</div>
        </div>
        <div className="bg-amber-50 rounded-lg p-2 text-center">
          <div className="text-lg font-bold text-amber-600">10</div>
          <div className="text-[10px] text-amber-600/70">In Progress</div>
        </div>
        <div className="bg-red-50 rounded-lg p-2 text-center">
          <div className="text-lg font-bold text-red-600">6</div>
          <div className="text-[10px] text-red-600/70">Overdue</div>
        </div>
      </div>

      {/* Team list */}
      <div className="divide-y divide-slate-100">
        {teams.map((team, i) => (
          <div key={i} className="px-4 py-3 flex items-center gap-3 hover:bg-slate-50/50 transition-colors">
            <div className="h-8 w-8 rounded-full bg-[#9b87f5]/10 flex items-center justify-center">
              <Users className="h-4 w-4 text-[#7E69AB]" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-slate-800">{team.name}</div>
              <div className="flex items-center gap-2 mt-1">
                <div className="flex-1 bg-slate-100 rounded-full h-1.5">
                  <div className="bg-[#9b87f5] rounded-full h-1.5 transition-all" style={{ width: `${team.progress}%` }} />
                </div>
                <span className="text-[10px] font-medium text-slate-600">{team.progress}%</span>
              </div>
            </div>
            <div className="flex items-center gap-3 flex-shrink-0">
              <div className="text-center">
                <div className="text-xs font-bold text-slate-700">{team.tasks}</div>
                <div className="text-[9px] text-slate-400">tasks</div>
              </div>
              {team.overdue > 0 && (
                <span className="text-[10px] px-1.5 py-0.5 bg-red-50 text-red-600 rounded font-medium flex items-center gap-0.5">
                  <AlertTriangle className="h-3 w-3" />{team.overdue}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManagerDashboardMockup;
