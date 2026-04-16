import { Card } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';

const DppPassportMockup = () => {
  const { currentLocale } = useLanguage();
  const isPl = currentLocale === 'pl';

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-lg overflow-hidden max-w-4xl mx-auto">
      {/* Top bar */}
      <div className="flex items-center justify-between px-4 py-2 bg-slate-50 border-b border-slate-200">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-400" />
          <div className="w-3 h-3 rounded-full bg-yellow-400" />
          <div className="w-3 h-3 rounded-full bg-green-400" />
        </div>
        <span className="text-xs text-amber-700 font-mono">platform.envirly.com/lca/product-passport/...</span>
        <div />
      </div>

      <div className="p-6 space-y-6">
        {/* Header label */}
        <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Digital Product Pass</p>

        {/* Passport Header */}
        <div className="bg-gradient-to-r from-amber-50 to-stone-100 rounded-xl p-6 flex items-center justify-between">
          <div>
            <p className="text-[10px] text-amber-700 uppercase tracking-wider font-semibold mb-1">Passport Header</p>
            <h3 className="text-xl font-bold text-slate-900">{isPl ? 'Butelka PET 500ml' : 'PET Bottle 500ml'}</h3>
            <p className="text-sm text-slate-500">{isPl ? 'Opakowania plastikowe' : 'Plastic packaging'}</p>
          </div>
          <div className="w-20 h-20 bg-white rounded-lg border border-slate-200 flex items-center justify-center">
            <svg viewBox="0 0 40 60" className="w-10 h-14 text-slate-400">
              <rect x="12" y="2" width="16" height="6" rx="2" fill="currentColor" opacity="0.5" />
              <path d="M10 8 C10 8 8 20 8 30 C8 40 10 55 10 55 L30 55 C30 55 32 40 32 30 C32 20 30 8 30 8 Z" fill="none" stroke="currentColor" strokeWidth="1.5" />
              <path d="M12 20 L28 20" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
              <path d="M12 30 L28 30" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
              <path d="M12 40 L28 40" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
            </svg>
          </div>
        </div>

        {/* Info sections - 2 columns */}
        <div className="grid md:grid-cols-2 gap-4">
          {/* Product identification */}
          <div className="rounded-lg overflow-hidden border border-slate-200">
            <div className="bg-amber-800 text-white px-4 py-2.5 text-sm font-semibold">
              {isPl ? 'Identyfikacja produktu' : 'Product identification'}
            </div>
            <div className="divide-y divide-slate-100">
              <Row label={isPl ? 'Nazwa produktu' : 'Product name'} value={isPl ? 'Butelka PET 500ml' : 'PET Bottle 500ml'} />
              <Row label={isPl ? 'Producent' : 'Manufacturer'} value="EcoPack Sp. z o.o." />
              <Row label="GTIN" value="5901234567890" />
              <Row label={isPl ? 'Kraj produkcji' : 'Country of manufacture'} value={isPl ? 'Polska' : 'Poland'} />
            </div>
          </div>

          {/* Environmental footprint */}
          <div className="rounded-lg overflow-hidden border border-slate-200">
            <div className="bg-amber-800 text-white px-4 py-2.5 text-sm font-semibold">
              {isPl ? 'Ślad środowiskowy' : 'Environmental footprint'}
            </div>
            <div className="divide-y divide-slate-100">
              <Row label={isPl ? 'Waga' : 'Weight'} value="28g" />
              <Row label={isPl ? 'Ślad węglowy' : 'Carbon footprint'} value="0.082 kg CO₂e" />
              <Row label={isPl ? 'Udział recyklatu' : 'Recycled content'} value="30%" />
              <Row label={isPl ? 'Zużycie wody' : 'Water usage'} value="1.2 L" />
            </div>
          </div>
        </div>

        {/* Material composition */}
        <div className="rounded-lg overflow-hidden border border-slate-200">
          <div className="bg-amber-800 text-white px-4 py-2.5 text-sm font-semibold">
            {isPl ? 'Skład materiałowy' : 'Material composition'}
          </div>
          <div className="p-4 flex items-center gap-6">
            <div className="flex-1 space-y-2">
              <MaterialBar label="PET" percent={70} />
              <MaterialBar label={isPl ? 'rPET (recyklat)' : 'rPET (recycled)'} percent={30} />
            </div>
          </div>
        </div>

        {/* Bottom 2-col */}
        <div className="grid md:grid-cols-2 gap-4">
          <div className="rounded-lg overflow-hidden border border-slate-200">
            <div className="bg-amber-800 text-white px-4 py-2.5 text-sm font-semibold">
              {isPl ? 'Trwałość i naprawialność' : 'Durability and repairability'}
            </div>
            <div className="divide-y divide-slate-100">
              <Row label={isPl ? 'Okres użytkowania' : 'Expected lifespan'} value={isPl ? 'Jednorazowy' : 'Single-use'} />
              <Row label={isPl ? 'Możliwość ponownego użycia' : 'Reusability'} value={isPl ? 'Nie' : 'No'} />
            </div>
          </div>

          <div className="rounded-lg overflow-hidden border border-slate-200">
            <div className="bg-amber-800 text-white px-4 py-2.5 text-sm font-semibold">
              {isPl ? 'Recykling i koniec życia' : 'Recycling and end-of-life'}
            </div>
            <div className="divide-y divide-slate-100">
              <Row label={isPl ? 'Recyklowalność' : 'Recyclability'} value="100%" />
              <Row label={isPl ? 'Instrukcje segregacji' : 'Sorting instructions'} value={isPl ? 'Plastik – żółty pojemnik' : 'Plastics – yellow bin'} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Row = ({ label, value }: { label: string; value: string }) => (
  <div className="flex items-center px-4 py-2.5 text-sm">
    <span className="text-amber-800 font-medium w-2/5">{label}</span>
    <span className="text-slate-700">{value}</span>
  </div>
);

const MaterialBar = ({ label, percent }: { label: string; percent: number }) => (
  <div className="flex items-center gap-3">
    <span className="text-sm text-slate-600 w-32">{label}</span>
    <div className="flex-1 bg-slate-100 rounded-full h-4 overflow-hidden">
      <div className="bg-amber-700 h-full rounded-full transition-all" style={{ width: `${percent}%` }} />
    </div>
    <span className="text-sm font-medium text-slate-700 w-10 text-right">{percent}%</span>
  </div>
);

export default DppPassportMockup;
