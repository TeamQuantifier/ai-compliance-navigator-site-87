import { useTranslation } from 'react-i18next';
import { getEventBySlug, type EventData } from '@/data/eventsData';

const SLUG_TO_KEY: Record<string, string> = {
  'nis2-mapa-ryzyka': 'nis2MapaRyzyka',
  'nis2-role-i-procesy': 'nis2RoleIProcesy',
  'nis2-audit-ready': 'nis2AuditReady',
  'nis2-kontrola-audyt': 'nis2KontrolaAudyt',
};

const WEBINAR_STRUCTURE: Record<string, {
  outcomes: number;
  agenda: number;
  audience: { pains: number; outcomes: number }[];
  faqs: number;
}> = {
  nis2MapaRyzyka: { outcomes: 4, agenda: 6, audience: [{ pains: 3, outcomes: 2 }, { pains: 3, outcomes: 2 }, { pains: 2, outcomes: 2 }], faqs: 5 },
  nis2RoleIProcesy: { outcomes: 3, agenda: 5, audience: [{ pains: 3, outcomes: 2 }, { pains: 3, outcomes: 2 }, { pains: 2, outcomes: 2 }], faqs: 5 },
  nis2AuditReady: { outcomes: 3, agenda: 5, audience: [{ pains: 3, outcomes: 2 }, { pains: 3, outcomes: 2 }, { pains: 2, outcomes: 2 }], faqs: 5 },
  nis2KontrolaAudyt: { outcomes: 2, agenda: 5, audience: [{ pains: 3, outcomes: 2 }, { pains: 3, outcomes: 2 }, { pains: 2, outcomes: 2 }], faqs: 5 },
};

const range = (n: number) => Array.from({ length: n }, (_, i) => i + 1);

export const useLocalizedEvent = (slug: string): EventData | null => {
  const { t } = useTranslation();
  const base = getEventBySlug(slug);
  if (!base) return null;

  const key = SLUG_TO_KEY[slug];
  if (!key) return base;

  const s = WEBINAR_STRUCTURE[key];
  if (!s) return base;

  const p = `eventDetail.${key}`;

  return {
    ...base,
    title: t(`${p}.title`),
    subtitle: t(`${p}.subtitle`),
    trustLine: t(`${p}.trustLine`),
    dateDisplay: t(`${p}.dateDisplay`),
    duration: t(`${p}.duration`),
    location: t(`${p}.location`),
    heroCtaLabel: t(`${p}.heroCtaLabel`),
    heroSecondaryText: t(`${p}.heroSecondaryText`),
    outcomes: range(s.outcomes).map(i => t(`${p}.outcome${i}`)),
    agenda: range(s.agenda).map(i => ({
      time: t(`${p}.agenda${i}Time`),
      title: t(`${p}.agenda${i}Title`),
      description: t(`${p}.agenda${i}Desc`),
    })),
    audience: s.audience.map((a, idx) => ({
      ...base.audience[idx],
      role: t(`${p}.audience${idx + 1}Role`),
      pains: range(a.pains).map(j => t(`${p}.audience${idx + 1}Pain${j}`)),
      outcomes: range(a.outcomes).map(j => t(`${p}.audience${idx + 1}Outcome${j}`)),
    })),
    faqs: range(s.faqs).map(i => ({
      question: t(`${p}.faq${i}q`),
      answer: t(`${p}.faq${i}a`),
    })),
    seo: {
      ...base.seo,
      metaTitle: t(`${p}.seoTitle`),
      metaDescription: t(`${p}.seoDesc`),
    },
  };
};
