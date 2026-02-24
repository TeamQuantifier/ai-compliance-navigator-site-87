import { ArrowRight } from 'lucide-react';

interface Props {
  onCtaClick: () => void;
}

const EventBottomCTA = ({ onCtaClick }: Props) => (
  <section className="py-10 md:py-14">
    <div className="bg-primary text-primary-foreground rounded-2xl p-8 md:p-12 text-center">
      <h2 className="text-2xl md:text-3xl font-bold mb-3">Nie przegap — zarezerwuj miejsce</h2>
      <p className="text-primary-foreground/80 mb-6">Bonusy dostępne dla uczestników na żywo.</p>
      <button
        onClick={onCtaClick}
        className="inline-flex items-center gap-2 bg-card text-foreground font-semibold rounded-lg px-6 py-3 hover:bg-card/90 transition-colors"
        data-cta="bottom-band-cta"
      >
        Zarezerwuj miejsce <ArrowRight className="h-4 w-4" />
      </button>
    </div>
  </section>
);

export default EventBottomCTA;
