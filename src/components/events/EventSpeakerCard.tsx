import { Linkedin, User } from 'lucide-react';
import type { EventSpeaker } from '@/data/eventsData';

interface Props {
  speakers: EventSpeaker[];
}

const EventSpeakerCard = ({ speakers }: Props) => (
  <section className="py-10 md:py-14">
    <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8">Prelegenci</h2>
    <div className="grid md:grid-cols-2 gap-6">
      {speakers.map((s, i) => (
        <div key={i} className="flex gap-4 bg-card border border-border rounded-xl p-6">
          <div className="flex-shrink-0 w-16 h-16 rounded-full bg-muted flex items-center justify-center">
            {s.avatarUrl ? (
              <img src={s.avatarUrl} alt={s.name} className="w-16 h-16 rounded-full object-cover" loading="lazy" />
            ) : (
              <User className="h-8 w-8 text-muted-foreground" />
            )}
          </div>
          <div>
            <h3 className="font-bold text-foreground">{s.name}</h3>
            <p className="text-sm text-primary">{s.title}, {s.company}</p>
            <p className="text-sm text-muted-foreground mt-2">{s.bio}</p>
            <a href={s.linkedInUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-sm text-primary hover:text-primary/80 mt-2">
              <Linkedin className="h-4 w-4" /> LinkedIn
            </a>
          </div>
        </div>
      ))}
    </div>
  </section>
);

export default EventSpeakerCard;
