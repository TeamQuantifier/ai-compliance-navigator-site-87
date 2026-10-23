import React from 'react';
import { BrainCircuit, Send, CheckCircle, AlertTriangle, Clock, FileText, ArrowRight } from 'lucide-react';
import { useMockupText, type MockupText } from '@/lib/mockup-text';

const quickActions: MockupText[] = [
  { en: 'Run Gap Analysis', pl: 'Przeprowadź analizę luk' },
  { en: 'Generate Report', pl: 'Wygeneruj raport' },
  { en: 'Schedule Audit', pl: 'Zaplanuj audyt' },
];

const AiAgentMockup = () => {
  const mt = useMockupText();
  return (
    <div className="w-full bg-slate-50 rounded-lg overflow-hidden border border-slate-200 shadow-lg text-sm">
      {/* Top bar */}
      <div className="bg-white px-4 py-2.5 border-b border-slate-200 flex items-center gap-2">
        <div className="flex gap-1.5">
          <div className="h-2.5 w-2.5 rounded-full bg-red-400" />
          <div className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
          <div className="h-2.5 w-2.5 rounded-full bg-green-400" />
        </div>
        <span className="text-xs text-slate-500 ml-2 font-medium">{mt({ en: 'Quantifier — AI Compliance Agent', pl: 'Quantifier — Agent AI ds. zgodności' })}</span>
      </div>

      <div className="flex h-[340px]">
        {/* Sidebar */}
        <div className="w-44 bg-white border-r border-slate-200 p-3 hidden md:block">
          <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-2">{mt({ en: 'Active Frameworks', pl: 'Aktywne standardy' })}</div>
          {[
            { name: 'ISO 27001', pct: 87, color: 'bg-blue-500' },
            { name: 'NIS2', pct: 72, color: 'bg-purple-500' },
            { name: 'DORA', pct: 64, color: 'bg-amber-500' },
            { name: 'GDPR', pct: 94, color: 'bg-green-500' },
          ].map((fw) => (
            <div key={fw.name} className="mb-2.5">
              <div className="flex justify-between text-[11px] mb-0.5">
                <span className="text-slate-700 font-medium">{fw.name}</span>
                <span className="text-slate-500">{fw.pct}%</span>
              </div>
              <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <div className={`h-full ${fw.color} rounded-full`} style={{ width: `${fw.pct}%` }} />
              </div>
            </div>
          ))}

          <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mt-4 mb-2">{mt({ en: 'Quick Actions', pl: 'Szybkie działania' })}</div>
          {quickActions.map((a) => (
            <button key={a.en} className="w-full text-left text-[11px] text-slate-600 hover:bg-slate-50 rounded px-2 py-1.5 mb-0.5 flex items-center gap-1.5">
              <ArrowRight className="h-3 w-3 text-slate-400" />
              {mt(a)}
            </button>
          ))}
        </div>

        {/* Chat area */}
        <div className="flex-1 flex flex-col">
          <div className="flex-1 overflow-y-auto p-3 space-y-3">
            {/* AI message */}
            <div className="flex gap-2">
              <div className="h-6 w-6 rounded-full bg-[#9b87f5] flex items-center justify-center flex-shrink-0 mt-0.5">
                <BrainCircuit className="h-3.5 w-3.5 text-white" />
              </div>
              <div className="bg-white rounded-lg p-2.5 border border-slate-200 max-w-[85%]">
                <p className="text-[11px] text-slate-700 leading-relaxed">
                  {mt({ en: "Good morning! I've completed overnight analysis of your compliance posture. Here's what needs attention:", pl: 'Dzień dobry! Nocna analiza stanu zgodności została zakończona. Oto kwestie wymagające uwagi:' })}
                </p>
                <div className="mt-2 space-y-1.5">
                  <div className="flex items-start gap-1.5 text-[11px]">
                    <AlertTriangle className="h-3.5 w-3.5 text-amber-500 mt-0.5 flex-shrink-0" />
                    <span className="text-slate-600"><strong>NIS2 Art. 21</strong>{mt({ en: " — Risk assessment policy expires in 12 days. I've drafted an updated version.", pl: ' — Polityka oceny ryzyka traci ważność za 12 dni. Zaktualizowany projekt jest gotowy.' })}</span>
                  </div>
                  <div className="flex items-start gap-1.5 text-[11px]">
                    <CheckCircle className="h-3.5 w-3.5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-slate-600"><strong>ISO 27001 A.8.2</strong>{mt({ en: ' — All 14 evidence items collected and verified.', pl: ' — Wszystkie 14 dowodów zostało zebranych i zweryfikowanych.' })}</span>
                  </div>
                  <div className="flex items-start gap-1.5 text-[11px]">
                    <Clock className="h-3.5 w-3.5 text-blue-500 mt-0.5 flex-shrink-0" />
                    <span className="text-slate-600"><strong>DORA ICT</strong>{mt({ en: ' — 3 vendor assessments awaiting response. Auto-reminder sent.', pl: ' — 3 oceny dostawców oczekują na odpowiedź. Wysłano automatyczne przypomnienie.' })}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* User message */}
            <div className="flex justify-end">
              <div className="bg-[#9b87f5] text-white rounded-lg p-2.5 max-w-[75%]">
                <p className="text-[11px] leading-relaxed">{mt({ en: 'Show me the NIS2 policy draft and assign review to the security team.', pl: 'Pokaż projekt polityki NIS2 i przypisz jego przegląd zespołowi ds. bezpieczeństwa.' })}</p>
              </div>
            </div>

            {/* AI response with action */}
            <div className="flex gap-2">
              <div className="h-6 w-6 rounded-full bg-[#9b87f5] flex items-center justify-center flex-shrink-0 mt-0.5">
                <BrainCircuit className="h-3.5 w-3.5 text-white" />
              </div>
              <div className="bg-white rounded-lg p-2.5 border border-slate-200 max-w-[85%]">
                <p className="text-[11px] text-slate-700 leading-relaxed mb-2">
                  {mt({ en: "Done! I've created a review task and attached the updated policy draft:", pl: 'Gotowe! Zadanie przeglądu zostało utworzone, a zaktualizowany projekt polityki jest w załączniku:' })}
                </p>
                <div className="bg-slate-50 rounded p-2 border border-slate-100 flex items-center gap-2">
                  <FileText className="h-4 w-4 text-[#7E69AB]" />
                  <div>
                    <div className="text-[11px] font-medium text-slate-700">NIS2_Risk_Assessment_Policy_v3.2.pdf</div>
                    <div className="text-[10px] text-slate-400">{mt({ en: 'Assigned to: Security Team · Due: Apr 8', pl: 'Przypisano do: Zespół ds. bezpieczeństwa · Termin: 8 kwi.' })}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Input */}
          <div className="border-t border-slate-200 bg-white p-2.5 flex gap-2">
            <input
              type="text"
              placeholder={mt({ en: 'Ask your AI Compliance Officer...', pl: 'Zapytaj swojego asystenta AI ds. zgodności...' })}
              className="flex-1 text-[11px] bg-slate-50 border border-slate-200 rounded-md px-3 py-1.5 text-slate-500"
              readOnly
            />
            <div className="h-7 w-7 rounded-md bg-[#9b87f5] flex items-center justify-center">
              <Send className="h-3.5 w-3.5 text-white" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AiAgentMockup;
