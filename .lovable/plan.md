
# Refaktor logiki klasyfikacji NIS2 — nowe zasady oparte na warunkach

## Analiza obecnego stanu

Obecna logika w `quizConfig.ts` używa prostego systemu punktowego (suma punktów → próg → wynik). Nowe wymagania zastępują go **logiką warunkową** opartą na zestawie reguł "przynajmniej N z kryteriów", gdzie każde pytanie ma konkretną semantykę (nie wagę punktową).

## Nowe klucze wyników i ich kolory

| Klucz | Kolor | Znaczenie |
|-------|-------|-----------|
| `RED` | 🔴 Czerwony | Wysokie prawdopodobieństwo obowiązku NIS2 (bezpośredni) |
| `ORANGE` | 🟠 Pomarańczowy | Prawdopodobny obowiązek NIS2 (do weryfikacji) |
| `YELLOW` | 🟡 Żółty | Wymogi cyberbezpieczeństwa via łańcuch dostaw (ISO 27001) |
| `GREEN` | 🟢 Zielony | Niskie ryzyko regulacyjne |

## Logika klasyfikacji (kolejność priorytetów)

Reguły sprawdzane **od góry**, pierwsza pasująca wygrywa:

### 🔴 RED — "Wysokie prawdopodobieństwo obowiązku NIS2"
**Wymagane WSZYSTKIE 3 warunki:**
1. Q1 = `50_249` lub `250plus` (≥ 50 pracowników)
2. Q2 = `10_50m` lub `50mplus` (≥ 10 mln EUR obrotu)
3. Sektor Q3 sklasyfikowany jako `HIGH` w nowym mapowaniu (dawne "CRITICAL_SECTORS" — Załącznik I NIS2)

### 🟠 ORANGE — "Prawdopodobny obowiązek NIS2 (do weryfikacji)"
**Wymagane "przynajmniej 2 z 3" warunków:**
1. Q1 = `50_249` lub `250plus`
2. Q2 = `10_50m` lub `50mplus`
3. Sektor Q3 = `HIGH` **lub** `MEDIUM` (Załącznik I lub II NIS2)

Czyli: `ORANGE` to firma, która spełnia tylko 2 z powyższych 3, lub spełnia wszystkie 3 ale ma sektor `MEDIUM` (nie `HIGH`).

### 🟡 YELLOW — "Wymogi ISO 27001 via supply chain"
**Wystarczy JEDEN z warunków:**
1. Sektor Q3 sklasyfikowany jako `SUPPLY_CHAIN` (sektor, który jest częstym dostawcą dla podmiotów NIS2)
2. Q4 zawiera przynajmniej jedną opcję z listy "supply chain" (banki, energetyka, duże korpo, admin publiczna, spółki notowane, IT, żywność, farmacja, transport, woda)

### 🟢 GREEN — "Niskie ryzyko regulacyjne"
Żaden z powyższych warunków nie jest spełniony (fallback).

## Nowe mapowanie sektorów Q3

Zamiast 3 → 2 → 1 → 0 punktów, sektory dostaną etykiety:

```typescript
type SectorRisk = 'HIGH' | 'MEDIUM' | 'SUPPLY_CHAIN' | 'LOW';
```

| Etykieta | Sektory NACE | Uzasadnienie |
|----------|-------------|--------------|
| `HIGH` | D35, H49–H52, K64, K65, Q86, E36–E38, J61–J63, O84, U99 | Załącznik I NIS2 (podmioty kluczowe) |
| `MEDIUM` | C21, C24, C25–C30, G46, M72, K66, C20, C10, E39 | Załącznik II NIS2 (podmioty ważne) |
| `SUPPLY_CHAIN` | C11–C19, C22–C23, C31–C33, F41–F43, G45–G47, H53, I55–I56, J58–J60, L68, M69–M74, N77–N82, P85, Q87–Q88 | Sektory typowo będące w supply chain podmiotów NIS2 |
| `LOW` | A01–A03, B05–B09, R90–R93, S94–S96, T97–T98 | Brak powiązania z NIS2 |

## Mapowanie Q4 — "supply chain" vs "low"

```typescript
// Supply chain options (ŻÓŁTY trigger)
const Q4_SUPPLY_CHAIN = new Set([
  'banks', 'energy', 'large_corps', 'public_admin',
  'listed', 'it', 'food', 'pharma', 'transport', 'water'
]);

// Low-risk options (brak wpływu na wynik)
// 'sme', 'b2c'
```

## Algorytm klasyfikacji (pseudokod)

```typescript
function classifyNIS2(q1, q2, q3, q4): ResultKey {
  const largeFirm = q1 === '50_249' || q1 === '250plus';
  const highRevenue = q2 === '10_50m' || q2 === '50mplus';
  const sectorRisk = getSectorRisk(q3); // 'HIGH' | 'MEDIUM' | 'SUPPLY_CHAIN' | 'LOW'
  const hasSupplyChainClients = q4.some(v => Q4_SUPPLY_CHAIN.has(v));

  // 🔴 RED: wszystkie 3 warunki
  if (largeFirm && highRevenue && sectorRisk === 'HIGH') return 'RED';

  // 🟠 ORANGE: przynajmniej 2 z 3 warunków (sektor HIGH lub MEDIUM)
  const isNIS2Sector = sectorRisk === 'HIGH' || sectorRisk === 'MEDIUM';
  const conditions = [largeFirm, highRevenue, isNIS2Sector];
  const metCount = conditions.filter(Boolean).length;
  if (metCount >= 2) return 'ORANGE';

  // 🟡 YELLOW: supply chain via sektor lub klientów
  if (sectorRisk === 'SUPPLY_CHAIN' || hasSupplyChainClients) return 'YELLOW';

  // 🟢 GREEN: nic nie pasuje
  return 'GREEN';
}
```

## Zmiany w bazie danych (result_templates)

Nowe klucze wyników zastępują stare (`CRITICAL`, `HIGH`, `MEDIUM`, `LOW` → `RED`, `ORANGE`, `YELLOW`, `GREEN`). Konieczna jest aktualizacja danych w tabeli `result_templates` przez migrację SQL.

```sql
-- Usuń stare wpisy
DELETE FROM public.result_templates WHERE result_key IN ('CRITICAL','HIGH','MEDIUM','LOW');

-- Wstaw nowe
INSERT INTO public.result_templates (result_key, title, body) VALUES
  ('RED', 'Wysokie prawdopodobieństwo obowiązku NIS2', '[Opis...]'),
  ('ORANGE', 'Prawdopodobny obowiązek NIS2 (do weryfikacji)', '[Opis...]'),
  ('YELLOW', 'Wysokie prawdopodobieństwo wymogów cyberbezpieczeństwa (łańcuch dostaw)', '[Opis...]'),
  ('GREEN', 'Niskie ryzyko regulacyjne (na dziś)', '[Opis...]');
```

## Pliki do modyfikacji

| Plik | Zakres zmian |
|------|-------------|
| `src/config/quizConfig.ts` | Zastąpienie systemu punktowego logiką warunkową, nowe typy, nowy `getSectorRisk()`, nowa `classifyNIS2()`, nowe kolory/etykiety dla 4 kluczy |
| `src/pages/formularz/FormularzPage.tsx` | Import zaktualizowanych typów (tylko zmiana `ResultKey`), brak zmian w UI |
| `src/pages/admin/QuizSubmissions.tsx` | Aktualizacja `RESULT_BADGE_COLORS` i `RESULT_LABELS` dla nowych kluczy |
| Migracja SQL | UPDATE `result_templates`: zastąpienie 4 wpisów nowymi kluczami RED/ORANGE/YELLOW/GREEN |

## Kwestia walidacji Q4

Obecna walidacja wymaga `min(1)` zaznaczenia w Q4. Przy nowej logice `GREEN` może być wynikiem nawet gdy zaznaczono `sme` lub `b2c` — to OK, te odpowiedzi są poprawne. Walidacja pozostaje bez zmian (wymagamy odpowiedzi).

## Ważna uwaga o kolejności reguł

`RED` jest sprawdzany PRZED `ORANGE`, `ORANGE` przed `YELLOW` — firma, która spełnia wszystkie 3 warunki RED (duża + wysokie obroty + sektor HIGH), **nie dostanie** ORANGE, tylko RED. Jeśli spełnia tylko 2 z 3 warunków, dostanie ORANGE.

Firma z sektorem `SUPPLY_CHAIN` i jednocześnie dużym rozmiarem, ale małym obrotem: spełnia tylko 1 z 3 warunków NIS2 → nie dostaje ORANGE (potrzeba 2), dostaje YELLOW (ma `SUPPLY_CHAIN` sektor).
