import { Shield, AlertTriangle, TrendingDown } from 'lucide-react';

const heatmapData = [
  // [impact, likelihood, label]
  [4, 4, 'Ransomware'],
  [3, 5, 'Phishing'],
  [5, 2, 'Data breach'],
  [2, 3, 'DDoS'],
  [3, 3, 'Insider threat'],
  [4, 2, 'Supply chain'],
  [1, 4, 'Social eng.'],
  [5, 1, 'APT attack'],
];

const cellColor = (impact: number, likelihood: number) => {
  const score = impact * likelihood;
  if (score >= 15) return 'bg-red-500';
  if (score >= 10) return 'bg-orange-400';
  if (score >= 5) return 'bg-amber-300';
  return 'bg-green-300';
};

const risks = [
  { name: 'Ransomware Attack', level: 'Critical', score: 16, trend: 'up', treatment: 'Mitigate' },
  { name: 'Phishing Campaign', level: 'High', score: 15, trend: 'stable', treatment: 'Mitigate' },
  { name: 'Data Breach', level: 'High', score: 10, trend: 'down', treatment: 'Transfer' },
  { name: 'Insider Threat', level: 'Medium', score: 9, trend: 'up', treatment: 'Accept' },
];

const levelColors: Record<string, string> = {
  Critical: 'text-red-600 bg-red-50',
  High: 'text-orange-600 bg-orange-50',
  Medium: 'text-amber-600 bg-amber-50',
};

const RiskHeatmapMockup = () => {
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-lg overflow-hidden">
      <div className="bg-slate-50 border-b border-slate-200 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-red-400" />
          <div className="h-3 w-3 rounded-full bg-amber-400" />
          <div className="h-3 w-3 rounded-full bg-green-400" />
        </div>
        <span className="text-xs font-medium text-slate-500">Risk Assessment</span>
        <div className="flex items-center gap-1">
          <Shield className="h-3 w-3 text-[#7E69AB]" />
          <span className="text-[10px] text-[#7E69AB] font-medium">43 Risks</span>
        </div>
      </div>

      {/* Mini heatmap */}
      <div className="p-3 border-b border-slate-100">
        <div className="text-[10px] text-slate-500 mb-2 font-medium">Risk Heatmap (Impact × Likelihood)</div>
        <div className="grid grid-cols-5 gap-1">
          {[5, 4, 3, 2, 1].map((impact) =>
            [1, 2, 3, 4, 5].map((likelihood) => {
              const risk = heatmapData.find(([i, l]) => i === impact && l === likelihood);
              return (
                <div
                  key={`${impact}-${likelihood}`}
                  className={`h-7 rounded text-[8px] flex items-center justify-center font-medium text-white ${
                    risk ? cellColor(impact, likelihood) : 'bg-slate-100'
                  }`}
                  title={risk ? risk[2] as string : ''}
                >
                  {risk ? (risk[2] as string).slice(0, 4) : ''}
                </div>
              );
            })
          )}
        </div>
        <div className="flex justify-between mt-1">
          <span className="text-[8px] text-slate-400">Low likelihood →</span>
          <span className="text-[8px] text-slate-400">High</span>
        </div>
      </div>

      {/* Risk register */}
      <div className="divide-y divide-slate-100">
        {risks.map((risk, i) => (
          <div key={i} className="px-4 py-2.5 flex items-center gap-3 hover:bg-slate-50/50 transition-colors">
            <AlertTriangle className={`h-4 w-4 flex-shrink-0 ${risk.level === 'Critical' ? 'text-red-500' : risk.level === 'High' ? 'text-orange-500' : 'text-amber-500'}`} />
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-slate-800 truncate">{risk.name}</div>
              <span className="text-[10px] text-slate-400">Score: {risk.score}</span>
            </div>
            <span className={`text-[10px] px-1.5 py-0.5 rounded font-medium ${levelColors[risk.level]}`}>
              {risk.level}
            </span>
            <span className="text-[10px] text-slate-500">{risk.treatment}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RiskHeatmapMockup;
