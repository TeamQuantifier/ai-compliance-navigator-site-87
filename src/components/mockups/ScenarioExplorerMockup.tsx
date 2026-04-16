import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

const baselineValue = 691.54;

const ScenarioExplorerMockup = () => {
  const { currentLocale } = useLanguage();
  const isPl = currentLocale === 'pl';

  const [recycling, setRecycling] = useState(50);
  const [material, setMaterial] = useState(10);
  const [transport, setTransport] = useState(20);

  // Simple mock calculations
  const recyclingResult = baselineValue; // recycling doesn't change baseline in this mock
  const materialResult = baselineValue * (1 - material / 100);
  const transportResult = baselineValue * (1 - transport / 100 * 0.137);

  const sliders = [
    {
      title: isPl ? 'Udział recyklatu' : 'Recycled content share',
      desc: isPl
        ? 'Skaluje pozyskanie surowców (A1) na podstawie docelowego udziału recyklatu.'
        : 'Scales raw material sourcing (A1) based on target recycled content.',
      label: isPl ? 'Docelowy udział recyklatu' : 'Target recycled content',
      value: recycling,
      setValue: setRecycling,
      result: recyclingResult,
      delta: 0,
      deltaPercent: '0%',
      sub: isPl ? 'Obecny ważony udział recyklatu: 0%' : 'Current weighted recycled content: 0%',
    },
    {
      title: isPl ? 'Odchudzenie produktu' : 'Product lightweighting',
      desc: isPl
        ? 'Skaluje A1, A2, A3 i C, aby oszacować efekt użycia mniejszej ilości materiału.'
        : 'Scales A1, A2, A3 and C to estimate less material usage.',
      label: isPl ? 'Redukcja materiału' : 'Material reduction',
      value: material,
      setValue: setMaterial,
      result: materialResult,
      delta: -(baselineValue - materialResult),
      deltaPercent: `-${material}%`,
    },
    {
      title: isPl ? 'Optymalizacja transportu' : 'Transport optimization',
      desc: isPl
        ? 'Skaluje transport surowców (A2) oraz dystrybucję (A4).'
        : 'Scales raw material transport (A2) and distribution (A4).',
      label: isPl ? 'Redukcja transportu' : 'Transport reduction',
      value: transport,
      setValue: setTransport,
      result: transportResult,
      delta: -(baselineValue - transportResult),
      deltaPercent: `-${((1 - transportResult / baselineValue) * 100).toFixed(2)}%`,
    },
  ];

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-lg overflow-hidden max-w-5xl mx-auto">
      {/* Top bar */}
      <div className="flex items-center justify-between px-4 py-2 bg-slate-50 border-b border-slate-200">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-400" />
          <div className="w-3 h-3 rounded-full bg-yellow-400" />
          <div className="w-3 h-3 rounded-full bg-green-400" />
        </div>
        <span className="text-xs text-slate-500 font-mono">platform.envirly.com/lca/scenario-explorer</span>
        <div />
      </div>

      <div className="p-6 space-y-5">
        {/* Header */}
        <div>
          <h3 className="text-lg font-bold text-slate-900">
            {isPl ? 'Eksplorator scenariuszy [kg CO₂-Eq]' : 'Scenario Explorer [kg CO₂-Eq]'}
          </h3>
          <p className="text-sm text-slate-500 mt-1">
            {isPl
              ? 'Szacowane scenariusze what-if oparte na bieżącym profilu etapów.'
              : 'Estimated what-if scenarios based on current stage profile.'}
          </p>
        </div>

        {/* Baseline */}
        <div className="bg-amber-50 rounded-xl p-4 border border-amber-100">
          <p className="text-xs text-amber-700 font-medium">
            {isPl ? 'Wynik bazowy' : 'Baseline result'}
          </p>
          <p className="text-2xl font-bold text-slate-900">{baselineValue.toFixed(2)} kg CO₂-Eq</p>
        </div>

        {/* Scenario workshop */}
        <div className="border border-slate-200 rounded-xl p-5 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-bold text-slate-800">
                {isPl ? 'Warsztat porównywania scenariuszy' : 'Scenario comparison workshop'}
              </h4>
              <p className="text-xs text-slate-500 mt-0.5">
                {isPl
                  ? 'Utwórz do 4 scenariuszy i porównuj wpływ zmian.'
                  : 'Create up to 4 scenarios and compare the impact of changes.'}
              </p>
            </div>
            <span className="text-xs text-amber-700 font-semibold cursor-pointer hover:underline">
              {isPl ? 'Porównanie dźwignia po dźwigni' : 'Lever-by-lever comparison'}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <input
              className="border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-600 w-48"
              placeholder={isPl ? 'Nazwa scenariusza' : 'Scenario name'}
              readOnly
            />
            <button className="bg-amber-700 text-white text-sm font-semibold px-4 py-2 rounded-lg">
              {isPl ? 'Zapisz bieżący scenariusz' : 'Save current scenario'}
            </button>
            <button className="border border-slate-300 text-sm text-slate-600 px-4 py-2 rounded-lg">
              ↻ {isPl ? 'Resetuj wersję roboczą' : 'Reset working version'}
            </button>
          </div>

          <div className="bg-slate-50 rounded-lg p-3 border border-slate-200 max-w-sm">
            <p className="text-xs font-bold text-slate-700">{isPl ? 'Bieżący draft' : 'Current draft'}</p>
            <p className="text-[10px] text-slate-500 mb-2">
              {isPl ? 'Używane są domyślne wartości suwaków' : 'Using default slider values'}
            </p>
            <div className="flex gap-2">
              <span className="bg-white border border-slate-200 rounded-full px-2 py-0.5 text-[10px] text-slate-600">
                {recycling}% {isPl ? 'recyklatu' : 'recycled'}
              </span>
              <span className="bg-white border border-slate-200 rounded-full px-2 py-0.5 text-[10px] text-slate-600">
                {material}% {isPl ? 'lżejszy' : 'lighter'}
              </span>
              <span className="bg-white border border-slate-200 rounded-full px-2 py-0.5 text-[10px] text-slate-600">
                {transport}% {isPl ? 'redukcji transportu' : 'transport reduction'}
              </span>
            </div>
          </div>
        </div>

        {/* Sliders */}
        <div className="grid md:grid-cols-3 gap-4">
          {sliders.map((s, i) => (
            <div key={i} className="border border-slate-200 rounded-xl p-4 space-y-3">
              <h4 className="font-bold text-sm text-slate-800">{s.title}</h4>
              <p className="text-[10px] text-slate-500 leading-relaxed">{s.desc}</p>

              <div>
                <p className="text-xs font-semibold text-amber-800 mb-1">
                  {s.label}: {s.value}%
                </p>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={s.value}
                  onChange={(e) => s.setValue(Number(e.target.value))}
                  className="w-full accent-amber-600 h-2"
                />
                {s.sub && <p className="text-[9px] text-slate-400 mt-1">{s.sub}</p>}
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-lg p-3">
                <p className="text-[10px] text-slate-500">{isPl ? 'Wynik scenariusza' : 'Scenario result'}</p>
                <p className="text-lg font-bold text-slate-900">{s.result.toFixed(2)} kg CO₂-Eq</p>
                {s.delta !== 0 && (
                  <p className="text-xs text-green-600 font-semibold">
                    {s.delta.toFixed(2)} kg CO₂-Eq ({s.deltaPercent})
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ScenarioExplorerMockup;
