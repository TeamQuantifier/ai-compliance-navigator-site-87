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
  imageUrl: string;
  imageAlt: string;
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
    title: 'Nowa mapa ryzyka: NIS2 i realne obowiązki',
    subtitle: 'Dowiedz się, jakie obowiązki nakłada NIS2/KSC na Twoją organizację i jak zbudować mapę ryzyka krok po kroku.',
    date: '2026-03-10T10:00:00+01:00',
    dateDisplay: '10 marca 2026, godz. 10:00',
    duration: '45 minut',
    location: 'Online (na żywo)',
    tags: ['Live', 'NIS2/KSC'],
    heroCtaLabel: 'Zarezerwuj miejsce',
    heroSecondaryText: 'Odbierz NIS2 Sprint Kit po rejestracji',
    trustLine: 'W pakiecie: checklista ryzyk, szablon oceny, matryca priorytetów.',
    imageUrl: '{image_url_1}',
    imageAlt: 'Webinar NIS2 mapa ryzyka — identyfikacja obowiązków i zagrożeń cyberbezpieczeństwa w organizacji',
    outcomes: [
      'Zrozumiesz, kto podlega NIS2/KSC i jakie ma obowiązki',
      'Otrzymasz gotową matrycę ryzyk z priorytetami',
      'Nauczysz się identyfikować luki w zabezpieczeniach organizacji',
      'Poznasz 5 najczęstszych błędów przy ocenie ryzyka NIS2',
      'Pobierzesz szablon mapy ryzyka do natychmiastowego użycia',
    ],
    agenda: [
      { time: '0–5 min', title: 'Kontekst NIS2/KSC', description: 'Kogo dotyczy, co się zmieniło, dlaczego teraz' },
      { time: '5–15 min', title: 'Obowiązki krok po kroku', description: 'Przegląd wymagań regulacyjnych z praktycznymi przykładami' },
      { time: '15–28 min', title: 'Budowanie mapy ryzyka', description: 'Jak zidentyfikować, ocenić i priorytetyzować ryzyka' },
      { time: '28–35 min', title: 'Najczęstsze błędy', description: '5 pułapek i jak ich uniknąć' },
      { time: '35–42 min', title: 'Demo: Quantifier Risk Map', description: 'Walkthrough platformy — mapa ryzyka w praktyce' },
      { time: '42–45 min', title: 'Q&A + next steps', description: 'Pytania uczestników, Sprint Kit, Gap Call' },
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
        pains: ['Wymogi techniczne NIS2/KSC bez jasnych wytycznych', 'Brak ustrukturyzowanego procesu identyfikacji zagrożeń'],
        outcomes: ['Praktyczna checklista zabezpieczeń technicznych', 'Mapa luk do zamknięcia w pierwszej kolejności'],
      },
    ],
    speakers: [
      {
        name: 'Ekspert NIS2',
        title: 'Head of Compliance',
        company: 'Quantifier.ai',
        bio: 'Ekspert ds. compliance z doświadczeniem w implementacji NIS2, ISO 27001 i DORA w polskich organizacjach.',
        linkedInUrl: 'https://linkedin.com/company/quantifier-ai',
      },
    ],
    bonusMaterials: [
      'Matryca ryzyk NIS2/KSC (Excel)',
      'Checklista obowiązków NIS2 dla zarządu',
      'Szablon oceny ryzyka dostawców',
      'Infografika: kto podlega NIS2 w Polsce',
      'Poradnik: 5 kroków do mapy ryzyka',
    ],
    faqs: [
      { question: 'Czy będzie nagranie?', answer: 'Tak, nagranie zostanie udostępnione wszystkim zarejestrowanym uczestnikom w ciągu 24 godzin po webinarze. Materiały bonusowe (Sprint Kit) są dostępne wyłącznie dla uczestników na żywo.' },
      { question: 'Czy webinar jest bezpłatny?', answer: 'Tak, udział jest całkowicie bezpłatny. Wystarczy się zarejestrować, aby zarezerwować miejsce.' },
      { question: 'Dla kogo jest ten webinar?', answer: 'Dla zarządów, menedżerów compliance/risk, CISO i zespołów IT w organizacjach, które mogą podlegać NIS2/KSC.' },
      { question: 'Jak otrzymam materiały?', answer: 'Sprint Kit zostanie wysłany na podany adres e-mail w ciągu 1 godziny po zakończeniu webinaru.' },
      { question: 'Czy mogę zaprosić zespół?', answer: 'Oczywiście! Zachęcamy do udziału zespołowego. Każda osoba powinna zarejestrować się indywidualnie.' },
    ],
    seo: {
      metaTitle: 'NIS2 mapa ryzyka: webinar — obowiązki i zagrożenia',
      metaDescription: 'Bezpłatny webinar NIS2/KSC: jak zbudować mapę ryzyka, zidentyfikować obowiązki i uniknąć najczęstszych błędów. Dla zarządu, compliance i IT.',
    },
    lastUpdated: '2026-02-25',
  },
  {
    slug: 'nis2-role-i-procesy',
    title: 'System, który działa: role i procesy (NIS2/ISO)',
    subtitle: 'Jak zdefiniować role, procesy i odpowiedzialności w systemie zarządzania cyberbezpieczeństwem zgodnym z NIS2 i ISO 27001.',
    date: '2026-03-24T10:00:00+01:00',
    dateDisplay: '24 marca 2026, godz. 10:00',
    duration: '45 minut',
    location: 'Online (na żywo)',
    tags: ['Live', 'NIS2/KSC'],
    heroCtaLabel: 'Zarezerwuj miejsce',
    heroSecondaryText: 'Odbierz szablon ról i procesów po rejestracji',
    trustLine: 'W pakiecie: matryca RACI, szablon procesów, checklista ról.',
    imageUrl: '/lovable-uploads/event-nis2-role-i-procesy.png',
    imageAlt: 'Webinar NIS2 role i procesy — budowa systemu zarządzania cyberbezpieczeństwem w organizacji',
    outcomes: [
      'Zdefiniujesz kluczowe role w systemie NIS2/ISO 27001',
      'Otrzymasz gotową matrycę RACI do wdrożenia',
      'Dowiesz się, jak zaprojektować procesy incident response',
      'Poznasz wymagania dotyczące eskalacji i raportowania',
      'Pobierzesz szablon procesów cyberbezpieczeństwa',
    ],
    agenda: [
      { time: '0–5 min', title: 'Dlaczego role i procesy?', description: 'Najczęstsze problemy wdrożeniowe NIS2' },
      { time: '5–15 min', title: 'Kluczowe role NIS2/ISO', description: 'Kto za co odpowiada: zarząd, CISO, DPO, compliance' },
      { time: '15–25 min', title: 'Matryca RACI', description: 'Jak zbudować i wdrożyć matrycę odpowiedzialności' },
      { time: '25–35 min', title: 'Procesy: incident response', description: 'Projektowanie procesów zgodnych z NIS2 i ISO 27001' },
      { time: '35–42 min', title: 'Demo: Quantifier Workflows', description: 'Automatyzacja procesów compliance w platformie' },
      { time: '42–45 min', title: 'Q&A + next steps', description: 'Pytania, Sprint Kit, Gap Call' },
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
    speakers: [
      {
        name: 'Ekspert NIS2',
        title: 'Head of Compliance',
        company: 'Quantifier.ai',
        bio: 'Ekspert ds. compliance z doświadczeniem w implementacji NIS2, ISO 27001 i DORA w polskich organizacjach.',
        linkedInUrl: 'https://linkedin.com/company/quantifier-ai',
      },
    ],
    bonusMaterials: [
      'Matryca RACI dla NIS2/ISO 27001 (Excel)',
      'Szablon procesu incident response',
      'Checklista ról i odpowiedzialności',
      'Flowchart: eskalacja i raportowanie incydentów',
      'Szablon polityki zarządzania cyberbezpieczeństwem',
    ],
    faqs: [
      { question: 'Czy będzie nagranie?', answer: 'Tak, nagranie zostanie udostępnione zarejestrowanym uczestnikom w ciągu 24h. Materiały bonusowe są dostępne wyłącznie dla uczestników na żywo.' },
      { question: 'Czy webinar jest bezpłatny?', answer: 'Tak, udział jest całkowicie bezpłatny.' },
      { question: 'Czym różni się od webinaru o mapie ryzyka?', answer: 'Ten webinar koncentruje się na budowie systemu zarządzania — rolach, procesach i odpowiedzialnościach. Webinar o mapie ryzyka skupia się na identyfikacji i ocenie zagrożeń.' },
      { question: 'Czy potrzebuję ISO 27001?', answer: 'Nie, ale webinar pokazuje synergię między NIS2 a ISO 27001. Materiały są przydatne niezależnie od posiadanych certyfikatów.' },
      { question: 'Czy mogę zaprosić zespół?', answer: 'Tak! Każda osoba powinna zarejestrować się indywidualnie, aby otrzymać materiały.' },
    ],
    seo: {
      metaTitle: 'NIS2 role i procesy: webinar — system zarządzania',
      metaDescription: 'Bezpłatny webinar: jak zdefiniować role, procesy i matrycę RACI w systemie NIS2/ISO 27001. Szablony incident response dla compliance i IT.',
    },
    lastUpdated: '2026-02-25',
  },
  {
    slug: 'nis2-audit-ready',
    title: 'Audit-ready: dokumenty i dowody zgodności (NIS2)',
    subtitle: 'Jak przygotować dokumentację i dowody zgodności, które przejdą audyt NIS2/KSC bez zastrzeżeń.',
    date: '2026-04-14T10:00:00+02:00',
    dateDisplay: '14 kwietnia 2026, godz. 10:00',
    duration: '45 minut',
    location: 'Online (na żywo)',
    tags: ['Live', 'NIS2/KSC'],
    heroCtaLabel: 'Zarezerwuj miejsce',
    heroSecondaryText: 'Odbierz Evidence Pack po rejestracji',
    trustLine: 'W pakiecie: struktura dowodów, szablony dokumentów, checklista audytowa.',
    imageUrl: '{image_url_3}',
    imageAlt: 'Webinar NIS2 audit-ready — przygotowanie dokumentów i dowodów zgodności do audytu cyberbezpieczeństwa',
    outcomes: [
      'Poznasz wymagania dokumentacyjne NIS2/KSC',
      'Otrzymasz strukturę "evidence pack" gotową do audytu',
      'Dowiesz się, jakie dowody zbierać i jak je organizować',
      'Nauczysz się budować ścieżkę audytową (audit trail)',
      'Pobierzesz checklistę dokumentów wymaganych przez audytora',
    ],
    agenda: [
      { time: '0–5 min', title: 'Wymagania dokumentacyjne NIS2', description: 'Co audytor sprawdza w pierwszej kolejności' },
      { time: '5–18 min', title: 'Evidence pack: struktura', description: 'Jak zorganizować dowody zgodności w logiczną strukturę' },
      { time: '18–28 min', title: 'Audit trail w praktyce', description: 'Budowanie ścieżki audytowej krok po kroku' },
      { time: '28–35 min', title: 'Najczęstsze braki', description: 'Co najczęściej "wali" audyt i jak tego uniknąć' },
      { time: '35–42 min', title: 'Demo: Quantifier Evidence', description: 'Zarządzanie dowodami zgodności w platformie' },
      { time: '42–45 min', title: 'Q&A + next steps', description: 'Pytania, Evidence Pack, Gap Call' },
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
    speakers: [
      {
        name: 'Ekspert NIS2',
        title: 'Head of Compliance',
        company: 'Quantifier.ai',
        bio: 'Ekspert ds. compliance z doświadczeniem w implementacji NIS2, ISO 27001 i DORA w polskich organizacjach.',
        linkedInUrl: 'https://linkedin.com/company/quantifier-ai',
      },
    ],
    bonusMaterials: [
      'Struktura evidence pack NIS2 (PDF)',
      'Checklista dokumentów wymaganych przez audytora',
      'Szablon polityki bezpieczeństwa informacji',
      'Szablon rejestru incydentów',
      'Poradnik: audit trail w 5 krokach',
    ],
    faqs: [
      { question: 'Czy będzie nagranie?', answer: 'Tak, nagranie zostanie udostępnione zarejestrowanym uczestnikom w ciągu 24h. Evidence Pack jest dostępny wyłącznie dla uczestników na żywo.' },
      { question: 'Czy webinar jest bezpłatny?', answer: 'Tak, udział jest całkowicie bezpłatny.' },
      { question: 'Czy muszę mieć wcześniejsze doświadczenie z audytami?', answer: 'Nie, webinar jest zaprojektowany zarówno dla osób przygotowujących się do pierwszego audytu, jak i dla doświadczonych praktyków.' },
      { question: 'Jakie dokumenty są wymagane przez NIS2?', answer: 'Webinar szczegółowo omówi pełną listę wymaganych dokumentów. W skrócie: polityki bezpieczeństwa, procedury incident response, oceny ryzyka, plany ciągłości działania i rejestry incydentów.' },
      { question: 'Czy mogę zaprosić zespół?', answer: 'Tak! Każda osoba powinna zarejestrować się indywidualnie.' },
    ],
    seo: {
      metaTitle: 'NIS2 audit-ready: webinar — dokumenty i dowody',
      metaDescription: 'Bezpłatny webinar NIS2: jak przygotować dokumenty i dowody zgodności do audytu KSC. Evidence pack, audit trail, checklista audytowa.',
    },
    lastUpdated: '2026-02-25',
  },
  {
    slug: 'nis2-kontrola-audyt',
    title: 'Kontrola NIS2: jak przejść audyt od A do Z',
    subtitle: 'Kompletny przewodnik po audycie NIS2/KSC — od przygotowania po raport końcowy i plan naprawczy.',
    date: '2026-04-28T10:00:00+02:00',
    dateDisplay: '28 kwietnia 2026, godz. 10:00',
    duration: '45 minut',
    location: 'Online (na żywo)',
    tags: ['Live', 'NIS2/KSC'],
    heroCtaLabel: 'Zarezerwuj miejsce',
    heroSecondaryText: 'Odbierz Audit Survival Kit po rejestracji',
    trustLine: 'W pakiecie: symulacja audytu, checklista kontrolna, plan naprawczy.',
    imageUrl: '{image_url_4}',
    imageAlt: 'Webinar kontrola NIS2 — jak przejść audyt cyberbezpieczeństwa od przygotowania po raport końcowy',
    outcomes: [
      'Poznasz przebieg kontroli/audytu NIS2 krok po kroku',
      'Dowiesz się, jak przygotować organizację na dzień audytu',
      'Otrzymasz checklistę kontrolną z 30+ punktami',
      'Nauczysz się reagować na ustalenia audytora',
      'Pobierzesz szablon planu naprawczego (remediation plan)',
    ],
    agenda: [
      { time: '0–5 min', title: 'Przebieg audytu NIS2', description: 'Co się dzieje przed, w trakcie i po kontroli' },
      { time: '5–15 min', title: 'Przygotowanie organizacji', description: 'Jak przygotować zespół i dokumentację na dzień audytu' },
      { time: '15–25 min', title: 'Symulacja audytu', description: 'Interaktywny walkthrough: audytor pyta, Ty odpowiadasz' },
      { time: '25–35 min', title: 'Ustalenia i plan naprawczy', description: 'Jak reagować na findings i budować remediation plan' },
      { time: '35–42 min', title: 'Demo: Quantifier Audit', description: 'Zarządzanie audytem i planem naprawczym w platformie' },
      { time: '42–45 min', title: 'Q&A + next steps', description: 'Pytania, Audit Survival Kit, Gap Call' },
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
    speakers: [
      {
        name: 'Ekspert NIS2',
        title: 'Head of Compliance',
        company: 'Quantifier.ai',
        bio: 'Ekspert ds. compliance z doświadczeniem w implementacji NIS2, ISO 27001 i DORA w polskich organizacjach.',
        linkedInUrl: 'https://linkedin.com/company/quantifier-ai',
      },
    ],
    bonusMaterials: [
      'Checklista kontrolna audytu NIS2 (30+ punktów)',
      'Szablon planu naprawczego (remediation plan)',
      'Lista pytań audytora z przykładowymi odpowiedziami',
      'Flowchart: przebieg kontroli NIS2 krok po kroku',
      'Szablon raportu z audytu wewnętrznego',
    ],
    faqs: [
      { question: 'Czy będzie nagranie?', answer: 'Tak, nagranie zostanie udostępnione zarejestrowanym uczestnikom w ciągu 24h. Audit Survival Kit jest dostępny wyłącznie dla uczestników na żywo.' },
      { question: 'Czy webinar jest bezpłatny?', answer: 'Tak, udział jest całkowicie bezpłatny.' },
      { question: 'Czy to jest kontynuacja poprzednich webinarów?', answer: 'Webinar jest samodzielny, ale stanowi logiczne zamknięcie serii. Możesz uczestniczyć bez udziału w poprzednich sesjach.' },
      { question: 'Kto przeprowadza audyty NIS2 w Polsce?', answer: 'Audyty mogą być przeprowadzane przez organy właściwe ds. cyberbezpieczeństwa (np. CSIRT, sektorowe organy nadzoru) lub przez zewnętrznych audytorów na zlecenie organizacji.' },
      { question: 'Czy mogę zaprosić zespół?', answer: 'Tak! Każda osoba powinna zarejestrować się indywidualnie.' },
    ],
    seo: {
      metaTitle: 'Kontrola NIS2: webinar — jak przejść audyt',
      metaDescription: 'Bezpłatny webinar: jak przejść audyt NIS2/KSC od A do Z. Symulacja kontroli, checklista 30+ punktów, plan naprawczy. Dla compliance i IT.',
    },
    lastUpdated: '2026-02-25',
  },
];

export const getEventBySlug = (slug: string): EventData | undefined => {
  return events.find(e => e.slug === slug);
};
