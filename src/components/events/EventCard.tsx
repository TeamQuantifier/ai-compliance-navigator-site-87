import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, MapPin, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import type { EventData } from '@/data/eventsData';

interface Props {
  event: EventData;
}

const EventCard = ({ event }: Props) => {
  const { currentLocale } = useLanguage();

  return (
    <article className="bg-card border border-border rounded-2xl p-6 md:p-8 hover:shadow-lg transition-shadow">
      <div className="flex flex-wrap gap-2 mb-4">
        {event.tags.map(tag => (
          <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
        ))}
      </div>

      <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">{event.title}</h2>
      <p className="text-muted-foreground mb-6">{event.subtitle}</p>

      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-6">
        <span className="flex items-center gap-1.5"><Calendar className="h-4 w-4" /> {event.dateDisplay}</span>
        <span className="flex items-center gap-1.5"><Clock className="h-4 w-4" /> {event.duration}</span>
        <span className="flex items-center gap-1.5"><MapPin className="h-4 w-4" /> {event.location}</span>
      </div>

      <ul className="space-y-2 mb-6">
        {event.outcomes.slice(0, 2).map((o, i) => (
          <li key={i} className="flex items-start gap-2 text-sm text-foreground">
            <span className="text-primary mt-0.5">✓</span> {o}
          </li>
        ))}
      </ul>

      <Button asChild size="lg" data-cta="event-card-cta">
        <Link to={`/${currentLocale}/events/${event.slug}`}>
          {event.heroCtaLabel} <ArrowRight className="h-4 w-4 ml-1" />
        </Link>
      </Button>
    </article>
  );
};

export default EventCard;
