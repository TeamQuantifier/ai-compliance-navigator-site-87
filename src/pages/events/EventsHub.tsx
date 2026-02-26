import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import PageTemplate from '@/components/PageTemplate';
import EventCard from '@/components/events/EventCard';
import { events } from '@/data/eventsData';
import { ChevronRight } from 'lucide-react';

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

  return (
    <PageTemplate
      title="Webinary i wydarzenia — NIS2, KSC, compliance"
      description="Bezpłatne webinary o NIS2, KSC, cyberbezpieczeństwie i compliance. Praktyczna wiedza, szablony i checklisty dla zarządu, compliance i IT."
    >
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-1 text-sm text-muted-foreground mb-8">
        <Link to={`/${currentLocale}`} className="hover:text-foreground">Home</Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-foreground font-medium">Events</span>
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
          <p className="text-sm md:text-base font-semibold uppercase tracking-wider text-primary mb-3">Bezpłatny cykl webinarów</p>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 leading-tight">
            Cyberbezpieczeństwo w praktyce
          </h1>
          <p className="text-muted-foreground text-sm md:text-base max-w-2xl mx-auto">
            Zapraszamy na serię 4 praktycznych webinarów o NIS2, KSC i ISO 27001. Dowiedz się, jak zbudować mapę ryzyka, zdefiniować role i procesy, przygotować dowody zgodności i przejść audyt — krok po kroku, z materiałami do pobrania.
          </p>
        </div>
      </section>

      {/* SEO content section — above event grid */}
      <section className="mb-12">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
          Webinary o NIS2/KSC i cyberbezpieczeństwie
        </h2>
        <div className="prose prose-slate max-w-3xl text-muted-foreground space-y-4">
          <p>
            Dyrektywa NIS2 w Polsce, implementowana jako nowelizacja ustawy o Krajowym Systemie Cyberbezpieczeństwa (KSC),
            nakłada nowe obowiązki na setki organizacji w sektorach kluczowych i ważnych. Zarządy firm odpowiadają
            osobiście za wdrożenie wymagań dotyczących zarządzania ryzykiem, incident response i raportowania
            incydentów cyberbezpieczeństwa. Nasze webinary pomagają zrozumieć zakres regulacji, przygotować
            organizację do audytu i zbudować system zarządzania zgodnością.
          </p>
          <p>
            Każdy webinar zawiera praktyczne materiały: checklisty compliance, szablony audytowe, matrycę ryzyk
            i plany wdrożeniowe. Dowiedz się, jak zbudować mapę ryzyka NIS2, zdefiniować role i procesy,
            przygotować dowody zgodności (evidence pack) i przejść audyt od A do Z. Nasze sesje prowadzą
            eksperci z doświadczeniem w implementacji NIS2, ISO 27001, DORA i SOC 2 w polskich organizacjach.
            Zarejestruj się bezpłatnie i odbierz materiały Sprint Kit po webinarze.
          </p>
        </div>
      </section>

      {/* Event grid */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-16">
        {events.map(event => (
          <EventCard key={event.slug} event={event} />
        ))}
      </section>

      {/* Last updated */}
      <p className="text-xs text-muted-foreground">
        Ostatnia aktualizacja: {new Date().toLocaleDateString('pl-PL', { year: 'numeric', month: 'long', day: 'numeric' })}
      </p>
    </PageTemplate>
  );
};

export default EventsHub;
