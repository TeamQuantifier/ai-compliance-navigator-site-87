import { useLanguage } from '@/contexts/LanguageContext';
import { Trees, Factory, Truck, Home, Recycle } from 'lucide-react';

const stages = [
  { icon: Trees, colorBg: 'bg-emerald-50', colorBorder: 'border-emerald-200', colorIcon: 'text-emerald-600' },
  { icon: Factory, colorBg: 'bg-amber-50', colorBorder: 'border-amber-200', colorIcon: 'text-amber-600' },
  { icon: Truck, colorBg: 'bg-blue-50', colorBorder: 'border-blue-200', colorIcon: 'text-blue-600' },
  { icon: Home, colorBg: 'bg-purple-50', colorBorder: 'border-purple-200', colorIcon: 'text-purple-600' },
  { icon: Recycle, colorBg: 'bg-slate-50', colorBorder: 'border-slate-200', colorIcon: 'text-slate-600' },
];

const labels = {
  pl: {
    header: ['KOŁYSKA', '', 'BRAMA', '', 'GRÓB'],
    stages: [
      { title: 'SUROWCE', sub: 'Wydobywanie i przetwarzanie' },
      { title: 'PRODUKCJA I PAKOWANIE', sub: 'Procesy wytwórcze' },
      { title: 'DYSTRYBUCJA', sub: 'Transport i magazynowanie' },
      { title: 'UŻYTKOWANIE', sub: 'Etap użytkowania' },
      { title: 'KONIEC ŻYCIA', sub: 'Utylizacja i recykling' },
    ],
    scopes: [
      { label: 'Od kołyski do bramy', span: 2, color: 'border-amber-300 text-amber-800' },
      { label: 'Od bramy do bramy', span: 1, color: 'border-amber-300 text-amber-800', offset: 1 },
      { label: 'Od kołyski do grobu', span: 5, color: 'bg-amber-700 text-white', full: true },
      { label: 'Od bramy do grobu', span: 3, color: 'border-amber-300 text-amber-800', offset: 2 },
    ],
  },
  en: {
    header: ['CRADLE', '', 'GATE', '', 'GRAVE'],
    stages: [
      { title: 'RAW MATERIALS', sub: 'Extraction & processing' },
      { title: 'MANUFACTURING', sub: 'Production & packaging' },
      { title: 'DISTRIBUTION', sub: 'Transport & storage' },
      { title: 'USE PHASE', sub: 'Product usage' },
      { title: 'END OF LIFE', sub: 'Disposal & recycling' },
    ],
    scopes: [
      { label: 'Cradle to gate', span: 2, color: 'border-amber-300 text-amber-800' },
      { label: 'Gate to gate', span: 1, color: 'border-amber-300 text-amber-800', offset: 1 },
      { label: 'Cradle to grave', span: 5, color: 'bg-amber-700 text-white', full: true },
      { label: 'Gate to grave', span: 3, color: 'border-amber-300 text-amber-800', offset: 2 },
    ],
  },
};

const LcaLifecycleMockup = () => {
  const { currentLocale } = useLanguage();
  const l = currentLocale === 'pl' ? labels.pl : labels.en;

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-lg overflow-hidden max-w-5xl mx-auto">
      {/* Top bar */}
      <div className="flex items-center justify-between px-4 py-2 bg-slate-50 border-b border-slate-200">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-400" />
          <div className="w-3 h-3 rounded-full bg-yellow-400" />
          <div className="w-3 h-3 rounded-full bg-green-400" />
        </div>
        <span className="text-xs text-slate-500 font-mono">platform.envirly.com/lca/lifecycle-assessment</span>
        <div />
      </div>

      <div className="p-6">
        {/* Header labels */}
        <div className="grid grid-cols-5 mb-2">
          {l.header.map((h, i) => (
            <div key={i} className="text-center">
              <span className="text-xs font-bold text-slate-500 tracking-wider">{h}</span>
            </div>
          ))}
        </div>

        {/* Stages */}
        <div className="grid grid-cols-5 gap-3 mb-6">
          {stages.map((s, i) => {
            const Icon = s.icon;
            const stage = l.stages[i];
            return (
              <div
                key={i}
                className={`${s.colorBg} ${s.colorBorder} border rounded-xl p-4 flex flex-col items-center text-center transition-transform hover:scale-105`}
              >
                <div className={`w-12 h-12 rounded-full ${s.colorBg} flex items-center justify-center mb-3`}>
                  <Icon className={`h-6 w-6 ${s.colorIcon}`} />
                </div>
                <p className="text-[10px] font-bold text-slate-800 tracking-wide leading-tight">{stage.title}</p>
                <p className="text-[9px] text-slate-500 mt-1">{stage.sub}</p>
              </div>
            );
          })}
        </div>

        {/* Scope bars */}
        <div className="space-y-2">
          {l.scopes.map((scope, i) => (
            <div key={i} className="grid grid-cols-5 gap-3">
              {Array.from({ length: scope.offset || 0 }).map((_, j) => (
                <div key={`empty-${j}`} />
              ))}
              <div
                className={`rounded-full px-4 py-1.5 text-xs font-semibold ${
                  scope.full
                    ? scope.color
                    : `border ${scope.color} bg-white`
                }`}
                style={{ gridColumn: `span ${scope.span}` }}
              >
                {scope.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LcaLifecycleMockup;
