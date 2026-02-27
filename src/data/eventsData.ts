export interface EventSpeaker {
  name: string;
  title: string;
  company: string;
  bio: string;
  linkedInUrl: string;
  avatarUrl?: string;
}

export interface EventAgendaItem {
  time: string;
  title: string;
  description?: string;
}

export interface EventAudienceCard {
  role: string;
  icon: string;
  pains: string[];
  outcomes: string[];
}

export interface EventFAQ {
  question: string;
  answer: string;
}

export interface EventData {
  slug: string;
  title: string;
  subtitle: string;
  date: string;
  dateDisplay: string;
  duration: string;
  location: string;
  tags: string[];
  heroCtaLabel: string;
  heroSecondaryText: string;
  trustLine: string;
  icon?: string;
  step?: number;
  outcomes: string[];
  agenda: EventAgendaItem[];
  audience: EventAudienceCard[];
  speakers: EventSpeaker[];
  bonusMaterials: string[];
  faqs: EventFAQ[];
  seo: {
    metaTitle: string;
    metaDescription: string;
    ogImage?: string;
  };
  lastUpdated: string;
}

export const events: EventData[] = [
  {
    slug: 'nis2-mapa-ryzyka',
    title: 'Nowa rzeczywistość: geopolityka, rynek i konsekwencje regulacyjne',
    subtitle: 'Jak zmienia się krajobraz ryzyka w Europie i Polsce? Jakie obowiązki wynikają z NIS2 dla podmiotów kluczowych, ważnych i ich dostawców?',
    date: '2026-03-10T10:00:00+01:00',
    dateDisplay: '10 marca 2026, godz. 10:00',
    duration: '30 minut',
    location: 'Online (na żywo)',
    tags: ['Live', 'NIS2 & ISO 27001'],
    heroCtaLabel: 'Zarezerwuj miejsce',
    heroSecondaryText: 'Bezpłatny webinar online',
    trustLine: 'Dowiedz się, jakie obowiązki wynikają z NIS2 i jak przygotować organizację.',
    icon: 'Globe',
    step: 1,
    outcomes: [
      'Jak zmienia się krajobraz ryzyka w Europie i Polsce?',
      'Jakie obowiązki wynikają z NIS2 dla podmiotów kluczowych i ważnych?',
      'Jakie obowiązki będą mieli dostawcy?',
      'Jaka będzie odpowiedzialność zarządu w cyberbezpieczeństwie?',
    ],
    agenda: [
      { time: '0–5 min', title: 'Kontekst: cyberbezpieczeństwo, NIS2, ISO 27001', description: 'Kogo dotyczy, co się zmieniło, dlaczego teraz' },
      { time: '5–12 min', title: 'Nowe obowiązki zarządu', description: 'Odpowiedzialność zarządu w kontekście nowej unijnej dyrektywy NIS2' },
      { time: '12–20 min', title: 'Główne wymagania regulacyjne', description: 'Raportowanie incydentów 24h/72h, rejestr ryzyk, szkolenia dla pracowników' },
      { time: '20–25 min', title: 'Wymagania wobec łańcucha dostaw', description: 'Audyt dostawców, nowe klauzule w umowach' },
      { time: '25–30 min', title: 'Podejście continuous compliance', description: 'Ciągłe monitorowanie ryzyk i zdarzeń w przedsiębiorstwie' },
      { time: '30+ min', title: 'Q&A', description: 'Pytania uczestników i podsumowanie' },
    ],
    audience: [
      {
        role: 'Zarząd (CEO/COO/CFO)',
        icon: 'Building2',
        pains: ['Brak jasności co do odpowiedzialności zarządu za NIS2', 'Ryzyko kar finansowych i osobistej odpowiedzialności', 'Brak przejrzystości stanu compliance'],
        outcomes: ['Jasna mapa odpowiedzialności i ryzyk', 'Dashboard stanu zgodności dla zarządu'],
      },
      {
        role: 'Compliance / Risk',
        icon: 'Shield',
        pains: ['Brak struktury do oceny ryzyk NIS2', 'Trudność priorytetyzacji działań', 'Niejasne wymagania regulacyjne'],
        outcomes: ['Gotowa matryca ryzyk z priorytetami', 'Szablon oceny ryzyka do wdrożenia od zaraz'],
      },
      {
        role: 'IT / CISO / Security',
        icon: 'Lock',
        pains: ['Wymogi techniczne NIS2 bez jasnych wytycznych', 'Brak ustrukturyzowanego procesu identyfikacji zagrożeń'],
        outcomes: ['Praktyczna checklista zabezpieczeń technicznych', 'Mapa luk do zamknięcia w pierwszej kolejności'],
      },
    ],
    speakers: [],
    bonusMaterials: [],
    faqs: [
      { question: 'Czy będzie nagranie?', answer: 'Tak, nagranie zostanie udostępnione wszystkim zarejestrowanym uczestnikom w ciągu 24 godzin po webinarze.' },
      { question: 'Czy webinar jest bezpłatny?', answer: 'Tak, udział jest całkowicie bezpłatny. Wystarczy się zarejestrować, aby zarezerwować miejsce.' },
      { question: 'Dla kogo jest ten webinar?', answer: 'Dla zarządów, menedżerów compliance/risk, CISO i zespołów IT w organizacjach, które mogą podlegać NIS2.' },
      { question: 'Nie wiesz, czy podlegasz pod NIS2?', answer: 'Wypełnij naszą krótką ankietę i sprawdź w 2 minuty, czy Twoja organizacja może podlegać pod NIS2. Przejdź do ankiety na stronie /sprawdz-cyberbezpieczenstwo.' },
      { question: 'Czy mogę zaprosić zespół?', answer: 'Oczywiście! Zachęcamy do udziału zespołowego. Każda osoba powinna zarejestrować się indywidualnie.' },
    ],
    seo: {
      metaTitle: 'NIS2 mapa ryzyka: webinar — obowiązki i zagrożenia',
      metaDescription: 'Bezpłatny webinar NIS2: jak zbudować mapę ryzyka, zidentyfikować obowiązki i uniknąć najczęstszych błędów. Dla zarządu, compliance i IT.',
    },
    lastUpdated: '2026-02-26',
  },
  {
    slug: 'nis2-role-i-procesy',
    title: 'Wdrożenie, które działa: continuous compliance',
    subtitle: 'Jak zbudować system cyberbezpieczeństwa jako trwały element ładu korporacyjnego? Jak przypisać odpowiedzialności i uniknąć chaosu operacyjnego?',
    date: '2026-03-24T10:00:00+01:00',
    dateDisplay: '24 marca 2026, godz. 10:00',
    duration: '30 minut',
    location: 'Online (na żywo)',
    tags: ['Live', 'NIS2 & ISO 27001'],
    heroCtaLabel: 'Zarezerwuj miejsce',
    heroSecondaryText: 'Bezpłatny webinar online',
    trustLine: 'Dowiedz się, jak zdefiniować role i procesy w systemie cyberbezpieczeństwa.',
    icon: 'Settings',
    step: 2,
    outcomes: [
      'Jak zbudować system cyberbezpieczeństwa jako trwały element ładu korporacyjnego?',
      'Jak przypisać odpowiedzialności i zbudować zespół cyberbezpieczeństwa?',
      'Jak uniknąć kosztownego chaosu operacyjnego?',
    ],
    agenda: [
      { time: '0–8 min', title: 'Kluczowe procesy i obowiązki', description: 'Czym trzeba się zająć, wdrażając NIS2' },
      { time: '8–16 min', title: 'Kluczowe role w cyberbezpieczeństwie, NIS2, ISO 27001', description: 'Zarząd, CISO, IT, compliance, HR, dostawcy' },
      { time: '16–25 min', title: 'Matryca odpowiedzialności RACI', description: 'Jak zoperacjonalizować wdrożenie NIS2, ISO 27001 w spółce' },
      { time: '25–30 min', title: 'Podejście continuous compliance | Quantifier.ai', description: 'Nowoczesne wdrożenie regulacji i ciągłe monitorowanie ryzyk' },
      { time: '30+ min', title: 'Q&A', description: 'Pytania uczestników i podsumowanie' },
    ],
    audience: [
      {
        role: 'Zarząd (CEO/COO/CFO)',
        icon: 'Building2',
        pains: ['Niejasny podział odpowiedzialności za NIS2', 'Brak formalnych procesów eskalacji', 'Ryzyko osobistej odpowiedzialności'],
        outcomes: ['Jasna struktura ról i odpowiedzialności', 'Formalny proces eskalacji incydentów'],
      },
      {
        role: 'Compliance / Risk',
        icon: 'Shield',
        pains: ['Brak matrycy RACI dla NIS2', 'Trudność koordynacji między działami', 'Brak szablonów procesów'],
        outcomes: ['Gotowa matryca RACI do wdrożenia', 'Szablony procesów incident response'],
      },
      {
        role: 'IT / CISO / Security',
        icon: 'Lock',
        pains: ['Brak formalnych procedur reagowania na incydenty', 'Niejasne wymagania raportowania do CSIRT'],
        outcomes: ['Proces incident response zgodny z NIS2', 'Checklista raportowania incydentów'],
      },
    ],
    speakers: [],
    bonusMaterials: [],
    faqs: [
      { question: 'Czy będzie nagranie?', answer: 'Tak, nagranie zostanie udostępnione zarejestrowanym uczestnikom w ciągu 24h.' },
      { question: 'Czy webinar jest bezpłatny?', answer: 'Tak, udział jest całkowicie bezpłatny.' },
      { question: 'Czym różni się od webinaru o mapie ryzyka?', answer: 'Ten webinar koncentruje się na budowie systemu zarządzania — rolach, procesach i odpowiedzialnościach. Webinar o mapie ryzyka skupia się na identyfikacji i ocenie zagrożeń.' },
      { question: 'Nie wiesz, czy podlegasz pod NIS2?', answer: 'Wypełnij naszą krótką ankietę i sprawdź w 2 minuty, czy Twoja organizacja może podlegać pod NIS2. Przejdź do ankiety na stronie /sprawdz-cyberbezpieczenstwo.' },
      { question: 'Czy mogę zaprosić zespół?', answer: 'Tak! Każda osoba powinna zarejestrować się indywidualnie, aby otrzymać materiały.' },
    ],
    seo: {
      metaTitle: 'NIS2 role i procesy: webinar — system zarządzania',
      metaDescription: 'Bezpłatny webinar: jak zdefiniować role, procesy i matrycę RACI w systemie NIS2/ISO 27001. Dla compliance i IT.',
    },
    lastUpdated: '2026-02-26',
  },
  {
    slug: 'nis2-audit-ready',
    title: 'Dokumenty, dowody i wymagania rynkowe',
    subtitle: 'Jakie polityki, procedury i rejestry są wymagane? Jak zarządzać dowodami zgodności i spełnić wymagania klientów w łańcuchu dostaw?',
    date: '2026-04-14T10:00:00+02:00',
    dateDisplay: '14 kwietnia 2026, godz. 10:00',
    duration: '30 minut',
    location: 'Online (na żywo)',
    tags: ['Live', 'NIS2 & ISO 27001'],
    heroCtaLabel: 'Zarezerwuj miejsce',
    heroSecondaryText: 'Bezpłatny webinar online',
    trustLine: 'Dowiedz się, jak przygotować dokumenty i dowody zgodności na audyt.',
    icon: 'FileCheck',
    step: 3,
    outcomes: [
      'Jakie polityki, procedury i rejestry są wymagane?',
      'Jak jako podmiot w łańcuchu dostaw dostosować się do wymagań klientów w zakresie cyberbezpieczeństwa?',
      'Jak zarządzać dowodami zgodności w sposób systemowy?',
    ],
    agenda: [
      { time: '0–5 min', title: 'Wymagania dokumentacyjne NIS2', description: 'Co audytor sprawdza w pierwszej kolejności' },
      { time: '5–12 min', title: 'Evidence pack: struktura', description: 'Jak zorganizować dowody zgodności w logiczną strukturę' },
      { time: '12–20 min', title: 'Audit trail w praktyce', description: 'Budowanie ścieżki audytowej krok po kroku' },
      { time: '20–25 min', title: 'Demo: Quantifier Evidence', description: 'Zarządzanie dowodami zgodności w platformie' },
      { time: '25–30 min', title: 'Q&A', description: 'Pytania uczestników i podsumowanie' },
    ],
    audience: [
      {
        role: 'Zarząd (CEO/COO/CFO)',
        icon: 'Building2',
        pains: ['Brak pewności, czy dokumentacja jest kompletna', 'Ryzyko negatywnego wyniku audytu', 'Brak widoczności stanu przygotowań'],
        outcomes: ['Pewność co do kompletności dokumentacji', 'Dashboard gotowości audytowej'],
      },
      {
        role: 'Compliance / Risk',
        icon: 'Shield',
        pains: ['Brak szablonów dokumentów NIS2', 'Trudność w zbieraniu dowodów z wielu działów', 'Niejasna struktura evidence pack'],
        outcomes: ['Kompletny zestaw szablonów dokumentów', 'Gotowa struktura evidence pack'],
      },
      {
        role: 'IT / CISO / Security',
        icon: 'Lock',
        pains: ['Brak jasnych wytycznych dotyczących dowodów technicznych', 'Trudność dokumentowania konfiguracji bezpieczeństwa'],
        outcomes: ['Checklista dowodów technicznych', 'Szablon dokumentacji konfiguracji'],
      },
    ],
    speakers: [],
    bonusMaterials: [],
    faqs: [
      { question: 'Czy będzie nagranie?', answer: 'Tak, nagranie zostanie udostępnione zarejestrowanym uczestnikom w ciągu 24h.' },
      { question: 'Czy webinar jest bezpłatny?', answer: 'Tak, udział jest całkowicie bezpłatny.' },
      { question: 'Czy muszę mieć wcześniejsze doświadczenie z audytami?', answer: 'Nie, webinar jest zaprojektowany zarówno dla osób przygotowujących się do pierwszego audytu, jak i dla doświadczonych praktyków.' },
      { question: 'Nie wiesz, czy podlegasz pod NIS2?', answer: 'Wypełnij naszą krótką ankietę i sprawdź w 2 minuty, czy Twoja organizacja może podlegać pod NIS2. Przejdź do ankiety na stronie /sprawdz-cyberbezpieczenstwo.' },
      { question: 'Czy mogę zaprosić zespół?', answer: 'Tak! Każda osoba powinna zarejestrować się indywidualnie.' },
    ],
    seo: {
      metaTitle: 'NIS2 audit-ready: webinar — dokumenty i dowody',
      metaDescription: 'Bezpłatny webinar NIS2: jak przygotować dokumenty i dowody zgodności do audytu. Evidence pack, audit trail, checklista audytowa.',
    },
    lastUpdated: '2026-02-26',
  },
  {
    slug: 'nis2-kontrola-audyt',
    title: 'Kontrola, raportowanie i weryfikacja',
    subtitle: 'Jak wygląda praktyczna weryfikacja dojrzałości systemu cyberbezpieczeństwa? Jak raportować incydenty w 24h/72h?',
    date: '2026-04-28T10:00:00+02:00',
    dateDisplay: '28 kwietnia 2026, godz. 10:00',
    duration: '30 minut',
    location: 'Online (na żywo)',
    tags: ['Live', 'NIS2 & ISO 27001'],
    heroCtaLabel: 'Zarezerwuj miejsce',
    heroSecondaryText: 'Bezpłatny webinar online',
    trustLine: 'Dowiedz się, jak przygotować się na kontrolę i audyt NIS2.',
    icon: 'ShieldCheck',
    step: 4,
    outcomes: [
      'Jak wygląda praktyczna weryfikacja dojrzałości systemu cyberbezpieczeństwa?',
      'Jak raportować incydenty w 24h/72h?',
    ],
    agenda: [
      { time: '0–5 min', title: 'Przebieg audytu NIS2', description: 'Co się dzieje przed, w trakcie i po kontroli' },
      { time: '5–12 min', title: 'Przygotowanie organizacji', description: 'Jak przygotować zespół i dokumentację na dzień audytu' },
      { time: '12–20 min', title: 'Symulacja audytu', description: 'Interaktywny walkthrough: audytor pyta, Ty odpowiadasz' },
      { time: '20–25 min', title: 'Demo: Quantifier Audit', description: 'Zarządzanie audytem i planem naprawczym w platformie' },
      { time: '25–30 min', title: 'Q&A', description: 'Pytania uczestników i podsumowanie' },
    ],
    audience: [
      {
        role: 'Zarząd (CEO/COO/CFO)',
        icon: 'Building2',
        pains: ['Obawy o przebieg i wynik kontroli NIS2', 'Brak wiedzy o konsekwencjach negatywnego audytu', 'Brak planu naprawczego'],
        outcomes: ['Pewność siebie przed kontrolą', 'Gotowy plan reagowania na ustalenia'],
      },
      {
        role: 'Compliance / Risk',
        icon: 'Shield',
        pains: ['Brak doświadczenia z audytami NIS2', 'Niejasne oczekiwania audytora', 'Brak checklisty kontrolnej'],
        outcomes: ['Kompletna checklista 30+ punktów', 'Szablon planu naprawczego'],
      },
      {
        role: 'IT / CISO / Security',
        icon: 'Lock',
        pains: ['Brak przygotowania na pytania techniczne audytora', 'Trudność demonstrowania skuteczności zabezpieczeń'],
        outcomes: ['Lista pytań technicznych audytora z odpowiedziami', 'Sposób prezentacji dowodów technicznych'],
      },
    ],
    speakers: [],
    bonusMaterials: [],
    faqs: [
      { question: 'Czy będzie nagranie?', answer: 'Tak, nagranie zostanie udostępnione zarejestrowanym uczestnikom w ciągu 24h.' },
      { question: 'Czy webinar jest bezpłatny?', answer: 'Tak, udział jest całkowicie bezpłatny.' },
      { question: 'Czy to jest kontynuacja poprzednich webinarów?', answer: 'Webinar jest samodzielny, ale stanowi logiczne zamknięcie serii. Możesz uczestniczyć bez udziału w poprzednich sesjach.' },
      { question: 'Nie wiesz, czy podlegasz pod NIS2?', answer: 'Wypełnij naszą krótką ankietę i sprawdź w 2 minuty, czy Twoja organizacja może podlegać pod NIS2. Przejdź do ankiety na stronie /sprawdz-cyberbezpieczenstwo.' },
      { question: 'Czy mogę zaprosić zespół?', answer: 'Tak! Każda osoba powinna zarejestrować się indywidualnie.' },
    ],
    seo: {
      metaTitle: 'Kontrola NIS2: webinar — jak przejść audyt',
      metaDescription: 'Bezpłatny webinar: jak przejść audyt NIS2 od A do Z. Symulacja kontroli, checklista 30+ punktów, plan naprawczy. Dla compliance i IT.',
    },
    lastUpdated: '2026-02-26',
  },
];

export const getEventBySlug = (slug: string): EventData | undefined => {
  return events.find(e => e.slug === slug);
};
