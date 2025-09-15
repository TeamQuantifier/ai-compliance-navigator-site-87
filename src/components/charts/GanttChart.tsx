import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface GanttTask {
  id: string;
  name: string;
  startMonth: number;
  duration: number;
  roles: string[];
  color: string;
  isContinuous?: boolean;
}

interface GanttChartProps {
  tasks: GanttTask[];
  title: string;
  subtitle?: string;
}

const GanttChart: React.FC<GanttChartProps> = ({ tasks, title, subtitle }) => {
  const maxMonth = Math.max(...tasks.map(task => task.startMonth + task.duration));
  const months = Array.from({ length: maxMonth }, (_, i) => i + 1);

  return (
    <Card className="bg-gradient-to-br from-slate-900 to-slate-800 text-white border-slate-700">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-white">{title}</CardTitle>
        {subtitle && <p className="text-slate-300">{subtitle}</p>}
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <div className="min-w-[800px]">
            {/* Timeline Header */}
            <div className="grid grid-cols-12 gap-1 mb-4 text-sm">
              <div className="col-span-5 text-slate-300 font-medium">Phase / Timeline</div>
              <div className="col-span-5 text-slate-300 font-medium text-center">
                Implementation Timeline (Months)
              </div>
              <div className="col-span-2 text-slate-300 font-medium text-center">Responsible Roles</div>
            </div>
            
            {/* Month indicators */}
            <div className="grid grid-cols-12 gap-1 mb-6">
              <div className="col-span-5"></div>
              <div className="col-span-5 grid grid-cols-6 gap-1 text-xs text-slate-400">
                {months.slice(0, 6).map(month => (
                  <div key={month} className="text-center">M{month}</div>
                ))}
              </div>
              <div className="col-span-2"></div>
            </div>

            {/* Tasks */}
            <div className="space-y-3">
              {tasks.map((task) => (
                <div key={task.id} className="grid grid-cols-12 gap-1 items-center">
                  {/* Task Name */}
                  <div className="col-span-5">
                    <div className="text-white font-medium text-sm mb-1">{task.name}</div>
                    <div className="text-xs text-slate-400">
                      {task.duration === 1 ? `${task.duration} month` : 
                       task.isContinuous ? 'Ongoing' : `${task.duration} months`}
                    </div>
                  </div>
                  
                  {/* Timeline Bar */}
                  <div className="col-span-5 relative">
                    <div className="grid grid-cols-6 gap-1 h-8">
                      {months.slice(0, 6).map((month) => {
                        const isActive = task.isContinuous || 
                          (month >= task.startMonth && month < task.startMonth + task.duration);
                        return (
                          <div
                            key={month}
                            className={`h-full rounded-sm transition-all duration-300 ${
                              isActive
                                ? `${task.color} shadow-lg`
                                : 'bg-slate-700/30'
                            } ${task.isContinuous ? 'animate-pulse' : ''}`}
                          >
                            {isActive && task.isContinuous && (
                              <div className="w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent animate-[shimmer_2s_ease-in-out_infinite]"></div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  
                  {/* Roles */}
                  <div className="col-span-2">
                    <div className="flex flex-wrap gap-1">
                      {task.roles.map((role, index) => (
                        <span
                          key={index}
                          className="inline-block px-2 py-1 bg-slate-700 text-slate-200 text-xs rounded-full"
                        >
                          {role}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Legend */}
            <div className="mt-8 pt-6 border-t border-slate-700">
              <div className="text-sm text-slate-300 mb-3 font-medium">Implementation Phases:</div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {tasks.filter(task => !task.isContinuous).map((task) => (
                  <div key={task.id} className="flex items-center gap-2">
                    <div className={`w-4 h-4 rounded-sm ${task.color}`}></div>
                    <span className="text-xs text-slate-300">{task.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default GanttChart;