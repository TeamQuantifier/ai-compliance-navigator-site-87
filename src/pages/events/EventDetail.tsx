import { useRef } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useLanguage } from '@/contexts/LanguageContext';
import PageTemplate from '@/components/PageTemplate';
import EventHero from '@/components/events/EventHero';
import EventAgenda from '@/components/events/EventAgenda';
import EventAudienceCards from '@/components/events/EventAudienceCards';
import EventBottomCTA from '@/components/events/EventBottomCTA';
import EventRegistrationForm from '@/components/events/EventRegistrationForm';
import { getEventBySlug } from '@/data/eventsData';
import { usePrerenderReady } from '@/hooks/usePrerenderReady';
import { ChevronRight, CheckCircle, ShieldQuestion } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const BASE_URL = 'https://quantifier.ai';

const NIS2_CHECK_PATHS: Record<string, string> = {
  pl: '/pl/sprawdz-cyberbezpieczenstwo/',
  en: '/en/cybersecurity-check/',
  cs: '/cs/zkontrolujte-kybernetickou-bezpecnost/',
};

const NIS2_CHECK_LABELS: Record<string, { question: string; cta: string }> = {
  pl: { question: 'Nie wiesz, czy podlegasz pod NIS2?', cta: 'Wypełnij krótką ankietę' },
  en: { question: "Not sure if NIS2 applies to you?", cta: 'Take a quick assessment' },
  cs: { question: 'Nevíte, zda se na vás vztahuje NIS2?', cta: 'Vyplňte krátký dotazník' },
};

const EventDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const { currentLocale } = useLanguage();
  const formRef = useRef<HTMLDivElement>(null);

  const event = getEventBySlug(slug || '');

  usePrerenderReady(true);

  if (!event) return <Navigate to={`/${currentLocale}/events`} replace />;

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const canonicalUrl = `${BASE_URL}/${currentLocale}/events/${event.slug}/`;
  const ogImage = event.seo.ogImage || `${BASE_URL}/og-homepage.png`;
  const ogLocale = currentLocale === 'en' ? 'en_US' : currentLocale === 'pl' ? 'pl_PL' : 'cs_CZ';

  const eventSchema = {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: event.title,
    description: event.subtitle,
    startDate: event.date,
    endDate: new Date(new Date(event.date).getTime() + 30 * 60000).toISOString(),
    eventAttendanceMode: 'https://schema.org/OnlineEventAttendanceMode',
    eventStatus: 'https://schema.org/EventScheduled',
    location: { '@type': 'VirtualLocation', url: canonicalUrl },
    organizer: { '@type': 'Organization', name: 'Quantifier.ai', url: BASE_URL },
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'PLN', availability: 'https://schema.org/InStock', url: canonicalUrl },
    image: ogImage,
    inLanguage: 'pl',
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${BASE_URL}/${currentLocale}` },
      { '@type': 'ListItem', position: 2, name: 'Events', item: `${BASE_URL}/${currentLocale}/events` },
      { '@type': 'ListItem', position: 3, name: event.title },
    ],
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: event.faqs.map(f => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  };

  const nis2CheckPath = NIS2_CHECK_PATHS[currentLocale] || NIS2_CHECK_PATHS.en;
  const nis2CheckLabel = NIS2_CHECK_LABELS[currentLocale] || NIS2_CHECK_LABELS.en;

  return (
    <PageTemplate title={event.seo.metaTitle} description={event.seo.metaDescription} noSeo>
      <Helmet>
        <title>{event.seo.metaTitle} | Quantifier.ai</title>
        <meta name="description" content={event.seo.metaDescription} />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:title" content={event.seo.metaTitle} />
        <meta property="og:description" content={event.seo.metaDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:site_name" content="Quantifier.ai" />
        <meta property="og:locale" content={ogLocale} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={event.seo.metaTitle} />
        <meta name="twitter:description" content={event.seo.metaDescription} />
        <meta name="twitter:image" content={ogImage} />
        <script type="application/ld+json">{JSON.stringify(eventSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>

      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-1 text-sm text-muted-foreground mb-6">
        <Link to={`/${currentLocale}`} className="hover:text-foreground">Home</Link>
        <ChevronRight className="h-3 w-3" />
        <Link to={`/${currentLocale}/events`} className="hover:text-foreground">Events</Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-foreground font-medium line-clamp-1">{event.title}</span>
      </nav>

      {/* Two-column layout */}
      <div className="lg:flex lg:gap-10">
        {/* Content column */}
        <div className="lg:w-[55%]">
          <EventHero event={event} />

          {/* Mobile form */}
          <div className="lg:hidden mb-8" ref={formRef}>
            <EventRegistrationForm event={event} />
          </div>

          {/* Outcomes */}
          <section className="py-10 md:py-14 border-t border-border">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">Co zyskasz?</h2>
            <ul className="space-y-3">
              {event.outcomes.map((o, i) => (
                <li key={i} className="flex items-start gap-3 text-foreground">
                  <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>{o}</span>
                </li>
              ))}
            </ul>
          </section>

          <div className="border-t border-border">
            <EventAgenda agenda={event.agenda} duration={event.duration} />
          </div>

          <div className="border-t border-border">
            <EventAudienceCards audience={event.audience} />
          </div>

          {/* NIS2 Check CTA */}
          <section className="py-10 md:py-14 border-t border-border">
            <div className="bg-primary/5 border border-primary/20 rounded-2xl p-6 md:p-8 flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <ShieldQuestion className="h-8 w-8 text-primary flex-shrink-0" />
              <div className="flex-1">
                <h3 className="font-bold text-foreground text-lg">{nis2CheckLabel.question}</h3>
              </div>
              <Button asChild>
                <Link to={nis2CheckPath}>{nis2CheckLabel.cta}</Link>
              </Button>
            </div>
          </section>

          {/* FAQ */}
          <section className="py-10 md:py-14 border-t border-border">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8">Najczęściej zadawane pytania</h2>
            <Accordion type="single" collapsible className="space-y-3">
              {event.faqs.map((faq, i) => (
                <AccordionItem key={i} value={`faq-${i}`} className="bg-card border border-border rounded-lg px-6">
                  <AccordionTrigger className="text-left font-semibold text-foreground hover:text-primary py-4">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-4">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </section>

          {/* Cross-links */}
          <div className="border-t border-border py-8 text-sm text-muted-foreground">
            <p>
              Dowiedz się więcej o{' '}
              <Link to={`/${currentLocale}/frameworks/nis-ii`} className="text-primary underline hover:text-primary/80">
                NIS2 i dyrektywie cyberbezpieczeństwa
              </Link>{' '}
              lub sprawdź{' '}
              <Link to={`/${currentLocale}/frameworks`} className="text-primary underline hover:text-primary/80">
                inne standardy compliance
              </Link>.
            </p>
          </div>

          {/* Mobile bottom form */}
          <div className="lg:hidden mb-8">
            <EventRegistrationForm event={event} />
          </div>

          <EventBottomCTA onCtaClick={scrollToForm} />
        </div>

        {/* Sticky form column (desktop) */}
        <div className="hidden lg:block lg:w-[45%]">
          <div className="sticky top-24 self-start" ref={formRef}>
            <EventRegistrationForm event={event} />
          </div>
        </div>
      </div>
    </PageTemplate>
  );
};

export default EventDetail;
