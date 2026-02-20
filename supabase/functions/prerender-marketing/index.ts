// Prerender marketing pages for SEO bots - deployed v4
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!;
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const BASE_URL = 'https://quantifier.ai';

// Ensure URL ends with trailing slash
const ensureTrailingSlash = (url: string): string => {
  if (url.endsWith('/')) return url;
  return url + '/';
};

// Hreflang map for regional targeting
const localeHreflangMap: Record<string, string> = {
  en: 'en',
  pl: 'pl-PL',
  cs: 'cs-CZ',
};

// Map page slugs to actual URL paths for correct canonical URLs
const pageUrlMap: Record<string, string> = {
  'index': '',
  'soc2-automation': 'frameworks/soc',
  'iso27001': 'frameworks/iso-27001',
  'gdpr-compliance': 'frameworks/gdpr',
  'nis2': 'frameworks/nis-ii',
  'grc-platform': 'grc-platform',
  'product-features': 'product/features',
  'plans': 'plans',
  'about': 'about',
  'contact': 'contact',
  'partners': 'partners',
  'frameworks': 'frameworks',
  'dora': 'frameworks/dora',
  'iso-9001': 'frameworks/iso-9001',
  'hipaa': 'frameworks/hipaa',
  'ccpa': 'frameworks/ccpa',
  'esg': 'frameworks/esg',
  'environmental': 'frameworks/environmental',
  'governance': 'frameworks/governance',
  'product-level': 'frameworks/product-level',
  'product-overview': 'product/overview',
  'compliance-officer': 'product/ai-compliance-officer',
  'task-data-management': 'product/task-data-management',
  'analytics-dashboards': 'product/analytics-dashboards',
  'documents-management': 'product/documents-management',
  'api-integrations': 'product/api-integrations',
  'value-chain': 'product/value-chain',
  'risk-assessment': 'product/risk-assessment',
  'by-roles': 'by-roles',
  'by-roles-managers': 'by-roles/managers',
  'by-roles-contributors': 'by-roles/contributors',
  'by-roles-auditor': 'by-roles/auditor',
  'blog': 'blog',
  'success-stories': 'success-stories',
  'legal-privacy': 'legal/privacy',
  'legal-terms': 'legal/terms',
  'legal-cookies': 'legal/cookies',
  'cybersecurity-check': 'cybersecurity-check',
  'cybersecurity-check-pl': 'sprawdz-cyberbezpieczenstwo',
};

interface FAQ {
  question: string;
  answer: string;
}

interface Section {
  h2: string;
  content: string[];
}

interface PageData {
  title: string;
  description: string;
  h1: string;
  subtitle?: string;
  sections: Section[];
  faqs?: FAQ[];
  internalLinks?: { text: string; href: string }[];
}

// Page content database
const getPageContent = (locale: string, page: string): PageData | null => {
  const isPolish = locale === 'pl';
  const isCzech = locale === 'cs';
  
  const pages: Record<string, Record<string, PageData>> = {
    'index': {
      en: {
        title: 'Quantifier.ai - AI-Powered GRC Platform | Compliance & Risk Management',
        description: 'End-to-end GRC in one AI-native platform. Automate ISO 27001, SOC 2, GDPR, NIS2 compliance. Reduce manual work by 80%. Trusted by 250+ companies.',
        h1: 'End-to-end GRC. In one AI-native platform.',
        subtitle: 'Your AI Compliance Officer that manages projects, collects data and presents results, automating the entire compliance process.',
        sections: [
          {
            h2: 'Comprehensive AI-Powered Compliance Suite',
            content: [
              'AI Compliance Officer - AI-driven assistant that monitors systems, identifies issues, and suggests remediation',
              'Document Management - Centralized repository with automated version control and audit trails',
              'Role-Based Access - Tailored interfaces for managers, contributors, and auditors',
              'Analytics & Dashboards - Real-time visualization of compliance status and risk levels',
              'Automated Workflows - Automate compliance processes to ensure consistency',
              'Data Management - Secure handling of sensitive data with privacy controls'
            ]
          },
          {
            h2: 'Why Teams Trust Us with Compliance',
            content: [
              'Peace of Mind, Powered by Automation - No more chasing employees or endless follow-ups',
              'Say Goodbye to Manual Oversight - AI agents handle training, data collection, and policy sign-offs',
              'Stay Ahead with Real-Time Visibility - Instantly see what\'s done, pending, and risky',
              'Launch in Minutes, Not Months - Fast, seamless rollout without expensive consultants',
              'Everything You Need in One Platform - Manage SOC 2, ISO 27001, GDPR, and more'
            ]
          },
          {
            h2: 'Compliance, powered by insiders',
            content: [
              'Join 250+ companies—from startups to multinational corporations—who trust our solutions',
              'We combine cutting-edge tech with real compliance expertise'
            ]
          },
          {
            h2: 'Tailored for Every Role',
            content: [
              'For Leadership & Executive (CFO, COO, CISO, Head of Risk) - Comprehensive dashboards to oversee compliance',
              'For Operational Teams (Compliance, IT, Security, ESG) - Streamlined interfaces for data entry and tasks',
              'For Internal & External Auditors - Detailed audit trails and verification tools'
            ]
          },
          {
            h2: 'Start Your AI-Powered Compliance Journey Today',
            content: [
              'For Enterprise - Comprehensive compliance management for complex regulatory environments',
              'For Mid-Market - Scalable solutions to grow with your compliance needs',
              'For Startups - Build compliance into your foundation from day one'
            ]
          }
        ],
        faqs: [
          { question: 'What is Quantifier.ai?', answer: 'Quantifier.ai is an AI-powered GRC (Governance, Risk, and Compliance) platform that helps organizations automate compliance workflows, manage risks, and achieve certifications faster.' },
          { question: 'Which compliance frameworks does Quantifier support?', answer: 'Quantifier supports ISO 27001, SOC 2, GDPR, NIS2, DORA, ISO 9001, NIST, HIPAA, CCPA and many more frameworks with cross-mapping capabilities.' },
          { question: 'How much time can I save with Quantifier?', answer: 'Organizations typically reduce compliance effort by 80% and achieve certifications 10x faster compared to manual processes.' }
        ],
        internalLinks: [
          { text: 'Product Features', href: '/product/features' },
          { text: 'Pricing Plans', href: '/plans' },
          { text: 'ISO 27001 Compliance', href: '/frameworks/iso-27001' },
          { text: 'SOC 2 Automation', href: '/frameworks/soc' },
          { text: 'NIS 2 Directive', href: '/frameworks/nis-ii' },
          { text: 'GDPR Compliance', href: '/frameworks/gdpr' }
        ]
      },
      pl: {
        title: 'Quantifier.ai - Platforma GRC oparta na AI | Zarządzanie Zgodnością i Ryzykiem',
        description: 'Kompleksowe GRC w jednej platformie AI. Automatyzuj ISO 27001, SOC 2, GDPR, NIS2. Zmniejsz pracę ręczną o 80%. Zaufało nam 250+ firm.',
        h1: 'Kompleksowe GRC. W jednej platformie AI.',
        subtitle: 'Twój AI Compliance Officer, który zarządza projektami, zbiera dane i prezentuje wyniki, automatyzując cały proces zgodności.',
        sections: [
          {
            h2: 'Kompleksowy pakiet zgodności oparty na AI',
            content: [
              'AI Compliance Officer - Asystent AI monitorujący systemy i identyfikujący problemy',
              'Zarządzanie dokumentami - Centralne repozytorium z automatyczną kontrolą wersji',
              'Dostęp oparty na rolach - Interfejsy dla menedżerów, współpracowników i audytorów',
              'Analityka i dashboardy - Wizualizacja statusu zgodności w czasie rzeczywistym',
              'Zautomatyzowane przepływy pracy - Automatyzacja procesów zgodności',
              'Zarządzanie danymi - Bezpieczna obsługa wrażliwych danych'
            ]
          },
          {
            h2: 'Dlaczego zespoły nam ufają',
            content: [
              'Spokój ducha dzięki automatyzacji - Koniec z poganianiem pracowników',
              'Pożegnaj ręczny nadzór - Agenci AI obsługują szkolenia i zbieranie danych',
              'Bądź o krok do przodu - Natychmiast zobacz co zrobione, co w toku, gdzie ryzyko'
            ]
          },
          {
            h2: 'Zgodność napędzana przez ekspertów',
            content: [
              'Dołącz do 250+ firm - od startupów po korporacje międzynarodowe',
              'Łączymy najnowsze technologie z prawdziwą wiedzą ekspercką'
            ]
          }
        ],
        internalLinks: [
          { text: 'Funkcje produktu', href: '/product/features' },
          { text: 'Cennik', href: '/plans' },
          { text: 'ISO 27001', href: '/frameworks/iso-27001' },
          { text: 'SOC 2', href: '/frameworks/soc' },
          { text: 'NIS 2', href: '/frameworks/nis-ii' },
          { text: 'GDPR', href: '/frameworks/gdpr' }
        ]
      },
      cs: {
        title: 'Quantifier.ai - GRC platforma poháněná AI | Správa shody a rizik',
        description: 'Komplexní GRC v jedné AI platformě. Automatizujte ISO 27001, SOC 2, GDPR, NIS2. Snižte manuální práci o 80%. Důvěřuje nám 250+ firem.',
        h1: 'Komplexní GRC. V jedné AI platformě.',
        subtitle: 'Váš AI Compliance Officer, který řídí projekty, sbírá data a prezentuje výsledky, automatizuje celý proces shody.',
        sections: [
          {
            h2: 'Komplexní sada pro shodu poháněná AI',
            content: [
              'AI Compliance Officer - AI asistent monitorující systémy a identifikující problémy',
              'Správa dokumentů - Centrální repozitář s automatickou kontrolou verzí',
              'Přístup založený na rolích - Rozhraní pro manažery, přispěvatele a auditory',
              'Analytika a dashboardy - Vizualizace stavu shody v reálném čase'
            ]
          },
          {
            h2: 'Proč nám týmy důvěřují',
            content: [
              'Klid díky automatizaci - Konec s honěním zaměstnanců',
              'Rozlučte se s manuálním dohledem - AI agenti zajistí školení a sběr dat'
            ]
          }
        ],
        internalLinks: [
          { text: 'Funkce produktu', href: '/product/features' },
          { text: 'Ceník', href: '/plans' },
          { text: 'ISO 27001', href: '/frameworks/iso-27001' },
          { text: 'SOC 2', href: '/frameworks/soc' },
          { text: 'NIS 2', href: '/frameworks/nis-ii' }
        ]
      }
    },
    'soc2-automation': {
      en: {
        title: 'SOC 2 Automation Platform - Achieve Compliance 10x Faster | Quantifier',
        description: 'Automate SOC 2 compliance with Quantifier.ai. AI-powered evidence collection, continuous monitoring, and audit-ready reports. Get certified faster.',
        h1: 'SOC 2 Automation Platform',
        subtitle: 'Achieve SOC 2 compliance 10x faster with AI-powered automation. Continuous monitoring, evidence collection, and audit-ready reports.',
        sections: [
          {
            h2: 'The Problem with Manual SOC 2 Compliance',
            content: [
              'Manual evidence collection takes months of engineering time',
              'Spreadsheet-based tracking leads to gaps and missed controls',
              'Annual audits require scrambling to gather documentation',
              'No visibility into compliance status between audits',
              'Difficult to maintain continuous compliance'
            ]
          },
          {
            h2: 'How Quantifier Automates SOC 2',
            content: [
              'AI-powered evidence collection from 100+ integrations',
              'Automated control mapping to Trust Services Criteria',
              'Continuous monitoring with real-time alerts',
              'Audit-ready reports generated automatically',
              'Gap analysis and remediation recommendations'
            ]
          },
          {
            h2: 'SOC 2 Trust Services Criteria Coverage',
            content: [
              'Security - Protection against unauthorized access',
              'Availability - System availability for operation',
              'Processing Integrity - Complete and accurate processing',
              'Confidentiality - Protection of confidential information',
              'Privacy - Collection and use of personal information'
            ]
          },
          {
            h2: 'Results Our Customers Achieve',
            content: [
              '80% reduction in time to SOC 2 certification',
              '90% less manual evidence collection',
              '100% audit success rate',
              '60% cost savings compared to manual compliance'
            ]
          }
        ],
        faqs: [
          { question: 'What is SOC 2 automation?', answer: 'SOC 2 automation uses software to continuously collect evidence, monitor controls, and maintain compliance with SOC 2 Trust Services Criteria, replacing manual spreadsheet-based processes.' },
          { question: 'How long does it take to get SOC 2 certified with Quantifier?', answer: 'Most organizations achieve SOC 2 Type I certification within 4-6 weeks using Quantifier, compared to 3-6 months with manual processes.' },
          { question: 'What Trust Services Criteria does Quantifier cover?', answer: 'Quantifier covers all five Trust Services Criteria: Security, Availability, Processing Integrity, Confidentiality, and Privacy.' },
          { question: 'Do you integrate with our existing tools?', answer: 'Yes, Quantifier integrates with 100+ tools including AWS, Azure, GCP, GitHub, Jira, Slack, Okta, and many more for automated evidence collection.' },
          { question: 'Can Quantifier help with SOC 2 Type I and Type II?', answer: 'Yes, Quantifier supports both SOC 2 Type I (point-in-time) and Type II (period of time) audits with continuous monitoring and evidence collection.' },
          { question: 'How much does SOC 2 automation cost?', answer: 'Quantifier offers flexible pricing based on company size and needs. Contact us for a customized quote and see how much you can save compared to manual compliance.' }
        ],
        internalLinks: [
          { text: 'SOC Framework Details', href: '/frameworks/soc' },
          { text: 'ISO 27001 Compliance', href: '/frameworks/iso-27001' },
          { text: 'GRC Platform Overview', href: '/grc-platform' },
          { text: 'Pricing Plans', href: '/plans' }
        ]
      },
      pl: {
        title: 'Platforma Automatyzacji SOC 2 - Uzyskaj Zgodność 10x Szybciej | Quantifier',
        description: 'Automatyzuj zgodność SOC 2 z Quantifier.ai. Zbieranie dowodów wspierane przez AI, ciągłe monitorowanie i raporty gotowe do audytu.',
        h1: 'Platforma Automatyzacji SOC 2',
        subtitle: 'Uzyskaj zgodność SOC 2 10x szybciej dzięki automatyzacji opartej na AI.',
        sections: [
          {
            h2: 'Problem z Ręczną Zgodnością SOC 2',
            content: [
              'Ręczne zbieranie dowodów zajmuje miesiące pracy inżynierów',
              'Śledzenie w arkuszach prowadzi do luk i pominiętych kontroli',
              'Roczne audyty wymagają pośpiesznego gromadzenia dokumentacji'
            ]
          },
          {
            h2: 'Jak Quantifier Automatyzuje SOC 2',
            content: [
              'Zbieranie dowodów wspierane przez AI z ponad 100 integracji',
              'Automatyczne mapowanie kontroli do kryteriów Trust Services',
              'Ciągłe monitorowanie z alertami w czasie rzeczywistym'
            ]
          }
        ],
        faqs: [
          { question: 'Czym jest automatyzacja SOC 2?', answer: 'Automatyzacja SOC 2 wykorzystuje oprogramowanie do ciągłego zbierania dowodów, monitorowania kontroli i utrzymywania zgodności z kryteriami Trust Services SOC 2.' }
        ],
        internalLinks: [
          { text: 'Szczegóły SOC', href: '/frameworks/soc' },
          { text: 'Cennik', href: '/plans' }
        ]
      },
      cs: {
        title: 'Platforma pro automatizaci SOC 2 – Dosáhněte shody 10× rychleji | Quantifier',
        description: 'Automatizujte shodu se SOC 2 pomocí Quantifier.ai. Sběr důkazů poháněný AI, kontinuální monitoring a reporty připravené pro audit.',
        h1: 'Platforma pro automatizaci SOC 2',
        subtitle: 'Dosáhněte shody se SOC 2 10× rychleji díky automatizaci poháněné AI. Kontinuální monitoring, sběr důkazů a reporty připravené pro audit.',
        sections: [
          {
            h2: 'Problém ruční shody se SOC 2',
            content: [
              'Ruční sběr důkazů zabere měsíce práce inženýrů',
              'Sledování v tabulkách vede k mezerám a přehlédnutým kontrolám',
              'Roční audity vyžadují spěšné shromažďování dokumentace'
            ]
          },
          {
            h2: 'Jak Quantifier automatizuje SOC 2',
            content: [
              'Sběr důkazů poháněný AI ze 100+ integrací',
              'Automatické mapování kontrol na kritéria Trust Services',
              'Kontinuální monitoring s upozorněními v reálném čase',
              'Reporty připravené pro audit generované automaticky'
            ]
          },
          {
            h2: 'Pokrytí kritérií Trust Services SOC 2',
            content: [
              'Bezpečnost – Ochrana proti neoprávněnému přístupu',
              'Dostupnost – Dostupnost systému pro provoz',
              'Integrita zpracování – Kompletní a přesné zpracování',
              'Důvěrnost – Ochrana důvěrných informací',
              'Soukromí – Sběr a použití osobních údajů'
            ]
          }
        ],
        faqs: [
          { question: 'Co je automatizace SOC 2?', answer: 'Automatizace SOC 2 využívá software ke kontinuálnímu sběru důkazů, monitorování kontrol a udržování shody s kritérii Trust Services SOC 2.' },
          { question: 'Jak dlouho trvá získání certifikace SOC 2 s Quantifier?', answer: 'Většina organizací dosáhne certifikace SOC 2 Type I do 4–6 týdnů s Quantifier, oproti 3–6 měsícům u ručních procesů.' },
          { question: 'Jaká kritéria Trust Services Quantifier pokrývá?', answer: 'Quantifier pokrývá všech pět kritérií: Bezpečnost, Dostupnost, Integrita zpracování, Důvěrnost a Soukromí.' },
          { question: 'Integrujete se s našimi stávajícími nástroji?', answer: 'Ano, Quantifier se integruje se 100+ nástroji včetně AWS, Azure, GCP, GitHub, Jira, Slack, Okta a dalšími.' }
        ],
        internalLinks: [
          { text: 'Podrobnosti SOC', href: '/frameworks/soc' },
          { text: 'ISO 27001', href: '/frameworks/iso-27001' },
          { text: 'GRC platforma', href: '/grc-platform' },
          { text: 'Ceník', href: '/plans' }
        ]
      }
    },
    'iso27001': {
      en: {
        title: 'ISO 27001 Compliance Software - Build Your ISMS with AI | Quantifier',
        description: 'Implement ISO 27001 faster with AI-powered ISMS software. Automated gap analysis, risk assessments, and Annex A control mapping. Get certified in weeks.',
        h1: 'ISO 27001 Compliance Software',
        subtitle: 'Build your Information Security Management System (ISMS) with AI. From gap analysis to certification in weeks, not months.',
        sections: [
          {
            h2: 'Why ISO 27001 Certification Matters',
            content: [
              'Demonstrates commitment to information security to clients and partners',
              'Required for enterprise sales and government contracts',
              'Reduces risk of data breaches and security incidents',
              'Provides competitive advantage in the market',
              'Ensures compliance with regulatory requirements'
            ]
          },
          {
            h2: 'Challenges of ISO 27001 Implementation',
            content: [
              'Complex standard with 93 Annex A controls',
              'Requires extensive documentation and policies',
              'Manual risk assessments are time-consuming',
              'Difficult to maintain continuous compliance',
              'Expensive consultant fees and internal resources'
            ]
          },
          {
            h2: 'AI-Powered ISMS Implementation',
            content: [
              'Automated gap analysis against ISO 27001 requirements',
              'AI-generated policies and procedures',
              'Intelligent risk assessment with treatment recommendations',
              'Annex A control mapping and evidence collection',
              'Continuous compliance monitoring and alerts'
            ]
          },
          {
            h2: 'Annex A Control Categories',
            content: [
              'A.5 Organizational Controls - Policies, roles, responsibilities',
              'A.6 People Controls - Screening, training, awareness',
              'A.7 Physical Controls - Secure areas, equipment security',
              'A.8 Technological Controls - Access control, cryptography, security'
            ]
          }
        ],
        faqs: [
          { question: 'What is ISO 27001?', answer: 'ISO 27001 is the international standard for information security management systems (ISMS). It provides a framework for managing and protecting sensitive information.' },
          { question: 'How does Quantifier help with ISO 27001 certification?', answer: 'Quantifier automates gap analysis, generates required documentation, performs risk assessments, and provides continuous monitoring to help you achieve and maintain ISO 27001 certification.' },
          { question: 'What is the timeline for ISO 27001 certification?', answer: 'With Quantifier, most organizations can achieve ISO 27001 certification within 8-12 weeks, compared to 6-12 months with manual processes.' },
          { question: 'Do I need consultants for ISO 27001?', answer: 'Quantifier reduces the need for expensive consultants by providing AI-powered guidance, pre-built templates, and automated compliance workflows.' },
          { question: 'How does continuous compliance work?', answer: 'Quantifier continuously monitors your security controls, collects evidence automatically, and alerts you to any compliance gaps or issues in real-time.' },
          { question: 'Can I manage ISO 27001 and SOC 2 together?', answer: 'Yes, Quantifier supports multi-framework compliance with cross-mapping between ISO 27001 and SOC 2, reducing duplicate effort.' }
        ],
        internalLinks: [
          { text: 'ISO 27001 Framework Details', href: '/frameworks/iso-27001' },
          { text: 'SOC 2 Automation', href: '/frameworks/soc' },
          { text: 'GRC Platform', href: '/grc-platform' },
          { text: 'Pricing', href: '/plans' }
        ]
      },
      pl: {
        title: 'Oprogramowanie do Zgodności ISO 27001 - Zbuduj ISMS z AI | Quantifier',
        description: 'Wdróż ISO 27001 szybciej dzięki oprogramowaniu ISMS wspieranemu przez AI. Automatyczna analiza luk i ocena ryzyka.',
        h1: 'Oprogramowanie do Zgodności ISO 27001',
        subtitle: 'Zbuduj swój System Zarządzania Bezpieczeństwem Informacji (ISMS) z AI.',
        sections: [
          {
            h2: 'Dlaczego Certyfikacja ISO 27001 Jest Ważna',
            content: [
              'Demonstruje zaangażowanie w bezpieczeństwo informacji',
              'Wymagana dla sprzedaży korporacyjnej i kontraktów rządowych',
              'Zmniejsza ryzyko naruszeń danych'
            ]
          }
        ],
        faqs: [
          { question: 'Czym jest ISO 27001?', answer: 'ISO 27001 to międzynarodowy standard dla systemów zarządzania bezpieczeństwem informacji (ISMS).' }
        ],
        internalLinks: [
          { text: 'Szczegóły ISO 27001', href: '/frameworks/iso-27001' },
          { text: 'Cennik', href: '/plans' }
        ]
      },
      cs: {
        title: 'Software pro shodu s ISO 27001 – Vybudujte ISMS s AI | Quantifier',
        description: 'Implementujte ISO 27001 rychleji pomocí ISMS softwaru poháněného AI. Automatizovaná analýza mezer, hodnocení rizik a mapování kontrol Annex A.',
        h1: 'Software pro shodu s ISO 27001',
        subtitle: 'Vybudujte svůj systém řízení bezpečnosti informací (ISMS) s AI. Od analýzy mezer po certifikaci za týdny.',
        sections: [
          {
            h2: 'Proč je certifikace ISO 27001 důležitá',
            content: [
              'Prokazuje závazek k bezpečnosti informací klientům a partnerům',
              'Vyžadována pro enterprise prodej a státní zakázky',
              'Snižuje riziko úniků dat a bezpečnostních incidentů',
              'Zajišťuje shodu s regulatorními požadavky'
            ]
          },
          {
            h2: 'Výzvy implementace ISO 27001',
            content: [
              'Složitý standard s 93 kontrolami Annex A',
              'Vyžaduje rozsáhlou dokumentaci a politiky',
              'Ruční hodnocení rizik je časově náročné',
              'Obtížné udržování kontinuální shody'
            ]
          },
          {
            h2: 'Implementace ISMS poháněná AI',
            content: [
              'Automatizovaná analýza mezer proti požadavkům ISO 27001',
              'Politiky a postupy generované AI',
              'Inteligentní hodnocení rizik s doporučeními pro ošetření',
              'Mapování kontrol Annex A a sběr důkazů',
              'Kontinuální monitoring shody a upozornění'
            ]
          }
        ],
        faqs: [
          { question: 'Co je ISO 27001?', answer: 'ISO 27001 je mezinárodní standard pro systémy řízení bezpečnosti informací (ISMS). Poskytuje rámec pro správu a ochranu citlivých informací.' },
          { question: 'Jak Quantifier pomáhá s certifikací ISO 27001?', answer: 'Quantifier automatizuje analýzu mezer, generuje potřebnou dokumentaci, provádí hodnocení rizik a zajišťuje kontinuální monitoring pro dosažení a udržení certifikace.' },
          { question: 'Jaký je časový rámec pro certifikaci ISO 27001?', answer: 'S Quantifier většina organizací dosáhne certifikace ISO 27001 do 8–12 týdnů, oproti 6–12 měsícům u ručních procesů.' },
          { question: 'Mohu spravovat ISO 27001 a SOC 2 společně?', answer: 'Ano, Quantifier podporuje shodu s více standardy s křížovým mapováním mezi ISO 27001 a SOC 2, čímž eliminuje duplicitní práci.' }
        ],
        internalLinks: [
          { text: 'Podrobnosti ISO 27001', href: '/frameworks/iso-27001' },
          { text: 'SOC 2 automatizace', href: '/frameworks/soc' },
          { text: 'GRC platforma', href: '/grc-platform' },
          { text: 'Ceník', href: '/plans' }
        ]
      }
    },
    'gdpr-compliance': {
      en: {
        title: 'GDPR Compliance Software - Automate Data Privacy Management | Quantifier',
        description: 'Simplify GDPR compliance with automated data mapping, DSAR handling, and privacy impact assessments. Protect personal data and avoid fines.',
        h1: 'GDPR Compliance Software',
        subtitle: 'Automate data privacy management and GDPR compliance. From data mapping to DSAR handling, all in one platform.',
        sections: [
          {
            h2: 'GDPR Requirements Overview',
            content: [
              'Lawful basis for processing personal data',
              'Data subject rights (access, erasure, portability)',
              'Data protection by design and default',
              'Data breach notification within 72 hours',
              'Cross-border data transfer compliance'
            ]
          },
          {
            h2: 'Common GDPR Compliance Challenges',
            content: [
              'Tracking personal data across multiple systems',
              'Managing data subject access requests (DSARs) manually',
              'Conducting privacy impact assessments',
              'Maintaining records of processing activities',
              'Ensuring third-party vendor compliance'
            ]
          },
          {
            h2: 'Complete GDPR Management Solution',
            content: [
              'Automated data discovery and mapping',
              'DSAR workflow automation and tracking',
              'Privacy impact assessment templates',
              'Consent management and documentation',
              'Vendor risk assessment and monitoring'
            ]
          },
          {
            h2: 'Data Subject Rights Automation',
            content: [
              'Access requests - Provide data within 30 days',
              'Erasure requests - Right to be forgotten workflow',
              'Portability requests - Export data in machine-readable format',
              'Rectification requests - Update inaccurate data',
              'Objection handling - Process and document objections'
            ]
          }
        ],
        faqs: [
          { question: 'What is GDPR compliance?', answer: 'GDPR (General Data Protection Regulation) compliance means following EU regulations for protecting personal data of EU residents, including lawful processing, data subject rights, and breach notification.' },
          { question: 'How does Quantifier help with GDPR?', answer: 'Quantifier automates data mapping, DSAR handling, privacy impact assessments, and provides continuous monitoring to help you maintain GDPR compliance.' },
          { question: 'Can you automate DSAR handling?', answer: 'Yes, Quantifier provides automated workflows for all types of data subject requests including access, erasure, portability, and rectification requests.' },
          { question: 'How do you handle cross-border data transfers?', answer: 'Quantifier helps document and manage cross-border transfers with standard contractual clauses, adequacy decisions, and binding corporate rules.' },
          { question: 'What about cookie consent management?', answer: 'Quantifier integrates with cookie consent platforms and helps you document consent collection, preferences, and withdrawal across your digital properties.' },
          { question: 'Do you support other privacy regulations?', answer: 'Yes, Quantifier supports CCPA, LGPD, POPIA, and other privacy regulations with cross-mapping to reduce duplicate compliance effort.' }
        ],
        internalLinks: [
          { text: 'All Frameworks', href: '/frameworks' },
          { text: 'ISO 27001 Compliance', href: '/frameworks/iso-27001' },
          { text: 'NIS2 Compliance', href: '/frameworks/nis-ii' },
          { text: 'Pricing', href: '/plans' }
        ]
      },
      pl: {
        title: 'Oprogramowanie do Zgodności z GDPR - Automatyzacja Zarządzania Prywatnością | Quantifier',
        description: 'Uprość zgodność z GDPR dzięki automatycznemu mapowaniu danych, obsłudze DSAR i ocenom wpływu na prywatność.',
        h1: 'Oprogramowanie do Zgodności z GDPR',
        subtitle: 'Automatyzuj zarządzanie prywatnością danych i zgodność z GDPR.',
        sections: [
          {
            h2: 'Przegląd Wymagań GDPR',
            content: [
              'Podstawa prawna przetwarzania danych osobowych',
              'Prawa osób, których dane dotyczą',
              'Ochrona danych w fazie projektowania'
            ]
          }
        ],
        faqs: [
          { question: 'Czym jest zgodność z GDPR?', answer: 'Zgodność z GDPR oznacza przestrzeganie przepisów UE dotyczących ochrony danych osobowych mieszkańców UE.' }
        ],
        internalLinks: [
          { text: 'Wszystkie Standardy', href: '/frameworks' },
          { text: 'Cennik', href: '/plans' }
        ]
      },
      cs: {
        title: 'Software pro shodu s GDPR – Automatizace ochrany osobních údajů | Quantifier',
        description: 'Zjednodušte shodu s GDPR pomocí automatizovaného mapování dat, zpracování žádostí DSAR a posouzení vlivu na soukromí. Chraňte osobní údaje.',
        h1: 'Software pro shodu s GDPR',
        subtitle: 'Automatizujte správu ochrany osobních údajů a shodu s GDPR. Od mapování dat po zpracování DSAR v jedné platformě.',
        sections: [
          {
            h2: 'Přehled požadavků GDPR',
            content: [
              'Zákonný základ pro zpracování osobních údajů',
              'Práva subjektů údajů (přístup, výmaz, přenositelnost)',
              'Ochrana údajů již od návrhu a ve výchozím nastavení',
              'Oznámení o narušení bezpečnosti dat do 72 hodin',
              'Shoda s přeshraničním přenosem dat'
            ]
          },
          {
            h2: 'Časté výzvy shody s GDPR',
            content: [
              'Sledování osobních údajů napříč více systémy',
              'Ruční správa žádostí subjektů údajů (DSAR)',
              'Provádění posouzení vlivu na ochranu soukromí',
              'Vedení záznamů o činnostech zpracování'
            ]
          },
          {
            h2: 'Kompletní řešení správy GDPR',
            content: [
              'Automatizované zjišťování a mapování dat',
              'Automatizace workflow pro DSAR a sledování',
              'Šablony pro posouzení vlivu na soukromí',
              'Správa souhlasů a dokumentace'
            ]
          }
        ],
        faqs: [
          { question: 'Co je shoda s GDPR?', answer: 'Shoda s GDPR znamená dodržování předpisů EU pro ochranu osobních údajů rezidentů EU, včetně zákonného zpracování, práv subjektů údajů a oznamování narušení.' },
          { question: 'Jak Quantifier pomáhá s GDPR?', answer: 'Quantifier automatizuje mapování dat, zpracování DSAR, posouzení vlivu na soukromí a poskytuje kontinuální monitoring pro udržení shody s GDPR.' },
          { question: 'Lze automatizovat zpracování DSAR?', answer: 'Ano, Quantifier poskytuje automatizované workflow pro všechny typy žádostí subjektů údajů včetně přístupu, výmazu, přenositelnosti a opravy.' },
          { question: 'Podporujete i další předpisy o ochraně soukromí?', answer: 'Ano, Quantifier podporuje CCPA, LGPD, POPIA a další předpisy s křížovým mapováním pro snížení duplicitního úsilí.' }
        ],
        internalLinks: [
          { text: 'Všechny standardy', href: '/frameworks' },
          { text: 'ISO 27001', href: '/frameworks/iso-27001' },
          { text: 'NIS2', href: '/frameworks/nis-ii' },
          { text: 'Ceník', href: '/plans' }
        ]
      }
    },
    'nis2': {
      en: {
        title: 'NIS2 Compliance Platform - Meet EU Cybersecurity Requirements | Quantifier',
        description: 'Prepare for NIS2 Directive compliance with automated risk management, incident reporting, and supply chain security. Avoid penalties up to €10M.',
        h1: 'NIS2 Compliance Platform',
        subtitle: 'Meet EU cybersecurity requirements with automated NIS2 compliance. Risk management, incident reporting, and supply chain security in one platform.',
        sections: [
          {
            h2: 'Understanding the NIS2 Directive',
            content: [
              'NIS2 is the updated EU directive on network and information security',
              'Expands scope to cover more sectors and entities',
              'Introduces stricter security requirements and penalties',
              'Mandates incident reporting within 24-72 hours',
              'Requires supply chain risk management'
            ]
          },
          {
            h2: 'Who Must Comply with NIS2',
            content: [
              'Essential entities: Energy, transport, banking, health, water, digital infrastructure',
              'Important entities: Postal services, waste, chemicals, food, manufacturing',
              'Digital service providers: Cloud, data centers, CDNs, social networks',
              'Public administration entities',
              'Medium and large enterprises in covered sectors'
            ]
          },
          {
            h2: 'NIS2 Implementation with Quantifier',
            content: [
              'Cybersecurity risk assessment and management',
              'Incident handling and reporting workflows',
              'Business continuity and crisis management',
              'Supply chain security assessment',
              'Security awareness training management'
            ]
          },
          {
            h2: 'Incident Response and Reporting',
            content: [
              'Early warning within 24 hours of significant incident',
              'Incident notification within 72 hours',
              'Final report within one month',
              'Automated incident classification and routing',
              'Integration with national CSIRTs'
            ]
          }
        ],
        faqs: [
          { question: 'What is the NIS2 Directive?', answer: 'NIS2 is the updated EU directive on the security of network and information systems, replacing NIS1 with stricter requirements and broader scope.' },
          { question: 'Which organizations must comply with NIS2?', answer: 'Essential and important entities in sectors like energy, transport, health, banking, digital infrastructure, and many others must comply. This includes medium and large enterprises.' },
          { question: 'What are the NIS2 penalties for non-compliance?', answer: 'Penalties can reach up to €10 million or 2% of global annual turnover for essential entities, and €7 million or 1.4% for important entities.' },
          { question: 'How does Quantifier help with NIS2?', answer: 'Quantifier provides automated risk assessments, incident reporting workflows, supply chain security monitoring, and continuous compliance tracking for NIS2 requirements.' },
          { question: 'What is the NIS2 compliance deadline?', answer: 'EU member states must transpose NIS2 into national law by October 2024, with organizations required to comply thereafter.' },
          { question: 'How long does NIS2 implementation take?', answer: 'With Quantifier, organizations can implement NIS2 requirements within 2-3 months, depending on current security maturity.' }
        ],
        internalLinks: [
          { text: 'All Frameworks', href: '/frameworks' },
          { text: 'DORA Compliance', href: '/frameworks/dora' },
          { text: 'ISO 27001', href: '/frameworks/iso-27001' },
          { text: 'Pricing', href: '/plans' }
        ]
      },
      pl: {
        title: 'Platforma Zgodności NIS2 - Spełnij Wymagania Cyberbezpieczeństwa UE | Quantifier',
        description: 'Przygotuj się na zgodność z dyrektywą NIS2. Automatyczne zarządzanie ryzykiem, raportowanie incydentów i bezpieczeństwo łańcucha dostaw.',
        h1: 'Platforma Zgodności NIS2',
        subtitle: 'Spełnij wymagania cyberbezpieczeństwa UE z automatyczną zgodnością NIS2.',
        sections: [
          {
            h2: 'Zrozumienie Dyrektywy NIS2',
            content: [
              'NIS2 to zaktualizowana dyrektywa UE dotycząca bezpieczeństwa sieci i informacji',
              'Rozszerza zakres na więcej sektorów i podmiotów',
              'Wprowadza surowsze wymagania bezpieczeństwa i kary'
            ]
          }
        ],
        faqs: [
          { question: 'Czym jest dyrektywa NIS2?', answer: 'NIS2 to zaktualizowana dyrektywa UE dotycząca bezpieczeństwa systemów sieciowych i informacyjnych.' }
        ],
        internalLinks: [
          { text: 'Wszystkie Standardy', href: '/frameworks' },
          { text: 'Cennik', href: '/plans' }
        ]
      },
      cs: {
        title: 'Platforma pro shodu s NIS2 – Požadavky kybernetické bezpečnosti EU | Quantifier',
        description: 'Připravte se na shodu se směrnicí NIS2 s automatizovaným řízením rizik, hlášením incidentů a bezpečností dodavatelského řetězce. Vyhněte se pokutám.',
        h1: 'Platforma pro shodu s NIS2',
        subtitle: 'Splňte požadavky kybernetické bezpečnosti EU s automatizovanou shodou NIS2. Řízení rizik, hlášení incidentů a bezpečnost dodavatelského řetězce.',
        sections: [
          {
            h2: 'Porozumění směrnici NIS2',
            content: [
              'NIS2 je aktualizovaná směrnice EU o bezpečnosti sítí a informací',
              'Rozšiřuje působnost na více sektorů a subjektů',
              'Zavádí přísnější bezpečnostní požadavky a sankce',
              'Vyžaduje hlášení incidentů do 24–72 hodin',
              'Vyžaduje řízení rizik dodavatelského řetězce'
            ]
          },
          {
            h2: 'Kdo musí splňovat NIS2',
            content: [
              'Základní subjekty: Energetika, doprava, bankovnictví, zdravotnictví, vodní hospodářství',
              'Důležité subjekty: Poštovní služby, odpadové hospodářství, chemie, potravinářství',
              'Poskytovatelé digitálních služeb: Cloud, datová centra, CDN, sociální sítě',
              'Subjekty veřejné správy'
            ]
          },
          {
            h2: 'Implementace NIS2 s Quantifier',
            content: [
              'Hodnocení a řízení kybernetických rizik',
              'Workflow pro zpracování a hlášení incidentů',
              'Kontinuita podnikání a krizové řízení',
              'Posouzení bezpečnosti dodavatelského řetězce'
            ]
          },
          {
            h2: 'Reakce na incidenty a hlášení',
            content: [
              'Včasné varování do 24 hodin od významného incidentu',
              'Oznámení o incidentu do 72 hodin',
              'Závěrečná zpráva do jednoho měsíce',
              'Automatizovaná klasifikace a směrování incidentů'
            ]
          }
        ],
        faqs: [
          { question: 'Co je směrnice NIS2?', answer: 'NIS2 je aktualizovaná směrnice EU o bezpečnosti sítí a informačních systémů, která nahrazuje NIS1 přísnějšími požadavky a širším rozsahem.' },
          { question: 'Které organizace musí splňovat NIS2?', answer: 'Základní a důležité subjekty v sektorech jako energetika, doprava, zdravotnictví, bankovnictví, digitální infrastruktura a mnohé další.' },
          { question: 'Jaké jsou sankce za nesplnění NIS2?', answer: 'Pokuty mohou dosáhnout až 10 milionů EUR nebo 2 % celosvětového ročního obratu pro základní subjekty a 7 milionů EUR nebo 1,4 % pro důležité subjekty.' },
          { question: 'Jak Quantifier pomáhá s NIS2?', answer: 'Quantifier poskytuje automatizované hodnocení rizik, workflow pro hlášení incidentů, monitoring bezpečnosti dodavatelského řetězce a kontinuální sledování shody.' }
        ],
        internalLinks: [
          { text: 'Všechny standardy', href: '/frameworks' },
          { text: 'DORA', href: '/frameworks/dora' },
          { text: 'ISO 27001', href: '/frameworks/iso-27001' },
          { text: 'Ceník', href: '/plans' }
        ]
      }
    },
    'grc-platform': {
      en: {
        title: 'AI-Native GRC Platform - Unified Governance, Risk & Compliance | Quantifier',
        description: 'Modern GRC platform with AI automation. Manage governance, risk, and compliance across multiple frameworks. Replace spreadsheets with intelligent workflows.',
        h1: 'AI-Native GRC Platform',
        subtitle: 'Unified Governance, Risk, and Compliance management. Replace spreadsheets with intelligent automation.',
        sections: [
          {
            h2: 'What is a GRC Platform?',
            content: [
              'Governance: Define policies, controls, and organizational structure',
              'Risk Management: Identify, assess, and mitigate risks',
              'Compliance: Meet regulatory and industry standard requirements',
              'Integrated approach: Break down silos between teams',
              'Continuous monitoring: Real-time visibility into GRC posture'
            ]
          },
          {
            h2: 'Why Traditional GRC Tools Fall Short',
            content: [
              'Manual data entry and evidence collection',
              'Siloed systems that dont talk to each other',
              'Point-in-time assessments instead of continuous monitoring',
              'Complex implementations taking 12-18 months',
              'High total cost of ownership'
            ]
          },
          {
            h2: 'The Quantifier Difference: AI-Native GRC',
            content: [
              'AI-powered automation reduces manual effort by 80%',
              'Unified platform for all frameworks and standards',
              'Deploy in weeks, not months or years',
              'Continuous compliance with real-time monitoring',
              'Built-in integrations with 100+ tools'
            ]
          },
          {
            h2: 'Multi-Framework Compliance',
            content: [
              'ISO 27001 - Information Security Management',
              'SOC 2 - Trust Services Criteria',
              'GDPR - Data Privacy Regulation',
              'NIS2 - EU Cybersecurity Directive',
              'DORA - Digital Operational Resilience',
              'NIST - Cybersecurity Framework',
              'PCI DSS - Payment Card Security'
            ]
          }
        ],
        faqs: [
          { question: 'What is GRC?', answer: 'GRC stands for Governance, Risk, and Compliance. It is an integrated approach to managing organizational governance, enterprise risk management, and regulatory compliance.' },
          { question: 'Why do I need a GRC platform?', answer: 'A GRC platform provides centralized visibility, automates manual processes, reduces compliance costs, and ensures consistent risk management across the organization.' },
          { question: 'What frameworks does Quantifier support?', answer: 'Quantifier supports ISO 27001, SOC 2, GDPR, NIS2, DORA, NIST, PCI DSS, ISO 9001, and many more with cross-framework mapping.' },
          { question: 'How is Quantifier different from Vanta or Drata?', answer: 'Quantifier is built AI-native from the ground up, supports more frameworks including ESG and environmental compliance, and provides deeper automation capabilities.' },
          { question: 'Can I manage multiple compliance programs?', answer: 'Yes, Quantifier supports multi-framework compliance with intelligent cross-mapping to eliminate duplicate work and streamline audits.' },
          { question: 'What integrations are available?', answer: 'Quantifier integrates with 100+ tools including AWS, Azure, GCP, GitHub, Jira, Slack, Okta, Google Workspace, and many more.' }
        ],
        internalLinks: [
          { text: 'All Frameworks', href: '/frameworks' },
          { text: 'SOC 2 Automation', href: '/frameworks/soc' },
          { text: 'ISO 27001', href: '/frameworks/iso-27001' },
          { text: 'Pricing', href: '/plans' }
        ]
      },
      pl: {
        title: 'Natywna Platforma GRC z AI - Ujednolicone Zarządzanie, Ryzyko i Zgodność | Quantifier',
        description: 'Nowoczesna platforma GRC z automatyzacją AI. Zarządzaj governance, ryzykiem i zgodnością w wielu standardach.',
        h1: 'Natywna Platforma GRC z AI',
        subtitle: 'Ujednolicone zarządzanie governance, ryzykiem i zgodnością.',
        sections: [
          {
            h2: 'Czym jest Platforma GRC?',
            content: [
              'Governance: Definiowanie polityk, kontroli i struktury organizacyjnej',
              'Zarządzanie Ryzykiem: Identyfikacja, ocena i mitygacja ryzyk',
              'Zgodność: Spełnianie wymogów regulacyjnych i standardów branżowych'
            ]
          }
        ],
        faqs: [
          { question: 'Czym jest GRC?', answer: 'GRC oznacza Governance, Risk i Compliance. Jest to zintegrowane podejście do zarządzania governance organizacyjnym, ryzykiem przedsiębiorstwa i zgodnością regulacyjną.' }
        ],
        internalLinks: [
          { text: 'Wszystkie Frameworki', href: '/frameworks' },
          { text: 'Cennik', href: '/plans' }
        ]
      },
      cs: {
        title: 'AI-nativní GRC platforma – Jednotné řízení, rizika a shoda | Quantifier',
        description: 'Moderní GRC platforma s automatizací AI. Spravujte governance, rizika a shodu napříč více standardy. Nahraďte tabulky inteligentními workflow.',
        h1: 'AI-nativní GRC platforma',
        subtitle: 'Jednotná správa governance, rizik a shody. Nahraďte tabulky inteligentní automatizací.',
        sections: [
          {
            h2: 'Co je GRC platforma?',
            content: [
              'Governance: Definování politik, kontrol a organizační struktury',
              'Řízení rizik: Identifikace, hodnocení a mitigace rizik',
              'Shoda: Plnění regulatorních a oborových požadavků',
              'Integrovaný přístup: Odstranění sil mezi týmy',
              'Kontinuální monitoring: Přehled o stavu GRC v reálném čase'
            ]
          },
          {
            h2: 'Proč tradiční GRC nástroje nestačí',
            content: [
              'Ruční zadávání dat a sběr důkazů',
              'Izolované systémy, které spolu nekomunikují',
              'Jednorázová posouzení místo kontinuálního monitoringu',
              'Složité implementace trvající 12–18 měsíců'
            ]
          },
          {
            h2: 'Rozdíl Quantifier: AI-nativní GRC',
            content: [
              'Automatizace poháněná AI snižuje ruční práci o 80 %',
              'Jednotná platforma pro všechny standardy a rámce',
              'Nasazení za týdny, ne za měsíce nebo roky',
              'Kontinuální shoda s monitoringem v reálném čase',
              'Vestavěné integrace se 100+ nástroji'
            ]
          },
          {
            h2: 'Shoda s více standardy',
            content: [
              'ISO 27001 – Řízení bezpečnosti informací',
              'SOC 2 – Kritéria Trust Services',
              'GDPR – Nařízení o ochraně osobních údajů',
              'NIS2 – Směrnice EU o kybernetické bezpečnosti',
              'DORA – Digitální provozní odolnost'
            ]
          }
        ],
        faqs: [
          { question: 'Co je GRC?', answer: 'GRC znamená Governance, Risk a Compliance. Jde o integrovaný přístup ke správě organizačního řízení, řízení rizik a regulatorní shody.' },
          { question: 'Proč potřebuji GRC platformu?', answer: 'GRC platforma poskytuje centralizovaný přehled, automatizuje manuální procesy, snižuje náklady na shodu a zajišťuje konzistentní řízení rizik.' },
          { question: 'Které standardy Quantifier podporuje?', answer: 'Quantifier podporuje ISO 27001, SOC 2, GDPR, NIS2, DORA, NIST, PCI DSS, ISO 9001 a mnoho dalších s křížovým mapováním.' },
          { question: 'Jak se Quantifier liší od Vanta nebo Drata?', answer: 'Quantifier je AI-nativní od základu, podporuje více standardů včetně ESG a environmentální shody a nabízí hlubší automatizační schopnosti.' }
        ],
        internalLinks: [
          { text: 'Všechny standardy', href: '/frameworks' },
          { text: 'SOC 2 automatizace', href: '/frameworks/soc' },
          { text: 'ISO 27001', href: '/frameworks/iso-27001' },
          { text: 'Ceník', href: '/plans' }
        ]
      }
    },
    'product-features': {
      en: {
        title: 'Product Features - AI-Powered Compliance Automation | Quantifier',
        description: 'Explore Quantifier features: AI compliance officer, risk assessments, document management, analytics dashboards, and 100+ integrations.',
        h1: 'Product Features',
        subtitle: 'Everything you need to automate compliance and manage risk in one platform.',
        sections: [
          {
            h2: 'AI Compliance Officer',
            content: [
              'Get instant answers to compliance questions',
              'AI-generated policies and procedures',
              'Automated gap analysis and recommendations',
              'Natural language interface for compliance queries'
            ]
          },
          {
            h2: 'Risk Assessment',
            content: [
              'Automated risk identification and scoring',
              'Treatment recommendations with AI insights',
              'Risk register with tracking and reporting',
              'Continuous risk monitoring'
            ]
          },
          {
            h2: 'Document Management',
            content: [
              'Centralized policy and evidence storage',
              'Version control and approval workflows',
              'Automatic evidence collection',
              'Audit-ready documentation'
            ]
          },
          {
            h2: 'Analytics Dashboards',
            content: [
              'Real-time compliance status',
              'Risk heat maps and trends',
              'Framework progress tracking',
              'Executive reporting'
            ]
          }
        ],
        internalLinks: [
          { text: 'AI Compliance Officer', href: '/product/compliance-officer' },
          { text: 'Risk Assessment', href: '/product/risk-assessment' },
          { text: 'Pricing', href: '/plans' }
        ]
      },
      pl: {
        title: 'Funkcje Produktu - Automatyzacja Zgodności z AI | Quantifier',
        description: 'Poznaj funkcje Quantifier: AI compliance officer, oceny ryzyka, zarządzanie dokumentami, pulpity analityczne.',
        h1: 'Funkcje Produktu',
        subtitle: 'Wszystko czego potrzebujesz do automatyzacji zgodności i zarządzania ryzykiem.',
        sections: [
          {
            h2: 'AI Compliance Officer',
            content: [
              'Natychmiastowe odpowiedzi na pytania dotyczące zgodności',
              'Polityki i procedury generowane przez AI'
            ]
          }
        ],
        internalLinks: [
          { text: 'Cennik', href: '/plans' }
        ]
      },
      cs: {
        title: 'Funkce produktu – Automatizace shody poháněná AI | Quantifier',
        description: 'Prozkoumejte funkce Quantifier: AI compliance officer, hodnocení rizik, správa dokumentů, analytické dashboardy a 100+ integrací.',
        h1: 'Funkce produktu',
        subtitle: 'Vše, co potřebujete pro automatizaci shody a řízení rizik v jedné platformě.',
        sections: [
          {
            h2: 'AI Compliance Officer',
            content: [
              'Okamžité odpovědi na otázky ohledně shody',
              'Politiky a postupy generované AI',
              'Automatizovaná analýza mezer a doporučení',
              'Rozhraní v přirozeném jazyce pro dotazy na shodu'
            ]
          },
          {
            h2: 'Hodnocení rizik',
            content: [
              'Automatizovaná identifikace a bodování rizik',
              'Doporučení pro ošetření s AI poznatky',
              'Registr rizik se sledováním a reportingem',
              'Kontinuální monitoring rizik'
            ]
          },
          {
            h2: 'Správa dokumentů',
            content: [
              'Centralizované úložiště politik a důkazů',
              'Kontrola verzí a schvalovací workflow',
              'Automatický sběr důkazů',
              'Dokumentace připravená pro audit'
            ]
          },
          {
            h2: 'Analytické dashboardy',
            content: [
              'Stav shody v reálném čase',
              'Teplotní mapy rizik a trendy',
              'Sledování pokroku standardů',
              'Výkonné reporty pro vedení'
            ]
          }
        ],
        internalLinks: [
          { text: 'AI Compliance Officer', href: '/product/ai-compliance-officer' },
          { text: 'Hodnocení rizik', href: '/product/risk-assessment' },
          { text: 'Ceník', href: '/plans' }
        ]
      }
    },
    'plans': {
      en: {
        title: 'Pricing Plans - Flexible Compliance Solutions | Quantifier',
        description: 'Choose the right plan for your compliance needs. From startups to enterprises, flexible pricing with no hidden fees. Start free trial today.',
        h1: 'Pricing Plans',
        subtitle: 'Choose the plan that fits your compliance needs. All plans include our AI-powered platform.',
        sections: [
          {
            h2: 'Plan Options',
            content: [
              'Starter - For small teams getting started with compliance',
              'Professional - For growing companies with multiple frameworks',
              'Enterprise - For large organizations with advanced needs',
              'All plans include unlimited users and frameworks'
            ]
          },
          {
            h2: 'What is Included',
            content: [
              'AI Compliance Officer for instant guidance',
              'Automated evidence collection',
              'Risk assessment and management',
              'Analytics dashboards and reporting',
              'Dedicated customer success manager'
            ]
          }
        ],
        faqs: [
          { question: 'Do you offer a free trial?', answer: 'Yes, we offer a 14-day free trial with full access to all features. No credit card required.' },
          { question: 'Can I change plans later?', answer: 'Yes, you can upgrade or downgrade your plan at any time. Changes take effect on your next billing cycle.' },
          { question: 'Is there a setup fee?', answer: 'No, there are no setup fees. You can start using Quantifier immediately after signing up.' }
        ],
        internalLinks: [
          { text: 'Contact Sales', href: '/contact' },
          { text: 'Product Features', href: '/product/features' },
          { text: 'SOC 2 Automation', href: '/frameworks/soc' }
        ]
      },
      pl: {
        title: 'Cennik - Elastyczne Rozwiązania Zgodności | Quantifier',
        description: 'Wybierz odpowiedni plan dla swoich potrzeb zgodności. Od startupów po przedsiębiorstwa.',
        h1: 'Cennik',
        subtitle: 'Wybierz plan dopasowany do Twoich potrzeb zgodności.',
        sections: [
          {
            h2: 'Opcje Planów',
            content: [
              'Starter - Dla małych zespołów rozpoczynających zgodność',
              'Professional - Dla rozwijających się firm z wieloma standardami',
              'Enterprise - Dla dużych organizacji z zaawansowanymi potrzebami'
            ]
          }
        ],
        internalLinks: [
          { text: 'Kontakt', href: '/contact' },
          { text: 'Funkcje Produktu', href: '/product/features' }
        ]
      },
      cs: {
        title: 'Ceník – Flexibilní řešení shody | Quantifier',
        description: 'Vyberte si správný plán pro vaše potřeby shody. Od startupů po velké podniky, flexibilní ceník bez skrytých poplatků.',
        h1: 'Ceník',
        subtitle: 'Vyberte si plán, který odpovídá vašim potřebám shody. Všechny plány zahrnují naši AI platformu.',
        sections: [
          {
            h2: 'Možnosti plánů',
            content: [
              'Starter – Pro malé týmy začínající se shodou',
              'Professional – Pro rostoucí společnosti s více standardy',
              'Enterprise – Pro velké organizace s pokročilými potřebami',
              'Všechny plány zahrnují neomezený počet uživatelů a standardů'
            ]
          },
          {
            h2: 'Co je zahrnuto',
            content: [
              'AI Compliance Officer pro okamžité poradenství',
              'Automatizovaný sběr důkazů',
              'Hodnocení a řízení rizik',
              'Analytické dashboardy a reporting',
              'Dedikovaný customer success manažer'
            ]
          }
        ],
        faqs: [
          { question: 'Nabízíte bezplatnou zkušební verzi?', answer: 'Ano, nabízíme 14denní zkušební verzi s plným přístupem ke všem funkcím. Není vyžadována kreditní karta.' },
          { question: 'Mohu později změnit plán?', answer: 'Ano, svůj plán můžete kdykoli upgradovat nebo downgradovat. Změny se projeví v dalším zúčtovacím období.' },
          { question: 'Účtuje se poplatek za nastavení?', answer: 'Ne, za nastavení se neúčtují žádné poplatky. Quantifier můžete začít používat ihned po registraci.' }
        ],
        internalLinks: [
          { text: 'Kontaktujte obchod', href: '/contact' },
          { text: 'Funkce produktu', href: '/product/features' },
          { text: 'SOC 2 automatizace', href: '/frameworks/soc' }
        ]
      }
    },
    'about': {
      en: {
        title: 'About Quantifier - Our Mission to Simplify Compliance | Quantifier',
        description: 'Learn about Quantifier mission to make compliance accessible for every organization. Meet our team and discover our story.',
        h1: 'About Quantifier',
        subtitle: 'Our mission is to make compliance simple, automated, and accessible for every organization.',
        sections: [
          {
            h2: 'Our Mission',
            content: [
              'Compliance should not be a burden that slows down innovation',
              'Every organization deserves access to enterprise-grade security practices',
              'AI can eliminate the manual drudgery of compliance work',
              'We are building the future of GRC'
            ]
          },
          {
            h2: 'Our Story',
            content: [
              'Founded by compliance and security professionals',
              'Built from frustration with legacy GRC tools',
              'AI-native approach from day one',
              'Serving hundreds of organizations worldwide'
            ]
          }
        ],
        internalLinks: [
          { text: 'Contact Us', href: '/contact' },
          { text: 'Careers', href: '/contact' },
          { text: 'Product', href: '/product/features' }
        ]
      },
      pl: {
        title: 'O Quantifier - Nasza Misja Upraszczania Zgodności | Quantifier',
        description: 'Poznaj misję Quantifier - uczynić zgodność dostępną dla każdej organizacji.',
        h1: 'O Quantifier',
        subtitle: 'Nasza misja to uczynić zgodność prostą, zautomatyzowaną i dostępną dla każdej organizacji.',
        sections: [
          {
            h2: 'Nasza Misja',
            content: [
              'Zgodność nie powinna być obciążeniem spowalniającym innowacje',
              'Każda organizacja zasługuje na dostęp do praktyk bezpieczeństwa klasy enterprise'
            ]
          }
        ],
        internalLinks: [
          { text: 'Kontakt', href: '/contact' },
          { text: 'Produkt', href: '/product/features' }
        ]
      },
      cs: {
        title: 'O Quantifier – Naše mise zjednodušit shodu | Quantifier',
        description: 'Poznejte misi Quantifier učinit shodu dostupnou pro každou organizaci. Seznamte se s naším týmem a příběhem.',
        h1: 'O Quantifier',
        subtitle: 'Naší misí je učinit shodu jednoduchou, automatizovanou a dostupnou pro každou organizaci.',
        sections: [
          {
            h2: 'Naše mise',
            content: [
              'Shoda by neměla být zátěží brzdící inovace',
              'Každá organizace si zaslouží přístup k bezpečnostním postupům enterprise úrovně',
              'AI dokáže eliminovat rutinní práci spojenou se shodou',
              'Budujeme budoucnost GRC'
            ]
          },
          {
            h2: 'Náš příběh',
            content: [
              'Založena odborníky na shodu a bezpečnost',
              'Vznikla z frustrace z klasických GRC nástrojů',
              'AI-nativní přístup od prvního dne',
              'Sloužíme stovkám organizací po celém světě'
            ]
          }
        ],
        internalLinks: [
          { text: 'Kontaktujte nás', href: '/contact' },
          { text: 'Kariéra', href: '/contact' },
          { text: 'Produkt', href: '/product/features' }
        ]
      }
    },
    'contact': {
      en: {
        title: 'Contact Quantifier - Get in Touch | Quantifier',
        description: 'Contact Quantifier for a demo, pricing information, or to learn how we can help with your compliance needs.',
        h1: 'Contact Us',
        subtitle: 'Get in touch with our team. We would love to hear from you and discuss how Quantifier can help.',
        sections: [
          {
            h2: 'Get in Touch',
            content: [
              'Schedule a personalized demo',
              'Get pricing information',
              'Ask questions about our platform',
              'Learn about partnership opportunities'
            ]
          }
        ],
        internalLinks: [
          { text: 'Pricing', href: '/plans' },
          { text: 'Product Features', href: '/product/features' },
          { text: 'About Us', href: '/about' }
        ]
      },
      pl: {
        title: 'Kontakt z Quantifier - Skontaktuj się | Quantifier',
        description: 'Skontaktuj się z Quantifier aby umówić demo lub dowiedzieć się więcej o naszej platformie.',
        h1: 'Kontakt',
        subtitle: 'Skontaktuj się z naszym zespołem. Chętnie porozmawiamy o tym jak Quantifier może pomóc.',
        sections: [
          {
            h2: 'Skontaktuj się',
            content: [
              'Umów spersonalizowane demo',
              'Uzyskaj informacje o cenach',
              'Zadaj pytania o naszą platformę'
            ]
          }
        ],
        internalLinks: [
          { text: 'Cennik', href: '/plans' },
          { text: 'O nas', href: '/about' }
        ]
      },
      cs: {
        title: 'Kontakt Quantifier – Ozvěte se nám | Quantifier',
        description: 'Kontaktujte Quantifier pro demo, informace o ceníku nebo zjistěte, jak vám můžeme pomoci s potřebami shody.',
        h1: 'Kontaktujte nás',
        subtitle: 'Ozvěte se našemu týmu. Rádi se s vámi pobavíme o tom, jak vám Quantifier může pomoci.',
        sections: [
          {
            h2: 'Ozvěte se',
            content: [
              'Naplánujte si personalizované demo',
              'Získejte informace o ceníku',
              'Zeptejte se na naši platformu',
              'Zjistěte více o partnerských příležitostech'
            ]
          }
        ],
        internalLinks: [
          { text: 'Ceník', href: '/plans' },
          { text: 'Funkce produktu', href: '/product/features' },
          { text: 'O nás', href: '/about' }
        ]
      }
    },
    'partners': {
      en: {
        title: 'Partner with Quantifier - Grow Your Business | Quantifier',
        description: 'Join the Quantifier partner program. Help your clients achieve compliance faster while growing your business.',
        h1: 'Partner with Quantifier',
        subtitle: 'Join our partner program and help organizations achieve compliance faster.',
        sections: [
          {
            h2: 'Partnership Benefits',
            content: [
              'Revenue sharing and referral commissions',
              'Partner training and certification',
              'Co-marketing opportunities',
              'Dedicated partner support',
              'Early access to new features'
            ]
          },
          {
            h2: 'Partner Types',
            content: [
              'Consulting Partners - Compliance consultants and advisors',
              'Technology Partners - Integrate with Quantifier',
              'Reseller Partners - Sell Quantifier to your clients',
              'Referral Partners - Earn commissions on referrals'
            ]
          }
        ],
        internalLinks: [
          { text: 'Contact Us', href: '/contact' },
          { text: 'About Quantifier', href: '/about' }
        ]
      },
      pl: {
        title: 'Zostań Partnerem Quantifier - Rozwijaj Swój Biznes | Quantifier',
        description: 'Dołącz do programu partnerskiego Quantifier. Pomagaj klientom osiągać zgodność szybciej.',
        h1: 'Zostań Partnerem Quantifier',
        subtitle: 'Dołącz do naszego programu partnerskiego.',
        sections: [
          {
            h2: 'Korzyści dla Partnerów',
            content: [
              'Podział przychodów i prowizje za polecenia',
              'Szkolenia i certyfikacja partnerów',
              'Możliwości wspólnego marketingu'
            ]
          }
        ],
        internalLinks: [
          { text: 'Kontakt', href: '/contact' },
          { text: 'O Quantifier', href: '/about' }
        ]
      },
      cs: {
        title: 'Partnerství s Quantifier – Rozvíjejte svůj byznys | Quantifier',
        description: 'Připojte se k partnerskému programu Quantifier. Pomozte svým klientům dosáhnout shody rychleji a zároveň rozvíjejte svůj byznys.',
        h1: 'Partnerství s Quantifier',
        subtitle: 'Připojte se k našemu partnerskému programu a pomozte organizacím dosáhnout shody rychleji.',
        sections: [
          {
            h2: 'Výhody partnerství',
            content: [
              'Sdílení příjmů a provize za doporučení',
              'Školení a certifikace partnerů',
              'Příležitosti pro společný marketing',
              'Dedikovaná partnerská podpora',
              'Přednostní přístup k novým funkcím'
            ]
          },
          {
            h2: 'Typy partnerů',
            content: [
              'Konzultační partneři – Konzultanti a poradci v oblasti shody',
              'Technologičtí partneři – Integrace s Quantifier',
              'Prodejní partneři – Prodávejte Quantifier svým klientům',
              'Doporučující partneři – Získejte provize za doporučení'
            ]
          }
        ],
        internalLinks: [
          { text: 'Kontaktujte nás', href: '/contact' },
          { text: 'O Quantifier', href: '/about' }
        ]
      }
    },
    'frameworks': {
      en: {
        title: 'Compliance Frameworks - ISO 27001, SOC 2, NIS II, GDPR & More | Quantifier',
        description: 'Comprehensive support for key regulatory standards: NIS II, ISO 27001, SOC 2, GDPR, NIST and more. Automation, monitoring and reporting in one platform.',
        h1: 'Compliance Frameworks',
        subtitle: 'Comprehensive support for key regulatory standards. Automation, monitoring and reporting in one platform.',
        sections: [
          {
            h2: 'Most Popular Frameworks',
            content: [
              'NIS II - EU Cybersecurity Directive for essential and important entities',
              'ISO 27001 - Information Security Management System standard',
              'SOC 2 - Service Organization Controls for trust and security',
              'GDPR - General Data Protection Regulation for EU data privacy'
            ]
          },
          {
            h2: 'Cybersecurity Standards',
            content: [
              'NIS II - Network and Information Security Directive',
              'SOC 1 & SOC 2 - Trust Services Criteria'
            ]
          },
          {
            h2: 'Information Security',
            content: [
              'ISO 27001 - Information Security Management System',
              'ISO 9001 - Quality Management System'
            ]
          },
          {
            h2: 'Data Protection',
            content: [
              'GDPR - General Data Protection Regulation',
              'HIPAA - Health Insurance Portability and Accountability Act',
              'CCPA - California Consumer Privacy Act'
            ]
          },
          {
            h2: 'ESG & Environmental',
            content: [
              'ESG Reporting - Environmental, Social and Governance',
              'ISO 14001 - Environmental Management',
              'Carbon Footprint & GHG Protocol',
              'LCA - Life Cycle Assessment'
            ]
          }
        ],
        internalLinks: [
          { text: 'NIS II', href: '/frameworks/nis-ii' },
          { text: 'ISO 27001', href: '/frameworks/iso-27001' },
          { text: 'SOC 2', href: '/frameworks/soc' },
          { text: 'GDPR', href: '/frameworks/gdpr' },
          { text: 'DORA', href: '/frameworks/dora' },
          { text: 'GRC Platform', href: '/grc-platform' }
        ]
      },
      pl: {
        title: 'Standardy Compliance - ISO 27001, SOC 2, NIS II, GDPR i Więcej | Quantifier',
        description: 'Kompleksowe wsparcie dla kluczowych standardów regulacyjnych: NIS II, ISO 27001, SOC 2, GDPR, NIST i wiele innych. Automatyzacja, monitoring i raportowanie.',
        h1: 'Standardy Compliance',
        subtitle: 'Kompleksowe wsparcie dla kluczowych standardów regulacyjnych. Automatyzacja, monitoring i raportowanie w jednej platformie.',
        sections: [
          {
            h2: 'Najpopularniejsze Standardy',
            content: [
              'NIS II - Dyrektywa UE o cyberbezpieczeństwie',
              'ISO 27001 - System Zarządzania Bezpieczeństwem Informacji',
              'SOC 2 - Kontrole organizacji usługowych',
              'GDPR/RODO - Rozporządzenie o ochronie danych osobowych'
            ]
          },
          {
            h2: 'Cyberbezpieczeństwo',
            content: [
              'NIS II - Dyrektywa o bezpieczeństwie sieci i informacji',
              'SOC 1 i SOC 2 - Kontrole organizacji usługowych'
            ]
          },
          {
            h2: 'Bezpieczeństwo Informacji',
            content: [
              'ISO 27001 - System Zarządzania Bezpieczeństwem Informacji',
              'ISO 9001 - System Zarządzania Jakością'
            ]
          },
          {
            h2: 'Ochrona Danych',
            content: [
              'GDPR/RODO - Rozporządzenie o ochronie danych osobowych',
              'HIPAA - Ustawa o przenośności i odpowiedzialności ubezpieczeń zdrowotnych',
              'CCPA - Kalifornijska ustawa o ochronie prywatności konsumentów'
            ]
          }
        ],
        internalLinks: [
          { text: 'NIS II', href: '/frameworks/nis-ii' },
          { text: 'ISO 27001', href: '/frameworks/iso-27001' },
          { text: 'SOC 2', href: '/frameworks/soc' },
          { text: 'GDPR', href: '/frameworks/gdpr' },
          { text: 'DORA', href: '/frameworks/dora' },
          { text: 'Platforma GRC', href: '/grc-platform' }
        ]
      },
      cs: {
        title: 'Standardy shody - ISO 27001, SOC 2, NIS II, GDPR a další | Quantifier',
        description: 'Komplexní podpora klíčových regulačních standardů: NIS II, ISO 27001, SOC 2, GDPR a další. Automatizace, monitoring a reporting v jedné platformě.',
        h1: 'Standardy shody',
        subtitle: 'Komplexní podpora klíčových regulačních standardů. Automatizace, monitoring a reporting v jedné platformě.',
        sections: [
          { h2: 'Nejpopulárnější standardy', content: ['NIS II - Směrnice EU o kybernetické bezpečnosti', 'ISO 27001 - Systém řízení bezpečnosti informací', 'SOC 2 - Kontroly servisních organizací', 'GDPR - Obecné nařízení o ochraně osobních údajů'] },
          { h2: 'Kybernetická bezpečnost', content: ['NIS II - Směrnice o bezpečnosti sítí a informací', 'SOC 1 a SOC 2 - Kontroly servisních organizací'] },
          { h2: 'Ochrana dat', content: ['GDPR - Obecné nařízení o ochraně osobních údajů', 'HIPAA - Zákon o přenositelnosti zdravotního pojištění', 'CCPA - Kalifornský zákon o ochraně soukromí spotřebitelů'] }
        ],
        internalLinks: [
          { text: 'NIS II', href: '/frameworks/nis-ii' },
          { text: 'ISO 27001', href: '/frameworks/iso-27001' },
          { text: 'SOC 2', href: '/frameworks/soc' },
          { text: 'GDPR', href: '/frameworks/gdpr' },
          { text: 'DORA', href: '/frameworks/dora' },
          { text: 'GRC Platforma', href: '/grc-platform' }
        ]
      }
    },
    'dora': {
      en: {
        title: 'DORA Compliance Platform - Digital Operational Resilience | Quantifier',
        description: 'Automate DORA compliance for financial entities. ICT risk management, incident reporting, and resilience testing in one platform.',
        h1: 'DORA Compliance Platform',
        sections: [
          { h2: 'What is DORA?', content: ['Digital Operational Resilience Act for EU financial sector', 'ICT risk management framework', 'Incident reporting requirements', 'Third-party risk management'] },
          { h2: 'How Quantifier Helps', content: ['Automated ICT risk assessments', 'Incident classification and reporting', 'Digital resilience testing', 'Third-party monitoring'] }
        ],
        internalLinks: [{ text: 'NIS2', href: '/frameworks/nis-ii' }, { text: 'ISO 27001', href: '/frameworks/iso-27001' }, { text: 'Plans', href: '/plans' }]
      },
      pl: {
        title: 'Platforma Zgodności DORA - Cyfrowa Odporność Operacyjna | Quantifier',
        description: 'Automatyzuj zgodność z DORA dla podmiotów finansowych. Zarządzanie ryzykiem ICT, raportowanie incydentów i testy odporności.',
        h1: 'Platforma Zgodności DORA',
        sections: [
          { h2: 'Czym jest DORA?', content: ['Akt o cyfrowej odporności operacyjnej dla sektora finansowego UE', 'Framework zarządzania ryzykiem ICT', 'Wymogi raportowania incydentów'] },
          { h2: 'Jak Quantifier pomaga', content: ['Automatyczne oceny ryzyka ICT', 'Klasyfikacja i raportowanie incydentów', 'Testowanie cyfrowej odporności'] }
        ],
        internalLinks: [{ text: 'NIS2', href: '/frameworks/nis-ii' }, { text: 'Cennik', href: '/plans' }]
      },
      cs: {
        title: 'Platforma pro shodu s DORA - Digitální operační odolnost | Quantifier',
        description: 'Automatizujte shodu s DORA pro finanční subjekty. Řízení ICT rizik, hlášení incidentů a testování odolnosti.',
        h1: 'Platforma pro shodu s DORA',
        sections: [
          { h2: 'Co je DORA?', content: ['Akt o digitální operační odolnosti pro finanční sektor EU', 'Rámec řízení ICT rizik', 'Požadavky na hlášení incidentů'] }
        ],
        internalLinks: [{ text: 'NIS2', href: '/frameworks/nis-ii' }, { text: 'Ceník', href: '/plans' }]
      }
    },
    'iso-9001': {
      en: {
        title: 'ISO 9001 Quality Management System | Quantifier',
        description: 'Implement ISO 9001 QMS with AI automation. Streamline quality processes, document control, and continuous improvement.',
        h1: 'ISO 9001 Quality Management',
        sections: [{ h2: 'Quality Management with AI', content: ['Automated document control', 'Process monitoring and improvement', 'Internal audit management', 'Non-conformance tracking'] }],
        internalLinks: [{ text: 'ISO 27001', href: '/frameworks/iso-27001' }, { text: 'Plans', href: '/plans' }]
      },
      pl: {
        title: 'ISO 9001 System Zarządzania Jakością | Quantifier',
        description: 'Wdróż ISO 9001 z automatyzacją AI. Usprawnij procesy jakościowe i kontrolę dokumentów.',
        h1: 'ISO 9001 Zarządzanie Jakością',
        sections: [{ h2: 'Zarządzanie jakością z AI', content: ['Automatyczna kontrola dokumentów', 'Monitorowanie i doskonalenie procesów', 'Zarządzanie audytami wewnętrznymi'] }],
        internalLinks: [{ text: 'ISO 27001', href: '/frameworks/iso-27001' }, { text: 'Cennik', href: '/plans' }]
      },
      cs: {
        title: 'ISO 9001 Systém řízení kvality | Quantifier',
        description: 'Implementujte ISO 9001 s automatizací AI. Zefektivněte procesy kvality a kontrolu dokumentů.',
        h1: 'ISO 9001 Řízení kvality',
        sections: [{ h2: 'Řízení kvality s AI', content: ['Automatická kontrola dokumentů', 'Monitorování a zlepšování procesů'] }],
        internalLinks: [{ text: 'ISO 27001', href: '/frameworks/iso-27001' }, { text: 'Ceník', href: '/plans' }]
      }
    },
    'hipaa': {
      en: {
        title: 'HIPAA Compliance Software - Healthcare Data Protection | Quantifier',
        description: 'Automate HIPAA compliance with AI. Protect PHI, manage risk assessments, and maintain audit readiness for healthcare organizations.',
        h1: 'HIPAA Compliance Software',
        sections: [{ h2: 'HIPAA Requirements', content: ['Privacy Rule compliance', 'Security Rule implementation', 'Breach notification procedures', 'Business Associate Agreement management'] }],
        internalLinks: [{ text: 'GDPR', href: '/frameworks/gdpr' }, { text: 'Plans', href: '/plans' }]
      },
      pl: {
        title: 'Oprogramowanie do Zgodności HIPAA - Ochrona Danych Medycznych | Quantifier',
        description: 'Automatyzuj zgodność z HIPAA. Chroń dane medyczne i zarządzaj ocenami ryzyka dla organizacji opieki zdrowotnej.',
        h1: 'Oprogramowanie do Zgodności HIPAA',
        sections: [{ h2: 'Wymagania HIPAA', content: ['Zgodność z Privacy Rule', 'Wdrożenie Security Rule', 'Procedury powiadomień o naruszeniach'] }],
        internalLinks: [{ text: 'GDPR', href: '/frameworks/gdpr' }, { text: 'Cennik', href: '/plans' }]
      },
      cs: {
        title: 'Software pro shodu s HIPAA - Ochrana zdravotních dat | Quantifier',
        description: 'Automatizujte shodu s HIPAA. Chraňte zdravotní data a řiďte hodnocení rizik.',
        h1: 'Software pro shodu s HIPAA',
        sections: [{ h2: 'Požadavky HIPAA', content: ['Shoda s pravidlem ochrany soukromí', 'Implementace bezpečnostního pravidla'] }],
        internalLinks: [{ text: 'GDPR', href: '/frameworks/gdpr' }, { text: 'Ceník', href: '/plans' }]
      }
    },
    'ccpa': {
      en: {
        title: 'CCPA Compliance Software - California Privacy Protection | Quantifier',
        description: 'Automate CCPA compliance. Manage consumer rights requests, data mapping, and privacy notices for California residents.',
        h1: 'CCPA Compliance Software',
        sections: [{ h2: 'CCPA Requirements', content: ['Consumer right to know', 'Right to delete personal information', 'Right to opt-out of sale', 'Non-discrimination requirements'] }],
        internalLinks: [{ text: 'GDPR', href: '/frameworks/gdpr' }, { text: 'Plans', href: '/plans' }]
      },
      pl: {
        title: 'Oprogramowanie do Zgodności CCPA - Ochrona Prywatności Kalifornii | Quantifier',
        description: 'Automatyzuj zgodność z CCPA. Zarządzaj żądaniami konsumentów i mapowaniem danych.',
        h1: 'Oprogramowanie do Zgodności CCPA',
        sections: [{ h2: 'Wymagania CCPA', content: ['Prawo konsumenta do informacji', 'Prawo do usunięcia danych osobowych', 'Prawo do rezygnacji ze sprzedaży danych'] }],
        internalLinks: [{ text: 'GDPR', href: '/frameworks/gdpr' }, { text: 'Cennik', href: '/plans' }]
      },
      cs: {
        title: 'Software pro shodu s CCPA - Ochrana soukromí v Kalifornii | Quantifier',
        description: 'Automatizujte shodu s CCPA. Spravujte žádosti spotřebitelů a mapování dat.',
        h1: 'Software pro shodu s CCPA',
        sections: [{ h2: 'Požadavky CCPA', content: ['Právo spotřebitele na informace', 'Právo na smazání osobních údajů'] }],
        internalLinks: [{ text: 'GDPR', href: '/frameworks/gdpr' }, { text: 'Ceník', href: '/plans' }]
      }
    },
    'esg': {
      en: {
        title: 'ESG Reporting Platform - CSRD, GRI, CBAM Compliance | Quantifier',
        description: 'Comprehensive ESG reporting with AI. Automate CSRD compliance, GRI standards, and CBAM reporting in one platform.',
        h1: 'ESG Reporting Platform',
        sections: [{ h2: 'ESG Frameworks', content: ['CSRD - Corporate Sustainability Reporting Directive', 'GRI - Global Reporting Initiative', 'CBAM - Carbon Border Adjustment Mechanism', 'Double materiality analysis'] }],
        internalLinks: [{ text: 'Environmental', href: '/frameworks/environmental' }, { text: 'Frameworks', href: '/frameworks' }, { text: 'Plans', href: '/plans' }]
      },
      pl: {
        title: 'Platforma Raportowania ESG - Zgodność z CSRD, GRI, CBAM | Quantifier',
        description: 'Kompleksowe raportowanie ESG z AI. Automatyzuj zgodność z CSRD, standardami GRI i raportowaniem CBAM.',
        h1: 'Platforma Raportowania ESG',
        sections: [{ h2: 'Frameworki ESG', content: ['CSRD - Dyrektywa o sprawozdawczości zrównoważonego rozwoju', 'GRI - Global Reporting Initiative', 'CBAM - Mechanizm dostosowywania cen na granicach', 'Analiza podwójnej istotności'] }],
        internalLinks: [{ text: 'Środowisko', href: '/frameworks/environmental' }, { text: 'Cennik', href: '/plans' }]
      },
      cs: {
        title: 'Platforma pro ESG reporting - Shoda s CSRD, GRI, CBAM | Quantifier',
        description: 'Komplexní ESG reporting s AI. Automatizujte shodu s CSRD, standardy GRI a reportingem CBAM.',
        h1: 'Platforma pro ESG reporting',
        sections: [{ h2: 'ESG rámce', content: ['CSRD - Směrnice o podávání zpráv o udržitelnosti', 'GRI - Globální iniciativa pro reporting', 'CBAM - Mechanismus uhlíkového vyrovnání na hranicích'] }],
        internalLinks: [{ text: 'Životní prostředí', href: '/frameworks/environmental' }, { text: 'Ceník', href: '/plans' }]
      }
    },
    'environmental': {
      en: {
        title: 'Environmental Management - ISO 14001, LCA, Carbon Footprint | Quantifier',
        description: 'Manage environmental compliance with AI. ISO 14001, Life Cycle Assessment, Carbon Footprint tracking and decarbonisation planning.',
        h1: 'Environmental Management',
        sections: [{ h2: 'Environmental Standards', content: ['ISO 14001 - Environmental Management System', 'LCA - Life Cycle Assessment', 'Carbon Footprint & GHG Protocol', 'Decarbonisation planning'] }],
        internalLinks: [{ text: 'ESG', href: '/frameworks/esg' }, { text: 'Frameworks', href: '/frameworks' }, { text: 'Plans', href: '/plans' }]
      },
      pl: {
        title: 'Zarządzanie Środowiskowe - ISO 14001, LCA, Ślad Węglowy | Quantifier',
        description: 'Zarządzaj zgodnością środowiskową z AI. ISO 14001, ocena cyklu życia, ślad węglowy i planowanie dekarbonizacji.',
        h1: 'Zarządzanie Środowiskowe',
        sections: [{ h2: 'Standardy Środowiskowe', content: ['ISO 14001 - System Zarządzania Środowiskowego', 'LCA - Ocena Cyklu Życia', 'Ślad Węglowy i Protokół GHG', 'Planowanie dekarbonizacji'] }],
        internalLinks: [{ text: 'ESG', href: '/frameworks/esg' }, { text: 'Cennik', href: '/plans' }]
      },
      cs: {
        title: 'Environmentální management - ISO 14001, LCA, Uhlíková stopa | Quantifier',
        description: 'Řiďte environmentální shodu s AI. ISO 14001, hodnocení životního cyklu, sledování uhlíkové stopy.',
        h1: 'Environmentální management',
        sections: [{ h2: 'Environmentální standardy', content: ['ISO 14001 - Systém environmentálního managementu', 'LCA - Hodnocení životního cyklu', 'Uhlíková stopa a GHG protokol'] }],
        internalLinks: [{ text: 'ESG', href: '/frameworks/esg' }, { text: 'Ceník', href: '/plans' }]
      }
    },
    'governance': {
      en: {
        title: 'Corporate Governance Solutions - Policies & Whistleblowing | Quantifier',
        description: 'Manage corporate governance with AI. Policy management, whistleblowing channels, and legal compliance in one platform.',
        h1: 'Corporate Governance Solutions',
        sections: [{ h2: 'Governance Features', content: ['Policy lifecycle management', 'Whistleblowing channel', 'Legal compliance tracking', 'Board reporting and oversight'] }],
        internalLinks: [{ text: 'Frameworks', href: '/frameworks' }, { text: 'Plans', href: '/plans' }]
      },
      pl: {
        title: 'Rozwiązania Ładu Korporacyjnego - Polityki i Whistleblowing | Quantifier',
        description: 'Zarządzaj ładem korporacyjnym z AI. Zarządzanie politykami, kanały sygnalistów i zgodność prawna.',
        h1: 'Rozwiązania Ładu Korporacyjnego',
        sections: [{ h2: 'Funkcje Governance', content: ['Zarządzanie cyklem życia polityk', 'Kanał sygnalistów', 'Śledzenie zgodności prawnej'] }],
        internalLinks: [{ text: 'Standardy', href: '/frameworks' }, { text: 'Cennik', href: '/plans' }]
      },
      cs: {
        title: 'Řešení korporátního řízení - Politiky a Whistleblowing | Quantifier',
        description: 'Spravujte korporátní řízení s AI. Řízení politik, kanály pro oznamování a právní shoda.',
        h1: 'Řešení korporátního řízení',
        sections: [{ h2: 'Funkce Governance', content: ['Řízení životního cyklu politik', 'Kanál pro oznamovatele', 'Sledování právní shody'] }],
        internalLinks: [{ text: 'Standardy', href: '/frameworks' }, { text: 'Ceník', href: '/plans' }]
      }
    },
    'product-level': {
      en: {
        title: 'Product Level Analysis - Digital Product Passport | Quantifier',
        description: 'Digital Product Passport and product-level sustainability analysis. Track environmental impact across your product lifecycle.',
        h1: 'Product Level Analysis',
        sections: [{ h2: 'Digital Product Passport', content: ['Product lifecycle tracking', 'Environmental impact assessment', 'Supply chain transparency', 'Regulatory compliance for product sustainability'] }],
        internalLinks: [{ text: 'ESG', href: '/frameworks/esg' }, { text: 'Environmental', href: '/frameworks/environmental' }, { text: 'Plans', href: '/plans' }]
      },
      pl: {
        title: 'Analiza Poziomu Produktu - Cyfrowy Paszport Produktu | Quantifier',
        description: 'Cyfrowy paszport produktu i analiza zrównoważonego rozwoju na poziomie produktu.',
        h1: 'Analiza Poziomu Produktu',
        sections: [{ h2: 'Cyfrowy Paszport Produktu', content: ['Śledzenie cyklu życia produktu', 'Ocena wpływu na środowisko', 'Przejrzystość łańcucha dostaw'] }],
        internalLinks: [{ text: 'ESG', href: '/frameworks/esg' }, { text: 'Cennik', href: '/plans' }]
      },
      cs: {
        title: 'Analýza na úrovni produktu - Digitální pas produktu | Quantifier',
        description: 'Digitální pas produktu a analýza udržitelnosti na úrovni produktu.',
        h1: 'Analýza na úrovni produktu',
        sections: [{ h2: 'Digitální pas produktu', content: ['Sledování životního cyklu produktu', 'Hodnocení environmentálního dopadu', 'Transparentnost dodavatelského řetězce'] }],
        internalLinks: [{ text: 'ESG', href: '/frameworks/esg' }, { text: 'Ceník', href: '/plans' }]
      }
    },
    'by-roles': {
      en: {
        title: 'Compliance Solutions by Role - Managers, Contributors, Auditors | Quantifier',
        description: 'Tailored compliance tools for every role. Dashboards for managers, task interfaces for contributors, and audit trails for auditors.',
        h1: 'Solutions by Role',
        sections: [{ h2: 'Tailored for Every Role', content: ['Managers - Executive dashboards and oversight', 'Contributors - Streamlined data entry and task management', 'Auditors - Comprehensive audit trails and verification'] }],
        internalLinks: [{ text: 'Product Features', href: '/product/features' }, { text: 'Plans', href: '/plans' }]
      },
      pl: {
        title: 'Rozwiązania Zgodności wg Roli - Menedżerowie, Współpracownicy, Audytorzy | Quantifier',
        description: 'Narzędzia zgodności dostosowane do każdej roli. Dashboardy dla menedżerów, interfejsy zadań dla współpracowników.',
        h1: 'Rozwiązania według Roli',
        sections: [{ h2: 'Dostosowane do każdej roli', content: ['Menedżerowie - Dashboardy wykonawcze i nadzór', 'Współpracownicy - Uproszczone wprowadzanie danych i zarządzanie zadaniami', 'Audytorzy - Kompletne ścieżki audytu i weryfikacja'] }],
        internalLinks: [{ text: 'Funkcje produktu', href: '/product/features' }, { text: 'Cennik', href: '/plans' }]
      },
      cs: {
        title: 'Řešení shody podle role - Manažeři, Přispěvatelé, Auditoři | Quantifier',
        description: 'Nástroje shody přizpůsobené každé roli. Dashboardy pro manažery, rozhraní úkolů pro přispěvatele.',
        h1: 'Řešení podle role',
        sections: [{ h2: 'Přizpůsobeno každé roli', content: ['Manažeři - Výkonné dashboardy a dohled', 'Přispěvatelé - Zjednodušené zadávání dat', 'Auditoři - Kompletní auditní stopy'] }],
        internalLinks: [{ text: 'Funkce produktu', href: '/product/features' }, { text: 'Ceník', href: '/plans' }]
      }
    },
    'blog': {
      en: {
        title: 'Compliance & Security Blog | ISO 27001, SOC 2, NIS2 Guides | Quantifier',
        description: 'Expert guides on compliance automation. Learn about ISO 27001, SOC 2, NIS2, GDPR and how AI simplifies audit preparation.',
        h1: 'Compliance & Security Blog',
        sections: [{ h2: 'Latest Articles', content: ['Expert insights on compliance automation', 'Framework implementation guides', 'Industry best practices', 'AI and GRC trends'] }],
        internalLinks: [{ text: 'Frameworks', href: '/frameworks' }, { text: 'Product', href: '/product/features' }, { text: 'Plans', href: '/plans' }]
      },
      pl: {
        title: 'Blog o Zgodności i Bezpieczeństwie | ISO 27001, SOC 2, NIS2 | Quantifier',
        description: 'Eksperckie przewodniki po automatyzacji zgodności. ISO 27001, SOC 2, NIS2, GDPR i jak AI upraszcza przygotowanie do audytu.',
        h1: 'Blog o Zgodności i Bezpieczeństwie',
        sections: [{ h2: 'Najnowsze Artykuły', content: ['Eksperckie analizy automatyzacji zgodności', 'Przewodniki wdrażania standardów', 'Najlepsze praktyki branżowe'] }],
        internalLinks: [{ text: 'Standardy', href: '/frameworks' }, { text: 'Cennik', href: '/plans' }]
      },
      cs: {
        title: 'Blog o shodě a bezpečnosti | ISO 27001, SOC 2, NIS2 | Quantifier',
        description: 'Odborné průvodce automatizací shody. ISO 27001, SOC 2, NIS2, GDPR a jak AI zjednodušuje přípravu na audit.',
        h1: 'Blog o shodě a bezpečnosti',
        sections: [{ h2: 'Nejnovější články', content: ['Odborné analýzy automatizace shody', 'Průvodce implementací standardů'] }],
        internalLinks: [{ text: 'Standardy', href: '/frameworks' }, { text: 'Ceník', href: '/plans' }]
      }
    },
    'success-stories': {
      en: {
        title: 'Customer Success Stories - Compliance Case Studies | Quantifier',
        description: 'See how organizations achieve compliance faster with Quantifier. Real case studies with measurable results.',
        h1: 'Customer Success Stories',
        sections: [{ h2: 'Real Results', content: ['80% reduction in compliance effort', '10x faster certification', '100% audit success rate', 'Trusted by 250+ companies'] }],
        internalLinks: [{ text: 'Plans', href: '/plans' }, { text: 'Contact', href: '/contact' }]
      },
      pl: {
        title: 'Historie Sukcesu Klientów - Studia Przypadków | Quantifier',
        description: 'Zobacz jak organizacje osiągają zgodność szybciej z Quantifier. Prawdziwe studia przypadków z mierzalnymi wynikami.',
        h1: 'Historie Sukcesu Klientów',
        sections: [{ h2: 'Realne Wyniki', content: ['80% redukcja nakładu pracy na zgodność', '10x szybsza certyfikacja', '100% skuteczność audytów'] }],
        internalLinks: [{ text: 'Cennik', href: '/plans' }, { text: 'Kontakt', href: '/contact' }]
      },
      cs: {
        title: 'Příběhy úspěchu zákazníků - Případové studie | Quantifier',
        description: 'Podívejte se, jak organizace dosahují shody rychleji s Quantifier. Skutečné případové studie.',
        h1: 'Příběhy úspěchu zákazníků',
        sections: [{ h2: 'Skutečné výsledky', content: ['80% snížení úsilí o shodu', '10x rychlejší certifikace'] }],
        internalLinks: [{ text: 'Ceník', href: '/plans' }, { text: 'Kontakt', href: '/contact' }]
      }
    },
    'legal-privacy': {
      en: {
        title: 'Privacy Policy | Quantifier.ai',
        description: 'Quantifier.ai Privacy Policy. Learn how we collect, use, and protect your personal data.',
        h1: 'Privacy Policy',
        sections: [{ h2: 'Data Protection', content: ['How we collect and process personal data', 'Your rights under GDPR', 'Data retention policies', 'Contact our Data Protection Officer'] }],
        internalLinks: [{ text: 'Terms of Service', href: '/legal/terms' }, { text: 'Cookies Policy', href: '/legal/cookies' }]
      },
      pl: {
        title: 'Polityka Prywatności | Quantifier.ai',
        description: 'Polityka prywatności Quantifier.ai. Dowiedz się jak zbieramy, wykorzystujemy i chronimy Twoje dane osobowe.',
        h1: 'Polityka Prywatności',
        sections: [{ h2: 'Ochrona Danych', content: ['Jak zbieramy i przetwarzamy dane osobowe', 'Twoje prawa na mocy RODO', 'Polityka przechowywania danych'] }],
        internalLinks: [{ text: 'Regulamin', href: '/legal/terms' }, { text: 'Polityka Cookies', href: '/legal/cookies' }]
      },
      cs: {
        title: 'Zásady ochrany osobních údajů | Quantifier.ai',
        description: 'Zásady ochrany osobních údajů Quantifier.ai. Zjistěte, jak shromažďujeme a chráníme vaše osobní údaje.',
        h1: 'Zásady ochrany osobních údajů',
        sections: [{ h2: 'Ochrana dat', content: ['Jak shromažďujeme a zpracováváme osobní údaje', 'Vaše práva podle GDPR'] }],
        internalLinks: [{ text: 'Podmínky služby', href: '/legal/terms' }, { text: 'Zásady cookies', href: '/legal/cookies' }]
      }
    },
    'legal-terms': {
      en: {
        title: 'Terms of Service | Quantifier.ai',
        description: 'Quantifier.ai Terms of Service. Read our terms and conditions for using the platform.',
        h1: 'Terms of Service',
        sections: [{ h2: 'Terms and Conditions', content: ['Acceptance of terms', 'Service description', 'User responsibilities', 'Limitation of liability'] }],
        internalLinks: [{ text: 'Privacy Policy', href: '/legal/privacy' }, { text: 'Cookies Policy', href: '/legal/cookies' }]
      },
      pl: {
        title: 'Regulamin | Quantifier.ai',
        description: 'Regulamin Quantifier.ai. Przeczytaj warunki korzystania z platformy.',
        h1: 'Regulamin',
        sections: [{ h2: 'Warunki Korzystania', content: ['Akceptacja regulaminu', 'Opis usługi', 'Obowiązki użytkownika', 'Ograniczenie odpowiedzialności'] }],
        internalLinks: [{ text: 'Polityka Prywatności', href: '/legal/privacy' }, { text: 'Polityka Cookies', href: '/legal/cookies' }]
      },
      cs: {
        title: 'Podmínky služby | Quantifier.ai',
        description: 'Podmínky služby Quantifier.ai. Přečtěte si podmínky používání platformy.',
        h1: 'Podmínky služby',
        sections: [{ h2: 'Podmínky používání', content: ['Přijetí podmínek', 'Popis služby', 'Odpovědnosti uživatele'] }],
        internalLinks: [{ text: 'Zásady ochrany soukromí', href: '/legal/privacy' }, { text: 'Zásady cookies', href: '/legal/cookies' }]
      }
    },
    'legal-cookies': {
      en: {
        title: 'Cookies Policy | Quantifier.ai',
        description: 'Quantifier.ai Cookies Policy. Learn about cookies we use and how to manage your preferences.',
        h1: 'Cookies Policy',
        sections: [{ h2: 'Cookie Usage', content: ['Essential cookies for site functionality', 'Analytics cookies for improving our service', 'Marketing cookies and your consent', 'How to manage cookie preferences'] }],
        internalLinks: [{ text: 'Privacy Policy', href: '/legal/privacy' }, { text: 'Terms of Service', href: '/legal/terms' }]
      },
      pl: {
        title: 'Polityka Cookies | Quantifier.ai',
        description: 'Polityka cookies Quantifier.ai. Dowiedz się o plikach cookie i jak zarządzać swoimi preferencjami.',
        h1: 'Polityka Cookies',
        sections: [{ h2: 'Wykorzystanie Cookies', content: ['Niezbędne pliki cookie', 'Analityczne pliki cookie', 'Marketingowe pliki cookie', 'Zarządzanie preferencjami'] }],
        internalLinks: [{ text: 'Polityka Prywatności', href: '/legal/privacy' }, { text: 'Regulamin', href: '/legal/terms' }]
      },
      cs: {
        title: 'Zásady cookies | Quantifier.ai',
        description: 'Zásady cookies Quantifier.ai. Zjistěte o cookies a jak spravovat své preference.',
        h1: 'Zásady cookies',
        sections: [{ h2: 'Používání cookies', content: ['Nezbytné cookies', 'Analytické cookies', 'Správa preferencí'] }],
        internalLinks: [{ text: 'Zásady ochrany soukromí', href: '/legal/privacy' }, { text: 'Podmínky služby', href: '/legal/terms' }]
      }
    },
    'product-overview': {
      en: {
        title: 'Platform Overview - AI-Powered GRC Software | Quantifier',
        description: 'Discover Quantifier\'s AI-native GRC platform. Unified compliance, risk management and governance in one solution. Automate workflows and reduce manual effort.',
        h1: 'Platform Overview',
        subtitle: 'One AI-native platform for all your governance, risk and compliance needs.',
        sections: [
          { h2: 'Unified GRC Platform', content: ['Single pane of glass for compliance, risk and governance', 'Cross-framework mapping eliminates duplicate work', 'AI-driven insights and recommendations', 'Real-time compliance status across all standards'] },
          { h2: 'Key Capabilities', content: ['Automated evidence collection from 100+ integrations', 'Intelligent task assignment and tracking', 'Document management with version control', 'Risk assessment with heat maps and scoring', 'Analytics dashboards with executive reporting'] },
          { h2: 'Built for Scale', content: ['From startup to enterprise - scales with your needs', 'Multi-framework support: ISO 27001, SOC 2, GDPR, NIS2 and more', 'Role-based access for teams of any size'] }
        ],
        internalLinks: [
          { text: 'Product Features', href: '/product/features' },
          { text: 'AI Compliance Officer', href: '/product/ai-compliance-officer' },
          { text: 'Pricing Plans', href: '/plans' },
          { text: 'Contact Us', href: '/contact' }
        ]
      },
      pl: {
        title: 'Przegląd Platformy - Oprogramowanie GRC oparte na AI | Quantifier',
        description: 'Poznaj platformę GRC Quantifier opartą na AI. Zunifikowane zarządzanie zgodnością, ryzykiem i governance w jednym rozwiązaniu.',
        h1: 'Przegląd Platformy',
        subtitle: 'Jedna platforma AI do zarządzania zgodnością, ryzykiem i governance.',
        sections: [
          { h2: 'Zunifikowana Platforma GRC', content: ['Jeden widok na zgodność, ryzyko i governance', 'Mapowanie między standardami eliminuje podwójną pracę', 'Wnioski i rekomendacje napędzane przez AI', 'Status zgodności w czasie rzeczywistym'] },
          { h2: 'Kluczowe Możliwości', content: ['Automatyczne zbieranie dowodów z ponad 100 integracji', 'Inteligentne przydzielanie i śledzenie zadań', 'Zarządzanie dokumentami z kontrolą wersji', 'Ocena ryzyka z mapami ciepła i scoringiem'] },
          { h2: 'Zbudowana dla Skali', content: ['Od startupu po korporację - skaluje się z potrzebami', 'Obsługa wielu standardów: ISO 27001, SOC 2, GDPR, NIS2', 'Dostęp oparty na rolach dla zespołów każdej wielkości'] }
        ],
        internalLinks: [
          { text: 'Funkcje Produktu', href: '/product/features' },
          { text: 'AI Compliance Officer', href: '/product/ai-compliance-officer' },
          { text: 'Cennik', href: '/plans' },
          { text: 'Kontakt', href: '/contact' }
        ]
      },
      cs: {
        title: 'Přehled Platformy - GRC software poháněný AI | Quantifier',
        description: 'Objevte GRC platformu Quantifier poháněnou AI. Správa shody, rizik a governance v jednom řešení. Automatizujte procesy.',
        h1: 'Přehled Platformy',
        subtitle: 'Jedna AI platforma pro veškerou správu shody, rizik a governance.',
        sections: [
          { h2: 'Sjednocená GRC Platforma', content: ['Jeden pohled na shodu, rizika a governance', 'Mapování mezi standardy eliminuje duplicitní práci', 'AI doporučení a poznatky', 'Stav shody v reálném čase'] },
          { h2: 'Klíčové Schopnosti', content: ['Automatizovaný sběr důkazů ze 100+ integrací', 'Inteligentní přidělování a sledování úkolů', 'Správa dokumentů s kontrolou verzí'] },
          { h2: 'Navrženo pro Růst', content: ['Od startupu po enterprise - škáluje se s vašimi potřebami', 'Podpora více standardů: ISO 27001, SOC 2, GDPR, NIS2'] }
        ],
        internalLinks: [
          { text: 'Funkce Produktu', href: '/product/features' },
          { text: 'AI Compliance Officer', href: '/product/ai-compliance-officer' },
          { text: 'Ceník', href: '/plans' }
        ]
      }
    },
    'compliance-officer': {
      en: {
        title: 'AI Compliance Officer - Autonomous Compliance Agent | Quantifier',
        description: 'Meet your AI Compliance Officer. An autonomous agent that monitors regulations, manages tasks, collects evidence and ensures continuous compliance automatically.',
        h1: 'AI Compliance Officer',
        subtitle: 'Your autonomous compliance agent that works 24/7 to keep your organization compliant.',
        sections: [
          { h2: 'What is the AI Compliance Officer?', content: ['Autonomous AI agent that manages your entire compliance program', 'Monitors regulatory changes and adapts your controls automatically', 'Assigns tasks, collects evidence and follows up with team members', 'Provides real-time compliance status and risk alerts'] },
          { h2: 'How It Works', content: ['Connects to your existing tools and systems via API', 'Continuously maps controls to regulatory requirements', 'Automatically generates policies, procedures and documentation', 'Identifies gaps and recommends remediation steps'] },
          { h2: 'Key Benefits', content: ['Reduce compliance workload by up to 80%', 'Eliminate manual follow-ups and chasing employees', 'Achieve certifications 10x faster', 'Maintain continuous compliance between audits'] }
        ],
        internalLinks: [
          { text: 'Platform Overview', href: '/product/overview' },
          { text: 'Task & Data Management', href: '/product/task-data-management' },
          { text: 'Risk Assessment', href: '/product/risk-assessment' },
          { text: 'Contact Us', href: '/contact' }
        ]
      },
      pl: {
        title: 'AI Compliance Officer - Autonomiczny Agent Zgodności | Quantifier',
        description: 'Poznaj AI Compliance Officer. Autonomiczny agent monitorujący regulacje, zarządzający zadaniami i zapewniający ciągłą zgodność automatycznie.',
        h1: 'AI Compliance Officer',
        subtitle: 'Twój autonomiczny agent zgodności pracujący 24/7.',
        sections: [
          { h2: 'Czym jest AI Compliance Officer?', content: ['Autonomiczny agent AI zarządzający całym programem zgodności', 'Monitoruje zmiany regulacyjne i automatycznie dostosowuje kontrole', 'Przydziela zadania, zbiera dowody i kontaktuje się z zespołem', 'Zapewnia status zgodności w czasie rzeczywistym'] },
          { h2: 'Jak Działa', content: ['Łączy się z istniejącymi narzędziami przez API', 'Ciągle mapuje kontrole do wymagań regulacyjnych', 'Automatycznie generuje polityki i dokumentację', 'Identyfikuje luki i rekomenduje naprawy'] },
          { h2: 'Kluczowe Korzyści', content: ['Redukcja nakładu pracy nad zgodnością o 80%', 'Eliminacja ręcznego śledzenia i poganiania pracowników', 'Certyfikacja 10x szybciej', 'Ciągła zgodność między audytami'] }
        ],
        internalLinks: [
          { text: 'Przegląd Platformy', href: '/product/overview' },
          { text: 'Zarządzanie Zadaniami', href: '/product/task-data-management' },
          { text: 'Ocena Ryzyka', href: '/product/risk-assessment' },
          { text: 'Kontakt', href: '/contact' }
        ]
      },
      cs: {
        title: 'AI Compliance Officer - Autonomní Agent Shody | Quantifier',
        description: 'Seznamte se s AI Compliance Officer. Autonomní agent monitorující regulace, spravující úkoly a zajišťující průběžnou shodu automaticky.',
        h1: 'AI Compliance Officer',
        subtitle: 'Váš autonomní agent shody pracující 24/7.',
        sections: [
          { h2: 'Co je AI Compliance Officer?', content: ['Autonomní AI agent spravující celý program shody', 'Monitoruje regulační změny a automaticky přizpůsobuje kontroly', 'Přiděluje úkoly, sbírá důkazy a komunikuje s týmem'] },
          { h2: 'Jak Funguje', content: ['Připojuje se k existujícím nástrojům přes API', 'Průběžně mapuje kontroly na regulační požadavky', 'Automaticky generuje politiky a dokumentaci'] },
          { h2: 'Klíčové Výhody', content: ['Snížení pracnosti shody až o 80%', 'Certifikace 10x rychleji', 'Průběžná shoda mezi audity'] }
        ],
        internalLinks: [
          { text: 'Přehled Platformy', href: '/product/overview' },
          { text: 'Správa Úkolů', href: '/product/task-data-management' },
          { text: 'Hodnocení Rizik', href: '/product/risk-assessment' }
        ]
      }
    },
    'task-data-management': {
      en: {
        title: 'Task & Data Management - Compliance Workflow Automation | Quantifier',
        description: 'Streamline compliance with intelligent task assignment, automated data collection and centralized evidence management. Keep your team aligned and audit-ready.',
        h1: 'Task & Data Management',
        subtitle: 'Intelligent task assignment and automated data collection for seamless compliance.',
        sections: [
          { h2: 'Smart Task Management', content: ['AI-powered task assignment based on roles and expertise', 'Automated reminders and follow-ups', 'Progress tracking with deadline management', 'Cross-framework task deduplication'] },
          { h2: 'Automated Data Collection', content: ['Connect 100+ data sources for automatic evidence gathering', 'Structured data intake forms for manual inputs', 'Version-controlled evidence repository', 'Automated validation and quality checks'] },
          { h2: 'Team Collaboration', content: ['Role-based workflows for managers, contributors and auditors', 'Comments and approval chains', 'Real-time status visibility across teams'] }
        ],
        internalLinks: [
          { text: 'AI Compliance Officer', href: '/product/ai-compliance-officer' },
          { text: 'Documents Management', href: '/product/documents-management' },
          { text: 'Analytics Dashboards', href: '/product/analytics-dashboards' },
          { text: 'Product Features', href: '/product/features' }
        ]
      },
      pl: {
        title: 'Zarządzanie Zadaniami i Danymi - Automatyzacja Compliance | Quantifier',
        description: 'Usprawnij zgodność dzięki inteligentnemu przydzielaniu zadań, automatycznemu zbieraniu danych i scentralizowanemu zarządzaniu dowodami.',
        h1: 'Zarządzanie Zadaniami i Danymi',
        subtitle: 'Inteligentne przydzielanie zadań i automatyczne zbieranie danych.',
        sections: [
          { h2: 'Inteligentne Zarządzanie Zadaniami', content: ['Przydzielanie zadań przez AI na podstawie ról i kompetencji', 'Automatyczne przypomnienia i follow-upy', 'Śledzenie postępów z zarządzaniem terminami', 'Deduplikacja zadań między standardami'] },
          { h2: 'Automatyczne Zbieranie Danych', content: ['Ponad 100 źródeł danych do automatycznego zbierania dowodów', 'Formularze do wprowadzania danych ręcznych', 'Repozytorium dowodów z kontrolą wersji'] },
          { h2: 'Współpraca Zespołowa', content: ['Przepływy pracy oparte na rolach', 'Komentarze i łańcuchy zatwierdzania', 'Widoczność statusu w czasie rzeczywistym'] }
        ],
        internalLinks: [
          { text: 'AI Compliance Officer', href: '/product/ai-compliance-officer' },
          { text: 'Zarządzanie Dokumentami', href: '/product/documents-management' },
          { text: 'Pulpity Analityczne', href: '/product/analytics-dashboards' }
        ]
      },
      cs: {
        title: 'Správa Úkolů a Dat - Automatizace Compliance | Quantifier',
        description: 'Zefektivněte shodu díky inteligentnímu přidělování úkolů, automatickému sběru dat a centralizované správě důkazů.',
        h1: 'Správa Úkolů a Dat',
        subtitle: 'Inteligentní přidělování úkolů a automatizovaný sběr dat.',
        sections: [
          { h2: 'Chytrá Správa Úkolů', content: ['AI přidělování úkolů na základě rolí a odbornosti', 'Automatická upomínka a sledování', 'Sledování pokroku se správou termínů'] },
          { h2: 'Automatizovaný Sběr Dat', content: ['100+ zdrojů dat pro automatický sběr důkazů', 'Strukturované formuláře pro manuální vstupy', 'Repozitář důkazů s kontrolou verzí'] }
        ],
        internalLinks: [
          { text: 'AI Compliance Officer', href: '/product/ai-compliance-officer' },
          { text: 'Správa Dokumentů', href: '/product/documents-management' },
          { text: 'Analytické Dashboardy', href: '/product/analytics-dashboards' }
        ]
      }
    },
    'analytics-dashboards': {
      en: {
        title: 'Analytics Dashboards - Compliance Reporting & Insights | Quantifier',
        description: 'Real-time compliance dashboards with executive reporting, risk heat maps and trend analysis. Make data-driven decisions with AI-powered analytics.',
        h1: 'Analytics Dashboards',
        subtitle: 'Real-time visibility into your compliance posture with AI-powered analytics.',
        sections: [
          { h2: 'Executive Dashboards', content: ['Bird\'s-eye view of compliance across all frameworks', 'Risk heat maps with drill-down capabilities', 'Trend analysis and progress tracking', 'Automated executive reports and board presentations'] },
          { h2: 'Operational Analytics', content: ['Task completion rates and team performance', 'Evidence collection progress by framework', 'Gap analysis with prioritized recommendations', 'Audit readiness scoring'] },
          { h2: 'Custom Reporting', content: ['Build custom reports with drag-and-drop builder', 'Schedule automated report delivery', 'Export to PDF, Excel and presentation formats'] }
        ],
        internalLinks: [
          { text: 'Platform Overview', href: '/product/overview' },
          { text: 'Risk Assessment', href: '/product/risk-assessment' },
          { text: 'Product Features', href: '/product/features' },
          { text: 'For Managers', href: '/by-roles/managers' }
        ]
      },
      pl: {
        title: 'Pulpity Analityczne - Raportowanie Compliance | Quantifier',
        description: 'Pulpity zgodności w czasie rzeczywistym z raportowaniem dla zarządu, mapami ryzyka i analizą trendów. Podejmuj decyzje oparte na danych.',
        h1: 'Pulpity Analityczne',
        subtitle: 'Widoczność statusu zgodności w czasie rzeczywistym z analityką AI.',
        sections: [
          { h2: 'Pulpity dla Zarządu', content: ['Widok z lotu ptaka na zgodność we wszystkich standardach', 'Mapy ciepła ryzyka z możliwością drążenia', 'Analiza trendów i śledzenie postępów', 'Automatyczne raporty dla zarządu'] },
          { h2: 'Analityka Operacyjna', content: ['Wskaźniki realizacji zadań i wydajności zespołu', 'Postęp zbierania dowodów według standardu', 'Analiza luk z priorytetyzowanymi rekomendacjami'] },
          { h2: 'Raportowanie Niestandardowe', content: ['Budowanie raportów metodą drag-and-drop', 'Harmonogram automatycznej wysyłki raportów', 'Eksport do PDF, Excel i prezentacji'] }
        ],
        internalLinks: [
          { text: 'Przegląd Platformy', href: '/product/overview' },
          { text: 'Ocena Ryzyka', href: '/product/risk-assessment' },
          { text: 'Dla Zarządu', href: '/by-roles/managers' }
        ]
      },
      cs: {
        title: 'Analytické Dashboardy - Reporting Shody | Quantifier',
        description: 'Dashboardy shody v reálném čase s reporty pro vedení, teplotní mapy rizik a analýza trendů. Rozhodujte se na základě dat.',
        h1: 'Analytické Dashboardy',
        subtitle: 'Viditelnost stavu shody v reálném čase s AI analytikou.',
        sections: [
          { h2: 'Dashboardy pro Vedení', content: ['Pohled z výšky na shodu napříč všemi standardy', 'Teplotní mapy rizik s možností detailu', 'Analýza trendů a sledování pokroku'] },
          { h2: 'Operační Analytika', content: ['Míra dokončení úkolů a výkonnost týmu', 'Pokrok sběru důkazů podle standardu', 'Analýza mezer s prioritizovanými doporučeními'] }
        ],
        internalLinks: [
          { text: 'Přehled Platformy', href: '/product/overview' },
          { text: 'Hodnocení Rizik', href: '/product/risk-assessment' },
          { text: 'Pro Manažery', href: '/by-roles/managers' }
        ]
      }
    },
    'documents-management': {
      en: {
        title: 'Documents Management - Policy & Procedure Automation | Quantifier',
        description: 'Centralized document management for compliance policies, procedures and evidence. Automated version control, approval workflows and audit trails.',
        h1: 'Documents Management',
        subtitle: 'Centralized policy and procedure management with automated version control.',
        sections: [
          { h2: 'Policy Management', content: ['AI-generated policy templates aligned to frameworks', 'Automated version control with full audit trail', 'Approval workflows with digital signatures', 'Policy acknowledgment tracking for employees'] },
          { h2: 'Evidence Repository', content: ['Centralized storage for all compliance evidence', 'Automated tagging and categorization', 'Cross-framework evidence reuse', 'Secure access controls and encryption'] },
          { h2: 'Audit Preparation', content: ['One-click audit packages for external auditors', 'Complete document history and change logs', 'Gap analysis against document requirements'] }
        ],
        internalLinks: [
          { text: 'Task & Data Management', href: '/product/task-data-management' },
          { text: 'AI Compliance Officer', href: '/product/ai-compliance-officer' },
          { text: 'For Auditors', href: '/by-roles/auditor' },
          { text: 'Product Features', href: '/product/features' }
        ]
      },
      pl: {
        title: 'Zarządzanie Dokumentami - Automatyzacja Polityk | Quantifier',
        description: 'Scentralizowane zarządzanie dokumentami compliance: polityki, procedury i dowody. Automatyczna kontrola wersji i ścieżki audytowe.',
        h1: 'Zarządzanie Dokumentami',
        subtitle: 'Scentralizowane zarządzanie politykami i procedurami z automatyczną kontrolą wersji.',
        sections: [
          { h2: 'Zarządzanie Politykami', content: ['Szablony polityk generowane przez AI zgodne ze standardami', 'Automatyczna kontrola wersji z pełną ścieżką audytu', 'Przepływy zatwierdzania z podpisami cyfrowymi', 'Śledzenie potwierdzania polityk przez pracowników'] },
          { h2: 'Repozytorium Dowodów', content: ['Scentralizowane przechowywanie dowodów zgodności', 'Automatyczne tagowanie i kategoryzacja', 'Ponowne wykorzystanie dowodów między standardami'] },
          { h2: 'Przygotowanie do Audytu', content: ['Pakiety audytowe jednym kliknięciem', 'Pełna historia dokumentów i logi zmian'] }
        ],
        internalLinks: [
          { text: 'Zarządzanie Zadaniami', href: '/product/task-data-management' },
          { text: 'AI Compliance Officer', href: '/product/ai-compliance-officer' },
          { text: 'Dla Audytorów', href: '/by-roles/auditor' }
        ]
      },
      cs: {
        title: 'Správa Dokumentů - Automatizace Politik | Quantifier',
        description: 'Centralizovaná správa dokumentů pro compliance politiky, procedury a důkazy. Automatická kontrola verzí a auditní stopy.',
        h1: 'Správa Dokumentů',
        subtitle: 'Centralizovaná správa politik a procedur s automatickou kontrolou verzí.',
        sections: [
          { h2: 'Správa Politik', content: ['AI šablony politik sladěné se standardy', 'Automatická kontrola verzí s úplnou auditní stopou', 'Schvalovací procesy s digitálními podpisy'] },
          { h2: 'Repozitář Důkazů', content: ['Centralizované úložiště důkazů shody', 'Automatické značkování a kategorizace', 'Opětovné použití důkazů napříč standardy'] }
        ],
        internalLinks: [
          { text: 'Správa Úkolů', href: '/product/task-data-management' },
          { text: 'AI Compliance Officer', href: '/product/ai-compliance-officer' },
          { text: 'Pro Auditory', href: '/by-roles/auditor' }
        ]
      }
    },
    'api-integrations': {
      en: {
        title: 'API Integrations - Connect Your Compliance Stack | Quantifier',
        description: 'Connect Quantifier with 100+ tools and systems. REST API, webhooks and native integrations with AWS, Azure, GitHub, Jira, Slack and more.',
        h1: 'API Integrations',
        subtitle: 'Connect your entire tech stack for automated compliance data collection.',
        sections: [
          { h2: 'Native Integrations', content: ['Cloud providers: AWS, Azure, Google Cloud', 'Development: GitHub, GitLab, Bitbucket, Jira', 'Communication: Slack, Microsoft Teams', 'Identity: Okta, Azure AD, Google Workspace', 'HR: BambooHR, Workday'] },
          { h2: 'REST API & Webhooks', content: ['Full REST API for custom integrations', 'Webhook support for real-time data sync', 'Comprehensive API documentation', 'SDKs for popular programming languages'] },
          { h2: 'Data Security', content: ['OAuth 2.0 and API key authentication', 'End-to-end encryption for all data transfers', 'Granular permission controls per integration', 'Audit logs for all API activity'] }
        ],
        internalLinks: [
          { text: 'Platform Overview', href: '/product/overview' },
          { text: 'Task & Data Management', href: '/product/task-data-management' },
          { text: 'Product Features', href: '/product/features' },
          { text: 'Contact Us', href: '/contact' }
        ]
      },
      pl: {
        title: 'Integracje API - Połącz Swój Stack Compliance | Quantifier',
        description: 'Połącz Quantifier z ponad 100 narzędziami. REST API, webhooki i natywne integracje z AWS, Azure, GitHub, Jira, Slack i więcej.',
        h1: 'Integracje API',
        subtitle: 'Połącz cały swój stack technologiczny do automatycznego zbierania danych compliance.',
        sections: [
          { h2: 'Natywne Integracje', content: ['Chmura: AWS, Azure, Google Cloud', 'Rozwój: GitHub, GitLab, Bitbucket, Jira', 'Komunikacja: Slack, Microsoft Teams', 'Tożsamość: Okta, Azure AD, Google Workspace'] },
          { h2: 'REST API i Webhooki', content: ['Pełne REST API do niestandardowych integracji', 'Obsługa webhooków do synchronizacji w czasie rzeczywistym', 'Kompleksowa dokumentacja API'] },
          { h2: 'Bezpieczeństwo Danych', content: ['Uwierzytelnianie OAuth 2.0 i klucze API', 'Szyfrowanie end-to-end', 'Granularna kontrola uprawnień'] }
        ],
        internalLinks: [
          { text: 'Przegląd Platformy', href: '/product/overview' },
          { text: 'Zarządzanie Zadaniami', href: '/product/task-data-management' },
          { text: 'Funkcje Produktu', href: '/product/features' }
        ]
      },
      cs: {
        title: 'API Integrace - Propojte Svůj Compliance Stack | Quantifier',
        description: 'Propojte Quantifier se 100+ nástroji. REST API, webhooky a nativní integrace s AWS, Azure, GitHub, Jira, Slack a dalšími.',
        h1: 'API Integrace',
        subtitle: 'Propojte celý svůj technologický stack pro automatizovaný sběr dat.',
        sections: [
          { h2: 'Nativní Integrace', content: ['Cloud: AWS, Azure, Google Cloud', 'Vývoj: GitHub, GitLab, Bitbucket, Jira', 'Komunikace: Slack, Microsoft Teams'] },
          { h2: 'REST API a Webhooky', content: ['Kompletní REST API pro vlastní integrace', 'Podpora webhooků pro synchronizaci v reálném čase', 'Komplexní API dokumentace'] }
        ],
        internalLinks: [
          { text: 'Přehled Platformy', href: '/product/overview' },
          { text: 'Správa Úkolů', href: '/product/task-data-management' },
          { text: 'Funkce Produktu', href: '/product/features' }
        ]
      }
    },
    'value-chain': {
      en: {
        title: 'Value Chain Management - Supply Chain Compliance | Quantifier',
        description: 'Manage supplier compliance and value chain risks. Automated vendor assessments, due diligence workflows and supply chain monitoring for CSRD, ESG and more.',
        h1: 'Value Chain Management',
        subtitle: 'End-to-end supply chain compliance and vendor risk management.',
        sections: [
          { h2: 'Supplier Compliance', content: ['Automated vendor questionnaires and assessments', 'Risk scoring and tiering for suppliers', 'Continuous monitoring of supplier compliance status', 'Due diligence workflows with evidence collection'] },
          { h2: 'Value Chain Mapping', content: ['Visual mapping of your entire value chain', 'Identify and track Scope 3 emissions across suppliers', 'Supply chain risk heat maps', 'Regulatory requirement mapping to suppliers'] },
          { h2: 'Reporting & Disclosure', content: ['CSRD-ready supply chain disclosures', 'ESG reporting for value chain activities', 'Automated data aggregation from suppliers'] }
        ],
        internalLinks: [
          { text: 'ESG Reporting', href: '/frameworks/esg' },
          { text: 'Environmental Compliance', href: '/frameworks/environmental' },
          { text: 'Risk Assessment', href: '/product/risk-assessment' },
          { text: 'Platform Overview', href: '/product/overview' }
        ]
      },
      pl: {
        title: 'Zarządzanie Łańcuchem Wartości - Compliance Dostawców | Quantifier',
        description: 'Zarządzaj zgodnością dostawców i ryzykiem łańcucha wartości. Automatyczne oceny dostawców i monitorowanie dla CSRD, ESG i więcej.',
        h1: 'Zarządzanie Łańcuchem Wartości',
        subtitle: 'Kompleksowe zarządzanie zgodnością łańcucha dostaw i ryzykiem dostawców.',
        sections: [
          { h2: 'Zgodność Dostawców', content: ['Automatyczne ankiety i oceny dostawców', 'Scoring ryzyka i kategoryzacja dostawców', 'Ciągłe monitorowanie statusu zgodności dostawców', 'Przepływy due diligence ze zbieraniem dowodów'] },
          { h2: 'Mapowanie Łańcucha Wartości', content: ['Wizualne mapowanie całego łańcucha wartości', 'Identyfikacja i śledzenie emisji Scope 3', 'Mapy ciepła ryzyka w łańcuchu dostaw'] },
          { h2: 'Raportowanie i Ujawnienia', content: ['Ujawnienia łańcucha dostaw zgodne z CSRD', 'Raportowanie ESG dla działań w łańcuchu wartości'] }
        ],
        internalLinks: [
          { text: 'Raportowanie ESG', href: '/frameworks/esg' },
          { text: 'Zgodność Środowiskowa', href: '/frameworks/environmental' },
          { text: 'Ocena Ryzyka', href: '/product/risk-assessment' }
        ]
      },
      cs: {
        title: 'Správa Hodnotového Řetězce - Compliance Dodavatelů | Quantifier',
        description: 'Spravujte shodu dodavatelů a rizika hodnotového řetězce. Automatizované hodnocení dodavatelů a monitorování pro CSRD, ESG a další.',
        h1: 'Správa Hodnotového Řetězce',
        subtitle: 'Komplexní správa shody dodavatelského řetězce a rizik dodavatelů.',
        sections: [
          { h2: 'Shoda Dodavatelů', content: ['Automatizované dotazníky a hodnocení dodavatelů', 'Skórování rizik a kategorizace dodavatelů', 'Průběžné monitorování stavu shody dodavatelů'] },
          { h2: 'Mapování Hodnotového Řetězce', content: ['Vizuální mapování celého hodnotového řetězce', 'Identifikace a sledování emisí Scope 3', 'Teplotní mapy rizik dodavatelského řetězce'] }
        ],
        internalLinks: [
          { text: 'ESG Reporting', href: '/frameworks/esg' },
          { text: 'Environmentální Shoda', href: '/frameworks/environmental' },
          { text: 'Hodnocení Rizik', href: '/product/risk-assessment' }
        ]
      }
    },
    'risk-assessment': {
      en: {
        title: 'Risk Assessment - AI-Powered Risk Analysis | Quantifier',
        description: 'Identify, assess and mitigate compliance risks with AI-powered risk assessment. Heat maps, scoring matrices and automated treatment plans.',
        h1: 'Risk Assessment',
        subtitle: 'AI-powered risk identification, assessment and mitigation for comprehensive compliance.',
        sections: [
          { h2: 'Risk Identification', content: ['AI-driven risk discovery across your organization', 'Automated threat and vulnerability scanning', 'Regulatory risk mapping for all supported frameworks', 'Third-party and supply chain risk detection'] },
          { h2: 'Risk Analysis & Scoring', content: ['Quantitative and qualitative risk scoring', 'Risk heat maps with impact and likelihood matrices', 'Inherent vs residual risk comparison', 'Historical trend analysis and benchmarking'] },
          { h2: 'Risk Treatment', content: ['AI-recommended treatment plans', 'Risk acceptance, mitigation, transfer or avoidance workflows', 'Control effectiveness monitoring', 'Automated risk register with real-time updates'] }
        ],
        internalLinks: [
          { text: 'Analytics Dashboards', href: '/product/analytics-dashboards' },
          { text: 'AI Compliance Officer', href: '/product/ai-compliance-officer' },
          { text: 'ISO 27001', href: '/frameworks/iso-27001' },
          { text: 'Platform Overview', href: '/product/overview' }
        ]
      },
      pl: {
        title: 'Ocena Ryzyka - Analiza Ryzyka oparta na AI | Quantifier',
        description: 'Identyfikuj, oceniaj i mityguj ryzyka compliance z AI. Mapy ciepła, macierze scoringowe i automatyczne plany postępowania z ryzykiem.',
        h1: 'Ocena Ryzyka',
        subtitle: 'Identyfikacja, ocena i mitygacja ryzyka napędzana przez AI.',
        sections: [
          { h2: 'Identyfikacja Ryzyka', content: ['Odkrywanie ryzyk przez AI w całej organizacji', 'Automatyczne skanowanie zagrożeń i podatności', 'Mapowanie ryzyk regulacyjnych dla wszystkich standardów', 'Wykrywanie ryzyk dostawców i łańcucha dostaw'] },
          { h2: 'Analiza i Scoring Ryzyka', content: ['Ilościowy i jakościowy scoring ryzyka', 'Mapy ciepła z macierzami wpływu i prawdopodobieństwa', 'Porównanie ryzyka inherentnego vs rezydualnego'] },
          { h2: 'Postępowanie z Ryzykiem', content: ['Plany postępowania rekomendowane przez AI', 'Przepływy akceptacji, mitygacji, transferu lub unikania ryzyka', 'Monitorowanie skuteczności kontroli'] }
        ],
        internalLinks: [
          { text: 'Pulpity Analityczne', href: '/product/analytics-dashboards' },
          { text: 'AI Compliance Officer', href: '/product/ai-compliance-officer' },
          { text: 'ISO 27001', href: '/frameworks/iso-27001' }
        ]
      },
      cs: {
        title: 'Hodnocení Rizik - Analýza Rizik poháněná AI | Quantifier',
        description: 'Identifikujte, hodnoťte a zmírňujte compliance rizika s AI. Teplotní mapy, skórovací matice a automatizované plány ošetření.',
        h1: 'Hodnocení Rizik',
        subtitle: 'AI identifikace, hodnocení a zmírňování rizik pro komplexní shodu.',
        sections: [
          { h2: 'Identifikace Rizik', content: ['AI detekce rizik napříč organizací', 'Automatizované skenování hrozeb a zranitelností', 'Mapování regulačních rizik pro všechny standardy'] },
          { h2: 'Analýza a Skórování Rizik', content: ['Kvantitativní a kvalitativní skórování rizik', 'Teplotní mapy s maticemi dopadu a pravděpodobnosti', 'Srovnání inherentního vs reziduálního rizika'] },
          { h2: 'Ošetření Rizik', content: ['AI doporučené plány ošetření', 'Monitorování účinnosti kontrol', 'Automatizovaný registr rizik s aktualizacemi v reálném čase'] }
        ],
        internalLinks: [
          { text: 'Analytické Dashboardy', href: '/product/analytics-dashboards' },
          { text: 'AI Compliance Officer', href: '/product/ai-compliance-officer' },
          { text: 'ISO 27001', href: '/frameworks/iso-27001' }
        ]
      }
    },
    'by-roles-managers': {
      en: {
        title: 'For Managers & Leadership - Executive Compliance Tools | Quantifier',
        description: 'Compliance management tools for CFOs, CISOs and executives. Real-time dashboards, board-ready reports and strategic risk oversight in one platform.',
        h1: 'For Managers & Leadership',
        subtitle: 'Strategic compliance oversight for executives, CFOs, CISOs and department heads.',
        sections: [
          { h2: 'Executive Visibility', content: ['Real-time compliance dashboards across all frameworks', 'Board-ready reports generated automatically', 'Risk heat maps with strategic recommendations', 'Budget and resource allocation insights'] },
          { h2: 'Strategic Oversight', content: ['Cross-framework compliance status at a glance', 'Audit readiness scoring with trend analysis', 'Regulatory change impact assessment', 'Team performance and workload metrics'] },
          { h2: 'Decision Support', content: ['AI-powered risk prioritization', 'Cost-benefit analysis for compliance investments', 'Benchmark against industry standards'] }
        ],
        internalLinks: [
          { text: 'For Contributors', href: '/by-roles/contributors' },
          { text: 'For Auditors', href: '/by-roles/auditor' },
          { text: 'Analytics Dashboards', href: '/product/analytics-dashboards' },
          { text: 'Platform Overview', href: '/product/overview' }
        ]
      },
      pl: {
        title: 'Dla Zarządu i Liderów - Narzędzia Compliance dla Kadry | Quantifier',
        description: 'Narzędzia compliance dla CFO, CISO i zarządu. Dashboardy w czasie rzeczywistym, raporty dla zarządu i strategiczny nadzór nad ryzykiem.',
        h1: 'Dla Zarządu i Liderów',
        subtitle: 'Strategiczny nadzór nad zgodnością dla zarządu, CFO, CISO i dyrektorów.',
        sections: [
          { h2: 'Widoczność dla Zarządu', content: ['Dashboardy zgodności w czasie rzeczywistym', 'Automatycznie generowane raporty dla rady nadzorczej', 'Mapy ciepła ryzyka ze strategicznymi rekomendacjami', 'Wgląd w budżet i alokację zasobów'] },
          { h2: 'Nadzór Strategiczny', content: ['Status zgodności między standardami na jeden rzut oka', 'Scoring gotowości do audytu z analizą trendów', 'Ocena wpływu zmian regulacyjnych'] },
          { h2: 'Wsparcie Decyzji', content: ['Priorytetyzacja ryzyk przez AI', 'Analiza kosztów i korzyści inwestycji w compliance', 'Benchmarking względem standardów branżowych'] }
        ],
        internalLinks: [
          { text: 'Dla Zespołów', href: '/by-roles/contributors' },
          { text: 'Dla Audytorów', href: '/by-roles/auditor' },
          { text: 'Pulpity Analityczne', href: '/product/analytics-dashboards' }
        ]
      },
      cs: {
        title: 'Pro Manažery a Vedení - Compliance Nástroje pro Vedení | Quantifier',
        description: 'Nástroje compliance pro CFO, CISO a vedení. Dashboardy v reálném čase, reporty pro představenstvo a strategický dohled nad riziky.',
        h1: 'Pro Manažery a Vedení',
        subtitle: 'Strategický dohled nad shodou pro vedení, CFO, CISO a ředitele.',
        sections: [
          { h2: 'Viditelnost pro Vedení', content: ['Dashboardy shody v reálném čase', 'Automaticky generované reporty pro představenstvo', 'Teplotní mapy rizik se strategickými doporučeními'] },
          { h2: 'Strategický Dohled', content: ['Stav shody napříč standardy na první pohled', 'Skóre připravenosti na audit s analýzou trendů', 'Posouzení dopadu regulačních změn'] }
        ],
        internalLinks: [
          { text: 'Pro Přispěvatele', href: '/by-roles/contributors' },
          { text: 'Pro Auditory', href: '/by-roles/auditor' },
          { text: 'Analytické Dashboardy', href: '/product/analytics-dashboards' }
        ]
      }
    },
    'by-roles-contributors': {
      en: {
        title: 'For Contributors & Teams - Operational Compliance Tools | Quantifier',
        description: 'Streamlined compliance tools for operational teams. Intuitive task management, guided data collection and simple evidence submission workflows.',
        h1: 'For Contributors & Operational Teams',
        subtitle: 'Simple, intuitive tools that make compliance tasks effortless for your teams.',
        sections: [
          { h2: 'Simplified Task Management', content: ['Clear task assignments with step-by-step guidance', 'Automated reminders so nothing falls through the cracks', 'Intuitive interface - no compliance expertise needed', 'Mobile-friendly for on-the-go task completion'] },
          { h2: 'Guided Data Collection', content: ['Pre-built forms tailored to each framework requirement', 'Smart validation to ensure data quality', 'Drag-and-drop evidence upload', 'Progress tracking with completion indicators'] },
          { h2: 'Team Collaboration', content: ['Comments and questions on tasks', 'Seamless handoffs between team members', 'Real-time status updates for managers'] }
        ],
        internalLinks: [
          { text: 'For Managers', href: '/by-roles/managers' },
          { text: 'For Auditors', href: '/by-roles/auditor' },
          { text: 'Task & Data Management', href: '/product/task-data-management' },
          { text: 'Platform Overview', href: '/product/overview' }
        ]
      },
      pl: {
        title: 'Dla Zespołów Operacyjnych - Narzędzia Compliance | Quantifier',
        description: 'Uproszczone narzędzia compliance dla zespołów operacyjnych. Intuicyjne zarządzanie zadaniami, zbieranie danych i przesyłanie dowodów.',
        h1: 'Dla Zespołów Operacyjnych',
        subtitle: 'Proste, intuicyjne narzędzia, które ułatwiają zadania compliance.',
        sections: [
          { h2: 'Uproszczone Zarządzanie Zadaniami', content: ['Jasne przydzielanie zadań z instrukcjami krok po kroku', 'Automatyczne przypomnienia', 'Intuicyjny interfejs - nie wymaga ekspertyzy compliance', 'Przyjazny dla urządzeń mobilnych'] },
          { h2: 'Przewodnikowe Zbieranie Danych', content: ['Gotowe formularze dostosowane do wymagań standardów', 'Inteligentna walidacja zapewniająca jakość danych', 'Przesyłanie dowodów drag-and-drop'] },
          { h2: 'Współpraca Zespołowa', content: ['Komentarze i pytania przy zadaniach', 'Płynne przekazywanie między członkami zespołu', 'Aktualizacje statusu w czasie rzeczywistym'] }
        ],
        internalLinks: [
          { text: 'Dla Zarządu', href: '/by-roles/managers' },
          { text: 'Dla Audytorów', href: '/by-roles/auditor' },
          { text: 'Zarządzanie Zadaniami', href: '/product/task-data-management' }
        ]
      },
      cs: {
        title: 'Pro Přispěvatele a Týmy - Operační Compliance Nástroje | Quantifier',
        description: 'Zjednodušené compliance nástroje pro operační týmy. Intuitivní správa úkolů, řízený sběr dat a jednoduché odesílání důkazů.',
        h1: 'Pro Přispěvatele a Operační Týmy',
        subtitle: 'Jednoduché, intuitivní nástroje pro snadné plnění compliance úkolů.',
        sections: [
          { h2: 'Zjednodušená Správa Úkolů', content: ['Jasné přidělení úkolů s pokyny krok za krokem', 'Automatická upomínka', 'Intuitivní rozhraní - nevyžaduje odbornost v compliance'] },
          { h2: 'Řízený Sběr Dat', content: ['Předpřipravené formuláře přizpůsobené požadavkům standardů', 'Chytrá validace zajišťující kvalitu dat', 'Nahrávání důkazů drag-and-drop'] }
        ],
        internalLinks: [
          { text: 'Pro Manažery', href: '/by-roles/managers' },
          { text: 'Pro Auditory', href: '/by-roles/auditor' },
          { text: 'Správa Úkolů', href: '/product/task-data-management' }
        ]
      }
    },
    'by-roles-auditor': {
      en: {
        title: 'For Auditors - Audit Tools & Evidence Access | Quantifier',
        description: 'Powerful audit tools for internal and external auditors. Complete evidence access, audit trails, control testing and compliance verification in one platform.',
        h1: 'For Internal & External Auditors',
        subtitle: 'Complete audit toolkit with evidence access, control testing and verification.',
        sections: [
          { h2: 'Evidence Access', content: ['Read-only access to all compliance evidence', 'Organized evidence packages by framework and control', 'Complete audit trail for every document and action', 'Secure, time-limited access for external auditors'] },
          { h2: 'Control Testing', content: ['Structured control testing workflows', 'Sample selection and testing documentation', 'Exception tracking and remediation verification', 'Cross-reference controls across multiple frameworks'] },
          { h2: 'Audit Reporting', content: ['Customizable audit report templates', 'Finding classification and risk rating', 'Remediation tracking with timeline views', 'Historical audit comparison and trend analysis'] }
        ],
        internalLinks: [
          { text: 'For Managers', href: '/by-roles/managers' },
          { text: 'For Contributors', href: '/by-roles/contributors' },
          { text: 'Documents Management', href: '/product/documents-management' },
          { text: 'Platform Overview', href: '/product/overview' }
        ]
      },
      pl: {
        title: 'Dla Audytorów - Narzędzia Audytowe i Dostęp do Dowodów | Quantifier',
        description: 'Zaawansowane narzędzia dla audytorów wewnętrznych i zewnętrznych. Dostęp do dowodów, ścieżki audytu i weryfikacja zgodności.',
        h1: 'Dla Audytorów Wewnętrznych i Zewnętrznych',
        subtitle: 'Kompletny zestaw narzędzi audytowych z dostępem do dowodów i weryfikacją.',
        sections: [
          { h2: 'Dostęp do Dowodów', content: ['Dostęp tylko do odczytu wszystkich dowodów zgodności', 'Uporządkowane pakiety dowodów według standardu i kontroli', 'Pełna ścieżka audytu dla każdego dokumentu i akcji', 'Bezpieczny, ograniczony czasowo dostęp dla audytorów zewnętrznych'] },
          { h2: 'Testowanie Kontroli', content: ['Strukturalne przepływy testowania kontroli', 'Dobór próby i dokumentacja testów', 'Śledzenie wyjątków i weryfikacja napraw'] },
          { h2: 'Raportowanie Audytu', content: ['Konfigurowalne szablony raportów audytowych', 'Klasyfikacja ustaleń i ocena ryzyka', 'Śledzenie napraw z widokiem osi czasu'] }
        ],
        internalLinks: [
          { text: 'Dla Zarządu', href: '/by-roles/managers' },
          { text: 'Dla Zespołów', href: '/by-roles/contributors' },
          { text: 'Zarządzanie Dokumentami', href: '/product/documents-management' }
        ]
      },
      cs: {
        title: 'Pro Auditory - Auditní Nástroje a Přístup k Důkazům | Quantifier',
        description: 'Výkonné auditní nástroje pro interní a externí auditory. Přístup k důkazům, auditní stopy a ověření shody v jedné platformě.',
        h1: 'Pro Interní a Externí Auditory',
        subtitle: 'Kompletní auditní sada nástrojů s přístupem k důkazům a ověřením.',
        sections: [
          { h2: 'Přístup k Důkazům', content: ['Přístup pouze pro čtení ke všem důkazům shody', 'Organizované balíčky důkazů podle standardu a kontroly', 'Kompletní auditní stopa pro každý dokument a akci'] },
          { h2: 'Testování Kontrol', content: ['Strukturované pracovní postupy testování kontrol', 'Výběr vzorků a dokumentace testů', 'Sledování výjimek a ověření náprav'] },
          { h2: 'Auditní Reporting', content: ['Přizpůsobitelné šablony auditních reportů', 'Klasifikace zjištění a hodnocení rizik', 'Sledování náprav s časovou osou'] }
        ],
        internalLinks: [
          { text: 'Pro Manažery', href: '/by-roles/managers' },
          { text: 'Pro Přispěvatele', href: '/by-roles/contributors' },
          { text: 'Správa Dokumentů', href: '/product/documents-management' }
        ]
      }
    },
    'cybersecurity-check': {
      en: {
        title: 'Cybersecurity Check — Does Your Company Need to Act? | Quantifier',
        description: 'Answer 4 questions and find out if the NIS2 Directive or ISO 27001 applies to your company. Free cybersecurity compliance check by Quantifier.',
        h1: 'Does your company urgently need to address cybersecurity?',
        subtitle: 'In a world of rising cyberattacks and geopolitical tensions, cybersecurity is a business survival condition. Answer 4 questions to find out where your company stands.',
        sections: [
          {
            h2: 'What is the NIS2 Directive?',
            content: [
              'NIS2 (Network and Information Security Directive 2) is an EU cybersecurity regulation that came into force in January 2023.',
              'It replaces the original NIS Directive and significantly expands the scope of companies required to meet cybersecurity standards.',
              'Member states were required to transpose NIS2 into national law by October 2024.',
              'Non-compliance can result in fines of up to €10 million or 2% of global annual turnover.',
              'Executive management is personally liable for NIS2 compliance — cybersecurity is now a matter of corporate governance.'
            ]
          },
          {
            h2: 'Which companies does NIS2 apply to?',
            content: [
              'NIS2 applies to medium and large companies (50+ employees or €10M+ revenue) in 18 critical sectors.',
              'Essential entities: energy, transport, banking, health, water, digital infrastructure, public administration, space.',
              'Important entities: postal services, waste management, chemicals, food, manufacturing, digital providers, research.',
              'Even if your company is small, NIS2 may apply if you are a critical supplier to essential entities in the supply chain.'
            ]
          },
          {
            h2: 'Why ISO 27001 also matters',
            content: [
              'ISO 27001 defines the global standard for information security management systems (ISMS).',
              'It provides a framework for risk management, access control, incident response, and continuous improvement.',
              'Increasingly required by large clients, public institutions, and supply chain partners as a contractual condition.',
              'Achieving ISO 27001 certification demonstrates due diligence and significantly reduces regulatory risk.'
            ]
          }
        ],
        faqs: [
          {
            question: 'How do I know if NIS2 applies to my company?',
            answer: 'NIS2 applies if your company operates in one of 18 critical sectors AND meets the size threshold (50+ employees or €10M+ annual revenue). Use our free cybersecurity check tool above to find out in under 2 minutes.'
          },
          {
            question: 'What are the penalties for NIS2 non-compliance?',
            answer: 'For essential entities: up to €10 million or 2% of global annual turnover. For important entities: up to €7 million or 1.4% of global annual turnover. Senior management can also be held personally liable.'
          },
          {
            question: 'What is the NIS2 compliance deadline?',
            answer: 'The EU NIS2 Directive required national transposition by October 17, 2024. Companies in scope should be actively working on compliance now. Non-compliant organizations are already at risk of regulatory action.'
          }
        ],
        internalLinks: [
          { text: 'NIS2 Compliance Platform', href: '/frameworks/nis-ii' },
          { text: 'ISO 27001 Automation', href: '/frameworks/iso-27001' },
          { text: 'GRC Platform Overview', href: '/grc-platform' },
          { text: 'Schedule a Demo', href: '/contact' }
        ]
      },
      pl: {
        title: 'Sprawdź cyberbezpieczeństwo firmy — NIS2 i ISO 27001 | Quantifier',
        description: 'Odpowiedz na 4 pytania i dowiedz się, czy NIS2 lub ISO 27001 dotyczy Twojej organizacji. Bezpłatny test cyberbezpieczeństwa od Quantifier.',
        h1: 'Czy Twoja firma powinna pilnie zająć się cyberbezpieczeństwem?',
        subtitle: 'W świecie rosnących cyberataków i napięć geopolitycznych cyberbezpieczeństwo to warunek przetrwania biznesu. Odpowiedz na 4 pytania i sprawdź, gdzie stoi Twoja firma.',
        sections: [
          {
            h2: 'Czym jest dyrektywa NIS2?',
            content: [
              'NIS2 (Dyrektywa w sprawie bezpieczeństwa sieci i informacji 2) to unijne rozporządzenie dotyczące cyberbezpieczeństwa, które weszło w życie w styczniu 2023 r.',
              'Zastępuje pierwotną dyrektywę NIS i znacznie rozszerza zakres podmiotów zobowiązanych do spełnienia wymagań cyberbezpieczeństwa.',
              'Państwa członkowskie były zobowiązane do implementacji NIS2 do prawa krajowego do października 2024 r.',
              'Za nieprzestrzeganie grożą kary do 10 mln euro lub 2% globalnego rocznego obrotu.',
              'Zarząd ponosi osobistą odpowiedzialność za zgodność z NIS2 — cyberbezpieczeństwo staje się elementem ładu korporacyjnego.'
            ]
          },
          {
            h2: 'Których firm dotyczy NIS2?',
            content: [
              'NIS2 dotyczy średnich i dużych firm (50+ pracowników lub obrót 10M€+) w 18 sektorach kluczowych.',
              'Podmioty kluczowe: energetyka, transport, bankowość, zdrowie, woda, infrastruktura cyfrowa, administracja publiczna, przestrzeń kosmiczna.',
              'Podmioty ważne: usługi pocztowe, gospodarka odpadami, chemia, żywność, produkcja, usługi cyfrowe, badania.',
              'Nawet jeśli Twoja firma jest mała, NIS2 może dotyczyć Cię jako krytycznego dostawcy podmiotów kluczowych w łańcuchu dostaw.'
            ]
          },
          {
            h2: 'Dlaczego ważne jest również ISO 27001?',
            content: [
              'ISO 27001 wyznacza globalny standard systemów zarządzania bezpieczeństwem informacji (ISMS).',
              'Zapewnia ramy zarządzania ryzykiem, kontroli dostępu, reagowania na incydenty i ciągłego doskonalenia.',
              'Coraz częściej wymagane przez dużych klientów, instytucje publiczne i partnerów w łańcuchu dostaw jako warunek kontraktowy.',
              'Certyfikacja ISO 27001 dokumentuje należytą staranność i znacząco redukuje ryzyko regulacyjne.'
            ]
          }
        ],
        faqs: [
          {
            question: 'Jak sprawdzić, czy NIS2 dotyczy mojej firmy?',
            answer: 'NIS2 dotyczy firm działających w jednym z 18 sektorów kluczowych I spełniających próg wielkości (50+ pracowników lub obrót 10M€+). Skorzystaj z naszego bezpłatnego narzędzia powyżej, aby dowiedzieć się w mniej niż 2 minuty.'
          },
          {
            question: 'Jakie są kary za nieprzestrzeganie NIS2?',
            answer: 'Dla podmiotów kluczowych: do 10 mln euro lub 2% globalnego rocznego obrotu. Dla podmiotów ważnych: do 7 mln euro lub 1,4% globalnego obrotu. Członkowie zarządu mogą być pociągnięci do osobistej odpowiedzialności.'
          },
          {
            question: 'Jaki jest termin wdrożenia NIS2?',
            answer: 'Dyrektywa NIS2 wymagała implementacji do prawa krajowego do 17 października 2024 r. Firmy objęte zakresem powinny aktywnie pracować nad zgodnością. Organizacje niespełniające wymagań są już narażone na działania regulacyjne.'
          }
        ],
        internalLinks: [
          { text: 'Platforma zgodności z NIS2', href: '/frameworks/nis-ii' },
          { text: 'Automatyzacja ISO 27001', href: '/frameworks/iso-27001' },
          { text: 'Platforma GRC', href: '/grc-platform' },
          { text: 'Umów demo', href: '/contact' }
        ]
      },
      cs: {
        title: 'Zkontrolujte kybernetickou bezpečnost firmy — NIS2 a ISO 27001 | Quantifier',
        description: 'Odpovězte na 4 otázky a zjistěte, zda se směrnice NIS2 nebo ISO 27001 vztahuje na vaši organizaci. Bezplatná kontrola od Quantifier.',
        h1: 'Potřebuje vaše společnost naléhavě řešit kybernetickou bezpečnost?',
        subtitle: 'Ve světě rostoucích kyberútoků a geopolitických napětí je kybernetická bezpečnost podmínkou přežití podniku. Odpovězte na 4 otázky a zjistěte, kde vaše firma stojí.',
        sections: [
          {
            h2: 'Co je směrnice NIS2?',
            content: [
              'NIS2 (Směrnice o bezpečnosti sítí a informačních systémů 2) je unijní nařízení o kybernetické bezpečnosti, které vstoupilo v platnost v lednu 2023.',
              'Nahrazuje původní směrnici NIS a výrazně rozšiřuje okruh subjektů povinných splňovat standardy kybernetické bezpečnosti.',
              'Členské státy byly povinny transponovat NIS2 do národního práva do října 2024.',
              'Za nedodržení hrozí pokuty až 10 milionů eur nebo 2 % celosvětového ročního obratu.',
              'Vedení společnosti nese osobní odpovědnost za soulad s NIS2 — kybernetická bezpečnost se stává součástí korporátního řízení.'
            ]
          },
          {
            h2: 'Na které firmy se NIS2 vztahuje?',
            content: [
              'NIS2 se vztahuje na střední a velké firmy (50+ zaměstnanců nebo obrat 10M€+) v 18 klíčových sektorech.',
              'Základní subjekty: energetika, doprava, bankovnictví, zdravotnictví, voda, digitální infrastruktura, veřejná správa, vesmír.',
              'Důležité subjekty: poštovní služby, odpadové hospodářství, chemikálie, potraviny, výroba, digitální poskytovatelé, výzkum.',
              'I malá firma může podléhat NIS2 jako kritický dodavatel základních subjektů v dodavatelském řetězci.'
            ]
          },
          {
            h2: 'Proč je důležité i ISO 27001?',
            content: [
              'ISO 27001 stanovuje globální standard pro systémy řízení bezpečnosti informací (ISMS).',
              'Poskytuje rámec pro řízení rizik, řízení přístupu, reakci na incidenty a neustálé zlepšování.',
              'Stále více vyžadováno velkými klienty, veřejnými institucemi a partnery v dodavatelském řetězci jako smluvní podmínka.',
              'Certifikace ISO 27001 prokazuje due diligence a výrazně snižuje regulační riziko.'
            ]
          }
        ],
        faqs: [
          {
            question: 'Jak zjistím, zda se NIS2 vztahuje na mou firmu?',
            answer: 'NIS2 se vztahuje na firmy působící v jednom z 18 klíčových sektorů A splňující prahovou hodnotu velikosti (50+ zaměstnanců nebo obrat 10M€+). Využijte náš bezplatný nástroj výše a zjistěte to za méně než 2 minuty.'
          },
          {
            question: 'Jaké jsou sankce za nedodržení NIS2?',
            answer: 'Pro základní subjekty: až 10 milionů eur nebo 2 % celosvětového ročního obratu. Pro důležité subjekty: až 7 milionů eur nebo 1,4 % celosvětového obratu. Členové vedení mohou být osobně odpovědni.'
          },
          {
            question: 'Jaký je termín pro implementaci NIS2?',
            answer: 'Směrnice EU NIS2 vyžadovala národní transpozici do 17. října 2024. Firmy v rozsahu by měly aktivně pracovat na souladu. Nesoulad s NIS2 již nyní znamená riziko regulačních opatření.'
          }
        ],
        internalLinks: [
          { text: 'Platforma pro shodu s NIS2', href: '/frameworks/nis-ii' },
          { text: 'Automatizace ISO 27001', href: '/frameworks/iso-27001' },
          { text: 'GRC Platforma', href: '/grc-platform' },
          { text: 'Naplánovat demo', href: '/contact' }
        ]
      }
    }
  };

  const pageData = pages[page];
  if (!pageData) return null;
  
  return pageData[locale] || pageData['en'];
};

// Fetch published posts from database
async function fetchPublishedPosts(locale: string) {
  const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
  const { data } = await supabase
    .from('posts')
    .select('title, slug, excerpt, published_at, category:categories(name)')
    .eq('status', 'published')
    .eq('lang', locale)
    .order('published_at', { ascending: false })
    .limit(50);
  return data || [];
}

// Fetch published stories from database
async function fetchPublishedStories(locale: string) {
  const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
  const { data } = await supabase
    .from('stories')
    .select('title, slug, summary, client_name, industry, published_at')
    .eq('status', 'published')
    .eq('lang', locale)
    .order('published_at', { ascending: false })
    .limit(50);
  return data || [];
}

// Generate JSON-LD schemas
function generateSchemas(locale: string, page: string, pageData: PageData, collectionItems?: Array<{url: string; name: string; description?: string}>): string {
  const baseUrl = ensureTrailingSlash(`${BASE_URL}/${locale}`);
  const urlPath = pageUrlMap[page] || page;
  const pageUrl = page === 'index' ? baseUrl : ensureTrailingSlash(`${BASE_URL}/${locale}/${urlPath}`);
  
  const schemas: object[] = [];
  
  // Breadcrumb name mapping for correct display names
  const breadcrumbNameMap: Record<string, string> = {
    'iso-27001': 'ISO 27001',
    'iso-9001': 'ISO 9001',
    'nis-ii': 'NIS2',
    'soc': 'SOC 2',
    'gdpr': 'GDPR',
    'dora': 'DORA',
    'hipaa': 'HIPAA',
    'ccpa': 'CCPA',
    'esg': 'ESG',
    'grc-platform': 'GRC Platform',
    'by-roles': locale === 'pl' ? 'Dla kogo' : 'By Role',
    'ai-compliance-officer': 'AI Compliance Officer',
    'features': locale === 'pl' ? 'Funkcje' : (locale === 'cs' ? 'Funkce' : 'Features'),
    'frameworks': locale === 'pl' ? 'Standardy' : 'Frameworks',
    'product': locale === 'pl' ? 'Produkt' : 'Product',
    'overview': locale === 'pl' ? 'Przegląd' : 'Overview',
    'managers': locale === 'pl' ? 'Menedżerowie' : 'Managers',
    'contributors': locale === 'pl' ? 'Współpracownicy' : 'Contributors',
    'auditor': locale === 'pl' ? 'Audytor' : 'Auditor',
  };
  
  // Parent category mapping for 3-level breadcrumbs
  const parentCategoryMap: Record<string, { segment: string; nameKey: string }> = {
    'soc2-automation': { segment: 'frameworks', nameKey: 'frameworks' },
    'iso27001': { segment: 'frameworks', nameKey: 'frameworks' },
    'gdpr-compliance': { segment: 'frameworks', nameKey: 'frameworks' },
    'nis2': { segment: 'frameworks', nameKey: 'frameworks' },
    'dora': { segment: 'frameworks', nameKey: 'frameworks' },
    'iso-9001': { segment: 'frameworks', nameKey: 'frameworks' },
    'hipaa': { segment: 'frameworks', nameKey: 'frameworks' },
    'ccpa': { segment: 'frameworks', nameKey: 'frameworks' },
    'esg': { segment: 'frameworks', nameKey: 'frameworks' },
    'environmental': { segment: 'frameworks', nameKey: 'frameworks' },
    'governance': { segment: 'frameworks', nameKey: 'frameworks' },
    'product-level': { segment: 'frameworks', nameKey: 'frameworks' },
    'product-features': { segment: 'product', nameKey: 'product' },
    'product-overview': { segment: 'product', nameKey: 'product' },
    'compliance-officer': { segment: 'product', nameKey: 'product' },
    'task-data-management': { segment: 'product', nameKey: 'product' },
    'analytics-dashboards': { segment: 'product', nameKey: 'product' },
    'documents-management': { segment: 'product', nameKey: 'product' },
    'api-integrations': { segment: 'product', nameKey: 'product' },
    'value-chain': { segment: 'product', nameKey: 'product' },
    'risk-assessment': { segment: 'product', nameKey: 'product' },
    'by-roles-managers': { segment: 'by-roles', nameKey: 'by-roles' },
    'by-roles-contributors': { segment: 'by-roles', nameKey: 'by-roles' },
    'by-roles-auditor': { segment: 'by-roles', nameKey: 'by-roles' },
  };
  
  // BreadcrumbList
  const homeName = locale === 'pl' ? 'Strona główna' : (locale === 'cs' ? 'Domů' : 'Home');
  const breadcrumbItems: Array<{name: string; url: string}> = [
    { name: homeName, url: baseUrl }
  ];
  
  if (page !== 'index') {
    const parent = parentCategoryMap[page];
    if (parent) {
      const parentName = breadcrumbNameMap[parent.nameKey] || parent.segment.charAt(0).toUpperCase() + parent.segment.slice(1);
      breadcrumbItems.push({ 
        name: parentName, 
        url: ensureTrailingSlash(`${BASE_URL}/${locale}/${parent.segment}`) 
      });
    }
    
    // Use the URL path's last segment for name lookup, fallback to h1
    const lastSegment = urlPath.split('/').pop() || page;
    const pageName = breadcrumbNameMap[lastSegment] || pageData.h1;
    breadcrumbItems.push({ name: pageName, url: pageUrl });
  }
  
  schemas.push({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': breadcrumbItems.map((item, index) => ({
      '@type': 'ListItem',
      'position': index + 1,
      'name': item.name,
      'item': item.url
    }))
  });
  
  // SoftwareApplication for relevant pages (including DORA, HIPAA, CCPA)
  if (['index', 'soc2-automation', 'iso27001', 'gdpr-compliance', 'nis2', 'grc-platform', 'product-features', 'dora', 'hipaa', 'ccpa'].includes(page)) {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      'name': 'Quantifier.ai',
      'applicationCategory': 'BusinessApplication',
      'applicationSubCategory': 'Governance, Risk and Compliance (GRC)',
      'operatingSystem': 'Web Browser',
      'description': pageData.description,
      'url': BASE_URL,
      'offers': {
        '@type': 'Offer',
        'url': `${BASE_URL}/${locale}/plans`,
        'priceCurrency': 'USD',
        'availability': 'https://schema.org/OnlineOnly'
      },
      'provider': {
        '@type': 'Organization',
        'name': 'Quantifier.ai',
        'url': BASE_URL
      }
    });
  }
  
  // FAQPage for pages with FAQs
  if (pageData.faqs && pageData.faqs.length > 0) {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      'mainEntity': pageData.faqs.map(faq => ({
        '@type': 'Question',
        'name': faq.question,
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': faq.answer
        }
      }))
    });
  }
  
  // CollectionPage for blog and success-stories
  if ((page === 'blog' || page === 'success-stories') && collectionItems && collectionItems.length > 0) {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      'name': pageData.h1,
      'description': pageData.description,
      'url': pageUrl,
      'hasPart': collectionItems.map(item => ({
        '@type': page === 'blog' ? 'BlogPosting' : 'Article',
        'headline': item.name,
        'url': item.url,
        ...(item.description ? { 'description': item.description } : {})
      }))
    });
  }

  // Organization for homepage - full version matching SPA
  if (page === 'index') {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'Organization',
      'name': 'Quantifier.ai',
      'url': BASE_URL,
      'logo': `${BASE_URL}/lovable-uploads/b5ac5352-8089-4e7d-a1d4-6c879bd4f57e.png`,
      'description': locale === 'pl' 
        ? 'AI-Native Platforma GRC do Automatyzacji Compliance'
        : locale === 'cs'
        ? 'AI-Native GRC Platforma pro Automatizaci Compliance'
        : 'AI-Native GRC Platform for Compliance Automation',
      'foundingDate': '2020',
      'sameAs': [
        'https://www.linkedin.com/company/quantifier-ai'
      ],
      'address': [
        {
          '@type': 'PostalAddress',
          'streetAddress': '447 Sutter St Ste 405 PMB 137',
          'addressLocality': 'San Francisco',
          'addressRegion': 'CA',
          'postalCode': '94108',
          'addressCountry': 'US'
        },
        {
          '@type': 'PostalAddress',
          'streetAddress': 'Rondo Daszynskiego 1',
          'addressLocality': 'Warsaw',
          'addressCountry': 'PL'
        }
      ],
      'contactPoint': [
        {
          '@type': 'ContactPoint',
          'telephone': '+1-415-799-8206',
          'contactType': 'sales',
          'areaServed': 'US'
        },
        {
          '@type': 'ContactPoint',
          'telephone': '+48-698-759-206',
          'contactType': 'sales',
          'areaServed': 'EU'
        }
      ]
    });
    
    // WebSite schema for homepage
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      'name': 'Quantifier.ai',
      'url': BASE_URL
    });
  }
  
  return schemas.map(schema => `<script type="application/ld+json">${JSON.stringify(schema)}</script>`).join('\n');
}

// Generate HTML content
async function generateHtml(locale: string, page: string, pageData: PageData): Promise<string> {
  const baseUrl = ensureTrailingSlash(`${BASE_URL}/${locale}`);
  const urlPath = pageUrlMap[page] || page;
  const pageUrl = page === 'index' ? baseUrl : ensureTrailingSlash(`${BASE_URL}/${locale}/${urlPath}`);
  
  // Generate all locale URLs for hreflang with regional codes
  const locales = ['en', 'pl', 'cs'];
  const hreflangTags = locales.map(l => {
    const url = page === 'index' ? ensureTrailingSlash(`${BASE_URL}/${l}`) : ensureTrailingSlash(`${BASE_URL}/${l}/${urlPath}`);
    const hreflang = localeHreflangMap[l] || l;
    return `<link rel="alternate" hreflang="${hreflang}" href="${url}">`;
  }).join('\n  ');
  
  // Fetch dynamic content for blog and success-stories
  let dynamicListHtml = '';
  let collectionItems: Array<{url: string; name: string; description?: string}> = [];

  if (page === 'blog') {
    const posts = await fetchPublishedPosts(locale);
    if (posts.length > 0) {
      const allArticlesTitle = locale === 'pl' ? 'Wszystkie artykuły' : (locale === 'cs' ? 'Všechny články' : 'All Articles');
      collectionItems = posts.map((p: Record<string, unknown>) => ({
        url: ensureTrailingSlash(`${BASE_URL}/${locale}/blog/${p.slug}`),
        name: p.title as string,
        description: (p.excerpt as string) || undefined,
      }));
      dynamicListHtml = `
    <section>
      <h2>${allArticlesTitle}</h2>
      <ul class="article-list">
        ${posts.map((p: Record<string, unknown>) => {
          const cat = p.category as Record<string, string> | null;
          const catName = cat?.name || '';
          const dateStr = (p.published_at as string) || '';
          const dateFmt = dateStr ? new Date(dateStr).toLocaleDateString(locale === 'pl' ? 'pl-PL' : (locale === 'cs' ? 'cs-CZ' : 'en-US'), { year: 'numeric', month: 'long', day: 'numeric' }) : '';
          return `<li><article>
          <h3><a href="${ensureTrailingSlash(`${BASE_URL}/${locale}/blog/${p.slug}`)}">${p.title}</a></h3>
          ${dateStr ? `<time datetime="${dateStr}">${dateFmt}</time>` : ''}
          ${catName ? `<span class="category">${catName}</span>` : ''}
          ${p.excerpt ? `<p>${p.excerpt}</p>` : ''}
        </article></li>`;
        }).join('\n        ')}
      </ul>
    </section>`;
    }
  } else if (page === 'success-stories') {
    const stories = await fetchPublishedStories(locale);
    if (stories.length > 0) {
      const allStoriesTitle = locale === 'pl' ? 'Wszystkie historie sukcesu' : (locale === 'cs' ? 'Všechny příběhy úspěchu' : 'All Case Studies');
      collectionItems = stories.map((s: Record<string, unknown>) => ({
        url: ensureTrailingSlash(`${BASE_URL}/${locale}/success-stories/${s.slug}`),
        name: s.title as string,
        description: (s.summary as string) || undefined,
      }));
      dynamicListHtml = `
    <section>
      <h2>${allStoriesTitle}</h2>
      <ul class="article-list">
        ${stories.map((s: Record<string, unknown>) => {
          const subtitle = [s.client_name, s.industry].filter(Boolean).join(' — ');
          return `<li><article>
          <h3><a href="${ensureTrailingSlash(`${BASE_URL}/${locale}/success-stories/${s.slug}`)}">${s.title}</a></h3>
          ${subtitle ? `<p><strong>${subtitle}</strong></p>` : ''}
          ${s.summary ? `<p>${s.summary}</p>` : ''}
        </article></li>`;
        }).join('\n        ')}
      </ul>
    </section>`;
    }
  }

  const schemas = generateSchemas(locale, page, pageData, collectionItems);
  
  // Generate main navigation HTML
  const navLabels = {
    en: { product: 'Product', frameworks: 'Frameworks', plans: 'Plans', partners: 'Partners', blog: 'Blog', contact: 'Contact' },
    pl: { product: 'Produkt', frameworks: 'Standardy', plans: 'Cennik', partners: 'Partnerzy', blog: 'Blog', contact: 'Kontakt' },
    cs: { product: 'Produkt', frameworks: 'Standardy', plans: 'Ceník', partners: 'Partneři', blog: 'Blog', contact: 'Kontakt' }
  };
  const labels = navLabels[locale as keyof typeof navLabels] || navLabels.en;
  
  const mainNavHtml = `
    <nav aria-label="Main navigation">
      <ul>
        <li><a href="${BASE_URL}/${locale}/product/features">${labels.product}</a></li>
        <li><a href="${BASE_URL}/${locale}/frameworks">${labels.frameworks}</a></li>
        <li><a href="${BASE_URL}/${locale}/plans">${labels.plans}</a></li>
        <li><a href="${BASE_URL}/${locale}/partners">${labels.partners}</a></li>
        <li><a href="${BASE_URL}/${locale}/blog">${labels.blog}</a></li>
        <li><a href="${BASE_URL}/${locale}/contact">${labels.contact}</a></li>
      </ul>
    </nav>
  `;
  
  // Generate sections HTML
  const sectionsHtml = pageData.sections.map(section => `
    <section>
      <h2>${section.h2}</h2>
      <ul>
        ${section.content.map(item => `<li>${item}</li>`).join('\n        ')}
      </ul>
    </section>
  `).join('\n');
  
  // Generate FAQ HTML
  const faqTitle = locale === 'pl' ? 'Często Zadawane Pytania' : (locale === 'cs' ? 'Často Kladené Otázky' : 'Frequently Asked Questions');
  const faqHtml = pageData.faqs ? `
    <section class="faq-section">
      <h2>${faqTitle}</h2>
      ${pageData.faqs.map(faq => `
        <div class="faq-item">
          <h3>${faq.question}</h3>
          <p>${faq.answer}</p>
        </div>
      `).join('\n')}
    </section>
  ` : '';
  
  // Generate internal links HTML
  const relatedTitle = locale === 'pl' ? 'Powiązane Strony' : (locale === 'cs' ? 'Související Stránky' : 'Related Pages');
  const linksHtml = pageData.internalLinks ? `
    <nav class="internal-links">
      <h2>${relatedTitle}</h2>
      <ul>
        ${pageData.internalLinks.map(link => `<li><a href="${BASE_URL}/${locale}${link.href}">${link.text}</a></li>`).join('\n        ')}
      </ul>
    </nav>
  ` : '';
  
  const ogLocale = locale === 'pl' ? 'pl_PL' : (locale === 'cs' ? 'cs_CZ' : 'en_US');
  const ctaTitle = locale === 'pl' ? 'Rozpocznij z Quantifier' : (locale === 'cs' ? 'Začněte s Quantifier' : 'Get Started with Quantifier');
  const ctaText = locale === 'pl' ? 'Dołącz do setek organizacji, które zautomatyzowały swoją zgodność z Quantifier.' : (locale === 'cs' ? 'Připojte se ke stovkám organizací, které automatizovaly svou shodu s Quantifier.' : 'Join hundreds of organizations that have automated their compliance with Quantifier.');
  const ctaButton = locale === 'pl' ? 'Umów Demo' : (locale === 'cs' ? 'Naplánovat Demo' : 'Schedule a Demo');
  const footerText = locale === 'pl' ? 'Wszelkie prawa zastrzeżone.' : (locale === 'cs' ? 'Všechna práva vyhrazena.' : 'All rights reserved.');

  return `<!DOCTYPE html>
<html lang="${locale}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="robots" content="index, follow">
  <title>${pageData.title}</title>
  <meta name="description" content="${pageData.description}">
  <link rel="canonical" href="${pageUrl}">
  ${hreflangTags}
  <link rel="alternate" hreflang="x-default" href="${ensureTrailingSlash(`${BASE_URL}/en/${page === 'index' ? '' : urlPath}`)}">
  
  <!-- Open Graph -->
  <meta property="og:title" content="${pageData.title}">
  <meta property="og:description" content="${pageData.description}">
  <meta property="og:url" content="${pageUrl}">
  <meta property="og:site_name" content="Quantifier">
  <meta property="og:type" content="website">
  <meta property="og:image" content="${BASE_URL}/lovable-uploads/154104eb-8338-4e4f-884c-2343169fc09b.png">
  <meta property="og:locale" content="${ogLocale}">
  
  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${pageData.title}">
  <meta name="twitter:description" content="${pageData.description}">
  <meta name="twitter:image" content="${BASE_URL}/lovable-uploads/154104eb-8338-4e4f-884c-2343169fc09b.png">
  
  ${schemas}
  
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: system-ui, -apple-system, sans-serif; line-height: 1.6; color: #1a1a2e; background: #fff; padding: 2rem; max-width: 1200px; margin: 0 auto; }
    h1 { font-size: 2.5rem; margin-bottom: 1rem; color: #0f172a; }
    h2 { font-size: 1.75rem; margin: 2rem 0 1rem; color: #1e293b; }
    h3 { font-size: 1.25rem; margin: 1rem 0 0.5rem; color: #334155; }
    p { margin-bottom: 1rem; color: #475569; }
    ul { margin: 1rem 0; padding-left: 1.5rem; }
    li { margin-bottom: 0.5rem; color: #475569; }
    a { color: #2563eb; text-decoration: none; }
    a:hover { text-decoration: underline; }
    nav[aria-label="Main navigation"] ul { display: flex; flex-wrap: wrap; gap: 1rem; list-style: none; padding: 0; margin-bottom: 2rem; }
    nav[aria-label="Main navigation"] li a { background: #f1f5f9; padding: 0.5rem 1rem; border-radius: 4px; display: inline-block; }
    .subtitle { font-size: 1.25rem; color: #64748b; margin-bottom: 2rem; }
    section { margin-bottom: 2rem; padding-bottom: 1rem; border-bottom: 1px solid #e2e8f0; }
    .article-list { list-style: none; padding: 0; }
    .article-list li { margin-bottom: 1.5rem; padding-bottom: 1rem; border-bottom: 1px solid #f1f5f9; }
    .article-list article h3 { margin-bottom: 0.25rem; }
    .article-list time { font-size: 0.875rem; color: #94a3b8; margin-right: 0.5rem; }
    .article-list .category { font-size: 0.75rem; background: #e0f2f1; color: #00796b; padding: 2px 8px; border-radius: 4px; }
    .faq-section { background: #f8fafc; padding: 1.5rem; border-radius: 8px; }
    .faq-item { margin-bottom: 1.5rem; }
    .internal-links { margin-top: 2rem; }
    .internal-links ul { display: flex; flex-wrap: wrap; gap: 1rem; list-style: none; padding: 0; }
    .internal-links li { background: #f1f5f9; padding: 0.5rem 1rem; border-radius: 4px; }
    .cta { background: #2563eb; color: white; padding: 1rem 2rem; border-radius: 8px; display: inline-block; margin-top: 1rem; }
  </style>
  
  <script>
    // Redirect non-bot users to SPA
    (function() {
      var botPattern = /bot|crawl|spider|slurp|facebookexternalhit|Twitterbot|LinkedInBot|WhatsApp|Discordbot|Telegrambot|Googlebot|Bingbot|Slackbot|Pinterest|Embedly|Quora|OutBrain|vkShare/i;
      if (!botPattern.test(navigator.userAgent)) {
        window.location.replace('${pageUrl}');
      }
    })();
  </script>
</head>
<body>
  ${mainNavHtml}
  
  <header>
    <h1>${pageData.h1}</h1>
    ${pageData.subtitle ? `<p class="subtitle">${pageData.subtitle}</p>` : ''}
  </header>
  
  <main>
    ${sectionsHtml}
    ${dynamicListHtml}
    ${faqHtml}
    
    <section class="cta-section">
      <h2>${ctaTitle}</h2>
      <p>${ctaText}</p>
      <a href="${BASE_URL}/${locale}/contact" class="cta">${ctaButton}</a>
    </section>
    
    ${linksHtml}
  </main>
  
  <footer>
    <p>&copy; ${new Date().getFullYear()} Quantifier. ${footerText}</p>
  </footer>
</body>
</html>`;
}

serve(async (req: Request) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    const locale = url.searchParams.get('locale') || 'en';
    const page = url.searchParams.get('page') || 'index';
    
    console.log(`Prerendering marketing page: locale=${locale}, page=${page}`);
    
    // Validate locale
    if (!['en', 'pl', 'cs'].includes(locale)) {
      return new Response('Invalid locale', { status: 400, headers: corsHeaders });
    }
    
    // Get page content
    const pageData = getPageContent(locale, page);
    
    if (!pageData) {
      console.log(`Page not found: ${page}`);
      return new Response('Page not found', { status: 404, headers: corsHeaders });
    }
    
    // Generate HTML
    const html = await generateHtml(locale, page, pageData);
    
    return new Response(html, {
      headers: {
        ...corsHeaders,
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'public, max-age=3600, s-maxage=86400',
        'X-Robots-Tag': 'index, follow',
        'Content-Security-Policy': "default-src 'self' https: data: 'unsafe-inline' 'unsafe-eval'",
      },
    });
  } catch (error) {
    console.error('Error in prerender-marketing:', error);
    return new Response(`Error: ${error.message}`, { 
      status: 500, 
      headers: corsHeaders 
    });
  }
});
