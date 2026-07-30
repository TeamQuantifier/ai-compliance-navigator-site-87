import { Helmet } from 'react-helmet-async';
import { useLanguage } from '@/contexts/LanguageContext';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { TrainingPromoFormInline } from '@/components/promo/TrainingPromoForm';
import PolicyPlatformMockup from '@/components/mockups/PolicyPlatformMockup';
import {
  Sparkles,
  AlertTriangle,
  UserCheck,
  FileCheck,
  Target,
  Briefcase,
  ShieldCheck,
  Cpu,
  Truck,
  Calendar,
  Clock,
  Map,
  BookOpen,
  Building2,
  Scale,
  Gavel,
  ClipboardCheck,
  Wrench,
} from 'lucide-react';

type Locale = 'pl' | 'en' | 'cs';

const featuredLogos = [
  { src: '/featured/ministerstwo-cyfryzacji.png', alt: 'Ministerstwo Cyfryzacji', h: 'h-14 md:h-16' },
  { src: '/featured/ncc-pl.png', alt: 'NCC-PL – Krajowe Centrum Kompetencji Cyberbezpieczeństwa', h: 'h-14 md:h-16' },
  { src: '/featured/ai-chamber.png', alt: 'AI Chamber', h: 'h-10 md:h-12' },
  { src: '/featured/klaster-gospodarki-cyrkularnej.png', alt: 'Klaster Gospodarki Cyrkularnej i Recyklingu', h: 'h-12 md:h-14' },
  { src: '/featured/top-ai-driven-companies.png', alt: 'Top AI Driven Companies', h: 'h-12 md:h-14' },
];

type Copy = {
  metaTitle: string;
  metaDescription: string;
  deadlineRibbon: string;
  b2bChip: string;
  h1Part1: string;
  h1Highlight: string;
  h1Part2: string;
  heroLead: React.ReactNode;
  trustChips: string[];
  socialProof: React.ReactNode;
  formKicker: string;
  formTitle: string;
  formSub: string;

  problemsHeading: string;
  problems: { title: string; desc: string }[];

  effectsHeading: string;
  effectsSub: string;
  effects: { icon: any; title: string; desc: string }[];

  bonusChip: string;
  bonusHeading: string;
  bonusLead: string;
  bonusBullets: string[];

  audienceChip: string;
  audienceHeading: string;
  audience: { icon: any; title: string; desc: string }[];

  hostsChip: string;
  hostsHeading: string;
  hostsLead: string;
  hostChips: string[];
  trustedBy: string;

  faqHeading: string;
  faqs: { q: string; a: string }[];

  ctaChip: string;
  ctaHeading: string;
  ctaSub: string;
};

const COPY: Record<Locale, Copy> = {
  pl: {
    metaTitle: 'Szkolenie KSC / NIS2 dla firm – 60 minut dla zarządu i zespołu | Quantifier.ai',
    metaDescription:
      'Szkolenie dla firm z KSC / NIS2. Ustawa obowiązuje od 3 kwietnia 2026 r. Termin wpisu do Wykazu KSC mija 3 października. 60 minut dla zarządów, compliance i IT – bezpłatne.',
    deadlineRibbon: 'Deadline KSC: 3 października 2026',
    b2bChip: 'Szkolenie B2B · 60 minut · bezpłatne',
    h1Part1: 'Szkolenie z cyberbezpieczeństwa, które może ',
    h1Highlight: 'uratować Twoją firmę',
    h1Part2: ' przed karami KSC / Dyrektywy NIS2.',
    heroLead: (
      <>
        Ustawa obowiązuje od 3 kwietnia 2026 r. Do{' '}
        <strong className="text-white">3 października</strong> podmioty kluczowe i ważne muszą złożyć wniosek do Wykazu KSC. Pokażemy Państwu, co robić - konkretnie i po kolei.
      </>
    ),
    trustChips: ['60 minut, online', 'Materiały + checklisty', 'Dostęp DEMO platformy', 'Prawnicy + audytorzy'],
    socialProof: (
      <>
        Dołącz do <span className="text-white font-semibold">zarządów i managerów</span>, którzy już przygotowują organizację.
      </>
    ),
    formKicker: 'Zapisz się teraz',
    formTitle: 'Zarezerwuj miejsce',
    formSub: 'Imię, nazwa firmy i służbowy e-mail – tyle wystarczy.',

    problemsHeading: 'Pytania, na które wiele firm nie ma jeszcze odpowiedzi',
    problems: [
      { title: 'Czy w ogóle podlegamy?', desc: 'Ustawa objęła 18 branż i tysiące organizacji, które wcześniej nie były w systemie – m.in. gospodarkę odpadami i ściekami, usługi pocztowe, produkcję żywności i chemikaliów, wyroby medyczne. Ciężar kwalifikacji spoczywa na samym podmiocie: nikt Was nie poinformuje, że podlegacie. To Wy musicie to ustalić i zgłosić.' },
      { title: 'Kto konkretnie odpowiada?', desc: 'Nowe przepisy przypisują odpowiedzialność za realizację zadań z zakresu cyberbezpieczeństwa kierownikowi podmiotu. Delegowanie tematu „do IT" nie zdejmuje tej odpowiedzialności – a od kwietnia 2028 r. jej zaniechanie jest zagrożone karami pieniężnymi.' },
      { title: 'Czym to udowodnimy?', desc: 'Zgodności nie potwierdza deklaracja ani polityka w intranecie. Potwierdza ją dokumentacja SZBI: rejestr aktywów, ocena ryzyka, Deklaracja Stosowania, plan ciągłości działania, dowody z testów. Do wniosku o wpis potrzebne są też dane techniczne, w tym zakresy adresów IP i domen – ich zebranie zajmuje więcej czasu, niż się zakłada.' },
    ],

    effectsHeading: 'Co zyskujesz po szkoleniu',
    effectsSub: 'Konkretne punkty, które zabierasz z sali – gotowe do wdrożenia.',
    effects: [
      { icon: UserCheck, title: 'Kwalifikacja podmiotu', desc: 'Kluczowy, ważny czy poza zakresem – z uzasadnieniem.' },
      { icon: FileCheck, title: 'Wpis do Wykazu KSC', desc: 'Wiesz jak się zarejestrować i jakie dane techniczne przygotować.' },
      { icon: Map, title: 'Mapa obowiązków art. 21(2)', desc: 'NIS2 przełożone na konkretne zabezpieczenia ISO/IEC 27001.' },
      { icon: ShieldCheck, title: 'Rola kierownika podmiotu', desc: 'Zakres odpowiedzialności i sposób jej udokumentowania.' },
      { icon: BookOpen, title: 'Lista dokumentów SZBI', desc: 'Co musicie mieć gotowe do kwietnia 2027 r.' },
      { icon: Clock, title: 'Terminy raportowania', desc: 'Incydenty rozpisane na godziny i dni – zanim wystąpią.' },
      { icon: Target, title: 'Plan wdrożenia', desc: 'Co robicie sami, a co warto zautomatyzować.' },
    ],

    bonusChip: 'Bonus dla uczestników',
    bonusHeading: 'Po szkoleniu otrzymujesz realne narzędzie do przetestowania',
    bonusLead: 'Każdy uczestnik dostaje dostęp do platformy Quantifier – gotowe środowisko do zarządzania rejestrami, politykami i dowodami zgodności. Sprawdzicie na własnych dokumentach, jak wygląda rejestr aktywów, obieg polityk i przygotowanie do audytu KSC / NIS2.',
    bonusBullets: [
      'Rejestr aktywów, ryzyk i incydentów – gotowe szablony',
      'Repozytorium polityk z wersjonowaniem i obiegiem akceptacji',
      'Mapowanie kontroli ISO 27001 na wymagania art. 21(2) NIS2',
    ],

    audienceChip: 'Dla firm B2B',
    audienceHeading: 'Dla kogo jest to szkolenie',
    audience: [
      { icon: Briefcase, title: 'Zarządy i kadra kierownicza', desc: 'Odpowiedzialność za realizację zadań z zakresu cyberbezpieczeństwa spoczywa na kierowniku podmiotu i wymaga udokumentowanego przeszkolenia.' },
      { icon: FileCheck, title: 'Compliance, ryzyko, audyt wewnętrzny', desc: 'To Wasz dział będzie musiał wykazać zgodność wobec organu i kontrahentów.' },
      { icon: Cpu, title: 'CISO, IT, bezpieczeństwo informacji', desc: 'Warto mieć wspólny język z zarządem, zanim trzeba będzie prosić o budżet.' },
      { icon: Truck, title: 'Zespoły zakupowe i łańcuch dostaw', desc: 'Wymagania kaskadują się na dostawców, także tych spoza ustawy.' },
    ],

    hostsChip: 'Prowadzący',
    hostsHeading: 'Prawnicy i praktycy audytorzy Quantifier.ai',
    hostsLead: 'Szkolenie prowadzą prawnicy specjalizujący się w prawie nowych technologii oraz praktycy audytorzy z doświadczeniem w audytach ISO/IEC 27001, wdrożeniach SZBI i przygotowaniu podmiotów do wymogów NIS2 / KSC. Zespół Quantifier.ai wspiera organizacje w spełnianiu obowiązków cyberbezpieczeństwa i compliance.',
    hostChips: ['Prawnicy', 'Praktycy audytorzy', 'Specjaliści KSC / NIS2'],
    trustedBy: 'Zaufali nam',

    faqHeading: 'Najczęściej zadawane pytania',
    faqs: [
      { q: 'Ustawa trafiła do Trybunału Konstytucyjnego. Czy nie warto poczekać?', a: 'Nie. Prezydent podpisał ustawę i skierował ją do kontroli następczej – to znaczy, że przepisy obowiązują od 3 kwietnia 2026 r. i terminy biegną normalnie. Zastrzeżenia dotyczą przede wszystkim regulacji o dostawcach wysokiego ryzyka i poleceniach zabezpieczających, a nie obowiązków rejestracyjnych czy wymogów SZBI dla podmiotów kluczowych i ważnych. Czekanie na rozstrzygnięcie oznacza po prostu utratę czasu z sześciomiesięcznego okna.' },
      { q: 'Czy godzina wystarczy na taki temat?', a: 'Nie zastąpi wdrożenia i nie udaje, że zastępuje. Wystarczy natomiast, żeby zarząd zrozumiał zakres swojej odpowiedzialności, a zespół wiedział, od czego zacząć i w jakiej kolejności. To najczęściej brakujący element – nie wiedza szczegółowa, tylko wspólny punkt startu.' },
      { q: 'Nie jesteśmy pewni, czy ustawa nas dotyczy. Ma sens uczestnictwo?', a: 'Tak – moduł drugi jest poświęcony dokładnie temu. Ustawa przenosi ciężar kwalifikacji na sam podmiot, więc odpowiedź „nie podlegamy" też jest wartościowa, o ile jest udokumentowana i można ją pokazać kontrahentowi albo organowi.' },
      { q: 'Nie zdążymy do 3 października. Co wtedy?', a: 'Zaniedbanie wpisu uruchamia wpis z urzędu, a dalej czynności nadzorcze. Kary pieniężne mogą być nakładane dopiero od kwietnia 2028 r., co nie znaczy, że wcześniejsze zaniechania są bez znaczenia – organ ocenia stan przygotowania od początku obowiązywania przepisów. Szkolenie pomoże ustalić, co da się zrobić w pozostałym czasie i w jakiej kolejności.' },
      { q: 'Mamy certyfikat ISO 27001. Czy to nie wystarczy?', a: 'Certyfikat pokrywa istotną część wymagań SZBI, ale nie wszystkie – różnice dotyczą m.in. obowiązków rejestracyjnych i raportowych, roli kierownika podmiotu i bezpieczeństwa łańcucha dostaw. Moduł trzeci pokazuje dokładnie, gdzie te luki występują.' },
      { q: 'Czy szkolenie jest techniczne?', a: 'Nie. Jest regulacyjne i organizacyjne. Nie wymaga przygotowania technicznego – jest projektowane tak, żeby zarząd i dział IT wyszli z niego z tym samym rozumieniem sytuacji.' },
      { q: 'Czy szkolenie spełnia obowiązek szkoleniowy?', a: 'Wystawiamy imienne zaświadczenia uczestnictwa wraz z programem, które stanowią dokumentację realizacji szkolenia dla kierownictwa podmiotu. Zakres i częstotliwość szkoleń w Waszej organizacji powinny wynikać z przyjętej polityki bezpieczeństwa.' },
      { q: 'Ile to kosztuje?', a: 'Bezpłatne, oferta limitowana czasowo.' },
    ],

    ctaChip: 'Termin: 3 października 2026',
    ctaHeading: 'Do 3 października zostało mniej, niż się wydaje',
    ctaSub: 'Zostaw dane – odezwiemy się i uzgodnimy termin.',
  },

  en: {
    metaTitle: 'KSC / NIS2 training for companies – 60 minutes for the board and team | Quantifier.ai',
    metaDescription:
      'Company training on the Polish NCSA (KSC) / NIS2. The act has been in force since 3 April 2026. The deadline for entry into the KSC Register is 3 October. 60 minutes for boards, compliance and IT – free.',
    deadlineRibbon: 'KSC deadline: 3 October 2026',
    b2bChip: 'B2B training · 60 minutes · free',
    h1Part1: 'Cybersecurity training that can ',
    h1Highlight: 'save your company',
    h1Part2: ' from KSC / NIS2 Directive fines.',
    heroLead: (
      <>
        The Polish NCSA has been in force since 3 April 2026. By{' '}
        <strong className="text-white">3 October</strong>, essential and important entities must submit an application to the KSC Register. We will show you what to do – concretely and step by step.
      </>
    ),
    trustChips: ['60 minutes, online', 'Materials + checklists', 'DEMO platform access', 'Lawyers + auditors'],
    socialProof: (
      <>
        Join <span className="text-white font-semibold">boards and managers</span> who are already preparing their organization.
      </>
    ),
    formKicker: 'Sign up now',
    formTitle: 'Reserve your seat',
    formSub: 'First name, company name and business e-mail – that is all we need.',

    problemsHeading: 'Questions many companies still cannot answer',
    problems: [
      { title: 'Are we in scope at all?', desc: 'The act covers 18 sectors and thousands of organizations that were not previously in the system – including waste and wastewater management, postal services, food and chemicals production, medical devices. The burden of qualification lies with the entity itself: no one will notify you that you are in scope. You have to establish this and register yourselves.' },
      { title: 'Who exactly is accountable?', desc: 'The new rules assign responsibility for cybersecurity tasks to the head of the entity. Delegating the topic "to IT" does not remove this responsibility – and from April 2028, failure to act is subject to financial penalties.' },
      { title: 'How do we prove it?', desc: 'Compliance is not confirmed by a declaration or an intranet policy. It is confirmed by ISMS documentation: asset register, risk assessment, Statement of Applicability, business continuity plan, test evidence. The registration application also requires technical data, including IP address ranges and domains – collecting it takes longer than expected.' },
    ],

    effectsHeading: 'What you gain from the training',
    effectsSub: 'Concrete takeaways from the session – ready to implement.',
    effects: [
      { icon: UserCheck, title: 'Entity qualification', desc: 'Essential, important or out of scope – with justification.' },
      { icon: FileCheck, title: 'Entry into the KSC Register', desc: 'You know how to register and what technical data to prepare.' },
      { icon: Map, title: 'Map of art. 21(2) obligations', desc: 'NIS2 translated into concrete ISO/IEC 27001 controls.' },
      { icon: ShieldCheck, title: 'Role of the head of the entity', desc: 'Scope of responsibility and how to document it.' },
      { icon: BookOpen, title: 'List of ISMS documents', desc: 'What you must have ready by April 2027.' },
      { icon: Clock, title: 'Reporting deadlines', desc: 'Incidents mapped to hours and days – before they happen.' },
      { icon: Target, title: 'Implementation plan', desc: 'What you do yourselves, and what is worth automating.' },
    ],

    bonusChip: 'Bonus for participants',
    bonusHeading: 'After the training you get a real tool to test',
    bonusLead: 'Every participant gets access to the Quantifier platform – a ready environment to manage registers, policies and compliance evidence. You will see on your own documents what an asset register, policy workflow and preparation for a KSC / NIS2 audit look like.',
    bonusBullets: [
      'Register of assets, risks and incidents – ready templates',
      'Policy repository with versioning and approval workflow',
      'Mapping of ISO 27001 controls to art. 21(2) NIS2 requirements',
    ],

    audienceChip: 'For B2B companies',
    audienceHeading: 'Who this training is for',
    audience: [
      { icon: Briefcase, title: 'Boards and executive management', desc: 'Responsibility for carrying out cybersecurity tasks rests with the head of the entity and requires documented training.' },
      { icon: FileCheck, title: 'Compliance, risk, internal audit', desc: 'Your department will have to demonstrate compliance to the authority and to counterparties.' },
      { icon: Cpu, title: 'CISO, IT, information security', desc: 'It is worth having a common language with the board before you need to ask for a budget.' },
      { icon: Truck, title: 'Procurement and supply chain teams', desc: 'The requirements cascade down to suppliers, including those not in scope of the act.' },
    ],

    hostsChip: 'Trainers',
    hostsHeading: 'Lawyers and practising auditors from Quantifier.ai',
    hostsLead: 'The training is delivered by lawyers specialising in new technology law and practising auditors with experience in ISO/IEC 27001 audits, ISMS implementations and preparing entities for NIS2 / KSC requirements. The Quantifier.ai team supports organisations in meeting cybersecurity and compliance obligations.',
    hostChips: ['Lawyers', 'Practising auditors', 'KSC / NIS2 specialists'],
    trustedBy: 'Trusted by',

    faqHeading: 'Frequently asked questions',
    faqs: [
      { q: 'The act has been referred to the Constitutional Tribunal. Should we wait?', a: 'No. The President signed the act and referred it for subsequent review – meaning the provisions apply from 3 April 2026 and deadlines run normally. The reservations concern mainly the regulations on high-risk suppliers and security orders, not the registration obligations or ISMS requirements for essential and important entities. Waiting for a ruling simply means losing time from the six-month window.' },
      { q: 'Is one hour enough for such a topic?', a: 'It will not replace an implementation and does not pretend to. It is, however, enough for the board to understand the scope of its responsibility and for the team to know where to start and in what order. That is most often the missing element – not detailed knowledge, but a common starting point.' },
      { q: 'We are not sure the act applies to us. Does it make sense to attend?', a: 'Yes – module two is dedicated precisely to that. The act shifts the qualification burden onto the entity itself, so an answer of "we are not in scope" is also valuable, provided it is documented and can be shown to a counterparty or the authority.' },
      { q: 'We will not make it by 3 October. What then?', a: 'Failing to register triggers an ex officio entry and further supervisory actions. Financial penalties can be imposed only from April 2028, which does not mean earlier omissions are irrelevant – the authority assesses the state of preparation from the moment the rules come into force. The training will help decide what can be done in the remaining time and in what order.' },
      { q: 'We have an ISO 27001 certificate. Isn\'t that enough?', a: 'The certificate covers a significant part of ISMS requirements, but not all – the differences concern, among others, registration and reporting obligations, the role of the head of the entity and supply chain security. Module three shows exactly where these gaps are.' },
      { q: 'Is the training technical?', a: 'No. It is regulatory and organisational. It does not require technical preparation – it is designed so that the board and the IT department leave with the same understanding of the situation.' },
      { q: 'Does the training satisfy the training obligation?', a: 'We issue personal attendance certificates together with the programme, which serve as documentation of training delivery for the entity\'s management. The scope and frequency of training in your organisation should follow from the adopted security policy.' },
      { q: 'How much does it cost?', a: 'Free, offer limited in time.' },
    ],

    ctaChip: 'Deadline: 3 October 2026',
    ctaHeading: 'Less time is left until 3 October than it seems',
    ctaSub: 'Leave your details – we will get in touch and agree a date.',
  },

  cs: {
    metaTitle: 'Školení KSC / NIS2 pro firmy – 60 minut pro představenstvo a tým | Quantifier.ai',
    metaDescription:
      'Firemní školení k polskému zákonu KSC / NIS2. Zákon platí od 3. dubna 2026. Termín zápisu do Seznamu KSC vyprší 3. října. 60 minut pro představenstva, compliance a IT – zdarma.',
    deadlineRibbon: 'Termín KSC: 3. října 2026',
    b2bChip: 'B2B školení · 60 minut · zdarma',
    h1Part1: 'Školení kybernetické bezpečnosti, které může ',
    h1Highlight: 'zachránit vaši firmu',
    h1Part2: ' před pokutami dle KSC / směrnice NIS2.',
    heroLead: (
      <>
        Polský zákon platí od 3. dubna 2026. Do{' '}
        <strong className="text-white">3. října</strong> musí klíčové a významné subjekty podat žádost o zápis do Seznamu KSC. Ukážeme vám, co dělat – konkrétně a v pořadí.
      </>
    ),
    trustChips: ['60 minut, online', 'Materiály + checklisty', 'Přístup do DEMO platformy', 'Právníci + auditoři'],
    socialProof: (
      <>
        Připojte se k <span className="text-white font-semibold">představenstvům a manažerům</span>, kteří už připravují svou organizaci.
      </>
    ),
    formKicker: 'Zaregistrujte se',
    formTitle: 'Rezervujte si místo',
    formSub: 'Jméno, název firmy a firemní e-mail – to úplně stačí.',

    problemsHeading: 'Otázky, na které řada firem stále nemá odpověď',
    problems: [
      { title: 'Vztahuje se to vůbec na nás?', desc: 'Zákon zahrnuje 18 odvětví a tisíce organizací, které dříve v systému nebyly – například odpadové a vodohospodářské služby, poštovní služby, výrobu potravin a chemikálií, zdravotnické prostředky. Odpovědnost za posouzení leží na samotném subjektu: nikdo vás o zařazení neuvědomí. Musíte to určit a nahlásit sami.' },
      { title: 'Kdo konkrétně odpovídá?', desc: 'Nová pravidla přiřazují odpovědnost za plnění úkolů kybernetické bezpečnosti vedení subjektu. Delegování tématu „na IT" tuto odpovědnost nezbavuje – a od dubna 2028 hrozí za její nesplnění finanční sankce.' },
      { title: 'Čím to prokážeme?', desc: 'Soulad se nepotvrzuje prohlášením ani politikou na intranetu. Prokazuje ho dokumentace ISMS: registr aktiv, hodnocení rizik, Prohlášení o aplikovatelnosti, plán kontinuity provozu, důkazy z testů. K žádosti o zápis je také třeba technických údajů, včetně rozsahů IP adres a domén – jejich shromáždění zabere víc času, než se čeká.' },
    ],

    effectsHeading: 'Co získáte po školení',
    effectsSub: 'Konkrétní body, které si odnesete – připravené k zavedení.',
    effects: [
      { icon: UserCheck, title: 'Kvalifikace subjektu', desc: 'Klíčový, významný nebo mimo rozsah – s odůvodněním.' },
      { icon: FileCheck, title: 'Zápis do Seznamu KSC', desc: 'Víte, jak se registrovat a jaké technické údaje si připravit.' },
      { icon: Map, title: 'Mapa povinností čl. 21(2)', desc: 'NIS2 převedená do konkrétních opatření ISO/IEC 27001.' },
      { icon: ShieldCheck, title: 'Role vedení subjektu', desc: 'Rozsah odpovědnosti a způsob její dokumentace.' },
      { icon: BookOpen, title: 'Seznam dokumentů ISMS', desc: 'Co musíte mít připravené do dubna 2027.' },
      { icon: Clock, title: 'Lhůty pro hlášení', desc: 'Incidenty rozepsané na hodiny a dny – dřív než nastanou.' },
      { icon: Target, title: 'Plán implementace', desc: 'Co uděláte sami a co je vhodné automatizovat.' },
    ],

    bonusChip: 'Bonus pro účastníky',
    bonusHeading: 'Po školení získáte reálný nástroj k vyzkoušení',
    bonusLead: 'Každý účastník získá přístup k platformě Quantifier – hotové prostředí pro správu registrů, politik a důkazů o souladu. Na vlastních dokumentech si vyzkoušíte, jak vypadá registr aktiv, oběh politik a příprava na audit KSC / NIS2.',
    bonusBullets: [
      'Registr aktiv, rizik a incidentů – hotové šablony',
      'Repozitář politik s verzováním a schvalovacím workflow',
      'Mapování kontrol ISO 27001 na požadavky čl. 21(2) NIS2',
    ],

    audienceChip: 'Pro B2B firmy',
    audienceHeading: 'Pro koho je toto školení',
    audience: [
      { icon: Briefcase, title: 'Představenstva a vedení', desc: 'Odpovědnost za plnění úkolů kybernetické bezpečnosti nese vedení subjektu a vyžaduje dokumentované školení.' },
      { icon: FileCheck, title: 'Compliance, riziko, interní audit', desc: 'Právě váš útvar bude muset prokázat soulad vůči orgánu i obchodním partnerům.' },
      { icon: Cpu, title: 'CISO, IT, bezpečnost informací', desc: 'Vyplatí se mít společný jazyk s vedením dřív, než budete žádat o rozpočet.' },
      { icon: Truck, title: 'Nákup a dodavatelský řetězec', desc: 'Požadavky se kaskádovitě přenášejí na dodavatele, i mimo rozsah zákona.' },
    ],

    hostsChip: 'Lektoři',
    hostsHeading: 'Právníci a praktičtí auditoři Quantifier.ai',
    hostsLead: 'Školení vedou právníci specializovaní na právo nových technologií a praktičtí auditoři se zkušenostmi s audity ISO/IEC 27001, implementacemi ISMS a přípravou subjektů na požadavky NIS2 / KSC. Tým Quantifier.ai podporuje organizace při plnění povinností v oblasti kybernetické bezpečnosti a compliance.',
    hostChips: ['Právníci', 'Praktičtí auditoři', 'Specialisté na KSC / NIS2'],
    trustedBy: 'Důvěřují nám',

    faqHeading: 'Nejčastější otázky',
    faqs: [
      { q: 'Zákon míří k Ústavnímu tribunálu. Není lepší počkat?', a: 'Ne. Prezident zákon podepsal a poslal jej k následné kontrole – to znamená, že předpisy platí od 3. dubna 2026 a lhůty běží normálně. Výhrady se týkají především regulace vysoce rizikových dodavatelů a zabezpečovacích příkazů, nikoli registračních povinností či požadavků ISMS pro klíčové a významné subjekty. Čekání na rozhodnutí znamená prostě ztrátu času z šestiměsíčního okna.' },
      { q: 'Stačí hodina na takové téma?', a: 'Nenahradí to implementaci a ani to nepředstírá. Ale stačí to, aby vedení pochopilo rozsah své odpovědnosti a tým věděl, kde a v jakém pořadí začít. To je nejčastěji chybějící prvek – ne detailní znalost, ale společný výchozí bod.' },
      { q: 'Nejsme si jistí, zda se nás zákon týká. Má smysl účast?', a: 'Ano – modul dvě je věnovaný právě tomu. Zákon přenáší odpovědnost za posouzení na sám subjekt, takže i odpověď „nespadáme pod něj" má hodnotu, pokud je zdokumentovaná a lze ji ukázat partnerovi či orgánu.' },
      { q: 'Nestihneme to do 3. října. Co pak?', a: 'Zanedbání zápisu spouští zápis z úřední povinnosti a další dozorové úkony. Finanční sankce lze ukládat až od dubna 2028, což neznamená, že dřívější opomenutí nemají význam – orgán posuzuje stav připravenosti od počátku účinnosti předpisů. Školení pomůže určit, co lze ve zbývajícím čase udělat a v jakém pořadí.' },
      { q: 'Máme certifikát ISO 27001. Nestačí to?', a: 'Certifikát pokrývá podstatnou část požadavků ISMS, ale ne všechny – rozdíly se týkají mimo jiné registračních a oznamovacích povinností, role vedení subjektu a bezpečnosti dodavatelského řetězce. Modul tři ukazuje přesně, kde tyto mezery jsou.' },
      { q: 'Je školení technické?', a: 'Ne. Je regulační a organizační. Nevyžaduje technickou přípravu – je navržené tak, aby vedení i IT vyšlo se stejným pochopením situace.' },
      { q: 'Splňuje školení školicí povinnost?', a: 'Vystavujeme jmenné potvrzení o účasti spolu s programem, které slouží jako dokumentace realizace školení pro vedení subjektu. Rozsah a frekvence školení ve vaší organizaci by měly vyplývat z přijaté bezpečnostní politiky.' },
      { q: 'Kolik to stojí?', a: 'Zdarma, časově omezená nabídka.' },
    ],

    ctaChip: 'Termín: 3. října 2026',
    ctaHeading: 'Do 3. října zbývá méně, než se zdá',
    ctaSub: 'Zanechte údaje – ozveme se a domluvíme termín.',
  },
};

const TrainingLanding = () => {
  const { currentLocale } = useLanguage();
  const locale: Locale = (['pl', 'en', 'cs'].includes(currentLocale) ? currentLocale : 'pl') as Locale;
  const c = COPY[locale];
  const baseUrl = 'https://quantifier.ai';
  const slug =
    locale === 'pl'
      ? 'szkolenia-cyberbezpieczenstwo-dla-firm'
      : locale === 'cs'
        ? 'skoleni-kyberneticka-bezpecnost-pro-firmy'
        : 'cybersecurity-training-for-companies';
  const pageUrl = `${baseUrl}/${locale}/${slug}`;

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: c.faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  return (
    <>
      <Helmet>
        <title>{c.metaTitle}</title>
        <meta name="description" content={c.metaDescription} />
        <link rel="canonical" href={pageUrl + '/'} />
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>

      {/* ─── 1. HERO ─── */}
      <section className="relative bg-slate-950 overflow-hidden pt-20 min-h-[calc(100vh-5rem)] flex items-center">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_hsl(221_83%_53%/0.25),transparent_55%)] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_hsl(263_70%_50%/0.15),transparent_55%)] pointer-events-none" />
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(hsl(0,0%,100%) 1px, transparent 1px), linear-gradient(90deg, hsl(0,0%,100%) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />
        <div className="absolute top-1/4 right-1/4 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-pulse pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />

        <div className="container mx-auto px-4 py-14 md:py-16 relative z-10">
          <div className="grid lg:grid-cols-5 gap-10 lg:gap-14 items-center max-w-6xl mx-auto">
            <div className="lg:col-span-3 animate-fade-in">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-red-500/20 to-orange-500/20 border border-red-500/30 mb-5">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500" />
                </span>
                <span className="text-xs font-bold tracking-wider uppercase text-red-200">
                  {c.deadlineRibbon}
                </span>
              </div>

              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/80 mb-5 ml-0 sm:ml-3">
                <Building2 className="h-3.5 w-3.5" />
                <span className="text-[11px] font-semibold tracking-wide uppercase">
                  {c.b2bChip}
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.05] mb-6 tracking-tight">
                {c.h1Part1}
                <span className="relative inline-block">
                  <span className="bg-gradient-to-r from-primary via-blue-400 to-purple-400 bg-clip-text text-transparent">
                    {c.h1Highlight}
                  </span>
                  <span className="absolute -bottom-1 left-0 right-0 h-1 bg-gradient-to-r from-primary/60 to-purple-400/60 blur-sm" />
                </span>
                {c.h1Part2}
              </h1>

              <p className="text-lg text-slate-300 mb-8 leading-relaxed max-w-2xl">
                {c.heroLead}
              </p>

              <div className="flex flex-wrap items-center gap-2 mb-8">
                {[
                  { icon: Clock, label: c.trustChips[0] },
                  { icon: FileCheck, label: c.trustChips[1] },
                  { icon: Cpu, label: c.trustChips[2] },
                  { icon: ShieldCheck, label: c.trustChips[3] },
                ].map(({ icon: Icon, label }) => (
                  <div
                    key={label}
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/10 text-xs text-slate-300 hover:bg-white/[0.08] hover:border-white/20 transition-colors"
                  >
                    <Icon className="h-3.5 w-3.5 text-primary" />
                    {label}
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-4 pt-4 border-t border-white/10">
                <div className="flex -space-x-2">
                  {['bg-blue-500', 'bg-purple-500', 'bg-emerald-500', 'bg-amber-500'].map((cls) => (
                    <div
                      key={cls}
                      className={`w-8 h-8 rounded-full border-2 border-slate-950 ${cls} opacity-80`}
                    />
                  ))}
                </div>
                <p className="text-xs text-slate-400">{c.socialProof}</p>
              </div>
            </div>

            <div className="lg:col-span-2 animate-fade-in">
              <div className="relative">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-purple-500 rounded-2xl blur opacity-40" />
                <div className="relative bg-slate-900/90 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl p-6 md:p-7">
                  <div className="mb-4">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-primary mb-1">
                      {c.formKicker}
                    </p>
                    <h3 className="text-xl font-bold text-white leading-snug">
                      {c.formTitle}
                      <span className="block text-sm font-normal text-slate-400 mt-1">
                        {c.formSub}
                      </span>
                    </h3>
                  </div>
                  <TrainingPromoFormInline
                    locale={currentLocale}
                    id="promo-form-hero"
                    minimal
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 2. PROBLEM ─── */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              {c.problemsHeading}
            </h2>
          </div>

          <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
            {c.problems.map((p, idx) => (
              <div key={idx} className="p-6 rounded-xl border border-border bg-card">
                <div className="w-10 h-10 rounded-lg bg-destructive/10 flex items-center justify-center mb-4">
                  <AlertTriangle className="h-5 w-5 text-destructive" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">{p.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 3. EFEKTY ─── */}
      <section className="py-16 md:py-24 bg-muted/40">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              {c.effectsHeading}
            </h2>
            <p className="text-lg text-muted-foreground">{c.effectsSub}</p>
          </div>

          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-4">
            {c.effects.map(({ icon: Icon, title, desc }, i) => (
              <div key={i} className="flex items-start gap-3 p-5 rounded-xl border border-border bg-card hover-scale">
                <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-foreground leading-snug">{title}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed mt-1">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 3b. BONUS TOOL ─── */}
      <section className="py-16 md:py-24 bg-slate-950 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_hsl(221_83%_53%/0.15),transparent_60%)] pointer-events-none" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center max-w-6xl mx-auto">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-5">
                <Wrench className="h-4 w-4 text-primary" />
                <span className="text-xs font-semibold tracking-wide text-primary uppercase">
                  {c.bonusChip}
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-5 leading-tight">
                {c.bonusHeading}
              </h2>
              <p className="text-lg text-white/80 mb-6 leading-relaxed">
                {c.bonusLead}
              </p>
              <ul className="space-y-3 text-white/80">
                <li className="flex items-start gap-3">
                  <ClipboardCheck className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <span>{c.bonusBullets[0]}</span>
                </li>
                <li className="flex items-start gap-3">
                  <FileCheck className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <span>{c.bonusBullets[1]}</span>
                </li>
                <li className="flex items-start gap-3">
                  <ShieldCheck className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <span>{c.bonusBullets[2]}</span>
                </li>
              </ul>
            </div>

            <div className="animate-fade-in">
              <PolicyPlatformMockup />
            </div>
          </div>
        </div>
      </section>

      {/* ─── 4. AUDIENCE ─── */}
      <section className="py-16 md:py-24 bg-background relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,_hsl(221_83%_53%/0.06),transparent_70%)] pointer-events-none" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-4">
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-xs font-semibold tracking-wide text-primary uppercase">
                {c.audienceChip}
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              {c.audienceHeading}
            </h2>
          </div>

          <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {c.audience.map(({ icon: Icon, title, desc }, i) => (
              <div
                key={i}
                style={{ animationDelay: `${i * 100}ms` }}
                className="group relative p-6 rounded-2xl border border-border bg-card hover:border-primary/40 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-1 transition-all duration-300 animate-fade-in overflow-hidden"
              >
                <div className="absolute -top-16 -right-16 w-32 h-32 rounded-full bg-primary/5 group-hover:bg-primary/10 transition-colors duration-500" />
                <div className="relative">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center mb-4 shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">{title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 5. HOSTS ─── */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-slate-50 to-white border-y border-slate-200/70">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-compliance-50 border border-compliance-200 text-compliance-700 text-xs font-semibold uppercase tracking-wider mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-compliance-500" />
              {c.hostsChip}
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              {c.hostsHeading}
            </h2>
            <p className="text-lg text-slate-600">{c.hostsLead}</p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200 text-sm font-medium text-slate-700 shadow-sm">
                <Gavel className="h-4 w-4 text-primary" /> {c.hostChips[0]}
              </span>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200 text-sm font-medium text-slate-700 shadow-sm">
                <ClipboardCheck className="h-4 w-4 text-primary" /> {c.hostChips[1]}
              </span>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200 text-sm font-medium text-slate-700 shadow-sm">
                <Scale className="h-4 w-4 text-primary" /> {c.hostChips[2]}
              </span>
            </div>
          </div>

          <div className="mt-10">
            <p className="text-center text-xs font-semibold uppercase tracking-wider text-slate-500 mb-6">
              {c.trustedBy}
            </p>
            <ul className="flex flex-wrap items-center justify-center gap-x-12 gap-y-10 md:gap-x-20">
              {featuredLogos.map((logo) => (
                <li
                  key={logo.src}
                  className="flex items-center justify-center grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
                >
                  <img
                    src={logo.src}
                    alt={logo.alt}
                    loading="lazy"
                    width={200}
                    height={64}
                    className={`${logo.h} w-auto object-contain`}
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ─── 6. FAQ ─── */}
      <section className="py-16 md:py-24 bg-slate-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-slate-900">
            {c.faqHeading}
          </h2>
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              {c.faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`faq-${index}`}
                  className="bg-white rounded-lg border border-slate-200 px-6"
                >
                  <AccordionTrigger className="text-left font-semibold text-slate-900 hover:text-compliance-700 py-5">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-slate-600 pb-5 leading-relaxed">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* ─── 7. FINAL CTA ─── */}
      <section id="contact" className="py-16 md:py-24 bg-slate-950 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_hsl(221_83%_53%/0.18),transparent_60%)] pointer-events-none" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-5">
              <Calendar className="h-4 w-4 text-primary" />
              <span className="text-xs font-semibold tracking-wide text-primary uppercase">
                {c.ctaChip}
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {c.ctaHeading}
            </h2>
            <p className="text-lg text-slate-300">{c.ctaSub}</p>
          </div>

          <div className="max-w-xl mx-auto">
            <TrainingPromoFormInline locale={currentLocale} id="promo-form" minimal />
          </div>
        </div>
      </section>
    </>
  );
};

export default TrainingLanding;
