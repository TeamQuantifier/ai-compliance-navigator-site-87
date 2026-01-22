import PageTemplate from '@/components/PageTemplate';
import { Shield, Lock, Network, FileCheck, ArrowRight, Leaf, Scale, Package } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { LucideIcon } from 'lucide-react';

const Frameworks = () => {
  const { t, currentLocale, isLoading } = useLanguage();
  
  // Fallback texts for when translations are loading
  const getText = (key: string, fallbackPl: string, fallbackEn: string) => {
    const translated = t(key);
    // If translation returns the key itself, use fallback
    if (translated === key || isLoading) {
      return currentLocale === 'pl' ? fallbackPl : fallbackEn;
    }
    return translated;
  };

  // Popular frameworks with direct links - icons matched from HeroSection
  // Helper for 3-language text
  const getLocalizedText = (texts: { en: string; pl: string; cs: string }) => {
    if (currentLocale === 'cs') return texts.cs;
    if (currentLocale === 'pl') return texts.pl;
    return texts.en;
  };

  const popularFrameworks: {
    key: string;
    name: string;
    description: string;
    href: string;
    icon: LucideIcon;
  }[] = [
    {
      key: "nisII",
      name: "NIS II",
      description: getLocalizedText({
        en: "EU Cybersecurity Directive",
        pl: "Dyrektywa cyberbezpieczeństwa UE",
        cs: "Směrnice EU o kybernetické bezpečnosti"
      }),
      href: `/${currentLocale}/frameworks/nis-ii`,
      icon: Network,
    },
    {
      key: "iso27001",
      name: "ISO 27001",
      description: getLocalizedText({
        en: "Information Security Management",
        pl: "Zarządzanie bezpieczeństwem informacji",
        cs: "Řízení bezpečnosti informací"
      }),
      href: `/${currentLocale}/frameworks/iso-27001`,
      icon: Shield,
    },
    {
      key: "soc2",
      name: "SOC 2",
      description: getLocalizedText({
        en: "Service Organization Controls",
        pl: "Kontrola usług i organizacji",
        cs: "Kontroly služeb a organizace"
      }),
      href: `/${currentLocale}/frameworks/soc`,
      icon: Lock,
    },
    {
      key: "gdpr",
      name: "GDPR / RODO",
      description: getLocalizedText({
        en: "Data Protection Regulation",
        pl: "Ochrona danych osobowych",
        cs: "Ochrana osobních údajů"
      }),
      href: `/${currentLocale}/frameworks/gdpr`,
      icon: FileCheck,
    },
  ];

  // All frameworks organized by category with icons
  const frameworksByCategory: {
    categoryKey: string;
    title: { pl: string; en: string; cs?: string };
    description: { pl: string; en: string; cs?: string };
    icon: LucideIcon;
    frameworks?: { name: string; href: string }[];
    href?: string;
    isCategory?: boolean;
  }[] = [
    {
      categoryKey: "cybersecurity",
      title: { pl: "Cyberbezpieczeństwo", en: "Cybersecurity", cs: "Kybernetická bezpečnost" },
      description: { pl: "Ochrona przed zagrożeniami cybernetycznymi", en: "Protection against cyber threats", cs: "Ochrana před kybernetickými hrozbami" },
      icon: Network,
      frameworks: [
        { name: "NIS II", href: `/${currentLocale}/frameworks/nis-ii` },
        { name: "SOC I & SOC II", href: `/${currentLocale}/frameworks/soc` }
      ]
    },
    {
      categoryKey: "informationSecurity",
      title: { pl: "Bezpieczeństwo Informacji", en: "Information Security", cs: "Informační bezpečnost" },
      description: { pl: "Ochrona zasobów informacyjnych", en: "Securing information assets", cs: "Zabezpečení informačních aktiv" },
      icon: Shield,
      frameworks: [
        { name: "ISO 27001", href: `/${currentLocale}/frameworks/iso-27001` },
        { name: "ISO 9001", href: `/${currentLocale}/frameworks/iso-9001` }
      ]
    },
    {
      categoryKey: "dataSecurity",
      title: { pl: "Ochrona Danych", en: "Data Protection", cs: "Ochrana dat" },
      description: { pl: "Regulacje dotyczące danych osobowych", en: "Personal data regulations", cs: "Regulace osobních údajů" },
      icon: Lock,
      frameworks: [
        { name: "GDPR / RODO", href: `/${currentLocale}/frameworks/gdpr` },
        { name: "HIPAA", href: `/${currentLocale}/frameworks/hipaa` },
        { name: "CCPA", href: `/${currentLocale}/frameworks/ccpa` }
      ]
    },
    {
      categoryKey: "esg",
      title: { pl: "ESG", en: "ESG", cs: "ESG" },
      description: { pl: "Raportowanie środowiskowe, społeczne i zarządcze", en: "Environmental, Social & Governance", cs: "Environmentální, sociální a správní aspekty" },
      icon: Scale,
      href: `/${currentLocale}/frameworks/esg`,
      isCategory: true
    },
    {
      categoryKey: "environmental",
      title: { pl: "Środowisko", en: "Environmental", cs: "Životní prostředí" },
      description: { pl: "Zarządzanie środowiskowe i zrównoważony rozwój", en: "Environmental management & sustainability", cs: "Environmentální management a udržitelnost" },
      icon: Leaf,
      href: `/${currentLocale}/frameworks/environmental`,
      isCategory: true
    },
    {
      categoryKey: "governance",
      title: { pl: "Governance", en: "Governance", cs: "Governance" },
      description: { pl: "Ład korporacyjny i etyka", en: "Corporate governance & ethics", cs: "Firemní správa a etika" },
      icon: Scale,
      href: `/${currentLocale}/frameworks/governance`,
      isCategory: true
    },
    {
      categoryKey: "productLevel",
      title: { pl: "Poziom Produktu", en: "Product Level", cs: "Úroveň produktu" },
      description: { pl: "Compliance produktu i cykl życia", en: "Product compliance & lifecycle", cs: "Compliance produktu a životní cyklus" },
      icon: Package,
      href: `/${currentLocale}/frameworks/product-level`,
      isCategory: true
    }
  ];

  const pageTitle = getLocalizedText({
    en: "Compliance Frameworks | Quantifier.ai",
    pl: "Standardy Compliance | Quantifier.ai",
    cs: "Standardy Compliance | Quantifier.ai"
  });
  
  const pageDescription = getLocalizedText({
    en: "Our platform supports a wide range of compliance frameworks: NIS II, ISO 27001, SOC 2, GDPR and more. Start your compliance journey.",
    pl: "Nasza platforma wspiera szeroki zakres standardów compliance: NIS II, ISO 27001, SOC 2, GDPR i wiele innych. Rozpocznij swoją ścieżkę zgodności.",
    cs: "Naše platforma podporuje širokou škálu compliance standardů: NIS II, ISO 27001, SOC 2, GDPR a další. Začněte svou cestu k souladu."
  });

  return (
    <PageTemplate
      title={pageTitle}
      description={pageDescription}
    >
      {/* Hero Section */}
      <section className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-compliance-700 to-innovation-600 bg-clip-text text-transparent leading-tight pb-1">
          {getLocalizedText({
            en: 'Compliance Frameworks',
            pl: 'Standardy Compliance',
            cs: 'Standardy Compliance'
          })}
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          {getLocalizedText({
            en: 'Comprehensive support for key regulatory standards. Automation, monitoring and reporting in one platform.',
            pl: 'Kompleksowe wsparcie dla kluczowych standardów regulacyjnych. Automatyzacja, monitoring i raportowanie w jednej platformie.',
            cs: 'Komplexní podpora pro klíčové regulační standardy. Automatizace, monitoring a reporting v jedné platformě.'
          })}
        </p>
      </section>

      {/* Popular Frameworks Section */}
      <section className="mb-20" aria-labelledby="popular-frameworks">
        <h2 id="popular-frameworks" className="text-2xl md:text-3xl font-bold text-center mb-4">
          {getLocalizedText({
            en: 'Most Popular Frameworks',
            pl: 'Najpopularniejsze Standardy',
            cs: 'Nejpopulárnější standardy'
          })}
        </h2>
        <p className="text-center text-muted-foreground mb-10 max-w-2xl mx-auto">
          {getLocalizedText({
            en: 'Direct access to the most important compliance standards',
            pl: 'Bezpośredni dostęp do najważniejszych standardów compliance',
            cs: 'Přímý přístup k nejdůležitějším compliance standardům'
          })}
        </p>
        
        <div className="flex flex-wrap justify-center gap-6 md:gap-8">
          {popularFrameworks.map((framework) => {
            const IconComponent = framework.icon;
            return (
              <Link 
                key={framework.key} 
                to={framework.href}
                className="group flex flex-col items-center text-center w-32 md:w-40"
              >
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-compliance-900 to-innovation-900 flex items-center justify-center mb-4 shadow-xl shadow-black/30 border border-slate-700/50 group-hover:scale-110 group-hover:shadow-2xl transition-all duration-300">
                  <IconComponent className="h-8 w-8 md:h-10 md:w-10 text-white" />
                </div>
                <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors text-lg">
                  {framework.name}
                </h3>
                <p className="text-xs text-muted-foreground mt-1 opacity-80">
                  {framework.description}
                </p>
              </Link>
            );
          })}
        </div>
      </section>

      {/* All Frameworks by Category */}
      <section className="mb-20" aria-labelledby="all-frameworks">
        <h2 id="all-frameworks" className="text-2xl md:text-3xl font-bold text-center mb-10">
          {getLocalizedText({
            en: 'All Frameworks',
            pl: 'Wszystkie Standardy',
            cs: 'Všechny standardy'
          })}
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {frameworksByCategory.map((category) => {
            const IconComponent = category.icon;
            return (
              <div 
                key={category.categoryKey} 
                className="p-6 rounded-xl border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg bg-card/50"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-compliance-800 to-innovation-800 flex items-center justify-center">
                    <IconComponent className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">
                    {currentLocale === 'cs' && category.title.cs ? category.title.cs : (currentLocale === 'pl' ? category.title.pl : category.title.en)}
                  </h3>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  {currentLocale === 'cs' && category.description.cs ? category.description.cs : (currentLocale === 'pl' ? category.description.pl : category.description.en)}
                </p>
                
                {category.isCategory ? (
                  <Link to={category.href!}>
                    <Button variant="outline" className="w-full group" size="sm">
                      {getLocalizedText({ en: 'Explore', pl: 'Poznaj', cs: 'Prozkoumat' })}
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </Link>
                ) : (
                  <ul className="space-y-2">
                    {category.frameworks?.map((framework) => (
                      <li key={framework.name}>
                        <Link 
                          to={framework.href}
                          className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-accent group transition-colors"
                        >
                          <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                            {framework.name}
                          </span>
                          <ArrowRight className="h-4 w-4 text-muted-foreground/50 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            );
          })}
        </div>
      </section>
      
      {/* GRC Platform CTA */}
      <section className="rounded-2xl bg-gradient-to-r from-compliance-900 to-innovation-900 p-8 md:p-12 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
          {getLocalizedText({
            en: 'Need support for a specific framework?',
            pl: 'Potrzebujesz wsparcia dla konkretnego standardu?',
            cs: 'Potřebujete podporu pro konkrétní standard?'
          })}
        </h2>
        <p className="text-lg text-slate-300 mb-8 max-w-2xl mx-auto">
          {getLocalizedText({
            en: 'Our platform is constantly evolving. Contact us to discuss your requirements.',
            pl: 'Nasza platforma stale ewoluuje. Skontaktuj się z nami, aby omówić Twoje wymagania.',
            cs: 'Naše platforma se neustále vyvíjí. Kontaktujte nás a probereme vaše požadavky.'
          })}
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button size="lg" className="bg-white text-slate-900 hover:bg-slate-100" asChild>
            <Link to={`/${currentLocale}/contact`}>
              {getLocalizedText({ en: 'Contact Us', pl: 'Skontaktuj się z nami', cs: 'Kontaktujte nás' })}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button size="lg" className="bg-transparent border-2 border-white text-white hover:bg-white/20" asChild>
            <Link to={`/${currentLocale}/grc-platform`}>
              {getLocalizedText({ en: 'Explore GRC Platform', pl: 'Poznaj platformę GRC', cs: 'Prozkoumat GRC platformu' })}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </PageTemplate>
  );
};

export default Frameworks;