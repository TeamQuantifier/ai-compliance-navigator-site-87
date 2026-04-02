import { Globe, Shield, AlertTriangle, CheckCircle, TrendingUp } from 'lucide-react';

const suppliers = [
  { name: 'Cloud Provider A', country: 'DE', score: 92, risk: 'low', compliance: ['ISO 27001', 'SOC 2'] },
  { name: 'SaaS Vendor B', country: 'US', score: 78, risk: 'medium', compliance: ['SOC 2'] },
  { name: 'IT Services C', country: 'PL', score: 85, risk: 'low', compliance: ['ISO 27001', 'GDPR'] },
  { name: 'Data Center D', country: 'NL', score: 61, risk: 'high', compliance: ['ISO 27001'] },
  { name: 'Consulting E', country: 'UK', score: 88, risk: 'low', compliance: ['ISO 27001', 'DORA'] },
];

const riskColors = {
  low: 'text-green-600 bg-green-50',
  medium: 'text-amber-600 bg-amber-50',
  high: 'text-red-600 bg-red-50',
};

const SupplierScoringMockup = () => {
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-lg overflow-hidden">
      <div className="bg-slate-50 border-b border-slate-200 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-red-400" />
          <div className="h-3 w-3 rounded-full bg-amber-400" />
          <div className="h-3 w-3 rounded-full bg-green-400" />
        </div>
        <span className="text-xs font-medium text-slate-500">Value Chain Management</span>
        <div className="flex items-center gap-1">
          <Globe className="h-3 w-3 text-[#7E69AB]" />
          <span className="text-[10px] text-[#7E69AB] font-medium">5 Suppliers</span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 p-3 border-b border-slate-100">
        <div className="bg-green-50 rounded-lg p-2 text-center">
          <div className="text-lg font-bold text-green-600">3</div>
          <div className="text-[10px] text-green-600/70">Low Risk</div>
        </div>
        <div className="bg-amber-50 rounded-lg p-2 text-center">
          <div className="text-lg font-bold text-amber-600">1</div>
          <div className="text-[10px] text-amber-600/70">Medium Risk</div>
        </div>
        <div className="bg-red-50 rounded-lg p-2 text-center">
          <div className="text-lg font-bold text-red-600">1</div>
          <div className="text-[10px] text-red-600/70">High Risk</div>
        </div>
      </div>

      <div className="divide-y divide-slate-100">
        {suppliers.map((s, i) => (
          <div key={i} className="px-4 py-3 flex items-center gap-3 hover:bg-slate-50/50 transition-colors">
            <div className="h-8 w-8 rounded-full bg-[#9b87f5]/10 flex items-center justify-center text-[10px] font-bold text-[#7E69AB] flex-shrink-0">
              {s.country}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-slate-800 truncate">{s.name}</div>
              <div className="flex items-center gap-1 mt-0.5 flex-wrap">
                {s.compliance.map((c) => (
                  <span key={c} className="text-[9px] px-1 py-0.5 bg-slate-100 text-slate-500 rounded">{c}</span>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <div className="text-right">
                <div className="text-sm font-bold text-slate-800">{s.score}</div>
                <div className="text-[10px] text-slate-400">score</div>
              </div>
              <span className={`text-[10px] px-1.5 py-0.5 rounded font-medium ${riskColors[s.risk as keyof typeof riskColors]}`}>
                {s.risk}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SupplierScoringMockup;
