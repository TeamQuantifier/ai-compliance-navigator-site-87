import { useState } from 'react';
import { ArrowUpRight, Activity, BarChart3, Leaf, PieChart, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useMockupText } from '@/lib/mockup-text';

const tabs = [
  { en: 'Quantamental', pl: 'Quantamental', icon: Activity },
  { en: 'Screener', pl: 'Screener', icon: Search },
  { en: 'DCF', pl: 'DCF', icon: BarChart3 },
  { en: 'Portfolio', pl: 'Portfel', icon: PieChart },
  { en: 'ESG', pl: 'ESG', icon: Leaf },
];
const series = [
  [100, 103, 102, 108, 106, 115, 118, 116, 125, 127, 133, 139],
  [100, 101, 106, 104, 110, 111, 118, 120, 116, 123, 128, 130],
  [100, 104, 107, 106, 113, 119, 117, 125, 128, 127, 136, 141],
  [100, 102, 103, 107, 106, 110, 114, 116, 115, 122, 125, 129],
  [100, 103, 105, 102, 110, 116, 118, 117, 123, 126, 130, 135],
];
const benchmark = [100, 101, 100, 102, 103, 105, 104, 106, 107, 108, 110, 111];
function points(values: number[]) { return values.map((v, i) => `${35 + i * 38},${190 - (v - 95) * 3}`).join(' '); }

export default function QuantamentalDashboard() {
  const mt = useMockupText('pl');
  const [active, setActive] = useState(0);
  const titles = [
    { en: 'Strategy backtest', pl: 'Backtest strategii' },
    { en: 'Selection performance', pl: 'Wyniki selekcji spółek' },
    { en: 'Cash flow forecast', pl: 'Prognoza przepływów pieniężnych' },
    { en: 'Portfolio performance', pl: 'Wyniki portfela' },
    { en: 'ESG strategy', pl: 'Strategia ESG' },
  ];
  return (
    <div className="rounded-lg border border-border bg-card q-shadow overflow-hidden q-reveal">
      <div className="flex items-center gap-2 border-b border-border px-5 py-3">
        <img src="/logo-sygnet.png" alt="" width="24" height="24" className="h-6 w-6 object-contain" />
        <span className="font-bold text-sm">Quantamental</span>
        <span className="ml-auto text-[10px] uppercase text-muted-foreground">{mt({ en: 'Demo data', pl: 'Dane demonstracyjne' })}</span>
      </div>
      <div className="grid grid-cols-5 gap-1 p-3 bg-muted/50" role="tablist" aria-label={mt({ en: 'Platform modules', pl: 'Moduły platformy' })}>
        {tabs.map((tab, i) => <Button key={tab.en} size="sm" variant={active === i ? 'secondary' : 'ghost'} role="tab" aria-selected={active === i} aria-controls="q-dashboard-panel" id={`q-tab-${i}`} className={`h-8 px-1 text-[10px] sm:text-xs ${active === i ? 'bg-accent text-primary' : 'text-muted-foreground'}`} onClick={() => setActive(i)}>{mt(tab)}</Button>)}
      </div>
      <div id="q-dashboard-panel" role="tabpanel" aria-labelledby={`q-tab-${active}`} className="p-5">
        <div className="flex justify-between items-start gap-3">
          <div><p className="font-bold text-sm">{mt(titles[active])}</p><p className="text-[11px] text-muted-foreground mt-1">{mt({ en: 'January – December · sample strategy', pl: 'Styczeń – grudzień · przykładowa strategia' })}</p></div>
          <div className="text-right"><p className="q-positive text-lg font-bold inline-flex items-center">+{series[active][11] - 100},0%<ArrowUpRight size={16} /></p><p className="text-[10px] text-muted-foreground">{mt({ en: 'Simulated return', pl: 'Symulowana stopa zwrotu' })}</p></div>
        </div>
        <svg viewBox="0 0 490 230" role="img" aria-label={mt({ en: 'Sample strategy compared with benchmark', pl: 'Przykładowa strategia na tle indeksu odniesienia' })} className="w-full mt-4 q-chart">
          {[55, 100, 145, 190].map((y, i) => <g key={y}><line x1="35" x2="455" y1={y} y2={y} stroke="currentColor" opacity="0.09" /><text x="0" y={y + 4} className="q-benchmark" fill="currentColor" fontSize="10">{140 - i * 15}</text></g>)}
          <polyline points={points(benchmark)} className="q-benchmark" stroke="currentColor" strokeWidth="2" strokeDasharray="5 5" fill="none" />
          <polyline points={points(series[active])} stroke="currentColor" strokeWidth="3" fill="none" strokeLinejoin="round" />
          <circle cx="453" cy={190 - (series[active][11] - 95) * 3} r="4" fill="currentColor" />
          {[{ x: 35, pl: 'Sty', en: 'Jan' }, { x: 150, pl: 'Kwi', en: 'Apr' }, { x: 265, pl: 'Lip', en: 'Jul' }, { x: 390, pl: 'Paź', en: 'Oct' }].map(month => <text key={month.en} x={month.x} y="222" fill="currentColor" className="q-benchmark" fontSize="10">{mt(month)}</text>)}
        </svg>
        <div className="flex gap-5 text-[10px] text-muted-foreground"><span className="flex items-center gap-2"><span className="w-4 border-t-2 border-primary" />{mt({ en: 'Strategy', pl: 'Strategia' })}</span><span className="flex items-center gap-2"><span className="w-4 border-t-2 border-dashed border-border" />{mt({ en: 'Benchmark', pl: 'Indeks odniesienia' })}</span></div>
        <div className="grid grid-cols-3 mt-5 pt-4 border-t border-border gap-4">
          {[{ en: 'Companies', pl: 'Spółki', value: '24' }, { en: 'Volatility', pl: 'Zmienność', value: '12,8%' }, { en: 'Sharpe ratio', pl: 'Wskaźnik Sharpe’a', value: '1,42' }].map(stat => <div key={stat.en}><p className="text-[10px] text-muted-foreground">{mt(stat)}</p><p className="font-bold text-sm mt-1">{stat.value}</p></div>)}
        </div>
      </div>
    </div>
  );
}