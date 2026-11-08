import { describe, expect, test } from 'bun:test';
import { licenses, filterCompanies, emptyFilters } from './data';
describe('Quantamental PDF offer', () => {
  test('basic annual license costs 599 PLN', () => expect(licenses[0].price).toBe(599));
  test('extended annual license costs 899 PLN', () => expect(licenses[1].price).toBe(899));
});
describe('Screening filters', () => {
  test('maximum PE excludes higher values', () => {
    expect(filterCompanies({ ...emptyFilters, pe: '10' }).map(c => c.ticker)).toEqual(['NVE']);
  });
  test('minimum ROE includes only qualifying values', () => {
    expect(filterCompanies({ ...emptyFilters, roe: '20' }).map(c => c.ticker)).toEqual(['VTX']);
  });
  test('sector and ESG filters are combined', () => {
    expect(filterCompanies({ ...emptyFilters, sector: 'Technologia', esg: 'A' }).map(c => c.ticker)).toEqual(['ALF', 'GRS']);
  });
});