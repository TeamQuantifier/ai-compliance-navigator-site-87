import { useState } from 'react';
import { Search, RotateCcw, ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { emptyFilters, filterCompanies, type Filters } from './data';

export default function QuantamentalScreener() {
  const [filters, setFilters] = useState<Filters>(emptyFilters);
  const [applied, setApplied] = useState<Filters>(emptyFilters);
  const results = filterCompanies(applied);
  const update = (key: keyof Filters, value: string) => setFilters(previous => ({ ...previous, [key]: value }));
  const select = (key: keyof Filters, label: string, values: [string, string][]) => <div className="space-y-2"><label id={`label-${key}`} className="text-xs font-semibold">{label}</label><Select value={filters[key]} onValueChange={v => update(key, v)}><SelectTrigger aria-labelledby={`label-${key}`} className="bg-card"><SelectValue /></SelectTrigger><SelectContent className="quantamental-theme">{values.map(([value, name]) => <SelectItem value={value} key={value}>{name}</SelectItem>)}</SelectContent></Select></div>;
  return <section id="screening" className="q-band">
    <div className="q-wrap">
      <div className="flex items-start justify-between flex-wrap gap-4"><div><h2 className="q-heading">Darmowy screening spółek</h2><p className="q-description mt-3">Wybierz parametry i sprawdź, jak działa selekcja. Bez konta i bez opłat.</p></div><span className="text-xs font-medium bg-secondary text-secondary-foreground px-3 py-1.5 rounded-sm">Wersja demonstracyjna</span></div>
      <form className="mt-7 rounded-lg bg-muted border border-border p-5" onSubmit={e => { e.preventDefault(); setApplied({ ...filters }); }}>
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {select('sector', 'Sektor', [['all', 'Wszystkie'], ['Technologia', 'Technologia'], ['Energetyka', 'Energetyka'], ['Przemysł', 'Przemysł'], ['Finanse', 'Finanse']])}
          {select('cap', 'Kapitalizacja', [['all', 'Dowolna'], ['large', 'Od 1 mld zł'], ['small', 'Poniżej 1 mld zł']])}
          <div className="space-y-2"><label htmlFor="q-pe" className="text-xs font-semibold">C/Z maks.</label><Input className="bg-card" id="q-pe" type="number" min="0" step="0.1" placeholder="np. 15" value={filters.pe} onChange={e => update('pe', e.target.value)} /></div>
          <div className="space-y-2"><label htmlFor="q-roe" className="text-xs font-semibold">ROE min. (%)</label><Input className="bg-card" id="q-roe" type="number" step="0.1" placeholder="np. 10" value={filters.roe} onChange={e => update('roe', e.target.value)} /></div>
          {select('esg', 'Wskaźnik ESG', [['all', 'Bez filtra'], ['A', 'Ocena A'], ['B', 'Ocena B']])}
        </div>
        <div className="mt-4 flex gap-3"><Button type="submit"><Search />Pokaż spółki</Button><Button variant="ghost" type="button" size="icon" title="Wyczyść filtry" aria-label="Wyczyść filtry" onClick={() => { setFilters(emptyFilters); setApplied(emptyFilters); }}><RotateCcw /></Button><span aria-live="polite" className="ml-auto self-center text-xs text-muted-foreground">Wyniki: {results.length}</span></div>
      </form>
      <div className="overflow-x-auto border border-border rounded-lg mt-5">
        <table className="w-full text-sm min-w-[570px]"><thead className="bg-muted text-muted-foreground text-xs"><tr>{['Spółka', 'Sektor', 'C/Z', 'ROE', 'ESG'].map(h => <th key={h} className="text-left px-5 py-3 font-semibold">{h}</th>)}</tr></thead><tbody>{results.map(company => <tr key={company.ticker} className="border-t border-border hover:bg-muted/60"><td className="px-5 py-4 font-semibold">{company.name}<span className="ml-2 text-[10px] text-muted-foreground font-normal">{company.ticker}</span></td><td className="px-5 py-4 text-muted-foreground">{company.sector}</td><td className="px-5 py-4 tabular-nums">{company.pe.toLocaleString('pl-PL')}</td><td className="px-5 py-4 tabular-nums">{company.roe.toLocaleString('pl-PL')}%</td><td className="px-5 py-4"><span className="bg-secondary text-secondary-foreground text-xs font-semibold px-2.5 py-1 rounded-sm">{company.esg}</span></td></tr>)}{results.length === 0 && <tr><td colSpan={5} className="text-center py-10 text-muted-foreground">Brak spółek spełniających wybrane kryteria.</td></tr>}</tbody></table>
      </div>
      <p className="text-xs text-muted-foreground mt-3">Fikcyjne spółki i przykładowe wartości — nie są danymi giełdowymi ani rekomendacją inwestycyjną.</p>
      <p className="text-sm mt-5">Pełna lista wyników, eksport i zapis strategii w licencji. <a href="#cennik" className="text-primary underline underline-offset-4 inline-flex items-center gap-1">Zobacz licencje<ArrowUpRight size={14} /></a></p>
    </div>
  </section>;
}