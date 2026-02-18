// ============================================================
// KONFIGURACJA QUIZU NIS2
// Edytuj tutaj treści pytań, opcje i logikę punktacji.
// Nie musisz modyfikować komponentów UI.
// ============================================================

export const QUIZ_TITLE = 'Czy Twoja firma powinna pilnie zająć się cybersecurity?';
export const QUIZ_SUBTITLE = 'Odpowiedz na 4 pytania i sprawdź, czy dyrektywa NIS2 dotyczy Twojej firmy.';

// ------------------------------------------------------------
// Q1 — Liczba pracowników
// ------------------------------------------------------------
export const Q1_QUESTION = 'Ilu pracowników zatrudnia firma?';
export const Q1_OPTIONS = [
  { value: 'lt10', label: 'poniżej 10' },
  { value: '10_49', label: '10–49' },
  { value: '50_249', label: '50–249' },
  { value: '250plus', label: '250+' },
] as const;

// ------------------------------------------------------------
// Q2 — Roczny obrót
// ------------------------------------------------------------
export const Q2_QUESTION = 'Roczny obrót firmy (w EUR)?';
export const Q2_OPTIONS = [
  { value: 'lt2m', label: 'poniżej 2 mln' },
  { value: '2_10m', label: '2–10 mln' },
  { value: '10_50m', label: '10–50 mln' },
  { value: '50mplus', label: '50 mln+' },
] as const;

// ------------------------------------------------------------
// Q3 — Sektor NACE (searchable select, single choice)
// ------------------------------------------------------------
export const Q3_QUESTION = 'W jakim sektorze działa firma?';

export const NACE_SECTORS = [
  { code: 'A01', label: 'A01 — Uprawy rolne' },
  { code: 'A02', label: 'A02 — Leśnictwo' },
  { code: 'A03', label: 'A03 — Rybołówstwo' },
  { code: 'B05', label: 'B05 — Wydobycie węgla' },
  { code: 'B06', label: 'B06 — Wydobycie ropy i gazu' },
  { code: 'B07', label: 'B07 — Wydobycie rud metali' },
  { code: 'B08', label: 'B08 — Pozostałe górnictwo' },
  { code: 'B09', label: 'B09 — Usługi wspomagające górnictwo' },
  { code: 'C10', label: 'C10 — Produkcja żywności' },
  { code: 'C11', label: 'C11 — Produkcja napojów' },
  { code: 'C12', label: 'C12 — Wyroby tytoniowe' },
  { code: 'C13', label: 'C13 — Tekstylia' },
  { code: 'C14', label: 'C14 — Odzież' },
  { code: 'C15', label: 'C15 — Skóry' },
  { code: 'C16', label: 'C16 — Drewno' },
  { code: 'C17', label: 'C17 — Papier' },
  { code: 'C18', label: 'C18 — Poligrafia' },
  { code: 'C19', label: 'C19 — Koks i produkty rafinacji' },
  { code: 'C20', label: 'C20 — Chemikalia' },
  { code: 'C21', label: 'C21 — Farmaceutyki' },
  { code: 'C22', label: 'C22 — Wyroby z gumy i plastiku' },
  { code: 'C23', label: 'C23 — Wyroby z surowców niemetalicznych' },
  { code: 'C24', label: 'C24 — Metale' },
  { code: 'C25', label: 'C25 — Metalowe wyroby gotowe' },
  { code: 'C26', label: 'C26 — Komputery, elektronika' },
  { code: 'C27', label: 'C27 — Urządzenia elektryczne' },
  { code: 'C28', label: 'C28 — Maszyny' },
  { code: 'C29', label: 'C29 — Pojazdy samochodowe' },
  { code: 'C30', label: 'C30 — Pozostały sprzęt transportowy' },
  { code: 'C31', label: 'C31 — Meble' },
  { code: 'C32', label: 'C32 — Pozostała produkcja' },
  { code: 'C33', label: 'C33 — Naprawa i instalacja maszyn' },
  { code: 'D35', label: 'D35 — Wytwarzanie i dostawy energii' },
  { code: 'E36', label: 'E36 — Pobór i uzdatnianie wody' },
  { code: 'E37', label: 'E37 — Odprowadzanie ścieków' },
  { code: 'E38', label: 'E38 — Gospodarka odpadami' },
  { code: 'E39', label: 'E39 — Rekultywacja' },
  { code: 'F41', label: 'F41 — Budownictwo budynków' },
  { code: 'F42', label: 'F42 — Inżynieria lądowa' },
  { code: 'F43', label: 'F43 — Roboty specjalistyczne' },
  { code: 'G45', label: 'G45 — Handel pojazdami' },
  { code: 'G46', label: 'G46 — Handel hurtowy' },
  { code: 'G47', label: 'G47 — Handel detaliczny' },
  { code: 'H49', label: 'H49 — Transport lądowy' },
  { code: 'H50', label: 'H50 — Transport wodny' },
  { code: 'H51', label: 'H51 — Transport lotniczy' },
  { code: 'H52', label: 'H52 — Magazynowanie' },
  { code: 'H53', label: 'H53 — Poczta i kurierzy' },
  { code: 'I55', label: 'I55 — Zakwaterowanie' },
  { code: 'I56', label: 'I56 — Gastronomia' },
  { code: 'J58', label: 'J58 — Wydawnictwa' },
  { code: 'J59', label: 'J59 — Produkcja filmowa' },
  { code: 'J60', label: 'J60 — Nadawanie programów' },
  { code: 'J61', label: 'J61 — Telekomunikacja' },
  { code: 'J62', label: 'J62 — IT i oprogramowanie' },
  { code: 'J63', label: 'J63 — Przetwarzanie danych / hosting' },
  { code: 'K64', label: 'K64 — Usługi finansowe' },
  { code: 'K65', label: 'K65 — Ubezpieczenia' },
  { code: 'K66', label: 'K66 — Działalność wspomagająca finanse' },
  { code: 'L68', label: 'L68 — Nieruchomości' },
  { code: 'M69', label: 'M69 — Usługi prawne / księgowe' },
  { code: 'M70', label: 'M70 — Doradztwo' },
  { code: 'M71', label: 'M71 — Architektura / inżynieria' },
  { code: 'M72', label: 'M72 — Badania naukowe' },
  { code: 'M73', label: 'M73 — Reklama' },
  { code: 'M74', label: 'M74 — Pozostała działalność profesjonalna' },
  { code: 'N77', label: 'N77 — Wynajem' },
  { code: 'N78', label: 'N78 — Rekrutacja' },
  { code: 'N79', label: 'N79 — Turystyka' },
  { code: 'N80', label: 'N80 — Usługi ochrony' },
  { code: 'N81', label: 'N81 — Utrzymanie obiektów' },
  { code: 'N82', label: 'N82 — Administracyjne wsparcie' },
  { code: 'O84', label: 'O84 — Administracja publiczna' },
  { code: 'P85', label: 'P85 — Edukacja' },
  { code: 'Q86', label: 'Q86 — Opieka zdrowotna' },
  { code: 'Q87', label: 'Q87 — Opieka z zakwaterowaniem' },
  { code: 'Q88', label: 'Q88 — Pomoc społeczna' },
  { code: 'R90', label: 'R90 — Działalność twórcza' },
  { code: 'R91', label: 'R91 — Biblioteki / muzea' },
  { code: 'R92', label: 'R92 — Gry losowe' },
  { code: 'R93', label: 'R93 — Sport' },
  { code: 'S94', label: 'S94 — Organizacje członkowskie' },
  { code: 'S95', label: 'S95 — Naprawa komputerów' },
  { code: 'S96', label: 'S96 — Usługi osobiste' },
  { code: 'T97', label: 'T97 — Gospodarstwa domowe (pracodawcy)' },
  { code: 'T98', label: 'T98 — Produkcja na potrzeby własne' },
  { code: 'U99', label: 'U99 — Organizacje międzynarodowe' },
] as const;

// ------------------------------------------------------------
// Q4 — Typy klientów (multiselect)
// ------------------------------------------------------------
export const Q4_QUESTION = 'Z jakimi klientami współpracuje Twoja firma?';
export const Q4_OPTIONS = [
  { value: 'banks', label: 'Banki i instytucje finansowe' },
  { value: 'energy', label: 'Energetyka' },
  { value: 'large_corps', label: 'Duże korporacje (250+ pracowników)' },
  { value: 'public_admin', label: 'Administracja publiczna i organizacje międzynarodowe' },
  { value: 'listed', label: 'Spółki notowane' },
  { value: 'it', label: 'Firmy IT' },
  { value: 'food', label: 'Firmy produkujące żywność' },
  { value: 'pharma', label: 'Firmy z branży chemicznej i farmaceutycznej' },
  { value: 'transport', label: 'Transport' },
  { value: 'water', label: 'Gospodarka wodna, ścieki lub odpady' },
  { value: 'sme', label: 'Małe i średnie przedsiębiorstwa' },
  { value: 'b2c', label: 'Klienci indywidualni (B2C)' },
] as const;

// ------------------------------------------------------------
// LOGIKA PUNKTACJI
// ------------------------------------------------------------

export function scoreQ1(value: string): number {
  const map: Record<string, number> = {
    lt10: 0,
    '10_49': 1,
    '50_249': 2,
    '250plus': 3,
  };
  return map[value] ?? 0;
}

export function scoreQ2(value: string): number {
  const map: Record<string, number> = {
    lt2m: 0,
    '2_10m': 1,
    '10_50m': 2,
    '50mplus': 3,
  };
  return map[value] ?? 0;
}

// Sektory kluczowe NIS2 (Załącznik I) → +3 pkt
const CRITICAL_SECTORS = new Set([
  'D35', // Energia
  'H49', 'H50', 'H51', 'H52', // Transport
  'K64', 'K65', // Bankowość, infrastruktura rynków finansowych
  'Q86', // Ochrona zdrowia
  'E36', 'E37', 'E38', // Woda pitna, ścieki
  'J61', 'J62', 'J63', // Infrastruktura cyfrowa / IT
  'O84', // Administracja publiczna
  'U99', // Przestrzeń kosmiczna / organizacje międzynarodowe
]);

// Sektory ważne NIS2 (Załącznik II) → +2 pkt
const IMPORTANT_SECTORS = new Set([
  'C21', // Farmaceutyki
  'C24', // Metale
  'C25', 'C26', 'C27', 'C28', 'C29', 'C30', // Produkcja kluczowa
  'G46', // Handel hurtowy
  'M72', // Badania naukowe
  'K66', // Usługi finansowe wspomagające
  'C20', // Chemikalia
  'C10', // Żywność
  'E39', // Gospodarka odpadami / rekultywacja
]);

// Sektory wyłączone (zerowe prawdopodobieństwo NIS2)
const ZERO_SECTORS = new Set(['A01', 'A02', 'A03', 'T97', 'T98']);

export function scoreQ3(naceCode: string): number {
  if (!naceCode) return 0;
  if (ZERO_SECTORS.has(naceCode)) return 0;
  if (CRITICAL_SECTORS.has(naceCode)) return 3;
  if (IMPORTANT_SECTORS.has(naceCode)) return 2;
  return 1;
}

export function scoreQ4(values: string[]): number {
  const pointMap: Record<string, number> = {
    banks: 2,
    energy: 2,
    large_corps: 1,
    public_admin: 2,
    listed: 1,
    it: 1,
    food: 1,
    pharma: 1,
    transport: 1,
    water: 2,
    sme: 0,
    b2c: 0,
  };
  return values.reduce((sum, v) => sum + (pointMap[v] ?? 0), 0);
}

export function calculateTotalScore(q1: string, q2: string, q3: string, q4: string[]): number {
  return scoreQ1(q1) + scoreQ2(q2) + scoreQ3(q3) + scoreQ4(q4);
}

// ------------------------------------------------------------
// PROGI WYNIKOWE
// Zmień te wartości, żeby zmienić klasyfikację
// ------------------------------------------------------------
export const SCORE_THRESHOLDS = {
  CRITICAL: 8,  // >= 8 pkt
  HIGH: 5,      // 5–7 pkt
  MEDIUM: 2,    // 2–4 pkt
  // LOW: 0–1 pkt (domyślnie)
} as const;

export type ResultKey = 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';

export function getResultKey(score: number): ResultKey {
  if (score >= SCORE_THRESHOLDS.CRITICAL) return 'CRITICAL';
  if (score >= SCORE_THRESHOLDS.HIGH) return 'HIGH';
  if (score >= SCORE_THRESHOLDS.MEDIUM) return 'MEDIUM';
  return 'LOW';
}

export const RESULT_BADGE_COLORS: Record<ResultKey, string> = {
  CRITICAL: 'bg-red-100 text-red-800 border-red-200',
  HIGH: 'bg-orange-100 text-orange-800 border-orange-200',
  MEDIUM: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  LOW: 'bg-green-100 text-green-800 border-green-200',
};

export const RESULT_LABELS: Record<ResultKey, string> = {
  CRITICAL: 'Krytyczne',
  HIGH: 'Wysokie',
  MEDIUM: 'Umiarkowane',
  LOW: 'Niskie',
};
