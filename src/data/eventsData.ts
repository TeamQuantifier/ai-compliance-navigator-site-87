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
  date: string; // ISO date
  dateDisplay: string;
  duration: string;
  location: string;
  tags: string[];
  heroCtaLabel: string;
  heroSecondaryText: string;
  trustLine: string;
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
    slug: 'nis2-w-polsce',
    title: 'NIS2 w Polsce: plan 30/60/90 dni na gotowość bez chaosu',
    subtitle: 'Praktyczny webinar dla zarządu, compliance i IT: redukcja ryzyka, audit-ready dowody, jasne role i proces incydentów.',
    date: '2026-03-10T10:00:00+01:00',
    dateDisplay: '10 marca 2026',
    duration: '45 minut',
    location: 'Online (na żywo)',
    tags: ['Live', 'NIS2/KSC'],
    heroCtaLabel: 'Zarezerwuj miejsce',
    heroSecondaryText: 'Odbierz NIS2 Sprint Kit po rejestracji',
    trustLine: 'W pakiecie: checklista, szablony, struktura dowodów zgodności.',
    outcomes: [
      'Plan działań 30/60/90 dni pod NIS2/KSC',
      '7 krytycznych kontroli zwiększających bezpieczeństwo i gotowość audytową',
      'Checklista incident response i raportowania',
      'Szybka ocena ryzyka dostawców i minimalne wymagania',
      '"Evidence pack": jak zbierać dowody zgodności (audit-ready)',
    ],
    agenda: [
      { time: '0–6 min', title: 'Kontekst i zakres', description: 'Kogo dotyczy NIS2/KSC i co robić teraz' },
      { time: '6–26 min', title: '7 krytycznych kontroli', description: 'Każda kontrola: co wdrożyć + jaki dowód zachować' },
      { time: '26–34 min', title: 'Typowe błędy i case study', description: '"Chaos wdrożeniowy" — jak go uniknąć' },
      { time: '34–40 min', title: 'Walkthrough platformy', description: 'Jak zarządzać dowodami i procesami w Quantifier' },
      { time: '40–44 min', title: 'Q&A', description: 'Pytania uczestników' },
      { time: '44–45 min', title: 'Next steps', description: 'Gap Call + Sprint Kit' },
    ],
    audience: [
      {
        role: 'Zarząd (CEO/COO/CFO)',
        icon: 'Building2',
        pains: [
          'Brak jasności co do odpowiedzialności zarządu za NIS2',
          'Ryzyko kar finansowych i osobistej odpowiedzialności',
          'Brak przejrzystości stanu compliance',
        ],
        outcomes: [
          'Jasna mapa odpowiedzialności i ryzyk',
          'Dashboard stanu zgodności dla zarządu',
        ],
      },
      {
        role: 'Compliance / Risk',
        icon: 'Shield',
        pains: [
          'Brak struktury dowodów i procesów audytowych',
          'Trudność koordynacji wdrożenia między działami',
          'Niejasne wymagania raportowania incydentów',
        ],
        outcomes: [
          'Gotowy framework audit-ready z szablonami',
          'Checklista incident response i raportowania',
        ],
      },
      {
        role: 'IT / CISO / Security',
        icon: 'Lock',
        pains: [
          'Wymogi techniczne NIS2/KSC bez jasnych wytycznych',
          'Brak ustrukturyzowanego procesu oceny ryzyka dostawców',
        ],
        outcomes: [
          '7 krytycznych kontroli technicznych krok po kroku',
          'Proces szybkiej oceny ryzyka łańcucha dostaw',
        ],
      },
    ],
    speakers: [
      {
        name: 'Jan Kowalski',
        title: 'Head of Compliance',
        company: 'Quantifier.ai',
        bio: 'Ekspert ds. compliance z ponad 10-letnim doświadczeniem w implementacji NIS2, ISO 27001 i DORA. Pomógł dziesiątkom organizacji w Polsce przejść audit NIS2.',
        linkedInUrl: 'https://linkedin.com/in/',
      },
    ],
    bonusMaterials: [
      'Checklista 30/60/90 dni NIS2/KSC (PDF)',
      'Szablon planu incident response',
      'Szablon oceny ryzyka dostawców',
      'Struktura "evidence pack" — dowody zgodności',
      'Szablon ról i odpowiedzialności NIS2',
    ],
    faqs: [
      { question: 'Czy będzie nagranie?', answer: 'Tak, nagranie zostanie udostępnione wszystkim zarejestrowanym uczestnikom w ciągu 24 godzin po webinarze. Jednak materiały bonusowe (Sprint Kit) są dostępne wyłącznie dla uczestników na żywo.' },
      { question: 'Czy webinar jest bezpłatny?', answer: 'Tak, udział w webinarze jest całkowicie bezpłatny. Wystarczy się zarejestrować, aby zarezerwować miejsce.' },
      { question: 'Dla kogo jest ten webinar?', answer: 'Webinar jest skierowany do zarządów, menedżerów compliance/risk, CISO i zespołów IT w organizacjach, które mogą podlegać dyrektywie NIS2 i polskiej ustawie o Krajowym Systemie Cyberbezpieczeństwa (KSC).' },
      { question: 'Jak otrzymam materiały i Sprint Kit?', answer: 'Sprint Kit (checklista, szablony, struktury dowodów) zostanie wysłany na podany adres e-mail w ciągu 1 godziny po zakończeniu webinaru.' },
      { question: 'Czy mogę zaprosić zespół?', answer: 'Oczywiście! Zachęcamy do udziału zespołowego. Każda osoba powinna zarejestrować się indywidualnie, aby otrzymać materiały na swój adres e-mail.' },
    ],
    seo: {
      metaTitle: 'NIS2 w Polsce: webinar — plan 30/60/90 dni',
      metaDescription: 'Bezpłatny webinar NIS2/KSC: plan działań 30/60/90 dni, 7 kontroli, incident response, dowody zgodności. Dla zarządu, compliance i IT.',
    },
    lastUpdated: '2026-02-24',
  },
];

export const getEventBySlug = (slug: string): EventData | undefined => {
  return events.find(e => e.slug === slug);
};
