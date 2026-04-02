import { CheckCircle, Clock, AlertCircle, User, Calendar } from 'lucide-react';

const tasks = [
  { title: 'ISO 27001 — Asset Inventory', assignee: 'MK', due: 'Mar 15', status: 'done', framework: 'ISO 27001' },
  { title: 'NIS2 — Incident Response Plan', assignee: 'AW', due: 'Mar 20', status: 'progress', framework: 'NIS2' },
  { title: 'GDPR — DPIA Update', assignee: 'JD', due: 'Mar 28', status: 'progress', framework: 'GDPR' },
  { title: 'DORA — ICT Risk Register', assignee: 'PK', due: 'Apr 02', status: 'todo', framework: 'DORA' },
  { title: 'SOC 2 — Access Review', assignee: 'MK', due: 'Apr 05', status: 'todo', framework: 'SOC 2' },
];

const statusConfig = {
  done: { icon: CheckCircle, color: 'text-green-500', bg: 'bg-green-50', label: 'Done' },
  progress: { icon: Clock, color: 'text-amber-500', bg: 'bg-amber-50', label: 'In Progress' },
  todo: { icon: AlertCircle, color: 'text-slate-400', bg: 'bg-slate-50', label: 'To Do' },
};

const TaskBoardMockup = () => {
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-lg overflow-hidden">
      {/* Header */}
      <div className="bg-slate-50 border-b border-slate-200 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-red-400" />
          <div className="h-3 w-3 rounded-full bg-amber-400" />
          <div className="h-3 w-3 rounded-full bg-green-400" />
        </div>
        <span className="text-xs font-medium text-slate-500">Task Management</span>
        <div className="flex gap-1">
          <div className="px-2 py-0.5 bg-[#9b87f5]/10 text-[#7E69AB] text-[10px] font-medium rounded">Board</div>
          <div className="px-2 py-0.5 text-slate-400 text-[10px] font-medium rounded">List</div>
        </div>
      </div>

      {/* Stats bar */}
      <div className="grid grid-cols-3 gap-2 p-3 border-b border-slate-100">
        <div className="bg-green-50 rounded-lg p-2 text-center">
          <div className="text-lg font-bold text-green-600">12</div>
          <div className="text-[10px] text-green-600/70">Completed</div>
        </div>
        <div className="bg-amber-50 rounded-lg p-2 text-center">
          <div className="text-lg font-bold text-amber-600">8</div>
          <div className="text-[10px] text-amber-600/70">In Progress</div>
        </div>
        <div className="bg-slate-50 rounded-lg p-2 text-center">
          <div className="text-lg font-bold text-slate-600">5</div>
          <div className="text-[10px] text-slate-600/70">To Do</div>
        </div>
      </div>

      {/* Task list */}
      <div className="divide-y divide-slate-100">
        {tasks.map((task, i) => {
          const cfg = statusConfig[task.status as keyof typeof statusConfig];
          const Icon = cfg.icon;
          return (
            <div key={i} className="px-4 py-3 flex items-center gap-3 hover:bg-slate-50/50 transition-colors">
              <Icon className={`h-4 w-4 flex-shrink-0 ${cfg.color}`} />
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-slate-800 truncate">{task.title}</div>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-[10px] px-1.5 py-0.5 bg-[#9b87f5]/10 text-[#7E69AB] rounded font-medium">{task.framework}</span>
                </div>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <div className="flex items-center gap-1 text-[10px] text-slate-400">
                  <Calendar className="h-3 w-3" />
                  {task.due}
                </div>
                <div className="h-6 w-6 rounded-full bg-[#9b87f5]/20 flex items-center justify-center text-[10px] font-bold text-[#7E69AB]">
                  {task.assignee}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TaskBoardMockup;
