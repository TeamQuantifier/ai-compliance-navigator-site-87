export const licenses = [
  { id: 'basic', name: 'Podstawowa', price: 599, market: 'Rynek polski', features: ['Wszystkie 5 modułów', 'Dane z GPW i NewConnect', 'Pomoc przez system zgłoszeń'] },
  { id: 'extended', name: 'Rozszerzona', price: 899, market: 'Polska i rynki zagraniczne', features: ['Wszystkie 5 modułów', 'Pełny zbiór danych, w tym rynki zagraniczne', 'Pomoc przez system zgłoszeń'] },
] as const;

export type Company = { name: string; ticker: string; sector: string; cap: number; pe: number; roe: number; esg: string };
// Fictional values: never present demonstration data as market data.
export const demoCompanies: Company[] = [
  { name: 'Alfa Technologies', ticker: 'ALF', sector: 'Technologia', cap: 2200, pe: 12.4, roe: 18.2, esg: 'A' },
  { name: 'Nova Energy', ticker: 'NVE', sector: 'Energetyka', cap: 8400, pe: 8.6, roe: 14.8, esg: 'B' },
  { name: 'Baltic Industries', ticker: 'BTI', sector: 'Przemysł', cap: 620, pe: 16.8, roe: 9.4, esg: 'B' },
  { name: 'Vertex Finance', ticker: 'VTX', sector: 'Finanse', cap: 12500, pe: 10.2, roe: 21.3, esg: 'A' },
  { name: 'Green Systems', ticker: 'GRS', sector: 'Technologia', cap: 340, pe: 22.1, roe: 12.6, esg: 'A' },
];
export type Filters = { sector: string; cap: string; pe: string; roe: string; esg: string };
export const emptyFilters: Filters = { sector: 'all', cap: 'all', pe: '', roe: '', esg: 'all' };
export function filterCompanies(filters: Filters) {
  return demoCompanies.filter(company =>
    (filters.sector === 'all' || company.sector === filters.sector) &&
    (filters.cap === 'all' || (filters.cap === 'large' ? company.cap >= 1000 : company.cap < 1000)) &&
    (!filters.pe || company.pe <= Number(filters.pe)) &&
    (!filters.roe || company.roe >= Number(filters.roe)) &&
    (filters.esg === 'all' || company.esg === filters.esg)
  );
}