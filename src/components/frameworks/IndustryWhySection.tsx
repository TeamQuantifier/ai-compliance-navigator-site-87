import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  Landmark,
  Cpu,
  Factory,
  Truck,
  ShoppingBag,
  HeartPulse,
  Zap,
  Scale as ScaleIcon,
  CheckCircle,
  ArrowRight,
  AlertTriangle,
  type LucideIcon,
} from "lucide-react";


type Industry = {
  id: string;
  label: string;
  short: string;
  icon: LucideIcon;
  driver: string;
  challenges: string[];
  benefits: string[];
  example: string;
};

const INDUSTRIES: Industry[] = [
  {
    id: "finance",
    label: "Sektor finansowy i ubezpieczenia",
    short: "Finanse",
    icon: Landmark,
    driver: "DORA + KNF + wymagania kontrahentów",
    challenges: [
      "DORA (od 17.01.2025) wymaga udokumentowanego zarządzania ryzykiem ICT i odporności operacyjnej",
      "Banki-partnerzy i ubezpieczyciele audytują dostawców według własnych checklist bezpieczeństwa",
      "KNF oczekuje dowodów na zgodność z Rekomendacją D i wytycznymi cyberbezpieczeństwa",
    ],
    benefits: [
      "ISO 27001 jako baza dowodowa dla DORA, KNF i RODO — jeden ISMS, wiele regulacji",
      "Skrócenie procesu due diligence przy współpracy z bankami i ubezpieczycielami",
      "Niższa składka cyber insurance po przedstawieniu certyfikatu",
    ],
    example:
      "Instytucja płatnicza po certyfikacji ISO 27001 skróciła vendor onboarding w bankach z 4 do 6 tygodni — wcześniej blokowała ich sekcja security w ankietach.",
  },
  {
    id: "tech",
    label: "Technologie i usługi IT",
    short: "IT i SaaS",
    icon: Cpu,
    driver: "Wymóg w RFP od klientów enterprise",
    challenges: [
      "Klienci enterprise (banki, telco, retail) wymagają certyfikatu już na etapie RFI",
      "Każdy klient ma własną ankietę bezpieczeństwa — bez ISMS zespół tonie w odpowiedziach",
      "Sales cycle wydłuża się o tygodnie z powodu sekcji security w due diligence",
    ],
    benefits: [
      "Skrócenie sales cycle o 30–60% — certyfikat zastępuje większość pytań w ankietach",
      "Otwarcie drzwi do kontraktów enterprise i sektora publicznego",
      "Raz wdrożone ISO 27001 pokrywa ~70% SOC 2 — dwie certyfikacje za cenę jednej",
    ],
    example:
      "Polski software house B2B (50 osób) zamknął kontrakt z bankiem 3 mies. po certyfikacji — wcześniej dwa razy odpadał na security review.",
  },
  {
    id: "industry",
    label: "Przemysł i produkcja",
    short: "Przemysł",
    icon: Factory,
    driver: "NIS 2 + wymagania OEM + ciągłość produkcji",
    challenges: [
      "Sektor produkcyjny jest 'sektorem ważnym' w Ustawie KSC (transpozycja NIS 2)",
      "OEM-y motoryzacyjne wymagają TISAX, który w 70% pokrywa się z ISO 27001",
      "Ataki ransomware na linie produkcyjne to milionowe straty za każdą dobę przestoju",
    ],
    benefits: [
      "Spełnienie wymagań NIS 2 i KSC w jednym wdrożeniu",
      "Baza pod TISAX — szybka droga do kontraktów z OEM motoryzacyjnymi",
      "Plan ciągłości działania (BCP) chroni linie produkcyjne przed paraliżem",
    ],
    example:
      "Producent komponentów dla automotive uniknął utraty kontraktu z VW po wdrożeniu ISO 27001 — TISAX-owa ocena spadła z czerwonej do żółtej w 4 miesiące.",
  },
  {
    id: "tsl",
    label: "Transport, logistyka i łańcuch dostaw",
    short: "TSL",
    icon: Truck,
    driver: "NIS 2 + wymagania klientów retail i e-commerce",
    challenges: [
      "Branża TSL jest 'sektorem kluczowym' w NIS 2 — pełne obowiązki rejestracyjne i raportowe",
      "Retail i e-commerce wymagają od kurierów i operatorów magazynowych certyfikatów bezpieczeństwa",
      "Cyberataki na operatorów logistycznych (Maersk, DHL, InPost) pokazują skalę ryzyka",
    ],
    benefits: [
      "Zgodność z NIS 2 i UKSC bez budowania osobnego programu",
      "Status preferred vendor dla sieci handlowych i marketplace",
      "Ochrona systemów WMS/TMS przed ransomware = ochrona ciągłości dostaw",
    ],
    example:
      "Operator magazynowy obsługujący e-commerce dostał ISO 27001 jako warunek przedłużenia umowy z marketplace — wdrożenie zajęło 7 mies. z Quantifierem.",
  },
  {
    id: "retail",
    label: "Handel i e-commerce",
    short: "Handel",
    icon: ShoppingBag,
    driver: "RODO + PCI DSS + ochrona danych klientów",
    challenges: [
      "Sklepy online są celem #1 dla ataków na dane kart i tożsamości klientów",
      "RODO: kary do 20 mln EUR lub 4% obrotu za wyciek danych klientów",
      "PCI DSS wymaga systematycznego zarządzania ryzykiem — ISO 27001 to dostarcza",
    ],
    benefits: [
      "Niższe ryzyko kar UODO — udokumentowany system zarządzania bezpieczeństwem",
      "Ochrona reputacji marki — wycieki kosztują klientów, nie tylko pieniądze",
      "Zgodność z PCI DSS i RODO w jednym frameworku",
    ],
    example:
      "Sieć retail (omnichannel) po wdrożeniu ISO 27001 zamknęła 12 z 18 obserwacji UODO z kontroli — bez konieczności kary administracyjnej.",
  },
  {
    id: "health",
    label: "Ochrona zdrowia i life sciences",
    short: "Zdrowie",
    icon: HeartPulse,
    driver: "NIS 2 + RODO art. 9 (dane wrażliwe) + MDR",
    challenges: [
      "Sektor zdrowia jest 'sektorem kluczowym' w NIS 2 — najwyższe obowiązki",
      "RODO art. 9: dane medyczne to kategoria szczególna — wycieki = kary i pozwy",
      "MDR i wymagania szpitali jako klientów MedTech wymagają udokumentowanego ISMS",
    ],
    benefits: [
      "Spełnienie NIS 2 dla podmiotów leczniczych i dostawców MedTech",
      "Dowód na zgodność z RODO art. 9 dla danych pacjentów",
      "Zaufanie szpitali, NFZ i ubezpieczycieli zdrowotnych jako kontrahenta",
    ],
    example:
      "Sieć przychodni po wdrożeniu ISO 27001 dostała kontrakt z dużym pracodawcą na medycynę pracy — security review trwał 2 tygodnie zamiast 2 miesięcy.",
  },
  {
    id: "energy",
    label: "Energetyka i infrastruktura krytyczna",
    short: "Energetyka",
    icon: Zap,
    driver: "NIS 2 + KSC + URE + ataki APT",
    challenges: [
      "Energetyka, gaz, woda, ciepłownictwo — 'sektory kluczowe' z najwyższymi sankcjami w KSC",
      "URE i CSIRT GOV wymagają udokumentowanego zarządzania ryzykiem ICT",
      "Ataki APT na operatorów infrastruktury krytycznej rosną — SCADA i OT są celem",
    ],
    benefits: [
      "Zgodność z UKSC i NIS 2 dla operatorów usług kluczowych (OUK)",
      "Framework do zarządzania ryzykiem ICT i OT/SCADA",
      "Niższe ryzyko sankcji administracyjnych z UKSC (do 100 tys. PLN dziennie)",
    ],
    example:
      "Operator ciepłowniczy dla 80 tys. mieszkańców wdrożył ISO 27001 jako fundament zgodności z UKSC — uniknął kary po pierwszej kontroli organu nadzoru.",
  },
  {
    id: "services",
    label: "Usługi profesjonalne i doradcze",
    short: "Usługi B2B",
    icon: ScaleIcon,
    driver: "Audyty od klientów + tajemnica zawodowa + RODO procesora",
    challenges: [
      "Klienci enterprise (Big4 standard) audytują dostawców — bez ISO 27001 odpadasz",
      "Kancelarie i konsulting przetwarzają tajemnicę zawodową — wyciek = utrata licencji",
      "RODO: jako procesor odpowiadasz za bezpieczeństwo powierzonych danych",
    ],
    benefits: [
      "Status preferred vendor w przetargach enterprise i sektora publicznego",
      "Spełnienie wymagań klauzul DPA (RODO art. 28) bez negocjacji per klient",
      "Wyższa wycena usług — bezpieczeństwo to argument sprzedażowy, nie koszt",
    ],
    example:
      "Kancelaria prawna (40 prawników) po certyfikacji ISO 27001 weszła do panelu dostawców banku — wcześniej dwukrotnie odpadała na security questionnaire.",
  },
];

export default function IndustryWhySection({ currentLocale }: { currentLocale: string }) {
  const [active, setActive] = useState<string>("tech");
  const current = INDUSTRIES.find((i) => i.id === active) ?? INDUSTRIES[0];
  const Icon = current.icon;

  return (
    <section className="mb-16">
      <div className="text-center mb-8">
        <Badge className="bg-brand-purple text-white mb-4">Dla Twojej branży</Badge>
        <h2 className="text-3xl md:text-4xl font-bold text-brand-blue-dark mb-4">
          Dlaczego System Zarządzania Bezpieczeństwem Informacji (ISO 27001) ma znaczenie dla Twojego biznesu
        </h2>
        <p className="text-lg text-slate-600 max-w-3xl mx-auto">
          ISMS wg ISO 27001 to nie tylko certyfikat — to ramy prawne, organizacyjne i techniczne, których oczekują
          klienci enterprise i regulatorzy. Wybierz swoją branżę i zobacz konkretne wymagania oraz korzyści.
        </p>
      </div>

      {/* Industry pills */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {INDUSTRIES.map((ind) => {
          const IndIcon = ind.icon;
          const isActive = ind.id === active;
          return (
            <button
              key={ind.id}
              onClick={() => setActive(ind.id)}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border transition-all ${
                isActive
                  ? "bg-brand-blue-dark text-white border-brand-blue-dark shadow-md"
                  : "bg-white text-slate-700 border-slate-200 hover:border-brand-blue hover:text-brand-blue-dark"
              }`}
              aria-pressed={isActive}
            >
              <IndIcon className="h-4 w-4" />
              <span className="hidden sm:inline">{ind.label}</span>
              <span className="sm:hidden">{ind.short}</span>
            </button>
          );
        })}
      </div>

      {/* Active panel */}
      <div key={current.id} className="animate-fade-in">
          <Card className="border-brand-gray-light bg-gradient-to-br from-white to-brand-gray-light/30 overflow-hidden">
            <CardContent className="p-6 md:p-10">
              {/* Header row */}
              <div className="flex flex-col md:flex-row md:items-center gap-4 mb-8 pb-6 border-b border-slate-200">
                <div className="w-14 h-14 rounded-xl bg-brand-blue/10 flex items-center justify-center flex-shrink-0">
                  <Icon className="h-7 w-7 text-brand-blue-dark" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-brand-blue-dark">{current.label}</h3>
                  <p className="text-sm text-slate-600 mt-1">
                    Główny driver: <span className="font-medium">{current.driver}</span>
                  </p>
                </div>
              </div>

              {/* Two columns */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <AlertTriangle className="h-5 w-5 text-amber-600" />
                    <h4 className="font-semibold text-brand-blue-dark">Twoje wyzwania</h4>
                  </div>
                  <ul className="space-y-3">
                    {current.challenges.map((c, i) => (
                      <li key={i} className="flex items-start gap-2 text-slate-700 text-sm">
                        <span className="text-amber-600 mt-0.5">•</span>
                        <span>{c}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <CheckCircle className="h-5 w-5 text-brand-blue" />
                    <h4 className="font-semibold text-brand-blue-dark">
                      Co zyskujesz z ISO 27001
                    </h4>
                  </div>
                  <ul className="space-y-3">
                    {current.benefits.map((b, i) => (
                      <li key={i} className="flex items-start gap-2 text-slate-700 text-sm">
                        <CheckCircle className="h-4 w-4 text-brand-blue mt-0.5 flex-shrink-0" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Example */}
              <div className="bg-brand-blue/5 border-l-4 border-brand-blue rounded-r-lg p-5 mb-6">
                <div className="text-xs font-semibold uppercase tracking-wider text-brand-blue mb-2">
                  Konkretny przykład
                </div>
                <p className="text-slate-700 italic">„{current.example}"</p>
              </div>

              {/* CTA */}
              <div className="flex flex-wrap gap-3">
                <Button
                  asChild
                  className="bg-brand-blue-dark text-white hover:bg-brand-blue-dark/90"
                >
                  <Link to={`/${currentLocale}/contact`}>
                    Umów demo dla Twojej branży <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" className="hover:text-brand-blue-dark">
                  <Link to={`/${currentLocale}/cybersecurity-check`}>
                    Sprawdź swoją gotowość
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
      </div>
    </section>
  );
}
