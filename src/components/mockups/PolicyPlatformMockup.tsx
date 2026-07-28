import { FileText } from 'lucide-react';

/**
 * Premium GRC platform snapshot used on the training landing page bonus section.
 * Static, dark-surfaced product mockup — one card, no interactive behavior.
 */
const PolicyPlatformMockup = () => {
  return (
    <div className="relative group w-full">
      {/* Decorative outer glow */}
      <div className="absolute -inset-1 bg-gradient-to-r from-[hsl(221,83%,53%)] to-[hsl(263,70%,50%)] rounded-2xl blur opacity-20 group-hover:opacity-30 transition duration-700 pointer-events-none" />

      <div className="relative bg-slate-900/80 border border-slate-800 rounded-xl overflow-hidden shadow-2xl backdrop-blur-xl">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900/50">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[hsl(221,83%,53%)] flex items-center justify-center shadow-lg shadow-blue-500/20">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-slate-100">Repozytorium Dokumentów</h3>
              <p className="text-[10px] text-slate-400 uppercase tracking-wider font-medium">
                Standard NIS2 / KSC
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="px-2 py-1 rounded bg-slate-800 border border-slate-700 text-[11px] text-slate-300">
              Filtruj
            </div>
            <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-[hsl(221,83%,53%)] to-[hsl(263,70%,50%)] p-[1px]">
              <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center text-[10px] font-bold text-white">
                +
              </div>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider border-b border-slate-800/50">
                <th className="px-6 py-3">Dokument</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Wersja</th>
                <th className="px-6 py-3 text-right">Właściciel</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/50">
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.4)]" />
                    <div>
                      <p className="text-sm font-medium text-slate-200">Polityka Bezpieczeństwa</p>
                      <p className="text-[11px] text-slate-500">Aktualizacja: 2 dni temu</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-4">
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    Zatwierdzony
                  </span>
                </td>
                <td className="px-4 py-4 text-xs font-mono text-slate-400">v2.4.0</td>
                <td className="px-6 py-4">
                  <div className="flex justify-end">
                    <div className="w-7 h-7 rounded-full bg-slate-700 border border-slate-600 flex items-center justify-center text-[10px] text-slate-300 font-bold">
                      AN
                    </div>
                  </div>
                </td>
              </tr>

              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.4)]" />
                    <div>
                      <p className="text-sm font-medium text-slate-200">Analiza Ryzyka ICT</p>
                      <p className="text-[11px] text-slate-500">Wymaga przeglądu</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-4">
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium bg-amber-500/10 text-amber-400 border border-amber-500/20">
                    W robocze
                  </span>
                </td>
                <td className="px-4 py-4 text-xs font-mono text-slate-400">v1.2.1</td>
                <td className="px-6 py-4">
                  <div className="flex justify-end">
                    <div className="w-7 h-7 rounded-full bg-slate-700 border border-slate-600 flex items-center justify-center text-[10px] text-slate-300 font-bold">
                      MK
                    </div>
                  </div>
                </td>
              </tr>

              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-[hsl(221,83%,53%)] shadow-[0_0_8px_rgba(29,78,216,0.4)]" />
                    <div>
                      <p className="text-sm font-medium text-slate-200">Plan Ciągłości Działania</p>
                      <p className="text-[11px] text-slate-500">Oczekiwanie na podpis</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-4">
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium bg-blue-500/10 text-blue-400 border border-blue-500/20">
                    Weryfikacja
                  </span>
                </td>
                <td className="px-4 py-4 text-xs font-mono text-slate-400">v3.0.0</td>
                <td className="px-6 py-4">
                  <div className="flex justify-end">
                    <div className="w-7 h-7 rounded-full bg-slate-700 border border-slate-600 flex items-center justify-center text-[10px] text-slate-300 font-bold">
                      JW
                    </div>
                  </div>
                </td>
              </tr>

              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-slate-500" />
                    <div>
                      <p className="text-sm font-medium text-slate-200">Rejestr Incydentów</p>
                      <p className="text-[11px] text-slate-500">Ostatni wpis: dziś</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-4">
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium bg-slate-500/10 text-slate-300 border border-slate-500/20">
                    Aktywny
                  </span>
                </td>
                <td className="px-4 py-4 text-xs font-mono text-slate-400">v1.0.3</td>
                <td className="px-6 py-4">
                  <div className="flex justify-end">
                    <div className="w-7 h-7 rounded-full bg-slate-700 border border-slate-600 flex items-center justify-center text-[10px] text-slate-300 font-bold">
                      PS
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-slate-900/80 border-t border-slate-800 flex items-center justify-between">
          <div className="flex items-end gap-3">
            <div className="flex flex-col">
              <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">
                Gotowość NIS2
              </span>
              <div className="w-32 h-1.5 bg-slate-800 rounded-full mt-1 overflow-hidden">
                <div className="h-full bg-gradient-to-r from-[hsl(221,83%,53%)] to-[hsl(263,70%,50%)] w-[78%]" />
              </div>
            </div>
            <span className="text-xs font-bold text-slate-300">78%</span>
          </div>
          <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
            <span className="w-2 h-2 rounded-full bg-emerald-500/70 animate-pulse" />
            System Live
          </div>
        </div>
      </div>
    </div>
  );
};

export default PolicyPlatformMockup;
