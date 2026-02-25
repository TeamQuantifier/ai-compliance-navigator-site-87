import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, MapPin } from 'lucide-react';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import type { EventData } from '@/data/eventsData';

interface Props {
  event: EventData;
}

const EventHero = ({ event }: Props) => (
  <section className="pb-8 md:pb-12">
    {/* Cover image */}
    <div className="mb-6 rounded-xl overflow-hidden">
      <AspectRatio ratio={1}>
        <img
          src={event.imageUrl}
          alt={event.imageAlt}
          className="w-full h-full object-cover bg-muted"
        />
      </AspectRatio>
    </div>

    <div className="flex flex-wrap gap-2 mb-4">
      {event.tags.map(tag => (
        <Badge key={tag} variant="secondary">{tag}</Badge>
      ))}
    </div>

    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 leading-tight">
      {event.title}
    </h1>
    <p className="text-lg text-muted-foreground mb-6 max-w-2xl">{event.subtitle}</p>

    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-6">
      <span className="flex items-center gap-1.5"><Calendar className="h-4 w-4" /> {event.dateDisplay}</span>
      <span className="flex items-center gap-1.5"><Clock className="h-4 w-4" /> {event.duration}</span>
      <span className="flex items-center gap-1.5"><MapPin className="h-4 w-4" /> {event.location}</span>
    </div>

    <p className="text-sm text-muted-foreground border-l-2 border-primary pl-4">{event.trustLine}</p>
  </section>
);

export default EventHero;
