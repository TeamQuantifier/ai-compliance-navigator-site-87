import { Clock } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import type { EventAgendaItem } from '@/data/eventsData';

interface Props {
  agenda: EventAgendaItem[];
  duration: string;
}

const EventAgenda = ({ agenda, duration }: Props) => {
  const { t } = useTranslation();

  return (
    <section className="py-10 md:py-14">
      <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">{t('eventDetail.agendaTitle')} ({duration})</h2>
      <div className="mt-6 space-y-0">
        {agenda.map((item, i) => (
          <div key={i} className="flex gap-4 relative pb-6 last:pb-0">
            {i < agenda.length - 1 && (
              <div className="absolute left-[15px] top-8 bottom-0 w-px bg-border" />
            )}
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
              <Clock className="h-4 w-4 text-primary" />
            </div>
            <div>
              <p className="text-xs font-semibold text-primary mb-0.5">{item.time}</p>
              <h3 className="font-semibold text-foreground">{item.title}</h3>
              {item.description && <p className="text-sm text-muted-foreground mt-0.5">{item.description}</p>}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default EventAgenda;
