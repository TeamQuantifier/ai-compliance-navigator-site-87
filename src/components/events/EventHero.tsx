import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, MapPin } from 'lucide-react';
import type { EventData } from '@/data/eventsData';

interface Props {
  event: EventData;
}

const EventHero = ({ event }: Props) => (
  <section className="pb-8 md:pb-12">
    <div className="flex flex-wrap gap-2 mb-4">
      {event.tags.map(tag => (
        <Badge key={tag} variant="secondary">{tag}</Badge>
      ))}
    </div>

    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 leading-tight">
      {event.title}
    </h1>
    <p className="text-lg text-muted-foreground mb-6 max-w-2xl">{event.subtitle}</p>

    <div className="flex flex-wrap gap-4 items-center mb-6">
      <span className="flex items-center gap-2 text-base md:text-lg font-semibold text-foreground bg-primary/10 px-3 py-1.5 rounded-lg">
        <Calendar className="h-5 w-5 text-primary" /> {event.dateDisplay}
      </span>
      <span className="flex items-center gap-1.5 text-sm text-muted-foreground"><Clock className="h-4 w-4" /> {event.duration}</span>
      <span className="flex items-center gap-1.5 text-sm text-muted-foreground"><MapPin className="h-4 w-4" /> {event.location}</span>
    </div>

    <p className="text-sm text-muted-foreground border-l-2 border-primary pl-4">{event.trustLine}</p>
  </section>
);

export default EventHero;
