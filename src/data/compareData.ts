// Compare page configurations
// Each entry defines a competitor comparison landing page

export interface CompareFeature {
  key: string; // i18n key suffix under compare.<slug>.features
  quantifier: boolean;
  competitor: boolean | 'partial';
}

export interface ComparePageConfig {
  slug: string;
  competitor: string;
  competitorUrl?: string;
  i18nKey: string; // namespace key under "compare"
}

export const comparePages: ComparePageConfig[] = [
  {
    slug: 'vanta-alternative',
    competitor: 'Vanta',
    competitorUrl: 'https://vanta.com',
    i18nKey: 'vantaAlternative',
  },
  {
    slug: 'drata-alternative',
    competitor: 'Drata',
    competitorUrl: 'https://drata.com',
    i18nKey: 'drataAlternative',
  },
  {
    slug: 'sprinto-alternative',
    competitor: 'Sprinto',
    competitorUrl: 'https://sprinto.com',
    i18nKey: 'sprintoAlternative',
  },
];

export const getComparePageBySlug = (slug: string): ComparePageConfig | undefined =>
  comparePages.find(p => p.slug === slug);
