import { useState, useEffect, useMemo } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { NACE_SECTORS, Q1_OPTIONS, Q2_OPTIONS, Q4_OPTIONS, RESULT_BADGE_COLORS, RESULT_LABELS, type ResultKey } from '@/config/quizConfig';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Download, Search, RefreshCw, Users, TrendingUp, Calendar, Trash2, ArrowUp, ArrowDown, ArrowUpDown } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'sonner';
import { useTableSort } from '@/hooks/useTableSort';
import { cn } from '@/lib/utils';

interface Submission {
  id: string;
  created_at: string;
  email: string;
  q1: string[] | null;
  q2: string[] | null;
  q3: string[] | null;
  q4: string[] | null;
  result_key: string | null;
  result_text: string | null;
}

const NACE_MAP = Object.fromEntries(NACE_SECTORS.map(s => [s.code, s.label.pl]));
const Q1_MAP = Object.fromEntries(Q1_OPTIONS.map(o => [o.value, o.label.pl]));
const Q2_MAP = Object.fromEntries(Q2_OPTIONS.map(o => [o.value, o.label.pl]));
const Q4_MAP = Object.fromEntries(Q4_OPTIONS.map(o => [o.value, o.label.pl]));

const RESULT_KEYS: ResultKey[] = ['RED', 'ORANGE', 'YELLOW', 'GREEN'];

const RESULT_BG: Record<ResultKey, string> = {
  RED:    'bg-red-50 border-red-200',
  ORANGE: 'bg-orange-50 border-orange-200',
  YELLOW: 'bg-yellow-50 border-yellow-200',
  GREEN:  'bg-green-50 border-green-200',
};

const RESULT_EMOJI: Record<ResultKey, string> = {
  RED: '🔴', ORANGE: '🟠', YELLOW: '🟡', GREEN: '🟢',
};

function formatArray(arr: string[] | null, map?: Record<string, string>): string {
  if (!arr || arr.length === 0) return '—';
  return arr.map(v => map ? (map[v] ?? v) : v).join(', ');
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleString('pl-PL', { dateStyle: 'short', timeStyle: 'short' });
}

// ─── Stats panel ────────────────────────────────────────────────
function StatsPanel({ rows }: { rows: Submission[] }) {
  const total = rows.length;

  const countByResult = useMemo(() => {
    const c: Record<string, number> = {};
    rows.forEach(r => { if (r.result_key) c[r.result_key] = (c[r.result_key] ?? 0) + 1; });
    return c;
  }, [rows]);

  const last7 = useMemo(() => {
    const cutoff = Date.now() - 7 * 24 * 60 * 60 * 1000;
    return rows.filter(r => r.created_at && new Date(r.created_at).getTime() > cutoff).length;
  }, [rows]);

  const topNace = useMemo(() => {
    const c: Record<string, number> = {};
    rows.forEach(r => { (r.q3 ?? []).forEach(code => { c[code] = (c[code] ?? 0) + 1; }); });
    const top = Object.entries(c).sort((a, b) => b[1] - a[1])[0];
    return top ? (NACE_MAP[top[0]] ?? top[0]) : '—';
  }, [rows]);

  if (total === 0) return null;

  return (
    <div className="space-y-4">
      {/* 4 karty wyników */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {RESULT_KEYS.map(key => {
          const count = countByResult[key] ?? 0;
          const pct = total > 0 ? ((count / total) * 100).toFixed(1) : '0.0';
          return (
            <div key={key} className={`rounded-xl border p-4 ${RESULT_BG[key]}`}>
              <div className="text-2xl mb-1">{RESULT_EMOJI[key]}</div>
              <div className="text-2xl font-black leading-none">{count}</div>
              <div className="text-xs font-semibold text-gray-600 mt-0.5">{RESULT_LABELS[key].pl}</div>
              <div className="text-xs text-gray-400 mt-1">{pct}% całości</div>
            </div>
          );
        })}
      </div>

      {/* Ogólne podsumowanie */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="rounded-xl border bg-card p-4 flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
            <Users className="h-4 w-4 text-primary" />
          </div>
          <div>
            <div className="text-xl font-bold">{total}</div>
            <div className="text-xs text-muted-foreground">łącznie zgłoszeń</div>
          </div>
        </div>
        <div className="rounded-xl border bg-card p-4 flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
            <Calendar className="h-4 w-4 text-primary" />
          </div>
          <div>
            <div className="text-xl font-bold">{last7}</div>
            <div className="text-xs text-muted-foreground">ostatnie 7 dni</div>
          </div>
        </div>
        <div className="rounded-xl border bg-card p-4 flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
            <TrendingUp className="h-4 w-4 text-primary" />
          </div>
          <div>
            <div className="text-sm font-bold leading-tight">{topNace}</div>
            <div className="text-xs text-muted-foreground">najczęstszy sektor</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Główna strona ───────────────────────────────────────────────
export default function QuizSubmissions() {
  const [rows, setRows] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [emailFilter, setEmailFilter] = useState('');
  const [resultFilter, setResultFilter] = useState<string>('all');
  // sortAsc removed — replaced with useTableSort below
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [deleting, setDeleting] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    const { data, error: err } = await supabase
      .from('submissions')
      .select('*')
      .order('created_at', { ascending: false });

    if (err) {
      setError(err.message);
    } else {
      setRows((data ?? []) as Submission[]);
    }
    setLoading(false);
  };

  useEffect(() => { fetchData(); }, []);

  const filtered = useMemo(() => {
    let list = rows;
    if (emailFilter.trim()) {
      const q = emailFilter.trim().toLowerCase();
      list = list.filter(r => r.email.toLowerCase().includes(q));
    }
    if (resultFilter !== 'all') {
      list = list.filter(r => r.result_key === resultFilter);
    }
    return list;
  }, [rows, emailFilter, resultFilter]);

  const { sortedData: sortedFiltered, sortKey, sortDir, toggleSort } = useTableSort(
    filtered,
    {
      created_at: (r) => r.created_at,
      email: (r) => r.email,
      q1: (r) => formatArray(r.q1, Q1_MAP),
      q2: (r) => formatArray(r.q2, Q2_MAP),
      q3: (r) => formatArray(r.q3, NACE_MAP),
      q4: (r) => formatArray(r.q4, Q4_MAP),
      result_key: (r) => r.result_key,
    },
    'created_at',
    'desc'
  );

  const exportCSV = () => {
    const headers = ['Data', 'Email', 'Q1 (Pracownicy)', 'Q2 (Obrót)', 'Q3 (Sektor NACE)', 'Q4 (Klienci)', 'Wynik'];
    const csvRows = filtered.map(r => [
      formatDate(r.created_at),
      r.email,
      formatArray(r.q1, Q1_MAP),
      formatArray(r.q2, Q2_MAP),
      formatArray(r.q3, NACE_MAP),
      formatArray(r.q4, Q4_MAP),
      r.result_key ?? '',
    ].map(v => `"${String(v).replace(/"/g, '""')}"`).join(','));

    const csv = [headers.join(','), ...csvRows].join('\n');
    const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `nis2-quiz-submissions-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const deleteSelected = async () => {
    if (selected.size === 0) return;
    const ids = Array.from(selected);
    if (!confirm(`Czy na pewno chcesz usunąć ${ids.length} zgłoszeń?`)) return;
    setDeleting(true);
    const { error: err } = await supabase.from('submissions').delete().in('id', ids);
    if (err) {
      toast.error('Błąd usuwania: ' + err.message);
    } else {
      toast.success(`Usunięto ${ids.length} zgłoszeń`);
      setSelected(new Set());
      fetchData();
    }
    setDeleting(false);
  };

  const toggleSelect = (id: string) => {
    setSelected(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const toggleAll = () => {
    if (selected.size === filtered.length) {
      setSelected(new Set());
    } else {
      setSelected(new Set(filtered.map(r => r.id)));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold">Quiz NIS2 — zgłoszenia</h1>
          <p className="text-muted-foreground text-sm mt-1">
            {rows.length} zgłoszeń łącznie · {filtered.length} po filtrowaniu
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={fetchData} disabled={loading}>
            <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            Odśwież
          </Button>
          <Button size="sm" onClick={exportCSV} disabled={filtered.length === 0}>
            <Download className="h-4 w-4 mr-2" />
            Eksport CSV
          </Button>
          {selected.size > 0 && (
            <Button size="sm" variant="destructive" onClick={deleteSelected} disabled={deleting}>
              <Trash2 className="h-4 w-4 mr-2" />
              Usuń ({selected.size})
            </Button>
          )}
        </div>
      </div>

      {/* Statystyki zbiorcze */}
      {!loading && <StatsPanel rows={rows} />}

      {/* Filtry */}
      <div className="flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-48">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Szukaj po emailu…"
            value={emailFilter}
            onChange={e => setEmailFilter(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select value={resultFilter} onValueChange={setResultFilter}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Filtruj po wyniku" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Wszystkie wyniki</SelectItem>
            <SelectItem value="RED">🔴 Wysokie prawdopodobieństwo NIS2</SelectItem>
            <SelectItem value="ORANGE">🟠 Prawdopodobny obowiązek NIS2</SelectItem>
            <SelectItem value="YELLOW">🟡 Wymogi łańcucha dostaw</SelectItem>
            <SelectItem value="GREEN">🟢 Niskie ryzyko</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Błąd */}
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
          Błąd pobierania danych: {error}
        </div>
      )}

      {/* Tabela */}
      {loading ? (
        <div className="flex items-center justify-center py-16 text-muted-foreground">
          <RefreshCw className="animate-spin h-5 w-5 mr-2" /> Ładowanie…
        </div>
      ) : sortedFiltered.length === 0 ? (
        <div className="text-center py-16 text-muted-foreground">
          Brak zgłoszeń pasujących do filtrów.
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl border">
          <table className="w-full text-sm">
            <thead className="bg-muted/50 border-b">
              <tr>
                <th className="px-3 py-3">
                  <Checkbox checked={selected.size === sortedFiltered.length && sortedFiltered.length > 0} onCheckedChange={toggleAll} />
                </th>
                {([
                  ['created_at', 'Data', 'whitespace-nowrap'],
                  ['email', 'Email', ''],
                  ['q1', 'Q1 Pracownicy', 'whitespace-nowrap'],
                  ['q2', 'Q2 Obrót', 'whitespace-nowrap'],
                  ['q3', 'Q3 Sektor', ''],
                  ['q4', 'Q4 Klienci', ''],
                  ['result_key', 'Wynik', ''],
                ] as const).map(([key, label, extra]) => {
                  const active = sortKey === key;
                  const Icon = active ? (sortDir === 'asc' ? ArrowUp : ArrowDown) : ArrowUpDown;
                  return (
                    <th
                      key={key}
                      onClick={() => toggleSort(key)}
                      className={cn(
                        'text-left px-4 py-3 font-semibold cursor-pointer select-none hover:bg-muted/80 transition-colors',
                        active ? 'text-foreground' : 'text-muted-foreground',
                        extra
                      )}
                    >
                      <span className="inline-flex items-center gap-1.5">
                        {label}
                        <Icon className={cn('h-3.5 w-3.5', active ? 'opacity-100' : 'opacity-40')} />
                      </span>
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody className="divide-y">
              {sortedFiltered.map(row => (
                <tr key={row.id} className={`hover:bg-muted/30 transition-colors ${selected.has(row.id) ? 'bg-primary/5' : ''}`}>
                  <td className="px-3 py-3">
                    <Checkbox checked={selected.has(row.id)} onCheckedChange={() => toggleSelect(row.id)} />
                  </td>
                  <td className="px-4 py-3 text-muted-foreground whitespace-nowrap">{formatDate(row.created_at)}</td>
                  <td className="px-4 py-3 font-medium">{row.email}</td>
                  <td className="px-4 py-3 text-muted-foreground">{formatArray(row.q1, Q1_MAP)}</td>
                  <td className="px-4 py-3 text-muted-foreground">{formatArray(row.q2, Q2_MAP)}</td>
                  <td className="px-4 py-3 text-muted-foreground">{formatArray(row.q3, NACE_MAP)}</td>
                  <td className="px-4 py-3 text-muted-foreground max-w-xs">
                    <span className="line-clamp-2">{formatArray(row.q4, Q4_MAP)}</span>
                  </td>
                  <td className="px-4 py-3">
                    {row.result_key ? (
                      <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-bold border ${RESULT_BADGE_COLORS[row.result_key as ResultKey] ?? ''}`}>
                        {RESULT_LABELS[row.result_key as ResultKey]?.pl ?? row.result_key}
                      </span>
                    ) : '—'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
