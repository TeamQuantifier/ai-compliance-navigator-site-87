import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '@/contexts/LanguageContext';
import PageTemplate from '@/components/PageTemplate';
import EventCard from '@/components/events/EventCard';
import FAQSection from '@/components/seo/FAQSection';
import { events } from '@/data/eventsData';
import { ChevronRight, Calendar } from 'lucide-react';

const bannerMap: Record<string, string> = {
  pl: '/lovable-uploads/webinar-cycle-banner-pl.jpg',
  en: '/lovable-uploads/webinar-cycle-banner-en.jpg',
  cs: '/lovable-uploads/webinar-cycle-banner-cs.jpg',
};

const altMap: Record<string, string> = {
  pl: 'Cykl webinarów Quantifier — Cyberbezpieczeństwo NIS2 i ISO 27001',
  en: 'Quantifier Webinar Series — NIS2 Cybersecurity & ISO 27001',
  cs: 'Série webinářů Quantifier — Kybernetická bezpečnost NIS2 a ISO 27001',
};

const EventsHub = () => {
  const { currentLocale } = useLanguage();
  const { t } = useTranslation();

  const faqs = Array.from({ length: 10 }, (_, i) => ({
    question: t(`eventsHub.faq${i + 1}q`),
    answer: t(`eventsHub.faq${i + 1}a`),
  }));

  const webinarHighlights = [
    {
      titleKey: 'eventsHub.webinar1title',
      dateKey: 'eventsHub.webinar1date',
      questions: ['eventsHub.webinar1q1', 'eventsHub.webinar1q2', 'eventsHub.webinar1q3', 'eventsHub.webinar1q4'],
    },
    {
      titleKey: 'eventsHub.webinar2title',
      dateKey: 'eventsHub.webinar2date',
      questions: ['eventsHub.webinar2q1', 'eventsHub.webinar2q2', 'eventsHub.webinar2q3'],
    },
    {
      titleKey: 'eventsHub.webinar3title',
      dateKey: 'eventsHub.webinar3date',
      questions: ['eventsHub.webinar3q1', 'eventsHub.webinar3q2', 'eventsHub.webinar3q3'],
    },
    {
      titleKey: 'eventsHub.webinar4title',
      dateKey: 'eventsHub.webinar4date',
      questions: ['eventsHub.webinar4q1', 'eventsHub.webinar4q2'],
    },
  ];

  const localeTag = currentLocale === 'cs' ? 'cs-CZ' : currentLocale === 'pl' ? 'pl-PL' : 'en-GB';

  const localizedEvents = events.map((event, idx) => {
    const highlight = webinarHighlights[idx];

    return {
      ...event,
      title: highlight ? t(highlight.titleKey) : event.title,
      dateDisplay: new Date(event.date).toLocaleString(localeTag, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
      location: t('eventsHub.eventLocationLive'),
      heroCtaLabel: t('eventsHub.eventCtaLabel'),
      tags: [t('eventsHub.eventTagLive'), 'NIS2'],
      outcomes: highlight ? highlight.questions.map((qKey) => t(qKey)) : event.outcomes,
    };
  });

  return (
    <PageTemplate
      title={t('eventsHub.pageTitle')}
      description={t('eventsHub.pageDescription')}
    >
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-1 text-sm text-muted-foreground mb-8">
        <Link to={`/${currentLocale}`} className="hover:text-foreground">{t('eventsHub.breadcrumbHome')}</Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-foreground font-medium">{t('eventsHub.breadcrumbEvents')}</span>
      </nav>

      {/* Cycle intro hero */}
      <section className="mb-12 rounded-xl overflow-hidden border border-border bg-card">
        <img
          src={bannerMap[currentLocale] || bannerMap.en}
          alt={altMap[currentLocale] || altMap.en}
          className="w-full h-auto"
          loading="eager"
        />
        <div className="p-6 md:p-10 text-center">
          <p className="text-sm md:text-base font-semibold uppercase tracking-wider text-primary mb-3">
            {t('eventsHub.cycleLabel')}
          </p>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 leading-tight">
            {t('eventsHub.heroTitle')}
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto font-medium">
            {t('eventsHub.heroSubtitle')}
          </p>
        </div>
      </section>

      {/* Intro content section */}
      <section className="mb-12">
        <div className="prose prose-slate max-w-3xl text-muted-foreground space-y-5">
          <p>{t('eventsHub.introP1')}</p>

          <ul className="list-disc pl-5 space-y-2">
            <li className="text-foreground font-medium">{t('eventsHub.bulletBoard')}</li>
            <li className="text-foreground font-medium">{t('eventsHub.bulletOrg')}</li>
            <li className="text-foreground font-medium">{t('eventsHub.bulletMarket')}</li>
          </ul>

          <p>{t('eventsHub.introP2')}</p>
          <p>{t('eventsHub.introP3')}</p>
          <p className="italic text-sm border-l-4 border-primary pl-4">{t('eventsHub.formatDescription')}</p>
        </div>
      </section>

      {/* Event grid */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-12">
        {localizedEvents.map(event => (
          <EventCard key={event.slug} event={event} />
        ))}
      </section>

      {/* Closing text */}
      <section className="mb-16 max-w-3xl">
        <p className="text-muted-foreground">{t('eventsHub.closingText')}</p>
      </section>

      {/* FAQ section with JSON-LD */}
      <FAQSection
        title={t('eventsHub.faqTitle')}
        faqs={faqs}
        pageUrl={`https://quantifier.ai/${currentLocale}/events/`}
      />

    </PageTemplate>
  );
};

export default EventsHub;
