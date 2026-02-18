import { useState, useRef } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { supabase } from '@/integrations/supabase/client';
import {
  QUIZ_TITLE,
  QUIZ_SUBTITLE,
  Q1_QUESTION, Q1_OPTIONS,
  Q2_QUESTION, Q2_OPTIONS,
  Q3_QUESTION, NACE_SECTORS,
  Q4_QUESTION, Q4_OPTIONS,
  classifyNIS2,
  RESULT_BADGE_COLORS,
  RESULT_LABELS,
  type ResultKey,
} from '@/config/quizConfig';

// ─── Schema walidacji ──────────────────────────────────────────
const schema = z.object({
  email: z.string().trim().email('Podaj prawidłowy adres email'),
  q1: z.string().min(1, 'Wybierz odpowiedź'),
  q2: z.string().min(1, 'Wybierz odpowiedź'),
  q3: z.string().min(1, 'Wybierz sektor'),
  q4: z.array(z.string()).min(1, 'Wybierz co najmniej jedną opcję lub zaznacz "Klienci indywidualni (B2C)"'),
  gdpr: z.boolean().refine(v => v === true, 'Zgoda jest wymagana'),
});

type FormValues = z.infer<typeof schema>;

interface ResultData {
  title: string;
  body: string;
  resultKey: ResultKey;
  score: number;
}

// ─── Searchable NACE select ────────────────────────────────────
function NaceSelect({ value, onChange, error }: { value: string; onChange: (v: string) => void; error?: string }) {
  const [search, setSearch] = useState('');
  const [open, setOpen] = useState(false);

  const filtered = NACE_SECTORS.filter(s =>
    s.label.toLowerCase().includes(search.toLowerCase()) ||
    s.code.toLowerCase().includes(search.toLowerCase())
  );

  const selected = NACE_SECTORS.find(s => s.code === value);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        className={`w-full flex items-center justify-between px-4 py-3 rounded-xl border-2 text-left transition-colors ${
          error ? 'border-red-400' : open ? 'border-[#1a2e54]' : 'border-gray-200 hover:border-gray-300'
        } bg-white`}
      >
        <span className={selected ? 'text-gray-900' : 'text-gray-400'}>
          {selected ? selected.label : 'Wpisz lub wybierz sektor…'}
        </span>
        <svg className={`w-4 h-4 text-gray-400 transition-transform ${open ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div className="absolute z-50 mt-1 w-full bg-white border-2 border-[#1a2e54] rounded-xl shadow-xl overflow-hidden">
          <div className="p-2 border-b border-gray-100">
            <input
              autoFocus
              type="text"
              placeholder="Szukaj po kodzie lub nazwie…"
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full px-3 py-2 text-sm rounded-lg border border-gray-200 focus:outline-none focus:border-[#1a2e54]"
            />
          </div>
          <ul className="max-h-64 overflow-y-auto">
            {filtered.length === 0 && (
              <li className="px-4 py-3 text-sm text-gray-400">Brak wyników</li>
            )}
            {filtered.map(s => (
              <li key={s.code}>
                <button
                  type="button"
                  onClick={() => { onChange(s.code); setOpen(false); setSearch(''); }}
                  className={`w-full text-left px-4 py-2.5 text-sm hover:bg-[#f0f4ff] transition-colors ${
                    s.code === value ? 'bg-[#f0f4ff] font-medium text-[#1a2e54]' : 'text-gray-700'
                  }`}
                >
                  {s.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
      {error && <p className="mt-1.5 text-sm text-red-500">{error}</p>}
    </div>
  );
}

// ─── Główna strona ─────────────────────────────────────────────
export default function FormularzPage() {
  const [phase, setPhase] = useState<'filling' | 'submitting' | 'result'>('filling');
  const [result, setResult] = useState<ResultData | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  const { register, handleSubmit, control, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { q4: [], gdpr: false },
  });

  const onSubmit = async (data: FormValues) => {
    setPhase('submitting');
    setSubmitError(null);

    try {
      // 1. Klasyfikacja client-side (logika warunkowa)
      const resultKey = classifyNIS2(data.q1, data.q2, data.q3, data.q4);
      const score = 0; // nieużywane — zachowane dla interfejsu ResultData

      // 2. Pobierz tekst wyniku z bazy
      const { data: template, error: tplError } = await supabase
        .from('result_templates')
        .select('title, body')
        .eq('result_key', resultKey)
        .single();

      if (tplError || !template) throw new Error('Nie udało się pobrać opisu wyniku.');

      const resultText = `${template.title}\n\n${template.body}`;

      // 3. Zapisz do bazy (anon INSERT)
      const { error: insertError } = await supabase
        .from('submissions')
        .insert({
          email: data.email.trim().toLowerCase(),
          q1: [data.q1],
          q2: [data.q2],
          q3: [data.q3],
          q4: data.q4,
          result_key: resultKey,
          result_text: resultText,
        });

      if (insertError) throw new Error('Nie udało się zapisać zgłoszenia. Spróbuj ponownie.');

      setResult({ title: template.title, body: template.body, resultKey, score });
      setPhase('result');

      setTimeout(() => {
        resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    } catch (e) {
      setSubmitError(e instanceof Error ? e.message : 'Wystąpił nieoczekiwany błąd.');
      setPhase('filling');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f0f4ff] via-white to-[#f8faff]">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center gap-3">
          <img src="/logo-quantifier.png" alt="Quantifier" className="h-8 object-contain" />
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-10">
        {/* Tytuł */}
        <div className="mb-10 text-center">
          <span className="inline-block mb-3 px-3 py-1 text-xs font-semibold bg-[#1a2e54] text-white rounded-full tracking-wide uppercase">
            NIS2 Check
          </span>
          <h1 className="text-2xl md:text-3xl font-bold text-[#1a2e54] leading-tight mb-3">
            {QUIZ_TITLE}
          </h1>
          <p className="text-gray-500 text-sm md:text-base">{QUIZ_SUBTITLE}</p>
        </div>

        {/* Wynik (pojawia się po submit, zamiast formularza) */}
        {phase === 'result' && result && (
          <div ref={resultRef} className="mb-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
              <div className="flex items-start justify-between flex-wrap gap-4 mb-6">
                <div>
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold border ${RESULT_BADGE_COLORS[result.resultKey]}`}>
                    Poziom ryzyka: {RESULT_LABELS[result.resultKey]}
                  </span>
                  <h2 className="mt-3 text-xl font-bold text-[#1a2e54]">{result.title}</h2>
                </div>
                <div className="text-right">
                  <div className="text-4xl font-black text-[#1a2e54]">{result.score}</div>
                  <div className="text-xs text-gray-400 font-medium">punktów</div>
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed">{result.body}</p>
              <div className="mt-8 pt-6 border-t border-gray-100 flex flex-col sm:flex-row gap-3">
                <a
                  href="https://quantifier.io"
                  className="flex-1 text-center px-6 py-3 bg-[#1a2e54] text-white font-semibold rounded-xl hover:bg-[#243d6e] transition-colors"
                >
                  Dowiedz się więcej o Quantifier
                </a>
                <button
                  onClick={() => { setPhase('filling'); setResult(null); }}
                  className="flex-1 text-center px-6 py-3 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-colors"
                >
                  Wypełnij ponownie
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Formularz */}
        {phase !== 'result' && (
          <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-8">
            {/* Email */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Adres email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                placeholder="nazwa@firma.pl"
                {...register('email')}
                className={`w-full px-4 py-3 rounded-xl border-2 focus:outline-none transition-colors ${
                  errors.email ? 'border-red-400' : 'border-gray-200 focus:border-[#1a2e54]'
                }`}
              />
              {errors.email && <p className="mt-1.5 text-sm text-red-500">{errors.email.message}</p>}
              <p className="mt-2 text-xs text-gray-400">
                Twój email służy wyłącznie do dostarczenia wyniku. Przetwarzamy dane zgodnie z{' '}
                <a href="/pl/legal/privacy" className="underline hover:text-gray-600" target="_blank">Polityką Prywatności</a>.
              </p>
            </div>

            {/* Q1 — Pracownicy */}
            <QuestionCard
              number={1}
              question={Q1_QUESTION}
              error={errors.q1?.message}
            >
              <div className="grid grid-cols-2 gap-3">
                {Q1_OPTIONS.map(opt => (
                  <label key={opt.value} className="flex items-center gap-3 p-3 rounded-xl border-2 border-gray-100 hover:border-[#1a2e54] cursor-pointer transition-colors has-[:checked]:border-[#1a2e54] has-[:checked]:bg-[#f0f4ff]">
                    <input
                      type="radio"
                      value={opt.value}
                      {...register('q1')}
                      className="accent-[#1a2e54]"
                    />
                    <span className="text-sm font-medium text-gray-700">{opt.label}</span>
                  </label>
                ))}
              </div>
            </QuestionCard>

            {/* Q2 — Obrót */}
            <QuestionCard
              number={2}
              question={Q2_QUESTION}
              error={errors.q2?.message}
            >
              <div className="grid grid-cols-2 gap-3">
                {Q2_OPTIONS.map(opt => (
                  <label key={opt.value} className="flex items-center gap-3 p-3 rounded-xl border-2 border-gray-100 hover:border-[#1a2e54] cursor-pointer transition-colors has-[:checked]:border-[#1a2e54] has-[:checked]:bg-[#f0f4ff]">
                    <input
                      type="radio"
                      value={opt.value}
                      {...register('q2')}
                      className="accent-[#1a2e54]"
                    />
                    <span className="text-sm font-medium text-gray-700">{opt.label}</span>
                  </label>
                ))}
              </div>
            </QuestionCard>

            {/* Q3 — Sektor NACE */}
            <QuestionCard
              number={3}
              question={Q3_QUESTION}
              error={errors.q3?.message}
            >
              <Controller
                name="q3"
                control={control}
                render={({ field }) => (
                  <NaceSelect
                    value={field.value}
                    onChange={field.onChange}
                    error={errors.q3?.message}
                  />
                )}
              />
            </QuestionCard>

            {/* Q4 — Klienci */}
            <QuestionCard
              number={4}
              question={Q4_QUESTION}
              hint="Zaznacz wszystkie pasujące opcje"
              error={errors.q4?.message}
            >
              <div className="space-y-2">
                {Q4_OPTIONS.map(opt => (
                  <label key={opt.value} className="flex items-center gap-3 p-3 rounded-xl border-2 border-gray-100 hover:border-[#1a2e54] cursor-pointer transition-colors has-[:checked]:border-[#1a2e54] has-[:checked]:bg-[#f0f4ff]">
                    <input
                      type="checkbox"
                      value={opt.value}
                      {...register('q4')}
                      className="accent-[#1a2e54] w-4 h-4 rounded"
                    />
                    <span className="text-sm font-medium text-gray-700">{opt.label}</span>
                  </label>
                ))}
              </div>
            </QuestionCard>

            {/* RODO */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  {...register('gdpr')}
                  className="accent-[#1a2e54] w-4 h-4 mt-0.5 rounded"
                />
                <span className="text-sm text-gray-600">
                  Wyrażam zgodę na przetwarzanie mojego adresu email przez Quantifier sp. z o.o. w celu otrzymania wyniku quizu NIS2. Administratorem danych jest Quantifier sp. z o.o. Szczegóły w{' '}
                  <a href="/pl/legal/privacy" className="underline hover:text-gray-800" target="_blank">Polityce Prywatności</a>.
                </span>
              </label>
              {errors.gdpr && <p className="mt-1.5 text-sm text-red-500">{errors.gdpr.message}</p>}
            </div>

            {/* Błąd submit */}
            {submitError && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700">
                {submitError}
              </div>
            )}

            {/* Przycisk */}
            <button
              type="submit"
              disabled={phase === 'submitting'}
              className="w-full py-4 px-6 bg-[#1a2e54] text-white font-bold text-base rounded-xl hover:bg-[#243d6e] disabled:opacity-60 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl active:scale-[0.99]"
            >
              {phase === 'submitting' ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                  </svg>
                  Sprawdzam…
                </span>
              ) : (
                'Sprawdź, czy dotyczy Cię NIS2 →'
              )}
            </button>
          </form>
        )}
      </main>

      <footer className="mt-16 border-t border-gray-100 bg-white">
        <div className="max-w-3xl mx-auto px-4 py-6 text-center text-xs text-gray-400">
          © {new Date().getFullYear()} Quantifier sp. z o.o. — Wyniki quizu mają charakter informacyjny i nie stanowią porady prawnej.
        </div>
      </footer>
    </div>
  );
}

// ─── Helper: karta pytania ─────────────────────────────────────
function QuestionCard({
  number, question, hint, error, children,
}: {
  number: number;
  question: string;
  hint?: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-start gap-3 mb-4">
        <span className="flex-shrink-0 w-8 h-8 rounded-full bg-[#1a2e54] text-white text-sm font-bold flex items-center justify-center">
          {number}
        </span>
        <div>
          <h3 className="font-semibold text-[#1a2e54] leading-snug">{question}</h3>
          {hint && <p className="text-xs text-gray-400 mt-0.5">{hint}</p>}
        </div>
      </div>
      {children}
      {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
    </div>
  );
}
