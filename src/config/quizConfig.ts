// ============================================================
// KONFIGURACJA QUIZU NIS2
// Edytuj tutaj treści pytań, opcje i logikę klasyfikacji.
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

// ============================================================
// LOGIKA KLASYFIKACJI NIS2
// Reguły warunkowe — kolejność priorytetów (pierwsza pasuje)
// ============================================================

export type ResultKey = 'RED' | 'ORANGE' | 'YELLOW' | 'GREEN';

// --- Mapowanie ryzyka sektora NACE ---
type SectorRisk = 'HIGH' | 'MEDIUM' | 'SUPPLY_CHAIN' | 'LOW';

// Załącznik I NIS2 — podmioty kluczowe
const HIGH_SECTORS = new Set([
  'D35',                         // Energia
  'H49', 'H50', 'H51', 'H52',  // Transport
  'K64', 'K65',                  // Bankowość i ubezpieczenia
  'Q86',                         // Ochrona zdrowia
  'E36', 'E37', 'E38',          // Woda pitna, ścieki, odpady
  'J61', 'J62', 'J63',          // Infrastruktura cyfrowa / IT
  'O84',                         // Administracja publiczna
  'U99',                         // Organizacje międzynarodowe
]);

// Załącznik II NIS2 — podmioty ważne
const MEDIUM_SECTORS = new Set([
  'C21',                                     // Farmaceutyki
  'C24',                                     // Metale
  'C25', 'C26', 'C27', 'C28', 'C29', 'C30', // Produkcja kluczowa
  'G46',                                     // Handel hurtowy
  'M72',                                     // Badania naukowe
  'K66',                                     // Usługi finansowe wspomagające
  'C20',                                     // Chemikalia
  'C10',                                     // Produkcja żywności
  'E39',                                     // Rekultywacja
]);

// Sektory typowo w łańcuchu dostaw podmiotów NIS2
const SUPPLY_CHAIN_SECTORS = new Set([
  'C11', 'C12', 'C13', 'C14', 'C15', 'C16', 'C17', 'C18', 'C19', // Przemysł lekki
  'C22', 'C23',                                                     // Guma, plastik, ceramika
  'C31', 'C32', 'C33',                                             // Meble, pozostała prod., naprawa
  'F41', 'F42', 'F43',                                             // Budownictwo
  'G45', 'G47',                                                    // Handel detaliczny i poj.
  'H53',                                                           // Poczta i kurierzy
  'I55', 'I56',                                                    // Zakwaterowanie, gastronomia
  'J58', 'J59', 'J60',                                             // Wydawnictwa, film, nadawanie
  'L68',                                                           // Nieruchomości
  'M69', 'M70', 'M71', 'M73', 'M74',                              // Usługi profesjonalne
  'N77', 'N78', 'N79', 'N80', 'N81', 'N82',                       // Usługi wsparcia biznesu
  'P85',                                                           // Edukacja
  'Q87', 'Q88',                                                    // Opieka społeczna
]);

export function getSectorRisk(naceCode: string): SectorRisk {
  if (!naceCode) return 'LOW';
  if (HIGH_SECTORS.has(naceCode)) return 'HIGH';
  if (MEDIUM_SECTORS.has(naceCode)) return 'MEDIUM';
  if (SUPPLY_CHAIN_SECTORS.has(naceCode)) return 'SUPPLY_CHAIN';
  return 'LOW';
}

// Opcje Q4 będące triggerem "łańcuch dostaw" → YELLOW
const Q4_SUPPLY_CHAIN = new Set([
  'banks', 'energy', 'large_corps', 'public_admin',
  'listed', 'it', 'food', 'pharma', 'transport', 'water',
]);

// --- Główna funkcja klasyfikacji ---
export function classifyNIS2(q1: string, q2: string, q3: string, q4: string[]): ResultKey {
  const largeFirm = q1 === '50_249' || q1 === '250plus';
  const highRevenue = q2 === '10_50m' || q2 === '50mplus';
  const sectorRisk = getSectorRisk(q3);
  const hasSupplyChainClients = q4.some(v => Q4_SUPPLY_CHAIN.has(v));

  // 🔴 RED: wszystkie 3 warunki (≥50 prac. + ≥10m EUR + sektor HIGH)
  if (largeFirm && highRevenue && sectorRisk === 'HIGH') return 'RED';

  // 🟠 ORANGE: przynajmniej 2 z 3 warunków (sektor HIGH lub MEDIUM)
  const isNIS2Sector = sectorRisk === 'HIGH' || sectorRisk === 'MEDIUM';
  const metCount = [largeFirm, highRevenue, isNIS2Sector].filter(Boolean).length;
  if (metCount >= 2) return 'ORANGE';

  // 🟡 YELLOW: sektor SUPPLY_CHAIN lub klienci z łańcucha dostaw
  if (sectorRisk === 'SUPPLY_CHAIN' || hasSupplyChainClients) return 'YELLOW';

  // 🟢 GREEN: żaden warunek nie pasuje
  return 'GREEN';
}

// Alias dla wstecznej kompatybilności z FormularzPage (onSubmit przekazuje q1,q2,q3,q4)
export function calculateTotalScore(_q1: string, _q2: string, _q3: string, _q4: string[]): number {
  return 0; // nie używane — zastąpione przez classifyNIS2
}
export function getResultKey(_score: number): ResultKey {
  return 'GREEN'; // nie używane — zastąpione przez classifyNIS2
}

// ============================================================
// WYNIKI — kolory i etykiety
// ============================================================

export const RESULT_BADGE_COLORS: Record<ResultKey, string> = {
  RED:    'bg-red-100 text-red-800 border-red-200',
  ORANGE: 'bg-orange-100 text-orange-800 border-orange-200',
  YELLOW: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  GREEN:  'bg-green-100 text-green-800 border-green-200',
};

export const RESULT_LABELS: Record<ResultKey, string> = {
  RED:    'Wysokie prawdopodobieństwo NIS2',
  ORANGE: 'Prawdopodobny obowiązek NIS2',
  YELLOW: 'Wymogi łańcucha dostaw (ISO 27001)',
  GREEN:  'Niskie ryzyko regulacyjne',
};
