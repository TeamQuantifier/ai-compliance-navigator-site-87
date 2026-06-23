import { useState } from 'react';
import { CheckCircle2, Send, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

type Locale = 'pl' | 'en' | 'cs';

type Copy = {
  badge: string;
  title: string;
  subtitle: string;
  bullets: string[];
  fields: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    company: string;
    nip: string;
    sector: string;
    sectorPlaceholder: string;
    notes: string;
  };
  sectors: { value: string; label: string }[];
  submit: string;
  sending: string;
  successTitle: string;
  successDesc: string;
  errorTitle: string;
  errorDesc: string;
  privacy: string;
  required: string;
  invalidEmail: string;
};

const COPY: Record<Locale, Copy> = {
  pl: {
    badge: 'Zgłoszenie do 14.07.2026',
    title: 'Zgłoś firmę na 4h szkolenie — sprawdzimy dofinansowanie',
    subtitle:
      'Wypełnij krótki formularz. Odezwiemy się w 1 dzień roboczy z decyzją o kwalifikacji do nawet 100% dofinansowania (NIS2 / KSC / ISO 27001).',
    bullets: [
      'Decyzja o kwalifikacji w 3 dni robocze',
      'Liczba miejsc ograniczona — decyduje kolejność zgłoszeń',
      'Rejestracja do 14.07.2026, realizacja możliwa później',
    ],
    fields: {
      firstName: 'Imię osoby kontaktowej *',
      lastName: 'Nazwisko osoby kontaktowej *',
      email: 'Służbowy e-mail *',
      phone: 'Telefon (opcjonalnie)',
      company: 'Nazwa firmy *',
      nip: 'NIP firmy *',
      sector: 'Sektor *',
      sectorPlaceholder: 'Wybierz sektor',
      notes: 'Dodatkowe informacje (opcjonalnie)',
    },
    sectors: [
      { value: 'energy', label: 'Energetyka / utilities' },
      { value: 'finance', label: 'Finanse / bankowość / ubezpieczenia' },
      { value: 'health', label: 'Ochrona zdrowia' },
      { value: 'public', label: 'Administracja publiczna' },
      { value: 'manufacturing', label: 'Produkcja / przemysł' },
      { value: 'transport', label: 'Transport / logistyka' },
      { value: 'ict', label: 'IT / telekomunikacja / SaaS' },
      { value: 'retail', label: 'Handel / e-commerce' },
      { value: 'education', label: 'Edukacja / nauka' },
      { value: 'other', label: 'Inny' },
    ],
    submit: 'Wyślij zgłoszenie',
    sending: 'Wysyłanie…',
    successTitle: 'Dziękujemy — zgłoszenie wysłane',
    successDesc: 'Odezwiemy się w 1 dzień roboczy.',
    errorTitle: 'Nie udało się wysłać',
    errorDesc: 'Spróbuj ponownie za chwilę lub napisz na kontakt@quantifier.ai.',
    privacy:
      'Wysyłając formularz zgadzasz się na kontakt w sprawie szkolenia. Dane wykorzystamy wyłącznie do obsługi zgłoszenia.',
    required: 'Uzupełnij wymagane pola',
    invalidEmail: 'Podaj poprawny e-mail służbowy',
  },
  en: {
    badge: 'Register by 14 July 2026',
    title: 'Sign your company up for the 4h training — we check funding eligibility',
    subtitle:
      'Fill in the short form. We will respond within 1 business day with an eligibility decision for up to 100% funding (NIS2 / ISO 27001).',
    bullets: [
      'Eligibility decision within 3 business days',
      'Limited number of slots — first come, first served',
      'Register by 14 July 2026, delivery can take place later',
    ],
    fields: {
      firstName: 'Contact first name *',
      lastName: 'Contact last name *',
      email: 'Business email *',
      phone: 'Phone (optional)',
      company: 'Company name *',
      nip: 'Company tax ID (NIP / VAT) *',
      sector: 'Sector *',
      sectorPlaceholder: 'Select sector',
      notes: 'Additional notes (optional)',
    },
    sectors: [
      { value: 'energy', label: 'Energy / utilities' },
      { value: 'finance', label: 'Finance / banking / insurance' },
      { value: 'health', label: 'Healthcare' },
      { value: 'public', label: 'Public administration' },
      { value: 'manufacturing', label: 'Manufacturing / industry' },
      { value: 'transport', label: 'Transport / logistics' },
      { value: 'ict', label: 'IT / telecom / SaaS' },
      { value: 'retail', label: 'Retail / e-commerce' },
      { value: 'education', label: 'Education / research' },
      { value: 'other', label: 'Other' },
    ],
    submit: 'Send registration',
    sending: 'Sending…',
    successTitle: 'Thanks — registration sent',
    successDesc: 'We will reply within 1 business day.',
    errorTitle: 'Could not send',
    errorDesc: 'Please try again shortly or write to kontakt@quantifier.ai.',
    privacy:
      'By submitting you agree to be contacted about the training. Your data is used only to handle the request.',
    required: 'Please fill in the required fields',
    invalidEmail: 'Please enter a valid business email',
  },
  cs: {
    badge: 'Registrace do 14. 7. 2026',
    title: 'Přihlaste firmu na 4h školení — ověříme financování',
    subtitle:
      'Vyplňte krátký formulář. Ozveme se do 1 pracovního dne s rozhodnutím o způsobilosti až ke 100% financování (NIS2 / ISO 27001).',
    bullets: [
      'Rozhodnutí o způsobilosti do 3 pracovních dnů',
      'Omezený počet míst — rozhoduje pořadí přihlášek',
      'Registrace do 14. 7. 2026, realizace možná i později',
    ],
    fields: {
      firstName: 'Jméno kontaktní osoby *',
      lastName: 'Příjmení kontaktní osoby *',
      email: 'Pracovní e-mail *',
      phone: 'Telefon (nepovinné)',
      company: 'Název firmy *',
      nip: 'IČO / DIČ firmy *',
      sector: 'Sektor *',
      sectorPlaceholder: 'Vyberte sektor',
      notes: 'Další informace (nepovinné)',
    },
    sectors: [
      { value: 'energy', label: 'Energetika / utility' },
      { value: 'finance', label: 'Finance / bankovnictví / pojišťovnictví' },
      { value: 'health', label: 'Zdravotnictví' },
      { value: 'public', label: 'Veřejná správa' },
      { value: 'manufacturing', label: 'Výroba / průmysl' },
      { value: 'transport', label: 'Doprava / logistika' },
      { value: 'ict', label: 'IT / telekomunikace / SaaS' },
      { value: 'retail', label: 'Obchod / e-commerce' },
      { value: 'education', label: 'Vzdělávání / věda' },
      { value: 'other', label: 'Jiný' },
    ],
    submit: 'Odeslat přihlášku',
    sending: 'Odesílání…',
    successTitle: 'Děkujeme — přihláška odeslána',
    successDesc: 'Ozveme se do 1 pracovního dne.',
    errorTitle: 'Odeslání se nezdařilo',
    errorDesc: 'Zkuste to prosím znovu nebo napište na kontakt@quantifier.ai.',
    privacy:
      'Odesláním souhlasíte s kontaktováním ve věci školení. Údaje použijeme jen k vyřízení přihlášky.',
    required: 'Vyplňte prosím povinná pole',
    invalidEmail: 'Zadejte platný pracovní e-mail',
  },
};

const detectLocale = (input?: string): Locale => {
  if (input === 'pl' || input === 'en' || input === 'cs') return input;
  if (typeof window !== 'undefined') {
    const seg = window.location.pathname.split('/')[1];
    if (seg === 'pl' || seg === 'en' || seg === 'cs') return seg;
  }
  return 'pl';
};

export const TrainingPromoForm = ({ locale }: { locale: string }) => {
  const c = COPY[detectLocale(locale)];
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [company, setCompany] = useState('');
  const [nip, setNip] = useState('');
  const [sector, setSector] = useState('');
  const [notes, setNotes] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const fn = firstName.trim();
    const ln = lastName.trim();
    const em = email.trim().toLowerCase();
    const co = company.trim();
    const nipV = nip.trim();
    if (!fn || !ln || !em || !co || !nipV || !sector) {
      toast({ title: c.required, variant: 'destructive' });
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(em)) {
      toast({ title: c.invalidEmail, variant: 'destructive' });
      return;
    }

    const sectorLabel = c.sectors.find((s) => s.value === sector)?.label ?? sector;
    const message = [
      '[Promo 14.07.2026 — 4h training / NIS2 / KSC / ISO 27001]',
      `Company: ${co}`,
      `NIP / Tax ID: ${nipV}`,
      `Sector: ${sectorLabel}`,
      phone.trim() ? `Phone: ${phone.trim()}` : null,
      notes.trim() ? `Notes: ${notes.trim()}` : null,
    ]
      .filter(Boolean)
      .join('\n');

    setLoading(true);
    try {
      const { error } = await supabase.functions.invoke('contact-form', {
        body: {
          firstName: fn,
          lastName: ln,
          email: em,
          company: co,
          message,
          language: detectLocale(locale),
          sourceUrl: typeof window !== 'undefined' ? window.location.href : undefined,
        },
      });
      if (error) throw error;
      toast({ title: c.successTitle, description: c.successDesc });
      setSent(true);
      setFirstName(''); setLastName(''); setEmail(''); setPhone('');
      setCompany(''); setNip(''); setSector(''); setNotes('');
    } catch {
      toast({ title: c.errorTitle, description: c.errorDesc, variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="promo-form"
      className="relative py-16 md:py-20 bg-gradient-to-b from-slate-950 via-slate-950 to-[hsl(222_47%_12%)] overflow-hidden"
    >
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-[radial-gradient(ellipse_at_top,_hsl(221_83%_53%/0.18),transparent_70%)] pointer-events-none" />
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-[1fr_1.1fr] gap-10 max-w-6xl mx-auto items-start">
          <div className="lg:pt-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/15 border border-primary/30 mb-5">
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              <span className="text-xs font-semibold tracking-wide text-white uppercase">
                {c.badge}
              </span>
            </div>
            <h2 className="text-2xl md:text-4xl font-bold text-white leading-tight mb-4">
              {c.title}
            </h2>
            <p className="text-base md:text-lg text-white/80 mb-7 leading-relaxed">
              {c.subtitle}
            </p>
            <ul className="space-y-3">
              {c.bullets.map((b) => (
                <li key={b} className="flex items-start gap-3 text-sm text-white/90">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                  {b}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-slate-900/70 backdrop-blur-md border border-white/10 rounded-2xl p-6 md:p-8 shadow-2xl">
            {sent ? (
              <div className="text-center py-10">
                <div className="w-14 h-14 mx-auto rounded-full bg-primary/20 flex items-center justify-center mb-4">
                  <CheckCircle2 className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{c.successTitle}</h3>
                <p className="text-sm text-white/70">{c.successDesc}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3">
                <div className="grid sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    placeholder={c.fields.firstName}
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    maxLength={80}
                    required
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-white/50 text-sm focus:outline-none focus:border-primary"
                  />
                  <input
                    type="text"
                    placeholder={c.fields.lastName}
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    maxLength={80}
                    required
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-white/50 text-sm focus:outline-none focus:border-primary"
                  />
                </div>

                <input
                  type="email"
                  placeholder={c.fields.email}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  maxLength={200}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-white/50 text-sm focus:outline-none focus:border-primary"
                />

                <div className="grid sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    placeholder={c.fields.company}
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    maxLength={150}
                    required
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-white/50 text-sm focus:outline-none focus:border-primary"
                  />
                  <input
                    type="text"
                    placeholder={c.fields.nip}
                    value={nip}
                    onChange={(e) => setNip(e.target.value)}
                    maxLength={40}
                    required
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-white/50 text-sm focus:outline-none focus:border-primary"
                  />
                </div>

                <select
                  value={sector}
                  onChange={(e) => setSector(e.target.value)}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-primary"
                >
                  <option value="" disabled className="bg-slate-900">
                    {c.fields.sectorPlaceholder}
                  </option>
                  {c.sectors.map((s) => (
                    <option key={s.value} value={s.value} className="bg-slate-900">
                      {s.label}
                    </option>
                  ))}
                </select>

                <input
                  type="tel"
                  placeholder={c.fields.phone}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  maxLength={40}
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-white/50 text-sm focus:outline-none focus:border-primary"
                />

                <textarea
                  placeholder={c.fields.notes}
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  maxLength={1000}
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-white/50 text-sm focus:outline-none focus:border-primary resize-none"
                />

                <Button
                  type="submit"
                  size="lg"
                  disabled={loading}
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90 py-6 text-base"
                >
                  {loading ? c.sending : (
                    <>
                      {c.submit} <Send className="h-4 w-4" />
                    </>
                  )}
                </Button>
                <p className="text-xs text-white/60 leading-relaxed pt-1">{c.privacy}</p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrainingPromoForm;
