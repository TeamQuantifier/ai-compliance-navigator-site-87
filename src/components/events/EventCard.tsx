import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, MapPin, ArrowRight, CheckCircle } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import type { EventData } from '@/data/eventsData';

interface Props {
  event: EventData;
}

const EventCard = ({ event }: Props) => {
  const { currentLocale } = useLanguage();

  return (
    <article className="bg-card border border-border rounded-xl overflow-hidden hover:shadow-md transition-shadow flex flex-row h-full">
      {/* Compact square image */}
      <Link to={`/${currentLocale}/events/${event.slug}`} className="flex-shrink-0 w-32 sm:w-40 md:w-44">
        <img
          src={event.imageUrl}
          alt={event.imageAlt}
          className="w-full h-full object-cover bg-muted"
          loading="lazy"
        />
      </Link>

      <div className="p-4 md:p-5 flex flex-col flex-1 min-w-0">
        <div className="flex flex-wrap gap-1.5 mb-2">
          {event.tags.map(tag => (
            <Badge key={tag} variant="secondary" className="text-[10px] px-2 py-0">{tag}</Badge>
          ))}
        </div>

        <h2 className="text-base md:text-lg font-bold text-foreground mb-1 leading-tight">
          <Link to={`/${currentLocale}/events/${event.slug}`} className="hover:text-primary transition-colors">
            {event.title}
          </Link>
        </h2>

        <div className="flex flex-wrap gap-2 text-xs text-muted-foreground mb-2">
          <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {event.dateDisplay}</span>
          <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> {event.location}</span>
        </div>

        <ul className="space-y-1 mb-3 flex-1">
          {event.outcomes.slice(0, 2).map((o, i) => (
            <li key={i} className="flex items-start gap-1.5 text-xs text-foreground">
              <CheckCircle className="h-3.5 w-3.5 text-primary mt-0.5 flex-shrink-0" /> <span className="line-clamp-1">{o}</span>
            </li>
          ))}
        </ul>

        <Button asChild size="sm" className="w-fit" data-cta="event-card-cta">
          <Link to={`/${currentLocale}/events/${event.slug}`}>
            {event.heroCtaLabel} <ArrowRight className="h-3.5 w-3.5 ml-1" />
          </Link>
        </Button>
      </div>
    </article>
  );
};

export default EventCard;
