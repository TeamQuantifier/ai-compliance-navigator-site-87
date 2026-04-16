import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Upload } from 'lucide-react';

const steps = {
  pl: ['Marka i okładka', 'Zawartość', 'Treści własne', 'Układ', 'Podgląd', 'Generowanie'],
  en: ['Brand & cover', 'Content', 'Custom text', 'Layout', 'Preview', 'Generate'],
};

const accentColors = ['#0d6f6f', '#22863a', '#1a9b9b', '#8b5e3c', '#c45a3a', '#4a5568'];

const EpdReportGeneratorMockup = () => {
  const { currentLocale } = useLanguage();
  const isPl = currentLocale === 'pl';
  const [activeStep, setActiveStep] = useState(0);
  const [selectedColor, setSelectedColor] = useState(0);

  const stepLabels = isPl ? steps.pl : steps.en;

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-lg overflow-hidden max-w-5xl mx-auto">
      {/* Top bar */}
      <div className="flex items-center justify-between px-4 py-2 bg-slate-50 border-b border-slate-200">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-400" />
          <div className="w-3 h-3 rounded-full bg-yellow-400" />
          <div className="w-3 h-3 rounded-full bg-green-400" />
        </div>
        <span className="text-xs text-slate-500 font-mono">platform.envirly.com/reports/epd-generator</span>
        <div />
      </div>

      {/* Report type selector */}
      <div className="px-6 pt-4 pb-2 border-b border-slate-100">
        <p className="text-[10px] text-slate-400 mb-1">{isPl ? 'Typ raportu' : 'Report type'}</p>
        <div className="flex items-center justify-between">
          <p className="text-sm font-semibold text-slate-800">
            {isPl ? 'Raport deklaracji środowiskowej' : 'Environmental Declaration Report'}
          </p>
          <span className="text-[10px] text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full font-medium">EPD / ISO 14025</span>
        </div>
        <p className="text-[10px] text-slate-400 mt-1">
          {isPl
            ? 'Pełny raport LCA w układzie deklaracyjnym. Korzysta z aktualnego standardowego szablonu raportu.'
            : 'Full LCA report in declaration layout. Uses the current standard report template.'}
        </p>
      </div>

      <div className="flex">
        {/* Left sidebar - steps */}
        <div className="w-48 border-r border-slate-100 p-4 space-y-1">
          {stepLabels.map((label, i) => (
            <button
              key={i}
              onClick={() => setActiveStep(i)}
              className={`flex items-center gap-2 w-full text-left px-3 py-2 rounded-lg text-xs transition-colors ${
                i === activeStep
                  ? 'bg-amber-50 text-amber-800 font-semibold'
                  : 'text-slate-500 hover:bg-slate-50'
              }`}
            >
              <span
                className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                  i === activeStep
                    ? 'bg-amber-700 text-white'
                    : i < activeStep
                    ? 'bg-green-500 text-white'
                    : 'bg-slate-200 text-slate-500'
                }`}
              >
                {i + 1}
              </span>
              {label}
            </button>
          ))}
        </div>

        {/* Center content */}
        <div className="flex-1 p-6 space-y-5">
          <h3 className="text-base font-bold text-slate-800">{stepLabels[0]}</h3>

          <div className="flex gap-3">
            <button className="flex items-center gap-2 border border-amber-300 text-amber-800 rounded-lg px-4 py-2 text-xs font-semibold hover:bg-amber-50">
              <Upload className="h-3.5 w-3.5" />
              {isPl ? 'Prześlij logo (PNG/SVG)' : 'Upload logo (PNG/SVG)'}
            </button>
            <button className="flex items-center gap-2 border border-amber-300 text-amber-800 rounded-lg px-4 py-2 text-xs font-semibold hover:bg-amber-50">
              <Upload className="h-3.5 w-3.5" />
              {isPl ? 'Prześlij obraz okładki' : 'Upload cover image'}
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] text-slate-400 block mb-1">{isPl ? 'Nazwa firmy' : 'Company name'}</label>
              <div className="border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-700 bg-slate-50">
                Demo Holding Organisation
              </div>
            </div>
            <div>
              <label className="text-[10px] text-slate-400 block mb-1">{isPl ? 'Tytuł raportu' : 'Report title'}</label>
              <div className="border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-700 bg-slate-50">
                {isPl ? 'Raport deklaracji środowiskowej' : 'Environmental Declaration Report'}
              </div>
            </div>
          </div>

          <div>
            <label className="text-[10px] text-slate-400 block mb-1">{isPl ? 'Nazwa produktu' : 'Product name'}</label>
            <div className="border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-700 bg-slate-50 max-w-xs">
              {isPl ? 'Strzykawka' : 'Syringe'}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] text-slate-400 block mb-1">{isPl ? 'Język' : 'Language'}</label>
              <div className="border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-700 bg-slate-50">PL</div>
            </div>
            <div>
              <label className="text-[10px] text-slate-400 block mb-1">{isPl ? 'Szablon' : 'Template'}</label>
              <div className="border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-700 bg-slate-50">
                {isPl ? 'Nowoczesny' : 'Modern'}
              </div>
            </div>
          </div>

          {/* Accent color */}
          <div>
            <label className="text-[10px] text-slate-400 block mb-2">{isPl ? 'Kolor akcentu' : 'Accent color'}</label>
            <div
              className="h-3 rounded-full mb-3"
              style={{ background: accentColors[selectedColor] }}
            />
            <div className="flex gap-2">
              {accentColors.map((c, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedColor(i)}
                  className={`w-7 h-7 rounded-full border-2 transition-transform ${
                    i === selectedColor ? 'border-slate-900 scale-110' : 'border-transparent'
                  }`}
                  style={{ background: c }}
                />
              ))}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-between pt-4">
            <button className="text-sm text-slate-400 px-4 py-2">{isPl ? 'Wstecz' : 'Back'}</button>
            <button className="bg-amber-800 text-white text-sm font-semibold px-6 py-2 rounded-lg">
              {isPl ? 'Dalej' : 'Next'}
            </button>
          </div>
        </div>

        {/* Right sidebar - summary */}
        <div className="w-52 border-l border-slate-100 p-4 space-y-3">
          <h4 className="font-bold text-sm text-slate-800">{isPl ? 'Podsumowanie' : 'Summary'}</h4>
          <div className="space-y-2 text-[10px]">
            <div>
              <p className="text-slate-400">{isPl ? 'Szablon' : 'Template'}</p>
              <p className="font-semibold text-slate-700">{isPl ? 'Nowoczesny' : 'Modern'}</p>
            </div>
            <div>
              <p className="text-slate-400">{isPl ? 'Typ raportu' : 'Report type'}</p>
              <p className="font-semibold text-slate-700">{isPl ? 'Raport deklaracji środowiskowej' : 'Environmental Declaration Report'}</p>
            </div>
            <div>
              <p className="text-slate-400">{isPl ? 'Włączone sekcje' : 'Enabled sections'}</p>
              <p className="font-semibold text-slate-700">12/14</p>
            </div>
            <div>
              <p className="text-slate-400">{isPl ? 'Szacowana liczba stron' : 'Estimated pages'}</p>
              <p className="font-semibold text-slate-700">16</p>
            </div>
            <div>
              <p className="text-slate-400">{isPl ? 'Ostrzeżenia' : 'Warnings'}</p>
              <p className="font-semibold text-amber-600">5</p>
            </div>
          </div>
          <button className="w-full bg-amber-700 text-white text-xs font-semibold py-2.5 rounded-lg mt-4">
            {isPl ? 'Przejdź do generowania' : 'Go to generation'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EpdReportGeneratorMockup;
