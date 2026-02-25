import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, MapPin, ArrowRight, CheckCircle } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import type { EventData } from '@/data/eventsData';

interface Props {
  event: EventData;
}

const EventCard = ({ event }: Props) => {
  const { currentLocale } = useLanguage();

  return (
    <article className="bg-card border border-border rounded-2xl overflow-hidden hover:shadow-lg transition-shadow flex flex-col">
      {/* Cover image */}
      <Link to={`/${currentLocale}/events/${event.slug}`}>
        <AspectRatio ratio={1}>
          <img
            src={event.imageUrl}
            alt={event.imageAlt}
            className="w-full h-full object-cover bg-muted"
            loading="lazy"
          />
        </AspectRatio>
      </Link>

      <div className="p-6 md:p-8 flex flex-col flex-1">
        <div className="flex flex-wrap gap-2 mb-3">
          {event.tags.map(tag => (
            <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
          ))}
        </div>

        <h2 className="text-xl md:text-2xl font-bold text-foreground mb-2">
          <Link to={`/${currentLocale}/events/${event.slug}`} className="hover:text-primary transition-colors">
            {event.title}
          </Link>
        </h2>

        <div className="flex flex-wrap gap-3 text-sm text-muted-foreground mb-4">
          <span className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5" /> {event.dateDisplay}</span>
          <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" /> {event.location}</span>
        </div>

        <ul className="space-y-1.5 mb-6 flex-1">
          {event.outcomes.slice(0, 2).map((o, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-foreground">
              <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" /> {o}
            </li>
          ))}
        </ul>

        <Button asChild size="lg" className="w-full" data-cta="event-card-cta">
          <Link to={`/${currentLocale}/events/${event.slug}`}>
            {event.heroCtaLabel} <ArrowRight className="h-4 w-4 ml-1" />
          </Link>
        </Button>
      </div>
    </article>
  );
};

export default EventCard;
