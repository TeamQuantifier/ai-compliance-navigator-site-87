import { Building2, Shield, Lock } from 'lucide-react';
import type { EventAudienceCard } from '@/data/eventsData';

const iconMap: Record<string, React.ElementType> = { Building2, Shield, Lock };

interface Props {
  audience: EventAudienceCard[];
}

const EventAudienceCards = ({ audience }: Props) => (
  <section className="py-10 md:py-14">
    <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8">Dla kogo jest ten webinar?</h2>
    <div className="grid md:grid-cols-3 gap-6">
      {audience.map((card, i) => {
        const Icon = iconMap[card.icon] || Shield;
        return (
          <div key={i} className="bg-card border border-border rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Icon className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-bold text-foreground">{card.role}</h3>
            </div>
            <div className="mb-4">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Wyzwania</p>
              <ul className="space-y-1.5">
                {card.pains.map((p, j) => (
                  <li key={j} className="text-sm text-muted-foreground flex items-start gap-1.5">
                    <span className="text-destructive mt-0.5">•</span> {p}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Efekty</p>
              <ul className="space-y-1.5">
                {card.outcomes.map((o, j) => (
                  <li key={j} className="text-sm text-foreground flex items-start gap-1.5">
                    <span className="text-primary mt-0.5">✓</span> {o}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        );
      })}
    </div>
  </section>
);

export default EventAudienceCards;
