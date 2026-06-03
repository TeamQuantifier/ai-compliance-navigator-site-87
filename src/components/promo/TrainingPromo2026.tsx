import { useEffect, useState } from 'react';
import { X, Sparkles, CalendarClock, CheckCircle2, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';

type Locale = 'pl' | 'en' | 'cs';

type Copy = {
  badge: string;
  bannerShort: string;
  bannerCta: string;
  sectionTitle: string;
  sectionSubtitle: string;
  bullets: string[];
  primaryCta: string;
  secondaryCta: string;
  disclaimer: string;
  dateLabel: string;
  decisionLabel: string;
  decisionValue: string;
  dialogTitle: string;
  dialogBody: string;
  dialogCta: string;
  dialogFootnote: string;
};

const COPY: Record<Locale, Copy> = {
  pl: {
    badge: 'Oferta limitowana · do 30.06.2026',
    bannerShort:
      'Tylko do 30.06.2026 · 4h szkolenia NIS2 / KSC / ISO 27001 dla Twojej firmy — sprawdź, jak uzyskać do 100% dofinansowania',
    bannerCta: 'Sprawdź ofertę',
    sectionTitle:
      '4h szkolenia z NIS2 / KSC / ISO 27001 dla Twojej firmy — nawet do 100% dofinansowania',
    sectionSubtitle:
      'Pokażemy Ci, jak sfinansować dedykowane szkolenie z nowych obowiązków cyberbezpieczeństwa. Bez ukrytych kosztów, z konkretną decyzją w 3 dni robocze.',
    bullets: [
      'Szkolenie szyte na miarę Twojej firmy, branży i poziomu dojrzałości',
      'Pomoc w pozyskaniu do 100% dofinansowania (analiza dostępnych źródeł)',
      'Decyzja o kwalifikacji w 3 dni robocze',
      'Rejestracja do 30.06.2026 — realizacja możliwa również po tej dacie',
      'Liczba szkoleń ograniczona — decyduje kolejność zgłoszeń',
    ],
    primaryCta: 'Sprawdź dostępność',
    secondaryCta: 'Porozmawiajmy o dofinansowaniu',
    disclaimer:
      'Liczba szkoleń ograniczona. Oferta ważna do 30.06.2026 (rejestracja). Termin realizacji ustalany indywidualnie. Wysokość dofinansowania zależy od dostępnych programów i profilu firmy.',
    dateLabel: 'Rejestracja do',
    decisionLabel: 'Decyzja w',
    decisionValue: '3 dni robocze',
    dialogTitle: 'Tylko do 30.06.2026 — 4h szkolenia za 0 zł?',
    dialogBody:
      'Sprawdzimy, czy Twoja firma kwalifikuje się do nawet 100% dofinansowania szkolenia z NIS2 / KSC / ISO 27001. Decyzja w 3 dni robocze, liczba miejsc ograniczona.',
    dialogCta: 'Chcę poznać szczegóły',
    dialogFootnote: 'Bez spamu. Odpowiadamy w 1 dzień roboczy.',
  },
  en: {
    badge: 'Limited offer · until 30 June 2026',
    bannerShort:
      'Only until 30 June 2026 · 4h NIS2 / ISO 27001 training for your company — see how to get up to 100% funded',
    bannerCta: 'See the offer',
    sectionTitle:
      '4h NIS2 / ISO 27001 training for your company — up to 100% funded',
    sectionSubtitle:
      'We will show you how to fund a tailored training on the new cybersecurity obligations. No hidden costs, a clear go / no-go decision within 3 business days.',
    bullets: [
      'Training tailored to your company, sector and maturity level',
      'Help securing up to 100% funding (we map the available programs)',
      'Eligibility decision within 3 business days',
      'Register by 30 June 2026 — delivery can take place later',
      'Limited number of training slots — first come, first served',
    ],
    primaryCta: 'Check availability',
    secondaryCta: 'Talk about funding',
    disclaimer:
      'Limited number of training slots. Offer valid until 30 June 2026 (registration). Delivery date agreed individually. Funding level depends on available programs and the company profile.',
    dateLabel: 'Register by',
    decisionLabel: 'Decision in',
    decisionValue: '3 business days',
    dialogTitle: 'Only until 30 June 2026 — 4h training for €0?',
    dialogBody:
      'We will check whether your company qualifies for up to 100% funding of a NIS2 / ISO 27001 training. Decision within 3 business days, limited number of slots.',
    dialogCta: 'I want the details',
    dialogFootnote: 'No spam. We reply within 1 business day.',
  },
  cs: {
    badge: 'Limitovaná nabídka · do 30. 6. 2026',
    bannerShort:
      'Jen do 30. 6. 2026 · 4h školení NIS2 / ISO 27001 pro vaši firmu — zjistěte, jak získat až 100% financování',
    bannerCta: 'Zobrazit nabídku',
    sectionTitle:
      '4h školení z NIS2 / ISO 27001 pro vaši firmu — až 100 % financování',
    sectionSubtitle:
      'Ukážeme vám, jak financovat školení na míru k novým povinnostem v kybernetické bezpečnosti. Bez skrytých nákladů, s konkrétním rozhodnutím do 3 pracovních dnů.',
    bullets: [
      'Školení na míru vaší firmě, oboru a úrovni vyspělosti',
      'Pomoc se získáním až 100% financování (zmapujeme dostupné programy)',
      'Rozhodnutí o způsobilosti do 3 pracovních dnů',
      'Registrace do 30. 6. 2026 — realizace možná i později',
      'Omezený počet školení — rozhoduje pořadí přihlášek',
    ],
    primaryCta: 'Ověřit dostupnost',
    secondaryCta: 'Probrat financování',
    disclaimer:
      'Omezený počet školení. Nabídka platí do 30. 6. 2026 (registrace). Termín realizace dohodneme individuálně. Výše financování závisí na dostupných programech a profilu firmy.',
    dateLabel: 'Registrace do',
    decisionLabel: 'Rozhodnutí do',
    decisionValue: '3 pracovních dnů',
    dialogTitle: 'Jen do 30. 6. 2026 — 4h školení za 0 Kč?',
    dialogBody:
      'Ověříme, zda vaše firma splňuje podmínky pro až 100% financování školení NIS2 / ISO 27001. Rozhodnutí do 3 pracovních dnů, počet míst omezen.',
    dialogCta: 'Chci znát detaily',
    dialogFootnote: 'Žádný spam. Odpovídáme do 1 pracovního dne.',
  },
};

const STORAGE_KEYS = (locale: string) => ({
  banner: `promo2026.banner.dismissed.${locale}`,
  dialog: `promo2026.dialog.dismissed.${locale}`,
});

const detectLocale = (input?: string): Locale => {
  if (input === 'pl' || input === 'en' || input === 'cs') return input;
  if (typeof window !== 'undefined') {
    const seg = window.location.pathname.split('/')[1];
    if (seg === 'en' || seg === 'cs' || seg === 'pl') return seg;
  }
  return 'pl';
};

const getCopy = (locale: string): Copy => COPY[detectLocale(locale)];

/* ─────────────────────────── Banner ─────────────────────────── */
export const TrainingPromoBanner = ({ locale }: { locale: string }) => {
  const c = getCopy(locale);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (!localStorage.getItem(STORAGE.banner)) setVisible(true);
  }, []);

  if (!visible) return null;

  const dismiss = () => {
    localStorage.setItem(STORAGE.banner, '1');
    setVisible(false);
  };

  return (
    <div className="relative z-50 bg-gradient-to-r from-primary via-primary to-primary/80 text-primary-foreground">
      <div className="container mx-auto px-4 py-2.5 flex items-center gap-3">
        <Sparkles className="h-4 w-4 shrink-0 hidden sm:block" />
        <p className="flex-1 text-xs sm:text-sm font-medium leading-snug">
          {c.bannerShort}
        </p>
        <a
          href="#promo-finansowanie"
          className="hidden sm:inline-flex items-center gap-1 rounded-md bg-white/15 hover:bg-white/25 px-3 py-1.5 text-xs font-semibold transition-colors whitespace-nowrap"
        >
          {c.bannerCta} <ArrowRight className="h-3.5 w-3.5" />
        </a>
        <button
          onClick={dismiss}
          aria-label="Close"
          className="shrink-0 rounded-md p-1 hover:bg-white/15 transition-colors"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

/* ─────────────────────────── Section ─────────────────────────── */
export const TrainingPromoSection = ({ locale }: { locale: string }) => {
  const c = getCopy(locale);

  return (
    <section
      id="promo-finansowanie"
      className="relative py-14 md:py-20 bg-gradient-to-br from-slate-950 via-slate-900 to-primary/30 overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_hsl(221_83%_53%/0.25),transparent_60%)] pointer-events-none" />
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-[1.4fr_1fr] gap-10 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 mb-5 backdrop-blur-sm">
              <CalendarClock className="h-3.5 w-3.5 text-white" />
              <span className="text-xs font-semibold tracking-wide text-white uppercase">
                {c.badge}
              </span>
            </div>

            <h2 className="text-2xl md:text-4xl font-bold text-white leading-tight mb-4">
              {c.sectionTitle}
            </h2>
            <p className="text-base md:text-lg text-white/80 mb-7 leading-relaxed max-w-2xl">
              {c.sectionSubtitle}
            </p>

            <ul className="space-y-3 mb-8 max-w-2xl">
              {c.bullets.map((b) => (
                <li key={b} className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                  <span className="text-sm md:text-base text-white/90">{b}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                asChild
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 px-7 py-6 text-base"
              >
                <a href="#contact">
                  {c.primaryCta} <ArrowRight className="h-4 w-4" />
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white/30 bg-white/5 text-white hover:bg-white/15 hover:text-white px-7 py-6 text-base"
              >
                <a href="#contact">{c.secondaryCta}</a>
              </Button>
            </div>

            <p className="text-xs text-white/60 mt-5 max-w-2xl leading-relaxed">
              {c.disclaimer}
            </p>
          </div>

          {/* Date card */}
          <div className="relative">
            <div className="bg-white/[0.06] backdrop-blur-md border border-white/15 rounded-2xl p-7 shadow-2xl">
              <p className="text-xs uppercase tracking-wider text-white/60 mb-2">
                {c.dateLabel}
              </p>
              <p className="text-5xl md:text-6xl font-bold text-white leading-none mb-1">
                30.06
              </p>
              <p className="text-2xl font-semibold text-primary mb-6">2026</p>

              <div className="h-px bg-white/15 mb-6" />

              <p className="text-xs uppercase tracking-wider text-white/60 mb-1">
                {c.decisionLabel}
              </p>
              <p className="text-xl font-bold text-white mb-6">{c.decisionValue}</p>

              <div className="flex flex-wrap gap-2">
                {['NIS2', 'KSC', 'ISO 27001'].map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 rounded-full bg-primary/20 text-primary text-xs font-semibold border border-primary/30"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ─────────────────────────── Dialog ─────────────────────────── */
export const TrainingPromoDialog = ({ locale }: { locale: string }) => {
  const c = getCopy(locale);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (localStorage.getItem(STORAGE.dialog)) return;

    let opened = false;
    const trigger = () => {
      if (opened) return;
      opened = true;
      setOpen(true);
    };

    const t = window.setTimeout(trigger, 15000);

    const onScroll = () => {
      const scrolled =
        (window.scrollY + window.innerHeight) /
        Math.max(document.documentElement.scrollHeight, 1);
      if (scrolled > 0.5) trigger();
    };

    const onMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0) trigger();
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);

    return () => {
      window.clearTimeout(t);
      window.removeEventListener('scroll', onScroll);
      document.removeEventListener('mouseleave', onMouseLeave);
    };
  }, []);

  const handleOpenChange = (next: boolean) => {
    setOpen(next);
    if (!next) localStorage.setItem(STORAGE.dialog, '1');
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-md bg-slate-950 border-white/10 text-white">
        <DialogHeader>
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-primary/15 border border-primary/30 w-fit mb-2">
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            <span className="text-[10px] font-semibold tracking-wide text-primary uppercase">
              {c.badge}
            </span>
          </div>
          <DialogTitle className="text-2xl text-white leading-tight">
            {c.dialogTitle}
          </DialogTitle>
          <DialogDescription className="text-white/75 text-sm leading-relaxed pt-2">
            {c.dialogBody}
          </DialogDescription>
        </DialogHeader>

        <ul className="space-y-2 my-2">
          {c.bullets.slice(0, 3).map((b) => (
            <li key={b} className="flex items-start gap-2 text-sm text-white/85">
              <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 shrink-0" />
              <span>{b}</span>
            </li>
          ))}
        </ul>

        <Button
          asChild
          size="lg"
          className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
          onClick={() => handleOpenChange(false)}
        >
          <a href="#contact">
            {c.dialogCta} <ArrowRight className="h-4 w-4" />
          </a>
        </Button>
        <p className="text-xs text-white/50 text-center">{c.dialogFootnote}</p>
      </DialogContent>
    </Dialog>
  );
};
