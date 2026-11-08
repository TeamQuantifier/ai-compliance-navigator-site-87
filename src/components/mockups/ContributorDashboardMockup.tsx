import { CheckCircle, Clock, FileText, Upload, AlertCircle } from 'lucide-react';
import { useMockupText, type MockupText } from '@/lib/mockup-text';

const myTasks: { title: MockupText; framework: string; due: MockupText; status: string; type: string }[] = [
  { title: { en: 'Complete Asset Inventory Form', pl: 'Wypełnij formularz inwentaryzacji zasobów' }, framework: 'ISO 27001', due: { en: 'Mar 18', pl: '18 mar.' }, status: 'progress', type: 'form' },
  { title: { en: 'Upload Access Control Evidence', pl: 'Prześlij dowody kontroli dostępu' }, framework: 'SOC 2', due: { en: 'Mar 20', pl: '20 mar.' }, status: 'todo', type: 'upload' },
  { title: { en: 'Review Privacy Notice Draft', pl: 'Sprawdź projekt informacji o prywatności' }, framework: 'GDPR', due: { en: 'Mar 15', pl: '15 mar.' }, status: 'overdue', type: 'review' },
  { title: { en: 'Fill in BCP Test Results', pl: 'Uzupełnij wyniki testów BCP' }, framework: 'DORA', due: { en: 'Mar 25', pl: '25 mar.' }, status: 'todo', type: 'form' },
  { title: { en: 'Confirm Security Training', pl: 'Potwierdź ukończenie szkolenia' }, framework: 'NIS2', due: { en: 'Mar 22', pl: '22 mar.' }, status: 'done', type: 'confirm' },
];

const statusConfig: Record<string, { icon: typeof CheckCircle; color: string; bg: string; label: MockupText }> = {
  done: { icon: CheckCircle, color: 'text-green-500', bg: 'bg-green-50', label: { en: 'Done', pl: 'Ukończone' } },
  progress: { icon: Clock, color: 'text-amber-500', bg: 'bg-amber-50', label: { en: 'In Progress', pl: 'W toku' } },
  todo: { icon: AlertCircle, color: 'text-slate-400', bg: 'bg-slate-50', label: { en: 'To Do', pl: 'Do zrobienia' } },
  overdue: { icon: AlertCircle, color: 'text-red-500', bg: 'bg-red-50', label: { en: 'Overdue', pl: 'Po terminie' } },
};

const ContributorDashboardMockup = () => {
  const mt = useMockupText();
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-lg overflow-hidden">
      <div className="bg-slate-50 border-b border-slate-200 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-red-400" />
          <div className="h-3 w-3 rounded-full bg-amber-400" />
          <div className="h-3 w-3 rounded-full bg-green-400" />
        </div>
        <span className="text-xs font-medium text-slate-500">{mt({ en: 'My Tasks', pl: 'Moje zadania' })}</span>
        <span className="text-[10px] bg-[#9b87f5]/10 text-[#7E69AB] px-2 py-0.5 rounded font-medium">{mt({ en: '5 assigned', pl: '5 przypisanych' })}</span>
      </div>

      <div className="grid grid-cols-3 gap-2 p-3 border-b border-slate-100">
        <div className="bg-green-50 rounded-lg p-2 text-center">
          <div className="text-lg font-bold text-green-600">1</div>
          <div className="text-[10px] text-green-600/70">{mt({ en: 'Completed', pl: 'Ukończone' })}</div>
        </div>
        <div className="bg-amber-50 rounded-lg p-2 text-center">
          <div className="text-lg font-bold text-amber-600">2</div>
          <div className="text-[10px] text-amber-600/70">{mt({ en: 'In Progress', pl: 'W toku' })}</div>
        </div>
        <div className="bg-red-50 rounded-lg p-2 text-center">
          <div className="text-lg font-bold text-red-600">1</div>
          <div className="text-[10px] text-red-600/70">{mt({ en: 'Overdue', pl: 'Po terminie' })}</div>
        </div>
      </div>

      <div className="divide-y divide-slate-100">
        {myTasks.map((task, i) => {
          const cfg = statusConfig[task.status];
          const Icon = cfg.icon;
          return (
            <div key={i} className="px-4 py-3 flex items-center gap-3 hover:bg-slate-50/50 transition-colors">
              <Icon className={`h-4 w-4 flex-shrink-0 ${cfg.color}`} />
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-slate-800 truncate">{mt(task.title)}</div>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-[10px] px-1.5 py-0.5 bg-[#9b87f5]/10 text-[#7E69AB] rounded font-medium">{task.framework}</span>
                  <span className="text-[10px] text-slate-400">{mt({ en: 'Due: ', pl: 'Termin: ' })}{mt(task.due)}</span>
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
