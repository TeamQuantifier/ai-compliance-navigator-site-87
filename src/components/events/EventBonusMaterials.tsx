import { Gift, FileCheck } from 'lucide-react';

interface Props {
  materials: string[];
}

const EventBonusMaterials = ({ materials }: Props) => (
  <section className="py-10 md:py-14">
    <div className="bg-primary/5 border border-primary/20 rounded-2xl p-6 md:p-8">
      <div className="flex items-center gap-3 mb-4">
        <Gift className="h-6 w-6 text-primary" />
        <h2 className="text-2xl md:text-3xl font-bold text-foreground">NIS2 Sprint Kit</h2>
      </div>
      <p className="text-muted-foreground mb-6">Materiały dostępne po rejestracji na webinar:</p>
      <ul className="space-y-3">
        {materials.map((m, i) => (
          <li key={i} className="flex items-start gap-2 text-sm text-foreground">
            <FileCheck className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" /> {m}
          </li>
        ))}
      </ul>
    </div>
  </section>
);

export default EventBonusMaterials;
