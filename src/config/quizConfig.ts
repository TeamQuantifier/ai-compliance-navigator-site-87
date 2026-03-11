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
  pl: 'W świecie napięć geopolitycznych i rosnącej liczby cyberataków cyberbezpieczeństwo stało się warunkiem przetrwania biznesu, a nie jedynie kwestią techniczną.\n\nNaruszenie bezpieczeństwa oznacza dziś realne ryzyko strat finansowych, utraty reputacji oraz odpowiedzialności po stronie zarządu. Kluczowe znaczenie mają Dyrektywa NIS2 i norma ISO/IEC 27001, które wyznaczają ramy zarządzania ryzykiem oraz ochrony informacji.\n\nTo, czy regulacje dotyczą Cię bezpośrednio, zależy od wielkości firmy, branży oraz roli w łańcuchu dostaw.',
  en: 'In a world of geopolitical tensions and a growing number of cyberattacks, cybersecurity has become a prerequisite for business resilience, not merely a technical concern.\n\nA security breach now carries real risks: financial losses, reputational damage, and executive accountability. Two key reference points are the NIS2 Directive and the ISO/IEC 27001 standard, which define the framework for risk management and information security.\n\nWhether these requirements apply to you directly depends on your company\'s size, industry, and position within the supply chain.',
  cs: 'Ve světě geopolitických napětí a rostoucího počtu kyberútoků se kybernetická bezpečnost stala podmínkou přežití podniku, nikoli jen technickou záležitostí.\n\nNarušení bezpečnosti dnes znamená reálné riziko finančních ztrát, poškození reputace a odpovědnosti představenstva. Klíčový význam mají Směrnice NIS2 a norma ISO/IEC 27001, které stanovují rámce řízení rizik a ochrany informací.\n\nZda se na vás předpisy vztahují přímo, závisí na velikosti společnosti, odvětví a vztazích v dodavatelském řetězci.',
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
  { code: 'A01', label: { pl: 'A01 — Uprawy rolne', en: 'A01 — Crop production', cs: 'A01 — Pěstování plodin' } },
  { code: 'A02', label: { pl: 'A02 — Leśnictwo', en: 'A02 — Forestry', cs: 'A02 — Lesnictví' } },
  { code: 'A03', label: { pl: 'A03 — Rybołówstwo', en: 'A03 — Fishing', cs: 'A03 — Rybolov' } },
  { code: 'B05', label: { pl: 'B05 — Wydobycie węgla', en: 'B05 — Coal mining', cs: 'B05 — Těžba uhlí' } },
  { code: 'B06', label: { pl: 'B06 — Wydobycie ropy i gazu', en: 'B06 — Oil & gas', cs: 'B06 — Ropa a zemní plyn' } },
  { code: 'B07', label: { pl: 'B07 — Wydobycie rud metali', en: 'B07 — Metal ore mining', cs: 'B07 — Těžba kovových rud' } },
  { code: 'B08', label: { pl: 'B08 — Pozostałe górnictwo', en: 'B08 — Other mining', cs: 'B08 — Ostatní těžba' } },
  { code: 'B09', label: { pl: 'B09 — Usługi wspomagające górnictwo', en: 'B09 — Mining support', cs: 'B09 — Podpůrné těžební služby' } },
  { code: 'C10', label: { pl: 'C10 — Produkcja żywności', en: 'C10 — Food production', cs: 'C10 — Výroba potravin' } },
  { code: 'C11', label: { pl: 'C11 — Produkcja napojów', en: 'C11 — Beverages', cs: 'C11 — Výroba nápojů' } },
  { code: 'C12', label: { pl: 'C12 — Wyroby tytoniowe', en: 'C12 — Tobacco', cs: 'C12 — Tabákové výrobky' } },
  { code: 'C13', label: { pl: 'C13 — Tekstylia', en: 'C13 — Textiles', cs: 'C13 — Textil' } },
  { code: 'C14', label: { pl: 'C14 — Odzież', en: 'C14 — Clothing', cs: 'C14 — Oděvy' } },
  { code: 'C15', label: { pl: 'C15 — Skóry', en: 'C15 — Leather', cs: 'C15 — Kůže' } },
  { code: 'C16', label: { pl: 'C16 — Drewno', en: 'C16 — Wood', cs: 'C16 — Dřevo' } },
  { code: 'C17', label: { pl: 'C17 — Papier', en: 'C17 — Paper', cs: 'C17 — Papír' } },
  { code: 'C18', label: { pl: 'C18 — Poligrafia', en: 'C18 — Printing', cs: 'C18 — Polygrafie' } },
  { code: 'C19', label: { pl: 'C19 — Koks i produkty rafinacji', en: 'C19 — Coke & refinery', cs: 'C19 — Koks a rafinace' } },
  { code: 'C20', label: { pl: 'C20 — Chemikalia', en: 'C20 — Chemicals', cs: 'C20 — Chemikálie' } },
  { code: 'C21', label: { pl: 'C21 — Farmaceutyki', en: 'C21 — Pharmaceuticals', cs: 'C21 — Farmaceutika' } },
  { code: 'C22', label: { pl: 'C22 — Wyroby z gumy i plastiku', en: 'C22 — Rubber & plastic', cs: 'C22 — Guma a plasty' } },
  { code: 'C23', label: { pl: 'C23 — Wyroby z surowców niemetalicznych', en: 'C23 — Non-metallic minerals', cs: 'C23 — Nekovové minerály' } },
  { code: 'C24', label: { pl: 'C24 — Metale', en: 'C24 — Metals', cs: 'C24 — Kovy' } },
  { code: 'C25', label: { pl: 'C25 — Metalowe wyroby gotowe', en: 'C25 — Fabricated metals', cs: 'C25 — Kovové výrobky' } },
  { code: 'C26', label: { pl: 'C26 — Komputery, elektronika', en: 'C26 — Computers & electronics', cs: 'C26 — Počítače a elektronika' } },
  { code: 'C27', label: { pl: 'C27 — Urządzenia elektryczne', en: 'C27 — Electrical equipment', cs: 'C27 — Elektrická zařízení' } },
  { code: 'C28', label: { pl: 'C28 — Maszyny', en: 'C28 — Machinery', cs: 'C28 — Strojírenství' } },
  { code: 'C29', label: { pl: 'C29 — Pojazdy samochodowe', en: 'C29 — Motor vehicles', cs: 'C29 — Motorová vozidla' } },
  { code: 'C30', label: { pl: 'C30 — Pozostały sprzęt transportowy', en: 'C30 — Other transport', cs: 'C30 — Ostatní dopravní prostředky' } },
  { code: 'C31', label: { pl: 'C31 — Meble', en: 'C31 — Furniture', cs: 'C31 — Nábytek' } },
  { code: 'C32', label: { pl: 'C32 — Pozostała produkcja', en: 'C32 — Other manufacturing', cs: 'C32 — Ostatní výroba' } },
  { code: 'C33', label: { pl: 'C33 — Naprawa i instalacja maszyn', en: 'C33 — Machinery repair', cs: 'C33 — Opravy strojů' } },
  { code: 'D35', label: { pl: 'D35 — Wytwarzanie i dostawy energii', en: 'D35 — Energy supply', cs: 'D35 — Výroba a dodávky energie' } },
  { code: 'E36', label: { pl: 'E36 — Pobór i uzdatnianie wody', en: 'E36 — Water supply', cs: 'E36 — Zásobování vodou' } },
  { code: 'E37', label: { pl: 'E37 — Odprowadzanie ścieków', en: 'E37 — Sewerage', cs: 'E37 — Odvádění odpadních vod' } },
  { code: 'E38', label: { pl: 'E38 — Gospodarka odpadami', en: 'E38 — Waste management', cs: 'E38 — Nakládání s odpady' } },
  { code: 'E39', label: { pl: 'E39 — Rekultywacja', en: 'E39 — Remediation', cs: 'E39 — Rekultivace' } },
  { code: 'F41', label: { pl: 'F41 — Budownictwo budynków', en: 'F41 — Building construction', cs: 'F41 — Výstavba budov' } },
  { code: 'F42', label: { pl: 'F42 — Inżynieria lądowa', en: 'F42 — Civil engineering', cs: 'F42 — Pozemní stavitelství' } },
  { code: 'F43', label: { pl: 'F43 — Roboty specjalistyczne', en: 'F43 — Specialised construction', cs: 'F43 — Specializované stavební práce' } },
  { code: 'G45', label: { pl: 'G45 — Handel pojazdami', en: 'G45 — Motor vehicle trade', cs: 'G45 — Obchod s vozidly' } },
  { code: 'G46', label: { pl: 'G46 — Handel hurtowy', en: 'G46 — Wholesale', cs: 'G46 — Velkoobchod' } },
  { code: 'G47', label: { pl: 'G47 — Handel detaliczny', en: 'G47 — Retail', cs: 'G47 — Maloobchod' } },
  { code: 'H49', label: { pl: 'H49 — Transport lądowy', en: 'H49 — Land transport', cs: 'H49 — Pozemní doprava' } },
  { code: 'H50', label: { pl: 'H50 — Transport wodny', en: 'H50 — Water transport', cs: 'H50 — Vodní doprava' } },
  { code: 'H51', label: { pl: 'H51 — Transport lotniczy', en: 'H51 — Air transport', cs: 'H51 — Letecká doprava' } },
  { code: 'H52', label: { pl: 'H52 — Magazynowanie', en: 'H52 — Warehousing', cs: 'H52 — Skladování' } },
  { code: 'H53', label: { pl: 'H53 — Poczta i kurierzy', en: 'H53 — Postal & courier', cs: 'H53 — Pošta a kurýři' } },
  { code: 'I55', label: { pl: 'I55 — Zakwaterowanie', en: 'I55 — Accommodation', cs: 'I55 — Ubytování' } },
  { code: 'I56', label: { pl: 'I56 — Gastronomia', en: 'I56 — Food service', cs: 'I56 — Stravování' } },
  { code: 'J58', label: { pl: 'J58 — Wydawnictwa', en: 'J58 — Publishing', cs: 'J58 — Vydavatelství' } },
  { code: 'J59', label: { pl: 'J59 — Produkcja filmowa', en: 'J59 — Film production', cs: 'J59 — Filmová výroba' } },
  { code: 'J60', label: { pl: 'J60 — Nadawanie programów', en: 'J60 — Broadcasting', cs: 'J60 — Vysílání' } },
  { code: 'J61', label: { pl: 'J61 — Telekomunikacja', en: 'J61 — Telecommunications', cs: 'J61 — Telekomunikace' } },
  { code: 'J62', label: { pl: 'J62 — IT i oprogramowanie', en: 'J62 — IT & software', cs: 'J62 — IT a software' } },
  { code: 'J63', label: { pl: 'J63 — Przetwarzanie danych / hosting', en: 'J63 — Data processing & hosting', cs: 'J63 — Zpracování dat a hosting' } },
  { code: 'K64', label: { pl: 'K64 — Usługi finansowe', en: 'K64 — Financial services', cs: 'K64 — Finanční služby' } },
  { code: 'K65', label: { pl: 'K65 — Ubezpieczenia', en: 'K65 — Insurance', cs: 'K65 — Pojišťovnictví' } },
  { code: 'K66', label: { pl: 'K66 — Działalność wspomagająca finanse', en: 'K66 — Finance support', cs: 'K66 — Podpůrné finanční činnosti' } },
  { code: 'L68', label: { pl: 'L68 — Nieruchomości', en: 'L68 — Real estate', cs: 'L68 — Nemovitosti' } },
  { code: 'M69', label: { pl: 'M69 — Usługi prawne / księgowe', en: 'M69 — Legal & accounting', cs: 'M69 — Právní a účetní služby' } },
  { code: 'M70', label: { pl: 'M70 — Doradztwo', en: 'M70 — Consulting', cs: 'M70 — Poradenství' } },
  { code: 'M71', label: { pl: 'M71 — Architektura / inżynieria', en: 'M71 — Architecture & engineering', cs: 'M71 — Architektura a inženýrství' } },
  { code: 'M72', label: { pl: 'M72 — Badania naukowe', en: 'M72 — R&D', cs: 'M72 — Výzkum a vývoj' } },
  { code: 'M73', label: { pl: 'M73 — Reklama', en: 'M73 — Advertising', cs: 'M73 — Reklama' } },
  { code: 'M74', label: { pl: 'M74 — Pozostała działalność profesjonalna', en: 'M74 — Other professional', cs: 'M74 — Ostatní profesionální činnosti' } },
  { code: 'N77', label: { pl: 'N77 — Wynajem', en: 'N77 — Rental', cs: 'N77 — Pronájem' } },
  { code: 'N78', label: { pl: 'N78 — Rekrutacja', en: 'N78 — Recruitment', cs: 'N78 — Nábor' } },
  { code: 'N79', label: { pl: 'N79 — Turystyka', en: 'N79 — Travel', cs: 'N79 — Cestovní ruch' } },
  { code: 'N80', label: { pl: 'N80 — Usługi ochrony', en: 'N80 — Security', cs: 'N80 — Bezpečnostní služby' } },
  { code: 'N81', label: { pl: 'N81 — Utrzymanie obiektów', en: 'N81 — Facility management', cs: 'N81 — Správa budov' } },
  { code: 'N82', label: { pl: 'N82 — Administracyjne wsparcie', en: 'N82 — Admin support', cs: 'N82 — Administrativní podpora' } },
  { code: 'O84', label: { pl: 'O84 — Administracja publiczna', en: 'O84 — Public administration', cs: 'O84 — Veřejná správa' } },
  { code: 'P85', label: { pl: 'P85 — Edukacja', en: 'P85 — Education', cs: 'P85 — Vzdělávání' } },
  { code: 'Q86', label: { pl: 'Q86 — Opieka zdrowotna', en: 'Q86 — Healthcare', cs: 'Q86 — Zdravotní péče' } },
  { code: 'Q87', label: { pl: 'Q87 — Opieka z zakwaterowaniem', en: 'Q87 — Residential care', cs: 'Q87 — Rezidenční péče' } },
  { code: 'Q88', label: { pl: 'Q88 — Pomoc społeczna', en: 'Q88 — Social work', cs: 'Q88 — Sociální práce' } },
  { code: 'R90', label: { pl: 'R90 — Działalność twórcza', en: 'R90 — Creative activities', cs: 'R90 — Tvůrčí činnosti' } },
  { code: 'R91', label: { pl: 'R91 — Biblioteki / muzea', en: 'R91 — Libraries & museums', cs: 'R91 — Knihovny a muzea' } },
  { code: 'R92', label: { pl: 'R92 — Gry losowe', en: 'R92 — Gambling', cs: 'R92 — Hazardní hry' } },
  { code: 'R93', label: { pl: 'R93 — Sport', en: 'R93 — Sports', cs: 'R93 — Sport' } },
  { code: 'S94', label: { pl: 'S94 — Organizacje członkowskie', en: 'S94 — Membership organisations', cs: 'S94 — Členské organizace' } },
  { code: 'S95', label: { pl: 'S95 — Naprawa komputerów', en: 'S95 — Computer repair', cs: 'S95 — Opravy počítačů' } },
  { code: 'S96', label: { pl: 'S96 — Usługi osobiste', en: 'S96 — Personal services', cs: 'S96 — Osobní služby' } },
  { code: 'T97', label: { pl: 'T97 — Gospodarstwa domowe (pracodawcy)', en: 'T97 — Households as employers', cs: 'T97 — Domácnosti jako zaměstnavatelé' } },
  { code: 'T98', label: { pl: 'T98 — Produkcja na potrzeby własne', en: 'T98 — Own-use production', cs: 'T98 — Výroba pro vlastní potřebu' } },
  { code: 'U99', label: { pl: 'U99 — Organizacje międzynarodowe', en: 'U99 — International organisations', cs: 'U99 — Mezinárodní organizace' } },
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
  pl: 'Umów demo',
  en: 'Book a demo',
  cs: 'Domluvit demo',
};
export const CTA_SECONDARY_LABEL: Record<QuizLang, string> = {
  pl: 'Dowiedz się więcej o Quantifier',
  en: 'Learn more about Quantifier',
  cs: 'Zjistěte více o Quantifier',
};
export const RETRY_LABEL: Record<QuizLang, string> = {
  pl: 'Wypełnij ponownie',
  en: 'Try again',
  cs: 'Vyplnit znovu',
};
export const NIS2_BLOG_LABEL: Record<QuizLang, string> = {
  pl: 'Dowiedz się czym jest NIS2',
  en: 'Learn what NIS2 is',
  cs: 'Zjistěte, co je NIS2',
};
export const WEBINAR_CTA_LABEL: Record<QuizLang, string> = {
  pl: 'Chcesz dowiedzieć się więcej o NIS2? Zapisz się na webinar',
  en: 'Want to learn more about NIS2? Sign up for a webinar',
  cs: 'Chcete se dozvědět více o NIS2? Přihlaste se na webinář',
};
export const WEBINAR_CTA_BUTTON: Record<QuizLang, string> = {
  pl: 'Zobacz webinary',
  en: 'View webinars',
  cs: 'Zobrazit webináře',
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
