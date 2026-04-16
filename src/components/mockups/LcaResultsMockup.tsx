import { useLanguage } from '@/contexts/LanguageContext';
import { FileDown, TrendingDown, Leaf, Droplets, Factory, Zap } from 'lucide-react';

const impactCategories = [
  { icon: Leaf, value: '691.54', unit: 'kg CO₂-Eq', change: '-12%' },
  { icon: Droplets, value: '4,230', unit: 'L H₂O', change: '-8%' },
  { icon: Zap, value: '1,842', unit: 'MJ', change: '-15%' },
];

const stageData = [
  { stage: 'A1-A3', pct: 62 },
  { stage: 'A4', pct: 12 },
  { stage: 'B1-B7', pct: 8 },
  { stage: 'C1-C4', pct: 14 },
  { stage: 'D', pct: 4 },
];

const LcaResultsMockup = () => {
  const { currentLocale } = useLanguage();
  const isPl = currentLocale === 'pl';

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-lg overflow-hidden">
      {/* Top bar */}
      <div className="flex items-center justify-between px-4 py-2 bg-slate-50 border-b border-slate-200">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
        </div>
        <span className="text-[10px] text-slate-400 font-mono">platform.envirly.com/lca/results</span>
        <div />
      </div>

      <div className="p-4 space-y-4">
        {/* Product header */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[9px] text-slate-400 uppercase tracking-wider font-semibold">
              {isPl ? 'Wyniki analizy LCA' : 'LCA Analysis Results'}
            </p>
            <h3 className="text-sm font-bold text-slate-900">
              {isPl ? 'Strzykawka jednorazowa 5ml' : 'Disposable Syringe 5ml'}
            </h3>
            <p className="text-[10px] text-slate-500">ISO 14040 · ISO 14044 · EN 15804</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="bg-emerald-100 text-emerald-700 text-[9px] font-bold px-2 py-0.5 rounded-full">
              {isPl ? 'Zweryfikowano' : 'Verified'}
            </span>
            <button className="flex items-center gap-1 bg-emerald-700 text-white text-[10px] font-semibold px-3 py-1.5 rounded-lg hover:bg-emerald-800 transition-colors">
              <FileDown className="h-3 w-3" />
              {isPl ? 'Generuj raport EPD' : 'Generate EPD Report'}
            </button>
          </div>
        </div>

        {/* Impact KPIs */}
        <div className="grid grid-cols-3 gap-3">
          {impactCategories.map((cat, i) => {
            const Icon = cat.icon;
            return (
              <div key={i} className="bg-slate-50 rounded-lg p-3 border border-slate-100">
                <div className="flex items-center justify-between mb-1">
                  <Icon className="h-4 w-4 text-emerald-600" />
                  <span className="text-[9px] text-emerald-600 font-semibold flex items-center gap-0.5">
                    <TrendingDown className="h-2.5 w-2.5" /> {cat.change}
                  </span>
                </div>
                <p className="text-base font-bold text-slate-900 leading-tight">{cat.value}</p>
                <p className="text-[9px] text-slate-500">{cat.unit}</p>
              </div>
            );
          })}
        </div>

        {/* Stage breakdown bar */}
        <div>
          <p className="text-[9px] text-slate-400 uppercase tracking-wider font-semibold mb-2">
            {isPl ? 'Rozkład wg etapów cyklu życia' : 'Breakdown by lifecycle stage'}
          </p>
          <div className="flex rounded-lg overflow-hidden h-7">
            {stageData.map((s, i) => {
              const colors = ['bg-emerald-700', 'bg-emerald-500', 'bg-teal-400', 'bg-amber-400', 'bg-slate-300'];
              return (
                <div
                  key={i}
                  className={`${colors[i]} flex items-center justify-center text-[8px] font-bold text-white relative group`}
                  style={{ width: `${s.pct}%` }}
                  title={`${s.stage}: ${s.pct}%`}
                >
                  {s.pct >= 10 && <span>{s.stage}</span>}
                </div>
              );
            })}
          </div>
          <div className="flex justify-between mt-1.5">
            {stageData.map((s, i) => (
              <div key={i} className="text-center" style={{ width: `${s.pct}%` }}>
                <p className="text-[8px] text-slate-500">{s.pct}%</p>
              </div>
            ))}
          </div>
        </div>

        {/* Mini table */}
        <div className="border border-slate-100 rounded-lg overflow-hidden">
          <table className="w-full text-[10px]">
            <thead>
              <tr className="bg-slate-50 text-slate-500">
                <th className="text-left py-1.5 px-3 font-medium">{isPl ? 'Kategoria wpływu' : 'Impact category'}</th>
                <th className="text-right py-1.5 px-3 font-medium">{isPl ? 'Wynik' : 'Result'}</th>
                <th className="text-right py-1.5 px-3 font-medium">{isPl ? 'Jednostka' : 'Unit'}</th>
              </tr>
            </thead>
            <tbody className="text-slate-700">
              <tr className="border-t border-slate-50">
                <td className="py-1.5 px-3 flex items-center gap-1.5">
                  <Factory className="h-3 w-3 text-emerald-500" />
                  GWP-total
                </td>
                <td className="text-right py-1.5 px-3 font-semibold">691.54</td>
                <td className="text-right py-1.5 px-3 text-slate-500">kg CO₂-Eq</td>
              </tr>
              <tr className="border-t border-slate-50">
                <td className="py-1.5 px-3 flex items-center gap-1.5">
                  <Droplets className="h-3 w-3 text-blue-500" />
                  AP
                </td>
                <td className="text-right py-1.5 px-3 font-semibold">3.42</td>
                <td className="text-right py-1.5 px-3 text-slate-500">mol H⁺-Eq</td>
              </tr>
              <tr className="border-t border-slate-50">
                <td className="py-1.5 px-3 flex items-center gap-1.5">
                  <Leaf className="h-3 w-3 text-amber-500" />
                  EP-freshwater
                </td>
                <td className="text-right py-1.5 px-3 font-semibold">0.018</td>
                <td className="text-right py-1.5 px-3 text-slate-500">kg P-Eq</td>
              </tr>
              <tr className="border-t border-slate-50">
                <td className="py-1.5 px-3 flex items-center gap-1.5">
                  <Zap className="h-3 w-3 text-purple-500" />
                  ODP
                </td>
                <td className="text-right py-1.5 px-3 font-semibold">2.1e-7</td>
                <td className="text-right py-1.5 px-3 text-slate-500">kg CFC-11-Eq</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default LcaResultsMockup;
