import React from 'react';
import { BrainCircuit, AlertTriangle } from 'lucide-react';
import { useMockupText } from '@/lib/mockup-text';

const AIInsights = () => {
  const mt = useMockupText();
  const insights = [
    {
      title: mt({ en: 'Risk Assessment Improvement', pl: 'Ocena ryzyka do usprawnienia' }),
      description: mt({
        en: 'AI identified 3 areas to improve ISO 27001 risk assessment.',
        pl: 'AI wskazał 3 obszary do poprawy w ocenie ryzyka ISO 27001.',
      }),
      type: 'info',
      icon: BrainCircuit,
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-100'
    },
    {
      title: mt({ en: 'Documentation Gap', pl: 'Brakująca dokumentacja' }),
      description: mt({
        en: '5 ISO 9001 documents need updating - automation plan suggested.',
        pl: '5 dokumentów ISO 9001 wymaga aktualizacji — zaproponowano plan automatyzacji.',
      }),
      type: 'warning',
      icon: AlertTriangle,
      bgColor: 'bg-amber-50',
      borderColor: 'border-amber-100'
    }
  ];

  return (
    <div className="bg-white rounded-lg border border-slate-200 p-4">
      <h3 className="text-sm font-medium flex items-center gap-2 mb-3">
        <BrainCircuit className="h-4 w-4 text-[#7E69AB]" /> {mt({ en: 'AI Insights', pl: 'Wnioski AI' })}
      </h3>

      <div className="space-y-3">
        {insights.map((insight) => (
          <InsightCard key={insight.title} {...insight} />
        ))}
      </div>
    </div>
  );
};

const InsightCard = ({ title, description, type, icon: Icon, bgColor, borderColor }) => {
  const mt = useMockupText();
  return (
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
          {mt({ en: 'View Details', pl: 'Szczegóły' })}
        </button>
        <button className={`text-[10px] ${type === 'info' ? 'text-blue-700' : 'text-amber-700'}`}>
          {mt({ en: 'Dismiss', pl: 'Odrzuć' })}
        </button>
      </div>
    </div>
  );
};

export default AIInsights;
