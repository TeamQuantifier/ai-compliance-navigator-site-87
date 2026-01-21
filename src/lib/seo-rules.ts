// SEO Checklist Rules Configuration
// Based on real SEO best practices, not keyword density religion

export interface SeoRule {
  id: string;
  category: 'on-page' | 'technical';
  name: string;
  description: string;
  howToFix: string;
  points: number;
  severity: 'critical' | 'warning' | 'info';
  canAutoFix: boolean;
  autoFixAction?: 'generate-title' | 'generate-description' | 'generate-slug';
}

export interface SeoCheckResult {
  rule: SeoRule;
  passed: boolean;
  message: string;
  currentValue?: string | number;
  expectedValue?: string;
}

export interface SeoAnalysisResult {
  score: number;
  maxScore: number;
  status: 'error' | 'warning' | 'success';
  passed: SeoCheckResult[];
  failed: SeoCheckResult[];
}

// Configurable thresholds
export interface SeoThresholds {
  titleMin: number;
  titleMax: number;
  descriptionMin: number;
  descriptionMax: number;
  minWordsBlog: number;
  minWordsStory: number;
  thinContentThreshold: number;
  minInternalLinks: number;
  minExternalLinks: number;
  minH2Headers: number;
}

export const DEFAULT_THRESHOLDS: SeoThresholds = {
  titleMin: 45,
  titleMax: 60,
  descriptionMin: 120,
  descriptionMax: 160,
  minWordsBlog: 600,
  minWordsStory: 800,
  thinContentThreshold: 300,
  minInternalLinks: 2,
  minExternalLinks: 1,
  minH2Headers: 2,
};

// ON-PAGE RULES (60 points total)
export const ON_PAGE_RULES: SeoRule[] = [
  {
    id: 'seo-title-set',
    category: 'on-page',
    name: 'SEO Title ustawiony',
    description: 'Meta title powinien mieć 45-60 znaków dla optymalnego wyświetlania w SERP',
    howToFix: 'Ustaw SEO Title w zakładce Meta & Indexing. Idealnie 50-55 znaków.',
    points: 8,
    severity: 'critical',
    canAutoFix: true,
    autoFixAction: 'generate-title',
  },
  {
    id: 'meta-description-set',
    category: 'on-page',
    name: 'Meta description ustawiony',
    description: 'Meta description powinien mieć 120-160 znaków',
    howToFix: 'Napisz opis który zachęci do kliknięcia. Użyj frazy kluczowej naturalnie.',
    points: 8,
    severity: 'critical',
    canAutoFix: true,
    autoFixAction: 'generate-description',
  },
  {
    id: 'focus-keyword-set',
    category: 'on-page',
    name: 'Focus keyword ustawiony',
    description: 'Główna fraza kluczowa pomaga w optymalizacji treści',
    howToFix: 'Ustaw główną frazę kluczową, na którą chcesz pozycjonować artykuł.',
    points: 4,
    severity: 'warning',
    canAutoFix: false,
  },
  {
    id: 'keyword-in-title',
    category: 'on-page',
    name: 'Keyword w tytule/H1',
    description: 'Główna fraza kluczowa powinna występować w tytule lub nagłówku H1',
    howToFix: 'Umieść frazę kluczową w tytule artykułu w naturalny sposób.',
    points: 6,
    severity: 'warning',
    canAutoFix: false,
  },
  {
    id: 'keyword-in-intro',
    category: 'on-page',
    name: 'Keyword w pierwszych 100 słowach',
    description: 'Fraza kluczowa powinna pojawić się wcześnie w treści',
    howToFix: 'Użyj frazy kluczowej w pierwszym akapicie artykułu.',
    points: 4,
    severity: 'info',
    canAutoFix: false,
  },
  {
    id: 'single-h1',
    category: 'on-page',
    name: 'Jeden H1 na stronie',
    description: 'Strona powinna mieć dokładnie jeden nagłówek H1',
    howToFix: 'Upewnij się, że tylko tytuł artykułu jest oznaczony jako H1.',
    points: 4,
    severity: 'warning',
    canAutoFix: false,
  },
  {
    id: 'h2-headers-present',
    category: 'on-page',
    name: 'Nagłówki H2/H3 obecne',
    description: 'Minimum 2 nagłówki H2 strukturyzują treść i poprawiają czytelność',
    howToFix: 'Podziel treść na sekcje używając nagłówków H2 i H3.',
    points: 4,
    severity: 'warning',
    canAutoFix: false,
  },
  {
    id: 'content-length',
    category: 'on-page',
    name: 'Długość treści',
    description: 'Minimum 600 słów dla bloga, 800 dla case study',
    howToFix: 'Rozbuduj treść o więcej szczegółów, przykładów lub kontekstu.',
    points: 6,
    severity: 'warning',
    canAutoFix: false,
  },
  {
    id: 'internal-links',
    category: 'on-page',
    name: 'Linki wewnętrzne',
    description: 'Minimum 2 linki do innych stron w serwisie',
    howToFix: 'Dodaj linki do powiązanych artykułów lub stron produktowych.',
    points: 6,
    severity: 'warning',
    canAutoFix: false,
  },
  {
    id: 'external-links',
    category: 'on-page',
    name: 'Link zewnętrzny',
    description: 'Minimum 1 link do wiarygodnego źródła zewnętrznego',
    howToFix: 'Podlinkuj do wiarygodnego źródła (np. badania, dokumentacja).',
    points: 4,
    severity: 'info',
    canAutoFix: false,
  },
  {
    id: 'featured-image-alt',
    category: 'on-page',
    name: 'ALT obrazka wyróżniającego',
    description: 'Obrazek wyróżniający powinien mieć opisowy tekst alternatywny',
    howToFix: 'Dodaj tekst ALT opisujący obrazek wyróżniający.',
    points: 2,
    severity: 'info',
    canAutoFix: false,
  },
  {
    id: 'no-thin-content',
    category: 'on-page',
    name: 'Brak thin content',
    description: 'Treść poniżej 300 słów jest uznawana za "thin content"',
    howToFix: 'Artykuł jest zbyt krótki. Rozbuduj go do minimum 300 słów.',
    points: 4,
    severity: 'critical',
    canAutoFix: false,
  },
];

// TECHNICAL RULES (40 points total)
export const TECHNICAL_RULES: SeoRule[] = [
  {
    id: 'canonical-correct',
    category: 'technical',
    name: 'Canonical URL poprawny',
    description: 'Canonical URL powinien być ustawiony lub domyślnie wygenerowany',
    howToFix: 'Pozostaw pole puste (użyje domyślnego URL) lub ustaw własny canonical.',
    points: 8,
    severity: 'warning',
    canAutoFix: false,
  },
  {
    id: 'robots-correct',
    category: 'technical',
    name: 'Robots index/follow',
    description: 'Ustawienia robots powinny być zgodne ze statusem publikacji',
    howToFix: 'Dla opublikowanych stron włącz index i follow.',
    points: 6,
    severity: 'warning',
    canAutoFix: false,
  },
  {
    id: 'og-tags-complete',
    category: 'technical',
    name: 'OG tags kompletne',
    description: 'Wszystkie wymagane tagi Open Graph: title, description, image, url',
    howToFix: 'Uzupełnij brakujące pola OG w sekcji Social.',
    points: 8,
    severity: 'warning',
    canAutoFix: false,
  },
  {
    id: 'twitter-tags-complete',
    category: 'technical',
    name: 'Twitter tags kompletne',
    description: 'Tagi Twitter Card: card type, title, image',
    howToFix: 'Uzupełnij brakujące pola Twitter w sekcji Social.',
    points: 4,
    severity: 'info',
    canAutoFix: false,
  },
  {
    id: 'schema-valid',
    category: 'technical',
    name: 'Schema JSON-LD poprawne',
    description: 'Strukturalne dane JSON-LD muszą być poprawne',
    howToFix: 'Sprawdź poprawność Schema w zakładce Schema.',
    points: 8,
    severity: 'warning',
    canAutoFix: false,
  },
  {
    id: 'sitemap-included',
    category: 'technical',
    name: 'Sitemap zawiera stronę',
    description: 'Opublikowane strony powinny być w sitemap',
    howToFix: 'Publikacja artykułu automatycznie doda go do sitemap.',
    points: 4,
    severity: 'info',
    canAutoFix: false,
  },
  {
    id: 'unique-title',
    category: 'technical',
    name: 'Unikalny SEO title',
    description: 'SEO title nie powinien być zduplikowany w innych artykułach',
    howToFix: 'Zmień tytuł SEO aby był unikalny w obrębie serwisu.',
    points: 2,
    severity: 'warning',
    canAutoFix: false,
  },
];

export const ALL_RULES = [...ON_PAGE_RULES, ...TECHNICAL_RULES];

export const MAX_SCORE = ALL_RULES.reduce((sum, rule) => sum + rule.points, 0);

export function getScoreStatus(score: number): 'error' | 'warning' | 'success' {
  const percentage = (score / MAX_SCORE) * 100;
  if (percentage < 50) return 'error';
  if (percentage < 80) return 'warning';
  return 'success';
}

export function getScoreColor(status: 'error' | 'warning' | 'success'): string {
  switch (status) {
    case 'error': return 'text-destructive';
    case 'warning': return 'text-yellow-500';
    case 'success': return 'text-green-500';
  }
}

export function getScoreBgColor(status: 'error' | 'warning' | 'success'): string {
  switch (status) {
    case 'error': return 'bg-destructive/10';
    case 'warning': return 'bg-yellow-500/10';
    case 'success': return 'bg-green-500/10';
  }
}
