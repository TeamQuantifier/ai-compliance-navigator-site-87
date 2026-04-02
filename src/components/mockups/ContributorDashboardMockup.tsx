import { CheckCircle, Clock, FileText, Upload, AlertCircle } from 'lucide-react';

const myTasks = [
  { title: 'Complete Asset Inventory Form', framework: 'ISO 27001', due: 'Mar 18', status: 'progress', type: 'form' },
  { title: 'Upload Access Control Evidence', framework: 'SOC 2', due: 'Mar 20', status: 'todo', type: 'upload' },
  { title: 'Review Privacy Notice Draft', framework: 'GDPR', due: 'Mar 15', status: 'overdue', type: 'review' },
  { title: 'Fill in BCP Test Results', framework: 'DORA', due: 'Mar 25', status: 'todo', type: 'form' },
  { title: 'Confirm Security Training', framework: 'NIS2', due: 'Mar 22', status: 'done', type: 'confirm' },
];

const statusConfig = {
  done: { icon: CheckCircle, color: 'text-green-500', bg: 'bg-green-50', label: 'Done' },
  progress: { icon: Clock, color: 'text-amber-500', bg: 'bg-amber-50', label: 'In Progress' },
  todo: { icon: AlertCircle, color: 'text-slate-400', bg: 'bg-slate-50', label: 'To Do' },
  overdue: { icon: AlertCircle, color: 'text-red-500', bg: 'bg-red-50', label: 'Overdue' },
};

const ContributorDashboardMockup = () => {
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-lg overflow-hidden">
      <div className="bg-slate-50 border-b border-slate-200 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-red-400" />
          <div className="h-3 w-3 rounded-full bg-amber-400" />
          <div className="h-3 w-3 rounded-full bg-green-400" />
        </div>
        <span className="text-xs font-medium text-slate-500">My Tasks</span>
        <span className="text-[10px] bg-[#9b87f5]/10 text-[#7E69AB] px-2 py-0.5 rounded font-medium">5 assigned</span>
      </div>

      <div className="grid grid-cols-3 gap-2 p-3 border-b border-slate-100">
        <div className="bg-green-50 rounded-lg p-2 text-center">
          <div className="text-lg font-bold text-green-600">1</div>
          <div className="text-[10px] text-green-600/70">Completed</div>
        </div>
        <div className="bg-amber-50 rounded-lg p-2 text-center">
          <div className="text-lg font-bold text-amber-600">2</div>
          <div className="text-[10px] text-amber-600/70">In Progress</div>
        </div>
        <div className="bg-red-50 rounded-lg p-2 text-center">
          <div className="text-lg font-bold text-red-600">1</div>
          <div className="text-[10px] text-red-600/70">Overdue</div>
        </div>
      </div>

      <div className="divide-y divide-slate-100">
        {myTasks.map((task, i) => {
          const cfg = statusConfig[task.status as keyof typeof statusConfig];
          const Icon = cfg.icon;
          return (
            <div key={i} className="px-4 py-3 flex items-center gap-3 hover:bg-slate-50/50 transition-colors">
              <Icon className={`h-4 w-4 flex-shrink-0 ${cfg.color}`} />
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-slate-800 truncate">{task.title}</div>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-[10px] px-1.5 py-0.5 bg-[#9b87f5]/10 text-[#7E69AB] rounded font-medium">{task.framework}</span>
                  <span className="text-[10px] text-slate-400">Due: {task.due}</span>
                </div>
              </div>
              <div className="flex-shrink-0">
                {task.type === 'upload' && <Upload className="h-4 w-4 text-slate-400" />}
                {task.type === 'form' && <FileText className="h-4 w-4 text-slate-400" />}
                {task.type === 'review' && <FileText className="h-4 w-4 text-red-400" />}
                {task.type === 'confirm' && <CheckCircle className="h-4 w-4 text-green-400" />}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ContributorDashboardMockup;
