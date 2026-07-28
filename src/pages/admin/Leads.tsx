import { useState, useEffect, useMemo } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Download,
  Search,
  RefreshCw,
  Users,
  Calendar,
  TrendingUp,
  ExternalLink,
  ChevronDown,
  Mail,
  Building2,
  GraduationCap,
  FileQuestion,
  CalendarDays,
  MessageSquare,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface Lead {
  id: string;
  created_at: string;
  source_type: 'contact' | 'event' | 'quiz';
  email: string;
  name: string;
  company: string | null;
  source_label: string;
  source_url: string | null;
  extra: string | null;
}

interface ContactRow {
  id: string;
  created_at: string;
  first_name: string | null;
  last_name: string | null;
  email: string;
  company: string | null;
  source_url: string | null;
  language: string | null;
}

interface EventRow {
  id: string;
  created_at: string;
  event_slug: string;
  event_title: string | null;
  first_name: string | null;
  work_email: string;
  company: string | null;
  source_url: string | null;
}

interface QuizRow {
  id: string;
  created_at: string;
  email: string;
  source_url: string | null;
  result_key: string | null;
  q3: string[] | null;
}

const TRAINING_KEYWORDS = ['szkolenie', 'training', 'cybersecurity-training', 'darmowe-szkolenie', 'kurs'];
const CONTACT_FALLBACK_URL = 'https://quantifier.ai/pl/contact/';
const QUIZ_FALLBACK_URL = 'https://quantifier.ai/pl/sprawdz-cyberbezpieczenstwo/';

function formatDate(iso: string) {
  return new Date(iso).toLocaleString('pl-PL', { dateStyle: 'short', timeStyle: 'short' });
}

function isTrainingUrl(url: string | null): boolean {
  if (!url) return false;
  const lower = url.toLowerCase();
  return TRAINING_KEYWORDS.some(k => lower.includes(k));
}

function isContactUrl(url: string | null): boolean {
  if (!url) return false;
  return url.toLowerCase().includes('/contact');
}

function normalizeContact(row: ContactRow): Lead {
  const source_url = row.source_url || CONTACT_FALLBACK_URL;
  const isTraining = isTrainingUrl(row.source_url);
  const isContact = isContactUrl(row.source_url);
  const label = isTraining ? 'Landing page szkolenia' : isContact ? 'Strona kontaktowa' : 'Formularz';

  return {
    id: row.id,
    created_at: row.created_at,
    source_type: 'contact',
    email: row.email,
    name: [row.first_name, row.last_name].filter(Boolean).join(' ') || '—',
    company: row.company,
    source_label: label,
    source_url,
    extra: null,
  };
}

function normalizeEvent(row: EventRow): Lead {
  const source_url = row.source_url || `https://quantifier.ai/pl/events/${row.event_slug}/`;
  return {
    id: row.id,
    created_at: row.created_at,
    source_type: 'event',
    email: row.work_email,
    name: row.first_name || '—',
    company: row.company,
    source_label: row.event_title || 'Webinar / event',
    source_url,
    extra: null,
  };
}

function normalizeQuiz(row: QuizRow): Lead {
  const source_url = row.source_url || QUIZ_FALLBACK_URL;
  const sector = row.q3?.[0] ? `Sektor: ${row.q3[0]}` : null;
  const result = row.result_key ? `Wynik: ${row.result_key}` : null;
  return {
    id: row.id,
    created_at: row.created_at,
    source_type: 'quiz',
    email: row.email,
    name: '—',
    company: null,
    source_label: 'Quiz NIS2 / Cybersecurity Check',
    source_url,
    extra: [sector, result].filter(Boolean).join(' · ') || null,
  };
}

function exportCSV(filename: string, leads: Lead[]) {
  const headers = ['Data', 'Email', 'Imię', 'Firma', 'Źródło', 'Link', 'Dodatkowe'];
  const csvRows = leads.map(r => [
    formatDate(r.created_at),
    r.email,
    r.name,
    r.company ?? '',
    r.source_label,
    r.source_url ?? '',
    r.extra ?? '',
  ].map(v => `"${String(v).replace(/"/g, '""')}"`).join(','));

  const csv = [headers.join(','), ...csvRows].join('\n');
  const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

function SectionCard({
  title,
  icon: Icon,
  leads,
  search,
  expanded,
  onToggle,
  onExport,
}: {
  title: string;
  icon: React.ElementType;
  leads: Lead[];
  search: string;
  expanded: boolean;
  onToggle: () => void;
  onExport: () => void;
}) {
  const filtered = useMemo(() => {
    if (!search.trim()) return leads;
    const q = search.trim().toLowerCase();
    return leads.filter(
      r =>
        r.email.toLowerCase().includes(q) ||
        r.name.toLowerCase().includes(q) ||
        (r.company?.toLowerCase() ?? '').includes(q) ||
        r.source_label.toLowerCase().includes(q)
    );
  }, [leads, search]);

  const displayed = expanded ? filtered : filtered.slice(0, 50);
  const hasMore = filtered.length > 50;

  return (
    <div className="rounded-xl border bg-card overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3 border-b bg-muted/30">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
            <Icon className="h-4 w-4 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-sm">{title}</h3>
            <p className="text-xs text-muted-foreground">{filtered.length} leadów</p>
          </div>
        </div>
        <Button variant="outline" size="sm" onClick={onExport} disabled={filtered.length === 0}>
          <Download className="h-3.5 w-3.5 mr-1.5" />
          CSV
        </Button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-muted/50 border-b">
            <tr>
              <th className="text-left px-4 py-2.5 font-medium text-muted-foreground whitespace-nowrap">Data</th>
              <th className="text-left px-4 py-2.5 font-medium text-muted-foreground">Email</th>
              <th className="text-left px-4 py-2.5 font-medium text-muted-foreground">Imię / Nazwisko</th>
              <th className="text-left px-4 py-2.5 font-medium text-muted-foreground">Firma</th>
              <th className="text-left px-4 py-2.5 font-medium text-muted-foreground">Źródło</th>
              <th className="text-left px-4 py-2.5 font-medium text-muted-foreground">Link</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {displayed.map(row => (
              <tr key={`${row.source_type}-${row.id}`} className="hover:bg-muted/30 transition-colors">
                <td className="px-4 py-3 text-muted-foreground whitespace-nowrap">{formatDate(row.created_at)}</td>
                <td className="px-4 py-3 font-medium">{row.email}</td>
                <td className="px-4 py-3">{row.name}</td>
                <td className="px-4 py-3 text-muted-foreground">{row.company ?? '—'}</td>
                <td className="px-4 py-3">
                  <span className="text-xs bg-muted px-2 py-1 rounded-full">{row.source_label}</span>
                  {row.extra && <p className="text-xs text-muted-foreground mt-1">{row.extra}</p>}
                </td>
                <td className="px-4 py-3">
                  {row.source_url ? (
                    <a
                      href={row.source_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:text-primary/80 hover:underline"
                    >
                      Podstrona
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  ) : (
                    '—'
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-8 text-sm text-muted-foreground">Brak leadów pasujących do wyszukiwania.</div>
      )}

      {hasMore && (
        <div className="px-4 py-3 border-t bg-muted/20">
          <Button variant="ghost" size="sm" onClick={onToggle} className="w-full">
            {expanded ? 'Pokaż mniej' : `Pokaż więcej (${filtered.length - 50})`}
            <ChevronDown className={cn('h-4 w-4 ml-2 transition-transform', expanded && 'rotate-180')} />
          </Button>
        </div>
      )}
    </div>
  );
}

export default function Leads() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [contacts, setContacts] = useState<Lead[]>([]);
  const [events, setEvents] = useState<Lead[]>([]);
  const [quizzes, setQuizzes] = useState<Lead[]>([]);
  const [search, setSearch] = useState('');
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [contactsRes, eventsRes, quizzesRes] = await Promise.all([
        supabase.from('contact_submissions').select('id, created_at, first_name, last_name, email, company, source_url, language').order('created_at', { ascending: false }),
        supabase.from('event_registrations').select('id, created_at, event_slug, event_title, first_name, work_email, company, source_url').order('created_at', { ascending: false }),
        supabase.from('submissions').select('id, created_at, email, source_url, result_key, q3').order('created_at', { ascending: false }),
      ]);

      if (contactsRes.error) throw contactsRes.error;
      if (eventsRes.error) throw eventsRes.error;
      if (quizzesRes.error) throw quizzesRes.error;

      const allContacts = ((contactsRes.data ?? []) as ContactRow[]).map(normalizeContact);
      const allEvents = ((eventsRes.data ?? []) as EventRow[]).map(normalizeEvent);
      const allQuizzes = ((quizzesRes.data ?? []) as QuizRow[]).map(normalizeQuiz);

      setContacts(allContacts);
      setEvents(allEvents);
      setQuizzes(allQuizzes);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Błąd pobierania danych');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const contactPageLeads = useMemo(
    () => contacts.filter(c => c.source_label === 'Strona kontaktowa' || c.source_label === 'Formularz'),
    [contacts]
  );
  const trainingLeads = useMemo(
    () => [
      ...contacts.filter(c => c.source_label === 'Landing page szkolenia'),
      ...events.filter(e => {
        const text = (e.source_label + ' ' + e.source_url).toLowerCase();
        return TRAINING_KEYWORDS.some(k => text.includes(k));
      }),
    ].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()),
    [contacts, events]
  );
  const eventLeads = useMemo(
    () => events.filter(e => {
      const text = (e.source_label + ' ' + e.source_url).toLowerCase();
      return !TRAINING_KEYWORDS.some(k => text.includes(k));
    }),
    [events]
  );
  const quizLeads = quizzes;

  const allLeads = useMemo(() => [...contacts, ...events, ...quizzes], [contacts, events, quizzes]);
  const total = allLeads.length;

  const todayCount = useMemo(() => {
    const start = new Date();
    start.setHours(0, 0, 0, 0);
    return allLeads.filter(l => new Date(l.created_at).getTime() >= start.getTime()).length;
  }, [allLeads]);

  const weekCount = useMemo(() => {
    const cutoff = Date.now() - 7 * 24 * 60 * 60 * 1000;
    return allLeads.filter(l => new Date(l.created_at).getTime() > cutoff).length;
  }, [allLeads]);

  const topSource = useMemo(() => {
    const counts: Record<string, number> = {};
    allLeads.forEach(l => { counts[l.source_label] = (counts[l.source_label] ?? 0) + 1; });
    const top = Object.entries(counts).sort((a, b) => b[1] - a[1])[0];
    return top ? `${top[0]} (${top[1]})` : '—';
  }, [allLeads]);

  const toggleExpanded = (key: string) => {
    setExpanded(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Leads — podsumowanie zgłoszeń</h1>
          <p className="text-muted-foreground text-sm mt-1">
            {loading ? 'Ładowanie…' : `${total} leadów łącznie`}
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={fetchData} disabled={loading}>
            <RefreshCw className={cn('h-4 w-4 mr-2', loading && 'animate-spin')} />
            Odśwież
          </Button>
        </div>
      </div>

      {!loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <div className="rounded-xl border bg-card p-4 flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
              <Users className="h-4 w-4 text-primary" />
            </div>
            <div>
              <div className="text-xl font-bold">{total}</div>
              <div className="text-xs text-muted-foreground">łącznie leadów</div>
            </div>
          </div>
          <div className="rounded-xl border bg-card p-4 flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
              <Calendar className="h-4 w-4 text-primary" />
            </div>
            <div>
              <div className="text-xl font-bold">{todayCount}</div>
              <div className="text-xs text-muted-foreground">dzisiaj</div>
            </div>
          </div>
          <div className="rounded-xl border bg-card p-4 flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
              <CalendarDays className="h-4 w-4 text-primary" />
            </div>
            <div>
              <div className="text-xl font-bold">{weekCount}</div>
              <div className="text-xs text-muted-foreground">ostatnie 7 dni</div>
            </div>
          </div>
          <div className="rounded-xl border bg-card p-4 flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
              <TrendingUp className="h-4 w-4 text-primary" />
            </div>
            <div>
              <div className="text-sm font-bold leading-tight">{topSource}</div>
              <div className="text-xs text-muted-foreground">największe źródło</div>
            </div>
          </div>
        </div>
      )}

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Szukaj po emailu, imieniu, firmie lub źródle…"
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="pl-9"
        />
      </div>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
          Błąd pobierania danych: {error}
        </div>
      )}

      {loading ? (
        <div className="flex items-center justify-center py-16 text-muted-foreground">
          <RefreshCw className="animate-spin h-5 w-5 mr-2" /> Ładowanie…
        </div>
      ) : (
        <div className="space-y-6">
          <SectionCard
            title="Strona kontaktowa i inne formularze"
            icon={MessageSquare}
            leads={contactPageLeads}
            search={search}
            expanded={expanded['contact'] ?? false}
            onToggle={() => toggleExpanded('contact')}
            onExport={() => exportCSV(`leads-contact-${new Date().toISOString().slice(0, 10)}.csv`, contactPageLeads)}
          />
          <SectionCard
            title="Landing page szkolenia"
            icon={GraduationCap}
            leads={trainingLeads}
            search={search}
            expanded={expanded['training'] ?? false}
            onToggle={() => toggleExpanded('training')}
            onExport={() => exportCSV(`leads-training-${new Date().toISOString().slice(0, 10)}.csv`, trainingLeads)}
          />
          <SectionCard
            title="Quiz NIS2 / Cybersecurity Check"
            icon={FileQuestion}
            leads={quizLeads}
            search={search}
            expanded={expanded['quiz'] ?? false}
            onToggle={() => toggleExpanded('quiz')}
            onExport={() => exportCSV(`leads-quiz-${new Date().toISOString().slice(0, 10)}.csv`, quizLeads)}
          />
          <SectionCard
            title="Webinary / Eventy"
            icon={CalendarDays}
            leads={eventLeads}
            search={search}
            expanded={expanded['events'] ?? false}
            onToggle={() => toggleExpanded('events')}
            onExport={() => exportCSV(`leads-events-${new Date().toISOString().slice(0, 10)}.csv`, eventLeads)}
          />
        </div>
      )}
    </div>
  );
}
