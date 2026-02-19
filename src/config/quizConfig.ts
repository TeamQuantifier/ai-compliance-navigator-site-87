// ============================================================
// KONFIGURACJA QUIZU NIS2 — MULTILANG
// ============================================================

export type QuizLang = 'pl' | 'en' | 'cs';

// ─── Titles & Subtitles ────────────────────────────────────────
export const QUIZ_TITLE: Record<QuizLang, string> = {
  pl: 'Czy Twoja firma powinna pilnie zająć się cyberbezpieczeństwem?',
  en: 'Does your company urgently need to address cybersecurity?',
  cs: 'Potřebuje vaše společnost naléhavě řešit kybernetickou bezpečnost?',
};

export const QUIZ_INTRO: Record<QuizLang, string> = {
  pl: 'W świecie napięć geopolitycznych i rosnącej liczby cyberataków cyberbezpieczeństwo stało się warunkiem przetrwania biznesu, a nie jedynie kwestią techniczną. Naruszenie bezpieczeństwa oznacza dziś realne ryzyko strat finansowych, utraty reputacji i odpowiedzialności zarządu. Kluczowe znaczenie mają Dyrektywa NIS2 oraz ISO 27001, które wyznaczają ramy zarządzania ryzykiem i ochrony informacji. To, czy regulacje dotyczą Cię bezpośrednio, zależy od wielkości firmy, sektora i relacji w łańcuchu dostaw.',
  en: "In a world of geopolitical tensions and a growing number of cyberattacks, cybersecurity has become a condition for business survival — not merely a technical issue. A security breach today means real risk: financial losses, reputational damage, and board-level liability. The NIS2 Directive and ISO 27001 play a key role in defining risk management and information protection frameworks. Whether regulations apply to you directly depends on your company's size, sector, and supply chain relationships.",
  cs: 'Ve světě geopolitických napětí a rostoucího počtu kyberútoků se kybernetická bezpečnost stala podmínkou přežití podniku, nikoli jen technickou záležitostí. Narušení bezpečnosti dnes znamená reálné riziko finančních ztrát, poškození reputace a odpovědnosti představenstva. Klíčový význam mají Směrnice NIS2 a ISO 27001, které stanovují rámce řízení rizik a ochrany informací. Zda se na vás předpisy vztahují přímo, závisí na velikosti společnosti, odvětví a vztazích v dodavatelském řetězci.',
};

export const QUIZ_SUBTITLE: Record<QuizLang, string> = {
  pl: 'Odpowiedz na 4 pytania i sprawdź, czy dyrektywa NIS2 dotyczy Twojej firmy.',
  en: 'Answer 4 questions and find out whether the NIS2 Directive applies to your company.',
  cs: 'Odpovězte na 4 otázky a zjistěte, zda se na vaši společnost vztahuje směrnice NIS2.',
};

// ─── Q1 — Employees ────────────────────────────────────────────
export const Q1_QUESTION: Record<QuizLang, string> = {
  pl: 'Ilu pracowników zatrudnia firma?',
  en: 'How many employees does the company have?',
  cs: 'Kolik zaměstnanců má společnost?',
};

export const Q1_OPTIONS = [
  { value: 'lt10',    label: { pl: 'poniżej 10',  en: 'fewer than 10', cs: 'méně než 10' } },
  { value: '10_49',   label: { pl: '10–49',        en: '10–49',         cs: '10–49' } },
  { value: '50_249',  label: { pl: '50–249',       en: '50–249',        cs: '50–249' } },
  { value: '250plus', label: { pl: '250+',          en: '250+',          cs: '250+' } },
] as const;

// ─── Q2 — Revenue ──────────────────────────────────────────────
export const Q2_QUESTION: Record<QuizLang, string> = {
  pl: 'Roczny obrót firmy (w EUR)?',
  en: 'Annual company turnover (in EUR)?',
  cs: 'Roční obrat společnosti (v EUR)?',
};

export const Q2_OPTIONS = [
  { value: 'lt2m',    label: { pl: 'poniżej 2 mln',  en: 'below €2M',      cs: 'pod 2 mil.' } },
  { value: '2_10m',   label: { pl: '2–10 mln',        en: '€2M–€10M',       cs: '2–10 mil.' } },
  { value: '10_50m',  label: { pl: '10–50 mln',       en: '€10M–€50M',      cs: '10–50 mil.' } },
  { value: '50mplus', label: { pl: '50 mln+',          en: '€50M+',           cs: '50 mil.+' } },
] as const;

// ─── Q3 — NACE sector ──────────────────────────────────────────
export const Q3_QUESTION: Record<QuizLang, string> = {
  pl: 'W jakim sektorze działa firma? (po kodach NACE, wskaż najbardziej pasujące)',
  en: 'In which sector does the company operate? (by NACE code, select the closest match)',
  cs: 'V jakém odvětví společnost působí? (dle kódů NACE, vyberte nejbližší shodu)',
};

export const Q3_PLACEHOLDER: Record<QuizLang, string> = {
  pl: 'Wpisz lub wybierz sektor…',
  en: 'Type or select a sector…',
  cs: 'Napište nebo vyberte odvětví…',
};

export const Q3_SEARCH_PLACEHOLDER: Record<QuizLang, string> = {
  pl: 'Szukaj po kodzie lub nazwie…',
  en: 'Search by code or name…',
  cs: 'Hledat podle kódu nebo názvu…',
};

export const NACE_SECTORS = [
  { code: 'A01', label: 'A01 — Uprawy rolne / Crop production / Pěstování plodin' },
  { code: 'A02', label: 'A02 — Leśnictwo / Forestry / Lesnictví' },
  { code: 'A03', label: 'A03 — Rybołówstwo / Fishing / Rybolov' },
  { code: 'B05', label: 'B05 — Wydobycie węgla / Coal mining / Těžba uhlí' },
  { code: 'B06', label: 'B06 — Wydobycie ropy i gazu / Oil & gas / Ropa a zemní plyn' },
  { code: 'B07', label: 'B07 — Wydobycie rud metali / Metal ore mining / Těžba kovových rud' },
  { code: 'B08', label: 'B08 — Pozostałe górnictwo / Other mining / Ostatní těžba' },
  { code: 'B09', label: 'B09 — Usługi wspomagające górnictwo / Mining support / Podpůrné těžební služby' },
  { code: 'C10', label: 'C10 — Produkcja żywności / Food production / Výroba potravin' },
  { code: 'C11', label: 'C11 — Produkcja napojów / Beverages / Výroba nápojů' },
  { code: 'C12', label: 'C12 — Wyroby tytoniowe / Tobacco / Tabákové výrobky' },
  { code: 'C13', label: 'C13 — Tekstylia / Textiles / Textil' },
  { code: 'C14', label: 'C14 — Odzież / Clothing / Oděvy' },
  { code: 'C15', label: 'C15 — Skóry / Leather / Kůže' },
  { code: 'C16', label: 'C16 — Drewno / Wood / Dřevo' },
  { code: 'C17', label: 'C17 — Papier / Paper / Papír' },
  { code: 'C18', label: 'C18 — Poligrafia / Printing / Polygrafie' },
  { code: 'C19', label: 'C19 — Koks i produkty rafinacji / Coke & refinery / Koks a rafinace' },
  { code: 'C20', label: 'C20 — Chemikalia / Chemicals / Chemikálie' },
  { code: 'C21', label: 'C21 — Farmaceutyki / Pharmaceuticals / Farmaceutika' },
  { code: 'C22', label: 'C22 — Wyroby z gumy i plastiku / Rubber & plastic / Guma a plasty' },
  { code: 'C23', label: 'C23 — Wyroby z surowców niemetalicznych / Non-metallic minerals / Nekovové minerály' },
  { code: 'C24', label: 'C24 — Metale / Metals / Kovy' },
  { code: 'C25', label: 'C25 — Metalowe wyroby gotowe / Fabricated metals / Kovové výrobky' },
  { code: 'C26', label: 'C26 — Komputery, elektronika / Computers & electronics / Počítače a elektronika' },
  { code: 'C27', label: 'C27 — Urządzenia elektryczne / Electrical equipment / Elektrická zařízení' },
  { code: 'C28', label: 'C28 — Maszyny / Machinery / Strojírenství' },
  { code: 'C29', label: 'C29 — Pojazdy samochodowe / Motor vehicles / Motorová vozidla' },
  { code: 'C30', label: 'C30 — Pozostały sprzęt transportowy / Other transport / Ostatní dopravní prostředky' },
  { code: 'C31', label: 'C31 — Meble / Furniture / Nábytek' },
  { code: 'C32', label: 'C32 — Pozostała produkcja / Other manufacturing / Ostatní výroba' },
  { code: 'C33', label: 'C33 — Naprawa i instalacja maszyn / Machinery repair / Opravy strojů' },
  { code: 'D35', label: 'D35 — Wytwarzanie i dostawy energii / Energy supply / Výroba a dodávky energie' },
  { code: 'E36', label: 'E36 — Pobór i uzdatnianie wody / Water supply / Zásobování vodou' },
  { code: 'E37', label: 'E37 — Odprowadzanie ścieków / Sewerage / Odvádění odpadních vod' },
  { code: 'E38', label: 'E38 — Gospodarka odpadami / Waste management / Nakládání s odpady' },
  { code: 'E39', label: 'E39 — Rekultywacja / Remediation / Rekultivace' },
  { code: 'F41', label: 'F41 — Budownictwo budynków / Building construction / Výstavba budov' },
  { code: 'F42', label: 'F42 — Inżynieria lądowa / Civil engineering / Pozemní stavitelství' },
  { code: 'F43', label: 'F43 — Roboty specjalistyczne / Specialised construction / Specializované stavební práce' },
  { code: 'G45', label: 'G45 — Handel pojazdami / Motor vehicle trade / Obchod s vozidly' },
  { code: 'G46', label: 'G46 — Handel hurtowy / Wholesale / Velkoobchod' },
  { code: 'G47', label: 'G47 — Handel detaliczny / Retail / Maloobchod' },
  { code: 'H49', label: 'H49 — Transport lądowy / Land transport / Pozemní doprava' },
  { code: 'H50', label: 'H50 — Transport wodny / Water transport / Vodní doprava' },
  { code: 'H51', label: 'H51 — Transport lotniczy / Air transport / Letecká doprava' },
  { code: 'H52', label: 'H52 — Magazynowanie / Warehousing / Skladování' },
  { code: 'H53', label: 'H53 — Poczta i kurierzy / Postal & courier / Pošta a kurýři' },
  { code: 'I55', label: 'I55 — Zakwaterowanie / Accommodation / Ubytování' },
  { code: 'I56', label: 'I56 — Gastronomia / Food service / Stravování' },
  { code: 'J58', label: 'J58 — Wydawnictwa / Publishing / Vydavatelství' },
  { code: 'J59', label: 'J59 — Produkcja filmowa / Film production / Filmová výroba' },
  { code: 'J60', label: 'J60 — Nadawanie programów / Broadcasting / Vysílání' },
  { code: 'J61', label: 'J61 — Telekomunikacja / Telecommunications / Telekomunikace' },
  { code: 'J62', label: 'J62 — IT i oprogramowanie / IT & software / IT a software' },
  { code: 'J63', label: 'J63 — Przetwarzanie danych / hosting / Data processing & hosting / Zpracování dat a hosting' },
  { code: 'K64', label: 'K64 — Usługi finansowe / Financial services / Finanční služby' },
  { code: 'K65', label: 'K65 — Ubezpieczenia / Insurance / Pojišťovnictví' },
  { code: 'K66', label: 'K66 — Działalność wspomagająca finanse / Finance support / Podpůrné finanční činnosti' },
  { code: 'L68', label: 'L68 — Nieruchomości / Real estate / Nemovitosti' },
  { code: 'M69', label: 'M69 — Usługi prawne / księgowe / Legal & accounting / Právní a účetní služby' },
  { code: 'M70', label: 'M70 — Doradztwo / Consulting / Poradenství' },
  { code: 'M71', label: 'M71 — Architektura / inżynieria / Architecture & engineering / Architektura a inženýrství' },
  { code: 'M72', label: 'M72 — Badania naukowe / R&D / Výzkum a vývoj' },
  { code: 'M73', label: 'M73 — Reklama / Advertising / Reklama' },
  { code: 'M74', label: 'M74 — Pozostała działalność profesjonalna / Other professional / Ostatní profesionální činnosti' },
  { code: 'N77', label: 'N77 — Wynajem / Rental / Pronájem' },
  { code: 'N78', label: 'N78 — Rekrutacja / Recruitment / Nábor' },
  { code: 'N79', label: 'N79 — Turystyka / Travel / Cestovní ruch' },
  { code: 'N80', label: 'N80 — Usługi ochrony / Security / Bezpečnostní služby' },
  { code: 'N81', label: 'N81 — Utrzymanie obiektów / Facility management / Správa budov' },
  { code: 'N82', label: 'N82 — Administracyjne wsparcie / Admin support / Administrativní podpora' },
  { code: 'O84', label: 'O84 — Administracja publiczna / Public administration / Veřejná správa' },
  { code: 'P85', label: 'P85 — Edukacja / Education / Vzdělávání' },
  { code: 'Q86', label: 'Q86 — Opieka zdrowotna / Healthcare / Zdravotní péče' },
  { code: 'Q87', label: 'Q87 — Opieka z zakwaterowaniem / Residential care / Rezidenční péče' },
  { code: 'Q88', label: 'Q88 — Pomoc społeczna / Social work / Sociální práce' },
  { code: 'R90', label: 'R90 — Działalność twórcza / Creative activities / Tvůrčí činnosti' },
  { code: 'R91', label: 'R91 — Biblioteki / muzea / Libraries & museums / Knihovny a muzea' },
  { code: 'R92', label: 'R92 — Gry losowe / Gambling / Hazardní hry' },
  { code: 'R93', label: 'R93 — Sport / Sports / Sport' },
  { code: 'S94', label: 'S94 — Organizacje członkowskie / Membership organisations / Členské organizace' },
  { code: 'S95', label: 'S95 — Naprawa komputerów / Computer repair / Opravy počítačů' },
  { code: 'S96', label: 'S96 — Usługi osobiste / Personal services / Osobní služby' },
  { code: 'T97', label: 'T97 — Gospodarstwa domowe (pracodawcy) / Households as employers / Domácnosti jako zaměstnavatelé' },
  { code: 'T98', label: 'T98 — Produkcja na potrzeby własne / Own-use production / Výroba pro vlastní potřebu' },
  { code: 'U99', label: 'U99 — Organizacje międzynarodowe / International organisations / Mezinárodní organizace' },
] as const;

// ─── Q4 — Customer types ───────────────────────────────────────
export const Q4_QUESTION: Record<QuizLang, string> = {
  pl: 'Z jakimi klientami współpracuje Twoja firma?',
  en: 'What types of clients does your company work with?',
  cs: 'S jakými klienty vaše společnost spolupracuje?',
};

export const Q4_HINT: Record<QuizLang, string> = {
  pl: 'Zaznacz wszystkie pasujące opcje',
  en: 'Select all that apply',
  cs: 'Vyberte vše, co platí',
};

export const Q4_OPTIONS = [
  { value: 'banks',        label: { pl: 'Banki i instytucje finansowe',                              en: 'Banks and financial institutions',                           cs: 'Banky a finanční instituce' } },
  { value: 'energy',       label: { pl: 'Energetyka',                                                en: 'Energy sector',                                              cs: 'Energetika' } },
  { value: 'large_corps',  label: { pl: 'Duże korporacje (250+ pracowników)',                        en: 'Large corporations (250+ employees)',                         cs: 'Velké korporace (250+ zaměstnanců)' } },
  { value: 'public_admin', label: { pl: 'Administracja publiczna i organizacje międzynarodowe',      en: 'Public administration and international organisations',       cs: 'Veřejná správa a mezinárodní organizace' } },
  { value: 'listed',       label: { pl: 'Spółki notowane',                                          en: 'Listed companies',                                           cs: 'Kotované společnosti' } },
  { value: 'it',           label: { pl: 'Firmy IT',                                                 en: 'IT companies',                                               cs: 'IT společnosti' } },
  { value: 'food',         label: { pl: 'Firmy produkujące żywność',                                en: 'Food production companies',                                  cs: 'Potravinářské společnosti' } },
  { value: 'pharma',       label: { pl: 'Firmy z branży chemicznej i farmaceutycznej',              en: 'Chemical and pharmaceutical companies',                       cs: 'Chemické a farmaceutické společnosti' } },
  { value: 'transport',    label: { pl: 'Transport',                                                en: 'Transport',                                                  cs: 'Doprava' } },
  { value: 'water',        label: { pl: 'Gospodarka wodna, ścieki lub odpady',                      en: 'Water management, sewerage or waste',                        cs: 'Vodní hospodářství, kanalizace nebo odpady' } },
  { value: 'sme',          label: { pl: 'Małe i średnie przedsiębiorstwa',                          en: 'Small and medium-sized enterprises',                          cs: 'Malé a střední podniky' } },
  { value: 'b2c',          label: { pl: 'Klienci indywidualni (B2C)',                               en: 'Individual customers (B2C)',                                  cs: 'Individuální zákazníci (B2C)' } },
] as const;

// ─── Email label ───────────────────────────────────────────────
export const EMAIL_LABEL: Record<QuizLang, string> = {
  pl: 'Adres email',
  en: 'Email address',
  cs: 'E-mailová adresa',
};
export const EMAIL_PLACEHOLDER: Record<QuizLang, string> = {
  pl: 'nazwa@firma.pl',
  en: 'name@company.com',
  cs: 'jmeno@firma.cz',
};
export const EMAIL_PRIVACY_NOTE: Record<QuizLang, string> = {
  pl: 'Twój email służy wyłącznie do dostarczenia wyniku. Przetwarzamy dane zgodnie z',
  en: 'Your email is used solely to deliver the result. We process data in accordance with our',
  cs: 'Váš e-mail slouží výhradně k doručení výsledku. Data zpracováváme v souladu s',
};
export const PRIVACY_LINK_LABEL: Record<QuizLang, string> = {
  pl: 'Polityką Prywatności',
  en: 'Privacy Policy',
  cs: 'Zásadami ochrany osobních údajů',
};
export const GDPR_CONSENT: Record<QuizLang, string> = {
  pl: 'Wyrażam zgodę na przetwarzanie mojego adresu email przez Quantifier sp. z o.o. w celu otrzymania wyniku quizu NIS2. Administratorem danych jest Quantifier sp. z o.o. Szczegóły w',
  en: 'I consent to the processing of my email address by Quantifier sp. z o.o. for the purpose of receiving the NIS2 quiz result. Data controller: Quantifier sp. z o.o. Details in the',
  cs: 'Souhlasím se zpracováním mé e-mailové adresy společností Quantifier sp. z o.o. za účelem obdržení výsledku kvízu NIS2. Správce dat: Quantifier sp. z o.o. Podrobnosti v',
};
export const SUBMIT_LABEL: Record<QuizLang, string> = {
  pl: 'Sprawdź, czy dotyczy Cię NIS2 →',
  en: 'Check whether NIS2 applies to you →',
  cs: 'Zjistěte, zda se na vás NIS2 vztahuje →',
};
export const SUBMITTING_LABEL: Record<QuizLang, string> = {
  pl: 'Sprawdzam…',
  en: 'Checking…',
  cs: 'Kontroluji…',
};
export const RESULT_RISK_LABEL: Record<QuizLang, string> = {
  pl: 'Poziom ryzyka:',
  en: 'Risk level:',
  cs: 'Úroveň rizika:',
};
export const CTA_LINK_LABEL: Record<QuizLang, string> = {
  pl: 'Dowiedz się więcej o Quantifier',
  en: 'Learn more about Quantifier',
  cs: 'Zjistěte více o Quantifier',
};
export const RETRY_LABEL: Record<QuizLang, string> = {
  pl: 'Wypełnij ponownie',
  en: 'Try again',
  cs: 'Vyplnit znovu',
};

// ─── Validation messages ───────────────────────────────────────
export const VALIDATION: Record<QuizLang, { email: string; required: string; q4: string; gdpr: string }> = {
  pl: { email: 'Podaj prawidłowy adres email', required: 'Wybierz odpowiedź', q4: 'Wybierz co najmniej jedną opcję lub zaznacz "Klienci indywidualni (B2C)"', gdpr: 'Zgoda jest wymagana' },
  en: { email: 'Please enter a valid email address', required: 'Please select an answer', q4: 'Select at least one option or choose "Individual customers (B2C)"', gdpr: 'Consent is required' },
  cs: { email: 'Zadejte platnou e-mailovou adresu', required: 'Vyberte odpověď', q4: 'Vyberte alespoň jednu možnost nebo zvolte „Individuální zákazníci (B2C)"', gdpr: 'Souhlas je vyžadován' },
};

// ─── Error messages ────────────────────────────────────────────
export const ERROR_FETCH_TEMPLATE: Record<QuizLang, string> = {
  pl: 'Nie udało się pobrać opisu wyniku.',
  en: 'Could not retrieve the result description.',
  cs: 'Nepodařilo se načíst popis výsledku.',
};
export const ERROR_INSERT: Record<QuizLang, string> = {
  pl: 'Nie udało się zapisać zgłoszenia. Spróbuj ponownie.',
  en: 'Could not save the submission. Please try again.',
  cs: 'Nepodařilo se uložit přihlášku. Zkuste to prosím znovu.',
};
export const ERROR_GENERIC: Record<QuizLang, string> = {
  pl: 'Wystąpił nieoczekiwany błąd.',
  en: 'An unexpected error occurred.',
  cs: 'Došlo k neočekávané chybě.',
};
export const LOADING_LABEL: Record<QuizLang, string> = {
  pl: 'Ładowanie…',
  en: 'Loading…',
  cs: 'Načítání…',
};
export const NO_RESULTS_LABEL: Record<QuizLang, string> = {
  pl: 'Brak wyników',
  en: 'No results',
  cs: 'Žádné výsledky',
};

// ============================================================
// CLASSIFICATION LOGIC (language-independent)
// ============================================================

export type ResultKey = 'RED' | 'ORANGE' | 'YELLOW' | 'GREEN';

type SectorRisk = 'HIGH' | 'MEDIUM' | 'SUPPLY_CHAIN' | 'LOW';

const HIGH_SECTORS = new Set([
  'D35', 'H49', 'H50', 'H51', 'H52', 'K64', 'K65', 'Q86',
  'E36', 'E37', 'E38', 'J61', 'J62', 'J63', 'O84', 'U99',
]);

const MEDIUM_SECTORS = new Set([
  'C21', 'C24', 'C25', 'C26', 'C27', 'C28', 'C29', 'C30',
  'G46', 'M72', 'K66', 'C20', 'C10', 'E39',
]);

const SUPPLY_CHAIN_SECTORS = new Set([
  'C11', 'C12', 'C13', 'C14', 'C15', 'C16', 'C17', 'C18', 'C19',
  'C22', 'C23', 'C31', 'C32', 'C33',
  'F41', 'F42', 'F43', 'G45', 'G47', 'H53',
  'I55', 'I56', 'J58', 'J59', 'J60', 'L68',
  'M69', 'M70', 'M71', 'M73', 'M74',
  'N77', 'N78', 'N79', 'N80', 'N81', 'N82',
  'P85', 'Q87', 'Q88',
]);

export function getSectorRisk(naceCode: string): SectorRisk {
  if (!naceCode) return 'LOW';
  if (HIGH_SECTORS.has(naceCode)) return 'HIGH';
  if (MEDIUM_SECTORS.has(naceCode)) return 'MEDIUM';
  if (SUPPLY_CHAIN_SECTORS.has(naceCode)) return 'SUPPLY_CHAIN';
  return 'LOW';
}

const Q4_SUPPLY_CHAIN = new Set([
  'banks', 'energy', 'large_corps', 'public_admin',
  'listed', 'it', 'food', 'pharma', 'transport', 'water',
]);

export function classifyNIS2(q1: string, q2: string, q3: string, q4: string[]): ResultKey {
  const largeFirm = q1 === '50_249' || q1 === '250plus';
  const highRevenue = q2 === '10_50m' || q2 === '50mplus';
  const sectorRisk = getSectorRisk(q3);
  const hasSupplyChainClients = q4.some(v => Q4_SUPPLY_CHAIN.has(v));

  if (largeFirm && highRevenue && sectorRisk === 'HIGH') return 'RED';
  const isNIS2Sector = sectorRisk === 'HIGH' || sectorRisk === 'MEDIUM';
  const metCount = [largeFirm, highRevenue, isNIS2Sector].filter(Boolean).length;
  if (metCount >= 2) return 'ORANGE';
  if (sectorRisk === 'SUPPLY_CHAIN' || hasSupplyChainClients) return 'YELLOW';
  return 'GREEN';
}

// Legacy (no longer used but kept for backward compat)
export function calculateTotalScore(_q1: string, _q2: string, _q3: string, _q4: string[]): number { return 0; }
export function getResultKey(_score: number): ResultKey { return 'GREEN'; }

// ─── Badge colors & labels ─────────────────────────────────────
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
