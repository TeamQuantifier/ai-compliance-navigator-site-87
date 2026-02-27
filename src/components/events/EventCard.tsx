import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, MapPin, ArrowRight, CheckCircle, Globe, Settings, FileCheck, ShieldCheck } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import type { EventData } from '@/data/eventsData';
import type { LucideIcon } from 'lucide-react';

const iconMap: Record<string, LucideIcon> = {
  Globe,
  Settings,
  FileCheck,
  ShieldCheck,
};

interface Props {
  event: EventData;
}

const EventCard = ({ event }: Props) => {
  const { currentLocale } = useLanguage();
  const IconComponent = event.icon ? iconMap[event.icon] : null;

  return (
    <article className="bg-card border border-border rounded-xl overflow-hidden hover:shadow-md transition-shadow flex flex-col h-full">
      <div className="flex flex-col flex-1">
        {/* Compact gradient header with icon */}
        {IconComponent && (
          <Link to={`/${currentLocale}/events/${event.slug}`} className="block">
            <div className="bg-gradient-to-br from-[#6d38a8] to-[#387fef] px-4 py-3 flex items-center gap-3 relative overflow-hidden">
              <div className="absolute -top-4 -right-4 w-16 h-16 rounded-full border border-[#d4f1ed] opacity-20" />
              <div className="absolute bottom-0 right-12 w-6 h-6 rounded-full bg-[#d4f1ed] opacity-10" />
              <div className="flex items-center gap-2.5 relative z-10">
                {event.step && (
                  <span className="text-2xl font-bold text-white/30 select-none leading-none">
                    {String(event.step).padStart(2, '0')}
                  </span>
                )}
                <div className="w-10 h-10 rounded-lg bg-white/15 flex items-center justify-center">
                  <IconComponent className="h-5 w-5 text-white" />
                </div>
              </div>
              <div className="flex flex-wrap gap-1.5 relative z-10">
                {event.tags.map(tag => (
                  <span key={tag} className="text-[10px] px-2 py-0.5 rounded-full bg-white/20 text-white font-medium">{tag}</span>
                ))}
              </div>
            </div>
          </Link>
        )}

        <div className="p-4 flex flex-col flex-1">
          {/* Date — prominent */}
          <div className="flex items-center gap-3 mb-1.5">
            <span className="flex items-center gap-1.5 text-sm font-semibold text-primary">
              <Calendar className="h-4 w-4" /> {event.dateDisplay}
            </span>
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <MapPin className="h-3 w-3" /> {event.location}
            </span>
          </div>

          <h2 className="text-lg font-bold text-foreground mb-2 leading-snug">
            <Link to={`/${currentLocale}/events/${event.slug}`} className="hover:text-primary transition-colors">
              {event.title}
            </Link>
          </h2>

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
      </div>
    </article>
  );
};

export default EventCard;
