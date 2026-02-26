import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { CalendarPlus, CheckCircle, ExternalLink, Loader2 } from 'lucide-react';
import type { EventData } from '@/data/eventsData';

const FREE_EMAIL_DOMAINS = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'aol.com', 'icloud.com', 'mail.com', 'protonmail.com', 'wp.pl', 'onet.pl', 'o2.pl', 'interia.pl'];

const formSchema = z.object({
  firstName: z.string().trim().min(1, 'Imię jest wymagane').max(100),
  workEmail: z.string().trim().email('Podaj poprawny adres e-mail').max(255).refine(
    (email) => {
      const domain = email.split('@')[1]?.toLowerCase();
      return domain && !FREE_EMAIL_DOMAINS.includes(domain);
    },
    'Podaj służbowy adres e-mail'
  ),
  company: z.string().trim().min(1, 'Firma jest wymagana').max(200),
  role: z.string().min(1, 'Wybierz stanowisko'),
  companySize: z.string().min(1, 'Wybierz wielkość firmy'),
  nis2Qualifier: z.string().min(1, 'Wybierz odpowiedź'),
  consent: z.literal(true, { errorMap: () => ({ message: 'Zgoda jest wymagana' }) }),
});

type FormData = z.infer<typeof formSchema>;

interface Props {
  event: EventData;
  className?: string;
}

const EventRegistrationForm = ({ event, className = '' }: Props) => {
  const [utmParams, setUtmParams] = useState<Record<string, string>>({});
  const [submitState, setSubmitState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const utms: Record<string, string> = {};
    ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'].forEach(key => {
      const val = params.get(key);
      if (val) utms[key] = val;
    });
    setUtmParams(utms);
  }, []);

  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: { consent: undefined as unknown as true },
  });

  const onSubmit = async (data: FormData) => {
    setSubmitState('loading');
    try {
      const payload = { ...data, ...utmParams, eventSlug: event.slug, eventTitle: event.title };
      const res = await fetch('https://example.com/webhook', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error('Submit failed');
      setSubmitState('success');
    } catch {
      setSubmitState('error');
    }
  };

  const googleCalUrl = () => {
    const start = new Date(event.date).toISOString().replace(/[-:]/g, '').replace('.000', '');
    const end = new Date(new Date(event.date).getTime() + 45 * 60000).toISOString().replace(/[-:]/g, '').replace('.000', '');
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.title)}&dates=${start}/${end}&details=${encodeURIComponent(event.subtitle)}&location=Online`;
  };

  const downloadIcs = () => {
    const start = new Date(event.date).toISOString().replace(/[-:]/g, '').replace('.000', '');
    const end = new Date(new Date(event.date).getTime() + 45 * 60000).toISOString().replace(/[-:]/g, '').replace('.000', '');
    const ics = `BEGIN:VCALENDAR\nVERSION:2.0\nBEGIN:VEVENT\nDTSTART:${start}\nDTEND:${end}\nSUMMARY:${event.title}\nDESCRIPTION:${event.subtitle}\nLOCATION:Online\nEND:VEVENT\nEND:VCALENDAR`;
    const blob = new Blob([ics], { type: 'text/calendar' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `${event.slug}.ics`;
    a.click();
  };

  if (submitState === 'success') {
    return (
      <div className={`bg-card border border-border rounded-2xl p-6 md:p-8 ${className}`}>
        <div className="text-center space-y-4">
          <CheckCircle className="h-12 w-12 text-primary mx-auto" />
          <h3 className="text-xl font-bold text-foreground">Gotowe! Jesteś na liście.</h3>
          <p className="text-muted-foreground text-sm">Potwierdzenie i szczegóły wyślemy na Twój e-mail.</p>
          <div className="space-y-2 pt-4">
            <p className="text-sm font-medium text-foreground">Dodaj do kalendarza:</p>
            <div className="flex gap-2 justify-center">
              <Button variant="outline" size="sm" asChild>
                <a href={googleCalUrl()} target="_blank" rel="noopener noreferrer">
                  <CalendarPlus className="h-4 w-4 mr-1" /> Google
                </a>
              </Button>
              <Button variant="outline" size="sm" onClick={downloadIcs}>
                <CalendarPlus className="h-4 w-4 mr-1" /> Outlook/iCal
              </Button>
            </div>
          </div>
          <div className="pt-4">
            <Button className="w-full" data-cta="gap-call" asChild>
              <a href="https://example.com/gap-call" target="_blank" rel="noopener noreferrer">
                Umów 20-min NIS2 Gap Call <ExternalLink className="h-4 w-4 ml-1" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-card border border-border rounded-2xl p-6 md:p-8 ${className}`} data-form-submit="event-registration" data-event-name={event.slug}>
      <h3 className="text-lg font-bold text-foreground mb-1">Zarezerwuj miejsce</h3>
      <p className="text-sm text-muted-foreground mb-6">Bezpłatny webinar · {event.dateDisplay}</p>

      {submitState === 'error' && (
        <div className="bg-destructive/10 text-destructive text-sm rounded-lg p-3 mb-4">
          Coś poszło nie tak. Spróbuj ponownie.
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Label htmlFor="firstName">Imię *</Label>
          <Input id="firstName" {...register('firstName')} className="mt-1" />
          {errors.firstName && <p className="text-destructive text-xs mt-1">{errors.firstName.message}</p>}
        </div>

        <div>
          <Label htmlFor="workEmail">Służbowy e-mail *</Label>
          <Input id="workEmail" type="email" {...register('workEmail')} className="mt-1" />
          {errors.workEmail && <p className="text-destructive text-xs mt-1">{errors.workEmail.message}</p>}
        </div>

        <div>
          <Label htmlFor="company">Firma *</Label>
          <Input id="company" {...register('company')} className="mt-1" />
          {errors.company && <p className="text-destructive text-xs mt-1">{errors.company.message}</p>}
        </div>

        <div>
          <Label>Stanowisko *</Label>
          <Select onValueChange={(v) => setValue('role', v)}>
            <SelectTrigger className="mt-1"><SelectValue placeholder="Wybierz..." /></SelectTrigger>
            <SelectContent>
              <SelectItem value="management">Management</SelectItem>
              <SelectItem value="it-security">IT / Security</SelectItem>
              <SelectItem value="compliance-risk">Compliance / Risk</SelectItem>
              <SelectItem value="other">Inne</SelectItem>
            </SelectContent>
          </Select>
          {errors.role && <p className="text-destructive text-xs mt-1">{errors.role.message}</p>}
        </div>

        <div>
          <Label>Wielkość firmy *</Label>
          <Select onValueChange={(v) => setValue('companySize', v)}>
            <SelectTrigger className="mt-1"><SelectValue placeholder="Wybierz..." /></SelectTrigger>
            <SelectContent>
              <SelectItem value="1-10">1–10</SelectItem>
              <SelectItem value="11-50">11–50</SelectItem>
              <SelectItem value="51-200">51–200</SelectItem>
              <SelectItem value="201-1000">201–1000</SelectItem>
              <SelectItem value="1000+">1000+</SelectItem>
            </SelectContent>
          </Select>
          {errors.companySize && <p className="text-destructive text-xs mt-1">{errors.companySize.message}</p>}
        </div>

        <div>
          <Label className="mb-2 block">Czy Twoja organizacja może podlegać NIS2? *</Label>
          <RadioGroup onValueChange={(v) => setValue('nis2Qualifier', v)} className="flex gap-4">
            <div className="flex items-center gap-2">
              <RadioGroupItem value="yes" id="nis2-yes" />
              <Label htmlFor="nis2-yes" className="font-normal">Tak</Label>
            </div>
            <div className="flex items-center gap-2">
              <RadioGroupItem value="no" id="nis2-no" />
              <Label htmlFor="nis2-no" className="font-normal">Nie</Label>
            </div>
            <div className="flex items-center gap-2">
              <RadioGroupItem value="not-sure" id="nis2-unsure" />
              <Label htmlFor="nis2-unsure" className="font-normal">Nie wiem</Label>
            </div>
          </RadioGroup>
          {errors.nis2Qualifier && <p className="text-destructive text-xs mt-1">{errors.nis2Qualifier.message}</p>}
        </div>

        <div className="flex items-start gap-2">
          <Checkbox
            id="consent"
            onCheckedChange={(checked) => setValue('consent', checked === true ? true : undefined as unknown as true)}
            className="mt-1"
          />
          <Label htmlFor="consent" className="text-xs text-muted-foreground font-normal leading-relaxed">
            Wyrażam zgodę na przetwarzanie danych osobowych w celu rejestracji na webinar i kontaktu marketingowego. Zapoznałem/am się z{' '}
            <a href="/pl/legal/privacy" className="underline text-primary hover:text-primary/80">Polityką Prywatności</a>. *
          </Label>
        </div>
        {errors.consent && <p className="text-destructive text-xs">{errors.consent.message}</p>}

        {/* Hidden UTM fields */}
        {Object.entries(utmParams).map(([key, val]) => (
          <input key={key} type="hidden" name={key} value={val} />
        ))}

        <Button type="submit" className="w-full" size="lg" disabled={submitState === 'loading'} data-cta="register-event">
          {submitState === 'loading' ? <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Rejestracja...</> : 'Zarezerwuj miejsce'}
        </Button>
      </form>
    </div>
  );
};

export default EventRegistrationForm;
