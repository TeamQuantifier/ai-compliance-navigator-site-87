import PageTemplate from '@/components/PageTemplate';
import { Shield, Lock, Network, ArrowRight, Scale, Package } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { LucideIcon } from 'lucide-react';

const Frameworks = () => {
  const { currentLocale } = useLanguage();

  // Helper for 3-language text
  const getLocalizedText = (texts: { en: string; pl: string; cs: string }) => {
    if (currentLocale === 'cs') return texts.cs;
    if (currentLocale === 'pl') return texts.pl;
    return texts.en;
  };

  // All frameworks organized by category - 6 categories in 3x2 grid
  const frameworksByCategory: {
    categoryKey: string;
    title: { pl: string; en: string; cs: string };
    description: { pl: string; en: string; cs: string };
    icon: LucideIcon;
    frameworks: { name: { pl: string; en: string; cs: string }; href: string }[];
  }[] = [
    // Row 1
    {
      categoryKey: "cybersecurity",
      title: { pl: "Cyberbezpieczeństwo", en: "Cybersecurity", cs: "Kybernetická bezpečnost" },
      description: { 
        pl: "Ochrona przed zagrożeniami cybernetycznymi", 
        en: "Protection against cyber threats", 
        cs: "Ochrana před kybernetickými hrozbami" 
      },
      icon: Network,
      frameworks: [
        { name: { pl: "NIS II", en: "NIS II", cs: "NIS II" }, href: `/${currentLocale}/frameworks/nis-ii` },
        { name: { pl: "SOC I & SOC II", en: "SOC I & SOC II", cs: "SOC I & SOC II" }, href: `/${currentLocale}/frameworks/soc` }
      ]
    },
    {
      categoryKey: "informationSecurity",
      title: { pl: "Bezpieczeństwo Informacji", en: "Information Security", cs: "Informační bezpečnost" },
      description: { 
        pl: "Ochrona zasobów informacyjnych", 
        en: "Securing information assets", 
        cs: "Zabezpečení informačních aktiv" 
      },
      icon: Shield,
      frameworks: [
        { name: { pl: "ISO 27001", en: "ISO 27001", cs: "ISO 27001" }, href: `/${currentLocale}/frameworks/iso-27001` },
        { name: { pl: "ISO 9001", en: "ISO 9001", cs: "ISO 9001" }, href: `/${currentLocale}/frameworks/iso-9001` }
      ]
    },
    {
      categoryKey: "governance",
      title: { pl: "Governance", en: "Governance", cs: "Governance" },
      description: { 
        pl: "Ład korporacyjny i zgodność prawna", 
        en: "Corporate governance and legal compliance", 
        cs: "Firemní správa a právní soulad" 
      },
      icon: Scale,
      frameworks: [
        { 
          name: { pl: "Ład korporacyjny", en: "Corporate Governance", cs: "Firemní správa" }, 
          href: `/${currentLocale}/frameworks/governance` 
        },
        { 
          name: { pl: "RODO", en: "GDPR", cs: "GDPR" }, 
          href: `/${currentLocale}/frameworks/gdpr` 
        },
        { 
          name: { pl: "Sygnaliści", en: "Whistleblowing", cs: "Whistleblowing" }, 
          href: `/${currentLocale}/frameworks/governance` 
        }
      ]
    },
    // Row 2
    {
      categoryKey: "productAnalysis",
      title: { pl: "Analizy produktowe", en: "Product Analysis", cs: "Produktové analýzy" },
      description: { 
        pl: "Analiza cyklu życia i paszporty produktowe", 
        en: "Lifecycle analysis and product passports", 
        cs: "Analýza životního cyklu a produktové pasy" 
      },
      icon: Package,
      frameworks: [
        { 
          name: { pl: "Ślad środowiskowy produktu LCA", en: "Product Environmental Footprint LCA", cs: "Environmentální stopa produktu LCA" }, 
          href: `/${currentLocale}/frameworks/product-level` 
        },
        { 
          name: { pl: "Paszporty produktowe DPP", en: "Digital Product Passports DPP", cs: "Digitální produktové pasy DPP" }, 
          href: `/${currentLocale}/frameworks/product-level` 
        },
        { 
          name: { pl: "Deklaracje produktowe EPD", en: "Environmental Product Declarations EPD", cs: "Environmentální prohlášení o produktu EPD" }, 
          href: `/${currentLocale}/frameworks/product-level` 
        }
      ]
    },
    {
      categoryKey: "dataSecurity",
      title: { pl: "Ochrona Danych", en: "Data Protection", cs: "Ochrana dat" },
      description: { 
        pl: "Regulacje dotyczące danych osobowych", 
        en: "Personal data regulations", 
        cs: "Regulace osobních údajů" 
      },
      icon: Lock,
      frameworks: [
        { name: { pl: "GDPR / RODO", en: "GDPR / RODO", cs: "GDPR / RODO" }, href: `/${currentLocale}/frameworks/gdpr` },
        { name: { pl: "HIPAA", en: "HIPAA", cs: "HIPAA" }, href: `/${currentLocale}/frameworks/hipaa` },
        { name: { pl: "CCPA", en: "CCPA", cs: "CCPA" }, href: `/${currentLocale}/frameworks/ccpa` }
      ]
    },
    {
      categoryKey: "esg",
      title: { pl: "ESG", en: "ESG", cs: "ESG" },
      description: { 
        pl: "Raportowanie niefinansowe i zrównoważony rozwój", 
        en: "Non-financial reporting and sustainability", 
        cs: "Nefinanční reporting a udržitelnost" 
      },
      icon: Scale,
      frameworks: [
        { 
          name: { pl: "Raportowanie niefinansowe (CSRD, VSME, ESRS, GRI)", en: "Non-financial reporting (CSRD, VSME, ESRS, GRI)", cs: "Nefinanční reporting (CSRD, VSME, ESRS, GRI)" }, 
          href: `/${currentLocale}/frameworks/esg` 
        },
        { 
          name: { pl: "Ślad węglowy organizacji GHG", en: "Organization GHG Carbon Footprint", cs: "Uhlíková stopa organizace GHG" }, 
          href: `/${currentLocale}/frameworks/environmental` 
        },
        { 
          name: { pl: "Cło węglowe na granicy CBAM", en: "Carbon Border Adjustment CBAM", cs: "Uhlíkové clo na hranicích CBAM" }, 
          href: `/${currentLocale}/frameworks/esg` 
        }
      ]
    }
  ];

  const pageTitle = getLocalizedText({
    en: "Regulatory Standards | Quantifier.ai",
    pl: "Standardy regulacyjne | Quantifier.ai",
    cs: "Regulační standardy | Quantifier.ai"
  });
  
  const pageDescription = getLocalizedText({
    en: "One platform. All regulations. Continuous compliance. Choose the standard that interests you or combine multiple regulations into one cohesive GRC system.",
    pl: "Jedna platforma. Wszystkie regulacje. Ciągła zgodność. Wybierz standard, który Cię interesuje — albo połącz wiele regulacji w jeden spójny system GRC.",
    cs: "Jedna platforma. Všechny regulace. Nepřetržitý soulad. Vyberte si standard, který vás zajímá — nebo spojte více regulací do jednoho uceleného GRC systému."
  });

  return (
    <PageTemplate
      title={pageTitle}
      description={pageDescription}
    >
      {/* Hero Section */}
      <section className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-compliance-700 to-innovation-600 bg-clip-text text-transparent leading-tight pb-1">
          {getLocalizedText({
            en: 'Regulatory Standards',
            pl: 'Standardy regulacyjne',
            cs: 'Regulační standardy'
          })}
        </h1>
        <p className="text-xl md:text-2xl font-semibold text-foreground mb-4">
          {getLocalizedText({
            en: 'One platform. All regulations. Continuous compliance.',
            pl: 'Jedna platforma. Wszystkie regulacje. Ciągła zgodność.',
            cs: 'Jedna platforma. Všechny regulace. Nepřetržitý soulad.'
          })}
        </p>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          {getLocalizedText({
            en: 'Choose the standard that interests you — or combine multiple regulations into one cohesive GRC system.',
            pl: 'Wybierz standard, który Cię interesuje — albo połącz wiele regulacji w jeden spójny system GRC.',
            cs: 'Vyberte si standard, který vás zajímá — nebo spojte více regulací do jednoho uceleného GRC systému.'
          })}
        </p>
      </section>

      {/* All Frameworks by Category - 3x2 grid */}
      <section className="mb-20" aria-labelledby="all-frameworks">
        <h2 id="all-frameworks" className="text-2xl md:text-3xl font-bold text-center mb-10">
          {getLocalizedText({
            en: 'Choose an area',
            pl: 'Wybierz obszar',
            cs: 'Vyberte oblast'
          })}
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                    {getLocalizedText(category.title)}
                  </h3>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  {getLocalizedText(category.description)}
                </p>
                
                <ul className="space-y-2">
                  {category.frameworks.map((framework) => (
                    <li key={framework.href + getLocalizedText(framework.name)}>
                      <Link 
                        to={framework.href}
                        className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-accent group transition-colors"
                      >
                        <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                          {getLocalizedText(framework.name)}
                        </span>
                        <ArrowRight className="h-4 w-4 text-muted-foreground/50 group-hover:text-primary group-hover:translate-x-1 transition-all flex-shrink-0" />
                      </Link>
                    </li>
                  ))}
                </ul>
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
